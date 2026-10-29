import type { Localised } from '~/i18n/ui';

/**
 * Company facts. Everything a visitor uses to answer "are these people real?"
 * (CLAUDE.md §1) sits in one file so it can be checked in one place.
 *
 * ⚠ §10 — do not invent any of this. Fields marked `PENDING` render as a
 * clearly-marked placeholder and are listed in the README. They must be filled
 * from the actual business licence before launch.
 */

/** Marks a value that is not yet known. Nothing may guess one of these. */
export const PENDING = null;
export type Pending = typeof PENDING;

export interface Address {
  readonly latin: string;
  readonly hanzi: string;
  /** Both forms, for the copy button and for a maps search. */
  readonly combined: string;
}

const address: Address = {
  latin: 'Room G063, 5th Floor, No. 80-86 Xizeng Road, Liwan District, Guangzhou, China',
  hanzi: '广州市荔湾区西增路80-86号5、6楼（自编五楼）G063',
  combined:
    'Room G063, 5th Floor, No. 80-86 Xizeng Road, Liwan District, Guangzhou, China\n广州市荔湾区西增路80-86号5、6楼（自编五楼）G063',
};

export const company = {
  tradingName: 'Treteone',

  /** Registered company name, as supplied by the client. */
  registeredName: 'Guangzhou Treteone Trading Co., Ltd.',
  /** §12 — registered Chinese company name. Not yet supplied. */
  registeredNameZh: PENDING as string | Pending,
  /** §10 — business licence (统一社会信用代码). Not yet supplied. */
  licenceNumber: PENDING as string | Pending,

  city: {
    en: 'Guangzhou',
    zh: '广州',
  } satisfies Localised,

  district: {
    en: 'Guangzhou · Liwan District',
    zh: '广州 · 荔湾区',
  } satisfies Localised,

  address,

  email: 'sales@treteone.com',
  /** E.164, for tel: and wa.me links. */
  phoneE164: '+8619540094137',
  /** Display form. */
  phoneDisplay: '+86 195 4009 4137',
  whatsappUrl: 'https://wa.me/8619540094137',
} as const;

export const telHref = `tel:${company.phoneE164}`;
export const mailHref = `mailto:${company.email}`;
