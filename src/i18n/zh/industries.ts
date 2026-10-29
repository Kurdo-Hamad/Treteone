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

  // ---- /industries page head ----------------------------------------------
  'industries.page.kicker': (n: number) => `行业 · ${n} 个领域`,
  'industries.page.title': '按工况选型，而不是按目录。',
  'industries.page.lead':
    '同一个标称型号，用在渣浆里、酸性工况下或粉尘弥漫的窑线上，表现各不相同。下面列出各行业常询的物品，以及决定选型的工况信息。',
  'industries.rows.enquire': '询价',

  // ---- legacy (see the English module) ------------------------------------
  'industries.eyebrow': '行业',
  'industries.heading': '服务于不停运转的行业。',
  'industries.lede': '我们最常服务的行业。规格按工况匹配，而不是按目录。',
  'industries.count': (n: number) => `${n} 个行业`,
  'industries.listLabel': '行业',
  'industries.enquire': '索取报价',
  'industries.cardLabel': (name: string) => `为${name}索取报价`,
};
