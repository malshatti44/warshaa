/* مخطط Mukhattat — رسم هندسي ثنائي الأبعاد ومخططات CAD */
(function () {
  'use strict';

  W.init({
    id: 'mukhattat',
    i18n: {
      ar: {
        'k.line': 'خط', 'k.pline': 'خط متعدد', 'k.rect': 'مستطيل', 'k.polygon': 'مضلع منتظم', 'k.circle': 'دائرة', 'k.arc': 'قوس (3 نقاط)', 'k.text': 'نص', 'k.dim': 'ب\u064Fعد', 'k.dist': 'قياس المسافة',
        'k.move': 'نقل', 'k.copy': 'نسخ', 'k.rotate': 'تدوير', 'k.scale': 'تحجيم', 'k.mirror': 'انعكاس', 'k.offset': 'إزاحة متوازية', 'k.trim': 'قص', 'k.erase': 'حذف', 'k.explode': 'تفكيك', 'k.select': 'تحديد',
        'k.layers': 'الطبقات', 'k.newLayer': 'طبقة جديدة', 'k.props': 'الخصائص', 'k.layer': 'الطبقة', 'k.color': 'اللون', 'k.byLayer': 'حسب الطبقة', 'k.ltype': 'نوع الخط', 'k.lt.continuous': 'متصل', 'k.lt.dashed': 'متقطع', 'k.lt.center': 'محوري',
        'k.length': 'الطول', 'k.angle': 'الزاوية', 'k.radius': 'نصف القطر', 'k.area': 'المساحة', 'k.perimeter': 'المحيط', 'k.closed': 'مغلق', 'k.fill': 'تعبئة', 'k.height': 'الارتفاع', 'k.content': 'النص', 'k.count': '{n} عنصر',
        'k.p.first': 'حدد النقطة الأولى', 'k.p.next': 'حدد النقطة التالية (Enter للإنهاء)', 'k.p.corner': 'حدد الركن المقابل', 'k.p.center': 'حدد المركز', 'k.p.radius': 'حدد نصف القطر أو اكتبه', 'k.p.second': 'حدد النقطة الثانية',
        'k.p.third': 'حدد النقطة الثالثة', 'k.p.textPos': 'حدد موضع النص', 'k.p.dimOffset': 'حدد موضع خط البعد', 'k.p.base': 'حدد نقطة الأساس', 'k.p.dest': 'حدد النقطة الهدف', 'k.p.angle': 'حدد زاوية الدوران أو اكتبها',
        'k.p.factor': 'اكتب معامل التحجيم أو حدده', 'k.p.mirror1': 'حدد النقطة الأولى لخط الانعكاس', 'k.p.mirror2': 'حدد النقطة الثانية لخط الانعكاس', 'k.p.offsetDist': 'اكتب مسافة الإزاحة', 'k.p.offsetObj': 'اختر العنصر المراد إزاحته',
        'k.p.offsetSide': 'حدد الجهة', 'k.p.trimObj': 'انقر على الجزء المراد قصه (Esc للإنهاء)', 'k.p.select': 'حدد العناصر ثم اضغط Enter', 'k.p.sides': 'اكتب عدد الأضلاع', 'k.p.textH': 'اكتب ارتفاع النص',
        'k.p.command': 'اكتب أمر\u064Bا (مثل: خط أو L)', 'k.unknown': 'أمر غير معروف: {c}', 'k.distResult': 'المسافة = {d} • الزاوية = {a}° • ΔX = {dx} • ΔY = {dy}', 'k.noSel': 'لا يوجد تحديد',
        'k.snap': 'التقاط الشبكة', 'k.grid': 'الشبكة', 'k.ortho': 'متعامد', 'k.polar': 'قطبي', 'k.osnap': 'التقاط العناصر', 'k.units': 'الوحدات', 'k.precision': 'الدقة', 'k.zoomExt': 'تكبير على كل الرسم',
        'k.welcomeText': 'ارسم المخططات الهندسية بدقة، مع التقاط النقاط والطبقات والأبعاد، وافتح ملفات DXF واحفظها', 'k.newDrawing': 'رسم جديد', 'k.importDxf': 'فتح DXF…', 'k.exportDxf': 'DXF…', 'k.exportSvg': 'SVG…', 'k.exportPng': 'PNG…', 'k.exportPdf': 'PDF للطباعة…',
        'k.paper': 'الورق', 'k.scale1': 'مقياس الرسم 1:', 'k.fitPaper': 'ملاءمة الورقة', 'k.s.end': 'نهاية', 'k.s.mid': 'منتصف', 'k.s.cen': 'مركز', 'k.s.int': 'تقاطع', 'k.s.quad': 'ربع', 'k.s.grid': 'شبكة',
        'k.lw': 'سماكة الخط (مم)', 'k.history': 'سجل الأوامر', 'k.copies': 'حدد النقطة الهدف (Enter للإنهاء)', 'k.visible': 'إظهار', 'k.lock': 'قفل', 'k.current': 'الطبقة الحالية', 'k.rename': 'إعادة تسمية',
        'k.l.dims': 'الأبعاد', 'k.l.text': 'النصوص', 'k.l.walls': 'الجدران', 'k.menuDraw': 'رسم', 'k.menuModify': 'تعديل'
      },
      en: {
        'k.line': 'Line', 'k.pline': 'Polyline', 'k.rect': 'Rectangle', 'k.polygon': 'Polygon', 'k.circle': 'Circle', 'k.arc': 'Arc (3 points)', 'k.text': 'Text', 'k.dim': 'Dimension', 'k.dist': 'Measure distance',
        'k.move': 'Move', 'k.copy': 'Copy', 'k.rotate': 'Rotate', 'k.scale': 'Scale', 'k.mirror': 'Mirror', 'k.offset': 'Offset', 'k.trim': 'Trim', 'k.erase': 'Erase', 'k.explode': 'Explode', 'k.select': 'Select',
        'k.layers': 'Layers', 'k.newLayer': 'New layer', 'k.props': 'Properties', 'k.layer': 'Layer', 'k.color': 'Color', 'k.byLayer': 'By layer', 'k.ltype': 'Linetype', 'k.lt.continuous': 'Continuous', 'k.lt.dashed': 'Dashed', 'k.lt.center': 'Center',
        'k.length': 'Length', 'k.angle': 'Angle', 'k.radius': 'Radius', 'k.area': 'Area', 'k.perimeter': 'Perimeter', 'k.closed': 'Closed', 'k.fill': 'Fill', 'k.height': 'Height', 'k.content': 'Text', 'k.count': '{n} objects',
        'k.p.first': 'Specify first point', 'k.p.next': 'Specify next point (Enter to finish)', 'k.p.corner': 'Specify opposite corner', 'k.p.center': 'Specify center', 'k.p.radius': 'Specify or type the radius', 'k.p.second': 'Specify second point',
        'k.p.third': 'Specify third point', 'k.p.textPos': 'Specify text position', 'k.p.dimOffset': 'Specify dimension line location', 'k.p.base': 'Specify base point', 'k.p.dest': 'Specify destination point', 'k.p.angle': 'Specify or type the rotation angle',
        'k.p.factor': 'Type or specify the scale factor', 'k.p.mirror1': 'Specify first point of mirror line', 'k.p.mirror2': 'Specify second point of mirror line', 'k.p.offsetDist': 'Type the offset distance', 'k.p.offsetObj': 'Select object to offset',
        'k.p.offsetSide': 'Specify side', 'k.p.trimObj': 'Click the part to trim (Esc to finish)', 'k.p.select': 'Select objects, then press Enter', 'k.p.sides': 'Type the number of sides', 'k.p.textH': 'Type the text height',
        'k.p.command': 'Type a command (e.g. LINE or L)', 'k.unknown': 'Unknown command: {c}', 'k.distResult': 'Distance = {d} • Angle = {a}° • ΔX = {dx} • ΔY = {dy}', 'k.noSel': 'Nothing selected',
        'k.snap': 'Grid snap', 'k.grid': 'Grid', 'k.ortho': 'Ortho', 'k.polar': 'Polar', 'k.osnap': 'Object snap', 'k.units': 'Units', 'k.precision': 'Precision', 'k.zoomExt': 'Zoom extents',
        'k.welcomeText': 'Draft precise technical drawings with object snaps, layers and dimensions — open and save DXF files', 'k.newDrawing': 'New drawing', 'k.importDxf': 'Open DXF…', 'k.exportDxf': 'DXF…', 'k.exportSvg': 'SVG…', 'k.exportPng': 'PNG…', 'k.exportPdf': 'Print PDF…',
        'k.paper': 'Paper', 'k.scale1': 'Scale 1:', 'k.fitPaper': 'Fit to paper', 'k.s.end': 'Endpoint', 'k.s.mid': 'Midpoint', 'k.s.cen': 'Center', 'k.s.int': 'Intersection', 'k.s.quad': 'Quadrant', 'k.s.grid': 'Grid',
        'k.lw': 'Lineweight (mm)', 'k.history': 'Command history', 'k.copies': 'Specify destination (Enter to finish)', 'k.visible': 'Visible', 'k.lock': 'Lock', 'k.current': 'Current layer', 'k.rename': 'Rename',
        'k.l.dims': 'Dimensions', 'k.l.text': 'Text', 'k.l.walls': 'Walls', 'k.menuDraw': 'Draw', 'k.menuModify': 'Modify'
      }
    }
  });

  const $ = (s) => document.querySelector(s);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => W.uid('e');
  const canvas = $('#cad'), g = canvas.getContext('2d');
  const stage = $('#stage');
  const D2R = Math.PI / 180;

  let D = null; // { units, prec, layers: [], current, entities: [] }
  const V = { cx: 0, cy: 0, s: 2 }; // مركز العرض وبكسل لكل وحدة
  let sel = new Set();
  const modes = { snap: false, grid: true, ortho: false, polar: true, osnap: true };
  let cursor = null; // نقطة العالم الحالية بعد الالتقاط
  let snapInfo = null;
  let preview = []; // عناصر مؤقتة للمعاينة
  let tracking = null;

  /* ═══════════ الهندسة ═══════════ */
  const dist = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  const angDeg = (a, b) => ((Math.atan2(b.y - a.y, b.x - a.x) / D2R) + 360) % 360;
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const polar = (c, r, deg) => ({ x: c.x + r * Math.cos(deg * D2R), y: c.y + r * Math.sin(deg * D2R) });
  const normA = (a) => ((a % 360) + 360) % 360;
  const inArc = (a, a0, a1) => { a = normA(a); a0 = normA(a0); a1 = normA(a1); return a0 <= a1 ? a >= a0 - 1e-9 && a <= a1 + 1e-9 : a >= a0 - 1e-9 || a <= a1 + 1e-9; };
  function segDist(p, a, b) { const l = (b.x - a.x) ** 2 + (b.y - a.y) ** 2; if (!l) return dist(p, a); let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l; t = Math.max(0, Math.min(1, t)); return dist(p, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }); }
  function segments(e) {
    if (e.type === 'line') return [[e.a, e.b]];
    if (e.type === 'pline') { const s = []; for (let i = 1; i < e.pts.length; i++) s.push([e.pts[i - 1], e.pts[i]]); if (e.closed && e.pts.length > 2) s.push([e.pts[e.pts.length - 1], e.pts[0]]); return s; }
    if (e.type === 'dim') { const d = dimGeom(e); return [[d.e1a, d.e1b], [d.e2a, d.e2b], [d.d1, d.d2]]; }
    return [];
  }
  function segInt(p1, p2, p3, p4) {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (Math.abs(d) < 1e-12) return null;
    const t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    const u = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
    return { t, u, p: { x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y) } };
  }
  function segCircle(a, b, c, r) {
    const dx = b.x - a.x, dy = b.y - a.y, fx = a.x - c.x, fy = a.y - c.y;
    const A = dx * dx + dy * dy, B = 2 * (fx * dx + fy * dy), C = fx * fx + fy * fy - r * r;
    const disc = B * B - 4 * A * C;
    if (disc < 0 || !A) return [];
    const s = Math.sqrt(disc);
    return [(-B - s) / (2 * A), (-B + s) / (2 * A)].map((t) => ({ t, p: { x: a.x + t * dx, y: a.y + t * dy } }));
  }
  function circleCircle(c1, r1, c2, r2) {
    const d = dist(c1, c2);
    if (d > r1 + r2 || d < Math.abs(r1 - r2) || !d) return [];
    const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const m = { x: c1.x + a * (c2.x - c1.x) / d, y: c1.y + a * (c2.y - c1.y) / d };
    return [{ x: m.x + h * (c2.y - c1.y) / d, y: m.y - h * (c2.x - c1.x) / d }, { x: m.x - h * (c2.y - c1.y) / d, y: m.y + h * (c2.x - c1.x) / d }];
  }
  const isRound = (e) => e.type === 'circle' || e.type === 'arc';
  /** كل نقاط تقاطع عنصرين */
  function intersections(e1, e2) {
    const out = [];
    const s1 = segments(e1), s2 = segments(e2);
    s1.forEach(([a, b]) => s2.forEach(([c, d]) => { const r = segInt(a, b, c, d); if (r && r.t >= -1e-9 && r.t <= 1 + 1e-9 && r.u >= -1e-9 && r.u <= 1 + 1e-9) out.push(r.p); }));
    const roundOk = (e, p) => e.type === 'circle' || inArc(angDeg(e.c, p), e.a0, e.a1);
    if (isRound(e1)) s2.forEach(([a, b]) => segCircle(a, b, e1.c, e1.r).forEach((r) => { if (r.t >= -1e-9 && r.t <= 1 + 1e-9 && roundOk(e1, r.p)) out.push(r.p); }));
    if (isRound(e2)) s1.forEach(([a, b]) => segCircle(a, b, e2.c, e2.r).forEach((r) => { if (r.t >= -1e-9 && r.t <= 1 + 1e-9 && roundOk(e2, r.p)) out.push(r.p); }));
    if (isRound(e1) && isRound(e2)) circleCircle(e1.c, e1.r, e2.c, e2.r).forEach((p) => { if (roundOk(e1, p) && roundOk(e2, p)) out.push(p); });
    return out;
  }
  function bbox(e) {
    const pts = [];
    if (e.type === 'line') pts.push(e.a, e.b);
    else if (e.type === 'pline') pts.push(...e.pts);
    else if (isRound(e)) pts.push({ x: e.c.x - e.r, y: e.c.y - e.r }, { x: e.c.x + e.r, y: e.c.y + e.r });
    else if (e.type === 'text') { const w = e.h * Math.max(1, String(e.text).length) * 0.6; pts.push(e.p, { x: e.p.x + w, y: e.p.y + e.h }); }
    else if (e.type === 'dim') { const d = dimGeom(e); pts.push(d.e1a, d.e2a, d.d1, d.d2); }
    else if (e.type === 'point') pts.push(e.p);
    const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
    return { x1: Math.min(...xs), y1: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) };
  }
  function dimGeom(e) {
    const ang = Math.atan2(e.p2.y - e.p1.y, e.p2.x - e.p1.x);
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    const o = e.off;
    const d1 = { x: e.p1.x + nx * o, y: e.p1.y + ny * o }, d2 = { x: e.p2.x + nx * o, y: e.p2.y + ny * o };
    const ext = Math.sign(o || 1) * (D ? D.dimExt : 1.5);
    const gap = Math.sign(o || 1) * (D ? D.dimGap : 1);
    return { ang, d1, d2, e1a: { x: e.p1.x + nx * gap, y: e.p1.y + ny * gap }, e1b: { x: d1.x + nx * ext, y: d1.y + ny * ext }, e2a: { x: e.p2.x + nx * gap, y: e.p2.y + ny * gap }, e2b: { x: d2.x + nx * ext, y: d2.y + ny * ext }, len: dist(e.p1, e.p2) };
  }
  function hit(e, p, tol) {
    if (e.type === 'line' || e.type === 'pline' || e.type === 'dim') { if (segments(e).some(([a, b]) => segDist(p, a, b) <= tol)) return true; if (e.type === 'pline' && e.closed && e.fill && pointInPoly(p, e.pts)) return true; if (e.type === 'dim') { const t = dimTextPos(e); return dist(p, t) < (D.dimText * 1.2); } return false; }
    if (e.type === 'circle') return Math.abs(dist(p, e.c) - e.r) <= tol;
    if (e.type === 'arc') return Math.abs(dist(p, e.c) - e.r) <= tol && inArc(angDeg(e.c, p), e.a0, e.a1);
    if (e.type === 'text') { const b = bbox(e); return p.x >= b.x1 - tol && p.x <= b.x2 + tol && p.y >= b.y1 - tol && p.y <= b.y2 + tol; }
    if (e.type === 'point') return dist(p, e.p) <= tol * 1.5;
    return false;
  }
  function pointInPoly(p, pts) { let inside = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const a = pts[i], b = pts[j]; if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside; } return inside; }
  function polyArea(pts) { let s = 0; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; s += a.x * b.y - b.x * a.y; } return s / 2; }
  function dimTextPos(e) { const d = dimGeom(e); const m = mid(d.d1, d.d2); const nx = -Math.sin(d.ang), ny = Math.cos(d.ang); return { x: m.x + nx * D.dimText * 0.8 * Math.sign(e.off || 1), y: m.y + ny * D.dimText * 0.8 * Math.sign(e.off || 1) }; }
  /** تحويل كل نقاط العنصر بدالة */
  function mapEnt(e, fn, opts) {
    const c = clone(e);
    if (c.type === 'line') { c.a = fn(c.a); c.b = fn(c.b); }
    else if (c.type === 'pline') c.pts = c.pts.map(fn);
    else if (c.type === 'point') c.p = fn(c.p);
    else if (c.type === 'text') { c.p = fn(c.p); if (opts && opts.rot) c.rot = normA((c.rot || 0) + opts.rot); if (opts && opts.scale) c.h *= opts.scale; }
    else if (c.type === 'dim') { c.p1 = fn(c.p1); c.p2 = fn(c.p2); if (opts && opts.scale) c.off *= opts.scale; if (opts && opts.mirror) c.off = -c.off; }
    else if (isRound(c)) {
      const q0 = c.type === 'arc' ? fn(polar(c.c, c.r, c.a0)) : null, q1 = c.type === 'arc' ? fn(polar(c.c, c.r, c.a1)) : null;
      c.c = fn(c.c);
      if (opts && opts.scale) c.r *= opts.scale;
      if (c.type === 'arc') {
        if (opts && opts.mirror) { c.a0 = angDeg(c.c, q1); c.a1 = angDeg(c.c, q0); }
        else { c.a0 = angDeg(c.c, q0); c.a1 = angDeg(c.c, q1); }
      }
    }
    return c;
  }

  /* ═══════════ العرض ═══════════ */
  const w2s = (p) => ({ x: canvas.clientWidth / 2 + (p.x - V.cx) * V.s, y: canvas.clientHeight / 2 - (p.y - V.cy) * V.s });
  const s2w = (x, y) => ({ x: V.cx + (x - canvas.clientWidth / 2) / V.s, y: V.cy - (y - canvas.clientHeight / 2) / V.s });
  const layerOf = (e) => D.layers.find((l) => l.name === e.layer) || D.layers[0];
  function colorOf(e, print) {
    let c = e.color || layerOf(e).color || '#ffffff';
    if (print && /^#?f{6}$/i.test(c.replace('#', ''))) c = '#000000';
    return c;
  }
  const DASH = { continuous: [], dashed: [10, 6], center: [18, 5, 4, 5] };
  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#1b1f27'; g.fillRect(0, 0, w, h);
    if (!D) return;
    if (modes.grid) drawGrid(w, h);
    // المحاور
    const o = w2s({ x: 0, y: 0 });
    g.strokeStyle = 'rgba(239,68,68,.55)'; g.lineWidth = 1; g.beginPath(); g.moveTo(o.x, o.y); g.lineTo(o.x + 40, o.y); g.stroke();
    g.strokeStyle = 'rgba(34,197,94,.55)'; g.beginPath(); g.moveTo(o.x, o.y); g.lineTo(o.x, o.y - 40); g.stroke();
    D.entities.forEach((e) => { if (layerOf(e).visible !== false) drawEnt(g, e, w2s, V.s, { sel: sel.has(e.id) }); });
    preview.forEach((e) => drawEnt(g, Object.assign({ layer: D.current }, e), w2s, V.s, { preview: true }));
    // المقابض
    sel.forEach((id) => { const e = D.entities.find((x) => x.id === id); if (e && sel.size <= 50) grips(e).forEach((gp) => { const s = w2s(gp.p); g.fillStyle = '#3b82f6'; g.strokeStyle = '#fff'; g.lineWidth = 1; g.fillRect(s.x - 4, s.y - 4, 8, 8); g.strokeRect(s.x - 4.5, s.y - 4.5, 9, 9); }); });
    if (tracking) { const a = w2s(tracking.from), b = w2s(tracking.to); g.setLineDash([3, 4]); g.strokeStyle = 'rgba(250,204,21,.7)'; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); g.setLineDash([]); }
    if (winSel) {
      const a = w2s(winSel.a), b = w2s(winSel.b);
      const crossing = winSel.b.x < winSel.a.x;
      g.fillStyle = crossing ? 'rgba(34,197,94,.12)' : 'rgba(59,130,246,.12)'; g.strokeStyle = crossing ? '#22c55e' : '#3b82f6';
      g.setLineDash(crossing ? [5, 4] : []); g.fillRect(a.x, a.y, b.x - a.x, b.y - a.y); g.strokeRect(a.x, a.y, b.x - a.x, b.y - a.y); g.setLineDash([]);
    }
    // مؤشر الرسم والالتقاط
    if (cursor) {
      const s = w2s(cursor);
      g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(s.x - 14, s.y + 0.5); g.lineTo(s.x + 14, s.y + 0.5); g.moveTo(s.x + 0.5, s.y - 14); g.lineTo(s.x + 0.5, s.y + 14); g.stroke();
      if (!active) g.strokeRect(s.x - 4, s.y - 4, 8, 8);
      if (snapInfo && snapInfo.kind !== 'grid') {
        const p = w2s(snapInfo.p);
        g.strokeStyle = '#facc15'; g.lineWidth = 2;
        g.beginPath();
        if (snapInfo.kind === 'end') g.rect(p.x - 6, p.y - 6, 12, 12);
        else if (snapInfo.kind === 'mid') { g.moveTo(p.x, p.y - 7); g.lineTo(p.x + 7, p.y + 6); g.lineTo(p.x - 7, p.y + 6); g.closePath(); }
        else if (snapInfo.kind === 'cen') g.arc(p.x, p.y, 7, 0, Math.PI * 2);
        else if (snapInfo.kind === 'quad') { g.moveTo(p.x, p.y - 7); g.lineTo(p.x + 7, p.y); g.lineTo(p.x, p.y + 7); g.lineTo(p.x - 7, p.y); g.closePath(); }
        else { g.moveTo(p.x - 6, p.y - 6); g.lineTo(p.x + 6, p.y + 6); g.moveTo(p.x + 6, p.y - 6); g.lineTo(p.x - 6, p.y + 6); }
        g.stroke();
        g.fillStyle = '#facc15'; g.font = '11px ' + W.fontStack('IBM Plex Sans Arabic');
        g.fillText(W.t('k.s.' + snapInfo.kind), p.x + 10, p.y + 18);
      }
    }
  }
  function drawGrid(w, h) {
    let step = D.gridStep || 10;
    while (step * V.s < 12) step *= 5;
    while (step * V.s > 120) step /= 5;
    const tl = s2w(0, 0), br = s2w(w, h);
    g.fillStyle = 'rgba(255,255,255,.18)';
    const x0 = Math.floor(tl.x / step) * step, y0 = Math.floor(br.y / step) * step;
    if ((br.x - tl.x) / step * (tl.y - br.y) / step < 40000) {
      for (let x = x0; x <= br.x; x += step) for (let y = y0; y <= tl.y; y += step) { const s = w2s({ x, y }); const major = Math.abs(Math.round(x / step) % 5) === 0 && Math.abs(Math.round(y / step) % 5) === 0; g.fillRect(s.x - (major ? 1 : 0.5), s.y - (major ? 1 : 0.5), major ? 2 : 1, major ? 2 : 1); }
    }
  }
  function drawEnt(ctx, e, map, scale, o) {
    o = o || {};
    const L = layerOf(e);
    ctx.save();
    ctx.strokeStyle = o.preview ? '#facc15' : colorOf(e, o.print);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = o.print ? Math.max(0.5, (e.lw || L.lw || 0.25) * scale) : (o.sel ? 2 : 1.1);
    const lt = e.ltype || L.ltype || 'continuous';
    if (DASH[lt] && DASH[lt].length) ctx.setLineDash(DASH[lt].map((v) => v * (o.print ? scale * 0.5 : 1)));
    if (o.sel) { ctx.shadowColor = '#3b82f6'; ctx.shadowBlur = 6; }
    ctx.beginPath();
    if (e.type === 'line') { const a = map(e.a), b = map(e.b); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    else if (e.type === 'pline') {
      e.pts.forEach((p, i) => { const s = map(p); if (i) ctx.lineTo(s.x, s.y); else ctx.moveTo(s.x, s.y); });
      if (e.closed) ctx.closePath();
      if (e.fill && e.closed) { ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = e.fill; ctx.fill(); ctx.restore(); }
      ctx.stroke();
    } else if (e.type === 'circle') { const c = map(e.c); ctx.arc(c.x, c.y, e.r * scale, 0, Math.PI * 2); ctx.stroke(); }
    else if (e.type === 'arc') { const c = map(e.c); ctx.arc(c.x, c.y, e.r * scale, -e.a0 * D2R, -e.a1 * D2R, true); ctx.stroke(); }
    else if (e.type === 'point') { const c = map(e.p); ctx.moveTo(c.x - 3, c.y); ctx.lineTo(c.x + 3, c.y); ctx.moveTo(c.x, c.y - 3); ctx.lineTo(c.x, c.y + 3); ctx.stroke(); }
    else if (e.type === 'text') {
      const p = map(e.p);
      const px = e.h * scale;
      if (px >= 2) {
        ctx.translate(p.x, p.y); ctx.rotate(-(e.rot || 0) * D2R);
        ctx.font = (e.bold ? 700 : 400) + ' ' + px + 'px ' + W.fontStack(e.font || 'IBM Plex Sans Arabic');
        ctx.textBaseline = 'alphabetic';
        const rtl = /[؀-ۿ]/.test(e.text);
        ctx.direction = rtl ? 'rtl' : 'ltr';
        ctx.textAlign = e.align === 'center' ? 'center' : rtl ? 'right' : 'left';
        if (rtl && e.align !== 'center') { const wd = ctx.measureText(e.text).width; ctx.fillText(e.text, wd, 0); } else ctx.fillText(e.text, 0, 0);
      }
    } else if (e.type === 'dim') {
      const d = dimGeom(e);
      ctx.setLineDash([]);
      [[d.e1a, d.e1b], [d.e2a, d.e2b], [d.d1, d.d2]].forEach(([a, b]) => { const s1 = map(a), s2 = map(b); ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y); });
      ctx.stroke();
      // علامات الأسهم (مائلة معمارية)
      const tick = D.dimArrow * scale;
      [d.d1, d.d2].forEach((p) => { const s = map(p); ctx.beginPath(); ctx.moveTo(s.x - tick * Math.cos(-d.ang + Math.PI / 4), s.y - tick * Math.sin(-d.ang + Math.PI / 4)); ctx.lineTo(s.x + tick * Math.cos(-d.ang + Math.PI / 4), s.y + tick * Math.sin(-d.ang + Math.PI / 4)); ctx.lineWidth = (ctx.lineWidth || 1) * 1.6; ctx.stroke(); });
      const tp = map(dimTextPos(e));
      let a = -d.ang;
      if (a < -Math.PI / 2 || a > Math.PI / 2) a += Math.PI;
      const px = D.dimText * scale;
      if (px >= 2) {
        ctx.translate(tp.x, tp.y); ctx.rotate(a);
        ctx.font = px + 'px ' + W.fontStack('IBM Plex Sans Arabic'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'ltr';
        ctx.fillText(e.text || fmt(d.len), 0, 0);
      }
    }
    ctx.restore();
  }
  const fmt = (v) => (Math.round(v * Math.pow(10, D.prec)) / Math.pow(10, D.prec)).toFixed(D.prec);
  function grips(e) {
    if (e.type === 'line') return [{ p: e.a, k: 'a' }, { p: e.b, k: 'b' }, { p: mid(e.a, e.b), k: 'mid' }];
    if (e.type === 'pline') return e.pts.map((p, i) => ({ p, k: i }));
    if (e.type === 'circle') return [{ p: e.c, k: 'c' }, { p: { x: e.c.x + e.r, y: e.c.y }, k: 'r' }];
    if (e.type === 'arc') return [{ p: e.c, k: 'c' }, { p: polar(e.c, e.r, e.a0), k: 'a0' }, { p: polar(e.c, e.r, e.a1), k: 'a1' }];
    if (e.type === 'text' || e.type === 'point') return [{ p: e.p, k: 'p' }];
    if (e.type === 'dim') { const d = dimGeom(e); return [{ p: e.p1, k: 'p1' }, { p: e.p2, k: 'p2' }, { p: mid(d.d1, d.d2), k: 'off' }]; }
    return [];
  }
  function applyGrip(e, k, p) {
    if (e.type === 'line') { if (k === 'mid') { const m = mid(e.a, e.b), dx = p.x - m.x, dy = p.y - m.y; e.a = { x: e.a.x + dx, y: e.a.y + dy }; e.b = { x: e.b.x + dx, y: e.b.y + dy }; } else e[k] = p; }
    else if (e.type === 'pline') e.pts[k] = p;
    else if (e.type === 'circle') { if (k === 'c') e.c = p; else e.r = Math.max(1e-6, dist(e.c, p)); }
    else if (e.type === 'arc') { if (k === 'c') e.c = p; else { e[k] = angDeg(e.c, p); e.r = dist(e.c, p); } }
    else if (e.type === 'text' || e.type === 'point') e.p = p;
    else if (e.type === 'dim') { if (k === 'off') { const a = Math.atan2(e.p2.y - e.p1.y, e.p2.x - e.p1.x); e.off = (p.x - e.p1.x) * -Math.sin(a) + (p.y - e.p1.y) * Math.cos(a); } else e[k] = p; }
  }
  function extents() {
    if (!D.entities.length) return null;
    const bs = D.entities.map(bbox);
    return { x1: Math.min(...bs.map((b) => b.x1)), y1: Math.min(...bs.map((b) => b.y1)), x2: Math.max(...bs.map((b) => b.x2)), y2: Math.max(...bs.map((b) => b.y2)) };
  }
  function zoomExtents() {
    if (!D) return;
    const b = extents();
    if (!b) { V.cx = 50; V.cy = 50; V.s = Math.min(canvas.clientWidth, canvas.clientHeight) / 160; draw(); return; }
    V.cx = (b.x1 + b.x2) / 2; V.cy = (b.y1 + b.y2) / 2;
    V.s = Math.min((canvas.clientWidth - 80) / Math.max(1e-6, b.x2 - b.x1), (canvas.clientHeight - 80) / Math.max(1e-6, b.y2 - b.y1));
    V.s = W.clamp(V.s, 1e-4, 1e5);
    draw(); updateStatus();
  }

  /* ═══════════ الالتقاط ═══════════ */
  function snapPoints(e) {
    const out = [];
    if (e.type === 'line') out.push({ p: e.a, kind: 'end' }, { p: e.b, kind: 'end' }, { p: mid(e.a, e.b), kind: 'mid' });
    else if (e.type === 'pline') { e.pts.forEach((p) => out.push({ p, kind: 'end' })); segments(e).forEach(([a, b]) => out.push({ p: mid(a, b), kind: 'mid' })); }
    else if (e.type === 'circle') { out.push({ p: e.c, kind: 'cen' }); [0, 90, 180, 270].forEach((a) => out.push({ p: polar(e.c, e.r, a), kind: 'quad' })); }
    else if (e.type === 'arc') { out.push({ p: e.c, kind: 'cen' }, { p: polar(e.c, e.r, e.a0), kind: 'end' }, { p: polar(e.c, e.r, e.a1), kind: 'end' }); const m = e.a0 <= e.a1 ? (e.a0 + e.a1) / 2 : (e.a0 + e.a1 + 360) / 2; out.push({ p: polar(e.c, e.r, m), kind: 'mid' }); }
    else if (e.type === 'text' || e.type === 'point') out.push({ p: e.p, kind: 'end' });
    else if (e.type === 'dim') out.push({ p: e.p1, kind: 'end' }, { p: e.p2, kind: 'end' });
    return out;
  }
  function findSnap(raw, from) {
    const tol = 12 / V.s;
    let best = null;
    if (modes.osnap) {
      const near = D.entities.filter((e) => layerOf(e).visible !== false && (() => { const b = bbox(e); return raw.x >= b.x1 - tol && raw.x <= b.x2 + tol && raw.y >= b.y1 - tol && raw.y <= b.y2 + tol; })());
      near.forEach((e) => snapPoints(e).forEach((s) => { const d = dist(raw, s.p); if (d <= tol && (!best || d < best.d - 1e-9 || (Math.abs(d - best.d) < 1e-9 && s.kind === 'end'))) best = { p: s.p, kind: s.kind, d }; }));
      if (!best || best.kind !== 'end') {
        const close = near.filter((e) => hit(e, raw, tol * 1.5)).slice(0, 8);
        for (let i = 0; i < close.length; i++) for (let j = i + 1; j < close.length; j++) intersections(close[i], close[j]).forEach((p) => { const d = dist(raw, p); if (d <= tol && (!best || d < best.d)) best = { p, kind: 'int', d }; });
      }
    }
    if (best) return best;
    let p = raw;
    tracking = null;
    if (from && (modes.ortho || modes.polar)) {
      const a = angDeg(from, raw), r = dist(from, raw);
      const step = modes.ortho ? 90 : 45;
      const near = Math.round(a / step) * step;
      if (modes.ortho || Math.abs(near - a) < 4) { p = polar(from, r, near); tracking = { from, to: polar(from, r + 40 / V.s, near) }; }
    }
    if (modes.snap) { const st = D.gridStep || 10; p = { x: Math.round(p.x / st) * st, y: Math.round(p.y / st) * st }; return { p, kind: 'grid' }; }
    return { p, kind: null };
  }

  /* ═══════════ محرك الأوامر ═══════════ */
  let active = null; // { name, resolve, kind: 'point'|'number'|'select'|'pick'|'text', opts }
  let lastCmd = null;
  let winSel = null;
  let lastMouse = null;
  const cmdInput = $('#cmdinput'), promptEl = $('#prompt'), historyEl = $('#history');
  function log(text, cls) { historyEl.append(W.h('div', { class: 'k-log' + (cls ? ' ' + cls : ''), text })); while (historyEl.children.length > 60) historyEl.firstChild.remove(); historyEl.scrollTop = historyEl.scrollHeight; }
  function setPrompt(key, extra) { promptEl.textContent = key ? W.t(key) + (extra || '') + ':' : W.t('k.p.command') + ':'; }
  function request(kind, promptKey, opts) {
    return new Promise((resolve) => {
      active = Object.assign({ kind, resolve, prompt: promptKey }, opts || {});
      setPrompt(promptKey);
      cmdInput.value = '';
      updatePreview();
    });
  }
  const getPoint = (key, opts) => request('point', key, opts);
  const getNumber = (key, opts) => request('number', key, opts);
  const pickEntity = (key, opts) => request('pick', key, opts);
  function finish(val) {
    if (!active) return;
    const a = active; active = null; preview = []; tracking = null;
    setPrompt(null);
    a.resolve(val);
    draw();
  }
  function updatePreview() {
    preview = active && active.preview && cursor ? active.preview(cursor) || [] : [];
    draw();
  }
  /** تحليل الإدخال المكتوب: x,y أو @dx,dy أو @len<ang أو رقم (طول باتجاه المؤشر) */
  function parseInput(txt, from) {
    const t = String(txt).trim().replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x660).replace(/٫/g, '.').replace(/[،٬]/g, ',');
    let m;
    if ((m = /^@?\s*(-?[\d.]+)\s*<\s*(-?[\d.]+)$/.exec(t)) && from) return polar(from, +m[1], +m[2]);
    if ((m = /^@\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)$/.exec(t)) && from) return { x: from.x + +m[1], y: from.y + +m[2] };
    if ((m = /^(-?[\d.]+)\s*,\s*(-?[\d.]+)$/.exec(t))) return { x: +m[1], y: +m[2] };
    if ((m = /^(-?[\d.]+)$/.exec(t)) && from && cursor) { const a = Math.atan2(cursor.y - from.y, cursor.x - from.x); return { x: from.x + Math.cos(a) * +m[1], y: from.y + Math.sin(a) * +m[1] }; }
    return null;
  }
  async function runCommand(name) {
    const fn = COMMANDS[name];
    if (!fn) return;
    if (active) finish(null);
    if (busy) return;
    busy = true;
    lastCmd = name;
    log('▸ ' + W.t('k.' + name), 'cmd');
    try { await fn(); } catch (e) { console.error(e); }
    busy = false;
    preview = []; tracking = null;
    setPrompt(null);
    renderTools(); renderProps(); draw();
  }
  let busy = false;
  function add(e) { e.id = uid(); e.layer = e.layer || D.current; D.entities.push(e); return e; }
  async function selection(key) {
    if (sel.size) return D.entities.filter((e) => sel.has(e.id));
    selecting = true;
    const r = await request('select', key || 'k.p.select');
    selecting = false;
    return r ? D.entities.filter((e) => sel.has(e.id)) : null;
  }
  let selecting = false;

  /* الأوامر */
  const COMMANDS = {
    line: async () => {
      let p1 = await getPoint('k.p.first'); if (!p1) return;
      const start = p1; let n = 0;
      while (true) {
        const p2 = await getPoint('k.p.next', { from: p1, preview: (c) => [{ type: 'line', a: p1, b: c }] });
        if (!p2) break;
        if (p2 === 'close') { if (n >= 2) add({ type: 'line', a: p1, b: start }); break; }
        add({ type: 'line', a: p1, b: p2 }); n++; commit(); p1 = p2;
      }
      commit();
    },
    pline: async () => {
      const p1 = await getPoint('k.p.first'); if (!p1) return;
      const pts = [p1];
      while (true) {
        const last = pts[pts.length - 1];
        const p = await getPoint('k.p.next', { from: last, preview: (c) => [{ type: 'pline', pts: pts.concat([c]) }] });
        if (!p) break;
        if (p === 'close') { if (pts.length > 2) { add({ type: 'pline', pts, closed: true }); commit(); } return; }
        pts.push(p);
      }
      if (pts.length > 1) { add({ type: 'pline', pts, closed: false }); commit(); }
    },
    rect: async () => {
      const a = await getPoint('k.p.first'); if (!a) return;
      const rectPts = (b) => [a, { x: b.x, y: a.y }, b, { x: a.x, y: b.y }];
      const b = await getPoint('k.p.corner', { from: a, noTrack: true, relCorner: true, preview: (c) => [{ type: 'pline', pts: rectPts(c), closed: true }] });
      if (!b) return;
      add({ type: 'pline', pts: rectPts(b), closed: true }); commit();
    },
    polygon: async () => {
      const n = await getNumber('k.p.sides', { def: 6 }); if (!n) return;
      const sides = W.clamp(Math.round(n), 3, 64);
      const c = await getPoint('k.p.center'); if (!c) return;
      const ptsFor = (p) => { const r = dist(c, p), a0 = angDeg(c, p); return Array.from({ length: sides }, (_, i) => polar(c, r, a0 + i * 360 / sides)); };
      const p = await getPoint('k.p.radius', { from: c, preview: (q) => [{ type: 'pline', pts: ptsFor(q), closed: true }], numberAsRadius: true });
      if (!p) return;
      add({ type: 'pline', pts: ptsFor(p), closed: true }); commit();
    },
    circle: async () => {
      const c = await getPoint('k.p.center'); if (!c) return;
      const p = await getPoint('k.p.radius', { from: c, numberAsRadius: true, preview: (q) => [{ type: 'circle', c, r: dist(c, q) }, { type: 'line', a: c, b: q }] });
      if (!p) return;
      add({ type: 'circle', c, r: Math.max(1e-6, dist(c, p)) }); commit();
    },
    arc: async () => {
      const p1 = await getPoint('k.p.first'); if (!p1) return;
      const p2 = await getPoint('k.p.second', { from: p1, preview: (q) => [{ type: 'line', a: p1, b: q }] }); if (!p2) return;
      const p3 = await getPoint('k.p.third', { from: p2, preview: (q) => { const a = arc3(p1, p2, q); return a ? [a] : [{ type: 'line', a: p1, b: q }]; } }); if (!p3) return;
      const a = arc3(p1, p2, p3);
      if (a) { add(a); commit(); }
    },
    text: async () => {
      const p = await getPoint('k.p.textPos'); if (!p) return;
      const h = await getNumber('k.p.textH', { def: D.textH }); if (!h) return;
      D.textH = h;
      const v = await W.prompt(W.t('k.content'), '', { title: W.t('k.text') });
      if (!v) return;
      await W.ensureFont('IBM Plex Sans Arabic', 400);
      add({ type: 'text', p, h, text: v, rot: 0, layer: layerByKey('text') }); commit();
    },
    dim: async () => {
      const p1 = await getPoint('k.p.first'); if (!p1) return;
      const p2 = await getPoint('k.p.second', { from: p1, preview: (q) => [{ type: 'line', a: p1, b: q }] }); if (!p2) return;
      const offAt = (q) => { const a = Math.atan2(p2.y - p1.y, p2.x - p1.x); return (q.x - p1.x) * -Math.sin(a) + (q.y - p1.y) * Math.cos(a); };
      const q = await getPoint('k.p.dimOffset', { noTrack: true, preview: (c) => [{ type: 'dim', p1, p2, off: offAt(c) }] }); if (!q) return;
      add({ type: 'dim', p1, p2, off: offAt(q), layer: layerByKey('dims') }); commit();
    },
    dist: async () => {
      const a = await getPoint('k.p.first'); if (!a) return;
      const b = await getPoint('k.p.second', { from: a, preview: (q) => [{ type: 'line', a, b: q }] }); if (!b) return;
      log(W.t('k.distResult', { d: fmt(dist(a, b)), a: fmt(angDeg(a, b)), dx: fmt(b.x - a.x), dy: fmt(b.y - a.y) }), 'result');
    },
    move: async () => transformCmd(false),
    copy: async () => transformCmd(true),
    rotate: async () => {
      const ents = await selection(); if (!ents || !ents.length) return;
      const base = await getPoint('k.p.base'); if (!base) return;
      const rot = (a) => (e) => mapEnt(e, (p) => { const r = dist(base, p), t = angDeg(base, p) + a; return polar(base, r, t); }, { rot: a });
      const p = await getPoint('k.p.angle', { from: base, numberAsAngle: true, preview: (c) => ents.map(rot(angDeg(base, c))) });
      if (!p) return;
      const a = p.angle != null ? p.angle : angDeg(base, p);
      ents.forEach((e) => { const n = rot(a)(e); Object.assign(e, n, { id: e.id }); });
      commit();
    },
    scale: async () => {
      const ents = await selection(); if (!ents || !ents.length) return;
      const base = await getPoint('k.p.base'); if (!base) return;
      const ref = 10 / V.s * 5;
      const sc = (f) => (e) => mapEnt(e, (p) => ({ x: base.x + (p.x - base.x) * f, y: base.y + (p.y - base.y) * f }), { scale: f });
      const p = await getPoint('k.p.factor', { from: base, numberAsFactor: true, preview: (c) => ents.map(sc(Math.max(1e-6, dist(base, c) / ref))) });
      if (!p) return;
      const f = p.factor != null ? p.factor : Math.max(1e-6, dist(base, p) / ref);
      ents.forEach((e) => { const n = sc(f)(e); Object.assign(e, n, { id: e.id }); });
      commit();
    },
    mirror: async () => {
      const ents = await selection(); if (!ents || !ents.length) return;
      const a = await getPoint('k.p.mirror1'); if (!a) return;
      const mir = (b) => (e) => mapEnt(e, (p) => { const dx = b.x - a.x, dy = b.y - a.y, l = dx * dx + dy * dy || 1, t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / l; const f = { x: a.x + t * dx, y: a.y + t * dy }; return { x: 2 * f.x - p.x, y: 2 * f.y - p.y }; }, { mirror: true });
      const b = await getPoint('k.p.mirror2', { from: a, preview: (c) => ents.map(mir(c)).concat([{ type: 'line', a, b: c }]) }); if (!b) return;
      ents.forEach((e) => { const n = mir(b)(e); if (n.type === 'text') { n.p = n.p; } add(Object.assign(n, { id: undefined })); });
      commit();
    },
    offset: async () => {
      const d = await getNumber('k.p.offsetDist', { def: D.lastOffset || 10 }); if (!d) return;
      D.lastOffset = d;
      while (true) {
        const e = await pickEntity('k.p.offsetObj'); if (!e) break;
        const side = await getPoint('k.p.offsetSide', { preview: (c) => { const r = offsetEnt(e, d, c); return r ? [r] : []; } }); if (!side) break;
        const r = offsetEnt(e, d, side);
        if (r) { add(Object.assign(r, { layer: e.layer, color: e.color, ltype: e.ltype })); commit(); }
      }
    },
    trim: async () => {
      while (true) {
        const raw = await request('trim', 'k.p.trimObj');
        if (!raw) break;
        if (trimAt(raw)) commit();
      }
    },
    erase: async () => {
      const ents = await selection(); if (!ents) return;
      const ids = new Set(ents.map((e) => e.id));
      D.entities = D.entities.filter((e) => !ids.has(e.id));
      sel.clear(); commit();
    },
    explode: async () => {
      const ents = await selection(); if (!ents) return;
      ents.forEach((e) => {
        if (e.type !== 'pline') return;
        segments(e).forEach(([a, b]) => add({ type: 'line', a, b, layer: e.layer, color: e.color, ltype: e.ltype }));
        D.entities = D.entities.filter((x) => x !== e);
      });
      sel.clear(); commit();
    }
  };
  async function transformCmd(copy) {
    const ents = await selection(); if (!ents || !ents.length) return;
    const base = await getPoint('k.p.base'); if (!base) return;
    const mv = (to) => (e) => mapEnt(e, (p) => ({ x: p.x + to.x - base.x, y: p.y + to.y - base.y }));
    while (true) {
      const to = await getPoint(copy ? 'k.copies' : 'k.p.dest', { from: base, preview: (c) => ents.map(mv(c)) });
      if (!to) break;
      if (copy) ents.forEach((e) => add(Object.assign(mv(to)(e), { id: undefined })));
      else ents.forEach((e) => Object.assign(e, mv(to)(e), { id: e.id }));
      commit();
      if (!copy) break;
    }
  }
  function arc3(p1, p2, p3) {
    const ax = p1.x, ay = p1.y, bx = p2.x, by = p2.y, cx = p3.x, cy = p3.y;
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 1e-9) return null;
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
    const c = { x: ux, y: uy }, r = dist(c, p1);
    let a0 = angDeg(c, p1), a1 = angDeg(c, p3);
    // اتجاه القوس: يجب أن تقع النقطة الثانية بين البداية والنهاية عكس عقارب الساعة
    if (!inArc(angDeg(c, p2), a0, a1)) [a0, a1] = [a1, a0];
    return { type: 'arc', c, r, a0, a1 };
  }
  function offsetEnt(e, d, side) {
    if (e.type === 'line') {
      const a = Math.atan2(e.b.y - e.a.y, e.b.x - e.a.x), nx = -Math.sin(a), ny = Math.cos(a);
      const s = Math.sign((side.x - e.a.x) * nx + (side.y - e.a.y) * ny) || 1;
      return { type: 'line', a: { x: e.a.x + nx * d * s, y: e.a.y + ny * d * s }, b: { x: e.b.x + nx * d * s, y: e.b.y + ny * d * s } };
    }
    if (isRound(e)) { const out = dist(e.c, side) > e.r; const r = e.r + (out ? d : -d); if (r <= 0) return null; return Object.assign(clone(e), { r, id: undefined }); }
    if (e.type === 'pline') {
      let s;
      if (e.closed) { const inside = pointInPoly(side, e.pts); const ccw = polyArea(e.pts) > 0; s = (inside ? 1 : -1) * (ccw ? 1 : -1); }
      else {
        let best = null; segments(e).forEach(([a, b]) => { const dd = segDist(side, a, b); if (!best || dd < best.d) best = { a, b, d: dd }; });
        const ang = Math.atan2(best.b.y - best.a.y, best.b.x - best.a.x);
        s = Math.sign((side.x - best.a.x) * -Math.sin(ang) + (side.y - best.a.y) * Math.cos(ang)) || 1;
      }
      const segs = segments(e).map(([a, b]) => { const ang = Math.atan2(b.y - a.y, b.x - a.x), nx = -Math.sin(ang) * d * s, ny = Math.cos(ang) * d * s; return [{ x: a.x + nx, y: a.y + ny }, { x: b.x + nx, y: b.y + ny }]; });
      const pts = [];
      const n = segs.length;
      for (let i = 0; i < n; i++) {
        if (!e.closed && i === 0) pts.push(segs[0][0]);
        const cur = segs[i], nxt = segs[(i + 1) % n];
        if (!e.closed && i === n - 1) { pts.push(cur[1]); break; }
        const r = segInt(cur[0], cur[1], nxt[0], nxt[1]);
        pts.push(r ? r.p : cur[1]);
      }
      if (e.closed) pts.unshift(pts.pop());
      return { type: 'pline', pts, closed: e.closed };
    }
    return null;
  }
  /** قص الجزء المنقور من خط أو قوس أو دائرة بين نقاط التقاطع */
  function trimAt(p) {
    const tol = 8 / V.s;
    let target = D.entities.find((e) => (e.type === 'line' || isRound(e) || e.type === 'pline') && layerOf(e).visible !== false && !layerOf(e).locked && hit(e, p, tol));
    if (!target) return false;
    if (target.type === 'pline') {
      // نفك الخط المتعدد إلى خطوط ثم نقص الجزء
      const lines = segments(target).map(([a, b]) => ({ type: 'line', a, b, layer: target.layer, color: target.color, ltype: target.ltype, id: uid() }));
      D.entities.splice(D.entities.indexOf(target), 1, ...lines);
      target = lines.find((l) => hit(l, p, tol));
      if (!target) return true;
    }
    const others = D.entities.filter((e) => e !== target && layerOf(e).visible !== false && e.type !== 'text');
    const pts = [];
    others.forEach((o) => intersections(target, o).forEach((q) => pts.push(q)));
    if (target.type === 'line') {
      const L = dist(target.a, target.b);
      const tOf = (q) => ((q.x - target.a.x) * (target.b.x - target.a.x) + (q.y - target.a.y) * (target.b.y - target.a.y)) / (L * L);
      const ts = pts.map(tOf).filter((t) => t > 1e-6 && t < 1 - 1e-6).sort((a, b) => a - b);
      const tp = tOf(p);
      const lo = ts.filter((t) => t < tp).pop(), hi = ts.find((t) => t > tp);
      if (lo == null && hi == null) return false;
      const at = (t) => ({ x: target.a.x + t * (target.b.x - target.a.x), y: target.a.y + t * (target.b.y - target.a.y) });
      const pieces = [];
      if (lo != null) pieces.push({ a: target.a, b: at(lo) });
      if (hi != null) pieces.push({ a: at(hi), b: target.b });
      const idx = D.entities.indexOf(target);
      D.entities.splice(idx, 1, ...pieces.map((pc) => Object.assign(clone(target), pc, { id: uid() })));
      return true;
    }
    // دائرة أو قوس
    const angs = pts.map((q) => angDeg(target.c, q));
    const ap = angDeg(target.c, p);
    if (target.type === 'circle') {
      if (angs.length < 2) return false;
      const rel = (a) => normA(a - ap);
      const sorted = angs.slice().sort((a, b) => rel(a) - rel(b));
      const next = sorted[0], prev = sorted[sorted.length - 1];
      Object.assign(target, { type: 'arc', a0: next, a1: prev });
      return true;
    }
    const span = normA(target.a1 - target.a0) || 360;
    const rel = (a) => normA(a - target.a0);
    const inside = angs.map(rel).filter((r) => r > 1e-6 && r < span - 1e-6).sort((a, b) => a - b);
    const rp = rel(ap);
    const lo = inside.filter((r) => r < rp).pop(), hi = inside.find((r) => r > rp);
    if (lo == null && hi == null) return false;
    const pieces = [];
    if (lo != null) pieces.push({ a0: target.a0, a1: normA(target.a0 + lo) });
    if (hi != null) pieces.push({ a0: normA(target.a0 + hi), a1: target.a1 });
    D.entities.splice(D.entities.indexOf(target), 1, ...pieces.map((pc) => Object.assign(clone(target), pc, { id: uid() })));
    return true;
  }

  /* ═══════════ الماوس ولوحة المفاتيح ═══════════ */
  let pan = null, gripDrag = null, downAt = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (!D) return;
    canvas.setPointerCapture(e.pointerId);
    if (e.button === 1 || spaceDown) { pan = { x: e.clientX, y: e.clientY, cx: V.cx, cy: V.cy }; return; }
    if (e.button !== 0) return;
    const raw = s2w(e.offsetX, e.offsetY);
    downAt = { x: e.offsetX, y: e.offsetY, raw };
    if (active && active.kind === 'point') { const p = cursor || raw; finish(p); return; }
    if (active && active.kind === 'number') { const n = active.from ? dist(active.from, cursor || raw) : null; if (n) finish(n); return; }
    if (active && active.kind === 'pick') { const tol = 8 / V.s; const ent = D.entities.find((x) => layerOf(x).visible !== false && hit(x, raw, tol)); if (ent) finish(ent); return; }
    if (active && active.kind === 'trim') { finish(raw); return; }
    // مقابض العناصر المحددة
    if (!active && sel.size && sel.size <= 50) {
      for (const id of sel) {
        const ent = D.entities.find((x) => x.id === id);
        const gp = ent && grips(ent).find((q) => { const s = w2s(q.p); return Math.abs(s.x - e.offsetX) < 7 && Math.abs(s.y - e.offsetY) < 7; });
        if (gp) { gripDrag = { ent, k: gp.k, orig: clone(ent) }; return; }
      }
    }
    // التحديد
    const tol = 6 / V.s;
    const ent = [...D.entities].reverse().find((x) => layerOf(x).visible !== false && !layerOf(x).locked && hit(x, raw, tol));
    if (ent) {
      if (e.shiftKey) { if (sel.has(ent.id)) sel.delete(ent.id); else sel.add(ent.id); }
      else if (!sel.has(ent.id)) { if (!selecting) sel.clear(); sel.add(ent.id); }
      renderProps(); draw();
      return;
    }
    winSel = { a: raw, b: raw };
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!D) return;
    lastMouse = { x: e.offsetX, y: e.offsetY };
    if (pan) { V.cx = pan.cx - (e.clientX - pan.x) / V.s; V.cy = pan.cy + (e.clientY - pan.y) / V.s; draw(); return; }
    const raw = s2w(e.offsetX, e.offsetY);
    const needSnap = (active && (active.kind === 'point' || active.kind === 'number')) || gripDrag;
    if (needSnap) { const s = findSnap(raw, active && !active.noTrack ? active.from : (gripDrag ? null : null)); cursor = s.p; snapInfo = s.kind ? s : null; }
    else { cursor = raw; snapInfo = null; tracking = null; }
    status.item('pos').textContent = fmt(cursor.x) + ', ' + fmt(cursor.y);
    if (gripDrag) { applyGrip(gripDrag.ent, gripDrag.k, cursor); renderPropsSoon(); }
    if (winSel) winSel.b = raw;
    updatePreview();
  });
  canvas.addEventListener('pointerup', (e) => {
    if (pan) { pan = null; return; }
    if (gripDrag) { gripDrag = null; commit(); renderProps(); draw(); return; }
    if (winSel) {
      const a = winSel.a, b = winSel.b; winSel = null;
      const moved = downAt && Math.hypot(e.offsetX - downAt.x, e.offsetY - downAt.y) > 4;
      if (moved) {
        const x1 = Math.min(a.x, b.x), x2 = Math.max(a.x, b.x), y1 = Math.min(a.y, b.y), y2 = Math.max(a.y, b.y);
        const crossing = b.x < a.x;
        if (!e.shiftKey && !selecting) sel.clear();
        D.entities.forEach((ent) => {
          if (layerOf(ent).visible === false || layerOf(ent).locked) return;
          const bb = bbox(ent);
          const inside = bb.x1 >= x1 && bb.x2 <= x2 && bb.y1 >= y1 && bb.y2 <= y2;
          const touch = bb.x2 >= x1 && bb.x1 <= x2 && bb.y2 >= y1 && bb.y1 <= y2;
          if (inside || (crossing && touch && (segments(ent).some(([p, q]) => segRect(p, q, x1, y1, x2, y2)) || isRound(ent) || ent.type === 'text'))) sel.add(ent.id);
        });
      } else if (!e.shiftKey && !selecting) sel.clear();
      renderProps(); draw();
    }
  });
  function segRect(p, q, x1, y1, x2, y2) {
    const inR = (pt) => pt.x >= x1 && pt.x <= x2 && pt.y >= y1 && pt.y <= y2;
    if (inR(p) || inR(q)) return true;
    const edges = [[{ x: x1, y: y1 }, { x: x2, y: y1 }], [{ x: x2, y: y1 }, { x: x2, y: y2 }], [{ x: x2, y: y2 }, { x: x1, y: y2 }], [{ x: x1, y: y2 }, { x: x1, y: y1 }]];
    return edges.some(([a, b]) => { const r = segInt(p, q, a, b); return r && r.t >= 0 && r.t <= 1 && r.u >= 0 && r.u <= 1; });
  }
  canvas.addEventListener('wheel', (e) => {
    if (!D) return;
    e.preventDefault();
    const before = s2w(e.offsetX, e.offsetY);
    V.s = W.clamp(V.s * (e.deltaY < 0 ? 1.2 : 1 / 1.2), 1e-4, 1e5);
    const after = s2w(e.offsetX, e.offsetY);
    V.cx += before.x - after.x; V.cy += before.y - after.y;
    draw(); updateStatus();
  }, { passive: false });
  canvas.addEventListener('dblclick', (e) => {
    const raw = s2w(e.offsetX, e.offsetY);
    const ent = D && D.entities.find((x) => x.type === 'text' && hit(x, raw, 4 / V.s));
    if (ent) W.prompt(W.t('k.content'), ent.text, { title: W.t('k.text') }).then((v) => { if (v) { ent.text = v; commit(); draw(); renderProps(); } });
  });
  canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); if (active) { if (active.kind === 'select') finish(true); else finish(null); } else if (lastCmd) runCommand(lastCmd); });
  canvas.addEventListener('pointerleave', () => { cursor = null; snapInfo = null; draw(); });
  let spaceDown = false;
  window.addEventListener('keyup', (e) => { if (e.code === 'Space') spaceDown = false; });

  // سطر الأوامر: الكتابة في أي مكان تذهب إليه
  const ALIASES = {
    line: ['l', 'line', 'خط', 'خ'], pline: ['pl', 'pline', 'متعدد', 'خم'], rect: ['rec', 'rect', 'rectangle', 'مستطيل', 'مس'], polygon: ['pol', 'polygon', 'مضلع'], circle: ['c', 'circle', 'دائرة', 'د'], arc: ['a', 'arc', 'قوس', 'ق'],
    text: ['t', 'dt', 'text', 'نص', 'ن'], dim: ['dim', 'dal', 'di', 'بعد', 'ب'], dist: ['dist', 'me', 'قياس'], move: ['m', 'move', 'نقل'], copy: ['co', 'cp', 'copy', 'نسخ'], rotate: ['ro', 'rotate', 'تدوير'],
    scale: ['sc', 'scale', 'تحجيم'], mirror: ['mi', 'mirror', 'انعكاس'], offset: ['o', 'offset', 'إزاحة', 'ازاحة'], trim: ['tr', 'trim', 'قص'], erase: ['e', 'erase', 'del', 'حذف'], explode: ['x', 'explode', 'تفكيك']
  };
  function resolveAlias(t) { t = t.trim().toLowerCase(); return Object.keys(ALIASES).find((k) => ALIASES[k].includes(t)) || null; }
  cmdInput.addEventListener('keydown', (e) => {
    // اختصارات التحرير تعمل حتى والتركيز في سطر الأوامر
    if ((e.ctrlKey || e.metaKey) && !cmdInput.value) {
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
      if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); redo(); return; }
      if (k === 'a') { e.preventDefault(); if (D) { D.entities.forEach((x) => { if (layerOf(x).visible !== false && !layerOf(x).locked) sel.add(x.id); }); renderProps(); draw(); } return; }
      return;
    }
    e.stopPropagation();
    if (e.key === 'Escape') { e.preventDefault(); cmdInput.value = ''; if (active) finish(null); else { sel.clear(); renderProps(); draw(); } canvas.focus(); return; }
    // في برامج CAD تعمل المسافة مثل Enter في سطر الأوامر
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    submitInput();
  });
  function submitInput() {
    const v = cmdInput.value.trim();
    cmdInput.value = '';
    if (active) {
      if (!v) { finish(active.kind === 'select' ? true : null); return; }
      if (/^(c|close|إغلاق|اغلاق)$/i.test(v) && active.kind === 'point' && active.from) { log(v); finish('close'); return; }
      if (active.kind === 'number') { const n = parseFloat(v.replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x660)); if (!isNaN(n) && n > 0) { log(v); finish(n); } return; }
      if (active.kind === 'point') {
        if (active.numberAsAngle && /^-?[\d.]+$/.test(v)) { log(v); finish({ angle: parseFloat(v) }); return; }
        if (active.numberAsFactor && /^[\d.]+$/.test(v)) { log(v); finish({ factor: parseFloat(v) }); return; }
        if (active.numberAsRadius && /^[\d.]+$/.test(v) && active.from) { log(v); finish(polar(active.from, parseFloat(v), cursor ? angDeg(active.from, cursor) : 0)); return; }
        if (active.relCorner) { const m = /^@?\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)$/.exec(v); if (m && active.from) { log(v); finish({ x: active.from.x + +m[1], y: active.from.y + +m[2] }); return; } }
        const p = parseInput(v, active.from);
        if (p) { log(v); finish(p); } else W.toast(W.t('k.unknown', { c: v }), 'warning');
      }
      return;
    }
    if (!v) { if (lastCmd) runCommand(lastCmd); return; }
    const c = resolveAlias(v);
    if (c) runCommand(c); else W.toast(W.t('k.unknown', { c: v }), 'warning');
  }
  // إعادة توجيه الكتابة إلى سطر الأوامر
  window.addEventListener('keydown', (e) => {
    if (!D) return;
    if (e.code === 'Space' && document.activeElement !== cmdInput && !e.target.closest('input,textarea,select,[contenteditable="true"]')) {
      if (!cmdInput.value) { e.preventDefault(); if (active) submitInput(); else if (lastCmd) runCommand(lastCmd); return; }
    }
    if (e.target.closest('input,textarea,select,.w-dialog,[contenteditable="true"]')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') { e.preventDefault(); submitInput(); return; }
    if (e.key === 'Escape') { if (active) finish(null); else { sel.clear(); renderProps(); draw(); } return; }
    if (e.key.length === 1 && /[\p{L}\p{N}@<.,\-]/u.test(e.key)) { cmdInput.focus(); }
  }, true);

  /* ═══════════ السجل (تراجع) ═══════════ */
  const hist = { stack: [], index: -1 };
  function commit() {
    const s = JSON.stringify(D);
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1); hist.stack.push(s);
    if (hist.stack.length > 150) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
    renderPropsSoon();
  }
  function restore(s) { D = JSON.parse(s); const ids = new Set(D.entities.map((e) => e.id)); sel = new Set([...sel].filter((id) => ids.has(id))); renderLayers(); renderProps(); draw(); W.setDirty(true); }
  function undo() { if (active) finish(null); if (hist.index > 0) { hist.index--; restore(hist.stack[hist.index]); } }
  function redo() { if (hist.index < hist.stack.length - 1) { hist.index++; restore(hist.stack[hist.index]); } }

  /* ═══════════ الطبقات والخصائص ═══════════ */
  const layersEl = $('#layers'), propsEl = $('#props');
  function layerByKey(k) { const name = W.t('k.l.' + k); return D.layers.some((l) => l.name === name) ? name : D.current; }
  function renderLayers() {
    layersEl.innerHTML = '';
    if (!D) return;
    D.layers.forEach((l) => {
      const row = W.h('div', { class: 'w-list-item k-layer' + (l.name === D.current ? ' selected' : '') },
        W.iconButton(l.visible === false ? 'eye-off' : 'eye', 'k.visible', (e) => { e.stopPropagation(); l.visible = l.visible === false; commit(); renderLayers(); draw(); }, { cls: 'sm' }),
        W.iconButton(l.locked ? 'lock' : 'unlock', 'k.lock', (e) => { e.stopPropagation(); l.locked = !l.locked; commit(); renderLayers(); }, { cls: 'sm' + (l.locked ? '' : ' faint') }),
        (() => { const c = W.h('input', { type: 'color', class: 'w-color sm', value: l.color }); c.addEventListener('click', (e) => e.stopPropagation()); c.addEventListener('input', () => { l.color = c.value; draw(); }); c.addEventListener('change', () => commit()); return c; })(),
        W.h('span', { class: 'w-name', text: l.name }),
        W.h('span', { class: 'small muted', text: W.t('k.lt.' + (l.ltype || 'continuous')) }));
      row.addEventListener('click', () => { D.current = l.name; if (sel.size) { D.entities.forEach((e) => { if (sel.has(e.id)) e.layer = l.name; }); commit(); draw(); } renderLayers(); });
      row.addEventListener('dblclick', async () => { const v = await W.prompt(W.t('k.rename'), l.name); if (v && !D.layers.some((x) => x.name === v)) { D.entities.forEach((e) => { if (e.layer === l.name) e.layer = v; }); if (D.current === l.name) D.current = v; l.name = v; commit(); renderLayers(); } });
      row.addEventListener('contextmenu', (e) => W.contextMenu(e, [
        { i18n: 'k.lt.continuous', checked: () => (l.ltype || 'continuous') === 'continuous', action: () => { l.ltype = 'continuous'; commit(); renderLayers(); draw(); } },
        { i18n: 'k.lt.dashed', checked: () => l.ltype === 'dashed', action: () => { l.ltype = 'dashed'; commit(); renderLayers(); draw(); } },
        { i18n: 'k.lt.center', checked: () => l.ltype === 'center', action: () => { l.ltype = 'center'; commit(); renderLayers(); draw(); } },
        '-', { i18n: 'k.rename', action: () => row.dispatchEvent(new Event('dblclick')) },
        { i18n: 'cmd.delete', icon: 'trash', disabled: () => l.name === '0' || D.entities.some((x) => x.layer === l.name), action: () => { D.layers = D.layers.filter((x) => x !== l); if (D.current === l.name) D.current = '0'; commit(); renderLayers(); } }]));
      layersEl.append(row);
    });
  }
  async function newLayer() {
    if (!D) return;
    const v = await W.prompt(W.t('k.newLayer'), (W.lang === 'ar' ? 'طبقة ' : 'Layer ') + D.layers.length);
    if (!v || D.layers.some((l) => l.name === v)) return;
    const colors = ['#ef4444', '#facc15', '#22c55e', '#06b6d4', '#3b82f6', '#d946ef', '#f97316'];
    D.layers.push({ name: v, color: colors[D.layers.length % colors.length], visible: true, locked: false, ltype: 'continuous', lw: 0.25 });
    D.current = v;
    commit(); renderLayers();
  }
  const renderPropsSoon = W.debounce(() => renderProps(), 120);
  function renderProps() {
    propsEl.innerHTML = '';
    if (!D) return;
    const ents = D.entities.filter((e) => sel.has(e.id));
    if (!ents.length) {
      const units = W.h('select', { class: 'w-select sm' });
      [['mm', 'mm'], ['cm', 'cm'], ['m', 'm']].forEach(([v, l]) => units.append(W.h('option', { value: v, text: l })));
      units.value = D.units; units.addEventListener('change', () => { D.units = units.value; commit(); updateStatus(); });
      const prec = W.h('select', { class: 'w-select sm' });
      [0, 1, 2, 3, 4].forEach((n) => prec.append(W.h('option', { value: n, text: (0).toFixed(n) })));
      prec.value = D.prec; prec.addEventListener('change', () => { D.prec = +prec.value; commit(); draw(); });
      const grid = W.h('input', { class: 'w-input sm', type: 'number', value: D.gridStep, min: 0.001 });
      grid.addEventListener('change', () => { D.gridStep = Math.max(0.001, parseFloat(grid.value) || 10); commit(); draw(); });
      propsEl.append(W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('k.units') }), units), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('k.precision') }), prec), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('k.grid') }), grid)));
      return;
    }
    propsEl.append(W.h('div', { class: 'small muted', style: { marginBottom: '6px' }, text: ents.length === 1 ? W.t('k.' + ({ pline: 'pline', line: 'line', circle: 'circle', arc: 'arc', text: 'text', dim: 'dim', point: 'line' }[ents[0].type])) : W.t('k.count', { n: ents.length }) }));
    const lsel = W.h('select', { class: 'w-select sm', style: { width: '100%' } });
    D.layers.forEach((l) => lsel.append(W.h('option', { value: l.name, text: l.name })));
    lsel.value = ents.every((e) => e.layer === ents[0].layer) ? ents[0].layer : '';
    lsel.addEventListener('change', () => { ents.forEach((e) => { e.layer = lsel.value; }); commit(); draw(); });
    const col = W.h('input', { type: 'color', class: 'w-color sm', value: ents[0].color || layerOf(ents[0]).color });
    col.addEventListener('input', () => { ents.forEach((e) => { e.color = col.value; }); draw(); });
    col.addEventListener('change', () => commit());
    const byL = W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('k.byLayer'), onclick: () => { ents.forEach((e) => { delete e.color; }); commit(); draw(); renderProps(); } });
    const lt = W.h('select', { class: 'w-select sm' });
    [['', 'k.byLayer'], ['continuous', 'k.lt.continuous'], ['dashed', 'k.lt.dashed'], ['center', 'k.lt.center']].forEach(([v, k]) => lt.append(W.h('option', { value: v, text: W.t(k) })));
    lt.value = ents[0].ltype || '';
    lt.addEventListener('change', () => { ents.forEach((e) => { if (lt.value) e.ltype = lt.value; else delete e.ltype; }); commit(); draw(); });
    propsEl.append(W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('k.layer') }), lsel), W.h('div', { class: 'row', style: { gap: '6px', margin: '6px 0' } }, W.h('span', { class: 'small muted', text: W.t('k.color') }), col, byL), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('k.ltype') }), lt));
    if (ents.length !== 1) return;
    const e = ents[0];
    const num = (label, val, fn) => { const i = W.h('input', { class: 'w-input sm', type: 'number', value: fmt(val), step: Math.pow(10, -D.prec) }); i.addEventListener('change', () => { const v = parseFloat(i.value); if (!isNaN(v)) { fn(v); commit(); draw(); renderPropsSoon(); } }); return W.h('div', { class: 'w-field' }, W.h('label', { text: label }), i); };
    const ro = (label, val) => W.h('div', { class: 'k-ro' }, W.h('span', { class: 'muted', text: label }), W.h('span', { text: val }));
    const pt = (label, p, fn) => W.h('div', { class: 'w-input-group' }, num(label + ' X', p.x, (v) => fn({ x: v, y: p.y })), num(label + ' Y', p.y, (v) => fn({ x: p.x, y: v })));
    if (e.type === 'line') { propsEl.append(pt('A', e.a, (p) => { e.a = p; }), pt('B', e.b, (p) => { e.b = p; }), ro(W.t('k.length'), fmt(dist(e.a, e.b))), ro(W.t('k.angle'), fmt(angDeg(e.a, e.b)) + '°')); }
    if (e.type === 'circle' || e.type === 'arc') {
      propsEl.append(pt('C', e.c, (p) => { e.c = p; }), num(W.t('k.radius'), e.r, (v) => { e.r = Math.max(1e-6, v); }));
      if (e.type === 'circle') propsEl.append(ro(W.t('k.area'), fmt(Math.PI * e.r * e.r)), ro(W.t('k.perimeter'), fmt(2 * Math.PI * e.r)));
      else propsEl.append(ro(W.t('k.length'), fmt(e.r * (normA(e.a1 - e.a0) || 360) * D2R)));
    }
    if (e.type === 'pline') {
      const per = segments(e).reduce((s, [a, b]) => s + dist(a, b), 0);
      propsEl.append(ro(W.t(e.closed ? 'k.perimeter' : 'k.length'), fmt(per)));
      if (e.closed) propsEl.append(ro(W.t('k.area'), fmt(Math.abs(polyArea(e.pts)))));
      const cl = W.h('input', { type: 'checkbox' }); cl.checked = !!e.closed; cl.addEventListener('change', () => { e.closed = cl.checked; commit(); draw(); renderProps(); });
      propsEl.append(W.h('label', { class: 'w-check-row' }, cl, W.h('span', { text: W.t('k.closed') })));
      if (e.closed) {
        const fc = W.h('input', { type: 'checkbox' }); fc.checked = !!e.fill; fc.addEventListener('change', () => { e.fill = fc.checked ? (e.color || layerOf(e).color) : null; commit(); draw(); });
        propsEl.append(W.h('label', { class: 'w-check-row' }, fc, W.h('span', { text: W.t('k.fill') })));
      }
    }
    if (e.type === 'text') {
      const ta = W.h('input', { class: 'w-input', value: e.text, dir: 'auto', style: { width: '100%' } });
      ta.addEventListener('change', () => { e.text = ta.value; commit(); draw(); });
      propsEl.append(W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('k.content') }), ta), pt('P', e.p, (p) => { e.p = p; }), W.h('div', { class: 'w-input-group' }, num(W.t('k.height'), e.h, (v) => { e.h = Math.max(1e-6, v); }), num(W.t('k.angle'), e.rot || 0, (v) => { e.rot = v; })));
    }
    if (e.type === 'dim') propsEl.append(ro(W.t('k.length'), fmt(dist(e.p1, e.p2))));
  }

  /* ═══════════ الملفات ═══════════ */
  function newDoc() {
    return {
      app: 'mukhattat', version: 1, units: 'mm', prec: 2, gridStep: 10, textH: 5, dimText: 3.5, dimArrow: 2, dimExt: 2, dimGap: 1.5,
      layers: [{ name: '0', color: '#ffffff', visible: true, locked: false, ltype: 'continuous', lw: 0.25 }, { name: W.t('k.l.walls'), color: '#f97316', visible: true, locked: false, ltype: 'continuous', lw: 0.5 }, { name: W.t('k.l.dims'), color: '#22c55e', visible: true, locked: false, ltype: 'continuous', lw: 0.18 }, { name: W.t('k.l.text'), color: '#facc15', visible: true, locked: false, ltype: 'continuous', lw: 0.25 }],
      current: '0', entities: []
    };
  }
  function startDoc(d, meta) {
    D = d;
    D.entities.forEach((e) => { if (!e.id) e.id = uid(); });
    sel.clear();
    hist.stack = []; hist.index = -1; commit(); W.setDirty(false);
    meta = meta || {};
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: false });
    welcome.hide();
    document.body.classList.add('has-doc');
    renderLayers(); renderProps(); renderTools();
    requestAnimationFrame(() => { zoomExtents(); cmdInput.focus(); });
  }
  async function newFlow() { if (await W.confirmDiscard()) startDoc(newDoc()); }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'رسومات', en: 'Drawings' }, ext: ['mukhattat', 'dxf'] }], as: 'text' });
    if (f[0]) loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { loadFile(await W.files.readPath(p, 'text')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  function loadFile(f) {
    try {
      const text = typeof f.data === 'string' ? f.data : W.files.decodeText(new Uint8Array(f.data));
      if (f.ext === 'dxf' || /^\s*0\s*\r?\n\s*SECTION/.test(text)) {
        const r = WarshaDXF.parse(text);
        const d = newDoc();
        r.layers.forEach((l) => { const ex = d.layers.find((x) => x.name === l.name); if (ex) Object.assign(ex, { color: l.color, visible: l.visible }); else d.layers.push({ name: l.name, color: l.color, visible: l.visible, locked: false, ltype: 'continuous', lw: 0.25 }); });
        r.entities.forEach((e) => { if (!d.layers.some((l) => l.name === e.layer)) d.layers.push({ name: e.layer, color: '#ffffff', visible: true, locked: false, ltype: 'continuous', lw: 0.25 }); if (!e.color) delete e.color; e.id = uid(); d.entities.push(e); });
        startDoc(d, { name: f.name, path: null });
        W.setDoc({ name: W.files.base(f.name) + '.mukhattat' });
      } else {
        const d = JSON.parse(text);
        if (d.app !== 'mukhattat') throw new Error('bad');
        startDoc(d, { name: f.name, path: f.path });
        if (f.path) W.recent.add(f.path, f.name);
      }
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : (W.lang === 'ar' ? 'مخطط' : 'drawing'));
  async function save(as) {
    if (!D) return;
    const res = await W.files.save({ data: JSON.stringify(D), name: baseName() + '.mukhattat', path: as ? null : (W.doc.path && /\.mukhattat$/.test(W.doc.path) ? W.doc.path : null), types: [{ name: { ar: 'مخطط', en: 'Mukhattat drawing' }, ext: ['mukhattat'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }
  function dxfDoc() {
    const ents = D.entities.map((e) => {
      if (e.type !== 'dim') return e;
      // الأبعاد ت\u064Fصد\u0651ر كخطوط ونص لضمان التوافق
      const d = dimGeom(e);
      return [{ type: 'lines', layer: e.layer, color: e.color, list: [{ a: d.e1a, b: d.e1b }, { a: d.e2a, b: d.e2b }, { a: d.d1, b: d.d2 }] }, { type: 'text', layer: e.layer, color: e.color, p: dimTextPos(e), h: D.dimText, text: e.text || fmt(d.len), rot: normA(d.ang / D2R) }];
    }).flat();
    return { units: D.units, layers: D.layers, entities: ents };
  }
  async function exportDXF() {
    if (!D) return;
    const res = await W.files.save({ data: WarshaDXF.write(dxfDoc()), name: baseName() + '.dxf', types: [{ name: { ar: 'رسم DXF', en: 'DXF drawing' }, ext: ['dxf'] }] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }
  /** SVG بخلفية بيضاء وخطوط سوداء للطباعة */
  function exportSVGString(pad) {
    const b = extents() || { x1: 0, y1: 0, x2: 100, y2: 100 };
    pad = pad == null ? Math.max(b.x2 - b.x1, b.y2 - b.y1) * 0.04 : pad;
    const x1 = b.x1 - pad, y1 = b.y1 - pad, w = b.x2 - b.x1 + pad * 2, h = b.y2 - b.y1 + pad * 2;
    const tx = (p) => ({ x: p.x - x1, y: y1 + h - p.y });
    const out = [];
    const sw = (e) => Math.max(0.08, e.lw || layerOf(e).lw || 0.25);
    const dash = (e) => { const lt = e.ltype || layerOf(e).ltype; return lt === 'dashed' ? ' stroke-dasharray="' + w / 150 + ' ' + w / 250 + '"' : lt === 'center' ? ' stroke-dasharray="' + w / 80 + ' ' + w / 300 + ' ' + w / 600 + ' ' + w / 300 + '"' : ''; };
    D.entities.forEach((e) => {
      if (layerOf(e).visible === false) return;
      const c = colorOf(e, true);
      const st = ' stroke="' + c + '" stroke-width="' + sw(e) + '" fill="none"' + dash(e);
      if (e.type === 'line') { const a = tx(e.a), bb = tx(e.b); out.push('<line x1="' + a.x + '" y1="' + a.y + '" x2="' + bb.x + '" y2="' + bb.y + '"' + st + '/>'); }
      else if (e.type === 'pline') out.push('<' + (e.closed ? 'polygon' : 'polyline') + ' points="' + e.pts.map((p) => { const q = tx(p); return q.x + ',' + q.y; }).join(' ') + '"' + (e.fill && e.closed ? st.replace('fill="none"', 'fill="' + e.fill + '" fill-opacity="0.35"') : st) + '/>');
      else if (e.type === 'circle') { const q = tx(e.c); out.push('<circle cx="' + q.x + '" cy="' + q.y + '" r="' + e.r + '"' + st + '/>'); }
      else if (e.type === 'arc') { const p0 = tx(polar(e.c, e.r, e.a0)), p1 = tx(polar(e.c, e.r, e.a1)); const large = normA(e.a1 - e.a0) > 180 ? 1 : 0; out.push('<path d="M' + p0.x + ' ' + p0.y + ' A' + e.r + ' ' + e.r + ' 0 ' + large + ' 0 ' + p1.x + ' ' + p1.y + '"' + st + '/>'); }
      else if (e.type === 'text') { const q = tx(e.p); const rtl = /[؀-ۿ]/.test(e.text); out.push('<text x="' + q.x + '" y="' + q.y + '" font-size="' + e.h + '" font-family="' + W.escape(W.fontStack(e.font || 'IBM Plex Sans Arabic')) + '" fill="' + c + '"' + (rtl ? ' direction="rtl" text-anchor="end"' : '') + (e.rot ? ' transform="rotate(' + (-e.rot) + ' ' + q.x + ' ' + q.y + ')"' : '') + '>' + W.escape(e.text) + '</text>'); }
      else if (e.type === 'dim') {
        const d = dimGeom(e);
        [[d.e1a, d.e1b], [d.e2a, d.e2b], [d.d1, d.d2]].forEach(([p, q]) => { const a = tx(p), bb = tx(q); out.push('<line x1="' + a.x + '" y1="' + a.y + '" x2="' + bb.x + '" y2="' + bb.y + '" stroke="' + c + '" stroke-width="' + sw(e) + '"/>'); });
        [d.d1, d.d2].forEach((p) => { const q = tx(p), t = D.dimArrow, a = -d.ang + Math.PI / 4; out.push('<line x1="' + (q.x - t * Math.cos(a)) + '" y1="' + (q.y - t * Math.sin(a)) + '" x2="' + (q.x + t * Math.cos(a)) + '" y2="' + (q.y + t * Math.sin(a)) + '" stroke="' + c + '" stroke-width="' + sw(e) * 1.8 + '"/>'); });
        const tp = tx(dimTextPos(e));
        let a = -d.ang / D2R; if (a < -90 || a > 90) a += 180;
        out.push('<text x="' + tp.x + '" y="' + tp.y + '" font-size="' + D.dimText + '" text-anchor="middle" dominant-baseline="middle" fill="' + c + '" font-family="' + W.escape(W.fontStack('IBM Plex Sans Arabic')) + '" transform="rotate(' + a + ' ' + tp.x + ' ' + tp.y + ')">' + W.escape(e.text || fmt(d.len)) + '</text>');
      }
    });
    return { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + D.units + '" height="' + h + D.units + '"><rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#fff"/>' + out.join('') + '</svg>', w, h };
  }
  async function exportSVG() {
    if (!D) return;
    const res = await W.files.save({ data: exportSVGString().svg, name: baseName() + '.svg', types: [{ name: { ar: 'رسم SVG', en: 'SVG' }, ext: ['svg'] }] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }
  async function exportPNG() {
    if (!D) return;
    const s = exportSVGString();
    const scale = Math.min(4000 / s.w, 4000 / s.h, 20);
    const c = await W.rasterizeSVG(s.svg.replace(/width="[^"]+" height="[^"]+"/, 'width="' + s.w + '" height="' + s.h + '"'), s.w, s.h, scale, '#ffffff');
    const res = await W.files.save({ data: await W.canvasToBytes(c, 'image/png'), name: baseName() + '.png', types: [{ name: { ar: 'صورة PNG', en: 'PNG' }, ext: ['png'] }] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }
  async function exportPDF() {
    if (!D) return;
    const v = await W.form(W.t('k.exportPdf'), [
      { key: 'paper', i18n: 'k.paper', type: 'select', value: 'A4 landscape', options: ['A4 landscape', 'A4 portrait', 'A3 landscape', 'A3 portrait'].map((p) => ({ value: p, label: p })) },
      { key: 'scale', i18n: 'k.scale1', type: 'select', value: 'fit', options: [{ value: 'fit', label: W.t('k.fitPaper') }].concat([1, 2, 5, 10, 20, 50, 100, 200, 500].map((n) => ({ value: String(n), label: '1:' + n }))) }
    ]);
    if (!v) return;
    const s = exportSVGString(0);
    const [paper, orient] = v.paper.split(' ');
    const dims = { A4: [210, 297], A3: [297, 420] }[paper];
    const pw = orient === 'landscape' ? dims[1] : dims[0], ph = orient === 'landscape' ? dims[0] : dims[1];
    const m = 10;
    const toMM = { mm: 1, cm: 10, m: 1000 }[D.units] || 1;
    let wmm, hmm;
    if (v.scale === 'fit') { const k = Math.min((pw - 2 * m) / s.w, (ph - 2 * m) / s.h); wmm = s.w * k; hmm = s.h * k; }
    else { wmm = s.w * toMM / +v.scale; hmm = s.h * toMM / +v.scale; }
    const svg = s.svg.replace(/width="[^"]+" height="[^"]+"/, 'width="' + wmm + 'mm" height="' + hmm + 'mm"');
    const label = '<div class="tb">' + W.escape(baseName()) + ' • ' + (v.scale === 'fit' ? '' : '1:' + v.scale + ' • ') + D.units + ' • ' + W.escape(W.L(W.registry.developer.name)) + '</div>';
    await W.exportPDF(W.printDocument('<div class="sheet">' + svg + label + '</div>', { pageSize: paper + ' ' + orient, css: '.sheet{width:' + pw + 'mm;height:' + ph + 'mm;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.tb{position:absolute;bottom:4mm;inset-inline-end:6mm;font:8pt sans-serif;color:#555}' }), baseName());
  }

  /* ═══════════ الواجهة ═══════════ */
  const DRAW_TOOLS = [['line', 'line', 'L'], ['pline', 'polyline', 'PL'], ['rect', 'rect', 'REC'], ['polygon', 'polygon', 'POL'], ['circle', 'circle', 'C'], ['arc', 'arc', 'A'], ['text', 'text', 'T'], ['dim', 'dimension', 'DIM'], ['dist', 'ruler', 'DIST']];
  const MOD_TOOLS = [['move', 'move', 'M'], ['copy', 'copy', 'CO'], ['rotate', 'rotate-ccw', 'RO'], ['scale', 'resize', 'SC'], ['mirror', 'flip-h', 'MI'], ['offset', 'layers', 'O'], ['trim', 'scissors', 'TR'], ['explode', 'shapes', 'X'], ['erase', 'trash', 'E']];
  const toolsEl = $('#tools');
  function renderTools() {
    toolsEl.innerHTML = '';
    DRAW_TOOLS.forEach(([c, icon, key]) => toolsEl.append(W.iconButton(icon, 'k.' + c, () => runCommand(c), { shortcut: key, cls: lastCmd === c && busy ? 'active' : '' })));
    toolsEl.append(W.h('div', { class: 'w-sep' }));
    MOD_TOOLS.forEach(([c, icon, key]) => toolsEl.append(W.iconButton(icon, 'k.' + c, () => runCommand(c), { shortcut: key, cls: lastCmd === c && busy ? 'active' : '' })));
  }
  const toggles = $('#toggles');
  function renderToggles() {
    toggles.innerHTML = '';
    [['grid', 'k.grid', 'F7'], ['snap', 'k.snap', 'F9'], ['ortho', 'k.ortho', 'F8'], ['polar', 'k.polar', 'F10'], ['osnap', 'k.osnap', 'F3']].forEach(([k, label, key]) => {
      const b = W.h('button', { class: 'k-toggle' + (modes[k] ? ' on' : ''), type: 'button', 'data-tip': label, 'data-shortcut': key, text: W.t(label) });
      b.addEventListener('click', () => { modes[k] = !modes[k]; if (k === 'ortho' && modes.ortho) modes.polar = false; if (k === 'polar' && modes.polar) modes.ortho = false; renderToggles(); draw(); });
      toggles.append(b);
    });
  }
  function updateStatus() { if (!D) return; status.item('zoom').textContent = D.units + ' • ' + D.entities.length; }
  const needD = () => !D;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'k.newDrawing', icon: 'file-plus', shortcut: 'Mod+N', action: newFlow },
      { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), disabled: needD, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), disabled: needD, global: true },
      { i18n: 'cmd.export', icon: 'export', disabled: needD, submenu: [{ i18n: 'k.exportDxf', action: exportDXF }, { i18n: 'k.exportSvg', action: exportSVG }, { i18n: 'k.exportPng', action: exportPNG }, { i18n: 'k.exportPdf', action: exportPDF }] },
      { i18n: 'cmd.print', icon: 'print', shortcut: 'Mod+P', action: exportPDF, disabled: needD },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: () => { if (D) { D.entities.forEach((e) => { if (layerOf(e).visible !== false && !layerOf(e).locked) sel.add(e.id); }); renderProps(); draw(); } } },
      { i18n: 'k.erase', icon: 'trash', shortcut: 'Delete', action: () => runCommand('erase'), disabled: () => !sel.size }
    ] },
    { i18n: 'k.menuDraw', items: DRAW_TOOLS.map(([c, icon, key]) => ({ i18n: 'k.' + c, icon, action: () => runCommand(c), disabled: needD, label: key })) },
    { i18n: 'k.menuModify', items: MOD_TOOLS.map(([c, icon]) => ({ i18n: 'k.' + c, icon, action: () => runCommand(c), disabled: needD })) },
    { i18n: 'menu.view', items: [
      { i18n: 'k.zoomExt', icon: 'fit', shortcut: 'Mod+0', action: zoomExtents },
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => { V.s *= 1.4; draw(); } },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => { V.s /= 1.4; draw(); } },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus, shortcuts: DRAW_TOOLS.concat(MOD_TOOLS).map((t) => ['k.' + t[0], t[2]]).concat([['k.osnap', 'F3'], ['k.grid', 'F7'], ['k.ortho', 'F8'], ['k.snap', 'F9']]) });
  const status = chrome.status;
  W.keys.bind('Backspace', () => { if (!active && sel.size) runCommand('erase'); });
  W.keys.bind('F3', () => { modes.osnap = !modes.osnap; renderToggles(); }, { global: true });
  W.keys.bind('F7', () => { modes.grid = !modes.grid; renderToggles(); draw(); }, { global: true });
  W.keys.bind('F8', () => { modes.ortho = !modes.ortho; if (modes.ortho) modes.polar = false; renderToggles(); }, { global: true });
  W.keys.bind('F9', () => { modes.snap = !modes.snap; renderToggles(); }, { global: true });
  W.keys.bind('F10', () => { modes.polar = !modes.polar; if (modes.polar) modes.ortho = false; renderToggles(); }, { global: true });
  const tb = $('#toolbar');
  tb.prepend(W.iconButton('file-plus', 'k.newDrawing', newFlow), W.iconButton('folder', 'cmd.open', open), W.iconButton('save', 'cmd.save', () => save(false)), W.h('div', { class: 'w-sep' }),
    W.iconButton('undo', 'cmd.undo', undo), W.iconButton('redo', 'cmd.redo', redo), W.h('div', { class: 'w-sep' }),
    W.iconButton('fit', 'k.zoomExt', zoomExtents), W.h('div', { class: 'w-sep' }),
    W.iconButton('file-pdf', 'k.exportPdf', exportPDF), W.iconButton('export', 'k.exportDxf', exportDXF));
  $('#newlayer').addEventListener('click', newLayer);
  window.addEventListener('keydown', (e) => { if (e.code === 'Space' && e.target === document.body) spaceDown = true; });

  const welcome = W.welcome(stage, {
    text: 'k.welcomeText',
    actions: [{ i18n: 'k.newDrawing', icon: 'file-plus', primary: true, action: newFlow }, { i18n: 'k.importDxf', icon: 'folder', action: open }],
    openRecent: openPath
  });
  W.dropZone(stage, async (files) => {
    const f = files.find((x) => x.ext === 'dxf' || x.ext === 'mukhattat');
    if (f && (await W.confirmDiscard())) loadFile({ name: f.name, path: f.path, ext: f.ext, data: f.data });
  });
  W.onExternalFile((f) => loadFile(f), 'text');
  W.on('langchange', () => { renderTools(); renderToggles(); renderLayers(); renderProps(); setPrompt(active ? active.prompt : null); });
  new ResizeObserver(() => draw()).observe(stage);
  renderTools(); renderToggles(); setPrompt(null); draw();

  window.__mukhattat = {
    get D() { return D; }, get sel() { return sel; }, get active() { return active; }, V, w2s, s2w, runCommand, submit: (t) => { cmdInput.value = t; submitInput(); }, startDoc, newDoc, zoomExtents, exportSVGString, dxfDoc, loadFile, intersections, trimAt, offsetEnt, arc3, undo, redo, modes
  };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const x = intersections({ type: 'line', a: { x: 0, y: 0 }, b: { x: 10, y: 10 } }, { type: 'line', a: { x: 0, y: 10 }, b: { x: 10, y: 0 } });
      if (x.length !== 1 || Math.abs(x[0].x - 5) > 1e-9) errors.push('line-line');
      const c = intersections({ type: 'line', a: { x: -10, y: 0 }, b: { x: 10, y: 0 } }, { type: 'circle', c: { x: 0, y: 0 }, r: 5 });
      if (c.length !== 2) errors.push('line-circle ' + c.length);
      const a = arc3({ x: 10, y: 0 }, { x: 0, y: 10 }, { x: -10, y: 0 });
      if (!a || Math.abs(a.r - 10) > 1e-9 || Math.abs(a.a0) > 1e-6 || Math.abs(a.a1 - 180) > 1e-6) errors.push('arc3 ' + JSON.stringify(a));
      const dx = WarshaDXF.parse(WarshaDXF.write({ units: 'mm', layers: [{ name: 'جدران', color: '#ff0000' }], entities: [{ type: 'line', layer: 'جدران', a: { x: 0, y: 0 }, b: { x: 5, y: 5 } }, { type: 'text', layer: 'جدران', p: { x: 1, y: 1 }, h: 2, text: 'غرفة' }] }));
      if (dx.entities.length !== 2 || dx.entities[1].text !== 'غرفة' || dx.entities[0].layer !== 'جدران') errors.push('dxf roundtrip ' + JSON.stringify(dx));
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
