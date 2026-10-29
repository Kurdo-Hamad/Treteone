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
  // §13 — "Brands we source" is fixed wording. Never "authorised distributor",
  // "agent", "partner" or anything that implies them.
  //
  // 'brands.heading' is the homepage marquee heading and the directory's
  // accessible list name. The /brands h1 is the approved mockup's line.
  'brands.eyebrow': 'Brands',
  'brands.heading': 'Brands we source',
  'brands.title': 'The manufacturers buyers ask for by name.',
  'brands.lede':
    'Filter by discipline or type a name. The list reflects what is requested most often, not the limit of what can be sourced — if yours is missing, send the enquiry anyway. Logo artwork is pending; names are shown until it is supplied.',

  // Directory filter (approved mockup). The script fills {n}, {shown} and
  // {total}; it holds no copy of its own.
  'brands.search.label': 'Search manufacturer',
  'brands.filter.label': 'Filter by discipline',
  'brands.group.all': 'All',
  'brands.group.auto': 'Automation & instrumentation',
  'brands.group.rotating': 'Rotating & mechanical',
  'brands.group.fluid': 'Pneumatics & hydraulics',
  'brands.showingAll': (n: number) => `Showing all ${n} manufacturers`,
  'brands.showing': (shown: number, total: number) => `Showing ${shown} of ${total}`,
  /** The word in an empty logo slot. Decorative: the name sits beneath it. */
  'brands.logoSlot': 'Logo',

  'brands.none.title': 'Not on the list',
  'brands.none.body':
    'That does not mean we cannot source it. Send the manufacturer and the part number and we will come back on availability.',
  'brands.none.link': 'Send an enquiry',

  'brands.disclaimer':
    'Brand names and trademarks are the property of their respective owners. Unless stated otherwise, references to manufacturers do not imply authorisation, distributorship, agency or affiliation.',
};

export type BrandsStrings = typeof brands;
