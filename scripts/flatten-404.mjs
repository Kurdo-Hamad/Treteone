// Cloudflare Pages serves the nearest `404.html` for a path with no file.
// Astro writes the root not-found page as dist/404.html, but the Chinese one
// (src/pages/zh/404.astro) comes out as dist/zh/404/index.html under the
// directory build format. Copy it to dist/zh/404.html so bad addresses under
// /zh/ get the Chinese page. Runs after every build (package.json postbuild).
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const from = join(dist, 'zh', '404', 'index.html');
const to = join(dist, 'zh', '404.html');

if (!existsSync(join(dist, '404.html'))) {
  throw new Error('flatten-404: dist/404.html is missing — src/pages/404.astro did not build.');
}
if (!existsSync(from)) {
  throw new Error('flatten-404: dist/zh/404/index.html is missing — src/pages/zh/404.astro did not build.');
}
copyFileSync(from, to);
console.log('flatten-404: dist/zh/404.html written');
