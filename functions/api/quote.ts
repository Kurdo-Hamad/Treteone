/**
 * The quote endpoint — CLAUDE.md §7, and the only backend §2 permits.
 *
 * A Cloudflare Pages Function. Pages compiles /functions at the repo root
 * separately from the static Astro build in dist/, and serves this at
 * POST /api/quote. It cannot import from src/, which is why the limits below
 * are duplicated rather than shared; both copies carry the same warning.
 *
 * What it does, in order: reject bots, validate attachments, email
 * sales@treteone.com with everything attached, and answer with a reference
 * number. It stores nothing (§7).
 *
 * ── Configuration required before this works ────────────────────────────────
 *   RESEND_API_KEY   secret. From resend.com; the sending domain must be
 *                    verified there (SPF/DKIM) or mail will be filed as spam.
 *   QUOTE_FROM       e.g. "Treteone <quotes@treteone.com>". Must be on the
 *                    verified domain — it is the envelope sender, not the
 *                    buyer's address. The buyer goes in Reply-To.
 *   QUOTE_TO         optional; defaults to sales@treteone.com.
 *
 * Set them in Cloudflare Pages → Settings → Environment variables.
 * With RESEND_API_KEY unset the endpoint returns a clear error and the form
 * tells the buyer to email directly, which is the correct failure: an enquiry
 * is never silently swallowed.
 *
 * ── On choosing a provider ──────────────────────────────────────────────────
 * Resend was picked because it is an HTTP API (SMTP is not available in the
 * Workers runtime), supports base64 attachments up to 40 MB, and needs no SDK.
 * Swapping it means rewriting sendEmail() and nothing else.
 */

interface Env {
  readonly RESEND_API_KEY?: string;
  readonly QUOTE_TO?: string;
  readonly QUOTE_FROM?: string;
}

/** The slice of the Pages Function context this handler uses. */
interface PagesContext {
  readonly request: Request;
  readonly env: Env;
}

/* ⚠ MUST MATCH src/data/quote.ts. See the warning there. */
const LIMITS = {
  maxFiles: 5,
  maxFileBytes: 10 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
  minSecondsBeforeSubmit: 3,
} as const;

const ACCEPTED_EXTENSIONS = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.heic',
  '.heif',
  '.xls',
  '.xlsx',
  '.csv',
];

const DEFAULT_TO = 'sales@treteone.com';

/** Long enough for a full BOQ pasted into a note; short enough to stop abuse. */
const MAX_FIELD_CHARS = 8000;

/* -------------------------------------------------------------- messages */

/**
 * Only for the no-JavaScript confirmation page. These strings are duplicated
 * from src/i18n so the CJK glyph subset already covers them — if you change one
 * here, change it there too, or the Chinese will fall back to a system face.
 */
const MESSAGES = {
  en: {
    successTitle: 'Request received.',
    successBody: 'We have your enquiry and will reply to the contact you gave.',
    reference: 'Your reference',
    errorTitle: 'That did not send.',
    errorBody: (email: string) =>
      `Something went wrong at our end. Please email ${email} directly — your enquiry matters more than this form.`,
    back: 'Back to Treteone',
  },
  zh: {
    successTitle: '需求已收到。',
    successBody: '我们已收到您的询价，并会通过您提供的联系方式回复。',
    reference: '您的查询编号',
    errorTitle: '提交失败。',
    errorBody: (email: string) => `我们这边出现了问题。请直接发送邮件至 ${email}。`,
    back: 'Back to Treteone',
  },
} as const;

type Lang = keyof typeof MESSAGES;

/* --------------------------------------------------------------- helpers */

const text = (value: FormDataEntryValue | null): string =>
  typeof value === 'string' ? value.trim().slice(0, MAX_FIELD_CHARS) : '';

/** TO-20260911-K7Q3M. Unambiguous alphabet: no O/0, no I/1. */
function reference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);

  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `TO-${today}-${suffix}`;
}

/** btoa() cannot take a whole megabyte at once; feed it in chunks. */
function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

const extensionOf = (name: string): string => {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot).toLowerCase();
};

const looksLikeEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
  );

/* --------------------------------------------------------------- replies */

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/**
 * The no-JavaScript path. §7 forbids a redirect, so the POST answers with the
 * outcome directly. Plain, self-contained, and styled by a stylesheet served
 * from our own origin so the CSP needs no exception.
 */
