/**
 * ProductEcosystem (§7.3): the sticky desktop photograph follows whichever
 * category row is hovered or focused.
 *
 * Enhancement only. Every row is already a complete link with its own label,
 * and on a phone each row carries its own photograph, so nothing depends on
 * hover (§13). With this file absent the panel simply shows the first category.
 *
 * Focus drives it as well as the pointer, so a keyboard user tabbing down the
 * list gets the same picture a mouse user does (§11).
 */

const root = document.querySelector<HTMLElement>('[data-eco]');

if (root) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-eco-item]'));
  const figures = Array.from(root.querySelectorAll<HTMLElement>('[data-eco-figure]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-eco-cap]'));

  let current = 0;

  const show = (index: number): void => {
    if (index === current) return;
    current = index;
    items.forEach((item, i) => item.classList.toggle('is-on', i === index));
    figures.forEach((figure, i) => figure.classList.toggle('is-on', i === index));
    captions.forEach((caption, i) => caption.classList.toggle('is-on', i === index));
  };

  items.forEach((item, i) => {
    item.addEventListener('pointerenter', (event) => {
      // Touch sends pointerenter immediately before the click that navigates;
      // swapping a hidden panel then would only cost a repaint.
      if (event.pointerType === 'touch') return;
      show(i);
    });
    item.addEventListener('focus', () => show(i));
  });
}

/* A module, so its top-level names are its own. */
export {};
