import type { BrandsStrings } from '../en/brands';

/**
 * Chinese copy — brands.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const brands: BrandsStrings = {
  'meta.brands.title': '我们可采购的品牌 — Treteone',
  'meta.brands.description':
    '客户常询价的制造商品牌。我们并非所列任何品牌的授权经销商、代理或合作伙伴。',

  // ---- brands -------------------------------------------------------------
  // §13 — 措辞固定为「我们可采购的品牌」，不得暗示授权、代理或合作关系。
  'brands.eyebrow': '品牌',
  'brands.heading': '我们可采购的品牌',
  'brands.lede': '以下为常见需求品牌的部分列表。未列出的品牌请直接询问。',
  'brands.count': (n: number) => `列出 ${n} 个制造商`,
  'brands.listLabel': '我们可采购的制造商',
  'brands.ask': '询问其他品牌',
  'brands.disclaimer':
    '所有品牌名称及商标归各自所有者所有。除另有说明外，提及制造商并不表示我们获得其授权、代理或与其存在任何关联。',
};
