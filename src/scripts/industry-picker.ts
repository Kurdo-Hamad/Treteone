/**
 * IndustryPicker (CLAUDE.md §6.7): 9 names, the photo panel swaps on hover,
 * click and keyboard focus. Real `tablist` semantics.
 *
 * "Real tablist" is the whole requirement, so this follows the WAI-ARIA tabs
 * pattern properly rather than putting tab roles on a list of buttons:
 *
 *   - roving tabindex — the tablist is ONE Tab stop, not nine. Tab moves past
 *     the whole control the way it does in every other tabbed interface;
 *   - arrow keys move between tabs, with Home and End for the ends;
 *   - automatic activation — selection follows focus, which is the right choice
 *     when the panels are already in the document and cost nothing to show;
 *   - each tab owns a real panel by id, and unselected panels are `hidden`, so
 *     they are out of the accessibility tree and out of the tab order.
 *
 * Hover selects too (§6.7) but deliberately does NOT move focus: a pointer
 * sweeping down the list should not steal the keyboard's place in the page.
 *
 * With no script the first tab and its panel are already marked selected in the
 * HTML, so one industry reads correctly and nothing is broken — there is just
 * no switching.
 */

const tablist = document.querySelector<HTMLElement>('[data-industry-tablist]');

if (tablist) {
  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[data-industry-tab]'));
  const panels = Array.from(
    document.querySelectorAll<HTMLElement>('[data-industry-panel]'),
  );

  if (tabs.length > 0 && tabs.length === panels.length) {
    let selected = 0;

    const select = (index: number, moveFocus: boolean): void => {
      const next = (index + tabs.length) % tabs.length;

      tabs.forEach((tab, i) => {
        const active = i === next;
        tab.setAttribute('aria-selected', String(active));
        // Roving tabindex: only the selected tab is reachable with Tab.
        tab.tabIndex = active ? 0 : -1;
      });

      panels.forEach((panel, i) => {
        panel.hidden = i !== next;
      });

      selected = next;
      if (moveFocus) tabs[next]?.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i, true));
      // Pointer preview. No focus change — see the note above.
      tab.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch') return; // touch already sends a click
        select(i, false);
      });
    });

    tablist.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      switch (event.key) {
        // The list is vertical on desktop and stacked on a phone, so both axes
        // are accepted rather than punishing a reasonable guess.
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          select(selected + 1, true);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          select(selected - 1, true);
          break;
        case 'Home':
          event.preventDefault();
          select(0, true);
          break;
        case 'End':
          event.preventDefault();
          select(tabs.length - 1, true);
          break;
        default:
      }
    });

    select(0, false);
    tablist.classList.add('is-live');
  }
}

/* This file is loaded as a module by its component and has no imports or
   exports of its own, which would leave TypeScript treating it as a global
   script — every top-level name shared with every other script in src/scripts.
   The empty export makes it a module, so its scope is its own. */
export {};
