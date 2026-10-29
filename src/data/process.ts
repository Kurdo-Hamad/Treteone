import type { Localised } from '~/i18n/ui';

/**
 * The 5 sourcing steps (CLAUDE.md §3), shown on /sourcing by ProcessSteps.
 * Wording is the approved mockup's, verbatim ("What happens after you press
 * send."). The older ProcessTimeline component reads the same array.
 *
 * These describe how an enquiry is handled, not what is promised about it —
 * §11 forbids faking certifications or numbers, and there are none here. No
 * timings are claimed: the reply-time commitment is still unconfirmed (§10) and
 * lives, marked as such, in src/data/stats.ts.
 */
export interface ProcessStep {
  readonly slug: string;
  readonly name: Localised;
  readonly description: Localised;
}

export const processSteps: readonly ProcessStep[] = [
  {
    slug: 'identify',
    name: { en: 'Identify', zh: '确认' },
    description: {
      en: 'We confirm the exact item, flag anything ambiguous, and come back with one question rather than five.',
      zh: '我们确认准确的物品，标出含糊之处，只问一个关键问题，而不是五个。',
    },
  },
  {
    slug: 'source',
    name: { en: 'Source', zh: '寻源' },
    description: {
      en: 'Manufacturers and specialist suppliers are approached directly, including for items no longer listed.',
      zh: '直接联系制造商和专业供应商，包括已不在产品目录中的物品。',
    },
  },
  {
    slug: 'verify',
    name: { en: 'Verify', zh: '核验' },
    description: {
      en: 'Specification, available documentation and the supplier itself are checked before a price is issued.',
      zh: '在报价之前，核对规格、可获得的技术文件以及供应商本身。',
    },
  },
  {
    slug: 'quote',
    name: { en: 'Quote', zh: '报价' },
    description: {
      en: 'Price and lead time, with any equivalent marked as an equivalent and the trade-off stated plainly.',
      zh: '提供价格和交期；任何替代件都明确标注为替代件，并直接说明取舍。',
    },
  },
  {
    slug: 'deliver',
    name: { en: 'Deliver', zh: '交付' },
    description: {
      en: 'One contact stays with the order from purchase order through to arrival.',
      zh: '从下达采购订单到货物到达，由同一位联系人全程跟进。',
    },
  },
];
