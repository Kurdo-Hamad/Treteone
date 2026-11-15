/**
 * Scroll reveal (§7, §11 — frozen under reduced motion).
 *
 * What it reveals:
 *   - anything a component marks `.rv`;
 *   - section headings, kickers and leads inside <main>;
 *   - the items of the site's lists and grids (REVEAL_GROUPS), which arrive
 *     in sequence: items that scroll into view together are staggered by
 *     their order, 70 ms apart.
 * The hero, the page-head bands and anything marked .settle-in are excluded:
 * they are on screen when the page opens and settle in by CSS instead, never
 * starting invisible (§7).
 *
 * Three things this deliberately gets right:
 *
 * 1. **Content is never hidden by CSS alone.** The class that hides
 *    (`js-reveal` on <html>) is added by this script, after it has run. If
 *    the script never loads, everything stays visible. A marketing site that
 *    hides its own copy when a bundle 404s has failed at the one job in §1.
 *
 * 2. **Nothing already on screen flickers.** Anything in the viewport is
 *    marked `.in` *before* `js-reveal` goes on, so it goes straight from
 *    visible to visible. Only off-screen elements are ever hidden.
 *
 * 3. **Reduced motion means no reveal at all**, not a fast one: the script
 *    stops before hiding anything.
 *
 * The stagger is written with element.style.setProperty — CSSOM from a
 * script, not an inline style attribute, so the `default-src 'self'` CSP is
 * unaffected (§10).
 */

const SINGLES = [
  'main section h2',
  'main section .kicker',
  'main section .lead',
  '.split__media',
  // the remaining blocks, so nothing on a page sits still
  '.intro__h1',
  '.intro__actions',
  '.cards__note',
  '.split__more',
  '.split__cta',
  '.caps__all',
  '.htf__cta',
  '.scope-band__cta',
  '.marquee__note',
  '.marquee',
  '.marquee__more',
  '.marquee__legal',
  '.bfilter',
  '.bcount',
  '.bdisclaimer',
  // footer
  '.ftop > *',
  '.legal',
];

const REVEAL_GROUPS = [
  '.rows > li',
  '.defs > .def',
  '.steps > .step',
  '.htf__list > li',
  '.checklist > li',
  '.reg > .reg__item',
  '.glance > .glance__item',
  '.caps > .cap',
  '.cards > .card',
  '.bgrid > li',
  '.fdetails > .fd',
];

const EXCLUDE = '.hero, .phead, .settle-in, [hidden]';
const STEP_MS = 70;
const MAX_STEPS = 6;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const candidates = new Set<HTMLElement>(document.querySelectorAll<HTMLElement>('.rv'));
for (const selector of [...SINGLES, ...REVEAL_GROUPS]) {
  for (const el of document.querySelectorAll<HTMLElement>(selector)) {
    if (!el.closest(EXCLUDE)) candidates.add(el);
  }
}

// Document order, so a batch staggers top-to-bottom, left-to-right.
const items = Array.from(candidates).sort((a, b) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
);

if (!reduce && items.length > 0 && 'IntersectionObserver' in window) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // One batched read before any write, so this costs a single layout.
  const tops = items.map((item) => item.getBoundingClientRect().top);
  const offscreen: HTMLElement[] = [];
  items.forEach((item, i) => {
    item.classList.add('rv');
    if ((tops[i] ?? 0) < viewportHeight) item.classList.add('in');
    else offscreen.push(item);
  });

  document.documentElement.classList.add('js-reveal');

  if (offscreen.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement);
        arriving.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        arriving.forEach((el, i) => {
          el.style.setProperty('--rv-delay', `${Math.min(i, MAX_STEPS) * STEP_MS}ms`);
          el.classList.add('in');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    for (const item of offscreen) observer.observe(item);
  }
}

/* This file is loaded as a module and has no imports or exports of its own,
   which would leave TypeScript treating it as a global script. The empty
   export makes it a module, so its scope is its own. */
export {};
