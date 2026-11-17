/**
 * Brand marquee pause/play (§7.8, WCAG 2.2.2 Pause, Stop, Hide).
 *
 * The rows move by CSS. This only toggles .is-paused on the section, which
 * pauses both rows, and keeps the button's label in step.
 * Labels come from data attributes rendered from src/i18n, so the script
 * holds no copy.
 */

const section = document.querySelector<HTMLElement>('[data-marquee]');
const button = section?.querySelector<HTMLButtonElement>('[data-marquee-pp]');

if (section && button) {
  const labelPause = button.dataset['labelPause'] ?? '';
  const labelPlay = button.dataset['labelPlay'] ?? '';

  button.addEventListener('click', () => {
    const paused = section.classList.toggle('is-paused');
    // The label names what the button will do next, as the hero's does.
    button.setAttribute('aria-label', paused ? labelPlay : labelPause);
  });
}

/* A module of its own, so its names do not leak into the global scope. */
export {};
