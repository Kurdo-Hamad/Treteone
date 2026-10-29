import type { ProductsStrings } from '../en/products';

/**
 * Chinese copy — products.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const products: ProductsStrings = {
  'meta.products.title': '产品 — Treteone',
  'meta.products.description':
    '十二个工业产品大类：自动化、仪器仪表、电气、电机与传动、泵、压缩机、阀门、MRO备件等。',

  // ---- /products page head ------------------------------------------------
  'products.page.kicker': (n: number) => `产品 · ${n} 个大类`,
  'products.page.title': '工厂运转所需的一切，一份询价即可。',
  'products.page.lead':
    '这些大类用来判断您要的物品是否在我们的供应范围内。我们不备库存，每一项都按您提供的规格报价。',
  'products.rows.enquire': '询价',

  // ---- navy scope band ----------------------------------------------------
  'scope.band.kicker': '供应范围',
  'scope.band.title': '从单个零件到整条生产线。',

  // ---- legacy (see the English module) ------------------------------------
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
  'scope.heading': '从最小的零件到整套系统。',
  'scope.lede': '向下滚动查看供应范围。五个层级由同一团队负责。',
  'scope.stepCount': (n: number, total: number) => `第 ${n} 级，共 ${total} 级`,
};
