/**
 * Masthead behaviour (approved mockup): the hamburger drawer below 960px,
 * the 2px scroll-progress line, and the slightly tighter bar once scrolled.
 *
 * No inline handlers anywhere — the CSP is `default-src 'self'` (§10).
 * No copy in here either: every label the script needs is rendered into a
 * data attribute by Header.astro, so translations stay in src/i18n (§3).
 *
 * Writing element.style from a script is CSSOM, not an inline style
 * attribute in the markup, so it is not affected by the CSP.
 */

const header = document.querySelector<HTMLElement>('[data-header]');
const drawer = document.querySelector<HTMLElement>('[data-header-drawer]');
const burger = document.querySelector<HTMLButtonElement>('[data-header-burger]');
const progress = document.querySelector<HTMLElement>('[data-header-progress]');

/* -- hamburger drawer ----------------------------------------------------- */
if (header && drawer && burger) {
  const labelOpen = burger.dataset['labelOpen'] ?? '';
  const labelClose = burger.dataset['labelClose'] ?? '';

  const setDrawer = (open: boolean): void => {
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? labelClose : labelOpen);
  };
  const isOpen = (): boolean => drawer.classList.contains('is-open');

  burger.addEventListener('click', () => setDrawer(!isOpen()));

  // Following a link inside the drawer closes it.
  drawer.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setDrawer(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setDrawer(false);
      burger.focus();
    }
  });

  // Clicking away closes it, so the drawer never covers the page silently.
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target as Node)) setDrawer(false);
  });

  // Widening past the breakpoint drops the open state rather than leaving
  // aria-expanded="true" on a hidden button.
  window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
    if (event.matches) setDrawer(false);
  });
}

/* -- scroll progress and the tighter bar --------------------------------- */
if (header && progress) {
  let ticking = false;

  const update = (): void => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    header.classList.toggle('is-stuck', window.scrollY > 40);
  };

  const request = (): void => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  update();
}

/* This file is loaded as a module by its component and has no imports or
   exports of its own, which would leave TypeScript treating it as a global
   script — every top-level name shared with every other script in src/scripts.
   The empty export makes it a module, so its scope is its own. */
export {};
