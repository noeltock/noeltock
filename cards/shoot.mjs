// Screenshots each card from cards/index.html to assets/cards/<id>.png (2x, transparent corners).
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './browser.mjs';

const IDS = ['block-runner', 'article', 'wotf', 'map', 'wesper', 'mod', 'entropy'];
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'assets', 'cards');
const types = { '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png' };

// tiny static server over cards/ on a free port (fonts need http, file:// can taint them)
const server = http.createServer(async (req, res) => {
  const file = path.join(here, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(here + path.sep)) { res.writeHead(403).end(); return; }
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' });
const external = [];
page.on('request', (req) => {
  const u = req.url();
  if (!u.startsWith(origin) && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u);
});

await page.goto(`${origin}/index.html`, { waitUntil: 'load' });
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode()));
  // run finite animations to their end frame, hold looping ones where they are
  for (const a of document.getAnimations()) {
    if (a.effect.getComputedTiming().iterations === Infinity) a.pause();
    else a.finish();
  }
  const s = document.createElement('style');
  s.textContent = '*,*::before,*::after{animation-play-state:paused!important;transition:none!important}';
  document.head.append(s);
});
await page.waitForTimeout(300);

// Half cards are shot with a 12px transparent strip on their inner edge, so a pair
// sits 24px apart (the site's gap) when placed side by side in the README.
const GAP = 12;
const stageX = await page.evaluate(() => document.querySelector('.stage').getBoundingClientRect().left + scrollX);
for (const id of IDS) {
  const b = await page.evaluate((id) => {
    const r = document.querySelector(`article[aria-labelledby="${id}-title"]`).getBoundingClientRect();
    return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height };
  }, id);
  const half = b.width < 600;
  const leftOfPair = b.x - stageX < 1;
  const clip = half
    ? { x: leftOfPair ? b.x : b.x - GAP, y: b.y, width: b.width + GAP, height: b.height }
    : b;
  await page.screenshot({ path: path.join(outDir, `${id}.png`), omitBackground: true, fullPage: true, clip });
  console.log(`shot ${id}`);
}
await browser.close();
server.close();

console.log(`non-local requests: ${external.length}`);
if (external.length) { console.error(external.join('\n')); process.exit(1); }
