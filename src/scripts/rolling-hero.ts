/**
 * RollingHero (CLAUDE.md §6.2): five photographs, a crossfade with a slow zoom,
 * a frame counter, a localised caption and one progress bar per frame.
 *
 * §9 — under prefers-reduced-motion nothing advances on its own. The dots still
 * work, so the content stays reachable; it just never moves unasked.
 *
 * The cadence comes from --hero-interval in tokens.css, which also drives the
 * progress-bar animation, so the bar and the timer cannot drift apart.
 */

const root = document.querySelector<HTMLElement>('[data-hero]');

if (root) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-slide]'));
  const metas = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-meta]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** --hero-interval is authored in seconds; the timer needs milliseconds. */
  const intervalMs = (() => {
    const raw = getComputedStyle(root).getPropertyValue('--hero-interval').trim();
    const value = parseFloat(raw);
    if (!Number.isFinite(value) || value <= 0) return 6000;
    return raw.endsWith('ms') ? value : value * 1000;
  })();

  let index = 0;
  let timer: number | undefined;
  let inView = true;

  const show = (next: number): void => {
    if (slides.length === 0) return;
    index = (next + slides.length) % slides.length;

    slides.forEach((slide, i) => slide.classList.toggle('is-on', i === index));

    metas.forEach((meta, i) => {
      const active = i === index;
      meta.classList.toggle('is-on', active);
      // Only the visible caption should reach a screen reader.
      meta.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.setAttribute('aria-current', active ? 'true' : 'false');

      // Restart the fill from zero. Re-assigning the animation and forcing a
      // reflow is what makes it replay when the same dot is picked twice.
      const fill = dot.querySelector<HTMLElement>('[data-hero-fill]');
      if (!fill) return;
      fill.style.animation = 'none';
      void fill.offsetWidth;
      fill.style.animation = '';
    });
  };

  const stop = (): void => {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  const start = (): void => {
    stop();
    if (reduceMotion.matches) return;
    if (!inView || document.hidden) return;
    if (slides.length < 2) return;
    timer = window.setInterval(() => show(index + 1), intervalMs);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      start();
    });
  });

  // Don't burn a timer, a crossfade and a zoom on a hero nobody is looking at.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(root);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) stop();
    else start();
  });

  root.classList.add('is-live');
  show(0);
  start();
}
