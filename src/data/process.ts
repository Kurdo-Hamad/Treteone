import type { Localised } from '~/i18n/ui';

/**
 * The 5 sourcing steps (CLAUDE.md §3), driving the ProcessTimeline (§6.10).
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
      en: 'We confirm the exact part or specification from whatever you send.',
      zh: '根据您提供的资料确认准确型号或规格。',
    },
  },
  {
    slug: 'source',
    name: { en: 'Source', zh: '寻源' },
    description: {
      en: 'We approach manufacturers and specialist suppliers in our network.',
      zh: '向网络内的制造商与专业供应商询价。',
    },
  },
  {
    slug: 'verify',
    name: { en: 'Verify', zh: '核验' },
    description: {
      en: 'Specification, documentation and supplier are checked before quoting.',
      zh: '报价前核对规格、文件与供应商资质。',
    },
  },
  {
    slug: 'quote',
    name: { en: 'Quote', zh: '报价' },
    description: {
      en: 'You get price, lead time and the alternatives worth considering.',
      zh: '提供价格、交期与可考虑的替代方案。',
    },
  },
  {
    slug: 'deliver',
    name: { en: 'Deliver', zh: '交付' },
    description: {
      en: 'One contact stays with the order from purchase to arrival.',
      zh: '由同一联系人跟进订单直至到货。',
    },
  },
];
