import type { UIStrings } from './en';

/**
 * Chinese UI copy.
 *
 * ⚠ CLAUDE.md §10 — this is the prototype's first-pass Chinese, carried over
 * unchanged. It has NOT been reviewed by a native speaker and must be before
 * launch. Listed in the README as outstanding content.
 *
 * Typed as UIStrings, so a missing or misspelled key fails `npm run check`.
 */
export const zh: UIStrings = {
  // ---- document -----------------------------------------------------------
  'site.name': 'Trete One',
  'site.title': 'Trete One — 工业供应与采购',
  'site.description':
    '总部位于中国广州的工业供应与采购公司。为不能停机的工厂提供备件、设备与机械。发送部件号、照片或整份清单即可询价。',

  // ---- header -------------------------------------------------------------
  'nav.label': '主导航',
  'nav.products': '产品',
  'nav.scope': '供应范围',
  'nav.industries': '行业',
  'nav.sourcing': '难寻备件',
  'nav.brands': '品牌',
  'nav.about': '关于我们',
  'nav.openMenu': '打开菜单',
  'nav.closeMenu': '关闭菜单',
  'nav.skip': '跳到主要内容',
  'nav.home': 'Trete One — 首页',

  'lang.label': '语言',
  'lang.switchTo': (label: string) => `切换到${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': '索取报价',
  'cta.sendRequirement': '提交需求',
  'cta.browseProducts': '浏览产品',

  // ---- hero ---------------------------------------------------------------
  'hero.h1': '工厂运转所需，我们都能供应。',
  'hero.lede':
    '从一只轴承到整套工业设备，我们负责确认型号、寻找供应商并给出报价。',
  'hero.region': '专题图片',
  'hero.slideLabel': (n: number, total: number) => `显示第 ${n} 张，共 ${total} 张`,
  'hero.counter': (n: number, total: number) => `第 ${n} 张，共 ${total} 张`,

  // ---- ticker (§6.3) ------------------------------------------------------
  'ticker.hardToFind': '难寻备件',
  'ticker.obsolete': '停产件',
  'ticker.globalSourcing': '全球寻源',

  // ---- stat band (§6.4) ---------------------------------------------------
  'stats.label': 'Trete One 概览',
  'stats.categories': '产品大类',
  'stats.industries': '服务行业',
  'stats.base': '中国 · 全球供应',
  'stats.reply': '询价回复目标时间',
  'stats.unconfirmed': '待确认',
  'stats.unconfirmedNote': '此数据尚未确认，不构成承诺。',

  // ---- product rail (§6.5) ------------------------------------------------
  'products.heading': '工厂背后的一切。',
  'products.lede': '十二个大类，覆盖机械、电气、自动化、仪器仪表与旋转设备。',
  'products.railLabel': '产品大类',
  'products.railHint': '使用左右方向键浏览各个大类。',
  'products.previous': '滚动到上一组大类',
  'products.next': '滚动到下一组大类',
  'products.enquire': '询价',
  'products.cardLabel': (name: string) => `${name} — 提交询价`,

  // ---- scope scroller (§6.6) ----------------------------------------------
  'scope.heading': '从最小的零件到整套系统。',
  'scope.lede': '向下滚动查看供应范围。五个层级由同一团队负责。',
  'scope.stepCount': (n: number, total: number) => `第 ${n} 级，共 ${total} 级`,

  // ---- industry picker (§6.7) ---------------------------------------------
  'industries.heading': '服务于不停运转的行业。',
  'industries.lede': '选择您的行业，我们按工况匹配规格。',
  'industries.listLabel': '行业',

  // ---- sourcing band (§6.8) -----------------------------------------------
  'sourcing.heading': '找不到备件？把型号给我们。',
  'sourcing.lede':
    '停产件、老旧自动化系统、无标识铸件，甚至只有一张铭牌照片——把您手上的资料发给我们，我们来查。',
  'sourcing.cta': '上传需求',
  'sourcing.checklistLabel': '需要提供的资料',
  'sourcing.send.partNumber': '部件号或制造商编号',
  'sourcing.send.nameplate': '设备型号与铭牌照片',
  'sourcing.send.datasheet': '技术数据表、图纸或PDF',
  'sourcing.send.boq': 'Excel清单或多项询价',
  'sourcing.send.description': '只有文字描述也可以',

  // ---- brand marquee (§6.9) -----------------------------------------------
  // §11 — 措辞固定为「我们可采购的品牌」，不得暗示授权、代理或合作关系。
  'brands.heading': '我们可采购的品牌',
  'brands.lede': '以下为常见需求品牌的部分列表。未列出的品牌请直接询问。',
  'brands.listLabel': '我们可采购的制造商',
  'brands.disclaimer':
    '所有品牌名称及商标归各自所有者所有。除另有说明外，提及制造商并不表示我们获得其授权、代理或与其存在任何关联。',

  // ---- process timeline (§6.10) -------------------------------------------
  'process.heading': '从需求到交付。',
  'process.stepCount': (n: number, total: number) => `第 ${n} 步，共 ${total} 步`,

  // ---- about (§6.11) ------------------------------------------------------
  'about.heading': '客户选择我们的原因',
  'about.lede':
    'Trete One 是一家位于中国广州的工业供应与采购公司，服务于各类工厂的维修与采购团队。',

  // ---- quote form (§6.12, §7) ---------------------------------------------
  'quote.heading': '告诉我们您的需求。',
  'quote.lede': '无需注册。发送部件号、照片或整份清单，我们会回复价格与交期。',
  'quote.directIntro': '也可直接联系我们：',
  'quote.formLabel': '索取报价',

  'quote.type.label': '您需要什么？',
  'quote.type.sparePart': '备件',
  'quote.type.equipment': '设备',
  'quote.type.machinery': '机械',
  'quote.type.automation': '自动化',
  'quote.type.instrumentation': '仪器仪表',
  'quote.type.other': '其他',

  'quote.part.label': '部件号或描述',
  'quote.manufacturer.label': '制造商',
  'quote.quantity.label': '数量',
  'quote.files.label': '上传数据表、照片或清单',
  'quote.files.hint': (maxFiles: number, maxMb: number, totalMb: number) =>
    `支持 PDF、图片、Excel 或 CSV。最多 ${maxFiles} 个文件，单个不超过 ${maxMb} MB，合计不超过 ${totalMb} MB。`,
  'quote.files.selected': (n: number) => `已选择 ${n} 个文件`,
  'quote.notes.label': '其他需要说明的信息',
  'quote.name.label': '姓名与公司',
  'quote.contact.label': '邮箱或WhatsApp',
  'quote.contact.hint': '便于我们回复报价。其余信息均非必填。',
  'quote.optional': '选填',
  'quote.submit': '提交需求',
  'quote.sending': '提交中…',

  'quote.honeypot.label': '公司网站',

  'quote.success.title': '需求已收到。',
  'quote.success.body': '我们已收到您的询价，并会通过您提供的联系方式回复。',
  'quote.success.reference': '您的查询编号',
  'quote.error.title': '提交失败。',
  'quote.error.body': (email: string) =>
    `我们这边出现了问题。请直接发送邮件至 ${email}——您的询价比这个表单重要。`,
  'quote.error.contactRequired': '请填写邮箱或WhatsApp号码，以便我们回复。',
  'quote.error.tooManyFiles': (max: number) => `最多只能上传 ${max} 个文件。`,
  'quote.error.fileTooLarge': (name: string, max: number) =>
    `${name} 超过 ${max} MB，请通过邮件单独发送。`,
  'quote.error.totalTooLarge': (max: number) =>
    `附件合计超过 ${max} MB，其余请通过邮件发送。`,
  'quote.error.badType': (name: string) =>
    `${name} 的文件类型不受支持。仅支持 PDF、图片、Excel 与 CSV。`,

  // ---- footer -------------------------------------------------------------
  'footer.blurb': '工业供应与采购。为不能停机的工厂提供备件、设备与机械。',
  'footer.products': '产品',
  'footer.company': '公司',
  'footer.contact': '联系方式',
  'footer.address': '地址',
  'footer.copyAddress': '复制地址',
  'footer.copied': '地址已复制',
  'footer.copyFailed': '复制失败 — 请手动选择地址复制',
  'footer.registeredName': '注册名称',
  'footer.licence': '统一社会信用代码',
  'footer.rights': (year: number) => `© ${year} Trete One`,
  'footer.placeholder': '待补充',
  'footer.whatsapp': 'WhatsApp',
  'footer.email': '邮箱',
  'footer.phone': '电话',
};
