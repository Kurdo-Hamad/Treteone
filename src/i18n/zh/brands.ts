import type { BrandsStrings } from '../en/brands';

/**
 * Chinese copy — brands.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`. Brand names are proper nouns and are not translated.
 */
export const brands: BrandsStrings = {
  'meta.brands.title': '我们可采购的品牌 — Treteone',
  'meta.brands.description':
    '客户常询价的制造商品牌。我们并非所列任何品牌的授权经销商、代理或合作伙伴。',

  // ---- brands -------------------------------------------------------------
  // §13 — 措辞固定为「我们可采购的品牌」，不得暗示授权、代理或合作关系。
  'brands.eyebrow': '品牌',
  'brands.heading': '我们可采购的品牌',
  'brands.title': '买家点名询价的制造商。',
  'brands.lede':
    '可按专业类别筛选，或直接输入名称。此列表反映的是最常见的询价需求，而非我们可采购范围的上限——如果您需要的品牌不在其中，照样可以发来询价。品牌标志图稿尚待提供，在此之前仅显示名称。',
  'brands.count': (n: number) => `列出 ${n} 个制造商`,
  'brands.listLabel': '我们可采购的制造商',
  'brands.ask': '询问其他品牌',

  'brands.search.label': '搜索制造商',
  'brands.filter.label': '按专业类别筛选',
  'brands.group.all': '全部',
  'brands.group.auto': '自动化与仪器仪表',
  'brands.group.rotating': '旋转与机械设备',
  'brands.group.fluid': '气动与液压',
  'brands.showingAll': (n: number) => `显示全部 ${n} 个制造商`,
  'brands.showing': (shown: number, total: number) => `显示 ${shown} 个，共 ${total} 个`,
  'brands.logoSlot': '标志',

  'brands.none.title': '不在列表中',
  'brands.none.body':
    '这并不代表我们无法采购。请发来制造商名称和部件号，我们会就供货情况回复您。',
  'brands.none.link': '发送询价',

  'brands.disclaimer':
    '所有品牌名称及商标归各自所有者所有。除另有说明外，提及制造商并不表示我们获得其授权、代理或与其存在任何关联。',
};
