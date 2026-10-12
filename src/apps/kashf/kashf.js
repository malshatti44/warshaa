/* كشف Kashf — جداول بيانات عربية */
(function () {
  'use strict';
  const F = globalThis.KashfFormula;
  const X = globalThis.KashfXlsx;

  W.init({
    id: 'kashf',
    i18n: {
      ar: {
        'k.sheet': 'ورقة', 'k.addSheet': 'ورقة جديدة', 'k.renameSheet': 'إعادة تسمية', 'k.deleteSheet': 'حذف الورقة', 'k.dupSheet': 'تكرار الورقة',
        'k.moveLeft': 'نقل يسار\u064Bا', 'k.moveRight': 'نقل يمين\u064Bا', 'k.sheetDir': 'اتجاه الورقة من اليمين لليسار', 'k.confirmDeleteSheet': 'حذف الورقة «{name}» بكل محتوياتها؟',
        'k.sheetName': 'اسم الورقة', 'k.insertRowAbove': 'إدراج صف أعلى', 'k.insertRowBelow': 'إدراج صف أسفل', 'k.insertColBefore': 'إدراج عمود قبل',
        'k.insertColAfter': 'إدراج عمود بعد', 'k.deleteRows': 'حذف الصفوف', 'k.deleteCols': 'حذف الأعمدة', 'k.clear': 'مسح المحتوى', 'k.clearAll': 'مسح الكل (مع التنسيق)',
        'k.sortAsc': 'فرز تصاعدي', 'k.sortDesc': 'فرز تنازلي', 'k.merge': 'دمج الخلايا', 'k.unmerge': 'إلغاء الدمج', 'k.wrap': 'التفاف النص',
        'k.fmt.general': 'عام', 'k.fmt.number': 'رقم', 'k.fmt.currency': 'عملة', 'k.fmt.percent': 'نسبة مئوية', 'k.fmt.date': 'تاريخ', 'k.fmt.time': 'وقت',
        'k.fmt.datetime': 'تاريخ ووقت', 'k.fmt.text': 'نص', 'k.numFormat': 'تنسيق الأرقام', 'k.decInc': 'زيادة المنازل العشرية', 'k.decDec': 'إنقاص المنازل العشرية',
        'k.currency': 'رمز العملة', 'k.fill': 'لون التعبئة', 'k.textColor': 'لون النص', 'k.borders': 'الحدود', 'k.bAll': 'كل الحدود', 'k.bOuter': 'حدود خارجية',
        'k.bBottom': 'حد سفلي', 'k.bNone': 'بلا حدود', 'k.autosum': 'جمع تلقائي', 'k.chart': 'رسم بياني…', 'k.freeze': 'تجميد الأجزاء', 'k.freezeRow': 'تجميد الصف الأول',
        'k.freezeCol': 'تجميد العمود الأول', 'k.freezeSel': 'تجميد حتى الخلية المحددة', 'k.unfreeze': 'إلغاء التجميد', 'k.function': 'إدراج دالة…', 'k.formatCells': 'تنسيق الخلايا…',
        'k.sum': 'المجموع', 'k.avg': 'المتوسط', 'k.cnt': 'العدد', 'k.importCsv': 'استيراد CSV…', 'k.exportXlsx': 'Excel (.xlsx)…', 'k.exportCsv': 'CSV (الورقة الحالية)…',
        'k.chartType': 'نوع الرسم', 'k.chartTitle': 'عنوان الرسم', 'k.dataRange': 'نطاق البيانات', 'k.ct.column': 'أعمدة', 'k.ct.bar': 'أشرطة', 'k.ct.line': 'خطي',
        'k.ct.area': 'مساحي', 'k.ct.pie': 'دائري', 'k.ct.doughnut': 'حلقي', 'k.editChart': 'تعديل الرسم…', 'k.deleteChart': 'حذف الرسم', 'k.chartPng': 'حفظ الرسم كصورة…',
        'k.insertFn': 'إدراج دالة', 'k.fnSearch': 'ابحث عن دالة…', 'k.findWhat': 'البحث عن', 'k.replaceWith': 'استبدال بـ', 'k.findNext': 'التالي', 'k.replaceAll': 'استبدال الكل',
        'k.wholeCell': 'مطابقة الخلية كاملة', 'k.notFound': 'لم ي\u064Fعثر على نتائج', 'k.replaced': 'تم استبدال {n} خلية', 'k.colWidth': 'عرض العمود…', 'k.rowHeight': 'ارتفاع الصف…',
        'k.width': 'العرض (بكسل)', 'k.height': 'الارتفاع (بكسل)', 'k.mergeLoses': 'الدمج يحتفظ بقيمة الخلية العليا فقط. متابعة؟', 'k.gridlines': 'خطوط الشبكة',
        'k.printRange': 'طباعة المحدد فقط', 'k.goTo': 'انتقال إلى…', 'k.cellRef': 'مرجع الخلية (مثل B12)', 'k.removeDup': 'إزالة الصفوف المكررة', 'k.removedN': 'تمت إزالة {n} صف\u064Bا مكرر\u064Bا',
        'k.align': 'المحاذاة', 'k.alignStart': 'بداية', 'k.alignCenter': 'وسط', 'k.alignEnd': 'نهاية', 'k.valign': 'محاذاة عمودية', 'k.vTop': 'أعلى', 'k.vMiddle': 'وسط', 'k.vBottom': 'أسفل',
        'k.decimals': 'المنازل العشرية', 'k.sample': 'مثال', 'k.newSample': 'مصنف مثال (ميزانية)', 'k.welcomeText': 'ابدأ بمصنف فارغ أو افتح ملف Excel أو CSV',
        'k.blank': 'مصنف فارغ', 'k.fillDown': 'تعبئة لأسفل', 'k.fillRight': 'تعبئة لليمين', 'k.pasteValues': 'لصق القيم فقط', 'k.data': 'بيانات'
      },
      en: {
        'k.sheet': 'Sheet', 'k.addSheet': 'New sheet', 'k.renameSheet': 'Rename', 'k.deleteSheet': 'Delete sheet', 'k.dupSheet': 'Duplicate sheet',
        'k.moveLeft': 'Move left', 'k.moveRight': 'Move right', 'k.sheetDir': 'Right-to-left sheet', 'k.confirmDeleteSheet': 'Delete sheet “{name}” and all its contents?',
        'k.sheetName': 'Sheet name', 'k.insertRowAbove': 'Insert row above', 'k.insertRowBelow': 'Insert row below', 'k.insertColBefore': 'Insert column before',
        'k.insertColAfter': 'Insert column after', 'k.deleteRows': 'Delete rows', 'k.deleteCols': 'Delete columns', 'k.clear': 'Clear contents', 'k.clearAll': 'Clear all (with formatting)',
        'k.sortAsc': 'Sort ascending', 'k.sortDesc': 'Sort descending', 'k.merge': 'Merge cells', 'k.unmerge': 'Unmerge', 'k.wrap': 'Wrap text',
        'k.fmt.general': 'General', 'k.fmt.number': 'Number', 'k.fmt.currency': 'Currency', 'k.fmt.percent': 'Percent', 'k.fmt.date': 'Date', 'k.fmt.time': 'Time',
        'k.fmt.datetime': 'Date & time', 'k.fmt.text': 'Text', 'k.numFormat': 'Number format', 'k.decInc': 'Increase decimals', 'k.decDec': 'Decrease decimals',
        'k.currency': 'Currency symbol', 'k.fill': 'Fill color', 'k.textColor': 'Text color', 'k.borders': 'Borders', 'k.bAll': 'All borders', 'k.bOuter': 'Outside borders',
        'k.bBottom': 'Bottom border', 'k.bNone': 'No borders', 'k.autosum': 'AutoSum', 'k.chart': 'Chart…', 'k.freeze': 'Freeze panes', 'k.freezeRow': 'Freeze top row',
        'k.freezeCol': 'Freeze first column', 'k.freezeSel': 'Freeze at selected cell', 'k.unfreeze': 'Unfreeze', 'k.function': 'Insert function…', 'k.formatCells': 'Format cells…',
        'k.sum': 'Sum', 'k.avg': 'Average', 'k.cnt': 'Count', 'k.importCsv': 'Import CSV…', 'k.exportXlsx': 'Excel (.xlsx)…', 'k.exportCsv': 'CSV (current sheet)…',
        'k.chartType': 'Chart type', 'k.chartTitle': 'Chart title', 'k.dataRange': 'Data range', 'k.ct.column': 'Column', 'k.ct.bar': 'Bar', 'k.ct.line': 'Line',
        'k.ct.area': 'Area', 'k.ct.pie': 'Pie', 'k.ct.doughnut': 'Doughnut', 'k.editChart': 'Edit chart…', 'k.deleteChart': 'Delete chart', 'k.chartPng': 'Save chart as image…',
        'k.insertFn': 'Insert function', 'k.fnSearch': 'Search functions…', 'k.findWhat': 'Find what', 'k.replaceWith': 'Replace with', 'k.findNext': 'Find next', 'k.replaceAll': 'Replace all',
        'k.wholeCell': 'Match entire cell', 'k.notFound': 'No results found', 'k.replaced': 'Replaced {n} cells', 'k.colWidth': 'Column width…', 'k.rowHeight': 'Row height…',
        'k.width': 'Width (px)', 'k.height': 'Height (px)', 'k.mergeLoses': 'Merging keeps only the upper-left value. Continue?', 'k.gridlines': 'Gridlines',
        'k.printRange': 'Print selection only', 'k.goTo': 'Go to…', 'k.cellRef': 'Cell reference (e.g. B12)', 'k.removeDup': 'Remove duplicate rows', 'k.removedN': 'Removed {n} duplicate rows',
        'k.align': 'Alignment', 'k.alignStart': 'Start', 'k.alignCenter': 'Center', 'k.alignEnd': 'End', 'k.valign': 'Vertical alignment', 'k.vTop': 'Top', 'k.vMiddle': 'Middle', 'k.vBottom': 'Bottom',
        'k.decimals': 'Decimal places', 'k.sample': 'Sample', 'k.newSample': 'Sample workbook (budget)', 'k.welcomeText': 'Start with a blank workbook or open an Excel or CSV file',
        'k.blank': 'Blank workbook', 'k.fillDown': 'Fill down', 'k.fillRight': 'Fill right', 'k.pasteValues': 'Paste values only', 'k.data': 'Data'
      }
    }
  });

  /* ═══════════ النموذج ═══════════ */
  const DEF_COLW = 100, DEF_ROWH = 24, HEAD_W = 52, HEAD_H = 24, MAX_ROWS = 100000, MAX_COLS = 702;
  const PALETTE = ['#4f46e5', '#0eae4e', '#fd6101', '#ee0b75', '#0084fc', '#fd9801', '#790ce2', '#01a89a', '#ea1822', '#64748b'];
  const key = (r, c) => r + ',' + c;
  const sheetLabel = (n) => (W.lang === 'ar' ? 'ورقة' : 'Sheet') + n;
  function newSheet(name) { return { name, rtl: W.lang === 'ar', cells: {}, colW: {}, rowH: {}, merges: [], freeze: { r: 0, c: 0 }, charts: [], rows: 200, cols: 26, gridlines: true }; }
  let book = { sheets: [newSheet(sheetLabel(1))], active: 0 };
  let sh = book.sheets[0];
  let zoom = W.store.get('kashf.zoom', 1);

  /* ═══════════ الحساب ═══════════ */
  const calc = new Map();
  const computing = new Set();
  const astMap = new Map();
  const usedCache = new Map();
  function invalidate() { calc.clear(); usedCache.clear(); }
  const sheetIdx = (name) => book.sheets.findIndex((s) => s.name.toLowerCase() === String(name).toLowerCase());
  function astOf(f) {
    let a = astMap.get(f);
    if (!a) {
      try { a = F.parse(f); } catch (e) { a = { t: 'err', v: new F.FErr('#ERROR!') }; }
      if (astMap.size > 20000) astMap.clear();
      astMap.set(f, a);
    }
    return a;
  }
  function used(si) {
    if (usedCache.has(si)) return usedCache.get(si);
    let mr = -1, mc = -1;
    for (const k in book.sheets[si].cells) { const i = k.indexOf(','); const r = +k.slice(0, i), c = +k.slice(i + 1); if (r > mr) mr = r; if (c > mc) mc = c; }
    const u = { r: mr, c: mc };
    usedCache.set(si, u);
    return u;
  }
  function value(si, r, c) {
    const s = book.sheets[si];
    if (!s) return F.ERR.REF;
    const cell = s.cells[key(r, c)];
    if (!cell) return null;
    if (!cell.f) return cell.v === undefined ? null : cell.v;
    const k = si + '|' + r + ',' + c;
    if (calc.has(k)) return calc.get(k);
    if (computing.has(k)) return F.ERR.CIRC;
    computing.add(k);
    let v;
    try { v = F.evaluate(astOf(cell.f), ctxFor(si)); } catch (e) { v = e instanceof F.FErr ? e : F.ERR.VALUE; }
    computing.delete(k);
    calc.set(k, v);
    return v;
  }
  const ctxCache = new Map();
  function ctxFor(si) {
    if (ctxCache.has(si)) return ctxCache.get(si);
    const ctx = {
      getCell: (name, r, c) => { const i = name ? sheetIdx(name) : si; return i < 0 ? F.ERR.REF : value(i, r, c); },
      sheetExists: (n) => sheetIdx(n) >= 0,
      maxRow: (n) => used(n ? sheetIdx(n) : si).r,
      maxCol: (n) => used(n ? sheetIdx(n) : si).c
    };
    ctxCache.set(si, ctx);
    return ctx;
  }

  /* ═══════════ التنسيق ═══════════ */
  const pad = (n) => String(n).padStart(2, '0');
  function fmtValue(v, st) {
    if (v == null) return '';
    if (F.isErr(v)) return v.err;
    if (typeof v === 'boolean') return W.lang === 'ar' ? (v ? 'صح' : 'خطأ') : (v ? 'TRUE' : 'FALSE');
    if (typeof v === 'number') {
      const fmt = (st && st.fmt) || 'general';
      const dec = st && st.dec != null ? st.dec : 2;
      const num = (x, d) => x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
      switch (fmt) {
        case 'number': return num(v, dec);
        case 'currency': {
          const cur = (st && st.cur) || (W.lang === 'ar' ? 'ر.س' : '$');
          const s = num(Math.abs(v), dec);
          const sign = v < 0 ? '-' : '';
          return /^[A-Za-z$€£¥₹]/.test(cur) ? sign + cur + s : sign + s + ' ' + cur;
        }
        case 'percent': return (v * 100).toFixed(st && st.dec != null ? st.dec : 0) + '%';
        case 'date': { const d = F.serialToDate(v); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); }
        case 'time': { const t = Math.round((v % 1) * 1440); return pad(Math.floor(t / 60) % 24) + ':' + pad(t % 60); }
        case 'datetime': { const d = F.serialToDate(v); const t = Math.round((v % 1) * 1440); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + ' ' + pad(Math.floor(t / 60) % 24) + ':' + pad(t % 60); }
        case 'text': return String(v);
        default: return F.fmtGeneral(v);
      }
    }
    return String(v);
  }
  /** تفسير ما يكتبه المستخدم */
  function parseInput(text) {
    if (text == null || text === '') return { empty: true };
    if (text[0] === "'") return { v: text.slice(1) };
    if (text[0] === '=' && text.length > 1) return { f: text.slice(1) };
    const t = text.trim().replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/٫/g, '.').replace(/٬/g, ',');
    let m;
    if (/^[-+]?(\d{1,3}(,\d{3})+|\d+)(\.\d+)?$/.test(t)) return { v: parseFloat(t.replace(/,/g, '')), hint: t.includes(',') ? { fmt: 'number', dec: (t.split('.')[1] || '').length } : null };
    if (/^[-+]?\.\d+$/.test(t)) return { v: parseFloat(t) };
    if (/^[-+]?\d+(\.\d+)?%$/.test(t)) return { v: parseFloat(t) / 100, hint: { fmt: 'percent', dec: (t.replace('%', '').split('.')[1] || '').length } };
    if (/^[-+]?\d+(\.\d+)?e[-+]?\d+$/i.test(t)) return { v: parseFloat(t) };
    if ((m = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(t))) return { v: F.dateToSerial(+m[1], +m[2], +m[3]), hint: { fmt: 'date' } };
    if ((m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(t))) return { v: F.dateToSerial(+m[3], +m[2], +m[1]), hint: { fmt: 'date' } };
    if ((m = /^(\d{1,2}):(\d{2})$/.exec(t))) return { v: (+m[1] * 60 + +m[2]) / 1440, hint: { fmt: 'time' } };
    if ((m = /^([$€£¥])\s?([\d,]+(\.\d+)?)$/.exec(t))) return { v: parseFloat(m[2].replace(/,/g, '')), hint: { fmt: 'currency', cur: m[1], dec: (m[3] || '.').length - 1 || 2 } };
    if ((m = /^([\d,]+(\.\d+)?)\s?(ر\.س|د\.إ|د\.ك|ر\.ق|د\.ب|ر\.ع|ج\.م|د\.أ|SAR|AED|KWD|QAR|USD|EUR)$/.exec(t))) return { v: parseFloat(m[1].replace(/,/g, '')), hint: { fmt: 'currency', cur: m[3], dec: 2 } };
    if (/^(TRUE|FALSE|صح|خطأ)$/i.test(t)) return { v: /^(TRUE|صح)$/i.test(t) };
    return { v: text };
  }
  const isNumLike = (v) => typeof v === 'number';

  /* ═══════════ السجل (تراجع/إعادة) ═══════════ */
  const undoStack = [], redoStack = [];
  function pushHistory(entry) { undoStack.push(entry); if (undoStack.length > 200) undoStack.shift(); redoStack.length = 0; W.setDirty(true); }
  const clone = (o) => (o == null ? null : JSON.parse(JSON.stringify(o)));
  /** تعديل مجموعة خلايا مع حفظ ما قبل/بعد */
  function editCells(keys, fn) {
    const si = book.active;
    const before = {}, after = {};
    keys.forEach((k) => { before[k] = clone(sh.cells[k]); });
    fn();
    keys.forEach((k) => { after[k] = clone(sh.cells[k]); });
    pushHistory({ type: 'cells', si, before, after });
    invalidate();
  }
  function editSheet(fn) {
    const si = book.active;
    const before = JSON.stringify(sh);
    fn();
    pushHistory({ type: 'sheet', si, before, after: JSON.stringify(sh) });
    invalidate();
  }
  function editBook(fn) {
    const before = JSON.stringify(book);
    fn();
    pushHistory({ type: 'book', before, after: JSON.stringify(book) });
    invalidate();
  }
  function applyEntry(e, dir) {
    if (e.type === 'cells') {
      const s = book.sheets[e.si];
      const src = dir === 'undo' ? e.before : e.after;
      for (const k in src) { if (src[k]) s.cells[k] = clone(src[k]); else delete s.cells[k]; }
      if (book.active !== e.si) switchSheet(e.si);
    } else if (e.type === 'sheet') {
      book.sheets[e.si] = JSON.parse(dir === 'undo' ? e.before : e.after);
      if (book.active !== e.si) book.active = e.si;
      sh = book.sheets[book.active];
    } else {
      book = JSON.parse(dir === 'undo' ? e.before : e.after);
      sh = book.sheets[book.active];
    }
    invalidate(); ctxCache.clear();
    rebuild(); renderTabs(); renderCharts(); render(); syncFormulaBar();
    W.setDirty(true);
  }
  function undo() { if (editing) cancelEdit(); const e = undoStack.pop(); if (!e) return; redoStack.push(e); applyEntry(e, 'undo'); }
  function redo() { if (editing) cancelEdit(); const e = redoStack.pop(); if (!e) return; undoStack.push(e); applyEntry(e, 'redo'); }

  /* ═══════════ عناصر الواجهة ═══════════ */
  const wrap = document.getElementById('wrap');
  const spacer = document.getElementById('spacer');
  const canvas = document.getElementById('grid');
  const g = canvas.getContext('2d');
  const editor = document.getElementById('cell-editor');
  const chartsLayer = document.getElementById('charts');
  const nameBox = document.getElementById('namebox');
  const fbar = document.getElementById('fbar');
  const tabsEl = document.getElementById('tabs');
  const statsEl = document.getElementById('selstats');
  const suggest = document.getElementById('suggest');
  const stageEl = document.getElementById('stage');
  const sink = document.getElementById('sink');
  const focusGrid = () => sink.focus({ preventScroll: true });

  /* ═══════════ القياسات ═══════════ */
  let colPos = [0], rowPos = [0];
  const colW = (c) => Math.round((sh.colW[c] || DEF_COLW) * zoom);
  const rowH = (r) => Math.round((sh.rowH[r] || DEF_ROWH) * zoom);
  const HW = () => Math.round(HEAD_W * zoom), HH = () => Math.round(HEAD_H * zoom);
  function rebuild() {
    const u = used(book.active);
    sh.rows = Math.min(MAX_ROWS, Math.max(sh.rows || 200, u.r + 50));
    sh.cols = Math.min(MAX_COLS, Math.max(sh.cols || 26, u.c + 5));
    colPos = new Array(sh.cols + 1); colPos[0] = 0;
    for (let c = 0; c < sh.cols; c++) colPos[c + 1] = colPos[c] + colW(c);
    rowPos = new Array(sh.rows + 1); rowPos[0] = 0;
    for (let r = 0; r < sh.rows; r++) rowPos[r + 1] = rowPos[r] + rowH(r);
    spacer.style.width = (HW() + colPos[sh.cols]) + 'px';
    spacer.style.height = (HH() + rowPos[sh.rows]) + 'px';
    wrap.style.direction = sh.rtl ? 'rtl' : 'ltr';
    chartsLayer.style.direction = sh.rtl ? 'rtl' : 'ltr';
  }
  function bsearch(arr, v) {
    let lo = 0, hi = arr.length - 2;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (arr[m] <= v) lo = m; else hi = m - 1; }
    return lo;
  }
  const view = { w: 0, h: 0, sx: 0, sy: 0 };
  function measure() {
    view.w = wrap.clientWidth; view.h = wrap.clientHeight;
    view.sx = Math.abs(wrap.scrollLeft); view.sy = wrap.scrollTop;
  }
  const frozenW = () => colPos[Math.min(sh.freeze.c, sh.cols)] || 0;
  const frozenH = () => rowPos[Math.min(sh.freeze.r, sh.rows)] || 0;
  /** المسافة من حافة البداية لعمود c (إحداثيات العرض) */
  function colDist(c) { return HW() + colPos[c] - (c >= sh.freeze.c ? view.sx : 0); }
  function rowTop(r) { return HH() + rowPos[r] - (r >= sh.freeze.r ? view.sy : 0); }
  const physX = (dist, w) => (sh.rtl ? view.w - dist - w : dist);
  function cellRect(r, c) {
    const w = colPos[c + 1] - colPos[c], h = rowPos[r + 1] - rowPos[r];
    return { x: physX(colDist(c), w), y: rowTop(r), w, h };
  }
  function mergeAt(r, c) { return (sh.merges || []).find((m) => r >= m.r1 && r <= m.r2 && c >= m.c1 && c <= m.c2) || null; }
  function rangeRect(r1, c1, r2, c2) {
    const a = cellRect(r1, c1), b = cellRect(r2, c2);
    const x1 = Math.min(a.x, b.x), x2 = Math.max(a.x + a.w, b.x + b.w);
    return { x: x1, y: a.y, w: x2 - x1, h: b.y + b.h - a.y };
  }

  /* ═══════════ التحديد ═══════════ */
  const sel = { r: 0, c: 0, ar: 0, ac: 0, r1: 0, c1: 0, r2: 0, c2: 0 };
  function setSel(r, c, extend) {
    r = W.clamp(r, 0, MAX_ROWS - 1); c = W.clamp(c, 0, MAX_COLS - 1);
    if (!extend) { sel.ar = r; sel.ac = c; sel.r = r; sel.c = c; }
    else { sel.r = r; sel.c = c; }
    let r1 = Math.min(sel.ar, sel.r), r2 = Math.max(sel.ar, sel.r), c1 = Math.min(sel.ac, sel.c), c2 = Math.max(sel.ac, sel.c);
    // توسيع ليشمل الخلايا المدمجة
    for (let changed = true; changed;) {
      changed = false;
      for (const m of sh.merges || []) {
        if (m.r2 < r1 || m.r1 > r2 || m.c2 < c1 || m.c1 > c2) continue;
        if (m.r1 < r1) { r1 = m.r1; changed = true; } if (m.r2 > r2) { r2 = m.r2; changed = true; }
        if (m.c1 < c1) { c1 = m.c1; changed = true; } if (m.c2 > c2) { c2 = m.c2; changed = true; }
      }
    }
    Object.assign(sel, { r1, c1, r2, c2 });
    if (r2 >= sh.rows - 5 || c2 >= sh.cols - 2) { sh.rows = Math.max(sh.rows, r2 + 50); sh.cols = Math.max(sh.cols, c2 + 3); rebuild(); }
    syncFormulaBar();
    updateStats();
    render();
  }
  function scrollIntoView(r, c) {
    measure();
    const top = HH() + rowPos[r], bottom = HH() + rowPos[r + 1];
    const fh = frozenH();
    if (r >= sh.freeze.r) {
      if (top - view.sy < HH() + fh) wrap.scrollTop = top - HH() - fh;
      else if (bottom - view.sy > view.h) wrap.scrollTop = bottom - view.h + 2;
    }
    const start = HW() + colPos[c], end = HW() + colPos[c + 1];
    const fw = frozenW();
    if (c >= sh.freeze.c) {
      let sx = view.sx;
      if (start - sx < HW() + fw) sx = start - HW() - fw;
      else if (end - sx > view.w) sx = end - view.w + 2;
      wrap.scrollLeft = sh.rtl ? -sx : sx;
    }
  }
  function moveSel(dr, dc, extend) {
    let r = (extend ? sel.r : sel.r) + dr, c = (extend ? sel.c : sel.c) + dc;
    if (!extend) {
      const m = mergeAt(sel.r, sel.c);
      if (m) { if (dr > 0) r = m.r2 + 1; if (dc > 0) c = m.c2 + 1; if (dr < 0) r = m.r1 - 1; if (dc < 0) c = m.c1 - 1; }
    }
    r = Math.max(0, r); c = Math.max(0, c);
    setSel(r, c, extend);
    scrollIntoView(r, c);
  }
  /** القفز إلى حافة البيانات (Ctrl+سهم) */
  function jump(dr, dc, extend) {
    const filled = (r, c) => { const v = sh.cells[key(r, c)]; return v && (v.f || (v.v != null && v.v !== '')); };
    let r = sel.r, c = sel.c;
    const limitR = Math.max(used(book.active).r + 1, 0), limitC = Math.max(used(book.active).c + 1, 0);
    const cur = filled(r, c), nxt = filled(r + dr, c + dc);
    if (cur && nxt) { while (filled(r + dr, c + dc)) { r += dr; c += dc; } }
    else { r += dr; c += dc; while (r >= 0 && c >= 0 && r <= limitR && c <= limitC && !filled(r, c)) { r += dr; c += dc; } }
    r = W.clamp(r, 0, Math.max(limitR, sel.r)); c = W.clamp(c, 0, Math.max(limitC, sel.c));
    setSel(r, c, extend);
    scrollIntoView(r, c);
  }
  const selKeys = () => { const out = []; for (let r = sel.r1; r <= sel.r2; r++) for (let c = sel.c1; c <= sel.c2; c++) out.push(key(r, c)); return out; };

  /* ═══════════ الرسم ═══════════ */
  let dpr = window.devicePixelRatio || 1;
  let copyMarquee = null;
  const COLORS = {
    sheetBg: '#ffffff', grid: '#e3e5ea', text: '#1d2027',
    headBg: () => (W.theme === 'dark' ? '#22252e' : '#f3f4f7'), headText: () => (W.theme === 'dark' ? '#9ba0b0' : '#5f6475'),
    headSel: () => (W.theme === 'dark' ? '#33384a' : '#dfe3ee'), headLine: () => (W.theme === 'dark' ? '#323644' : '#d8dbe3')
  };
  function resizeCanvas() {
    measure();
    dpr = window.devicePixelRatio || 1;
    canvas.style.width = view.w + 'px'; canvas.style.height = view.h + 'px';
    canvas.width = Math.round(view.w * dpr); canvas.height = Math.round(view.h * dpr);
    if (sh.rtl) { canvas.style.right = '0'; canvas.style.left = 'auto'; } else { canvas.style.left = '0'; canvas.style.right = 'auto'; }
  }
  const ARABIC = /[؀-ۿ]/;
  function fontFor(st) {
    const fs = Math.round(((st && st.fs) || 13) * zoom);
    return (st && st.i ? 'italic ' : '') + (st && st.b ? '700 ' : '400 ') + fs + "px '" + ((st && st.font) || 'IBM Plex Sans Arabic') + "', 'Segoe UI', Tahoma, 'DejaVu Sans', sans-serif";
  }
  let rafPending = false;
  function render() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; draw(); });
  }
  function visibleCols(fromDist, toDist) {
    // أعمدة غير مجمدة ضمن مسافة العرض
    const a = Math.max(sh.freeze.c, bsearch(colPos, Math.max(0, fromDist - HW() + view.sx)));
    const b = Math.min(sh.cols - 1, bsearch(colPos, toDist - HW() + view.sx));
    return [a, b];
  }
  function draw() {
    measure();
    if (canvas.width !== Math.round(view.w * dpr) || canvas.height !== Math.round(view.h * dpr)) resizeCanvas();
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = COLORS.sheetBg;
    g.fillRect(0, 0, view.w, view.h);
    const fr = Math.min(sh.freeze.r, sh.rows), fc = Math.min(sh.freeze.c, sh.cols);
    const fw = frozenW(), fh = frozenH();
    const r0 = Math.max(fr, bsearch(rowPos, view.sy + fh)), r1 = Math.min(sh.rows - 1, bsearch(rowPos, view.sy + view.h - HH()));
    const [c0, c1] = visibleCols(HW() + fw, view.w);
    // المناطق الأربع
    const startX = (dist) => (sh.rtl ? view.w - dist : dist);
    const clipBand = (d1, d2, y1, y2) => { const x1 = startX(d1), x2 = startX(d2); return { x: Math.min(x1, x2), y: y1, w: Math.abs(x2 - x1), h: y2 - y1 }; };
    drawCells(r0, r1, c0, c1, clipBand(HW() + fw, view.w, HH() + fh, view.h));
    if (fr) drawCells(0, fr - 1, c0, c1, clipBand(HW() + fw, view.w, HH(), HH() + fh));
    if (fc) drawCells(r0, r1, 0, fc - 1, clipBand(HW(), HW() + fw, HH() + fh, view.h));
    if (fr && fc) drawCells(0, fr - 1, 0, fc - 1, clipBand(HW(), HW() + fw, HH(), HH() + fh));
    drawSelection();
    drawHeaders(r0, r1, c0, c1, fr, fc);
    // فواصل التجميد
    g.strokeStyle = '#9aa3b5'; g.lineWidth = 2;
    if (fr) { g.beginPath(); g.moveTo(0, HH() + fh); g.lineTo(view.w, HH() + fh); g.stroke(); }
    if (fc) { const x = startX(HW() + fw); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, view.h); g.stroke(); }
    positionEditor();
  }
  function drawCells(r0, r1, c0, c1, clip) {
    if (r1 < r0 || c1 < c0 || clip.w <= 0 || clip.h <= 0) return;
    g.save();
    g.beginPath(); g.rect(clip.x, clip.y, clip.w, clip.h); g.clip();
    const si = book.active;
    // الخلفيات
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
      const cell = sh.cells[key(r, c)];
      if (cell && cell.style && cell.style.bg) { const rc = cellRect(r, c); g.fillStyle = cell.style.bg; g.fillRect(rc.x, rc.y, rc.w, rc.h); }
    }
    // خطوط الشبكة
    if (sh.gridlines !== false) {
      g.strokeStyle = COLORS.grid; g.lineWidth = 1;
      g.beginPath();
      for (let c = c0; c <= c1 + 1; c++) { const d = colDist(Math.min(c, sh.cols)); const x = Math.round(sh.rtl ? view.w - d : d) + 0.5; g.moveTo(x, clip.y); g.lineTo(x, clip.y + clip.h); }
      for (let r = r0; r <= r1 + 1; r++) { const y = Math.round(rowTop(Math.min(r, sh.rows))) - 0.5; g.moveTo(clip.x, y); g.lineTo(clip.x + clip.w, y); }
      g.stroke();
    }
    // النصوص
    g.textBaseline = 'middle';
    const mergedDone = new Set();
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const m = mergeAt(r, c);
        if (m) {
          const mk = m.r1 + ',' + m.c1;
          if (mergedDone.has(mk)) continue;
          mergedDone.add(mk);
          const rc = rangeRect(m.r1, m.c1, m.r2, m.c2);
          const cell = sh.cells[key(m.r1, m.c1)];
          g.fillStyle = (cell && cell.style && cell.style.bg) || COLORS.sheetBg;
          g.fillRect(rc.x + 1, rc.y, rc.w - 1, rc.h - 1);
          drawCellText(si, m.r1, m.c1, rc, cell, true);
          continue;
        }
        const cell = sh.cells[key(r, c)];
        if (!cell) continue;
        drawCellText(si, r, c, cellRect(r, c), cell, false);
      }
    }
    // الحدود
    g.strokeStyle = '#3c4152'; g.lineWidth = 1;
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
      const cell = sh.cells[key(r, c)];
      const b = cell && cell.style && cell.style.border;
      if (!b) continue;
      const rc = cellRect(r, c);
      const x0 = Math.round(rc.x) + 0.5, x1 = Math.round(rc.x + rc.w) - 0.5, y0 = Math.round(rc.y) - 0.5, y1 = Math.round(rc.y + rc.h) - 0.5;
      const L = sh.rtl ? b.r : b.l, R = sh.rtl ? b.l : b.r;
      g.beginPath();
      if (b.t) { g.moveTo(x0, y0); g.lineTo(x1, y0); }
      if (b.b) { g.moveTo(x0, y1); g.lineTo(x1, y1); }
      if (L) { g.moveTo(x0, y0); g.lineTo(x0, y1); }
      if (R) { g.moveTo(x1, y0); g.lineTo(x1, y1); }
      g.stroke();
    }
    g.restore();
  }
  function drawCellText(si, r, c, rc, cell, merged) {
    const v = value(si, r, c);
    if (v == null || v === '') return;
    const st = cell.style || {};
    const text = fmtValue(v, st);
    if (!text) return;
    g.font = fontFor(st);
    g.fillStyle = F.isErr(v) ? '#d32f2f' : (st.color || COLORS.text);
    const padX = 5 * zoom;
    // المحاذاة المنطقية → فيزيائية
    let align = st.align;
    if (!align) align = (isNumLike(v) && st.fmt !== 'text') ? 'end' : (typeof v === 'boolean' || F.isErr(v)) ? 'center' : (ARABIC.test(text) === sh.rtl ? 'start' : 'end');
    let phys = align === 'center' ? 'center' : ((align === 'start') === sh.rtl ? 'right' : 'left');
    const lines = st.wrap ? wrapLines(text, rc.w - padX * 2) : [text];
    const lh = Math.round(((st.fs || 13) * 1.25) * zoom);
    const totalH = lines.length * lh;
    let y = st.valign === 'top' ? rc.y + 3 + lh / 2 : st.valign === 'middle' ? rc.y + rc.h / 2 - totalH / 2 + lh / 2 : rc.y + rc.h - totalH + lh / 2 - 3;
    if (!st.wrap && !st.valign) y = rc.y + rc.h / 2;
    g.direction = ARABIC.test(text) ? 'rtl' : 'ltr';
    const tw = g.measureText(lines[0]).width;
    let clipW = rc.w, clipX = rc.x;
    const overflow = !st.wrap && !merged && tw > rc.w - padX * 2;
    if (overflow) {
      if (isNumLike(v) && st.fmt !== 'text' && !F.isErr(v)) { lines[0] = '#'.repeat(Math.max(1, Math.floor((rc.w - padX * 2) / g.measureText('#').width))); }
      else {
        // امتداد النص للخلايا الفارغة المجاورة في اتجاه الكتابة
        const dir = phys === 'left' ? 1 : -1; // اتجاه فيزيائي
        let extra = 0, cc = c;
        const stepC = (dir === 1) !== sh.rtl ? 1 : -1;
        while (tw > rc.w + extra - padX * 2 && extra < 1500) {
          cc += stepC;
          if (cc < 0 || cc >= sh.cols || sh.cells[key(r, cc)]) break;
          extra += colPos[cc + 1] - colPos[cc];
        }
        clipW = rc.w + extra;
        if (dir === -1) clipX = rc.x - extra;
      }
    }
    g.save();
    if (overflow || st.wrap || merged || tw > rc.w) { g.beginPath(); g.rect(clipX + 1, rc.y, clipW - 2, rc.h); g.clip(); }
    lines.forEach((line, i) => {
      g.textAlign = phys;
      const x = phys === 'left' ? rc.x + padX : phys === 'right' ? rc.x + rc.w - padX : rc.x + rc.w / 2;
      g.fillText(line, x, y + i * lh);
      if (st.u || st.s) {
        const w = g.measureText(line).width;
        const lx = phys === 'left' ? x : phys === 'right' ? x - w : x - w / 2;
        const ly = st.u ? y + i * lh + (st.fs || 13) * zoom * 0.45 : y + i * lh;
        g.fillRect(lx, ly, w, Math.max(1, zoom));
      }
    });
    g.restore();
  }
  function wrapLines(text, maxW) {
    const out = [];
    for (const para of String(text).split('\n')) {
      const words = para.split(/(\s+)/);
      let line = '';
      for (const w of words) {
        const test = line + w;
        if (g.measureText(test).width > maxW && line.trim()) { out.push(line.trim()); line = w.trimStart(); }
        else line = test;
      }
      out.push(line.trim());
    }
    return out;
  }
  function drawHeaders(r0, r1, c0, c1, fr, fc) {
    const hw = HW(), hh = HH();
    g.save();
    g.font = Math.round(11.5 * zoom) + "px 'IBM Plex Sans Arabic', 'Segoe UI', sans-serif";
    g.textBaseline = 'middle'; g.textAlign = 'center'; g.direction = 'ltr';
    // شريط الأعمدة
    g.fillStyle = COLORS.headBg(); g.fillRect(0, 0, view.w, hh);
    const cols = [];
    for (let c = 0; c < fc; c++) cols.push(c);
    for (let c = c0; c <= c1; c++) cols.push(c);
    g.save();
    const bandX = sh.rtl ? 0 : hw;
    g.beginPath(); g.rect(bandX, 0, view.w - hw, hh); g.clip();
    for (const c of cols) {
      const rc = cellRect(0, c);
      if (c >= sh.freeze.c && colDist(c) < hw + frozenW() - 1) continue;
      const selected = c >= sel.c1 && c <= sel.c2;
      if (selected) { g.fillStyle = COLORS.headSel(); g.fillRect(rc.x, 0, rc.w, hh); }
      g.fillStyle = selected ? W.app.color : COLORS.headText();
      g.fillText(F.colName(c), rc.x + rc.w / 2, hh / 2 + 1);
      g.fillStyle = COLORS.headLine();
      g.fillRect(Math.round(sh.rtl ? rc.x : rc.x + rc.w) - (sh.rtl ? 0 : 1), 0, 1, hh);
    }
    g.restore();
    // شريط الصفوف
    const rx = sh.rtl ? view.w - hw : 0;
    g.fillStyle = COLORS.headBg(); g.fillRect(rx, hh, hw, view.h - hh);
    const rows = [];
    for (let r = 0; r < fr; r++) rows.push(r);
    for (let r = r0; r <= r1; r++) rows.push(r);
    g.save();
    g.beginPath(); g.rect(rx, hh, hw, view.h - hh); g.clip();
    for (const r of rows) {
      const y = rowTop(r), h = rowPos[r + 1] - rowPos[r];
      if (r >= sh.freeze.r && y < hh + frozenH() - 1) continue;
      const selected = r >= sel.r1 && r <= sel.r2;
      if (selected) { g.fillStyle = COLORS.headSel(); g.fillRect(rx, y, hw, h); }
      g.fillStyle = selected ? W.app.color : COLORS.headText();
      g.fillText(String(r + 1), rx + hw / 2, y + h / 2 + 1);
      g.fillStyle = COLORS.headLine(); g.fillRect(rx, Math.round(y + h) - 1, hw, 1);
    }
    g.restore();
    // الزاوية
    g.fillStyle = COLORS.headBg(); g.fillRect(rx, 0, hw, hh);
    g.fillStyle = COLORS.headLine();
    g.fillRect(0, hh - 1, view.w, 1);
    g.fillRect(sh.rtl ? view.w - hw : hw - 1, 0, 1, view.h);
    // مثلث الزاوية
    g.fillStyle = COLORS.headText();
    g.beginPath();
    if (sh.rtl) { g.moveTo(view.w - 6, hh - 6); g.lineTo(view.w - 16, hh - 6); g.lineTo(view.w - 6, hh - 16); }
    else { g.moveTo(hw - 6, hh - 6); g.lineTo(hw - 16, hh - 6); g.lineTo(hw - 6, hh - 16); }
    g.fill();
    g.restore();
  }
  function drawSelection() {
    const hh = HH(), hw = HW();
    g.save();
    // منطقة الخلايا فقط
    g.beginPath(); g.rect(sh.rtl ? 0 : hw, hh, view.w - hw, view.h - hh); g.clip();
    const rr = rangeRect(sel.r1, sel.c1, sel.r2, sel.c2);
    const multi = sel.r1 !== sel.r2 || sel.c1 !== sel.c2;
    const m = mergeAt(sel.ar, sel.ac);
    if (multi && !(m && m.r1 === sel.r1 && m.c1 === sel.c1 && m.r2 === sel.r2 && m.c2 === sel.c2)) {
      g.fillStyle = W.color.rgba(W.app.color, 0.12);
      g.fillRect(rr.x, rr.y, rr.w, rr.h);
      const ac = m ? rangeRect(m.r1, m.c1, m.r2, m.c2) : cellRect(sel.ar, sel.ac);
      g.fillStyle = COLORS.sheetBg; g.globalAlpha = 0.6; g.fillRect(ac.x + 1, ac.y + 1, ac.w - 2, ac.h - 2); g.globalAlpha = 1;
    }
    g.strokeStyle = W.app.color; g.lineWidth = 2;
    g.strokeRect(rr.x + 1, rr.y + 0, rr.w - 2, rr.h - 1);
    // مقبض التعبئة
    const hx = sh.rtl ? rr.x : rr.x + rr.w, hy = rr.y + rr.h;
    g.fillStyle = W.app.color; g.fillRect(hx - 4, hy - 4, 7, 7);
    g.strokeStyle = '#fff'; g.lineWidth = 1; g.strokeRect(hx - 4.5, hy - 4.5, 8, 8);
    // نطاق النسخ
    if (copyMarquee && copyMarquee.si === book.active) {
      const cr = rangeRect(copyMarquee.r1, copyMarquee.c1, copyMarquee.r2, copyMarquee.c2);
      g.setLineDash([5, 3]); g.strokeStyle = W.app.color; g.lineWidth = 1.5;
      g.strokeRect(cr.x + 1.5, cr.y + 0.5, cr.w - 3, cr.h - 2);
      g.setLineDash([]);
    }
    // معاينة التعبئة
    if (drag && drag.mode === 'fill' && drag.target) {
      const t = drag.target;
      const fr2 = rangeRect(t.r1, t.c1, t.r2, t.c2);
      g.setLineDash([4, 3]); g.strokeStyle = '#555'; g.lineWidth = 1;
      g.strokeRect(fr2.x + 1, fr2.y, fr2.w - 2, fr2.h - 1);
      g.setLineDash([]);
    }
    // مراجع الصيغة أثناء التحرير
    if (editing && editor.value.startsWith('=')) {
      F.refsOf(editor.value.slice(1)).forEach((t, i) => {
        if (t.sheet && sheetIdx(t.sheet) !== book.active) return;
        if (t.type !== 'ref') return;
        const rc2 = cellRect(t.r, t.c);
        g.strokeStyle = PALETTE[i % PALETTE.length]; g.lineWidth = 2;
        g.strokeRect(rc2.x + 1, rc2.y, rc2.w - 2, rc2.h - 1);
      });
    }
    g.restore();
  }

  /* ═══════════ اختبار الموقع ═══════════ */
  function hit(clientX, clientY) {
    const b = wrap.getBoundingClientRect();
    const x = clientX - b.left, y = clientY - b.top;
    const dist = sh.rtl ? view.w - x : x;
    const hw = HW(), hh = HH();
    const res = { x, y };
    if (y < 0 || x < 0 || x > view.w || y > view.h) res.outside = true;
    const colAt = (d) => {
      const sx = d - hw;
      if (sx < frozenW()) return bsearch(colPos, Math.max(0, sx));
      return bsearch(colPos, Math.max(0, sx + view.sx));
    };
    const rowAt = (yy) => {
      const sy = yy - hh;
      if (sy < frozenH()) return bsearch(rowPos, Math.max(0, sy));
      return bsearch(rowPos, Math.max(0, sy + view.sy));
    };
    res.c = Math.min(colAt(dist), sh.cols - 1);
    res.r = Math.min(rowAt(y), sh.rows - 1);
    if (y < hh && dist < hw) res.area = 'corner';
    else if (y < hh) {
      res.area = 'colhead';
      const rc = cellRect(0, res.c);
      const endEdge = sh.rtl ? rc.x : rc.x + rc.w;
      const startEdge = sh.rtl ? rc.x + rc.w : rc.x;
      if (Math.abs(x - endEdge) < 5) res.resizeCol = res.c;
      else if (Math.abs(x - startEdge) < 5 && res.c > 0) res.resizeCol = res.c - 1;
    } else if (dist < hw) {
      res.area = 'rowhead';
      const top = rowTop(res.r), bottom = top + rowPos[res.r + 1] - rowPos[res.r];
      if (Math.abs(y - bottom) < 4) res.resizeRow = res.r;
      else if (Math.abs(y - top) < 4 && res.r > 0) res.resizeRow = res.r - 1;
    } else {
      res.area = 'cell';
      const rr = rangeRect(sel.r1, sel.c1, sel.r2, sel.c2);
      const hx = sh.rtl ? rr.x : rr.x + rr.w, hy = rr.y + rr.h;
      if (Math.abs(x - hx) <= 6 && Math.abs(y - hy) <= 6) res.fill = true;
    }
    return res;
  }

  /* ═══════════ المحرر داخل الخلية ═══════════ */
  let editing = null; // {r, c, original, fromBar}
  let refInsert = null;
  function startEdit(initial, opts) {
    opts = opts || {};
    if (editing) return;
    const m = mergeAt(sel.ar, sel.ac);
    const r = m ? m.r1 : sel.ar, c = m ? m.c1 : sel.ac;
    const cell = sh.cells[key(r, c)];
    const raw = rawOf(cell);
    editing = { r, c, original: raw };
    editor.value = initial != null ? initial : raw;
    editor.classList.remove('hidden');
    const st = (cell && cell.style) || {};
    editor.style.font = fontFor(st);
    editor.style.color = st.color || COLORS.text;
    editor.style.background = st.bg || '#fff';
    positionEditor();
    if (!opts.fromBar) {
      editor.focus();
      const L = editor.value.length;
      editor.setSelectionRange(L, L);
    }
    fbar.value = editor.value;
    autoGrow();
    render();
  }
  function rawOf(cell) {
    if (!cell) return '';
    if (cell.f) return '=' + cell.f;
    if (cell.v == null) return '';
    if (typeof cell.v === 'number') {
      const st = cell.style || {};
      if (st.fmt === 'date' || st.fmt === 'time' || st.fmt === 'datetime') return fmtValue(cell.v, st);
      if (st.fmt === 'percent') return F.fmtGeneral(W.round(cell.v * 100, 10)) + '%';
      return F.fmtGeneral(cell.v);
    }
    if (typeof cell.v === 'boolean') return cell.v ? 'TRUE' : 'FALSE';
    const s = String(cell.v);
    return parseInput(s).v !== s && s[0] !== "'" ? "'" + s : s;
  }
  function positionEditor() {
    if (!editing) return;
    const m = mergeAt(editing.r, editing.c);
    const rc = m ? rangeRect(m.r1, m.c1, m.r2, m.c2) : cellRect(editing.r, editing.c);
    const wr = wrap.getBoundingClientRect(), sr = stageEl.getBoundingClientRect();
    editor.style.top = (wr.top - sr.top + rc.y) + 'px';
    editor.style.height = Math.max(rc.h, editor.scrollHeight) + 'px';
    editor.style.minWidth = rc.w + 'px';
    if (sh.rtl) { editor.style.right = (sr.right - wr.left - rc.x - rc.w) + 'px'; editor.style.left = 'auto'; }
    else { editor.style.left = (wr.left - sr.left + rc.x) + 'px'; editor.style.right = 'auto'; }
  }
  function autoGrow() {
    editor.style.width = 'auto';
    const meas = W.$('#measure') || document.body.appendChild(W.h('span', { id: 'measure', style: { position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', top: '-999px' } }));
    meas.style.font = editor.style.font;
    meas.textContent = editor.value.split('\n').reduce((a, b) => (a.length > b.length ? a : b), '') + 'MM';
    editor.style.width = Math.min(Math.max(meas.offsetWidth, parseFloat(editor.style.minWidth) || 60), view.w - 20) + 'px';
    editor.style.height = 'auto';
    editor.style.height = Math.max(editor.scrollHeight, parseFloat(editor.style.minHeight) || 0) + 'px';
  }
  function commitEdit(move) {
    if (!editing) return;
    const { r, c } = editing;
    const text = editor.value;
    hideSuggest();
    editor.classList.add('hidden');
    editing = null;
    refInsert = null;
    setCellRaw(r, c, text);
    focusGrid();
    if (move === 'down') moveSel(1, 0);
    else if (move === 'up') moveSel(-1, 0);
    else if (move === 'next') moveSel(0, 1);
    else if (move === 'prev') moveSel(0, -1);
    else render();
  }
  function cancelEdit() {
    if (!editing) return;
    editing = null; refInsert = null;
    hideSuggest();
    editor.classList.add('hidden');
    syncFormulaBar();
    focusGrid();
    render();
  }
  function setCellRaw(r, c, text) {
    const k = key(r, c);
    const prev = sh.cells[k];
    if (rawOf(prev) === text) return;
    editCells([k], () => {
      const p = parseInput(text);
      const style = prev && prev.style ? Object.assign({}, prev.style) : null;
      if (p.empty) { if (style) sh.cells[k] = { style }; else delete sh.cells[k]; return; }
      const cell = {};
      if (p.f) {
        cell.f = p.f;
        // دالة جمع تلقائية: تنسيق نسبة مئوية إن كانت المراجع كذلك؛ نتركه
      } else cell.v = p.v;
      let st = style;
      if (p.hint && (!st || !st.fmt || st.fmt === 'general')) st = Object.assign({}, st || {}, p.hint);
      if (st && Object.keys(st).length) cell.style = st;
      sh.cells[k] = cell;
    });
    rebuildIfGrown();
    renderCharts();
  }
  function rebuildIfGrown() {
    const u = used(book.active);
    if (u.r + 20 > sh.rows || u.c + 3 > sh.cols) rebuild();
  }
  function syncFormulaBar() {
    nameBox.value = sel.r1 === sel.r2 && sel.c1 === sel.c2 ? F.addr(sel.ar, sel.ac) : F.addr(sel.r1, sel.c1) + ':' + F.addr(sel.r2, sel.c2);
    if (!editing) {
      const m = mergeAt(sel.ar, sel.ac);
      fbar.value = rawOf(sh.cells[key(m ? m.r1 : sel.ar, m ? m.c1 : sel.ac)]);
    }
    fbar.dir = /^[=\d\-+.]/.test(fbar.value) || !fbar.value ? 'ltr' : 'auto';
  }

  /* ═══════════ اقتراح الدوال ═══════════ */
  const FUNCS = F.functions();
  let suggestIdx = 0, suggestList = [];
  function updateSuggest(input) {
    const v = input.value, pos = input.selectionStart;
    if (!v.startsWith('=')) return hideSuggest();
    const before = v.slice(0, pos);
    const m = /([A-Za-z؀-ۿ_][A-Za-z0-9؀-ۿ_.]*)$/.exec(before);
    if (!m || /\d$/.test(m[1]) && /^[A-Za-z]{1,3}\d+$/.test(m[1])) return hideSuggest();
    const q = m[1].toUpperCase();
    const aliases = Object.keys(F.aliases).filter((a) => a.startsWith(m[1]));
    suggestList = aliases.concat(FUNCS.filter((f) => f.startsWith(q))).slice(0, 8);
    if (!suggestList.length) return hideSuggest();
    suggestIdx = 0;
    suggest.innerHTML = '';
    suggestList.forEach((f, i) => suggest.append(W.h('div', { class: 'k-sug' + (i === 0 ? ' active' : ''), text: f + (F.aliases[f] ? ' ← ' + F.aliases[f] : ''), onmousedown: (e) => { e.preventDefault(); acceptSuggest(input, i); } })));
    const r = input.getBoundingClientRect(), s = stageEl.getBoundingClientRect();
    suggest.style.top = (r.bottom - s.top + 2) + 'px';
    suggest.style.left = (W.isRTL() ? r.right - s.left - 220 : r.left - s.left) + 'px';
    suggest.classList.remove('hidden');
    suggest.dataset.len = m[1].length;
  }
  function hideSuggest() { suggest.classList.add('hidden'); suggestList = []; }
  function acceptSuggest(input, i) {
    const name = suggestList[i];
    const pos = input.selectionStart, len = +suggest.dataset.len;
    input.value = input.value.slice(0, pos - len) + name + '(' + input.value.slice(pos);
    const np = pos - len + name.length + 1;
    input.setSelectionRange(np, np);
    hideSuggest();
    if (input === editor) fbar.value = editor.value; else if (editing) editor.value = fbar.value;
    autoGrow();
  }
  function suggestKey(e, input) {
    if (suggest.classList.contains('hidden')) return false;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      suggestIdx = (suggestIdx + (e.key === 'ArrowDown' ? 1 : -1) + suggestList.length) % suggestList.length;
      Array.from(suggest.children).forEach((c, i) => c.classList.toggle('active', i === suggestIdx));
      return true;
    }
    if (e.key === 'Tab' || e.key === 'Enter') { e.preventDefault(); acceptSuggest(input, suggestIdx); return true; }
    if (e.key === 'Escape') { hideSuggest(); e.preventDefault(); return true; }
    return false;
  }
  /** هل المؤشر في موضع يتوقع مرجع\u064Bا (بعد عامل أو فاصلة)؟ */
  function expectsRef(input) {
    const v = input.value;
    if (!v.startsWith('=')) return false;
    const before = v.slice(0, input.selectionStart).replace(/\s+$/, '');
    return /[=+\-*/^&(,;:<>]$/.test(before) || (refInsert && input.selectionStart === refInsert.end);
  }

  editor.addEventListener('input', () => { fbar.value = editor.value; autoGrow(); updateSuggest(editor); render(); refInsert = null; });
  editor.addEventListener('keydown', (e) => {
    if (suggestKey(e, editor)) return;
    if (e.key === 'Enter' && !e.altKey) { e.preventDefault(); commitEdit(e.shiftKey ? 'up' : 'down'); }
    else if (e.key === 'Enter' && e.altKey) { e.preventDefault(); const p = editor.selectionStart; editor.value = editor.value.slice(0, p) + '\n' + editor.value.slice(editor.selectionEnd); editor.setSelectionRange(p + 1, p + 1); autoGrow(); }
    else if (e.key === 'Tab') { e.preventDefault(); commitEdit(e.shiftKey ? 'prev' : 'next'); }
    else if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); }
  });
  editor.addEventListener('blur', () => { setTimeout(() => { if (editing && document.activeElement !== editor && document.activeElement !== fbar && !drag) commitEdit(); }, 120); });
  fbar.addEventListener('focus', () => { if (!editing) { startEdit(null, { fromBar: true }); } });
  fbar.addEventListener('input', () => { if (!editing) startEdit(fbar.value, { fromBar: true }); editor.value = fbar.value; autoGrow(); updateSuggest(fbar); render(); });
  fbar.addEventListener('keydown', (e) => {
    if (suggestKey(e, fbar)) return;
    if (e.key === 'Enter') { e.preventDefault(); editor.value = fbar.value; commitEdit('down'); }
    else if (e.key === 'Escape') { e.preventDefault(); cancelEdit(); }
    else if (e.key === 'Tab') { e.preventDefault(); editor.value = fbar.value; commitEdit('next'); }
  });
  fbar.addEventListener('blur', () => { setTimeout(() => { if (editing && document.activeElement !== editor && document.activeElement !== fbar && !drag) { editor.value = fbar.value; commitEdit(); } }, 150); });
  nameBox.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const v = nameBox.value.trim().toUpperCase();
    const [a, b] = v.split(':').map(F.parseAddr);
    if (a) { setSel(a.r, a.c); if (b) setSel(b.r, b.c, true); scrollIntoView(a.r, a.c); focusGrid(); }
  });

  /* ═══════════ الفأرة ═══════════ */
  let drag = null;
  wrap.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      const h = hit(e.clientX, e.clientY);
      if (h.area === 'cell' && !(h.r >= sel.r1 && h.r <= sel.r2 && h.c >= sel.c1 && h.c <= sel.c2)) setSel(h.r, h.c);
      return;
    }
    if (e.button !== 0) return;
    if (e.target.closest('.k-chart')) return;
    measure();
    const b = wrap.getBoundingClientRect();
    if (e.clientX - b.left > wrap.clientWidth && !sh.rtl) return; // شريط التمرير
    if (sh.rtl && e.clientX - b.left < b.width - wrap.clientWidth) return;
    if (e.clientY - b.top > wrap.clientHeight) return;
    const h = hit(e.clientX, e.clientY);
    // إدراج مرجع أثناء كتابة صيغة
    const active = editing ? (document.activeElement === fbar ? fbar : editor) : null;
    if (editing && h.area === 'cell' && active && expectsRef(active)) {
      e.preventDefault();
      const ref = F.addr(h.r, h.c);
      const pos = refInsert ? refInsert.start : active.selectionStart;
      const end = refInsert ? refInsert.end : active.selectionEnd;
      active.value = active.value.slice(0, pos) + ref + active.value.slice(end);
      refInsert = { start: pos, end: pos + ref.length, r: h.r, c: h.c, input: active };
      active.setSelectionRange(refInsert.end, refInsert.end);
      if (active === editor) fbar.value = editor.value; else editor.value = fbar.value;
      drag = { mode: 'ref' };
      setTimeout(() => active.focus(), 0);
      autoGrow(); render();
      return;
    }
    if (editing) commitEdit();
    e.preventDefault();
    focusGrid();
    if (h.area === 'corner') { sel.ar = 0; sel.ac = 0; setSel(sh.rows - 1, sh.cols - 1, true); sel.r = 0; sel.c = 0; return; }
    if (h.resizeCol != null) { drag = { mode: 'colresize', c: h.resizeCol, start: e.clientX, w0: sh.colW[h.resizeCol] || DEF_COLW, before: JSON.stringify(sh) }; return; }
    if (h.resizeRow != null) { drag = { mode: 'rowresize', r: h.resizeRow, start: e.clientY, h0: sh.rowH[h.resizeRow] || DEF_ROWH, before: JSON.stringify(sh) }; return; }
    if (h.area === 'colhead') {
      if (e.shiftKey) { setSel(sh.rows - 1, h.c, true); }
      else { sel.ar = 0; sel.ac = h.c; setSel(sh.rows - 1, h.c, true); }
      drag = { mode: 'cols' };
      return;
    }
    if (h.area === 'rowhead') {
      if (e.shiftKey) setSel(h.r, sh.cols - 1, true);
      else { sel.ar = h.r; sel.ac = 0; setSel(h.r, sh.cols - 1, true); }
      drag = { mode: 'rows' };
      return;
    }
    if (h.fill) { drag = { mode: 'fill', src: { r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c2 } }; return; }
    setSel(h.r, h.c, e.shiftKey);
    drag = { mode: 'select' };
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) {
      if (e.target === wrap || e.target === spacer) {
        const h = hit(e.clientX, e.clientY);
        wrap.style.cursor = h.resizeCol != null ? 'col-resize' : h.resizeRow != null ? 'row-resize' : h.fill ? 'crosshair' : h.area === 'cell' ? 'cell' : 'default';
      }
      return;
    }
    const h = hit(e.clientX, e.clientY);
    autoScroll(h);
    if (drag.mode === 'select') { if (h.area === 'cell' || h.outside) setSel(h.r, h.c, true); }
    else if (drag.mode === 'cols') setSel(sh.rows - 1, h.c, true);
    else if (drag.mode === 'rows') setSel(h.r, sh.cols - 1, true);
    else if (drag.mode === 'colresize') {
      const dx = (e.clientX - drag.start) * (sh.rtl ? -1 : 1) / zoom;
      sh.colW[drag.c] = Math.max(16, Math.round(drag.w0 + dx));
      rebuild(); render(); renderCharts();
    } else if (drag.mode === 'rowresize') {
      sh.rowH[drag.r] = Math.max(12, Math.round(drag.h0 + (e.clientY - drag.start) / zoom));
      rebuild(); render(); renderCharts();
    } else if (drag.mode === 'fill') {
      const s = drag.src;
      const dr = h.r > s.r2 ? h.r - s.r2 : h.r < s.r1 ? h.r - s.r1 : 0;
      const dc = h.c > s.c2 ? h.c - s.c2 : h.c < s.c1 ? h.c - s.c1 : 0;
      if (Math.abs(dr) >= Math.abs(dc) && dr) drag.target = dr > 0 ? { r1: s.r1, c1: s.c1, r2: h.r, c2: s.c2 } : { r1: h.r, c1: s.c1, r2: s.r2, c2: s.c2 };
      else if (dc) drag.target = dc > 0 ? { r1: s.r1, c1: s.c1, r2: s.r2, c2: h.c } : { r1: s.r1, c1: h.c, r2: s.r2, c2: s.c2 };
      else drag.target = null;
      render();
    } else if (drag.mode === 'ref' && refInsert && h.area === 'cell') {
      const inp = refInsert.input;
      const a = F.addr(Math.min(refInsert.r, h.r), Math.min(refInsert.c, h.c)), b2 = F.addr(Math.max(refInsert.r, h.r), Math.max(refInsert.c, h.c));
      const ref = a === b2 ? a : a + ':' + b2;
      inp.value = inp.value.slice(0, refInsert.start) + ref + inp.value.slice(refInsert.end);
      refInsert.end = refInsert.start + ref.length;
      inp.setSelectionRange(refInsert.end, refInsert.end);
      if (inp === editor) fbar.value = editor.value; else editor.value = fbar.value;
      autoGrow(); render();
    }
  });
  window.addEventListener('mouseup', () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    stopAutoScroll();
    if (d.mode === 'colresize' || d.mode === 'rowresize') {
      const after = JSON.stringify(sh);
      if (after !== d.before) pushHistory({ type: 'sheet', si: book.active, before: d.before, after });
    } else if (d.mode === 'fill' && d.target) {
      fillRange(d.src, d.target);
    }
  });
  let scrollTimer = null;
  function autoScroll(h) {
    stopAutoScroll();
    if (!drag || !['select', 'fill', 'cols', 'rows', 'ref'].includes(drag.mode)) return;
    let dx = 0, dy = 0;
    if (h.y > view.h - 10) dy = 20; else if (h.y < HH() + 4) dy = -20;
    const dist = sh.rtl ? view.w - h.x : h.x;
    if (dist > view.w - 10) dx = 20; else if (dist < HW() + 4) dx = -20;
    if (!dx && !dy) return;
    scrollTimer = setInterval(() => {
      wrap.scrollTop += dy;
      wrap.scrollLeft += sh.rtl ? -dx : dx;
    }, 30);
  }
  function stopAutoScroll() { clearInterval(scrollTimer); scrollTimer = null; }
  wrap.addEventListener('dblclick', (e) => {
    const h = hit(e.clientX, e.clientY);
    if (h.resizeCol != null) { autoFitCol(h.resizeCol); return; }
    if (h.area === 'cell') startEdit();
  });
  wrap.addEventListener('scroll', () => {
    measure();
    // تمديد الورقة عند الاقتراب من النهاية
    if (view.sy + view.h > HH() + rowPos[sh.rows] - 200 && sh.rows < MAX_ROWS) { sh.rows = Math.min(MAX_ROWS, sh.rows + 200); rebuild(); }
    if (view.sx + view.w > HW() + colPos[sh.cols] - 200 && sh.cols < MAX_COLS) { sh.cols = Math.min(MAX_COLS, sh.cols + 10); rebuild(); }
    render();
  });
  wrap.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom(zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1)); }
  }, { passive: false });
  wrap.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.k-chart')) return;
    const h = hit(e.clientX, e.clientY);
    if (h.area === 'colhead') W.contextMenu(e, colMenu());
    else if (h.area === 'rowhead') W.contextMenu(e, rowMenu());
    else W.contextMenu(e, cellMenu());
  });
  function autoFitCol(c) {
    editSheet(() => {
      let mx = 30;
      for (const k in sh.cells) {
        const [r, cc] = k.split(',').map(Number);
        if (cc !== c) continue;
        const cell = sh.cells[k];
        g.font = fontFor(cell.style);
        mx = Math.max(mx, g.measureText(fmtValue(value(book.active, r, cc), cell.style)).width / zoom + 14);
      }
      sh.colW[c] = Math.min(600, Math.ceil(mx));
    });
    rebuild(); render(); renderCharts();
  }

  /* ═══════════ لوحة المفاتيح ═══════════ */
  sink.addEventListener('input', () => {
    // نص وارد دون حدث مفتاح (لوحات المفاتيح الافتراضية وطرق الإدخال)
    const t = sink.value;
    sink.value = '';
    if (t && !editing) startEdit(t);
  });
  sink.addEventListener('keydown', (e) => {
    if (editing || e.isComposing) return;
    const mod = W.isMac ? e.metaKey : e.ctrlKey;
    const rtl = sh.rtl;
    const k = e.key;
    if (k === 'ArrowDown') { e.preventDefault(); mod ? jump(1, 0, e.shiftKey) : moveSel(1, 0, e.shiftKey); }
    else if (k === 'ArrowUp') { e.preventDefault(); mod ? jump(-1, 0, e.shiftKey) : moveSel(-1, 0, e.shiftKey); }
    else if (k === 'ArrowLeft') { e.preventDefault(); const d = rtl ? 1 : -1; mod ? jump(0, d, e.shiftKey) : moveSel(0, d, e.shiftKey); }
    else if (k === 'ArrowRight') { e.preventDefault(); const d = rtl ? -1 : 1; mod ? jump(0, d, e.shiftKey) : moveSel(0, d, e.shiftKey); }
    else if (k === 'Enter') { e.preventDefault(); moveSel(e.shiftKey ? -1 : 1, 0); }
    else if (k === 'Tab') { e.preventDefault(); moveSel(0, e.shiftKey ? -1 : 1); }
    else if (k === 'Home') { e.preventDefault(); if (mod) { setSel(0, 0, e.shiftKey); scrollIntoView(0, 0); } else { setSel(sel.r, 0, e.shiftKey); scrollIntoView(sel.r, 0); } }
    else if (k === 'End' && mod) { e.preventDefault(); const u = used(book.active); setSel(Math.max(0, u.r), Math.max(0, u.c), e.shiftKey); scrollIntoView(Math.max(0, u.r), Math.max(0, u.c)); }
    else if (k === 'PageDown') { e.preventDefault(); moveSel(Math.max(1, Math.floor(view.h / (DEF_ROWH * zoom)) - 2), 0, e.shiftKey); }
    else if (k === 'PageUp') { e.preventDefault(); moveSel(-Math.max(1, Math.floor(view.h / (DEF_ROWH * zoom)) - 2), 0, e.shiftKey); }
    else if (k === 'F2') { e.preventDefault(); startEdit(); }
    else if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); clearSel(false); }
    else if (k === 'Escape') { copyMarquee = null; render(); }
    else if (!mod && !e.altKey && k.length === 1) { e.preventDefault(); startEdit(k); }
  });

  /* ═══════════ الحافظة ═══════════ */
  let clip = null;
  function selectionTSV() {
    const rows = [];
    for (let r = sel.r1; r <= sel.r2; r++) {
      const row = [];
      for (let c = sel.c1; c <= sel.c2; c++) { const cell = sh.cells[key(r, c)]; row.push(cell ? fmtValue(value(book.active, r, c), cell.style).replace(/\t|\n/g, ' ') : ''); }
      rows.push(row.join('\t'));
    }
    return rows.join('\n');
  }
  function doCopy(cut) {
    const cells = [];
    for (let r = sel.r1; r <= sel.r2; r++) { const row = []; for (let c = sel.c1; c <= sel.c2; c++) row.push(clone(sh.cells[key(r, c)])); cells.push(row); }
    const tsv = selectionTSV();
    clip = { si: book.active, r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c2, cells, tsv, cut };
    copyMarquee = { si: book.active, r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c2 };
    render();
    return tsv;
  }
  function doPaste(text, valuesOnly) {
    const useInternal = clip && (text == null || text.replace(/\r/g, '') === clip.tsv);
    const tr = sel.r1, tc = sel.c1;
    if (useInternal) {
      const h = clip.cells.length, w = clip.cells[0].length;
      const tileR = (sel.r2 - sel.r1 + 1) % h === 0 && sel.r2 > sel.r1 ? (sel.r2 - sel.r1 + 1) / h : 1;
      const tileC = (sel.c2 - sel.c1 + 1) % w === 0 && sel.c2 > sel.c1 ? (sel.c2 - sel.c1 + 1) / w : 1;
      const keys = [];
      for (let r = 0; r < h * tileR; r++) for (let c = 0; c < w * tileC; c++) keys.push(key(tr + r, tc + c));
      const srcKeys = [];
      if (clip.cut && clip.si === book.active) for (let r = clip.r1; r <= clip.r2; r++) for (let c = clip.c1; c <= clip.c2; c++) srcKeys.push(key(r, c));
      editCells(Array.from(new Set(keys.concat(srcKeys))), () => {
        if (clip.cut) { const src = book.sheets[clip.si]; for (let r = clip.r1; r <= clip.r2; r++) for (let c = clip.c1; c <= clip.c2; c++) delete src.cells[key(r, c)]; }
        for (let r = 0; r < h * tileR; r++) for (let c = 0; c < w * tileC; c++) {
          const srcCell = clip.cells[r % h][c % w];
          const k2 = key(tr + r, tc + c);
          if (!srcCell) { delete sh.cells[k2]; continue; }
          const n = clone(srcCell);
          if (n.f) {
            if (valuesOnly) { const v = value(clip.si, clip.r1 + (r % h), clip.c1 + (c % w)); delete n.f; n.v = F.isErr(v) ? v.err : v; }
            else if (!clip.cut) n.f = F.shift(n.f, tr + r - (clip.r1 + (r % h)), tc + c - (clip.c1 + (c % w)));
          }
          if (valuesOnly && n.style) { const keep = sh.cells[k2] && sh.cells[k2].style; if (keep) n.style = keep; else delete n.style; }
          sh.cells[k2] = n;
        }
      });
      if (clip.cut) { clip = null; copyMarquee = null; }
      setSel(tr, tc); setSel(tr + h * tileR - 1, tc + w * tileC - 1, true);
    } else if (text != null) {
      const rows = (/\t/.test(text) || !/,/.test(text) ? text.replace(/\r/g, '').replace(/\n$/, '').split('\n').map((l) => l.split('\t')) : X.parseCSV(text));
      const keys = [];
      rows.forEach((row, r) => row.forEach((v, c) => keys.push(key(tr + r, tc + c))));
      editCells(keys, () => {
        rows.forEach((row, r) => row.forEach((v, c) => {
          const k2 = key(tr + r, tc + c);
          const p = parseInput(v);
          const style = sh.cells[k2] && sh.cells[k2].style;
          if (p.empty) { if (style) sh.cells[k2] = { style }; else delete sh.cells[k2]; return; }
          const cell = p.f ? { f: p.f } : { v: p.v };
          const st = p.hint ? Object.assign({}, style || {}, p.hint) : style;
          if (st) cell.style = st;
          sh.cells[k2] = cell;
        }));
      });
      setSel(tr, tc); setSel(tr + rows.length - 1, tc + Math.max(...rows.map((r) => r.length)) - 1, true);
    }
    rebuildIfGrown(); renderCharts(); render();
  }
  document.addEventListener('copy', (e) => { if (editing || !isGridFocus()) return; e.preventDefault(); e.clipboardData.setData('text/plain', doCopy(false)); });
  document.addEventListener('cut', (e) => { if (editing || !isGridFocus()) return; e.preventDefault(); e.clipboardData.setData('text/plain', doCopy(true)); });
  document.addEventListener('paste', (e) => { if (editing || !isGridFocus()) return; e.preventDefault(); doPaste(e.clipboardData.getData('text/plain')); });
  const isGridFocus = () => document.activeElement === sink || document.activeElement === wrap || wrap.contains(document.activeElement);
  async function menuCopy(cut) { const t = doCopy(cut); try { await navigator.clipboard.writeText(t); } catch (e) { /* تجاهل */ } }
  async function menuPaste(valuesOnly) {
    let t = null;
    try { t = await navigator.clipboard.readText(); } catch (e) { t = null; }
    doPaste(t, valuesOnly);
  }

  /* ═══════════ العمليات ═══════════ */
  function clearSel(all) {
    const keys = selKeys().filter((k) => sh.cells[k]);
    if (!keys.length) return;
    editCells(keys, () => keys.forEach((k) => {
      const c = sh.cells[k];
      if (all || !c.style) delete sh.cells[k]; else sh.cells[k] = { style: c.style };
    }));
    renderCharts(); render(); syncFormulaBar();
  }
  /** تطبيق نمط على التحديد */
  function styleSel(patch) {
    const keys = selKeys();
    editCells(keys, () => keys.forEach((k) => {
      const c = sh.cells[k] || {};
      const st = Object.assign({}, c.style || {});
      for (const p in patch) { if (patch[p] == null || patch[p] === false) delete st[p]; else st[p] = patch[p]; }
      if (Object.keys(st).length) c.style = st; else delete c.style;
      if (c.style || c.v != null || c.f) sh.cells[k] = c; else delete sh.cells[k];
    }));
    render(); updateToolbar();
  }
  const activeStyle = () => { const c = sh.cells[key(sel.ar, sel.ac)]; return (c && c.style) || {}; };
  function toggleStyle(prop) { styleSel({ [prop]: !activeStyle()[prop] }); }
  function setBorders(kind) {
    const keys = selKeys();
    editCells(keys, () => {
      for (let r = sel.r1; r <= sel.r2; r++) for (let c = sel.c1; c <= sel.c2; c++) {
        const k = key(r, c);
        const cell = sh.cells[k] || {};
        const st = Object.assign({}, cell.style || {});
        let b;
        if (kind === 'none') b = null;
        else if (kind === 'all') b = { t: true, b: true, l: true, r: true };
        else if (kind === 'bottom') b = Object.assign({}, st.border || {}, r === sel.r2 ? { b: true } : {});
        else if (kind === 'outer') {
          b = Object.assign({}, st.border || {});
          if (r === sel.r1) b.t = true; if (r === sel.r2) b.b = true;
          const startSide = 'l', endSide = 'r';
          if (c === sel.c1) b[startSide] = true; if (c === sel.c2) b[endSide] = true;
        }
        if (b && (b.t || b.b || b.l || b.r)) st.border = b; else delete st.border;
        if (Object.keys(st).length) cell.style = st; else delete cell.style;
        if (cell.style || cell.v != null || cell.f) sh.cells[k] = cell; else delete sh.cells[k];
      }
    });
    render();
  }
  function changeDecimals(d) {
    const st = activeStyle();
    const fmt = st.fmt && st.fmt !== 'general' ? st.fmt : 'number';
    const cur = st.dec != null ? st.dec : (fmt === 'percent' ? 0 : 2);
    styleSel({ fmt, dec: W.clamp(cur + d, 0, 10) });
  }
  function autoSum() {
    // جمع العمود فوق الخلية الحالية أو الصف قبلها
    let r = sel.ar, c = sel.ac;
    if (sel.r2 > sel.r1 || sel.c2 > sel.c1) { r = sel.r2 + 1; c = sel.c1; }
    let top = r - 1;
    while (top >= 0 && isNumLike(value(book.active, top, c))) top--;
    if (top < r - 1) { setSel(r, c); setCellRaw(r, c, '=SUM(' + F.addr(top + 1, c) + ':' + F.addr(r - 1, c) + ')'); return; }
    let s = c - 1;
    while (s >= 0 && isNumLike(value(book.active, r, s))) s--;
    if (s < c - 1) { setSel(r, c); setCellRaw(r, c, '=SUM(' + F.addr(r, s + 1) + ':' + F.addr(r, c - 1) + ')'); return; }
    setSel(r, c);
    startEdit('=SUM()');
    editor.setSelectionRange(5, 5);
  }
  function fillRange(src, dst) {
    const vertical = dst.c1 === src.c1 && dst.c2 === src.c2;
    const keys = [];
    for (let r = dst.r1; r <= dst.r2; r++) for (let c = dst.c1; c <= dst.c2; c++) keys.push(key(r, c));
    editCells(keys, () => {
      const lines = vertical ? src.c2 - src.c1 + 1 : src.r2 - src.r1 + 1;
      for (let i = 0; i < lines; i++) {
        const seq = [];
        if (vertical) for (let r = src.r1; r <= src.r2; r++) seq.push({ r, c: src.c1 + i, cell: sh.cells[key(r, src.c1 + i)] });
        else for (let c = src.c1; c <= src.c2; c++) seq.push({ r: src.r1 + i, c, cell: sh.cells[key(src.r1 + i, c)] });
        const n = seq.length;
        const allNum = seq.every((s) => s.cell && !s.cell.f && typeof s.cell.v === 'number');
        const step = allNum && n >= 2 ? (seq[n - 1].cell.v - seq[0].cell.v) / (n - 1) : (allNum && n === 1 && seq[0].cell.style && /date/.test(seq[0].cell.style.fmt || '') ? 1 : 0);
        const targets = [];
        if (vertical) { for (let r = dst.r1; r <= dst.r2; r++) if (r < src.r1 || r > src.r2) targets.push({ r, c: src.c1 + i }); }
        else { for (let c = dst.c1; c <= dst.c2; c++) if (c < src.c1 || c > src.c2) targets.push({ r: src.r1 + i, c }); }
        const forward = vertical ? dst.r2 > src.r2 : dst.c2 > src.c2;
        targets.forEach((t) => {
          const offset = vertical ? t.r - (forward ? src.r2 : src.r1) : t.c - (forward ? src.c2 : src.c1);
          const idx = ((forward ? offset - 1 : offset + n) % n + n) % n;
          const s = seq[forward ? idx : n - 1 - (((-offset - 1) % n + n) % n)] || seq[0];
          const k2 = key(t.r, t.c);
          if (!s.cell) { delete sh.cells[k2]; return; }
          const nc = clone(s.cell);
          if (nc.f) nc.f = F.shift(nc.f, t.r - s.r, t.c - s.c);
          else if (allNum && step) nc.v = (forward ? seq[n - 1].cell.v : seq[0].cell.v) + step * offset;
          else if (typeof nc.v === 'string' && /\d+$/.test(nc.v) && !allNum) {
            const m = /^(.*?)(\d+)$/.exec(nc.v);
            const base = parseInt(/(\d+)$/.exec((forward ? seq[n - 1] : seq[0]).cell.v || '0') ? /(\d+)$/.exec((forward ? seq[n - 1] : seq[0]).cell.v)[1] : m[2], 10);
            nc.v = m[1] + (base + offset);
          }
          sh.cells[k2] = nc;
        });
      }
    });
    setSel(dst.r1 === src.r1 ? dst.r1 : dst.r1, dst.c1); sel.ar = src.r1; sel.ac = src.c1; setSel(dst.r2 === src.r2 && dst.r1 < src.r1 ? dst.r1 : dst.r2, dst.c2 === src.c2 && dst.c1 < src.c1 ? dst.c1 : dst.c2, true);
    rebuildIfGrown(); renderCharts(); render();
  }
  function fillDir(dir) {
    if (dir === 'down' && sel.r2 > sel.r1) fillRange({ r1: sel.r1, c1: sel.c1, r2: sel.r1, c2: sel.c2 }, { r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c2 });
    if (dir === 'right' && sel.c2 > sel.c1) fillRange({ r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c1 }, { r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c2 });
  }
  /** إدراج/حذف صفوف وأعمدة مع تعديل المراجع */
  function shiftStructure(axis, at, count) {
    editBook(() => {
      const name = sh.name;
      const out = {};
      for (const k in sh.cells) {
        let [r, c] = k.split(',').map(Number);
        if (axis === 'row') { if (count < 0 && r >= at && r < at - count) continue; if (r >= at) r += (count < 0 && r < at - count) ? 0 : count; }
        else { if (count < 0 && c >= at && c < at - count) continue; if (c >= at) c += count; }
        if (r < 0 || c < 0) continue;
        out[key(r, c)] = sh.cells[k];
      }
      sh.cells = out;
      const shiftMap = (mp) => { const o = {}; for (const k in mp) { let i = +k; if (count < 0 && i >= at && i < at - count) continue; if (i >= at) i += count; o[i] = mp[k]; } return o; };
      if (axis === 'row') sh.rowH = shiftMap(sh.rowH); else sh.colW = shiftMap(sh.colW);
      book.sheets.forEach((s) => {
        for (const k in s.cells) if (s.cells[k].f) s.cells[k].f = F.adjustInsert(s.cells[k].f, s.name, name, axis, at, count);
      });
      sh.merges = (sh.merges || []).filter((m) => {
        const a1 = axis === 'row' ? m.r1 : m.c1, a2 = axis === 'row' ? m.r2 : m.c2;
        if (count < 0 && a1 >= at && a2 < at - count) return false;
        return true;
      }).map((m) => {
        const mm = Object.assign({}, m);
        const k1 = axis === 'row' ? 'r1' : 'c1', k2 = axis === 'row' ? 'r2' : 'c2';
        if (mm[k1] >= at) mm[k1] = Math.max(at, mm[k1] + count);
        if (mm[k2] >= at) mm[k2] = Math.max(mm[k1], mm[k2] + count);
        return mm;
      });
      if (axis === 'row') sh.rows = Math.max(50, sh.rows + count); else sh.cols = Math.max(10, sh.cols + count);
    });
    rebuild(); renderCharts(); render();
  }
  function insertRows(below) { const n = sel.r2 - sel.r1 + 1; shiftStructure('row', below ? sel.r2 + 1 : sel.r1, n); }
  function insertCols(after) { const n = sel.c2 - sel.c1 + 1; shiftStructure('col', after ? sel.c2 + 1 : sel.c1, n); }
  function deleteRows() { shiftStructure('row', sel.r1, -(sel.r2 - sel.r1 + 1)); setSel(sel.r1, sel.c1); }
  function deleteCols() { shiftStructure('col', sel.c1, -(sel.c2 - sel.c1 + 1)); setSel(sel.r1, sel.c1); }
  function sortSel(asc) {
    let { r1, r2, c1, c2 } = sel;
    if (r1 === r2) {
      // توسيع إلى المنطقة المتصلة
      const u = used(book.active);
      r1 = 0; r2 = u.r; c1 = 0; c2 = u.c;
    }
    const colKey = sel.ac;
    const rowsData = [];
    for (let r = r1; r <= r2; r++) { const row = []; for (let c = c1; c <= c2; c++) row.push(sh.cells[key(r, c)] || null); rowsData.push({ r, row, v: value(book.active, r, colKey) }); }
    const first = rowsData[0];
    const hasHeader = rowsData.length > 1 && typeof first.v === 'string' && rowsData.slice(1).some((x) => typeof x.v === 'number');
    const body = hasHeader ? rowsData.slice(1) : rowsData;
    body.sort((a, b) => {
      const va = a.v, vb = b.v;
      if (va == null || va === '') return 1;
      if (vb == null || vb === '') return -1;
      const d = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb), W.lang === 'ar' ? 'ar' : 'en');
      return asc ? d : -d;
    });
    const ordered = hasHeader ? [first].concat(body) : body;
    editSheet(() => {
      ordered.forEach((item, i) => {
        const r = r1 + i;
        item.row.forEach((cell, j) => {
          const c = c1 + j;
          if (cell) { const n = clone(cell); if (n.f) n.f = F.shift(n.f, r - item.r, 0); sh.cells[key(r, c)] = n; } else delete sh.cells[key(r, c)];
        });
      });
    });
    render();
  }
  function removeDuplicates() {
    let { r1, r2, c1, c2 } = sel;
    if (r1 === r2) { const u = used(book.active); r1 = 0; r2 = u.r; c1 = 0; c2 = u.c; }
    const seen = new Set();
    const keep = [];
    for (let r = r1; r <= r2; r++) {
      const sig = []; for (let c = c1; c <= c2; c++) sig.push(F.toStr(value(book.active, r, c)));
      const s = sig.join('\u0001');
      if (seen.has(s)) continue;
      seen.add(s);
      keep.push(r);
    }
    const removed = (r2 - r1 + 1) - keep.length;
    if (!removed) { W.toast(W.t('k.removedN', { n: 0 })); return; }
    editSheet(() => {
      const rowsCells = keep.map((r) => { const row = []; for (let c = c1; c <= c2; c++) row.push(sh.cells[key(r, c)] || null); return row; });
      for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) delete sh.cells[key(r, c)];
      rowsCells.forEach((row, i) => row.forEach((cell, j) => { if (cell) sh.cells[key(r1 + i, c1 + j)] = cell; }));
    });
    render();
    W.toast(W.t('k.removedN', { n: removed }), 'success');
  }
  async function toggleMerge() {
    const existing = (sh.merges || []).filter((m) => !(m.r2 < sel.r1 || m.r1 > sel.r2 || m.c2 < sel.c1 || m.c1 > sel.c2));
    if (existing.length) { editSheet(() => { sh.merges = sh.merges.filter((m) => !existing.includes(m)); }); render(); return; }
    if (sel.r1 === sel.r2 && sel.c1 === sel.c2) return;
    let others = false;
    for (let r = sel.r1; r <= sel.r2; r++) for (let c = sel.c1; c <= sel.c2; c++) if ((r !== sel.r1 || c !== sel.c1) && sh.cells[key(r, c)] && (sh.cells[key(r, c)].v != null || sh.cells[key(r, c)].f)) others = true;
    if (others && !(await W.confirm(W.t('k.mergeLoses')))) return;
    editSheet(() => {
      for (let r = sel.r1; r <= sel.r2; r++) for (let c = sel.c1; c <= sel.c2; c++) if (r !== sel.r1 || c !== sel.c1) delete sh.cells[key(r, c)];
      sh.merges = (sh.merges || []).concat([{ r1: sel.r1, c1: sel.c1, r2: sel.r2, c2: sel.c2 }]);
      const k0 = key(sel.r1, sel.c1);
      const c0 = sh.cells[k0] || {};
      c0.style = Object.assign({}, c0.style || {}, { align: 'center', valign: 'middle' });
      sh.cells[k0] = c0;
    });
    render();
  }
  function setFreeze(r, c) { editSheet(() => { sh.freeze = { r, c }; }); render(); }
  async function setColWidth() {
    const v = await W.form(W.t('k.colWidth').replace('…', ''), [{ key: 'w', i18n: 'k.width', type: 'number', value: sh.colW[sel.c1] || DEF_COLW, min: 10, max: 1000 }]);
    if (!v) return;
    editSheet(() => { for (let c = sel.c1; c <= sel.c2; c++) sh.colW[c] = v.w; });
    rebuild(); render(); renderCharts();
  }
  async function setRowHeight() {
    const v = await W.form(W.t('k.rowHeight').replace('…', ''), [{ key: 'h', i18n: 'k.height', type: 'number', value: sh.rowH[sel.r1] || DEF_ROWH, min: 10, max: 600 }]);
    if (!v) return;
    editSheet(() => { for (let r = sel.r1; r <= sel.r2; r++) sh.rowH[r] = v.h; });
    rebuild(); render(); renderCharts();
  }

  /* ═══════════ الأوراق ═══════════ */
  function switchSheet(i) {
    if (editing) commitEdit();
    book.active = W.clamp(i, 0, book.sheets.length - 1);
    sh = book.sheets[book.active];
    copyMarquee = copyMarquee && copyMarquee.si === book.active ? copyMarquee : null;
    rebuild(); resizeCanvas();
    wrap.scrollTop = 0; wrap.scrollLeft = 0;
    setSel(0, 0);
    renderTabs(); renderCharts(); render();
  }
  function renderTabs() {
    tabsEl.innerHTML = '';
    book.sheets.forEach((s, i) => {
      const t = W.h('button', { class: 'k-tab' + (i === book.active ? ' active' : ''), type: 'button', text: s.name });
      t.addEventListener('click', () => switchSheet(i));
      t.addEventListener('dblclick', () => renameSheet(i));
      t.addEventListener('contextmenu', (e) => W.contextMenu(e, [
        { i18n: 'k.renameSheet', icon: 'pencil', action: () => renameSheet(i) },
        { i18n: 'k.dupSheet', icon: 'duplicate', action: () => dupSheet(i) },
        { i18n: W.isRTL() ? 'k.moveRight' : 'k.moveLeft', disabled: i === 0, action: () => moveSheet(i, -1) },
        { i18n: W.isRTL() ? 'k.moveLeft' : 'k.moveRight', disabled: i === book.sheets.length - 1, action: () => moveSheet(i, 1) },
        { i18n: 'k.sheetDir', checked: () => book.sheets[i].rtl, action: () => { switchSheet(i); editSheet(() => { sh.rtl = !sh.rtl; }); rebuild(); resizeCanvas(); renderCharts(); render(); } },
        '-',
        { i18n: 'k.deleteSheet', icon: 'trash', disabled: book.sheets.length < 2, action: () => deleteSheet(i) }
      ]));
      tabsEl.append(t);
    });
    tabsEl.append(W.iconButton('plus', 'k.addSheet', () => addSheet(), { cls: 'sm' }));
  }
  function uniqueName(base) {
    let n = 1, name = base;
    while (sheetIdx(name) >= 0) name = base + ' (' + (++n) + ')';
    return name;
  }
  function addSheet() {
    editBook(() => {
      let n = book.sheets.length + 1;
      while (sheetIdx(sheetLabel(n)) >= 0) n++;
      book.sheets.push(newSheet(sheetLabel(n)));
    });
    switchSheet(book.sheets.length - 1);
  }
  function dupSheet(i) {
    editBook(() => { const c = clone(book.sheets[i]); c.name = uniqueName(c.name); book.sheets.splice(i + 1, 0, c); });
    switchSheet(i + 1);
  }
  async function renameSheet(i) {
    const old = book.sheets[i].name;
    const v = await W.prompt(W.t('k.sheetName'), old, { title: W.t('k.renameSheet') });
    if (!v || v.trim() === old) return;
    const name = v.trim().replace(/[\\/?*[\]:]/g, '').slice(0, 31);
    if (!name || sheetIdx(name) >= 0) return;
    editBook(() => {
      book.sheets[i].name = name;
      // تحديث المراجع إلى الورقة القديمة
      const re = new RegExp("('?)" + old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\1!", 'g');
      const q = /^[A-Za-z_؀-ۿ][\w؀-ۿ.]*$/.test(name) ? name + '!' : "'" + name.replace(/'/g, "''") + "'!";
      book.sheets.forEach((s) => { for (const k in s.cells) if (s.cells[k].f) s.cells[k].f = s.cells[k].f.replace(re, q); });
    });
    renderTabs(); render();
  }
  async function deleteSheet(i) {
    if (book.sheets.length < 2) return;
    if (!(await W.confirm(W.t('k.confirmDeleteSheet', { name: book.sheets[i].name }), { danger: true, ok: W.t('cmd.delete') }))) return;
    editBook(() => { book.sheets.splice(i, 1); book.active = Math.min(book.active, book.sheets.length - 1); });
    switchSheet(Math.min(i, book.sheets.length - 1));
  }
  function moveSheet(i, d) {
    const j = i + d;
    if (j < 0 || j >= book.sheets.length) return;
    editBook(() => { const [s] = book.sheets.splice(i, 1); book.sheets.splice(j, 0, s); });
    switchSheet(j);
  }

  /* ═══════════ الرسوم البيانية ═══════════ */
  function chartData(ch) {
    const [a, b] = String(ch.range).split(':').map((x) => F.parseAddr(x.trim().toUpperCase()));
    if (!a || !b) return null;
    const r1 = Math.min(a.r, b.r), r2 = Math.max(a.r, b.r), c1 = Math.min(a.c, b.c), c2 = Math.max(a.c, b.c);
    const si = book.sheets.indexOf(ch._sheet || sh);
    const gv = (r, c) => value(si < 0 ? book.active : si, r, c);
    const isText = (v) => typeof v === 'string' && v !== '';
    const headerRow = (c2 > c1) && [...Array(c2 - c1 + 1).keys()].slice(1).some((j) => isText(gv(r1, c1 + j))) || (r2 === r1);
    const headerCol = (r2 > r1) && [...Array(r2 - r1 + 1).keys()].slice(headerRow ? 1 : 0).some((i) => isText(gv(r1 + i, c1)));
    const rs = headerRow ? r1 + 1 : r1, cs = headerCol ? c1 + 1 : c1;
    const cats = [], series = [];
    for (let r = rs; r <= r2; r++) cats.push(headerCol ? F.toStr(gv(r, c1)) : String(r - rs + 1));
    for (let c = cs; c <= c2; c++) {
      const vals = [];
      for (let r = rs; r <= r2; r++) { const v = gv(r, c); vals.push(typeof v === 'number' ? v : 0); }
      series.push({ name: headerRow ? F.toStr(gv(r1, c)) : F.colName(c), vals });
    }
    return { cats, series };
  }
  function niceTicks(min, max, n) {
    if (min === max) { max = min + 1; }
    const span = max - min, step0 = Math.pow(10, Math.floor(Math.log10(span / n)));
    const err = (n * step0) / span;
    const step = step0 * (err <= 0.15 ? 10 : err <= 0.35 ? 5 : err <= 0.75 ? 2 : 1);
    const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = lo; v <= hi + step / 2; v += step) ticks.push(W.round(v, 10));
    return ticks;
  }
  function chartSVG(ch, w, h) {
    const d = chartData(ch);
    const esc = W.escape;
    const font = "'IBM Plex Sans Arabic','Segoe UI',Tahoma,sans-serif";
    let s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" direction="ltr" style="direction:ltr" font-family="' + esc(font) + '"><rect width="100%" height="100%" fill="#fff"/>';
    const titleH = ch.title ? 30 : 8;
    if (ch.title) s += '<text x="' + w / 2 + '" y="20" text-anchor="middle" font-size="15" font-weight="700" fill="#1d2027">' + esc(ch.title) + '</text>';
    if (!d || !d.series.length) return s + '</svg>';
    const legendH = d.series.length > 1 || ch.type === 'pie' || ch.type === 'doughnut' ? 26 : 0;
    const rtl = sh.rtl;
    if (ch.type === 'pie' || ch.type === 'doughnut') {
      const vals = d.series[0].vals.map((v) => Math.max(0, v));
      const total = vals.reduce((a, b) => a + b, 0) || 1;
      const cx = w / 2, cy = titleH + (h - titleH - legendH) / 2, R = Math.max(10, Math.min(w, h - titleH - legendH) / 2 - 10);
      let a0 = -Math.PI / 2;
      vals.forEach((v, i) => {
        const a1 = a0 + (v / total) * Math.PI * 2;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
        if (v > 0) s += vals.filter((x) => x > 0).length === 1 ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + PALETTE[i % PALETTE.length] + '"/>' :
          '<path d="M' + cx + ' ' + cy + ' L' + x0 + ' ' + y0 + ' A' + R + ' ' + R + ' 0 ' + large + ' 1 ' + x1 + ' ' + y1 + ' Z" fill="' + PALETTE[i % PALETTE.length] + '" stroke="#fff" stroke-width="2"/>';
        const am = (a0 + a1) / 2;
        if (v / total > 0.05) s += '<text x="' + (cx + R * 0.68 * Math.cos(am)) + '" y="' + (cy + R * 0.68 * Math.sin(am) + 4) + '" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">' + Math.round((v / total) * 100) + '%</text>';
        a0 = a1;
      });
      if (ch.type === 'doughnut') s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R * 0.55 + '" fill="#fff"/>';
      s += legend(d.cats.map((c, i) => ({ name: c, color: PALETTE[i % PALETTE.length] })), w, h, rtl);
      return s + '</svg>';
    }
    const all = d.series.flatMap((x) => x.vals);
    let min = Math.min(0, ...all), max = Math.max(0, ...all);
    const ticks = niceTicks(min, max, 5);
    min = ticks[0]; max = ticks[ticks.length - 1];
    const axisW = 46;
    const horiz = ch.type === 'bar';
    const pl = rtl ? 14 : axisW, pr = rtl ? axisW : 14, pt = titleH + 6, pb = 28 + legendH;
    const PW = w - pl - pr, PH = h - pt - pb;
    if (PW < 20 || PH < 20) return s + '</svg>';
    const n = d.cats.length;
    const val2 = (v) => (horiz ? pl + ((rtl ? max - v : v - min) / (max - min)) * PW : pt + PH - ((v - min) / (max - min)) * PH);
    // الشبكة والمحاور
    ticks.forEach((t) => {
      if (horiz) { const x = val2(t); s += '<line x1="' + x + '" y1="' + pt + '" x2="' + x + '" y2="' + (pt + PH) + '" stroke="#e5e7eb"/><text x="' + x + '" y="' + (pt + PH + 16) + '" text-anchor="middle" font-size="10" fill="#6b7280">' + esc(F.fmtGeneral(t)) + '</text>'; }
      else { const y = val2(t); s += '<line x1="' + pl + '" y1="' + y + '" x2="' + (pl + PW) + '" y2="' + y + '" stroke="#e5e7eb"/><text x="' + (rtl ? pl + PW + 6 : pl - 6) + '" y="' + (y + 4) + '" text-anchor="' + (rtl ? 'start' : 'end') + '" font-size="10" fill="#6b7280">' + esc(F.fmtGeneral(t)) + '</text>'; }
    });
    const band = (horiz ? PH : PW) / n;
    const catPos = (i) => (horiz ? pt + band * i : (rtl ? pl + PW - band * (i + 1) : pl + band * i));
    d.cats.forEach((c, i) => {
      const label = esc(String(c).slice(0, 14));
      if (horiz) s += '<text x="' + (rtl ? pl + PW + 6 : pl - 6) + '" y="' + (catPos(i) + band / 2 + 4) + '" text-anchor="' + (rtl ? 'start' : 'end') + '" font-size="10.5" fill="#374151">' + label + '</text>';
      else if (n <= 24 || i % Math.ceil(n / 24) === 0) s += '<text x="' + (catPos(i) + band / 2) + '" y="' + (pt + PH + 16) + '" text-anchor="middle" font-size="10.5" fill="#374151">' + label + '</text>';
    });
    const ns = d.series.length;
    if (ch.type === 'column' || ch.type === 'bar') {
      const gap = band * 0.2, bw = (band - gap * 2) / ns;
      d.series.forEach((se, si) => se.vals.forEach((v, i) => {
        const zero = val2(0), pv = val2(v);
        const off = catPos(i) + gap + (rtl && !horiz ? (ns - 1 - si) : si) * bw;
        if (horiz) s += '<rect x="' + Math.min(zero, pv) + '" y="' + off + '" width="' + Math.abs(pv - zero) + '" height="' + Math.max(1, bw - 2) + '" rx="2" fill="' + PALETTE[si % PALETTE.length] + '"/>';
        else s += '<rect x="' + off + '" y="' + Math.min(zero, pv) + '" width="' + Math.max(1, bw - 2) + '" height="' + Math.abs(pv - zero) + '" rx="2" fill="' + PALETTE[si % PALETTE.length] + '"/>';
      }));
    } else {
      d.series.forEach((se, si) => {
        const pts = se.vals.map((v, i) => [catPos(i) + band / 2, val2(v)]);
        const col = PALETTE[si % PALETTE.length];
        if (ch.type === 'area') s += '<path d="M' + pts[0][0] + ' ' + val2(0) + ' ' + pts.map((p) => 'L' + p[0] + ' ' + p[1]).join(' ') + ' L' + pts[pts.length - 1][0] + ' ' + val2(0) + ' Z" fill="' + col + '" fill-opacity=".25"/>';
        s += '<polyline points="' + pts.map((p) => p.join(',')).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.5" stroke-linejoin="round"/>';
        if (pts.length <= 40) pts.forEach((p) => { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.2" fill="#fff" stroke="' + col + '" stroke-width="2"/>'; });
      });
    }
    s += '<line x1="' + pl + '" y1="' + (horiz ? pt + PH : val2(0)) + '" x2="' + (pl + PW) + '" y2="' + (horiz ? pt + PH : val2(0)) + '" stroke="#9ca3af"/>';
    if (legendH) s += legend(d.series.map((x, i) => ({ name: x.name, color: PALETTE[i % PALETTE.length] })), w, h, rtl);
    return s + '</svg>';
  }
  function legend(items, w, h, rtl) {
    const esc = W.escape;
    const widths = items.map((it) => 22 + Math.min(14, String(it.name).length) * 7 + 10);
    const total = widths.reduce((a, b) => a + b, 0);
    let x = rtl ? (w + total) / 2 : (w - total) / 2;
    let s = '';
    items.slice(0, 12).forEach((it, i) => {
      const wd = widths[i];
      if (rtl) x -= wd;
      const name = esc(String(it.name).slice(0, 14));
      s += '<rect x="' + (rtl ? x + wd - 22 : x) + '" y="' + (h - 18) + '" width="12" height="12" rx="3" fill="' + it.color + '"/>';
      s += '<text x="' + (rtl ? x + wd - 26 : x + 16) + '" y="' + (h - 8) + '" font-size="11" fill="#374151" text-anchor="' + (rtl ? 'end' : 'start') + '">' + name + '</text>';
      if (!rtl) x += wd;
    });
    return s;
  }
  let selectedChart = null;
  function renderCharts() {
    chartsLayer.innerHTML = '';
    chartsLayer.style.width = spacer.style.width;
    chartsLayer.style.height = spacer.style.height;
    (sh.charts || []).forEach((ch) => {
      const el = W.h('div', { class: 'k-chart' + (selectedChart === ch.id ? ' selected' : ''), 'data-id': ch.id });
      el.style.top = (HH() + ch.y * zoom) + 'px';
      el.style.insetInlineStart = (HW() + ch.x * zoom) + 'px';
      el.style.width = ch.w * zoom + 'px'; el.style.height = ch.h * zoom + 'px';
      el.innerHTML = chartSVG(ch, ch.w, ch.h).replace('<svg ', '<svg style="width:100%;height:100%" ');
      const handle = W.h('div', { class: 'k-chart-resize' });
      el.append(handle);
      el.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        if (editing) commitEdit();
        selectedChart = ch.id;
        chartsLayer.querySelectorAll('.k-chart').forEach((c) => c.classList.toggle('selected', c === el));
        const before = JSON.stringify(sh);
        const sx = e.clientX, sy = e.clientY, x0 = ch.x, y0 = ch.y, w0 = ch.w, h0 = ch.h;
        const resizing = e.target === handle;
        const move = (ev) => {
          const dx = (ev.clientX - sx) / zoom * (sh.rtl ? -1 : 1), dy = (ev.clientY - sy) / zoom;
          if (resizing) { ch.w = Math.max(180, w0 + dx); ch.h = Math.max(130, h0 + dy); el.style.width = ch.w * zoom + 'px'; el.style.height = ch.h * zoom + 'px'; }
          else { ch.x = Math.max(0, x0 + dx); ch.y = Math.max(0, y0 + dy); el.style.top = (HH() + ch.y * zoom) + 'px'; el.style.insetInlineStart = (HW() + ch.x * zoom) + 'px'; }
        };
        const up = () => {
          window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up);
          const after = JSON.stringify(sh);
          if (after !== before) { pushHistory({ type: 'sheet', si: book.active, before, after }); renderCharts(); }
        };
        window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
      });
      el.addEventListener('dblclick', () => editChart(ch));
      el.addEventListener('contextmenu', (e) => { e.stopPropagation(); W.contextMenu(e, [
        { i18n: 'k.editChart', icon: 'pencil', action: () => editChart(ch) },
        { i18n: 'k.chartPng', icon: 'image', action: () => chartPNG(ch) },
        '-',
        { i18n: 'k.deleteChart', icon: 'trash', action: () => deleteChart(ch.id) }
      ]); });
      chartsLayer.append(el);
    });
  }
  async function chartDialog(ch) {
    const types = ['column', 'bar', 'line', 'area', 'pie', 'doughnut'];
    return W.form(W.t('k.chart').replace('…', ''), [
      { key: 'type', i18n: 'k.chartType', type: 'select', value: ch.type, options: types.map((t) => ({ value: t, i18n: 'k.ct.' + t })) },
      { key: 'title', i18n: 'k.chartTitle', value: ch.title || '' },
      { key: 'range', i18n: 'k.dataRange', value: ch.range }
    ]);
  }
  async function insertChart() {
    let { r1, c1, r2, c2 } = sel;
    if (r1 === r2 && c1 === c2) { const u = used(book.active); r1 = 0; c1 = 0; r2 = Math.max(1, u.r); c2 = Math.max(1, u.c); }
    const ch = { id: W.uid('ch'), type: 'column', title: '', range: F.addr(r1, c1) + ':' + F.addr(r2, c2), x: (colPos[c2 + 1] || 0) / zoom + 30, y: rowPos[r1] / zoom, w: 460, h: 290 };
    const v = await chartDialog(ch);
    if (!v) return;
    Object.assign(ch, v);
    editSheet(() => { sh.charts = (sh.charts || []).concat([ch]); });
    selectedChart = ch.id;
    renderCharts();
  }
  async function editChart(ch) {
    const v = await chartDialog(ch);
    if (!v) return;
    editSheet(() => { const c = sh.charts.find((x) => x.id === ch.id); Object.assign(c, v); });
    renderCharts();
  }
  function deleteChart(id) { editSheet(() => { sh.charts = sh.charts.filter((c) => c.id !== id); }); selectedChart = null; renderCharts(); }
  async function chartPNG(ch) {
    const svg = chartSVG(ch, ch.w * 2, ch.h * 2).replace(/font-size="(\d+(\.\d+)?)"/g, (m, n) => 'font-size="' + n * 2 + '"');
    const img = await W.loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    const c = document.createElement('canvas'); c.width = ch.w * 2; c.height = ch.h * 2;
    c.getContext('2d').drawImage(img, 0, 0);
    const res = await W.files.save({ data: await W.canvasToBytes(c), name: (ch.title || 'chart') + '.png', types: [{ name: { ar: 'صورة PNG', en: 'PNG image' }, ext: ['png'] }] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }
  document.addEventListener('keydown', (e) => {
    if (selectedChart && (e.key === 'Delete' || e.key === 'Backspace') && isGridFocus()) { e.preventDefault(); e.stopPropagation(); deleteChart(selectedChart); }
  }, true);
  wrap.addEventListener('mousedown', () => { if (selectedChart) { selectedChart = null; chartsLayer.querySelectorAll('.k-chart.selected').forEach((c) => c.classList.remove('selected')); } }, true);

  /* ═══════════ البحث والاستبدال ═══════════ */
  async function findReplace(withReplace) {
    const fi = W.h('input', { class: 'w-input', style: { width: '100%' } });
    const ri = W.h('input', { class: 'w-input', style: { width: '100%' } });
    const whole = W.h('input', { type: 'checkbox' });
    const status = W.h('div', { class: 'small muted' });
    let lastIdx = -1;
    const matches = () => {
      const q = fi.value; if (!q) return [];
      const out = [];
      const keys = Object.keys(sh.cells).map((k) => k.split(',').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      for (const [r, c] of keys) {
        const cell = sh.cells[key(r, c)];
        const text = cell.f ? '=' + cell.f : fmtValue(value(book.active, r, c), cell.style);
        const hitOk = whole.checked ? text.toLowerCase() === q.toLowerCase() : text.toLowerCase().includes(q.toLowerCase());
        if (hitOk) out.push([r, c]);
      }
      return out;
    };
    const next = () => {
      const m = matches();
      if (!m.length) { status.textContent = W.t('k.notFound'); return; }
      lastIdx = (lastIdx + 1) % m.length;
      setSel(m[lastIdx][0], m[lastIdx][1]); scrollIntoView(m[lastIdx][0], m[lastIdx][1]);
      status.textContent = (lastIdx + 1) + ' / ' + m.length;
    };
    const replaceAll = () => {
      const m = matches();
      if (!m.length) { status.textContent = W.t('k.notFound'); return; }
      const q = fi.value;
      const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      editCells(m.map(([r, c]) => key(r, c)), () => m.forEach(([r, c]) => {
        const cell = sh.cells[key(r, c)];
        const raw = rawOf(cell);
        const nv = whole.checked ? ri.value : raw.replace(re, ri.value);
        const p = parseInput(nv);
        const n = { style: cell.style };
        if (p.f) n.f = p.f; else if (!p.empty) n.v = p.v;
        if (!n.style) delete n.style;
        sh.cells[key(r, c)] = n;
      }));
      render();
      status.textContent = W.t('k.replaced', { n: m.length });
    };
    const body = W.h('div', { class: 'col', style: { minWidth: '340px' } },
      W.h('label', { class: 'w-label-sm', text: W.t('k.findWhat') }), fi,
      withReplace ? W.h('label', { class: 'w-label-sm', text: W.t('k.replaceWith') }) : null, withReplace ? ri : null,
      W.h('label', { class: 'w-check-row' }, whole, W.h('span', { text: W.t('k.wholeCell') })), status);
    fi.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); next(); } });
    W.dialog({
      title: W.t(withReplace ? 'cmd.replace' : 'cmd.find').replace('…', ''), body,
      buttons: [
        withReplace ? { i18n: 'k.replaceAll', keepOpen: true, onClick: replaceAll } : null,
        { i18n: 'k.findNext', primary: true, keepOpen: true, onClick: next }
      ].filter(Boolean)
    });
  }

  /* ═══════════ تنسيق الخلايا ═══════════ */
  async function formatCells() {
    const st = activeStyle();
    const v = await W.form(W.t('k.formatCells').replace('…', ''), [
      { key: 'fmt', i18n: 'k.numFormat', type: 'select', value: st.fmt || 'general', options: ['general', 'number', 'currency', 'percent', 'date', 'time', 'datetime', 'text'].map((f) => ({ value: f, i18n: 'k.fmt.' + f })), row: 'a' },
      { key: 'dec', i18n: 'k.decimals', type: 'number', value: st.dec != null ? st.dec : 2, min: 0, max: 10, row: 'a' },
      { key: 'cur', i18n: 'k.currency', type: 'select', value: st.cur || (W.lang === 'ar' ? 'ر.س' : '$'), options: ['ر.س', 'د.إ', 'د.ك', 'ر.ق', 'د.ب', 'ر.ع', 'ج.م', 'د.أ', '$', '€', '£'].map((c) => ({ value: c, label: c })) },
      { key: 'align', i18n: 'k.align', type: 'select', value: st.align || '', options: [{ value: '', i18n: 'ui.auto' }, { value: 'start', i18n: 'k.alignStart' }, { value: 'center', i18n: 'k.alignCenter' }, { value: 'end', i18n: 'k.alignEnd' }], row: 'b' },
      { key: 'valign', i18n: 'k.valign', type: 'select', value: st.valign || 'bottom', options: [{ value: 'top', i18n: 'k.vTop' }, { value: 'middle', i18n: 'k.vMiddle' }, { value: 'bottom', i18n: 'k.vBottom' }], row: 'b' },
      { key: 'fs', i18n: 'ui.fontSize', type: 'number', value: st.fs || 13, min: 6, max: 72, row: 'c' },
      { key: 'font', i18n: 'ui.font', type: 'select', value: st.font || 'IBM Plex Sans Arabic', options: W.fonts.map((f) => ({ value: f.family, label: W.L(f.label) })), row: 'c' },
      { key: 'color', i18n: 'k.textColor', type: 'color', value: st.color || '#1d2027', row: 'd' },
      { key: 'bg', i18n: 'k.fill', type: 'color', value: st.bg || '#ffffff', row: 'd' },
      { key: 'wrap', i18n: 'k.wrap', type: 'checkbox', value: !!st.wrap },
      { key: 'b', i18n: 'ui.bold', type: 'checkbox', value: !!st.b },
      { key: 'i', i18n: 'ui.italic', type: 'checkbox', value: !!st.i }
    ]);
    if (!v) return;
    styleSel({
      fmt: v.fmt === 'general' ? null : v.fmt, dec: v.dec, cur: v.fmt === 'currency' ? v.cur : null, align: v.align || null,
      valign: v.valign === 'bottom' ? null : v.valign, fs: v.fs === 13 ? null : v.fs, font: v.font === 'IBM Plex Sans Arabic' ? null : v.font,
      color: v.color === '#1d2027' ? null : v.color, bg: v.bg === '#ffffff' ? null : v.bg, wrap: v.wrap || null, b: v.b || null, i: v.i || null
    });
  }
  async function insertFunction() {
    const list = W.h('div', { class: 'w-list', style: { maxHeight: '300px', overflow: 'auto', marginTop: '8px' } });
    const search = W.h('input', { class: 'w-input', placeholder: W.t('k.fnSearch'), style: { width: '100%' } });
    let close;
    const renderList = () => {
      list.innerHTML = '';
      const q = search.value.trim().toUpperCase();
      FUNCS.filter((f) => !q || f.includes(q)).forEach((f) => list.append(W.h('div', { class: 'w-list-item', onclick: () => { close(f); } }, W.h('span', { class: 'w-name ltr', text: f }))));
    };
    search.addEventListener('input', renderList);
    renderList();
    const fn = await W.dialog({ title: W.t('k.insertFn'), body: W.h('div', { style: { minWidth: '320px' } }, search, list), buttons: [], onOpen: (d, done) => { close = done; } });
    if (!fn) return;
    startEdit('=' + fn + '(');
  }
  async function goTo() {
    const v = await W.prompt(W.t('k.cellRef'), F.addr(sel.ar, sel.ac), { title: W.t('k.goTo').replace('…', '') });
    if (!v) return;
    const a = F.parseAddr(v.trim().toUpperCase());
    if (a) { setSel(a.r, a.c); scrollIntoView(a.r, a.c); }
  }

  /* ═══════════ شريط الأدوات ═══════════ */
  const tb = document.getElementById('toolbar');
  const tbtn = (icon, tip, fn, shortcut) => { const b = W.iconButton(icon, tip, () => { fn(); focusGrid(); }, { shortcut }); b.addEventListener('mousedown', (e) => e.preventDefault()); tb.append(b); return b; };
  const tsep = () => tb.append(W.h('div', { class: 'w-sep' }));
  tbtn('undo', 'cmd.undo', undo, 'Mod+Z');
  tbtn('redo', 'cmd.redo', redo, 'Mod+Y');
  tsep();
  const fontSel = W.fontSelect('IBM Plex Sans Arabic', (f) => styleSel({ font: f === 'IBM Plex Sans Arabic' ? null : f }), 'k-font');
  tb.append(fontSel);
  const sizeSel = W.h('select', { class: 'w-select k-size' });
  [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 28, 32, 36, 48].forEach((s) => sizeSel.append(W.h('option', { value: s, text: s })));
  sizeSel.value = 13;
  sizeSel.addEventListener('change', () => { styleSel({ fs: +sizeSel.value === 13 ? null : +sizeSel.value }); focusGrid(); });
  tb.append(sizeSel);
  tsep();
  const bB = tbtn('bold', 'ui.bold', () => toggleStyle('b'), 'Mod+B');
  const bI = tbtn('italic', 'ui.italic', () => toggleStyle('i'), 'Mod+I');
  const bU = tbtn('underline', 'ui.underline', () => toggleStyle('u'), 'Mod+U');
  const bS = tbtn('strike', 'ui.strike', () => toggleStyle('s'));
  const colorPop = (anchor, prop, none) => {
    const r = anchor.getBoundingClientRect();
    const box = W.h('div', { class: 'w-menu', style: { width: '214px', padding: '10px' } });
    box.append(W.swatches((c) => { box.remove(); styleSel({ [prop]: c }); }));
    const row = W.h('div', { class: 'row', style: { marginTop: '8px' } });
    if (none) row.append(W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('ui.none'), onclick: () => { box.remove(); styleSel({ [prop]: null }); } }));
    const custom = W.h('input', { type: 'color', class: 'w-color sm', value: '#4f46e5' });
    custom.addEventListener('change', () => { box.remove(); styleSel({ [prop]: custom.value }); });
    row.append(W.h('span', { class: 'small muted', text: W.t('ui.custom') }), custom);
    box.append(row);
    W.closeMenus();
    document.body.append(box);
    box.style.left = W.clamp(W.isRTL() ? r.right - box.offsetWidth : r.left, 4, innerWidth - box.offsetWidth - 4) + 'px';
    box.style.top = r.bottom + 4 + 'px';
  };
  tbtn('text-color', 'k.textColor', () => colorPop(tb.querySelector('[data-tip="k.textColor"]'), 'color', true));
  tbtn('bucket', 'k.fill', () => colorPop(tb.querySelector('[data-tip="k.fill"]'), 'bg', true));
  tbtn('border', 'k.borders', () => {
    const r = tb.querySelector('[data-tip="k.borders"]').getBoundingClientRect();
    W.showMenu([
      { i18n: 'k.bAll', action: () => setBorders('all') }, { i18n: 'k.bOuter', action: () => setBorders('outer') },
      { i18n: 'k.bBottom', action: () => setBorders('bottom') }, { i18n: 'k.bNone', action: () => setBorders('none') }
    ], W.isRTL() ? r.right : r.left, r.bottom + 4);
  });
  tsep();
  const bAS = tbtn(W.isRTL() ? 'align-right' : 'align-left', 'k.alignStart', () => styleSel({ align: activeStyle().align === 'start' ? null : 'start' }));
  const bAC = tbtn('align-center', 'k.alignCenter', () => styleSel({ align: activeStyle().align === 'center' ? null : 'center' }));
  const bAE = tbtn(W.isRTL() ? 'align-left' : 'align-right', 'k.alignEnd', () => styleSel({ align: activeStyle().align === 'end' ? null : 'end' }));
  const bWrap = tbtn('wrap-text', 'k.wrap', () => toggleStyle('wrap'));
  tbtn('merge_cells', 'k.merge', () => toggleMerge());
  tsep();
  const fmtSel = W.h('select', { class: 'w-select k-fmt' });
  const renderFmtSel = () => { const v = fmtSel.value; fmtSel.innerHTML = ''; ['general', 'number', 'currency', 'percent', 'date', 'time', 'text'].forEach((f) => fmtSel.append(W.h('option', { value: f, text: W.t('k.fmt.' + f) }))); fmtSel.value = v || 'general'; };
  renderFmtSel();
  fmtSel.addEventListener('change', () => { styleSel({ fmt: fmtSel.value === 'general' ? null : fmtSel.value }); focusGrid(); });
  tb.append(fmtSel);
  tbtn('currency', 'k.fmt.currency', () => styleSel({ fmt: 'currency', dec: 2 }));
  tbtn('percent', 'k.fmt.percent', () => styleSel({ fmt: 'percent', dec: 0 }));
  tb.append(W.h('button', { class: 'w-btn ghost sm ltr', type: 'button', 'data-tip': 'k.decDec', text: '.0←', onclick: () => changeDecimals(-1) }));
  tb.append(W.h('button', { class: 'w-btn ghost sm ltr', type: 'button', 'data-tip': 'k.decInc', text: '.00→', onclick: () => changeDecimals(1) }));
  tsep();
  tbtn('sigma', 'k.autosum', autoSum, 'Alt+=');
  tbtn('function', 'k.insertFn', insertFunction);
  tbtn('sort', 'k.sortAsc', () => sortSel(true));
  tbtn('chart-bar', 'k.chart', insertChart);
  tbtn('freeze', 'k.freeze', () => {
    const r = tb.querySelector('[data-tip="k.freeze"]').getBoundingClientRect();
    W.showMenu(freezeItems(), W.isRTL() ? r.right : r.left, r.bottom + 4);
  });
  function updateToolbar() {
    const st = activeStyle();
    bB.classList.toggle('active', !!st.b); bI.classList.toggle('active', !!st.i); bU.classList.toggle('active', !!st.u); bS.classList.toggle('active', !!st.s);
    bAS.classList.toggle('active', st.align === 'start'); bAC.classList.toggle('active', st.align === 'center'); bAE.classList.toggle('active', st.align === 'end');
    bWrap.classList.toggle('active', !!st.wrap);
    fmtSel.value = st.fmt && fmtSel.querySelector('option[value="' + st.fmt + '"]') ? st.fmt : 'general';
    sizeSel.value = st.fs || 13;
    fontSel.value = st.font || 'IBM Plex Sans Arabic';
  }
  const freezeItems = () => [
    { i18n: 'k.freezeRow', action: () => setFreeze(1, 0) },
    { i18n: 'k.freezeCol', action: () => setFreeze(0, 1) },
    { i18n: 'k.freezeSel', action: () => setFreeze(sel.ar, sel.ac) },
    { i18n: 'k.unfreeze', action: () => setFreeze(0, 0) }
  ];

  /* ═══════════ الإحصاءات ═══════════ */
  function updateStats() {
    updateToolbar();
    if (sel.r1 === sel.r2 && sel.c1 === sel.c2) { statsEl.textContent = ''; return; }
    let sum = 0, cnt = 0, n = 0;
    const maxCells = 200000;
    let seen = 0;
    const u = used(book.active);
    for (let r = sel.r1; r <= Math.min(sel.r2, u.r); r++) for (let c = sel.c1; c <= Math.min(sel.c2, u.c); c++) {
      if (++seen > maxCells) break;
      const v = value(book.active, r, c);
      if (v == null || v === '') continue;
      cnt++;
      if (typeof v === 'number') { sum += v; n++; }
    }
    statsEl.textContent = n ? W.t('k.sum') + ': ' + W.fmt(sum, 4) + '   ' + W.t('k.avg') + ': ' + W.fmt(sum / n, 4) + '   ' + W.t('k.cnt') + ': ' + cnt : (cnt ? W.t('k.cnt') + ': ' + cnt : '');
  }

  /* ═══════════ القوائم السياقية ═══════════ */
  const cellMenu = () => [
    { i18n: 'cmd.cut', icon: 'cut', action: () => menuCopy(true) },
    { i18n: 'cmd.copy', icon: 'copy', action: () => menuCopy(false) },
    { i18n: 'cmd.paste', icon: 'paste', action: () => menuPaste(false) },
    { i18n: 'k.pasteValues', action: () => menuPaste(true) },
    '-',
    { i18n: 'k.insertRowAbove', action: () => insertRows(false) },
    { i18n: 'k.insertRowBelow', action: () => insertRows(true) },
    { i18n: 'k.insertColBefore', action: () => insertCols(false) },
    { i18n: 'k.insertColAfter', action: () => insertCols(true) },
    { i18n: 'k.deleteRows', action: deleteRows },
    { i18n: 'k.deleteCols', action: deleteCols },
    '-',
    { i18n: 'k.clear', icon: 'eraser', action: () => clearSel(false) },
    { i18n: 'k.sortAsc', icon: 'sort', action: () => sortSel(true) },
    { i18n: 'k.sortDesc', action: () => sortSel(false) },
    { i18n: 'k.formatCells', icon: 'settings', action: formatCells }
  ];
  const colMenu = () => [
    { i18n: 'k.insertColBefore', action: () => insertCols(false) }, { i18n: 'k.insertColAfter', action: () => insertCols(true) },
    { i18n: 'k.deleteCols', icon: 'trash', action: deleteCols }, '-',
    { i18n: 'k.colWidth', action: setColWidth }, { i18n: 'k.sortAsc', icon: 'sort', action: () => sortSel(true) }, { i18n: 'k.sortDesc', action: () => sortSel(false) }
  ];
  const rowMenu = () => [
    { i18n: 'k.insertRowAbove', action: () => insertRows(false) }, { i18n: 'k.insertRowBelow', action: () => insertRows(true) },
    { i18n: 'k.deleteRows', icon: 'trash', action: deleteRows }, '-', { i18n: 'k.rowHeight', action: setRowHeight }
  ];

  /* ═══════════ الملفات ═══════════ */
  let format = 'kashf';
  function loadBook(b, meta) {
    book = b;
    book.sheets.forEach((s) => { s.cells = s.cells || {}; s.colW = s.colW || {}; s.rowH = s.rowH || {}; s.merges = s.merges || []; s.freeze = s.freeze || { r: 0, c: 0 }; s.charts = s.charts || []; s.rows = s.rows || 200; s.cols = s.cols || 26; });
    book.active = W.clamp(book.active || 0, 0, book.sheets.length - 1);
    sh = book.sheets[book.active];
    undoStack.length = 0; redoStack.length = 0;
    invalidate(); ctxCache.clear(); astMap.clear();
    clip = null; copyMarquee = null; selectedChart = null;
    meta = meta || {};
    format = meta.format || 'kashf';
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: !!meta.dirty });
    if (welcome) welcome.hide();
    switchSheet(book.active);
  }
  async function newBook() {
    if (!(await W.confirmDiscard())) return;
    loadBook({ sheets: [newSheet(sheetLabel(1))], active: 0 }, {});
  }
  const OPEN_TYPES = [{ name: { ar: 'جداول بيانات', en: 'Spreadsheets' }, ext: ['kashf', 'xlsx', 'csv', 'tsv', 'txt'] }];
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: OPEN_TYPES, as: 'bytes' });
    if (f[0]) await loadFile(f[0]);
  }
  async function openPath(p) {
    if (!(await W.confirmDiscard())) return;
    try { await loadFile(await W.files.readPath(p, 'bytes')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); }
  }
  async function loadFile(f) {
    try {
      const bytes = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
      if (f.ext === 'kashf') {
        const j = JSON.parse(W.files.decodeText(bytes));
        loadBook(j.book, { name: f.name, path: f.path, format: 'kashf' });
      } else if (f.ext === 'xlsx') {
        const b = await W.busy('ui.loading', () => X.read(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)));
        loadBook(b, { name: f.name, path: f.path, format: 'xlsx' });
      } else {
        const rows = X.parseCSV(W.files.decodeText(bytes));
        const s = newSheet(W.files.base(f.name).slice(0, 31) || sheetLabel(1));
        s.rtl = rows.slice(0, 5).some((r) => r.some((v) => /[؀-ۿ]/.test(v))) || W.lang === 'ar';
        rows.forEach((row, r) => row.forEach((v, c) => {
          const p = parseInput(v);
          if (p.empty) return;
          const cell = p.f ? { f: p.f } : { v: p.v };
          if (p.hint) cell.style = p.hint;
          s.cells[key(r, c)] = cell;
        }));
        loadBook({ sheets: [s], active: 0 }, { name: f.name, path: f.path, format: 'csv' });
      }
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) {
      console.error(e);
      W.toast(W.t('ui.openFailed') + ': ' + (e.message || ''), 'error', 4000);
    }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'));
  async function serialize(fmt) {
    if (fmt === 'xlsx') return X.write(book, { valueOf: (si, r, c) => value(si, r, c) });
    if (fmt === 'csv') return X.toCSV(sheetRows(sh, book.active));
    return JSON.stringify({ app: 'kashf', version: 1, book });
  }
  function sheetRows(s, si) {
    const u = used(si);
    const rows = [];
    for (let r = 0; r <= u.r; r++) {
      const row = [];
      for (let c = 0; c <= u.c; c++) { const cell = s.cells[key(r, c)]; row.push(cell ? fmtValue(value(si, r, c), Object.assign({}, cell.style, { fmt: cell.style && /date|time/.test(cell.style.fmt || '') ? cell.style.fmt : 'general' })) : ''); }
      rows.push(row);
    }
    return rows;
  }
  const SAVE_TYPES = [
    { name: { ar: 'مصنف كشف', en: 'Kashf workbook' }, ext: ['kashf'] },
    { name: { ar: 'مصنف Excel', en: 'Excel workbook' }, ext: ['xlsx'] },
    { name: { ar: 'ملف CSV', en: 'CSV file' }, ext: ['csv'] }
  ];
  async function save(as) {
    if (editing) commitEdit();
    const canKeep = format === 'kashf' || format === 'xlsx';
    if (as || !W.doc.path || !canKeep) {
      const res = await W.files.save({ data: await serialize('kashf'), name: baseName() + '.kashf', types: SAVE_TYPES });
      if (!res) return false;
      const ext = W.files.ext(res.name);
      if (ext && ext !== 'kashf' && W.isElectron) await W.files.save({ data: await serialize(ext), name: res.name, path: res.path });
      format = ext || 'kashf';
      W.setDoc({ name: res.name, path: res.path, dirty: false });
      if (res.path) W.recent.add(res.path, res.name);
    } else {
      const res = await W.files.save({ data: await serialize(format), name: W.doc.name, path: W.doc.path });
      if (!res) return false;
      W.setDirty(false);
    }
    W.toast(W.t('ui.saved'), 'success');
    return true;
  }
  async function exportAs(fmt) {
    if (editing) commitEdit();
    if (fmt === 'pdf') { await W.exportPDF(printHTML(false), baseName(), { landscape: false }); return; }
    const t = SAVE_TYPES.find((x) => x.ext[0] === fmt);
    const res = await W.files.save({ data: await serialize(fmt), name: baseName() + '.' + fmt, types: [t] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }
  async function importCSV() {
    const f = await W.files.open({ types: [{ name: { ar: 'ملف CSV', en: 'CSV file' }, ext: ['csv', 'tsv', 'txt'] }], as: 'text' });
    if (!f[0]) return;
    const rows = X.parseCSV(f[0].data);
    editBook(() => {
      const s = newSheet(uniqueName(W.files.base(f[0].name).slice(0, 28) || sheetLabel(book.sheets.length + 1)));
      rows.forEach((row, r) => row.forEach((v, c) => { const p = parseInput(v); if (!p.empty) { const cell = p.f ? { f: p.f } : { v: p.v }; if (p.hint) cell.style = p.hint; s.cells[key(r, c)] = cell; } }));
      book.sheets.push(s);
    });
    switchSheet(book.sheets.length - 1);
  }
  function printHTML(selectionOnly) {
    const si = book.active;
    const u = used(si);
    const r1 = selectionOnly ? sel.r1 : 0, c1 = selectionOnly ? sel.c1 : 0, r2 = selectionOnly ? sel.r2 : Math.max(0, u.r), c2 = selectionOnly ? sel.c2 : Math.max(0, u.c);
    let html = '<table class="sheet"><colgroup>';
    for (let c = c1; c <= c2; c++) html += '<col style="width:' + (sh.colW[c] || DEF_COLW) + 'px">';
    html += '</colgroup><tbody>';
    const skip = new Set();
    for (let r = r1; r <= r2; r++) {
      html += '<tr style="height:' + (sh.rowH[r] || DEF_ROWH) + 'px">';
      for (let c = c1; c <= c2; c++) {
        if (skip.has(key(r, c))) continue;
        const cell = sh.cells[key(r, c)];
        const st = (cell && cell.style) || {};
        const v = value(si, r, c);
        const m = (sh.merges || []).find((mm) => mm.r1 === r && mm.c1 === c);
        let span = '';
        if (m) { span = ' rowspan="' + (m.r2 - m.r1 + 1) + '" colspan="' + (m.c2 - m.c1 + 1) + '"'; for (let rr = m.r1; rr <= m.r2; rr++) for (let cc = m.c1; cc <= m.c2; cc++) if (rr !== r || cc !== c) skip.add(key(rr, cc)); }
        const align = st.align === 'center' ? 'center' : st.align === 'start' ? 'start' : st.align === 'end' ? 'end' : (typeof v === 'number' ? 'end' : 'start');
        const css = ['text-align:' + align];
        if (st.b) css.push('font-weight:700'); if (st.i) css.push('font-style:italic');
        if (st.u || st.s) css.push('text-decoration:' + (st.u ? 'underline ' : '') + (st.s ? 'line-through' : ''));
        if (st.color) css.push('color:' + st.color); if (st.bg) css.push('background:' + st.bg);
        if (st.fs) css.push('font-size:' + st.fs + 'px'); if (st.font) css.push("font-family:'" + st.font + "'");
        if (st.wrap) css.push('white-space:pre-wrap');
        if (st.valign) css.push('vertical-align:' + st.valign);
        const b = st.border;
        if (b) { if (b.t) css.push('border-top:1px solid #333'); if (b.b) css.push('border-bottom:1px solid #333'); if (b.l) css.push('border-left:1px solid #333'); if (b.r) css.push('border-right:1px solid #333'); }
        html += '<td' + span + ' style="' + css.join(';') + '">' + W.escape(cell ? fmtValue(v, st) : '') + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    const css = '.sheet{border-collapse:collapse;table-layout:fixed;font-size:13px;font-family:"IBM Plex Sans Arabic","Segoe UI",Tahoma,sans-serif}' +
      '.sheet td{border:' + (sh.gridlines !== false ? '1px solid #d6d9e0' : '0') + ';padding:2px 5px;overflow:hidden;white-space:nowrap;vertical-align:bottom}' +
      'body{padding:12mm}';
    return W.printDocument('<h3 style="font-family:sans-serif;margin:0 0 8px">' + W.escape(baseName() + ' — ' + sh.name) + '</h3>' + html, { css, dir: sh.rtl ? 'rtl' : 'ltr', font: '"IBM Plex Sans Arabic", sans-serif' });
  }

  /* ═══════════ التكبير ═══════════ */
  function setZoom(z) {
    zoom = W.clamp(Math.round(z * 100) / 100, 0.5, 2.5);
    W.store.set('kashf.zoom', zoom);
    rebuild(); renderCharts(); render(); status.item('zoom').textContent = W.t('ui.zoom') + ': ' + Math.round(zoom * 100) + '%';
  }

  /* ═══════════ القوائم ═══════════ */
  const menus = [
    {
      i18n: 'menu.file', items: [
        { i18n: 'cmd.new', icon: 'file-plus', shortcut: 'Mod+N', action: newBook },
        { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
        { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
        '-',
        { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), global: true },
        { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), global: true },
        { i18n: 'k.importCsv', icon: 'upload', action: importCSV },
        { i18n: 'cmd.export', icon: 'export', submenu: [
          { i18n: 'k.exportXlsx', action: () => exportAs('xlsx') },
          { i18n: 'k.exportCsv', action: () => exportAs('csv') },
          { i18n: 'cmd.exportPDF', action: () => exportAs('pdf') }
        ] },
        '-',
        { i18n: 'cmd.print', icon: 'print', shortcut: 'Mod+P', action: () => W.printHTML(printHTML(false)) },
        { i18n: 'k.printRange', action: () => W.printHTML(printHTML(true)) },
        '-',
        { i18n: 'cmd.newWindow', action: () => W.native.newWindow(), hidden: () => !W.isElectron },
        { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
      ]
    },
    {
      i18n: 'menu.edit', items: [
        { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
        { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
        '-',
        { i18n: 'cmd.cut', icon: 'cut', shortcut: 'Mod+X', action: () => menuCopy(true), noBind: true },
        { i18n: 'cmd.copy', icon: 'copy', shortcut: 'Mod+C', action: () => menuCopy(false), noBind: true },
        { i18n: 'cmd.paste', icon: 'paste', shortcut: 'Mod+V', action: () => menuPaste(false), noBind: true },
        { i18n: 'k.pasteValues', shortcut: 'Mod+Shift+V', action: () => menuPaste(true) },
        { i18n: 'k.clear', icon: 'eraser', shortcut: 'Delete', action: () => clearSel(false), noBind: true },
        { i18n: 'k.clearAll', action: () => clearSel(true) },
        '-',
        { i18n: 'k.fillDown', shortcut: 'Mod+D', action: () => fillDir('down') },
        { i18n: 'k.fillRight', shortcut: 'Mod+R', action: () => fillDir('right') },
        { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => { sel.ar = 0; sel.ac = 0; setSel(sh.rows - 1, sh.cols - 1, true); } },
        '-',
        { i18n: 'cmd.find', icon: 'search', shortcut: 'Mod+F', action: () => findReplace(false) },
        { i18n: 'cmd.replace', shortcut: 'Mod+H', action: () => findReplace(true) },
        { i18n: 'k.goTo', shortcut: 'Mod+G', action: goTo }
      ]
    },
    {
      i18n: 'menu.insert', items: [
        { i18n: 'k.insertRowAbove', action: () => insertRows(false) },
        { i18n: 'k.insertRowBelow', action: () => insertRows(true) },
        { i18n: 'k.insertColBefore', action: () => insertCols(false) },
        { i18n: 'k.insertColAfter', action: () => insertCols(true) },
        '-',
        { i18n: 'k.addSheet', icon: 'plus', shortcut: 'Shift+F11', action: addSheet },
        { i18n: 'k.chart', icon: 'chart-bar', action: insertChart },
        { i18n: 'k.function', icon: 'function', shortcut: 'Shift+F3', action: insertFunction },
        { i18n: 'k.autosum', icon: 'sigma', shortcut: 'Alt+=', action: autoSum }
      ]
    },
    {
      i18n: 'menu.format', items: [
        { i18n: 'k.formatCells', icon: 'settings', shortcut: 'Mod+1', action: formatCells },
        '-',
        { i18n: 'ui.bold', icon: 'bold', shortcut: 'Mod+B', action: () => toggleStyle('b') },
        { i18n: 'ui.italic', icon: 'italic', shortcut: 'Mod+I', action: () => toggleStyle('i') },
        { i18n: 'ui.underline', icon: 'underline', shortcut: 'Mod+U', action: () => toggleStyle('u') },
        { i18n: 'k.wrap', icon: 'wrap-text', action: () => toggleStyle('wrap') },
        { i18n: 'k.merge', icon: 'merge_cells', action: toggleMerge },
        '-',
        { i18n: 'k.numFormat', submenu: ['general', 'number', 'currency', 'percent', 'date', 'time', 'datetime', 'text'].map((f) => ({ i18n: 'k.fmt.' + f, action: () => styleSel({ fmt: f === 'general' ? null : f }) })) },
        { i18n: 'k.decInc', action: () => changeDecimals(1) },
        { i18n: 'k.decDec', action: () => changeDecimals(-1) },
        '-',
        { i18n: 'k.colWidth', action: setColWidth },
        { i18n: 'k.rowHeight', action: setRowHeight }
      ]
    },
    {
      i18n: 'menu.data', items: [
        { i18n: 'k.sortAsc', icon: 'sort', action: () => sortSel(true) },
        { i18n: 'k.sortDesc', action: () => sortSel(false) },
        { i18n: 'k.removeDup', action: removeDuplicates }
      ]
    },
    {
      i18n: 'menu.view', items: [
        { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => setZoom(zoom * 1.1) },
        { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => setZoom(zoom / 1.1) },
        { i18n: 'cmd.actualSize', shortcut: 'Mod+0', action: () => setZoom(1) },
        '-',
        { i18n: 'k.freeze', submenu: freezeItems() },
        { i18n: 'k.gridlines', checked: () => sh.gridlines !== false, action: () => { editSheet(() => { sh.gridlines = sh.gridlines === false; }); render(); } },
        { i18n: 'k.sheetDir', checked: () => sh.rtl, action: () => { editSheet(() => { sh.rtl = !sh.rtl; }); rebuild(); resizeCanvas(); wrap.scrollLeft = 0; renderCharts(); render(); } },
        '-',
        ...W.stdViewItems()
      ]
    },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus });
  const status = chrome.status;
  status.item('zoom').textContent = W.t('ui.zoom') + ': ' + Math.round(zoom * 100) + '%';

  /* ═══════════ شاشة البداية ═══════════ */
  function sampleBook() {
    const ar = W.lang === 'ar';
    const s = newSheet(ar ? 'الميزانية' : 'Budget');
    const rows = ar
      ? [['البند', 'يناير', 'فبراير', 'مارس', 'الإجمالي'], ['الإيجار', 3000, 3000, 3000], ['الكهرباء والماء', 450, 520, 480], ['البقالة', 1200, 1100, 1350], ['المواصلات', 600, 650, 580], ['الترفيه', 400, 300, 550]]
      : [['Item', 'January', 'February', 'March', 'Total'], ['Rent', 3000, 3000, 3000], ['Utilities', 450, 520, 480], ['Groceries', 1200, 1100, 1350], ['Transport', 600, 650, 580], ['Leisure', 400, 300, 550]];
    rows.forEach((row, r) => row.forEach((v, c) => { s.cells[key(r, c)] = { v, style: r === 0 ? { b: true, bg: '#e8f5ee', align: 'center' } : (typeof v === 'number' ? { fmt: 'currency', dec: 0, cur: ar ? 'ر.س' : '$' } : {}) }; }));
    for (let r = 1; r < rows.length; r++) s.cells[key(r, 4)] = { f: 'SUM(B' + (r + 1) + ':D' + (r + 1) + ')', style: { fmt: 'currency', dec: 0, cur: ar ? 'ر.س' : '$', b: true } };
    const tr = rows.length;
    s.cells[key(tr, 0)] = { v: ar ? 'المجموع' : 'Total', style: { b: true, bg: '#f3f4f6' } };
    for (let c = 1; c <= 4; c++) s.cells[key(tr, c)] = { f: 'SUM(' + F.colName(c) + '2:' + F.colName(c) + tr + ')', style: { b: true, bg: '#f3f4f6', fmt: 'currency', dec: 0, cur: ar ? 'ر.س' : '$', border: { t: true } } };
    s.colW[0] = 140;
    s.freeze = { r: 1, c: 0 };
    s.charts = [{ id: W.uid('ch'), type: 'column', title: ar ? 'المصروفات الشهرية' : 'Monthly expenses', range: 'A1:D6', x: 560, y: 10, w: 470, h: 290 }];
    return { sheets: [s], active: 0 };
  }
  const welcome = W.welcome(stageEl, {
    text: 'k.welcomeText',
    actions: [
      { i18n: 'k.blank', icon: 'file-plus', primary: true, action: () => { loadBook({ sheets: [newSheet(sheetLabel(1))], active: 0 }, {}); } },
      { i18n: 'cmd.open', icon: 'folder', action: open },
      { i18n: 'k.newSample', icon: 'table', action: () => loadBook(sampleBook(), { dirty: false }) }
    ],
    openRecent: openPath
  });
  welcome.el.style.zIndex = 20;
  welcome.el.style.background = 'var(--canvas-bg)';

  /* ═══════════ البداية ═══════════ */
  W.on('langchange', () => { renderFmtSel(); updateToolbar(); render(); renderTabs(); status.item('zoom').textContent = W.t('ui.zoom') + ': ' + Math.round(zoom * 100) + '%'; });
  W.on('themechange', () => render());
  new ResizeObserver(() => { resizeCanvas(); render(); positionEditor(); }).observe(wrap);
  W.dropZone(stageEl, async (files) => { const f = files.find((x) => ['kashf', 'xlsx', 'csv', 'tsv', 'txt'].includes(x.ext)); if (f && (await W.confirmDiscard())) await loadFile({ name: f.name, path: f.path, ext: f.ext, data: new Uint8Array(f.data) }); });
  W.onExternalFile((f) => loadFile(f), 'bytes');
  W.fontsReady().then(() => render());
  rebuild(); resizeCanvas(); renderTabs(); setSel(0, 0); render();

  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const b = sampleBook();
      const bytes = await X.write(b, {});
      const back = await X.read(bytes.buffer);
      if (back.sheets.length !== 1) errors.push('xlsx sheets');
      if (!back.sheets[0].cells['1,4'] || back.sheets[0].cells['1,4'].f !== 'SUM(B2:D2)') errors.push('xlsx formula roundtrip');
      if (!back.sheets[0].rtl !== !b.sheets[0].rtl) errors.push('xlsx rtl');
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
  window.__kashf = { get book() { return book; }, value: (r, c) => value(book.active, r, c), sel };
})();
