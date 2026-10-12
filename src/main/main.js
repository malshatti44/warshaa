'use strict';
/*
 * ورشة WARSHA — العملية الرئيسية لـ Electron
 * نسخة واحدة تشغّل: مكتبة ورشة (hub) أو تطبيقًا مستقلًا (حسب warshaApp في package.json)
 * أو تطبيقًا محددًا عبر الوسيط --app=<id>.
 */
const { app, BrowserWindow, protocol, net, ipcMain, dialog, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');

const registry = require('../shared/registry.js');
const pkg = require('../../package.json');
const shortcuts = require('./shortcuts.js');

const ROOT = path.join(__dirname, '..'); // مجلد src
const PRIMARY = pkg.warshaApp || 'hub';
const IS_HUB = PRIMARY === 'hub';
const appMeta = (id) => registry.apps.find((a) => a.id === id) || null;
const SMOKE = (process.argv.find((a) => a.startsWith('--smoke-test')) || '').split('=')[1] || (process.argv.includes('--smoke-test') ? PRIMARY : null);

const ICONS_DIR = app.isPackaged ? path.join(process.resourcesPath, 'icons') : path.join(ROOT, '..', 'build', 'icons');
const iconFile = (id, ext) => {
  const p = path.join(ICONS_DIR, id, 'icon.' + ext);
  return fs.existsSync(p) ? p : undefined;
};

/* اسم التطبيق ومعرّفه */
const primaryMeta = appMeta(PRIMARY);
app.setName(primaryMeta ? primaryMeta.productName : registry.platform.productName);
if (process.platform === 'win32') app.setAppUserModelId(primaryMeta ? registry.platform.appId + '.' + PRIMARY : registry.platform.appId);
if (SMOKE) app.disableHardwareAcceleration();

/* بروتوكول app:// لتقديم ملفات الواجهة بأمان مع دعم fetch والوحدات */
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true, codeCache: true } }
]);

const printJobs = new Map();

function registerProtocol() {
  protocol.handle('app', async (req) => {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.startsWith('/__print/')) {
      const id = pathname.slice('/__print/'.length).replace(/\.html$/, '');
      const html = printJobs.get(id);
      if (html == null) return new Response('Not found', { status: 404 });
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    const filePath = path.normalize(path.join(ROOT, pathname));
    if (!filePath.startsWith(ROOT)) return new Response('Forbidden', { status: 403 });
    try {
      return await net.fetch(pathToFileURL(filePath).toString());
    } catch (e) {
      return new Response('Not found', { status: 404 });
    }
  });
}

/* ───────── النوافذ ───────── */
const windows = new Map(); // webContents.id → { win, appId, pending: [], guard }

function appURL(appId) {
  return appId === 'hub' ? 'app://warsha/hub/index.html' : 'app://warsha/apps/' + appId + '/index.html';
}

function createWindow(appId, files) {
  const meta = appMeta(appId);
  const isHubWin = appId === 'hub';
  const win = new BrowserWindow({
    width: isHubWin ? 1180 : 1380,
    height: isHubWin ? 780 : 880,
    minWidth: 860,
    minHeight: 560,
    show: false,
    backgroundColor: '#16171d',
    title: meta ? meta.name.ar : registry.platform.name.ar,
    icon: iconFile(appId, process.platform === 'win32' ? 'ico' : 'png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true
    }
  });
  const state = { win, appId, pending: (files || []).slice(), guard: { dirty: false } };
  windows.set(win.webContents.id, state);
  const wcId = win.webContents.id;

  if (process.platform === 'win32' && meta && IS_HUB) {
    try {
      win.setAppDetails({
        appId: registry.platform.appId + '.' + appId,
        appIconPath: iconFile(appId, 'ico'),
        appIconIndex: 0,
        relaunchCommand: '"' + process.execPath + '" --app=' + appId,
        relaunchDisplayName: meta.name.ar
      });
    } catch (e) { /* تجاهل */ }
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^(https?:|mailto:)/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('app://')) {
      e.preventDefault();
      if (/^(https?:|mailto:)/i.test(url)) shell.openExternal(url);
    }
  });
  win.webContents.on('before-input-event', (e, input) => {
    const devCombo = input.type === 'keyDown' && (input.key === 'F12' || ((input.control || input.meta) && input.shift && input.key.toLowerCase() === 'i'));
    if (devCombo && (!app.isPackaged || process.env.WARSHA_DEBUG)) win.webContents.toggleDevTools();
  });
  win.on('close', (e) => {
    const g = state.guard;
    if (g.dirty && !g.force && !SMOKE) {
      e.preventDefault();
      const choice = dialog.showMessageBoxSync(win, {
        type: 'warning',
        buttons: [g.discard || 'Discard', g.cancel || 'Cancel'],
        defaultId: 1,
        cancelId: 1,
        title: g.title || '',
        message: g.title || '',
        detail: g.message || ''
      });
      if (choice === 0) { g.force = true; win.close(); }
    }
  });
  win.on('closed', () => windows.delete(wcId));
  win.once('ready-to-show', () => { if (!SMOKE) win.show(); });
  win.loadURL(appURL(appId));
  return win;
}

