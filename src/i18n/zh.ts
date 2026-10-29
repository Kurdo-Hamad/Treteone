import type { UIStrings } from './en';

/**
 * Chinese UI copy.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese. The prototype's strings are carried
 * over; everything added for the seven-route redesign is a first translation
 * too. None of it has been reviewed by a native speaker, and all of it must be
 * before launch. Listed in the README as outstanding content.
 *
 * Typed as UIStrings, so a missing or misspelled key fails `npm run check`.
 */
export const zh: UIStrings = {
  // ---- document -----------------------------------------------------------
  'site.name': 'Trete One',
  'site.title': 'Trete One — 工业供应与采购',
  'site.description':
    '总部位于中国广州的工业供应与采购公司。为不能停机的工厂提供备件、设备与机械。发送部件号、照片或整份清单即可询价。',

  'meta.products.title': '产品 — Trete One',
  'meta.products.description':
    '十二个工业产品大类：自动化、仪器仪表、电气、电机与传动、泵、压缩机、阀门、MRO备件等。',
  'meta.industries.title': '行业 — Trete One',
  'meta.industries.description':
    '为石油天然气、炼化、电力、水泥、制造、钢铁、矿业、给排水及公共设施提供工业供应与采购。',
  'meta.sourcing.title': '难寻件与停产件 — Trete One',
  'meta.sourcing.description':
    '停产、淘汰及无标识的工业备件。发送部件号、铭牌照片或清单，我们来查。询价处理的五个步骤。',
  'meta.brands.title': '我们可采购的品牌 — Trete One',
  'meta.brands.description':
    '客户常询价的制造商品牌。我们并非所列任何品牌的授权经销商、代理或合作伙伴。',
  'meta.about.title': '关于我们 — Trete One',
  'meta.about.description':
    'Trete One 是一家位于中国广州的工业供应与采购公司。我们的工作方式、供应范围与公司信息。',
  'meta.quote.title': '索取报价 — Trete One',
  'meta.quote.description': '发送部件号、照片或整份清单。无需注册，只需留下联系方式。',

  // ---- header -------------------------------------------------------------
  'nav.label': '主导航',
  'nav.products': '产品',
  'nav.industries': '行业',
  'nav.sourcing': '寻源采购',
  'nav.brands': '品牌',
  'nav.about': '关于我们',
  'nav.openMenu': '打开菜单',
  'nav.closeMenu': '关闭菜单',
  'nav.skip': '跳到主要内容',
  'nav.home': 'Trete One — 首页',
  'nav.homeShort': '首页',
  'nav.breadcrumb': '面包屑导航',

  'lang.label': '语言',
  'lang.switchTo': (label: string) => `切换到${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': '索取报价',
  'cta.email': '邮箱',
  'cta.whatsapp': 'WhatsApp',

  // ---- hero ---------------------------------------------------------------
  'hero.eyebrow': '工业供应与采购',
  'hero.h1': '驱动工业的零部件、设备与技术。',
  'hero.lede':
    '从关键备件到成套工业设备，我们采购并供应保障工业运行所需的一切。',
  'hero.ctaProducts': '浏览产品',
  'hero.ctaQuote': '索取报价',
  'hero.ctaSourcing': '找不到备件？',
  'hero.scrollCue': '了解 Trete One',
  'hero.region': '专题图片',
  'hero.slideLabel': (n: number, total: number) => `显示第 ${n} 张，共 ${total} 张`,

  // ---- homepage -----------------------------------------------------------
  'home.position.label': '关于 Trete One',
  'home.position.statement':
    '一家位于广州的工业供应与采购公司，为工厂寻找赖以运转的零部件、设备与系统——从单个零件到整条产线。',
  'home.position.base': '中国广州',
  'home.position.categories': (n: number) => `${n} 个产品大类`,
  'home.position.industries': (n: number) => `${n} 个行业`,
  'home.position.link': '我们的工作方式',

  'home.eco.eyebrow': '产品体系',
  'home.eco.heading': '从控制系统到工业耗材。',
  'home.eco.explore': '查看',
  'home.eco.linkLabel': (name: string) => `查看${name}`,
  'home.eco.all': '全部产品大类',

  'home.industries.eyebrow': '行业',
  'home.industries.also': '以及',
  'home.industries.all': (n: number) => `全部 ${n} 个行业`,

  'home.sourcing.eyebrow': '难寻件与停产件',
  'home.sourcing.sendLabel': '以下任一资料即可',
  'home.sourcing.cta': '发送部件号',
  'home.sourcing.link': '需要提供什么，以及处理流程',

  'home.brands.all': '全部品牌',

  'page.meta': '页面概要',

  // ---- closing CTA --------------------------------------------------------
  'closing.eyebrow': '索取报价',
  'closing.heading': '告诉我们您的需求。',
  'closing.lede': '无需注册。发送部件号、照片或整份清单，我们会回复价格与交期。',
  'closing.direct': '也可直接联系我们',

  // ---- products -----------------------------------------------------------
  'products.eyebrow': '产品',
  'products.heading': '工厂背后的一切。',
  'products.lede': '十二个大类，覆盖机械、电气、自动化、仪器仪表与旋转设备。',
  'products.count': (n: number) => `${n} 个大类`,
  'products.listLabel': '产品大类',
  'products.enquire': '索取报价',
  'products.cardLabel': (name: string) => `为${name}索取报价`,
  'products.notListed.heading': '列表里没有？',
  'products.notListed.body':
    '以上是最常询价的大类，并非我们寻源的全部范围。把部件号发给我们，我们来查。',
  'products.notListed.cta': '难寻件寻源',

  // ---- scope ladder -------------------------------------------------------
  'scope.heading': '从最小的零件到整套系统。',
  'scope.lede': '向下滚动查看供应范围。五个层级由同一团队负责。',
  'scope.stepCount': (n: number, total: number) => `第 ${n} 级，共 ${total} 级`,

  // ---- industries ---------------------------------------------------------
  'industries.eyebrow': '行业',
  'industries.heading': '服务于不停运转的行业。',
  'industries.lede': '我们最常服务的行业。规格按工况匹配，而不是按目录。',
  'industries.count': (n: number) => `${n} 个行业`,
  'industries.listLabel': '行业',
  'industries.enquire': '索取报价',
  'industries.cardLabel': (name: string) => `为${name}索取报价`,

  // ---- sourcing -----------------------------------------------------------
  'sourcing.eyebrow': '寻源采购',
  'sourcing.heading': '找不到备件？把型号给我们。',
  'sourcing.lede':
    '停产件、老旧自动化系统、无标识铸件，甚至只有一张铭牌照片——把您手上的资料发给我们，我们来查。',
  'sourcing.cta': '上传需求',
  'sourcing.checklistLabel': '需要提供的资料',
  'sourcing.checklistLede': '以下任一资料即可开始询价。',
  'sourcing.send.partNumber': '部件号或制造商编号',
  'sourcing.send.nameplate': '设备型号与铭牌照片',
  'sourcing.send.datasheet': '技术数据表、图纸或PDF',
  'sourcing.send.boq': 'Excel清单或多项询价',
  'sourcing.send.description': '只有文字描述也可以',

  // ---- process ------------------------------------------------------------
  'process.heading': '从需求到交付。',
  'process.lede': '一份询价从开始到结束的处理过程。',
  'process.stepCount': (n: number, total: number) => `第 ${n} 步，共 ${total} 步`,

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

  // ---- about --------------------------------------------------------------
  'about.eyebrow': '关于我们',
  'about.title': '工业供应与采购，立足广州。',
  'about.heading': '客户选择我们的原因',
  'about.lede':
    'Trete One 是一家位于中国广州的工业供应与采购公司，服务于各类工厂的维修与采购团队。',
  'about.details.heading': '公司信息',
  'about.details.lede': '下单之前，买家应当能够核实的信息。',

  // ---- quote form ---------------------------------------------------------
  'quote.eyebrow': '索取报价',
  'quote.heading': '告诉我们您的需求。',
  'quote.lede': '无需注册。发送部件号、照片或整份清单，我们会回复价格与交期。',
  'quote.directIntro': '更想直接联系？',
  'quote.required': '只有联系方式为必填项。',
  'quote.processLink': '提交之后会发生什么',
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
