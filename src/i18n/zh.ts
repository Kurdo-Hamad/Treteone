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
