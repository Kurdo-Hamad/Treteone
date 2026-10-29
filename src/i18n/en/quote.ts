/**
 * English copy — quote. Key authority for this module: the Chinese module
 * src/i18n/zh/quote.ts is typed against `typeof quote`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const quote = {
  'meta.quote.title': 'Request a quote — Treteone',
  'meta.quote.description':
    'Send a part number, a photo or a whole list. No account needed — only a contact is required.',

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
};

export type QuoteStrings = typeof quote;
