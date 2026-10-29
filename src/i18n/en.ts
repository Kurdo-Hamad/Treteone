/**
 * English UI copy. This module is the key authority: `UIKey` is derived from it,
 * so zh.ts cannot compile until it carries every key (CLAUDE.md §3 —
 * "all UI copy, typed against a shared key union").
 *
 * Deliberately NOT `as const`: the values must widen to `string` so the Chinese
 * dictionary can hold different text and still satisfy the same type.
 *
 * Product, industry and process copy is not here — it lives beside its data in
 * src/data/*.ts, because one definition drives several routes at once (§3).
 */
export const en = {
  // ---- document -----------------------------------------------------------
  'site.name': 'Trete One',
  'site.title': 'Trete One — Industrial supply and sourcing',
  'site.description':
    'Industrial supply and sourcing from Guangzhou, China. Spare parts, equipment and machinery for plants that cannot stop. Send a part number, a photo or a whole list.',

  // One title and description per route (§3).
  'meta.products.title': 'Products — Trete One',
  'meta.products.description':
    'Twelve industrial product categories sourced from Guangzhou: automation, instrumentation, electrical, motors and drives, pumps, compressors, valves, MRO spares and more.',
  'meta.industries.title': 'Industries — Trete One',
  'meta.industries.description':
    'Industrial supply and sourcing for oil and gas, refining, power, cement, manufacturing, steel, mining, water and facilities.',
  'meta.sourcing.title': 'Hard-to-find and obsolete parts — Trete One',
  'meta.sourcing.description':
    'Obsolete, discontinued and unmarked industrial parts. Send a part number, a nameplate photo or a BOQ and we investigate it. How an enquiry is handled, in five steps.',
  'meta.brands.title': 'Brands we source — Trete One',
  'meta.brands.description':
    'Manufacturers most often requested from Trete One. We are not an authorised distributor, agent or partner of any brand listed.',
  'meta.about.title': 'About — Trete One',
  'meta.about.description':
    'Trete One is an industrial supply and sourcing company in Guangzhou, China. How we work, what we supply and our company details.',
  'meta.quote.title': 'Request a quote — Trete One',
  'meta.quote.description':
    'Send a part number, a photo or a whole list. No account needed — only a contact is required.',

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
  'nav.home': 'Trete One — home',
  'nav.homeShort': 'Home',
  'nav.breadcrumb': 'Breadcrumb',

  'lang.label': 'Language',
  'lang.switchTo': (label: string) => `Switch to ${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': 'Request a quote',
  'cta.email': 'Email',
  'cta.whatsapp': 'WhatsApp',

  // ---- hero ---------------------------------------------------------------
  // §6 locked copy. Uppercase on the eyebrow and buttons is applied in CSS.
  'hero.eyebrow': 'Industrial supply & sourcing',
  'hero.h1': 'The Parts, Equipment & Technology Behind Industry.',
  'hero.lede':
    'From critical spare parts to complete industrial equipment, we source and supply what keeps industrial operations running.',
  'hero.ctaProducts': 'Explore products',
  'hero.ctaQuote': 'Request a quote',
  'hero.ctaSourcing': 'Can’t find a part?',
  'hero.scrollCue': 'Explore Trete One',
  'hero.region': 'Featured photography',
  'hero.slideLabel': (n: number, total: number) => `Show image ${n} of ${total}`,

  // ---- homepage (§7) ------------------------------------------------------
  'home.position.label': 'About Trete One',
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

  // ---- detail-page header -------------------------------------------------
  'page.meta': 'Page summary',

  // ---- closing CTA --------------------------------------------------------
  'closing.eyebrow': 'Request a quote',
  'closing.heading': 'Tell us what you need.',
  'closing.lede':
    'No account needed. Send a part number, a photo or a whole list — we reply with price and lead time.',
  'closing.direct': 'Or write to us directly',

  // ---- products (/products) -----------------------------------------------
  'products.eyebrow': 'Products',
  'products.heading': 'Everything behind the plant.',
  'products.lede':
    'Twelve categories covering mechanical, electrical, automation, instrumentation and rotating equipment.',
  'products.count': (n: number) => `${n} categories`,
  'products.listLabel': 'Product categories',
  'products.enquire': 'Request a quote',
  'products.cardLabel': (name: string) => `Request a quote for ${name}`,
  'products.notListed.heading': 'Not on the list?',
  'products.notListed.body':
    'These are the categories most often requested, not the limit of what we look for. Send the part number and we will investigate it.',
  'products.notListed.cta': 'Hard-to-find parts',

  // ---- scope ladder (/about) ----------------------------------------------
  'scope.heading': 'From the smallest component to a complete system.',
  'scope.lede': 'Scroll through the scope. The same team handles all five.',
  'scope.stepCount': (n: number, total: number) => `Stage ${n} of ${total}`,

  // ---- industries (/industries) -------------------------------------------
  'industries.eyebrow': 'Industries',
  'industries.heading': 'Built for the industries that keep moving.',
  'industries.lede':
    'The sectors we most often source for. The specification is matched to the duty, not to a catalogue.',
  'industries.count': (n: number) => `${n} industries`,
  'industries.listLabel': 'Industries',
  'industries.enquire': 'Request a quote',
  'industries.cardLabel': (name: string) => `Request a quote for ${name}`,

  // ---- sourcing (/sourcing) -----------------------------------------------
  'sourcing.eyebrow': 'Sourcing',
  'sourcing.heading': 'Can’t find the part? Give us the number.',
  'sourcing.lede':
    'Obsolete, discontinued, legacy automation, unmarked castings, or just a photo of a nameplate — send whatever you have and we will investigate it.',
  'sourcing.cta': 'Upload your requirement',
  'sourcing.checklistLabel': 'What to send',
  'sourcing.checklistLede': 'Any one of these is enough to start an enquiry.',
  'sourcing.send.partNumber': 'Part number or manufacturer reference',
  'sourcing.send.nameplate': 'Equipment model and nameplate photo',
  'sourcing.send.datasheet': 'Datasheet, drawing or PDF',
  'sourcing.send.boq': 'Excel BOQ or multi-line request',
  'sourcing.send.description': 'A description, if that is all you have',

  // ---- process (/sourcing) ------------------------------------------------
  'process.heading': 'From requirement to delivery.',
  'process.lede': 'What happens to an enquiry, first to last.',
  'process.stepCount': (n: number, total: number) => `Step ${n} of ${total}`,

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

  // ---- about (/about) -----------------------------------------------------
  'about.eyebrow': 'About',
  'about.title': 'Industrial supply and sourcing, from Guangzhou.',
  'about.heading': 'Why buyers work with us',
  'about.lede':
    'Trete One is an industrial supply and sourcing company based in Guangzhou, China, working with maintenance and procurement teams in demanding plants.',
  'about.details.heading': 'Company details',
  'about.details.lede': 'The details a buyer should be able to check before placing an order.',

  // ---- quote form (/quote, §8) --------------------------------------------
  // The only conversion point on the site. Every string here is load-bearing.
  'quote.eyebrow': 'Request a quote',
  'quote.heading': 'Tell us what you need.',
  'quote.lede':
    'No account needed. Send a part number, a photo or a whole list — we reply with price and lead time.',
  'quote.directIntro': 'Prefer to write directly?',
  'quote.required': 'Only the contact field is required.',
  'quote.processLink': 'What happens after you send',
  'quote.formLabel': 'Request a quote',

  'quote.type.label': 'What do you need?',
  'quote.type.sparePart': 'Spare part',
  'quote.type.equipment': 'Equipment',
  'quote.type.machinery': 'Machinery',
  'quote.type.automation': 'Automation',
  'quote.type.instrumentation': 'Instrumentation',
  'quote.type.other': 'Other',

  'quote.part.label': 'Part number or description',
  'quote.manufacturer.label': 'Manufacturer',
  'quote.quantity.label': 'Quantity',
  'quote.files.label': 'Attach a datasheet, photo or BOQ',
  'quote.files.hint': (maxFiles: number, maxMb: number, totalMb: number) =>
    `PDF, images, Excel or CSV. Up to ${maxFiles} files, ${maxMb} MB each, ${totalMb} MB in total.`,
  'quote.files.selected': (n: number) => (n === 1 ? '1 file attached' : `${n} files attached`),
  'quote.notes.label': 'Anything else we should know',
  'quote.name.label': 'Name and company',
  'quote.contact.label': 'Email or WhatsApp',
  'quote.contact.hint': 'So we can send you the quote. Nothing else is required.',
  'quote.optional': 'optional',
  'quote.submit': 'Send request',
  'quote.sending': 'Sending…',

  // Honeypot (§8). Never seen by a person; a bot that fills it is discarded.
  'quote.honeypot.label': 'Company website',

  'quote.success.title': 'Request received.',
  'quote.success.body': 'We have your enquiry and will reply to the contact you gave.',
  'quote.success.reference': 'Your reference',
  'quote.error.title': 'That did not send.',
  'quote.error.body': (email: string) =>
    `Something went wrong at our end. Please email ${email} directly — your enquiry matters more than this form.`,
  'quote.error.contactRequired': 'Please add an email address or WhatsApp number so we can reply.',
  'quote.error.tooManyFiles': (max: number) => `Please attach no more than ${max} files.`,
  'quote.error.fileTooLarge': (name: string, max: number) =>
    `${name} is larger than ${max} MB. Please send it separately by email.`,
  'quote.error.totalTooLarge': (max: number) =>
    `The attachments come to more than ${max} MB in total. Please send the rest by email.`,
  'quote.error.badType': (name: string) =>
    `${name} is not a file type we can accept. PDF, images, Excel and CSV only.`,

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
