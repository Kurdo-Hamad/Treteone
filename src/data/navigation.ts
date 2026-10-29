import type { UIKey } from '~/i18n/ui';

/**
 * CLAUDE.md §3 — the seven routes, and the one definition that drives the
 * header, the mobile drawer, the footer and every internal link.
 *
 * Paths carry their trailing slash. The build writes directory-format pages
 * (products/index.html), so `/products/` is the address Cloudflare serves
 * without a redirect hop. localisePath() adds the /zh prefix per route.
 */
export interface NavItem {
  /** i18n key for the visible label. */
  readonly key: UIKey;
  /** Site-root path. */
  readonly href: string;
}

export const homeHref = '/';
export const productsHref = '/products/';
export const industriesHref = '/industries/';
export const sourcingHref = '/sourcing/';
export const brandsHref = '/brands/';
export const aboutHref = '/about/';
export const quoteHref = '/quote/';

/** A category's own entry on /products. The slug is the element id there. */
export const categoryHref = (slug: string): string => `${productsHref}#${slug}`;
/** An industry's own entry on /industries. */
export const industryHref = (slug: string): string => `${industriesHref}#${slug}`;

/** Header and drawer, in the approved mockup's order. Home is listed as well
 *  as being the wordmark. The quote route is the CTA pill, not a nav item. */
export const primaryNav: readonly NavItem[] = [
  { key: 'nav.homeShort', href: homeHref },
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

/** The compact footer's single row of links (approved mockup). */
export const footerNav: readonly NavItem[] = [
  { key: 'nav.products', href: productsHref },
  { key: 'nav.industries', href: industriesHref },
  { key: 'nav.sourcing', href: sourcingHref },
  { key: 'nav.brands', href: brandsHref },
  { key: 'nav.about', href: aboutHref },
  { key: 'cta.quote', href: quoteHref },
];
