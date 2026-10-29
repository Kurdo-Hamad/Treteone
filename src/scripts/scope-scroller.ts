/**
 * ScopeScroller (CLAUDE.md §6.6): the sticky image and its corner tag follow
 * whichever of the five stages is currently in view.
 *
 * There is nothing to operate here — it is prose with an illustration that
 * keeps up. Scrolling is the only input, which is why §9's keyboard requirement
 * is satisfied by the markup rather than by this file: every stage is an
 * ordinary heading and paragraph, reachable by Tab, Page Down or a screen
 * reader's own navigation, and the media column is `aria-hidden` because the
 * corner tag only repeats the stage heading beside it.
 *
 * Without this script the first frame and tag stay put and all five stages
 * still read normally. Under prefers-reduced-motion the swap is instant — the
 * CSS drops the crossfade — but it still tracks, because which stage you are
 * reading is information, not decoration.
 */

const root = document.querySelector<HTMLElement>('[data-scope]');

if (root && 'IntersectionObserver' in window) {
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-scope-step]'));
  const figures = Array.from(root.querySelectorAll<HTMLElement>('[data-scope-figure]'));
  const tags = Array.from(root.querySelectorAll<HTMLElement>('[data-scope-tag]'));

  if (steps.length > 0) {
    let current = -1;

    const show = (index: number): void => {
      if (index === current) return;
      current = index;

      steps.forEach((step, i) => step.classList.toggle('is-on', i === index));
      figures.forEach((figure, i) => figure.classList.toggle('is-on', i === index));
      tags.forEach((tag, i) => tag.classList.toggle('is-on', i === index));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset['index']);
          if (Number.isFinite(index)) show(index);
        }
      },
      // Half the step in view. Steps are tall enough on desktop that only one
      // can satisfy this at a time; on mobile they stack and shorten, and the
      // last one to cross still wins, which is the one being read.
      { threshold: 0.5 },
    );

    for (const step of steps) observer.observe(step);

    root.classList.add('is-live');
    show(0);
  }
}

/* This file is loaded as a module by its component and has no imports or
   exports of its own, which would leave TypeScript treating it as a global
   script — every top-level name shared with every other script in src/scripts.
   The empty export makes it a module, so its scope is its own. */
export {};
