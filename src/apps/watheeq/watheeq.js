/* وثيق Watheeq — عرض ملفات PDF ودمجها وتقسيمها وتوقيعها */
(function () {
  'use strict';

  W.init({
    id: 'watheeq',
    i18n: {
      ar: {
        'q.openPdf': 'فتح PDF…', 'q.addFiles': 'إضافة ملفات…', 'q.merge': 'دمج ملفات PDF', 'q.imagesToPdf': 'تحويل صور إلى PDF', 'q.welcomeText': 'اعرض ملفات PDF وادمجها وقس\u0651مها ووق\u0651عها، مع دعم كامل للنص العربي في التعليقات والتوقيعات',
        'q.view': 'عرض', 'q.organize': 'ترتيب الصفحات', 'q.pages': 'الصفحات', 'q.tools': 'أدوات', 'q.select': 'تحديد', 'q.text': 'نص', 'q.sign': 'توقيع', 'q.image': 'صورة', 'q.mark': 'تظليل', 'q.date': 'التاريخ',
        'q.rotL': 'تدوير لليسار', 'q.rotR': 'تدوير لليمين', 'q.delPages': 'حذف الصفحات المحددة', 'q.insertBlank': 'إدراج صفحة فارغة', 'q.extract': 'استخراج الصفحات المحددة…', 'q.split': 'تقسيم الملف…',
        'q.watermark': 'علامة مائية…', 'q.pageNumbers': 'ترقيم الصفحات…', 'q.toImages': 'تصدير الصفحات كصور…', 'q.props': 'خصائص المستند…', 'q.removeWatermark': 'إزالة العلامة المائية', 'q.removeNumbers': 'إزالة الترقيم',
        'q.page': 'صفحة', 'q.of': 'من', 'q.find': 'بحث في المستند', 'q.noMatches': 'لا نتائج', 'q.matches': '{i} من {n}', 'q.password': 'هذا الملف محمي بكلمة مرور', 'q.passwordWrong': 'كلمة المرور غير صحيحة',
        'q.encrypted': 'الملف محمي ولا يمكن تعديله أو حفظه', 'q.signTitle': 'إنشاء توقيع', 'q.draw': 'رسم', 'q.type': 'كتابة', 'q.upload': 'صورة', 'q.clear': 'مسح', 'q.yourName': 'اكتب اسمك', 'q.saveSig': 'حفظ التوقيع لاستخدامه لاحق\u064Bا',
        'q.removeWhite': 'إزالة الخلفية البيضاء', 'q.chooseImage': 'اختيار صورة…', 'q.savedSigs': 'التواقيع المحفوظة', 'q.textTitle': 'تعليق نصي', 'q.content': 'النص', 'q.color': 'اللون', 'q.size': 'الحجم', 'q.bold': 'عريض', 'q.opacity': 'الشفافية',
        'q.wmText': 'نص العلامة', 'q.angle': 'الزاوية', 'q.position': 'الموضع', 'q.format': 'الصيغة', 'q.startAt': 'البدء من', 'q.digits': 'الأرقام', 'q.arabicDigits': 'عربية (١٢٣)', 'q.latinDigits': 'لاتينية (123)',
        'q.pos.bc': 'أسفل الوسط', 'q.pos.bs': 'أسفل البداية', 'q.pos.be': 'أسفل النهاية', 'q.pos.tc': 'أعلى الوسط', 'q.splitMode': 'طريقة التقسيم', 'q.byRanges': 'حسب النطاقات', 'q.everyN': 'كل عدد من الصفحات', 'q.ranges': 'النطاقات (مثال: 1-3، 5، 6-9)', 'q.n': 'عدد الصفحات في كل ملف',
        'q.badRanges': 'النطاقات غير صالحة', 'q.title': 'العنوان', 'q.author': 'المؤلف', 'q.subject': 'الموضوع', 'q.keywords': 'كلمات مفتاحية', 'q.nothingSelected': 'حدد صفحة واحدة على الأقل', 'q.saving': 'جار\u064D إنشاء ملف PDF…',
        'q.imgDpi': 'الدقة', 'q.markHint': 'اسحب على الصفحة لتظليل منطقة', 'q.placeHint': 'انقر على الصفحة لوضع العنصر', 'q.fitWidth': 'ملاءمة العرض', 'q.fitPage': 'ملاءمة الصفحة', 'q.pagesCount': '{n} صفحة',
        'q.thumbs': 'المصغرات', 'q.signHere': 'وق\u0651ع هنا', 'q.delete': 'حذف', 'q.duplicatePage': 'تكرار الصفحة', 'q.annot': 'العنصر المحدد', 'q.font': 'الخط', 'q.prev': 'الصفحة السابقة', 'q.next': 'الصفحة التالية'
      },
      en: {
        'q.openPdf': 'Open PDF…', 'q.addFiles': 'Add files…', 'q.merge': 'Merge PDFs', 'q.imagesToPdf': 'Images to PDF', 'q.welcomeText': 'View, merge, split and sign PDF files — with full Arabic support in comments and signatures',
        'q.view': 'View', 'q.organize': 'Organize pages', 'q.pages': 'Pages', 'q.tools': 'Tools', 'q.select': 'Select', 'q.text': 'Text', 'q.sign': 'Signature', 'q.image': 'Image', 'q.mark': 'Highlight', 'q.date': 'Date',
        'q.rotL': 'Rotate left', 'q.rotR': 'Rotate right', 'q.delPages': 'Delete selected pages', 'q.insertBlank': 'Insert blank page', 'q.extract': 'Extract selected pages…', 'q.split': 'Split file…',
        'q.watermark': 'Watermark…', 'q.pageNumbers': 'Page numbers…', 'q.toImages': 'Export pages as images…', 'q.props': 'Document properties…', 'q.removeWatermark': 'Remove watermark', 'q.removeNumbers': 'Remove page numbers',
        'q.page': 'Page', 'q.of': 'of', 'q.find': 'Find in document', 'q.noMatches': 'No results', 'q.matches': '{i} of {n}', 'q.password': 'This file is password protected', 'q.passwordWrong': 'Incorrect password',
        'q.encrypted': 'This file is protected and cannot be modified or saved', 'q.signTitle': 'Create signature', 'q.draw': 'Draw', 'q.type': 'Type', 'q.upload': 'Image', 'q.clear': 'Clear', 'q.yourName': 'Type your name', 'q.saveSig': 'Save this signature for later',
        'q.removeWhite': 'Remove white background', 'q.chooseImage': 'Choose image…', 'q.savedSigs': 'Saved signatures', 'q.textTitle': 'Text comment', 'q.content': 'Text', 'q.color': 'Color', 'q.size': 'Size', 'q.bold': 'Bold', 'q.opacity': 'Opacity',
        'q.wmText': 'Watermark text', 'q.angle': 'Angle', 'q.position': 'Position', 'q.format': 'Format', 'q.startAt': 'Start at', 'q.digits': 'Digits', 'q.arabicDigits': 'Arabic-Indic (١٢٣)', 'q.latinDigits': 'Western (123)',
        'q.pos.bc': 'Bottom center', 'q.pos.bs': 'Bottom start', 'q.pos.be': 'Bottom end', 'q.pos.tc': 'Top center', 'q.splitMode': 'Split mode', 'q.byRanges': 'By ranges', 'q.everyN': 'Every N pages', 'q.ranges': 'Ranges (e.g. 1-3, 5, 6-9)', 'q.n': 'Pages per file',
        'q.badRanges': 'Invalid ranges', 'q.title': 'Title', 'q.author': 'Author', 'q.subject': 'Subject', 'q.keywords': 'Keywords', 'q.nothingSelected': 'Select at least one page', 'q.saving': 'Creating PDF…',
        'q.imgDpi': 'Resolution', 'q.markHint': 'Drag on the page to highlight an area', 'q.placeHint': 'Click on the page to place the item', 'q.fitWidth': 'Fit width', 'q.fitPage': 'Fit page', 'q.pagesCount': '{n} pages',
        'q.thumbs': 'Thumbnails', 'q.signHere': 'Sign here', 'q.delete': 'Delete', 'q.duplicatePage': 'Duplicate page', 'q.annot': 'Selected item', 'q.font': 'Font', 'q.prev': 'Previous page', 'q.next': 'Next page'
      }
    }
  });

  pdfjsLib.GlobalWorkerOptions.workerSrc = '../../shared/vendor/pdf.worker.min.js';
  const { PDFDocument, degrees, rgb, BlendMode } = PDFLib;
  const ARABIC = /[؀-ۿ]/;
  const A4 = [595.28, 841.89];
  const PT = 96 / 72; // بكسل لكل نقطة عند تكبير 100%
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => W.uid('q');
  const $ = (s) => document.querySelector(s);

  let sources = {}; // id -> { id, name, kind, bytes, pdf, info: [{w,h,x,y,rotate}], encrypted, img }
  let doc = null; // { pages: [{ id, src, index, rot, annots: [] }], watermark, numbers, meta }
  let cur = 0;
  let selPages = new Set();
  let selAnnot = null; // { pid, aid }
  let tool = 'select';
  let mode = 'view';
  let zoom = 1;
  let pendingPlace = null; // عنصر ينتظر النقر لوضعه

  const viewer = $('#viewer'), thumbsEl = $('#thumbs'), sideEl = $('#side');

  /* ═══════════ المصادر ═══════════ */
  async function loadPDFSource(name, bytes) {
    const id = 's' + Math.random().toString(36).slice(2, 9);
    let password = null;
    const task = pdfjsLib.getDocument({ data: bytes.slice(0), isEvalSupported: false, disableAutoFetch: true });
    task.onPassword = async (update, reason) => {
      const pw = await W.prompt(reason === 2 ? W.t('q.passwordWrong') : W.t('q.password'), '', { title: name });
      if (pw == null) { task.destroy(); return; }
      password = pw;
      update(pw);
    };
    const pdf = await task.promise;
    const info = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const p = await pdf.getPage(i);
      const v = p.view;
      info.push({ x: v[0], y: v[1], w: v[2] - v[0], h: v[3] - v[1], rotate: p.rotate || 0 });
    }
    sources[id] = { id, name, kind: 'pdf', bytes, pdf, info, encrypted: !!password, password };
    return sources[id];
  }
  async function loadImageSource(name, dataURL) {
    const id = 's' + Math.random().toString(36).slice(2, 9);
    const img = await W.loadImage(dataURL);
    const land = img.naturalWidth > img.naturalHeight;
    const w = land ? A4[1] : A4[0], h = land ? A4[0] : A4[1];
    sources[id] = { id, name, kind: 'image', img, dataURL, info: [{ x: 0, y: 0, w, h, rotate: 0 }] };
    return sources[id];
  }
  function blankSource(w, h) {
    const key = 'blank-' + Math.round(w) + 'x' + Math.round(h);
    if (!sources[key]) sources[key] = { id: key, name: 'blank', kind: 'blank', info: [{ x: 0, y: 0, w, h, rotate: 0 }] };
    return sources[key];
  }
  const infoOf = (p) => sources[p.src].info[p.index];
  const totalRot = (p) => (infoOf(p).rotate + p.rot + 360) % 360;
  function viewSize(p) { const i = infoOf(p); return totalRot(p) % 180 ? { w: i.h, h: i.w } : { w: i.w, h: i.h }; }
  function imageFit(src, w, h) {
    const m = 20, iw = src.img.naturalWidth, ih = src.img.naturalHeight;
    const s = Math.min((w - 2 * m) / iw, (h - 2 * m) / ih);
    return { x: (w - iw * s) / 2, y: (h - ih * s) / 2, w: iw * s, h: ih * s };
  }

  async function addFiles(files, at) {
    const added = [];
    for (const f of files) {
      try {
        const bytes = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
        if (f.ext === 'pdf') {
          const s = await loadPDFSource(f.name, bytes);
          s.info.forEach((_, i) => added.push({ id: uid(), src: s.id, index: i, rot: 0, annots: [] }));
        } else if (/^(png|jpe?g|webp|gif|bmp)$/.test(f.ext)) {
          const s = await loadImageSource(f.name, 'data:' + W.mime(f.ext) + ';base64,' + W.b64.encode(bytes));
          added.push({ id: uid(), src: s.id, index: 0, rot: 0, annots: [] });
        }
      } catch (e) {
        console.error(e);
        if (!/PasswordException|destroyed/i.test(String(e && (e.name || e.message)))) W.toast(W.t('ui.openFailed') + ': ' + f.name, 'error');
      }
    }
    return added;
  }
  async function openFiles(files, meta) {
    if (!files.length) return;
    const pages = await W.busy('ui.processing', () => addFiles(files));
    if (!pages.length) return;
    Object.keys(sources).forEach((k) => { if (!pages.some((p) => p.src === k) && !k.startsWith('blank')) { if (sources[k].pdf) sources[k].pdf.destroy(); delete sources[k]; } });
    thumbCache.clear(); findState.texts = {};
    doc = { pages, watermark: null, numbers: null, meta: {} };
    const first = sources[pages[0].src];
    if (first.kind === 'pdf') {
      try { const m = await first.pdf.getMetadata(); doc.meta = { title: m.info.Title || '', author: m.info.Author || '', subject: m.info.Subject || '', keywords: m.info.Keywords || '' }; } catch (e) { /* تجاهل */ }
    }
    cur = 0; selPages = new Set(); selAnnot = null;
    hist.stack = []; hist.index = -1; commit(); W.setDirty(false);
    const single = files.length === 1 && files[0].ext === 'pdf';
    W.setDoc({ name: single ? files[0].name : null, path: single && meta && meta.path ? meta.path : null, dirty: false });
    if (single && meta && meta.path) W.recent.add(meta.path, files[0].name);
    welcome.hide();
    document.body.classList.add('has-doc');
    layout(); renderThumbs(); renderSide();
    requestAnimationFrame(() => { fitWidth(); });
  }
  async function appendFiles(files) {
    if (!doc) { await openFiles(files); return; }
    const pages = await W.busy('ui.processing', () => addFiles(files));
    if (!pages.length) return;
    const at = selPages.size ? Math.max(...doc.pages.map((p, i) => (selPages.has(p.id) ? i : -1))) + 1 : doc.pages.length;
    doc.pages.splice(at, 0, ...pages);
    commit(); layout(); renderThumbs(); goTo(at);
  }

  /* ═══════════ السجل ═══════════ */
  const hist = { stack: [], index: -1 };
  function commit() {
    const s = JSON.stringify(doc);
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1); hist.stack.push(s);
    if (hist.stack.length > 60) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
  }
  function restore(s) { doc = JSON.parse(s); selAnnot = null; selPages = new Set(); cur = Math.min(cur, doc.pages.length - 1); layout(); renderThumbs(); renderSide(); W.setDirty(true); }
  function undo() { if (hist.index > 0) { hist.index--; restore(hist.stack[hist.index]); } }
  function redo() { if (hist.index < hist.stack.length - 1) { hist.index++; restore(hist.stack[hist.index]); } }

  /* ═══════════ العرض ═══════════ */
  const scale = () => zoom * PT;
  const pageEls = new Map(); // pid -> { el, canvas, tl, al, renderedScale, task }
  let io = null;
  function layout() {
    viewer.innerHTML = '';
    pageEls.forEach((pe) => { if (pe.task) pe.task.cancel(); });
    pageEls.clear();
    if (io) io.disconnect();
    if (!doc) return;
    io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) renderPage(en.target.dataset.pid); }), { root: viewer, rootMargin: '600px 0px' });
    const s = scale();
    doc.pages.forEach((p, i) => {
      const vs = viewSize(p);
      const el = W.h('div', { class: 'q-page' + (mode === 'view' && i === cur ? ' current' : ''), 'data-pid': p.id, style: { width: vs.w * s + 'px', height: vs.h * s + 'px' } });
      const canvas = W.h('canvas', { class: 'q-canvas' });
      const tl = W.h('div', { class: 'textLayer' });
      const al = W.h('div', { class: 'q-annots' });
      el.append(canvas, tl, al);
      viewer.append(el);
      pageEls.set(p.id, { el, canvas, tl, al, renderedScale: 0, task: null });
      io.observe(el);
      renderAnnots(p);
    });
    updateStatus();
  }
  async function renderPage(pid) {
    const pe = pageEls.get(pid);
    const p = doc && doc.pages.find((x) => x.id === pid);
    if (!pe || !p) return;
    const s = scale();
    const dpr = window.devicePixelRatio || 1;
    const key = s + ':' + totalRot(p);
    if (pe.renderedScale === key) return;
    pe.renderedScale = key;
    const src = sources[p.src];
    const vs = viewSize(p);
    const c = document.createElement('canvas');
    c.className = 'q-canvas';
    c.width = Math.ceil(vs.w * s * dpr); c.height = Math.ceil(vs.h * s * dpr);
    const g = c.getContext('2d');
    if (src.kind === 'pdf') {
      try {
        const page = await src.pdf.getPage(p.index + 1);
        if (pe.task) pe.task.cancel();
        const vp = page.getViewport({ scale: s * dpr, rotation: totalRot(p) });
        pe.task = page.render({ canvasContext: g, viewport: vp });
        await pe.task.promise;
        pe.task = null;
        if (pe.renderedScale !== key) return;
        pe.canvas.replaceWith(c); pe.canvas = c;
        // طبقة النص للتحديد والنسخ والبحث
        const tvp = page.getViewport({ scale: s, rotation: totalRot(p) });
        const tl = W.h('div', { class: 'textLayer' });
        tl.style.setProperty('--scale-factor', s);
        pe.tl.replaceWith(tl); pe.tl = tl;
        await pdfjsLib.renderTextLayer({ textContentSource: page.streamTextContent(), container: tl, viewport: tvp, textDivs: [] }).promise;
        if (findState.q) highlightMatches(p.id);
      } catch (e) { if (!/cancel/i.test(String(e && (e.name || e.message)))) console.error(e); }
    } else {
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, c.width, c.height);
      if (src.kind === 'image') {
        const i = infoOf(p);
        const f = imageFit(src, i.w, i.h);
        g.save();
        g.scale(s * dpr, s * dpr);
        const r = totalRot(p);
        g.translate(vs.w / 2, vs.h / 2); g.rotate(r * Math.PI / 180); g.translate(-i.w / 2, -i.h / 2);
        g.drawImage(src.img, f.x, f.y, f.w, f.h);
        g.restore();
      }
      pe.canvas.replaceWith(c); pe.canvas = c;
    }
  }
  function rerenderVisible() {
    pageEls.forEach((pe, pid) => {
      const p = doc.pages.find((x) => x.id === pid);
      const vs = viewSize(p), s = scale();
      pe.el.style.width = vs.w * s + 'px'; pe.el.style.height = vs.h * s + 'px';
      pe.renderedScale = 0;
      renderAnnots(p);
      const r = pe.el.getBoundingClientRect(), vr = viewer.getBoundingClientRect();
      if (r.bottom > vr.top - 600 && r.top < vr.bottom + 600) renderPage(pid);
    });
  }
  const rerenderSoon = W.debounce(rerenderVisible, 120);
  function setZoom(z, keepCenter) {
    const old = zoom;
    zoom = W.clamp(z, 0.1, 6);
    const ratio = zoom / old;
    const st = viewer.scrollTop, sl = viewer.scrollLeft, h = viewer.clientHeight;
    pageEls.forEach((pe, pid) => { const p = doc.pages.find((x) => x.id === pid); const vs = viewSize(p); pe.el.style.width = vs.w * scale() + 'px'; pe.el.style.height = vs.h * scale() + 'px'; renderAnnots(p); });
    if (keepCenter !== false) { viewer.scrollTop = (st + h / 2) * ratio - h / 2; viewer.scrollLeft = sl * ratio; }
    rerenderSoon();
    updateStatus();
  }
  function fitWidth() {
    if (!doc) return;
    const maxW = Math.max(...doc.pages.map((p) => viewSize(p).w));
    setZoom((viewer.clientWidth - 64) / (maxW * PT), false);
    goTo(cur, true);
  }
  function fitPage() {
    if (!doc) return;
    const vs = viewSize(doc.pages[cur]);
    setZoom(Math.min((viewer.clientWidth - 64) / (vs.w * PT), (viewer.clientHeight - 40) / (vs.h * PT)), false);
    goTo(cur, true);
  }
  function goTo(i, instant) {
    if (!doc) return;
    cur = W.clamp(i, 0, doc.pages.length - 1);
    const pe = pageEls.get(doc.pages[cur].id);
    if (pe && mode === 'view') viewer.scrollTo({ top: pe.el.offsetTop - 16, behavior: instant ? 'auto' : 'smooth' });
    markCurrent();
  }
  function markCurrent() {
    pageEls.forEach((pe, pid) => pe.el.classList.toggle('current', doc.pages[cur] && pid === doc.pages[cur].id));
    thumbsEl.querySelectorAll('.q-thumb').forEach((t, i) => t.classList.toggle('current', i === cur));
    const t = thumbsEl.children[cur];
    if (t && t.scrollIntoViewIfNeeded) t.scrollIntoViewIfNeeded(false);
    updateStatus();
  }
  viewer.addEventListener('scroll', () => {
    if (!doc || mode !== 'view') return;
    const mid = viewer.scrollTop + viewer.clientHeight / 3;
    let best = cur;
    for (let i = 0; i < doc.pages.length; i++) { const pe = pageEls.get(doc.pages[i].id); if (pe && pe.el.offsetTop <= mid) best = i; else break; }
    if (best !== cur) { cur = best; markCurrent(); }
  });
  viewer.addEventListener('wheel', (e) => {
    if (!doc || !(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    setZoom(zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1));
  }, { passive: false });

  /* ═══════════ الإضافات على الصفحات (تعليقات، تواقيع، تظليل) ═══════════ */
  const FONT_STACK = (f) => W.fontStack(f || 'IBM Plex Sans Arabic');
  function renderAnnots(p) {
    const pe = pageEls.get(p.id);
    if (!pe) return;
    const s = scale();
    const al = pe.al;
    al.innerHTML = '';
    const vs = viewSize(p);
    const idx = doc.pages.indexOf(p);
    // العلامة المائية والترقيم (معاينة)
    if (doc.watermark) {
      const wm = doc.watermark;
      al.append(W.h('div', { class: 'q-wm', text: wm.text, style: { fontFamily: FONT_STACK(wm.font), fontSize: wm.size * s + 'px', color: wm.color, opacity: wm.opacity, transform: 'translate(-50%,-50%) rotate(' + (-wm.angle) + 'deg)', fontWeight: 700 } }));
    }
    if (doc.numbers) {
      const nb = numberBox(p, idx, vs);
      al.append(W.h('div', { class: 'q-num', text: nb.text, dir: 'auto', style: { left: nb.x * s + 'px', top: nb.y * s + 'px', width: nb.w * s + 'px', fontSize: doc.numbers.size * s + 'px', fontFamily: FONT_STACK(), textAlign: 'center', color: '#222' } }));
    }
    p.annots.forEach((a) => {
      const sel = selAnnot && selAnnot.aid === a.id;
      const box = W.h('div', { class: 'q-annot q-' + a.kind + (sel ? ' selected' : ''), 'data-aid': a.id, style: { left: a.x * s + 'px', top: a.y * s + 'px', width: a.w * s + 'px', height: a.h * s + 'px', opacity: a.opacity != null ? a.opacity : 1 } });
      if (a.kind === 'text') {
        box.append(W.h('div', { class: 'q-txt', dir: ARABIC.test(a.text) ? 'rtl' : 'ltr', text: a.text, style: { fontFamily: FONT_STACK(a.font), fontSize: a.size * s + 'px', color: a.color, fontWeight: a.bold ? 700 : 400, lineHeight: 1.35 } }));
      } else if (a.kind === 'sign' || a.kind === 'image') {
        box.append(W.h('img', { src: a.dataURL, alt: '', draggable: false }));
      } else if (a.kind === 'mark') {
        box.style.background = a.color;
        box.style.mixBlendMode = 'multiply';
      }
      if (sel) ['nw', 'ne', 'sw', 'se'].forEach((k) => box.append(W.h('div', { class: 'q-hd q-hd-' + k, 'data-h': k })));
      al.append(box);
    });
  }
  /** قياس صندوق النص بوحدة النقطة */
  function measureText(a) {
    const probe = W.h('div', { class: 'q-txt', dir: ARABIC.test(a.text) ? 'rtl' : 'ltr', text: a.text, style: { position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontFamily: FONT_STACK(a.font), fontSize: a.size + 'px', fontWeight: a.bold ? 700 : 400, lineHeight: 1.35 } });
    document.body.append(probe);
    const r = { w: Math.ceil(probe.offsetWidth + 2), h: Math.ceil(probe.offsetHeight) };
    probe.remove();
    return r;
  }
  function numberText(i) {
    const nb = doc.numbers;
    const n = i + (nb.start || 1), total = doc.pages.length + (nb.start || 1) - 1;
    let s = nb.format.replace('{n}', n).replace('{total}', total);
    if (nb.digits === 'arabic') s = s.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
    return s;
  }
  function numberBox(p, i, vs) {
    const nb = doc.numbers;
    const text = numberText(i);
    const w = Math.max(60, nb.size * text.length * 0.7), h = nb.size * 1.4, m = 24;
    const rtl = W.isRTL();
    let x = (vs.w - w) / 2;
    if (nb.pos === 'bs') x = rtl ? vs.w - w - m : m;
    if (nb.pos === 'be') x = rtl ? m : vs.w - w - m;
    const y = nb.pos === 'tc' ? m : vs.h - h - m;
    return { text, x, y, w, h };
  }
  const findAnnot = (aid) => { for (const p of doc.pages) { const a = p.annots.find((x) => x.id === aid); if (a) return { p, a }; } return null; };
  function selectAnnot(pid, aid) {
    const prev = selAnnot;
    selAnnot = aid ? { pid, aid } : null;
    if (prev) { const pp = doc.pages.find((x) => x.id === prev.pid); if (pp) renderAnnots(pp); }
    if (aid) renderAnnots(doc.pages.find((x) => x.id === pid));
    renderSide();
  }
  let drag = null;
  const pagePoint = (e, pe) => { const r = pe.el.getBoundingClientRect(); return { x: (e.clientX - r.left) / scale(), y: (e.clientY - r.top) / scale() }; };
  viewer.addEventListener('pointerdown', (e) => {
    if (!doc || mode !== 'view' || e.button !== 0) return;
    const pageEl = e.target.closest('.q-page');
    if (!pageEl) { if (selAnnot) selectAnnot(null, null); return; }
    const pid = pageEl.dataset.pid, pe = pageEls.get(pid), p = doc.pages.find((x) => x.id === pid);
    const idx = doc.pages.indexOf(p);
    if (idx !== cur) { cur = idx; markCurrent(); }
    const pt = pagePoint(e, pe);
    if (pendingPlace) {
      const a = pendingPlace; pendingPlace = null;
      a.x = W.clamp(pt.x - a.w / 2, 0, viewSize(p).w - a.w); a.y = W.clamp(pt.y - a.h / 2, 0, viewSize(p).h - a.h);
      p.annots.push(a);
      commit(); setTool('select'); selectAnnot(pid, a.id);
      return;
    }
    const annEl = e.target.closest('.q-annot');
    if (annEl) {
      e.preventDefault();
      const a = p.annots.find((x) => x.id === annEl.dataset.aid);
      if (selAnnot && selAnnot.aid === a.id) { /* keep */ } else selectAnnot(pid, a.id);
      const hd = e.target.closest('[data-h]');
      viewer.setPointerCapture(e.pointerId);
      drag = { mode: hd ? 'resize' : 'move', h: hd && hd.dataset.h, p, pe, a, start: pt, orig: clone(a), moved: false };
      return;
    }
    if (tool === 'mark') {
      e.preventDefault();
      viewer.setPointerCapture(e.pointerId);
      const a = { id: uid(), kind: 'mark', x: pt.x, y: pt.y, w: 1, h: 1, color: markColor, opacity: 0.45 };
      p.annots.push(a);
      drag = { mode: 'mark', p, pe, a, start: pt };
      return;
    }
    if (tool === 'text') {
      e.preventDefault();
      addTextAnnot(p, pt);
      return;
    }
    if (selAnnot) selectAnnot(null, null);
  });
  viewer.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const pt = pagePoint(e, drag.pe);
    const vs = viewSize(drag.p);
    const a = drag.a, o = drag.orig;
    const dx = pt.x - drag.start.x, dy = pt.y - drag.start.y;
    if (drag.mode === 'move') {
      if (!drag.moved && Math.hypot(dx, dy) * scale() < 3) return;
      drag.moved = true;
      a.x = W.clamp(o.x + dx, -o.w / 2, vs.w - o.w / 2); a.y = W.clamp(o.y + dy, -o.h / 2, vs.h - o.h / 2);
    } else if (drag.mode === 'resize') {
      const h = drag.h;
      let w = o.w + (h.includes('e') ? dx : -dx);
      let hh = a.kind === 'mark' ? o.h + (h.includes('s') ? dy : -dy) : w * o.h / o.w;
      w = Math.max(8, w); hh = Math.max(6, hh);
      a.w = w; a.h = hh;
      a.x = h.includes('w') ? o.x + o.w - w : o.x;
      a.y = h.includes('n') ? o.y + o.h - hh : o.y;
      if (a.kind === 'text') { a.size = Math.max(4, o.size * w / o.w); }
      drag.moved = true;
    } else if (drag.mode === 'mark') {
      a.x = Math.min(pt.x, drag.start.x); a.y = Math.min(pt.y, drag.start.y);
      a.w = Math.abs(pt.x - drag.start.x); a.h = Math.abs(pt.y - drag.start.y);
    }
    renderAnnots(drag.p);
  });
  viewer.addEventListener('pointerup', () => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.mode === 'mark') {
      if (d.a.w < 4 || d.a.h < 4) { d.p.annots = d.p.annots.filter((x) => x !== d.a); renderAnnots(d.p); return; }
      commit(); selectAnnot(d.p.id, d.a.id); return;
    }
    if (d.moved) { commit(); renderSide(); }
  });
  viewer.addEventListener('dblclick', (e) => {
    const annEl = e.target.closest('.q-annot.q-text');
    if (!annEl) return;
    const r = findAnnot(annEl.dataset.aid);
    if (r) editTextAnnot(r.p, r.a);
  });

  /* أدوات */
  let markColor = '#facc15';
  const TOOLS = [['select', 'pointer', 'V'], ['text', 'text', 'T'], ['sign', 'signature', 'S'], ['image', 'image', 'I'], ['mark', 'highlighter', 'H'], ['date', 'calendar', 'D']];
  function setTool(t) {
    if (!doc && t !== 'select') return;
    pendingPlace = null;
    tool = t;
    document.querySelectorAll('.q-tool').forEach((b) => b.classList.toggle('active', b.dataset.tool === t));
    viewer.dataset.tool = t;
    updateHint();
    if (t === 'sign') signFlow();
    else if (t === 'image') imageFlow();
    else if (t === 'date') dateFlow();
  }
  function updateHint() { hint.textContent = pendingPlace || tool === 'text' ? W.t('q.placeHint') : tool === 'mark' ? W.t('q.markHint') : ''; }
  function placeLater(a) {
    pendingPlace = a;
    hint.textContent = W.t('q.placeHint');
    // يمكن أيض\u064Bا وضعه مباشرة في منتصف الصفحة الحالية
  }
  function placeCenter(a) {
    const p = doc.pages[cur];
    const vs = viewSize(p);
    a.x = (vs.w - a.w) / 2; a.y = (vs.h - a.h) / 2;
    p.annots.push(a);
    commit(); setTool('select'); selectAnnot(p.id, a.id);
  }
  async function textDialog(a) {
    const area = W.h('textarea', { class: 'w-textarea', rows: 4, dir: 'auto', style: { width: '100%', fontSize: '16px' } });
    area.value = a.text || '';
    const font = W.fontSelect(a.font || 'IBM Plex Sans Arabic', () => {});
    const size = W.h('input', { class: 'w-input', type: 'number', value: a.size || 14, min: 4, max: 300 });
    const color = W.h('input', { type: 'color', class: 'w-color', value: a.color || '#1d4ed8' });
    const bold = W.h('input', { type: 'checkbox' }); bold.checked = !!a.bold;
    const body = W.h('div', { class: 'col', style: { minWidth: '380px' } }, W.h('label', { class: 'w-label-sm', text: W.t('q.content') }), area,
      W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('q.font') }), font), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('q.size') }), size)),
      W.h('div', { class: 'row' }, color, W.h('label', { class: 'w-check-row' }, bold, W.h('span', { text: W.t('q.bold') }))));
    const ok = await W.dialog({ title: W.t('q.textTitle'), body, buttons: [{ i18n: 'ui.cancel', value: false }, { i18n: 'ui.ok', value: true, primary: true }] });
    if (!ok || !area.value.trim()) return null;
    const r = { text: area.value.replace(/\s+$/, ''), font: font.value, size: W.clamp(parseFloat(size.value) || 14, 4, 300), color: color.value, bold: bold.checked };
    await W.ensureFont(r.font, r.bold ? 700 : 400);
    return r;
  }
  async function addTextAnnot(p, pt) {
    const v = await textDialog({ size: 14, color: '#1d4ed8' });
    if (!v) return;
    const m = measureText(v);
    const a = Object.assign({ id: uid(), kind: 'text', x: pt.x, y: pt.y - m.h / 2, w: m.w, h: m.h, opacity: 1 }, v);
    p.annots.push(a);
    commit(); setTool('select'); selectAnnot(p.id, a.id);
  }
  async function editTextAnnot(p, a) {
    const v = await textDialog(a);
    if (!v) return;
    Object.assign(a, v);
    const m = measureText(a);
    a.w = m.w; a.h = m.h;
    commit(); renderAnnots(p); renderSide();
  }
  async function dateFlow() {
    const d = new Date();
    const text = new Intl.DateTimeFormat(W.lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-arab' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
    const a = { id: uid(), kind: 'text', text, font: 'IBM Plex Sans Arabic', size: 14, color: '#111111', bold: false, opacity: 1 };
    Object.assign(a, measureText(a));
    placeLater(a);
  }
  async function imageFlow() {
    const f = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'webp'] }], as: 'dataurl' });
    if (!f[0]) { setTool('select'); return; }
    const img = await W.loadImage(f[0].data);
    const w = Math.min(220, img.naturalWidth * 0.75);
    placeLater({ id: uid(), kind: 'image', dataURL: await normalizeImage(f[0].data, img), x: 0, y: 0, w, h: w * img.naturalHeight / img.naturalWidth, opacity: 1 });
  }
  /** تحويل الصورة إلى PNG أو JPEG مناسب للتضمين في PDF */
  async function normalizeImage(dataURL, img) {
    if (/^data:image\/(png|jpeg)/.test(dataURL)) return dataURL;
    img = img || await W.loadImage(dataURL);
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/png');
  }

  /* التوقيع */
  const SIG_KEY = 'watheeq.signatures';
  const savedSigs = () => { try { return JSON.parse(localStorage.getItem(SIG_KEY) || '[]'); } catch (e) { return []; } };
  function trimCanvas(c) {
    const g = c.getContext('2d');
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let x1 = c.width, y1 = c.height, x2 = -1, y2 = -1;
    for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3] > 8) { if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y; }
    if (x2 < 0) return null;
    const pad = 6;
    x1 = Math.max(0, x1 - pad); y1 = Math.max(0, y1 - pad); x2 = Math.min(c.width - 1, x2 + pad); y2 = Math.min(c.height - 1, y2 + pad);
    const o = document.createElement('canvas'); o.width = x2 - x1 + 1; o.height = y2 - y1 + 1;
    o.getContext('2d').drawImage(c, x1, y1, o.width, o.height, 0, 0, o.width, o.height);
    return o;
  }
  async function signatureDialog() {
    let modeS = 'draw', color = '#0b1f5c', width = 3, imgData = null;
    const pad = W.h('canvas', { class: 'q-pad', width: 1000, height: 360 });
    const pg = pad.getContext('2d');
    let strokes = [], curStroke = null;
    const redraw = () => {
      pg.clearRect(0, 0, pad.width, pad.height);
      pg.lineCap = 'round'; pg.lineJoin = 'round';
      strokes.forEach((st) => {
        pg.strokeStyle = st.color; pg.lineWidth = st.width * 2;
        pg.beginPath();
        st.pts.forEach((q, i) => { if (!i) pg.moveTo(q.x, q.y); else { const pr = st.pts[i - 1]; pg.quadraticCurveTo(pr.x, pr.y, (pr.x + q.x) / 2, (pr.y + q.y) / 2); } });
        if (st.pts.length === 1) pg.lineTo(st.pts[0].x + 0.1, st.pts[0].y);
        pg.stroke();
      });
    };
    const padPt = (e) => { const r = pad.getBoundingClientRect(); return { x: (e.clientX - r.left) * pad.width / r.width, y: (e.clientY - r.top) * pad.height / r.height }; };
    pad.addEventListener('pointerdown', (e) => { pad.setPointerCapture(e.pointerId); curStroke = { color, width, pts: [padPt(e)] }; strokes.push(curStroke); redraw(); });
    pad.addEventListener('pointermove', (e) => { if (!curStroke) return; curStroke.pts.push(padPt(e)); redraw(); });
    pad.addEventListener('pointerup', () => { curStroke = null; });
    const nameIn = W.h('input', { class: 'w-input', value: '', placeholder: W.t('q.yourName'), dir: 'auto', style: { width: '100%' } });
    const SIG_FONTS = ['Aref Ruqaa', 'Amiri', 'Reem Kufi', 'El Messiri', 'Lalezar', 'Markazi Text'];
    let sigFont = SIG_FONTS[0];
    const fontRow = W.h('div', { class: 'q-sigfonts' });
    const renderFonts = () => {
      fontRow.innerHTML = '';
      SIG_FONTS.forEach((f) => {
        const b = W.h('button', { class: 'q-sigfont' + (f === sigFont ? ' active' : ''), type: 'button', text: nameIn.value || W.t('q.signHere'), style: { fontFamily: W.fontStack(f), color } });
        b.addEventListener('click', () => { sigFont = f; renderFonts(); });
        fontRow.append(b);
      });
    };
    nameIn.addEventListener('input', renderFonts);
    const imgPrev = W.h('div', { class: 'q-sigimg' });
    const removeWhite = W.h('input', { type: 'checkbox' }); removeWhite.checked = true;
    const chooseBtn = W.h('button', { class: 'w-btn', type: 'button', text: W.t('q.chooseImage') });
    chooseBtn.addEventListener('click', async () => {
      const f = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'webp'] }], as: 'dataurl' });
      if (!f[0]) return;
      imgData = f[0].data;
      imgPrev.innerHTML = ''; imgPrev.append(W.h('img', { src: imgData, alt: '' }));
    });
    const colors = W.h('div', { class: 'row' });
    ['#0b1f5c', '#111111', '#1d4ed8', '#b91c1c'].forEach((c) => {
      const b = W.h('button', { class: 'q-dot' + (c === color ? ' active' : ''), type: 'button', style: { background: c } });
      b.addEventListener('click', () => { color = c; colors.querySelectorAll('.q-dot').forEach((x) => x.classList.toggle('active', x === b)); strokes.forEach((st) => { st.color = c; }); redraw(); renderFonts(); });
      colors.append(b);
    });
    const panes = {
      draw: W.h('div', { class: 'col' }, pad, W.h('div', { class: 'row', style: { justifyContent: 'space-between' } }, colors,
        W.slider({ i18n: 'ui.strokeWidth', min: 1, max: 8, step: 0.5, value: width, onInput: (v) => { width = v; strokes.forEach((st) => { st.width = v; }); redraw(); } }),
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('q.clear'), onclick: () => { strokes = []; redraw(); } }))),
      type: W.h('div', { class: 'col' }, nameIn, fontRow),
      upload: W.h('div', { class: 'col' }, chooseBtn, imgPrev, W.h('label', { class: 'w-check-row' }, removeWhite, W.h('span', { text: W.t('q.removeWhite') })))
    };
    const paneBox = W.h('div', { class: 'q-signpane' });
    const showPane = () => { paneBox.innerHTML = ''; paneBox.append(panes[modeS]); if (modeS === 'type') { renderFonts(); setTimeout(() => nameIn.focus(), 30); } };
    const tabs = W.segmented([{ value: 'draw', i18n: 'q.draw' }, { value: 'type', i18n: 'q.type' }, { value: 'upload', i18n: 'q.upload' }], modeS, (v) => { modeS = v; showPane(); });
    const save = W.h('input', { type: 'checkbox' }); save.checked = true;
    const saved = savedSigs();
    let picked = null;
    const savedRow = saved.length ? W.h('div', { class: 'col' }, W.h('div', { class: 'w-label-sm', text: W.t('q.savedSigs') }), W.h('div', { class: 'q-saved' }, ...saved.map((s, i) => {
      const b = W.h('button', { class: 'q-savedsig', type: 'button' }, W.h('img', { src: s, alt: '' }));
      b.addEventListener('click', () => { picked = s; dlg.close && dlg.close(); document.querySelector('.w-dialog .w-btn.primary').click(); });
      b.addEventListener('contextmenu', (e) => { e.preventDefault(); const arr = savedSigs(); arr.splice(i, 1); localStorage.setItem(SIG_KEY, JSON.stringify(arr)); b.remove(); });
      return b;
    }))) : null;
    const body = W.h('div', { class: 'col q-signdlg' }, savedRow, tabs, paneBox, W.h('label', { class: 'w-check-row' }, save, W.h('span', { text: W.t('q.saveSig') })));
    showPane();
    const dlg = {};
    const ok = await W.dialog({ title: W.t('q.signTitle'), body, buttons: [{ i18n: 'ui.cancel', value: false }, { i18n: 'ui.ok', value: true, primary: true }] });
    if (!ok) return null;
    if (picked) return picked;
    let out = null;
    if (modeS === 'draw') { const t = trimCanvas(pad); out = t && t.toDataURL('image/png'); }
    else if (modeS === 'type') {
      const text = nameIn.value.trim();
      if (!text) return null;
      await W.ensureFont(sigFont, 400);
      const c = document.createElement('canvas'); c.width = 1400; c.height = 400;
      const g = c.getContext('2d');
      g.font = '160px ' + W.fontStack(sigFont); g.fillStyle = color; g.textBaseline = 'middle';
      g.direction = ARABIC.test(text) ? 'rtl' : 'ltr'; g.textAlign = 'center';
      g.fillText(text, 700, 200, 1360);
      const t = trimCanvas(c); out = t && t.toDataURL('image/png');
    } else if (imgData) {
      const img = await W.loadImage(imgData);
      const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext('2d'); g.drawImage(img, 0, 0);
      if (removeWhite.checked) {
        const d = g.getImageData(0, 0, c.width, c.height);
        for (let i = 0; i < d.data.length; i += 4) { const l = (d.data[i] + d.data[i + 1] + d.data[i + 2]) / 3; if (l > 225) d.data[i + 3] = 0; else if (l > 180) d.data[i + 3] = Math.round(d.data[i + 3] * (225 - l) / 45); }
        g.putImageData(d, 0, 0);
      }
      const t = trimCanvas(c); out = t && t.toDataURL('image/png');
    }
    if (out && save.checked) { const arr = savedSigs().filter((s) => s !== out); arr.unshift(out); localStorage.setItem(SIG_KEY, JSON.stringify(arr.slice(0, 6))); }
    return out;
  }
  async function signFlow() {
    const data = await signatureDialog();
    if (!data) { setTool('select'); return; }
    const img = await W.loadImage(data);
    const w = 160;
    placeLater({ id: uid(), kind: 'sign', dataURL: data, x: 0, y: 0, w, h: w * img.naturalHeight / img.naturalWidth, opacity: 1 });
  }

  /* ═══════════ الصفحات: مصغرات وترتيب ═══════════ */
  const thumbCache = new Map();
  async function thumbURL(p, width) {
    const key = p.src + ':' + p.index + ':' + totalRot(p) + ':' + width;
    if (thumbCache.has(key)) return thumbCache.get(key);
    const src = sources[p.src];
    const vs = viewSize(p);
    const s = width / vs.w;
    const c = document.createElement('canvas'); c.width = Math.round(vs.w * s); c.height = Math.round(vs.h * s);
    const g = c.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    if (src.kind === 'pdf') {
      const page = await src.pdf.getPage(p.index + 1);
      await page.render({ canvasContext: g, viewport: page.getViewport({ scale: s, rotation: totalRot(p) }) }).promise;
    } else if (src.kind === 'image') {
      const i = infoOf(p), f = imageFit(src, i.w, i.h);
      g.save(); g.scale(s, s); g.translate(vs.w / 2, vs.h / 2); g.rotate(totalRot(p) * Math.PI / 180); g.translate(-i.w / 2, -i.h / 2); g.drawImage(src.img, f.x, f.y, f.w, f.h); g.restore();
    }
    const url = c.toDataURL('image/jpeg', 0.8);
    thumbCache.set(key, url);
    return url;
  }
  let dragPid = null;
  function thumbItem(p, i, width) {
    const t = W.h('div', { class: 'q-thumb' + (i === cur ? ' current' : '') + (selPages.has(p.id) ? ' selected' : ''), draggable: 'true', 'data-pid': p.id });
    const img = W.h('img', { alt: '', style: { width: width + 'px', aspectRatio: viewSize(p).w + ' / ' + viewSize(p).h } });
    thumbURL(p, width * 2).then((u) => { img.src = u; }).catch(() => {});
    t.append(W.h('div', { class: 'q-timg' }, img, p.annots.length ? W.h('span', { class: 'q-tbadge', html: W.icon('pen') }) : null), W.h('span', { class: 'q-tnum', text: String(i + 1) }));
    t.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey) { if (selPages.has(p.id)) selPages.delete(p.id); else selPages.add(p.id); }
      else if (e.shiftKey && selPages.size) {
        const ids = doc.pages.map((x) => x.id);
        const last = ids.indexOf([...selPages].pop());
        const [a, b] = [Math.min(last, i), Math.max(last, i)];
        for (let k = a; k <= b; k++) selPages.add(ids[k]);
      } else { selPages = new Set([p.id]); if (mode === 'view') goTo(i); else cur = i; }
      refreshThumbSel(); renderSide();
    });
    t.addEventListener('dblclick', () => { if (mode === 'organize') { setMode('view'); goTo(i, true); } });
    t.addEventListener('contextmenu', (e) => { if (!selPages.has(p.id)) { selPages = new Set([p.id]); refreshThumbSel(); } W.contextMenu(e, pageMenu()); });
    t.addEventListener('dragstart', (e) => { dragPid = p.id; if (!selPages.has(p.id)) { selPages = new Set([p.id]); refreshThumbSel(); } e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', p.id); });
    t.addEventListener('dragover', (e) => { if (!dragPid) return; e.preventDefault(); t.classList.add('drop'); });
    t.addEventListener('dragleave', () => t.classList.remove('drop'));
    t.addEventListener('drop', (e) => {
      e.preventDefault(); t.classList.remove('drop');
      if (!dragPid) return;
      const moving = doc.pages.filter((x) => selPages.has(x.id));
      if (moving.includes(p)) { dragPid = null; return; }
      const rest = doc.pages.filter((x) => !selPages.has(x.id));
      const r = t.getBoundingClientRect();
      const horizontal = mode === 'organize';
      const after = horizontal ? (W.isRTL() ? e.clientX < r.left + r.width / 2 : e.clientX > r.left + r.width / 2) : e.clientY > r.top + r.height / 2;
      let at = rest.indexOf(p) + (after ? 1 : 0);
      rest.splice(at, 0, ...moving);
      doc.pages = rest;
      dragPid = null;
      commit(); layout(); renderThumbs();
    });
    t.addEventListener('dragend', () => { dragPid = null; });
    return t;
  }
  function refreshThumbSel() {
    document.querySelectorAll('.q-thumb').forEach((t) => t.classList.toggle('selected', selPages.has(t.dataset.pid)));
  }
  function renderThumbs() {
    thumbsEl.innerHTML = '';
    if (!doc) return;
    if (mode === 'organize') {
      viewer.innerHTML = '';
      const grid = W.h('div', { class: 'q-grid' });
      doc.pages.forEach((p, i) => grid.append(thumbItem(p, i, 150)));
      viewer.append(grid);
      return;
    }
    doc.pages.forEach((p, i) => thumbsEl.append(thumbItem(p, i, 120)));
  }
  function setMode(m) {
    mode = m;
    document.body.classList.toggle('q-organize', m === 'organize');
    modeSeg.set(m);
    if (m === 'view') { layout(); renderThumbs(); requestAnimationFrame(() => goTo(cur, true)); } else { if (io) io.disconnect(); pageEls.clear(); renderThumbs(); }
    renderSide();
  }
  const targetPages = () => (selPages.size ? doc.pages.filter((p) => selPages.has(p.id)) : [doc.pages[cur]]);
  function rotatePages(d) {
    if (!doc) return;
    targetPages().forEach((p) => {
      const old = viewSize(p);
      p.rot = (p.rot + d + 360) % 360;
      // تدوير التعليقات مع الصفحة
      p.annots.forEach((a) => {
        const cx = a.x + a.w / 2, cy = a.y + a.h / 2;
        let nx, ny;
        if (d === 90) { nx = old.h - cy; ny = cx; } else { nx = cy; ny = old.w - cx; }
        a.x = nx - a.w / 2; a.y = ny - a.h / 2;
      });
    });
    commit(); afterPagesChanged();
  }
  function deletePages() {
    if (!doc) return;
    const del = new Set(targetPages().map((p) => p.id));
    if (del.size >= doc.pages.length) { W.toast(W.t('q.nothingSelected'), 'warning'); return; }
    doc.pages = doc.pages.filter((p) => !del.has(p.id));
    selPages = new Set(); cur = Math.min(cur, doc.pages.length - 1);
    commit(); afterPagesChanged();
  }
  function insertBlank() {
    if (!doc) return;
    const ref = viewSize(doc.pages[cur]);
    const s = blankSource(ref.w, ref.h);
    doc.pages.splice(cur + 1, 0, { id: uid(), src: s.id, index: 0, rot: 0, annots: [] });
    cur++;
    commit(); afterPagesChanged();
  }
  function duplicatePages() {
    const list = targetPages();
    const at = doc.pages.indexOf(list[list.length - 1]) + 1;
    doc.pages.splice(at, 0, ...list.map((p) => Object.assign(clone(p), { id: uid(), annots: p.annots.map((a) => Object.assign(clone(a), { id: uid() })) })));
    commit(); afterPagesChanged();
  }
  function afterPagesChanged() {
    if (mode === 'view') { layout(); renderThumbs(); goTo(cur, true); } else renderThumbs();
    renderSide();
  }
  const pageMenu = () => [
    { i18n: 'q.rotL', icon: 'rotate-ccw', action: () => rotatePages(-90) },
    { i18n: 'q.rotR', icon: 'rotate-cw', action: () => rotatePages(90) },
    { i18n: 'q.duplicatePage', icon: 'duplicate', action: duplicatePages },
    { i18n: 'q.insertBlank', icon: 'file-plus', action: insertBlank },
    '-',
    { i18n: 'q.extract', icon: 'export', action: extractPages },
    { i18n: 'q.delPages', icon: 'trash', action: deletePages }
  ];

  /* ═══════════ إنشاء PDF ═══════════ */
  function mapPoint(vx, vy, r, box) {
    // من إحداثيات العرض (أعلى-يسار، بالنقاط) إلى إحداثيات PDF
    const Wd = box.width, H = box.height;
    let px, py;
    if (r === 0) { px = vx; py = H - vy; } else if (r === 90) { px = vy; py = vx; } else if (r === 180) { px = Wd - vx; py = vy; } else { px = Wd - vy; py = H - vx; }
    return { x: box.x + px, y: box.y + py };
  }
  /** رسم صورة على صفحة PDF بحيث تظهر مستقيمة في وضع العرض، مع دوران إضافي اختياري */
  function placeImage(page, image, cx, cy, w, h, r, box, extraAngle, opacity) {
    const c = mapPoint(cx, cy, r, box);
    const th = (r + (extraAngle || 0)) * Math.PI / 180;
    const u = { x: Math.cos(th), y: Math.sin(th) }, v = { x: -Math.sin(th), y: Math.cos(th) };
    page.drawImage(image, { x: c.x - (w / 2) * u.x - (h / 2) * v.x, y: c.y - (w / 2) * u.y - (h / 2) * v.y, width: w, height: h, rotate: degrees(r + (extraAngle || 0)), opacity: opacity == null ? 1 : opacity });
  }
  async function textPNG(t, opts) {
    // نرسم النص عبر Canvas لضمان تشكيل الحروف العربية بشكل صحيح
    const k = opts.k || 4;
    await W.ensureFont(opts.font || 'IBM Plex Sans Arabic', opts.bold ? 700 : 400);
    const lines = String(t).split('\n');
    const g0 = document.createElement('canvas').getContext('2d');
    const fontCss = (opts.bold ? '700 ' : '400 ') + (opts.size * k) + 'px ' + FONT_STACK(opts.font);
    g0.font = fontCss;
    const lh = opts.size * 1.35 * k;
    const w = Math.ceil(opts.w ? opts.w * k : Math.max(...lines.map((l) => g0.measureText(l).width)) + 4 * k);
    const h = Math.ceil(opts.h ? opts.h * k : lines.length * lh);
    const c = document.createElement('canvas'); c.width = Math.max(1, w); c.height = Math.max(1, h);
    const g = c.getContext('2d');
    g.font = fontCss; g.fillStyle = opts.color || '#000'; g.textBaseline = 'middle';
    const rtl = ARABIC.test(t);
    g.direction = rtl ? 'rtl' : 'ltr';
    g.textAlign = opts.align || (rtl ? 'right' : 'left');
    const x = g.textAlign === 'center' ? w / 2 : g.textAlign === 'right' ? w - k : k;
    lines.forEach((l, i) => g.fillText(l, x, i * lh + lh / 2));
    return { bytes: W.dataURLToBytes(c.toDataURL('image/png')), w: c.width / k, h: c.height / k };
  }
  const hexToRgb = (hex) => { const c = W.color.hexToRgb(hex); return rgb(c.r / 255, c.g / 255, c.b / 255); };
  async function buildPDF(pages) {
    const list = pages || doc.pages;
    const enc = list.find((p) => sources[p.src].encrypted);
    if (enc) throw new Error(W.t('q.encrypted'));
    const first = sources[list[0].src];
    const inPlace = first.kind === 'pdf' && list.length === first.info.length && list.every((p, i) => p.src === first.id && p.index === i);
    let out, targets = [];
    const libCache = {};
    const lib = async (id) => (libCache[id] = libCache[id] || await PDFDocument.load(sources[id].bytes, { ignoreEncryption: true, updateMetadata: false }));
    if (inPlace) {
      out = await PDFDocument.load(first.bytes, { ignoreEncryption: true, updateMetadata: false });
      targets = out.getPages();
    } else {
      out = await PDFDocument.create();
      for (const p of list) {
        const src = sources[p.src];
        if (src.kind === 'pdf') { const [cp] = await out.copyPages(await lib(src.id), [p.index]); out.addPage(cp); targets.push(cp); }
        else {
          const i = infoOf(p);
          const pg = out.addPage([i.w, i.h]);
          if (src.kind === 'image') {
            const f = imageFit(src, i.w, i.h);
            const isPng = /^data:image\/png/.test(src.dataURL);
            const data = await normalizeImage(src.dataURL, src.img);
            const im = isPng || /^data:image\/png/.test(data) ? await out.embedPng(W.dataURLToBytes(data)) : await out.embedJpg(W.dataURLToBytes(data));
            pg.drawImage(im, { x: f.x, y: i.h - f.y - f.h, width: f.w, height: f.h });
          }
          targets.push(pg);
        }
      }
    }
    const wmImg = doc.watermark ? await textPNG(doc.watermark.text, { font: doc.watermark.font, size: doc.watermark.size, color: doc.watermark.color, bold: true, k: 3 }) : null;
    const wmEmbed = wmImg ? await out.embedPng(wmImg.bytes) : null;
    for (let k = 0; k < list.length; k++) {
      const p = list[k], pg = targets[k];
      const i = infoOf(p);
      const r = totalRot(p);
      pg.setRotation(degrees(r));
      const cb = pg.getCropBox();
      const box = { x: cb.x, y: cb.y, width: cb.width, height: cb.height };
      const vs = viewSize(p);
      void i;
      if (wmEmbed) placeImage(pg, wmEmbed, vs.w / 2, vs.h / 2, wmImg.w, wmImg.h, r, box, doc.watermark.angle, doc.watermark.opacity);
      if (doc.numbers) {
        const nb = numberBox(p, doc.pages.indexOf(p) >= 0 ? doc.pages.indexOf(p) : k, vs);
        const t = await textPNG(nb.text, { size: doc.numbers.size, color: '#222222', w: nb.w, h: nb.h, align: 'center' });
        placeImage(pg, await out.embedPng(t.bytes), nb.x + nb.w / 2, nb.y + nb.h / 2, nb.w, nb.h, r, box);
      }
      for (const a of p.annots) {
        if (a.kind === 'mark') {
          const c = mapPoint(a.x + a.w / 2, a.y + a.h / 2, r, box);
          const th = r * Math.PI / 180;
          const u = { x: Math.cos(th), y: Math.sin(th) }, v = { x: -Math.sin(th), y: Math.cos(th) };
          pg.drawRectangle({ x: c.x - (a.w / 2) * u.x - (a.h / 2) * v.x, y: c.y - (a.w / 2) * u.y - (a.h / 2) * v.y, width: a.w, height: a.h, rotate: degrees(r), color: hexToRgb(a.color), opacity: a.opacity, blendMode: BlendMode.Multiply });
        } else if (a.kind === 'text') {
          const t = await textPNG(a.text, { font: a.font, size: a.size, color: a.color, bold: a.bold, w: a.w, h: a.h });
          placeImage(pg, await out.embedPng(t.bytes), a.x + a.w / 2, a.y + a.h / 2, a.w, a.h, r, box, 0, a.opacity);
        } else {
          const bytes = W.dataURLToBytes(a.dataURL);
          const im = /^data:image\/png/.test(a.dataURL) ? await out.embedPng(bytes) : await out.embedJpg(bytes);
          placeImage(pg, im, a.x + a.w / 2, a.y + a.h / 2, a.w, a.h, r, box, 0, a.opacity);
        }
      }
    }
    const m = doc.meta || {};
    if (m.title) out.setTitle(m.title, { showInWindowTitleBar: true });
    if (m.author) out.setAuthor(m.author);
    if (m.subject) out.setSubject(m.subject);
    if (m.keywords) out.setKeywords(String(m.keywords).split(/[,،]\s*/).filter(Boolean));
    out.setProducer('Watheeq (WARSHA) — ' + W.registry.developer.website);
    out.setCreator(W.L(W.app.name) + ' — ' + W.L(W.registry.developer.name));
    out.setModificationDate(new Date());
    return out.save();
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : (W.lang === 'ar' ? 'مستند' : 'document'));
  async function save(as) {
    if (!doc) return;
    let bytes;
    try { bytes = await W.busy('q.saving', () => buildPDF()); } catch (e) { console.error(e); W.toast(String(e.message || e), 'error'); return; }
    const res = await W.files.save({ data: bytes, name: baseName() + '.pdf', path: as ? null : W.doc.path, types: [{ name: { ar: 'مستند PDF', en: 'PDF document' }, ext: ['pdf'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }
  async function extractPages() {
    if (!doc) return;
    const list = doc.pages.filter((p) => selPages.has(p.id));
    if (!list.length) { W.toast(W.t('q.nothingSelected'), 'warning'); return; }
    try {
      const bytes = await W.busy('q.saving', () => buildPDF(list));
      const res = await W.files.save({ data: bytes, name: baseName() + '-' + (W.lang === 'ar' ? 'مستخرج' : 'extract') + '.pdf', types: [{ name: { ar: 'مستند PDF', en: 'PDF document' }, ext: ['pdf'] }] });
      if (res) W.toast(W.t('ui.exported'), 'success');
    } catch (e) { W.toast(String(e.message || e), 'error'); }
  }
  function parseRanges(str, n) {
    const out = [];
    const norm = String(str).replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x660).replace(/[،;]/g, ',').replace(/[–—]/g, '-');
    for (const part of norm.split(',').map((s) => s.trim()).filter(Boolean)) {
      const m = /^(\d+)\s*(?:-\s*(\d+))?$/.exec(part);
      if (!m) return null;
      const a = +m[1], b = m[2] ? +m[2] : a;
      if (a < 1 || b > n || a > b) return null;
      out.push([a - 1, b - 1]);
    }
    return out.length ? out : null;
  }
  async function splitFlow() {
    if (!doc) return;
    const n = doc.pages.length;
    const v = await W.form(W.t('q.split'), [
      { key: 'mode', i18n: 'q.splitMode', type: 'select', value: 'n', options: [{ value: 'n', label: W.t('q.everyN') }, { value: 'ranges', label: W.t('q.byRanges') }] },
      { key: 'n', i18n: 'q.n', type: 'number', value: 1, min: 1, max: n },
      { key: 'ranges', i18n: 'q.ranges', type: 'text', value: '1-' + Math.ceil(n / 2) + ', ' + (Math.ceil(n / 2) + 1) + '-' + n }
    ]);
    if (!v) return;
    let groups;
    if (v.mode === 'ranges') {
      const r = parseRanges(v.ranges, n);
      if (!r) { W.toast(W.t('q.badRanges'), 'error'); return; }
      groups = r.map(([a, b]) => doc.pages.slice(a, b + 1));
    } else {
      const k = W.clamp(Math.round(v.n) || 1, 1, n);
      groups = [];
      for (let i = 0; i < n; i += k) groups.push(doc.pages.slice(i, i + k));
    }
    try {
      const files = await W.busy('q.saving', async () => {
        const res = [];
        for (let i = 0; i < groups.length; i++) res.push({ name: baseName() + '-' + (i + 1) + '.pdf', data: await buildPDF(groups[i]) });
        return res;
      });
      const r = await W.files.saveMany(files);
      if (r) W.toast(W.t('ui.exported'), 'success');
    } catch (e) { W.toast(String(e.message || e), 'error'); }
  }
  async function renderBuiltPages(scaleV, fmt) {
    const bytes = await buildPDF();
    const pdf = await pdfjsLib.getDocument({ data: bytes, isEvalSupported: false }).promise;
    const out = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const vp = page.getViewport({ scale: scaleV });
      const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
      await page.render({ canvasContext: g, viewport: vp }).promise;
      out.push({ canvas: c, name: baseName() + '-' + i + '.' + fmt });
    }
    pdf.destroy();
    return out;
  }
  async function toImages() {
    if (!doc) return;
    const v = await W.form(W.t('q.toImages'), [
      { key: 'fmt', i18n: 'q.format', type: 'select', value: 'png', options: [{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }] },
      { key: 'dpi', i18n: 'q.imgDpi', type: 'select', value: '150', options: [{ value: '72', label: '72 dpi' }, { value: '150', label: '150 dpi' }, { value: '300', label: '300 dpi' }] }
    ]);
    if (!v) return;
    try {
      const files = await W.busy('ui.processing', async () => {
        const pages = await renderBuiltPages(parseInt(v.dpi, 10) / 72, v.fmt);
        const res = [];
        for (const p of pages) res.push({ name: p.name, data: await W.canvasToBytes(p.canvas, v.fmt === 'jpg' ? 'image/jpeg' : 'image/png', 0.92) });
        return res;
      });
      const r = await W.files.saveMany(files);
      if (r) W.toast(W.t('ui.exported'), 'success');
    } catch (e) { W.toast(String(e.message || e), 'error'); }
  }
  async function printDoc() {
    if (!doc) return;
    try {
      const pages = await W.busy('ui.processing', () => renderBuiltPages(150 / 72, 'png'));
      const body = pages.map((p) => '<div class="pg"><img src="' + p.canvas.toDataURL('image/jpeg', 0.92) + '"></div>').join('');
      W.printHTML(W.printDocument(body, { pageSize: 'auto', css: '.pg{page-break-after:always;break-after:page;display:flex;align-items:center;justify-content:center;height:100vh}.pg:last-child{page-break-after:auto}.pg img{max-width:100%;max-height:100vh}' }));
    } catch (e) { W.toast(String(e.message || e), 'error'); }
  }
  async function watermarkFlow() {
    if (!doc) return;
    const wm = doc.watermark || { text: W.lang === 'ar' ? 'سري' : 'CONFIDENTIAL', font: 'Cairo', size: 72, color: '#ef4444', opacity: 0.18, angle: 45 };
    const v = await W.form(W.t('q.watermark'), [
      { key: 'text', i18n: 'q.wmText', type: 'text', value: wm.text },
      { key: 'font', i18n: 'q.font', type: 'select', value: wm.font, options: W.fonts.map((f) => ({ value: f.family, label: W.L(f.label) })) },
      { key: 'size', i18n: 'q.size', type: 'number', value: wm.size, min: 8, max: 300, row: 'a' }, { key: 'angle', i18n: 'q.angle', type: 'number', value: wm.angle, min: -90, max: 90, row: 'a' },
      { key: 'color', i18n: 'q.color', type: 'color', value: wm.color, row: 'b' }, { key: 'opacity', i18n: 'q.opacity', type: 'number', value: Math.round(wm.opacity * 100), min: 5, max: 100, row: 'b' }
    ]);
    if (!v || !String(v.text).trim()) return;
    await W.ensureFont(v.font, 700);
    doc.watermark = { text: String(v.text).trim(), font: v.font, size: W.clamp(+v.size || 72, 8, 300), angle: W.clamp(+v.angle || 0, -90, 90), color: v.color, opacity: W.clamp(+v.opacity || 18, 5, 100) / 100 };
    commit(); doc.pages.forEach(renderAnnots); renderSide();
  }
  async function numbersFlow() {
    if (!doc) return;
    const nb = doc.numbers || { format: W.lang === 'ar' ? 'صفحة {n} من {total}' : 'Page {n} of {total}', pos: 'bc', size: 11, start: 1, digits: W.lang === 'ar' ? 'arabic' : 'latin' };
    const v = await W.form(W.t('q.pageNumbers'), [
      { key: 'format', i18n: 'q.format', type: 'select', value: nb.format, options: ['{n}', '{n} / {total}', '- {n} -', 'صفحة {n} من {total}', 'Page {n} of {total}'].map((f) => ({ value: f, label: f.replace('{n}', '1').replace('{total}', '10') })) },
      { key: 'pos', i18n: 'q.position', type: 'select', value: nb.pos, options: ['bc', 'bs', 'be', 'tc'].map((p) => ({ value: p, label: W.t('q.pos.' + p) })) },
      { key: 'digits', i18n: 'q.digits', type: 'select', value: nb.digits, options: [{ value: 'arabic', label: W.t('q.arabicDigits') }, { value: 'latin', label: W.t('q.latinDigits') }] },
      { key: 'size', i18n: 'q.size', type: 'number', value: nb.size, min: 6, max: 48, row: 'a' }, { key: 'start', i18n: 'q.startAt', type: 'number', value: nb.start, min: 0, max: 9999, row: 'a' }
    ]);
    if (!v) return;
    doc.numbers = { format: v.format, pos: v.pos, digits: v.digits, size: W.clamp(+v.size || 11, 6, 48), start: Math.round(+v.start || 1) };
    commit(); doc.pages.forEach(renderAnnots); renderSide();
  }
  async function propsFlow() {
    if (!doc) return;
    const m = doc.meta || {};
    const v = await W.form(W.t('q.props'), [
      { key: 'title', i18n: 'q.title', type: 'text', value: m.title || '' }, { key: 'author', i18n: 'q.author', type: 'text', value: m.author || '' },
      { key: 'subject', i18n: 'q.subject', type: 'text', value: m.subject || '' }, { key: 'keywords', i18n: 'q.keywords', type: 'text', value: m.keywords || '' }
    ]);
    if (!v) return;
    doc.meta = v; commit();
  }

  /* ═══════════ البحث ═══════════ */
  const findState = { q: '', hits: [], i: -1, texts: {} };
  const normAr = (s) => String(s).replace(/[\u064B-\u0652ـ]/g, '').replace(/[آأإ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').toLowerCase();
  async function pageText(p) {
    const key = p.src + ':' + p.index;
    if (findState.texts[key] != null) return findState.texts[key];
    const src = sources[p.src];
    let t = '';
    if (src.kind === 'pdf') { const page = await src.pdf.getPage(p.index + 1); const tc = await page.getTextContent(); t = tc.items.map((it) => it.str).join(' '); }
    findState.texts[key] = normAr(t);
    return findState.texts[key];
  }
  async function runFind(q) {
    findState.q = normAr(q.trim());
    findState.hits = []; findState.i = -1;
    document.querySelectorAll('.textLayer .q-hit').forEach((s) => s.classList.remove('q-hit'));
    if (!findState.q || !doc) { findCount.textContent = ''; return; }
    const rev = findState.q.split('').reverse().join('');
    for (let i = 0; i < doc.pages.length; i++) {
      const t = await pageText(doc.pages[i]);
      if (t.includes(findState.q) || (ARABIC.test(findState.q) && t.includes(rev))) findState.hits.push(i);
    }
    findNext(1);
  }
  function highlightMatches(pid) {
    const pe = pageEls.get(pid);
    if (!pe || !findState.q) return;
    const words = findState.q.split(/\s+/).filter(Boolean);
    pe.tl.querySelectorAll('span').forEach((s) => { const t = normAr(s.textContent); s.classList.toggle('q-hit', words.some((w) => t.includes(w) || t.includes(w.split('').reverse().join('')))); });
  }
  function findNext(d) {
    if (!findState.hits.length) { findCount.textContent = findState.q ? W.t('q.noMatches') : ''; return; }
    findState.i = (findState.i + d + findState.hits.length) % findState.hits.length;
    const pi = findState.hits[findState.i];
    findCount.textContent = W.t('q.matches', { i: findState.i + 1, n: findState.hits.length });
    if (mode !== 'view') setMode('view');
    goTo(pi);
    highlightMatches(doc.pages[pi].id);
  }

  /* ═══════════ اللوحة الجانبية ═══════════ */
  function renderSide() {
    sideEl.innerHTML = '';
    if (!doc) return;
    const section = (key, ...ch) => W.h('div', { class: 'w-panel' }, W.h('div', { class: 'w-panel-title', text: W.t(key) }), W.h('div', { class: 'w-panel-body' }, ...ch));
    const btn = (icon, key, fn, cls) => W.h('button', { class: 'w-btn q-sbtn ' + (cls || ''), type: 'button', onclick: fn }, W.iconEl(icon), W.h('span', { text: W.t(key) }));
    const r = selAnnot && findAnnot(selAnnot.aid);
    if (r) {
      const { p, a } = r;
      const items = [];
      if (a.kind === 'text') {
        items.push(W.h('div', { class: 'q-txtprev', dir: 'auto', text: a.text, style: { fontFamily: FONT_STACK(a.font), color: a.color } }), btn('text', 'q.textTitle', () => editTextAnnot(p, a)));
      }
      if (a.kind === 'mark') {
        const c = W.h('input', { type: 'color', class: 'w-color', value: a.color });
        c.addEventListener('input', () => { a.color = c.value; markColor = c.value; renderAnnots(p); });
        c.addEventListener('change', () => commit());
        items.push(W.h('div', { class: 'row' }, W.h('span', { class: 'small muted', text: W.t('q.color') }), c));
      }
      items.push(W.slider({ i18n: 'q.opacity', min: 5, max: 100, value: Math.round((a.opacity != null ? a.opacity : 1) * 100), onInput: (v) => { a.opacity = v / 100; renderAnnots(p); }, onChange: () => commit() }));
      items.push(btn('trash', 'q.delete', deleteAnnot, 'danger'));
      sideEl.append(section('q.annot', ...items));
    }
    sideEl.append(section('q.pages',
      W.h('div', { class: 'q-srow' }, W.iconButton('rotate-ccw', 'q.rotL', () => rotatePages(-90)), W.iconButton('rotate-cw', 'q.rotR', () => rotatePages(90)), W.iconButton('duplicate', 'q.duplicatePage', duplicatePages), W.iconButton('file-plus', 'q.insertBlank', insertBlank), W.iconButton('trash', 'q.delPages', deletePages)),
      btn('merge', 'q.addFiles', addFilesFlow), btn('export', 'q.extract', extractPages), btn('split', 'q.split', splitFlow)));
    sideEl.append(section('q.tools',
      btn('watermark', 'q.watermark', watermarkFlow), doc.watermark ? W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('q.removeWatermark'), onclick: () => { doc.watermark = null; commit(); doc.pages.forEach(renderAnnots); renderSide(); } }) : null,
      btn('list-ordered', 'q.pageNumbers', numbersFlow), doc.numbers ? W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('q.removeNumbers'), onclick: () => { doc.numbers = null; commit(); doc.pages.forEach(renderAnnots); renderSide(); } }) : null,
      btn('images', 'q.toImages', toImages), btn('info', 'q.props', propsFlow)));
  }
  function deleteAnnot() {
    const r = selAnnot && findAnnot(selAnnot.aid);
    if (!r) return;
    r.p.annots = r.p.annots.filter((x) => x !== r.a);
    selAnnot = null;
    commit(); renderAnnots(r.p); renderSide();
  }

  /* ═══════════ الملفات ═══════════ */
  const FILE_TYPES = [{ name: { ar: 'ملفات PDF والصور', en: 'PDF & images' }, ext: ['pdf', 'png', 'jpg', 'jpeg', 'webp'] }];
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: FILE_TYPES, multiple: true, as: 'bytes' });
    if (f.length) await openFiles(f, f.length === 1 ? { path: f[0].path } : null);
  }
  async function addFilesFlow() {
    const f = await W.files.open({ types: FILE_TYPES, multiple: true, as: 'bytes' });
    if (f.length) await appendFiles(f);
  }
  async function openPath(p) {
    if (!(await W.confirmDiscard())) return;
    try { const f = await W.files.readPath(p, 'bytes'); await openFiles([f], { path: p }); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); }
  }

  /* ═══════════ القوائم والواجهة ═══════════ */
  const needDoc = () => !doc;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'q.openPdf', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      { i18n: 'q.addFiles', icon: 'merge', shortcut: 'Mod+Shift+O', action: addFilesFlow },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), disabled: needDoc, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), disabled: needDoc, global: true },
      { i18n: 'q.extract', icon: 'export', action: extractPages, disabled: needDoc },
      { i18n: 'q.split', icon: 'split', action: splitFlow, disabled: needDoc },
      { i18n: 'q.toImages', icon: 'images', action: toImages, disabled: needDoc },
      { i18n: 'cmd.print', icon: 'print', shortcut: 'Mod+P', action: printDoc, disabled: needDoc },
      '-',
      { i18n: 'q.props', icon: 'info', action: propsFlow, disabled: needDoc },
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'q.find', icon: 'search', shortcut: 'Mod+F', action: () => { findInput.focus(); findInput.select(); } },
      { i18n: 'cmd.delete', icon: 'trash', shortcut: 'Delete', action: () => { if (selAnnot) deleteAnnot(); else if (selPages.size) deletePages(); } },
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => { if (doc) { selPages = new Set(doc.pages.map((p) => p.id)); refreshThumbSel(); } } }
    ] },
    { i18n: 'q.pages', items: [
      { i18n: 'q.rotL', icon: 'rotate-ccw', shortcut: 'Mod+Shift+L', action: () => rotatePages(-90), disabled: needDoc },
      { i18n: 'q.rotR', icon: 'rotate-cw', shortcut: 'Mod+Shift+R', action: () => rotatePages(90), disabled: needDoc },
      { i18n: 'q.duplicatePage', icon: 'duplicate', action: duplicatePages, disabled: needDoc },
      { i18n: 'q.insertBlank', icon: 'file-plus', action: insertBlank, disabled: needDoc },
      { i18n: 'q.delPages', icon: 'trash', action: deletePages, disabled: needDoc },
      '-',
      { i18n: 'q.watermark', icon: 'watermark', action: watermarkFlow, disabled: needDoc },
      { i18n: 'q.pageNumbers', icon: 'list-ordered', action: numbersFlow, disabled: needDoc }
    ] },
    { i18n: 'menu.view', items: [
      { i18n: 'q.view', icon: 'file', action: () => setMode('view'), checked: () => mode === 'view', disabled: needDoc },
      { i18n: 'q.organize', icon: 'grid', shortcut: 'Mod+G', action: () => doc && setMode(mode === 'view' ? 'organize' : 'view'), checked: () => mode === 'organize', disabled: needDoc },
      '-',
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => doc && setZoom(zoom * 1.2) },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => doc && setZoom(zoom / 1.2) },
      { i18n: 'q.fitWidth', icon: 'fit', shortcut: 'Mod+0', action: fitWidth },
      { i18n: 'q.fitPage', action: fitPage },
      { i18n: 'cmd.actualSize', shortcut: 'Mod+1', action: () => doc && setZoom(1) },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus, shortcuts: TOOLS.map((t) => ['q.' + t[0], t[2]]) });
  const status = chrome.status;
  TOOLS.forEach((t) => W.keys.bind(t[2], () => setTool(t[0])));
  W.keys.bind('Escape', () => { if (pendingPlace || tool !== 'select') setTool('select'); else if (selAnnot) selectAnnot(null, null); });
  W.keys.bind('Backspace', () => { if (selAnnot) deleteAnnot(); });
  W.keys.bind('Mod+ArrowDown', () => doc && goTo(doc.pages.length - 1));
  W.keys.bind('Mod+ArrowUp', () => doc && goTo(0));
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].forEach((k) => {
    W.keys.bind('Shift+' + k, () => nudge(k, 10));
  });
  function nudge(k, st) {
    const r = selAnnot && findAnnot(selAnnot.aid);
    if (!r) return;
    r.a.x += k === 'ArrowLeft' ? -st : k === 'ArrowRight' ? st : 0;
    r.a.y += k === 'ArrowUp' ? -st : k === 'ArrowDown' ? st : 0;
    renderAnnots(r.p); commitSoon();
  }
  const commitSoon = W.debounce(commit, 400);

  // شريط الأدوات
  const tb = $('#toolbar');
  const modeSeg = W.segmented([{ value: 'view', i18n: 'q.view' }, { value: 'organize', i18n: 'q.organize' }], 'view', (m) => { if (doc) setMode(m); else modeSeg.set('view'); });
  const pageInput = W.h('input', { class: 'w-input sm q-pagein', type: 'text', value: '' });
  pageInput.addEventListener('change', () => { const n = parseInt(String(pageInput.value).replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x660), 10); if (doc && n) goTo(n - 1); });
  const pageTotal = W.h('span', { class: 'small muted' });
  const findInput = W.h('input', { class: 'w-input sm q-find', type: 'search', placeholder: W.t('q.find'), dir: 'auto' });
  const findCount = W.h('span', { class: 'small muted q-findcount' });
  findInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); if (normAr(findInput.value.trim()) === findState.q && findState.hits.length) findNext(e.shiftKey ? -1 : 1); else runFind(findInput.value); } e.stopPropagation(); });
  findInput.addEventListener('search', () => { if (!findInput.value) runFind(''); });
  const toolBtns = TOOLS.map((t) => { const b = W.iconButton(t[1], 'q.' + t[0], () => setTool(t[0]), { shortcut: t[2], cls: 'q-tool' + (t[0] === 'select' ? ' active' : '') }); b.dataset.tool = t[0]; return b; });
  const markColors = W.h('div', { class: 'q-markcolors' });
  ['#facc15', '#4ade80', '#60a5fa', '#f472b6'].forEach((c) => { const d = W.h('button', { class: 'q-dot sm' + (c === markColor ? ' active' : ''), type: 'button', style: { background: c } }); d.addEventListener('click', () => { markColor = c; markColors.querySelectorAll('.q-dot').forEach((x) => x.classList.toggle('active', x === d)); setTool('mark'); }); markColors.append(d); });
  const hint = W.h('span', { class: 'q-hint' });
  tb.append(
    W.iconButton('folder', 'q.openPdf', open), W.iconButton('save', 'cmd.save', () => save(false)), W.h('div', { class: 'w-sep' }),
    W.iconButton('undo', 'cmd.undo', undo), W.iconButton('redo', 'cmd.redo', redo), W.h('div', { class: 'w-sep' }),
    modeSeg, W.h('div', { class: 'w-sep' }),
    ...toolBtns, markColors, W.h('div', { class: 'w-sep' }),
    W.iconButton('zoom-out', 'cmd.zoomOut', () => doc && setZoom(zoom / 1.2)), W.iconButton('fit', 'q.fitWidth', fitWidth), W.iconButton('zoom-in', 'cmd.zoomIn', () => doc && setZoom(zoom * 1.2)), W.h('div', { class: 'w-sep' }),
    W.iconButton(W.isRTL() ? 'chevron-right' : 'chevron-left', 'q.prev', () => doc && goTo(cur - 1)), pageInput, pageTotal, W.iconButton(W.isRTL() ? 'chevron-left' : 'chevron-right', 'q.next', () => doc && goTo(cur + 1)),
    W.h('div', { class: 'w-spacer' }), hint, findInput, findCount);
  function updateStatus() {
    if (!doc) return;
    pageInput.value = String(cur + 1);
    pageTotal.textContent = '/ ' + doc.pages.length;
    status.item('page').textContent = W.t('q.page') + ' ' + (cur + 1) + ' ' + W.t('q.of') + ' ' + doc.pages.length;
    status.item('zoom').textContent = Math.round(zoom * 100) + '%';
  }

  const welcome = W.welcome($('#stage'), {
    text: 'q.welcomeText',
    actions: [
      { i18n: 'q.openPdf', icon: 'folder', primary: true, action: open },
      { i18n: 'q.merge', icon: 'merge', action: open },
      { i18n: 'q.imagesToPdf', icon: 'images', action: open }
    ],
    openRecent: openPath
  });
  W.dropZone($('#stage'), async (files) => {
    const ok = files.filter((f) => /^(pdf|png|jpe?g|webp)$/.test(f.ext));
    if (!ok.length) return;
    const list = ok.map((f) => ({ name: f.name, path: f.path, ext: f.ext, data: new Uint8Array(f.data) }));
    if (doc) await appendFiles(list);
    else await openFiles(list, list.length === 1 ? { path: list[0].path } : null);
  });
  W.onExternalFile((f) => { if (doc) appendFiles([f]); else openFiles([f], { path: f.path }); }, 'bytes');
  W.on('langchange', () => { renderSide(); if (doc) { renderThumbs(); updateStatus(); } updateHint(); });
  new ResizeObserver(W.debounce(() => { if (doc && mode === 'view') rerenderVisible(); }, 200)).observe(viewer);

  window.__watheeq = {
    get doc() { return doc; }, get sources() { return sources; }, get cur() { return cur; }, get zoom() { return zoom; }, get selPages() { return selPages; },
    openBytes: (name, bytes) => openFiles([{ name, ext: 'pdf', data: bytes }]), buildPDF, parseRanges, mapPoint, setTool, setMode, rotatePages, goTo, runFind, get find() { return findState; }
  };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const r = parseRanges('1-3، ٥, 6-9', 10);
      if (!r || r.length !== 3 || r[1][0] !== 4) errors.push('ranges ' + JSON.stringify(r));
      if (parseRanges('3-1', 10) !== null) errors.push('bad range accepted');
      const box = { x: 0, y: 0, width: 100, height: 200 };
      const pts = [[0, { x: 10, y: 180 }], [90, { x: 20, y: 10 }], [180, { x: 90, y: 20 }], [270, { x: 80, y: 190 }]].map(([r, e]) => { const m = mapPoint(10, 20, r, box); return m.x === e.x && m.y === e.y; });
      if (pts.includes(false)) errors.push('mapPoint ' + pts);
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
