import type { IndustriesStrings } from '../en/industries';

/**
 * Chinese copy — industries.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const industries: IndustriesStrings = {
  'meta.industries.title': '行业 — Treteone',
  'meta.industries.description':
    '为石油天然气、炼化、电力、水泥、制造、钢铁、矿业、给排水及公共设施提供工业供应与采购。',

  // ---- industries ---------------------------------------------------------
  'industries.eyebrow': '行业',
  'industries.heading': '服务于不停运转的行业。',
  'industries.lede': '我们最常服务的行业。规格按工况匹配，而不是按目录。',
  'industries.count': (n: number) => `${n} 个行业`,
  'industries.listLabel': '行业',
  'industries.enquire': '索取报价',
  'industries.cardLabel': (name: string) => `为${name}索取报价`,
};
