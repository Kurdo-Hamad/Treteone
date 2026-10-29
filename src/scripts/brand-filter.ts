/**
 * /brands directory filter (approved mockup; CLAUDE.md §9).
 *
 * An enhancement, not the mechanism: BrandDirectory.astro renders every tile,
 * and this script only sets `hidden`. With it absent the full list is on the
 * page and the controls stay disabled, so nothing pretends to work.
 *
 * Holds no copy: the count messages arrive as data attributes with a {shown}
 * placeholder, rendered from src/i18n. No inline handlers (§10).
 */

const root = document.querySelector<HTMLElement>('[data-brand-filter]');

if (root) {
  const search = root.querySelector<HTMLInputElement>('[data-brand-search]');
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-brand-chip]'));
  const grid = root.querySelector<HTMLElement>('[data-brand-grid]');
  const count = root.querySelector<HTMLElement>('[data-brand-count]');
  const none = root.querySelector<HTMLElement>('[data-brand-none]');
  const tiles = grid ? Array.from(grid.querySelectorAll<HTMLElement>('li[data-n]')) : [];

  const msgAll = root.dataset['msgAll'] ?? '';
  const msgShowing = root.dataset['msgShowing'] ?? '';

  /** Case- and punctuation-insensitive: "endress hauser" finds Endress+Hauser. */
  const loose = (value: string): string =>
    value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();

  const keys = tiles.map((tile) => {
    const name = tile.dataset['n'] ?? '';
    return { name, loose: loose(name) };
  });

  let group = 'all';
  let lastMessage = count?.textContent ?? '';

  const apply = (): void => {
    const raw = (search?.value ?? '').trim().toLowerCase();
    const q = loose(raw);
    let shown = 0;

    tiles.forEach((tile, i) => {
      const key = keys[i];
      const okGroup = group === 'all' || tile.dataset['g'] === group;
      const okQuery =
        raw === '' || (key !== undefined && (key.name.includes(raw) || (q !== '' && key.loose.includes(q))));
      const on = okGroup && okQuery;
      tile.hidden = !on;
      if (on) shown += 1;
    });

    // Never an empty grid: no match swaps the grid for the "not on the list"
    // panel, which links to the enquiry form.
    if (grid) grid.hidden = shown === 0;
    if (none) none.hidden = shown > 0;

    const message = shown === tiles.length ? msgAll : msgShowing.replace('{shown}', String(shown));
    // Only write on change, so the polite live region is not re-announced for
    // keystrokes that leave the result as it was.
    if (count && message !== lastMessage) {
      count.textContent = message;
      lastMessage = message;
    }
  };

  chips.forEach((chip) => {
    chip.disabled = false;
    chip.addEventListener('click', () => {
      group = chip.dataset['brandChip'] ?? 'all';
      chips.forEach((other) => other.setAttribute('aria-pressed', String(other === chip)));
      apply();
    });
  });

  if (search) {
    search.disabled = false;
    search.addEventListener('input', apply);
    search.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && search.value !== '') {
        search.value = '';
        apply();
      }
    });
    // A value restored by the browser on back/forward is applied at once.
    if (search.value !== '') apply();
  }
}

/* Loaded as a module by its component; the empty export keeps its scope its
   own rather than global (see quote-form.ts). */
export {};
