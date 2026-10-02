// 表示確認用: ローカルの Chrome でページのスクリーンショットを撮る（開発用。サイトには含まれない）
// 使い方: node scripts/shot.mjs <outdir> <width>x<height>[@dark] <path>[#scrollY] ...
import puppeteer from 'puppeteer-core';
const [outdir, size, ...paths] = process.argv.slice(2);
const [wh, scheme] = size.split('@');
const [width, height] = wh.split('x').map(Number);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme === 'dark' ? 'dark' : 'light' }]);
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
for (const p of paths) {
  const [path, y] = p.split('#');
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle0', timeout: 60000 });
  if (y === 'full') {
    // 遅延読み込み画像を読み込ませる
    await page.evaluate(async () => { for (let s = 0; s < document.body.scrollHeight; s += 600) { scrollTo(0, s); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
    await new Promise((r) => setTimeout(r, 800));
  } else if (y) {
    await page.evaluate((yy) => scrollTo(0, +yy), y);
    await new Promise((r) => setTimeout(r, 900));
  }
  const name = `${outdir}/${(path.replace(/\W+/g, '_') || 'root')}${y ? '_' + y : ''}_${wh}${scheme ? '_' + scheme : ''}.png`;
  await page.screenshot({ path: name, fullPage: y === 'full' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(name, overflow ? 'HORIZONTAL OVERFLOW' : '');
}
if (errors.length) console.log('ERRORS:', errors.join('\n'));
await browser.close();
