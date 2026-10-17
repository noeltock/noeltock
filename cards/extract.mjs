// Re-runnable: snapshots the 7 cards from https://noeltock.com/ai (rendered DOM, not SSR source)
// into cards/index.html + cards/site.css + cards/media/*, so the page renders fully offline.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { launch } from './browser.mjs';

const ORIGIN = 'https://noeltock.com';
const PAGE_URL = `${ORIGIN}/ai`;
// README order
const IDS = ['block-runner', 'article', 'map', 'wotf', 'wesper', 'entropy', 'mod'];
const here = path.dirname(fileURLToPath(import.meta.url));
const mediaDir = path.join(here, 'media');

await fs.rm(mediaDir, { recursive: true, force: true });
await fs.mkdir(mediaDir, { recursive: true });

// ---- asset download: absolute URL -> local "media/<name>" (memoised) ----
const saved = new Map(); // url -> relative path
const taken = new Map(); // file name -> url
const unNext = (u) => {
  const x = new URL(u);
  return x.pathname === '/_next/image' ? new URL(x.searchParams.get('url'), ORIGIN) : x;
};
async function save(absUrl) {
  if (saved.has(absUrl)) return saved.get(absUrl);
  // /_next/image?url=/ai/x.webp&w=..  ->  the original /ai/x.webp (full resolution), falling back to the resolved URL
  const candidates = [unNext(absUrl).href, absUrl];
  let res, used;
  for (const c of candidates) {
    res = await fetch(c, { headers: { accept: 'image/webp,image/png,image/*,*/*;q=0.8' } });
    if (res.ok) { used = c; break; }
  }
  if (!res.ok) throw new Error(`download failed ${res.status} ${absUrl}`);
  let name = path.basename(new URL(used).pathname) || 'asset';
  if (taken.has(name) && taken.get(name) !== used) {
    name = `${crypto.createHash('md5').update(used).digest('hex').slice(0, 6)}-${name}`;
  }
  taken.set(name, used);
  await fs.writeFile(path.join(mediaDir, name), Buffer.from(await res.arrayBuffer()));
  const rel = `media/${name}`;
  saved.set(absUrl, rel);
  return rel;
}

