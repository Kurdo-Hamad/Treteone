import type { UIKey } from '~/i18n/ui';

/**
 * CLAUDE.md §3 — one definition drives the header, the mobile drawer and the
 * footer's Company column. Labels are UI chrome, so they are i18n keys, not
 * strings; `href` is a site-root path that localisePath() prefixes per route.
 *
 * ⚠ Pass 1 built the header, hero and footer only. Every anchor below except
 * the hero's own targets therefore points at a section that does not exist
 * yet, and those links currently jump nowhere. They resolve as the sections in
 * §6 land — products, scope, industries, sourcing, brands, about, quote.
 */
export interface NavItem {
  /** i18n key for the visible label. */
  readonly key: UIKey;
  /** Site-root path, including the section anchor. */
  readonly href: string;
}

export const primaryNav: readonly NavItem[] = [
  { key: 'nav.products', href: '/#products' },
  { key: 'nav.scope', href: '/#scope' },
  { key: 'nav.industries', href: '/#industries' },
  { key: 'nav.sourcing', href: '/#sourcing' },
  { key: 'nav.brands', href: '/#brands' },
  { key: 'nav.about', href: '/#about' },
];

/** The footer's "Company" column. */
export const companyNav: readonly NavItem[] = [
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.industries', href: '/#industries' },
  { key: 'nav.sourcing', href: '/#sourcing' },
  { key: 'nav.brands', href: '/#brands' },
  { key: 'cta.quote', href: '/#quote' },
];

export const homeHref = '/';
export const quoteHref = '/#quote';
export const productsHref = '/#products';
