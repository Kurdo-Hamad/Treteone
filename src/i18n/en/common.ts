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
  'nav.breadcrumb': 'Breadcrumb',

  'lang.label': 'Language',
  'lang.switchTo': (label: string) => `Switch to ${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': 'Request a quote',
  /** Short form of cta.quote, for the header pill on phones. */
  'cta.quoteShort': 'Quote',
  'cta.email': 'Email',
  'cta.whatsapp': 'WhatsApp',

  // ---- image placeholder (ImagePlaceholder.astro) -------------------------
  // Every photography slot shows this until the real photograph is supplied.
  'placeholder.image': 'Image',
  'placeholder.label': (subject: string) => `Photograph to come: ${subject}`,

  // ---- detail-page header -------------------------------------------------
  'page.meta': 'Page summary',

  // ---- closing CTA --------------------------------------------------------
  'closing.eyebrow': 'Request a quote',
  'closing.heading': 'Tell us what you need.',
  'closing.lede':
    'No account needed. Send a part number, a photo or a whole list — we reply with price and lead time.',
  'closing.direct': 'Or write to us directly',

  // ---- footer -------------------------------------------------------------
  'footer.address': 'Address',
  'footer.registeredName': 'Registered name',
  'footer.licence': 'Business licence',
  'footer.label': 'Footer',
  'footer.rights': (year: number, name: string) => `© ${year} ${name}`,
  'footer.placeholder': 'To be supplied',
  'footer.whatsapp': 'WhatsApp',
  'footer.email': 'Email',
  'footer.phone': 'Phone',
};

export type CommonStrings = typeof common;