function stateFor(event) {
  return windows.get(event.sender.id);
}

/* ───────── الملفات المفتوحة من النظام ───────── */
function fileArgs(argv) {
  const args = argv.slice(app.isPackaged ? 1 : 2);
  return args.filter((a) => a && !a.startsWith('-') && a !== '.' && fs.existsSync(a) && fs.statSync(a).isFile()).map((a) => path.resolve(a));
}
function appArg(argv) {
  const a = argv.find((x) => x.startsWith('--app='));
  if (!a) return null;
  const id = a.split('=')[1];
  return appMeta(id) || id === 'hub' ? id : null;
}
let macOpenQueue = [];
app.on('open-file', (e, p) => {
  e.preventDefault();
  if (app.isReady()) openFilesInApp(PRIMARY === 'hub' ? guessAppForFile(p) : PRIMARY, [p]);
  else macOpenQueue.push(p);
});
function guessAppForFile(p) {
  const ext = path.extname(p).slice(1).toLowerCase();
  const hit = registry.apps.find((a) => a.files.some((f) => f.ext.includes(ext)));
  return hit ? hit.id : null;
}
function openFilesInApp(appId, files) {
  if (!appId) return;
  // إذا كانت هناك نافذة فارغة للتطبيق نفسه نرسل لها الملف، وإلا نفتح نافذة جديدة
  for (const st of windows.values()) {
    if (st.appId === appId && !st.guard.dirty && st.guard.empty !== false) {
      files.forEach((f) => st.win.webContents.send('warsha:open-file', f));
      if (st.win.isMinimized()) st.win.restore();
      st.win.focus();
      return;
    }
  }
  createWindow(appId, files);
}

/* ───────── الإقلاع ───────── */
const gotLock = SMOKE ? true : app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', (_e, argv) => {
    const target = appArg(argv) || (IS_HUB ? null : PRIMARY);
    const files = fileArgs(argv);
    if (files.length) { openFilesInApp(target || guessAppForFile(files[0]), files); return; }
    if (target) {
      const existing = [...windows.values()].find((s) => s.appId === target);
      if (existing && !IS_HUB) { if (existing.win.isMinimized()) existing.win.restore(); existing.win.focus(); }
      else createWindow(target);
      return;
    }
    const hubWin = [...windows.values()].find((s) => s.appId === 'hub');
    if (hubWin) { if (hubWin.win.isMinimized()) hubWin.win.restore(); hubWin.win.focus(); }
    else createWindow('hub');
  });

  app.whenReady().then(() => {
    registerProtocol();
    setupMenu();
    if (SMOKE) { runSmoke(SMOKE); return; }
    const files = fileArgs(process.argv).concat(macOpenQueue);
    macOpenQueue = [];
    const target = appArg(process.argv);
    if (IS_HUB) {
      if (target && target !== 'hub') createWindow(target, files);
      else if (files.length && guessAppForFile(files[0])) createWindow(guessAppForFile(files[0]), files);
      else createWindow('hub');
    } else {
      createWindow(PRIMARY, files);
    }
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(IS_HUB ? 'hub' : PRIMARY); });
  });

  app.on('window-all-closed', () => {
    if (SMOKE) return; // يُنهي اختبار الدخان التطبيق بنفسه بعد آخر نافذة
    if (process.platform !== 'darwin') app.quit();
  });
}

