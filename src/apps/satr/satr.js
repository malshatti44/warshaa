/* سطر Satr — معالج نصوص عربي */
(function () {
  'use strict';

  W.init({
    id: 'satr',
    i18n: {
      ar: {
        'satr.style.p': 'نص عادي', 'satr.style.h1': 'عنوان 1', 'satr.style.h2': 'عنوان 2', 'satr.style.h3': 'عنوان 3', 'satr.style.h4': 'عنوان 4',
        'satr.style.blockquote': 'اقتباس', 'satr.style.pre': 'شيفرة', 'satr.textColor': 'لون النص', 'satr.highlight': 'لون التظليل',
        'satr.bullets': 'قائمة نقطية', 'satr.numbers': 'قائمة رقمية', 'satr.indent': 'زيادة المسافة البادئة', 'satr.outdent': 'إنقاص المسافة البادئة',
        'satr.lineSpacing': 'تباعد الأسطر', 'satr.clear': 'مسح التنسيق', 'satr.insertImage': 'صورة…', 'satr.insertTable': 'جدول…',
        'satr.insertLink': 'رابط…', 'satr.pageBreak': 'فاصل صفحة', 'satr.hr': 'خط أفقي', 'satr.date': 'التاريخ والوقت', 'satr.symbol': 'رمز…',
        'satr.pageSetup': 'إعداد الصفحة…', 'satr.paperSize': 'حجم الورق', 'satr.orientation': 'الاتجاه', 'satr.portrait': 'عمودي', 'satr.landscape': 'أفقي',
        'satr.margins': 'الهوامش (مم)', 'satr.mTop': 'أعلى', 'satr.mBottom': 'أسفل', 'satr.mRight': 'يمين', 'satr.mLeft': 'يسار',
        'satr.pageNumbers': 'ترقيم الصفحات عند الطباعة والتصدير', 'satr.docDir': 'اتجاه المستند', 'satr.words': '{n} كلمة', 'satr.chars': '{n} حرف',
        'satr.pages': 'الصفحات: {n}', 'satr.rows': 'الصفوف', 'satr.cols': 'الأعمدة', 'satr.headerRow': 'صف عناوين',
        'satr.url': 'عنوان الرابط', 'satr.linkText': 'نص الرابط', 'satr.find': 'بحث', 'satr.replaceWith': 'استبدال بـ', 'satr.replace': 'استبدال',
        'satr.replaceAll': 'استبدال الكل', 'satr.flexible': 'مطابقة مرنة (تجاهل التشكيل والهمزات)', 'satr.matches': '{i} من {n}', 'satr.noMatch': 'لا نتائج',
        'satr.replacedN': 'تم استبدال {n} موضع', 'satr.exportDocx': 'مستند Word (.docx)…', 'satr.exportHtml': 'صفحة ويب (.html)…', 'satr.exportTxt': 'نص عادي (.txt)…',
        'satr.exportMd': 'Markdown (.md)…', 'satr.pasteText': 'لصق كنص عادي', 'satr.wordCount': 'إحصاءات المستند…', 'satr.stats': 'إحصاءات المستند',
        'satr.paragraphs': 'الفقرات', 'satr.charsNoSpaces': 'الأحرف (دون مسافات)', 'satr.readTime': 'وقت القراءة التقريبي', 'satr.minutes': '{n} دقيقة',
        'satr.draftFound': 'ع\u064Fثر على مسودة غير محفوظة من {time}. هل تريد استعادتها؟', 'satr.restore': 'استعادة', 'satr.draftDiscard': 'تجاهل',
        'satr.tableRowAbove': 'إدراج صف أعلى', 'satr.tableRowBelow': 'إدراج صف أسفل', 'satr.tableColBefore': 'إدراج عمود قبل', 'satr.tableColAfter': 'إدراج عمود بعد',
        'satr.tableDelRow': 'حذف الصف', 'satr.tableDelCol': 'حذف العمود', 'satr.tableDel': 'حذف الجدول', 'satr.cellColor': 'لون خلفية الخلية…',
        'satr.imgSmall': 'صغير', 'satr.imgMed': 'متوسط', 'satr.imgLarge': 'كبير', 'satr.imgFull': 'كامل', 'satr.wrapStart': 'التفاف (بداية)',
        'satr.wrapCenter': 'وسط', 'satr.wrapEnd': 'التفاف (نهاية)', 'satr.inline': 'ضمن السطر', 'satr.pageBreakLabel': 'فاصل صفحة',
        'satr.defaultFont': 'الخط الافتراضي', 'satr.custom': 'مخصص…', 'satr.newConfirm': 'مستند جديد', 'satr.sample': 'مستند مثال',
        'satr.symbols': 'الرموز', 'satr.removeLink': 'إزالة الرابط', 'satr.openLink': 'فتح الرابط', 'satr.sup': 'نص مرتفع', 'satr.sub': 'نص منخفض',
        'satr.case': 'تحويل حالة الأحرف اللاتينية', 'satr.upper': 'أحرف كبيرة', 'satr.lower': 'أحرف صغيرة', 'satr.noTashkeel': 'إزالة التشكيل من التحديد',
        'satr.focusMode': 'وضع التركيز', 'satr.docFont': 'خط المستند…'
      },
      en: {
        'satr.style.p': 'Normal text', 'satr.style.h1': 'Heading 1', 'satr.style.h2': 'Heading 2', 'satr.style.h3': 'Heading 3', 'satr.style.h4': 'Heading 4',
        'satr.style.blockquote': 'Quote', 'satr.style.pre': 'Code', 'satr.textColor': 'Text color', 'satr.highlight': 'Highlight color',
        'satr.bullets': 'Bulleted list', 'satr.numbers': 'Numbered list', 'satr.indent': 'Increase indent', 'satr.outdent': 'Decrease indent',
        'satr.lineSpacing': 'Line spacing', 'satr.clear': 'Clear formatting', 'satr.insertImage': 'Image…', 'satr.insertTable': 'Table…',
        'satr.insertLink': 'Link…', 'satr.pageBreak': 'Page break', 'satr.hr': 'Horizontal line', 'satr.date': 'Date & time', 'satr.symbol': 'Symbol…',
        'satr.pageSetup': 'Page setup…', 'satr.paperSize': 'Paper size', 'satr.orientation': 'Orientation', 'satr.portrait': 'Portrait', 'satr.landscape': 'Landscape',
        'satr.margins': 'Margins (mm)', 'satr.mTop': 'Top', 'satr.mBottom': 'Bottom', 'satr.mRight': 'Right', 'satr.mLeft': 'Left',
        'satr.pageNumbers': 'Page numbers when printing/exporting', 'satr.docDir': 'Document direction', 'satr.words': '{n} words', 'satr.chars': '{n} characters',
        'satr.pages': 'Pages: {n}', 'satr.rows': 'Rows', 'satr.cols': 'Columns', 'satr.headerRow': 'Header row',
        'satr.url': 'Link URL', 'satr.linkText': 'Link text', 'satr.find': 'Find', 'satr.replaceWith': 'Replace with', 'satr.replace': 'Replace',
        'satr.replaceAll': 'Replace all', 'satr.flexible': 'Flexible matching (ignore diacritics & hamza forms)', 'satr.matches': '{i} of {n}', 'satr.noMatch': 'No results',
        'satr.replacedN': 'Replaced {n} occurrences', 'satr.exportDocx': 'Word document (.docx)…', 'satr.exportHtml': 'Web page (.html)…', 'satr.exportTxt': 'Plain text (.txt)…',
        'satr.exportMd': 'Markdown (.md)…', 'satr.pasteText': 'Paste as plain text', 'satr.wordCount': 'Document statistics…', 'satr.stats': 'Document statistics',
        'satr.paragraphs': 'Paragraphs', 'satr.charsNoSpaces': 'Characters (no spaces)', 'satr.readTime': 'Approx. reading time', 'satr.minutes': '{n} min',
        'satr.draftFound': 'An unsaved draft from {time} was found. Restore it?', 'satr.restore': 'Restore', 'satr.draftDiscard': 'Discard',
        'satr.tableRowAbove': 'Insert row above', 'satr.tableRowBelow': 'Insert row below', 'satr.tableColBefore': 'Insert column before', 'satr.tableColAfter': 'Insert column after',
        'satr.tableDelRow': 'Delete row', 'satr.tableDelCol': 'Delete column', 'satr.tableDel': 'Delete table', 'satr.cellColor': 'Cell background…',
        'satr.imgSmall': 'Small', 'satr.imgMed': 'Medium', 'satr.imgLarge': 'Large', 'satr.imgFull': 'Full', 'satr.wrapStart': 'Wrap (start)',
        'satr.wrapCenter': 'Center', 'satr.wrapEnd': 'Wrap (end)', 'satr.inline': 'Inline', 'satr.pageBreakLabel': 'Page break',
        'satr.defaultFont': 'Default font', 'satr.custom': 'Custom…', 'satr.newConfirm': 'New document', 'satr.sample': 'Sample document',
        'satr.symbols': 'Symbols', 'satr.removeLink': 'Remove link', 'satr.openLink': 'Open link', 'satr.sup': 'Superscript', 'satr.sub': 'Subscript',
        'satr.case': 'Change Latin case', 'satr.upper': 'UPPERCASE', 'satr.lower': 'lowercase', 'satr.noTashkeel': 'Remove Arabic diacritics from selection',
        'satr.focusMode': 'Focus mode', 'satr.docFont': 'Document font…'
      }
    }
  });

  const editor = document.getElementById('doc');
  const pageEl = document.getElementById('page');
  const scroll = document.getElementById('scroll');
  const stage = document.getElementById('stage');
  const findBox = document.getElementById('find');
  const imgbar = document.getElementById('imgbar');

  const PAPER = {
    A4: [210, 297], A5: [148, 210], A3: [297, 420], B5: [176, 250], Letter: [215.9, 279.4], Legal: [215.9, 355.6]
  };
  const MM = 3.7795275591;
  const SIZES = [8, 9, 10, 10.5, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 48, 60, 72];
  const DEFAULT_FONT = 'Amiri';
  const state = {
    page: { size: 'A4', width: 210, height: 297, orientation: 'portrait', margins: { top: 25, right: 25, bottom: 25, left: 25 }, dir: 'rtl', pageNumbers: true, font: DEFAULT_FONT, fontSize: 14 },
    format: 'satr',
    zoom: W.store.get('satr.zoom', 1)
  };

  /* ───── أنماط محتوى المستند (للمحرر والتصدير) ───── */
  function docCSS(sel) {
    const pg = state.page;
    return [
      sel + '{font-family:' + W.fontStack(pg.font) + ';font-size:' + pg.fontSize + 'pt;line-height:1.6;color:#111;word-wrap:break-word;overflow-wrap:anywhere;tab-size:4}',
      sel + ' :is(p,h1,h2,h3,h4,h5,h6,li,blockquote,pre,div:not(.page-break)){unicode-bidi:plaintext}',
      sel + ' [dir]{unicode-bidi:isolate}',
      sel + ' p{margin:0 0 .55em}',
      sel + ' h1{font-size:1.6em;margin:.5em 0 .35em;line-height:1.3}',
      sel + ' h2{font-size:1.25em;margin:.5em 0 .3em;line-height:1.35}',
      sel + ' h3{font-size:1.07em;margin:.45em 0 .3em}',
      sel + ' h4{font-size:1em;margin:.4em 0 .25em}',
      sel + ' blockquote{margin:.6em 0;padding:.2em 1em;border-inline-start:4px solid ' + W.app.color + ';color:#444;background:#f5f7fb}',
      sel + " pre{font-family:'JetBrains Mono',Consolas,monospace;font-size:.75em;background:#f3f4f6;padding:.7em 1em;border-radius:6px;direction:ltr;text-align:left;white-space:pre-wrap}",
      sel + ' ul,' + sel + ' ol{margin:0 0 .55em;padding-inline-start:1.6em}',
      sel + ' a{color:#0563c1}',
      sel + ' img{max-width:100%;height:auto}',
      sel + ' img.float-start{float:inline-start;margin-inline-end:12px;margin-bottom:6px}',
      sel + ' img.float-end{float:inline-end;margin-inline-start:12px;margin-bottom:6px}',
      sel + ' img.block-center{display:block;margin:8px auto}',
      sel + ' table{border-collapse:collapse;width:100%;margin:.5em 0;table-layout:fixed}',
      sel + ' td,' + sel + ' th{border:1px solid #9aa0ad;padding:5px 8px;vertical-align:top}',
      sel + ' th{background:#eef1f6}',
      sel + ' hr{border:0;border-top:1px solid #b8bdc8;margin:1em 0}'
    ].join('\n');
  }
  const liveStyle = W.h('style');
  document.head.append(liveStyle);

  function applyPage() {
    const pg = state.page;
    const land = pg.orientation === 'landscape';
    const w = (land ? pg.height : pg.width) * MM, h = (land ? pg.width : pg.height) * MM;
    pageEl.style.setProperty('--page-w', w + 'px');
    pageEl.style.setProperty('--page-h', h + 'px');
    pageEl.style.setProperty('--m-top', pg.margins.top * MM + 'px');
    pageEl.style.setProperty('--m-bottom', pg.margins.bottom * MM + 'px');
    pageEl.style.setProperty('--m-right', pg.margins.right * MM + 'px');
    pageEl.style.setProperty('--m-left', pg.margins.left * MM + 'px');
    editor.dir = pg.dir;
    liveStyle.textContent = docCSS('.satr-doc') + '\n.satr-doc .page-break::after{content:"' + W.t('satr.pageBreakLabel') + '"}';
    pageEl.style.zoom = state.zoom;
    updateStatus();
  }

  /* ───── التحديد ───── */
  let savedRange = null;
  document.addEventListener('selectionchange', () => {
    const sel = getSelection();
    if (sel.rangeCount && editor.contains(sel.anchorNode)) {
      savedRange = sel.getRangeAt(0).cloneRange();
      refreshToolbar();
    }
  });
  function restoreSel() {
    const cur = getSelection();
    if (cur.rangeCount && editor.contains(cur.anchorNode) && editor.contains(document.activeElement)) return;
    editor.focus({ preventScroll: true });
    if (savedRange && editor.contains(savedRange.startContainer)) {
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  }

  /* ───── سجل التراجع (لقطات كاملة مع حفظ الصور خارج اللقطة) ───── */
  const imgKey = new Map(), imgVal = new Map();
  let imgSeq = 0;
  const packHTML = (h) => h.replace(/src="(data:image\/[^"]+)"/g, (m, d) => {
    let k = imgKey.get(d);
    if (!k) { k = 'k' + (++imgSeq); imgKey.set(d, k); imgVal.set(k, d); }
    return 'src="warsha-img:' + k + '"';
  });
  const unpackHTML = (h) => h.replace(/src="warsha-img:(k\d+)"/g, (m, k) => 'src="' + (imgVal.get(k) || '') + '"');
  function nodePath(n) {
    const path = [];
    while (n && n !== editor) {
      const p = n.parentNode;
      if (!p) return null;
      path.unshift(Array.prototype.indexOf.call(p.childNodes, n));
      n = p;
    }
    return n === editor ? path : null;
  }
  function nodeFromPath(path) {
    let n = editor;
    for (const i of path || []) { if (!n.childNodes[i]) return null; n = n.childNodes[i]; }
    return n;
  }
  const nodeLen = (n) => (n.nodeType === 3 ? n.nodeValue.length : n.childNodes.length);
  function saveSelection() {
    const s = getSelection();
    if (!s.rangeCount || !editor.contains(s.anchorNode)) return null;
    return { a: nodePath(s.anchorNode), ao: s.anchorOffset, f: nodePath(s.focusNode), fo: s.focusOffset };
  }
  function loadSelection(sel) {
    if (!sel) return;
    const a = nodeFromPath(sel.a), f = nodeFromPath(sel.f);
    if (!a || !f) return;
    try { getSelection().setBaseAndExtent(a, Math.min(sel.ao, nodeLen(a)), f, Math.min(sel.fo, nodeLen(f))); } catch (e) { /* تجاهل */ }
  }
  const hist = { stack: [], index: -1 };
  function checkpoint() {
    const h = packHTML(editor.innerHTML);
    const cur = hist.stack[hist.index];
    if (cur && cur.h === h) { cur.s = saveSelection(); return; }
    hist.stack = hist.stack.slice(0, hist.index + 1);
    hist.stack.push({ h, s: saveSelection() });
    if (hist.stack.length > 100) hist.stack.shift();
    hist.index = hist.stack.length - 1;
  }
  function resetHistory() { hist.stack = []; hist.index = -1; checkpoint(); }
  function restoreSnap(sn) {
    editor.innerHTML = unpackHTML(sn.h);
    editor.focus({ preventScroll: true });
    loadSelection(sn.s);
    selectImage(null);
    W.setDirty(true);
    updateStatus();
  }
  function undo() {
    checkpoint();
    if (hist.index <= 0) return;
    hist.index--;
    restoreSnap(hist.stack[hist.index]);
  }
  function redo() {
    if (hist.index >= hist.stack.length - 1) return;
    hist.index++;
    restoreSnap(hist.stack[hist.index]);
  }
  const typingCheckpoint = W.debounce(checkpoint, 700);
  editor.addEventListener('beforeinput', (e) => {
    if (e.inputType === 'historyUndo') { e.preventDefault(); undo(); }
    else if (e.inputType === 'historyRedo') { e.preventDefault(); redo(); }
    else if (e.inputType === 'insertParagraph' || e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop' || e.inputType === 'deleteByCut') checkpoint();
  });

  /** تنفيذ أمر أصلي للتنسيق داخل السطر، ثم تصحيح البنية */
  function exec(cmd, val) {
    restoreSel();
    checkpoint();
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, val == null ? null : val);
    normalize();
    checkpoint();
    changed();
  }
  /** تغيير بنيوي مخصص مع حفظ موضع المؤشر */
  function structural(fn) {
    restoreSel();
    checkpoint();
    const s = getSelection();
    const r = s.rangeCount ? s.getRangeAt(0) : null;
    const ref = r ? { sc: r.startContainer, so: r.startOffset, ec: r.endContainer, eo: r.endOffset } : null;
    const map = new Map();
    fn(map);
    normalize(map);
    if (ref) {
      const fix = (n, o) => {
        if (editor.contains(n)) return [n, o];
        const m = map.get(n);
        if (m && editor.contains(m)) return [m, Math.min(o, nodeLen(m))];
        return null;
      };
      const a = fix(ref.sc, ref.so), b = fix(ref.ec, ref.eo);
      if (a && b) { try { s.setBaseAndExtent(a[0], a[1], b[0], b[1]); } catch (e) { /* تجاهل */ } }
    }
    checkpoint();
    changed();
  }

  const BLOCK_RE = /^(P|H[1-6]|LI|BLOCKQUOTE|PRE|DIV|TD|TH)$/;
  const INLINE_BLOCKS = /^(P|H[1-6]|BLOCKQUOTE|PRE)$/;
  function blockOf(n) {
    while (n && n !== editor) {
      if (n.nodeType === 1 && BLOCK_RE.test(n.tagName) && !n.classList.contains('page-break')) return n;
      n = n.parentNode;
    }
    return null;
  }
  function unwrap(el) {
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    el.remove();
  }
  function replaceTag(el, tag, map) {
    const n = document.createElement(tag);
    for (const a of Array.from(el.attributes)) n.setAttribute(a.name, a.value);
    while (el.firstChild) n.append(el.firstChild);
    el.replaceWith(n);
    if (map) map.set(el, n);
    return n;
  }
  /** تصحيح البنية: لا قوائم أو جداول داخل فقرات، ولا نصوص سائبة في الجذر */
  let normalizeMap = null;
  function normalize(map) {
    normalizeMap = map || null;
    editor.querySelectorAll('p, h1, h2, h3, h4, h5, h6').forEach((p) => {
      if (Array.from(p.children).some((c) => /^(UL|OL|TABLE|P|H[1-6]|BLOCKQUOTE|PRE|HR)$/.test(c.tagName) || (c.tagName === 'DIV' && !c.classList.contains('page-break')))) unwrap(p);
    });
    editor.querySelectorAll('ul:empty, ol:empty').forEach((l) => l.remove());
    // كتل div العادية تصبح فقرات
    editor.querySelectorAll('div:not(.page-break)').forEach((d) => {
      if (!Array.from(d.children).some((c) => BLOCK_RE.test(c.tagName) || /^(UL|OL|TABLE|HR)$/.test(c.tagName) || c.classList.contains('page-break'))) {
        const parentOk = d.parentElement === editor || /^(BLOCKQUOTE|LI|TD|TH|DIV)$/.test(d.parentElement.tagName);
        if (parentOk) replaceTag(d, 'p', normalizeMap);
      } else if (d.parentElement === editor) unwrap(d);
    });
    let run = [];
    const flush = () => {
      if (!run.length) return;
      if (run.some((n) => n.nodeType === 1 || n.nodeValue.trim())) {
        const p = document.createElement('p');
        run[0].before(p);
        run.forEach((n) => p.append(n));
      }
      run = [];
    };
    for (const n of Array.from(editor.childNodes)) {
      const isInline = n.nodeType === 3 || (n.nodeType === 1 && !BLOCK_RE.test(n.tagName) && !/^(UL|OL|TABLE|HR)$/.test(n.tagName) && !n.classList.contains('page-break'));
      if (isInline) run.push(n); else flush();
    }
    flush();
    if (!editor.firstElementChild) editor.innerHTML = '<p><br></p>';
  }
  /** الكتل الورقية المحددة (دون فرض أي تحويل) */
  function selectedBlocks() {
    restoreSel();
    const sel = getSelection();
    if (!sel.rangeCount) return [];
    const range = sel.getRangeAt(0);
    const out = new Set();
    const start = blockOf(range.startContainer);
    if (start) out.add(start);
    if (!range.collapsed) {
      const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (n) => (range.intersectsNode(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
      });
      let n;
      while ((n = walker.nextNode())) {
        if (BLOCK_RE.test(n.tagName) && !n.classList.contains('page-break') && !Array.from(n.children).some((c) => BLOCK_RE.test(c.tagName) || c.tagName === 'UL' || c.tagName === 'OL' || c.tagName === 'TABLE')) out.add(n);
      }
    }
    if (!out.size) {
      normalize();
      const b = blockOf(getSelection().anchorNode);
      if (b) out.add(b);
    }
    return Array.from(out);
  }

  /* ───── القوائم ───── */
  function liToBlock(li, tag, map) {
    const list = li.parentElement;
    const items = Array.from(list.children);
    const after = items.slice(items.indexOf(li) + 1);
    const block = document.createElement(tag || 'p');
    if (li.getAttribute('dir')) block.setAttribute('dir', li.getAttribute('dir'));
    if (li.style.textAlign) block.style.textAlign = li.style.textAlign;
    const nested = [];
    for (const c of Array.from(li.childNodes)) {
      if (c.nodeType === 1 && (c.tagName === 'UL' || c.tagName === 'OL')) nested.push(c);
      else block.append(c);
    }
    if (!block.childNodes.length) block.innerHTML = '<br>';
    let point = list;
    point.after(block); point = block;
    nested.forEach((n) => { point.after(n); point = n; });
    if (after.length) { const tail = list.cloneNode(false); after.forEach((x) => tail.append(x)); point.after(tail); }
    li.remove();
    if (!list.children.length) list.remove();
    if (map) map.set(li, block);
    return block;
  }
  function toggleList(type) {
    structural((map) => {
      const blocks = selectedBlocks();
      const T = type.toUpperCase();
      if (blocks.length && blocks.every((b) => b.tagName === 'LI' && b.parentElement.tagName === T)) {
        blocks.forEach((li) => liToBlock(li, 'p', map));
        return;
      }
      const toRetag = new Set();
      let current = null;
      for (const b of blocks) {
        if (b.tagName === 'LI') { if (b.parentElement.tagName !== T) toRetag.add(b.parentElement); current = null; continue; }
        if (b.tagName === 'TD' || b.tagName === 'TH') {
          const l = document.createElement(type), li = document.createElement('li');
          while (b.firstChild) li.append(b.firstChild);
          if (!li.childNodes.length) li.innerHTML = '<br>';
          l.append(li); b.append(l); continue;
        }
        const li = document.createElement('li');
        if (b.getAttribute('dir')) li.setAttribute('dir', b.getAttribute('dir'));
        if (b.style.textAlign) li.style.textAlign = b.style.textAlign;
        while (b.firstChild) li.append(b.firstChild);
        if (!li.childNodes.length) li.innerHTML = '<br>';
        if (current && current.nextElementSibling === b) { current.append(li); b.remove(); }
        else {
          const prev = b.previousElementSibling;
          if (prev && prev.tagName === T) { prev.append(li); b.remove(); current = prev; }
          else { current = document.createElement(type); b.replaceWith(current); current.append(li); }
        }
        map.set(b, li);
      }
      toRetag.forEach((l) => replaceTag(l, type, map));
      if (current && current.nextElementSibling && current.nextElementSibling.tagName === T) {
        const nx = current.nextElementSibling;
        while (nx.firstChild) current.append(nx.firstChild);
        nx.remove();
      }
    });
  }
  function indentLi(li) {
    const prev = li.previousElementSibling;
    if (!prev || prev.tagName !== 'LI') return;
    let sub = Array.from(prev.children).reverse().find((c) => c.tagName === 'UL' || c.tagName === 'OL');
    if (!sub) { sub = document.createElement(li.parentElement.tagName.toLowerCase()); prev.append(sub); }
    sub.append(li);
  }
  function outdentLi(li, map) {
    const list = li.parentElement;
    const parentLi = list.parentElement && list.parentElement.tagName === 'LI' ? list.parentElement : null;
    if (!parentLi) { liToBlock(li, 'p', map); return; }
    const items = Array.from(list.children);
    const following = items.slice(items.indexOf(li) + 1);
    if (following.length) {
      const sub = document.createElement(list.tagName.toLowerCase());
      following.forEach((f) => sub.append(f));
      li.append(sub);
    }
    parentLi.after(li);
    if (!list.children.length) list.remove();
  }

  /* ───── أوامر التنسيق ───── */
  function setFontSize(pt) {
    restoreSel();
    checkpoint();
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('fontSize', false, '7');
    editor.querySelectorAll('span[style*="xxx-large"], font[size="7"]').forEach((el) => {
      if (el.tagName === 'FONT') {
        const s = document.createElement('span');
        s.style.fontSize = pt + 'pt';
        while (el.firstChild) s.append(el.firstChild);
        el.replaceWith(s);
      } else el.style.fontSize = pt + 'pt';
    });
    checkpoint();
    changed();
  }
  function setFont(family) { exec('fontName', family); }
  function setBlock(tag) {
    structural((map) => {
      selectedBlocks().forEach((b) => {
        if (b.tagName === 'LI') liToBlock(b, tag, map);
        else if (b.tagName === 'TD' || b.tagName === 'TH') {
          const n = document.createElement(tag);
          while (b.firstChild) n.append(b.firstChild);
          if (!n.childNodes.length) n.innerHTML = '<br>';
          b.append(n);
        } else if (b.tagName.toLowerCase() !== tag) replaceTag(b, tag, map);
      });
    });
  }
  function align(v) {
    structural(() => selectedBlocks().forEach((b) => { b.style.textAlign = v; }));
  }
  function setLineHeight(v) {
    structural(() => selectedBlocks().forEach((b) => { b.style.lineHeight = v; }));
  }
  function setDir(dir) {
    structural(() => selectedBlocks().forEach((b) => {
      const target = b.tagName === 'LI' ? b.parentElement : b;
      target.setAttribute('dir', dir);
      b.style.textAlign = '';
    }));
  }
  function indent(delta) {
    structural((map) => {
      const blocks = selectedBlocks();
      blocks.forEach((b) => {
        if (b.tagName === 'LI') { if (delta > 0) indentLi(b); else outdentLi(b, map); return; }
        const cur = parseFloat(b.style.marginInlineStart) || 0;
        const nv = Math.max(0, cur + delta * 1.2);
        b.style.marginInlineStart = nv ? nv + 'cm' : '';
      });
    });
  }
  function clearFormat() {
    exec('removeFormat');
    structural((map) => selectedBlocks().forEach((b) => {
      b.style.lineHeight = ''; b.style.marginInlineStart = ''; b.style.textAlign = '';
      if (/^(H[1-6]|BLOCKQUOTE|PRE)$/.test(b.tagName)) replaceTag(b, 'p', map);
    }));
  }
  function removeTashkeel() {
    restoreSel();
    const sel = getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return;
    const text = sel.toString().replace(/[ً-ْٰـ]/g, '');
    exec('insertText', text);
  }
  function changeCase(upper) {
    restoreSel();
    const sel = getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return;
    const t = sel.toString();
    exec('insertText', upper ? t.toUpperCase() : t.toLowerCase());
  }
  /** مفاتيح خاصة: Enter/Backspace في عناصر القوائم، Tab */
  editor.addEventListener('keydown', (e) => {
    if (e.isComposing) return;
    const sel = getSelection();
    if (!sel.rangeCount) return;
    const r = sel.getRangeAt(0);
    const li = blockOf(r.startContainer);
    const inLi = li && li.tagName === 'LI';
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && inLi && r.collapsed) {
      const empty = !li.textContent.replace(/​/g, '').trim() && !li.querySelector('img');
      if (empty) { e.preventDefault(); structural((map) => outdentLi(li, map)); }
    } else if (e.key === 'Backspace' && inLi && r.collapsed) {
      const pre = document.createRange();
      pre.setStart(li, 0); pre.setEnd(r.startContainer, r.startOffset);
      if (!pre.toString() && !pre.cloneContents().querySelector('img')) { e.preventDefault(); structural((map) => outdentLi(li, map)); }
    } else if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      if (inLi) indent(e.shiftKey ? -1 : 1);
      else if (!e.shiftKey) exec('insertText', '  ');
    }
  });

  /* ───── شريط الأدوات ───── */
  const tb = document.getElementById('toolbar');
  tb.classList.add('satr-tb');
  const btn = (icon, tip, fn, shortcut) => {
    const b = W.iconButton(icon, tip, null, { shortcut });
    b.addEventListener('mousedown', (e) => e.preventDefault());
    b.addEventListener('click', fn);
    tb.append(b);
    return b;
  };
  const sep = () => tb.append(W.h('div', { class: 'w-sep' }));

  btn('undo', 'cmd.undo', () => undo(), 'Mod+Z');
  btn('redo', 'cmd.redo', () => redo(), 'Mod+Y');
  sep();
  const styleSel = W.h('select', { class: 'w-select style-select' });
  const STYLES = ['p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'pre'];
  const renderStyleSel = () => { const v = styleSel.value; styleSel.innerHTML = ''; STYLES.forEach((s) => styleSel.append(W.h('option', { value: s, text: W.t('satr.style.' + s) }))); styleSel.value = v || 'p'; };
  renderStyleSel();
  styleSel.addEventListener('change', () => setBlock(styleSel.value));
  tb.append(styleSel);
  const fontSel = W.fontSelect(state.page.font, (f) => setFont(f), 'font-select');
  tb.append(fontSel);
  const sizeSel = W.h('select', { class: 'w-select size-select' });
  SIZES.forEach((s) => sizeSel.append(W.h('option', { value: s, text: s })));
  sizeSel.value = 14;
  sizeSel.addEventListener('change', () => setFontSize(parseFloat(sizeSel.value)));
  tb.append(sizeSel);
  sep();
  const bBold = btn('bold', 'ui.bold', () => exec('bold'), 'Mod+B');
  const bItalic = btn('italic', 'ui.italic', () => exec('italic'), 'Mod+I');
  const bUnder = btn('underline', 'ui.underline', () => exec('underline'), 'Mod+U');
  const bStrike = btn('strike', 'ui.strike', () => exec('strikeThrough'));
  const colorBtn = btn('text-color', 'satr.textColor', (e) => colorPopover(e.currentTarget, (c) => { exec('foreColor', c); state.lastColor = c; colorBar.style.background = c; }));
  colorBtn.classList.add('satr-color-btn');
  const colorBar = W.h('span', { class: 'bar', style: { background: '#d32f2f' } });
  colorBtn.append(colorBar);
  const hlBtn = btn('highlighter', 'satr.highlight', (e) => colorPopover(e.currentTarget, (c) => { exec('hiliteColor', c || 'transparent'); }, { none: true, colors: ['#fff176', '#ffcc80', '#a5d6a7', '#80deea', '#90caf9', '#ce93d8', '#f48fb1', '#e0e0e0'] }));
  hlBtn.classList.add('satr-color-btn');
  hlBtn.append(W.h('span', { class: 'bar', style: { background: '#fff176' } }));
  sep();
  const bAlignR = btn('align-right', 'ui.right', () => align('right'));
  const bAlignC = btn('align-center', 'ui.center', () => align('center'));
  const bAlignL = btn('align-left', 'ui.left', () => align('left'));
  const bAlignJ = btn('align-justify', 'ui.justify', () => align('justify'));
  sep();
  btn('rtl', 'ui.rtl', () => setDir('rtl'));
  btn('ltr', 'ui.ltr', () => setDir('ltr'));
  sep();
  const bUl = btn('list', 'satr.bullets', () => toggleList('ul'));
  const bOl = btn('list-ordered', 'satr.numbers', () => toggleList('ol'));
  btn('outdent', 'satr.outdent', () => indent(-1));
  btn('indent', 'satr.indent', () => indent(1));
  btn('sliders', 'satr.lineSpacing', (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    W.showMenu([1, 1.15, 1.5, 1.6, 2, 2.5, 3].map((v) => ({ label: String(v), action: () => setLineHeight(String(v)) })), W.isRTL() ? r.right : r.left, r.bottom + 4);
  });
  sep();
  btn('image', 'satr.insertImage', () => insertImage());
  btn('table', 'satr.insertTable', () => insertTable());
  btn('link', 'satr.insertLink', () => insertLink(), 'Mod+K');
  btn('page-break', 'satr.pageBreak', () => insertPageBreak(), 'Mod+Enter');
  sep();
  btn('clear-format', 'satr.clear', () => clearFormat());
  btn('search', 'cmd.find', () => openFind(false), 'Mod+F');

  function colorPopover(anchor, onPick, o) {
    o = o || {};
    W.closeMenus();
    const r = anchor.getBoundingClientRect();
    const box = W.h('div', { class: 'w-menu', style: { width: '214px', padding: '10px' } });
    box.append(W.swatches((c) => { box.remove(); onPick(c); }, o.colors));
    const row = W.h('div', { class: 'row', style: { marginTop: '8px' } });
    if (o.none) row.append(W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('ui.none'), onclick: () => { box.remove(); onPick(null); } }));
    const custom = W.h('input', { type: 'color', class: 'w-color sm', value: '#d32f2f' });
    custom.addEventListener('change', () => { box.remove(); onPick(custom.value); });
    row.append(W.h('span', { class: 'small muted', text: W.t('ui.custom') }), custom);
    box.append(row);
    document.body.append(box);
    const left = W.isRTL() ? r.right - box.offsetWidth : r.left;
    box.style.left = W.clamp(left, 4, innerWidth - box.offsetWidth - 4) + 'px';
    box.style.top = (r.bottom + 4) + 'px';
  }

  let tbTimer = null;
  function refreshToolbar() {
    clearTimeout(tbTimer);
    tbTimer = setTimeout(() => {
      const st = (c) => { try { return document.queryCommandState(c); } catch (e) { return false; } };
      bBold.classList.toggle('active', st('bold'));
      bItalic.classList.toggle('active', st('italic'));
      bUnder.classList.toggle('active', st('underline'));
      bStrike.classList.toggle('active', st('strikeThrough'));
      bUl.classList.toggle('active', st('insertUnorderedList'));
      bOl.classList.toggle('active', st('insertOrderedList'));
      const sel = getSelection();
      const node = sel.anchorNode && (sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement);
      if (!node || !editor.contains(node)) return;
      const cs = getComputedStyle(node);
      const al = cs.textAlign;
      const dir = cs.direction;
      const vis = al === 'start' ? (dir === 'rtl' ? 'right' : 'left') : al === 'end' ? (dir === 'rtl' ? 'left' : 'right') : al;
      bAlignR.classList.toggle('active', vis === 'right');
      bAlignC.classList.toggle('active', vis === 'center');
      bAlignL.classList.toggle('active', vis === 'left');
      bAlignJ.classList.toggle('active', vis === 'justify');
      const blk = blockOf(node);
      const tag = blk ? blk.tagName.toLowerCase() : 'p';
      styleSel.value = STYLES.includes(tag) ? tag : 'p';
      const fam = cs.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
      if (W.fonts.some((f) => f.family === fam)) fontSel.value = fam;
      const pt = Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2;
      if (!SIZES.includes(pt) && !sizeSel.querySelector('option[value="' + pt + '"]')) sizeSel.append(W.h('option', { value: pt, text: pt }));
      sizeSel.value = pt;
    }, 60);
  }

  /* ───── الإدراج ───── */
  async function downscaleImage(dataURL, maxDim) {
    const img = await W.loadImage(dataURL);
    const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
    if (scale >= 1 && /^data:image\/(png|jpeg|gif)/.test(dataURL)) return dataURL;
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * scale); c.height = Math.round(img.naturalHeight * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return /^data:image\/png/.test(dataURL) ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.9);
  }
  async function insertImage(files) {
    files = files || await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'] }], multiple: true, as: 'dataurl' });
    for (const f of files) {
      const url = await downscaleImage(f.data, 1800);
      exec('insertHTML', '<img src="' + url + '" alt="">');
    }
  }
  async function insertTable() {
    const v = await W.form(W.t('satr.insertTable').replace('…', ''), [
      { key: 'rows', i18n: 'satr.rows', type: 'number', value: 3, min: 1, max: 100, row: 'a' },
      { key: 'cols', i18n: 'satr.cols', type: 'number', value: 3, min: 1, max: 20, row: 'a' },
      { key: 'header', i18n: 'satr.headerRow', type: 'checkbox', value: true }
    ]);
    if (!v) return;
    const rows = W.clamp(v.rows | 0, 1, 100), cols = W.clamp(v.cols | 0, 1, 20);
    let html = '<table data-new="1"><tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) html += (r === 0 && v.header ? '<th><br></th>' : '<td><br></td>');
      html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';
    exec('insertHTML', html);
    const t = editor.querySelector('table[data-new]');
    if (t) {
      t.removeAttribute('data-new');
      const cell = t.querySelector('th,td');
      const r = document.createRange(); r.selectNodeContents(cell); r.collapse(true);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      checkpoint();
    }
  }
  async function insertLink() {
    restoreSel();
    const sel = getSelection();
    const text = sel.toString();
    const v = await W.form(W.t('satr.insertLink').replace('…', ''), [
      { key: 'url', i18n: 'satr.url', value: 'https://', placeholder: 'https://' },
      { key: 'text', i18n: 'satr.linkText', value: text }
    ]);
    if (!v || !v.url || v.url === 'https://') return;
    let url = v.url.trim();
    if (!/^(https?:|mailto:|#)/i.test(url)) url = 'https://' + url;
    if (text && (!v.text || v.text === text)) exec('createLink', url);
    else exec('insertHTML', '<a href="' + W.escape(url) + '">' + W.escape(v.text || url) + '</a>');
  }
  function insertPageBreak() {
    exec('insertHTML', '<div class="page-break" contenteditable="false"></div><p><br></p>');
  }
  function insertDate() {
    const d = new Date();
    const s = d.toLocaleDateString(W.lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    exec('insertText', s);
  }
  function insertSymbol() {
    const syms = '﷽ ﷺ ﷻ ؏ ۞ ۩ « » ، ؛ ؟ ٪ ٫ ٬ ° ± × ÷ ≈ ≠ ≤ ≥ ∞ √ π ∑ € £ ¥ $ ₪ © ® ™ § ¶ † • … — – ← → ↑ ↓ ↔ ✓ ✗ ★ ☆ ♥ ☎ ✉ ☀ ☪ ♪'.split(' ');
    const grid = W.h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(10, 36px)', gap: '4px' } });
    let close;
    syms.forEach((s) => grid.append(W.h('button', { class: 'w-btn', type: 'button', style: { height: '36px', padding: '0', fontSize: '18px', fontFamily: 'Amiri, serif' }, text: s, onclick: () => { close(null); exec('insertText', s); } })));
    W.dialog({ title: W.t('satr.symbols'), body: grid, buttons: [], onOpen: (d, done) => { close = done; } });
  }

  /* ───── الجداول ───── */
  function tableMenu(e, cell) {
    const tr = cell.parentElement;
    const table = cell.closest('table');
    const idx = Array.from(tr.cells).indexOf(cell);
    const mkCell = (tag) => { const c = document.createElement(tag); c.innerHTML = '<br>'; return c; };
    W.contextMenu(e, [
      { i18n: 'cmd.cut', icon: 'cut', action: () => exec('cut') },
      { i18n: 'cmd.copy', icon: 'copy', action: () => exec('copy') },
      { i18n: 'cmd.paste', icon: 'paste', action: () => pasteText(true) },
      '-',
      { i18n: 'satr.tableRowAbove', action: () => structural(() => { const n = tr.cloneNode(false); Array.from(tr.cells).forEach(() => n.append(mkCell('td'))); tr.before(n); }) },
      { i18n: 'satr.tableRowBelow', action: () => structural(() => { const n = tr.cloneNode(false); Array.from(tr.cells).forEach(() => n.append(mkCell('td'))); tr.after(n); }) },
      { i18n: 'satr.tableColBefore', action: () => structural(() => { Array.from(table.rows).forEach((r) => { const ref = r.cells[idx]; const c = mkCell(ref && ref.tagName === 'TH' ? 'th' : 'td'); if (ref) ref.before(c); else r.append(c); }); }) },
      { i18n: 'satr.tableColAfter', action: () => structural(() => { Array.from(table.rows).forEach((r) => { const ref = r.cells[idx]; const c = mkCell(ref && ref.tagName === 'TH' ? 'th' : 'td'); if (ref) ref.after(c); else r.append(c); }); }) },
      '-',
      { i18n: 'satr.tableDelRow', action: () => structural(() => { if (table.rows.length > 1) tr.remove(); else table.remove(); }) },
      { i18n: 'satr.tableDelCol', action: () => structural(() => { Array.from(table.rows).forEach((r) => { if (r.cells[idx]) r.cells[idx].remove(); }); if (!table.rows[0] || !table.rows[0].cells.length) table.remove(); }) },
      { i18n: 'satr.tableDel', icon: 'trash', action: () => structural(() => { table.remove(); }) },
      '-',
      { i18n: 'satr.cellColor', icon: 'bucket', action: () => colorPopover(cell, (c) => { checkpoint(); cell.style.backgroundColor = c || ''; checkpoint(); changed(); }, { none: true, colors: ['#eef1f6', '#fff3cd', '#d1e7dd', '#cfe2ff', '#f8d7da', '#e2d9f3', '#ffe5d0', '#dee2e6'] }) }
    ]);
  }

  /* ───── الصور ───── */
  let selectedImg = null;
  function selectImage(img) {
    if (selectedImg) selectedImg.classList.remove('selected');
    selectedImg = img;
    if (!img) { imgbar.classList.add('hidden'); return; }
    img.classList.add('selected');
    imgbar.innerHTML = '';
    const b = (label, fn) => imgbar.append(W.h('button', { class: 'w-btn ghost', type: 'button', text: W.t(label), onclick: () => { checkpoint(); fn(); checkpoint(); changed(); positionImgbar(); } }));
    b('satr.imgSmall', () => { img.style.width = '25%'; });
    b('satr.imgMed', () => { img.style.width = '50%'; });
    b('satr.imgLarge', () => { img.style.width = '75%'; });
    b('satr.imgFull', () => { img.style.width = '100%'; });
    imgbar.append(W.h('div', { class: 'w-sep-v' }));
    const wrap = (cls) => () => { img.classList.remove('float-start', 'float-end', 'block-center'); if (cls) img.classList.add(cls); };
    b('satr.inline', wrap(null));
    b('satr.wrapStart', wrap('float-start'));
    b('satr.wrapCenter', wrap('block-center'));
    b('satr.wrapEnd', wrap('float-end'));
    imgbar.append(W.h('div', { class: 'w-sep-v' }));
    const del = W.iconButton('trash', 'cmd.delete', () => { checkpoint(); img.remove(); selectImage(null); checkpoint(); changed(); }, { cls: 'sm' });
    imgbar.append(del);
    imgbar.classList.remove('hidden');
    positionImgbar();
  }
  function positionImgbar() {
    if (!selectedImg) return;
    const r = selectedImg.getBoundingClientRect(), s = stage.getBoundingClientRect();
    imgbar.style.top = Math.max(6, r.top - s.top - imgbar.offsetHeight - 8) + 'px';
    imgbar.style.left = W.clamp(r.left - s.left + r.width / 2 - imgbar.offsetWidth / 2, 6, s.width - imgbar.offsetWidth - 6) + 'px';
  }
  scroll.addEventListener('scroll', () => positionImgbar());

  editor.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') { selectImage(e.target); const r = document.createRange(); r.selectNode(e.target); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    else selectImage(null);
    const a = e.target.closest('a');
    if (a && (e.ctrlKey || e.metaKey)) { e.preventDefault(); W.openExternal(a.href); }
  });
  editor.addEventListener('contextmenu', (e) => {
    const cell = e.target.closest('td,th');
    if (cell && editor.contains(cell)) { tableMenu(e, cell); return; }
    const a = e.target.closest('a');
    W.contextMenu(e, [
      { i18n: 'cmd.cut', icon: 'cut', action: () => exec('cut') },
      { i18n: 'cmd.copy', icon: 'copy', action: () => exec('copy') },
      { i18n: 'cmd.paste', icon: 'paste', action: () => pasteText(false) },
      { i18n: 'satr.pasteText', action: () => pasteText(true) },
      '-',
      a ? { i18n: 'satr.openLink', icon: 'external', action: () => W.openExternal(a.href) } : null,
      a ? { i18n: 'satr.removeLink', action: () => { const r = document.createRange(); r.selectNodeContents(a); const s = getSelection(); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange(); exec('unlink'); } } : null,
      { i18n: 'satr.insertLink', icon: 'link', action: () => insertLink() },
      { i18n: 'satr.clear', icon: 'clear-format', action: () => clearFormat() }
    ].filter(Boolean));
  });
  async function pasteText(plain) {
    try {
      const t = await navigator.clipboard.readText();
      if (plain) exec('insertText', t);
      else exec('paste');
    } catch (e) { exec('paste'); }
  }
  editor.addEventListener('paste', (e) => {
    // الصور الملصوقة ت\u064Fحو\u064E\u0651ل إلى بيانات مضم\u0651نة
    const items = Array.from(e.clipboardData ? e.clipboardData.items : []);
    const imgItem = items.find((i) => i.type.startsWith('image/'));
    if (imgItem && !e.clipboardData.getData('text/html')) {
      e.preventDefault();
      const f = imgItem.getAsFile();
      const rd = new FileReader();
      rd.onload = async () => { const url = await downscaleImage(rd.result, 1800); exec('insertHTML', '<img src="' + url + '" alt="">'); };
      rd.readAsDataURL(f);
    }
  });

  /* ───── البحث والاستبدال ───── */
  const find = { matches: [], index: -1, flexible: W.store.get('satr.flexFind', true) };
  const normChar = (c) => {
    if (/[\u064B-\u0652\u0670ـ]/.test(c)) return '';
    if (find.flexible) {
      if (/[أإآٱ]/.test(c)) return 'ا';
      if (c === 'ى') return 'ي';
      if (c === 'ة') return 'ه';
      if (c === 'ؤ') return 'و';
      if (c === 'ئ') return 'ي';
    }
    return c.toLowerCase();
  };
  function buildIndex() {
    const nodes = [];
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    let n, norm = '', map = [];
    while ((n = walker.nextNode())) {
      const t = n.nodeValue;
      for (let i = 0; i < t.length; i++) {
        const c = normChar(t[i]);
        for (const cc of c) { norm += cc; map.push({ node: n, offset: i }); }
      }
      nodes.push(n);
      norm += '\u0001'; map.push(null);
    }
    return { norm, map };
  }
  function searchAll(q) {
    find.matches = [];
    if (!q) return;
    const { norm, map } = buildIndex();
    const nq = Array.from(q).map(normChar).join('');
    if (!nq) return;
    let i = norm.indexOf(nq);
    while (i >= 0) {
      const a = map[i], b = map[i + nq.length - 1];
      if (a && b) {
        const r = document.createRange();
        r.setStart(a.node, a.offset);
        r.setEnd(b.node, b.offset + 1);
        find.matches.push(r);
      }
      i = norm.indexOf(nq, i + nq.length);
    }
  }
  function gotoMatch(delta) {
    if (!find.matches.length) { updateFindCount(); return; }
    find.index = (find.index + delta + find.matches.length) % find.matches.length;
    const r = find.matches[find.index];
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    savedRange = r.cloneRange();
    const rect = r.getBoundingClientRect(), sr = scroll.getBoundingClientRect();
    if (rect.top < sr.top + 40 || rect.bottom > sr.bottom - 40) scroll.scrollTop += rect.top - sr.top - sr.height / 3;
    updateFindCount();
  }
  let findInput, replInput, countEl;
  function updateFindCount() {
    if (!countEl) return;
    countEl.textContent = find.matches.length ? W.t('satr.matches', { i: find.index + 1, n: find.matches.length }) : (findInput.value ? W.t('satr.noMatch') : '');
  }
  function openFind(withReplace) {
    findBox.innerHTML = '';
    findInput = W.h('input', { class: 'w-input', placeholder: W.t('satr.find') });
    replInput = W.h('input', { class: 'w-input', placeholder: W.t('satr.replaceWith') });
    countEl = W.h('span', { class: 'count' });
    const flex = W.h('input', { type: 'checkbox' }); flex.checked = find.flexible;
    flex.addEventListener('change', () => { find.flexible = flex.checked; W.store.set('satr.flexFind', flex.checked); run(); });
    const run = () => { searchAll(findInput.value); find.index = -1; if (find.matches.length) gotoMatch(1); else updateFindCount(); };
    findInput.addEventListener('input', W.debounce(run, 150));
    findInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); gotoMatch(e.shiftKey ? -1 : 1); } if (e.key === 'Escape') closeFind(); });
    replInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeFind(); });
    findBox.append(
      W.h('div', { class: 'row' }, findInput, countEl,
        W.iconButton('chevron-up', 'ui.up', () => gotoMatch(-1), { cls: 'sm' }),
        W.iconButton('chevron-down', 'ui.down', () => gotoMatch(1), { cls: 'sm' }),
        W.iconButton('x', 'ui.close', () => closeFind(), { cls: 'sm' })),
      W.h('div', { class: 'row' }, replInput,
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('satr.replace'), onclick: () => replaceOne() }),
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('satr.replaceAll'), onclick: () => replaceAll() })),
      W.h('label', { class: 'w-check-row small' }, flex, W.h('span', { text: W.t('satr.flexible') }))
    );
    findBox.classList.remove('hidden');
    const s = getSelection().toString();
    if (s && s.length < 80) findInput.value = s;
    findInput.focus(); findInput.select();
    if (findInput.value) run();
    if (withReplace) setTimeout(() => replInput.focus(), 30);
  }
  function closeFind() { findBox.classList.add('hidden'); find.matches = []; editor.focus(); }
  function replaceOne() {
    if (!find.matches.length) return;
    if (find.index < 0) find.index = 0;
    const r = find.matches[find.index];
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    document.execCommand('insertText', false, replInput.value);
    changed();
    searchAll(findInput.value);
    find.index = Math.min(find.index, find.matches.length) - 1;
    gotoMatch(1);
  }
  function replaceAll() {
    searchAll(findInput.value);
    const n = find.matches.length;
    for (let i = find.matches.length - 1; i >= 0; i--) {
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(find.matches[i]);
      document.execCommand('insertText', false, replInput.value);
    }
    changed();
    searchAll(findInput.value); find.index = -1; updateFindCount();
    W.toast(W.t('satr.replacedN', { n }), 'success');
  }

  /* ───── الحالة والإحصاءات ───── */
  let status;
  function stats() {
    const text = editor.innerText || '';
    const words = (text.match(/[^\s\u200C\u200F\u200E]+/g) || []).length;
    const chars = text.replace(/\n/g, '').length;
    const noSpaces = text.replace(/\s/g, '').length;
    const paras = editor.querySelectorAll('p,h1,h2,h3,h4,li,blockquote,pre').length;
    const pageH = parseFloat(getComputedStyle(pageEl).getPropertyValue('--page-h')) || 1123;
    const pages = Math.max(1, Math.ceil(pageEl.scrollHeight / pageH) + editor.querySelectorAll('.page-break').length);
    return { words, chars, noSpaces, paras, pages };
  }
  const updateStatus = W.debounce(() => {
    if (!status) return;
    const s = stats();
    status.item('words').textContent = W.t('satr.words', { n: W.fmt(s.words) });
    status.item('chars').textContent = W.t('satr.chars', { n: W.fmt(s.chars) });
    status.item('pages').textContent = W.t('satr.pages', { n: s.pages });
    status.item('zoom').textContent = W.t('ui.zoom') + ': ' + Math.round(state.zoom * 100) + '%';
  }, 200);
  function showStats() {
    const s = stats();
    const rows = [['satr.words', W.fmt(s.words)], ['ui.count', ''], ['satr.chars', W.fmt(s.chars)], ['satr.charsNoSpaces', W.fmt(s.noSpaces)], ['satr.paragraphs', W.fmt(s.paras)], ['satr.pages', s.pages], ['satr.readTime', W.t('satr.minutes', { n: Math.max(1, Math.round(s.words / 200)) })]].filter((r) => r[1] !== '');
    const t = W.h('table', { style: { width: '100%', borderCollapse: 'collapse' } }, ...rows.map(([k, v]) => W.h('tr', null,
      W.h('td', { style: { padding: '6px 4px', borderBottom: '1px solid var(--border)' }, text: W.t(k, { n: '' }).replace(/[:：]?\s*$/, '').replace('{n}', '').trim() }),
      W.h('td', { style: { padding: '6px 4px', borderBottom: '1px solid var(--border)', textAlign: 'end', fontWeight: 700 }, text: v }))));
    W.dialog({ title: W.t('satr.stats'), body: W.h('div', { style: { minWidth: '320px' } }, t) });
  }

  /* ───── الوثيقة ───── */
  let draftTimer = null;
  function changed() {
    W.setDirty(true);
    updateStatus();
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 4000);
  }
  editor.addEventListener('input', () => {
    const loose = !editor.firstElementChild || Array.from(editor.childNodes).some((n) => (n.nodeType === 3 && n.nodeValue.trim()) || (n.nodeType === 1 && /^(SPAN|B|I|U|S|FONT|A|STRONG|EM|BR)$/.test(n.tagName)));
    if (loose) structural(() => {});
    else { typingCheckpoint(); changed(); }
  });
  function saveDraft() {
    if (!W.doc.dirty) return;
    W.store.set('satr.draft', { html: editor.innerHTML, page: state.page, name: W.doc.name, time: Date.now() });
  }
  function clearDraft() { W.store.remove('satr.draft'); }

  function setContent(html, page, meta) {
    meta = meta || {};
    editor.innerHTML = html && html.trim() ? html : '<p><br></p>';
    editor.querySelectorAll('.page-break').forEach((p) => p.setAttribute('contenteditable', 'false'));
    if (page) state.page = Object.assign({}, state.page, page, { margins: Object.assign({}, state.page.margins, page.margins || {}) });
    applyPage();
    normalize();
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: !!meta.dirty });
    state.format = meta.format || 'satr';
    selectImage(null);
    scroll.scrollTop = 0;
    updateStatus();
    const first = editor.querySelector('p,h1,h2,h3,li') || editor;
    const r = document.createRange(); r.selectNodeContents(first); r.collapse(true);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r); savedRange = r.cloneRange();
    editor.focus();
    resetHistory();
  }

  async function newDoc() {
    if (!(await W.confirmDiscard())) return;
    state.page = { size: 'A4', width: 210, height: 297, orientation: 'portrait', margins: { top: 25, right: 25, bottom: 25, left: 25 }, dir: W.lang === 'en' ? 'ltr' : 'rtl', pageNumbers: true, font: W.lang === 'en' ? 'Times New Roman' : DEFAULT_FONT, fontSize: W.lang === 'en' ? 12 : 14 };
    clearDraft();
    setContent('', null, {});
  }

  const OPEN_TYPES = [
    { name: { ar: 'مستندات', en: 'Documents' }, ext: ['satr', 'docx', 'html', 'htm', 'txt', 'md'] }
  ];
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const files = await W.files.open({ types: OPEN_TYPES, as: 'bytes' });
    if (files[0]) await loadFile(files[0]);
  }
  async function openPath(p) {
    if (!(await W.confirmDiscard())) return;
    try { await loadFile(await W.files.readPath(p, 'bytes')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); }
  }
  async function loadFile(f) {
    try {
      const ext = f.ext;
      const bytes = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
      if (ext === 'satr') {
        const j = JSON.parse(W.files.decodeText(bytes));
        setContent(W.sanitizeHTML(j.html, { keepEditable: true }), j.page, { name: f.name, path: f.path, format: 'satr' });
      } else if (ext === 'docx') {
        const r = await W.busy('ui.loading', () => WarshaDocx.toHTML(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)));
        const page = Object.assign({}, r.page);
        if (!page.dir) page.dir = /[؀-ۿ]/.test(r.html.replace(/<[^>]+>/g, '').slice(0, 400)) ? 'rtl' : 'ltr';
        setContent(W.sanitizeHTML(r.html), page, { name: f.name, path: f.path, format: 'docx' });
      } else if (ext === 'html' || ext === 'htm') {
        const doc = W.sanitizeHTML(W.files.decodeText(bytes), { full: true });
        const body = doc.querySelector('.satr-export') || doc.body;
        setContent(body.innerHTML, { dir: doc.documentElement.getAttribute('dir') || state.page.dir }, { name: f.name, path: f.path, format: 'html' });
      } else if (ext === 'md') {
        setContent(mdToHTML(W.files.decodeText(bytes)), null, { name: f.name, path: f.path, format: 'md' });
      } else {
        const text = W.files.decodeText(bytes);
        setContent(text.split(/\r?\n/).map((l) => '<p>' + (W.escape(l) || '<br>') + '</p>').join(''), { dir: /[؀-ۿ]/.test(text.slice(0, 300)) ? 'rtl' : 'ltr' }, { name: f.name, path: f.path, format: 'txt' });
      }
      if (f.path) W.recent.add(f.path, f.name);
      clearDraft();
    } catch (e) {
      console.error(e);
      W.toast(W.t('ui.openFailed') + ': ' + (e.message || ''), 'error', 4000);
    }
  }

  function baseName() { return W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'); }

  async function serialize(fmt) {
    selectImage(null);
    if (fmt === 'docx') return WarshaDocx.fromElement(editor, { page: state.page, zoom: state.zoom, title: baseName(), author: '', defaultFont: state.page.font, application: 'WARSHA Satr' });
    if (fmt === 'html') return exportHTML();
    if (fmt === 'txt') return editor.innerText;
    if (fmt === 'md') return htmlToMD(editor);
    return JSON.stringify({ app: 'satr', version: 1, page: state.page, html: editor.innerHTML });
  }
  const SAVE_TYPES = [
    { name: { ar: 'مستند سطر', en: 'Satr document' }, ext: ['satr'] },
    { name: { ar: 'مستند Word', en: 'Word document' }, ext: ['docx'] },
    { name: { ar: 'صفحة ويب', en: 'Web page' }, ext: ['html'] },
    { name: { ar: 'نص عادي', en: 'Plain text' }, ext: ['txt'] },
    { name: { ar: 'Markdown', en: 'Markdown' }, ext: ['md'] }
  ];
  async function save(as) {
    const canKeep = ['satr', 'docx', 'html'].includes(state.format);
    const useAs = as || !W.doc.path || !canKeep;
    const fmt = useAs ? 'satr' : state.format;
    if (useAs) {
      const res = await W.files.save({ data: await serialize('satr'), name: baseName() + '.satr', types: SAVE_TYPES });
      if (!res) return false;
      const ext = W.files.ext(res.name);
      if (ext && ext !== 'satr' && W.isElectron) {
        // اختار المستخدم صيغة أخرى في حوار الحفظ: نعيد الكتابة بالصيغة الصحيحة
        await W.files.save({ data: await serialize(ext), name: res.name, path: res.path });
      }
      W.setDoc({ name: res.name, path: res.path, dirty: false });
      state.format = ext || 'satr';
      if (res.path) W.recent.add(res.path, res.name);
    } else {
      const res = await W.files.save({ data: await serialize(fmt), name: W.doc.name, path: W.doc.path });
      if (!res) return false;
      W.setDirty(false);
    }
    clearDraft();
    W.toast(W.t('ui.saved'), 'success');
    return true;
  }
  async function exportAs(fmt) {
    if (fmt === 'pdf') { await W.exportPDF(printHTML(), baseName()); return; }
    const t = SAVE_TYPES.find((x) => x.ext[0] === fmt);
    const res = await W.files.save({ data: await serialize(fmt), name: baseName() + '.' + fmt, types: [t] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }
  function pageCSS() {
    const pg = state.page;
    const land = pg.orientation === 'landscape';
    const w = land ? pg.height : pg.width, h = land ? pg.width : pg.height;
    const m = pg.margins;
    return '@page{size:' + w + 'mm ' + h + 'mm;margin:' + m.top + 'mm ' + m.right + 'mm ' + m.bottom + 'mm ' + m.left + 'mm;' +
      (pg.pageNumbers ? '@bottom-center{content:counter(page);font-size:10pt;color:#666;font-family:sans-serif}' : '') + '}';
  }
  function printHTML() {
    const css = docCSS('.doc') + '\n.doc .page-break{break-after:page;height:0;border:0;margin:0}\n.doc{width:100%}';
    return W.printDocument('<div class="doc" dir="' + state.page.dir + '">' + editor.innerHTML.replace(/ class="selected"/g, '') + '</div>', { css: css, dir: state.page.dir, lang: state.page.dir === 'rtl' ? 'ar' : 'en' })
      .replace('@page{size:A4;margin:0}', pageCSS());
  }
  function exportHTML() {
    const css = docCSS('.satr-export') + '\nbody{margin:0;background:#eceff4}.satr-export{max-width:820px;margin:30px auto;background:#fff;padding:60px 70px;box-shadow:0 4px 20px rgba(0,0,0,.12)}\n.page-break{border-top:1px dashed #bbb;margin:30px 0;break-after:page}';
    return '<!doctype html>\n<html lang="' + (state.page.dir === 'rtl' ? 'ar' : 'en') + '" dir="' + state.page.dir + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="generator" content="WARSHA Satr">\n<title>' + W.escape(baseName()) + '</title>\n<style>\n' + css + '\n</style>\n</head>\n<body>\n<article class="satr-export" dir="' + state.page.dir + '">\n' + editor.innerHTML.replace(/ class="selected"/g, '') + '\n</article>\n</body>\n</html>\n';
  }

  /* ───── Markdown ───── */
  function mdInline(s) {
    return W.escape(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/__([^_]+)__/g, '<b>$1</b>')
      .replace(/\*([^*]+)\*/g, '<i>$1</i>')
      .replace(/~~([^~]+)~~/g, '<s>$1</s>')
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  }
  function mdToHTML(md) {
    const lines = md.replace(/\r/g, '').split('\n');
    let html = '', list = null, code = null, para = [];
    const flush = () => { if (para.length) { html += '<p>' + mdInline(para.join(' ')) + '</p>'; para = []; } };
    const closeList = () => { if (list) { html += '</' + list + '>'; list = null; } };
    for (const line of lines) {
      if (code !== null) { if (/^```/.test(line)) { html += '<pre>' + W.escape(code.join('\n')) + '</pre>'; code = null; } else code.push(line); continue; }
      if (/^```/.test(line)) { flush(); closeList(); code = []; continue; }
      let m;
      if ((m = /^(#{1,6})\s+(.*)$/.exec(line))) { flush(); closeList(); const n = Math.min(4, m[1].length); html += '<h' + n + '>' + mdInline(m[2]) + '</h' + n + '>'; continue; }
      if ((m = /^\s*[-*+]\s+(.*)$/.exec(line))) { flush(); if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; } html += '<li>' + mdInline(m[1]) + '</li>'; continue; }
      if ((m = /^\s*\d+[.)]\s+(.*)$/.exec(line))) { flush(); if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; } html += '<li>' + mdInline(m[1]) + '</li>'; continue; }
      if ((m = /^>\s?(.*)$/.exec(line))) { flush(); closeList(); html += '<blockquote>' + mdInline(m[1]) + '</blockquote>'; continue; }
      if (/^(-{3,}|\*{3,})$/.test(line.trim())) { flush(); closeList(); html += '<hr>'; continue; }
      if (!line.trim()) { flush(); closeList(); continue; }
      closeList();
      para.push(line.trim());
    }
    if (code !== null) html += '<pre>' + W.escape(code.join('\n')) + '</pre>';
    flush(); closeList();
    return html;
  }
  function htmlToMD(root) {
    const inl = (n) => Array.from(n.childNodes).map((c) => {
      if (c.nodeType === 3) return c.nodeValue.replace(/\s+/g, ' ');
      if (c.nodeType !== 1) return '';
      const t = c.tagName, cs = getComputedStyle(c), inner = inl(c);
      if (t === 'BR') return '  \n';
      if (t === 'A') return '[' + inner + '](' + c.getAttribute('href') + ')';
      if (t === 'IMG') return '![' + (c.alt || '') + '](' + (c.getAttribute('src').startsWith('data:') ? 'image' : c.getAttribute('src')) + ')';
      if (t === 'CODE') return '`' + inner + '`';
      let s = inner;
      if (parseInt(cs.fontWeight, 10) >= 600 && !/^H\d$/.test(c.closest('h1,h2,h3,h4,h5,h6') ? 'H1' : '')) s = '**' + s + '**';
      if (cs.fontStyle === 'italic' && t !== 'BLOCKQUOTE') s = '*' + s + '*';
      if ((cs.textDecorationLine || '').includes('line-through')) s = '~~' + s + '~~';
      return s;
    }).join('');
    const out = [];
    const walk = (container, depth) => Array.from(container.children).forEach((el) => {
      const t = el.tagName;
      if (/^H[1-6]$/.test(t)) out.push('#'.repeat(+t[1]) + ' ' + el.innerText.trim(), '');
      else if (t === 'UL' || t === 'OL') { Array.from(el.children).forEach((li, i) => { const sub = Array.from(li.children).filter((x) => x.tagName === 'UL' || x.tagName === 'OL'); const clone = li.cloneNode(true); clone.querySelectorAll('ul,ol').forEach((x) => x.remove()); out.push('  '.repeat(depth) + (t === 'OL' ? (i + 1) + '. ' : '- ') + clone.innerText.trim()); sub.forEach((s) => walk({ children: [s] }, depth + 1)); }); if (!depth) out.push(''); }
      else if (t === 'BLOCKQUOTE') out.push('> ' + el.innerText.trim(), '');
      else if (t === 'PRE') out.push('```', el.innerText, '```', '');
      else if (t === 'HR' || el.classList.contains('page-break')) out.push('---', '');
      else if (t === 'TABLE') {
        Array.from(el.rows).forEach((r, i) => { out.push('| ' + Array.from(r.cells).map((c) => c.innerText.trim().replace(/\|/g, '\\|')).join(' | ') + ' |'); if (i === 0) out.push('|' + Array.from(r.cells).map(() => ' --- |').join('')); });
        out.push('');
      } else out.push(inl(el).trim(), '');
    });
    walk(root, 0);
    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  /* ───── إعداد الصفحة ───── */
  async function pageSetup() {
    const pg = state.page;
    const v = await W.form(W.t('satr.pageSetup').replace('…', ''), [
      { key: 'size', i18n: 'satr.paperSize', type: 'select', value: pg.size, options: Object.keys(PAPER).map((k) => ({ value: k, label: k + ' (' + PAPER[k][0] + '×' + PAPER[k][1] + ')' })), row: 'a' },
      { key: 'orientation', i18n: 'satr.orientation', type: 'select', value: pg.orientation, options: [{ value: 'portrait', i18n: 'satr.portrait' }, { value: 'landscape', i18n: 'satr.landscape' }], row: 'a' },
      { type: 'heading', i18n: 'satr.margins' },
      { key: 'top', i18n: 'satr.mTop', type: 'number', value: pg.margins.top, min: 0, max: 80, row: 'm1' },
      { key: 'bottom', i18n: 'satr.mBottom', type: 'number', value: pg.margins.bottom, min: 0, max: 80, row: 'm1' },
      { key: 'right', i18n: 'satr.mRight', type: 'number', value: pg.margins.right, min: 0, max: 80, row: 'm2' },
      { key: 'left', i18n: 'satr.mLeft', type: 'number', value: pg.margins.left, min: 0, max: 80, row: 'm2' },
      { key: 'dir', i18n: 'satr.docDir', type: 'select', value: pg.dir, options: [{ value: 'rtl', i18n: 'ui.rtl' }, { value: 'ltr', i18n: 'ui.ltr' }] },
      { key: 'font', i18n: 'satr.defaultFont', type: 'select', value: pg.font, options: W.fonts.map((f) => ({ value: f.family, label: W.L(f.label) })), row: 'f' },
      { key: 'fontSize', i18n: 'ui.fontSize', type: 'number', value: pg.fontSize, min: 8, max: 40, step: 0.5, row: 'f' },
      { key: 'pageNumbers', i18n: 'satr.pageNumbers', type: 'checkbox', value: pg.pageNumbers }
    ]);
    if (!v) return;
    state.page = {
      size: v.size, width: PAPER[v.size][0], height: PAPER[v.size][1], orientation: v.orientation,
      margins: { top: v.top || 0, bottom: v.bottom || 0, right: v.right || 0, left: v.left || 0 },
      dir: v.dir, pageNumbers: v.pageNumbers, font: v.font, fontSize: v.fontSize || 14
    };
    applyPage();
    changed();
  }

  /* ───── التكبير ───── */
  function setZoom(z) {
    state.zoom = W.clamp(Math.round(z * 100) / 100, 0.3, 3);
    W.store.set('satr.zoom', state.zoom);
    pageEl.style.zoom = state.zoom;
    updateStatus();
    positionImgbar();
  }
  scroll.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom(state.zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1)); }
  }, { passive: false });

  /* ───── القوائم ───── */
  const menus = [
    {
      i18n: 'menu.file', items: [
        { i18n: 'cmd.new', icon: 'file-plus', shortcut: 'Mod+N', action: newDoc },
        { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
        { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
        '-',
        { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false) },
        { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true) },
        {
          i18n: 'cmd.export', icon: 'export', submenu: [
            { i18n: 'cmd.exportPDF', action: () => exportAs('pdf') },
            { i18n: 'satr.exportDocx', action: () => exportAs('docx') },
            { i18n: 'satr.exportHtml', action: () => exportAs('html') },
            { i18n: 'satr.exportTxt', action: () => exportAs('txt') },
            { i18n: 'satr.exportMd', action: () => exportAs('md') }
          ]
        },
        '-',
        { i18n: 'satr.pageSetup', icon: 'settings', action: pageSetup },
        { i18n: 'cmd.print', icon: 'print', shortcut: 'Mod+P', action: () => W.printHTML(printHTML()) },
        '-',
        { i18n: 'cmd.newWindow', action: () => W.native.newWindow(), hidden: () => !W.isElectron },
        { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
      ]
    },
    {
      i18n: 'menu.edit', items: [
        { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: () => undo(), global: true },
        { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: () => redo(), global: true },
        '-',
        { i18n: 'cmd.cut', icon: 'cut', shortcut: 'Mod+X', action: () => exec('cut'), noBind: true },
        { i18n: 'cmd.copy', icon: 'copy', shortcut: 'Mod+C', action: () => exec('copy'), noBind: true },
        { i18n: 'cmd.paste', icon: 'paste', shortcut: 'Mod+V', action: () => pasteText(false), noBind: true },
        { i18n: 'satr.pasteText', shortcut: 'Mod+Shift+V', action: () => pasteText(true), global: true },
        { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => exec('selectAll'), noBind: true },
        '-',
        { i18n: 'cmd.find', icon: 'search', shortcut: 'Mod+F', action: () => openFind(false), global: true },
        { i18n: 'cmd.replace', shortcut: 'Mod+H', action: () => openFind(true), global: true },
        '-',
        { i18n: 'satr.noTashkeel', action: removeTashkeel },
        { i18n: 'satr.case', submenu: [{ i18n: 'satr.upper', action: () => changeCase(true) }, { i18n: 'satr.lower', action: () => changeCase(false) }] }
      ]
    },
    {
      i18n: 'menu.insert', items: [
        { i18n: 'satr.insertImage', icon: 'image', action: () => insertImage() },
        { i18n: 'satr.insertTable', icon: 'table', action: insertTable },
        { i18n: 'satr.insertLink', icon: 'link', shortcut: 'Mod+K', action: insertLink, global: true },
        '-',
        { i18n: 'satr.pageBreak', icon: 'page-break', shortcut: 'Mod+Enter', action: insertPageBreak, global: true },
        { i18n: 'satr.hr', icon: 'minus', action: () => exec('insertHorizontalRule') },
        { i18n: 'satr.date', icon: 'calendar', action: insertDate },
        { i18n: 'satr.symbol', icon: 'star', action: insertSymbol }
      ]
    },
    {
      i18n: 'menu.format', items: [
        { i18n: 'ui.bold', icon: 'bold', shortcut: 'Mod+B', action: () => exec('bold'), global: true },
        { i18n: 'ui.italic', icon: 'italic', shortcut: 'Mod+I', action: () => exec('italic'), global: true },
        { i18n: 'ui.underline', icon: 'underline', shortcut: 'Mod+U', action: () => exec('underline'), global: true },
        { i18n: 'ui.strike', icon: 'strike', action: () => exec('strikeThrough') },
        { i18n: 'satr.sup', action: () => exec('superscript') },
        { i18n: 'satr.sub', action: () => exec('subscript') },
        '-',
        { i18n: 'satr.style.h1', shortcut: 'Mod+Alt+1', action: () => setBlock('h1'), global: true },
        { i18n: 'satr.style.h2', shortcut: 'Mod+Alt+2', action: () => setBlock('h2'), global: true },
        { i18n: 'satr.style.h3', shortcut: 'Mod+Alt+3', action: () => setBlock('h3'), global: true },
        { i18n: 'satr.style.p', shortcut: 'Mod+Alt+0', action: () => setBlock('p'), global: true },
        { i18n: 'satr.style.blockquote', action: () => setBlock('blockquote') },
        '-',
        { i18n: 'satr.bullets', icon: 'list', shortcut: 'Mod+Shift+8', action: () => toggleList('ul'), global: true },
        { i18n: 'satr.numbers', icon: 'list-ordered', shortcut: 'Mod+Shift+7', action: () => toggleList('ol'), global: true },
        { i18n: 'ui.rtl', icon: 'rtl', action: () => setDir('rtl') },
        { i18n: 'ui.ltr', icon: 'ltr', action: () => setDir('ltr') },
        '-',
        { i18n: 'satr.clear', icon: 'clear-format', shortcut: 'Mod+\\', action: clearFormat, global: true },
        { i18n: 'satr.pageSetup', icon: 'settings', action: pageSetup }
      ]
    },
    {
      i18n: 'menu.view', items: [
        { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => setZoom(state.zoom * 1.1), global: true },
        { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => setZoom(state.zoom / 1.1), global: true },
        { i18n: 'cmd.actualSize', shortcut: 'Mod+0', action: () => setZoom(1), global: true },
        '-',
        { i18n: 'satr.wordCount', icon: 'info', action: showStats },
        '-',
        ...W.stdViewItems()
      ]
    },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus });
  status = chrome.status;

  W.on('langchange', () => { renderStyleSel(); applyPage(); updateStatus(); });

  W.dropZone(stage, async (files) => {
    const imgs = files.filter((f) => /^(png|jpe?g|gif|webp|bmp|svg)$/.test(f.ext));
    const docs = files.filter((f) => ['satr', 'docx', 'html', 'htm', 'txt', 'md'].includes(f.ext));
    if (docs[0]) { if (await W.confirmDiscard()) await loadFile({ name: docs[0].name, path: docs[0].path, ext: docs[0].ext, data: new Uint8Array(docs[0].data) }); }
    else if (imgs.length) {
      for (const f of imgs) {
        const url = 'data:' + W.mime(f.ext) + ';base64,' + W.b64.encode(new Uint8Array(f.data));
        exec('insertHTML', '<img src="' + (await downscaleImage(url, 1800)) + '" alt="">');
      }
    }
  });
  W.onExternalFile((f) => loadFile(f), 'bytes');

  /* ───── البداية ───── */
  document.execCommand('defaultParagraphSeparator', false, 'p');
  setContent('', null, {});
  state.page.dir = W.lang === 'en' ? 'ltr' : 'rtl';
  applyPage();
  const draft = W.store.get('satr.draft', null);
  if (draft && draft.html && draft.html.replace(/<[^>]+>/g, '').trim()) {
    setTimeout(async () => {
      const time = new Date(draft.time).toLocaleString(W.lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB');
      const ok = await W.confirm(W.t('satr.draftFound', { time }), { ok: W.t('satr.restore'), cancel: W.t('satr.draftDiscard') });
      if (ok) { setContent(draft.html, draft.page, { name: draft.name, dirty: true }); }
      else clearDraft();
    }, 300);
  }

  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const before = editor.innerHTML;
      editor.innerHTML = '<h1>عنوان تجريبي</h1><p>نص <b>عريض</b> و English mixed</p><ul><li>أ</li><li>ب</li></ul><table><tbody><tr><td>1</td><td>2</td></tr></tbody></table>';
      const bytes = await WarshaDocx.fromElement(editor, { page: state.page });
      const back = await WarshaDocx.toHTML(bytes.buffer);
      if (!/عنوان تجريبي/.test(back.html)) errors.push('docx roundtrip lost heading');
      if (!/<table/.test(back.html)) errors.push('docx roundtrip lost table');
      if (!/<ul/.test(back.html)) errors.push('docx roundtrip lost list');
      const md = htmlToMD(editor);
      if (!/^# عنوان تجريبي/m.test(md)) errors.push('markdown export');
      editor.innerHTML = before;
    } catch (e) { errors.push(String(e && e.stack || e)); }
    return { errors };
  };
})();
