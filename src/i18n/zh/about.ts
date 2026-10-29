import type { AboutStrings } from '../en/about';

/**
 * Chinese copy — about.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 *
 * The registered Chinese company name has not been supplied (§12), so the
 * English registered name is used wherever the company is named in full.
 */
export const about: AboutStrings = {
  'meta.about.title': '关于我们 — Treteone',
  'meta.about.description':
    'Treteone 是一家位于中国广州的工业供应与采购公司。我们的工作方式、供应范围与公司信息。',

  // ---- /about page head ---------------------------------------------------
  'about.page.kicker': '关于我们',
  'about.page.title': '一家读得懂规格的工业供应公司。',
  'about.page.lead': (name: string) =>
    `${name} 是一家在广州市荔湾区注册的贸易公司，服务于停不起机的工厂的维修与采购团队。询价由看得懂数据表的人处理，而不是交给目录搜索。`,

  // ---- the six definition blocks ------------------------------------------
  'about.def.specification.title': '我们从规格出发',
  'about.def.specification.body': '依据部件号、设备型号和数据表——而不是输入搜索框的产品名称。',
  'about.def.brandNeutral.title': '不绑定单一品牌',
  'about.def.brandNeutral.body': '我们报价的是适合工况的制造商，而不是恰好经手的某一个品牌。',
  'about.def.hardToFind.title': '难寻件是日常工作',
  'about.def.hardToFind.body': '停产和淘汰的部件在这里是常规业务，而不是特殊需求。',
  'about.def.oneChannel.title': '一个渠道，覆盖全部范围',
  'about.def.oneChannel.body': '单件采购和整份物料清单，都由同一个团队、同一位联系人处理。',
  'about.def.documentation.title': '有文件就提供文件',
  'about.def.documentation.body': '制造商出具证书和数据表的，我们随附提供；没有的，事先说明。',
  'about.def.registered.title': '一家注册公司',
  'about.def.registered.body': (name: string) => `${name}——注册名称和地址刊载于每一页的页脚。`,

  // ---- registered-details band --------------------------------------------
  'about.registered.title': '注册信息',
  'about.registered.name': '注册名称',
  'about.registered.enquiries': '询价联系',
  'about.registered.address': '注册地址',

  // ---- legacy (see the English module) ------------------------------------
  'about.eyebrow': '关于我们',
  'about.title': '工业供应与采购，立足广州。',
  'about.heading': '客户选择我们的原因',
  'about.lede':
    'Treteone 是一家位于中国广州的工业供应与采购公司，服务于各类工厂的维修与采购团队。',
  'about.details.heading': '公司信息',
  'about.details.lede': '下单之前，买家应当能够核实的信息。',
};
