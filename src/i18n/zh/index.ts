import type { UIStrings } from '../en/index';
import { about } from './about';
import { brands } from './brands';
import { common } from './common';
import { home } from './home';
import { industries } from './industries';
import { products } from './products';
import { quote } from './quote';
import { sourcing } from './sourcing';

/**
 * Chinese UI copy, assembled from one module per route. Each module is typed
 * against its English counterpart, and the whole is typed against UIStrings,
 * so a missing key fails `astro check` twice over.
 *
 * ⚠ CLAUDE.md §12 — none of this has been reviewed by a native speaker yet.
 */
export const zh: UIStrings = {
  ...common,
  ...home,
  ...products,
  ...industries,
  ...sourcing,
  ...brands,
  ...about,
  ...quote,
};