function htmlResponse(
  lang: Lang,
  state: 'success' | 'error',
  ref: string | null,
  contactEmail: string,
  status: number,
): Response {
  const m = MESSAGES[lang];
  const title = state === 'success' ? m.successTitle : m.errorTitle;
  const body = state === 'success' ? m.successBody : m.errorBody(contactEmail);

  const html = `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/form-response.css">
</head>
<body class="state-${state}">
<main class="panel">
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(body)}</p>
${ref ? `<p class="ref">${escapeHtml(m.reference)} <b>${escapeHtml(ref)}</b></p>` : ''}
<p><a href="/${lang === 'zh' ? 'zh/' : ''}">${escapeHtml(m.back)}</a></p>
</main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/* ----------------------------------------------------------------- email */

interface Attachment {
  readonly filename: string;
  readonly content: string;
}

async function sendEmail(
  env: Env,
  subject: string,
  bodyText: string,
  replyTo: string | null,
  attachments: readonly Attachment[],
): Promise<boolean> {
  const key = env.RESEND_API_KEY;
  const from = env.QUOTE_FROM;
  if (!key || !from) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [env.QUOTE_TO ?? DEFAULT_TO],
      subject,
      text: bodyText,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(attachments.length > 0 ? { attachments } : {}),
    }),
  });

  return response.ok;
}

/* --------------------------------------------------------------- handler */

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const contactEmail = env.QUOTE_TO ?? DEFAULT_TO;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return wantsJson
      ? jsonResponse({ ok: false, message: 'Could not read the submission.' }, 400)
      : htmlResponse('en', 'error', null, contactEmail, 400);
  }

  const lang: Lang = text(form.get('lang')) === 'zh' ? 'zh' : 'en';

  /* -- §7 spam: honeypot ------------------------------------------------- */
  // No person can see, tab to or hear this field. Anything in it is a bot, so
  // discard the submission and report success — a bot told it failed retries.
  if (text(form.get('company_url')) !== '') {
    const decoy = reference();
    return wantsJson
      ? jsonResponse({ ok: true, reference: decoy }, 200)
      : htmlResponse(lang, 'success', decoy, contactEmail, 200);
  }

  /* -- §7 spam: timing --------------------------------------------------- */
  // Deliberately NOT a rejection. A returning buyer with autofill can submit in
  // two seconds, and silently binning that enquiry is a far worse failure than
  // reading one spam email — §1. So a fast submission is flagged in the
  // subject line and a human decides. An absent stamp means no script ran,
  // which is normal and not suspicious.
  const stamp = Number(text(form.get('rendered_at')));
  const elapsedSeconds = Number.isFinite(stamp) && stamp > 0 ? (Date.now() - stamp) / 1000 : null;
  const suspiciouslyFast =
    elapsedSeconds !== null && elapsedSeconds < LIMITS.minSecondsBeforeSubmit;

  /* -- fields ------------------------------------------------------------ */

  const contact = text(form.get('contact'));
  if (contact === '') {
    return wantsJson
      ? jsonResponse({ ok: false, message: 'A contact is required.' }, 422)
      : htmlResponse(lang, 'error', null, contactEmail, 422);
  }

  const fields = {
    type: text(form.get('type')) || 'other',
    part: text(form.get('part')),
    manufacturer: text(form.get('manufacturer')),
    quantity: text(form.get('quantity')),
    notes: text(form.get('notes')),
    name: text(form.get('name')),
    contact,
  };

  /* -- §7 attachments, validated server side too ------------------------- */

  const uploads = form.getAll('files').filter((entry): entry is File => entry instanceof File);
  const files = uploads.filter((file) => file.size > 0);

  if (files.length > LIMITS.maxFiles) {
    return wantsJson
      ? jsonResponse({ ok: false, message: `No more than ${LIMITS.maxFiles} files.` }, 413)
      : htmlResponse(lang, 'error', null, contactEmail, 413);
  }

  let total = 0;
  for (const file of files) {
    total += file.size;
    if (file.size > LIMITS.maxFileBytes || !ACCEPTED_EXTENSIONS.includes(extensionOf(file.name))) {
      return wantsJson
        ? jsonResponse({ ok: false, message: `${file.name} was rejected.` }, 415)
        : htmlResponse(lang, 'error', null, contactEmail, 415);
    }
  }
  if (total > LIMITS.maxTotalBytes) {
    return wantsJson
      ? jsonResponse({ ok: false, message: 'Attachments are too large in total.' }, 413)
      : htmlResponse(lang, 'error', null, contactEmail, 413);
  }

  const attachments: Attachment[] = [];
  for (const file of files) {
    attachments.push({ filename: file.name, content: toBase64(await file.arrayBuffer()) });
  }

  /* -- compose ----------------------------------------------------------- */

  const ref = reference();
  const summary = fields.part || fields.manufacturer || fields.type;
  const subject = `${suspiciouslyFast ? '[CHECK] ' : ''}${ref} — ${summary}`;

  const body = [
    `Reference:    ${ref}`,
    `Language:     ${lang}`,
    `Received:     ${new Date().toISOString()}`,
    suspiciouslyFast
      ? `⚠ Submitted ${elapsedSeconds?.toFixed(1)}s after the page loaded — may be automated. Judge before replying.`
      : null,
    '',
    `Type:         ${fields.type}`,
    `Part / desc:  ${fields.part || '—'}`,
    `Manufacturer: ${fields.manufacturer || '—'}`,
    `Quantity:     ${fields.quantity || '—'}`,
    '',
    `Name/company: ${fields.name || '—'}`,
    `Contact:      ${fields.contact}`,
    '',
    'Notes:',
    fields.notes || '—',
    '',
    `Attachments:  ${files.length === 0 ? 'none' : files.map((f) => f.name).join(', ')}`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const sent = await sendEmail(
    env,
    subject,
    body,
    looksLikeEmail(fields.contact) ? fields.contact : null,
    attachments,
  );

  if (!sent) {
    // Configuration missing, or the provider refused. Never pretend it worked:
    // the form then tells the buyer to email directly, and the enquiry lives.
    return wantsJson
      ? jsonResponse({ ok: false, message: MESSAGES[lang].errorBody(contactEmail) }, 502)
      : htmlResponse(lang, 'error', null, contactEmail, 502);
  }

  return wantsJson
    ? jsonResponse({ ok: true, reference: ref }, 200)
    : htmlResponse(lang, 'success', ref, contactEmail, 200);
}
