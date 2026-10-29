/**
 * English copy — common. Key authority for this module: the Chinese module
 * src/i18n/zh/common.ts is typed against `typeof common`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const common = {
  // ---- document -----------------------------------------------------------
  'site.name': 'Treteone',
  'site.title': 'Treteone — Industrial supply and sourcing',
  'site.description':
    'Industrial supply and sourcing from Guangzhou, China. Spare parts, equipment and machinery for plants that cannot stop. Send a part number, a photo or a whole list.',

  // ---- header -------------------------------------------------------------
  'nav.label': 'Primary',
  'nav.products': 'Products',
  'nav.industries': 'Industries',
  'nav.sourcing': 'Sourcing',
  'nav.brands': 'Brands',
  'nav.about': 'About',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.skip': 'Skip to main content',
  'nav.home': 'Treteone — home',
  'nav.homeShort': 'Home',

  'lang.switchTo': (label: string) => `Switch to ${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': 'Request a quote',
  /** Short form of cta.quote, for the header pill on phones. */
  'cta.quoteShort': 'Quote',
  'cta.whatsapp': 'WhatsApp',

  // ---- image placeholder (ImagePlaceholder.astro) -------------------------
  // Every photography slot shows this until the real photograph is supplied.
  'placeholder.image': 'Image',
  'placeholder.label': (subject: string) => `Photograph to come: ${subject}`,

  // ---- footer -------------------------------------------------------------
  'footer.label': 'Footer',
  'footer.rights': (year: number, name: string) => `© ${year} ${name}`,
};

export type CommonStrings = typeof common;
