/**
 * Homepage rolling hero (CLAUDE.md §6, approved mockup #v-home).
 *
 * Four tab panels, 7s each. Every panel is complete in the HTML; this script
 * only moves the selection — it never writes copy, so translations stay in
 * src/i18n and the page reads correctly with JS off (panel one stays up).
 *
 * Tablist per the WAI-ARIA tabs pattern: aria-selected, roving tabindex,
 * Left/Right (wrapping), Home and End. Selection follows focus.
 *
 * Timing: one setTimeout per panel, with the time remaining carried across a
 * pause, so the cyan progress segment (a CSS animation on --hero-dwell) and
 * the advance stay in step — pausing halfway and resuming finishes the same
 * segment rather than restarting the clock under it.
 *
 * It halts, without the visitor asking, when the hero is off-screen, when the
 * tab is hidden, and while keyboard focus is on the panel's link (so the link
 * a visitor is about to follow never fades out from under them).
 *
 * §11 — under prefers-reduced-motion it starts paused on panel one with the
 * play icon showing. Pressing play is an explicit request, so it is honoured.
 */

const root = document.querySelector<HTMLElement>('[data-hero]');

if (root) {
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-panel]'));
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-hero-tab]'));
  const stage = panels[0]?.parentElement ?? null;
  const pp = root.querySelector<HTMLButtonElement>('[data-hero-pp]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** --hero-dwell is authored on .hero in seconds (or ms). */
  const dwellMs = ((): number => {
    const raw = getComputedStyle(root).getPropertyValue('--hero-dwell').trim();
    const value = parseFloat(raw);
    if (!Number.isFinite(value) || value <= 0) return 7000;
    return raw.endsWith('ms') ? value : value * 1000;
  })();

  let index = 0;
  let userPaused = reduceMotion.matches;
  let offscreen = false;
  let focusInside = false;

  let timer: number | undefined;
  let startedAt = 0;
  let remaining = dwellMs;

  const segOf = (i: number): HTMLElement | null =>
    tabs[i]?.querySelector<HTMLElement>('.hero__seg') ?? null;

  const running = (): boolean =>
    panels.length > 1 && !userPaused && !offscreen && !focusInside && !document.hidden;

  const halt = (): void => {
    if (timer === undefined) return;
    window.clearTimeout(timer);
    timer = undefined;
    remaining = Math.max(0, remaining - (performance.now() - startedAt));
  };

  const arm = (): void => {
    const seg = segOf(index);
    // A segment that has not run yet starts its fill now; one that was halted
    // mid-way keeps .is-run and simply resumes when .is-halted comes off.
    if (seg && !seg.classList.contains('is-run')) seg.classList.add('is-run');
    startedAt = performance.now();
    timer = window.setTimeout(() => {
      timer = undefined;
      select(index + 1);
    }, remaining);
  };

  /** Reconcile the clock and the classes with the current state. */
  const update = (): void => {
    const go = running();
    if (go && timer === undefined) arm();
    else if (!go) halt();
    root.classList.toggle('is-halted', !go);
    root.classList.toggle('is-paused', userPaused);
  };

  function select(next: number, focus = false): void {
    if (panels.length === 0) return;
    index = (next + panels.length) % panels.length;

    panels.forEach((panel, i) => panel.classList.toggle('is-on', i === index));
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      segOf(i)?.classList.remove('is-run');
    });
    if (focus) tabs[index]?.focus();

    // Fresh panel, fresh clock. The forced reflow lets the fill animation
    // restart from zero even when the same segment is chosen again.
    window.clearTimeout(timer);
    timer = undefined;
    remaining = dwellMs;
    void stage?.offsetWidth;
    update();
  }

  /* -- tabs ------------------------------------------------------------------ */
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (event) => {
      let next: number | null = null;
      if (event.key === 'ArrowRight') next = index + 1;
      else if (event.key === 'ArrowLeft') next = index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      select(next, true);
    });
  });

  /* -- pause / play ---------------------------------------------------------- */
  const setPaused = (paused: boolean): void => {
    userPaused = paused;
    if (pp) {
      const label = paused ? pp.dataset['labelPlay'] : pp.dataset['labelPause'];
      if (label) pp.setAttribute('aria-label', label);
    }
    update();
  };
  pp?.addEventListener('click', () => setPaused(!userPaused));

  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) setPaused(true);
  });

  /* -- halts the visitor did not ask for ------------------------------------- */
  if (stage) {
    stage.addEventListener('focusin', () => {
      focusInside = true;
      update();
    });
    stage.addEventListener('focusout', (event) => {
      const to = event.relatedTarget;
      if (to instanceof Node && stage.contains(to)) return;
      focusInside = false;
      update();
    });
  }

  document.addEventListener('visibilitychange', update);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        offscreen = !entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    ).observe(root);
  }

  root.classList.add('is-live');
  setPaused(userPaused);
}

/* This file is loaded as a module by its component. The empty export keeps
   TypeScript treating it as a module, so its top-level names stay its own. */
export {};
