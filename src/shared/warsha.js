/* ورشة WARSHA — الإطار المشترك لكل التطبيقات
 * الترجمة (عربي افتراضي + إنجليزي)، السمات، القوائم، الحوارات، الملفات، الاختصارات، نافذة "حول".
 * يعمل داخل Electron (عبر window.warshaNative من preload) وفي المتصفح كبديل.
 */
(function () {
  'use strict';
  const R = globalThis.WARSHA_REGISTRY;
  const native = globalThis.warshaNative || null;
  const SHARED_BASE = (function () {
    const s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/[^/]*$/, '') : '../../shared/';
  })();
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  const W = {
    registry: R,
    native,
    isElectron: !!native,
    isMac,
    sharedBase: SHARED_BASE,
    version: R.version
  };

  /* ───────────── أدوات عامة ───────────── */
  W.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  W.uid = (p) => (p || 'id') + '-' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
  W.debounce = (fn, ms) => { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); }; };
  W.raf = (fn) => { let q = false, args; return function (...a) { args = a; if (!q) { q = true; requestAnimationFrame(() => { q = false; fn.apply(this, args); }); } }; };
  W.escape = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  W.round = (v, d = 2) => { const m = Math.pow(10, d); return Math.round(v * m) / m; };
  W.fmt = (n, d = 0) => Number(n).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  W.fmtBytes = (b) => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB';
  W.fmtTime = (s, withMs) => {
    s = Math.max(0, s || 0);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    const ms = Math.floor((s % 1) * 100);
    const base = (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
    return withMs ? base + '.' + String(ms).padStart(2, '0') : base;
  };
  W.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  W.deepClone = (o) => (typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)));

  W.$ = (sel, root) => (root || document).querySelector(sel);
  W.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /** إنشاء عنصر: W.h('div', {class:'x', onclick: fn, i18n:'key'}, ...children) */
  W.h = function (tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'class' || k === 'className') el.className = v;
        else if (k === 'style' && typeof v === 'object') {
          for (const sk in v) { if (sk.startsWith('--')) el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; }
        }
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'i18n') { el.dataset.i18n = v; el.textContent = W.t(v); }
        else if (k === 'tip') { el.dataset.tip = v; }
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k in el && typeof v !== 'string' && k !== 'list') el[k] = v;
        else el.setAttribute(k, v === true ? '' : v);
      }
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  };
  W.icon = (name, attrs) => globalThis.WarshaIcons.icon(name, attrs);
  W.iconEl = (name) => { const s = document.createElement('span'); s.style.display = 'inline-flex'; s.innerHTML = W.icon(name); return s; };

  /* ───────────── حافلة الأحداث ───────────── */
  const listeners = {};
  W.on = (ev, fn) => { (listeners[ev] = listeners[ev] || []).push(fn); return () => W.off(ev, fn); };
  W.off = (ev, fn) => { listeners[ev] = (listeners[ev] || []).filter((f) => f !== fn); };
  W.emit = (ev, ...a) => { (listeners[ev] || []).slice().forEach((f) => { try { f(...a); } catch (e) { console.error(e); } }); };

  /* ───────────── التخزين ───────────── */
  W.store = {
    get(k, d) {
      try { const v = localStorage.getItem('warsha.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
    },
    set(k, v) { try { localStorage.setItem('warsha.' + k, JSON.stringify(v)); } catch (e) { /* تجاهل */ } },
    remove(k) { try { localStorage.removeItem('warsha.' + k); } catch (e) { /* تجاهل */ } }
  };

  /* ───────────── الترجمة ───────────── */
  const DICT = { ar: {}, en: {} };
  W.lang = W.store.get('lang', 'ar') === 'en' ? 'en' : 'ar';
  W.i18n = {
    add(lang, obj) { Object.assign(DICT[lang] || (DICT[lang] = {}), obj); },
    addAll(obj) { for (const l in obj) W.i18n.add(l, obj[l]); },
    has(key) { return key in DICT[W.lang] || key in DICT.en; }
  };
  /** ترجمة مفتاح مع استبدال المتغيرات {name} */
  W.t = function (key, vars) {
    if (key == null) return '';
    let s = DICT[W.lang][key];
    if (s == null) s = DICT.ar[key];
    if (s == null) s = DICT.en[key];
    if (s == null) s = key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  };
  /** اختيار نص من كائن {ar, en} */
  W.L = (obj) => (obj == null ? '' : typeof obj === 'string' ? obj : obj[W.lang] || obj.ar || obj.en || '');
  W.isRTL = () => W.lang === 'ar';

  W.translate = function (root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = W.t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { el.placeholder = W.t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll('[data-i18n-title]').forEach((el) => { el.dataset.tip = el.dataset.i18nTitle; el.setAttribute('aria-label', W.t(el.dataset.i18nTitle)); });
    root.querySelectorAll('[data-tip]').forEach((el) => { el.setAttribute('aria-label', W.t(el.dataset.tip)); });
  };

  W.setLang = function (lang) {
    W.lang = lang === 'en' ? 'en' : 'ar';
    W.store.set('lang', W.lang);
    document.documentElement.lang = W.lang;
    document.documentElement.dir = W.lang === 'ar' ? 'rtl' : 'ltr';
    W.translate();
    W.updateWindowTitle();
    W.emit('langchange', W.lang);
  };

  /* ───────────── السمة ───────────── */
  W.theme = W.store.get('theme', 'dark') === 'light' ? 'light' : 'dark';
  W.setTheme = function (t) {
    W.theme = t === 'light' ? 'light' : 'dark';
    W.store.set('theme', W.theme);
    document.documentElement.dataset.theme = W.theme;
    W.emit('themechange', W.theme);
  };

  /* القاموس المشترك */
  W.i18n.addAll({
    ar: {
      'menu.file': 'ملف', 'menu.edit': 'تحرير', 'menu.view': 'عرض', 'menu.insert': 'إدراج', 'menu.format': 'تنسيق',
      'menu.image': 'صورة', 'menu.layer': 'طبقة', 'menu.filter': 'مرشحات', 'menu.object': 'كائن', 'menu.tools': 'أدوات',
      'menu.help': 'مساعدة', 'menu.page': 'صفحة', 'menu.slide': 'شريحة', 'menu.data': 'بيانات', 'menu.clip': 'مقطع',
      'menu.effects': 'مؤثرات', 'menu.draw': 'رسم', 'menu.modify': 'تعديل', 'menu.document': 'مستند', 'menu.arrange': 'ترتيب',
      'cmd.new': 'جديد', 'cmd.open': 'فتح…', 'cmd.save': 'حفظ', 'cmd.saveAs': 'حفظ باسم…', 'cmd.export': 'تصدير',
      'cmd.import': 'استيراد…', 'cmd.print': 'طباعة…', 'cmd.close': 'إغلاق', 'cmd.quit': 'خروج', 'cmd.newWindow': 'نافذة جديدة',
      'cmd.undo': 'تراجع', 'cmd.redo': 'إعادة', 'cmd.cut': 'قص', 'cmd.copy': 'نسخ', 'cmd.paste': 'لصق',
      'cmd.delete': 'حذف', 'cmd.duplicate': 'تكرار', 'cmd.selectAll': 'تحديد الكل', 'cmd.deselect': 'إلغاء التحديد',
      'cmd.zoomIn': 'تكبير', 'cmd.zoomOut': 'تصغير', 'cmd.fit': 'ملاءمة الشاشة', 'cmd.actualSize': 'الحجم الفعلي (100%)',
      'cmd.fullscreen': 'ملء الشاشة', 'cmd.about': 'حول {app}', 'cmd.shortcuts': 'اختصارات لوحة المفاتيح',
      'cmd.website': 'موقع المطو\u0651ر', 'cmd.contact': 'راسل المطو\u0651ر', 'cmd.find': 'بحث…', 'cmd.replace': 'بحث واستبدال…',
      'cmd.recent': 'الملفات الأخيرة', 'cmd.clearRecent': 'مسح القائمة', 'cmd.exportPDF': 'تصدير PDF…',
      'cmd.exportPNG': 'تصدير PNG…', 'cmd.exportJPG': 'تصدير JPG…', 'cmd.exportSVG': 'تصدير SVG…',
      'ui.language': 'اللغة', 'ui.theme': 'المظهر', 'ui.dark': 'داكن', 'ui.light': 'فاتح', 'ui.arabic': 'العربية', 'ui.english': 'English',
      'ui.toggleLang': 'English', 'ui.toggleTheme': 'تبديل المظهر', 'ui.settings': 'الإعدادات', 'ui.ok': 'موافق', 'ui.cancel': 'إلغاء',
      'ui.yes': 'نعم', 'ui.no': 'لا', 'ui.apply': 'تطبيق', 'ui.reset': 'إعادة ضبط', 'ui.close': 'إغلاق', 'ui.done': 'تم',
      'ui.untitled': 'بدون عنوان', 'ui.name': 'الاسم', 'ui.width': 'العرض', 'ui.height': 'الارتفاع', 'ui.size': 'الحجم',
      'ui.color': 'اللون', 'ui.opacity': 'الشفافية', 'ui.fill': 'التعبئة', 'ui.stroke': 'الحد', 'ui.strokeWidth': 'سماكة الحد',
      'ui.font': 'الخط', 'ui.fontSize': 'حجم الخط', 'ui.text': 'نص', 'ui.image': 'صورة', 'ui.background': 'الخلفية',
      'ui.position': 'الموضع', 'ui.rotation': 'الدوران', 'ui.radius': 'نصف قطر الزوايا', 'ui.quality': 'الجودة', 'ui.format': 'الصيغة',
      'ui.scale': 'المقياس', 'ui.units': 'الوحدات', 'ui.none': 'بدون', 'ui.auto': 'تلقائي', 'ui.custom': 'مخصص',
      'ui.properties': 'الخصائص', 'ui.layers': 'الطبقات', 'ui.pages': 'الصفحات', 'ui.zoom': 'التكبير', 'ui.loading': 'جار\u064D التحميل…',
      'ui.processing': 'جار\u064D المعالجة…', 'ui.saved': 'تم الحفظ', 'ui.exported': 'تم التصدير', 'ui.error': 'حدث خطأ',
      'ui.openFailed': 'تعذ\u0651ر فتح الملف', 'ui.saveFailed': 'تعذ\u0651ر حفظ الملف', 'ui.unsupported': 'صيغة غير مدعومة',
      'ui.dropHere': 'أفلت الملفات هنا', 'ui.version': 'الإصدار {v}', 'ui.developedBy': 'تطوير', 'ui.dev': 'المطو\u0651ر',
      'ui.partOf': 'جزء من منصة {platform}', 'ui.rights': '© {year} {dev}. جميع الحقوق محفوظة.',
      'ui.unsavedTitle': 'تغييرات غير محفوظة', 'ui.unsavedMsg': 'لديك تغييرات غير محفوظة. هل تريد المتابعة وفقدانها؟',
      'ui.discard': 'تجاهل التغييرات', 'ui.continue': 'متابعة', 'ui.left': 'يسار', 'ui.right': 'يمين', 'ui.center': 'وسط',
      'ui.top': 'أعلى', 'ui.bottom': 'أسفل', 'ui.middle': 'منتصف', 'ui.justify': 'ضبط', 'ui.bold': 'عريض', 'ui.italic': 'مائل',
      'ui.underline': 'تسطير', 'ui.strike': 'يتوسطه خط', 'ui.align': 'المحاذاة', 'ui.direction': 'الاتجاه',
      'ui.rtl': 'من اليمين لليسار', 'ui.ltr': 'من اليسار لليمين', 'ui.search': 'بحث', 'ui.all': 'الكل', 'ui.count': 'العدد',
      'ui.newDoc': 'مستند جديد', 'ui.openFile': 'فتح ملف', 'ui.recent': 'الأخيرة', 'ui.noRecent': 'لا توجد ملفات حديثة',
      'ui.welcome': 'مرحب\u064Bا بك في {app}', 'ui.lineHeight': 'تباعد الأسطر', 'ui.letterSpacing': 'تباعد الأحرف',
      'ui.shadow': 'الظل', 'ui.blur': 'التمويه', 'ui.x': 'س', 'ui.y': 'ص', 'ui.lock': 'قفل', 'ui.visible': 'إظهار/إخفاء',
      'ui.up': 'للأعلى', 'ui.down': 'للأسفل', 'ui.add': 'إضافة', 'ui.remove': 'إزالة', 'ui.rename': 'إعادة تسمية',
      'ui.preview': 'معاينة', 'ui.copySuffix': 'نسخة', 'ui.shortcutsTitle': 'اختصارات لوحة المفاتيح', 'ui.action': 'الأمر',
      'ui.shortcut': 'الاختصار', 'ui.pxUnit': 'بكسل', 'ui.mmUnit': 'مم', 'ui.ptUnit': 'نقطة', 'ui.percent': '٪',
      'ui.selection': 'التحديد', 'ui.nothingSelected': 'لا يوجد عنصر محدد', 'ui.file': 'ملف', 'ui.type': 'النوع',
      'ui.duration': 'المدة', 'ui.start': 'البداية', 'ui.end': 'النهاية', 'ui.volume': 'مستوى الصوت', 'ui.speed': 'السرعة',
      'ui.copied': 'تم النسخ', 'ui.webVersion': 'نسخة المتصفح', 'ui.desktop': 'سطح المكتب',
      'ui.exportPdfHint': 'اختر «حفظ بتنسيق PDF» من نافذة الطباعة',
      'fmt.allSupported': 'كل الملفات المدعومة', 'fmt.all': 'كل الملفات'
    },
    en: {
      'menu.file': 'File', 'menu.edit': 'Edit', 'menu.view': 'View', 'menu.insert': 'Insert', 'menu.format': 'Format',
      'menu.image': 'Image', 'menu.layer': 'Layer', 'menu.filter': 'Filters', 'menu.object': 'Object', 'menu.tools': 'Tools',
      'menu.help': 'Help', 'menu.page': 'Page', 'menu.slide': 'Slide', 'menu.data': 'Data', 'menu.clip': 'Clip',
      'menu.effects': 'Effects', 'menu.draw': 'Draw', 'menu.modify': 'Modify', 'menu.document': 'Document', 'menu.arrange': 'Arrange',
      'cmd.new': 'New', 'cmd.open': 'Open…', 'cmd.save': 'Save', 'cmd.saveAs': 'Save As…', 'cmd.export': 'Export',
      'cmd.import': 'Import…', 'cmd.print': 'Print…', 'cmd.close': 'Close', 'cmd.quit': 'Quit', 'cmd.newWindow': 'New Window',
      'cmd.undo': 'Undo', 'cmd.redo': 'Redo', 'cmd.cut': 'Cut', 'cmd.copy': 'Copy', 'cmd.paste': 'Paste',
      'cmd.delete': 'Delete', 'cmd.duplicate': 'Duplicate', 'cmd.selectAll': 'Select All', 'cmd.deselect': 'Deselect',
      'cmd.zoomIn': 'Zoom In', 'cmd.zoomOut': 'Zoom Out', 'cmd.fit': 'Fit to Screen', 'cmd.actualSize': 'Actual Size (100%)',
      'cmd.fullscreen': 'Full Screen', 'cmd.about': 'About {app}', 'cmd.shortcuts': 'Keyboard Shortcuts',
      'cmd.website': 'Developer Website', 'cmd.contact': 'Contact Developer', 'cmd.find': 'Find…', 'cmd.replace': 'Find & Replace…',
      'cmd.recent': 'Recent Files', 'cmd.clearRecent': 'Clear List', 'cmd.exportPDF': 'Export PDF…',
      'cmd.exportPNG': 'Export PNG…', 'cmd.exportJPG': 'Export JPG…', 'cmd.exportSVG': 'Export SVG…',
      'ui.language': 'Language', 'ui.theme': 'Appearance', 'ui.dark': 'Dark', 'ui.light': 'Light', 'ui.arabic': 'العربية', 'ui.english': 'English',
      'ui.toggleLang': 'العربية', 'ui.toggleTheme': 'Toggle appearance', 'ui.settings': 'Settings', 'ui.ok': 'OK', 'ui.cancel': 'Cancel',
      'ui.yes': 'Yes', 'ui.no': 'No', 'ui.apply': 'Apply', 'ui.reset': 'Reset', 'ui.close': 'Close', 'ui.done': 'Done',
      'ui.untitled': 'Untitled', 'ui.name': 'Name', 'ui.width': 'Width', 'ui.height': 'Height', 'ui.size': 'Size',
      'ui.color': 'Color', 'ui.opacity': 'Opacity', 'ui.fill': 'Fill', 'ui.stroke': 'Stroke', 'ui.strokeWidth': 'Stroke width',
      'ui.font': 'Font', 'ui.fontSize': 'Font size', 'ui.text': 'Text', 'ui.image': 'Image', 'ui.background': 'Background',
      'ui.position': 'Position', 'ui.rotation': 'Rotation', 'ui.radius': 'Corner radius', 'ui.quality': 'Quality', 'ui.format': 'Format',
      'ui.scale': 'Scale', 'ui.units': 'Units', 'ui.none': 'None', 'ui.auto': 'Auto', 'ui.custom': 'Custom',
      'ui.properties': 'Properties', 'ui.layers': 'Layers', 'ui.pages': 'Pages', 'ui.zoom': 'Zoom', 'ui.loading': 'Loading…',
      'ui.processing': 'Processing…', 'ui.saved': 'Saved', 'ui.exported': 'Exported', 'ui.error': 'Something went wrong',
      'ui.openFailed': 'Could not open the file', 'ui.saveFailed': 'Could not save the file', 'ui.unsupported': 'Unsupported format',
      'ui.dropHere': 'Drop files here', 'ui.version': 'Version {v}', 'ui.developedBy': 'Developed by', 'ui.dev': 'Developer',
      'ui.partOf': 'Part of the {platform} suite', 'ui.rights': '© {year} {dev}. All rights reserved.',
      'ui.unsavedTitle': 'Unsaved changes', 'ui.unsavedMsg': 'You have unsaved changes. Continue and lose them?',
      'ui.discard': 'Discard changes', 'ui.continue': 'Continue', 'ui.left': 'Left', 'ui.right': 'Right', 'ui.center': 'Center',
      'ui.top': 'Top', 'ui.bottom': 'Bottom', 'ui.middle': 'Middle', 'ui.justify': 'Justify', 'ui.bold': 'Bold', 'ui.italic': 'Italic',
      'ui.underline': 'Underline', 'ui.strike': 'Strikethrough', 'ui.align': 'Alignment', 'ui.direction': 'Direction',
      'ui.rtl': 'Right to left', 'ui.ltr': 'Left to right', 'ui.search': 'Search', 'ui.all': 'All', 'ui.count': 'Count',
      'ui.newDoc': 'New document', 'ui.openFile': 'Open file', 'ui.recent': 'Recent', 'ui.noRecent': 'No recent files',
      'ui.welcome': 'Welcome to {app}', 'ui.lineHeight': 'Line height', 'ui.letterSpacing': 'Letter spacing',
      'ui.shadow': 'Shadow', 'ui.blur': 'Blur', 'ui.x': 'X', 'ui.y': 'Y', 'ui.lock': 'Lock', 'ui.visible': 'Show/Hide',
      'ui.up': 'Up', 'ui.down': 'Down', 'ui.add': 'Add', 'ui.remove': 'Remove', 'ui.rename': 'Rename',
      'ui.preview': 'Preview', 'ui.copySuffix': 'copy', 'ui.shortcutsTitle': 'Keyboard shortcuts', 'ui.action': 'Action',
      'ui.shortcut': 'Shortcut', 'ui.pxUnit': 'px', 'ui.mmUnit': 'mm', 'ui.ptUnit': 'pt', 'ui.percent': '%',
      'ui.selection': 'Selection', 'ui.nothingSelected': 'Nothing selected', 'ui.file': 'File', 'ui.type': 'Type',
      'ui.duration': 'Duration', 'ui.start': 'Start', 'ui.end': 'End', 'ui.volume': 'Volume', 'ui.speed': 'Speed',
      'ui.copied': 'Copied', 'ui.webVersion': 'Web version', 'ui.desktop': 'Desktop',
      'ui.exportPdfHint': 'Choose “Save as PDF” in the print dialog',
      'fmt.allSupported': 'All supported files', 'fmt.all': 'All files'
    }
  });

  /* ───────────── اختصارات لوحة المفاتيح ───────────── */
  const bindings = [];
  function parseCombo(combo) {
    const parts = combo.split('+').map((p) => p.trim());
    const key = parts.pop();
    const mods = { mod: false, shift: false, alt: false, ctrl: false };
    parts.forEach((p) => { mods[p.toLowerCase()] = true; });
    return { key, mods };
  }
  function keyMatches(e, key) {
    if (key.length === 1 && /[a-z]/i.test(key)) return e.code === 'Key' + key.toUpperCase();
    if (key.length === 1 && /[0-9]/.test(key)) return e.code === 'Digit' + key || e.code === 'Numpad' + key;
    const map = { '+': ['Equal', 'NumpadAdd'], '=': ['Equal'], '-': ['Minus', 'NumpadSubtract'], '[': ['BracketLeft'], ']': ['BracketRight'], '/': ['Slash'], '\\': ['Backslash'], ',': ['Comma'], '.': ['Period'], ';': ['Semicolon'], "'": ['Quote'], '`': ['Backquote'], Space: ['Space'] };
    if (map[key]) return map[key].includes(e.code);
    if (key === 'Del' || key === 'Delete') return e.key === 'Delete';
    return e.key === key || e.code === key;
  }
  W.keys = {
    bind(combo, fn, opts) {
      (Array.isArray(combo) ? combo : [combo]).forEach((c) => bindings.push({ c, p: parseCombo(c), fn, opts: opts || {} }));
    },
    unbindAll() { bindings.length = 0; },
    label(combo) {
      if (!combo) return '';
      const c = Array.isArray(combo) ? combo[0] : combo;
      return c.split('+').map((p) => {
        const l = p.toLowerCase();
        if (l === 'mod') return isMac ? '⌘' : 'Ctrl';
        if (l === 'shift') return isMac ? '⇧' : 'Shift';
        if (l === 'alt') return isMac ? '⌥' : 'Alt';
        if (l === 'ctrl') return isMac ? '⌃' : 'Ctrl';
        if (p === 'Delete' || p === 'Del') return isMac ? '⌫' : 'Del';
        if (p === 'ArrowLeft') return '←'; if (p === 'ArrowRight') return '→'; if (p === 'ArrowUp') return '↑'; if (p === 'ArrowDown') return '↓';
        if (p === 'Escape') return 'Esc';
        return p.length === 1 ? p.toUpperCase() : p;
      }).join(isMac ? '' : '+');
    },
    list() { return bindings.slice(); }
  };
  function inEditable(t) {
    if (!t) return false;
    const tag = t.tagName;
    return t.isContentEditable || tag === 'TEXTAREA' || (tag === 'INPUT' && !['checkbox', 'radio', 'range', 'color', 'button'].includes(t.type)) || tag === 'SELECT';
  }
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.w-overlay') && !e.target.closest('.w-overlay')) return;
    const editable = inEditable(e.target);
    for (let i = bindings.length - 1; i >= 0; i--) {
      const b = bindings[i];
      const m = b.p.mods;
      const modPressed = isMac ? e.metaKey : e.ctrlKey;
      if (!!m.mod !== modPressed) continue;
      if (!!m.shift !== e.shiftKey) continue;
      if (!!m.alt !== e.altKey) continue;
      if (m.ctrl && !e.ctrlKey) continue;
      if (!keyMatches(e, b.p.key)) continue;
      if (editable && !b.opts.global) {
        // داخل حقول الكتابة: نسمح فقط باختصارات Mod غير المتعارضة مع التحرير النصي
        const k = b.p.key.toLowerCase();
        if (!m.mod || ['c', 'v', 'x', 'z', 'y', 'a', 'b', 'i', 'u'].includes(k)) continue;
      }
      if (b.opts.when && !b.opts.when()) continue;
      e.preventDefault();
      e.stopPropagation();
      b.fn(e);
      return;
    }
  }, true);

  /* ───────────── القوائم ───────────── */
  let openMenu = null;
  function closeMenus() {
    document.querySelectorAll('.w-menu').forEach((m) => m.remove());
    document.querySelectorAll('.w-menu-trigger.open').forEach((t) => t.classList.remove('open'));
    openMenu = null;
  }
  W.closeMenus = closeMenus;
  const resolve = (v) => (typeof v === 'function' ? v() : v);

  /** عرض قائمة عند نقطة. items: [{label, i18n, shortcut, action, icon, checked, disabled, submenu}|'-'] */
  W.showMenu = function (items, x, y, opts) {
    opts = opts || {};
    if (!opts.keepOthers) closeMenus();
    const menu = W.h('div', { class: 'w-menu', role: 'menu' });
    items = resolve(items) || [];
    items.forEach((it) => {
      if (it === '-' || it.sep) { menu.append(W.h('div', { class: 'w-menu-sep' })); return; }
      if (resolve(it.hidden)) return;
      const label = it.i18n ? W.t(it.i18n, it.vars) : (typeof it.label === 'function' ? it.label() : W.t(it.label, it.vars));
      const checked = resolve(it.checked);
      const el = W.h('div', { class: 'w-menu-item' + (resolve(it.disabled) ? ' disabled' : '') + (it.submenu ? ' has-sub' : ''), role: 'menuitem' },
        W.h('span', { class: 'w-check', html: checked ? W.icon('check') : (it.icon ? W.icon(it.icon) : '') }),
        W.h('span', { class: 'w-label', text: label }),
        it.shortcut ? W.h('span', { class: 'w-shortcut', text: W.keys.label(it.shortcut) }) : null
      );
      el.querySelectorAll('svg').forEach((s) => { s.style.width = '15px'; s.style.height = '15px'; });
      if (it.submenu) {
        let sub = null;
        el.addEventListener('mouseenter', () => {
          document.querySelectorAll('.w-menu.sub').forEach((m) => { if (m.dataset.parent === menu.dataset.mid) m.remove(); });
          const r = el.getBoundingClientRect();
          sub = W.showMenu(it.submenu, W.isRTL() ? r.left : r.right, r.top - 5, { keepOthers: true, sub: true, anchorRect: r });
          sub.classList.add('sub');
          sub.dataset.parent = menu.dataset.mid;
        });
      } else {
        el.addEventListener('mouseenter', () => {
          document.querySelectorAll('.w-menu.sub').forEach((m) => { if (m.dataset.parent === menu.dataset.mid) m.remove(); });
        });
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          closeMenus();
          if (it.action) setTimeout(() => it.action(e), 0);
        });
      }
      menu.append(el);
    });
    menu.dataset.mid = W.uid('m');
    document.body.append(menu);
    const mw = menu.offsetWidth, mh = menu.offsetHeight;
    let left;
    if (opts.sub) {
      const r = opts.anchorRect;
      left = W.isRTL() ? r.left - mw + 4 : r.right - 4;
      if (left < 4) left = r.right - 4;
      if (left + mw > innerWidth - 4) left = r.left - mw + 4;
    } else {
      left = opts.alignEnd || (W.isRTL() && !opts.atPoint) ? x - mw : x;
      if (opts.atPoint && W.isRTL()) left = x - mw;
    }
    left = W.clamp(left, 4, innerWidth - mw - 4);
    const top = W.clamp(y, 4, innerHeight - mh - 4);
    menu.style.left = left + 'px';
    menu.style.top = top + 'px';
    if (!opts.sub) openMenu = menu;
    return menu;
  };
  W.contextMenu = function (e, items) {
    e.preventDefault();
    W.showMenu(items, e.clientX, e.clientY, { atPoint: true });
  };
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.w-menu') && !e.target.closest('.w-menu-trigger')) closeMenus();
  });
  window.addEventListener('blur', () => closeMenus());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openMenu) { closeMenus(); e.stopPropagation(); } }, true);

  /* ───────────── الوثيقة الحالية والعنوان ───────────── */
  W.doc = { name: null, path: null, dirty: false };
  W.updateWindowTitle = function () {
    const appName = W.app ? W.L(W.app.name) : W.L(R.platform.name);
    const name = W.doc.name || W.t('ui.untitled');
    document.title = (W.doc.name || W.doc.dirty ? name + (W.doc.dirty ? ' •' : '') + ' — ' : '') + appName;
    const el = document.querySelector('.w-doc-title');
    if (el) { el.textContent = W.doc.name || (W.doc.dirty ? W.t('ui.untitled') : ''); el.classList.toggle('dirty', W.doc.dirty); }
    if (native && native.setCloseGuard) native.setCloseGuard({ dirty: W.doc.dirty, empty: !W.doc.name && !W.doc.dirty, title: W.t('ui.unsavedTitle'), message: W.t('ui.unsavedMsg'), discard: W.t('ui.discard'), cancel: W.t('ui.cancel') });
  };
  W.setDoc = function (patch) { Object.assign(W.doc, patch); W.updateWindowTitle(); };
  W.setDirty = function (d) { if (W.doc.dirty !== !!d) { W.doc.dirty = !!d; W.updateWindowTitle(); } };
  window.addEventListener('beforeunload', (e) => {
    if (W.doc.dirty && !native) { e.preventDefault(); e.returnValue = ''; }
  });
  /** يتأكد من المستخدم قبل فقدان تغييرات غير محفوظة */
  W.confirmDiscard = async function () {
    if (!W.doc.dirty) return true;
    return W.confirm(W.t('ui.unsavedMsg'), { title: W.t('ui.unsavedTitle'), ok: W.t('ui.discard'), danger: true });
  };

  /* ───────────── شريط القوائم ───────────── */
  /**
   * W.menubar(container, menus, opts)
   * menus: [{ i18n:'menu.file', items:[...] }]
   */
  W.menubar = function (container, menus, opts) {
    opts = opts || {};
    container.classList.add('w-menubar');
    container.innerHTML = '';
    const meta = W.app || { id: 'hub', name: R.platform.name };
    const brand = W.h('div', { class: 'w-brand' },
      W.h('img', { src: SHARED_BASE + 'icons/' + meta.id + '.png', alt: '' }),
      W.h('span', { class: 'w-brand-name' })
    );
    container.append(brand);
    const triggers = [];
    menus.forEach((m) => {
      const t = W.h('button', { class: 'w-menu-trigger', type: 'button' });
      t.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (t.classList.contains('open')) { closeMenus(); return; }
        open(t, m);
      });
      t.addEventListener('mouseenter', () => { if (openMenu && !t.classList.contains('open')) open(t, m); });
      triggers.push({ t, m });
      container.append(t);
      // تسجيل الاختصارات
      const reg = (items) => (resolve(items) || []).forEach((it) => {
        if (it && it.shortcut && it.action && !it.noBind) {
          W.keys.bind(it.shortcut, (e) => { if (!resolve(it.disabled)) it.action(e); }, { global: it.global });
        }
        if (it && it.submenu && typeof it.submenu !== 'function') reg(it.submenu);
      });
      reg(m.items);
    });
    function open(t, m) {
      closeMenus();
      const r = t.getBoundingClientRect();
      t.classList.add('open');
      W.showMenu(m.items, W.isRTL() ? r.right : r.left, r.bottom + 2, { keepOthers: true });
      if (W.isRTL()) {
        const menu = openMenu;
        if (menu) menu.style.left = W.clamp(r.right - menu.offsetWidth, 4, innerWidth - menu.offsetWidth - 4) + 'px';
      }
    }
    container.append(W.h('div', { class: 'w-spacer' }));
    container.append(W.h('div', { class: 'w-doc-title' }));
    container.append(W.h('div', { class: 'w-spacer' }));
    if (opts.extra) opts.extra.forEach((x) => container.append(x));
    const langBtn = W.h('button', { class: 'w-btn ghost sm', type: 'button', onclick: () => W.setLang(W.lang === 'ar' ? 'en' : 'ar') },
      W.iconEl('globe'), W.h('span', { 'data-i18n': 'ui.toggleLang' }));
    const themeBtn = W.h('button', { class: 'w-icon-btn sm', type: 'button', 'data-tip': 'ui.toggleTheme', onclick: () => W.setTheme(W.theme === 'dark' ? 'light' : 'dark') });
    const aboutBtn = W.h('button', { class: 'w-icon-btn sm', type: 'button', 'data-tip': 'cmd.about', onclick: () => W.about() });
    aboutBtn.innerHTML = W.icon('info');
    container.append(langBtn, themeBtn, aboutBtn);
    function render() {
      brand.querySelector('.w-brand-name').textContent = W.L(meta.name);
      triggers.forEach(({ t, m }) => { t.textContent = W.t(m.i18n || m.label); });
      themeBtn.innerHTML = W.icon(W.theme === 'dark' ? 'sun' : 'moon');
      aboutBtn.dataset.tip = 'cmd.about';
      W.translate(container);
      W.updateWindowTitle();
    }
    render();
    W.on('langchange', render);
    W.on('themechange', render);
    return { render };
  };

  /** القوائم القياسية المتكررة */
  W.stdHelpMenu = function (extra) {
    return {
      i18n: 'menu.help',
      items: [
        ...(extra || []),
        { i18n: 'cmd.shortcuts', icon: 'keyboard', action: () => W.showShortcuts() },
        '-',
        { i18n: 'cmd.website', icon: 'globe', action: () => W.openExternal(R.developer.website) },
        { i18n: 'cmd.contact', icon: 'mail', action: () => W.openExternal('mailto:' + R.developer.email) },
        '-',
        { label: () => W.t('cmd.about', { app: W.app ? W.L(W.app.name) : W.L(R.platform.name) }), icon: 'info', action: () => W.about() }
      ]
    };
  };
  W.stdViewItems = function () {
    return [
      { label: () => W.lang === 'ar' ? 'English' : 'العربية', icon: 'globe', action: () => W.setLang(W.lang === 'ar' ? 'en' : 'ar') },
      { label: () => W.t('ui.theme') + ': ' + W.t(W.theme === 'dark' ? 'ui.light' : 'ui.dark'), icon: 'sun', action: () => W.setTheme(W.theme === 'dark' ? 'light' : 'dark') },
      { i18n: 'cmd.fullscreen', icon: 'fullscreen', shortcut: 'F11', action: () => W.toggleFullscreen() }
    ];
  };
  W.toggleFullscreen = function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  /* ───────────── شريط الحالة ───────────── */
  W.statusbar = function (container) {
    container.classList.add('w-statusbar');
    const left = W.h('div', { class: 'row w-status-main' });
    const credit = W.h('a', { href: '#', onclick: (e) => { e.preventDefault(); W.openExternal(R.developer.website); } });
    container.append(left, W.h('div', { class: 'w-spacer' }), credit);
    function render() {
      credit.textContent = W.L(R.platform.name) + ' • ' + W.t('ui.developedBy') + ' ' + W.L(R.developer.name);
    }
    render();
    W.on('langchange', render);
    return {
      el: left,
      set(html) { left.innerHTML = html; },
      item(key) {
        let el = left.querySelector('[data-k="' + key + '"]');
        if (!el) { el = W.h('span', { 'data-k': key }); left.append(el); }
        return el;
      }
    };
  };

  /* ───────────── الحوارات ───────────── */
  /** W.dialog({title, body, buttons:[{label|i18n, value, primary, danger}], width}) → Promise(value|null) */
  W.dialog = function (o) {
    return new Promise((resolveP) => {
      closeMenus();
      const overlay = W.h('div', { class: 'w-overlay' });
      const dlg = W.h('div', { class: 'w-dialog', role: 'dialog', 'aria-modal': 'true' });
      if (o.width) dlg.style.width = typeof o.width === 'number' ? o.width + 'px' : o.width;
      const head = W.h('div', { class: 'w-dialog-head' },
        o.icon ? W.iconEl(o.icon) : null,
        W.h('span', { text: o.title || '' }),
        W.h('div', { class: 'w-spacer' }),
        W.h('button', { class: 'w-icon-btn sm', type: 'button', html: W.icon('x'), onclick: () => done(null) })
      );
      const body = W.h('div', { class: 'w-dialog-body' });
      if (o.body instanceof Node) body.append(o.body);
      else if (o.html) body.innerHTML = o.body;
      else if (o.body != null) body.append(W.h('div', { style: { whiteSpace: 'pre-wrap' }, text: o.body }));
      const foot = W.h('div', { class: 'w-dialog-foot' });
      const buttons = o.buttons || [{ i18n: 'ui.ok', value: true, primary: true }];
      if (o.footStart) foot.append(o.footStart, W.h('div', { class: 'w-spacer' }));
      buttons.forEach((b) => {
        foot.append(W.h('button', {
          class: 'w-btn' + (b.primary ? ' primary' : '') + (b.danger ? ' danger' : ''), type: 'button',
          text: b.i18n ? W.t(b.i18n) : b.label,
          onclick: async () => {
            if (b.onClick) { await b.onClick(); if (b.keepOpen) return; }
            if (b.validate && !(await b.validate())) return;
            done(typeof b.value === 'function' ? b.value() : b.value);
          }
        }));
      });
      dlg.append(head, body);
      if (buttons.length) dlg.append(foot);
      overlay.append(dlg);
      overlay.addEventListener('mousedown', (e) => { if (e.target === overlay && o.dismissable !== false) done(null); });
      function onKey(e) {
        if (e.key === 'Escape') { e.preventDefault(); done(null); }
        else if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
          const primary = buttons.find((b) => b.primary);
          if (primary) { e.preventDefault(); foot.querySelector('.primary').click(); }
        }
      }
      document.addEventListener('keydown', onKey, true);
      function done(v) {
        document.removeEventListener('keydown', onKey, true);
        overlay.remove();
        if (o.onClose) o.onClose(v);
        resolveP(v);
      }
      document.body.append(overlay);
      W.translate(dlg);
      const focusEl = body.querySelector('input, select, textarea, [contenteditable]') || foot.querySelector('.primary');
      if (focusEl) setTimeout(() => { focusEl.focus(); if (focusEl.select) focusEl.select(); }, 30);
      if (o.onOpen) o.onOpen(dlg, done);
    });
  };
  W.alert = (msg, title) => W.dialog({ title: title || W.L(W.app ? W.app.name : R.platform.name), body: msg, buttons: [{ i18n: 'ui.ok', value: true, primary: true }] });
  W.confirm = (msg, o) => {
    o = o || {};
    return W.dialog({
      title: o.title || W.L(W.app ? W.app.name : R.platform.name), body: msg,
      buttons: [{ label: o.cancel || W.t('ui.cancel'), value: false }, { label: o.ok || W.t('ui.ok'), value: true, primary: !o.danger, danger: !!o.danger }]
    }).then((v) => !!v);
  };
  W.prompt = (msg, def, o) => {
    o = o || {};
    const input = W.h('input', { class: 'w-input', value: def == null ? '' : def, style: { width: '100%' } });
    const body = W.h('div', { class: 'col' }, msg ? W.h('div', { text: msg }) : null, input);
    return W.dialog({ title: o.title || '', body, buttons: [{ i18n: 'ui.cancel', value: null }, { i18n: 'ui.ok', value: () => input.value, primary: true }] });
  };

  /**
   * نموذج سريع: W.form(title, fields) → Promise(values|null)
   * fields: [{key, label|i18n, type:'text'|'number'|'select'|'color'|'checkbox'|'range'|'textarea', value, options:[{value,label}], min, max, step, row}]
   */
  W.form = function (title, fields, o) {
    o = o || {};
    const inputs = {};
    const body = W.h('div', { style: { minWidth: (o.minWidth || 340) + 'px' } });
    let row = null;
    fields.forEach((f) => {
      if (f.type === 'heading') { body.append(W.h('div', { class: 'w-label-sm', style: { margin: '6px 0 6px', fontWeight: 700 }, text: f.i18n ? W.t(f.i18n) : f.label })); return; }
      const label = f.i18n ? W.t(f.i18n) : f.label;
      let input;
      if (f.type === 'select') {
        input = W.h('select', { class: 'w-select' });
        f.options.forEach((op) => input.append(W.h('option', { value: op.value, text: op.i18n ? W.t(op.i18n) : op.label })));
        input.value = f.value;
      } else if (f.type === 'checkbox') {
        input = W.h('input', { type: 'checkbox' });
        input.checked = !!f.value;
        const wrap = W.h('label', { class: 'w-check-row' }, input, W.h('span', { text: label }));
        inputs[f.key] = input;
        body.append(wrap);
        return;
      } else if (f.type === 'textarea') {
        input = W.h('textarea', { class: 'w-textarea', rows: f.rows || 4 });
        input.value = f.value || '';
      } else if (f.type === 'color') {
        input = W.h('input', { type: 'color', class: 'w-color', value: f.value || '#000000' });
      } else if (f.type === 'range') {
        input = W.h('input', { type: 'range', class: 'w-range', min: f.min, max: f.max, step: f.step || 1, value: f.value });
      } else {
        input = W.h('input', { class: 'w-input', type: f.type || 'text', value: f.value == null ? '' : f.value });
        if (f.min != null) input.min = f.min;
        if (f.max != null) input.max = f.max;
        if (f.step != null) input.step = f.step;
        if (f.placeholder) input.placeholder = f.placeholder;
      }
      inputs[f.key] = input;
      if (f.onInput) input.addEventListener('input', () => f.onInput(input.value, inputs));
      const field = W.h('div', { class: 'w-field' }, W.h('label', { text: label }), input);
      if (f.row) {
        if (!row || row.dataset.row !== f.row) { row = W.h('div', { class: 'w-input-group', 'data-row': f.row }); body.append(row); }
        row.append(field);
      } else { row = null; body.append(field); }
    });
    if (o.footer) body.append(o.footer);
    return W.dialog({
      title, body, width: o.width,
      buttons: [{ i18n: 'ui.cancel', value: null }, {
        label: o.okLabel || W.t('ui.ok'), primary: true,
        value: () => {
          const out = {};
          fields.forEach((f) => {
            const i = inputs[f.key]; if (!i) return;
            out[f.key] = f.type === 'checkbox' ? i.checked : (f.type === 'number' || f.type === 'range') ? parseFloat(i.value) : i.value;
          });
          return out;
        }
      }],
      onOpen: o.onOpen ? (dlg) => o.onOpen(dlg, inputs) : null
    });
  };

  /* ───────────── الإشعارات ───────────── */
  W.toast = function (msg, type, ms) {
    let box = document.querySelector('.w-toasts');
    if (!box) { box = W.h('div', { class: 'w-toasts' }); document.body.append(box); }
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert' : 'info';
    const t = W.h('div', { class: 'w-toast ' + (type || '') }, W.iconEl(icon), W.h('span', { text: msg }));
    box.append(t);
    setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, ms || 2600);
  };
  W.busy = async function (msgKey, fn) {
    const overlay = W.h('div', { class: 'w-overlay' }, W.h('div', { class: 'w-dialog', style: { padding: '22px 30px', minWidth: '260px' } },
      W.h('div', { class: 'col', style: { alignItems: 'center' } },
        W.h('div', { text: W.t(msgKey || 'ui.processing') }),
        W.h('div', { class: 'w-progress', style: { width: '220px' } }, W.h('div'))
      )));
    document.body.append(overlay);
    const bar = overlay.querySelector('.w-progress > div');
    const set = (p) => { bar.style.width = Math.round(W.clamp(p, 0, 1) * 100) + '%'; };
    set(0.08);
    try { await W.sleep(16); return await fn(set); }
    finally { overlay.remove(); }
  };

  /* ───────────── التلميحات ───────────── */
  let tipEl = null, tipTimer = null;
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest && e.target.closest('[data-tip]');
    clearTimeout(tipTimer);
    if (tipEl) { tipEl.remove(); tipEl = null; }
    if (!t) return;
    tipTimer = setTimeout(() => {
      if (!document.body.contains(t)) return;
      const r = t.getBoundingClientRect();
      tipEl = W.h('div', { class: 'w-tooltip' }, W.h('span', { text: W.t(t.dataset.tip) }),
        t.dataset.shortcut ? W.h('span', { class: 'w-shortcut', text: W.keys.label(t.dataset.shortcut) }) : null);
      document.body.append(tipEl);
      const tw = tipEl.offsetWidth, th = tipEl.offsetHeight;
      let x = r.left + r.width / 2 - tw / 2, y = r.bottom + 6;
      if (t.closest('.w-tools')) { x = W.isRTL() ? r.left - tw - 6 : r.right + 6; y = r.top + r.height / 2 - th / 2; }
      if (y + th > innerHeight - 4) y = r.top - th - 6;
      tipEl.style.left = W.clamp(x, 4, innerWidth - tw - 4) + 'px';
      tipEl.style.top = W.clamp(y, 4, innerHeight - th - 4) + 'px';
    }, 450);
  });
  document.addEventListener('mousedown', () => { clearTimeout(tipTimer); if (tipEl) { tipEl.remove(); tipEl = null; } }, true);

  /* ───────────── نافذة "حول" ───────────── */
  W.about = function () {
    const meta = W.app || { id: 'hub', name: R.platform.name, desc: R.platform.tagline };
    const dev = R.developer;
    const body = W.h('div', { class: 'w-about' },
      W.h('img', { src: SHARED_BASE + 'icons/' + meta.id + '.png', alt: '' }),
      W.h('h2', { text: W.L(meta.name) }),
      W.h('div', { class: 'w-about-en', text: (meta.name.en || '').toUpperCase() }),
      W.h('div', { class: 'muted', text: W.L(meta.desc) }),
      W.h('div', { class: 'small muted', text: W.t('ui.version', { v: R.version }) + (W.isElectron ? '' : ' • ' + W.t('ui.webVersion')) }),
      W.h('div', { class: 'w-about-card' },
        W.h('div', { class: 'muted small', text: W.t('ui.developedBy') }),
        W.h('div', { class: 'w-about-dev', text: W.L(dev.name) }),
        W.h('div', { class: 'row' },
          W.h('a', { href: '#', class: 'row', onclick: (e) => { e.preventDefault(); W.openExternal(dev.website); } }, W.iconEl('globe'), W.h('span', { class: 'ltr', text: dev.websiteLabel })),
          W.h('span', { class: 'muted', text: '•' }),
          W.h('a', { href: '#', class: 'row', onclick: (e) => { e.preventDefault(); W.openExternal('mailto:' + dev.email); } }, W.iconEl('mail'), W.h('span', { class: 'ltr', text: dev.email }))
        )
      ),
      W.h('div', { class: 'small muted', style: { marginTop: '8px' }, text: W.app ? W.t('ui.partOf', { platform: W.lang === 'ar' ? 'ورشة WARSHA' : 'WARSHA' }) : W.L(R.platform.tagline) }),
      W.h('div', { class: 'small muted', text: W.t('ui.rights', { year: R.copyrightYear, dev: W.L(dev.name) }) })
    );
    body.querySelectorAll('.w-about-card svg').forEach((s) => { s.style.width = '15px'; s.style.height = '15px'; });
    return W.dialog({ title: '', body, buttons: [{ i18n: 'ui.close', value: true, primary: true }] });
  };

  W.showShortcuts = function (extra) {
    const rows = [];
    const seen = new Set();
    const collect = (items) => (resolve(items) || []).forEach((it) => {
      if (!it || it === '-') return;
      if (it.submenu && typeof it.submenu !== 'function') collect(it.submenu);
      if (it.shortcut && !seen.has(it.shortcut)) {
        seen.add(it.shortcut);
        rows.push([it.i18n ? W.t(it.i18n, it.vars) : (typeof it.label === 'function' ? it.label() : W.t(it.label)), it.shortcut]);
      }
    });
    (W._menus || []).forEach((m) => collect(m.items));
    (extra || W._extraShortcuts || []).forEach((r) => rows.push([W.t(r[0]), r[1]]));
    const table = W.h('table', { style: { width: '100%', borderCollapse: 'collapse' } },
      ...rows.map(([a, s]) => W.h('tr', null,
        W.h('td', { style: { padding: '5px 4px', borderBottom: '1px solid var(--border)' }, text: a }),
        W.h('td', { style: { padding: '5px 4px', borderBottom: '1px solid var(--border)', textAlign: 'end' } }, W.h('span', { class: 'w-kbd', text: W.keys.label(s) })))));
    return W.dialog({ title: W.t('ui.shortcutsTitle'), body: W.h('div', { style: { minWidth: '380px', maxHeight: '60vh', overflow: 'auto' } }, table) });
  };

  /* ───────────── الروابط الخارجية ───────────── */
  W.openExternal = function (url) {
    if (native && native.openExternal) native.openExternal(url);
    else window.open(url, '_blank', 'noopener');
  };

  /* ───────────── الملفات ───────────── */
  const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', bmp: 'image/bmp', svg: 'image/svg+xml', pdf: 'application/pdf', json: 'application/json', txt: 'text/plain', html: 'text/html', htm: 'text/html', md: 'text/markdown', csv: 'text/csv', wav: 'audio/wav', mp3: 'audio/mpeg', ogg: 'audio/ogg', m4a: 'audio/mp4', flac: 'audio/flac', opus: 'audio/opus', webm: 'video/webm', mp4: 'video/mp4', mov: 'video/quicktime', mkv: 'video/x-matroska', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', dxf: 'application/dxf', zip: 'application/zip' };
  W.mime = (ext) => MIME[String(ext).toLowerCase()] || 'application/octet-stream';
  W.files = {
    ext(name) { const m = /\.([^./\\]+)$/.exec(name || ''); return m ? m[1].toLowerCase() : ''; },
    base(name) { return String(name || '').replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, ''); },
    fileName(p) { return String(p || '').replace(/^.*[\\/]/, ''); },
    async toBytes(data) {
      if (data == null) return new Uint8Array();
      if (data instanceof Uint8Array) return data;
      if (data instanceof ArrayBuffer) return new Uint8Array(data);
      if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      if (data instanceof Blob) return new Uint8Array(await data.arrayBuffer());
      return new TextEncoder().encode(String(data));
    },
    decodeText(bytes) {
      bytes = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
      if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) bytes = bytes.subarray(3);
      try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
      catch (e) { try { return new TextDecoder('windows-1256').decode(bytes); } catch (e2) { return new TextDecoder().decode(bytes); } }
    },
    /** يحو\u0651ل مواصفات الأنواع إلى صيغة accept/filters */
    normalize(types) {
      // types: [{name|i18n, ext:[...]}] أو مصفوفة امتدادات
      if (!types || !types.length) return [];
      if (typeof types[0] === 'string') return [{ name: types.map((e) => e.toUpperCase()).join(', '), extensions: types }];
      return types.map((t) => ({ name: t.i18n ? W.t(t.i18n) : W.L(t.name), extensions: t.ext }));
    },
    /**
     * فتح ملفات: W.files.open({types, multiple, as:'arraybuffer'|'text'|'dataurl'|'bytes'})
     * يرجع [{name, path, data, size, ext}] أو [] عند الإلغاء
     */
    async open(o) {
      o = o || {};
      const filters = W.files.normalize(o.types);
      const all = filters.flatMap((f) => f.extensions);
      if (native && native.openFile) {
        const fl = all.length ? [{ name: W.t('fmt.allSupported'), extensions: all }, ...(filters.length > 1 ? filters : []), { name: W.t('fmt.all'), extensions: ['*'] }] : [];
        const res = await native.openFile({ filters: fl, multiple: !!o.multiple });
        return (res || []).map((f) => W.files._wrap(f.name, f.path, f.data, o.as));
      }
      return new Promise((resolveP) => {
        const input = W.h('input', { type: 'file', style: { display: 'none' } });
        if (o.multiple) input.multiple = true;
        if (all.length) input.accept = all.map((e) => '.' + e).join(',');
        input.addEventListener('change', async () => {
          const out = [];
          for (const f of Array.from(input.files)) out.push(await W.files.fromFile(f, o.as));
          input.remove();
          resolveP(out);
        });
        input.addEventListener('cancel', () => { input.remove(); resolveP([]); });
        document.body.append(input);
        input.click();
      });
    },
    _wrap(name, path, bytes, as) {
      bytes = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
      const ext = W.files.ext(name);
      let data;
      if (as === 'text') data = W.files.decodeText(bytes);
      else if (as === 'dataurl') data = 'data:' + W.mime(ext) + ';base64,' + W.b64.encode(bytes);
      else if (as === 'blob') data = new Blob([bytes], { type: W.mime(ext) });
      else if (as === 'bytes') data = bytes;
      else data = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      return { name, path: path || null, data, size: bytes.byteLength, ext };
    },
    async fromFile(file, as) {
      const buf = new Uint8Array(await file.arrayBuffer());
      let path = null;
      if (native && native.getPathForFile) { try { path = native.getPathForFile(file) || null; } catch (e) { path = null; } }
      return W.files._wrap(file.name, path, buf, as);
    },
    /**
     * حفظ ملف: W.files.save({data, name, types, path}) → {path, name} | null
     * إذا أ\u064Fعطي path ي\u064Fحفظ مباشرة دون حوار (أمر "حفظ").
     */
    async save(o) {
      const bytes = await W.files.toBytes(o.data);
      const filters = W.files.normalize(o.types);
      if (native && native.saveFile) {
        const res = await native.saveFile({ defaultPath: o.name, filters, data: bytes, path: o.path || null });
        return res || null;
      }
      const blob = new Blob([bytes], { type: W.mime(W.files.ext(o.name)) });
      W.download(blob, o.name);
      return { name: o.name, path: null };
    },
    async readPath(path, as) {
      if (!native || !native.readFile) throw new Error('no native');
      const f = await native.readFile(path);
      return W.files._wrap(f.name, f.path, f.data, as);
    }
  };
  W.download = function (blob, name) {
    const url = URL.createObjectURL(blob);
    const a = W.h('a', { href: url, download: name, style: { display: 'none' } });
    document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
  };
  W.b64 = {
    encode(bytes) {
      let s = ''; const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
      return btoa(s);
    },
    decode(str) { const bin = atob(str); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
  };
  W.dataURLToBytes = (url) => W.b64.decode(url.split(',')[1]);
  W.canvasToBytes = (canvas, type, quality) => new Promise((res) => canvas.toBlob(async (b) => res(new Uint8Array(await b.arrayBuffer())), type || 'image/png', quality));
  W.loadImage = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  W.bytesToImage = async (bytes, ext) => {
    const url = URL.createObjectURL(new Blob([bytes], { type: W.mime(ext || 'png') }));
    try { return await W.loadImage(url); } finally { setTimeout(() => URL.revokeObjectURL(url), 5000); }
  };

  /** فتح الملفات المرسلة من نظام التشغيل (النقر المزدوج على ملف) */
  W.onExternalFile = function (cb, as) {
    if (!native) return;
    const handle = async (p) => {
      try { cb(await W.files.readPath(p, as)); } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
    };
    if (native.onOpenFile) native.onOpenFile(handle);
    if (native.getPendingFiles) native.getPendingFiles().then((list) => (list || []).forEach(handle));
  };

  /** منطقة إفلات الملفات */
  W.dropZone = function (el, onFiles, o) {
    o = o || {};
    let depth = 0;
    const hint = W.h('div', { class: 'w-drop-hint', 'data-i18n': 'ui.dropHere' });
    hint.textContent = W.t('ui.dropHere');
    el.append(hint);
    el.addEventListener('dragenter', (e) => { if (!e.dataTransfer.types.includes('Files')) return; e.preventDefault(); depth++; el.classList.add('dragging'); });
    el.addEventListener('dragover', (e) => { if (!e.dataTransfer.types.includes('Files')) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
    el.addEventListener('dragleave', () => { depth = Math.max(0, depth - 1); if (!depth) el.classList.remove('dragging'); });
    el.addEventListener('drop', async (e) => {
      if (!e.dataTransfer.files.length) return;
      e.preventDefault(); depth = 0; el.classList.remove('dragging');
      const out = [];
      for (const f of Array.from(e.dataTransfer.files)) out.push(await W.files.fromFile(f, o.as));
      onFiles(out, e);
    });
  };

  /** الملفات الأخيرة (تعمل بمسارات حقيقية في نسخة سطح المكتب) */
  W.recent = {
    key() { return 'recent.' + (W.app ? W.app.id : 'hub'); },
    list() { return W.store.get(W.recent.key(), []); },
    add(path, name) {
      if (!path) return;
      const l = W.recent.list().filter((r) => r.path !== path);
      l.unshift({ path, name: name || W.files.fileName(path), time: Date.now() });
      W.store.set(W.recent.key(), l.slice(0, 10));
    },
    clear() { W.store.set(W.recent.key(), []); },
    menu(openFn) {
      return () => {
        const l = W.recent.list();
        if (!l.length || !W.isElectron) return [{ i18n: 'ui.noRecent', disabled: true }];
        return [...l.map((r) => ({ label: r.name, action: () => openFn(r.path) })), '-', { i18n: 'cmd.clearRecent', action: () => W.recent.clear() }];
      };
    }
  };

  /* ───────────── تنقية HTML المستورد ───────────── */
  /** يزيل السكربتات والمعالجات والروابط الخطرة من HTML خارجي */
  W.sanitizeHTML = function (html, o) {
    o = o || {};
    const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
    doc.querySelectorAll('script,iframe,object,embed,link,meta,base,form,input,button,textarea,select,noscript,template' + (o.keepStyle ? '' : ',style')).forEach((n) => n.remove());
    doc.querySelectorAll('*').forEach((el) => {
      for (const a of Array.from(el.attributes)) {
        const n = a.name.toLowerCase();
        const v = String(a.value || '').trim().toLowerCase();
        if (n.startsWith('on') || n === 'contenteditable' && !o.keepEditable) el.removeAttribute(a.name);
        else if ((n === 'href' || n === 'src' || n === 'xlink:href' || n === 'action') && (v.startsWith('javascript:') || v.startsWith('vbscript:') || (v.startsWith('data:') && !v.startsWith('data:image/')))) el.removeAttribute(a.name);
      }
    });
    return o.full ? doc : doc.body.innerHTML;
  };

  /* ───────────── PDF والطباعة ───────────── */
  /** يحو\u0651ل HTML كامل إلى PDF (سطح المكتب) — أو يفتح نافذة الطباعة في المتصفح */
  W.htmlToPDF = async function (html, opts) {
    opts = opts || {};
    if (native && native.htmlToPDF) return native.htmlToPDF(html, opts);
    W.printHTML(html);
    return null;
  };
  W.printHTML = function (html) {
    if (native && native.printHTML) return native.printHTML(html);
    const frame = W.h('iframe', { style: { position: 'fixed', width: '0', height: '0', border: '0', insetInlineStart: '-9999px' } });
    document.body.append(frame);
    frame.contentDocument.open(); frame.contentDocument.write(html); frame.contentDocument.close();
    setTimeout(() => { frame.contentWindow.focus(); frame.contentWindow.print(); setTimeout(() => frame.remove(), 2000); }, 400);
    return true;
  };
  /** تصدير HTML إلى ملف PDF مع حوار الحفظ */
  W.exportPDF = async function (html, name, opts) {
    if (!W.isElectron) { W.printHTML(html); W.toast(W.t('ui.exportPdfHint'), 'info', 5000); return null; }
    const bytes = await W.busy('ui.processing', () => W.htmlToPDF(html, opts));
    if (!bytes) return null;
    const res = await W.files.save({ data: bytes, name: name.endsWith('.pdf') ? name : name + '.pdf', types: [{ name: { ar: 'مستند PDF', en: 'PDF document' }, ext: ['pdf'] }] });
    if (res) W.toast(W.t('ui.exported'), 'success');
    return res;
  };
  /** مستند HTML جاهز للطباعة مع الخطوط المشتركة */
  W.printDocument = function (bodyHTML, o) {
    o = o || {};
    const fontsCss = SHARED_BASE + 'fonts/fonts.css';
    return '<!doctype html><html lang="' + (o.lang || W.lang) + '" dir="' + (o.dir || (W.isRTL() ? 'rtl' : 'ltr')) + '"><head><meta charset="utf-8">' +
      '<link rel="stylesheet" href="' + fontsCss + '">' +
      '<style>@page{size:' + (o.pageSize || 'A4') + ';margin:' + (o.margin || '0') + '}html,body{margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:' + (o.font || "'Amiri','Noto Naskh Arabic','Traditional Arabic','Times New Roman',serif") + '}' + (o.css || '') + '</style>' +
      '<base href="' + location.href + '"></head><body>' + bodyHTML + '</body></html>';
  };

  /* ───────────── السجل (تراجع/إعادة) ───────────── */
  W.History = class {
    constructor(limit) { this.limit = limit || 100; this.stack = []; this.index = -1; this.onChange = null; }
    push(state) {
      const s = typeof state === 'string' ? state : JSON.stringify(state);
      if (this.stack[this.index] === s) return;
      this.stack = this.stack.slice(0, this.index + 1);
      this.stack.push(s);
      if (this.stack.length > this.limit) this.stack.shift();
      this.index = this.stack.length - 1;
      if (this.onChange) this.onChange();
    }
    reset(state) { this.stack = []; this.index = -1; if (state !== undefined) this.push(state); }
    get canUndo() { return this.index > 0; }
    get canRedo() { return this.index < this.stack.length - 1; }
    undo() { if (!this.canUndo) return null; this.index--; if (this.onChange) this.onChange(); return this.stack[this.index]; }
    redo() { if (!this.canRedo) return null; this.index++; if (this.onChange) this.onChange(); return this.stack[this.index]; }
    current() { return this.stack[this.index]; }
  };

  /* ───────────── الألوان ───────────── */
  W.color = {
    hexToRgb(hex) {
      hex = String(hex).replace('#', '');
      if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
      const n = parseInt(hex.slice(0, 6), 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    },
    rgbToHex(r, g, b) { return '#' + [r, g, b].map((v) => W.clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join(''); },
    rgba(hex, a) { const c = W.color.hexToRgb(hex); return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')'; },
    rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s = 0; const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6;
      }
      return [h, s, l];
    },
    hslToRgb(h, s, l) {
      if (s === 0) return [l * 255, l * 255, l * 255];
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
      const f = (t) => { if (t < 0) t += 1; if (t > 1) t -= 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
      return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
    },
    contrast(hex) { const c = W.color.hexToRgb(hex); return (c.r * 299 + c.g * 587 + c.b * 114) / 1000 > 150 ? '#111111' : '#ffffff'; },
    palette: ['#000000', '#ffffff', '#6b7280', '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#7c2d12', '#1e3a8a', '#064e3b', '#fde68a']
  };

  /* ───────────── الخطوط العربية ───────────── */
  W.fonts = [
    { family: 'IBM Plex Sans Arabic', label: { ar: 'بلكس عربي', en: 'IBM Plex Sans Arabic' } },
    { family: 'Cairo', label: { ar: 'القاهرة', en: 'Cairo' } },
    { family: 'Tajawal', label: { ar: 'تجوال', en: 'Tajawal' } },
    { family: 'Almarai', label: { ar: 'المراعي', en: 'Almarai' } },
    { family: 'Amiri', label: { ar: 'أميري', en: 'Amiri' } },
    { family: 'Noto Naskh Arabic', label: { ar: 'نوتو نسخ', en: 'Noto Naskh Arabic' } },
    { family: 'Noto Kufi Arabic', label: { ar: 'نوتو كوفي', en: 'Noto Kufi Arabic' } },
    { family: 'Reem Kufi', label: { ar: 'ريم كوفي', en: 'Reem Kufi' } },
    { family: 'El Messiri', label: { ar: 'المسيري', en: 'El Messiri' } },
    { family: 'Changa', label: { ar: 'تشانجا', en: 'Changa' } },
    { family: 'Lalezar', label: { ar: 'لاله\u200Cزار', en: 'Lalezar' } },
    { family: 'Aref Ruqaa', label: { ar: 'عارف رقعة', en: 'Aref Ruqaa' } },
    { family: 'Markazi Text', label: { ar: 'مركزي', en: 'Markazi Text' } },
    { family: 'Tahoma', label: { ar: 'تاهوما', en: 'Tahoma' } },
    { family: 'Arial', label: { ar: 'آريال', en: 'Arial' } },
    { family: 'Times New Roman', label: { ar: 'تايمز', en: 'Times New Roman' } },
    { family: 'Courier New', label: { ar: 'كوريير', en: 'Courier New' } }
  ];
  W.fontStack = (family) => "'" + family + "', 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, 'DejaVu Sans', sans-serif";
  W.fontSelect = function (value, onChange, cls) {
    const sel = W.h('select', { class: 'w-select ' + (cls || '') });
    const render = () => {
      const v = sel.value || value;
      sel.innerHTML = '';
      W.fonts.forEach((f) => sel.append(W.h('option', { value: f.family, text: W.L(f.label), style: { fontFamily: W.fontStack(f.family) } })));
      sel.value = v;
    };
    render();
    sel.value = value;
    sel.addEventListener('change', () => onChange(sel.value));
    W.on('langchange', render);
    return sel;
  };
  /** انتظار تحميل الخطوط قبل الرسم على اللوحات */
  W.fontsReady = () => (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
  W.ensureFont = async (family, weight) => {
    try { await document.fonts.load((weight || 400) + ' 16px "' + family + '"', 'ابجد abc'); } catch (e) { /* تجاهل */ }
  };

  /* ───────────── مكو\u0651نات صغيرة ───────────── */
  /** صف شريط تمرير مع حقل رقمي */
  W.slider = function (o) {
    const range = W.h('input', { type: 'range', class: 'w-range', min: o.min, max: o.max, step: o.step || 1, value: o.value });
    const num = W.h('input', { type: 'number', class: 'w-input', min: o.min, max: o.max, step: o.step || 1, value: o.value });
    const label = W.h('span', { 'data-i18n': o.i18n, text: W.t(o.i18n) });
    const resetBtn = o.reset != null ? W.h('button', { type: 'button', 'data-i18n': 'ui.reset', text: W.t('ui.reset') }) : null;
    const row = W.h('div', { class: 'w-range-row' }, W.h('div', { class: 'w-range-label' }, label, resetBtn), range, num);
    const set = (v, fire) => {
      v = W.clamp(parseFloat(v), o.min, o.max); if (isNaN(v)) return;
      range.value = v; num.value = W.round(v, 3);
      if (fire && o.onInput) o.onInput(v);
    };
    range.addEventListener('input', () => set(range.value, true));
    range.addEventListener('change', () => o.onChange && o.onChange(parseFloat(range.value)));
    num.addEventListener('change', () => { set(num.value, true); o.onChange && o.onChange(parseFloat(num.value)); });
    range.addEventListener('dblclick', () => { if (o.reset != null) { set(o.reset, true); o.onChange && o.onChange(o.reset); } });
    if (resetBtn) resetBtn.addEventListener('click', () => { set(o.reset, true); o.onChange && o.onChange(o.reset); });
    row.set = (v) => set(v, false);
    row.get = () => parseFloat(range.value);
    return row;
  };
  /** زر أيقونة */
  W.iconButton = function (icon, tip, onclick, o) {
    o = o || {};
    const b = W.h('button', { class: 'w-icon-btn' + (o.cls ? ' ' + o.cls : ''), type: 'button', 'data-tip': tip, html: W.icon(icon) });
    if (o.shortcut) b.dataset.shortcut = o.shortcut;
    if (onclick) b.addEventListener('click', onclick);
    return b;
  };
  /** مجموعة أزرار مقس\u0651مة */
  W.segmented = function (options, value, onChange) {
    const wrap = W.h('div', { class: 'w-seg' });
    const render = () => {
      wrap.innerHTML = '';
      options.forEach((op) => {
        const b = W.h('button', { type: 'button', class: op.value === value ? 'active' : '', 'data-tip': op.tip || null });
        if (op.icon) b.innerHTML = W.icon(op.icon); else b.textContent = op.i18n ? W.t(op.i18n) : op.label;
        b.addEventListener('click', () => { value = op.value; render(); onChange(op.value); });
        wrap.append(b);
      });
    };
    render();
    wrap.set = (v) => { value = v; render(); };
    W.on('langchange', render);
    return wrap;
  };
  /** لوحة ألوان سريعة */
  W.swatches = function (onPick, colors) {
    const box = W.h('div', { class: 'w-swatches' });
    (colors || W.color.palette).forEach((c) => box.append(W.h('div', { class: 'w-swatch', style: { background: c }, title: c, onclick: () => onPick(c) })));
    return box;
  };
  /** شاشة الترحيب داخل منطقة العمل */
  W.welcome = function (stage, o) {
    const box = W.h('div', { class: 'w-empty' });
    const render = () => {
      box.innerHTML = '';
      box.append(
        W.h('img', { src: SHARED_BASE + 'icons/' + W.app.id + '.png', alt: '' }),
        W.h('h2', { text: W.t('ui.welcome', { app: W.L(W.app.name) }) }),
        W.h('p', { text: o.text ? W.t(o.text) : W.L(W.app.desc) })
      );
      const row = W.h('div', { class: 'row' });
      (o.actions || []).forEach((a) => {
        const b = W.h('button', { class: 'w-btn lg' + (a.primary ? ' primary' : ''), type: 'button', onclick: a.action }, a.icon ? W.iconEl(a.icon) : null, W.h('span', { text: W.t(a.i18n) }));
        row.append(b);
      });
      box.append(row);
      if (o.extra) box.append(o.extra());
      const rec = W.recent.list();
      if (W.isElectron && rec.length && o.openRecent) {
        const list = W.h('div', { class: 'col', style: { marginTop: '10px', minWidth: '320px', textAlign: 'start' } }, W.h('div', { class: 'w-label-sm', text: W.t('ui.recent') }));
        rec.slice(0, 5).forEach((r) => list.append(W.h('div', { class: 'w-list-item', onclick: () => o.openRecent(r.path) }, W.iconEl('file'), W.h('span', { class: 'w-name', text: r.name }))));
        box.append(list);
      }
    };
    render();
    W.on('langchange', render);
    stage.append(box);
    return { el: box, show() { render(); box.classList.remove('hidden'); }, hide() { box.classList.add('hidden'); } };
  };

  /* ───────────── التهيئة ───────────── */
  /**
   * W.init({ id, i18n:{ar,en}, menus, onReady })
   */
  W.init = function (o) {
    o = o || {};
    W.app = o.id && o.id !== 'hub' ? R.apps.find((a) => a.id === o.id) : null;
    if (o.i18n) W.i18n.addAll(o.i18n);
    const accent = W.app ? W.app.color : R.platform.color;
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-contrast', '#ffffff');
    document.documentElement.dataset.theme = W.theme;
    document.documentElement.lang = W.lang;
    document.documentElement.dir = W.lang === 'ar' ? 'rtl' : 'ltr';
    const link = document.querySelector('link[rel="icon"]') || W.h('link', { rel: 'icon' });
    link.href = SHARED_BASE + 'icons/' + (W.app ? W.app.id : 'hub') + '.png';
    document.head.append(link);
    W.translate();
    W.updateWindowTitle();
    // منع فتح الملفات المسحوبة كصفحة
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => e.preventDefault());
    // تقرير الأخطاء في وضع الاختبار
    return W.app;
  };

  /** تثبيت القوائم وشريط الحالة دفعة واحدة */
  W.mountChrome = function (o) {
    W._menus = o.menus;
    W._extraShortcuts = o.shortcuts || [];
    const mb = W.menubar(o.menubar || document.querySelector('.w-menubar'), o.menus, { extra: o.extra });
    const sb = W.statusbar(o.statusbar || document.querySelector('.w-statusbar'));
    return { menubar: mb, status: sb };
  };

  globalThis.W = W;
  globalThis.Warsha = W;
})();
