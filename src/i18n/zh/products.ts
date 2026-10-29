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

  // ---- list labels ---------------------------------------------------------
  'products.listLabel': '产品大类',
};
