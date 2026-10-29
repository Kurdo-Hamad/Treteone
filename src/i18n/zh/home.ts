import type { HomeStrings } from '../en/home';

/**
 * Chinese copy — home.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const home: HomeStrings = {
  // ---- 1. rolling hero ----------------------------------------------------
  'home.hero.eyebrow': '工业供应与采购',
  'home.hero.tablist': '我们供应的产品',
  'home.hero.pause': '暂停轮播',
  'home.hero.play': '播放轮播',

  'home.hero.spares.title': '备品备件与 MRO',
  'home.hero.spares.line': '维修团队每周都在消耗的易耗件——按您手头已有的型号报价。',
  'home.hero.spares.link': '查看备品备件',
  'home.hero.spares.subject': '工作台上的轴承、密封件与垫片',

  'home.hero.equipment.title': '设备与机械',
  'home.hero.equipment.line':
    '泵、电机、压缩机乃至整条生产线，按实际工况选型，而不是按库存里碰巧有的规格。',
  'home.hero.equipment.link': '查看设备',
  'home.hero.equipment.subject': '底座上的工艺泵与电机',

  'home.hero.automation.title': '自动化与仪器仪表',
  'home.hero.automation.line':
    'PLC 与驱动硬件、变送器与分析仪——依据您的回路图或故障模块本身确定规格。',
  'home.hero.automation.link': '查看自动化产品',
  'home.hero.automation.subject': '柜门打开的控制柜',

  'home.hero.obsolete.title': '难寻件与停产件',
  'home.hero.obsolete.line':
    '停产元件与老旧自动化系统。发来一张铭牌照片，我们据此追溯到仍在生产的替代品。',
  'home.hero.obsolete.link': '我们如何追溯部件',
  'home.hero.obsolete.subject': '老旧齿轮箱上磨损的铭牌',

  // ---- 2. intro -----------------------------------------------------------
  'home.intro.h1': '我们找到部件，然后供应它。',
  'home.intro.lead1':
    '一座工厂可能因为一个部件而停产。找到这个部件，意味着要读懂铭牌、追溯一个可能已被替代过两次的型号，并且知道哪家制造商仍在生产能满足同样工况的产品。',
  'home.intro.lead2':
    'Treteone 是一家位于广州的工业供应与采购公司。我们依据部件号、图纸或照片开展工作，报价时提供价格、交期以及值得考虑的替代方案。',
  'home.intro.ctaQuote': '发送部件号',
  'home.intro.ctaProducts': '了解供应范围',

  // ---- 3. three ways an enquiry arrives -----------------------------------
  'home.enquiries.heading': '询价通常以这三种方式到来',
  'home.enquiries.note': '以下仅用于说明我们的工作，并非案例研究——不涉及任何客户名称，也不构成任何业绩承诺。',
  'home.enquiries.module.subject': '控制柜，模块已从机架上取下',
  'home.enquiries.module.heading': '一个已不再列入目录的控制模块',
  'home.enquiries.module.body':
    '型号查不到任何结果。模块上的版本代码以及它所在的机架，通常足以确定它被什么取代，以及替代品能否直接互换。',
  'home.enquiries.module.more': '我们如何追溯部件',
  'home.enquiries.pump.subject': '拆开的泵端——叶轮与耐磨环',
  'home.enquiries.pump.heading': '仍在服役的泵所需的易损件',
  'home.enquiries.pump.body':
    '叶轮、耐磨环、机械密封及配套垫片——同时按原厂套件和经核实的等效件报价，并列对比，说明各自的取舍。',
  'home.enquiries.pump.more': '查看产品类别',
  'home.enquiries.boq.subject': '桌上已报价的工程量清单',
  'home.enquiries.boq.heading': '一份待报价的工程量清单',
  'home.enquiries.boq.body':
    '一份涵盖多个专业的多行表格，描述常有缺漏。返回时逐项报价，含义不明的条目会被标注出来，而不是靠猜测填写。',
  'home.enquiries.boq.more': '发送您的清单',

  // ---- 4. at a glance -----------------------------------------------------
  'home.glance.heading': 'Treteone 一览',
  'home.glance.categories': '产品大类，涵盖从自动化到工业耗材',
  'home.glance.industries': '服务行业，各有其特定的工况问题',
  'home.glance.base': '为全球的维修与采购团队提供供应',
  'home.glance.account.value': '无需注册',
  'home.glance.account': '发送询价无需注册任何账户',

  // ---- 5. positioning split -----------------------------------------------
  'home.position.subject': '已包装待发运的轴承与密封件',
  'home.position.kicker': '我们的定位',
  'home.position.heading': '我们不囤货，这正是关键所在。',
  'home.position.lead1':
    '分销商卖的是自己货架上的东西。采购公司则从工况出发，去找能满足它的供应方——这是另一种工作，而当物料已经停产、原制造商已被收购，或规格比包装盒上的品牌更重要时，这才是正确的做法。',
  'home.position.lead2':
    '因此，我们不受任何代理权的约束，本网站上的内容也都不是库存清单。每一项都按您发来的规格报价。',
  'home.position.more': '进一步了解我们的工作方式',

  // ---- 6. capability grid -------------------------------------------------
  'home.caps.heading': '从单个部件到整条产线。',
  'home.caps.lead': '十二个产品大类中买家询问最多的八个。每一项都是供应范围的说明，而不是产品目录。',
  'home.caps.all': (n: number) => `全部 ${n} 个产品大类`,
  'home.caps.automation.subject': '控制柜内部',
  'home.caps.automation.heading': '自动化与控制——逻辑层',
  'home.caps.automation.body':
    'PLC、DCS 与 SCADA 硬件、HMI、远程 I/O、驱动器与伺服系统，按您的控制平台确定规格。',
  'home.caps.instruments.subject': '现场安装的压力变送器',
  'home.caps.instruments.heading': '仪器仪表——工厂的感知',
  'home.caps.instruments.body': '压力、流量、液位与温度测量，变送器与分析仪，按介质与量程匹配。',
  'home.caps.valves.subject': '带执行机构的调节阀',
  'home.caps.valves.heading': '阀门与流体控制——切断与调节',
  'home.caps.valves.body':
    '球阀、闸阀、截止阀、蝶阀、调节阀与安全阀，连同执行机构与定位器，按压力等级与阀内件选型。',
  'home.caps.pumps.subject': '底座上的离心泵',
  'home.caps.pumps.heading': '泵——输送工艺介质',
  'home.caps.pumps.body': '离心泵、计量泵与潜水泵，以及让它们持续运转的密封、叶轮与易损件。',
  'home.caps.motors.subject': '电机与齿轮箱总成',
  'home.caps.motors.heading': '电机与传动——把动力送到轴上',
  'home.caps.motors.body': '电动机、齿轮箱、联轴器、轴承与皮带，按机座号、额定值与工作制选型。',
  'home.caps.fluid.subject': '液压动力单元',
  'home.caps.fluid.heading': '液压与气动——按需提供动力',
  'home.caps.fluid.body': '气缸与液压缸、阀门、动力单元、管件与气源处理，依据回路图或故障部件供应。',
  'home.caps.mro.subject': '工作台上的轴承与密封件',
  'home.caps.mro.heading': '机械与 MRO——易耗层',
  'home.caps.mro.body': '轴承、密封件、垫片、紧固件、软管与过滤器——构成维修支出主体的那些物料。',
  'home.caps.consumables.subject': '盒装滤芯',
  'home.caps.consumables.heading': '工业耗材——会用完的东西',
  'home.caps.consumables.body': '滤芯、润滑油脂、磨料、刀具与劳保用品，按现场实际用量供应。',

  // ---- 7. hard-to-find navy band ------------------------------------------
  'home.htf.kicker': '难寻件与停产件',
  'home.htf.heading': '只要有铭牌，就有据可查。',
  'home.htf.lead':
    '来到我们这里的询价，大多已在别处碰过壁——型号查不到结果，制造商已不再列出该物料，或者铸件上的编号已被磨掉。在这里，这是常规的起点，而不是例外。',
  'home.htf.cta': '我们如何追溯部件',
  'home.htf.listLabel': '需要提供的资料',
  'home.htf.send1': '印刷在部件上的型号，无论已被替代还是部分模糊',
  'home.htf.send2': '设备型号、序列号以及一张铭牌照片',
  'home.htf.send3': '数据表、总图或 P&ID 摘录',
  'home.htf.send4': '数量、需求日期以及交货目的地',

  // ---- 8. brand marquee ---------------------------------------------------
  'home.brands.heading': '我们采购的品牌',
  'home.brands.note': '以下是询价最多的制造商。如果没有您需要的品牌，请直接询问——这份名单反映的是需求，而不是我们采购能力的上限。',
  'home.brands.logo': '标志',
  'home.brands.listLabel': '我们采购的制造商',
  'home.brands.more': '进一步了解品牌',
  'home.brands.disclaimer':
    '品牌名称及商标均归其各自所有者所有。除非另有说明，提及任何制造商均不代表获得授权，也不表示分销、代理或隶属关系。',

  // ---- 9. about our work --------------------------------------------------
  'home.work.heading': '关于我们的工作',
  'home.work.quote.subject': '发货前正在核查的货物',
  'home.work.quote.heading': '一份报价是如何形成的',
  'home.work.quote.body': '识别、寻源、核实、报价、交付。五个步骤，一个联系人，任何等效件都会明确标注为等效件。',
  'home.work.who.subject': 'Treteone 位于荔湾区的办公室',
  'home.work.who.heading': '您在和谁打交道',
  'home.work.who.body': '一家在广州荔湾区注册的公司，服务于那些无法停工的工厂的维修与采购团队。',
  'home.work.more': '了解更多',

};
