import type { UIKey } from '~/i18n/ui';

/**
 * CLAUDE.md §3 — one definition drives the header, the mobile drawer and the
 * footer's Company column. Labels are i18n keys; `href` is a site-root path
 * that localisePath() prefixes per route.
 *
 * ⚠ Redesign pass 1 points everything at the seven §3 routes. Only `/` exists
 * until pass 2 builds the other six, so every link below except home 404s in
 * this build.
 */
export interface NavItem {
  /** i18n key for the visible label. */
  readonly key: UIKey;
  /** Site-root path. */
  readonly href: string;
}

export const homeHref = '/';
export const productsHref = '/products';
export const industriesHref = '/industries';
export const sourcingHref = '/sourcing';
export const brandsHref = '/brands';
export const aboutHref = '/about';
export const quoteHref = '/quote';

/** Header and drawer. Home is the wordmark; the quote route is the CTA. */
export const primaryNav: readonly NavItem[] = [
  { key: 'nav.products', href: productsHref },
  { key: 'nav.industries', href: industriesHref },
  { key: 'nav.sourcing', href: sourcingHref },
  { key: 'nav.brands', href: brandsHref },
  { key: 'nav.about', href: aboutHref },
];

/** The footer's "Company" column. */
export const companyNav: readonly NavItem[] = [
  { key: 'nav.about', href: aboutHref },
  { key: 'nav.industries', href: industriesHref },
  { key: 'nav.sourcing', href: sourcingHref },
  { key: 'nav.brands', href: brandsHref },
  { key: 'cta.quote', href: quoteHref },
];
