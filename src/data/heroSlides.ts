import { productsHref, sourcingHref } from '~/data/navigation';
import type { UIKey, UIStrings } from '~/i18n/ui';

/** Keys whose value is plain text (not a formatter function). */
export type TextKey = { [K in UIKey]: UIStrings[K] extends string ? K : never }[UIKey];

/**
 * The four panels of the homepage rolling hero (CLAUDE.md §6, approved
 * mockup #v-home). Order is the tab order.
 *
 * Copy lives in src/i18n/{en,zh}/home.ts; this file only says which strings
 * belong to which panel and where its one text link goes. The tab label is
 * the panel title — the mockup uses the same words for both.
 *
 * `subject` is what the photograph will show. Until Treteone's own photography
 * is supplied (§12) each panel renders ImagePlaceholder variant="hero" with it.
 */
export interface HeroSlide {
  /** Element id stem: hero-tab-<id>, hero-panel-<id>. */
  readonly id: string;
  readonly title: TextKey;
  readonly line: TextKey;
  readonly link: TextKey;
  readonly subject: TextKey;
  /** Site-root path; localised by the component. */
  readonly href: string;
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: 'spares',
    title: 'home.hero.spares.title',
    line: 'home.hero.spares.line',
    link: 'home.hero.spares.link',
    subject: 'home.hero.spares.subject',
    href: productsHref,
  },
  {
    id: 'equipment',
    title: 'home.hero.equipment.title',
    line: 'home.hero.equipment.line',
    link: 'home.hero.equipment.link',
    subject: 'home.hero.equipment.subject',
    href: productsHref,
  },
  {
    id: 'automation',
    title: 'home.hero.automation.title',
    line: 'home.hero.automation.line',
    link: 'home.hero.automation.link',
    subject: 'home.hero.automation.subject',
    href: productsHref,
  },
  {
    id: 'obsolete',
    title: 'home.hero.obsolete.title',
    line: 'home.hero.obsolete.line',
    link: 'home.hero.obsolete.link',
    subject: 'home.hero.obsolete.subject',
    href: sourcingHref,
  },
];
