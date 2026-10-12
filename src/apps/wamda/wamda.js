/* ومضة Wamda — تصاميم سريعة للتواصل الاجتماعي */
(function () {
  'use strict';

  W.init({
    id: 'wamda',
    i18n: {
      ar: {
        'm.templates': 'القوالب', 'm.text': 'النصوص', 'm.elements': 'العناصر', 'm.uploads': 'الصور', 'm.background': 'الخلفية',
        'm.addHeading': 'إضافة عنوان', 'm.addSub': 'إضافة عنوان فرعي', 'm.addBody': 'إضافة نص', 'm.combos': 'أنماط جاهزة',
        'm.heading': 'عنوان رئيسي', 'm.sub': 'عنوان فرعي', 'm.body': 'اكتب نصك هنا',
        'm.shapes': 'أشكال', 'm.icons': 'أيقونات', 'm.stickers': 'ملصقات', 'm.upload': 'رفع صور…', 'm.noUploads': 'ارفع صورك لاستخدامها في التصميم، أو اسحبها إلى اللوحة.',
        'm.colors': 'ألوان', 'm.gradients': 'تدرجات', 'm.bgImage': 'صورة خلفية…', 'm.removeBgImage': 'إزالة صورة الخلفية', 'm.overlay': 'تعتيم الصورة',
        'm.all': 'الكل', 'm.cat.social': 'تواصل اجتماعي', 'm.cat.video': 'فيديو', 'm.cat.print': 'طباعة',
        'm.newDesign': 'تصميم جديد', 'm.custom': 'مقاس مخصص', 'm.resize': 'تغيير المقاس…', 'm.applyTpl': 'تطبيق القالب على الصفحة الحالية؟ سيتم استبدال محتواها.',
        'm.page': 'صفحة', 'm.addPage': 'إضافة صفحة', 'm.dupPage': 'تكرار الصفحة', 'm.delPage': 'حذف الصفحة', 'm.movePageUp': 'تقديم الصفحة', 'm.movePageDown': 'تأخير الصفحة',
        'm.pageOf': 'صفحة {i} من {n}', 'm.export': 'تنزيل', 'm.format': 'الصيغة', 'm.scale': 'الدقة', 'm.pages': 'الصفحات', 'm.currentPage': 'الصفحة الحالية', 'm.allPages': 'كل الصفحات',
        'm.effects': 'تأثيرات', 'm.shadow': 'ظل', 'm.outline': 'حد خارجي', 'm.highlight': 'خلفية النص', 'm.lineHeight': 'تباعد الأسطر', 'm.letterSpacing': 'تباعد الأحرف',
        'm.blur': 'تمويه', 'm.offset': 'الإزاحة', 'm.color': 'اللون', 'm.width': 'السماكة', 'm.radius': 'استدارة',
        'm.replaceImage': 'استبدال الصورة…', 'm.setAsBg': 'تعيين كخلفية', 'm.filters': 'الفلاتر', 'm.brightness': 'السطوع', 'm.contrast': 'التباين', 'm.saturation': 'التشبع', 'm.grayscale': 'رمادي', 'm.sepia': 'بني قديم',
        'm.circle': 'قص دائري', 'm.border': 'إطار', 'm.flip': 'قلب أفقي', 'm.fill': 'التعبئة', 'm.stroke': 'الحد', 'm.solid': 'لون', 'm.gradient': 'تدرج', 'm.none': 'بدون',
        'm.f.none': 'الأصل', 'm.f.bw': 'أبيض وأسود', 'm.f.warm': 'دافئ', 'm.f.cool': 'بارد', 'm.f.vintage': 'قديم', 'm.f.vivid': 'حيوي', 'm.f.fade': 'باهت',
        'm.lock': 'قفل', 'm.unlock': 'إلغاء القفل', 'm.front': 'إلى الأمام', 'm.back': 'إلى الخلف', 'm.forward': 'خطوة للأمام', 'm.backward': 'خطوة للخلف',
        'm.alignPage': 'محاذاة مع الصفحة', 'm.dropHere': 'ضع صورتك هنا', 'm.welcomeText': 'اختر قالب\u064Bا جاهز\u064Bا أو ابدأ بمقاس فارغ، ثم خص\u0651صه بنصوصك وصورك',
        'm.startBlank': 'ابدأ بتصميم فارغ', 'm.bold': 'عريض', 'm.italic': 'مائل', 'm.underline': 'تسطير', 'm.angle': 'الزاوية',
        'm.s.rect': 'مستطيل', 'm.s.circle': 'دائرة', 'm.s.triangle': 'مثلث', 'm.s.star': 'نجمة', 'm.s.heart': 'قلب', 'm.s.hexagon': 'سداسي', 'm.s.diamond': 'معين', 'm.s.arrow': 'سهم', 'm.s.line': 'خط', 'm.s.bubble': 'فقاعة كلام', 'm.s.badge': 'شارة', 'm.s.blob': 'شكل حر',
        'm.al.r': 'محاذاة لليمين', 'm.al.l': 'محاذاة لليسار', 'm.al.ch': 'توسيط أفقي', 'm.al.t': 'محاذاة للأعلى', 'm.al.b': 'محاذاة للأسفل', 'm.al.cv': 'توسيط عمودي'
      },
      en: {
        'm.templates': 'Templates', 'm.text': 'Text', 'm.elements': 'Elements', 'm.uploads': 'Photos', 'm.background': 'Background',
        'm.addHeading': 'Add a heading', 'm.addSub': 'Add a subheading', 'm.addBody': 'Add body text', 'm.combos': 'Text styles',
        'm.heading': 'Heading', 'm.sub': 'Subheading', 'm.body': 'Type your text here',
        'm.shapes': 'Shapes', 'm.icons': 'Icons', 'm.stickers': 'Stickers', 'm.upload': 'Upload images…', 'm.noUploads': 'Upload your photos to use them in the design, or drag them onto the canvas.',
        'm.colors': 'Colors', 'm.gradients': 'Gradients', 'm.bgImage': 'Background image…', 'm.removeBgImage': 'Remove background image', 'm.overlay': 'Image dimming',
        'm.all': 'All', 'm.cat.social': 'Social', 'm.cat.video': 'Video', 'm.cat.print': 'Print',
        'm.newDesign': 'New design', 'm.custom': 'Custom size', 'm.resize': 'Resize…', 'm.applyTpl': 'Apply this template to the current page? Its content will be replaced.',
        'm.page': 'Page', 'm.addPage': 'Add page', 'm.dupPage': 'Duplicate page', 'm.delPage': 'Delete page', 'm.movePageUp': 'Move page earlier', 'm.movePageDown': 'Move page later',
        'm.pageOf': 'Page {i} of {n}', 'm.export': 'Download', 'm.format': 'Format', 'm.scale': 'Quality', 'm.pages': 'Pages', 'm.currentPage': 'Current page', 'm.allPages': 'All pages',
        'm.effects': 'Effects', 'm.shadow': 'Shadow', 'm.outline': 'Outline', 'm.highlight': 'Text background', 'm.lineHeight': 'Line height', 'm.letterSpacing': 'Letter spacing',
        'm.blur': 'Blur', 'm.offset': 'Offset', 'm.color': 'Color', 'm.width': 'Width', 'm.radius': 'Roundness',
        'm.replaceImage': 'Replace image…', 'm.setAsBg': 'Set as background', 'm.filters': 'Filters', 'm.brightness': 'Brightness', 'm.contrast': 'Contrast', 'm.saturation': 'Saturation', 'm.grayscale': 'Grayscale', 'm.sepia': 'Sepia',
        'm.circle': 'Circle crop', 'm.border': 'Border', 'm.flip': 'Flip horizontal', 'm.fill': 'Fill', 'm.stroke': 'Stroke', 'm.solid': 'Color', 'm.gradient': 'Gradient', 'm.none': 'None',
        'm.f.none': 'Original', 'm.f.bw': 'B&W', 'm.f.warm': 'Warm', 'm.f.cool': 'Cool', 'm.f.vintage': 'Vintage', 'm.f.vivid': 'Vivid', 'm.f.fade': 'Faded',
        'm.lock': 'Lock', 'm.unlock': 'Unlock', 'm.front': 'Bring to front', 'm.back': 'Send to back', 'm.forward': 'Bring forward', 'm.backward': 'Send backward',
        'm.alignPage': 'Align to page', 'm.dropHere': 'Drop your photo here', 'm.welcomeText': 'Pick a ready-made template or start from a blank size, then make it yours',
        'm.startBlank': 'Start blank', 'm.bold': 'Bold', 'm.italic': 'Italic', 'm.underline': 'Underline', 'm.angle': 'Angle',
        'm.s.rect': 'Rectangle', 'm.s.circle': 'Circle', 'm.s.triangle': 'Triangle', 'm.s.star': 'Star', 'm.s.heart': 'Heart', 'm.s.hexagon': 'Hexagon', 'm.s.diamond': 'Diamond', 'm.s.arrow': 'Arrow', 'm.s.line': 'Line', 'm.s.bubble': 'Speech bubble', 'm.s.badge': 'Badge', 'm.s.blob': 'Blob',
        'm.al.r': 'Align right', 'm.al.l': 'Align left', 'm.al.ch': 'Center horizontally', 'm.al.t': 'Align top', 'm.al.b': 'Align bottom', 'm.al.cv': 'Center vertically'
      }
    }
  });

  const { SIZES, TEMPLATES } = globalThis.WAMDA;
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => W.uid('m');
  const $ = (s) => document.querySelector(s);
  const stage = $('#stage'), viewport = $('#viewport'), overlay = $('#overlay');
  const V = { z: 0.5, px: 0, py: 0 };

  let doc = null; // { w, h, size, dir, pages: [{ id, bg, els }], assets: {} }
  let pi = 0;
  let sel = [];
  let editing = null;
  let hoverId = null;
  let guides = [];
  const page = () => doc.pages[pi];
  const byId = (id) => (doc ? page().els.find((e) => e.id === id) : null);
  const selEls = () => sel.map(byId).filter(Boolean);

  /* ═══════════ الرسم (DOM) ═══════════ */
  const SHAPES = {
    triangle: '<polygon points="50,2 98,98 2,98"/>',
    star: '<polygon points="50,3 61,37 97,37 68,59 79,95 50,73 21,95 32,59 3,37 39,37"/>',
    heart: '<path d="M50 92C20 70 3 52 3 31 3 15 15 4 29 4c9 0 17 5 21 13C54 9 62 4 71 4c14 0 26 11 26 27 0 21-17 39-47 61z"/>',
    hexagon: '<polygon points="25,4 75,4 98,50 75,96 25,96 2,50"/>',
    diamond: '<polygon points="50,2 98,50 50,98 2,50"/>',
    arrow: '<polygon points="2,35 62,35 62,10 98,50 62,90 62,65 2,65"/>',
    bubble: '<path d="M10 4h80a8 8 0 0 1 8 8v52a8 8 0 0 1-8 8H40L18 96V72h-8a8 8 0 0 1-8-8V12a8 8 0 0 1 8-8z"/>',
    badge: '<polygon points="50,2 61,13 76,9 80,24 95,29 90,44 98,57 85,66 86,82 70,83 62,97 50,89 38,97 30,83 14,82 15,66 2,57 10,44 5,29 20,24 24,9 39,13"/>',
    blob: '<path d="M70 8c16 8 28 25 26 44-2 20-15 38-34 43S22 92 11 77 0 40 10 24 54 0 70 8z"/>',
    line: '<line x1="0" y1="50" x2="100" y2="50"/>'
  };
  const paintCSS = (f) => (!f || f === 'none' ? 'transparent' : typeof f === 'object' ? 'linear-gradient(' + (f.angle || 0) + 'deg,' + f.c1 + ',' + f.c2 + ')' : f);
  function svgGrad(f, id) {
    const a = (f.angle || 0) * Math.PI / 180;
    const sx = Math.sin(a) * 50, sy = -Math.cos(a) * 50;
    return '<linearGradient id="' + id + '" x1="' + (50 - sx) + '%" y1="' + (50 - sy) + '%" x2="' + (50 + sx) + '%" y2="' + (50 + sy) + '%"><stop offset="0" stop-color="' + f.c1 + '"/><stop offset="1" stop-color="' + f.c2 + '"/></linearGradient>';
  }
  function bgCSS(bg) {
    if (!bg) return '#ffffff';
    if (bg.type === 'gradient') return paintCSS(bg);
    if (bg.type === 'image' && doc.assets[bg.src]) return (bg.color || '#000') + ' url("' + doc.assets[bg.src] + '") center / cover no-repeat';
    return bg.color || '#ffffff';
  }
  function textShadow(o) {
    const s = [];
    if (o.shadow) s.push(o.shadow.x + 'px ' + o.shadow.y + 'px ' + o.shadow.blur + 'px ' + o.shadow.color);
    return s.join(',') || 'none';
  }
  function imgFilter(f) {
    if (!f) return 'none';
    const p = [];
    if (f.b != null && f.b !== 100) p.push('brightness(' + f.b + '%)');
    if (f.c != null && f.c !== 100) p.push('contrast(' + f.c + '%)');
    if (f.s != null && f.s !== 100) p.push('saturate(' + f.s + '%)');
    if (f.gray) p.push('grayscale(' + f.gray + '%)');
    if (f.sepia) p.push('sepia(' + f.sepia + '%)');
    if (f.blur) p.push('blur(' + f.blur + 'px)');
    if (f.hue) p.push('hue-rotate(' + f.hue + 'deg)');
    return p.join(' ') || 'none';
  }
  /** عقدة DOM لعنصر واحد — ت\u064Fستخدم للعرض والتصدير والمصغرات */
  function elNode(o, mode) {
    const n = document.createElement('div');
    n.className = 'm-el';
    if (mode === 'live') n.dataset.id = o.id;
    const st = n.style;
    st.position = 'absolute'; st.left = o.x + 'px'; st.top = o.y + 'px'; st.width = o.w + 'px';
    if (o.type !== 'text') st.height = o.h + 'px';
    if (o.rot) st.transform = 'rotate(' + o.rot + 'deg)';
    if (o.opacity != null && o.opacity < 1) st.opacity = o.opacity;
    if (o.hidden) st.display = 'none';
    switch (o.type) {
      case 'text': {
        const t = document.createElement('div');
        t.className = 'm-text';
        t.setAttribute('dir', o.dir || doc.dir || 'rtl');
        const ts = t.style;
        ts.fontFamily = W.fontStack(o.font); ts.fontSize = o.size + 'px'; ts.fontWeight = o.weight || 400; ts.color = o.color;
        ts.textAlign = o.align || 'center'; ts.lineHeight = o.lh || 1.3; ts.letterSpacing = (o.ls || 0) + 'px';
        ts.wordWrap = 'break-word'; ts.overflowWrap = 'break-word'; ts.whiteSpace = 'pre-wrap';
        if (o.italic) ts.fontStyle = 'italic';
        if (o.underline) ts.textDecoration = 'underline';
        ts.textShadow = textShadow(o);
        if (o.outline && o.outline.w) { ts.webkitTextStroke = (o.outline.w * 2) + 'px ' + o.outline.color; ts.paintOrder = 'stroke fill'; }
        let host = t;
        if (o.highlight) {
          const hl = document.createElement('span');
          hl.className = 'm-hl';
          const hs = hl.style;
          hs.background = o.highlight.color; hs.padding = '0.08em 0.32em'; hs.borderRadius = (o.highlight.radius || 0) + 'px';
          hs.webkitBoxDecorationBreak = 'clone'; hs.boxDecorationBreak = 'clone';
          t.append(hl);
          host = hl;
        }
        host.classList.add('m-tc');
        host.innerHTML = o.html;
        n.append(t);
        break;
      }
      case 'image': {
        const box = document.createElement('div');
        const bs = box.style;
        bs.width = '100%'; bs.height = '100%'; bs.overflow = 'hidden'; bs.boxSizing = 'border-box';
        bs.borderRadius = o.circle ? '50%' : (o.radius || 0) + 'px';
        if (o.border && o.border.w) bs.border = o.border.w + 'px solid ' + o.border.color;
        const src = o.src && doc.assets[o.src];
        if (src) {
          const img = document.createElement('img');
          img.src = src; img.alt = ''; img.draggable = false;
          const is = img.style;
          is.width = '100%'; is.height = '100%'; is.objectFit = 'cover'; is.display = 'block';
          is.objectPosition = (o.fx == null ? 50 : o.fx) + '% ' + (o.fy == null ? 50 : o.fy) + '%';
          is.filter = imgFilter(o.filter);
          if (o.flip) is.transform = 'scaleX(-1)';
          box.append(img);
        } else {
          box.className = 'm-ph';
          bs.background = 'repeating-linear-gradient(45deg, rgba(0,0,0,.06) 0 14px, rgba(0,0,0,.1) 14px 28px)';
          bs.display = 'flex'; bs.alignItems = 'center'; bs.justifyContent = 'center'; bs.color = 'rgba(0,0,0,.45)';
          const ic = document.createElement('div');
          ic.innerHTML = W.icon('image');
          ic.firstChild.style.width = Math.max(24, Math.min(o.w, o.h) * 0.28) + 'px';
          ic.firstChild.style.height = ic.firstChild.style.width;
          box.append(ic);
        }
        n.append(box);
        break;
      }
      case 'shape': {
        if (o.kind === 'rect' || o.kind === 'circle') {
          const b = document.createElement('div');
          const bs = b.style;
          bs.width = '100%'; bs.height = '100%'; bs.boxSizing = 'border-box';
          bs.background = paintCSS(o.fill);
          bs.borderRadius = o.kind === 'circle' ? '50%' : (o.radius || 0) + 'px';
          if (o.stroke && o.stroke !== 'none' && o.strokeW) bs.border = o.strokeW + 'px solid ' + o.stroke;
          n.append(b);
        } else {
          const gid = 'g' + Math.random().toString(36).slice(2, 9);
          const fill = typeof o.fill === 'object' ? 'url(#' + gid + ')' : (o.fill || 'none');
          const isLine = o.kind === 'line';
          const stroke = isLine ? (typeof o.fill === 'string' ? o.fill : '#000') : (o.stroke && o.stroke !== 'none' ? o.stroke : 'none');
          const sw = isLine ? Math.max(1, o.h) : (o.strokeW || 0);
          n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible;display:block">' +
            (typeof o.fill === 'object' ? '<defs>' + svgGrad(o.fill, gid) + '</defs>' : '') +
            '<g fill="' + (isLine ? 'none' : fill) + '" stroke="' + stroke + '" stroke-width="' + sw + '" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round">' +
            SHAPES[o.kind].replace(/\/>/g, ' vector-effect="non-scaling-stroke"/>') + '</g></svg>';
        }
        break;
      }
      case 'icon': {
        const b = document.createElement('div');
        b.style.width = '100%'; b.style.height = '100%'; b.style.color = o.color;
        b.innerHTML = W.icon(o.name);
        const s = b.firstChild;
        s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        s.style.width = '100%'; s.style.height = '100%'; s.style.display = 'block';
        if (o.sw) s.setAttribute('stroke-width', o.sw);
        n.append(b);
        break;
      }
      case 'sticker': {
        const b = document.createElement('div');
        const bs = b.style;
        bs.width = '100%'; bs.height = '100%'; bs.fontSize = (Math.min(o.w, o.h) * 0.82) + 'px'; bs.lineHeight = o.h + 'px'; bs.textAlign = 'center';
        bs.fontFamily = "'Noto Color Emoji','Apple Color Emoji','Segoe UI Emoji',sans-serif";
        b.textContent = o.char;
        n.append(b);
        break;
      }
    }
    return n;
  }
  /** عقدة صفحة كاملة */
  function pageNode(p, mode) {
    const n = document.createElement('div');
    n.className = 'm-page';
    const st = n.style;
    st.position = 'relative'; st.width = doc.w + 'px'; st.height = doc.h + 'px'; st.overflow = 'hidden'; st.background = bgCSS(p.bg);
    st.fontFamily = W.fontStack('IBM Plex Sans Arabic');
    if (p.bg && p.bg.type === 'image' && p.bg.overlay) {
      const ov = document.createElement('div');
      ov.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,' + p.bg.overlay + ')';
      n.append(ov);
    }
    p.els.forEach((o) => n.append(elNode(o, mode)));
    return n;
  }

  let pageDom = null;
  function render() {
    if (!doc) return;
    viewport.innerHTML = '';
    pageDom = pageNode(page(), 'live');
    pageDom.id = 'page';
    viewport.append(pageDom);
    if (editing) { const o = byId(editing); if (o) beginEditDom(o); }
    measure();
    applyView();
    renderPages();
    updateStatus();
  }
  const nodeOf = (id) => (pageDom ? pageDom.querySelector('[data-id="' + id + '"]') : null);
  function measure() {
    page().els.forEach((o) => { if (o.type === 'text') { const n = nodeOf(o.id); if (n) o.h = n.offsetHeight; } });
  }
  /** تحديث موضع عنصر واحد دون إعادة الرسم الكامل */
  function refreshEl(o) {
    const old = nodeOf(o.id);
    if (!old) { render(); return; }
    const n = elNode(o, 'live');
    old.replaceWith(n);
    if (o.type === 'text') o.h = n.offsetHeight;
  }
  function applyView() {
    viewport.style.transform = 'translate(' + V.px + 'px,' + V.py + 'px) scale(' + V.z + ')';
    drawOverlay();
    status.item('zoom').textContent = Math.round(V.z * 100) + '%';
  }
  function fit() {
    if (!doc) return;
    const r = stage.getBoundingClientRect();
    V.z = Math.max(0.02, Math.min((r.width - 80) / doc.w, (r.height - 80) / doc.h));
    V.px = (r.width - doc.w * V.z) / 2; V.py = (r.height - doc.h * V.z) / 2;
    applyView();
  }
  function setZoom(z, sx, sy) {
    const r = stage.getBoundingClientRect();
    if (sx == null) { sx = r.width / 2; sy = r.height / 2; }
    z = W.clamp(z, 0.03, 8);
    const dx = (sx - V.px) / V.z, dy = (sy - V.py) / V.z;
    V.z = z; V.px = sx - dx * z; V.py = sy - dy * z;
    applyView();
  }
  const toDoc = (e) => { const r = stage.getBoundingClientRect(); return { x: (e.clientX - r.left - V.px) / V.z, y: (e.clientY - r.top - V.py) / V.z }; };

  /* طبقة التحديد (إحداثيات الشاشة) */
  function boxDiv(b, cls, rot) {
    const d = W.h('div', { class: cls });
    Object.assign(d.style, { left: (V.px + b.x * V.z) + 'px', top: (V.py + b.y * V.z) + 'px', width: (b.w * V.z) + 'px', height: (b.h * V.z) + 'px' });
    if (rot) d.style.transform = 'rotate(' + rot + 'deg)';
    return d;
  }
  const boxOf = (o) => ({ x: o.x, y: o.y, w: o.w, h: o.h });
  function worldBox(o) {
    if (!o.rot) return boxOf(o);
    const cx = o.x + o.w / 2, cy = o.y + o.h / 2, a = o.rot * Math.PI / 180;
    const pts = [[o.x, o.y], [o.x + o.w, o.y], [o.x, o.y + o.h], [o.x + o.w, o.y + o.h]].map(([x, y]) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)]);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  }
  const unionBox = (bs) => { const x1 = Math.min(...bs.map((b) => b.x)), y1 = Math.min(...bs.map((b) => b.y)); return { x: x1, y: y1, w: Math.max(...bs.map((b) => b.x + b.w)) - x1, h: Math.max(...bs.map((b) => b.y + b.h)) - y1 }; };
  function drawOverlay() {
    overlay.innerHTML = '';
    if (!doc) return;
    const hv = hoverId && !sel.includes(hoverId) ? byId(hoverId) : null;
    if (hv && !drag) overlay.append(boxDiv(boxOf(hv), 'm-hover', hv.rot));
    const objs = selEls();
    objs.forEach((o) => overlay.append(boxDiv(boxOf(o), 'm-sel' + (o.locked ? ' locked' : '') + (editing === o.id ? ' editing' : ''), o.rot)));
    if (objs.length === 1 && !objs[0].locked && editing !== objs[0].id) {
      const o = objs[0];
      const box = overlay.lastChild;
      const hs = o.type === 'text' ? ['nw', 'ne', 'sw', 'se', 'e', 'w'] : ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
      hs.forEach((k) => box.append(W.h('div', { class: 'm-hd m-hd-' + k, 'data-h': k })));
      box.append(W.h('div', { class: 'm-rot', 'data-h': 'rot', html: W.icon('rotate-cw') }));
      if (drag && (drag.mode === 'resize' || drag.mode === 'rotate')) {
        const tip = W.h('div', { class: 'm-tip', text: drag.mode === 'rotate' ? Math.round(o.rot || 0) + '°' : Math.round(o.w) + ' × ' + Math.round(o.h) });
        box.append(tip);
      }
    } else if (objs.length > 1) {
      overlay.append(boxDiv(unionBox(objs.map(worldBox)), 'm-sel multi'));
    }
    guides.forEach((g) => {
      const d = W.h('div', { class: 'm-guide' });
      if (g.x != null) Object.assign(d.style, { left: (V.px + g.x * V.z) + 'px', top: V.py + 'px', width: '1px', height: (doc.h * V.z) + 'px' });
      else Object.assign(d.style, { top: (V.py + g.y * V.z) + 'px', left: V.px + 'px', height: '1px', width: (doc.w * V.z) + 'px' });
      overlay.append(d);
    });
    if (marquee) {
      const m = marquee;
      overlay.append(boxDiv({ x: Math.min(m.x1, m.x2), y: Math.min(m.y1, m.y2), w: Math.abs(m.x2 - m.x1), h: Math.abs(m.y2 - m.y1) }, 'm-marquee'));
    }
  }

  /* ═══════════ السجل ═══════════ */
  const hist = { stack: [], index: -1 };
  const snapshot = () => JSON.stringify({ w: doc.w, h: doc.h, size: doc.size, pages: doc.pages });
  function commit() {
    const s = snapshot();
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1); hist.stack.push(s);
    if (hist.stack.length > 120) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
    thumbsSoon();
  }
  function restore(s) {
    Object.assign(doc, JSON.parse(s));
    pi = Math.min(pi, doc.pages.length - 1);
    sel = sel.filter((id) => byId(id));
    editing = null;
    render(); renderProps(); W.setDirty(true);
  }
  function undo() { if (editing) return; if (hist.index > 0) { hist.index--; restore(hist.stack[hist.index]); } }
  function redo() { if (editing) return; if (hist.index < hist.stack.length - 1) { hist.index++; restore(hist.stack[hist.index]); } }

  /* ═══════════ التفاعل ═══════════ */
  let drag = null, marquee = null, spaceDown = false;
  function select(ids) { sel = ids; drawOverlay(); renderProps(); }
  stage.addEventListener('pointerdown', (e) => {
    if (!doc || e.target.closest('.w-empty')) return;
    const p = toDoc(e);
    if (e.button === 1 || spaceDown) { drag = { mode: 'pan', sx: e.clientX, sy: e.clientY, px: V.px, py: V.py }; stage.setPointerCapture(e.pointerId); return; }
    if (e.button !== 0) return;
    const hd = e.target.closest('[data-h]');
    if (editing) {
      const en = nodeOf(editing);
      if (en && en.contains(e.target)) return; // تحرير النص
      endEdit();
    }
    stage.setPointerCapture(e.pointerId);
    if (hd) {
      const o = selEls()[0];
      drag = { mode: hd.dataset.h === 'rot' ? 'rotate' : 'resize', h: hd.dataset.h, o, start: p, b0: boxOf(o), size0: o.size, ls0: o.ls || 0, rot0: o.rot || 0 };
      return;
    }
    const elN = e.target.closest('.m-el[data-id]');
    if (elN) {
      const id = elN.dataset.id;
      if (e.shiftKey) select(sel.includes(id) ? sel.filter((x) => x !== id) : sel.concat(id));
      else if (!sel.includes(id)) select([id]);
      if (e.altKey && sel.length) duplicate(true);
      drag = { mode: 'move', start: p, orig: selEls().filter((o) => !o.locked).map((o) => ({ o, x: o.x, y: o.y })), moved: false };
      return;
    }
    if (!e.shiftKey) select([]);
    marquee = { x1: p.x, y1: p.y, x2: p.x, y2: p.y };
    drag = { mode: 'marquee' };
  });
  stage.addEventListener('pointermove', (e) => {
    if (!doc) return;
    if (!drag) {
      const elN = e.target.closest('.m-el[data-id]');
      const id = elN ? elN.dataset.id : null;
      if (id !== hoverId) { hoverId = id; drawOverlay(); }
      return;
    }
    const p = toDoc(e);
    switch (drag.mode) {
      case 'pan': V.px = drag.px + e.clientX - drag.sx; V.py = drag.py + e.clientY - drag.sy; applyView(); break;
      case 'move': {
        if (!drag.orig.length) break;
        let dx = p.x - drag.start.x, dy = p.y - drag.start.y;
        if (!drag.moved && Math.hypot(dx, dy) * V.z < 3) break;
        drag.moved = true;
        // الالتصاق بمراكز وحواف الصفحة والعناصر الأخرى
        const ub = unionBox(drag.orig.map((r) => worldBox(Object.assign({}, r.o, { x: r.x, y: r.y }))));
        const moving = new Set(drag.orig.map((r) => r.o.id));
        const xs = [0, doc.w / 2, doc.w], ys = [0, doc.h / 2, doc.h];
        page().els.forEach((o) => { if (moving.has(o.id) || o.hidden) return; const b = worldBox(o); xs.push(b.x, b.x + b.w / 2, b.x + b.w); ys.push(b.y, b.y + b.h / 2, b.y + b.h); });
        const th = 6 / V.z;
        guides = [];
        if (!e.altKey) {
          const snapAxis = (pos, size, targets, key) => {
            let best = null;
            [pos, pos + size / 2, pos + size].forEach((v) => targets.forEach((t) => { const d = t - v; if (Math.abs(d) <= th && (!best || Math.abs(d) < Math.abs(best.d))) best = { d, t }; }));
            if (best) guides.push({ [key]: best.t });
            return best ? best.d : 0;
          };
          dx += snapAxis(ub.x + dx, ub.w, xs, 'x');
          dy += snapAxis(ub.y + dy, ub.h, ys, 'y');
        }
        drag.orig.forEach((r) => { r.o.x = r.x + dx; r.o.y = r.y + dy; const n = nodeOf(r.o.id); if (n) { n.style.left = r.o.x + 'px'; n.style.top = r.o.y + 'px'; } });
        drawOverlay(); syncProps();
        break;
      }
      case 'resize': {
        const o = drag.o, b0 = drag.b0, h = drag.h;
        const a = -(o.rot || 0) * Math.PI / 180;
        const rdx = p.x - drag.start.x, rdy = p.y - drag.start.y;
        const dx = rdx * Math.cos(a) - rdy * Math.sin(a), dy = rdx * Math.sin(a) + rdy * Math.cos(a);
        let x = b0.x, y = b0.y, w = b0.w, hh = b0.h;
        if (h.includes('e')) w = b0.w + dx;
        if (h.includes('w')) { w = b0.w - dx; x = b0.x + dx; }
        if (h.includes('s')) hh = b0.h + dy;
        if (h.includes('n')) { hh = b0.h - dy; y = b0.y + dy; }
        const keepRatio = h.length === 2 && (o.type !== 'shape' || e.shiftKey);
        if (keepRatio) {
          const f = Math.max(w / b0.w, hh / b0.h);
          w = b0.w * f; hh = b0.h * f;
          if (h.includes('w')) x = b0.x + b0.w - w;
          if (h.includes('n')) y = b0.y + b0.h - hh;
        }
        if (w < 8 || hh < 4) break;
        if (o.type === 'text') {
          if (h.length === 2) { const f = w / b0.w; o.size = Math.max(4, Math.round(drag.size0 * f * 10) / 10); o.ls = drag.ls0 * f; }
          o.x = x; o.w = w;
          if (h.includes('n')) o.y = b0.y + b0.h - b0.h * (w / b0.w); else o.y = b0.y;
        } else Object.assign(o, { x, y, w, h: hh });
        refreshEl(o);
        if (o.rot) {
          const anchor = (bx) => ({ x: h.includes('e') ? bx.x : h.includes('w') ? bx.x + bx.w : bx.x + bx.w / 2, y: h.includes('s') ? bx.y : h.includes('n') ? bx.y + bx.h : bx.y + bx.h / 2 });
          const world = (pt, bx) => { const cx = bx.x + bx.w / 2, cy = bx.y + bx.h / 2, r = o.rot * Math.PI / 180; return { x: cx + (pt.x - cx) * Math.cos(r) - (pt.y - cy) * Math.sin(r), y: cy + (pt.x - cx) * Math.sin(r) + (pt.y - cy) * Math.cos(r) }; };
          const a0 = world(anchor(b0), b0), nb = boxOf(o), a1 = world(anchor(nb), nb);
          o.x += a0.x - a1.x; o.y += a0.y - a1.y;
          refreshEl(o);
        }
        drawOverlay(); syncProps();
        break;
      }
      case 'rotate': {
        const o = drag.o, b = drag.b0;
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
        let ang = Math.atan2(p.y - cy, p.x - cx) * 180 / Math.PI - 90;
        ang = ((ang % 360) + 360) % 360;
        if (e.shiftKey) ang = Math.round(ang / 15) * 15;
        else { const near = Math.round(ang / 45) * 45; if (Math.abs(near - ang) < 3) ang = near; }
        o.rot = ang % 360;
        const n = nodeOf(o.id); if (n) n.style.transform = o.rot ? 'rotate(' + o.rot + 'deg)' : '';
        drawOverlay(); syncProps();
        break;
      }
      case 'marquee': marquee.x2 = p.x; marquee.y2 = p.y; drawOverlay(); break;
    }
  });
  stage.addEventListener('pointerup', () => {
    if (!drag) return;
    const d = drag; drag = null;
    guides = [];
    if (d.mode === 'marquee') {
      const m = marquee; marquee = null;
      const b = { x: Math.min(m.x1, m.x2), y: Math.min(m.y1, m.y2), w: Math.abs(m.x2 - m.x1), h: Math.abs(m.y2 - m.y1) };
      if (b.w > 3 || b.h > 3) {
        const ids = page().els.filter((o) => !o.hidden && !o.locked).filter((o) => { const wb = worldBox(o); return wb.x < b.x + b.w && wb.x + wb.w > b.x && wb.y < b.y + b.h && wb.y + wb.h > b.y; }).map((o) => o.id);
        select(Array.from(new Set(sel.concat(ids))));
      } else drawOverlay();
      return;
    }
    if (d.mode === 'move' && !d.moved) { drawOverlay(); return; }
    if (d.mode !== 'pan') { commit(); renderProps(); }
    drawOverlay();
  });
  stage.addEventListener('pointerleave', () => { if (hoverId && !drag) { hoverId = null; drawOverlay(); } });
  stage.addEventListener('dblclick', (e) => {
    // التقاط المؤشر يغي\u0651ر هدف الحدث، لذا نحدد العنصر من موضع النقر
    const hit = document.elementFromPoint(e.clientX, e.clientY);
    const elN = hit && hit.closest('.m-el[data-id]');
    if (!elN) return;
    const o = byId(elN.dataset.id);
    if (!o || o.locked) return;
    if (o.type === 'text') startEdit(o);
    else if (o.type === 'image') replaceImage(o);
  });
  stage.addEventListener('wheel', (e) => {
    if (!doc) return;
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) setZoom(V.z * (e.deltaY < 0 ? 1.1 : 1 / 1.1), e.clientX - r.left, e.clientY - r.top);
    else { V.px -= e.shiftKey ? e.deltaY : e.deltaX; V.py -= e.shiftKey ? 0 : e.deltaY; applyView(); }
  }, { passive: false });
  stage.addEventListener('contextmenu', (e) => {
    if (!doc) return;
    const elN = e.target.closest('.m-el[data-id]');
    if (elN && !sel.includes(elN.dataset.id)) select([elN.dataset.id]);
    if (sel.length) W.contextMenu(e, elMenu());
  });
  window.addEventListener('keydown', (e) => { if (e.code === 'Space' && !editing && !e.target.closest('input,textarea,[contenteditable="true"]')) { spaceDown = true; stage.style.cursor = 'grab'; } });
  window.addEventListener('keyup', (e) => { if (e.code === 'Space') { spaceDown = false; stage.style.cursor = ''; } });

  /* تحرير النص مباشرة */
  function beginEditDom(o) {
    const n = nodeOf(o.id);
    if (!n) return null;
    const tc = n.querySelector('.m-tc');
    tc.contentEditable = 'true';
    tc.spellcheck = false;
    tc.addEventListener('input', () => { o.h = n.offsetHeight; drawOverlay(); });
    tc.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { ev.preventDefault(); endEdit(); } ev.stopPropagation(); });
    tc.addEventListener('paste', (ev) => { ev.preventDefault(); const t = (ev.clipboardData || window.clipboardData).getData('text/plain'); document.execCommand('insertText', false, t); });
    return tc;
  }
  function startEdit(o) {
    if (editing === o.id) return;
    if (editing) endEdit();
    editing = o.id;
    select([o.id]);
    const tc = beginEditDom(o);
    if (!tc) return;
    tc.focus();
    const r = document.createRange(); r.selectNodeContents(tc);
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    drawOverlay();
  }
  function cleanHTML(html) {
    const box = document.createElement('div');
    box.innerHTML = W.sanitizeHTML(html);
    const out = [];
    const walk = (node, wrap) => {
      node.childNodes.forEach((c) => {
        if (c.nodeType === 3) { out.push(wrap(W.escape(c.nodeValue))); return; }
        if (c.nodeType !== 1) return;
        const tag = c.tagName.toLowerCase();
        if (tag === 'br') { out.push('<br>'); return; }
        const block = /^(div|p|li|h\d)$/.test(tag);
        if (block && out.length && out[out.length - 1] !== '<br>') out.push('<br>');
        let w2 = wrap;
        if (/^(b|strong)$/.test(tag) || /bold|[6-9]00/.test(c.style.fontWeight)) w2 = ((f) => (s) => f('<b>' + s + '</b>'))(w2);
        if (/^(i|em)$/.test(tag) || c.style.fontStyle === 'italic') w2 = ((f) => (s) => f('<i>' + s + '</i>'))(w2);
        if (tag === 'u' || /underline/.test(c.style.textDecoration)) w2 = ((f) => (s) => f('<u>' + s + '</u>'))(w2);
        const color = (tag === 'font' && c.getAttribute('color')) || c.style.color;
        if (color && /^[#a-z0-9(),.\s%]+$/i.test(color)) w2 = ((f, col) => (s) => f('<span style="color:' + col + '">' + s + '</span>'))(w2, color);
        walk(c, w2);
      });
    };
    walk(box, (s) => s);
    let s = out.join('').replace(/(<br>)+$/, '');
    s = s.replace(/<\/b><b>/g, '').replace(/<\/i><i>/g, '').replace(/<\/u><u>/g, '');
    return s;
  }
  function endEdit() {
    if (!editing) return;
    const o = byId(editing);
    const n = nodeOf(editing);
    editing = null;
    if (!o || !n) { render(); return; }
    const tc = n.querySelector('.m-tc');
    o.html = cleanHTML(tc.innerHTML);
    if (!tc.textContent.trim()) page().els = page().els.filter((x) => x.id !== o.id);
    window.getSelection().removeAllRanges();
    render(); commit(); renderProps();
  }
  /* تنسيق جزء من النص أثناء التحرير */
  function inlineFormat(cmd, val) {
    if (!editing) return false;
    document.execCommand('styleWithCSS', false, false);
    document.execCommand(cmd, false, val);
    const o = byId(editing); const n = nodeOf(editing); if (o && n) o.h = n.offsetHeight;
    drawOverlay();
    return true;
  }

  /* ═══════════ عمليات العناصر ═══════════ */
  function addEl(o, opts) {
    if (!doc) return null;
    o = Object.assign({ id: uid(), rot: 0, opacity: 1 }, o);
    if (o.x == null) { o.x = (doc.w - o.w) / 2; o.y = (doc.h - (o.h || o.size * 1.4)) / 2; }
    page().els.push(o);
    render();
    if (o.type === 'text' && (!opts || !opts.keepY)) { o.y = (doc.h - o.h) / 2; refreshEl(o); }
    commit();
    select([o.id]);
    return o;
  }
  const scaleBase = () => Math.min(doc.w, doc.h) / 1080;
  function addText(kind, preset) {
    const k = scaleBase();
    const base = { heading: { size: 110, weight: 700, font: 'Cairo', key: 'm.heading' }, sub: { size: 64, weight: 700, font: 'Tajawal', key: 'm.sub' }, body: { size: 40, weight: 400, font: 'Tajawal', key: 'm.body' } }[kind] || {};
    const p = Object.assign({}, base, preset || {});
    const size = Math.round(p.size * k);
    const html = W.escape(p.text || W.t(p.key || 'm.heading'));
    return addEl({ type: 'text', html, w: Math.min(doc.w * 0.84, Math.max(240, size * (p.text || W.t(p.key)).length * 0.62)), h: size * 1.4, size, font: p.font, weight: p.weight, color: p.color || (isDarkBg() ? '#ffffff' : '#111111'), align: 'center', lh: p.lh || 1.3, ls: 0, shadow: p.shadow || null, outline: p.outline || null, highlight: p.highlight || null });
  }
  function isDarkBg() {
    const bg = page().bg;
    const c = bg.type === 'gradient' ? bg.c1 : bg.type === 'image' ? '#000000' : bg.color;
    try { const { r, g, b } = W.color.hexToRgb(c); return (r * 0.299 + g * 0.587 + b * 0.114) < 140; } catch (e) { return false; }
  }
  function addShape(kind) {
    const s = 360 * scaleBase();
    const dims = kind === 'line' ? { w: s * 1.4, h: 8 } : kind === 'arrow' ? { w: s * 1.2, h: s * 0.6 } : kind === 'rect' ? { w: s * 1.3, h: s * 0.85 } : { w: s, h: s };
    addEl(Object.assign({ type: 'shape', kind, fill: '#ee0b75', stroke: 'none', strokeW: 0, radius: 0 }, dims));
  }
  function addIcon(name) { const s = 220 * scaleBase(); addEl({ type: 'icon', name, w: s, h: s, color: isDarkBg() ? '#ffffff' : '#111111' }); }
  function addSticker(ch) { const s = 220 * scaleBase(); addEl({ type: 'sticker', char: ch, w: s, h: s }); }
  async function addImageAsset(id, at) {
    const img = await W.loadImage(doc.assets[id]);
    const ph = selEls().find((o) => o.type === 'image' && !o.src);
    if (ph) { ph.src = id; render(); commit(); renderProps(); return ph; }
    const s = Math.min(doc.w * 0.6 / img.naturalWidth, doc.h * 0.6 / img.naturalHeight);
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    return addEl({ type: 'image', src: id, w, h, x: at ? at.x - w / 2 : (doc.w - w) / 2, y: at ? at.y - h / 2 : (doc.h - h) / 2, radius: 0, filter: { b: 100, c: 100, s: 100 } });
  }
  async function storeImage(dataURL) {
    // صغ\u0651ر الصور الكبيرة جد\u064Bا لتبقى ملفات التصميم خفيفة
    const img = await W.loadImage(dataURL);
    const max = 3000;
    if (img.naturalWidth > max || img.naturalHeight > max) {
      const s = max / Math.max(img.naturalWidth, img.naturalHeight);
      const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      dataURL = c.toDataURL(/png/.test(dataURL.slice(0, 30)) ? 'image/png' : 'image/jpeg', 0.9);
    }
    const id = 'img' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    doc.assets[id] = dataURL;
    renderSidePanel();
    return id;
  }
  async function uploadImages(addToo) {
    const files = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'] }], multiple: true, as: 'dataurl' });
    const ids = [];
    for (const f of files) ids.push(await storeImage(f.data));
    if (addToo && ids.length) await addImageAsset(ids[0]);
    return ids;
  }
  async function replaceImage(o) {
    const ids = await uploadImages(false);
    if (!ids.length) return;
    o.src = ids[0];
    render(); commit(); renderProps();
  }
  let clipboard = null;
  function copy() { clipboard = selEls().map(clone); }
  function paste() {
    if (!clipboard || !doc) return;
    const items = clipboard.map((o) => Object.assign(clone(o), { id: uid(), x: o.x + 30, y: o.y + 30 }));
    page().els.push(...items);
    clipboard = items.map(clone);
    render(); commit(); select(items.map((o) => o.id));
  }
  function duplicate(inPlace) {
    const items = selEls().map((o) => Object.assign(clone(o), { id: uid(), x: o.x + (inPlace ? 0 : 30), y: o.y + (inPlace ? 0 : 30) }));
    if (!items.length) return;
    page().els.push(...items);
    render(); commit(); select(items.map((o) => o.id));
  }
  function del() {
    if (!sel.length) return;
    const ids = new Set(sel.filter((id) => !byId(id).locked));
    page().els = page().els.filter((o) => !ids.has(o.id));
    sel = sel.filter((id) => !ids.has(id));
    render(); commit(); renderProps();
  }
  function zorder(kind) {
    const ids = new Set(sel);
    const els = page().els;
    if (kind === 'front') page().els = els.filter((o) => !ids.has(o.id)).concat(els.filter((o) => ids.has(o.id)));
    else if (kind === 'back') page().els = els.filter((o) => ids.has(o.id)).concat(els.filter((o) => !ids.has(o.id)));
    else {
      const arr = els.slice();
      const order = kind === 'forward' ? arr.map((_, i) => arr.length - 1 - i) : arr.map((_, i) => i);
      order.forEach((i) => { if (!ids.has(arr[i].id)) return; const j = kind === 'forward' ? i + 1 : i - 1; if (j < 0 || j >= arr.length || ids.has(arr[j].id)) return; [arr[i], arr[j]] = [arr[j], arr[i]]; });
      page().els = arr;
    }
    render(); commit();
  }
  function alignPage(kind) {
    const objs = selEls();
    const ref = objs.length > 1 ? unionBox(objs.map(worldBox)) : { x: 0, y: 0, w: doc.w, h: doc.h };
    objs.forEach((o) => {
      const b = worldBox(o);
      if (kind === 'l') o.x += ref.x - b.x; if (kind === 'r') o.x += ref.x + ref.w - b.x - b.w; if (kind === 'ch') o.x += ref.x + ref.w / 2 - b.x - b.w / 2;
      if (kind === 't') o.y += ref.y - b.y; if (kind === 'b') o.y += ref.y + ref.h - b.y - b.h; if (kind === 'cv') o.y += ref.y + ref.h / 2 - b.y - b.h / 2;
    });
    render(); commit(); syncProps();
  }
  function toggleLock() { const objs = selEls(); const v = !objs.every((o) => o.locked); objs.forEach((o) => { o.locked = v; }); commit(); drawOverlay(); renderProps(); }
  function setAsBackground(o) {
    if (!o || o.type !== 'image' || !o.src) return;
    page().bg = { type: 'image', src: o.src, overlay: 0, color: '#000000' };
    page().els = page().els.filter((x) => x.id !== o.id);
    sel = [];
    render(); commit(); renderProps();
  }
  const elMenu = () => [
    { i18n: 'cmd.cut', icon: 'cut', action: () => { copy(); del(); } },
    { i18n: 'cmd.copy', icon: 'copy', action: copy },
    { i18n: 'cmd.paste', icon: 'paste', action: paste },
    { i18n: 'cmd.duplicate', icon: 'duplicate', action: () => duplicate() },
    { i18n: 'cmd.delete', icon: 'trash', action: del },
    '-',
    { i18n: 'm.front', icon: 'bring-front', action: () => zorder('front') },
    { i18n: 'm.forward', action: () => zorder('forward') },
    { i18n: 'm.backward', action: () => zorder('backward') },
    { i18n: 'm.back', icon: 'send-back', action: () => zorder('back') },
    '-',
    { i18n: selEls().every((o) => o.locked) ? 'm.unlock' : 'm.lock', icon: 'lock', action: toggleLock },
    { i18n: 'm.setAsBg', icon: 'background', action: () => setAsBackground(selEls()[0]), hidden: () => !(selEls().length === 1 && selEls()[0].type === 'image' && selEls()[0].src) }
  ];

  /* ═══════════ الصفحات ═══════════ */
  const pagesEl = $('#pages');
  function renderPages() {
    pagesEl.innerHTML = '';
    if (!doc) return;
    const th = 64;
    doc.pages.forEach((p, i) => {
      const s = th / doc.h;
      const box = W.h('div', { class: 'm-pthumb' + (i === pi ? ' active' : ''), style: { width: (doc.w * s) + 'px', height: th + 'px' }, title: W.t('m.page') + ' ' + (i + 1) });
      const inner = pageNode(p, 'thumb');
      inner.style.transform = 'scale(' + s + ')';
      inner.style.transformOrigin = '0 0';
      inner.style.position = 'absolute'; inner.style.top = '0'; inner.style.left = '0';
      box.append(inner, W.h('span', { class: 'm-pnum', text: W.fmtNum ? W.fmtNum(i + 1) : String(i + 1) }));
      box.addEventListener('click', () => goPage(i));
      box.addEventListener('contextmenu', (e) => { goPage(i); W.contextMenu(e, pageMenu()); });
      pagesEl.append(box);
    });
    pagesEl.append(W.iconButton('plus', 'm.addPage', addPage, { cls: 'm-padd' }));
  }
  const thumbsSoon = W.debounce(() => renderPages(), 250);
  const pageMenu = () => [
    { i18n: 'm.addPage', icon: 'plus', action: addPage },
    { i18n: 'm.dupPage', icon: 'duplicate', action: dupPage },
    { i18n: 'm.movePageUp', action: () => movePage(-1), disabled: () => pi === 0 },
    { i18n: 'm.movePageDown', action: () => movePage(1), disabled: () => pi === doc.pages.length - 1 },
    '-',
    { i18n: 'm.delPage', icon: 'trash', action: delPage, disabled: () => doc.pages.length < 2 }
  ];
  function goPage(i) { if (editing) endEdit(); pi = W.clamp(i, 0, doc.pages.length - 1); sel = []; render(); renderProps(); }
  function addPage() { if (!doc) return; doc.pages.splice(pi + 1, 0, { id: uid(), bg: { type: 'color', color: '#ffffff' }, els: [] }); pi++; sel = []; render(); commit(); renderProps(); }
  function dupPage() { const p = clone(page()); p.id = uid(); p.els.forEach((o) => { o.id = uid(); }); doc.pages.splice(pi + 1, 0, p); pi++; sel = []; render(); commit(); }
  function delPage() { if (doc.pages.length < 2) return; doc.pages.splice(pi, 1); pi = Math.min(pi, doc.pages.length - 1); sel = []; render(); commit(); renderProps(); }
  function movePage(d) { const j = pi + d; if (j < 0 || j >= doc.pages.length) return; const p = doc.pages.splice(pi, 1)[0]; doc.pages.splice(j, 0, p); pi = j; render(); commit(); }
  function updateStatus() {
    if (!doc) return;
    status.item('page').textContent = W.t('m.pageOf', { i: pi + 1, n: doc.pages.length });
    const sz = SIZES.find((s) => s.id === doc.size);
    status.item('size').textContent = (sz ? W.L(sz.name) + ' — ' : '') + doc.w + '×' + doc.h;
    sizeBtn.querySelector('span').textContent = (sz ? W.L(sz.name) : W.t('m.custom')) + ' ' + doc.w + '×' + doc.h;
  }

  /* ═══════════ القوالب ═══════════ */
  function instantiate(tpl, w, h) {
    const sz = SIZES.find((s) => s.id === tpl.size);
    const tw = sz.w, th = sz.h;
    const rtl = W.isRTL();
    const s = Math.min(w / tw, h / th), ox = (w - tw * s) / 2, oy = (h - th * s) / 2;
    const els = tpl.els.map((e) => {
      const o = clone(e);
      o.id = uid();
      if (o.type === 'text') { o.html = W.escape(typeof o.text === 'object' ? W.L(o.text) : o.text).replace(/\n/g, '<br>'); delete o.text; o.h = o.size * (o.lh || 1.3); }
      if (!rtl) { o.x = tw - o.x - o.w; if (o.rot) o.rot = -o.rot; }
      o.x = ox + o.x * s; o.y = oy + o.y * s; o.w *= s; o.h *= s;
      if (o.size) o.size *= s;
      if (o.radius) o.radius *= s;
      if (o.strokeW) o.strokeW *= s;
      if (o.outline) o.outline.w *= s;
      if (o.shadow) { o.shadow.x *= s; o.shadow.y *= s; o.shadow.blur *= s; }
      if (o.rot == null) o.rot = 0;
      if (o.opacity == null) o.opacity = 1;
      return o;
    });
    return { id: uid(), bg: clone(tpl.bg), els };
  }
  function tplThumb(tpl, width) {
    const sz = SIZES.find((s) => s.id === tpl.size);
    const saved = doc;
    doc = { w: sz.w, h: sz.h, dir: W.isRTL() ? 'rtl' : 'ltr', assets: saved ? saved.assets : {}, pages: [] };
    const p = instantiate(tpl, sz.w, sz.h);
    const s = width / sz.w;
    const box = W.h('div', { class: 'm-tthumb', style: { width: width + 'px', height: (sz.h * s) + 'px' } });
    const inner = pageNode(p, 'thumb');
    Object.assign(inner.style, { transform: 'scale(' + s + ')', transformOrigin: '0 0', position: 'absolute', top: '0', left: '0' });
    box.append(inner);
    doc = saved;
    return box;
  }
  async function applyTemplate(tpl) {
    if (!doc) { startFromTemplate(tpl); return; }
    if (page().els.length && !(await W.confirm(W.t('m.applyTpl')))) return;
    doc.pages[pi] = instantiate(tpl, doc.w, doc.h);
    sel = [];
    render(); commit(); renderProps();
  }
  async function startFromTemplate(tpl) {
    if (!(await W.confirmDiscard())) return;
    const sz = SIZES.find((s) => s.id === tpl.size);
    startDoc({ w: sz.w, h: sz.h, size: sz.id, pages: [] });
    doc.pages = [instantiate(tpl, sz.w, sz.h)];
    hist.stack = []; hist.index = -1;
    render(); commit(); W.setDirty(false); fit();
  }

  /* ═══════════ اللوحة الجانبية (إضافة) ═══════════ */
  const TABS = [['templates', 'template', 'm.templates'], ['text', 'text', 'm.text'], ['elements', 'shapes', 'm.elements'], ['uploads', 'upload', 'm.uploads'], ['background', 'background', 'm.background']];
  let tab = 'templates', tplCat = 'all';
  const railEl = $('#rail'), sideEl = $('#sidepanel');
  function renderRail() {
    railEl.innerHTML = '';
    TABS.forEach(([id, icon, key]) => {
      const b = W.h('button', { class: 'm-tab' + (tab === id ? ' active' : ''), type: 'button' }, W.iconEl(icon), W.h('span', { text: W.t(key) }));
      b.addEventListener('click', () => { tab = id; renderRail(); renderSidePanel(); });
      railEl.append(b);
    });
  }
  const COMBOS = [
    { label: { ar: 'عنوان عريض', en: 'Bold title' }, font: 'Lalezar', size: 120, weight: 400, color: '#111111' },
    { label: { ar: 'خط الرقعة', en: 'Ruqaa script' }, font: 'Aref Ruqaa', size: 110, weight: 700, color: '#b08d57' },
    { label: { ar: 'محد\u0651د', en: 'Outlined' }, font: 'Cairo', size: 110, weight: 700, color: '#ffffff', outline: { color: '#111111', w: 5 } },
    { label: { ar: 'بظل', en: 'Shadowed' }, font: 'Cairo', size: 100, weight: 700, color: '#fde047', shadow: { color: 'rgba(0,0,0,0.55)', x: 6, y: 8, blur: 0 } },
    { label: { ar: 'خلفية ملونة', en: 'Highlighted' }, font: 'Tajawal', size: 64, weight: 700, color: '#ffffff', highlight: { color: '#ee0b75', radius: 10 } },
    { label: { ar: 'نيون', en: 'Neon' }, font: 'Changa', size: 100, weight: 700, color: '#ffffff', shadow: { color: '#ee0b75', x: 0, y: 0, blur: 24 } },
    { label: { ar: 'كلاسيكي', en: 'Classic' }, font: 'Amiri', size: 84, weight: 700, color: '#3b2f2f' },
    { label: { ar: 'كوفي حديث', en: 'Modern Kufi' }, font: 'Reem Kufi', size: 100, weight: 700, color: '#0062ee' }
  ];
  const ICONS = ['star', 'heart', 'sparkles', 'moon', 'sun', 'check-circle', 'alert', 'info', 'mail', 'globe', 'link', 'home', 'user', 'clock', 'calendar', 'music', 'mic', 'video', 'film', 'image', 'play', 'palette', 'brush', 'pen', 'target', 'chart-bar', 'chart-pie', 'cloud', 'box', 'apps', 'search', 'settings', 'terminal', 'keyboard', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'plus', 'check', 'x', 'percent', 'currency', 'sticker', 'heading', 'quote'];
  const STICKERS = ['🎉', '✨', '🔥', '❤️', '⭐', '🌙', '🕌', '🎁', '👍', '😍', '📣', '🛍️', '☕', '📚', '🏆', '💡', '🎂', '🌸', '🌴', '⚽', '🎵', '📸', '✅', '💯'];
  const GRADS = [['#ff3d77', '#ff9a3d'], ['#4c1d95', '#db2777'], ['#0b1a3a', '#1e3a8a'], ['#0062ee', '#22d3ee'], ['#16a34a', '#a3e635'], ['#f59e0b', '#ef4444'], ['#0f172a', '#334155'], ['#fce7f3', '#e0e7ff'], ['#fef3c7', '#fde68a'], ['#111827', '#7f1d1d'], ['#ee0b75', '#790ce2'], ['#fd6101', '#ee0b75']];
  const COLORS = ['#ffffff', '#f5efe6', '#fef3c7', '#fce7f3', '#e0e7ff', '#dcfce7', '#e5e7eb', '#9ca3af', '#111111', '#0f172a', '#1e3a8a', '#0062ee', '#22d3ee', '#16a34a', '#facc15', '#fd6101', '#ef4444', '#ee0b75', '#790ce2', '#78350f'];
  function sideTitle(key) { return W.h('div', { class: 'm-stitle', text: W.t(key) }); }
  function renderSidePanel() {
    sideEl.innerHTML = '';
    if (tab === 'templates') {
      const cats = ['all', 'social', 'video', 'print'];
      sideEl.append(W.segmented(cats.map((c) => ({ value: c, i18n: c === 'all' ? 'm.all' : 'm.cat.' + c })), tplCat, (v) => { tplCat = v; renderSidePanel(); }));
      const grid = W.h('div', { class: 'm-tgrid' });
      TEMPLATES.filter((t) => tplCat === 'all' || SIZES.find((s) => s.id === t.size).cat === tplCat).forEach((t) => {
        const card = W.h('button', { class: 'm-tcard', type: 'button', title: W.L(t.name) }, tplThumb(t, 128), W.h('span', { text: W.L(t.name) }));
        card.addEventListener('click', () => applyTemplate(t));
        grid.append(card);
      });
      sideEl.append(grid);
    } else if (tab === 'text') {
      const big = (key, kind, size, weight) => { const b = W.h('button', { class: 'm-addtext', type: 'button', style: { fontSize: size + 'px', fontWeight: weight }, text: W.t(key) }); b.addEventListener('click', () => doc && addText(kind)); return b; };
      sideEl.append(big('m.addHeading', 'heading', 22, 700), big('m.addSub', 'sub', 17, 600), big('m.addBody', 'body', 14, 400), sideTitle('m.combos'));
      const grid = W.h('div', { class: 'm-combos' });
      COMBOS.forEach((c) => {
        const prev = W.h('span', { text: W.L(c.label), style: { fontFamily: W.fontStack(c.font), fontWeight: c.weight, color: c.color, fontSize: '22px', textShadow: c.shadow ? (c.shadow.x / 3) + 'px ' + (c.shadow.y / 3) + 'px ' + (c.shadow.blur / 3) + 'px ' + c.shadow.color : 'none', webkitTextStroke: c.outline ? '1.5px ' + c.outline.color : '', paintOrder: 'stroke fill', background: c.highlight ? c.highlight.color : '', padding: c.highlight ? '0 6px' : '', borderRadius: '4px' } });
        const b = W.h('button', { class: 'm-combo' + (c.color === '#ffffff' || c.color === '#fde047' ? ' dark' : ''), type: 'button' }, prev);
        b.addEventListener('click', () => { if (doc) { W.ensureFont(c.font, c.weight); addText('heading', Object.assign({ text: W.L(c.label) }, c)); } });
        grid.append(b);
      });
      sideEl.append(grid);
    } else if (tab === 'elements') {
      sideEl.append(sideTitle('m.shapes'));
      const sg = W.h('div', { class: 'm-grid4' });
      ['rect', 'circle', 'triangle', 'star', 'heart', 'hexagon', 'diamond', 'arrow', 'line', 'bubble', 'badge', 'blob'].forEach((k) => {
        const b = W.h('button', { class: 'm-item', type: 'button', 'data-tip': 'm.s.' + k });
        b.innerHTML = k === 'rect' ? '<div style="width:70%;height:55%;background:currentColor;border-radius:3px"></div>' : k === 'circle' ? '<div style="width:62%;height:62%;background:currentColor;border-radius:50%"></div>' :
          '<svg viewBox="0 0 100 100" style="width:66%;height:66%;overflow:visible"><g fill="' + (k === 'line' ? 'none' : 'currentColor') + '" stroke="currentColor" stroke-width="' + (k === 'line' ? 8 : 0) + '">' + SHAPES[k] + '</g></svg>';
        b.addEventListener('click', () => doc && addShape(k));
        sg.append(b);
      });
      sideEl.append(sg, sideTitle('m.icons'));
      const ig = W.h('div', { class: 'm-grid5' });
      ICONS.filter((n) => W.icon(n) !== W.icon('__none__') || n === 'help').forEach((n) => {
        const b = W.h('button', { class: 'm-item', type: 'button', html: W.icon(n) });
        b.addEventListener('click', () => doc && addIcon(n));
        ig.append(b);
      });
      sideEl.append(ig, sideTitle('m.stickers'));
      const eg = W.h('div', { class: 'm-grid5' });
      STICKERS.forEach((ch) => { const b = W.h('button', { class: 'm-item m-emoji', type: 'button', text: ch }); b.addEventListener('click', () => doc && addSticker(ch)); eg.append(b); });
      sideEl.append(eg);
    } else if (tab === 'uploads') {
      const up = W.h('button', { class: 'w-btn primary', type: 'button', style: { width: '100%' } }, W.iconEl('upload'), W.h('span', { text: W.t('m.upload') }));
      up.addEventListener('click', () => doc && uploadImages(false));
      sideEl.append(up);
      const ids = doc ? Object.keys(doc.assets) : [];
      if (!ids.length) sideEl.append(W.h('p', { class: 'muted small', style: { marginTop: '14px', lineHeight: '1.7' }, text: W.t('m.noUploads') }));
      const grid = W.h('div', { class: 'm-ugrid' });
      ids.forEach((id) => { const b = W.h('button', { class: 'm-uimg', type: 'button' }, W.h('img', { src: doc.assets[id], alt: '' })); b.addEventListener('click', () => addImageAsset(id)); grid.append(b); });
      sideEl.append(grid);
    } else if (tab === 'background') {
      if (!doc) return;
      const bg = page().bg;
      const setBg = (b) => { page().bg = b; render(); commit(); renderSidePanel(); };
      sideEl.append(sideTitle('m.colors'));
      const cg = W.h('div', { class: 'm-grid5' });
      COLORS.forEach((c) => cg.append(W.h('button', { class: 'm-sw', type: 'button', style: { background: c }, title: c, onclick: () => setBg({ type: 'color', color: c }) })));
      const ci = W.h('input', { type: 'color', class: 'w-color', value: bg.type === 'color' ? bg.color : '#ffffff' });
      ci.addEventListener('input', () => { page().bg = { type: 'color', color: ci.value }; render(); });
      ci.addEventListener('change', () => commit());
      sideEl.append(cg, W.h('div', { class: 'row', style: { marginTop: '8px' } }, ci, W.h('span', { class: 'small muted', text: W.t('m.color') })), sideTitle('m.gradients'));
      const gg = W.h('div', { class: 'm-grid4' });
      GRADS.forEach(([a, b]) => gg.append(W.h('button', { class: 'm-sw', type: 'button', style: { background: 'linear-gradient(135deg,' + a + ',' + b + ')' }, onclick: () => setBg({ type: 'gradient', c1: a, c2: b, angle: 135 }) })));
      sideEl.append(gg, sideTitle('m.bgImage'));
      const ib = W.h('button', { class: 'w-btn', type: 'button', style: { width: '100%' } }, W.iconEl('image'), W.h('span', { text: W.t('m.bgImage') }));
      ib.addEventListener('click', async () => { const ids = await uploadImages(false); if (ids[0]) setBg({ type: 'image', src: ids[0], overlay: 0, color: '#000000' }); });
      sideEl.append(ib);
      if (bg.type === 'image') {
        sideEl.append(W.slider({ i18n: 'm.overlay', min: 0, max: 80, value: Math.round((bg.overlay || 0) * 100), onInput: (v) => { bg.overlay = v / 100; render(); }, onChange: () => commit() }));
        sideEl.append(W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.removeBgImage'), onclick: () => setBg({ type: 'color', color: '#ffffff' }) }));
      }
    }
  }

  /* ═══════════ لوحة الخصائص ═══════════ */
  const propsEl = $('#props');
  let propInputs = {};
  const section = (key, ...ch) => W.h('div', { class: 'w-panel' }, W.h('div', { class: 'w-panel-title', text: W.t(key) }), W.h('div', { class: 'w-panel-body' }, ...ch));
  function setOn(fn, live) {
    const objs = selEls();
    objs.forEach(fn);
    objs.forEach(refreshEl);
    drawOverlay();
    if (!live) commit();
  }
  function colorInput(value, onInput, onChange) {
    const c = W.h('input', { type: 'color', class: 'w-color', value: /^#[0-9a-f]{6}$/i.test(value || '') ? value : '#000000' });
    c.addEventListener('input', () => onInput(c.value));
    c.addEventListener('change', () => (onChange || (() => commit()))(c.value));
    return c;
  }
  function check(key, val, fn) {
    const c = W.h('input', { type: 'checkbox' });
    c.checked = !!val;
    c.addEventListener('change', () => fn(c.checked));
    return W.h('label', { class: 'w-check-row' }, c, W.h('span', { text: W.t(key) }));
  }
  function paintEditor(value, onChange) {
    const kind = !value || value === 'none' ? 'none' : typeof value === 'object' ? 'gradient' : 'solid';
    const box = W.h('div', { class: 'col', style: { gap: '6px' } });
    box.append(W.segmented([{ value: 'none', i18n: 'm.none' }, { value: 'solid', i18n: 'm.solid' }, { value: 'gradient', i18n: 'm.gradient' }], kind, (k) => {
      if (k === 'none') onChange('none');
      else if (k === 'solid') onChange(typeof value === 'object' ? value.c1 : '#ee0b75');
      else onChange({ type: 'linear', c1: typeof value === 'string' && value !== 'none' ? value : '#ee0b75', c2: '#790ce2', angle: 135 });
      renderProps();
    }));
    if (kind === 'solid') box.append(W.h('div', { class: 'row' }, colorInput(value, (v) => onChange(v, true)), W.swatches((c) => { onChange(c); renderProps(); }, ['#ffffff', '#111111', '#ef4444', '#fd6101', '#facc15', '#16a34a', '#0062ee', '#790ce2', '#ee0b75'])));
    if (kind === 'gradient') {
      const ang = W.h('input', { class: 'w-input sm', type: 'number', value: value.angle || 0, style: { width: '68px' } });
      const upd = (live) => onChange({ type: 'linear', c1: c1.value, c2: c2.value, angle: parseFloat(ang.value) || 0 }, live);
      const c1 = colorInput(value.c1, () => upd(true), () => upd()), c2 = colorInput(value.c2, () => upd(true), () => upd());
      ang.addEventListener('change', () => upd());
      box.append(W.h('div', { class: 'row' }, c1, c2, W.h('span', { class: 'small muted', text: W.t('m.angle') }), ang));
    }
    return box;
  }
  const FILTERS = { none: { b: 100, c: 100, s: 100 }, bw: { b: 105, c: 115, s: 100, gray: 100 }, warm: { b: 104, c: 105, s: 125, sepia: 25 }, cool: { b: 102, c: 105, s: 90, hue: 12 }, vintage: { b: 108, c: 90, s: 80, sepia: 45 }, vivid: { b: 104, c: 118, s: 150 }, fade: { b: 112, c: 80, s: 75 } };
  function renderProps() {
    propsEl.innerHTML = '';
    propInputs = {};
    if (!doc) return;
    const objs = selEls();
    if (!objs.length) {
      propsEl.append(section('m.background', paintEditor(page().bg.type === 'gradient' ? { type: 'linear', c1: page().bg.c1, c2: page().bg.c2, angle: page().bg.angle } : page().bg.type === 'image' ? 'none' : page().bg.color, (v, live) => {
        page().bg = v === 'none' ? { type: 'color', color: '#ffffff' } : typeof v === 'object' ? { type: 'gradient', c1: v.c1, c2: v.c2, angle: v.angle } : { type: 'color', color: v };
        render(); if (!live) commit();
      })));
      const sz = W.h('button', { class: 'w-btn', type: 'button', style: { width: '100%' } }, W.iconEl('resize'), W.h('span', { text: W.t('m.resize') }));
      sz.addEventListener('click', resizeDesign);
      propsEl.append(section('m.page', sz, W.h('div', { class: 'row', style: { marginTop: '8px', flexWrap: 'wrap' } },
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.addPage'), onclick: addPage }), W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.dupPage'), onclick: dupPage }),
        W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.delPage'), onclick: delPage, disabled: doc.pages.length < 2 }))));
      return;
    }
    const o = objs[0];
    const locked = objs.every((x) => x.locked);
    propsEl.append(W.h('div', { class: 'm-quick' },
      W.iconButton('duplicate', 'cmd.duplicate', () => duplicate()), W.iconButton('trash', 'cmd.delete', del),
      W.iconButton(locked ? 'lock' : 'unlock', locked ? 'm.unlock' : 'm.lock', toggleLock, { cls: locked ? 'active' : '' }),
      W.iconButton('bring-front', 'm.front', () => zorder('front')), W.iconButton('send-back', 'm.back', () => zorder('back'))));
    const num = (key, label, val, fn) => {
      const inp = W.h('input', { class: 'w-input sm', type: 'number', value: W.round(val, 1) });
      inp.addEventListener('change', () => fn(parseFloat(inp.value) || 0));
      propInputs[key] = inp;
      return W.h('div', { class: 'w-field' }, W.h('label', { text: label }), inp);
    };
    if (objs.length === 1) {
      propsEl.append(section('ui.position',
        W.h('div', { class: 'w-input-group' }, num('x', 'X', o.x, (v) => setOn((x) => { x.x = v; })), num('y', 'Y', o.y, (v) => setOn((x) => { x.y = v; }))),
        W.h('div', { class: 'w-input-group' }, num('w', W.t('ui.width'), o.w, (v) => setOn((x) => { if (x.type === 'text') x.w = Math.max(10, v); else { if (x.type !== 'shape') x.h *= v / x.w; x.w = Math.max(2, v); } })),
          o.type === 'text' ? num('h', W.t('ui.height'), o.h, () => syncProps()) : num('h', W.t('ui.height'), o.h, (v) => setOn((x) => { if (x.type !== 'shape') x.w *= v / x.h; x.h = Math.max(2, v); }))),
        W.h('div', { class: 'w-input-group' }, num('rot', W.t('ui.rotation'), o.rot || 0, (v) => setOn((x) => { x.rot = v; })))));
      if (o.type === 'text') propInputs.h.disabled = true;
    }
    if (o.type === 'text') {
      const fsel = W.fontSelect(o.font, async (f) => { await W.ensureFont(f, o.weight); setOn((x) => { if (x.type === 'text') x.font = f; }); });
      const bold = W.iconButton('bold', 'm.bold', () => { if (!inlineFormat('bold')) setOn((x) => { if (x.type === 'text') x.weight = (x.weight || 400) >= 600 ? 400 : 700; }); renderProps(); }, { cls: (o.weight || 400) >= 600 ? 'active' : '' });
      const ital = W.iconButton('italic', 'm.italic', () => { if (!inlineFormat('italic')) setOn((x) => { x.italic = !x.italic; }); renderProps(); }, { cls: o.italic ? 'active' : '' });
      const und = W.iconButton('underline', 'm.underline', () => { if (!inlineFormat('underline')) setOn((x) => { x.underline = !x.underline; }); renderProps(); }, { cls: o.underline ? 'active' : '' });
      const col = colorInput(o.color, (v) => { if (editing) { inlineFormat('foreColor', v); return; } setOn((x) => { if (x.type === 'text') x.color = v; }, true); });
      const al = W.segmented([{ value: 'start', icon: W.isRTL() ? 'align-right' : 'align-left' }, { value: 'center', icon: 'align-center' }, { value: 'end', icon: W.isRTL() ? 'align-left' : 'align-right' }, { value: 'justify', icon: 'align-justify' }], o.align || 'center', (v) => setOn((x) => { x.align = v; }));
      propsEl.append(section('m.text',
        W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.font') }), fsel),
        W.slider({ i18n: 'ui.fontSize', min: 6, max: 600, value: Math.round(o.size), onInput: (v) => setOn((x) => { if (x.type === 'text') x.size = v; }, true), onChange: () => commit() }),
        W.h('div', { class: 'row', style: { gap: '4px', margin: '6px 0' } }, bold, ital, und, W.h('div', { style: { flex: 1 } }), col),
        al,
        W.slider({ i18n: 'm.lineHeight', min: 0.7, max: 3, step: 0.05, value: o.lh || 1.3, onInput: (v) => setOn((x) => { x.lh = v; }, true), onChange: () => commit() }),
        W.slider({ i18n: 'm.letterSpacing', min: -20, max: 60, value: o.ls || 0, onInput: (v) => setOn((x) => { x.ls = v; }, true), onChange: () => commit() })));
      // التأثيرات
      const fx = W.h('div', { class: 'col', style: { gap: '4px' } });
      fx.append(check('m.shadow', o.shadow, (v) => { setOn((x) => { x.shadow = v ? { color: 'rgba(0,0,0,0.45)', x: 4, y: 6, blur: 12 } : null; }); renderProps(); }));
      if (o.shadow) {
        fx.append(W.h('div', { class: 'row' }, colorInput(W.color.toHex ? W.color.toHex(o.shadow.color) : '#000000', (v) => setOn((x) => { if (x.shadow) x.shadow.color = W.color.rgba(v, 0.6); }, true))),
          W.slider({ i18n: 'm.blur', min: 0, max: 80, value: o.shadow.blur, onInput: (v) => setOn((x) => { if (x.shadow) x.shadow.blur = v; }, true), onChange: () => commit() }),
          W.slider({ i18n: 'm.offset', min: -40, max: 40, value: o.shadow.y, onInput: (v) => setOn((x) => { if (x.shadow) { x.shadow.y = v; x.shadow.x = Math.round(v * 0.66); } }, true), onChange: () => commit() }));
      }
      fx.append(check('m.outline', o.outline, (v) => { setOn((x) => { x.outline = v ? { color: '#111111', w: Math.max(1, Math.round(x.size / 30)) } : null; }); renderProps(); }));
      if (o.outline) fx.append(W.h('div', { class: 'row' }, colorInput(o.outline.color, (v) => setOn((x) => { if (x.outline) x.outline.color = v; }, true))),
        W.slider({ i18n: 'm.width', min: 1, max: 30, value: o.outline.w, onInput: (v) => setOn((x) => { if (x.outline) x.outline.w = v; }, true), onChange: () => commit() }));
      fx.append(check('m.highlight', o.highlight, (v) => { setOn((x) => { x.highlight = v ? { color: '#ee0b75', radius: 8 } : null; }); renderProps(); }));
      if (o.highlight) fx.append(W.h('div', { class: 'row' }, colorInput(o.highlight.color, (v) => setOn((x) => { if (x.highlight) x.highlight.color = v; }, true))),
        W.slider({ i18n: 'm.radius', min: 0, max: 60, value: o.highlight.radius || 0, onInput: (v) => setOn((x) => { if (x.highlight) x.highlight.radius = v; }, true), onChange: () => commit() }));
      propsEl.append(section('m.effects', fx));
    }
    if (o.type === 'image') {
      const f = o.filter || (o.filter = { b: 100, c: 100, s: 100 });
      const presets = W.h('div', { class: 'm-fgrid' });
      if (o.src) Object.keys(FILTERS).forEach((k) => {
        const b = W.h('button', { class: 'm-fbtn', type: 'button' }, W.h('img', { src: doc.assets[o.src], alt: '', style: { filter: imgFilter(FILTERS[k]) } }), W.h('span', { text: W.t('m.f.' + k) }));
        b.addEventListener('click', () => { setOn((x) => { if (x.type === 'image') x.filter = Object.assign({}, FILTERS[k]); }); renderProps(); });
        presets.append(b);
      });
      const sl = (key, prop, min, max, def) => W.slider({ i18n: key, min, max, value: f[prop] == null ? def : f[prop], onInput: (v) => setOn((x) => { if (x.type === 'image') { x.filter = x.filter || {}; x.filter[prop] = v; } }, true), onChange: () => commit() });
      propsEl.append(section('m.filters', presets, sl('m.brightness', 'b', 0, 200, 100), sl('m.contrast', 'c', 0, 200, 100), sl('m.saturation', 's', 0, 250, 100), sl('m.blur', 'blur', 0, 30, 0)));
      propsEl.append(section('ui.properties',
        W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '6px' } },
          W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.replaceImage'), onclick: () => replaceImage(o) }),
          o.src ? W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('m.setAsBg'), onclick: () => setAsBackground(o) }) : null),
        check('m.circle', o.circle, (v) => setOn((x) => { x.circle = v; })),
        check('m.flip', o.flip, (v) => setOn((x) => { x.flip = v; })),
        W.slider({ i18n: 'm.radius', min: 0, max: Math.round(Math.min(o.w, o.h) / 2), value: o.radius || 0, onInput: (v) => setOn((x) => { x.radius = v; }, true), onChange: () => commit() }),
        W.slider({ i18n: 'm.border', min: 0, max: 60, value: (o.border && o.border.w) || 0, onInput: (v) => setOn((x) => { x.border = { w: v, color: (x.border && x.border.color) || '#ffffff' }; }, true), onChange: () => commit() }),
        W.h('div', { class: 'row' }, W.h('span', { class: 'small muted', text: W.t('m.border') }), colorInput((o.border && o.border.color) || '#ffffff', (v) => setOn((x) => { x.border = { w: (x.border && x.border.w) || 8, color: v }; }, true)))));
    }
    if (o.type === 'shape') {
      const isLine = o.kind === 'line';
      propsEl.append(section('m.fill', paintEditor(o.fill, (v, live) => setOn((x) => { x.fill = v; }, live))));
      if (!isLine) {
        propsEl.append(section('m.stroke',
          W.h('div', { class: 'row' }, colorInput(o.stroke && o.stroke !== 'none' ? o.stroke : '#111111', (v) => setOn((x) => { x.stroke = v; if (!x.strokeW) x.strokeW = 4; }, true))),
          W.slider({ i18n: 'm.width', min: 0, max: 60, value: o.strokeW || 0, onInput: (v) => setOn((x) => { x.strokeW = v; if (!x.stroke || x.stroke === 'none') x.stroke = '#111111'; }, true), onChange: () => commit() }),
          o.kind === 'rect' ? W.slider({ i18n: 'm.radius', min: 0, max: Math.round(Math.min(o.w, o.h) / 2), value: o.radius || 0, onInput: (v) => setOn((x) => { x.radius = v; }, true), onChange: () => commit() }) : null));
      }
    }
    if (o.type === 'icon') {
      propsEl.append(section('ui.properties',
        W.h('div', { class: 'row' }, W.h('span', { class: 'small muted', text: W.t('m.color') }), colorInput(o.color, (v) => setOn((x) => { x.color = v; }, true))),
        W.slider({ i18n: 'm.width', min: 0.5, max: 4, step: 0.25, value: o.sw || 2, onInput: (v) => setOn((x) => { x.sw = v; }, true), onChange: () => commit() })));
    }
    propsEl.append(section('ui.opacity', W.slider({ i18n: 'ui.opacity', min: 0, max: 100, value: Math.round((o.opacity != null ? o.opacity : 1) * 100), onInput: (v) => setOn((x) => { x.opacity = v / 100; }, true), onChange: () => commit() })));
    propsEl.append(section('m.alignPage', W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '2px' } },
      W.iconButton('align-right', 'm.al.r', () => alignPage('r')), W.iconButton('align-h-center', 'm.al.ch', () => alignPage('ch')), W.iconButton('align-left', 'm.al.l', () => alignPage('l')),
      W.iconButton('align-top', 'm.al.t', () => alignPage('t')), W.iconButton('align-v-center', 'm.al.cv', () => alignPage('cv')), W.iconButton('align-bottom', 'm.al.b', () => alignPage('b')))));
  }
  function syncProps() {
    const o = selEls()[0];
    if (!o) return;
    const set = (k, v) => { if (propInputs[k] && document.activeElement !== propInputs[k]) propInputs[k].value = W.round(v, 1); };
    set('x', o.x); set('y', o.y); set('w', o.w); set('h', o.h); set('rot', o.rot || 0);
  }

  /* ═══════════ المستند والملفات ═══════════ */
  function startDoc(d, meta) {
    doc = Object.assign({ w: 1080, h: 1080, size: 'post', dir: W.isRTL() ? 'rtl' : 'ltr', pages: [], assets: {} }, d);
    if (!doc.pages.length) doc.pages = [{ id: uid(), bg: { type: 'color', color: '#ffffff' }, els: [] }];
    pi = 0; sel = []; editing = null;
    hist.stack = []; hist.index = -1;
    meta = meta || {};
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: false });
    welcome.hide();
    document.body.classList.add('has-doc');
    render(); commit(); W.setDirty(false);
    renderSidePanel(); renderProps();
    requestAnimationFrame(fit);
  }
  async function newDesign() {
    if (!(await W.confirmDiscard())) return;
    const v = await W.form(W.t('m.newDesign'), [
      { key: 'p', i18n: 'm.newDesign', type: 'select', value: 'post', options: SIZES.map((s) => ({ value: s.id, label: W.L(s.name) + ' — ' + s.w + '×' + s.h })).concat([{ value: 'custom', label: W.t('m.custom') }]),
        onInput: (val, inp) => { const s = SIZES.find((x) => x.id === val); if (s) { inp.w.value = s.w; inp.h.value = s.h; } } },
      { key: 'w', i18n: 'ui.width', type: 'number', value: 1080, row: 'a' }, { key: 'h', i18n: 'ui.height', type: 'number', value: 1080, row: 'a' }
    ]);
    if (!v) return;
    const w = W.clamp(Math.round(v.w) || 1080, 16, 8000), h = W.clamp(Math.round(v.h) || 1080, 16, 8000);
    const sz = SIZES.find((s) => s.w === w && s.h === h);
    startDoc({ w, h, size: sz ? sz.id : 'custom' });
  }
  async function resizeDesign() {
    if (!doc) return;
    const v = await W.form(W.t('m.resize'), [
      { key: 'p', i18n: 'm.newDesign', type: 'select', value: doc.size, options: SIZES.map((s) => ({ value: s.id, label: W.L(s.name) + ' — ' + s.w + '×' + s.h })).concat([{ value: 'custom', label: W.t('m.custom') }]),
        onInput: (val, inp) => { const s = SIZES.find((x) => x.id === val); if (s) { inp.w.value = s.w; inp.h.value = s.h; } } },
      { key: 'w', i18n: 'ui.width', type: 'number', value: doc.w, row: 'a' }, { key: 'h', i18n: 'ui.height', type: 'number', value: doc.h, row: 'a' }
    ]);
    if (!v) return;
    const nw = W.clamp(Math.round(v.w) || doc.w, 16, 8000), nh = W.clamp(Math.round(v.h) || doc.h, 16, 8000);
    const s = Math.min(nw / doc.w, nh / doc.h), ox = (nw - doc.w * s) / 2, oy = (nh - doc.h * s) / 2;
    doc.pages.forEach((p) => p.els.forEach((o) => {
      o.x = ox + o.x * s; o.y = oy + o.y * s; o.w *= s; o.h *= s;
      if (o.size) o.size *= s; if (o.radius) o.radius *= s; if (o.strokeW) o.strokeW *= s; if (o.ls) o.ls *= s;
      if (o.outline) o.outline.w *= s; if (o.shadow) { o.shadow.x *= s; o.shadow.y *= s; o.shadow.blur *= s; }
      if (o.border) o.border.w *= s;
    }));
    const sz = SIZES.find((x) => x.w === nw && x.h === nh);
    Object.assign(doc, { w: nw, h: nh, size: sz ? sz.id : 'custom' });
    render(); commit(); fit(); renderProps();
  }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'تصميم ومضة', en: 'Wamda design' }, ext: ['wamda'] }], as: 'text' });
    if (f[0]) loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { loadFile(await W.files.readPath(p, 'text')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  function loadFile(f) {
    try {
      const text = typeof f.data === 'string' ? f.data : W.files.decodeText(new Uint8Array(f.data));
      const j = JSON.parse(text);
      if (!j.doc || !Array.isArray(j.doc.pages)) throw new Error('bad file');
      j.doc.pages.forEach((p) => p.els.forEach((o) => { if (o.type === 'text') o.html = cleanHTML(o.html || ''); }));
      startDoc(j.doc, { name: f.name, path: f.path });
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'));
  async function save(as) {
    if (!doc) return;
    if (editing) endEdit();
    // احذف الصور غير المستخدمة قبل الحفظ
    const used = new Set();
    doc.pages.forEach((p) => { if (p.bg.src) used.add(p.bg.src); p.els.forEach((o) => { if (o.src) used.add(o.src); }); });
    const assets = {};
    Object.keys(doc.assets).forEach((k) => { if (used.has(k)) assets[k] = doc.assets[k]; });
    const res = await W.files.save({ data: JSON.stringify({ app: 'wamda', version: 1, doc: Object.assign({}, doc, { assets }) }), name: baseName() + '.wamda', path: as ? null : (W.doc.path && W.doc.path.endsWith('.wamda') ? W.doc.path : null), types: [{ name: { ar: 'تصميم ومضة', en: 'Wamda design' }, ext: ['wamda'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }

  /* التصدير */
  async function pageCanvas(p, scale, bgFill) {
    await W.fontsReady();
    const fams = new Set(['IBM Plex Sans Arabic']);
    p.els.forEach((o) => { if (o.type === 'text') fams.add(o.font); });
    const css = await W.fontFaceCSS(fams);
    const node = pageNode(p, 'export');
    const xhtml = new XMLSerializer().serializeToString(node);
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + doc.w + '" height="' + doc.h + '" viewBox="0 0 ' + doc.w + ' ' + doc.h + '"><foreignObject x="0" y="0" width="' + doc.w + '" height="' + doc.h + '">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="width:' + doc.w + 'px;height:' + doc.h + 'px;margin:0"><style>' + css + '</style>' + xhtml + '</div></foreignObject></svg>';
    return W.rasterizeSVG(svg, doc.w, doc.h, scale, bgFill);
  }
  async function exportDesign(preset) {
    if (!doc) return;
    if (editing) endEdit();
    const v = preset || await W.form(W.t('m.export'), [
      { key: 'fmt', i18n: 'm.format', type: 'select', value: 'png', options: [{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }, { value: 'pdf', label: 'PDF' }] },
      { key: 'scale', i18n: 'm.scale', type: 'select', value: '1', options: [{ value: '0.5', label: '0.5×' }, { value: '1', label: '1×' }, { value: '2', label: '2×' }] },
      { key: 'pages', i18n: 'm.pages', type: 'select', value: doc.pages.length > 1 ? 'all' : 'current', options: [{ value: 'current', label: W.t('m.currentPage') }, { value: 'all', label: W.t('m.allPages') }] }
    ]);
    if (!v) return;
    const list = v.pages === 'all' ? doc.pages.map((p, i) => [p, i]) : [[page(), pi]];
    if (v.fmt === 'pdf') {
      const body = list.map(([p]) => '<div class="pg">' + pageNode(p, 'export').outerHTML + '</div>').join('');
      await W.exportPDF(W.printDocument(body, { pageSize: doc.w + 'px ' + doc.h + 'px', css: '.pg{width:' + doc.w + 'px;height:' + doc.h + 'px;overflow:hidden;page-break-after:always;break-after:page}.pg:last-child{page-break-after:auto;break-after:auto}' }), baseName());
      return;
    }
    const type = v.fmt === 'jpg' ? 'image/jpeg' : 'image/png';
    const out = await W.busy('ui.processing', async () => {
      const files = [];
      for (const [p, i] of list) {
        const c = await pageCanvas(p, parseFloat(v.scale) || 1, v.fmt === 'jpg' ? '#ffffff' : null);
        files.push({ name: baseName() + (list.length > 1 ? '-' + (i + 1) : '') + '.' + v.fmt, data: await W.canvasToBytes(c, type, 0.92) });
      }
      return files;
    });
    let res;
    if (out.length === 1) res = await W.files.save({ data: out[0].data, name: out[0].name, types: [{ name: { ar: 'صورة', en: 'Image' }, ext: [v.fmt] }] });
    else res = await W.files.saveMany(out);
    if (res) W.toast(W.t('ui.exported'), 'success');
  }

  /* ═══════════ القوائم والواجهة ═══════════ */
  const needDoc = () => !doc;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'm.newDesign', icon: 'file-plus', shortcut: 'Mod+N', action: newDesign },
      { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), disabled: needDoc, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), disabled: needDoc, global: true },
      { i18n: 'm.upload', icon: 'upload', action: () => uploadImages(true), disabled: needDoc },
      { i18n: 'm.export', icon: 'download', shortcut: 'Mod+E', action: () => exportDesign(), disabled: needDoc },
      { i18n: 'm.resize', icon: 'resize', action: resizeDesign, disabled: needDoc },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'cmd.cut', icon: 'cut', shortcut: 'Mod+X', action: () => { copy(); del(); } },
      { i18n: 'cmd.copy', icon: 'copy', shortcut: 'Mod+C', action: copy },
      { i18n: 'cmd.paste', icon: 'paste', shortcut: 'Mod+V', action: paste },
      { i18n: 'cmd.duplicate', icon: 'duplicate', shortcut: 'Mod+D', action: () => duplicate() },
      { i18n: 'cmd.delete', icon: 'trash', shortcut: 'Delete', action: del },
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => doc && select(page().els.filter((o) => !o.locked && !o.hidden).map((o) => o.id)) }
    ] },
    { i18n: 'menu.arrange', items: [
      { i18n: 'm.front', icon: 'bring-front', shortcut: 'Mod+Shift+]', action: () => zorder('front') },
      { i18n: 'm.forward', shortcut: 'Mod+]', action: () => zorder('forward') },
      { i18n: 'm.backward', shortcut: 'Mod+[', action: () => zorder('backward') },
      { i18n: 'm.back', icon: 'send-back', shortcut: 'Mod+Shift+[', action: () => zorder('back') },
      '-',
      { i18n: 'm.lock', icon: 'lock', shortcut: 'Mod+L', action: toggleLock },
      '-',
      { i18n: 'm.addPage', icon: 'plus', shortcut: 'Mod+Enter', action: addPage, disabled: needDoc },
      { i18n: 'm.dupPage', icon: 'duplicate', action: dupPage, disabled: needDoc },
      { i18n: 'm.delPage', icon: 'trash', action: delPage, disabled: () => !doc || doc.pages.length < 2 }
    ] },
    { i18n: 'menu.view', items: [
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => setZoom(V.z * 1.25) },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => setZoom(V.z / 1.25) },
      { i18n: 'cmd.fit', icon: 'fit', shortcut: 'Mod+0', action: fit },
      { i18n: 'cmd.actualSize', shortcut: 'Mod+1', action: () => setZoom(1) },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus, shortcuts: [['m.addHeading', 'T'], ['m.s.rect', 'R'], ['m.s.circle', 'C'], ['m.s.line', 'L']] });
  const status = chrome.status;
  W.keys.bind('t', () => doc && addText('heading'));
  W.keys.bind('r', () => doc && addShape('rect'));
  W.keys.bind('c', () => doc && addShape('circle'));
  W.keys.bind('l', () => doc && addShape('line'));
  W.keys.bind('Backspace', del);
  W.keys.bind('Escape', () => { if (editing) endEdit(); else select([]); });
  W.keys.bind('Enter', () => { const o = selEls()[0]; if (o && o.type === 'text' && sel.length === 1) startEdit(o); });
  W.keys.bind('PageDown', () => doc && goPage(pi + 1));
  W.keys.bind('PageUp', () => doc && goPage(pi - 1));
  const commitSoon = W.debounce(commit, 400);
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].forEach((k) => {
    const nudge = (st) => { const objs = selEls().filter((o) => !o.locked); if (!objs.length) return; objs.forEach((o) => { o.x += k === 'ArrowLeft' ? -st : k === 'ArrowRight' ? st : 0; o.y += k === 'ArrowUp' ? -st : k === 'ArrowDown' ? st : 0; refreshEl(o); }); drawOverlay(); syncProps(); commitSoon(); };
    W.keys.bind(k, () => nudge(1)); W.keys.bind('Shift+' + k, () => nudge(10));
  });

  const tb = $('#toolbar');
  const sizeBtn = W.h('button', { class: 'w-btn sm m-size', type: 'button', 'data-tip': 'm.resize' }, W.iconEl('resize'), W.h('span', { text: '' }));
  sizeBtn.addEventListener('click', resizeDesign);
  const exportBtn = W.h('button', { class: 'w-btn primary sm', type: 'button' }, W.iconEl('download'), W.h('span', { 'data-i18n': 'm.export', text: W.t('m.export') }));
  exportBtn.addEventListener('click', () => exportDesign());
  tb.append(
    W.iconButton('file-plus', 'm.newDesign', newDesign), W.iconButton('undo', 'cmd.undo', undo, { shortcut: 'Mod+Z' }), W.iconButton('redo', 'cmd.redo', redo, { shortcut: 'Mod+Y' }), W.h('div', { class: 'w-sep' }),
    sizeBtn, W.h('div', { class: 'w-sep' }),
    W.iconButton('zoom-out', 'cmd.zoomOut', () => doc && setZoom(V.z / 1.25)), W.iconButton('fit', 'cmd.fit', fit), W.iconButton('zoom-in', 'cmd.zoomIn', () => doc && setZoom(V.z * 1.25)),
    W.h('div', { class: 'w-spacer' }), exportBtn);

  // شاشة البداية: معرض القوالب
  const welcome = W.welcome(stage, {
    text: 'm.welcomeText',
    actions: [{ i18n: 'm.startBlank', icon: 'file-plus', primary: true, action: newDesign }, { i18n: 'cmd.open', icon: 'folder', action: open }],
    openRecent: openPath,
    extra: () => {
      const g = W.h('div', { class: 'm-wgrid' });
      TEMPLATES.forEach((t) => { const c = W.h('button', { class: 'm-tcard', type: 'button' }, tplThumb(t, 150), W.h('span', { text: W.L(t.name) })); c.addEventListener('click', () => startFromTemplate(t)); g.append(c); });
      return g;
    }
  });
  welcome.el.classList.add('m-welcome');

  // السحب والإفلات واللصق
  W.dropZone(stage, async (files) => {
    const proj = files.find((f) => f.ext === 'wamda');
    if (proj) { if (await W.confirmDiscard()) loadFile({ name: proj.name, path: proj.path, ext: 'wamda', data: proj.data }); return; }
    if (!doc) return;
    for (const f of files.filter((x) => /^(png|jpe?g|webp|gif|svg)$/.test(x.ext))) {
      const id = await storeImage('data:' + W.mime(f.ext) + ';base64,' + W.b64.encode(new Uint8Array(f.data)));
      await addImageAsset(id);
    }
  });
  document.addEventListener('paste', async (e) => {
    if (!doc || editing || e.target.closest('input,textarea')) return;
    const item = Array.from(e.clipboardData.items || []).find((i) => i.type.startsWith('image/'));
    if (!item) return;
    e.preventDefault();
    const blob = item.getAsFile();
    const url = await new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); });
    await addImageAsset(await storeImage(url));
  });
  W.onExternalFile((f) => loadFile(f), 'text');
  W.on('langchange', () => { renderRail(); renderSidePanel(); renderProps(); if (doc) { renderPages(); updateStatus(); } });
  new ResizeObserver(() => { if (doc) applyView(); }).observe(stage);
  W.fontsReady().then(() => { if (doc) { measure(); drawOverlay(); renderPages(); } });
  renderRail(); renderSidePanel();

  window.__wamda = {
    get doc() { return doc; }, get page() { return pi; }, get sel() { return sel; }, get editing() { return editing; },
    toScreen: (x, y) => { const r = stage.getBoundingClientRect(); return { x: r.left + V.px + x * V.z, y: r.top + V.py + y * V.z }; },
    startFromTemplate: (id) => startFromTemplate(TEMPLATES.find((t) => t.id === id)), pageCanvas: (scale) => pageCanvas(page(), scale || 1), exportDesign, storeImage, addImageAsset, cleanHTML
  };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      if (cleanHTML('<div>أ</div><div><b>ب</b></div>') !== 'أ<br><b>ب</b>') errors.push('cleanHTML ' + cleanHTML('<div>أ</div><div><b>ب</b></div>'));
      if (cleanHTML('<img src=x onerror=alert(1)>x') !== 'x') errors.push('sanitize');
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
