/**
 * Footer behaviour (CLAUDE.md §6.13): the copy-address button, and keeping the
 * copyright year honest.
 *
 * No copy in here — the button carries its own localised result strings in data
 * attributes, written by Footer.astro from src/i18n (§3).
 */

/* -- copy the address, both forms at once --------------------------------- */
const copyButton = document.querySelector<HTMLButtonElement>('[data-copy-address]');
const copyStatus = document.querySelector<HTMLElement>('[data-copy-status]');

if (copyButton && copyStatus) {
  const text = copyButton.dataset['copyAddress'] ?? '';
  const copiedLabel = copyButton.dataset['labelCopied'] ?? '';
  const failedLabel = copyButton.dataset['labelFailed'] ?? '';

  let resetTimer: number | undefined;

  copyButton.addEventListener('click', async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Insecure context, denied permission, or an older browser. Say so
      // rather than pretending it worked — the address is selectable above.
      ok = false;
    }

    copyStatus.textContent = ok ? copiedLabel : failedLabel;
    copyButton.classList.toggle('is-done', ok);

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      copyStatus.textContent = '';
      copyButton.classList.remove('is-done');
    }, 4000);
  });
}

/* -- copyright year -------------------------------------------------------
   The year is rendered at build time so it is correct with JS off. A static
   site can sit unbuilt for months, though, and a stale copyright line is
   exactly the kind of detail a buyer reads as "nobody is home" (§1), so if the
   real year has moved on, correct it.                                       */
const yearEl = document.querySelector<HTMLElement>('[data-year]');

if (yearEl) {
  const built = Number(yearEl.dataset['year']);
  const now = new Date().getFullYear();
  if (Number.isFinite(built) && now > built) {
    yearEl.textContent = yearEl.textContent?.replace(String(built), String(now)) ?? null;
  }
}
