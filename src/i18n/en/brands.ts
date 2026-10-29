/**
 * English copy — brands. Key authority for this module: the Chinese module
 * src/i18n/zh/brands.ts is typed against `typeof brands`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const brands = {
  'meta.brands.title': 'Brands we source — Treteone',
  'meta.brands.description':
    'Manufacturers most often requested from Treteone. We are not an authorised distributor, agent or partner of any brand listed.',

  // ---- brands (/brands) ---------------------------------------------------
  // §13 — this wording is fixed. Never "authorised distributor", "agent",
  // "partner" or anything that implies them.
  'brands.eyebrow': 'Brands',
  'brands.heading': 'Brands we source',
  'brands.lede':
    'A selection of the manufacturers most often requested. If yours is not listed, ask.',
  'brands.count': (n: number) => `${n} manufacturers listed`,
  'brands.listLabel': 'Manufacturers we source',
  'brands.ask': 'Ask about another brand',
  'brands.disclaimer':
    'Brand names and trademarks are the property of their respective owners. Unless stated otherwise, references to manufacturers do not imply authorisation, distributorship, agency or affiliation.',
};

export type BrandsStrings = typeof brands;
