#!/usr/bin/env node
/*
 * ينسخ المكتبات والخطوط الخارجية إلى src/shared/vendor و src/shared/fonts
 * حتى تعمل التطبيقات دون إنترنت ودون خطوة بناء.
 *
 * الاستخدام (يُشغَّل تلقائيًا في GitHub Actions — vendor.yml):
 *   VENDOR_NODE_MODULES=/path/to/node_modules node scripts/vendor.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NM = process.env.VENDOR_NODE_MODULES || path.join(ROOT, 'node_modules');
const VENDOR = path.join(ROOT, 'src', 'shared', 'vendor');
const FONTS = path.join(ROOT, 'src', 'shared', 'fonts');

const LIBS = [
  { pkg: 'pdf-lib', files: [['dist/pdf-lib.min.js', 'pdf-lib.min.js']], license: 'MIT' },
  { pkg: 'pdfjs-dist', files: [['build/pdf.min.js', 'pdf.min.js'], ['build/pdf.worker.min.js', 'pdf.worker.min.js']], license: 'Apache-2.0' },
  { pkg: 'jszip', files: [['dist/jszip.min.js', 'jszip.min.js']], license: 'MIT or GPLv3' },
  // ترميز MP3 في صدى، وحاويات MP4/WebM لتصدير الفيديو والصوت السريع في مونتير وصدى (WebCodecs)
  { pkg: 'lamejs', files: [[['lame.min.js', 'lame.all.js'], 'lame.min.js']], license: 'LGPL-3.0 (unmodified, loaded as a separate file)' },
  { pkg: 'mp4-muxer', files: [[['build/mp4-muxer.min.js', 'build/mp4-muxer.js'], 'mp4-muxer.min.js']], license: 'MIT' },
  { pkg: 'webm-muxer', files: [[['build/webm-muxer.min.js', 'build/webm-muxer.js'], 'webm-muxer.min.js']], license: 'MIT' }
];

// [حزمة fontsource, الأوزان, المجموعات]
const FONT_LIST = [
  ['ibm-plex-sans-arabic', [400, 500, 600, 700], ['arabic', 'latin']],
  ['cairo', [400, 700], ['arabic', 'latin']],
  ['tajawal', [400, 700], ['arabic', 'latin']],
  ['almarai', [400, 700], ['arabic']],
  ['amiri', [400, 700], ['arabic', 'latin']],
  ['noto-naskh-arabic', [400, 700], ['arabic']],
  ['noto-kufi-arabic', [400, 700], ['arabic']],
  ['reem-kufi', [400, 700], ['arabic', 'latin']],
  ['el-messiri', [400, 700], ['arabic', 'latin']],
  ['changa', [400, 700], ['arabic', 'latin']],
  ['lalezar', [400], ['arabic', 'latin']],
  ['aref-ruqaa', [400, 700], ['arabic', 'latin']],
  ['markazi-text', [400, 700], ['arabic', 'latin']],
  ['jetbrains-mono', [400], ['latin']]
];

const notices = ['# THIRD-PARTY NOTICES — إشعارات المكونات الخارجية', '',
  'ورشة WARSHA تتضمن المكونات مفتوحة المصدر التالية بتراخيصها الأصلية:', ''];

fs.mkdirSync(VENDOR, { recursive: true });
fs.mkdirSync(FONTS, { recursive: true });

for (const lib of LIBS) {
  const dir = path.join(NM, lib.pkg);
  if (!fs.existsSync(dir)) { console.warn('skip (missing) ' + lib.pkg); continue; }
  const version = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version;
  for (const [from, to] of lib.files) {
    const src = (Array.isArray(from) ? from : [from]).map((f) => path.join(dir, f)).find((f) => fs.existsSync(f));
    if (!src) { console.warn('  missing file for ' + lib.pkg + ': ' + from); continue; }
    fs.copyFileSync(src, path.join(VENDOR, to));
    console.log('lib  ' + lib.pkg + '@' + version + ' → vendor/' + to + ' (' + path.relative(dir, src) + ')');
  }
  notices.push('- **' + lib.pkg + '** ' + version + ' — ' + lib.license);
}

notices.push('', '## الخطوط العربية — SIL Open Font License 1.1', '');
const css = ['/* يُولَّد تلقائيًا بواسطة scripts/vendor.js — خطوط مضمّنة برخصة SIL OFL 1.1 */'];
for (const [name, weights, subsets] of FONT_LIST) {
  const dir = path.join(NM, '@fontsource', name);
  if (!fs.existsSync(dir)) { console.warn('skip (missing) font ' + name); continue; }
  const version = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version;
  for (const w of weights) {
    const cssFile = path.join(dir, w + '.css');
    if (!fs.existsSync(cssFile)) { console.warn('  no weight ' + w + ' for ' + name); continue; }
    const src = fs.readFileSync(cssFile, 'utf8');
    const blocks = src.split('@font-face').slice(1).map((b) => '@font-face' + b.slice(0, b.lastIndexOf('}') + 1));
    for (const block of blocks) {
      const m = /url\(\.\/files\/([^)]+?\.woff2)\)/.exec(block);
      if (!m) continue;
      const file = m[1];
      const subset = (/-(arabic|latin-ext|latin|cyrillic-ext|cyrillic|greek-ext|greek|vietnamese|math|symbols)-\d+-normal\.woff2$/.exec(file) || [])[1];
      if (!subsets.includes(subset)) continue;
      fs.copyFileSync(path.join(dir, 'files', file), path.join(FONTS, file));
      const family = (/font-family:\s*'([^']+)'/.exec(block) || [])[1];
      const range = (/unicode-range:\s*([^;]+);/.exec(block) || [])[1];
      css.push('@font-face{font-family:\'' + family + '\';font-style:normal;font-display:swap;font-weight:' + w +
        ';src:url(\'' + file + '\') format(\'woff2\');' + (range ? 'unicode-range:' + range.trim() + ';' : '') + '}');
      console.log('font ' + family + ' ' + w + ' ' + subset);
    }
  }
  notices.push('- **' + name + '** (@fontsource/' + name + ' ' + version + ')');
}
fs.writeFileSync(path.join(FONTS, 'fonts.css'), css.join('\n') + '\n');
notices.push('', '- **Electron** — MIT', '- **electron-builder** — MIT', '');
fs.writeFileSync(path.join(ROOT, 'THIRD-PARTY-NOTICES.md'), notices.join('\n'));
console.log('done');
