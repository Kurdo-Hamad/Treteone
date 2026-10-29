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

  // ---- image placeholder (ImagePlaceholder.astro) -------------------------
  'placeholder.image': '图片',
  'placeholder.label': (subject: string) => `待补充照片：${subject}`,

  // ---- footer -------------------------------------------------------------
  'footer.label': '页脚',
  'footer.rights': (year: number, name: string) => `© ${year} ${name}`,
};
