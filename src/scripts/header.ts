/**
 * Header behaviour (CLAUDE.md §6.1): sticky, transparent over the hero and
 * solid after it, plus the mobile drawer.
 *
 * No inline handlers anywhere — §8 requires the CSP to survive being tightened.
 * No copy in here either: every label the script needs is rendered into a data
 * attribute by Header.astro, so translations stay in src/i18n (§3).
 */

const header = document.querySelector<HTMLElement>('[data-header]');
const nav = document.querySelector<HTMLElement>('[data-header-nav]');
const burger = document.querySelector<HTMLButtonElement>('[data-header-burger]');

/* -- mobile drawer -------------------------------------------------------- */
if (header && nav && burger) {
  const labelOpen = burger.dataset['labelOpen'] ?? '';
  const labelClose = burger.dataset['labelClose'] ?? '';

  const setDrawer = (open: boolean): void => {
    header.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? labelClose : labelOpen);
  };

  burger.addEventListener('click', () => {
    setDrawer(!header.classList.contains('is-open'));
  });

  // Following a link inside the drawer should close it.
  nav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setDrawer(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setDrawer(false);
      burger.focus();
    }
  });

  // Clicking away closes it. Keeps the drawer from covering the page silently.
  document.addEventListener('click', (event) => {
    if (!header.classList.contains('is-open')) return;
    if (!header.contains(event.target as Node)) setDrawer(false);
  });

  // The drawer is a mobile-only affordance; if the viewport grows past the
  // breakpoint while it is open, drop the state rather than leave it stuck.
  const desktop = window.matchMedia('(min-width: 720px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setDrawer(false);
  });
}

/* -- transparent over the hero, solid after ------------------------------- */
const darkZone = document.querySelector('[data-header-dark-zone]');

if (header && darkZone && 'IntersectionObserver' in window) {
  const headerHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      10,
    ) || 70;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry) header.classList.toggle('is-on-dark', entry.isIntersecting);
    },
    { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
  );

  observer.observe(darkZone);
}
