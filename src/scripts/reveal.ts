/**
 * Scroll reveal for anything marked `.rv` (§9 — frozen under reduced motion).
 *
 * Two things this deliberately gets right, both of which are easy to get wrong:
 *
 * 1. **Content is never hidden by CSS alone.** `.rv` only becomes invisible
 *    once this script has added `js-reveal` to <html>. If the script never
 *    loads, or IntersectionObserver is missing, everything stays visible. A
 *    marketing site that hides its own copy when a bundle 404s has failed at
 *    the one job in §1.
 *
 * 2. **Nothing already on screen flickers.** This module is deferred, so the
 *    page has usually painted by the time it runs. Hiding everything and
 *    waiting for the observer's first callback would blink the content the
 *    visitor is already looking at. So anything currently in the viewport is
 *    marked `.in` *before* `js-reveal` goes on: those elements go straight from
 *    visible to visible, and only off-screen elements are ever hidden.
 */

const items = Array.from(document.querySelectorAll<HTMLElement>('.rv'));

if (items.length > 0 && 'IntersectionObserver' in window) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // One batched read, before any write, so this costs a single layout.
  const offscreen = items.filter((item) => {
    const { top } = item.getBoundingClientRect();
    if (top < viewportHeight) {
      item.classList.add('in');
      return false;
    }
    return true;
  });

  document.documentElement.classList.add('js-reveal');

  if (offscreen.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    for (const item of offscreen) observer.observe(item);
  }
}
