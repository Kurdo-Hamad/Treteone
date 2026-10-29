/**
 * English UI copy. This module is the key authority: `UIKey` is derived from it,
 * so zh.ts cannot compile until it carries every key (CLAUDE.md §3 —
 * "all UI copy, typed against a shared key union").
 *
 * Deliberately NOT `as const`: the values must widen to `string` so the Chinese
 * dictionary can hold different text and still satisfy the same type.
 *
 * Product, industry and process copy is not here — it lives beside its data in
 * src/data/*.ts, because one definition has to drive the nav, the rail and the
 * footer at once (§3). This file is chrome only.
 */
export const en = {
  // ---- document -----------------------------------------------------------
  'site.name': 'Trete One',
  'site.title': 'Trete One — Industrial supply and sourcing',
  'site.description':
    'Industrial supply and sourcing from Guangzhou, China. Spare parts, equipment and machinery for plants that cannot stop. Send a part number, a photo or a whole list.',

  // ---- header -------------------------------------------------------------
  'nav.label': 'Primary',
  'nav.products': 'Products',
  'nav.scope': 'Scope',
  'nav.industries': 'Industries',
  'nav.sourcing': 'Hard-to-find',
  'nav.brands': 'Brands',
  'nav.about': 'About',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.skip': 'Skip to main content',
  'nav.home': 'Trete One — home',

  'lang.label': 'Language',
  'lang.switchTo': (label: string) => `Switch to ${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': 'Request a quote',
  'cta.sendRequirement': 'Send your requirement',
  'cta.browseProducts': 'Browse products',

  // ---- hero ---------------------------------------------------------------
  'hero.h1': 'Everything your operation needs.',
  'hero.lede':
    'From a single replacement bearing to complete industrial machinery — we identify the part, find the supplier and quote it.',
  'hero.region': 'Featured photography',
  'hero.slideLabel': (n: number, total: number) => `Show image ${n} of ${total}`,
  'hero.counter': (n: number, total: number) => `Image ${n} of ${total}`,

  // ---- ticker (§6.3) ------------------------------------------------------
  // The category names come from src/data/categories.ts. These three are the
  // extra phrases the prototype's strip carries alongside them.
  'ticker.hardToFind': 'Hard-to-find parts',
  'ticker.obsolete': 'Obsolete components',
  'ticker.globalSourcing': 'Global sourcing',

  // ---- stat band (§6.4) ---------------------------------------------------
  'stats.label': 'Trete One at a glance',
  'stats.categories': 'product categories',
  'stats.industries': 'industries served',
  'stats.base': 'China · supplying worldwide',
  'stats.reply': 'target reply to an enquiry',
  // §10 — shown in place of any figure the business has not confirmed.
  'stats.unconfirmed': 'Unconfirmed',
  'stats.unconfirmedNote': 'This figure has not been confirmed and is not a commitment.',

  // ---- product rail (§6.5) ------------------------------------------------
  'products.heading': 'Everything behind the plant.',
  'products.lede':
    'Twelve categories covering mechanical, electrical, automation, instrumentation and rotating equipment.',
  'products.railLabel': 'Product categories',
  'products.railHint': 'Use the left and right arrow keys to scroll through the categories.',
  'products.previous': 'Scroll to previous categories',
  'products.next': 'Scroll to next categories',
  'products.enquire': 'Enquire',
  'products.cardLabel': (name: string) => `${name} — send an enquiry`,

  // ---- scope scroller (§6.6) ----------------------------------------------
  'scope.heading': 'From the smallest component to a complete system.',
  'scope.lede': 'Scroll through the scope. The same team handles all five.',
  'scope.stepCount': (n: number, total: number) => `Stage ${n} of ${total}`,

  // ---- industry picker (§6.7) ---------------------------------------------
  'industries.heading': 'Built for the industries that keep moving.',
  'industries.lede': 'Pick a plant. We will match the specification to the duty.',
  'industries.listLabel': 'Industries',

  // ---- footer -------------------------------------------------------------
  'footer.blurb':
    'Industrial supply and sourcing. Spare parts, equipment and machinery for plants that cannot stop.',
  'footer.products': 'Products',
  'footer.company': 'Company',
  'footer.contact': 'Contact',
  'footer.address': 'Address',
  'footer.copyAddress': 'Copy address',
  'footer.copied': 'Address copied',
  'footer.copyFailed': 'Copy failed — select the address to copy it',
  'footer.registeredName': 'Registered name',
  'footer.licence': 'Business licence',
  'footer.rights': (year: number) => `© ${year} Trete One`,
  'footer.placeholder': 'To be supplied',
  'footer.whatsapp': 'WhatsApp',
  'footer.email': 'Email',
  'footer.phone': 'Phone',
};

export type UIStrings = typeof en;
export type UIKey = keyof UIStrings;
