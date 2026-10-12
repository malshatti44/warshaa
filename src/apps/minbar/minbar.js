/* منبر Minbar — عروض تقديمية عربية */
(function () {
  'use strict';
  const { THEMES, LAYOUTS, decoration, layoutObjects } = globalThis.MinbarThemes;

  W.init({
    id: 'minbar',
    i18n: {
      ar: {
        'm.newSlide': 'شريحة جديدة', 'm.dupSlide': 'تكرار الشريحة', 'm.delSlide': 'حذف الشريحة', 'm.slideUp': 'تحريك للأعلى', 'm.slideDown': 'تحريك للأسفل',
        'm.textbox': 'مربع نص', 'm.image': 'صورة…', 'm.shape': 'شكل', 'm.present': 'عرض من البداية', 'm.presentCur': 'عرض من الشريحة الحالية',
        'm.theme': 'السمة', 'm.layout': 'التخطيط', 'm.background': 'الخلفية', 'm.bgTheme': 'خلفية السمة', 'm.bgColor': 'لون', 'm.bgImage': 'صورة خلفية…',
        'm.transition': 'الانتقال', 'm.tr.none': 'بدون', 'm.tr.fade': 'تلاشي', 'm.tr.slide': 'انزلاق', 'm.tr.zoom': 'تكبير',
        'm.anim': 'حركة الظهور', 'm.an.none': 'بدون', 'm.an.fade': 'تلاشي', 'm.an.fly': 'طيران', 'm.an.zoom': 'تكبير', 'm.an.rise': 'صعود',
        'm.notes': 'ملاحظات المتحدث…', 'm.slideN': 'شريحة {n}', 'm.slideOf': '{i} من {n}', 'm.slideProps': 'خصائص الشريحة', 'm.objProps': 'خصائص العنصر',
        'm.front': 'إحضار للأمام', 'm.back': 'إرسال للخلف', 'm.alignSlide': 'محاذاة مع الشريحة', 'm.bullets': 'تعداد نقطي', 'm.numbers': 'تعداد رقمي',
        'm.sh.rect': 'مستطيل', 'm.sh.roundrect': 'مستطيل مستدير', 'm.sh.ellipse': 'دائرة', 'm.sh.triangle': 'مثلث', 'm.sh.diamond': 'معين', 'm.sh.star': 'نجمة',
        'm.sh.arrow': 'سهم', 'm.sh.arrowL': 'سهم معاكس', 'm.sh.line': 'خط', 'm.sh.hexagon': 'سداسي', 'm.sh.heart': 'قلب', 'm.sh.callout': 'فقاعة كلام',
        'm.fill': 'التعبئة', 'm.stroke': 'الحد', 'm.radius': 'استدارة الزوايا', 'm.clickImage': 'انقر لإضافة صورة', 'm.exportPptx': 'PowerPoint (.pptx)…',
        'm.exit': 'إنهاء العرض', 'm.next': 'التالي', 'm.prev': 'السابق', 'm.newDeck': 'عرض جديد', 'm.chooseTheme': 'اختر سمة لعرضك', 'm.sample': 'عرض مثال',
        'm.welcomeText': 'أنشئ عرض\u064Bا تقديمي\u064Bا جديد\u064Bا بسمة عربية أنيقة، أو افتح عرض\u064Bا محفوظ\u064Bا', 'm.valign': 'المحاذاة العمودية', 'm.lockRatio': 'قفل النسبة',
        'm.slideCount': '{n} شرائح', 'm.blackScreen': 'شاشة سوداء', 'm.pasteFail': 'لا يوجد ما ي\u064Fلصق', 'm.textPlaceholder': 'اكتب النص هنا',
        'm.dirToggle': 'اتجاه العرض من اليمين لليسار'
      },
      en: {
        'm.newSlide': 'New slide', 'm.dupSlide': 'Duplicate slide', 'm.delSlide': 'Delete slide', 'm.slideUp': 'Move up', 'm.slideDown': 'Move down',
        'm.textbox': 'Text box', 'm.image': 'Image…', 'm.shape': 'Shape', 'm.present': 'Present from start', 'm.presentCur': 'Present from current slide',
        'm.theme': 'Theme', 'm.layout': 'Layout', 'm.background': 'Background', 'm.bgTheme': 'Theme background', 'm.bgColor': 'Color', 'm.bgImage': 'Background image…',
        'm.transition': 'Transition', 'm.tr.none': 'None', 'm.tr.fade': 'Fade', 'm.tr.slide': 'Slide', 'm.tr.zoom': 'Zoom',
        'm.anim': 'Entrance animation', 'm.an.none': 'None', 'm.an.fade': 'Fade', 'm.an.fly': 'Fly in', 'm.an.zoom': 'Zoom', 'm.an.rise': 'Rise',
        'm.notes': 'Speaker notes…', 'm.slideN': 'Slide {n}', 'm.slideOf': '{i} من {n}', 'm.slideProps': 'Slide properties', 'm.objProps': 'Object properties',
        'm.front': 'Bring to front', 'm.back': 'Send to back', 'm.alignSlide': 'Align to slide', 'm.bullets': 'Bullets', 'm.numbers': 'Numbering',
        'm.sh.rect': 'Rectangle', 'm.sh.roundrect': 'Rounded rectangle', 'm.sh.ellipse': 'Ellipse', 'm.sh.triangle': 'Triangle', 'm.sh.diamond': 'Diamond', 'm.sh.star': 'Star',
        'm.sh.arrow': 'Arrow', 'm.sh.arrowL': 'Reverse arrow', 'm.sh.line': 'Line', 'm.sh.hexagon': 'Hexagon', 'm.sh.heart': 'Heart', 'm.sh.callout': 'Speech bubble',
        'm.fill': 'Fill', 'm.stroke': 'Stroke', 'm.radius': 'Corner rounding', 'm.clickImage': 'Click to add an image', 'm.exportPptx': 'PowerPoint (.pptx)…',
        'm.exit': 'End show', 'm.next': 'Next', 'm.prev': 'Previous', 'm.newDeck': 'New presentation', 'm.chooseTheme': 'Choose a theme for your presentation', 'm.sample': 'Sample deck',
        'm.welcomeText': 'Create a new presentation with an elegant Arabic theme, or open a saved one', 'm.valign': 'Vertical alignment', 'm.lockRatio': 'Lock ratio',
        'm.slideCount': '{n} slides', 'm.blackScreen': 'Black screen', 'm.pasteFail': 'Nothing to paste', 'm.textPlaceholder': 'Type text here',
        'm.dirToggle': 'Right-to-left presentation'
      }
    }
  });

  const SW = 1280, SH = 720;
  const uid = () => W.uid('o');
  const clone = (o) => JSON.parse(JSON.stringify(o));
  function newDeck(theme, rtl) {
    rtl = rtl == null ? W.lang === 'ar' : rtl;
    return { version: 1, theme: theme || 'hadith', rtl, slides: [newSlide('title', rtl), newSlide('content', rtl)], assets: {} };
  }
  function newSlide(layout, rtl) {
    return { id: W.uid('s'), layout, bg: null, transition: 'fade', notes: '', objects: layoutObjects(layout, rtl == null ? deck.rtl : rtl, uid) };
  }
  let deck = newDeck();
  let cur = 0;
  let selection = [];
  let editingId = null;

  const canvas = document.getElementById('canvas');
  const stage = document.getElementById('stage');
  const slidesEl = document.getElementById('slides');
  const propsEl = document.getElementById('props');
  const notesEl = document.getElementById('notes');
  const showEl = document.getElementById('show');
  const theme = () => THEMES[deck.theme] || THEMES.hadith;
  const slide = () => deck.slides[cur];
  const objById = (id) => slide().objects.find((o) => o.id === id);
  const asset = (id) => (id && deck.assets[id]) || id || '';

  /* ═══════════ الأنماط ═══════════ */
  function textStyle(o) {
    const t = theme(), s = o.style || {};
    const titleLike = o.role === 'title';
    return {
      font: s.font || (titleLike ? t.titleFont : t.bodyFont),
      size: s.size || 24,
      color: s.color || (titleLike ? t.title : t.body),
      bold: s.bold != null ? s.bold : false, italic: !!s.italic, underline: !!s.underline,
      align: s.align || 'start', valign: s.valign || 'top', lineHeight: s.lineHeight || 1.35,
      dir: s.dir || (deck.rtl ? 'rtl' : 'ltr')
    };
  }
  function textCSS(o) {
    const st = textStyle(o);
    return 'font-family:' + W.fontStack(st.font) + ';font-size:' + st.size + 'px;color:' + st.color + ';font-weight:' + (st.bold ? 700 : 400) +
      ';font-style:' + (st.italic ? 'italic' : 'normal') + ';text-decoration:' + (st.underline ? 'underline' : 'none') + ';text-align:' + st.align +
      ';line-height:' + st.lineHeight + ';direction:' + st.dir + ';justify-content:' + ({ top: 'flex-start', middle: 'center', bottom: 'flex-end' }[st.valign]) + ';--accent:' + theme().accent;
  }
  function bgCSS(s) {
    if (s.bg && s.bg.image) return 'background:url(' + asset(s.bg.image) + ') center/cover no-repeat';
    if (s.bg && s.bg.color) return 'background:' + s.bg.color;
    return 'background:' + theme().bg;
  }
  function shapePath(type, w, h) {
    switch (type) {
      case 'ellipse': return '<ellipse cx="' + w / 2 + '" cy="' + h / 2 + '" rx="' + w / 2 + '" ry="' + h / 2 + '"';
      case 'roundrect': { const r = Math.min(w, h) * 0.18; return '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + r + '"'; }
      case 'triangle': return '<polygon points="' + w / 2 + ',0 ' + w + ',' + h + ' 0,' + h + '"';
      case 'diamond': return '<polygon points="' + w / 2 + ',0 ' + w + ',' + h / 2 + ' ' + w / 2 + ',' + h + ' 0,' + h / 2 + '"';
      case 'hexagon': return '<polygon points="' + w * 0.25 + ',0 ' + w * 0.75 + ',0 ' + w + ',' + h / 2 + ' ' + w * 0.75 + ',' + h + ' ' + w * 0.25 + ',' + h + ' 0,' + h / 2 + '"';
      case 'star': {
        const pts = [];
        for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.4 : 1; pts.push((w / 2 + Math.cos(a) * r * w / 2).toFixed(1) + ',' + (h / 2 + Math.sin(a) * r * h / 2 + (i === 0 ? 0 : 0)).toFixed(1)); }
        return '<polygon points="' + pts.join(' ') + '"';
      }
      case 'arrow': return '<polygon points="0,' + h * 0.3 + ' ' + w * 0.65 + ',' + h * 0.3 + ' ' + w * 0.65 + ',0 ' + w + ',' + h / 2 + ' ' + w * 0.65 + ',' + h + ' ' + w * 0.65 + ',' + h * 0.7 + ' 0,' + h * 0.7 + '"';
      case 'arrowL': return '<polygon points="' + w + ',' + h * 0.3 + ' ' + w * 0.35 + ',' + h * 0.3 + ' ' + w * 0.35 + ',0 0,' + h / 2 + ' ' + w * 0.35 + ',' + h + ' ' + w * 0.35 + ',' + h * 0.7 + ' ' + w + ',' + h * 0.7 + '"';
      case 'heart': return '<path d="M' + w / 2 + ' ' + h * 0.95 + ' C ' + (-w * 0.1) + ' ' + h * 0.5 + ' ' + w * 0.15 + ' ' + (-h * 0.15) + ' ' + w / 2 + ' ' + h * 0.25 + ' C ' + w * 0.85 + ' ' + (-h * 0.15) + ' ' + w * 1.1 + ' ' + h * 0.5 + ' ' + w / 2 + ' ' + h * 0.95 + ' Z"';
      case 'callout': return '<path d="M' + w * 0.08 + ' 0 H ' + w * 0.92 + ' Q ' + w + ' 0 ' + w + ' ' + h * 0.1 + ' V ' + h * 0.65 + ' Q ' + w + ' ' + h * 0.75 + ' ' + w * 0.92 + ' ' + h * 0.75 + ' H ' + w * 0.35 + ' L ' + w * 0.2 + ' ' + h + ' L ' + w * 0.22 + ' ' + h * 0.75 + ' H ' + w * 0.08 + ' Q 0 ' + h * 0.75 + ' 0 ' + h * 0.65 + ' V ' + h * 0.1 + ' Q 0 0 ' + w * 0.08 + ' 0 Z"';
      case 'line': return '<line x1="0" y1="' + h / 2 + '" x2="' + w + '" y2="' + h / 2 + '"';
      default: return '<rect x="0" y="0" width="' + w + '" height="' + h + '"';
    }
  }
  function objHTML(o, opts) {
    opts = opts || {};
    const base = 'left:' + o.x + 'px;top:' + o.y + 'px;width:' + o.w + 'px;height:' + o.h + 'px;transform:rotate(' + (o.rot || 0) + 'deg);opacity:' + (o.opacity != null ? o.opacity : 1) + ';';
    const anim = opts.show && o.anim && o.anim !== 'none' ? ' data-anim="' + o.anim + '"' : '';
    if (o.type === 'image') {
      const r = (o.style && o.style.radius) || 0;
      const border = o.style && o.style.borderW ? 'border:' + o.style.borderW + 'px solid ' + (o.style.borderColor || '#fff') + ';' : '';
      return '<div class="mb-obj mb-image" data-id="' + o.id + '"' + anim + ' style="' + base + '"><img src="' + asset(o.src) + '" style="border-radius:' + r + 'px;' + border + 'object-fit:' + ((o.style && o.style.fit) || 'cover') + '" draggable="false" alt=""></div>';
    }
    if (o.type === 'placeholder') {
      return opts.show ? '' : '<div class="mb-obj mb-placeholder" data-id="' + o.id + '" style="' + base + '"><span>' + W.escape(W.t('m.clickImage')) + '</span></div>';
    }
    if (o.type === 'shape') {
      const s = o.style || {};
      const fill = s.fill || theme().accent, stroke = s.stroke || 'none', sw = s.strokeW || (o.shape === 'line' ? 4 : 0);
      const svg = '<svg class="mb-shape" viewBox="-' + sw / 2 + ' -' + sw / 2 + ' ' + (o.w + sw) + ' ' + (o.h + sw) + '" preserveAspectRatio="none">' + shapePath(o.shape, o.w, o.h) +
        ' fill="' + (o.shape === 'line' ? 'none' : fill) + '" stroke="' + (o.shape === 'line' ? (s.stroke || fill) : stroke) + '" stroke-width="' + sw + '" vector-effect="non-scaling-stroke"/></svg>';
      const text = o.html ? '<div class="mb-text" style="' + textCSS(Object.assign({}, o, { style: Object.assign({ align: 'center', valign: 'middle', color: '#ffffff' }, o.style) })) + '">' + o.html + '</div>' : '';
      return '<div class="mb-obj mb-shapeobj" data-id="' + o.id + '"' + anim + ' style="' + base + '">' + svg + text + '</div>';
    }
    return '<div class="mb-obj mb-textobj" data-id="' + o.id + '"' + anim + ' style="' + base + '"><div class="mb-text" style="' + textCSS(o) + '">' + (o.html || '') + '</div></div>';
  }
  function slideHTML(s, opts) {
    return '<div class="mb-slide" style="' + bgCSS(s) + '">' + (s.bg && (s.bg.image || s.bg.color) ? '' : decoration(deck.theme, SW, SH)) + s.objects.map((o) => objHTML(o, opts)).join('') + '</div>';
  }
  const SLIDE_CSS = '.mb-slide{position:relative;width:1280px;height:720px;overflow:hidden}.mb-slide .deco{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}' +
    '.mb-obj{position:absolute;box-sizing:border-box}.mb-image img{width:100%;height:100%;display:block;box-sizing:border-box}' +
    '.mb-text{position:absolute;inset:0;display:flex;flex-direction:column;padding:10px 14px;overflow-wrap:anywhere;outline:none;box-sizing:border-box}' +
    '.mb-text>div{min-height:1em}.mb-text .bullet,.mb-text .num{position:relative;padding-inline-start:1.15em}' +
    '.mb-text .bullet::before{content:"•";position:absolute;inset-inline-start:.1em;color:var(--accent);font-weight:700}' +
    '.mb-text{counter-reset:mbn}.mb-text .num{counter-increment:mbn}.mb-text .num::before{content:counter(mbn) ".";position:absolute;inset-inline-start:0;color:var(--accent);font-weight:700;font-size:.9em}' +
    '.mb-shape{position:absolute;inset:0;width:100%;height:100%;overflow:visible}';
  const styleTag = W.h('style', { text: SLIDE_CSS });
  document.head.append(styleTag);

  /* ═══════════ السجل ═══════════ */
  const hist = { stack: [], index: -1 };
  const snapState = () => JSON.stringify({ theme: deck.theme, rtl: deck.rtl, slides: deck.slides });
  function commit() {
    const s = snapState();
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1);
    hist.stack.push(s);
    if (hist.stack.length > 120) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
  }
  function restore(s) {
    const st = JSON.parse(s);
    deck.theme = st.theme; deck.rtl = st.rtl; deck.slides = st.slides;
    cur = Math.min(cur, deck.slides.length - 1);
    selection = selection.filter((id) => objById(id));
    editingId = null;
    renderAll();
    W.setDirty(true);
  }
  function undo() { if (editingId) endEdit(); if (hist.index <= 0) return; hist.index--; restore(hist.stack[hist.index]); }
  function redo() { if (hist.index >= hist.stack.length - 1) return; hist.index++; restore(hist.stack[hist.index]); }

  /* ═══════════ المحرر ═══════════ */
  let scale = 1;
  function fit() {
    const r = stage.getBoundingClientRect();
    scale = Math.max(0.1, Math.min((r.width - 60) / SW, (r.height - 50) / SH));
    canvas.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
    canvas.style.setProperty('--hs', (10 / scale) + 'px');
    canvas.style.setProperty('--bw', (1.5 / scale) + 'px');
  }
  new ResizeObserver(() => { fit(); }).observe(stage);

  function renderCanvas() {
    const s = slide();
    canvas.innerHTML = slideHTML(s) + '<div class="mb-overlay" id="overlay"></div>';
    canvas.querySelectorAll('.mb-placeholder').forEach((el) => el.addEventListener('click', () => fillPlaceholder(el.dataset.id)));
    if (editingId) {
      const el = canvas.querySelector('.mb-obj[data-id="' + editingId + '"] .mb-text');
      if (el) beginEditDom(el);
    }
    renderOverlay();
    notesEl.value = s.notes || '';
  }
  function renderOverlay() {
    const ov = document.getElementById('overlay');
    if (!ov) return;
    ov.innerHTML = '';
    selection.forEach((id) => {
      const o = objById(id);
      if (!o) return;
      const f = W.h('div', { class: 'mb-sel' + (editingId === id ? ' editing' : ''), style: { left: o.x + 'px', top: o.y + 'px', width: o.w + 'px', height: o.h + 'px', transform: 'rotate(' + (o.rot || 0) + 'deg)' } });
      if (selection.length === 1 && editingId !== id) {
        ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach((hd) => f.append(W.h('div', { class: 'mb-h mb-h-' + hd, 'data-h': hd })));
        f.append(W.h('div', { class: 'mb-h mb-rot', 'data-h': 'rot' }));
      }
      ov.append(f);
    });
  }
  function renderThumbs() {
    slidesEl.innerHTML = '';
    const scaleT = 168 / SW;
    deck.slides.forEach((s, i) => {
      const t = W.h('div', { class: 'mb-thumb' + (i === cur ? ' active' : ''), draggable: true, 'data-i': i },
        W.h('div', { class: 'mb-thumb-n', text: String(i + 1) }),
        W.h('div', { class: 'mb-thumb-box' }, W.h('div', { class: 'mb-thumb-inner', style: { transform: 'scale(' + scaleT + ')' }, html: slideHTML(s, { thumb: true }) })));
      t.addEventListener('click', () => gotoSlide(i));
      t.addEventListener('contextmenu', (e) => { gotoSlide(i); W.contextMenu(e, slideMenu()); });
      t.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/x-slide', String(i)); e.dataTransfer.effectAllowed = 'move'; });
      t.addEventListener('dragover', (e) => { if (e.dataTransfer.types.includes('text/x-slide')) { e.preventDefault(); t.classList.add('drag-over'); } });
      t.addEventListener('dragleave', () => t.classList.remove('drag-over'));
      t.addEventListener('drop', (e) => {
        e.preventDefault(); t.classList.remove('drag-over');
        const from = parseInt(e.dataTransfer.getData('text/x-slide'), 10);
        if (isNaN(from) || from === i) return;
        const [s2] = deck.slides.splice(from, 1);
        deck.slides.splice(i, 0, s2);
        cur = i; commit(); renderAll();
      });
      slidesEl.append(t);
    });
    slidesEl.append(W.h('button', { class: 'w-btn mb-addslide', type: 'button', onclick: (e) => layoutMenu(e.currentTarget) }, W.iconEl('plus'), W.h('span', { text: W.t('m.newSlide') })));
  }
  const refreshThumb = W.debounce(() => {
    const t = slidesEl.querySelector('.mb-thumb[data-i="' + cur + '"] .mb-thumb-inner');
    if (t) t.innerHTML = slideHTML(slide(), { thumb: true });
  }, 250);
  function renderAll() { renderCanvas(); renderThumbs(); renderProps(); updateStatus(); fit(); }
  function gotoSlide(i) {
    if (editingId) endEdit();
    cur = W.clamp(i, 0, deck.slides.length - 1);
    selection = [];
    renderAll();
    const t = slidesEl.querySelector('.mb-thumb.active');
    if (t) t.scrollIntoView({ block: 'nearest' });
  }

  /* ═══════════ تحرير النص ═══════════ */
  function beginEdit(id) {
    const o = objById(id);
    if (!o || (o.type !== 'text' && o.type !== 'shape')) return;
    if (o.type === 'shape' && !o.html) { o.html = '<div><br></div>'; renderCanvas(); }
    editingId = id;
    selection = [id];
    const el = canvas.querySelector('.mb-obj[data-id="' + id + '"] .mb-text');
    if (!el) return;
    beginEditDom(el);
    renderOverlay(); renderProps();
    const r = document.createRange(); r.selectNodeContents(el); r.collapse(false);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  }
  function beginEditDom(el) {
    el.contentEditable = 'true';
    el.spellcheck = true;
    document.execCommand('defaultParagraphSeparator', false, 'div');
    el.focus({ preventScroll: true });
    el.addEventListener('input', () => {
      if (!el.firstElementChild) { document.execCommand('formatBlock', false, 'div'); }
      refreshThumb();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); endEdit(); }
      if (e.key === 'Tab') { e.preventDefault(); }
    });
  }
  function endEdit() {
    if (!editingId) return;
    const o = objById(editingId);
    const el = canvas.querySelector('.mb-obj[data-id="' + editingId + '"] .mb-text');
    if (o && el) {
      el.contentEditable = 'false';
      el.querySelectorAll('[style=""]').forEach((n) => n.removeAttribute('style'));
      let html = el.innerHTML.replace(/<br>\s*$/, '');
      // نصوص سائبة → فقرات
      if (html && !/^\s*<div/.test(html)) html = '<div>' + html + '</div>';
      o.html = W.sanitizeHTML(html);
    }
    editingId = null;
    commit();
    renderCanvas(); refreshThumb(); renderProps();
  }
  /** تطبيق أمر تنسيق على النص المحرر أو على كامل العنصر المحدد */
  function textCmd(cmd, val, styleKey, styleVal) {
    if (editingId) {
      document.execCommand('styleWithCSS', false, true);
      document.execCommand(cmd, false, val);
      refreshThumb();
      return;
    }
    const objs = selection.map(objById).filter((o) => o && (o.type === 'text' || o.type === 'shape'));
    if (!objs.length) return;
    objs.forEach((o) => {
      o.style = o.style || {};
      if (styleKey) o.style[styleKey] = typeof styleVal === 'function' ? styleVal(textStyle(o)[styleKey], o) : styleVal;
      if (styleKey === 'color' && o.html) o.html = o.html.replace(/ style="color:[^"]*"/g, '');
    });
    commit(); renderCanvas(); refreshThumb(); renderProps();
  }
  function paraClass(cls) {
    const toggle = (blocks) => {
      const all = blocks.every((b) => b.classList.contains(cls));
      blocks.forEach((b) => { b.classList.remove('bullet', 'num'); if (!all) b.classList.add(cls); });
    };
    if (editingId) {
      const el = canvas.querySelector('.mb-obj[data-id="' + editingId + '"] .mb-text');
      const s = getSelection();
      if (!el || !s.rangeCount) return;
      const r = s.getRangeAt(0);
      let blocks = Array.from(el.children).filter((b) => r.intersectsNode(b));
      if (!blocks.length) { document.execCommand('formatBlock', false, 'div'); blocks = Array.from(el.children).filter((b) => r.intersectsNode(b)); }
      toggle(blocks);
      refreshThumb();
      return;
    }
    selection.map(objById).filter((o) => o && o.type === 'text').forEach((o) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = o.html || '';
      if (!tmp.firstElementChild) tmp.innerHTML = '<div>' + tmp.innerHTML + '</div>';
      toggle(Array.from(tmp.children));
      o.html = tmp.innerHTML;
    });
    commit(); renderCanvas(); refreshThumb();
  }

  /* ═══════════ الإضافة ═══════════ */
  function addObject(o) {
    if (editingId) endEdit();
    slide().objects.push(o);
    selection = [o.id];
    commit(); renderCanvas(); refreshThumb(); renderProps();
    return o;
  }
  function addText() {
    const o = addObject({ id: uid(), type: 'text', x: 340, y: 300, w: 600, h: 110, rot: 0, opacity: 1, html: '<div>' + W.escape(W.t('m.textPlaceholder')) + '</div>', style: { size: 32 } });
    beginEdit(o.id);
    document.execCommand('selectAll');
  }
  function addShape(shape) {
    const isLine = shape === 'line';
    addObject({ id: uid(), type: 'shape', shape, x: 490, y: isLine ? 355 : 220, w: isLine ? 300 : 300, h: isLine ? 10 : 280, rot: 0, opacity: 1, style: { fill: theme().accent } });
  }
  async function storeImage(dataURL) {
    const img = await W.loadImage(dataURL);
    const max = 2000;
    let url = dataURL;
    if (Math.max(img.naturalWidth, img.naturalHeight) > max || !/^data:image\/(png|jpe?g|gif)/.test(dataURL)) {
      const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      url = /png|gif|svg|webp/.test(dataURL.slice(0, 30)) ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', 0.9);
    }
    const id = 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    deck.assets[id] = url;
    return { id, w: img.naturalWidth, h: img.naturalHeight };
  }
  const IMG_TYPES = [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'] }];
  async function addImage(files, at) {
    files = files || await W.files.open({ types: IMG_TYPES, multiple: true, as: 'dataurl' });
    for (const f of files) {
      const a = await storeImage(f.data);
      const ratio = a.w / a.h;
      let w = Math.min(700, a.w), h = w / ratio;
      if (h > 560) { h = 560; w = h * ratio; }
      addObject({ id: uid(), type: 'image', src: a.id, x: at ? at.x - w / 2 : (SW - w) / 2, y: at ? at.y - h / 2 : (SH - h) / 2, w, h, rot: 0, opacity: 1, style: {} });
    }
  }
  async function fillPlaceholder(id) {
    const f = await W.files.open({ types: IMG_TYPES, as: 'dataurl' });
    if (!f[0]) return;
    const o = objById(id);
    const a = await storeImage(f[0].data);
    Object.assign(o, { type: 'image', src: a.id, style: { radius: 12 } });
    selection = [id];
    commit(); renderCanvas(); refreshThumb(); renderProps();
  }

  /* ═══════════ الفأرة على اللوحة ═══════════ */
  const toSlide = (e) => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale }; };
  let drag = null;
  stage.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const handle = e.target.closest('.mb-h');
    const objEl = e.target.closest('.mb-obj');
    if (editingId && objEl && objEl.dataset.id === editingId) return; // تحرير نص
    if (editingId) endEdit();
    const p = toSlide(e);
    if (handle) {
      const o = objById(selection[0]);
      drag = { mode: handle.dataset.h === 'rot' ? 'rotate' : 'resize', h: handle.dataset.h, o, start: p, orig: clone(o) };
      e.preventDefault();
      return;
    }
    if (objEl && !objEl.classList.contains('mb-placeholder')) {
      const id = objEl.dataset.id;
      if (e.shiftKey) selection = selection.includes(id) ? selection.filter((x) => x !== id) : selection.concat(id);
      else if (!selection.includes(id)) selection = [id];
      renderOverlay(); renderProps();
      drag = { mode: 'move', start: p, origs: selection.map((sid) => clone(objById(sid))) };
      e.preventDefault();
      return;
    }
    if (objEl && objEl.classList.contains('mb-placeholder')) return;
    selection = [];
    renderOverlay(); renderProps();
    drag = { mode: 'marquee', start: p };
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = toSlide(e);
    const dx = p.x - drag.start.x, dy = p.y - drag.start.y;
    if (drag.mode === 'move') {
      let ddx = dx, ddy = dy;
      if (!e.altKey && drag.origs.length) {
        const sn = snap(drag.origs[0], dx, dy);
        ddx = sn.dx; ddy = sn.dy;
      }
      drag.origs.forEach((oo) => { const o = objById(oo.id); o.x = Math.round(oo.x + ddx); o.y = Math.round(oo.y + ddy); });
      drag.moved = true;
      quickUpdate();
    } else if (drag.mode === 'resize') {
      const o = drag.o, s = drag.orig, h = drag.h;
      let x = s.x, y = s.y, w = s.w, hh = s.h;
      if (h.includes('e')) w = s.w + dx;
      if (h.includes('w')) { w = s.w - dx; x = s.x + dx; }
      if (h.includes('s')) hh = s.h + dy;
      if (h.includes('n')) { hh = s.h - dy; y = s.y + dy; }
      const lock = (o.type === 'image' && !e.shiftKey) || (o.type !== 'image' && e.shiftKey);
      if (lock && h.length === 2) {
        const ratio = s.w / s.h;
        if (Math.abs(w - s.w) / s.w > Math.abs(hh - s.h) / s.h) { hh = w / ratio; if (h.includes('n')) y = s.y + s.h - hh; }
        else { w = hh * ratio; if (h.includes('w')) x = s.x + s.w - w; }
      }
      o.x = Math.round(x); o.y = Math.round(y); o.w = Math.max(10, Math.round(w)); o.h = Math.max(o.shape === 'line' ? 2 : 10, Math.round(hh));
      drag.moved = true;
      quickUpdate();
    } else if (drag.mode === 'rotate') {
      const o = drag.o;
      const cx = o.x + o.w / 2, cy = o.y + o.h / 2;
      let a = Math.atan2(p.y - cy, p.x - cx) * 180 / Math.PI + 90;
      if (e.shiftKey || Math.abs(((a % 90) + 90) % 90) < 4 || Math.abs(((a % 90) + 90) % 90) > 86) a = Math.round(a / (e.shiftKey ? 15 : 90)) * (e.shiftKey ? 15 : 90);
      o.rot = Math.round(((a % 360) + 360) % 360);
      drag.moved = true;
      quickUpdate();
    } else if (drag.mode === 'marquee') {
      const x1 = Math.min(drag.start.x, p.x), y1 = Math.min(drag.start.y, p.y), x2 = Math.max(drag.start.x, p.x), y2 = Math.max(drag.start.y, p.y);
      let m = document.getElementById('marquee');
      if (!m) { m = W.h('div', { id: 'marquee', class: 'mb-marquee' }); document.getElementById('overlay').append(m); }
      Object.assign(m.style, { left: x1 + 'px', top: y1 + 'px', width: (x2 - x1) + 'px', height: (y2 - y1) + 'px' });
      drag.box = { x1, y1, x2, y2 };
    }
  });
  window.addEventListener('mouseup', () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    clearGuides();
    if (d.mode === 'marquee') {
      if (d.box && (d.box.x2 - d.box.x1 > 4 || d.box.y2 - d.box.y1 > 4)) {
        selection = slide().objects.filter((o) => o.x < d.box.x2 && o.x + o.w > d.box.x1 && o.y < d.box.y2 && o.y + o.h > d.box.y1).map((o) => o.id);
      }
      renderOverlay(); renderProps();
      return;
    }
    if (d.moved) { commit(); renderCanvas(); refreshThumb(); renderProps(); }
  });
  stage.addEventListener('dblclick', (e) => {
    const objEl = e.target.closest('.mb-obj');
    if (objEl && (objEl.classList.contains('mb-textobj') || objEl.classList.contains('mb-shapeobj'))) beginEdit(objEl.dataset.id);
    else if (objEl && objEl.classList.contains('mb-image')) replaceImage(objEl.dataset.id);
  });
  stage.addEventListener('contextmenu', (e) => {
    const objEl = e.target.closest('.mb-obj');
    if (editingId) return;
    if (objEl) { if (!selection.includes(objEl.dataset.id)) { selection = [objEl.dataset.id]; renderOverlay(); renderProps(); } W.contextMenu(e, objMenu()); }
    else W.contextMenu(e, [{ i18n: 'cmd.paste', icon: 'paste', action: paste }, '-', ...slideMenu()]);
  });
  function quickUpdate() {
    selection.forEach((id) => {
      const o = objById(id);
      const el = canvas.querySelector('.mb-obj[data-id="' + id + '"]');
      if (!el || !o) return;
      el.style.left = o.x + 'px'; el.style.top = o.y + 'px'; el.style.width = o.w + 'px'; el.style.height = o.h + 'px';
      el.style.transform = 'rotate(' + (o.rot || 0) + 'deg)';
      if (o.type === 'shape') { const svg = el.querySelector('svg'); if (svg) el.outerHTML = objHTML(o); }
    });
    renderOverlay();
    syncPropFields();
  }
  /* محاذاة ذكية */
  function clearGuides() { document.querySelectorAll('.mb-guide').forEach((g) => g.remove()); }
  function snap(o, dx, dy) {
    clearGuides();
    const tol = 6 / scale;
    const xs = [0, SW / 2, SW], ys = [0, SH / 2, SH];
    slide().objects.forEach((q) => { if (selection.includes(q.id)) return; xs.push(q.x, q.x + q.w / 2, q.x + q.w); ys.push(q.y, q.y + q.h / 2, q.y + q.h); });
    let bx = null, by = null;
    const ex = [o.x + dx, o.x + dx + o.w / 2, o.x + dx + o.w];
    const ey = [o.y + dy, o.y + dy + o.h / 2, o.y + dy + o.h];
    for (const t of xs) for (let i = 0; i < 3; i++) if (Math.abs(ex[i] - t) < tol && (bx == null || Math.abs(ex[i] - t) < Math.abs(bx.d))) bx = { d: t - ex[i], t };
    for (const t of ys) for (let i = 0; i < 3; i++) if (Math.abs(ey[i] - t) < tol && (by == null || Math.abs(ey[i] - t) < Math.abs(by.d))) by = { d: t - ey[i], t };
    const ov = document.getElementById('overlay');
    if (bx) ov.append(W.h('div', { class: 'mb-guide v', style: { left: bx.t + 'px' } }));
    if (by) ov.append(W.h('div', { class: 'mb-guide h', style: { top: by.t + 'px' } }));
    return { dx: dx + (bx ? bx.d : 0), dy: dy + (by ? by.d : 0) };
  }

  /* ═══════════ عمليات العناصر ═══════════ */
  let clipboard = null;
  function copy(cut) {
    if (!selection.length) return;
    clipboard = selection.map((id) => clone(objById(id)));
    if (cut) del();
  }
  function paste() {
    if (!clipboard || !clipboard.length) { W.toast(W.t('m.pasteFail')); return; }
    const added = clipboard.map((o) => Object.assign(clone(o), { id: uid(), x: o.x + 20, y: o.y + 20 }));
    slide().objects.push(...added);
    clipboard = added.map(clone);
    selection = added.map((o) => o.id);
    commit(); renderCanvas(); refreshThumb(); renderProps();
  }
  function duplicate() { copy(false); paste(); }
  function del() {
    if (!selection.length) return;
    slide().objects = slide().objects.filter((o) => !selection.includes(o.id));
    selection = [];
    commit(); renderCanvas(); refreshThumb(); renderProps();
  }
  function arrange(front) {
    const objs = slide().objects;
    const sel = objs.filter((o) => selection.includes(o.id)), rest = objs.filter((o) => !selection.includes(o.id));
    slide().objects = front ? rest.concat(sel) : sel.concat(rest);
    commit(); renderCanvas(); refreshThumb();
  }
  function alignTo(where) {
    selection.map(objById).forEach((o) => {
      if (where === 'left') o.x = 0; if (where === 'right') o.x = SW - o.w; if (where === 'hcenter') o.x = Math.round((SW - o.w) / 2);
      if (where === 'top') o.y = 0; if (where === 'bottom') o.y = SH - o.h; if (where === 'vcenter') o.y = Math.round((SH - o.h) / 2);
    });
    commit(); renderCanvas(); refreshThumb(); renderProps();
  }
  function nudge(dx, dy) {
    selection.map(objById).forEach((o) => { o.x += dx; o.y += dy; });
    quickUpdate();
    commitSoon();
  }
  const commitSoon = W.debounce(() => { commit(); refreshThumb(); }, 400);
  async function replaceImage(id) {
    const f = await W.files.open({ types: IMG_TYPES, as: 'dataurl' });
    if (!f[0]) return;
    const a = await storeImage(f[0].data);
    objById(id).src = a.id;
    commit(); renderCanvas(); refreshThumb();
  }
  const objMenu = () => [
    { i18n: 'cmd.cut', icon: 'cut', action: () => copy(true) },
    { i18n: 'cmd.copy', icon: 'copy', action: () => copy(false) },
    { i18n: 'cmd.paste', icon: 'paste', action: paste },
    { i18n: 'cmd.duplicate', icon: 'duplicate', action: duplicate },
    { i18n: 'cmd.delete', icon: 'trash', action: del },
    '-',
    { i18n: 'm.front', icon: 'bring-front', action: () => arrange(true) },
    { i18n: 'm.back', icon: 'send-back', action: () => arrange(false) },
    { i18n: 'm.alignSlide', submenu: [
      { i18n: 'ui.center', action: () => { alignTo('hcenter'); alignTo('vcenter'); } },
      { i18n: 'ui.left', action: () => alignTo('left') }, { i18n: 'ui.right', action: () => alignTo('right') },
      { i18n: 'ui.top', action: () => alignTo('top') }, { i18n: 'ui.bottom', action: () => alignTo('bottom') }
    ] }
  ];

  /* ═══════════ الشرائح ═══════════ */
  function addSlide(layout) {
    if (editingId) endEdit();
    deck.slides.splice(cur + 1, 0, newSlide(layout));
    cur++;
    selection = [];
    commit(); renderAll();
  }
  function dupSlide() { const s = clone(slide()); s.id = W.uid('s'); s.objects.forEach((o) => { o.id = uid(); }); deck.slides.splice(cur + 1, 0, s); cur++; commit(); renderAll(); }
  function delSlide() { if (deck.slides.length < 2) return; deck.slides.splice(cur, 1); cur = Math.min(cur, deck.slides.length - 1); selection = []; commit(); renderAll(); }
  function moveSlide(d) { const j = cur + d; if (j < 0 || j >= deck.slides.length) return; const [s] = deck.slides.splice(cur, 1); deck.slides.splice(j, 0, s); cur = j; commit(); renderAll(); }
  const slideMenu = () => [
    { i18n: 'm.newSlide', icon: 'plus', submenu: Object.keys(LAYOUTS).map((k) => ({ label: () => W.L(LAYOUTS[k].name), action: () => addSlide(k) })) },
    { i18n: 'm.dupSlide', icon: 'duplicate', action: dupSlide },
    { i18n: 'm.slideUp', icon: 'arrow-up', disabled: () => cur === 0, action: () => moveSlide(-1) },
    { i18n: 'm.slideDown', icon: 'arrow-down', disabled: () => cur === deck.slides.length - 1, action: () => moveSlide(1) },
    '-',
    { i18n: 'm.delSlide', icon: 'trash', disabled: () => deck.slides.length < 2, action: delSlide }
  ];
  function layoutMenu(anchor) {
    const r = anchor.getBoundingClientRect();
    W.showMenu(Object.keys(LAYOUTS).map((k) => ({ label: () => W.L(LAYOUTS[k].name), action: () => addSlide(k) })), W.isRTL() ? r.right : r.left, r.bottom + 4);
  }
  notesEl.addEventListener('input', () => { slide().notes = notesEl.value; commitSoon(); });

  /* ═══════════ لوحة الخصائص ═══════════ */
  let propFields = {};
  function section(titleKey, ...children) {
    return W.h('div', { class: 'w-panel' }, W.h('div', { class: 'w-panel-title', text: W.t(titleKey) }), W.h('div', { class: 'w-panel-body' }, ...children));
  }
  function numField(label, value, onChange) {
    const inp = W.h('input', { class: 'w-input sm', type: 'number', value: Math.round(value) });
    inp.addEventListener('change', () => onChange(parseFloat(inp.value) || 0));
    return W.h('div', { class: 'w-field' }, W.h('label', { text: label }), inp);
  }
  function selectField(label, value, options, onChange) {
    const s = W.h('select', { class: 'w-select sm' });
    options.forEach((o) => s.append(W.h('option', { value: o.value, text: o.label })));
    s.value = value;
    s.addEventListener('change', () => onChange(s.value));
    return W.h('div', { class: 'w-field' }, W.h('label', { text: label }), s);
  }
  function colorField(label, value, onChange) {
    const c = W.h('input', { type: 'color', class: 'w-color', value: /^#[0-9a-f]{6}$/i.test(value || '') ? value : '#000000' });
    c.addEventListener('change', () => onChange(c.value));
    return W.h('div', { class: 'row', style: { justifyContent: 'space-between', marginBottom: '8px' } }, W.h('span', { class: 'w-label-sm', text: label }), c);
  }
  function applyObj(fn) {
    selection.map(objById).filter(Boolean).forEach(fn);
    commit(); renderCanvas(); refreshThumb(); renderProps();
  }
  function renderProps() {
    propsEl.innerHTML = '';
    propFields = {};
    const objs = selection.map(objById).filter(Boolean);
    if (!objs.length) { renderSlideProps(); return; }
    const o = objs[0];
    // الموضع والحجم
    const geo = W.h('div', { class: 'w-input-group' });
    const mk = (k, lbl) => { const f = numField(lbl, o[k], (v) => applyObj((x) => { x[k] = k === 'w' || k === 'h' ? Math.max(4, v) : v; })); propFields[k] = f.querySelector('input'); return f; };
    geo.append(mk('x', 'X'), mk('y', 'Y'));
    const geo2 = W.h('div', { class: 'w-input-group' }, mk('w', W.t('ui.width')), mk('h', W.t('ui.height')));
    const geo3 = W.h('div', { class: 'w-input-group' }, mk('rot', W.t('ui.rotation')));
    const op = W.slider({ i18n: 'ui.opacity', min: 0, max: 100, value: Math.round((o.opacity != null ? o.opacity : 1) * 100), reset: 100, onInput: (v) => { selection.map(objById).forEach((x) => { x.opacity = v / 100; }); quickUpdate(); canvas.querySelectorAll('.mb-obj').forEach((el) => { const x = objById(el.dataset.id); if (x) el.style.opacity = x.opacity; }); }, onChange: () => { commit(); refreshThumb(); } });
    propsEl.append(section('ui.position', geo, geo2, geo3, op));
    // النص
    if (o.type === 'text' || (o.type === 'shape' && o.html)) {
      const st = textStyle(o);
      const font = W.fontSelect(st.font, (f) => textCmd('fontName', f, 'font', f), 'sm');
      const size = W.h('input', { class: 'w-input sm', type: 'number', value: st.size, min: 6, max: 300 });
      size.addEventListener('change', () => applyObj((x) => { x.style = x.style || {}; x.style.size = parseFloat(size.value) || 24; x.html = (x.html || '').replace(/font-size:[^;"]*;?/g, ''); }));
      const fmtRow = W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '4px', marginBottom: '8px' } },
        W.iconButton('bold', 'ui.bold', () => textCmd('bold', null, 'bold', (v) => !v), { cls: st.bold ? 'active' : '' }),
        W.iconButton('italic', 'ui.italic', () => textCmd('italic', null, 'italic', (v) => !v), { cls: st.italic ? 'active' : '' }),
        W.iconButton('underline', 'ui.underline', () => textCmd('underline', null, 'underline', (v) => !v), { cls: st.underline ? 'active' : '' }),
        W.h('div', { class: 'w-sep-v' }),
        W.iconButton('list', 'm.bullets', () => paraClass('bullet')),
        W.iconButton('list-ordered', 'm.numbers', () => paraClass('num')));
      const alignSeg = W.segmented([
        { value: 'start', icon: W.isRTL() ? 'align-right' : 'align-left', tip: 'ui.start' }, { value: 'center', icon: 'align-center', tip: 'ui.center' },
        { value: 'end', icon: W.isRTL() ? 'align-left' : 'align-right', tip: 'ui.end' }, { value: 'justify', icon: 'align-justify', tip: 'ui.justify' }
      ], st.align, (v) => applyObj((x) => { x.style = x.style || {}; x.style.align = v; }));
      const vSeg = W.segmented([{ value: 'top', icon: 'align-top' }, { value: 'middle', icon: 'align-middle' }, { value: 'bottom', icon: 'align-bottom' }], st.valign, (v) => applyObj((x) => { x.style = x.style || {}; x.style.valign = v; }));
      const dirSeg = W.segmented([{ value: 'rtl', icon: 'rtl', tip: 'ui.rtl' }, { value: 'ltr', icon: 'ltr', tip: 'ui.ltr' }], st.dir, (v) => applyObj((x) => { x.style = x.style || {}; x.style.dir = v; }));
      const lh = W.slider({ i18n: 'ui.lineHeight', min: 0.8, max: 3, step: 0.05, value: st.lineHeight, reset: 1.35, onChange: (v) => applyObj((x) => { x.style = x.style || {}; x.style.lineHeight = v; }) });
      propsEl.append(section('ui.text',
        W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.font') }), font),
        W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.fontSize') }), size)),
        colorField(W.t('ui.color'), st.color, (c) => textCmd('foreColor', c, 'color', c)),
        fmtRow,
        W.h('div', { class: 'col', style: { gap: '6px' } }, alignSeg, vSeg, dirSeg),
        W.h('div', { style: { marginTop: '10px' } }, lh)
      ));
    }
    if (o.type === 'shape') {
      const s = o.style || {};
      const shapeSel = selectField(W.t('m.shape'), o.shape, ['rect', 'roundrect', 'ellipse', 'triangle', 'diamond', 'hexagon', 'star', 'heart', 'arrow', 'arrowL', 'callout', 'line'].map((k) => ({ value: k, label: W.t('m.sh.' + k) })), (v) => applyObj((x) => { x.shape = v; }));
      propsEl.append(section('m.shape', shapeSel,
        colorField(W.t('m.fill'), s.fill || theme().accent, (c) => applyObj((x) => { x.style = Object.assign({}, x.style, { fill: c }); })),
        colorField(W.t('m.stroke'), s.stroke && s.stroke !== 'none' ? s.stroke : '#000000', (c) => applyObj((x) => { x.style = Object.assign({}, x.style, { stroke: c, strokeW: x.style && x.style.strokeW ? x.style.strokeW : 3 }); })),
        W.slider({ i18n: 'ui.strokeWidth', min: 0, max: 30, value: s.strokeW || 0, reset: 0, onChange: (v) => applyObj((x) => { x.style = Object.assign({}, x.style, { strokeW: v, stroke: x.style && x.style.stroke && x.style.stroke !== 'none' ? x.style.stroke : '#000000' }); }) })
      ));
    }
    if (o.type === 'image') {
      const s = o.style || {};
      propsEl.append(section('ui.image',
        W.slider({ i18n: 'm.radius', min: 0, max: 300, value: s.radius || 0, reset: 0, onChange: (v) => applyObj((x) => { x.style = Object.assign({}, x.style, { radius: v }); }) }),
        W.slider({ i18n: 'ui.strokeWidth', min: 0, max: 30, value: s.borderW || 0, reset: 0, onChange: (v) => applyObj((x) => { x.style = Object.assign({}, x.style, { borderW: v }); }) }),
        colorField(W.t('m.stroke'), s.borderColor || '#ffffff', (c) => applyObj((x) => { x.style = Object.assign({}, x.style, { borderColor: c }); })),
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.image'), onclick: () => replaceImage(o.id) })
      ));
    }
    propsEl.append(section('m.anim', selectField(W.t('m.anim'), o.anim || 'none', ['none', 'fade', 'fly', 'rise', 'zoom'].map((k) => ({ value: k, label: W.t('m.an.' + k) })), (v) => applyObj((x) => { x.anim = v; }))));
    propsEl.append(section('menu.arrange', W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '4px' } },
      W.iconButton('bring-front', 'm.front', () => arrange(true)), W.iconButton('send-back', 'm.back', () => arrange(false)),
      W.iconButton('align-h-center', 'ui.center', () => alignTo('hcenter')), W.iconButton('align-v-center', 'ui.middle', () => alignTo('vcenter')),
      W.iconButton('duplicate', 'cmd.duplicate', duplicate), W.iconButton('trash', 'cmd.delete', del))));
  }
  function syncPropFields() {
    const o = objById(selection[0]);
    if (!o) return;
    ['x', 'y', 'w', 'h', 'rot'].forEach((k) => { if (propFields[k] && document.activeElement !== propFields[k]) propFields[k].value = Math.round(o[k] || 0); });
  }
  function renderSlideProps() {
    const s = slide();
    // معرض السمات
    const gallery = W.h('div', { class: 'mb-themes' });
    Object.keys(THEMES).forEach((k) => {
      const t = THEMES[k];
      const sw = W.h('button', { class: 'mb-theme' + (deck.theme === k ? ' active' : ''), type: 'button', title: W.L(t.name), onclick: () => { deck.theme = k; commit(); renderAll(); } },
        W.h('div', { class: 'mb-theme-prev', style: { background: t.bg } }, W.h('span', { style: { color: t.title, fontFamily: W.fontStack(t.titleFont) }, text: W.lang === 'ar' ? 'أبجد' : 'Aa' }), W.h('i', { style: { background: t.accent } })),
        W.h('div', { class: 'mb-theme-name', text: W.L(t.name) }));
      gallery.append(sw);
    });
    propsEl.append(section('m.theme', gallery));
    const bgRow = W.h('div', { class: 'col' },
      W.h('div', { class: 'row' },
        W.h('button', { class: 'w-btn sm' + (!s.bg ? ' primary' : ''), type: 'button', text: W.t('m.bgTheme'), onclick: () => { s.bg = null; commit(); renderAll(); } }),
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.bgImage'), onclick: async () => { const f = await W.files.open({ types: IMG_TYPES, as: 'dataurl' }); if (!f[0]) return; const a = await storeImage(f[0].data); s.bg = { image: a.id }; commit(); renderAll(); } })),
      colorField(W.t('m.bgColor'), s.bg && s.bg.color ? s.bg.color : '#ffffff', (c) => { s.bg = { color: c }; commit(); renderAll(); }),
      W.swatches((c) => { s.bg = { color: c }; commit(); renderAll(); }, ['#ffffff', '#f8fafc', '#fef3c7', '#ecfdf5', '#eff6ff', '#fdf2f8', '#111827', '#1e1b4b', '#064e3b', '#7c2d12', '#4c1d95', '#0f172a']));
    propsEl.append(section('m.background', bgRow));
    propsEl.append(section('m.transition', selectField(W.t('m.transition'), s.transition || 'none', ['none', 'fade', 'slide', 'zoom'].map((k) => ({ value: k, label: W.t('m.tr.' + k) })), (v) => { s.transition = v; commit(); })));
    const dirChk = W.h('input', { type: 'checkbox' }); dirChk.checked = deck.rtl;
    dirChk.addEventListener('change', () => { deck.rtl = dirChk.checked; commit(); renderAll(); });
    propsEl.append(section('ui.direction', W.h('label', { class: 'w-check-row' }, dirChk, W.h('span', { text: W.t('m.dirToggle') }))));
  }

  /* ═══════════ العرض التقديمي ═══════════ */
  const show = { i: 0, step: 0, black: false };
  function present(fromCurrent) {
    if (editingId) endEdit();
    show.i = fromCurrent ? cur : 0;
    show.step = 0; show.black = false;
    showEl.classList.remove('hidden');
    showEl.innerHTML = '<div class="mb-show-stage"></div><div class="mb-show-bar"><button data-a="prev"></button><span class="mb-show-count"></span><button data-a="next"></button><button data-a="exit"></button></div>';
    const bar = showEl.querySelector('.mb-show-bar');
    bar.querySelector('[data-a="prev"]').innerHTML = W.icon(deck.rtl ? 'chevron-right' : 'chevron-left');
    bar.querySelector('[data-a="next"]').innerHTML = W.icon(deck.rtl ? 'chevron-left' : 'chevron-right');
    bar.querySelector('[data-a="exit"]').innerHTML = W.icon('x');
    bar.addEventListener('click', (e) => { const a = e.target.closest('button'); if (!a) return; e.stopPropagation(); if (a.dataset.a === 'next') next(); else if (a.dataset.a === 'prev') prev(); else exitShow(); });
    showEl.requestFullscreen && showEl.requestFullscreen().catch(() => {});
    renderShow(true);
    showEl.focus();
  }
  function showScale() { return Math.min(window.innerWidth / SW, window.innerHeight / SH); }
  function renderShow(withTransition) {
    const st = showEl.querySelector('.mb-show-stage');
    const s = deck.slides[show.i];
    const wrapEl = W.h('div', { class: 'mb-show-slide' + (withTransition && s.transition && s.transition !== 'none' ? ' tr-' + s.transition + (deck.rtl ? ' rtl' : '') : ''), html: slideHTML(s, { show: true }) });
    wrapEl.style.transform = 'translate(-50%,-50%) scale(' + showScale() + ')';
    st.innerHTML = '';
    st.append(wrapEl);
    const anims = Array.from(wrapEl.querySelectorAll('[data-anim]'));
    anims.forEach((el, i) => { if (i >= show.step) el.classList.add('anim-hidden'); else el.classList.add('anim-in'); });
    showEl.querySelector('.mb-show-count').textContent = W.t('m.slideOf', { i: show.i + 1, n: deck.slides.length });
    showEl.classList.toggle('black', show.black);
  }
  function next() {
    const st = showEl.querySelector('.mb-show-slide');
    const hidden = st ? st.querySelectorAll('.anim-hidden') : [];
    if (hidden.length) { const el = hidden[0]; el.classList.remove('anim-hidden'); el.classList.add('anim-in', 'anim-' + el.dataset.anim); show.step++; return; }
    if (show.i < deck.slides.length - 1) { show.i++; show.step = 0; renderShow(true); }
    else exitShow();
  }
  function prev() {
    if (show.i > 0) { show.i--; show.step = 999; renderShow(false); }
  }
  function exitShow() {
    showEl.classList.add('hidden');
    showEl.innerHTML = '';
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    gotoSlide(show.i);
  }
  showEl.addEventListener('click', (e) => { if (!e.target.closest('.mb-show-bar')) next(); });
  showEl.addEventListener('contextmenu', (e) => { e.preventDefault(); prev(); });
  document.addEventListener('keydown', (e) => {
    if (showEl.classList.contains('hidden')) return;
    const k = e.key;
    const nextKeys = ['ArrowDown', 'PageDown', ' ', 'Enter', 'n', 'N', deck.rtl ? 'ArrowLeft' : 'ArrowRight'];
    const prevKeys = ['ArrowUp', 'PageUp', 'Backspace', 'p', 'P', deck.rtl ? 'ArrowRight' : 'ArrowLeft'];
    if (nextKeys.includes(k)) { e.preventDefault(); e.stopPropagation(); next(); }
    else if (prevKeys.includes(k)) { e.preventDefault(); e.stopPropagation(); prev(); }
    else if (k === 'Escape') { e.preventDefault(); e.stopPropagation(); exitShow(); }
    else if (k === 'Home') { show.i = 0; show.step = 0; renderShow(true); }
    else if (k === 'End') { show.i = deck.slides.length - 1; show.step = 999; renderShow(false); }
    else if (k === 'b' || k === 'B' || k === '.') { show.black = !show.black; renderShow(false); }
  }, true);
  window.addEventListener('resize', () => { if (!showEl.classList.contains('hidden')) { const sl = showEl.querySelector('.mb-show-slide'); if (sl) sl.style.transform = 'translate(-50%,-50%) scale(' + showScale() + ')'; } });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && !showEl.classList.contains('hidden')) exitShow(); });

  /* ═══════════ لوحة المفاتيح ═══════════ */
  document.addEventListener('keydown', (e) => {
    if (!showEl.classList.contains('hidden') || editingId) return;
    if (e.target.closest('input, textarea, select, [contenteditable="true"]') || document.querySelector('.w-overlay')) return;
    const step = e.shiftKey ? 10 : 1;
    if (!selection.length) {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); gotoSlide(cur + 1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); gotoSlide(cur - 1); }
      return;
    }
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); del(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-step, 0); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nudge(step, 0); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); nudge(0, -step); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); nudge(0, step); }
    else if (e.key === 'Enter' || e.key === 'F2') { const o = objById(selection[0]); if (o && (o.type === 'text' || o.type === 'shape')) { e.preventDefault(); beginEdit(o.id); } }
    else if (e.key === 'Escape') { selection = []; renderOverlay(); renderProps(); }
  });

  /* ═══════════ الملفات ═══════════ */
  function usedAssets() {
    const used = new Set();
    deck.slides.forEach((s) => { if (s.bg && s.bg.image) used.add(s.bg.image); s.objects.forEach((o) => { if (o.src) used.add(o.src); }); });
    const out = {};
    used.forEach((id) => { if (deck.assets[id]) out[id] = deck.assets[id]; });
    return out;
  }
  function serialize() {
    if (editingId) endEdit();
    return JSON.stringify({ app: 'minbar', version: 1, deck: Object.assign({}, deck, { assets: usedAssets() }) });
  }
  function loadDeck(d, meta) {
    deck = Object.assign({ version: 1, theme: 'hadith', rtl: true, slides: [], assets: {} }, d);
    if (!deck.slides.length) deck.slides.push(newSlide('title'));
    cur = 0; selection = []; editingId = null;
    hist.stack = []; hist.index = -1; commit();
    meta = meta || {};
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: !!meta.dirty });
    welcome.hide();
    renderAll();
  }
  async function newDeckFlow() {
    if (!(await W.confirmDiscard())) return;
    const grid = W.h('div', { class: 'mb-themes big' });
    let close;
    Object.keys(THEMES).forEach((k) => {
      const t = THEMES[k];
      grid.append(W.h('button', { class: 'mb-theme', type: 'button', onclick: () => close(k) },
        W.h('div', { class: 'mb-theme-prev', style: { background: t.bg } }, W.h('span', { style: { color: t.title, fontFamily: W.fontStack(t.titleFont) }, text: W.lang === 'ar' ? 'عنوان' : 'Title' }), W.h('i', { style: { background: t.accent } })),
        W.h('div', { class: 'mb-theme-name', text: W.L(t.name) })));
    });
    const k = await W.dialog({ title: W.t('m.chooseTheme'), body: grid, buttons: [], onOpen: (d, done) => { close = done; } });
    if (!k) return;
    loadDeck(newDeck(k), {});
  }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'عرض منبر', en: 'Minbar presentation' }, ext: ['minbar'] }], as: 'text' });
    if (f[0]) loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { loadFile(await W.files.readPath(p, 'text')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  function loadFile(f) {
    try {
      const j = JSON.parse(typeof f.data === 'string' ? f.data : W.files.decodeText(new Uint8Array(f.data)));
      loadDeck(j.deck, { name: f.name, path: f.path });
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'));
  async function save(as) {
    const res = await W.files.save({ data: serialize(), name: baseName() + '.minbar', path: as ? null : W.doc.path, types: [{ name: { ar: 'عرض منبر', en: 'Minbar presentation' }, ext: ['minbar'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }
  function printHTML() {
    if (editingId) endEdit();
    const pages = deck.slides.map((s) => '<div class="page">' + slideHTML(s, { show: true }) + '</div>').join('');
    return W.printDocument(pages, { css: SLIDE_CSS + '@page{size:1280px 720px;margin:0}.page{width:1280px;height:720px;overflow:hidden;break-after:page}', dir: deck.rtl ? 'rtl' : 'ltr' }).replace('@page{size:A4;margin:0}', '');
  }
  /** نموذج تصدير PPTX من عرض فعلي في DOM */
  function pptxModel() {
    const host = W.h('div', { style: { position: 'fixed', left: '-99999px', top: '0', width: SW + 'px', height: SH + 'px' } });
    document.body.append(host);
    const slides = deck.slides.map((s) => {
      host.innerHTML = slideHTML(s, { show: true });
      const bg = s.bg && s.bg.image ? { image: asset(s.bg.image) } : { fill: bgFill(s) };
      const items = [];
      s.objects.forEach((o) => {
        if (o.type === 'placeholder') return;
        const base = { x: o.x, y: o.y, w: o.w, h: o.h, rot: o.rot || 0, opacity: o.opacity };
        if (o.type === 'image') { items.push(Object.assign(base, { kind: 'image', image: toPngData(asset(o.src)), rounded: (o.style && o.style.radius) > 0 })); return; }
        const el = host.querySelector('.mb-obj[data-id="' + o.id + '"] .mb-text');
        const st = textStyle(o);
        const paras = el ? extractParas(el) : [];
        if (o.type === 'shape') items.push(Object.assign(base, { kind: 'shape', shape: o.shape, fill: o.shape === 'line' ? 'none' : ((o.style && o.style.fill) || theme().accent), stroke: o.shape === 'line' ? ((o.style && (o.style.stroke || o.style.fill)) || theme().accent) : (o.style && o.style.stroke) || 'none', strokeW: (o.style && o.style.strokeW) || (o.shape === 'line' ? 4 : 0), paras, valign: 'middle' }));
        else items.push(Object.assign(base, { kind: 'text', fill: 'none', paras, valign: st.valign }));
      });
      return { bg, items, transition: s.transition };
    });
    host.remove();
    return { width: SW, height: SH, rtl: deck.rtl, slides, title: baseName(), font: theme().bodyFont };
  }
  function bgFill(s) {
    const bg = s.bg && s.bg.color ? s.bg.color : theme().bg;
    const m = /linear-gradient\((\d+)deg\s*,(.*)\)/.exec(bg);
    if (m) {
      const stops = m[2].split(/,(?![^(]*\))/).map((x) => x.trim()).map((x) => { const mm = /(#[0-9a-f]{3,6})\s*(\d+)?%?/i.exec(x); return mm ? { color: mm[1], pos: mm[2] != null ? +mm[2] : null } : null; }).filter(Boolean);
      stops.forEach((st, i) => { if (st.pos == null) st.pos = (i / Math.max(1, stops.length - 1)) * 100; });
      return { stops, angle: +m[1] };
    }
    return bg;
  }
  function toPngData(url) {
    if (/^data:image\/(png|jpe?g|gif)/.test(url)) return url;
    return url;
  }
  function extractParas(el) {
    const blocks = el.children.length ? Array.from(el.children) : [el];
    return blocks.map((b) => {
      const cs = getComputedStyle(b);
      const dir = cs.direction;
      let align = cs.textAlign;
      if (align === 'start') align = dir === 'rtl' ? 'right' : 'left';
      if (align === 'end') align = dir === 'rtl' ? 'left' : 'right';
      const runs = [];
      const walk = (n) => {
        for (const c of n.childNodes) {
          if (c.nodeType === 3) {
            if (!c.nodeValue) continue;
            const pcs = getComputedStyle(c.parentElement);
            runs.push({ text: c.nodeValue, b: parseInt(pcs.fontWeight, 10) >= 600, i: pcs.fontStyle === 'italic', u: (pcs.textDecorationLine || '').includes('underline'), color: rgbHex(pcs.color), size: parseFloat(pcs.fontSize), font: pcs.fontFamily.split(',')[0].replace(/["']/g, '').trim() });
          } else if (c.nodeType === 1 && c.tagName === 'BR') runs.push({ text: '\v', size: parseFloat(cs.fontSize) });
          else if (c.nodeType === 1) walk(c);
        }
      };
      walk(b);
      return { dir, align, bullet: b.classList && b.classList.contains('bullet'), num: b.classList && b.classList.contains('num'), lineHeight: parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || null, runs: runs.filter((r) => r.text !== '\v') };
    });
  }
  function rgbHex(c) { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c || ''); return m ? W.color.rgbToHex(+m[1], +m[2], +m[3]) : '#000000'; }
  async function exportAs(fmt) {
    if (fmt === 'pdf') { await W.exportPDF(printHTML(), baseName()); return; }
    if (fmt === 'pptx') {
      const bytes = await W.busy('ui.processing', () => MinbarPptx.write(pptxModel()));
      const res = await W.files.save({ data: bytes, name: baseName() + '.pptx', types: [{ name: { ar: 'عرض PowerPoint', en: 'PowerPoint presentation' }, ext: ['pptx'] }] });
      if (res) W.toast(W.t('ui.exported'), 'success');
    }
  }

  /* ═══════════ شريط الأدوات ═══════════ */
  const tb = document.getElementById('toolbar');
  const tbtn = (icon, tip, fn, opts) => { const b = W.iconButton(icon, tip, fn, opts); b.addEventListener('mousedown', (e) => e.preventDefault()); tb.append(b); return b; };
  const tsep = () => tb.append(W.h('div', { class: 'w-sep' }));
  tbtn('undo', 'cmd.undo', undo, { shortcut: 'Mod+Z' });
  tbtn('redo', 'cmd.redo', redo, { shortcut: 'Mod+Y' });
  tsep();
  const addSlideBtn = W.h('button', { class: 'w-btn sm', type: 'button', onclick: (e) => layoutMenu(e.currentTarget) }, W.iconEl('plus'), W.h('span', { 'data-i18n': 'm.newSlide', text: W.t('m.newSlide') }));
  tb.append(addSlideBtn);
  tsep();
  tbtn('text', 'm.textbox', addText);
  tbtn('image', 'm.image', () => addImage());
  tbtn('shapes', 'm.shape', (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    W.showMenu(['rect', 'roundrect', 'ellipse', 'triangle', 'diamond', 'hexagon', 'star', 'heart', 'arrow', 'arrowL', 'callout', 'line'].map((k) => ({ i18n: 'm.sh.' + k, action: () => addShape(k) })), W.isRTL() ? r.right : r.left, r.bottom + 4);
  });
  tsep();
  tbtn('bold', 'ui.bold', () => textCmd('bold', null, 'bold', (v) => !v));
  tbtn('italic', 'ui.italic', () => textCmd('italic', null, 'italic', (v) => !v));
  tbtn('underline', 'ui.underline', () => textCmd('underline', null, 'underline', (v) => !v));
  tbtn('list', 'm.bullets', () => paraClass('bullet'));
  tbtn('list-ordered', 'm.numbers', () => paraClass('num'));
  tsep();
  tbtn('bring-front', 'm.front', () => arrange(true));
  tbtn('send-back', 'm.back', () => arrange(false));
  tb.append(W.h('div', { class: 'grow' }));
  const presentBtn = W.h('button', { class: 'w-btn primary', type: 'button', onclick: () => present(false) }, W.iconEl('present'), W.h('span', { 'data-i18n': 'm.present', text: W.t('m.present') }));
  tb.append(presentBtn);

  /* ═══════════ القوائم ═══════════ */
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'cmd.new', icon: 'file-plus', shortcut: 'Mod+N', action: newDeckFlow },
      { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), global: true },
      { i18n: 'cmd.export', icon: 'export', submenu: [{ i18n: 'cmd.exportPDF', action: () => exportAs('pdf') }, { i18n: 'm.exportPptx', action: () => exportAs('pptx') }] },
      { i18n: 'cmd.print', icon: 'print', shortcut: 'Mod+P', action: () => W.printHTML(printHTML()) },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'cmd.cut', icon: 'cut', shortcut: 'Mod+X', action: () => copy(true) },
      { i18n: 'cmd.copy', icon: 'copy', shortcut: 'Mod+C', action: () => copy(false) },
      { i18n: 'cmd.paste', icon: 'paste', shortcut: 'Mod+V', action: paste },
      { i18n: 'cmd.duplicate', icon: 'duplicate', shortcut: 'Mod+D', action: duplicate },
      { i18n: 'cmd.delete', icon: 'trash', action: del },
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => { selection = slide().objects.map((o) => o.id); renderOverlay(); renderProps(); } }
    ] },
    { i18n: 'menu.insert', items: [
      { i18n: 'm.newSlide', icon: 'plus', shortcut: 'Mod+M', action: () => addSlide('content') },
      { i18n: 'm.textbox', icon: 'text', action: addText },
      { i18n: 'm.image', icon: 'image', action: () => addImage() },
      { i18n: 'm.shape', icon: 'shapes', submenu: ['rect', 'roundrect', 'ellipse', 'triangle', 'diamond', 'hexagon', 'star', 'heart', 'arrow', 'arrowL', 'callout', 'line'].map((k) => ({ i18n: 'm.sh.' + k, action: () => addShape(k) })) }
    ] },
    { i18n: 'menu.slide', items: [
      { i18n: 'm.newSlide', icon: 'plus', submenu: Object.keys(LAYOUTS).map((k) => ({ label: () => W.L(LAYOUTS[k].name), action: () => addSlide(k) })) },
      { i18n: 'm.dupSlide', icon: 'duplicate', action: dupSlide },
      { i18n: 'm.delSlide', icon: 'trash', action: delSlide },
      '-',
      { i18n: 'm.theme', icon: 'palette', submenu: Object.keys(THEMES).map((k) => ({ label: () => W.L(THEMES[k].name), checked: () => deck.theme === k, action: () => { deck.theme = k; commit(); renderAll(); } })) },
      '-',
      { i18n: 'm.present', icon: 'present', shortcut: 'F5', action: () => present(false), global: true },
      { i18n: 'm.presentCur', shortcut: 'Shift+F5', action: () => present(true), global: true }
    ] },
    { i18n: 'menu.arrange', items: [
      { i18n: 'm.front', icon: 'bring-front', shortcut: 'Mod+Shift+]', action: () => arrange(true) },
      { i18n: 'm.back', icon: 'send-back', shortcut: 'Mod+Shift+[', action: () => arrange(false) },
      '-',
      { i18n: 'ui.center', action: () => { alignTo('hcenter'); alignTo('vcenter'); } },
      { i18n: 'ui.left', action: () => alignTo('left') }, { i18n: 'ui.right', action: () => alignTo('right') },
      { i18n: 'ui.top', action: () => alignTo('top') }, { i18n: 'ui.bottom', action: () => alignTo('bottom') }
    ] },
    { i18n: 'menu.view', items: W.stdViewItems() },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus });
  const status = chrome.status;
  function updateStatus() {
    status.item('slide').textContent = W.t('m.slideOf', { i: cur + 1, n: deck.slides.length });
    status.item('theme').textContent = W.t('m.theme') + ': ' + W.L(theme().name);
  }

  /* ═══════════ شاشة الترحيب ═══════════ */
  function sampleDeck() {
    const d = newDeck('layl');
    const ar = W.lang === 'ar';
    d.slides = [newSlide('title', d.rtl), newSlide('content', d.rtl), newSlide('two', d.rtl), newSlide('quote', d.rtl), newSlide('section', d.rtl)];
    d.slides[0].objects[0].html = '<div>' + (ar ? 'منصة ورشة' : 'WARSHA Suite') + '</div>';
    d.slides[0].objects[1].html = '<div>' + (ar ? 'اثنا عشر تطبيق\u064Bا إبداعي\u064Bا بالعربية' : 'Twelve creative apps in Arabic') + '</div>';
    d.slides[1].objects[0].html = '<div>' + (ar ? 'لماذا ورشة؟' : 'Why WARSHA?') + '</div>';
    d.slides[1].objects[1].html = (ar ? ['واجهة عربية كاملة من اليمين لليسار', 'تعمل دون إنترنت على ويندوز وماك ولينكس', 'متوافقة مع ملفات Word وExcel وPowerPoint'] : ['Complete right-to-left Arabic interface', 'Works offline on Windows, macOS and Linux', 'Compatible with Word, Excel and PowerPoint files']).map((x) => '<div class="bullet">' + x + '</div>').join('');
    d.slides[1].objects[1].anim = 'rise';
    d.slides[1].transition = 'slide';
    return d;
  }
  const welcome = W.welcome(stage, {
    text: 'm.welcomeText',
    actions: [
      { i18n: 'm.newDeck', icon: 'file-plus', primary: true, action: newDeckFlow },
      { i18n: 'cmd.open', icon: 'folder', action: open },
      { i18n: 'm.sample', icon: 'present', action: () => loadDeck(sampleDeck(), {}) }
    ],
    openRecent: openPath
  });
  welcome.el.style.zIndex = 20;
  welcome.el.style.background = 'var(--canvas-bg)';

  W.on('langchange', () => { renderAll(); });
  W.dropZone(stage, async (files) => {
    const deckFile = files.find((f) => f.ext === 'minbar');
    if (deckFile) { if (await W.confirmDiscard()) loadFile({ name: deckFile.name, path: deckFile.path, data: deckFile.data }); return; }
    const imgs = files.filter((f) => /^(png|jpe?g|gif|webp|svg|bmp)$/.test(f.ext)).map((f) => ({ data: 'data:' + W.mime(f.ext) + ';base64,' + W.b64.encode(new Uint8Array(f.data)) }));
    if (imgs.length) addImage(imgs);
  });
  W.onExternalFile((f) => loadFile(f), 'text');
  W.fontsReady().then(() => { renderAll(); });
  commit();
  renderAll();

  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const saved = deck;
      deck = sampleDeck();
      const bytes = await MinbarPptx.write(pptxModel());
      if (!bytes || bytes.length < 3000) errors.push('pptx too small');
      const z = await JSZip.loadAsync(bytes);
      if (!z.file('ppt/slides/slide5.xml')) errors.push('pptx slide count');
      deck = saved;
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
  window.__minbar = { get deck() { return deck; }, get cur() { return cur; }, get selection() { return selection; } };
})();
