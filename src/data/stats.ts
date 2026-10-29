import type { Localised } from '~/i18n/ui';

/**
 * The reply-time commitment (CLAUDE.md §12).
 *
 * The StatBand that used to render this was removed from the site in the
 * seven-route redesign (§7 — no count-up stat band). Nothing renders this file
 * today. It is kept because §12 names it as the place the business confirms a
 * reply time: until `confirmed` is true, no page may state one.
 *
 * If a confirmed figure is later shown anywhere, read it from here and render
 * it only when `confirmed` is true.
 */
export interface Commitment {
  readonly value: Localised;
  readonly label: Localised;
  /** false — §12 has not supplied or confirmed this figure. Never state it as fact. */
  readonly confirmed: boolean;
}

export const replyTime: Commitment = {
  value: { en: '1 working day', zh: '1个工作日' },
  label: { en: 'target reply to an enquiry', zh: '询价回复目标时间' },
  confirmed: false,
};