// rewrite every url(...) in a CSS/HTML string; `base` resolves relative references
async function rewriteUrls(text, base) {
  const re = /url\(\s*(['"]?)([^)'"]+)\1\s*\)/g;
  const out = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    out.push(text.slice(last, m.index));
    const ref = m[2].replace(/&amp;/g, '&');
    out.push(ref.startsWith('data:') || ref.startsWith('#') ? m[0] : `url(${await save(new URL(ref, base).href)})`);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out.join('');
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark' });
await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
for (let y = 0; y < 12000; y += 400) {
  await page.mouse.wheel(0, 400); // cards reveal on scroll
  await page.waitForTimeout(150);
}
await page.waitForTimeout(3000); // let animations settle

// ---- iframes can't be serialised: render each frame's document on its own page at the
// frame's size (no overlays from the card), screenshot it, and swap in an <img> ----
const frameShots = {}; // card id -> relative path
for (const id of IDS) {
  const frame = page.locator(`article[aria-labelledby="${id}-title"] iframe`).first();
  if (!(await frame.count())) continue;
  await frame.scrollIntoViewIfNeeded();
  const box = await frame.boundingBox();
  const src = new URL(await frame.getAttribute('src'), PAGE_URL).href;
  const shot = await browser.newPage({ viewport: { width: Math.round(box.width), height: Math.round(box.height) }, deviceScaleFactor: 2, colorScheme: 'dark' });
  await shot.goto(src, { waitUntil: 'load' });
  await shot.waitForTimeout(9000); // let the animation reach its resting frame
  const file = `${id}-visual.png`;
  await shot.screenshot({ path: path.join(mediaDir, file) });
  await shot.close();
  frameShots[id] = `media/${file}`;
  console.log(`${id}: iframe ${src} -> static screenshot (${file}, ${Math.round(box.width)}x${Math.round(box.height)})`);
}

// ---- stateful demos loop; catch the build-claude-mod demo once it is past the typing intro ----
const mod = page.locator('article[aria-labelledby="mod-title"]');
await mod.scrollIntoViewIfNeeded();
await page.waitForFunction(
  () => document.querySelectorAll('article[aria-labelledby="mod-title"] [class*="modSteps"] li[data-state="done"]').length >= 1,
  null,
  { timeout: 60000, polling: 50 },
);

// ---- rendered markup ----
const snap = await page.evaluate(({ ids, frameShots }) => {
  const cards = {};
  for (const id of ids) {
    const live = document.querySelector(`article[aria-labelledby="${id}-title"]`);
    const clone = live.cloneNode(true);
    const liveCanvases = live.querySelectorAll('canvas');
    clone.querySelectorAll('canvas').forEach((c, i) => {
      const img = document.createElement('img');
      img.src = liveCanvases[i].toDataURL();
      img.className = c.className;
      img.setAttribute('style', c.getAttribute('style') || '');
      img.width = c.width; img.height = c.height;
      c.replaceWith(img);
    });
    clone.querySelectorAll('iframe').forEach((f) => {
      const img = document.createElement('img');
      img.src = frameShots[id];
      img.alt = '';
      img.className = f.className;
      f.replaceWith(img);
    });
    clone.querySelectorAll('script,noscript').forEach((s) => s.remove());
    clone.querySelectorAll('img').forEach((img) => {
      img.removeAttribute('srcset'); img.removeAttribute('sizes');
      img.removeAttribute('loading'); img.setAttribute('decoding', 'sync');
    });
    cards[id] = clone.outerHTML;
  }
  const classOf = (el) => el.getAttribute('class') || '';
  const main = document.querySelector('article').closest('main');
  return {
    htmlClass: classOf(document.documentElement),
    bodyClass: classOf(document.body),
    mainClass: classOf(main),
    sheets: [...document.querySelectorAll('link[rel=stylesheet],style')].map((e) =>
      e.tagName === 'LINK' ? { href: e.href } : { text: e.textContent }),
    cards,
  };
}, { ids: IDS, frameShots });
await browser.close();

// ---- site.css ----
let css = '';
for (const s of snap.sheets) {
  const base = s.href ?? PAGE_URL;
  const text = s.href ? await (await fetch(s.href)).text() : s.text;
  css += `/* ${s.href ?? 'inline <style>'} */\n${await rewriteUrls(text, base)}\n`;
}
await fs.writeFile(path.join(here, 'site.css'), css);

// ---- index.html ----
const cards = [];
for (const id of IDS) {
  const html = snap.cards[id];
  const parts = [];
  let last = 0;
  for (const m of html.matchAll(/\b(src|poster)="([^"]*)"/g)) {
    parts.push(html.slice(last, m.index));
    const ref = m[2].replace(/&amp;/g, '&');
    parts.push(ref.startsWith('data:') || ref.startsWith('media/') ? m[0] : `${m[1]}="${await save(new URL(ref, PAGE_URL).href)}"`);
    last = m.index + m[0].length;
  }
  parts.push(html.slice(last));
  cards.push(await rewriteUrls(parts.join(''), PAGE_URL));
}
const doc = `<!doctype html>
<html lang="en" class="${snap.htmlClass}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>Profile cards</title>
<link rel="stylesheet" href="site.css">
<link rel="stylesheet" href="cards.css">
</head>
<body class="${snap.bodyClass}">
<main class="${snap.mainClass}">
<div class="stage">
${cards.join('\n')}
</div>
</main>
</body>
</html>
`;
await fs.writeFile(path.join(here, 'index.html'), doc);
console.log(`wrote index.html, site.css, ${saved.size} media files`);
