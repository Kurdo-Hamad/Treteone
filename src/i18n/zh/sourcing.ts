import type { SourcingStrings } from '../en/sourcing';

/**
 * Chinese copy — sourcing.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const sourcing: SourcingStrings = {
  'meta.sourcing.title': '难寻件与停产件 — Treteone',
  'meta.sourcing.description':
    '停产、淘汰及无标识的工业备件。发送部件号、铭牌照片或清单，我们来查。询价处理的五个步骤。',

  // ---- /sourcing page head ------------------------------------------------
  'sourcing.page.kicker': '寻源 · 难寻件与停产件',
  'sourcing.page.title': '没有可用型号的部件，如何追溯。',
  'sourcing.page.lead':
    '询价到我们这里时，常规渠道通常已经走不通了。这项工作靠的是方法，而不是运气：先确定这个物品究竟是什么，再确定谁仍在生产能满足同样工况的产品。',

  // ---- the four definition blocks -----------------------------------------
  'sourcing.def.superseded.title': '已被替代的型号',
  'sourcing.def.superseded.body':
    '制造商会重新编号，产品系列也会在并购后转到别的品牌。今天查不到的型号，往往在两三个版本之前还是有效的，从原始型号通常可以追到现行的对应型号。',
  'sourcing.def.nameplate.title': '铭牌数据',
  'sourcing.def.nameplate.body':
    '机座号、额定参数、序列号和制造代码所包含的信息，比单一部件号多得多。一张清晰的铭牌照片，往往足以从零重建完整规格。',
  'sourcing.def.equivalents.title': '外形、安装与功能',
  'sourcing.def.equivalents.body':
    '原件确实已无从获得时，问题就变成：哪款现行产品在安装方式、工况和材质上与之相符。这类产品按替代件报价并明确标注——绝不冒充原件。',
  'sourcing.def.documentation.title': '技术文件',
  'sourcing.def.documentation.body':
    '制造商出具数据表、测试证书和材质证书的，我们随附提供。无法取得的，我们会在您下单之前说明，而不是之后。',

  // ---- navy "what to send" band -------------------------------------------
  'sourcing.what.kicker': '需要提供什么',
  'sourcing.what.title': '手上有什么就发什么。一张照片也算。',
  'sourcing.what.lead':
    '没有最低要求。有的询价只从一张模糊的铭牌照片开始，有的是一份四百行的物料清单，两者都由同一个团队处理。',
  'sourcing.what.cta': '开始询价',
  'sourcing.what.reference': '部件号或制造商型号，无论是否已被替代',
  'sourcing.what.nameplate': '设备型号、序列号和铭牌照片',
  'sourcing.what.drawing': '数据表、图纸、P&ID 节选或 PDF',
  'sourcing.what.boq': 'Excel 物料清单或多行询价清单',
  'sourcing.what.description': '文字描述——如果手上确实只有这些',

  // ---- five-step process --------------------------------------------------
  'process.kicker': '从需求到交付',
  'process.title': '点击发送之后会发生什么。',
  'process.stepLabel': (n: string) => `步骤 ${n}`,

};
