/**
 * StatBand count-up (CLAUDE.md §6.4 — "numbers count up on first view").
 *
 * Decoration only. Every figure is already in the HTML at its final value, so
 * the band is correct with JavaScript off, correct if this file fails to load,
 * and correct under prefers-reduced-motion (§9) — where it simply never runs.
 *
 * Each figure animates once, the first time it is seen, and is then unobserved.
 */

const values = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

if (values.length > 0 && 'IntersectionObserver' in window) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DURATION = 900;

  const countUp = (element: HTMLElement, target: number): void => {
    const start = performance.now();

    const frame = (now: number): void => {
      const progress = Math.min((now - start) / DURATION, 1);
      // easeOutCubic: fast enough to read as a count, settled before it nags.
      const eased = 1 - (1 - progress) ** 3;
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(frame);
      else element.textContent = String(target);
    };

    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);

        const target = Number(element.dataset['count']);
        if (!Number.isFinite(target)) continue;
        if (reduceMotion.matches) continue; // the final value is already there

        countUp(element, target);
      }
    },
    { threshold: 0.6 },
  );

  for (const element of values) observer.observe(element);
}
