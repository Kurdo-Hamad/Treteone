/**
 * English copy — home. Key authority for this module: the Chinese module
 * src/i18n/zh/home.ts is typed against `typeof home`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const home = {
  // ---- hero ---------------------------------------------------------------
  // §6 locked copy. Uppercase on the eyebrow and buttons is applied in CSS.
  'hero.eyebrow': 'Industrial supply & sourcing',
  'hero.h1': 'The Parts, Equipment & Technology Behind Industry.',
  'hero.lede':
    'From critical spare parts to complete industrial equipment, we source and supply what keeps industrial operations running.',
  'hero.ctaProducts': 'Explore products',
  'hero.ctaQuote': 'Request a quote',
  'hero.ctaSourcing': 'Can’t find a part?',
  'hero.scrollCue': 'Explore Treteone',
  'hero.region': 'Featured photography',
  'hero.slideLabel': (n: number, total: number) => `Show image ${n} of ${total}`,

  // ---- homepage (§7) ------------------------------------------------------
  'home.position.label': 'About Treteone',
  'home.position.statement':
    'An industrial supply and sourcing company in Guangzhou, finding the parts, equipment and systems that plants run on — from a single component to a complete line.',
  'home.position.base': 'Guangzhou, China',
  'home.position.categories': (n: number) => `${n} product categories`,
  'home.position.industries': (n: number) => `${n} industries`,
  'home.position.link': 'How we work',

  'home.eco.eyebrow': 'Product ecosystem',
  'home.eco.heading': 'From control systems to consumables.',
  'home.eco.explore': 'Explore',
  'home.eco.linkLabel': (name: string) => `Explore ${name}`,
  'home.eco.all': 'All product categories',

  'home.industries.eyebrow': 'Industries',
  'home.industries.also': 'Also',
  'home.industries.all': (n: number) => `All ${n} industries`,

  'home.sourcing.eyebrow': 'Hard-to-find & obsolete',
  'home.sourcing.sendLabel': 'Any one of these is enough',
  'home.sourcing.cta': 'Send a part number',
  'home.sourcing.link': 'What to send, and how it works',

  'home.brands.all': 'All brands',
};

export type HomeStrings = typeof home;
