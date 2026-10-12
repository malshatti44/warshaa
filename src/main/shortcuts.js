'use strict';
/*
 * تثبيت التطبيقات من مكتبة ورشة: إنشاء اختصارات سطح المكتب وقائمة ابدأ (ويندوز)
 * أو ملفات .desktop (لينكس)، وتسجيل حالة التثبيت.
 */
const { app, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const stateFile = () => path.join(app.getPath('userData'), 'hub-installed.json');

function readState() {
  try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')); } catch (e) { return {}; }
}
function writeState(s) {
  try { fs.mkdirSync(path.dirname(stateFile()), { recursive: true }); fs.writeFileSync(stateFile(), JSON.stringify(s, null, 2)); } catch (e) { /* تجاهل */ }
}

function installedList() {
  return Object.keys(readState());
}

function safeName(s) {
  return String(s).replace(/[\\/:*?"<>|]/g, '').trim();
}

function launchTarget() {
  // في AppImage يجب استخدام مسار ملف AppImage نفسه وليس المجلد المؤقت
  return process.env.APPIMAGE || process.execPath;
}

function installWindows(meta, ctx) {
  const created = [];
  const lnk = safeName(meta.name.ar + ' - ' + meta.productName) + '.lnk';
  const ico = ctx.iconFile(meta.id, 'ico');
  const opts = {
    target: process.execPath,
    args: '--app=' + meta.id,
    description: meta.desc.ar,
    cwd: path.dirname(process.execPath),
    appUserModelId: ctx.registry.platform.appId + '.' + meta.id
  };
  if (ico) { opts.icon = ico; opts.iconIndex = 0; }
  const startDir = path.join(app.getPath('appData'), 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'ورشة WARSHA');
  fs.mkdirSync(startDir, { recursive: true });
  for (const dir of [app.getPath('desktop'), startDir]) {
    const p = path.join(dir, lnk);
    if (shell.writeShortcutLink(p, 'create', opts)) created.push(p);
  }
  return created;
}

function installLinux(meta, ctx) {
  const created = [];
  const home = os.homedir();
  const appsDir = path.join(home, '.local', 'share', 'applications');
  const iconDir = path.join(home, '.local', 'share', 'icons', 'hicolor', '512x512', 'apps');
  fs.mkdirSync(appsDir, { recursive: true });
  fs.mkdirSync(iconDir, { recursive: true });
  const iconName = 'warsha-' + meta.id;
  const png = ctx.iconFile(meta.id, 'png');
  if (png) { fs.copyFileSync(png, path.join(iconDir, iconName + '.png')); created.push(path.join(iconDir, iconName + '.png')); }
  const cats = { photo: 'Graphics;Photography;', design: 'Graphics;', media: 'AudioVideo;', docs: 'Office;' }[meta.category] || 'Utility;';
  const exts = meta.files.flatMap((f) => f.ext);
  const entry = [
    '[Desktop Entry]',
    'Type=Application',
    'Name=' + meta.name.ar,
    'Name[en]=' + meta.name.en,
    'Comment=' + meta.desc.ar,
    'Comment[en]=' + meta.desc.en,
    'Exec="' + launchTarget() + '" --app=' + meta.id + ' %F',
    'Icon=' + (png ? path.join(iconDir, iconName + '.png') : iconName),
    'Terminal=false',
    'Categories=' + cats,
    'Keywords=warsha;' + meta.name.en + ';' + exts.join(';') + ';',
    'StartupWMClass=' + meta.productName,
    ''
  ].join('\n');
  const file = path.join(appsDir, 'warsha-' + meta.id + '.desktop');
  fs.writeFileSync(file, entry, { mode: 0o755 });
  created.push(file);
  const desktopDir = path.join(home, 'Desktop');
  if (fs.existsSync(desktopDir)) {
    const d = path.join(desktopDir, 'warsha-' + meta.id + '.desktop');
    fs.writeFileSync(d, entry, { mode: 0o755 });
    created.push(d);
  }
  return created;
}

async function install(meta, ctx) {
  const s = readState();
  let created = [];
  try {
    if (process.platform === 'win32') created = installWindows(meta, ctx);
    else if (process.platform === 'linux') created = installLinux(meta, ctx);
  } catch (e) {
    return { ok: false, error: String(e && e.message || e) };
  }
  s[meta.id] = { time: Date.now(), files: created };
  writeState(s);
  return { ok: true, files: created };
}

async function uninstall(meta) {
  const s = readState();
  const entry = s[meta.id];
  if (entry && entry.files) {
    for (const f of entry.files) { try { fs.unlinkSync(f); } catch (e) { /* تجاهل */ } }
  }
  delete s[meta.id];
  writeState(s);
  return { ok: true };
}

module.exports = { install, uninstall, installedList };
