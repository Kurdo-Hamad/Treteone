/**
 * Footer behaviour: keeping the copyright year honest. (The copy-address
 * button was removed with the compact footer in the approved mockup.)
 */

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

/* This file is loaded as a module by its component and has no imports or
   exports of its own, which would leave TypeScript treating it as a global
   script — every top-level name shared with every other script in src/scripts.
   The empty export makes it a module, so its scope is its own. */
export {};
