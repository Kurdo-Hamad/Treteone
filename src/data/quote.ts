import type { UIKey } from '~/i18n/ui';

/**
 * Shape and limits of the quote form (CLAUDE.md §7).
 *
 * ⚠ These numbers exist a second time in functions/api/quote.ts, because §7
 * requires the same rules to be applied server side and a Cloudflare Pages
 * Function is bundled separately from the site — it cannot import from src/.
 * The function's copy is marked with the same warning. Change both.
 *
 * The client reads these through data attributes rendered by QuoteForm.astro,
 * so the browser script holds no numbers of its own.
 */
export const QUOTE_LIMITS = {
  /** §7 — "Max 10 MB per file, 5 files." */
  maxFiles: 5,
  maxFileBytes: 10 * 1024 * 1024,

  /**
   * NOT in §7, and a deliberate addition: 5 x 10 MB is 50 MB, which no email
   * provider will accept — base64 inflates attachments by a third, and the
   * usual ceiling is 25-40 MB. Without a total cap a valid-looking submission
   * would be accepted by the form and then bounce, which is the worst possible
   * outcome for §1. 20 MB encodes to roughly 27 MB and gets through.
   */
  maxTotalBytes: 20 * 1024 * 1024,

  /**
   * §7 — the timing half of "honeypot field plus a timing check". A person
   * cannot read the form, attach a datasheet and submit inside three seconds.
   */
  minSecondsBeforeSubmit: 3,
} as const;

/** What the file input offers and what both sides accept. */
export const ACCEPTED_EXTENSIONS = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.heic',
  '.heif',
  '.xls',
  '.xlsx',
  '.csv',
] as const;

export const ACCEPT_ATTRIBUTE = [...ACCEPTED_EXTENSIONS, 'image/*'].join(',');

export interface EnquiryType {
  readonly slug: string;
  readonly key: UIKey;
}

/**
 * §7's "type" field. The server treats an unrecognised value as "other" rather
 * than rejecting it: no enquiry is ever lost to a mismatch in this list.
 */
export const enquiryTypes: readonly EnquiryType[] = [
  { slug: 'spare-part', key: 'quote.type.sparePart' },
  { slug: 'equipment', key: 'quote.type.equipment' },
  { slug: 'machinery', key: 'quote.type.machinery' },
  { slug: 'automation', key: 'quote.type.automation' },
  { slug: 'instrumentation', key: 'quote.type.instrumentation' },
  { slug: 'other', key: 'quote.type.other' },
];

/** Where the form posts. A Cloudflare Pages Function at the repo root. */
export const QUOTE_ENDPOINT = '/api/quote';

export const mb = (bytes: number): number => Math.round(bytes / (1024 * 1024));
