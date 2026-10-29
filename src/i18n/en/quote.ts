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
    'No account, ever. Send a part number, a photograph or a whole list and we reply with price and lead time.',
  'quote.directIntro': 'Prefer to write directly?',
  'quote.required': 'Only the contact field is required.',
  'quote.processLink': 'What happens after you send',
  'quote.formLabel': 'Request a quote',

  'quote.type.label': 'What do you need',
  'quote.type.sparePart': 'Spare part',
  'quote.type.equipment': 'Equipment',
  'quote.type.machinery': 'Machinery',
  'quote.type.automation': 'Automation',
  'quote.type.instrumentation': 'Instrumentation',
  'quote.type.other': 'Other',

  'quote.part.label': 'Part number or description',
  'quote.manufacturer.label': 'Manufacturer',
  'quote.quantity.label': 'Quantity',
  'quote.files.label': 'Attachments',
  // The aside's FILES line, and the file input's accessible description.
  'quote.files.hint': (maxFiles: number, maxMb: number, totalMb: number) =>
    `PDF, images and Excel. Up to ${maxFiles} files, ${maxMb} MB each, ${totalMb} MB in total.`,
  'quote.files.selected': (n: number) => (n === 1 ? '1 file attached' : `${n} files attached`),
  'quote.notes.label': 'Anything else we should know',
  'quote.name.label': 'Name and company',
  'quote.contact.label': 'Email or WhatsApp — required',
  'quote.contact.hint': 'So we can send you the quote. Nothing else is required.',
  'quote.optional': 'optional',
  'quote.submit': 'Send request',
  'quote.hint':
    'Only the contact field is required. A blurred nameplate photograph and a way to reach you is enough to start.',

  // Placeholders (approved mockup). Examples, never defaults.
  'quote.part.placeholder': '6ES7 214-1AG40-0XB0',
  'quote.manufacturer.placeholder': 'Siemens',
  'quote.quantity.placeholder': '4',
  'quote.notes.placeholder': 'Duty, service conditions, required date, destination',

  // The aside's three lines beside the form (approved mockup #v-quote). The
  // keys are upper-cased by CSS, so a screen reader says the word.
  'quote.aside.files': 'Files',
  'quote.aside.reply': 'Reply',
  'quote.aside.replyBefore': 'You receive a reference in the form',
  // Same shape as reference() in functions/api/quote.ts: TO-YYYYMMDD-XXXXX.
  'quote.aside.replyExample': 'TO-20261026-K7Q3M',
  'quote.aside.replyAfter': 'to quote back to us.',
  'quote.aside.direct': 'Direct',
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
