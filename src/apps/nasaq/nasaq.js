/* نسق Nasaq — تنسيق الصفحات والمجلات والكتيبات للطباعة */
(function () {
  'use strict';

  W.init({
    id: 'nasaq',
    i18n: {
      ar: {
        'n.select': 'تحديد', 'n.textFrame': 'إطار نص', 'n.imageFrame': 'إطار صورة', 'n.rect': 'مستطيل', 'n.ellipse': 'دائرة', 'n.line': 'خط', 'n.hand': 'يد',
        'n.pages': 'الصفحات', 'n.addPage': 'إضافة صفحة', 'n.dupPage': 'تكرار الصفحة', 'n.delPage': 'حذف الصفحة', 'n.document': 'المستند', 'n.pageSize': 'مقاس الصفحة', 'n.orientation': 'الاتجاه',
        'n.portrait': 'طولي', 'n.landscape': 'عرضي', 'n.custom': 'مخصص', 'n.width': 'العرض (مم)', 'n.height': 'الارتفاع (مم)', 'n.margins': 'الهوامش (مم)', 'n.mTop': 'أعلى', 'n.mBottom': 'أسفل', 'n.mInside': 'داخلي', 'n.mOutside': 'خارجي',
        'n.columns': 'الأعمدة', 'n.gutter': 'الفاصل (مم)', 'n.inset': 'الحشوة (مم)', 'n.direction': 'اتجاه المستند', 'n.rtl': 'من اليمين لليسار', 'n.ltr': 'من اليسار لليمين',
        'n.styles': 'أنماط الفقرات', 'n.editStyle': 'تعديل النمط', 'n.newStyle': 'نمط جديد', 'n.font': 'الخط', 'n.size': 'الحجم (نقطة)', 'n.weight': 'السماكة', 'n.color': 'اللون', 'n.align': 'المحاذاة', 'n.lh': 'تباعد الأسطر',
        'n.before': 'مسافة قبل (نقطة)', 'n.after': 'مسافة بعد (نقطة)', 'n.indent': 'إزاحة السطر الأول (نقطة)', 'n.styleName': 'اسم النمط', 'n.a.start': 'بداية', 'n.a.center': 'وسط', 'n.a.end': 'نهاية', 'n.a.justify': 'ضبط',
        'n.master': 'الصفحة الرئيسية', 'n.editMaster': 'تحرير الصفحة الرئيسية', 'n.doneMaster': 'العودة للصفحات', 'n.noMaster': 'بدون صفحة رئيسية', 'n.masterHint': 'العناصر هنا تظهر في كل الصفحات. استخدم {page} لرقم الصفحة و{pages} لعددها.',
        'n.story': 'النص', 'n.overset': 'نص زائد لا يتسع في الإطارات', 'n.autoflow': 'تدفق تلقائي (إضافة صفحات)', 'n.link': 'ربط بإطار تال\u064D', 'n.unlink': 'فك الربط بعد هذا الإطار', 'n.linkHint': 'ارسم إطار\u064Bا جديد\u064Bا ليكمل النص فيه',
        'n.importText': 'استيراد نص (TXT/DOCX)…', 'n.placeImage': 'وضع صورة…', 'n.fit': 'الملاءمة', 'n.fitFill': 'ملء الإطار', 'n.fitFit': 'احتواء', 'n.focusX': 'تركيز أفقي', 'n.focusY': 'تركيز عمودي',
        'n.fill': 'التعبئة', 'n.stroke': 'الحد', 'n.strokeW': 'سماكة الحد (نقطة)', 'n.radius': 'استدارة (نقطة)', 'n.none': 'بدون', 'n.frame': 'الإطار', 'n.position': 'الموضع والحجم (مم)',
        'n.exportPdf': 'تصدير PDF للطباعة…', 'n.exportPng': 'تصدير الصفحة كصورة…', 'n.newDoc': 'مستند جديد', 'n.template': 'القالب', 'n.t.blank': 'فارغ', 'n.t.book': 'كتاب (A5)', 'n.t.magazine': 'مقالة مجلة (A4)', 'n.t.newsletter': 'نشرة (A4، 3 أعمدة)',
        'n.welcomeText': 'صم\u0651م الكتب والمجلات والنشرات بإطارات نص مترابطة وأنماط فقرات وصفحات رئيسية، وصد\u0651ر PDF جاهز\u064Bا للمطبعة', 'n.pageN': 'صفحة {n}', 'n.bold': 'عريض', 'n.italic': 'مائل', 'n.underline': 'تسطير',
        'n.s.body': 'نص أساسي', 'n.s.h1': 'عنوان رئيسي', 'n.s.h2': 'عنوان فرعي', 'n.s.quote': 'اقتباس', 'n.s.caption': 'تعليق', 'n.s.lead': 'مقدمة', 'n.showGuides': 'إظهار الأدلة', 'n.snap': 'الالتصاق', 'n.frameOrder': 'ترتيب الإطار في السلسلة'
      },
      en: {
        'n.select': 'Select', 'n.textFrame': 'Text frame', 'n.imageFrame': 'Image frame', 'n.rect': 'Rectangle', 'n.ellipse': 'Ellipse', 'n.line': 'Line', 'n.hand': 'Hand',
        'n.pages': 'Pages', 'n.addPage': 'Add page', 'n.dupPage': 'Duplicate page', 'n.delPage': 'Delete page', 'n.document': 'Document', 'n.pageSize': 'Page size', 'n.orientation': 'Orientation',
        'n.portrait': 'Portrait', 'n.landscape': 'Landscape', 'n.custom': 'Custom', 'n.width': 'Width (mm)', 'n.height': 'Height (mm)', 'n.margins': 'Margins (mm)', 'n.mTop': 'Top', 'n.mBottom': 'Bottom', 'n.mInside': 'Inside', 'n.mOutside': 'Outside',
        'n.columns': 'Columns', 'n.gutter': 'Gutter (mm)', 'n.inset': 'Inset (mm)', 'n.direction': 'Document direction', 'n.rtl': 'Right to left', 'n.ltr': 'Left to right',
        'n.styles': 'Paragraph styles', 'n.editStyle': 'Edit style', 'n.newStyle': 'New style', 'n.font': 'Font', 'n.size': 'Size (pt)', 'n.weight': 'Weight', 'n.color': 'Color', 'n.align': 'Alignment', 'n.lh': 'Line spacing',
        'n.before': 'Space before (pt)', 'n.after': 'Space after (pt)', 'n.indent': 'First line indent (pt)', 'n.styleName': 'Style name', 'n.a.start': 'Start', 'n.a.center': 'Center', 'n.a.end': 'End', 'n.a.justify': 'Justify',
        'n.master': 'Master page', 'n.editMaster': 'Edit master page', 'n.doneMaster': 'Back to pages', 'n.noMaster': 'No master', 'n.masterHint': 'Items here appear on every page. Use {page} for the page number and {pages} for the total.',
        'n.story': 'Text', 'n.overset': 'Overset text does not fit in the frames', 'n.autoflow': 'Autoflow (add pages)', 'n.link': 'Link to next frame', 'n.unlink': 'Break thread after this frame', 'n.linkHint': 'Draw a new frame to continue the text',
        'n.importText': 'Import text (TXT/DOCX)…', 'n.placeImage': 'Place image…', 'n.fit': 'Fitting', 'n.fitFill': 'Fill frame', 'n.fitFit': 'Fit proportionally', 'n.focusX': 'Horizontal focus', 'n.focusY': 'Vertical focus',
        'n.fill': 'Fill', 'n.stroke': 'Stroke', 'n.strokeW': 'Stroke weight (pt)', 'n.radius': 'Corner radius (pt)', 'n.none': 'None', 'n.frame': 'Frame', 'n.position': 'Position & size (mm)',
        'n.exportPdf': 'Export print PDF…', 'n.exportPng': 'Export page as image…', 'n.newDoc': 'New document', 'n.template': 'Template', 'n.t.blank': 'Blank', 'n.t.book': 'Book (A5)', 'n.t.magazine': 'Magazine article (A4)', 'n.t.newsletter': 'Newsletter (A4, 3 columns)',
        'n.welcomeText': 'Lay out books, magazines and newsletters with threaded text frames, paragraph styles and master pages, then export print-ready PDF', 'n.pageN': 'Page {n}', 'n.bold': 'Bold', 'n.italic': 'Italic', 'n.underline': 'Underline',
        'n.s.body': 'Body', 'n.s.h1': 'Heading', 'n.s.h2': 'Subheading', 'n.s.quote': 'Quote', 'n.s.caption': 'Caption', 'n.s.lead': 'Lead', 'n.showGuides': 'Show guides', 'n.snap': 'Snap', 'n.frameOrder': 'Frame order in thread'
      }
    }
  });

  const MM = 72 / 25.4; // نقطة لكل مم
  const PX = 96 / 72; // بكسل لكل نقطة
  const toMM = (pt) => Math.round(pt / MM * 10) / 10;
  const $ = (s) => document.querySelector(s);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => W.uid('n');
  const SIZES = { A4: [210, 297], A5: [148, 210], A3: [297, 420], Letter: [215.9, 279.4], B5: [176, 250] };

  /* أنماط الصفحة المشتركة بين العرض والتصدير */
  const PAGE_CSS = '.n-page{position:relative;overflow:hidden;background:#fff;color:#000}' +
    '.n-frame{position:absolute;box-sizing:border-box}' +
    '.n-col{position:absolute;overflow:hidden}' +
    '.n-col p{margin:0;orphans:1;widows:1;overflow-wrap:break-word;word-wrap:break-word}' +
    '.n-col p:first-child{margin-top:0!important}' +
    '.n-img{width:100%;height:100%;display:block}' +
    '.n-shape{width:100%;height:100%;box-sizing:border-box}';

  let D = null;
  let pi = 0;
  let sel = [];
  let tool = 'select';
  let zoom = 1;
  let editingMaster = false;
  let showGuides = true, snapOn = true;
  let linkFrom = null;
  const flows = {};

  const scroller = $('#scroller'), pagesWrap = $('#pages'), thumbsEl = $('#thumbs'), propsEl = $('#props');
  const styleTag = document.createElement('style');
  styleTag.textContent = PAGE_CSS;
  document.head.append(styleTag);

  /* ═══════════ الأنماط ═══════════ */
  const defaultStyles = () => ({
    body: { name: 'n.s.body', font: 'Amiri', size: 11, weight: 400, color: '#1a1a1a', align: 'justify', lh: 1.65, before: 0, after: 6, indent: 0 },
    lead: { name: 'n.s.lead', font: 'Amiri', size: 13, weight: 700, color: '#333333', align: 'justify', lh: 1.6, before: 0, after: 10, indent: 0 },
    h1: { name: 'n.s.h1', font: 'Cairo', size: 26, weight: 700, color: '#111111', align: 'start', lh: 1.3, before: 0, after: 12, indent: 0 },
    h2: { name: 'n.s.h2', font: 'Cairo', size: 15, weight: 700, color: '#fb3448', align: 'start', lh: 1.35, before: 12, after: 6, indent: 0 },
    quote: { name: 'n.s.quote', font: 'Amiri', size: 15, weight: 700, color: '#fb3448', align: 'center', lh: 1.5, before: 10, after: 10, indent: 0 },
    caption: { name: 'n.s.caption', font: 'Tajawal', size: 8.5, weight: 400, color: '#666666', align: 'start', lh: 1.4, before: 2, after: 2, indent: 0 }
  });
  const styleName = (s) => (s.name && s.name.startsWith('n.s.') ? W.t(s.name) : s.name || '');
  function paraCSS(st, cont, splitHead) {
    const al = st.align === 'start' ? 'start' : st.align === 'end' ? 'end' : st.align;
    return 'font-family:' + W.fontStack(st.font).replace(/"/g, "'") + ';font-size:' + st.size + 'pt;font-weight:' + (st.weight || 400) + ';color:' + st.color + ';text-align:' + al +
      ';line-height:' + st.lh + ';margin:' + (cont ? 0 : st.before) + 'pt 0 ' + (splitHead ? 0 : st.after) + 'pt 0;text-indent:' + (cont ? 0 : st.indent || 0) + 'pt' + (splitHead && st.align === 'justify' ? ';text-align-last:justify' : '') + (st.italic ? ';font-style:italic' : '');
  }

  /* ═══════════ محرك تدفق النص ═══════════ */
  // حاوية قياس مخفية بحجم صفري (الإزاحة السالبة تُنشئ تمريرًا أفقيًا في الصفحات العربية)
  const measureHost = W.h('div', { style: { position: 'fixed', top: '0', insetInlineStart: '0', width: '0', height: '0', overflow: 'hidden', visibility: 'hidden', pointerEvents: 'none' } });
  document.body.append(measureHost);
  function findFrame(id) {
    for (const p of D.pages) { const f = p.els.find((x) => x.id === id); if (f) return f; }
    return D.master.els.find((x) => x.id === id) || null;
  }
  function frameBoxes(f) {
    const cols = Math.max(1, f.cols || 1), ins = f.inset || 0, gut = f.gutter == null ? 12 : f.gutter;
    const colW = Math.max(10, (f.w - ins * 2 - gut * (cols - 1)) / cols);
    const out = [];
    for (let c = 0; c < cols; c++) {
      const x = D.dir === 'rtl' ? f.w - ins - (c + 1) * colW - c * gut : ins + c * (colW + gut);
      out.push({ frame: f, col: c, x, y: ins, w: colW, h: Math.max(4, f.h - ins * 2) });
    }
    return out;
  }
  function textLen(html) { const t = document.createElement('div'); t.innerHTML = html; return t.textContent.length; }
  /** قص HTML إلى المقطع [a, b) من النص مع الحفاظ على التنسيق */
  function sliceHTML(html, a, b) {
    const box = document.createElement('div');
    box.innerHTML = html;
    let pos = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((c) => {
        if (c.nodeType === 3) {
          const t = c.nodeValue, s = Math.max(a, pos), e = Math.min(b, pos + t.length);
          if (e <= s) c.remove(); else c.nodeValue = t.slice(s - pos, e - pos);
          pos += t.length;
        } else if (c.nodeType === 1) { walk(c); if (!c.textContent) c.remove(); }
        else c.remove();
      });
    };
    walk(box);
    return box.innerHTML;
  }
  function paraEl(it) {
    const st = D.styles[it.s] || D.styles.body;
    const p = document.createElement('p');
    p.setAttribute('style', paraCSS(st, it.cont, it.head));
    p.innerHTML = it.h || '\u200B';
    return p;
  }
  function flowStory(sid) {
    const story = D.stories[sid];
    if (!story) return;
    const frames = story.frames.map(findFrame).filter(Boolean);
    const boxes = [];
    frames.forEach((f) => frameBoxes(f).forEach((b) => boxes.push(b)));
    const items = story.paras.map((p) => ({ s: p.s, h: p.h, cont: false }));
    const out = boxes.map(() => []);
    const meas = document.createElement('div');
    meas.dir = D.dir;
    meas.className = 'n-col';
    measureHost.innerHTML = '';
    measureHost.append(meas);
    for (let bi = 0; bi < boxes.length && items.length; bi++) {
      const b = boxes[bi];
      meas.style.width = b.w + 'pt'; meas.style.position = 'relative';
      meas.innerHTML = '';
      const maxPx = b.h * PX + 0.5;
      while (items.length) {
        const it = items[0];
        const node = paraEl(it);
        meas.append(node);
        if (meas.scrollHeight <= maxPx) { out[bi].push(it); items.shift(); continue; }
        node.remove();
        // تقسيم الفقرة عند حدود الكلمات
        const full = it.h || '';
        const tmp = document.createElement('div'); tmp.innerHTML = full;
        const text = tmp.textContent;
        const cands = [];
        for (let i = 1; i < text.length; i++) if (/\s/.test(text[i]) && !/\s/.test(text[i - 1])) cands.push(i);
        let lo = 0, hi = cands.length - 1, best = -1;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          const head = Object.assign({}, it, { h: sliceHTML(full, 0, cands[mid]), head: true });
          const n2 = paraEl(head);
          meas.append(n2);
          const ok = meas.scrollHeight <= maxPx;
          n2.remove();
          if (ok) { best = mid; lo = mid + 1; } else hi = mid - 1;
        }
        if (best >= 0) {
          const cut = cands[best];
          out[bi].push(Object.assign({}, it, { h: sliceHTML(full, 0, cut), head: true }));
          items[0] = Object.assign({}, it, { h: sliceHTML(full, cut, text.length).replace(/^(\s|&nbsp;)+/, ''), cont: true, head: false });
        }
        break;
      }
    }
    flows[sid] = { boxes, out, overset: items.length > 0 };
  }
  function flowAll() { Object.keys(D.stories).forEach(flowStory); }

  /* ═══════════ رسم الصفحات ═══════════ */
  function tokens(html, pageIdx) {
    return html.replace(/\{page\}/g, fmtNum(pageIdx + 1)).replace(/\{pages\}/g, fmtNum(D.pages.length));
  }
  const fmtNum = (n) => (D.digits === 'arabic' ? String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]) : String(n));
  function frameNode(f, pageIdx, mode) {
    const n = document.createElement('div');
    n.className = 'n-frame';
    if (mode === 'live') n.dataset.id = f.id;
    n.style.cssText = 'left:' + f.x + 'pt;top:' + f.y + 'pt;width:' + f.w + 'pt;height:' + f.h + 'pt;' + (f.rot ? 'transform:rotate(' + f.rot + 'deg);' : '') + (f.opacity != null && f.opacity < 1 ? 'opacity:' + f.opacity + ';' : '');
    const fill = f.fill && f.fill !== 'none' ? f.fill : 'transparent';
    const stroke = f.stroke && f.stroke !== 'none' && f.strokeW ? f.strokeW + 'pt solid ' + f.stroke : 'none';
    if (f.type === 'text') {
      n.style.background = fill; n.style.border = stroke;
      const fl = flows[f.story];
      if (fl) {
        fl.boxes.forEach((b, bi) => {
          if (b.frame !== f && b.frame.id !== f.id) return;
          const col = document.createElement('div');
          col.className = 'n-col'; col.dir = D.dir;
          col.style.cssText = 'left:' + b.x + 'pt;top:' + b.y + 'pt;width:' + b.w + 'pt;height:' + b.h + 'pt';
          fl.out[bi].forEach((it) => { const p = paraEl(it); if (pageIdx != null && /\{page/.test(p.innerHTML)) p.innerHTML = tokens(p.innerHTML, pageIdx); col.append(p); });
          n.append(col);
        });
      }
    } else if (f.type === 'image') {
      n.style.border = stroke; n.style.borderRadius = (f.radius || 0) + 'pt'; n.style.overflow = 'hidden'; n.style.background = fill;
      const src = f.src && D.assets[f.src];
      if (src) {
        const img = document.createElement('img');
        img.className = 'n-img'; img.src = src; img.alt = '';
        img.style.objectFit = f.fit === 'fit' ? 'contain' : 'cover';
        img.style.objectPosition = (f.fx == null ? 50 : f.fx) + '% ' + (f.fy == null ? 50 : f.fy) + '%';
        n.append(img);
      } else if (mode === 'live') {
        n.classList.add('n-ph');
        n.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><line x1="0" y1="0" x2="100" y2="100" stroke="#9ca3af" stroke-width="0.6" vector-effect="non-scaling-stroke"/><line x1="100" y1="0" x2="0" y2="100" stroke="#9ca3af" stroke-width="0.6" vector-effect="non-scaling-stroke"/></svg>';
      }
    } else if (f.type === 'rect' || f.type === 'ellipse') {
      const s = document.createElement('div');
      s.className = 'n-shape';
      s.style.cssText = 'background:' + fill + ';border:' + stroke + ';border-radius:' + (f.type === 'ellipse' ? '50%' : (f.radius || 0) + 'pt');
      n.append(s);
    } else if (f.type === 'line') {
      n.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible;display:block"><line x1="0" y1="50" x2="100" y2="50" stroke="' + (f.stroke || '#000') + '" stroke-width="' + (f.strokeW || 1) + 'pt" vector-effect="non-scaling-stroke"/></svg>';
    }
    return n;
  }
  function pageNode(p, idx, mode) {
    const n = document.createElement('div');
    n.className = 'n-page';
    n.dir = D.dir;
    n.style.width = D.w + 'pt'; n.style.height = D.h + 'pt';
    if (mode === 'live') n.dataset.pi = idx;
    const masterEls = p && !p.noMaster ? D.master.els : [];
    if (!editingMaster || mode !== 'live') masterEls.forEach((f) => { const fn = frameNode(f, idx, mode === 'live' ? 'master' : mode); if (mode === 'live') fn.classList.add('n-masterel'); n.append(fn); });
    (p ? p.els : D.master.els).forEach((f) => n.append(frameNode(f, idx, mode)));
    return n;
  }
  function guidesNode() {
    const g = W.h('div', { class: 'n-guides' });
    const m = D.margins;
    g.append(W.h('div', { class: 'n-margin', style: { top: m.t + 'pt', bottom: m.b + 'pt', left: (D.dir === 'rtl' ? m.o : m.i) + 'pt', right: (D.dir === 'rtl' ? m.i : m.o) + 'pt' } }));
    const cols = D.cols || 1;
    if (cols > 1) {
      const left = D.dir === 'rtl' ? m.o : m.i, right = D.dir === 'rtl' ? m.i : m.o;
      const cw = (D.w - left - right - D.gutter * (cols - 1)) / cols;
      for (let c = 1; c < cols; c++) {
        const x = left + c * cw + (c - 1) * D.gutter;
        g.append(W.h('div', { class: 'n-colguide', style: { left: x + 'pt', width: D.gutter + 'pt', top: m.t + 'pt', bottom: m.b + 'pt' } }));
      }
    }
    return g;
  }
  function render() {
    if (!D) return;
    flowAll();
    pagesWrap.innerHTML = '';
    pagesWrap.style.zoom = zoom;
    const list = editingMaster ? [null] : D.pages;
    list.forEach((p, i) => {
      const holder = W.h('div', { class: 'n-pageholder' + (!editingMaster && i === pi ? ' current' : '') });
      const pn = pageNode(p, editingMaster ? 0 : i, 'live');
      if (showGuides) pn.append(guidesNode());
      pn.append(W.h('div', { class: 'n-ui' }));
      holder.append(pn, W.h('div', { class: 'n-pagelabel', text: editingMaster ? W.t('n.master') : W.t('n.pageN', { n: i + 1 }) }));
      pagesWrap.append(holder);
    });
    drawUI();
    renderThumbsSoon();
    updateStatus();
  }
  const pageEl = (i) => pagesWrap.querySelector('.n-page[data-pi="' + (editingMaster ? 0 : i) + '"]');
  const curEls = () => (editingMaster ? D.master.els : D.pages[pi].els);
  const selFrames = () => sel.map((id) => curEls().find((f) => f.id === id)).filter(Boolean);
  function drawUI() {
    pagesWrap.querySelectorAll('.n-ui').forEach((u) => { u.innerHTML = ''; });
    const pe = pageEl(pi);
    if (!pe) return;
    const ui = pe.querySelector('.n-ui');
    const hs = 7 / zoom;
    const objs = selFrames();
    // إبراز سلسلة الإطارات المترابطة
    const storyIds = new Set(objs.filter((f) => f.type === 'text').map((f) => f.story));
    storyIds.forEach((sid) => {
      const st = D.stories[sid];
      st.frames.forEach((fid, k) => {
        const f = findFrame(fid);
        if (!f) return;
        const holderPage = editingMaster ? 0 : D.pages.findIndex((p) => p.els.includes(f));
        const pg = pageEl(holderPage);
        if (!pg) return;
        const u = pg.querySelector('.n-ui');
        u.append(W.h('div', { class: 'n-thread', style: { left: f.x + 'pt', top: f.y + 'pt', width: f.w + 'pt', height: f.h + 'pt' } }, W.h('span', { class: 'n-badge', text: String(k + 1), style: { fontSize: (10 / zoom) + 'px', padding: '0 ' + (4 / zoom) + 'px' } })));
      });
    });
    objs.forEach((f) => {
      const box = W.h('div', { class: 'n-sel', style: { left: f.x + 'pt', top: f.y + 'pt', width: f.w + 'pt', height: f.h + 'pt', borderWidth: (1.5 / zoom) + 'px' } });
      if (objs.length === 1) ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach((k) => box.append(W.h('div', { class: 'n-hd n-hd-' + k, 'data-h': k, style: { width: hs + 'px', height: hs + 'px', margin: (-hs / 2) + 'px', borderWidth: (1 / zoom) + 'px' } })));
      if (objs.length === 1 && f.type === 'text') {
        const fl = flows[f.story];
        const last = D.stories[f.story].frames[D.stories[f.story].frames.length - 1] === f.id;
        const port = W.h('div', { class: 'n-port' + (fl && fl.overset && last ? ' overset' : ''), 'data-port': '1', text: fl && fl.overset && last ? '+' : '', title: W.t('n.link'), style: { width: (12 / zoom) + 'px', height: (12 / zoom) + 'px', fontSize: (11 / zoom) + 'px', lineHeight: (10 / zoom) + 'px' } });
        box.append(port);
      }
      ui.append(box);
    });
    // مؤشر النص الزائد على آخر إطار في كل قصة (حتى دون تحديد)
    Object.keys(flows).forEach((sid) => {
      const fl = flows[sid];
      if (!fl.overset) return;
      const st = D.stories[sid];
      const f = findFrame(st.frames[st.frames.length - 1]);
      if (!f || objs.includes(f)) return;
      const pIdx = editingMaster ? 0 : D.pages.findIndex((p) => p.els.includes(f));
      const pg = pageEl(pIdx);
      if (!pg) return;
      pg.querySelector('.n-ui').append(W.h('div', { class: 'n-overmark', style: { left: (D.dir === 'rtl' ? f.x : f.x + f.w) + 'pt', top: (f.y + f.h) + 'pt', width: (12 / zoom) + 'px', height: (12 / zoom) + 'px', fontSize: (11 / zoom) + 'px', lineHeight: (10 / zoom) + 'px' }, text: '+' }));
    });
    if (draft) ui.append(W.h('div', { class: 'n-draft', style: { left: draft.x + 'pt', top: draft.y + 'pt', width: draft.w + 'pt', height: draft.h + 'pt' } }));
    if (guides.length) guides.forEach((g) => ui.append(W.h('div', { class: 'n-snapguide', style: g.x != null ? { left: g.x + 'pt', top: 0, bottom: 0, width: (1 / zoom) + 'px' } : { top: g.y + 'pt', left: 0, right: 0, height: (1 / zoom) + 'px' } })));
  }

  /* ═══════════ السجل ═══════════ */
  const hist = { stack: [], index: -1 };
  const snapshot = () => JSON.stringify(Object.assign({}, D, { assets: undefined }));
  function commit() {
    const s = snapshot();
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1); hist.stack.push(s);
    if (hist.stack.length > 80) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
  }
  function restore(s) { const assets = D.assets; D = JSON.parse(s); D.assets = assets; pi = Math.min(pi, D.pages.length - 1); sel = sel.filter((id) => curEls().some((f) => f.id === id)); render(); renderProps(); W.setDirty(true); }
  function undo() { if (hist.index > 0) { hist.index--; restore(hist.stack[hist.index]); } }
  function redo() { if (hist.index < hist.stack.length - 1) { hist.index++; restore(hist.stack[hist.index]); } }

  /* ═══════════ التفاعل ═══════════ */
  let drag = null, draft = null, guides = [];
  const docPoint = (e, pe) => { const r = pe.getBoundingClientRect(); return { x: (e.clientX - r.left) / (r.width / D.w), y: (e.clientY - r.top) / (r.height / D.h) }; };
  function snapTargets(exclude) {
    const m = D.margins, left = D.dir === 'rtl' ? m.o : m.i, right = D.w - (D.dir === 'rtl' ? m.i : m.o);
    const xs = [0, D.w / 2, D.w, left, right], ys = [0, D.h / 2, D.h, m.t, D.h - m.b];
    const cols = D.cols || 1;
    if (cols > 1) { const cw = (right - left - D.gutter * (cols - 1)) / cols; for (let c = 1; c < cols; c++) { const x = left + c * cw + (c - 1) * D.gutter; xs.push(x, x + D.gutter); } }
    curEls().forEach((f) => { if (exclude.has(f.id)) return; xs.push(f.x, f.x + f.w / 2, f.x + f.w); ys.push(f.y, f.y + f.h / 2, f.y + f.h); });
    return { xs, ys };
  }
  function snapVal(v, targets, th) { let best = null; targets.forEach((t) => { const d = t - v; if (Math.abs(d) <= th && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, t }; }); return best; }
  scroller.addEventListener('pointerdown', (e) => {
    if (!D || e.button !== 0) return;
    const pe = e.target.closest('.n-page');
    if (!pe) { if (sel.length) { sel = []; drawUI(); renderProps(); } return; }
    const idx = editingMaster ? 0 : +pe.dataset.pi;
    if (!editingMaster && idx !== pi) { pi = idx; sel = []; markCurrent(); }
    const p = docPoint(e, pe);
    scroller.setPointerCapture(e.pointerId);
    const hd = e.target.closest('[data-h]');
    if (e.target.closest('[data-port]')) { linkFrom = selFrames()[0]; setTool('text'); hint.textContent = W.t('n.linkHint'); return; }
    if (hd) { const f = selFrames()[0]; drag = { mode: 'resize', h: hd.dataset.h, f, start: p, o: clone(f), pe }; return; }
    if (tool === 'hand') { drag = { mode: 'pan', sx: e.clientX, sy: e.clientY, l: scroller.scrollLeft, t: scroller.scrollTop }; return; }
    if (tool !== 'select') { drag = { mode: 'draw', start: p, pe }; draft = { x: p.x, y: p.y, w: 0, h: 0 }; return; }
    const fn = e.target.closest('.n-frame[data-id]');
    if (fn) {
      const id = fn.dataset.id;
      if (e.shiftKey) sel = sel.includes(id) ? sel.filter((x) => x !== id) : sel.concat(id);
      else if (!sel.includes(id)) sel = [id];
      drawUI(); renderProps();
      drag = { mode: 'move', start: p, orig: selFrames().map((f) => ({ f, x: f.x, y: f.y })), moved: false, pe };
      return;
    }
    sel = []; drawUI(); renderProps();
  });
  scroller.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (drag.mode === 'pan') { scroller.scrollLeft = drag.l - (e.clientX - drag.sx); scroller.scrollTop = drag.t - (e.clientY - drag.sy); return; }
    const p = docPoint(e, drag.pe);
    const th = 5 / zoom;
    if (drag.mode === 'move') {
      let dx = p.x - drag.start.x, dy = p.y - drag.start.y;
      if (!drag.moved && Math.hypot(dx, dy) * zoom * PX < 3) return;
      drag.moved = true;
      guides = [];
      if (snapOn && !e.altKey) {
        const x1 = Math.min(...drag.orig.map((r) => r.x)), y1 = Math.min(...drag.orig.map((r) => r.y));
        const x2 = Math.max(...drag.orig.map((r) => r.x + r.f.w)), y2 = Math.max(...drag.orig.map((r) => r.y + r.f.h));
        const t = snapTargets(new Set(drag.orig.map((r) => r.f.id)));
        let bx = null; [x1, (x1 + x2) / 2, x2].forEach((v) => { const s = snapVal(v + dx, t.xs, th); if (s && (!bx || Math.abs(s.d) < Math.abs(bx.d))) bx = s; });
        let by = null; [y1, (y1 + y2) / 2, y2].forEach((v) => { const s = snapVal(v + dy, t.ys, th); if (s && (!by || Math.abs(s.d) < Math.abs(by.d))) by = s; });
        if (bx) { dx += bx.d; guides.push({ x: bx.t }); }
        if (by) { dy += by.d; guides.push({ y: by.t }); }
      }
      drag.orig.forEach((r) => { r.f.x = r.x + dx; r.f.y = r.y + dy; const n = drag.pe.querySelector('.n-frame[data-id="' + r.f.id + '"]'); if (n) { n.style.left = r.f.x + 'pt'; n.style.top = r.f.y + 'pt'; } });
      drawUI(); syncProps();
    } else if (drag.mode === 'resize') {
      const o = drag.o, f = drag.f, h = drag.h;
      let x = o.x, y = o.y, w = o.w, hh = o.h;
      let px = p.x, py = p.y;
      if (snapOn && !e.altKey) { const t = snapTargets(new Set([f.id])); const sx = snapVal(px, t.xs, th), sy = snapVal(py, t.ys, th); if (sx) px = sx.t; if (sy) py = sy.t; }
      if (h.includes('e')) w = Math.max(6, px - o.x);
      if (h.includes('w')) { x = Math.min(px, o.x + o.w - 6); w = o.x + o.w - x; }
      if (h.includes('s')) hh = Math.max(6, py - o.y);
      if (h.includes('n')) { y = Math.min(py, o.y + o.h - 6); hh = o.y + o.h - y; }
      if (e.shiftKey && h.length === 2) { const r = o.w / o.h; if (w / r > hh) hh = w / r; else w = hh * r; if (h.includes('w')) x = o.x + o.w - w; if (h.includes('n')) y = o.y + o.h - hh; }
      Object.assign(f, { x, y, w, h: hh });
      if (f.type === 'text') render(); else { const n = drag.pe.querySelector('.n-frame[data-id="' + f.id + '"]'); if (n) n.replaceWith(frameNode(f, pi, 'live')); drawUI(); }
      syncProps();
    } else if (drag.mode === 'draw') {
      let px = p.x, py = p.y;
      if (snapOn && !e.altKey) { const t = snapTargets(new Set()); const sx = snapVal(px, t.xs, th), sy = snapVal(py, t.ys, th); if (sx) px = sx.t; if (sy) py = sy.t; const s0x = snapVal(drag.start.x, t.xs, th), s0y = snapVal(drag.start.y, t.ys, th); if (s0x) drag.start.x = s0x.t; if (s0y) drag.start.y = s0y.t; }
      draft = { x: Math.min(drag.start.x, px), y: Math.min(drag.start.y, py), w: Math.abs(px - drag.start.x), h: Math.abs(py - drag.start.y) };
      if (tool === 'line') { draft.h = 1; draft.y = drag.start.y; }
      drawUI();
    }
  });
  scroller.addEventListener('pointerup', () => {
    if (!drag) return;
    const d = drag; drag = null; guides = [];
    if (d.mode === 'move') { if (d.moved) { commit(); render(); } else drawUI(); return; }
    if (d.mode === 'resize') { commit(); render(); renderProps(); return; }
    if (d.mode === 'draw') {
      let b = draft; draft = null;
      if (!b || (b.w < 4 && b.h < 4)) {
        // نقرة دون سحب: إطار بحجم المنطقة بين الهوامش
        const m = D.margins;
        b = { x: D.dir === 'rtl' ? m.o : m.i, y: Math.max(m.t, d.start.y), w: D.w - m.i - m.o, h: Math.max(40, D.h - m.b - Math.max(m.t, d.start.y)) };
        if (tool !== 'text' && tool !== 'image') b = { x: d.start.x, y: d.start.y, w: 120, h: tool === 'line' ? 1 : 80 };
      }
      createFrame(tool, b);
    }
  });
  scroller.addEventListener('dblclick', (e) => {
    const fn = e.target.closest('.n-frame[data-id]');
    if (!fn) return;
    const f = curEls().find((x) => x.id === fn.dataset.id);
    if (!f) return;
    if (f.type === 'text') { sel = [f.id]; drawUI(); renderProps(); setTimeout(() => { const ed = propsEl.querySelector('.n-editor'); if (ed) ed.focus(); }, 30); }
    if (f.type === 'image') placeImage(f);
  });
  scroller.addEventListener('wheel', (e) => { if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom(zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1)); } }, { passive: false });
  scroller.addEventListener('scroll', () => {
    if (!D || editingMaster) return;
    const holders = pagesWrap.querySelectorAll('.n-pageholder');
    const mid = scroller.getBoundingClientRect().top + scroller.clientHeight / 3;
    let best = pi;
    holders.forEach((h, i) => { const r = h.getBoundingClientRect(); if (r.top <= mid) best = i; });
    if (best !== pi && !drag) { pi = best; sel = []; markCurrent(); renderProps(); }
  });
  function markCurrent() {
    pagesWrap.querySelectorAll('.n-pageholder').forEach((h, i) => h.classList.toggle('current', i === pi));
    thumbsEl.querySelectorAll('.n-thumb').forEach((t, i) => t.classList.toggle('current', i === pi));
    drawUI(); updateStatus();
  }
  function setZoom(z) {
    const st = scroller.scrollTop / Math.max(1, scroller.scrollHeight);
    zoom = W.clamp(z, 0.15, 5);
    pagesWrap.style.zoom = zoom;
    scroller.scrollTop = st * scroller.scrollHeight;
    drawUI(); updateStatus();
  }
  function fitPage() { if (!D) return; setZoom(Math.min((scroller.clientWidth - 60) / (D.w * PX), (scroller.clientHeight - 60) / (D.h * PX))); goPage(pi); }
  function fitWidth() { if (!D) return; setZoom((scroller.clientWidth - 60) / (D.w * PX)); }
  function goPage(i) {
    pi = W.clamp(i, 0, D.pages.length - 1);
    const h = pagesWrap.querySelectorAll('.n-pageholder')[pi];
    if (h) scroller.scrollTop = h.offsetTop * zoom - 20;
    markCurrent();
  }

  /* ═══════════ الإطارات ═══════════ */
  function createFrame(type, b) {
    const f = { id: uid(), type, x: b.x, y: b.y, w: Math.max(6, b.w), h: Math.max(type === 'line' ? 1 : 6, b.h), opacity: 1 };
    if (type === 'text') {
      Object.assign(f, { cols: 1, gutter: D.gutter, inset: 0, fill: 'none', stroke: 'none', strokeW: 0 });
      if (linkFrom && linkFrom.type === 'text') {
        const st = D.stories[linkFrom.story];
        const at = st.frames.indexOf(linkFrom.id);
        st.frames.splice(at + 1, 0, f.id);
        f.story = linkFrom.story;
      } else {
        const sid = uid();
        D.stories[sid] = { paras: [{ s: 'body', h: '' }], frames: [f.id] };
        f.story = sid;
      }
      linkFrom = null;
    } else if (type === 'image') Object.assign(f, { src: null, fit: 'fill', fx: 50, fy: 50, fill: '#f3f4f6', stroke: 'none', strokeW: 0, radius: 0 });
    else if (type === 'line') Object.assign(f, { stroke: '#111111', strokeW: 1 });
    else Object.assign(f, { fill: '#fde8ea', stroke: '#fb3448', strokeW: 0, radius: 0 });
    curEls().push(f);
    sel = [f.id];
    setTool('select');
    commit(); render(); renderProps();
    if (type === 'text') setTimeout(() => { const ed = propsEl.querySelector('.n-editor'); if (ed) ed.focus(); }, 40);
    return f;
  }
  function deleteFrames() {
    const ids = new Set(sel);
    if (!ids.size) return;
    const list = curEls();
    list.filter((f) => ids.has(f.id) && f.type === 'text').forEach((f) => {
      const st = D.stories[f.story];
      if (!st) return;
      st.frames = st.frames.filter((x) => x !== f.id);
      if (!st.frames.length) delete D.stories[f.story];
    });
    if (editingMaster) D.master.els = list.filter((f) => !ids.has(f.id)); else D.pages[pi].els = list.filter((f) => !ids.has(f.id));
    sel = [];
    commit(); render(); renderProps();
  }
  function duplicateFrames() {
    const out = [];
    selFrames().forEach((f) => {
      const c = Object.assign(clone(f), { id: uid(), x: f.x + 12, y: f.y + 12 });
      if (c.type === 'text') { const sid = uid(); D.stories[sid] = { paras: clone(D.stories[f.story].paras), frames: [c.id] }; c.story = sid; }
      curEls().push(c); out.push(c.id);
    });
    sel = out; commit(); render(); renderProps();
  }
  function zorder(front) {
    const ids = new Set(sel), list = curEls();
    const a = list.filter((f) => ids.has(f.id)), b = list.filter((f) => !ids.has(f.id));
    const res = front ? b.concat(a) : a.concat(b);
    if (editingMaster) D.master.els = res; else D.pages[pi].els = res;
    commit(); render();
  }
  function unlinkAfter(f) {
    const st = D.stories[f.story];
    const at = st.frames.indexOf(f.id);
    const rest = st.frames.slice(at + 1);
    if (!rest.length) return;
    st.frames = st.frames.slice(0, at + 1);
    const sid = uid();
    D.stories[sid] = { paras: [{ s: 'body', h: '' }], frames: rest };
    rest.forEach((id) => { const fr = findFrame(id); if (fr) fr.story = sid; });
    commit(); render(); renderProps();
  }
  /** إضافة صفحات وإطارات حتى يتسع النص كله */
  function autoflow(sid) {
    flowStory(sid);
    let guard = 0;
    while (flows[sid] && flows[sid].overset && guard++ < 300) {
      const st = D.stories[sid];
      const last = findFrame(st.frames[st.frames.length - 1]);
      let at = D.pages.findIndex((p) => p.els.includes(last));
      if (at < 0) at = D.pages.length - 1;
      const m = D.margins;
      const pg = { id: uid(), els: [] };
      D.pages.splice(at + 1, 0, pg);
      const f = { id: uid(), type: 'text', x: D.dir === 'rtl' ? m.o : m.i, y: m.t, w: D.w - m.i - m.o, h: D.h - m.t - m.b, cols: D.cols || 1, gutter: D.gutter, inset: 0, fill: 'none', stroke: 'none', strokeW: 0, opacity: 1, story: sid };
      pg.els.push(f);
      st.frames.push(f.id);
      flowStory(sid);
    }
    commit(); render(); renderProps();
  }
  async function placeImage(f) {
    const r = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'webp'] }], as: 'dataurl' });
    if (!r[0]) return;
    const id = 'img' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    D.assets[id] = await shrink(r[0].data);
    if (!f) {
      const img = await W.loadImage(D.assets[id]);
      const m = D.margins, maxW = D.w - m.i - m.o;
      const w = Math.min(maxW, img.naturalWidth * 0.75), h = w * img.naturalHeight / img.naturalWidth;
      f = createFrame('image', { x: (D.w - w) / 2, y: m.t, w, h });
    }
    f.src = id;
    commit(); render(); renderProps();
  }
  async function shrink(dataURL) {
    const img = await W.loadImage(dataURL);
    const max = 3500;
    if (img.naturalWidth <= max && img.naturalHeight <= max) return dataURL;
    const s = max / Math.max(img.naturalWidth, img.naturalHeight);
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.92);
  }

  /* ═══════════ محرر النص (القصة) ═══════════ */
  function cleanInline(html) {
    const box = document.createElement('div');
    box.innerHTML = W.sanitizeHTML(html);
    const out = [];
    const walk = (node, wrap) => {
      node.childNodes.forEach((c) => {
        if (c.nodeType === 3) { out.push(wrap(W.escape(c.nodeValue.replace(/\u200B/g, '')))); return; }
        if (c.nodeType !== 1) return;
        const tag = c.tagName.toLowerCase();
        if (tag === 'br') return;
        let w2 = wrap;
        if (/^(b|strong)$/.test(tag) || /bold|[6-9]00/.test(c.style.fontWeight)) w2 = ((f) => (s) => f('<b>' + s + '</b>'))(w2);
        if (/^(i|em)$/.test(tag) || c.style.fontStyle === 'italic') w2 = ((f) => (s) => f('<i>' + s + '</i>'))(w2);
        if (tag === 'u' || /underline/.test(c.style.textDecoration)) w2 = ((f) => (s) => f('<u>' + s + '</u>'))(w2);
        walk(c, w2);
      });
    };
    walk(box, (s) => s);
    return out.join('').replace(/<\/b><b>/g, '').replace(/<\/i><i>/g, '').replace(/<\/u><u>/g, '');
  }
  function editorParas(ed) {
    const paras = [];
    Array.from(ed.childNodes).forEach((n) => {
      if (n.nodeType === 3) { if (n.nodeValue.trim()) paras.push({ s: 'body', h: W.escape(n.nodeValue) }); return; }
      if (n.nodeType !== 1) return;
      // Shift+Enter ي\u064Fنشئ <br>: نحوله إلى فقرة جديدة بالنمط نفسه
      const s = n.dataset && n.dataset.s && D.styles[n.dataset.s] ? n.dataset.s : 'body';
      const parts = n.innerHTML.split(/<br\s*\/?>/i);
      parts.forEach((part, i) => { if (i < parts.length - 1 || part || parts.length === 1) paras.push({ s, h: cleanInline(part) }); });
    });
    return paras.length ? paras : [{ s: 'body', h: '' }];
  }
  function editorPreviewCSS(st) {
    return 'font-family:' + W.fontStack(st.font) + ';font-size:' + Math.min(22, Math.max(12, st.size * 1.15)) + 'px;font-weight:' + st.weight + ';color:' + (st.color === '#1a1a1a' || st.color === '#111111' ? 'inherit' : st.color) + ';text-align:' + st.align;
  }
  let editorSync = null;
  document.addEventListener('selectionchange', () => { if (editorSync) editorSync(); });
  function storyEditor(f) {
    const st = D.stories[f.story];
    const ed = W.h('div', { class: 'n-editor', contenteditable: 'true', dir: D.dir, spellcheck: 'false' });
    const fill = () => {
      ed.innerHTML = '';
      st.paras.forEach((p) => { const pe = W.h('p', { 'data-s': p.s, style: editorPreviewCSS(D.styles[p.s] || D.styles.body) }); pe.innerHTML = p.h || '<br>'; ed.append(pe); });
    };
    fill();
    const styleSel = W.h('select', { class: 'w-select sm' });
    const fillStyles = () => { styleSel.innerHTML = ''; Object.entries(D.styles).forEach(([k, s]) => styleSel.append(W.h('option', { value: k, text: styleName(s) }))); };
    fillStyles();
    const curBlock = () => { const s = window.getSelection(); if (!s.rangeCount) return null; let n = s.anchorNode; while (n && n.parentNode !== ed) n = n.parentNode; return n && n.nodeType === 1 ? n : null; };
    const selBlocks = () => {
      const s = window.getSelection(); if (!s.rangeCount) return [];
      const r = s.getRangeAt(0);
      return Array.from(ed.children).filter((b) => r.intersectsNode(b));
    };
    const syncSel = () => { const b = curBlock(); if (b) styleSel.value = b.dataset.s || 'body'; };
    editorSync = () => { if (ed.isConnected && document.activeElement === ed) syncSel(); };
    styleSel.addEventListener('change', () => {
      const blocks = selBlocks().length ? selBlocks() : [curBlock()].filter(Boolean);
      blocks.forEach((b) => { b.dataset.s = styleSel.value; b.setAttribute('style', editorPreviewCSS(D.styles[styleSel.value])); });
      apply(); ed.focus();
    });
    const apply = () => { st.paras = editorParas(ed); render(); updateOverset(); commitSoon(); };
    const applySoon = W.debounce(apply, 250);
    ed.addEventListener('input', () => {
      // كل فقرة جديدة (Enter) يجب أن تكون <p> بنمط
      Array.from(ed.children).forEach((b) => { if (b.tagName !== 'P') { const p = W.h('p', { 'data-s': b.dataset.s || 'body' }); p.innerHTML = b.innerHTML; b.replaceWith(p); } if (!b.dataset.s) b.dataset.s = 'body'; });
      applySoon();
    });
    ed.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && /^[biu]$/i.test(e.key)) { e.preventDefault(); document.execCommand({ b: 'bold', i: 'italic', u: 'underline' }[e.key.toLowerCase()]); applySoon(); } e.stopPropagation(); });
    ed.addEventListener('paste', (e) => {
      e.preventDefault();
      const t = (e.clipboardData || window.clipboardData).getData('text/plain');
      const lines = t.replace(/\r/g, '').split(/\n+/);
      if (lines.length <= 1) document.execCommand('insertText', false, t);
      else document.execCommand('insertHTML', false, lines.map((l) => '<p data-s="body">' + W.escape(l) + '</p>').join(''));
      applySoon();
    });
    const fmtBtn = (icon, cmd, key) => W.iconButton(icon, key, () => { ed.focus(); document.execCommand(cmd); applySoon(); }, { cls: 'sm' });
    const importBtn = W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('n.importText'), onclick: () => importText(f) });
    const over = W.h('div', { class: 'n-overset hidden' }, W.iconEl('alert'), W.h('span', { text: W.t('n.overset') }), W.h('button', { class: 'w-btn sm primary', type: 'button', text: W.t('n.autoflow'), onclick: () => autoflow(f.story) }));
    const updateOverset = () => over.classList.toggle('hidden', !(flows[f.story] && flows[f.story].overset));
    updateOverset();
    const wrap = W.h('div', { class: 'col', style: { gap: '6px' } },
      W.h('div', { class: 'row', style: { gap: '4px' } }, styleSel, W.h('div', { style: { flex: 1 } }), fmtBtn('bold', 'bold', 'n.bold'), fmtBtn('italic', 'italic', 'n.italic'), fmtBtn('underline', 'underline', 'n.underline')),
      ed, over, importBtn);
    return wrap;
  }
  async function importText(f) {
    const r = await W.files.open({ types: [{ name: { ar: 'نصوص', en: 'Text' }, ext: ['txt', 'md', 'docx'] }], as: 'bytes' });
    if (!r[0]) return;
    let paras = [];
    try {
      if (r[0].ext === 'docx' && globalThis.WarshaDocx) {
        const res = await WarshaDocx.toHTML(r[0].data.buffer.slice(r[0].data.byteOffset, r[0].data.byteOffset + r[0].data.byteLength));
        const box = document.createElement('div'); box.innerHTML = W.sanitizeHTML(res.html);
        box.querySelectorAll('h1,h2,h3,h4,p,li,blockquote').forEach((n) => {
          if (n.querySelector('p,li,h1,h2,h3')) return;
          const tag = n.tagName.toLowerCase();
          const s = tag === 'h1' ? 'h1' : /^h[2-4]$/.test(tag) ? 'h2' : tag === 'blockquote' ? 'quote' : 'body';
          const h = cleanInline(n.innerHTML);
          if (h.trim()) paras.push({ s, h });
        });
      } else {
        const text = W.files.decodeText(r[0].data);
        text.replace(/\r/g, '').split(/\n\s*\n|\n/).forEach((l) => {
          const t = l.trim(); if (!t) return;
          const m = /^(#{1,3})\s+(.*)$/.exec(t);
          paras.push(m ? { s: m[1].length === 1 ? 'h1' : 'h2', h: W.escape(m[2]) } : { s: 'body', h: W.escape(t) });
        });
      }
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); return; }
    if (!paras.length) return;
    D.stories[f.story].paras = paras;
    commit(); render(); renderProps();
  }

  /* ═══════════ لوحة الخصائص ═══════════ */
  const commitSoon = W.debounce(() => commit(), 600);
  const section = (key, ...ch) => W.h('div', { class: 'w-panel' }, W.h('div', { class: 'w-panel-title', text: W.t(key) }), W.h('div', { class: 'w-panel-body' }, ...ch));
  let propInputs = {};
  function mmField(key, label, valPt, onChange) {
    const inp = W.h('input', { class: 'w-input sm', type: 'number', step: '0.5', value: toMM(valPt) });
    inp.addEventListener('change', () => onChange((parseFloat(inp.value) || 0) * MM));
    propInputs[key] = inp;
    return W.h('div', { class: 'w-field' }, W.h('label', { text: label }), inp);
  }
  function colorRow(label, value, allowNone, onChange) {
    const c = W.h('input', { type: 'color', class: 'w-color', value: /^#[0-9a-f]{6}$/i.test(value || '') ? value : '#ffffff' });
    c.addEventListener('input', () => onChange(c.value, true));
    c.addEventListener('change', () => onChange(c.value));
    const none = allowNone ? W.h('button', { class: 'w-btn sm' + (!value || value === 'none' ? ' active' : ''), type: 'button', text: W.t('n.none'), onclick: () => onChange('none') }) : null;
    return W.h('div', { class: 'row', style: { gap: '6px' } }, W.h('span', { class: 'small muted', style: { minWidth: '54px' }, text: label }), c, none);
  }
  function renderProps() {
    propsEl.innerHTML = '';
    propInputs = {};
    if (!D) return;
    const objs = selFrames();
    if (editingMaster) propsEl.append(W.h('div', { class: 'n-masterbar' }, W.h('p', { class: 'small', text: W.t('n.masterHint') }), W.h('button', { class: 'w-btn primary sm', type: 'button', text: W.t('n.doneMaster'), onclick: () => toggleMaster(false) })));
    if (!objs.length) { docProps(); return; }
    const f = objs[0];
    const upd = (fn, live) => { objs.forEach(fn); render(); if (!live) commit(); };
    propsEl.append(W.h('div', { class: 'n-quick' }, W.iconButton('duplicate', 'cmd.duplicate', duplicateFrames), W.iconButton('bring-front', 'menu.arrange', () => zorder(true)), W.iconButton('send-back', 'menu.arrange', () => zorder(false)), W.iconButton('trash', 'cmd.delete', deleteFrames)));
    propsEl.append(section('n.position',
      W.h('div', { class: 'w-input-group' }, mmField('x', 'X', f.x, (v) => upd((o) => { o.x = v; })), mmField('y', 'Y', f.y, (v) => upd((o) => { o.y = v; }))),
      W.h('div', { class: 'w-input-group' }, mmField('w', W.t('ui.width'), f.w, (v) => upd((o) => { o.w = Math.max(2, v); })), mmField('h', W.t('ui.height'), f.h, (v) => upd((o) => { o.h = Math.max(1, v); })))));
    if (f.type === 'text') {
      propsEl.append(section('n.story', storyEditor(f)));
      const st = D.stories[f.story];
      const idx = st.frames.indexOf(f.id);
      propsEl.append(section('n.frame',
        W.slider({ i18n: 'n.columns', min: 1, max: 6, value: f.cols || 1, onInput: (v) => upd((o) => { o.cols = v; }, true), onChange: () => commit() }),
        W.h('div', { class: 'w-input-group' }, mmField('gut', W.t('n.gutter'), f.gutter == null ? 12 : f.gutter, (v) => upd((o) => { o.gutter = Math.max(0, v); })), mmField('ins', W.t('n.inset'), f.inset || 0, (v) => upd((o) => { o.inset = Math.max(0, v); }))),
        colorRow(W.t('n.fill'), f.fill, true, (v, live) => upd((o) => { o.fill = v; }, live)),
        W.h('div', { class: 'small muted', style: { marginTop: '6px' }, text: W.t('n.frameOrder') + ': ' + (idx + 1) + ' / ' + st.frames.length }),
        W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '6px', marginTop: '6px' } },
          W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('n.link'), onclick: () => { linkFrom = f; setTool('text'); hint.textContent = W.t('n.linkHint'); } }),
          idx < st.frames.length - 1 ? W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('n.unlink'), onclick: () => unlinkAfter(f) }) : null)));
    }
    if (f.type === 'image') {
      propsEl.append(section('n.frame',
        W.h('button', { class: 'w-btn', type: 'button', style: { width: '100%' }, onclick: () => placeImage(f) }, W.iconEl('image'), W.h('span', { text: W.t('n.placeImage') })),
        W.segmented([{ value: 'fill', i18n: 'n.fitFill' }, { value: 'fit', i18n: 'n.fitFit' }], f.fit || 'fill', (v) => upd((o) => { o.fit = v; })),
        W.slider({ i18n: 'n.focusX', min: 0, max: 100, value: f.fx == null ? 50 : f.fx, onInput: (v) => upd((o) => { o.fx = v; }, true), onChange: () => commit() }),
        W.slider({ i18n: 'n.focusY', min: 0, max: 100, value: f.fy == null ? 50 : f.fy, onInput: (v) => upd((o) => { o.fy = v; }, true), onChange: () => commit() }),
        W.slider({ i18n: 'n.radius', min: 0, max: 200, value: f.radius || 0, onInput: (v) => upd((o) => { o.radius = v; }, true), onChange: () => commit() })));
    }
    if (f.type !== 'text') {
      propsEl.append(section('n.stroke',
        f.type !== 'line' ? colorRow(W.t('n.fill'), f.fill, true, (v, live) => upd((o) => { o.fill = v; }, live)) : null,
        colorRow(W.t('n.stroke'), f.stroke, f.type !== 'line', (v, live) => upd((o) => { o.stroke = v; if (!o.strokeW) o.strokeW = 1; }, live)),
        W.slider({ i18n: 'n.strokeW', min: 0, max: 20, step: 0.25, value: f.strokeW || 0, onInput: (v) => upd((o) => { o.strokeW = v; }, true), onChange: () => commit() }),
        f.type === 'rect' ? W.slider({ i18n: 'n.radius', min: 0, max: 200, value: f.radius || 0, onInput: (v) => upd((o) => { o.radius = v; }, true), onChange: () => commit() }) : null));
    }
    propsEl.append(section('ui.opacity', W.slider({ i18n: 'ui.opacity', min: 0, max: 100, value: Math.round((f.opacity == null ? 1 : f.opacity) * 100), onInput: (v) => upd((o) => { o.opacity = v / 100; }, true), onChange: () => commit() })));
  }
  function syncProps() {
    const f = selFrames()[0];
    if (!f) return;
    const set = (k, v) => { if (propInputs[k] && document.activeElement !== propInputs[k]) propInputs[k].value = toMM(v); };
    set('x', f.x); set('y', f.y); set('w', f.w); set('h', f.h);
  }
  function docProps() {
    const sizeSel = W.h('select', { class: 'w-select', style: { width: '100%' } });
    Object.keys(SIZES).forEach((k) => sizeSel.append(W.h('option', { value: k, text: k + ' (' + SIZES[k][0] + '×' + SIZES[k][1] + ')' })));
    sizeSel.append(W.h('option', { value: 'custom', text: W.t('n.custom') }));
    const curKey = Object.keys(SIZES).find((k) => { const [a, b] = SIZES[k]; return (Math.abs(a * MM - D.w) < 1 && Math.abs(b * MM - D.h) < 1) || (Math.abs(b * MM - D.w) < 1 && Math.abs(a * MM - D.h) < 1); }) || 'custom';
    sizeSel.value = curKey;
    sizeSel.addEventListener('change', () => { if (SIZES[sizeSel.value]) { const [a, b] = SIZES[sizeSel.value]; const land = D.w > D.h; resizeDoc((land ? b : a) * MM, (land ? a : b) * MM); } });
    const orient = W.segmented([{ value: 'p', i18n: 'n.portrait' }, { value: 'l', i18n: 'n.landscape' }], D.w > D.h ? 'l' : 'p', (v) => { if ((v === 'l') !== (D.w > D.h)) resizeDoc(D.h, D.w); });
    const m = D.margins;
    const setM = (k) => (v) => { D.margins[k] = Math.max(0, v); commit(); render(); };
    propsEl.append(section('n.document',
      W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('n.pageSize') }), sizeSel), orient,
      W.h('div', { class: 'w-input-group', style: { marginTop: '6px' } }, mmField('pw', W.t('n.width'), D.w, (v) => resizeDoc(Math.max(20, v), D.h)), mmField('ph', W.t('n.height'), D.h, (v) => resizeDoc(D.w, Math.max(20, v)))),
      W.h('div', { class: 'w-label-sm', style: { marginTop: '8px' }, text: W.t('n.margins') }),
      W.h('div', { class: 'w-input-group' }, mmField('mt', W.t('n.mTop'), m.t, setM('t')), mmField('mb', W.t('n.mBottom'), m.b, setM('b'))),
      W.h('div', { class: 'w-input-group' }, mmField('mi', W.t('n.mInside'), m.i, setM('i')), mmField('mo', W.t('n.mOutside'), m.o, setM('o'))),
      W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('n.columns') }), (() => { const i = W.h('input', { class: 'w-input sm', type: 'number', min: 1, max: 6, value: D.cols }); i.addEventListener('change', () => { D.cols = W.clamp(parseInt(i.value, 10) || 1, 1, 6); commit(); render(); }); return i; })()), mmField('dg', W.t('n.gutter'), D.gutter, (v) => { D.gutter = Math.max(0, v); commit(); render(); })),
      W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('n.direction') }), W.segmented([{ value: 'rtl', i18n: 'n.rtl' }, { value: 'ltr', i18n: 'n.ltr' }], D.dir, (v) => { D.dir = v; commit(); render(); })),
      W.h('button', { class: 'w-btn', type: 'button', style: { width: '100%', marginTop: '8px' }, text: editingMaster ? W.t('n.doneMaster') : W.t('n.editMaster'), onclick: () => toggleMaster(!editingMaster) })));
    const list = W.h('div', { class: 'col', style: { gap: '4px' } });
    Object.entries(D.styles).forEach(([k, s]) => {
      const row = W.h('div', { class: 'n-stylerow' }, W.h('span', { text: styleName(s), style: { fontFamily: W.fontStack(s.font), fontWeight: s.weight, color: s.color } }), W.h('span', { class: 'small muted', text: s.size + 'pt' }));
      row.addEventListener('click', () => editStyle(k));
      list.append(row);
    });
    list.append(W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('n.newStyle'), onclick: () => editStyle(null) }));
    propsEl.append(section('n.styles', list));
  }
  async function editStyle(key) {
    const s = key ? D.styles[key] : Object.assign({}, D.styles.body, { name: W.t('n.newStyle') });
    const v = await W.form(W.t('n.editStyle'), [
      { key: 'name', i18n: 'n.styleName', type: 'text', value: styleName(s) },
      { key: 'font', i18n: 'n.font', type: 'select', value: s.font, options: W.fonts.map((f) => ({ value: f.family, label: W.L(f.label) })) },
      { key: 'size', i18n: 'n.size', type: 'number', value: s.size, min: 4, max: 200, row: 'a' }, { key: 'weight', i18n: 'n.weight', type: 'select', value: String(s.weight), options: [{ value: '400', label: '400' }, { value: '700', label: '700' }], row: 'a' },
      { key: 'color', i18n: 'n.color', type: 'color', value: s.color, row: 'b' }, { key: 'align', i18n: 'n.align', type: 'select', value: s.align, options: ['start', 'center', 'end', 'justify'].map((a) => ({ value: a, label: W.t('n.a.' + a) })), row: 'b' },
      { key: 'lh', i18n: 'n.lh', type: 'number', value: s.lh, min: 0.8, max: 3, row: 'c' }, { key: 'indent', i18n: 'n.indent', type: 'number', value: s.indent || 0, min: 0, max: 100, row: 'c' },
      { key: 'before', i18n: 'n.before', type: 'number', value: s.before, min: 0, max: 200, row: 'd' }, { key: 'after', i18n: 'n.after', type: 'number', value: s.after, min: 0, max: 200, row: 'd' }
    ]);
    if (!v) return;
    const out = { name: key && s.name.startsWith('n.s.') && v.name === styleName(s) ? s.name : v.name, font: v.font, size: W.clamp(+v.size || 11, 4, 200), weight: +v.weight, color: v.color, align: v.align, lh: W.clamp(+v.lh || 1.5, 0.8, 3), indent: +v.indent || 0, before: +v.before || 0, after: +v.after || 0 };
    await W.ensureFont(out.font, out.weight);
    D.styles[key || ('s' + Date.now().toString(36))] = out;
    commit(); render(); renderProps();
  }
  function resizeDoc(w, h) { D.w = w; D.h = h; commit(); render(); renderProps(); }
  function toggleMaster(on) { editingMaster = on; sel = []; document.body.classList.toggle('n-mastermode', on); render(); renderProps(); }

  /* ═══════════ الصفحات (المصغرات) ═══════════ */
  function renderThumbs() {
    thumbsEl.innerHTML = '';
    if (!D) return;
    const tw = 110, s = tw / (D.w * PX);
    D.pages.forEach((p, i) => {
      const t = W.h('div', { class: 'n-thumb' + (i === pi ? ' current' : ''), draggable: 'true' });
      const box = W.h('div', { class: 'n-tbox', style: { width: tw + 'px', height: (D.h * PX * s) + 'px' } });
      const n = pageNode(p, i, 'thumb');
      n.style.zoom = s;
      box.append(n);
      t.append(box, W.h('span', { text: String(i + 1) }));
      t.addEventListener('click', () => { if (editingMaster) toggleMaster(false); goPage(i); });
      t.addEventListener('contextmenu', (e) => { pi = i; markCurrent(); W.contextMenu(e, pageMenu()); });
      t.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/x-page', String(i)); });
      t.addEventListener('dragover', (e) => { if (e.dataTransfer.types.includes('text/x-page')) { e.preventDefault(); t.classList.add('drop'); } });
      t.addEventListener('dragleave', () => t.classList.remove('drop'));
      t.addEventListener('drop', (e) => { e.preventDefault(); t.classList.remove('drop'); const from = +e.dataTransfer.getData('text/x-page'); if (from === i) return; const [pg] = D.pages.splice(from, 1); D.pages.splice(i, 0, pg); pi = i; commit(); render(); });
      thumbsEl.append(t);
    });
    const mt = W.h('div', { class: 'n-thumb n-masterthumb' + (editingMaster ? ' current' : '') }, W.h('div', { class: 'n-tbox', style: { width: tw + 'px', height: '34px' } }, W.iconEl('layers')), W.h('span', { text: W.t('n.master') }));
    mt.addEventListener('click', () => toggleMaster(!editingMaster));
    thumbsEl.prepend(mt);
    thumbsEl.append(W.iconButton('plus', 'n.addPage', addPage, { cls: 'n-addpage' }));
  }
  const renderThumbsSoon = W.debounce(renderThumbs, 300);
  const pageMenu = () => [
    { i18n: 'n.addPage', icon: 'plus', action: addPage },
    { i18n: 'n.dupPage', icon: 'duplicate', action: dupPage },
    { i18n: 'n.noMaster', checked: () => !!D.pages[pi].noMaster, action: () => { D.pages[pi].noMaster = !D.pages[pi].noMaster; commit(); render(); } },
    '-',
    { i18n: 'n.delPage', icon: 'trash', action: delPage, disabled: () => D.pages.length < 2 }
  ];
  function addPage() { if (!D) return; D.pages.splice(pi + 1, 0, { id: uid(), els: [] }); pi++; sel = []; commit(); render(); goPage(pi); }
  function dupPage() {
    const p = clone(D.pages[pi]); p.id = uid();
    p.els.forEach((f) => { const old = f.id; f.id = uid(); if (f.type === 'text') { const sid = uid(); D.stories[sid] = { paras: clone(D.stories[f.story].paras), frames: [f.id] }; f.story = sid; } void old; });
    D.pages.splice(pi + 1, 0, p); pi++; commit(); render(); goPage(pi);
  }
  function delPage() {
    if (D.pages.length < 2) return;
    const p = D.pages[pi];
    p.els.filter((f) => f.type === 'text').forEach((f) => { const st = D.stories[f.story]; if (!st) return; st.frames = st.frames.filter((x) => x !== f.id); if (!st.frames.length) delete D.stories[f.story]; });
    D.pages.splice(pi, 1); pi = Math.min(pi, D.pages.length - 1); sel = [];
    commit(); render(); renderProps();
  }
  function updateStatus() {
    if (!D) return;
    status.item('page').textContent = editingMaster ? W.t('n.master') : W.t('n.pageN', { n: pi + 1 }) + ' / ' + D.pages.length;
    status.item('size').textContent = toMM(D.w) + ' × ' + toMM(D.h) + ' mm';
    status.item('zoom').textContent = Math.round(zoom * 100) + '%';
  }

  /* ═══════════ القوالب والمستند ═══════════ */
  const SAMPLE = {
    ar: [
      'التصميم الطباعي فن قديم يجمع بين الجمال والوظيفة، فهو يرت\u0651ب الكلمات والصور على الصفحة بحيث يقرؤها الناس بسهولة ومتعة. وكل قرار صغير في اختيار الخط أو المسافة بين الأسطر يترك أثر\u064Bا كبير\u064Bا في تجربة القارئ.',
      'وللخط العربي مكانة خاصة في هذا الفن، إذ تتصل حروفه وتتغير أشكالها بحسب موقعها في الكلمة، فيحتاج المصمم إلى أدوات تفهم هذه الطبيعة وتحترمها. ومن هنا جاءت أهمية البرامج التي تدعم العربية دعم\u064Bا كامل\u064Bا من اليمين إلى اليسار.',
      'إن الصفحة الجيدة تبدأ بشبكة واضحة من الهوامش والأعمدة، ثم تأتي العناوين لتقود العين، والفقرات لتحمل المعنى، والصور لتمنح النص روح\u064Bا. وحين تتكامل هذه العناصر يصبح المطبوع قطعة فنية تستحق الاقتناء.',
      'ولا يكتمل العمل دون مراجعة دقيقة: هل يتدفق النص بسلاسة بين الأعمدة؟ هل الأرقام في مكانها الصحيح؟ هل الألوان مناسبة للطباعة؟ هذه الأسئلة يجيب عنها المصمم المحترف قبل أن يرسل ملفه إلى المطبعة.'
    ],
    en: [
      'Typography is an old craft that unites beauty and function. It arranges words and images on the page so people can read them with ease and pleasure. Every small decision about typefaces or line spacing leaves a large mark on the reader’s experience.',
      'Arabic script holds a special place in this craft: its letters connect and change shape according to their position in a word, so designers need tools that understand and respect this nature, with full right-to-left support.',
      'A good page begins with a clear grid of margins and columns. Headings then guide the eye, paragraphs carry the meaning and images give the text a soul. When these elements work together, print becomes a work of art.',
      'The job is not complete without careful proofreading: does the text flow smoothly between columns? Are the page numbers right? Are the colors suitable for print? A professional answers these questions before sending the file to the printer.'
    ]
  };
  const sample = () => SAMPLE[W.lang === 'ar' ? 'ar' : 'en'];
  function blankDoc(sizeMM, opts) {
    const [w, h] = sizeMM;
    const d = Object.assign({ app: 'nasaq', version: 1, w: w * MM, h: h * MM, dir: W.isRTL() ? 'rtl' : 'ltr', digits: W.lang === 'ar' ? 'arabic' : 'latin', margins: { t: 18 * MM, b: 20 * MM, i: 18 * MM, o: 15 * MM }, cols: 1, gutter: 5 * MM, styles: defaultStyles(), stories: {}, master: { els: [] }, pages: [{ id: uid(), els: [] }], assets: {} }, opts || {});
    return d;
  }
  function addStoryFrame(d, page, box, paras, extra) {
    const f = Object.assign({ id: uid(), type: 'text', x: box.x, y: box.y, w: box.w, h: box.h, cols: 1, gutter: d.gutter, inset: 0, fill: 'none', stroke: 'none', strokeW: 0, opacity: 1 }, extra || {});
    const sid = uid();
    d.stories[sid] = { paras, frames: [f.id] };
    f.story = sid;
    (page ? page.els : d.master.els).push(f);
    return f;
  }
  function masterFooter(d) {
    const m = d.margins;
    addStoryFrame(d, null, { x: m.o, y: d.h - m.b + 6, w: d.w - m.i - m.o, h: 16 }, [{ s: 'caption', h: '{page}' }]);
    d.stories[d.master.els[d.master.els.length - 1].story].paras[0].s = 'pagenum';
    d.styles.pagenum = { name: W.lang === 'ar' ? 'رقم الصفحة' : 'Page number', font: 'Tajawal', size: 9, weight: 700, color: '#666666', align: 'center', lh: 1.2, before: 0, after: 0, indent: 0 };
    d.master.els.push({ id: uid(), type: 'line', x: m.o, y: d.h - m.b + 2, w: d.w - m.i - m.o, h: 1, stroke: '#d1d5db', strokeW: 0.5, opacity: 1 });
  }
  function makeTemplate(kind) {
    const S = sample();
    if (kind === 'book') {
      const d = blankDoc(SIZES.A5, { margins: { t: 18 * MM, b: 20 * MM, i: 16 * MM, o: 14 * MM } });
      masterFooter(d);
      const m = d.margins;
      const paras = [{ s: 'h1', h: W.lang === 'ar' ? 'الفصل الأول: فن الصفحة' : 'Chapter One: The Art of the Page' }];
      for (let k = 0; k < 4; k++) S.forEach((t, i) => { if (i === 0 && k > 0) paras.push({ s: 'h2', h: (W.lang === 'ar' ? 'القسم ' : 'Section ') + fmtNumD(d, k + 1) }); paras.push({ s: 'body', h: W.escape(t) }); });
      paras.splice(3, 0, { s: 'quote', h: W.lang === 'ar' ? '«الصفحة الجيدة ت\u064Fقرأ قبل أن ت\u064Fقرأ»' : '“A good page is read before it is read.”' });
      const f = addStoryFrame(d, d.pages[0], { x: m.o, y: m.t + 40, w: d.w - m.i - m.o, h: d.h - m.t - m.b - 40 }, paras);
      d.styles.body.indent = 12;
      return { d, autoflow: f.story };
    }
    if (kind === 'magazine') {
      const d = blankDoc(SIZES.A4, { cols: 2, margins: { t: 16 * MM, b: 18 * MM, i: 15 * MM, o: 15 * MM } });
      masterFooter(d);
      const m = d.margins, cw = d.w - m.i - m.o;
      const p = d.pages[0];
      p.els.push({ id: uid(), type: 'rect', x: 0, y: 0, w: d.w, h: 8 * MM, fill: '#fb3448', stroke: 'none', strokeW: 0, opacity: 1 });
      addStoryFrame(d, p, { x: m.o, y: m.t, w: cw, h: 36 * MM }, [{ s: 'h1', h: W.lang === 'ar' ? 'جماليات الحرف العربي في التصميم المعاصر' : 'The beauty of Arabic letters in modern design' }, { s: 'lead', h: W.lang === 'ar' ? 'كيف يمنح الخط العربي التصميم المعاصر هوية فريدة؟ جولة في الشبكات والأعمدة والإيقاع البصري.' : 'How Arabic letterforms give modern design a unique identity: a tour of grids, columns and visual rhythm.' }]);
      p.els.push({ id: uid(), type: 'image', x: m.o, y: m.t + 38 * MM, w: cw, h: 70 * MM, src: null, fit: 'fill', fx: 50, fy: 50, fill: '#f3f4f6', stroke: 'none', strokeW: 0, radius: 0, opacity: 1 });
      addStoryFrame(d, p, { x: m.o, y: m.t + 110 * MM, w: cw, h: 8 * MM }, [{ s: 'caption', h: W.lang === 'ar' ? 'صورة توضيحية — انقر نقر\u064Bا مزدوج\u064Bا لوضع صورتك' : 'Illustration — double-click to place your image' }]);
      const body = [];
      for (let k = 0; k < 3; k++) S.forEach((t, i) => { if (k && !i) body.push({ s: 'h2', h: W.lang === 'ar' ? 'الشبكة والإيقاع' : 'Grid and rhythm' }); body.push({ s: 'body', h: W.escape(t) }); });
      body.splice(4, 0, { s: 'quote', h: W.lang === 'ar' ? '«التصميم الجيد غير مرئي، لكنك تشعر به»' : '“Good design is invisible, yet you feel it.”' });
      const f = addStoryFrame(d, p, { x: m.o, y: m.t + 122 * MM, w: cw, h: d.h - m.t - m.b - 122 * MM }, body, { cols: 2 });
      return { d, autoflow: f.story };
    }
    if (kind === 'newsletter') {
      const d = blankDoc(SIZES.A4, { cols: 3, margins: { t: 14 * MM, b: 16 * MM, i: 12 * MM, o: 12 * MM } });
      masterFooter(d);
      const m = d.margins, cw = d.w - m.i - m.o;
      const p = d.pages[0];
      p.els.push({ id: uid(), type: 'rect', x: 0, y: 0, w: d.w, h: 42 * MM, fill: '#0f172a', stroke: 'none', strokeW: 0, opacity: 1 });
      addStoryFrame(d, p, { x: m.o, y: 10 * MM, w: cw, h: 26 * MM }, [{ s: 'masthead', h: W.lang === 'ar' ? 'نشرة ورشة' : 'Warsha Newsletter' }, { s: 'mastsub', h: W.lang === 'ar' ? 'العدد الأول • أخبار التصميم والإبداع' : 'Issue 1 • Design & creativity news' }]);
      d.styles.masthead = { name: W.lang === 'ar' ? 'ترويسة' : 'Masthead', font: 'Lalezar', size: 40, weight: 400, color: '#ffffff', align: 'start', lh: 1.1, before: 0, after: 2, indent: 0 };
      d.styles.mastsub = { name: W.lang === 'ar' ? 'ترويسة فرعية' : 'Masthead sub', font: 'Tajawal', size: 11, weight: 700, color: '#fca5a5', align: 'start', lh: 1.3, before: 0, after: 0, indent: 0 };
      const body = [];
      for (let k = 0; k < 3; k++) { body.push({ s: 'h2', h: (W.lang === 'ar' ? ['أخبار الورشة', 'نصيحة العدد', 'من مجتمعنا'] : ['Workshop news', 'Tip of the issue', 'From our community'])[k] }); S.forEach((t) => body.push({ s: 'body', h: W.escape(t) })); }
      const f = addStoryFrame(d, p, { x: m.o, y: 50 * MM, w: cw, h: d.h - 50 * MM - m.b }, body, { cols: 3 });
      return { d, autoflow: f.story };
    }
    const d = blankDoc(SIZES.A4);
    masterFooter(d);
    return { d };
  }
  const fmtNumD = (d, n) => (d.digits === 'arabic' ? String(n).replace(/[0-9]/g, (x) => '٠١٢٣٤٥٦٧٨٩'[x]) : String(n));
  async function startDoc(d, meta, autoSid) {
    D = d;
    pi = 0; sel = []; editingMaster = false;
    document.body.classList.remove('n-mastermode');
    hist.stack = []; hist.index = -1;
    meta = meta || {};
    welcome.hide();
    document.body.classList.add('has-doc');
    const fonts = new Set(Object.values(D.styles).map((s) => s.font + '|' + s.weight));
    await Promise.all(Array.from(fonts).map((k) => { const [f, w] = k.split('|'); return W.ensureFont(f, +w); }));
    await W.fontsReady();
    if (autoSid) autoflow(autoSid);
    render(); commit();
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: false });
    renderProps();
    requestAnimationFrame(fitPage);
  }
  async function newFlow(kind) {
    if (!(await W.confirmDiscard())) return;
    if (!kind) {
      const v = await W.form(W.t('n.newDoc'), [{ key: 't', i18n: 'n.template', type: 'select', value: 'magazine', options: ['blank', 'book', 'magazine', 'newsletter'].map((k) => ({ value: k, label: W.t('n.t.' + k) })) }]);
      if (!v) return;
      kind = v.t;
    }
    const t = makeTemplate(kind);
    await startDoc(t.d, {}, t.autoflow);
  }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'مستند نسق', en: 'Nasaq document' }, ext: ['nasaq'] }], as: 'text' });
    if (f[0]) loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { loadFile(await W.files.readPath(p, 'text')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  function loadFile(f) {
    try {
      const text = typeof f.data === 'string' ? f.data : W.files.decodeText(new Uint8Array(f.data));
      const d = JSON.parse(text);
      if (d.app !== 'nasaq' || !Array.isArray(d.pages)) throw new Error('bad file');
      Object.values(d.stories).forEach((st) => st.paras.forEach((p) => { p.h = cleanInline(p.h || ''); }));
      startDoc(d, { name: f.name, path: f.path });
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'));
  async function save(as) {
    if (!D) return;
    const used = new Set();
    D.pages.concat([D.master]).forEach((p) => p.els.forEach((f) => { if (f.src) used.add(f.src); }));
    const assets = {};
    Object.keys(D.assets).forEach((k) => { if (used.has(k)) assets[k] = D.assets[k]; });
    const res = await W.files.save({ data: JSON.stringify(Object.assign({}, D, { assets })), name: baseName() + '.nasaq', path: as ? null : (W.doc.path && /\.nasaq$/.test(W.doc.path) ? W.doc.path : null), types: [{ name: { ar: 'مستند نسق', en: 'Nasaq document' }, ext: ['nasaq'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }
  function exportHTML() {
    flowAll();
    return D.pages.map((p, i) => pageNode(p, i, 'export').outerHTML).join('');
  }
  async function exportPDF() {
    if (!D) return;
    const body = exportHTML();
    await W.exportPDF(W.printDocument(body, { pageSize: D.w + 'pt ' + D.h + 'pt', dir: D.dir, css: PAGE_CSS + '.n-page{page-break-after:always;break-after:page}.n-page:last-child{page-break-after:auto;break-after:auto}' }), baseName());
  }
  async function pageCanvas(i, scale) {
    await W.fontsReady();
    flowAll();
    const fams = new Set(Object.values(D.styles).map((s) => s.font));
    const css = await W.fontFaceCSS(fams);
    const node = pageNode(D.pages[i], i, 'export');
    const wpx = D.w * PX, hpx = D.h * PX;
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + wpx + '" height="' + hpx + '"><foreignObject x="0" y="0" width="' + wpx + '" height="' + hpx + '"><div xmlns="http://www.w3.org/1999/xhtml"><style>' + css + PAGE_CSS + '</style>' + new XMLSerializer().serializeToString(node) + '</div></foreignObject></svg>';
    return W.rasterizeSVG(svg, wpx, hpx, scale, '#ffffff');
  }
  async function exportPNG() {
    if (!D) return;
    const v = await W.form(W.t('n.exportPng'), [{ key: 'dpi', i18n: 'ui.size', type: 'select', value: '150', options: [{ value: '96', label: '96 dpi' }, { value: '150', label: '150 dpi' }, { value: '300', label: '300 dpi' }] }]);
    if (!v) return;
    const c = await W.busy('ui.processing', () => pageCanvas(pi, parseInt(v.dpi, 10) / 96));
    const r = await W.files.save({ data: await W.canvasToBytes(c, 'image/png'), name: baseName() + '-' + (pi + 1) + '.png', types: [{ name: { ar: 'صورة PNG', en: 'PNG' }, ext: ['png'] }] });
    if (r) W.toast(W.t('ui.exported'), 'success');
  }

  /* ═══════════ الأدوات والقوائم ═══════════ */
  const TOOLS = [['select', 'pointer', 'V'], ['text', 'text', 'T'], ['image', 'image', 'F'], ['rect', 'rect', 'M'], ['ellipse', 'ellipse', 'L'], ['line', 'line', '\\'], ['hand', 'hand', 'H']];
  const toolsEl = $('#tools');
  function renderTools() {
    toolsEl.innerHTML = '';
    TOOLS.forEach(([id, icon, key]) => toolsEl.append(W.iconButton(icon, 'n.' + ({ text: 'textFrame', image: 'imageFrame' }[id] || id), () => setTool(id), { shortcut: key, cls: tool === id ? 'active' : '' })));
  }
  function setTool(t) {
    if (t !== 'text') linkFrom = null;
    tool = t; renderTools();
    scroller.dataset.tool = t;
    hint.textContent = linkFrom ? W.t('n.linkHint') : '';
  }
  const hint = $('#hint');
  const needD = () => !D;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'n.newDoc', icon: 'file-plus', shortcut: 'Mod+N', action: () => newFlow() },
      { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), disabled: needD, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), disabled: needD, global: true },
      { i18n: 'n.placeImage', icon: 'image', shortcut: 'Mod+D', action: () => placeImage(selFrames().find((f) => f.type === 'image') || null), disabled: needD },
      { i18n: 'n.exportPdf', icon: 'file-pdf', shortcut: 'Mod+E', action: exportPDF, disabled: needD, global: true },
      { i18n: 'n.exportPng', icon: 'image', action: exportPNG, disabled: needD },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'cmd.duplicate', icon: 'duplicate', shortcut: 'Mod+J', action: duplicateFrames },
      { i18n: 'cmd.delete', icon: 'trash', shortcut: 'Delete', action: deleteFrames },
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => { if (D) { sel = curEls().map((f) => f.id); drawUI(); renderProps(); } } }
    ] },
    { i18n: 'n.pages', items: [
      { i18n: 'n.addPage', icon: 'plus', shortcut: 'Mod+Shift+P', action: addPage, disabled: needD },
      { i18n: 'n.dupPage', icon: 'duplicate', action: dupPage, disabled: needD },
      { i18n: 'n.delPage', icon: 'trash', action: delPage, disabled: () => !D || D.pages.length < 2 },
      '-',
      { i18n: 'n.editMaster', icon: 'layers', action: () => D && toggleMaster(!editingMaster), checked: () => editingMaster, disabled: needD }
    ] },
    { i18n: 'menu.view', items: [
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => D && setZoom(zoom * 1.2) },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => D && setZoom(zoom / 1.2) },
      { i18n: 'cmd.fit', icon: 'fit', shortcut: 'Mod+0', action: fitPage },
      { i18n: 'cmd.actualSize', shortcut: 'Mod+1', action: () => D && setZoom(1) },
      '-',
      { i18n: 'n.showGuides', icon: 'grid', checked: () => showGuides, shortcut: "Mod+;", action: () => { showGuides = !showGuides; render(); } },
      { i18n: 'n.snap', icon: 'magnet', checked: () => snapOn, action: () => { snapOn = !snapOn; } },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus, shortcuts: TOOLS.map((t) => ['n.' + ({ text: 'textFrame', image: 'imageFrame' }[t[0]] || t[0]), t[2]]) });
  const status = chrome.status;
  TOOLS.forEach((t) => W.keys.bind(t[2], () => D && setTool(t[0])));
  W.keys.bind('Backspace', deleteFrames);
  W.keys.bind('Escape', () => { if (tool !== 'select') setTool('select'); else { sel = []; drawUI(); renderProps(); } });
  W.keys.bind('PageDown', () => D && goPage(pi + 1));
  W.keys.bind('PageUp', () => D && goPage(pi - 1));
  const nudgeCommit = W.debounce(() => { commit(); render(); }, 400);
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].forEach((k) => {
    const nudge = (st) => { const objs = selFrames(); if (!objs.length) return; objs.forEach((f) => { f.x += k === 'ArrowLeft' ? -st : k === 'ArrowRight' ? st : 0; f.y += k === 'ArrowUp' ? -st : k === 'ArrowDown' ? st : 0; const n = pageEl(pi).querySelector('.n-frame[data-id="' + f.id + '"]'); if (n) { n.style.left = f.x + 'pt'; n.style.top = f.y + 'pt'; } }); drawUI(); syncProps(); nudgeCommit(); };
    W.keys.bind(k, () => nudge(1)); W.keys.bind('Shift+' + k, () => nudge(MM * 5));
  });
  const tb = $('#toolbar');
  const pdfBtn = W.h('button', { class: 'w-btn primary sm', type: 'button' }, W.iconEl('file-pdf'), W.h('span', { 'data-i18n': 'n.exportPdf', text: W.t('n.exportPdf') }));
  pdfBtn.addEventListener('click', exportPDF);
  tb.prepend(
    W.iconButton('file-plus', 'n.newDoc', () => newFlow()), W.iconButton('folder', 'cmd.open', open), W.iconButton('save', 'cmd.save', () => save(false)), W.h('div', { class: 'w-sep' }),
    W.iconButton('undo', 'cmd.undo', undo), W.iconButton('redo', 'cmd.redo', redo), W.h('div', { class: 'w-sep' }),
    W.iconButton('plus', 'n.addPage', addPage), W.iconButton('layers', 'n.editMaster', () => D && toggleMaster(!editingMaster)), W.iconButton('image', 'n.placeImage', () => D && placeImage(selFrames().find((f) => f.type === 'image') || null)), W.h('div', { class: 'w-sep' }),
    W.iconButton('zoom-out', 'cmd.zoomOut', () => D && setZoom(zoom / 1.2)), W.iconButton('fit', 'cmd.fit', fitPage), W.iconButton('zoom-in', 'cmd.zoomIn', () => D && setZoom(zoom * 1.2)), W.h('div', { class: 'w-sep' }));
  tb.append(pdfBtn);

  const welcome = W.welcome($('#stage'), {
    text: 'n.welcomeText',
    actions: [{ i18n: 'n.newDoc', icon: 'file-plus', primary: true, action: () => newFlow() }, { i18n: 'cmd.open', icon: 'folder', action: open }],
    openRecent: openPath,
    extra: () => {
      const row = W.h('div', { class: 'n-tplrow' });
      ['book', 'magazine', 'newsletter', 'blank'].forEach((k) => { const b = W.h('button', { class: 'n-tplcard', type: 'button' }, W.iconEl({ book: 'pages', magazine: 'layout-1', newsletter: 'list', blank: 'file' }[k]), W.h('span', { text: W.t('n.t.' + k) })); b.addEventListener('click', () => newFlow(k)); row.append(b); });
      return row;
    }
  });
  W.dropZone($('#stage'), async (files) => {
    const f = files.find((x) => x.ext === 'nasaq');
    if (f) { if (await W.confirmDiscard()) loadFile({ name: f.name, path: f.path, data: f.data }); return; }
    if (!D) return;
    const img = files.find((x) => /^(png|jpe?g|webp)$/.test(x.ext));
    if (img) {
      const id = 'img' + Date.now().toString(36);
      D.assets[id] = await shrink('data:' + W.mime(img.ext) + ';base64,' + W.b64.encode(new Uint8Array(img.data)));
      const target = selFrames().find((x) => x.type === 'image');
      if (target) { target.src = id; commit(); render(); return; }
      const im = await W.loadImage(D.assets[id]);
      const m = D.margins, w = Math.min(D.w - m.i - m.o, im.naturalWidth * 0.75);
      const fr = createFrame('image', { x: (D.w - w) / 2, y: m.t, w, h: w * im.naturalHeight / im.naturalWidth });
      fr.src = id; commit(); render();
    }
  });
  W.onExternalFile((f) => loadFile(f), 'text');
  W.on('langchange', () => { renderTools(); renderProps(); if (D) render(); });
  renderTools();

  window.__nasaq = {
    get D() { return D; }, get flows() { return flows; }, get pi() { return pi; }, get sel() { return sel; }, set sel(v) { sel = v; drawUI(); renderProps(); },
    newDoc: (kind) => { const t = makeTemplate(kind); return startDoc(t.d, {}, t.autoflow); }, autoflow, exportHTML, pageCanvas, render, goPage, setTool, createFrame
  };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      if (sliceHTML('<b>مرحبا</b> بالعالم', 0, 3) !== '<b>مرح</b>') errors.push('slice1 ' + sliceHTML('<b>مرحبا</b> بالعالم', 0, 3));
      if (sliceHTML('<b>مرحبا</b> بالعالم', 6, 13) !== 'بالعالم') errors.push('slice2 ' + sliceHTML('<b>مرحبا</b> بالعالم', 6, 13));
      if (textLen('<i>ab</i>c') !== 3) errors.push('textLen');
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
