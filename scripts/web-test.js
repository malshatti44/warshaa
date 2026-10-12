#!/usr/bin/env node
/*
 * اختبار الواجهات في متصفح Chromium (Playwright) دون Electron:
 *   node scripts/web-test.js [hub|<appId>|all] [--lang=en] [--theme=light] [--out=dir] [--size=1440x900]
 * يلتقط صورة لكل واجهة، ويشغّل سيناريو tests/web/<id>.test.js إن وُجد، ويفشل عند أي خطأ في الصفحة.
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

let playwright;
try { playwright = require('playwright'); } catch (e) {
  playwright = require(path.join(process.env.PLAYWRIGHT_MODULE || '/opt/node-tools/node_modules/playwright'));
}

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const registry = require(path.join(SRC, 'shared', 'registry.js'));
const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const target = args.find((a) => !a.startsWith('--')) || 'all';
const lang = opt('lang', 'ar');
const theme = opt('theme', 'dark');
const outDir = path.resolve(opt('out', path.join(ROOT, 'dist', 'web-shots')));
const [vw, vh] = opt('size', '1440x900').split('x').map(Number);
const ids = target === 'all' ? ['hub'].concat(registry.apps.map((a) => a.id)) : target.split(',');

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.wasm': 'application/wasm' };

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      const file = path.normalize(path.join(SRC, p));
      if (!file.startsWith(SRC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = await serve();
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await playwright.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  let failed = 0;
  for (const id of ids) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1, acceptDownloads: true });
    await ctx.addInitScript(([l, t]) => { localStorage.setItem('warsha.lang', JSON.stringify(l)); localStorage.setItem('warsha.theme', JSON.stringify(t)); }, [lang, theme]);
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
    page.on('pageerror', (e) => errors.push('pageerror: ' + (e.stack || e.message)));
    page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));
    const url = base + (id === 'hub' ? '/hub/index.html' : '/apps/' + id + '/index.html');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outDir, id + '.png') });
    const testFile = path.join(ROOT, 'tests', 'web', id + '.test.js');
    if (fs.existsSync(testFile) && !args.includes('--no-scenario')) {
      try {
        delete require.cache[require.resolve(testFile)];
        await require(testFile)({ page, shot: (name) => page.screenshot({ path: path.join(outDir, id + '-' + name + '.png') }), outDir, base, ctx });
      } catch (e) {
        errors.push('scenario: ' + (e.stack || e.message));
      }
    }
    const self = await page.evaluate(async () => (window.__warshaSelfTest ? window.__warshaSelfTest() : null)).catch((e) => ({ errors: ['selftest: ' + e.message] }));
    if (self && self.errors) self.errors.forEach((x) => errors.push('self-test: ' + x));
    console.log((errors.length ? 'FAIL ' : 'PASS ') + id + (errors.length ? '\n  ' + errors.join('\n  ') : ''));
    if (errors.length) failed++;
    await ctx.close();
  }
  await browser.close();
  server.close();
  console.log('screenshots → ' + outDir);
  process.exit(failed ? 1 : 0);
})();
