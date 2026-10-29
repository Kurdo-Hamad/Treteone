import { categories } from '~/data/categories';
import { company } from '~/data/company';
import { industries } from '~/data/industries';
import type { Localised, UIKey } from '~/i18n/ui';

/**
 * The StatBand's four figures (CLAUDE.md §6.4 — "Only real numbers").
 *
 * Two of them are counted from the data that drives the rest of the site rather
 * than typed in, so the band cannot drift out of step with the product rail or
 * the industry picker. The third is where the company is.
 *
 * The fourth is a claim about how fast we answer, and §10 lists the real
 * reply-time commitment as still missing. It is carried here — the prototype's
 * figure, so the slot and the layout are right — but flagged `confirmed: false`,
 * which makes StatBand render it as a marked placeholder instead of a fact.
 * Setting that flag to true is a decision about the business, not the site.
 */
export interface Stat {
  readonly id: string;
  /** A number counts up on first view (§6.4). A Localised value is shown as-is. */
  readonly value: number | Localised;
  readonly labelKey: UIKey;
  /** false — §10 has not supplied or confirmed this figure. Never state it as fact. */
  readonly confirmed: boolean;
}

export const stats: readonly Stat[] = [
  {
    id: 'categories',
    value: categories.length,
    labelKey: 'stats.categories',
    confirmed: true,
  },
  {
    id: 'industries',
    value: industries.length,
    labelKey: 'stats.industries',
    confirmed: true,
  },
  {
    id: 'base',
    value: company.city,
    labelKey: 'stats.base',
    confirmed: true,
  },
  {
    id: 'reply',
    value: { en: '1 working day', zh: '1个工作日' },
    labelKey: 'stats.reply',
    confirmed: false,
  },
];
