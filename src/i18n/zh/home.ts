import type { HomeStrings } from '../en/home';

/**
 * Chinese copy — home.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const home: HomeStrings = {
  // ---- hero ---------------------------------------------------------------
  'hero.eyebrow': '工业供应与采购',
  'hero.h1': '驱动工业的零部件、设备与技术。',
  'hero.lede':
    '从关键备件到成套工业设备，我们采购并供应保障工业运行所需的一切。',
  'hero.ctaProducts': '浏览产品',
  'hero.ctaQuote': '索取报价',
  'hero.ctaSourcing': '找不到备件？',
  'hero.scrollCue': '了解 Treteone',
  'hero.region': '专题图片',
  'hero.slideLabel': (n: number, total: number) => `显示第 ${n} 张，共 ${total} 张`,

  // ---- homepage -----------------------------------------------------------
  'home.position.label': '关于 Treteone',
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
};
