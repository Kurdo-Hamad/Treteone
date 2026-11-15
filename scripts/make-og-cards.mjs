// Renders the social-share cards (Open Graph / Twitter) to public/:
//   og-card.png     English pages
//   og-card-zh.png  Chinese pages
// 1200 x 630, navy, wordmark and headline set in the site's own self-hosted
// fonts. Typographic on purpose: no stock photograph presented as Treteone's
// own (CLAUDE.md §12). Re-run after a copy change (see below).
//
// Needs Playwright with its Chromium, which is deliberately NOT a dependency
// of this project (the stack is locked, CLAUDE.md §2). Run it where Playwright
// is installed globally: NODE_PATH="$(npm root -g)" node scripts/make-og-cards.mjs
// It is a one-off authoring step, not part of `npm run build`, so the PNGs are
// committed.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// require() honours NODE_PATH, so a globally installed Playwright resolves.
const { chromium } = createRequire(import.meta.url)('playwright');

const root = process.cwd();
const font = (file) => `data:font/woff2;base64,${readFileSync(join(root, 'public/fonts', file)).toString('base64')}`;

const cards = [
  { out: 'og-card.png', lang: 'en', kicker: 'Industrial supply & sourcing', title: 'We find the part.<br>Then we supply it.', foot: 'Guangzhou · treteone.com' },
  { out: 'og-card-zh.png', lang: 'zh-CN', kicker: '工业供应与采购', title: '我们找到部件，<br>然后供应它。', foot: '广州 · treteone.com' },
];

const html = (c) => `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: GS; src: url(${font('GeneralSans-Semibold.woff2')}); font-weight: 600; }
@font-face { font-family: GS; src: url(${font('GeneralSans-Bold.woff2')}); font-weight: 700; }
@font-face { font-family: SC; src: url(${font('noto-sans-sc.woff2')}); font-weight: 400 700; }
html, body { margin: 0; }
body { width: 1200px; height: 630px; background: #051b38; color: #fff; font-family: GS, SC, sans-serif;
  box-sizing: border-box; padding: 76px 88px; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.mark { font-weight: 700; font-size: 44px; letter-spacing: .1em; }
.mark i { font-style: normal; color: #06b6d4; }
.kicker { margin-top: auto; font-weight: 600; font-size: 22px; letter-spacing: .16em; text-transform: uppercase; color: #67e8f9; }
.title { margin-top: 18px; font-weight: 600; font-size: 74px; line-height: 1.04; letter-spacing: -.025em; }
html[lang="zh-CN"] .title { letter-spacing: 0; line-height: 1.2; font-size: 70px; }
html[lang="zh-CN"] .kicker { letter-spacing: .08em; }
.foot { margin-top: 40px; display: flex; align-items: center; gap: 22px; font-weight: 600; font-size: 22px; color: rgba(255,255,255,.72); }
.rule { width: 72px; height: 4px; background: #06b6d4; }
.grid { position: absolute; inset: 0 0 0 auto; width: 420px; opacity: .07;
  background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);
  background-size: 42px 42px; }
</style></head><body>
<div class="grid"></div>
<div class="mark">TRETEONE<i>.</i></div>
<div class="kicker">${c.kicker}</div>
<div class="title">${c.title}</div>
<div class="foot"><span class="rule"></span>${c.foot}</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await page.setContent(html(c), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, 'public', c.out), type: 'png' });
  console.log(`make-og-cards: public/${c.out}`);
}
await browser.close();