/* ───────── القائمة الأصلية (ماك فقط لدعم اختصارات النسخ واللصق) ───────── */
function setupMenu() {
  if (process.platform !== 'darwin') { Menu.setApplicationMenu(null); return; }
  const template = [
    { role: 'appMenu' },
    { role: 'editMenu' },
    { label: 'View', submenu: [{ role: 'togglefullscreen' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }] },
    { role: 'windowMenu' }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

/* ───────── IPC: معلومات وملفات ───────── */
const lastDirs = {};
ipcMain.handle('warsha:info', (e) => {
  const st = stateFor(e);
  return {
    version: registry.version,
    electron: process.versions.electron,
    platform: process.platform,
    mode: IS_HUB ? 'hub' : 'standalone',
    appId: st ? st.appId : PRIMARY,
    isPackaged: app.isPackaged
  };
});

ipcMain.handle('warsha:openFile', async (e, o) => {
  const st = stateFor(e);
  o = o || {};
  const key = st ? st.appId : 'x';
  const res = await dialog.showOpenDialog(st ? st.win : undefined, {
    defaultPath: lastDirs[key] || app.getPath('documents'),
    properties: ['openFile'].concat(o.multiple ? ['multiSelections'] : []),
    filters: (o.filters || []).map((f) => ({ name: f.name, extensions: f.extensions }))
  });
  if (res.canceled || !res.filePaths.length) return [];
  lastDirs[key] = path.dirname(res.filePaths[0]);
  const out = [];
  for (const p of res.filePaths) out.push({ name: path.basename(p), path: p, data: await fs.promises.readFile(p) });
  return out;
});

ipcMain.handle('warsha:readFile', async (_e, p) => {
  return { name: path.basename(p), path: p, data: await fs.promises.readFile(p) };
});

ipcMain.handle('warsha:saveFile', async (e, o) => {
  const st = stateFor(e);
  const key = st ? st.appId : 'x';
  let target = o.path;
  if (!target) {
    const res = await dialog.showSaveDialog(st ? st.win : undefined, {
      defaultPath: path.join(lastDirs[key] || app.getPath('documents'), o.defaultPath || 'untitled'),
      filters: (o.filters || []).map((f) => ({ name: f.name, extensions: f.extensions }))
    });
    if (res.canceled || !res.filePath) return null;
    target = res.filePath;
  }
  await fs.promises.writeFile(target, Buffer.from(o.data));
  lastDirs[key] = path.dirname(target);
  return { path: target, name: path.basename(target) };
});

ipcMain.handle('warsha:openExternal', (_e, url) => {
  if (/^(https?:|mailto:)/i.test(String(url))) return shell.openExternal(url);
  return false;
});
ipcMain.handle('warsha:showItemInFolder', (_e, p) => shell.showItemInFolder(p));
ipcMain.on('warsha:closeGuard', (e, g) => {
  const st = stateFor(e);
  if (st) st.guard = Object.assign({}, st.guard, g, { force: false });
});
ipcMain.handle('warsha:pendingFiles', (e) => {
  const st = stateFor(e);
  if (!st) return [];
  const p = st.pending; st.pending = [];
  st.guard.empty = p.length === 0;
  return p;
});
ipcMain.handle('warsha:newWindow', (e) => {
  const st = stateFor(e);
  createWindow(st ? st.appId : PRIMARY);
});

/* ───────── PDF والطباعة من HTML ───────── */
async function renderHidden(html) {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  printJobs.set(id, html);
  const win = new BrowserWindow({ show: false, width: 1024, height: 1400, webPreferences: { sandbox: true, contextIsolation: true } });
  try {
    await win.loadURL('app://warsha/__print/' + id + '.html');
    await win.webContents.executeJavaScript(
      'Promise.all([document.fonts ? document.fonts.ready : 0].concat(Array.from(document.images).map(function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r;})}))).then(function(){return true;})'
    );
    await new Promise((r) => setTimeout(r, 150));
  } finally {
    printJobs.delete(id);
  }
  return win;
}
ipcMain.handle('warsha:htmlToPDF', async (_e, html, o) => {
  o = o || {};
  const win = await renderHidden(html);
  try {
    const opts = { printBackground: true, preferCSSPageSize: true, landscape: !!o.landscape, margins: { marginType: 'none' } };
    if (o.pageSize) opts.pageSize = o.pageSize;
    const data = await win.webContents.printToPDF(opts);
    return data;
  } finally {
    win.destroy();
  }
});
ipcMain.handle('warsha:printHTML', async (_e, html) => {
  const win = await renderHidden(html);
  return new Promise((resolve) => {
    win.webContents.print({ printBackground: true }, (ok) => { win.destroy(); resolve(ok); });
  });
});

/* ───────── المكتبة (Hub) ───────── */
ipcMain.handle('hub:state', () => ({
  installed: shortcuts.installedList(),
  platform: process.platform,
  canShortcut: process.platform === 'win32' || process.platform === 'linux',
  version: registry.version
}));
ipcMain.handle('hub:install', async (_e, id) => {
  const meta = appMeta(id);
  if (!meta) return { ok: false };
  return shortcuts.install(meta, { iconFile, registry });
});
ipcMain.handle('hub:uninstall', async (_e, id) => {
  const meta = appMeta(id);
  if (!meta) return { ok: false };
  return shortcuts.uninstall(meta);
});
ipcMain.handle('hub:launch', (_e, id) => {
  if (!appMeta(id)) return false;
  createWindow(id);
  return true;
});
ipcMain.handle('hub:checkUpdate', async () => {
  try {
    const res = await net.fetch('https://api.github.com/repos/' + registry.repository + '/releases/latest', { headers: { 'User-Agent': 'warsha' } });
    if (!res.ok) return { ok: false, status: res.status };
    const j = await res.json();
    return { ok: true, tag: j.tag_name, name: j.name, url: j.html_url, current: registry.version };
  } catch (e) {
    return { ok: false, error: String(e && e.message || e) };
  }
});

/* ───────── اختبار الدخان (CI) ───────── */
async function runSmoke(target) {
  const exists = (id) => fs.existsSync(path.join(ROOT, id === 'hub' ? 'hub' : path.join('apps', id), 'index.html'));
  const ids = (target === 'all' ? ['hub'].concat(registry.apps.map((a) => a.id)) : [target]).filter(exists);
  const outDir = process.env.WARSHA_SMOKE_DIR || path.join(os.tmpdir(), 'warsha-smoke');
  fs.mkdirSync(outDir, { recursive: true });
  const report = [];
  for (const id of ids) {
    const errors = [];
    const win = createWindow(id);
    const wc = win.webContents;
    wc.on('console-message', function (ev) {
      const d = (ev && typeof ev === 'object' && 'message' in ev) ? ev : { level: arguments[1], message: arguments[2], lineNumber: arguments[3], sourceId: arguments[4] };
      const isErr = d.level === 'error' || d.level === 3;
      if (isErr) errors.push(String(d.message) + ' @' + (d.sourceId || '') + ':' + (d.lineNumber || ''));
    });
    wc.on('preload-error', (_e, p, err) => errors.push('preload: ' + err));
    wc.on('render-process-gone', (_e, d) => errors.push('renderer gone: ' + d.reason));
    wc.on('did-fail-load', (_e, code, desc, url) => errors.push('load failed: ' + desc + ' ' + url));
    await new Promise((r) => { if (wc.isLoading()) wc.once('did-finish-load', r); else r(); setTimeout(r, 15000); });
    await new Promise((r) => setTimeout(r, 2500));
    let check = null;
    try {
      check = await wc.executeJavaScript('(async function(){ try { var r = { hasW: typeof W !== "undefined", native: !!window.warshaNative, menubar: !!document.querySelector(".w-menubar"), title: document.title }; if (window.__warshaSelfTest) r.self = await window.__warshaSelfTest(); return r; } catch (e) { return { error: String(e) }; } })()');
    } catch (e) { errors.push('exec: ' + e.message); }
    try {
      const img = await wc.capturePage();
      fs.writeFileSync(path.join(outDir, id + '.png'), img.toPNG());
    } catch (e) { /* تجاهل */ }
    if (check && check.self && check.self.errors) check.self.errors.forEach((x) => errors.push('self-test: ' + x));
    if (check && (!check.hasW || !check.native)) errors.push('framework not loaded: ' + JSON.stringify(check));
    report.push({ id, ok: errors.length === 0, check, errors });
    win.destroy();
  }
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  const failed = report.filter((r) => !r.ok);
  for (const r of report) console.log((r.ok ? 'PASS ' : 'FAIL ') + r.id + (r.ok ? '' : '\n  ' + r.errors.join('\n  ')));
  app.exit(failed.length ? 1 : 0);
}
