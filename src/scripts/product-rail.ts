/**
 * ProductRail (CLAUDE.md §6.5): horizontal, drag / scroll / arrow keys, snap
 * points, progress bar.
 *
 * The rail scrolls natively — CSS `overflow-x` plus `scroll-snap-type` — so it
 * already works with this file absent: touch, trackpad, a mouse wheel and Tab
 * all move it. Everything below is addition, not foundation.
 *
 * §9 requires it to be fully keyboard-operable, which means three things:
 *   - the scroll container is focusable and labelled, so a keyboard user can
 *     reach it and arrow through it like any scrollable region;
 *   - arrow keys work whether focus is on the rail or on a card inside it;
 *   - the prev/next buttons are real buttons, not decoration.
 */

const rail = document.querySelector<HTMLElement>('[data-rail]');

if (rail) {
  const previous = document.querySelector<HTMLButtonElement>('[data-rail-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-rail-next]');
  const progress = document.querySelector<HTMLElement>('[data-rail-progress]');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = (): ScrollBehavior => (reduceMotion.matches ? 'auto' : 'smooth');

  /** One card plus the gap between cards, read from the DOM so CSS stays authoritative. */
  const cardStep = (): number => {
    const card = rail.querySelector<HTMLElement>('[data-rail-card]');
    if (!card) return rail.clientWidth;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return card.offsetWidth + gap;
  };

  const maxScroll = (): number => rail.scrollWidth - rail.clientWidth;

  const scrollByCards = (count: number): void => {
    rail.scrollBy({ left: cardStep() * count, behavior: behavior() });
  };

  /* -- progress bar ------------------------------------------------------ */

  const updateProgress = (): void => {
    const max = maxScroll();

    if (progress) {
      // Thumb width mirrors how much of the rail is on screen; its offset
      // mirrors how far along we are. Both are percentages of the track.
      const visible = rail.scrollWidth > 0 ? (rail.clientWidth / rail.scrollWidth) * 100 : 100;
      const travelled = max > 0 ? rail.scrollLeft / max : 0;
      progress.style.width = `${visible}%`;
      progress.style.insetInlineStart = `${travelled * (100 - visible)}%`;
    }

    // A control that cannot do anything should say so rather than look broken.
    if (previous) previous.disabled = rail.scrollLeft <= 1;
    if (next) next.disabled = rail.scrollLeft >= max - 1;
  };

  rail.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* -- buttons ----------------------------------------------------------- */

  previous?.addEventListener('click', () => scrollByCards(-2));
  next?.addEventListener('click', () => scrollByCards(2));

  /* -- keyboard ---------------------------------------------------------- */

  rail.addEventListener('keydown', (event) => {
    // Let a modified key do whatever the browser normally does with it.
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        scrollByCards(1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        scrollByCards(-1);
        break;
      case 'Home':
      case 'End':
        // Only when the rail itself has focus. If the visitor is tabbing
        // through the cards, Home and End still belong to the page.
        if (event.target !== rail) return;
        event.preventDefault();
        rail.scrollTo({ left: event.key === 'Home' ? 0 : maxScroll(), behavior: behavior() });
        break;
      default:
    }
  });

  /* -- drag -------------------------------------------------------------- */

  /**
   * Past this many pixels the gesture is a drag, not a click. Without it,
   * dragging across a card and letting go would follow that card's link — the
   * classic way a draggable carousel of links misfires.
   */
  const DRAG_THRESHOLD = 8;

  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

  rail.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    // Mouse only. Touch and pen already get native horizontal scrolling with
    // momentum and rubber-banding; reimplementing that in JavaScript would
    // fight `touch-action` and come out worse. §11 makes the phone the primary
    // visitor, so the phone keeps the behaviour the phone is good at.
    if (event.pointerType !== 'mouse') return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    dragged = false;
  });

  rail.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId) return;

    const travelled = event.clientX - startX;
    if (!dragged && Math.abs(travelled) < DRAG_THRESHOLD) return;

    if (!dragged) {
      dragged = true;
      rail.classList.add('is-dragging');
      // Take the pointer so the drag survives leaving the rail, and so the
      // browser stops trying to select text or drag the image underneath.
      rail.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    rail.scrollLeft = startScroll - travelled;
  });

  const endDrag = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    pointerId = null;
    rail.classList.remove('is-dragging');
    // `dragged` is left set: the click event fires after this and is swallowed
    // by the capture-phase listener below, which then resets it.
  };

  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);

  rail.addEventListener(
    'click',
    (event) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    },
    { capture: true },
  );

  rail.classList.add('is-live');
  // Reveals the prev/next buttons, which are hidden until there is a script to
  // make them do something.
  document.querySelector('[data-rail-root]')?.classList.add('is-live');
}
