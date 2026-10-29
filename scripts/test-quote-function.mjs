/**
 * Exercises the quote endpoint — CLAUDE.md §7: "The only conversion point on
 * the site. It must work."
 *
 *   npm run test:quote
 *
 * Calls functions/api/quote.ts directly. Node provides the same globals the
 * Workers runtime does (Request, Response, FormData, File, crypto, btoa), and
 * the one outbound call — to the email provider — is stubbed, so this runs
 * offline and sends nothing.
 *
 * It does not replace a real deploy test: it cannot prove Cloudflare routes
 * /api/quote, nor that the provider accepts the mail. It proves the logic.
 */
import { onRequestPost } from '../functions/api/quote.ts';

const ENV = { RESEND_API_KEY: 'test-key', QUOTE_FROM: 'Trete One <q@treteone.com>' };
let lastEmail = null;
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).includes('resend.com')) {
    lastEmail = JSON.parse(init.body);
    return new Response('{}', { status: 200 });
  }
  return realFetch(url, init);
};

const post = (fields, { json = true, files = [] } = {}) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  for (const f of files) fd.append('files', f);
  return new Request('https://treteone.com/api/quote', {
    method: 'POST', body: fd,
    headers: json ? { accept: 'application/json' } : { accept: 'text/html' },
  });
};

const file = (name, bytes) => new File([new Uint8Array(bytes)], name);
const base = { contact: 'buyer@plant.com', part: 'SKF 6205-2RS', lang: 'en',
               rendered_at: String(Date.now() - 30_000) };

const results = [];
const check = (label, pass, detail = '') => {
  results.push(pass);
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? '  — ' + detail : ''}`);
};

// 1. happy path
lastEmail = null;
let r = await onRequestPost({ request: post(base), env: ENV });
let body = await r.json();
check('happy path returns 200 + reference', r.status === 200 && body.ok === true
  && /^TO-\d{8}-[A-HJ-NP-Z2-9]{5}$/.test(body.reference ?? ''), body.reference);
check('  reply-to set to the buyer', lastEmail?.reply_to === 'buyer@plant.com');
check('  subject carries the reference', String(lastEmail?.subject).includes(body.reference));
check('  no [CHECK] flag on a normal submission', !String(lastEmail?.subject).includes('[CHECK]'));

// 2. honeypot -> looks successful, sends nothing
lastEmail = null;
r = await onRequestPost({ request: post({ ...base, company_url: 'http://spam.example' }), env: ENV });
body = await r.json();
check('honeypot: reports success', r.status === 200 && body.ok === true);
check('  honeypot: sends no email', lastEmail === null);

// 3. fast submission -> still sent, flagged
lastEmail = null;
r = await onRequestPost({ request: post({ ...base, rendered_at: String(Date.now() - 500) }), env: ENV });
check('fast submission is delivered, not dropped', (await r.json()).ok === true && lastEmail !== null);
check('  fast submission flagged [CHECK]', String(lastEmail?.subject).startsWith('[CHECK]'));

// 4. missing contact
r = await onRequestPost({ request: post({ ...base, contact: '' }), env: ENV });
check('missing contact rejected 422', r.status === 422);

// 5. attachment rules
r = await onRequestPost({ request: post(base, { files: Array.from({length: 6}, (_, i) => file(`d${i}.pdf`, 10)) }), env: ENV });
check('6 files rejected 413', r.status === 413);
r = await onRequestPost({ request: post(base, { files: [file('virus.exe', 10)] }), env: ENV });
check('.exe rejected 415', r.status === 415);
r = await onRequestPost({ request: post(base, { files: [file('big.pdf', 11 * 1024 * 1024)] }), env: ENV });
check('11 MB single file rejected 413/415', r.status === 415 || r.status === 413);
r = await onRequestPost({ request: post(base, { files: Array.from({length: 3}, (_, i) => file(`b${i}.pdf`, 8 * 1024 * 1024)) }), env: ENV });
check('24 MB total rejected 413', r.status === 413);

// 6. a valid attachment really is attached, base64
lastEmail = null;
r = await onRequestPost({ request: post(base, { files: [file('nameplate.jpg', 2048)] }), env: ENV });
check('valid attachment accepted', (await r.json()).ok === true);
check('  attachment base64-encoded and named', lastEmail?.attachments?.[0]?.filename === 'nameplate.jpg'
  && typeof lastEmail?.attachments?.[0]?.content === 'string'
  && lastEmail.attachments[0].content.length > 2000);

// 7. unconfigured -> fails loudly, never pretends
r = await onRequestPost({ request: post(base), env: {} });
body = await r.json();
check('unconfigured returns 502, not a fake success', r.status === 502 && body.ok === false);
check('  error names the fallback address', String(body.message).includes('info@treteone.com'));

// 8. no-JS path returns HTML with the reference
lastEmail = null;
r = await onRequestPost({ request: post(base, { json: false }), env: ENV });
const html = await r.text();
check('no-JS path returns HTML', r.headers.get('content-type').includes('text/html'));
check('  no-JS HTML shows a reference', /TO-\d{8}-[A-HJ-NP-Z2-9]{5}/.test(html));
check('  no-JS HTML is not a redirect', r.status === 200);
check('  no-JS HTML links our own stylesheet', html.includes('/form-response.css'));

// 9. zh route gets Chinese
r = await onRequestPost({ request: post({ ...base, lang: 'zh' }, { json: false }), env: ENV });
const zh = await r.text();
check('zh no-JS page is Chinese + lang attr', zh.includes('需求已收到') && zh.includes('lang="zh-CN"'));

console.log(`\n  ${results.filter(Boolean).length}/${results.length} passed`);
process.exit(results.every(Boolean) ? 0 : 1);
