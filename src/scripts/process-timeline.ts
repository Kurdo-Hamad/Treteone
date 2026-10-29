/**
 * ProcessTimeline (/sourcing): the connecting line fills as the five steps come
 * into view.
 *
 * The fill is decoration over content that is already complete — all five steps
 * are ordinary headings and paragraphs in the HTML, in order, so the section
 * reads correctly with this file absent, and every knot is legible either way.
 *
 * §11 — under prefers-reduced-motion the line is drawn full immediately by CSS
 * and this script does not run, so nothing grows, slides or fades.
 */

const root = document.querySelector<HTMLElement>('[data-process]');

if (root && 'IntersectionObserver' in window) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!reduceMotion.matches) {
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-process-step]'));
    const fill = root.querySelector<HTMLElement>('[data-process-fill]');

    if (steps.length > 0) {
      // CSS leaves the line full so a broken bundle cannot leave the timeline
      // looking unfinished. Taking it back to zero is this script's first act,
      // and only once it is certain to run.
      root.classList.add('is-live');

      let reached = -1;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const index = Number((entry.target as HTMLElement).dataset['index']);
            if (!Number.isFinite(index) || index <= reached) continue;
            reached = index;

            // The line only ever advances. A step you have read stays read.
            for (let i = 0; i <= index; i += 1) steps[i]?.classList.add('is-on');
            if (fill) fill.style.width = `${((index + 1) / steps.length) * 100}%`;
          }
        },
        { threshold: 0.5 },
      );

      for (const step of steps) observer.observe(step);
    }
  }
}

/* A module, so its top-level names are its own. */
export {};
