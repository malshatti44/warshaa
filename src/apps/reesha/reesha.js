/* ريشة Reesha — رسم متجهي */
(function () {
  'use strict';

  W.init({
    id: 'reesha',
    i18n: {
      ar: {
        'e.select': 'تحديد', 'e.node': 'تحرير النقاط', 'e.pen': 'قلم (منحنيات)', 'e.pencil': 'رسم حر', 'e.rect': 'مستطيل', 'e.ellipse': 'دائرة/بيضاوي',
        'e.polygon': 'مضلع', 'e.star': 'نجمة', 'e.line': 'خط', 'e.text': 'نص', 'e.hand': 'يد', 'e.artboard': 'لوحة الرسم', 'e.objects': 'العناصر',
        'e.fill': 'التعبئة', 'e.stroke': 'الحد', 'e.none': 'بدون', 'e.solid': 'لون', 'e.gradient': 'تدرج', 'e.angle': 'الزاوية', 'e.dash': 'متقطع',
        'e.sides': 'عدد الأضلاع', 'e.inner': 'نسبة الداخل', 'e.corner': 'استدارة الزوايا', 'e.group': 'تجميع', 'e.ungroup': 'فك التجميع',
        'e.alignL': 'محاذاة لليسار', 'e.alignR': 'محاذاة لليمين', 'e.alignCH': 'توسيط أفقي', 'e.alignT': 'محاذاة للأعلى', 'e.alignB': 'محاذاة للأسفل', 'e.alignCV': 'توسيط عمودي',
        'e.distH': 'توزيع أفقي', 'e.distV': 'توزيع عمودي', 'e.flipH': 'قلب أفقي', 'e.flipV': 'قلب عمودي', 'e.front': 'إلى الأمام', 'e.back': 'إلى الخلف',
        'e.forward': 'خطوة للأمام', 'e.backward': 'خطوة للخلف', 'e.newDoc': 'لوحة جديدة', 'e.importSvg': 'استيراد SVG…', 'e.placeImage': 'إضافة صورة…',
        'e.exportSvg': 'SVG…', 'e.exportPng': 'PNG…', 'e.exportPdf': 'PDF…', 'e.scale': 'مقياس التصدير', 'e.welcomeText': 'ارسم شعارات ورسومات متجهية بدقة لا نهائية، مع دعم كامل للخط العربي',
        'e.bg': 'خلفية اللوحة', 'e.transparent': 'شفافة', 'e.closePath': 'إغلاق المسار', 'e.convertPath': 'تحويل إلى مسار', 'e.textContent': 'النص',
        'e.weight': 'السماكة', 'e.letterSpacing': 'تباعد الأحرف', 'e.caps': 'نهاية الخط', 'e.round': 'دائرية', 'e.butt': 'مسطحة', 'e.square': 'مربعة',
        'e.preset': 'المقاس', 'e.snap': 'الالتصاق بالشبكة', 'e.grid': 'الشبكة', 'e.pathHint': 'انقر لإضافة نقاط، واسحب لإنشاء منحنى. Enter للإنهاء، انقر على النقطة الأولى للإغلاق.',
        'e.nodeHint': 'اسحب النقاط والمقابض. Delete لحذف نقطة، انقر نقر\u064Bا مزدوج\u064Bا على نقطة لتحويلها بين حادة وناعمة.', 'e.obj.rect': 'مستطيل', 'e.obj.ellipse': 'بيضاوي',
        'e.obj.polygon': 'مضلع', 'e.obj.star': 'نجمة', 'e.obj.path': 'مسار', 'e.obj.text': 'نص', 'e.obj.image': 'صورة', 'e.obj.group': 'مجموعة', 'e.obj.raw': 'عنصر SVG'
      },
      en: {
        'e.select': 'Select', 'e.node': 'Direct selection', 'e.pen': 'Pen (curves)', 'e.pencil': 'Pencil', 'e.rect': 'Rectangle', 'e.ellipse': 'Ellipse',
        'e.polygon': 'Polygon', 'e.star': 'Star', 'e.line': 'Line', 'e.text': 'Text', 'e.hand': 'Hand', 'e.artboard': 'Artboard', 'e.objects': 'Objects',
        'e.fill': 'Fill', 'e.stroke': 'Stroke', 'e.none': 'None', 'e.solid': 'Color', 'e.gradient': 'Gradient', 'e.angle': 'Angle', 'e.dash': 'Dashed',
        'e.sides': 'Sides', 'e.inner': 'Inner ratio', 'e.corner': 'Corner radius', 'e.group': 'Group', 'e.ungroup': 'Ungroup',
        'e.alignL': 'Align left', 'e.alignR': 'Align right', 'e.alignCH': 'Center horizontally', 'e.alignT': 'Align top', 'e.alignB': 'Align bottom', 'e.alignCV': 'Center vertically',
        'e.distH': 'Distribute horizontally', 'e.distV': 'Distribute vertically', 'e.flipH': 'Flip horizontal', 'e.flipV': 'Flip vertical', 'e.front': 'Bring to front', 'e.back': 'Send to back',
        'e.forward': 'Bring forward', 'e.backward': 'Send backward', 'e.newDoc': 'New artboard', 'e.importSvg': 'Import SVG…', 'e.placeImage': 'Place image…',
        'e.exportSvg': 'SVG…', 'e.exportPng': 'PNG…', 'e.exportPdf': 'PDF…', 'e.scale': 'Export scale', 'e.welcomeText': 'Draw logos and vector artwork with infinite precision and full Arabic typography',
        'e.bg': 'Artboard background', 'e.transparent': 'Transparent', 'e.closePath': 'Close path', 'e.convertPath': 'Convert to path', 'e.textContent': 'Text',
        'e.weight': 'Weight', 'e.letterSpacing': 'Letter spacing', 'e.caps': 'Line cap', 'e.round': 'Round', 'e.butt': 'Butt', 'e.square': 'Square',
        'e.preset': 'Size', 'e.snap': 'Snap to grid', 'e.grid': 'Grid', 'e.pathHint': 'Click to add points, drag to make curves. Enter to finish, click the first point to close.',
        'e.nodeHint': 'Drag points and handles. Delete removes a point; double-click a point to toggle smooth/corner.', 'e.obj.rect': 'Rectangle', 'e.obj.ellipse': 'Ellipse',
        'e.obj.polygon': 'Polygon', 'e.obj.star': 'Star', 'e.obj.path': 'Path', 'e.obj.text': 'Text', 'e.obj.image': 'Image', 'e.obj.group': 'Group', 'e.obj.raw': 'SVG element'
      }
    }
  });

  const SVGNS = 'http://www.w3.org/2000/svg';
  const uid = () => W.uid('v');
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let doc = null; // { w, h, bg, objects: [], assets: {} }
  let selection = [];
  let tool = 'select';
  const style = { fill: '#fd6101', stroke: 'none', strokeW: 2 };
  const ARABIC = /[؀-ۿ]/;

  const stage = document.getElementById('stage');
  const svg = document.getElementById('svg');
  const root = document.getElementById('root');
  const ui = document.getElementById('ui');
  const objectsEl = document.getElementById('objects');
  const propsEl = document.getElementById('props');
  const V = { z: 1, px: 0, py: 0 };
  const find = (id, list) => { for (const o of list || doc.objects) { if (o.id === id) return o; if (o.type === 'group') { const r = find(id, o.children); if (r) return r; } } return null; };

  /* ═══════════ الهندسة ═══════════ */
  function polyPoints(o) {
    const pts = [];
    const n = Math.max(3, o.sides || 5), cx = o.x + o.w / 2, cy = o.y + o.h / 2;
    const total = o.type === 'star' ? n * 2 : n;
    for (let i = 0; i < total; i++) {
      const a = -Math.PI / 2 + i * Math.PI * 2 / total;
      const r = o.type === 'star' && i % 2 ? (o.inner || 0.45) : 1;
      pts.push([cx + Math.cos(a) * r * o.w / 2, cy + Math.sin(a) * r * o.h / 2]);
    }
    return pts;
  }
  function pathD(o) {
    const n = o.nodes;
    if (!n || !n.length) return '';
    let d = 'M' + n[0].x + ' ' + n[0].y;
    const seg = (a, b) => {
      if (!a.cout && !b.cin) return ' L' + b.x + ' ' + b.y;
      const c1 = a.cout || a, c2 = b.cin || b;
      return ' C' + c1.x + ' ' + c1.y + ' ' + c2.x + ' ' + c2.y + ' ' + b.x + ' ' + b.y;
    };
    for (let i = 1; i < n.length; i++) d += seg(n[i - 1], n[i]);
    if (o.closed && n.length > 2) d += seg(n[n.length - 1], n[0]) + ' Z';
    return d;
  }
  function nodesBBox(nodes) {
    let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
    const add = (p) => { if (!p) return; x1 = Math.min(x1, p.x); y1 = Math.min(y1, p.y); x2 = Math.max(x2, p.x); y2 = Math.max(y2, p.y); };
    nodes.forEach((n) => { add(n); add(n.cin); add(n.cout); });
    return { x: x1, y: y1, w: Math.max(0.01, x2 - x1), h: Math.max(0.01, y2 - y1) };
  }
  /** الصندوق المحيط في الإحداثيات المحلية (قبل الدوران) */
  function bbox(o) {
    if (o.type === 'path') return nodesBBox(o.nodes);
    if (o.type === 'group') return unionBox(o.children.map(worldBox));
    if (o.type === 'text') {
      const el = root.querySelector('[data-id="' + o.id + '"]');
      if (el) { try { const b = el.getBBox(); if (b.width) return { x: b.x, y: b.y, w: b.width, h: b.height }; } catch (e) { /* تجاهل */ } }
      return { x: o.x, y: o.y - o.size, w: o.size * String(o.content).length * 0.6, h: o.size * 1.2 };
    }
    return { x: o.x, y: o.y, w: o.w, h: o.h };
  }
  function worldBox(o) {
    const b = bbox(o);
    if (!o.rot) return b;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2, a = o.rot * Math.PI / 180;
    const pts = [[b.x, b.y], [b.x + b.w, b.y], [b.x, b.y + b.h], [b.x + b.w, b.y + b.h]].map(([x, y]) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)]);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  }
  function unionBox(boxes) {
    if (!boxes.length) return { x: 0, y: 0, w: 0, h: 0 };
    const x1 = Math.min(...boxes.map((b) => b.x)), y1 = Math.min(...boxes.map((b) => b.y));
    const x2 = Math.max(...boxes.map((b) => b.x + b.w)), y2 = Math.max(...boxes.map((b) => b.y + b.h));
    return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
  }
  /** نقل عنصر */
  function translate(o, dx, dy) {
    if (o.type === 'path') o.nodes.forEach((n) => { n.x += dx; n.y += dy; if (n.cin) { n.cin.x += dx; n.cin.y += dy; } if (n.cout) { n.cout.x += dx; n.cout.y += dy; } });
    else if (o.type === 'group') o.children.forEach((c) => translate(c, dx, dy));
    else { o.x += dx; o.y += dy; }
  }
  /** تحجيم عنصر من صندوق قديم إلى جديد (في الإحداثيات المحلية) */
  function scaleTo(o, from, to) {
    const sx = to.w / (from.w || 1), sy = to.h / (from.h || 1);
    const mx = (x) => to.x + (x - from.x) * sx, my = (y) => to.y + (y - from.y) * sy;
    if (o.type === 'path') o.nodes.forEach((n) => { const f = (p) => { p.x = mx(p.x); p.y = my(p.y); }; f(n); if (n.cin) f(n.cin); if (n.cout) f(n.cout); });
    else if (o.type === 'group') o.children.forEach((c) => { const cb = bbox(c); scaleTo(c, cb, { x: mx(cb.x), y: my(cb.y), w: cb.w * sx, h: cb.h * sy }); });
    else if (o.type === 'text') { o.x = mx(o.x); o.y = my(o.y); o.size = Math.max(4, o.size * Math.sqrt(Math.abs(sx * sy))); }
    else { o.x = mx(o.x); o.y = my(o.y); o.w = Math.max(0.5, o.w * sx); o.h = Math.max(0.5, o.h * sy); if (sx < 0) { o.x += o.w * 0; } }
  }

  /* ═══════════ العرض ═══════════ */
  function fillAttr(f, defs) {
    if (!f || f === 'none') return 'none';
    if (typeof f === 'object' && f.type === 'linear') {
      const gid = 'g' + Math.random().toString(36).slice(2, 8);
      const a = (f.angle || 0) * Math.PI / 180;
      const x1 = 50 - Math.cos(a) * 50, y1 = 50 - Math.sin(a) * 50, x2 = 50 + Math.cos(a) * 50, y2 = 50 + Math.sin(a) * 50;
      defs.push('<linearGradient id="' + gid + '" x1="' + x1 + '%" y1="' + y1 + '%" x2="' + x2 + '%" y2="' + y2 + '%"><stop offset="0" stop-color="' + f.c1 + '"/><stop offset="1" stop-color="' + f.c2 + '"/></linearGradient>');
      return 'url(#' + gid + ')';
    }
    return f;
  }
  function objSVG(o, defs, forExport) {
    if (o.hidden) return '';
    const b = o.rot ? bbox(o) : null;
    const tr = o.rot ? ' transform="rotate(' + o.rot + ' ' + (b.x + b.w / 2) + ' ' + (b.y + b.h / 2) + ')"' : '';
    const common = (forExport ? '' : ' data-id="' + o.id + '"') + tr + (o.opacity != null && o.opacity < 1 ? ' opacity="' + o.opacity + '"' : '');
    const paint = () => ' fill="' + fillAttr(o.fill, defs) + '" stroke="' + fillAttr(o.stroke, defs) + '" stroke-width="' + (o.strokeW || 0) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.strokeW * 3 + ' ' + o.strokeW * 2 + '"' : '') + ' stroke-linecap="' + (o.cap || 'round') + '" stroke-linejoin="round"';
    switch (o.type) {
      case 'rect': return '<rect' + common + ' x="' + o.x + '" y="' + o.y + '" width="' + o.w + '" height="' + o.h + '"' + (o.rx ? ' rx="' + o.rx + '"' : '') + paint() + '/>';
      case 'ellipse': return '<ellipse' + common + ' cx="' + (o.x + o.w / 2) + '" cy="' + (o.y + o.h / 2) + '" rx="' + o.w / 2 + '" ry="' + o.h / 2 + '"' + paint() + '/>';
      case 'polygon': case 'star': return '<polygon' + common + ' points="' + polyPoints(o).map((p) => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ') + '"' + paint() + '/>';
      case 'path': return '<path' + common + ' d="' + pathD(o) + '"' + paint() + '/>';
      case 'text': {
        const rtl = o.dir ? o.dir === 'rtl' : ARABIC.test(o.content);
        const lines = String(o.content).split('\n');
        const anchor = { start: 'start', middle: 'middle', end: 'end' }[o.align || 'start'];
        return '<text' + common + ' x="' + o.x + '" y="' + o.y + '" font-family="' + W.escape(W.fontStack(o.font)) + '" font-size="' + o.size + '" font-weight="' + (o.weight || 400) + '" direction="' + (rtl ? 'rtl' : 'ltr') + '" text-anchor="' + anchor + '"' +
          (o.spacing ? ' letter-spacing="' + o.spacing + '"' : '') + paint() + ' style="white-space:pre">' + lines.map((l, i) => '<tspan x="' + o.x + '" dy="' + (i ? o.size * 1.25 : 0) + '">' + W.escape(l || ' ') + '</tspan>').join('') + '</text>';
      }
      case 'image': return '<image' + common + ' x="' + o.x + '" y="' + o.y + '" width="' + o.w + '" height="' + o.h + '" href="' + (doc.assets[o.src] || o.src) + '" preserveAspectRatio="none"/>';
      case 'group': return '<g' + common + '>' + o.children.map((c) => objSVG(c, defs, forExport)).join('') + '</g>';
      case 'raw': {
        const sx = o.w / (o.ow || 1), sy = o.h / (o.oh || 1);
        return '<g' + common + '><g transform="translate(' + o.x + ' ' + o.y + ') scale(' + sx + ' ' + sy + ') translate(' + (-o.ox) + ' ' + (-o.oy) + ')"' + (o.fill && o.fill !== 'keep' ? ' fill="' + fillAttr(o.fill, defs) + '"' : '') + '>' + o.markup + '</g></g>';
      }
    }
    return '';
  }
  function docSVG(forExport) {
    const defs = [];
    const body = doc.objects.map((o) => objSVG(o, defs, forExport)).join('');
    const bg = doc.bg && doc.bg !== 'transparent' ? '<rect x="0" y="0" width="' + doc.w + '" height="' + doc.h + '" fill="' + doc.bg + '"/>' : '';
    return { defs: defs.join(''), body: bg + body };
  }
  function exportSVGString() {
    const s = docSVG(true);
    return '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + doc.w + '" height="' + doc.h + '" viewBox="0 0 ' + doc.w + ' ' + doc.h + '">\n<!-- WARSHA Reesha — ' + W.escape(W.L(W.registry.developer.name)) + ' -->\n' + (s.defs ? '<defs>' + s.defs + '</defs>\n' : '') + s.body + '\n</svg>\n';
  }
  function render() {
    if (!doc) return;
    const s = docSVG(false);
    root.innerHTML = '<defs>' + s.defs + '</defs>' + (doc.bg && doc.bg !== 'transparent' ? '' : '') + s.body;
    document.getElementById('board').setAttribute('width', doc.w);
    document.getElementById('board').setAttribute('height', doc.h);
    document.getElementById('board').setAttribute('fill', doc.bg && doc.bg !== 'transparent' ? doc.bg : 'url(#checker)');
    applyView();
    renderUI();
  }
  function applyView() {
    const g = document.getElementById('viewport');
    g.setAttribute('transform', 'translate(' + V.px + ' ' + V.py + ') scale(' + V.z + ')');
    if (gridOn) drawGrid();
    renderUI();
    status.item('zoom').textContent = Math.round(V.z * 100) + '%';
  }
  function fit() {
    if (!doc) return;
    const r = stage.getBoundingClientRect();
    V.z = Math.min((r.width - 80) / doc.w, (r.height - 80) / doc.h);
    V.px = (r.width - doc.w * V.z) / 2; V.py = (r.height - doc.h * V.z) / 2;
    applyView();
  }
  function setZoom(z, sx, sy) {
    const r = stage.getBoundingClientRect();
    if (sx == null) { sx = r.width / 2; sy = r.height / 2; }
    z = W.clamp(z, 0.05, 64);
    const dx = (sx - V.px) / V.z, dy = (sy - V.py) / V.z;
    V.z = z; V.px = sx - dx * z; V.py = sy - dy * z;
    applyView();
  }
  const toDoc = (e) => { const r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left - V.px) / V.z, y: (e.clientY - r.top - V.py) / V.z }; };
  let gridOn = false, snapOn = false;
  const GRID = 20;
  function drawGrid() {
    const g = document.getElementById('grid');
    if (!gridOn) { g.innerHTML = ''; return; }
    let s = '';
    for (let x = 0; x <= doc.w; x += GRID) s += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + doc.h + '"/>';
    for (let y = 0; y <= doc.h; y += GRID) s += '<line x1="0" y1="' + y + '" x2="' + doc.w + '" y2="' + y + '"/>';
    g.innerHTML = s;
  }
  const snap = (v) => (snapOn ? Math.round(v / GRID) * GRID : v);

  /* واجهة التحديد (مقابض) */
  function renderUI() {
    if (!doc) { ui.innerHTML = ''; return; }
    const z = V.z;
    const hs = 8 / z, lw = 1 / z;
    let s = '';
    const objs = selection.map((id) => find(id)).filter(Boolean);
    if (tool === 'node' && objs.length === 1 && objs[0].type === 'path') {
      const o = objs[0];
      const b = bbox(o);
      const tr = o.rot ? ' transform="rotate(' + o.rot + ' ' + (b.x + b.w / 2) + ' ' + (b.y + b.h / 2) + ')"' : '';
      s += '<g' + tr + '><path d="' + pathD(o) + '" fill="none" stroke="#0ea5e9" stroke-width="' + lw + '"/>';
      o.nodes.forEach((n, i) => {
        [['cin', n.cin], ['cout', n.cout]].forEach(([k, c]) => { if (c) s += '<line x1="' + n.x + '" y1="' + n.y + '" x2="' + c.x + '" y2="' + c.y + '" stroke="#0ea5e9" stroke-width="' + lw + '"/><circle class="hd" data-node="' + i + '" data-h="' + k + '" cx="' + c.x + '" cy="' + c.y + '" r="' + hs / 2 + '" fill="#fff" stroke="#0ea5e9" stroke-width="' + lw + '"/>'; });
        s += '<rect class="hd" data-node="' + i + '" data-h="pt" x="' + (n.x - hs / 2) + '" y="' + (n.y - hs / 2) + '" width="' + hs + '" height="' + hs + '" fill="' + (nodeSel === i ? '#0ea5e9' : '#fff') + '" stroke="#0ea5e9" stroke-width="' + lw + '"/>';
      });
      s += '</g>';
    } else if (objs.length) {
      objs.forEach((o) => {
        const b = bbox(o);
        const tr = o.rot ? ' transform="rotate(' + o.rot + ' ' + (b.x + b.w / 2) + ' ' + (b.y + b.h / 2) + ')"' : '';
        s += '<rect' + tr + ' x="' + b.x + '" y="' + b.y + '" width="' + b.w + '" height="' + b.h + '" fill="none" stroke="#0ea5e9" stroke-width="' + lw + '"/>';
      });
      if (objs.length === 1) {
        const o = objs[0], b = bbox(o);
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
        const tr = o.rot ? ' transform="rotate(' + o.rot + ' ' + cx + ' ' + cy + ')"' : '';
        s += '<g' + tr + '>';
        [['nw', b.x, b.y], ['n', cx, b.y], ['ne', b.x + b.w, b.y], ['e', b.x + b.w, cy], ['se', b.x + b.w, b.y + b.h], ['s', cx, b.y + b.h], ['sw', b.x, b.y + b.h], ['w', b.x, cy]].forEach(([k, x, y]) => {
          s += '<rect class="hd" data-h="' + k + '" x="' + (x - hs / 2) + '" y="' + (y - hs / 2) + '" width="' + hs + '" height="' + hs + '" fill="#fff" stroke="#0ea5e9" stroke-width="' + lw + '" style="cursor:' + ({ n: 'ns', s: 'ns', e: 'ew', w: 'ew', nw: 'nwse', se: 'nwse', ne: 'nesw', sw: 'nesw' }[k]) + '-resize"/>';
        });
        s += '<line x1="' + cx + '" y1="' + b.y + '" x2="' + cx + '" y2="' + (b.y - 24 / z) + '" stroke="#0ea5e9" stroke-width="' + lw + '"/><circle class="hd" data-h="rot" cx="' + cx + '" cy="' + (b.y - 24 / z) + '" r="' + hs / 1.6 + '" fill="#fff" stroke="#0ea5e9" stroke-width="' + lw + '" style="cursor:grab"/></g>';
      } else {
        const u = unionBox(objs.map(worldBox));
        s += '<rect x="' + u.x + '" y="' + u.y + '" width="' + u.w + '" height="' + u.h + '" fill="none" stroke="#0ea5e9" stroke-dasharray="' + 4 / z + '" stroke-width="' + lw + '"/>';
      }
    }
    if (draft) s += draft(z);
    if (marquee) { const m = marquee; s += '<rect x="' + Math.min(m.x1, m.x2) + '" y="' + Math.min(m.y1, m.y2) + '" width="' + Math.abs(m.x2 - m.x1) + '" height="' + Math.abs(m.y2 - m.y1) + '" fill="rgba(14,165,233,.12)" stroke="#0ea5e9" stroke-width="' + lw + '"/>'; }
    ui.innerHTML = s;
  }

  /* ═══════════ السجل ═══════════ */
  const hist = { stack: [], index: -1 };
  function commit() {
    const s = JSON.stringify({ w: doc.w, h: doc.h, bg: doc.bg, objects: doc.objects });
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1); hist.stack.push(s);
    if (hist.stack.length > 150) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
  }
  function restore(s) { const j = JSON.parse(s); Object.assign(doc, j); selection = selection.filter((id) => find(id)); render(); renderObjects(); renderProps(); W.setDirty(true); }
  function undo() { if (pen) { finishPen(); return; } if (hist.index <= 0) return; hist.index--; restore(hist.stack[hist.index]); }
  function redo() { if (hist.index >= hist.stack.length - 1) return; hist.index++; restore(hist.stack[hist.index]); }
  function changed(full) { render(); if (full !== false) { renderObjects(); renderProps(); } }

  /* ═══════════ الأدوات ═══════════ */
  const TOOLS = [['select', 'pointer', 'V'], ['node', 'node', 'A'], null, ['pen', 'pen', 'P'], ['pencil', 'pencil', 'N'], ['line', 'line', '\\'], null,
    ['rect', 'rect', 'R'], ['ellipse', 'ellipse', 'E'], ['polygon', 'polygon', 'Y'], ['star', 'star5', 'S'], null, ['text', 'text', 'T'], null, ['hand', 'hand', 'H']];
  const toolsEl = document.getElementById('tools');
  function renderTools() {
    toolsEl.innerHTML = '';
    TOOLS.forEach((t) => {
      if (!t) { toolsEl.append(W.h('div', { class: 'w-sep' })); return; }
      toolsEl.append(W.iconButton(t[1], 'e.' + t[0], () => setTool(t[0]), { shortcut: t[2], cls: tool === t[0] ? 'active' : '' }));
    });
  }
  function setTool(t) {
    if (pen && t !== 'pen') finishPen();
    tool = t; nodeSel = -1;
    renderTools(); renderUI();
    svg.style.cursor = { hand: 'grab', text: 'text', select: 'default', node: 'default' }[t] || 'crosshair';
    hint.textContent = t === 'pen' ? W.t('e.pathHint') : t === 'node' ? W.t('e.nodeHint') : '';
  }
  const hint = document.getElementById('hint');

  let drag = null, draft = null, marquee = null, pen = null, nodeSel = -1, spaceDown = false;
  function newObj(type, extra) {
    return Object.assign({ id: uid(), type, name: W.t('e.obj.' + type), fill: style.fill, stroke: style.stroke, strokeW: style.strokeW, rot: 0, opacity: 1 }, extra);
  }
  function hitObject(e) {
    const el = e.target.closest('[data-id]');
    if (!el || !root.contains(el)) return null;
    // ارجع العنصر الأعلى (المجموعة الأم في المستوى الأول)
    let topEl = el;
    while (topEl.parentElement && topEl.parentElement !== root && topEl.parentElement.closest('[data-id]')) topEl = topEl.parentElement.closest('[data-id]');
    return find(topEl.dataset.id);
  }
  svg.addEventListener('pointerdown', (e) => {
    if (!doc) return;
    svg.setPointerCapture(e.pointerId);
    const p = toDoc(e);
    if (e.button === 1 || spaceDown || tool === 'hand') { drag = { mode: 'pan', sx: e.clientX, sy: e.clientY, px: V.px, py: V.py }; return; }
    if (e.button !== 0) return;
    const hd = e.target.closest('.hd');
    if (tool === 'node') {
      const o = find(selection[0]);
      if (hd && o) { const i = +hd.dataset.node; nodeSel = i; drag = { mode: 'node', o, i, h: hd.dataset.h, start: p, before: clone(o.nodes) }; renderUI(); return; }
      const hit = hitObject(e);
      if (hit && hit.type === 'path') { selection = [hit.id]; nodeSel = -1; renderUI(); renderObjects(); renderProps(); return; }
      if (hit) { selection = [hit.id]; renderUI(); return; }
      selection = []; renderUI(); renderProps(); return;
    }
    if (tool === 'select') {
      if (hd) {
        const o = find(selection[0]);
        drag = { mode: hd.dataset.h === 'rot' ? 'rotate' : 'resize', h: hd.dataset.h, o, start: p, box: bbox(o), orig: clone(o) };
        return;
      }
      const hit = hitObject(e);
      if (hit) {
        if (e.shiftKey) selection = selection.includes(hit.id) ? selection.filter((x) => x !== hit.id) : selection.concat(hit.id);
        else if (!selection.includes(hit.id)) selection = [hit.id];
        if (e.altKey) { duplicate(); }
        drag = { mode: 'move', start: p, last: p, moved: false };
        renderUI(); renderObjects(); renderProps();
        return;
      }
      if (!e.shiftKey) selection = [];
      marquee = { x1: p.x, y1: p.y, x2: p.x, y2: p.y };
      drag = { mode: 'marquee' };
      renderUI(); renderObjects(); renderProps();
      return;
    }
    if (tool === 'text') {
      const hit = hitObject(e);
      if (hit && hit.type === 'text') { selection = [hit.id]; editText(hit); return; }
      const o = newObj('text', { x: snap(p.x), y: snap(p.y), content: W.lang === 'ar' ? 'نص' : 'Text', font: 'Cairo', size: 72, weight: 700, align: 'start', stroke: 'none', fill: style.fill === 'none' ? '#111' : style.fill });
      doc.objects.push(o);
      selection = [o.id];
      changed();
      editText(o, true);
      return;
    }
    if (tool === 'pen') { penDown(p, e); return; }
    if (tool === 'pencil') { drag = { mode: 'pencil', pts: [p] }; return; }
    // أشكال
    drag = { mode: 'shape', start: { x: snap(p.x), y: snap(p.y) }, cur: p };
  });
  svg.addEventListener('pointermove', (e) => {
    if (!doc) return;
    const p = toDoc(e);
    status.item('pos').textContent = Math.round(p.x) + ', ' + Math.round(p.y);
    if (pen && !drag) { pen.hover = p; renderPenDraft(); }
    if (!drag) return;
    switch (drag.mode) {
      case 'pan': V.px = drag.px + e.clientX - drag.sx; V.py = drag.py + e.clientY - drag.sy; applyView(); break;
      case 'move': {
        let dx = p.x - drag.last.x, dy = p.y - drag.last.y;
        if (snapOn) { const tot = { x: snap(p.x - drag.start.x), y: snap(p.y - drag.start.y) }; const done = drag.done || { x: 0, y: 0 }; dx = tot.x - done.x; dy = tot.y - done.y; drag.done = tot; }
        selection.forEach((id) => { const o = find(id); if (o && !o.locked) translate(o, dx, dy); });
        drag.last = p; drag.moved = true;
        render(); syncProps();
        break;
      }
      case 'resize': {
        const o = drag.o, b0 = drag.box, h = drag.h;
        // تحويل الإزاحة إلى إطار العنصر المحلي
        const a = -(o.rot || 0) * Math.PI / 180;
        const rdx = p.x - drag.start.x, rdy = p.y - drag.start.y;
        const dx = rdx * Math.cos(a) - rdy * Math.sin(a), dy = rdx * Math.sin(a) + rdy * Math.cos(a);
        let x = b0.x, y = b0.y, w = b0.w, hh = b0.h;
        if (h.includes('e')) w = b0.w + dx;
        if (h.includes('w')) { w = b0.w - dx; x = b0.x + dx; }
        if (h.includes('s')) hh = b0.h + dy;
        if (h.includes('n')) { hh = b0.h - dy; y = b0.y + dy; }
        if ((e.shiftKey || o.type === 'text' || o.type === 'image') && h.length === 2) {
          const r = b0.w / b0.h;
          if (Math.abs(w / b0.w) > Math.abs(hh / b0.h)) { hh = w / r; if (h.includes('n')) y = b0.y + b0.h - hh; } else { w = hh * r; if (h.includes('w')) x = b0.x + b0.w - w; }
        }
        if (Math.abs(w) < 1 || Math.abs(hh) < 1) break;
        Object.assign(o, clone(drag.orig));
        const nb = { x: Math.min(x, x + w), y: Math.min(y, y + hh), w: Math.abs(w), h: Math.abs(hh) };
        scaleTo(o, bbox(o), nb);
        if (o.rot) {
          // ثبّت الركن المقابل في مكانه على الشاشة رغم تغي\u0651ر مركز الدوران
          const anchor = (bx) => ({ x: h.includes('e') ? bx.x : h.includes('w') ? bx.x + bx.w : bx.x + bx.w / 2, y: h.includes('s') ? bx.y : h.includes('n') ? bx.y + bx.h : bx.y + bx.h / 2 });
          const world = (pt, bx) => { const cx = bx.x + bx.w / 2, cy = bx.y + bx.h / 2, r = o.rot * Math.PI / 180; return { x: cx + (pt.x - cx) * Math.cos(r) - (pt.y - cy) * Math.sin(r), y: cy + (pt.x - cx) * Math.sin(r) + (pt.y - cy) * Math.cos(r) }; };
          const nb2 = bbox(o);
          const a0 = world(anchor(b0), b0), a1 = world(anchor(nb2), nb2);
          translate(o, a0.x - a1.x, a0.y - a1.y);
        }
        render(); syncProps();
        break;
      }
      case 'rotate': {
        const o = drag.o, b = drag.box;
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
        let a = Math.atan2(p.y - cy, p.x - cx) * 180 / Math.PI + 90;
        if (e.shiftKey) a = Math.round(a / 15) * 15;
        o.rot = Math.round(((a % 360) + 360) % 360 * 10) / 10;
        render(); syncProps();
        break;
      }
      case 'marquee': marquee.x2 = p.x; marquee.y2 = p.y; renderUI(); break;
      case 'shape': {
        drag.cur = { x: snap(p.x), y: snap(p.y) };
        const s = drag.start, c = drag.cur;
        let x = Math.min(s.x, c.x), y = Math.min(s.y, c.y), w = Math.abs(c.x - s.x), h = Math.abs(c.y - s.y);
        if (e.shiftKey && tool !== 'line') { const m = Math.max(w, h); w = h = m; x = c.x < s.x ? s.x - m : s.x; y = c.y < s.y ? s.y - m : s.y; }
        if (e.altKey && tool !== 'line') { x = s.x - w; y = s.y - h; w *= 2; h *= 2; }
        drag.box = { x, y, w, h };
        draft = () => {
          if (tool === 'line') return '<line x1="' + s.x + '" y1="' + s.y + '" x2="' + c.x + '" y2="' + c.y + '" stroke="' + (style.stroke !== 'none' ? style.stroke : style.fill) + '" stroke-width="' + Math.max(1, style.strokeW) + '"/>';
          const tmp = newObj(tool, { x, y, w, h, sides: tool === 'star' ? 5 : 6, inner: 0.45 });
          return objSVG(tmp, [], true);
        };
        renderUI();
        break;
      }
      case 'pencil': drag.pts.push(p); draft = () => '<polyline points="' + drag.pts.map((q) => q.x + ',' + q.y).join(' ') + '" fill="none" stroke="' + (style.stroke !== 'none' ? style.stroke : style.fill) + '" stroke-width="' + Math.max(1, style.strokeW) + '" stroke-linecap="round" stroke-linejoin="round"/>'; renderUI(); break;
      case 'node': {
        const o = drag.o, n = o.nodes[drag.i];
        const a = -(o.rot || 0) * Math.PI / 180;
        const rdx = p.x - drag.start.x, rdy = p.y - drag.start.y;
        const dx = rdx * Math.cos(a) - rdy * Math.sin(a), dy = rdx * Math.sin(a) + rdy * Math.cos(a);
        const b = drag.before[drag.i];
        if (drag.h === 'pt') {
          n.x = b.x + dx; n.y = b.y + dy;
          if (b.cin) n.cin = { x: b.cin.x + dx, y: b.cin.y + dy };
          if (b.cout) n.cout = { x: b.cout.x + dx, y: b.cout.y + dy };
        } else {
          const k = drag.h, other = k === 'cin' ? 'cout' : 'cin';
          n[k] = { x: b[k].x + dx, y: b[k].y + dy };
          if (b[other] && !e.altKey && n.smooth !== false) {
            const len = Math.hypot(b[other].x - n.x, b[other].y - n.y);
            const ang = Math.atan2(n[k].y - n.y, n[k].x - n.x) + Math.PI;
            n[other] = { x: n.x + Math.cos(ang) * len, y: n.y + Math.sin(ang) * len };
          }
        }
        render();
        break;
      }
      case 'pen': {
        const node = pen.nodes[pen.nodes.length - 1];
        node.cout = { x: p.x, y: p.y };
        node.cin = { x: 2 * node.x - p.x, y: 2 * node.y - p.y };
        renderPenDraft();
        break;
      }
    }
  });
  svg.addEventListener('pointerup', () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    switch (d.mode) {
      case 'move': if (d.moved) { commit(); renderProps(); } break;
      case 'resize': case 'rotate': commit(); renderProps(); break;
      case 'node': commit(); break;
      case 'marquee': {
        const m = marquee; marquee = null;
        const box = { x: Math.min(m.x1, m.x2), y: Math.min(m.y1, m.y2), w: Math.abs(m.x2 - m.x1), h: Math.abs(m.y2 - m.y1) };
        if (box.w > 2 || box.h > 2) {
          const ids = doc.objects.filter((o) => !o.hidden && !o.locked).filter((o) => { const b = worldBox(o); return b.x >= box.x && b.y >= box.y && b.x + b.w <= box.x + box.w && b.y + b.h <= box.y + box.h; }).map((o) => o.id);
          selection = Array.from(new Set(selection.concat(ids)));
        }
        renderUI(); renderObjects(); renderProps();
        break;
      }
      case 'shape': {
        draft = null;
        const b = d.box;
        if (!b || (b.w < 2 && b.h < 2)) { renderUI(); break; }
        let o;
        if (tool === 'line') o = newObj('path', { fill: 'none', stroke: style.stroke !== 'none' ? style.stroke : style.fill, strokeW: Math.max(1, style.strokeW), nodes: [{ x: d.start.x, y: d.start.y }, { x: d.cur.x, y: d.cur.y }], closed: false, name: W.t('e.line') });
        else o = newObj(tool, Object.assign({ x: b.x, y: b.y, w: b.w, h: b.h }, tool === 'polygon' ? { sides: 6 } : tool === 'star' ? { sides: 5, inner: 0.45 } : {}));
        doc.objects.push(o);
        selection = [o.id];
        commit(); changed();
        setTool('select');
        break;
      }
      case 'pencil': {
        draft = null;
        if (d.pts.length < 2) { renderUI(); break; }
        const pts = simplify(d.pts, 1.5 / V.z);
        const o = newObj('path', { fill: 'none', stroke: style.stroke !== 'none' ? style.stroke : style.fill, strokeW: Math.max(1, style.strokeW), nodes: smoothNodes(pts), closed: false, name: W.t('e.pencil') });
        doc.objects.push(o);
        selection = [o.id];
        commit(); changed();
        break;
      }
      case 'pen': renderPenDraft(); break;
    }
  });
  svg.addEventListener('dblclick', (e) => {
    const hit = hitObject(e);
    if (tool === 'node') {
      const hd = e.target.closest('.hd');
      const o = find(selection[0]);
      if (hd && o && hd.dataset.h === 'pt') {
        const n = o.nodes[+hd.dataset.node];
        if (n.cin || n.cout) { delete n.cin; delete n.cout; }
        else {
          const prev = o.nodes[(+hd.dataset.node - 1 + o.nodes.length) % o.nodes.length], next = o.nodes[(+hd.dataset.node + 1) % o.nodes.length];
          const vx = (next.x - prev.x) / 4, vy = (next.y - prev.y) / 4;
          n.cin = { x: n.x - vx, y: n.y - vy }; n.cout = { x: n.x + vx, y: n.y + vy };
        }
        commit(); render();
      }
      return;
    }
    if (hit && hit.type === 'text') editText(hit);
    else if (hit && hit.type === 'group') { selection = [hit.children[0].id]; renderUI(); }
    else if (hit && hit.type === 'path') setTool('node');
  });
  stage.addEventListener('wheel', (e) => {
    if (!doc) return;
    e.preventDefault();
    const r = svg.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) setZoom(V.z * (e.deltaY < 0 ? 1.12 : 1 / 1.12), e.clientX - r.left, e.clientY - r.top);
    else { V.px -= e.shiftKey ? e.deltaY : e.deltaX; V.py -= e.shiftKey ? 0 : e.deltaY; applyView(); }
  }, { passive: false });
  svg.addEventListener('contextmenu', (e) => {
    const hit = hitObject(e);
    if (hit && !selection.includes(hit.id)) { selection = [hit.id]; renderUI(); renderProps(); }
    if (selection.length) W.contextMenu(e, objMenu());
  });
  window.addEventListener('keydown', (e) => { if (e.code === 'Space' && !e.target.closest('input,textarea')) { spaceDown = true; svg.style.cursor = 'grab'; } });
  window.addEventListener('keyup', (e) => { if (e.code === 'Space') { spaceDown = false; setTool(tool); } });

  /* القلم */
  function penDown(p, e) {
    p = { x: snap(p.x), y: snap(p.y) };
    if (!pen) pen = { nodes: [] };
    const first = pen.nodes[0];
    if (first && pen.nodes.length > 2 && Math.hypot(p.x - first.x, p.y - first.y) < 8 / V.z) { finishPen(true); return; }
    pen.nodes.push({ x: p.x, y: p.y });
    drag = { mode: 'pen' };
    renderPenDraft();
  }
  function renderPenDraft() {
    if (!pen) { draft = null; renderUI(); return; }
    draft = (z) => {
      const tmp = { nodes: pen.nodes, closed: false };
      let s = '<path d="' + pathD(tmp) + '" fill="none" stroke="#0ea5e9" stroke-width="' + 1.5 / z + '"/>';
      const last = pen.nodes[pen.nodes.length - 1];
      if (pen.hover && last) {
        const c1 = last.cout || last;
        s += '<path d="M' + last.x + ' ' + last.y + ' Q' + c1.x + ' ' + c1.y + ' ' + pen.hover.x + ' ' + pen.hover.y + '" fill="none" stroke="#0ea5e9" stroke-dasharray="' + 4 / z + '" stroke-width="' + 1 / z + '"/>';
      }
      pen.nodes.forEach((n, i) => { s += '<rect x="' + (n.x - 4 / z) + '" y="' + (n.y - 4 / z) + '" width="' + 8 / z + '" height="' + 8 / z + '" fill="' + (i === 0 ? '#0ea5e9' : '#fff') + '" stroke="#0ea5e9" stroke-width="' + 1 / z + '"/>'; if (n.cout) s += '<line x1="' + n.x + '" y1="' + n.y + '" x2="' + n.cout.x + '" y2="' + n.cout.y + '" stroke="#0ea5e9" stroke-width="' + 1 / z + '"/>'; });
      return s;
    };
    renderUI();
  }
  function finishPen(close) {
    if (!pen) return;
    const nodes = pen.nodes;
    pen = null; draft = null;
    if (nodes.length >= 2) {
      const o = newObj('path', { nodes, closed: !!close, fill: close ? style.fill : 'none', stroke: close ? style.stroke : (style.stroke !== 'none' ? style.stroke : '#111111'), strokeW: close ? style.strokeW : Math.max(2, style.strokeW) });
      doc.objects.push(o);
      selection = [o.id];
      commit(); changed();
    } else renderUI();
  }
  /* تبسيط وتنعيم المسارات الحرة */
  function simplify(pts, tol) {
    if (pts.length < 3) return pts;
    const sq = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    const segDist = (p, a, b) => { const l = sq(a, b); if (!l) return sq(p, a); let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l; t = Math.max(0, Math.min(1, t)); return sq(p, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }); };
    const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
    const stack = [[0, pts.length - 1]];
    while (stack.length) {
      const [a, b] = stack.pop();
      let max = 0, idx = -1;
      for (let i = a + 1; i < b; i++) { const d = segDist(pts[i], pts[a], pts[b]); if (d > max) { max = d; idx = i; } }
      if (max > tol * tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
    }
    return pts.filter((p, i) => keep[i]);
  }
  function smoothNodes(pts) {
    return pts.map((p, i) => {
      const n = { x: p.x, y: p.y };
      if (i > 0 && i < pts.length - 1) {
        const a = pts[i - 1], b = pts[i + 1];
        const vx = (b.x - a.x) / 6, vy = (b.y - a.y) / 6;
        n.cin = { x: p.x - vx, y: p.y - vy }; n.cout = { x: p.x + vx, y: p.y + vy };
      }
      return n;
    });
  }

  /* النص */
  async function editText(o, isNew) {
    const orig = clone(o);
    const area = W.h('textarea', { class: 'w-textarea', rows: 3, dir: 'auto', style: { width: '100%', fontSize: '18px', fontFamily: W.fontStack(o.font) } });
    area.value = o.content;
    area.addEventListener('input', () => { o.content = area.value || ' '; render(); });
    const font = W.fontSelect(o.font, async (f) => { o.font = f; area.style.fontFamily = W.fontStack(f); await W.ensureFont(f, o.weight); render(); });
    const size = W.h('input', { class: 'w-input', type: 'number', value: o.size, min: 4, max: 2000 });
    size.addEventListener('input', () => { o.size = parseFloat(size.value) || 12; render(); });
    const weight = W.h('select', { class: 'w-select' });
    [[400, W.t('ui.none')], [700, W.t('ui.bold')]].forEach(([v, l]) => weight.append(W.h('option', { value: v, text: v === 400 ? (W.lang === 'ar' ? 'عادي' : 'Regular') : l })));
    weight.value = o.weight || 400;
    weight.addEventListener('change', async () => { o.weight = +weight.value; await W.ensureFont(o.font, o.weight); render(); });
    const body = W.h('div', { class: 'col', style: { minWidth: '380px' } }, W.h('label', { class: 'w-label-sm', text: W.t('e.textContent') }), area,
      W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.font') }), font), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.fontSize') }), size), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('e.weight') }), weight)));
    const ok = await W.dialog({ title: W.t('e.text'), body, buttons: [{ i18n: 'ui.cancel', value: false }, { i18n: 'ui.ok', value: true, primary: true }] });
    if (!ok) {
      if (isNew) { doc.objects = doc.objects.filter((x) => x.id !== o.id); selection = []; }
      else Object.assign(o, orig);
      changed();
      return;
    }
    o.name = String(o.content).split('\n')[0].slice(0, 24);
    commit(); changed();
    setTool('select');
  }

  /* ═══════════ عمليات العناصر ═══════════ */
  let clipboard = null;
  const selObjs = () => selection.map((id) => find(id)).filter(Boolean);
  function reid(o) { o.id = uid(); if (o.children) o.children.forEach(reid); return o; }
  function copy() { clipboard = selObjs().map(clone); }
  function paste() {
    if (!clipboard) return;
    const items = clipboard.map((o) => { const c = reid(clone(o)); translate(c, 20, 20); return c; });
    doc.objects.push(...items);
    clipboard = items.map(clone);
    selection = items.map((o) => o.id);
    commit(); changed();
  }
  function duplicate() { const items = selObjs().map((o) => reid(clone(o))); doc.objects.push(...items); selection = items.map((o) => o.id); commit(); changed(); }
  function del() {
    const ids = new Set(selection);
    const strip = (list) => list.filter((o) => !ids.has(o.id)).map((o) => (o.children ? Object.assign(o, { children: strip(o.children) }) : o));
    doc.objects = strip(doc.objects);
    selection = [];
    commit(); changed();
  }
  function zorder(kind) {
    const ids = new Set(selection);
    const sel = doc.objects.filter((o) => ids.has(o.id)), rest = doc.objects.filter((o) => !ids.has(o.id));
    if (kind === 'front') doc.objects = rest.concat(sel);
    else if (kind === 'back') doc.objects = sel.concat(rest);
    else {
      const arr = doc.objects.slice();
      const order = kind === 'forward' ? arr.map((_, i) => arr.length - 1 - i) : arr.map((_, i) => i);
      order.forEach((i) => {
        if (!ids.has(arr[i].id)) return;
        const j = kind === 'forward' ? i + 1 : i - 1;
        if (j < 0 || j >= arr.length || ids.has(arr[j].id)) return;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      });
      doc.objects = arr;
    }
    commit(); changed();
  }
  function group() {
    const objs = selObjs().filter((o) => doc.objects.includes(o));
    if (objs.length < 2) return;
    const idx = Math.max(...objs.map((o) => doc.objects.indexOf(o)));
    const g = newObj('group', { children: objs, fill: 'none', stroke: 'none' });
    const rest = doc.objects.filter((o) => !objs.includes(o));
    rest.splice(idx - objs.length + 1, 0, g);
    doc.objects = rest;
    selection = [g.id];
    commit(); changed();
  }
  function ungroup() {
    const out = [];
    let newSel = [];
    doc.objects.forEach((o) => {
      if (o.type === 'group' && selection.includes(o.id)) { o.children.forEach((c) => { if (o.rot) c.rot = (c.rot || 0) + o.rot; }); out.push(...o.children); newSel = newSel.concat(o.children.map((c) => c.id)); }
      else out.push(o);
    });
    doc.objects = out;
    selection = newSel.length ? newSel : selection;
    commit(); changed();
  }
  function align(kind) {
    const objs = selObjs();
    if (!objs.length) return;
    const ref = objs.length === 1 ? { x: 0, y: 0, w: doc.w, h: doc.h } : unionBox(objs.map(worldBox));
    objs.forEach((o) => {
      const b = worldBox(o);
      let dx = 0, dy = 0;
      if (kind === 'l') dx = ref.x - b.x; if (kind === 'r') dx = ref.x + ref.w - b.x - b.w; if (kind === 'ch') dx = ref.x + ref.w / 2 - b.x - b.w / 2;
      if (kind === 't') dy = ref.y - b.y; if (kind === 'b') dy = ref.y + ref.h - b.y - b.h; if (kind === 'cv') dy = ref.y + ref.h / 2 - b.y - b.h / 2;
      translate(o, dx, dy);
    });
    commit(); changed();
  }
  function distribute(axis) {
    const objs = selObjs();
    if (objs.length < 3) return;
    const boxes = objs.map((o) => ({ o, b: worldBox(o) })).sort((a, b) => (axis === 'h' ? a.b.x - b.b.x : a.b.y - b.b.y));
    const first = boxes[0].b, last = boxes[boxes.length - 1].b;
    const total = axis === 'h' ? last.x + last.w - first.x : last.y + last.h - first.y;
    const sizes = boxes.reduce((s, x) => s + (axis === 'h' ? x.b.w : x.b.h), 0);
    const gap = (total - sizes) / (boxes.length - 1);
    let pos = axis === 'h' ? first.x : first.y;
    boxes.forEach(({ o, b }) => { const d = pos - (axis === 'h' ? b.x : b.y); translate(o, axis === 'h' ? d : 0, axis === 'h' ? 0 : d); pos += (axis === 'h' ? b.w : b.h) + gap; });
    commit(); changed();
  }
  function flip(h) {
    selObjs().forEach((o) => {
      const b = bbox(o);
      if (o.type === 'path') o.nodes.forEach((n) => { const f = (p) => { if (h) p.x = 2 * b.x + b.w - p.x; else p.y = 2 * b.y + b.h - p.y; }; f(n); if (n.cin) f(n.cin); if (n.cout) f(n.cout); });
      else if (o.type === 'group') { o.children.forEach((c) => { const cb = worldBox(c); const nx = h ? 2 * b.x + b.w - cb.x - cb.w : cb.x, ny = h ? cb.y : 2 * b.y + b.h - cb.y - cb.h; translate(c, nx - cb.x, ny - cb.y); }); }
      if (o.rot) o.rot = (360 - o.rot) % 360;
    });
    commit(); changed();
  }
  function toPath() {
    selObjs().forEach((o) => {
      if (o.type === 'rect' || o.type === 'polygon' || o.type === 'star') {
        const pts = o.type === 'rect' ? [[o.x, o.y], [o.x + o.w, o.y], [o.x + o.w, o.y + o.h], [o.x, o.y + o.h]] : polyPoints(o);
        Object.assign(o, { type: 'path', nodes: pts.map(([x, y]) => ({ x, y })), closed: true });
      } else if (o.type === 'ellipse') {
        const k = 0.5523, cx = o.x + o.w / 2, cy = o.y + o.h / 2, rx = o.w / 2, ry = o.h / 2;
        Object.assign(o, { type: 'path', closed: true, nodes: [
          { x: cx, y: cy - ry, cin: { x: cx - rx * k, y: cy - ry }, cout: { x: cx + rx * k, y: cy - ry } },
          { x: cx + rx, y: cy, cin: { x: cx + rx, y: cy - ry * k }, cout: { x: cx + rx, y: cy + ry * k } },
          { x: cx, y: cy + ry, cin: { x: cx + rx * k, y: cy + ry }, cout: { x: cx - rx * k, y: cy + ry } },
          { x: cx - rx, y: cy, cin: { x: cx - rx, y: cy + ry * k }, cout: { x: cx - rx, y: cy - ry * k } }] });
      }
    });
    commit(); changed();
  }
  const objMenu = () => [
    { i18n: 'cmd.cut', icon: 'cut', action: () => { copy(); del(); } },
    { i18n: 'cmd.copy', icon: 'copy', action: copy },
    { i18n: 'cmd.paste', icon: 'paste', action: paste },
    { i18n: 'cmd.duplicate', icon: 'duplicate', action: duplicate },
    { i18n: 'cmd.delete', icon: 'trash', action: del },
    '-',
    { i18n: 'e.group', icon: 'group', action: group, disabled: () => selection.length < 2 },
    { i18n: 'e.ungroup', action: ungroup, disabled: () => !selObjs().some((o) => o.type === 'group') },
    { i18n: 'e.convertPath', icon: 'bezier', action: toPath },
    '-',
    { i18n: 'e.front', icon: 'bring-front', action: () => zorder('front') },
    { i18n: 'e.forward', action: () => zorder('forward') },
    { i18n: 'e.backward', action: () => zorder('backward') },
    { i18n: 'e.back', icon: 'send-back', action: () => zorder('back') },
    '-',
    { i18n: 'e.flipH', icon: 'flip-h', action: () => flip(true) },
    { i18n: 'e.flipV', icon: 'flip-v', action: () => flip(false) }
  ];

  /* ═══════════ قائمة العناصر ═══════════ */
  function renderObjects() {
    objectsEl.innerHTML = '';
    if (!doc) return;
    const row = (o, depth) => {
      const r = W.h('div', { class: 'w-list-item' + (selection.includes(o.id) ? ' selected' : ''), style: { paddingInlineStart: (8 + depth * 14) + 'px' } },
        W.iconButton(o.hidden ? 'eye-off' : 'eye', 'ui.visible', (e) => { e.stopPropagation(); o.hidden = !o.hidden; commit(); changed(); }, { cls: 'sm' }),
        W.h('span', { class: 'e-sw', style: { background: typeof o.fill === 'string' && o.fill !== 'none' ? o.fill : (o.fill && o.fill.c1) || 'transparent', borderColor: o.stroke && o.stroke !== 'none' ? o.stroke : 'var(--border-2)' } }),
        W.h('span', { class: 'w-name', text: o.name || W.t('e.obj.' + o.type) }),
        W.iconButton(o.locked ? 'lock' : 'unlock', 'ui.lock', (e) => { e.stopPropagation(); o.locked = !o.locked; renderObjects(); }, { cls: 'sm' + (o.locked ? '' : ' faint') }));
      r.addEventListener('click', (e) => { if (e.shiftKey) selection = selection.includes(o.id) ? selection.filter((x) => x !== o.id) : selection.concat(o.id); else selection = [o.id]; renderUI(); renderObjects(); renderProps(); });
      r.addEventListener('dblclick', async () => { const v = await W.prompt(W.t('ui.name'), o.name || '', { title: W.t('ui.rename') }); if (v != null) { o.name = v; commit(); renderObjects(); } });
      r.addEventListener('contextmenu', (e) => { if (!selection.includes(o.id)) { selection = [o.id]; renderUI(); renderObjects(); renderProps(); } W.contextMenu(e, objMenu()); });
      objectsEl.append(r);
      if (o.type === 'group') [...o.children].reverse().forEach((c) => row(c, depth + 1));
    };
    [...doc.objects].reverse().forEach((o) => row(o, 0));
  }

  /* ═══════════ الخصائص ═══════════ */
  let propInputs = {};
  function paintEditor(label, value, onChange) {
    const kind = !value || value === 'none' ? 'none' : typeof value === 'object' ? 'gradient' : 'solid';
    const box = W.h('div', { class: 'e-paint' });
    const seg = W.segmented([{ value: 'none', i18n: 'e.none' }, { value: 'solid', i18n: 'e.solid' }, { value: 'gradient', i18n: 'e.gradient' }], kind, (k) => {
      if (k === 'none') onChange('none');
      else if (k === 'solid') onChange(typeof value === 'object' ? value.c1 : (value && value !== 'none' ? value : '#fd6101'));
      else onChange({ type: 'linear', c1: typeof value === 'string' && value !== 'none' ? value : '#fd6101', c2: '#790ce2', angle: 0 });
    });
    box.append(W.h('div', { class: 'row', style: { justifyContent: 'space-between' } }, W.h('span', { class: 'w-label-sm', text: label }), seg));
    if (kind === 'solid') {
      const c = W.h('input', { type: 'color', class: 'w-color', value: value });
      c.addEventListener('input', () => onChange(c.value, true));
      c.addEventListener('change', () => onChange(c.value));
      box.append(W.h('div', { class: 'row', style: { marginTop: '6px' } }, c, W.swatches((col) => onChange(col), ['#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#fd6101', '#7c2d12'])));
    } else if (kind === 'gradient') {
      const c1 = W.h('input', { type: 'color', class: 'w-color', value: value.c1 });
      const c2 = W.h('input', { type: 'color', class: 'w-color', value: value.c2 });
      const ang = W.h('input', { class: 'w-input sm', type: 'number', value: value.angle || 0, min: -360, max: 360, style: { width: '70px' } });
      const upd = (live) => onChange({ type: 'linear', c1: c1.value, c2: c2.value, angle: parseFloat(ang.value) || 0 }, live);
      c1.addEventListener('input', () => upd(true)); c2.addEventListener('input', () => upd(true)); ang.addEventListener('change', () => upd());
      c1.addEventListener('change', () => upd()); c2.addEventListener('change', () => upd());
      box.append(W.h('div', { class: 'row', style: { marginTop: '6px' } }, c1, c2, W.h('span', { class: 'small muted', text: W.t('e.angle') }), ang));
    }
    return box;
  }
  function section(titleKey, ...children) {
    return W.h('div', { class: 'w-panel' }, W.h('div', { class: 'w-panel-title', text: W.t(titleKey) }), W.h('div', { class: 'w-panel-body' }, ...children));
  }
  function setOn(objs, fn, live) { objs.forEach(fn); render(); if (!live) { commit(); renderObjects(); } }
  function renderProps() {
    propsEl.innerHTML = '';
    propInputs = {};
    if (!doc) return;
    const objs = selObjs();
    if (!objs.length) {
      // خصائص اللوحة والنمط الافتراضي
      const w = W.h('input', { class: 'w-input sm', type: 'number', value: doc.w, min: 1, max: 20000 });
      const h = W.h('input', { class: 'w-input sm', type: 'number', value: doc.h, min: 1, max: 20000 });
      const apply = () => { doc.w = parseFloat(w.value) || doc.w; doc.h = parseFloat(h.value) || doc.h; commit(); render(); fit(); };
      w.addEventListener('change', apply); h.addEventListener('change', apply);
      const bg = W.h('input', { type: 'color', class: 'w-color', value: doc.bg && doc.bg !== 'transparent' ? doc.bg : '#ffffff' });
      bg.addEventListener('input', () => { doc.bg = bg.value; render(); });
      bg.addEventListener('change', () => commit());
      propsEl.append(section('e.artboard',
        W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.width') }), w), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.height') }), h)),
        W.h('div', { class: 'row' }, W.h('span', { class: 'w-label-sm', text: W.t('e.bg') }), bg, W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('e.transparent'), onclick: () => { doc.bg = 'transparent'; commit(); render(); } }))));
      propsEl.append(section('ui.properties', paintEditor(W.t('e.fill'), style.fill, (v) => { style.fill = v; renderProps(); }), W.h('div', { style: { height: '10px' } }), paintEditor(W.t('e.stroke'), style.stroke, (v) => { style.stroke = v; renderProps(); }),
        W.slider({ i18n: 'ui.strokeWidth', min: 0, max: 60, step: 0.5, value: style.strokeW, onInput: (v) => { style.strokeW = v; } })));
      return;
    }
    const o = objs[0];
    const b = worldBox(o);
    const num = (key, label, val, fn) => {
      const inp = W.h('input', { class: 'w-input sm', type: 'number', value: W.round(val, 2) });
      inp.addEventListener('change', () => fn(parseFloat(inp.value) || 0));
      propInputs[key] = inp;
      return W.h('div', { class: 'w-field' }, W.h('label', { text: label }), inp);
    };
    const moveTo = (nx, ny) => setOn(objs, (x) => { const bb = worldBox(x); translate(x, nx == null ? 0 : nx - bb.x, ny == null ? 0 : ny - bb.y); });
    const resizeTo = (nw, nh) => setOn(objs, (x) => { const bb = bbox(x); scaleTo(x, bb, { x: bb.x, y: bb.y, w: nw == null ? bb.w : nw, h: nh == null ? bb.h : nh }); });
    propsEl.append(section('ui.position',
      W.h('div', { class: 'w-input-group' }, num('x', 'X', b.x, (v) => moveTo(v, null)), num('y', 'Y', b.y, (v) => moveTo(null, v))),
      W.h('div', { class: 'w-input-group' }, num('w', W.t('ui.width'), bbox(o).w, (v) => resizeTo(Math.max(1, v), null)), num('h', W.t('ui.height'), bbox(o).h, (v) => resizeTo(null, Math.max(1, v)))),
      W.h('div', { class: 'w-input-group' }, num('rot', W.t('ui.rotation'), o.rot || 0, (v) => setOn(objs, (x) => { x.rot = v; })))));
    if (o.type !== 'image' && o.type !== 'group') {
      propsEl.append(section('ui.properties',
        paintEditor(W.t('e.fill'), o.fill, (v, live) => setOn(objs, (x) => { x.fill = v; }, live) || (!live && renderProps())),
        W.h('div', { style: { height: '10px' } }),
        paintEditor(W.t('e.stroke'), o.stroke, (v, live) => setOn(objs, (x) => { x.stroke = v; if (!x.strokeW) x.strokeW = 2; }, live) || (!live && renderProps())),
        W.slider({ i18n: 'ui.strokeWidth', min: 0, max: 100, step: 0.5, value: o.strokeW || 0, onInput: (v) => setOn(objs, (x) => { x.strokeW = v; }, true), onChange: () => commit() }),
        W.h('label', { class: 'w-check-row' }, (() => { const c = W.h('input', { type: 'checkbox' }); c.checked = !!o.dash; c.addEventListener('change', () => setOn(objs, (x) => { x.dash = c.checked; })); return c; })(), W.h('span', { text: W.t('e.dash') }))));
    }
    const shapeOpts = [];
    if (o.type === 'rect') shapeOpts.push(W.slider({ i18n: 'e.corner', min: 0, max: Math.round(Math.min(o.w, o.h) / 2), value: o.rx || 0, onInput: (v) => setOn(objs, (x) => { if (x.type === 'rect') x.rx = v; }, true), onChange: () => commit() }));
    if (o.type === 'polygon' || o.type === 'star') shapeOpts.push(W.slider({ i18n: 'e.sides', min: 3, max: 24, value: o.sides || 5, onInput: (v) => setOn(objs, (x) => { x.sides = v; }, true), onChange: () => commit() }));
    if (o.type === 'star') shapeOpts.push(W.slider({ i18n: 'e.inner', min: 0.1, max: 0.95, step: 0.01, value: o.inner || 0.45, onInput: (v) => setOn(objs, (x) => { x.inner = v; }, true), onChange: () => commit() }));
    if (o.type === 'text') {
      shapeOpts.push(W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.font') }), W.fontSelect(o.font, async (f) => { await W.ensureFont(f, o.weight); setOn(objs, (x) => { x.font = f; }); })));
      shapeOpts.push(W.slider({ i18n: 'ui.fontSize', min: 6, max: 600, value: o.size, onInput: (v) => setOn(objs, (x) => { x.size = v; }, true), onChange: () => commit() }));
      shapeOpts.push(W.slider({ i18n: 'e.letterSpacing', min: -20, max: 100, value: o.spacing || 0, onInput: (v) => setOn(objs, (x) => { x.spacing = v; }, true), onChange: () => commit() }));
      shapeOpts.push(W.segmented([{ value: 'start', icon: W.isRTL() ? 'align-right' : 'align-left' }, { value: 'middle', icon: 'align-center' }, { value: 'end', icon: W.isRTL() ? 'align-left' : 'align-right' }], o.align || 'start', (v) => setOn(objs, (x) => { x.align = v; })));
      shapeOpts.push(W.h('button', { class: 'w-btn sm', type: 'button', style: { marginTop: '8px' }, text: W.t('e.text') + '…', onclick: () => editText(o) }));
    }
    if (o.type === 'path') shapeOpts.push(W.h('label', { class: 'w-check-row' }, (() => { const c = W.h('input', { type: 'checkbox' }); c.checked = !!o.closed; c.addEventListener('change', () => setOn(objs, (x) => { if (x.type === 'path') x.closed = c.checked; })); return c; })(), W.h('span', { text: W.t('e.closePath') })));
    if (shapeOpts.length) propsEl.append(section('e.obj.' + o.type, ...shapeOpts));
    propsEl.append(section('ui.opacity', W.slider({ i18n: 'ui.opacity', min: 0, max: 100, value: Math.round((o.opacity != null ? o.opacity : 1) * 100), onInput: (v) => setOn(objs, (x) => { x.opacity = v / 100; }, true), onChange: () => commit() })));
    propsEl.append(section('menu.arrange', W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '2px' } },
      W.iconButton('align-left', 'e.alignL', () => align('l')), W.iconButton('align-h-center', 'e.alignCH', () => align('ch')), W.iconButton('align-right', 'e.alignR', () => align('r')),
      W.iconButton('align-top', 'e.alignT', () => align('t')), W.iconButton('align-v-center', 'e.alignCV', () => align('cv')), W.iconButton('align-bottom', 'e.alignB', () => align('b')),
      W.iconButton('dist-h', 'e.distH', () => distribute('h')), W.iconButton('flip-h', 'e.flipH', () => flip(true)), W.iconButton('flip-v', 'e.flipV', () => flip(false)),
      W.iconButton('bring-front', 'e.front', () => zorder('front')), W.iconButton('send-back', 'e.back', () => zorder('back')), W.iconButton('group', 'e.group', group))));
  }
  function syncProps() {
    const o = selObjs()[0];
    if (!o) return;
    const b = worldBox(o), lb = bbox(o);
    const set = (k, v) => { if (propInputs[k] && document.activeElement !== propInputs[k]) propInputs[k].value = W.round(v, 2); };
    set('x', b.x); set('y', b.y); set('w', lb.w); set('h', lb.h); set('rot', o.rot || 0);
  }

  /* ═══════════ الملفات ═══════════ */
  function startDoc(d, meta) {
    doc = Object.assign({ w: 1080, h: 1080, bg: '#ffffff', objects: [], assets: {} }, d);
    selection = [];
    hist.stack = []; hist.index = -1; commit();
    meta = meta || {};
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: false });
    welcome.hide();
    stage.classList.add('has-doc');
    render(); renderObjects(); renderProps(); fit();
  }
  async function newDocFlow() {
    if (!(await W.confirmDiscard())) return;
    const presets = [['1080x1080', 'Instagram 1080×1080'], ['1080x1920', W.lang === 'ar' ? 'قصة 1080×1920' : 'Story 1080×1920'], ['1920x1080', 'HD 1920×1080'], ['512x512', W.lang === 'ar' ? 'شعار 512×512' : 'Logo 512×512'], ['794x1123', 'A4 (96dpi)'], ['1500x500', W.lang === 'ar' ? 'غلاف X/تويتر' : 'X header']];
    const v = await W.form(W.t('e.newDoc'), [
      { key: 'p', i18n: 'e.preset', type: 'select', value: '1080x1080', options: presets.map(([v2, l]) => ({ value: v2, label: l })), onInput: (val, inp) => { const [w, h] = val.split('x'); inp.w.value = w; inp.h.value = h; } },
      { key: 'w', i18n: 'ui.width', type: 'number', value: 1080, row: 'a' }, { key: 'h', i18n: 'ui.height', type: 'number', value: 1080, row: 'a' }
    ]);
    if (!v) return;
    startDoc({ w: W.clamp(v.w || 1080, 1, 20000), h: W.clamp(v.h || 1080, 1, 20000) }, {});
  }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'رسومات', en: 'Drawings' }, ext: ['reesha', 'svg'] }], as: 'text' });
    if (f[0]) loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { loadFile(await W.files.readPath(p, 'text')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  function loadFile(f) {
    try {
      const text = typeof f.data === 'string' ? f.data : W.files.decodeText(new Uint8Array(f.data));
      if (f.ext === 'reesha') { const j = JSON.parse(text); startDoc(j.doc, { name: f.name, path: f.path }); }
      else { const d = parseSVG(text); startDoc(d, { name: f.name }); }
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  /** استيراد SVG: كل عنصر رسومي في المستوى الأول يصبح عنصر\u064Bا قابل\u064Bا للتحريك */
  function parseSVG(text, into) {
    const parsed = W.sanitizeHTML(text, { full: true, keepStyle: true });
    const s = parsed.querySelector('svg');
    if (!s) throw new Error('no svg');
    s.querySelectorAll('animate,set,animateMotion,animateTransform,foreignObject').forEach((n) => n.remove());
    const vb = (s.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    const w = vb.length === 4 ? vb[2] : parseFloat(s.getAttribute('width')) || 1000;
    const h = vb.length === 4 ? vb[3] : parseFloat(s.getAttribute('height')) || 1000;
    const tmp = document.createElementNS(SVGNS, 'svg');
    tmp.setAttribute('style', 'position:absolute;left:-99999px;top:0');
    tmp.setAttribute('width', w); tmp.setAttribute('height', h);
    document.body.append(tmp);
    const defs = Array.from(s.querySelectorAll('defs, style')).map((d) => d.outerHTML).join('');
    const objs = [];
    Array.from(s.children).forEach((el) => {
      if (/^(defs|style|title|desc|metadata)$/i.test(el.tagName)) return;
      tmp.innerHTML = defs + el.outerHTML;
      const node = tmp.lastElementChild;
      let bb;
      try { bb = node.getBBox(); } catch (e) { bb = { x: 0, y: 0, width: w, height: h }; }
      if (!bb.width && !bb.height) return;
      const ox = bb.x - (vb.length === 4 ? vb[0] : 0), oy = bb.y - (vb.length === 4 ? vb[1] : 0);
      objs.push({ id: uid(), type: 'raw', name: el.getAttribute('id') || el.tagName, markup: defs + el.outerHTML, ox: bb.x, oy: bb.y, ow: bb.width || 1, oh: bb.height || 1, x: ox, y: oy, w: bb.width || 1, h: bb.height || 1, rot: 0, opacity: 1, fill: 'keep' });
    });
    tmp.remove();
    if (into) return objs;
    return { w, h, bg: 'transparent', objects: objs, assets: {} };
  }
  async function importSVG() {
    const f = await W.files.open({ types: [{ name: { ar: 'رسومات SVG', en: 'SVG' }, ext: ['svg'] }], as: 'text' });
    if (!f[0] || !doc) return;
    const objs = parseSVG(f[0].data, true);
    doc.objects.push(...objs);
    selection = objs.map((o) => o.id);
    commit(); changed();
  }
  async function placeImage() {
    if (!doc) return;
    const f = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['png', 'jpg', 'jpeg', 'webp', 'gif'] }], as: 'dataurl' });
    if (!f[0]) return;
    const img = await W.loadImage(f[0].data);
    const id = 'a' + Date.now().toString(36);
    doc.assets[id] = f[0].data;
    const s = Math.min(1, doc.w * 0.6 / img.naturalWidth, doc.h * 0.6 / img.naturalHeight);
    const o = newObj('image', { src: id, x: (doc.w - img.naturalWidth * s) / 2, y: (doc.h - img.naturalHeight * s) / 2, w: img.naturalWidth * s, h: img.naturalHeight * s, fill: 'none', stroke: 'none' });
    doc.objects.push(o); selection = [o.id];
    commit(); changed();
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'));
  async function save(as) {
    if (!doc) return;
    const res = await W.files.save({ data: JSON.stringify({ app: 'reesha', version: 1, doc }), name: baseName() + '.reesha', path: as ? null : (W.doc.path && W.doc.path.endsWith('.reesha') ? W.doc.path : null), types: [{ name: { ar: 'مشروع ريشة', en: 'Reesha project' }, ext: ['reesha'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }
  async function rasterize(scale) {
    await W.fontsReady();
    const svgStr = exportSVGString();
    const img = await W.loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr));
    const c = document.createElement('canvas');
    c.width = Math.round(doc.w * scale); c.height = Math.round(doc.h * scale);
    const g = c.getContext('2d');
    // النصوص لا ت\u064Fحم\u064E\u0651ل خطوطها داخل صورة SVG، لذلك نرسمها مباشرة عبر عنصر SVG حي
    g.drawImage(img, 0, 0, c.width, c.height);
    return c;
  }
  async function exportAs(fmt) {
    if (!doc) return;
    selection = []; renderUI();
    if (fmt === 'svg') { const r = await W.files.save({ data: exportSVGString(), name: baseName() + '.svg', types: [{ name: { ar: 'رسم SVG', en: 'SVG' }, ext: ['svg'] }] }); if (r) W.toast(W.t('ui.exported'), 'success'); return; }
    if (fmt === 'pdf') { await W.exportPDF(W.printDocument(exportSVGString().replace(/^<\?xml[^>]*>/, ''), { css: '@page{size:' + doc.w + 'px ' + doc.h + 'px;margin:0}svg{display:block}' }).replace('@page{size:A4;margin:0}', ''), baseName()); return; }
    const v = await W.form(W.t('cmd.export'), [{ key: 's', i18n: 'e.scale', type: 'select', value: '2', options: [{ value: '1', label: '1×' }, { value: '2', label: '2×' }, { value: '3', label: '3×' }, { value: '4', label: '4×' }] }]);
    if (!v) return;
    const c = await renderPNG(parseFloat(v.s));
    const r = await W.files.save({ data: await W.canvasToBytes(c, 'image/png'), name: baseName() + '.png', types: [{ name: { ar: 'صورة PNG', en: 'PNG' }, ext: ['png'] }] });
    if (r) W.toast(W.t('ui.exported'), 'success');
  }
  /** تحويل إلى PNG مع خطوط صحيحة: نضم\u0651ن الخطوط المستخدمة كـ data URLs داخل SVG */
  async function renderPNG(scale) {
    const used = new Set();
    const walk = (list) => list.forEach((o) => { if (o.type === 'text') used.add(o.font); if (o.children) walk(o.children); });
    walk(doc.objects);
    let fontCSS = '';
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; }
      for (const r of Array.from(rules || [])) {
        const inner = r.styleSheet ? Array.from(r.styleSheet.cssRules || []) : [r];
        for (const rr of inner) {
          if (!(rr instanceof CSSFontFaceRule)) continue;
          const fam = rr.style.getPropertyValue('font-family').replace(/["']/g, '').trim();
          if (!used.has(fam)) continue;
          const m = /url\(["']?([^"')]+)["']?\)/.exec(rr.style.getPropertyValue('src'));
          if (!m) continue;
          try {
            const url = new URL(m[1], rr.parentStyleSheet.href || location.href).href;
            const buf = new Uint8Array(await (await fetch(url)).arrayBuffer());
            fontCSS += '@font-face{font-family:"' + fam + '";font-weight:' + (rr.style.getPropertyValue('font-weight') || 400) + ';src:url(data:font/woff2;base64,' + W.b64.encode(buf) + ') format("woff2");' + (rr.style.getPropertyValue('unicode-range') ? 'unicode-range:' + rr.style.getPropertyValue('unicode-range') + ';' : '') + '}';
          } catch (e) { /* تجاهل */ }
        }
      }
    }
    let s = exportSVGString();
    if (fontCSS) s = s.replace(/(<svg[^>]*>)/, '$1<style>' + fontCSS + '</style>');
    const img = await W.loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s));
    const c = document.createElement('canvas');
    c.width = Math.round(doc.w * scale); c.height = Math.round(doc.h * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c;
  }
  void rasterize;

  /* ═══════════ القوائم ═══════════ */
  const needDoc = () => !doc;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'cmd.new', icon: 'file-plus', shortcut: 'Mod+N', action: newDocFlow },
      { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      { i18n: 'e.importSvg', action: importSVG, disabled: needDoc },
      { i18n: 'e.placeImage', icon: 'image', action: placeImage, disabled: needDoc },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), disabled: needDoc, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), disabled: needDoc, global: true },
      { i18n: 'cmd.export', icon: 'export', disabled: needDoc, submenu: [{ i18n: 'e.exportSvg', action: () => exportAs('svg') }, { i18n: 'e.exportPng', action: () => exportAs('png') }, { i18n: 'e.exportPdf', action: () => exportAs('pdf') }] },
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
      { i18n: 'cmd.duplicate', icon: 'duplicate', shortcut: 'Mod+D', action: duplicate },
      { i18n: 'cmd.delete', icon: 'trash', shortcut: 'Delete', action: () => { if (tool === 'node' && nodeSel >= 0) delNode(); else del(); } },
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => { selection = doc ? doc.objects.filter((o) => !o.locked && !o.hidden).map((o) => o.id) : []; renderUI(); renderObjects(); renderProps(); } }
    ] },
    { i18n: 'menu.object', items: [
      { i18n: 'e.group', icon: 'group', shortcut: 'Mod+G', action: group },
      { i18n: 'e.ungroup', shortcut: 'Mod+Shift+G', action: ungroup },
      { i18n: 'e.convertPath', icon: 'bezier', shortcut: 'Mod+Shift+O', action: toPath },
      '-',
      { i18n: 'e.front', icon: 'bring-front', shortcut: 'Mod+Shift+]', action: () => zorder('front') },
      { i18n: 'e.forward', shortcut: 'Mod+]', action: () => zorder('forward') },
      { i18n: 'e.backward', shortcut: 'Mod+[', action: () => zorder('backward') },
      { i18n: 'e.back', icon: 'send-back', shortcut: 'Mod+Shift+[', action: () => zorder('back') },
      '-',
      { i18n: 'e.flipH', icon: 'flip-h', action: () => flip(true) },
      { i18n: 'e.flipV', icon: 'flip-v', action: () => flip(false) },
      { i18n: 'e.distH', action: () => distribute('h') },
      { i18n: 'e.distV', action: () => distribute('v') }
    ] },
    { i18n: 'menu.view', items: [
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => setZoom(V.z * 1.25) },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => setZoom(V.z / 1.25) },
      { i18n: 'cmd.fit', icon: 'fit', shortcut: 'Mod+0', action: fit },
      { i18n: 'cmd.actualSize', shortcut: 'Mod+1', action: () => setZoom(1) },
      '-',
      { i18n: 'e.grid', icon: 'grid-dots', checked: () => gridOn, shortcut: "Mod+'", action: () => { gridOn = !gridOn; drawGrid(); } },
      { i18n: 'e.snap', icon: 'magnet', checked: () => snapOn, action: () => { snapOn = !snapOn; } },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus, shortcuts: TOOLS.filter(Boolean).map((t) => ['e.' + t[0], t[2]]) });
  const status = chrome.status;
  TOOLS.filter(Boolean).forEach((t) => W.keys.bind(t[2], () => setTool(t[0])));
  W.keys.bind('Enter', () => { if (pen) finishPen(false); });
  W.keys.bind('Escape', () => { if (pen) finishPen(false); else { selection = []; renderUI(); renderObjects(); renderProps(); } });
  W.keys.bind('Backspace', () => { if (tool === 'node' && nodeSel >= 0) delNode(); else if (selection.length) del(); });
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].forEach((k) => {
    const nudge = (stepv) => { if (!selection.length) return; const dx = k === 'ArrowLeft' ? -stepv : k === 'ArrowRight' ? stepv : 0, dy = k === 'ArrowUp' ? -stepv : k === 'ArrowDown' ? stepv : 0; selObjs().forEach((o) => translate(o, dx, dy)); render(); syncProps(); commitSoon(); };
    W.keys.bind(k, () => nudge(1)); W.keys.bind('Shift+' + k, () => nudge(10));
  });
  const commitSoon = W.debounce(commit, 400);
  function delNode() {
    const o = find(selection[0]);
    if (!o || o.type !== 'path' || nodeSel < 0) return;
    if (o.nodes.length <= 2) { del(); return; }
    o.nodes.splice(nodeSel, 1);
    nodeSel = -1;
    commit(); render();
  }

  const welcome = W.welcome(stage, {
    text: 'e.welcomeText',
    actions: [{ i18n: 'e.newDoc', icon: 'file-plus', primary: true, action: newDocFlow }, { i18n: 'cmd.open', icon: 'folder', action: open }],
    openRecent: openPath
  });
  welcome.el.style.zIndex = 5;
  welcome.el.style.background = 'var(--canvas-bg)';
  W.dropZone(stage, async (files) => {
    const f = files.find((x) => x.ext === 'reesha' || x.ext === 'svg');
    if (f && f.ext === 'reesha') { if (await W.confirmDiscard()) loadFile({ name: f.name, path: f.path, ext: f.ext, data: f.data }); return; }
    if (f && f.ext === 'svg') {
      const text = W.files.decodeText(new Uint8Array(f.data));
      if (!doc) { startDoc(parseSVG(text), { name: f.name }); return; }
      const objs = parseSVG(text, true); doc.objects.push(...objs); selection = objs.map((o) => o.id); commit(); changed();
    }
  });
  W.onExternalFile((f) => loadFile(f), 'text');
  W.on('langchange', () => { renderTools(); renderObjects(); renderProps(); setTool(tool); });
  new ResizeObserver(() => { if (doc) applyView(); }).observe(stage);
  W.fontsReady().then(() => { if (doc) render(); });
  const tb = document.getElementById('toolbar');
  const tbSep = () => W.h('div', { class: 'w-sep' });
  tb.prepend(
    W.iconButton('undo', 'cmd.undo', undo, { shortcut: 'Mod+Z' }), W.iconButton('redo', 'cmd.redo', redo, { shortcut: 'Mod+Y' }), tbSep(),
    W.iconButton('duplicate', 'cmd.duplicate', duplicate), W.iconButton('trash', 'cmd.delete', () => selection.length && del()), tbSep(),
    W.iconButton('group', 'e.group', group), W.iconButton('bezier', 'e.convertPath', toPath), tbSep(),
    W.iconButton('align-right', 'e.alignR', () => align('r')), W.iconButton('align-h-center', 'e.alignCH', () => align('ch')), W.iconButton('align-left', 'e.alignL', () => align('l')),
    W.iconButton('align-top', 'e.alignT', () => align('t')), W.iconButton('align-v-center', 'e.alignCV', () => align('cv')), W.iconButton('align-bottom', 'e.alignB', () => align('b')), tbSep(),
    W.iconButton('bring-front', 'e.front', () => zorder('front')), W.iconButton('send-back', 'e.back', () => zorder('back')), tbSep(),
    W.iconButton('zoom-out', 'cmd.zoomOut', () => doc && setZoom(V.z / 1.25)), W.iconButton('fit', 'cmd.fit', fit), W.iconButton('zoom-in', 'cmd.zoomIn', () => doc && setZoom(V.z * 1.25)), tbSep());
  renderTools(); setTool('select');

  window.__reesha = { get doc() { return doc; }, toScreen: (x, y) => { const r = svg.getBoundingClientRect(); return { x: r.left + V.px + x * V.z, y: r.top + V.py + y * V.z }; }, newDoc: (w, h) => startDoc({ w, h }, {}), get selection() { return selection; }, setTool, exportSVGString, renderPNG, style };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const d = parseSVG('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="30" height="20" fill="red"/><circle cx="70" cy="70" r="10"/></svg>');
      if (d.objects.length !== 2) errors.push('svg import ' + d.objects.length);
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
