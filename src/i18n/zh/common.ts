import type { CommonStrings } from '../en/common';

/**
 * Chinese copy — common.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const common: CommonStrings = {
  // ---- document -----------------------------------------------------------
  'site.name': 'Treteone',
  'site.title': 'Treteone — 工业供应与采购',
  'site.description':
    '总部位于中国广州的工业供应与采购公司。为不能停机的工厂提供备件、设备与机械。发送部件号、照片或整份清单即可询价。',

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
  'nav.home': 'Treteone — 首页',
  'nav.homeShort': '首页',

  'lang.switchTo': (label: string) => `切换到${label}`,

  // ---- calls to action ----------------------------------------------------
  'cta.quote': '索取报价',
  /** Short form of cta.quote, for the header pill on phones. */
  'cta.quoteShort': '报价',
  'cta.whatsapp': 'WhatsApp',

  // ---- 404 page (src/pages/404.astro, zh/404.astro) -------------------------
  'notFound.meta.title': '页面未找到 — Treteone',
  'notFound.meta.description': '您访问的页面不在 treteone.com 上。',
  'notFound.kicker': '错误 404',
  'notFound.title': '此页面不存在。',
  'notFound.lead': '网址可能输入有误，或页面已被移动。请从下方页面重新开始——或直接发送部件号，由我们接手处理。',
  'notFound.home': '返回首页',

  // ---- image placeholder (ImagePlaceholder.astro) -------------------------
  'placeholder.image': '图片',
  'placeholder.label': (subject: string) => `待补充照片：${subject}`,

  // ---- footer -------------------------------------------------------------
  'footer.tagline': '工业供应与采购——立足广州，服务全球工厂。',
  'footer.ctaKicker': '有零件型号？',
  'footer.email': '电子邮件',
  'footer.phone': '电话 · WhatsApp',
  'footer.office': '办公地址',
  'footer.top': '返回顶部',
  'footer.rights': (year: number, name: string) => `© ${year} ${name}`,
};
