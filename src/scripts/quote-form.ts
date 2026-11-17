/**
 * Quote form (CLAUDE.md §8): client-side validation, in-page success and
 * failure, and the timing half of the spam check.
 *
 * This file is an enhancement, not the mechanism. The form is a real <form>
 * with a real action, so with this script absent the browser posts it normally
 * and the function answers with a confirmation page carrying the same reference
 * number. Nothing here is load-bearing except the improvement in feel.
 *
 * It holds no copy and no numbers: both come from data attributes that
 * QuoteForm.astro renders from src/i18n and src/data/quote.ts. Messages with a
 * value in them arrive with a {name} or {n} placeholder to fill.
 */

const form = document.querySelector<HTMLFormElement>('[data-quote-form]');

if (form) {
  const fileInput = form.querySelector<HTMLInputElement>('[data-quote-files]');
  const contactInput = form.querySelector<HTMLInputElement>('[data-quote-contact]');
  const contactError = form.querySelector<HTMLElement>('[data-quote-contact-error]');
  const notes = form.querySelector<HTMLTextAreaElement>('[data-quote-notes]');
  const submit = form.querySelector<HTMLButtonElement>('[data-quote-submit]');
  const result = form.querySelector<HTMLElement>('[data-quote-result]');
  const timeField = form.querySelector<HTMLInputElement>('[data-quote-time]');

  const data = form.dataset;
  const num = (key: string): number => Number(data[key] ?? 0);

  const maxFiles = num('maxFiles');
  const maxFileBytes = num('maxFileBytes');
  const maxTotalBytes = num('maxTotalBytes');

  /* -- validation in the page's language ---------------------------------- */
  // With the script running, the form checks itself and writes its own,
  // localised message next to the field. Without the script the native
  // `required` check still applies (the attribute stays in the HTML).
  form.noValidate = true;

  /* -- prefill from the row the buyer came from --------------------------- */
  // /products and /industries link here with ?category=<slug> or
  // ?industry=<slug>. Write the choice into the notes, so it is not lost on
  // the way. Names come from the page (data-prefill), never from the URL, so
  // nothing a link carries is ever written into the form as typed.
  try {
    const params = new URLSearchParams(window.location.search);
    const table = JSON.parse(data['prefill'] ?? '{}') as Record<
      string,
      { label: string; names: Record<string, string> }
    >;
    const lines: string[] = [];
    for (const key of ['category', 'industry']) {
      const slug = params.get(key);
      const entry = table[key];
      const name = slug && entry ? entry.names[slug] : undefined;
      if (entry && name) lines.push(`${entry.label}${name}`);
    }
    if (notes && lines.length > 0 && notes.value.trim() === '') {
      notes.value = `${lines.join('\n')}\n`;
    }
  } catch {
    // A malformed address or table only means no prefill.
  }

  /* -- §8 timing check --------------------------------------------------- */
  // Stamped now, compared server side. A person cannot read the form, attach a
  // datasheet and submit within the window; a script firing immediately can.
  if (timeField) timeField.value = String(Date.now());

  /* -- result rendering -------------------------------------------------- */

  const show = (state: 'success' | 'error', title: string, body: string, reference?: string) => {
    if (!result) return;
    result.textContent = '';
    result.dataset['state'] = state;

    const heading = document.createElement('strong');
    heading.className = 'quote-result__title';
    heading.textContent = title;

    const text = document.createElement('span');
    text.className = 'quote-result__body';
    // The failure message names the sales address: make it a mailto link.
    const email = data['email'] ?? '';
    const at = email ? body.indexOf(email) : -1;
    if (at === -1) {
      text.textContent = body;
    } else {
      const link = document.createElement('a');
      link.href = `mailto:${email}`;
      link.textContent = email;
      text.append(body.slice(0, at), link, body.slice(at + email.length));
    }

    result.append(heading, text);

    if (reference) {
      const ref = document.createElement('span');
      ref.className = 'quote-result__reference';
      ref.textContent = `${data['msgSuccessReference'] ?? ''} `;
      const code = document.createElement('b');
      code.textContent = reference;
      ref.append(code);
      result.append(ref);
    }
  };

  const fail = (message: string) => {
    show('error', data['msgErrorTitle'] ?? '', message);
  };

  const clearResult = () => {
    if (!result) return;
    result.textContent = '';
    delete result.dataset['state'];
  };

  /* -- §8 attachment validation, client side ----------------------------- */

  const accepted = (data['accept'] ?? '')
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .filter((part) => part.startsWith('.'));

  /**
   * Returns an error message, or null when the selection is fine.
   * Extension-based, because browsers disagree on the MIME type of .xlsx and
   * .heic often enough to reject a legitimate datasheet. The function checks
   * the same list; neither side trusts the other.
   */
  const checkFiles = (files: FileList | null): string | null => {
    if (!files || files.length === 0) return null;

    if (files.length > maxFiles) return data['msgTooManyFiles'] ?? 'Too many files.';

    let total = 0;
    for (const file of Array.from(files)) {
      total += file.size;

      const dot = file.name.lastIndexOf('.');
      const extension = dot === -1 ? '' : file.name.slice(dot).toLowerCase();
      if (!accepted.includes(extension)) {
        return (data['msgBadType'] ?? '{name}').replace('{name}', file.name);
      }

      if (file.size > maxFileBytes) {
        return (data['msgFileTooLarge'] ?? '{name}').replace('{name}', file.name);
      }
    }

    if (total > maxTotalBytes) return data['msgTotalTooLarge'] ?? 'Attachments too large.';

    return null;
  };

  fileInput?.addEventListener('change', () => {
    const problem = checkFiles(fileInput.files);
    fileInput.setAttribute('aria-invalid', problem ? 'true' : 'false');
    if (problem) {
      fail(problem);
      // Clearing is kinder than leaving a selection that cannot be sent.
      fileInput.value = '';
      fileInput.setAttribute('aria-invalid', 'false');
      return;
    }
    clearResult();
  });

  /** An email address, or something with enough digits to be a phone. */
  const usableContact = (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || (value.match(/\d/g) ?? []).length >= 7;

  const contactProblem = (message: string | null): void => {
    contactInput?.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (!contactError) return;
    contactError.textContent = message ?? '';
    contactError.hidden = !message;
  };

  contactInput?.addEventListener('input', () => {
    contactProblem(null);
  });

  /* -- submit ------------------------------------------------------------ */

  let sending = false;

  form.addEventListener('submit', async (event) => {
    // Only take over once we know we can do the job. If fetch or FormData were
    // missing, letting the browser post normally is the better outcome.
    if (typeof window.fetch !== 'function') return;

    event.preventDefault();
    if (sending) return;

    const contact = contactInput?.value.trim() ?? '';
    if (contact === '' || !usableContact(contact)) {
      clearResult();
      contactProblem(
        contact === '' ? (data['msgContactRequired'] ?? '') : (data['msgContactInvalid'] ?? ''),
      );
      contactInput?.focus();
      return;
    }

    const problem = checkFiles(fileInput?.files ?? null);
    if (problem) {
      fail(problem);
      return;
    }

    sending = true;
    clearResult();
    if (submit) {
      submit.setAttribute('aria-disabled', 'true');
      submit.textContent = data['msgSending'] ?? '';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; reference?: string; message?: string }
        | null;

      if (response.ok && payload?.ok) {
        show(
          'success',
          data['msgSuccessTitle'] ?? '',
          data['msgSuccessBody'] ?? '',
          payload.reference,
        );
        form.reset();
        // A fresh stamp, so a second enquiry is not read as a bot replaying.
        if (timeField) timeField.value = String(Date.now());
      } else {
        fail(payload?.message ?? data['msgErrorBody'] ?? '');
      }
    } catch {
      // Offline, blocked, or the function is down. Say so and give them the
      // address — §1 says the enquiry matters more than the form.
      fail(data['msgErrorBody'] ?? '');
    } finally {
      sending = false;
      if (submit) {
        submit.setAttribute('aria-disabled', 'false');
        submit.textContent = data['msgSubmit'] ?? '';
      }
    }
  });
}

/* This file is loaded as a module by its component and has no imports or
   exports of its own, which would leave TypeScript treating it as a global
   script — every top-level name shared with every other script in src/scripts.
   The empty export makes it a module, so its scope is its own. */
export {};
