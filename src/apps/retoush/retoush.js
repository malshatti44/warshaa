/* رتوش Retoush — محرر صور بالطبقات */
(function () {
  'use strict';
  const IMG = globalThis.WarshaImg;

  W.init({
    id: 'retoush',
    i18n: {
      ar: {
        't.move': 'تحريك', 't.rect': 'تحديد مستطيل', 't.ellipse': 'تحديد بيضاوي', 't.lasso': 'تحديد حر (لاسو)', 't.wand': 'العصا السحرية', 't.crop': 'قص',
        't.brush': 'فرشاة', 't.eraser': 'ممحاة', 't.bucket': 'دلو الطلاء', 't.gradient': 'تدرج لوني', 't.dropper': 'قطارة الألوان', 't.text': 'نص', 't.shape': 'أشكال',
        't.hand': 'يد (تحريك العرض)', 't.zoom': 'تكبير', 'r.size': 'الحجم', 'r.hardness': 'الصلابة', 'r.tolerance': 'التفاوت', 'r.fgColor': 'لون الواجهة',
        'r.bgColor': 'لون الخلفية', 'r.swap': 'تبديل الألوان', 'r.resetColors': 'الألوان الافتراضية', 'r.colors': 'الألوان', 'r.history': 'السجل',
        'r.newLayer': 'طبقة جديدة', 'r.dupLayer': 'تكرار الطبقة', 'r.delLayer': 'حذف الطبقة', 'r.mergeDown': 'دمج مع الطبقة السفلى', 'r.flatten': 'تسطيح الصورة',
        'r.placeImage': 'إضافة صورة كطبقة…', 'r.layerProps': 'خصائص الطبقة', 'r.blend': 'نمط المزج', 'r.background': 'الخلفية', 'r.layer': 'طبقة {n}',
        'r.textLayer': 'نص', 'r.newDoc': 'مستند جديد', 'r.preset': 'قالب جاهز', 'r.bgFill': 'تعبئة الخلفية', 'r.white': 'أبيض', 'r.transparent': 'شفاف', 'r.fg': 'لون الواجهة',
        'r.imageSize': 'حجم الصورة…', 'r.canvasSize': 'حجم اللوحة…', 'r.rotate90': 'تدوير 90° مع عقارب الساعة', 'r.rotate90ccw': 'تدوير 90° عكس عقارب الساعة', 'r.rotate180': 'تدوير 180°',
        'r.flipH': 'قلب أفقي', 'r.flipV': 'قلب عمودي', 'r.cropSel': 'قص إلى التحديد', 'r.adjustments': 'تعديلات', 'r.brightness': 'السطوع والتباين…',
        'r.hueSat': 'الصبغة والتشبع…', 'r.exposure': 'التعريض…', 'r.colorBalance': 'توازن الألوان…', 'r.vibrance': 'الحيوية…', 'r.grayscale': 'تدرج رمادي',
        'r.invert': 'عكس الألوان', 'r.sepia': 'بني عتيق', 'r.threshold': 'العتبة…', 'r.posterize': 'تقليل الألوان…', 'r.autoLevels': 'تحسين تلقائي',
        'r.blur': 'تمويه…', 'r.sharpen': 'زيادة الحدة…', 'r.noise': 'ضوضاء…', 'r.pixelate': 'فسيفساء (بكسلة)…', 'r.emboss': 'نقش بارز', 'r.edges': 'إبراز الحواف',
        'r.vignette': 'تظليل الأطراف…', 'r.glow': 'توهج ناعم…', 'a.brightness': 'السطوع', 'a.contrast': 'التباين', 'a.hue': 'الصبغة', 'a.saturation': 'التشبع',
        'a.lightness': 'الإضاءة', 'a.exposure': 'التعريض', 'a.gamma': 'جاما', 'a.temperature': 'الحرارة', 'a.tint': 'الصبغة الخضراء/الأرجوانية', 'a.vibrance': 'الحيوية',
        'a.level': 'المستوى', 'a.levels': 'عدد المستويات', 'a.radius': 'نصف القطر', 'a.amount': 'المقدار', 'a.size': 'الحجم', 'a.mono': 'أحادي اللون',
        'r.selectAll': 'تحديد الكل', 'r.deselect': 'إلغاء التحديد', 'r.invertSel': 'عكس التحديد', 'r.fillFg': 'تعبئة بلون الواجهة', 'r.clearSel': 'مسح المحدد',
        'r.select': 'تحديد', 'r.applyCrop': 'تطبيق القص', 'r.cancel': 'إلغاء', 'r.ratio': 'النسبة', 'r.free': 'حر', 'r.keepRatio': 'الحفاظ على النسبة',
        'r.anchor': 'نقطة الارتكاز', 'r.exportPng': 'PNG…', 'r.exportJpg': 'JPG…', 'r.exportWebp': 'WebP…', 'r.welcomeText': 'افتح صورة للبدء في تحريرها، أو أنشئ لوحة جديدة للرسم والتصميم',
        'r.fill': 'تعبئة', 'r.strokeOn': 'حد', 'r.shapeKind': 'نوع الشكل', 'r.line': 'خط', 'r.gType': 'النوع', 'r.linear': 'خطي', 'r.radial': 'دائري',
        'r.gMode': 'الألوان', 'r.fgBg': 'واجهة ← خلفية', 'r.fgTrans': 'واجهة ← شفاف', 'r.editText': 'تحرير النص', 'r.textContent': 'النص',
        'r.rasterize': 'هذه طبقة نص. هل تريد تحويلها إلى بكسلات للرسم عليها؟', 'r.locked': 'الطبقة مقفلة', 'r.docInfo': '{w}×{h} بكسل',
        'r.contiguous': 'متصل', 'r.sampleAll': 'كل الطبقات', 'r.pasteNew': 'لصق كطبقة جديدة', 'r.copyMerged': 'نسخ مدمج', 'r.layerFromSel': 'طبقة من التحديد',
        'r.feather': 'تنعيم الحواف', 'r.opacityShort': 'العتامة', 'r.n.normal': 'عادي', 'r.n.multiply': 'ضرب', 'r.n.screen': 'تفتيح الشاشة', 'r.n.overlay': 'تراكب',
        'r.n.darken': 'تغميق', 'r.n.lighten': 'تفتيح', 'r.n.color-dodge': 'مراوغة لونية', 'r.n.color-burn': 'حرق لوني', 'r.n.hard-light': 'ضوء ساطع', 'r.n.soft-light': 'ضوء ناعم',
        'r.n.difference': 'فرق', 'r.n.exclusion': 'استبعاد', 'r.n.hue': 'صبغة', 'r.n.saturation': 'تشبع', 'r.n.color': 'لون', 'r.n.luminosity': 'إضاءة',
        'r.quality': 'جودة JPG', 'r.flipLayerH': 'قلب الطبقة أفقي\u064Bا', 'r.flipLayerV': 'قلب الطبقة عمودي\u064Bا', 'r.ofLayer': 'الطبقة', 'r.ofImage': 'الصورة'
      },
      en: {
        't.move': 'Move', 't.rect': 'Rectangular marquee', 't.ellipse': 'Elliptical marquee', 't.lasso': 'Lasso', 't.wand': 'Magic wand', 't.crop': 'Crop',
        't.brush': 'Brush', 't.eraser': 'Eraser', 't.bucket': 'Paint bucket', 't.gradient': 'Gradient', 't.dropper': 'Eyedropper', 't.text': 'Text', 't.shape': 'Shapes',
        't.hand': 'Hand', 't.zoom': 'Zoom', 'r.size': 'Size', 'r.hardness': 'Hardness', 'r.tolerance': 'Tolerance', 'r.fgColor': 'Foreground color',
        'r.bgColor': 'Background color', 'r.swap': 'Swap colors', 'r.resetColors': 'Default colors', 'r.colors': 'Colors', 'r.history': 'History',
        'r.newLayer': 'New layer', 'r.dupLayer': 'Duplicate layer', 'r.delLayer': 'Delete layer', 'r.mergeDown': 'Merge down', 'r.flatten': 'Flatten image',
        'r.placeImage': 'Place image as layer…', 'r.layerProps': 'Layer properties', 'r.blend': 'Blend mode', 'r.background': 'Background', 'r.layer': 'Layer {n}',
        'r.textLayer': 'Text', 'r.newDoc': 'New document', 'r.preset': 'Preset', 'r.bgFill': 'Background', 'r.white': 'White', 'r.transparent': 'Transparent', 'r.fg': 'Foreground color',
        'r.imageSize': 'Image size…', 'r.canvasSize': 'Canvas size…', 'r.rotate90': 'Rotate 90° clockwise', 'r.rotate90ccw': 'Rotate 90° counter-clockwise', 'r.rotate180': 'Rotate 180°',
        'r.flipH': 'Flip horizontal', 'r.flipV': 'Flip vertical', 'r.cropSel': 'Crop to selection', 'r.adjustments': 'Adjustments', 'r.brightness': 'Brightness/Contrast…',
        'r.hueSat': 'Hue/Saturation…', 'r.exposure': 'Exposure…', 'r.colorBalance': 'Color balance…', 'r.vibrance': 'Vibrance…', 'r.grayscale': 'Grayscale',
        'r.invert': 'Invert', 'r.sepia': 'Sepia', 'r.threshold': 'Threshold…', 'r.posterize': 'Posterize…', 'r.autoLevels': 'Auto enhance',
        'r.blur': 'Blur…', 'r.sharpen': 'Sharpen…', 'r.noise': 'Noise…', 'r.pixelate': 'Pixelate…', 'r.emboss': 'Emboss', 'r.edges': 'Find edges',
        'r.vignette': 'Vignette…', 'r.glow': 'Soft glow…', 'a.brightness': 'Brightness', 'a.contrast': 'Contrast', 'a.hue': 'Hue', 'a.saturation': 'Saturation',
        'a.lightness': 'Lightness', 'a.exposure': 'Exposure', 'a.gamma': 'Gamma', 'a.temperature': 'Temperature', 'a.tint': 'Tint', 'a.vibrance': 'Vibrance',
        'a.level': 'Level', 'a.levels': 'Levels', 'a.radius': 'Radius', 'a.amount': 'Amount', 'a.size': 'Size', 'a.mono': 'Monochromatic',
        'r.selectAll': 'Select all', 'r.deselect': 'Deselect', 'r.invertSel': 'Invert selection', 'r.fillFg': 'Fill with foreground', 'r.clearSel': 'Clear selection pixels',
        'r.select': 'Select', 'r.applyCrop': 'Apply crop', 'r.cancel': 'Cancel', 'r.ratio': 'Ratio', 'r.free': 'Free', 'r.keepRatio': 'Keep aspect ratio',
        'r.anchor': 'Anchor', 'r.exportPng': 'PNG…', 'r.exportJpg': 'JPG…', 'r.exportWebp': 'WebP…', 'r.welcomeText': 'Open a photo to start editing, or create a new canvas for painting and design',
        'r.fill': 'Fill', 'r.strokeOn': 'Stroke', 'r.shapeKind': 'Shape', 'r.line': 'Line', 'r.gType': 'Type', 'r.linear': 'Linear', 'r.radial': 'Radial',
        'r.gMode': 'Colors', 'r.fgBg': 'Foreground → Background', 'r.fgTrans': 'Foreground → Transparent', 'r.editText': 'Edit text', 'r.textContent': 'Text',
        'r.rasterize': 'This is a text layer. Rasterize it to paint on it?', 'r.locked': 'Layer is locked', 'r.docInfo': '{w}×{h} px',
        'r.contiguous': 'Contiguous', 'r.sampleAll': 'All layers', 'r.pasteNew': 'Paste as new layer', 'r.copyMerged': 'Copy merged', 'r.layerFromSel': 'Layer via copy',
        'r.feather': 'Feather', 'r.opacityShort': 'Opacity', 'r.n.normal': 'Normal', 'r.n.multiply': 'Multiply', 'r.n.screen': 'Screen', 'r.n.overlay': 'Overlay',
        'r.n.darken': 'Darken', 'r.n.lighten': 'Lighten', 'r.n.color-dodge': 'Color dodge', 'r.n.color-burn': 'Color burn', 'r.n.hard-light': 'Hard light', 'r.n.soft-light': 'Soft light',
        'r.n.difference': 'Difference', 'r.n.exclusion': 'Exclusion', 'r.n.hue': 'Hue', 'r.n.saturation': 'Saturation', 'r.n.color': 'Color', 'r.n.luminosity': 'Luminosity',
        'r.quality': 'JPG quality', 'r.flipLayerH': 'Flip layer horizontal', 'r.flipLayerV': 'Flip layer vertical', 'r.ofLayer': 'Layer', 'r.ofImage': 'Image'
      }
    }
  });

  const BLENDS = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const op = (b) => (b === 'normal' ? 'source-over' : b);

  /* ═══════════ المستند ═══════════ */
  let doc = null;
  let layerSeq = 1;
  function makeLayer(name, w, h) {
    return { id: W.uid('L'), name, canvas: IMG.makeCanvas(w, h), visible: true, opacity: 1, blend: 'normal', locked: false, text: null };
  }
  function newDocument(w, h, bg) {
    w = Math.round(w); h = Math.round(h);
    const base = makeLayer(W.t('r.background'), w, h);
    if (bg && bg !== 'transparent') { const g = base.canvas.getContext('2d'); g.fillStyle = bg; g.fillRect(0, 0, w, h); }
    layerSeq = 1;
    return { w, h, layers: [base], current: base.id, sel: null, name: null };
  }
  const cur = () => doc && doc.layers.find((l) => l.id === doc.current);
  const layerIdx = (id) => doc.layers.findIndex((l) => l.id === id);

  /* ═══════════ العرض ═══════════ */
  const stage = document.getElementById('stage');
  const view = document.getElementById('view');
  const vg = view.getContext('2d');
  const comp = IMG.makeCanvas(1, 1);
  const cg = comp.getContext('2d');
  const V = { z: 1, px: 0, py: 0, dpr: window.devicePixelRatio || 1 };
  let compDirty = true;
  let checker = null;
  function makeChecker() {
    const c = IMG.makeCanvas(16, 16), g = c.getContext('2d');
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, 16, 16);
    g.fillStyle = '#d9dce3'; g.fillRect(0, 0, 8, 8); g.fillRect(8, 8, 8, 8);
    checker = vg.createPattern(c, 'repeat');
  }
  function resizeView() {
    const r = stage.getBoundingClientRect();
    V.dpr = window.devicePixelRatio || 1;
    view.width = Math.max(1, Math.round(r.width * V.dpr)); view.height = Math.max(1, Math.round(r.height * V.dpr));
    view.style.width = r.width + 'px'; view.style.height = r.height + 'px';
    makeChecker();
    render();
  }
  function fit() {
    if (!doc) return;
    const r = stage.getBoundingClientRect();
    V.z = Math.min(1, Math.min((r.width - 60) / doc.w, (r.height - 60) / doc.h));
    if (V.z <= 0) V.z = 0.1;
    V.px = (r.width - doc.w * V.z) / 2; V.py = (r.height - doc.h * V.z) / 2;
    render(); updateStatus();
  }
  function setZoom(z, sx, sy) {
    if (!doc) return;
    const r = stage.getBoundingClientRect();
    if (sx == null) { sx = r.width / 2; sy = r.height / 2; }
    z = W.clamp(z, 0.02, 32);
    const dx = (sx - V.px) / V.z, dy = (sy - V.py) / V.z;
    V.z = z; V.px = sx - dx * z; V.py = sy - dy * z;
    render(); updateStatus();
  }
  const toDoc = (e) => { const r = view.getBoundingClientRect(); return { x: (e.clientX - r.left - V.px) / V.z, y: (e.clientY - r.top - V.py) / V.z }; };

  /** دمج الطبقات في لوحة واحدة (hook لاستبدال طبقة أثناء الرسم) */
  let liveHook = null;
  function composite(target, opts) {
    opts = opts || {};
    const g = target.getContext('2d');
    g.clearRect(0, 0, target.width, target.height);
    for (const L of doc.layers) {
      if (!L.visible) continue;
      g.globalAlpha = L.opacity;
      g.globalCompositeOperation = op(L.blend);
      const src = !opts.noHook && liveHook && liveHook.id === L.id ? liveHook.canvas() : L.canvas;
      g.drawImage(src, 0, 0);
    }
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  }
  let raf = false;
  function render() {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => { raf = false; draw(); });
  }
  function draw() {
    const w = view.width, h = view.height;
    vg.setTransform(1, 0, 0, 1, 0, 0);
    vg.clearRect(0, 0, w, h);
    if (!doc) return;
    if (comp.width !== doc.w || comp.height !== doc.h) { comp.width = doc.w; comp.height = doc.h; compDirty = true; }
    if (compDirty || liveHook) { composite(comp); compDirty = !!liveHook; }
    vg.setTransform(V.dpr, 0, 0, V.dpr, 0, 0);
    // الظل والخلفية الشطرنجية
    vg.save();
    vg.shadowColor = 'rgba(0,0,0,.45)'; vg.shadowBlur = 18;
    vg.fillStyle = '#fff';
    vg.fillRect(V.px, V.py, doc.w * V.z, doc.h * V.z);
    vg.restore();
    vg.save();
    vg.beginPath(); vg.rect(V.px, V.py, doc.w * V.z, doc.h * V.z); vg.clip();
    vg.fillStyle = checker; vg.fillRect(V.px, V.py, doc.w * V.z, doc.h * V.z);
    vg.translate(V.px, V.py); vg.scale(V.z, V.z);
    vg.imageSmoothingEnabled = V.z < 2;
    vg.imageSmoothingQuality = 'high';
    vg.drawImage(comp, 0, 0);
    vg.restore();
    drawOverlays();
  }
  let antsOffset = 0;
  setInterval(() => { if (doc && (doc.sel || cropRect)) { antsOffset = (antsOffset + 1) % 16; render(); } }, 120);
  function drawOverlays() {
    vg.save();
    vg.translate(V.px, V.py); vg.scale(V.z, V.z);
    const lw = 1 / V.z;
    // التحديد
    if (doc.sel) {
      vg.lineWidth = lw;
      if (doc.sel.path) {
        vg.setLineDash([5 / V.z, 5 / V.z]);
        vg.strokeStyle = '#000'; vg.lineDashOffset = -antsOffset / V.z; vg.stroke(doc.sel.path);
        vg.strokeStyle = '#fff'; vg.lineDashOffset = (5 - antsOffset) / V.z; vg.stroke(doc.sel.path);
        vg.setLineDash([]);
      }
      if (doc.sel.edge) { vg.imageSmoothingEnabled = false; vg.drawImage(doc.sel.edge, 0, 0); }
    }
    // معاينة الأدوات
    if (preview) preview(vg, lw);
    // القص
    if (cropRect) {
      const c = normRect(cropRect);
      vg.fillStyle = 'rgba(0,0,0,.55)';
      vg.beginPath(); vg.rect(-1e5, -1e5, 2e5, 2e5); vg.rect(c.x, c.y, c.w, c.h); vg.fill('evenodd');
      vg.strokeStyle = '#fff'; vg.lineWidth = lw * 1.5; vg.strokeRect(c.x, c.y, c.w, c.h);
      vg.lineWidth = lw * 0.7; vg.strokeStyle = 'rgba(255,255,255,.6)';
      for (let i = 1; i < 3; i++) { vg.beginPath(); vg.moveTo(c.x + c.w * i / 3, c.y); vg.lineTo(c.x + c.w * i / 3, c.y + c.h); vg.moveTo(c.x, c.y + c.h * i / 3); vg.lineTo(c.x + c.w, c.y + c.h * i / 3); vg.stroke(); }
    }
    vg.restore();
    // مؤشر الفرشاة
    if (cursorPos && (tool === 'brush' || tool === 'eraser')) {
      const r = opts[tool].size / 2 * V.z;
      vg.save(); vg.setTransform(V.dpr, 0, 0, V.dpr, 0, 0);
      vg.strokeStyle = 'rgba(0,0,0,.8)'; vg.lineWidth = 1;
      vg.beginPath(); vg.arc(cursorPos.sx, cursorPos.sy, Math.max(1, r), 0, Math.PI * 2); vg.stroke();
      vg.strokeStyle = 'rgba(255,255,255,.8)';
      vg.beginPath(); vg.arc(cursorPos.sx, cursorPos.sy, Math.max(1, r) + 1, 0, Math.PI * 2); vg.stroke();
      vg.restore();
    }
  }
  const normRect = (r) => ({ x: Math.min(r.x1, r.x2), y: Math.min(r.y1, r.y2), w: Math.abs(r.x2 - r.x1), h: Math.abs(r.y2 - r.y1) });

  /* ═══════════ السجل ═══════════ */
  const history = { list: [], index: -1 };
  const MAX_HIST = 40;
  function pushHist(entry) {
    history.list = history.list.slice(0, history.index + 1);
    history.list.push(entry);
    if (history.list.length > MAX_HIST) history.list.shift();
    history.index = history.list.length - 1;
    W.setDirty(true);
    renderHistory();
  }
  function snapLayers() {
    return { w: doc.w, h: doc.h, current: doc.current, layers: doc.layers.map((L) => ({ id: L.id, name: L.name, visible: L.visible, opacity: L.opacity, blend: L.blend, locked: L.locked, text: L.text ? Object.assign({}, L.text) : null, canvas: IMG.cloneCanvas(L.canvas) })) };
  }
  function restoreLayers(s) {
    doc.w = s.w; doc.h = s.h; doc.current = s.current;
    doc.layers = s.layers.map((L) => Object.assign({}, L, { canvas: IMG.cloneCanvas(L.canvas), text: L.text ? Object.assign({}, L.text) : null }));
  }
  /** تغيير شامل للمستند (هيكلي) */
  function docChange(label, fn) {
    const before = snapLayers();
    fn();
    pushHist({ label, type: 'doc', before, after: snapLayers() });
    changed();
  }
  /** تغيير بكسلات طبقة ضمن مستطيل */
  function pixelChange(label, L, rect, fn) {
    rect = clipRect(rect || { x: 0, y: 0, w: doc.w, h: doc.h });
    if (!rect) { fn(); return; }
    const g = L.canvas.getContext('2d');
    const before = g.getImageData(rect.x, rect.y, rect.w, rect.h);
    fn();
    const after = g.getImageData(rect.x, rect.y, rect.w, rect.h);
    pushHist({ label, type: 'pixels', layerId: L.id, rect, before, after });
    changed();
  }
  function clipRect(r) {
    const x = Math.max(0, Math.floor(r.x)), y = Math.max(0, Math.floor(r.y));
    const x2 = Math.min(doc.w, Math.ceil(r.x + r.w)), y2 = Math.min(doc.h, Math.ceil(r.y + r.h));
    if (x2 <= x || y2 <= y) return null;
    return { x, y, w: x2 - x, h: y2 - y };
  }
  function applyHist(e, dir) {
    if (e.type === 'pixels') {
      const L = doc.layers.find((l) => l.id === e.layerId);
      if (L) L.canvas.getContext('2d').putImageData(dir === 'undo' ? e.before : e.after, e.rect.x, e.rect.y);
    } else if (e.type === 'doc') restoreLayers(dir === 'undo' ? e.before : e.after);
    else if (e.type === 'sel') setSelection(dir === 'undo' ? e.before : e.after, true);
  }
  function undo() { if (busyTool()) return; if (history.index < 0) return; applyHist(history.list[history.index], 'undo'); history.index--; changed(); renderHistory(); }
  function redo() { if (busyTool()) return; if (history.index >= history.list.length - 1) return; history.index++; applyHist(history.list[history.index], 'redo'); changed(); renderHistory(); }
  function gotoHist(i) { while (history.index > i) undo(); while (history.index < i) redo(); }
  function changed() { compDirty = true; render(); renderLayers(); updateStatus(); W.setDirty(true); }

  /* ═══════════ التحديد ═══════════ */
  // sel: { mask: canvas (alpha), path?: Path2D, edge?: canvas }
  function setSelection(sel, silent) {
    if (!silent) pushHist({ label: W.t('r.select'), type: 'sel', before: doc.sel, after: sel });
    doc.sel = sel;
    render();
  }
  function maskFromPath(path) {
    const m = IMG.makeCanvas(doc.w, doc.h), g = m.getContext('2d');
    g.fillStyle = '#000'; g.fill(path);
    return m;
  }
  function edgeFromMask(mask) {
    const w = mask.width, h = mask.height;
    const src = mask.getContext('2d').getImageData(0, 0, w, h).data;
    const e = IMG.makeCanvas(w, h), eg = e.getContext('2d');
    const out = eg.createImageData(w, h), d = out.data;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4 + 3;
      const a = src[i] > 127;
      if (!a) continue;
      const edge = x === 0 || y === 0 || x === w - 1 || y === h - 1 || src[i - 4] <= 127 || src[i + 4] <= 127 || src[i - w * 4] <= 127 || src[i + w * 4] <= 127;
      if (edge) { const c = ((x + y) >> 2) % 2 ? 255 : 0; d[i - 3] = c; d[i - 2] = c; d[i - 1] = c; d[i] = 255; }
    }
    eg.putImageData(out, 0, 0);
    return e;
  }
  /** دمج تحديد جديد مع الحالي حسب المفاتيح (Shift إضافة، Alt طرح) */
  function combineSelection(newMask, path, mode) {
    if (mode === 'replace' || !doc.sel) {
      const sel = { mask: newMask, path: path || null, edge: path ? null : edgeFromMask(newMask) };
      setSelection(sel);
      return;
    }
    const m = IMG.cloneCanvas(doc.sel.mask), g = m.getContext('2d');
    g.globalCompositeOperation = mode === 'add' ? 'source-over' : 'destination-out';
    g.drawImage(newMask, 0, 0);
    setSelection({ mask: m, path: null, edge: edgeFromMask(m) });
  }
  function selectAll() { if (!doc) return; const p = new Path2D(); p.rect(0, 0, doc.w, doc.h); setSelection({ mask: maskFromPath(p), path: p }); }
  function deselect() { if (doc && doc.sel) setSelection(null); }
  function invertSel() {
    if (!doc) return;
    const m = IMG.makeCanvas(doc.w, doc.h), g = m.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, doc.w, doc.h);
    if (doc.sel) { g.globalCompositeOperation = 'destination-out'; g.drawImage(doc.sel.mask, 0, 0); }
    setSelection({ mask: m, path: null, edge: edgeFromMask(m) });
  }
  function selBounds() {
    if (!doc.sel) return { x: 0, y: 0, w: doc.w, h: doc.h };
    const d = doc.sel.mask.getContext('2d').getImageData(0, 0, doc.w, doc.h).data;
    let x1 = doc.w, y1 = doc.h, x2 = -1, y2 = -1;
    for (let y = 0; y < doc.h; y++) for (let x = 0; x < doc.w; x++) if (d[(y * doc.w + x) * 4 + 3] > 0) { if (x < x1) x1 = x; if (x > x2) x2 = x; if (y < y1) y1 = y; if (y > y2) y2 = y; }
    return x2 < 0 ? null : { x: x1, y: y1, w: x2 - x1 + 1, h: y2 - y1 + 1 };
  }
  /** تطبيق عملية على الطبقة الحالية مع احترام التحديد */
  function applyMasked(L, producer) {
    // producer(canvas) يعيد لوحة جديدة بنفس الحجم
    const result = producer(IMG.cloneCanvas(L.canvas));
    const g = L.canvas.getContext('2d');
    if (!doc.sel) { g.clearRect(0, 0, doc.w, doc.h); g.drawImage(result, 0, 0); return; }
    const rg = result.getContext('2d');
    rg.globalCompositeOperation = 'destination-in'; rg.drawImage(doc.sel.mask, 0, 0);
    g.globalCompositeOperation = 'destination-out'; g.drawImage(doc.sel.mask, 0, 0);
    g.globalCompositeOperation = 'source-over'; g.drawImage(result, 0, 0);
  }
  function canPaint(L) {
    if (!L) return false;
    if (L.locked) { W.toast(W.t('r.locked'), 'error'); return false; }
    return true;
  }
  async function ensureRaster(L) {
    if (!L.text) return true;
    if (!(await W.confirm(W.t('r.rasterize')))) return false;
    L.text = null;
    return true;
  }

  /* ═══════════ الأدوات ═══════════ */
  let tool = 'brush';
  const opts = {
    brush: { size: 20, hardness: 80, opacity: 100 },
    eraser: { size: 30, hardness: 80, opacity: 100 },
    bucket: { tolerance: 25 },
    wand: { tolerance: 25 },
    gradient: { type: 'linear', mode: 'fgbg' },
    shape: { kind: 'rect', fill: true, stroke: false, strokeW: 4 },
    text: { font: 'Cairo', size: 64, bold: true },
    crop: { ratio: 0 }
  };
  const colors = { fg: '#1d4ed8', bg: '#ffffff' };
  let preview = null, cropRect = null, cursorPos = null, drag = null, spaceDown = false;
  const busyTool = () => !!drag;
  const TOOLS = [
    ['move', 'move', 'V'], ['rect', 'select-rect', 'M'], ['ellipse', 'ellipse', 'M'], ['lasso', 'lasso', 'L'], ['wand', 'wand', 'W'], ['crop', 'crop', 'C'], null,
    ['brush', 'brush', 'B'], ['eraser', 'eraser', 'E'], ['bucket', 'bucket', 'G'], ['gradient', 'palette', 'G'], ['dropper', 'dropper', 'I'], null,
    ['text', 'text', 'T'], ['shape', 'shapes', 'U'], null, ['hand', 'hand', 'H'], ['zoom', 'zoom-in', 'Z']
  ];
  const toolsEl = document.getElementById('tools');
  function renderTools() {
    toolsEl.innerHTML = '';
    TOOLS.forEach((t) => {
      if (!t) { toolsEl.append(W.h('div', { class: 'w-sep' })); return; }
      const b = W.iconButton(t[1], 't.' + t[0], () => setTool(t[0]), { shortcut: t[2], cls: tool === t[0] ? 'active' : '' });
      toolsEl.append(b);
    });
    toolsEl.append(W.h('div', { class: 'w-sep' }));
    const sw = W.h('div', { class: 'r-swatches' },
      W.h('div', { class: 'r-sw bg', style: { background: colors.bg }, 'data-tip': 'r.bgColor', onclick: () => pickColor('bg') }),
      W.h('div', { class: 'r-sw fg', style: { background: colors.fg }, 'data-tip': 'r.fgColor', onclick: () => pickColor('fg') }));
    toolsEl.append(sw);
    toolsEl.append(W.iconButton('refresh', 'r.swap', () => swapColors(), { shortcut: 'X', cls: 'sm' }));
  }
  function pickColor(which) {
    const inp = W.h('input', { type: 'color', value: colors[which], style: { position: 'fixed', opacity: 0, pointerEvents: 'none' } });
    document.body.append(inp);
    inp.addEventListener('input', () => { colors[which] = inp.value; renderTools(); renderColorPanel(); });
    inp.addEventListener('change', () => inp.remove());
    inp.click();
  }
  function swapColors() { const t = colors.fg; colors.fg = colors.bg; colors.bg = t; renderTools(); renderColorPanel(); }
  function setTool(t) {
    if (cropRect && t !== 'crop') { cropRect = null; }
    tool = t;
    preview = null;
    renderTools(); renderOptions(); render();
    view.style.cursor = { hand: 'grab', zoom: 'zoom-in', move: 'move', text: 'text', dropper: 'crosshair', brush: 'none', eraser: 'none' }[t] || 'crosshair';
  }

  /* شريط الخيارات */
  const optsEl = document.getElementById('toolbar');
  function renderOptions() {
    optsEl.innerHTML = '';
    const lbl = (k) => W.h('span', { class: 'small muted', text: W.t(k) });
    const num = (o, k, min, max, step) => {
      const inp = W.h('input', { class: 'w-input sm', type: 'number', min, max, step: step || 1, value: o[k], style: { width: '64px' } });
      inp.addEventListener('change', () => { o[k] = W.clamp(parseFloat(inp.value) || min, min, max); inp.value = o[k]; render(); });
      return inp;
    };
    const range = (o, k, min, max) => {
      const r = W.h('input', { type: 'range', class: 'w-range', min, max, value: o[k], style: { width: '110px' } });
      const n = W.h('span', { class: 'small', style: { minWidth: '34px' }, text: o[k] });
      r.addEventListener('input', () => { o[k] = +r.value; n.textContent = r.value; render(); });
      return [r, n];
    };
    const add = (...els) => els.forEach((e) => optsEl.append(e));
    const sep = () => optsEl.append(W.h('div', { class: 'w-sep' }));
    optsEl.append(W.h('b', { class: 'r-toolname', text: W.t('t.' + tool) }));
    sep();
    if (tool === 'brush' || tool === 'eraser') {
      const o = opts[tool];
      add(lbl('r.size'), ...range(o, 'size', 1, 500), lbl('r.hardness'), ...range(o, 'hardness', 0, 100), lbl('ui.opacity'), ...range(o, 'opacity', 1, 100));
    } else if (tool === 'bucket' || tool === 'wand') {
      add(lbl('r.tolerance'), ...range(opts[tool], 'tolerance', 0, 100));
    } else if (tool === 'gradient') {
      add(lbl('r.gType'), W.segmented([{ value: 'linear', i18n: 'r.linear' }, { value: 'radial', i18n: 'r.radial' }], opts.gradient.type, (v) => { opts.gradient.type = v; }));
      add(lbl('r.gMode'), W.segmented([{ value: 'fgbg', i18n: 'r.fgBg' }, { value: 'fgt', i18n: 'r.fgTrans' }], opts.gradient.mode, (v) => { opts.gradient.mode = v; }));
    } else if (tool === 'shape') {
      add(W.segmented([{ value: 'rect', icon: 'rect', tip: 'm.sh.rect' }, { value: 'ellipse', icon: 'ellipse' }, { value: 'line', icon: 'line' }], opts.shape.kind, (v) => { opts.shape.kind = v; }));
      const f = W.h('input', { type: 'checkbox' }); f.checked = opts.shape.fill; f.addEventListener('change', () => { opts.shape.fill = f.checked; });
      const s = W.h('input', { type: 'checkbox' }); s.checked = opts.shape.stroke; s.addEventListener('change', () => { opts.shape.stroke = s.checked; });
      add(W.h('label', { class: 'w-check-row' }, f, W.h('span', { text: W.t('r.fill') })), W.h('label', { class: 'w-check-row' }, s, W.h('span', { text: W.t('r.strokeOn') })), lbl('ui.strokeWidth'), num(opts.shape, 'strokeW', 1, 200));
    } else if (tool === 'text') {
      add(W.fontSelect(opts.text.font, (f) => { opts.text.font = f; }, 'sm'), lbl('ui.fontSize'), num(opts.text, 'size', 6, 1000));
    } else if (tool === 'crop') {
      const ratios = [[0, 'r.free'], [1, '1:1'], [4 / 3, '4:3'], [3 / 2, '3:2'], [16 / 9, '16:9'], [9 / 16, '9:16'], [4 / 5, '4:5']];
      add(lbl('r.ratio'), W.segmented(ratios.map(([v, l]) => ({ value: v, label: l.startsWith('r.') ? W.t(l) : l })), opts.crop.ratio, (v) => { opts.crop.ratio = v; }));
      if (cropRect) {
        sep();
        add(W.h('button', { class: 'w-btn primary sm', type: 'button', onclick: applyCrop }, W.iconEl('check'), W.h('span', { text: W.t('r.applyCrop') })),
          W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('r.cancel'), onclick: () => { cropRect = null; renderOptions(); render(); } }));
      }
    } else if (tool === 'move') {
      add(W.iconButton('flip-h', 'r.flipLayerH', () => flipLayer(true)), W.iconButton('flip-v', 'r.flipLayerV', () => flipLayer(false)));
    }
    optsEl.append(W.h('div', { class: 'grow' }));
    const zoomBox = W.h('div', { class: 'w-zoom' },
      W.iconButton('zoom-out', 'cmd.zoomOut', () => setZoom(V.z / 1.25), { cls: 'sm' }),
      W.h('span', { id: 'zoomlabel', text: Math.round(V.z * 100) + '%' }),
      W.iconButton('zoom-in', 'cmd.zoomIn', () => setZoom(V.z * 1.25), { cls: 'sm' }),
      W.iconButton('fit', 'cmd.fit', fit, { cls: 'sm' }));
    optsEl.append(zoomBox);
  }

  /* أطراف الفرشاة */
  let tipCache = { key: '', canvas: null };
  function brushTip(size, hardness, color) {
    const key = size + '|' + hardness + '|' + color;
    if (tipCache.key === key) return tipCache.canvas;
    const d = Math.max(1, Math.ceil(size));
    const c = IMG.makeCanvas(d, d), g = c.getContext('2d');
    const r = d / 2;
    const rgb = W.color.hexToRgb(color);
    if (hardness >= 99 || d <= 2) { g.fillStyle = color; g.beginPath(); g.arc(r, r, r, 0, Math.PI * 2); g.fill(); }
    else {
      const grad = g.createRadialGradient(r, r, 0, r, r, r);
      const col = (a) => 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')';
      grad.addColorStop(0, col(1));
      grad.addColorStop(Math.max(0.01, hardness / 100), col(1));
      grad.addColorStop(1, col(0));
      g.fillStyle = grad; g.fillRect(0, 0, d, d);
    }
    tipCache = { key, canvas: c };
    return c;
  }

  /* ═══════════ أحداث المؤشر ═══════════ */
  view.addEventListener('pointerdown', async (e) => {
    if (!doc) return;
    view.setPointerCapture(e.pointerId);
    const p = toDoc(e);
    if (e.button === 1 || spaceDown || tool === 'hand') { drag = { mode: 'pan', sx: e.clientX, sy: e.clientY, px: V.px, py: V.py }; view.style.cursor = 'grabbing'; return; }
    if (e.button !== 0) return;
    const L = cur();
    const selMode = e.shiftKey ? 'add' : e.altKey ? 'sub' : 'replace';
    switch (tool) {
      case 'zoom': setZoom(e.altKey ? V.z / 1.5 : V.z * 1.5, e.offsetX, e.offsetY); return;
      case 'dropper': {
        composite(comp, { noHook: true });
        const px = cg.getImageData(W.clamp(Math.floor(p.x), 0, doc.w - 1), W.clamp(Math.floor(p.y), 0, doc.h - 1), 1, 1).data;
        colors[e.altKey ? 'bg' : 'fg'] = W.color.rgbToHex(px[0], px[1], px[2]);
        renderTools(); renderColorPanel();
        return;
      }
      case 'brush': case 'eraser': {
        if (!canPaint(L) || !(await ensureRaster(L))) return;
        startStroke(L, p, e.pressure);
        return;
      }
      case 'bucket': {
        if (!canPaint(L) || !(await ensureRaster(L))) return;
        const g = L.canvas.getContext('2d');
        const img = g.getImageData(0, 0, doc.w, doc.h);
        const rgb = W.color.hexToRgb(colors.fg);
        const selMask = doc.sel ? doc.sel.mask.getContext('2d').getImageData(0, 0, doc.w, doc.h).data : null;
        pixelChange(W.t('t.bucket'), L, null, () => {
          const r = IMG.floodFill(img, p.x, p.y, [rgb.r, rgb.g, rgb.b, 255], opts.bucket.tolerance, selMask);
          if (r) g.putImageData(img, 0, 0);
        });
        return;
      }
      case 'wand': {
        const img = L.canvas.getContext('2d').getImageData(0, 0, doc.w, doc.h);
        const m = IMG.magicWand(img, p.x, p.y, opts.wand.tolerance);
        const mc = IMG.makeCanvas(doc.w, doc.h); mc.getContext('2d').putImageData(m, 0, 0);
        combineSelection(mc, null, selMode);
        return;
      }
      case 'rect': case 'ellipse': case 'crop': case 'gradient': case 'shape':
        drag = { mode: tool, x1: p.x, y1: p.y, x2: p.x, y2: p.y, selMode };
        if (tool === 'crop') { cropRect = { x1: p.x, y1: p.y, x2: p.x, y2: p.y }; }
        return;
      case 'lasso':
        drag = { mode: 'lasso', pts: [p], selMode };
        return;
      case 'move': {
        if (!canPaint(L)) return;
        if (L.text) { drag = { mode: 'movetext', L, start: p, ox: L.text.x, oy: L.text.y, before: snapLayers() }; return; }
        const orig = IMG.cloneCanvas(L.canvas);
        let float = null, base = orig;
        if (doc.sel) {
          float = IMG.cloneCanvas(orig);
          const fg = float.getContext('2d'); fg.globalCompositeOperation = 'destination-in'; fg.drawImage(doc.sel.mask, 0, 0);
          base = IMG.cloneCanvas(orig);
          const bg = base.getContext('2d'); bg.globalCompositeOperation = 'destination-out'; bg.drawImage(doc.sel.mask, 0, 0);
        }
        drag = { mode: 'move', L, start: p, orig, base, float, selMask: doc.sel ? doc.sel.mask : null, before: snapLayers(), beforeSel: doc.sel };
        return;
      }
      case 'text': {
        const hitL = [...doc.layers].reverse().find((l) => l.text && l.visible && textBounds(l).x <= p.x && p.x <= textBounds(l).x + textBounds(l).w && textBounds(l).y <= p.y && p.y <= textBounds(l).y + textBounds(l).h);
        if (hitL) { doc.current = hitL.id; renderLayers(); editText(hitL); }
        else addTextLayer(p);
        return;
      }
    }
  });
  view.addEventListener('pointermove', (e) => {
    const r = view.getBoundingClientRect();
    cursorPos = { sx: e.clientX - r.left, sy: e.clientY - r.top };
    if (doc) {
      const p = toDoc(e);
      status.item('pos').textContent = Math.round(p.x) + ', ' + Math.round(p.y);
    }
    if (!drag) { if (tool === 'brush' || tool === 'eraser') render(); return; }
    const p = toDoc(e);
    switch (drag.mode) {
      case 'pan': V.px = drag.px + (e.clientX - drag.sx); V.py = drag.py + (e.clientY - drag.sy); render(); break;
      case 'stroke': continueStroke(p, e.pressure); break;
      case 'rect': case 'ellipse': case 'gradient': case 'shape': {
        let x2 = p.x, y2 = p.y;
        if (e.shiftKey && drag.mode !== 'gradient') { const s = Math.max(Math.abs(x2 - drag.x1), Math.abs(y2 - drag.y1)); x2 = drag.x1 + Math.sign(x2 - drag.x1 || 1) * s; y2 = drag.y1 + Math.sign(y2 - drag.y1 || 1) * s; }
        drag.x2 = x2; drag.y2 = y2;
        preview = (g, lw) => {
          const rr = normRect(drag);
          g.lineWidth = lw;
          g.setLineDash([4 * lw, 4 * lw]); g.strokeStyle = '#000';
          if (drag.mode === 'rect') g.strokeRect(rr.x, rr.y, rr.w, rr.h);
          else if (drag.mode === 'ellipse') { g.beginPath(); g.ellipse(rr.x + rr.w / 2, rr.y + rr.h / 2, rr.w / 2, rr.h / 2, 0, 0, Math.PI * 2); g.stroke(); }
          else if (drag.mode === 'gradient') { g.setLineDash([]); g.strokeStyle = '#fff'; g.lineWidth = 2 * lw; g.beginPath(); g.moveTo(drag.x1, drag.y1); g.lineTo(drag.x2, drag.y2); g.stroke(); g.fillStyle = colors.fg; g.beginPath(); g.arc(drag.x1, drag.y1, 5 * lw, 0, 7); g.fill(); }
          else { g.setLineDash([]); drawShape(g, drag); }
          g.setLineDash([]);
        };
        render();
        break;
      }
      case 'crop': {
        let x2 = W.clamp(p.x, 0, doc.w), y2 = W.clamp(p.y, 0, doc.h);
        const ratio = opts.crop.ratio;
        if (ratio) { const w = x2 - drag.x1; const h = Math.abs(w) / ratio * Math.sign(y2 - drag.y1 || 1); y2 = drag.y1 + h; }
        cropRect = { x1: W.clamp(drag.x1, 0, doc.w), y1: W.clamp(drag.y1, 0, doc.h), x2, y2 };
        render();
        break;
      }
      case 'lasso': drag.pts.push(p); preview = (g, lw) => { g.lineWidth = lw; g.strokeStyle = '#000'; g.setLineDash([4 * lw, 4 * lw]); g.beginPath(); drag.pts.forEach((q, i) => (i ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y))); g.stroke(); g.setLineDash([]); }; render(); break;
      case 'move': {
        const dx = Math.round(p.x - drag.start.x), dy = Math.round(p.y - drag.start.y);
        const g = drag.L.canvas.getContext('2d');
        g.clearRect(0, 0, doc.w, doc.h);
        if (drag.float) { g.drawImage(drag.base, 0, 0); g.drawImage(drag.float, dx, dy); }
        else g.drawImage(drag.orig, dx, dy);
        drag.dx = dx; drag.dy = dy;
        compDirty = true; render();
        break;
      }
      case 'movetext': {
        drag.L.text.x = drag.ox + (p.x - drag.start.x); drag.L.text.y = drag.oy + (p.y - drag.start.y);
        renderTextLayer(drag.L); compDirty = true; render();
        break;
      }
    }
  });
  view.addEventListener('pointerleave', () => { cursorPos = null; render(); });
  view.addEventListener('pointerup', () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    preview = null;
    switch (d.mode) {
      case 'pan': view.style.cursor = tool === 'hand' ? 'grab' : view.style.cursor; break;
      case 'stroke': endStroke(); break;
      case 'rect': case 'ellipse': {
        const rr = normRect(d);
        if (rr.w < 2 && rr.h < 2) { if (d.selMode === 'replace') deselect(); break; }
        const path = new Path2D();
        if (d.mode === 'rect') path.rect(Math.round(rr.x), Math.round(rr.y), Math.round(rr.w), Math.round(rr.h));
        else path.ellipse(rr.x + rr.w / 2, rr.y + rr.h / 2, rr.w / 2, rr.h / 2, 0, 0, Math.PI * 2);
        combineSelection(maskFromPath(path), path, d.selMode);
        break;
      }
      case 'lasso': {
        if (d.pts.length < 3) { if (d.selMode === 'replace') deselect(); break; }
        const path = new Path2D();
        d.pts.forEach((q, i) => (i ? path.lineTo(q.x, q.y) : path.moveTo(q.x, q.y)));
        path.closePath();
        combineSelection(maskFromPath(path), path, d.selMode);
        break;
      }
      case 'gradient': applyGradient(d); break;
      case 'shape': applyShape(d); break;
      case 'crop': { const c = normRect(cropRect); if (c.w < 3 || c.h < 3) cropRect = null; renderOptions(); render(); break; }
      case 'move': {
        if (!d.dx && !d.dy) break;
        let newSel = d.beforeSel;
        if (d.selMask) {
          const m = IMG.makeCanvas(doc.w, doc.h); m.getContext('2d').drawImage(d.selMask, d.dx, d.dy);
          newSel = { mask: m, path: null, edge: edgeFromMask(m) };
          doc.sel = newSel;
        }
        pushHist({ label: W.t('t.move'), type: 'doc', before: d.before, after: snapLayers() });
        changed();
        break;
      }
      case 'movetext': pushHist({ label: W.t('t.move'), type: 'doc', before: d.before, after: snapLayers() }); changed(); break;
    }
    render();
  });
  stage.addEventListener('wheel', (e) => {
    if (!doc) return;
    e.preventDefault();
    const r = view.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) setZoom(V.z * (e.deltaY < 0 ? 1.12 : 1 / 1.12), e.clientX - r.left, e.clientY - r.top);
    else { V.px -= e.shiftKey ? e.deltaY : e.deltaX; V.py -= e.shiftKey ? 0 : e.deltaY; render(); }
  }, { passive: false });
  window.addEventListener('keydown', (e) => { if (e.code === 'Space' && !e.target.closest('input,textarea,[contenteditable]')) { spaceDown = true; if (!drag) view.style.cursor = 'grab'; } });
  window.addEventListener('keyup', (e) => { if (e.code === 'Space') { spaceDown = false; setTool(tool); } });

  /* الرسم بالفرشاة */
  let stroke = null;
  function startStroke(L, p, pressure) {
    const o = opts[tool];
    stroke = { L, canvas: IMG.makeCanvas(doc.w, doc.h), last: p, minX: p.x, minY: p.y, maxX: p.x, maxY: p.y, erase: tool === 'eraser', opacity: o.opacity / 100, size: o.size, hardness: o.hardness, tmp: null };
    drag = { mode: 'stroke' };
    dab(p.x, p.y, pressure);
    liveHook = { id: L.id, canvas: strokePreview };
    render();
  }
  function dab(x, y, pressure) {
    const pr = pressure && pressure > 0 && pressure !== 0.5 ? pressure : 1;
    const size = Math.max(1, stroke.size * pr);
    const tip = brushTip(size, stroke.hardness, stroke.erase ? '#000000' : colors.fg);
    const g = stroke.canvas.getContext('2d');
    g.drawImage(tip, x - tip.width / 2, y - tip.height / 2);
    const r = size / 2 + 2;
    stroke.minX = Math.min(stroke.minX, x - r); stroke.minY = Math.min(stroke.minY, y - r);
    stroke.maxX = Math.max(stroke.maxX, x + r); stroke.maxY = Math.max(stroke.maxY, y + r);
  }
  function continueStroke(p, pressure) {
    const last = stroke.last;
    const dist = Math.hypot(p.x - last.x, p.y - last.y);
    const step = Math.max(0.5, stroke.size * 0.12);
    if (dist < step) return;
    const n = Math.floor(dist / step);
    for (let i = 1; i <= n; i++) dab(last.x + (p.x - last.x) * i / n, last.y + (p.y - last.y) * i / n, pressure);
    stroke.last = p;
    if (doc.sel) { const g = stroke.canvas.getContext('2d'); g.globalCompositeOperation = 'destination-in'; g.drawImage(doc.sel.mask, 0, 0); g.globalCompositeOperation = 'source-over'; }
    render();
  }
  function strokePreview() {
    if (!stroke.tmp) stroke.tmp = IMG.makeCanvas(doc.w, doc.h);
    const g = stroke.tmp.getContext('2d');
    g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    g.clearRect(0, 0, doc.w, doc.h);
    g.drawImage(stroke.L.canvas, 0, 0);
    g.globalAlpha = stroke.opacity;
    g.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
    g.drawImage(stroke.canvas, 0, 0);
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    return stroke.tmp;
  }
  function endStroke() {
    const s = stroke;
    liveHook = null;
    if (doc.sel) { const g = s.canvas.getContext('2d'); g.globalCompositeOperation = 'destination-in'; g.drawImage(doc.sel.mask, 0, 0); }
    pixelChange(W.t(s.erase ? 't.eraser' : 't.brush'), s.L, { x: s.minX, y: s.minY, w: s.maxX - s.minX, h: s.maxY - s.minY }, () => {
      const g = s.L.canvas.getContext('2d');
      g.globalAlpha = s.opacity;
      g.globalCompositeOperation = s.erase ? 'destination-out' : 'source-over';
      g.drawImage(s.canvas, 0, 0);
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    });
    stroke = null;
  }
  /* التدرج والأشكال */
  async function applyGradient(d) {
    const L = cur();
    if (!canPaint(L) || !(await ensureRaster(L))) return;
    if (Math.hypot(d.x2 - d.x1, d.y2 - d.y1) < 2) return;
    pixelChange(W.t('t.gradient'), L, null, () => applyMasked(L, (c) => {
      const g = c.getContext('2d');
      const grad = opts.gradient.type === 'radial' ? g.createRadialGradient(d.x1, d.y1, 0, d.x1, d.y1, Math.hypot(d.x2 - d.x1, d.y2 - d.y1)) : g.createLinearGradient(d.x1, d.y1, d.x2, d.y2);
      grad.addColorStop(0, colors.fg);
      grad.addColorStop(1, opts.gradient.mode === 'fgt' ? W.color.rgba(colors.fg, 0) : colors.bg);
      g.fillStyle = grad; g.fillRect(0, 0, doc.w, doc.h);
      return c;
    }));
  }
  function drawShape(g, d) {
    const rr = normRect(d), o = opts.shape;
    g.fillStyle = colors.fg; g.strokeStyle = o.stroke && o.fill ? colors.bg : colors.fg; g.lineWidth = o.strokeW;
    g.beginPath();
    if (o.kind === 'line') { g.moveTo(d.x1, d.y1); g.lineTo(d.x2, d.y2); g.lineCap = 'round'; g.stroke(); return; }
    if (o.kind === 'ellipse') g.ellipse(rr.x + rr.w / 2, rr.y + rr.h / 2, Math.max(0.5, rr.w / 2), Math.max(0.5, rr.h / 2), 0, 0, Math.PI * 2);
    else g.rect(rr.x, rr.y, rr.w, rr.h);
    if (o.fill) g.fill();
    if (o.stroke || !o.fill) g.stroke();
  }
  async function applyShape(d) {
    const L = cur();
    if (!canPaint(L) || !(await ensureRaster(L))) return;
    const rr = normRect(d);
    if (rr.w < 1 && rr.h < 1) return;
    const pad = opts.shape.strokeW + 2;
    pixelChange(W.t('t.shape'), L, { x: rr.x - pad, y: rr.y - pad, w: rr.w + pad * 2, h: rr.h + pad * 2 }, () => {
      const c = IMG.makeCanvas(doc.w, doc.h);
      drawShape(c.getContext('2d'), d);
      if (doc.sel) { const g = c.getContext('2d'); g.globalCompositeOperation = 'destination-in'; g.drawImage(doc.sel.mask, 0, 0); }
      L.canvas.getContext('2d').drawImage(c, 0, 0);
    });
  }
  function applyCrop() {
    if (!cropRect) return;
    const c = normRect(cropRect);
    const x = Math.round(c.x), y = Math.round(c.y), w = Math.max(1, Math.round(c.w)), h = Math.max(1, Math.round(c.h));
    docChange(W.t('t.crop'), () => {
      doc.layers.forEach((L) => {
        const n = IMG.makeCanvas(w, h); n.getContext('2d').drawImage(L.canvas, -x, -y);
        L.canvas = n;
        if (L.text) { L.text.x -= x; L.text.y -= y; }
      });
      doc.w = w; doc.h = h; doc.sel = null;
    });
    cropRect = null;
    renderOptions(); fit();
  }

  /* ═══════════ النص ═══════════ */
  const ARABIC = /[؀-ۿ]/;
  function textFont(t) { return (t.bold ? '700 ' : '400 ') + (t.italic ? 'italic ' : '') + t.size + "px '" + t.font + "', 'IBM Plex Sans Arabic', 'DejaVu Sans', sans-serif"; }
  function textBounds(L) {
    const t = L.text;
    const g = L.canvas.getContext('2d');
    g.font = textFont(t);
    const lines = t.content.split('\n');
    const w = Math.max(...lines.map((l) => g.measureText(l).width), 10);
    const lh = t.size * (t.lineHeight || 1.3);
    const h = lines.length * lh;
    const rtl = t.dir ? t.dir === 'rtl' : ARABIC.test(t.content);
    const align = t.align || 'start';
    let x = t.x;
    if (align === 'center') x = t.x - w / 2;
    else if ((align === 'start') === rtl) x = t.x - w;
    return { x, y: t.y, w, h };
  }
  function renderTextLayer(L) {
    const t = L.text, g = L.canvas.getContext('2d');
    g.clearRect(0, 0, L.canvas.width, L.canvas.height);
    g.font = textFont(t);
    g.fillStyle = t.color;
    const rtl = t.dir ? t.dir === 'rtl' : ARABIC.test(t.content);
    g.direction = rtl ? 'rtl' : 'ltr';
    g.textAlign = t.align || 'start';
    g.textBaseline = 'top';
    if (t.shadow) { g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = t.size * 0.15; g.shadowOffsetY = t.size * 0.05; }
    const lh = t.size * (t.lineHeight || 1.3);
    t.content.split('\n').forEach((line, i) => {
      if (t.stroke) { g.lineWidth = t.strokeW || Math.max(2, t.size * 0.06); g.strokeStyle = t.strokeColor || '#000'; g.lineJoin = 'round'; g.strokeText(line, t.x, t.y + i * lh); }
      g.fillText(line, t.x, t.y + i * lh);
    });
    g.shadowColor = 'transparent';
  }
  async function addTextLayer(p) {
    const L = makeLayer(W.t('r.textLayer'), doc.w, doc.h);
    L.text = { content: W.lang === 'ar' ? 'نص جديد' : 'New text', x: p.x, y: p.y, font: opts.text.font, size: opts.text.size, bold: opts.text.bold, color: colors.fg, align: 'start', lineHeight: 1.3 };
    await W.ensureFont(L.text.font, 700);
    const before = snapLayers();
    const i = layerIdx(doc.current);
    doc.layers.splice(i + 1, 0, L);
    doc.current = L.id;
    renderTextLayer(L);
    changed();
    const ok = await editText(L, true);
    if (!ok) { restoreLayers(before); changed(); return; }
    L.name = L.text.content.split('\n')[0].slice(0, 24) || W.t('r.textLayer');
    pushHist({ label: W.t('t.text'), type: 'doc', before, after: snapLayers() });
    renderLayers();
  }
  async function editText(L, isNew) {
    const t = L.text;
    const orig = Object.assign({}, t);
    const area = W.h('textarea', { class: 'w-textarea', rows: 4, dir: 'auto', style: { width: '100%', fontSize: '16px', fontFamily: W.fontStack(t.font) } });
    area.value = t.content;
    const upd = () => { renderTextLayer(L); compDirty = true; render(); };
    area.addEventListener('input', () => { t.content = area.value || ' '; upd(); });
    const font = W.fontSelect(t.font, async (f) => { t.font = f; area.style.fontFamily = W.fontStack(f); await W.ensureFont(f, t.bold ? 700 : 400); upd(); });
    const size = W.h('input', { class: 'w-input', type: 'number', value: t.size, min: 4, max: 2000 });
    size.addEventListener('input', () => { t.size = parseFloat(size.value) || 12; upd(); });
    const color = W.h('input', { type: 'color', class: 'w-color', value: t.color });
    color.addEventListener('input', () => { t.color = color.value; upd(); });
    const bold = W.h('input', { type: 'checkbox' }); bold.checked = !!t.bold; bold.addEventListener('change', () => { t.bold = bold.checked; upd(); });
    const shadow = W.h('input', { type: 'checkbox' }); shadow.checked = !!t.shadow; shadow.addEventListener('change', () => { t.shadow = shadow.checked; upd(); });
    const strokeC = W.h('input', { type: 'checkbox' }); strokeC.checked = !!t.stroke; strokeC.addEventListener('change', () => { t.stroke = strokeC.checked; t.strokeColor = t.strokeColor || colors.bg; upd(); });
    const align = W.segmented([{ value: 'start', icon: W.isRTL() ? 'align-right' : 'align-left' }, { value: 'center', icon: 'align-center' }, { value: 'end', icon: W.isRTL() ? 'align-left' : 'align-right' }], t.align || 'start', (v) => { t.align = v; upd(); });
    const body = W.h('div', { class: 'col', style: { minWidth: '380px' } },
      W.h('label', { class: 'w-label-sm', text: W.t('r.textContent') }), area,
      W.h('div', { class: 'w-input-group' }, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.font') }), font), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('ui.fontSize') }), size)),
      W.h('div', { class: 'row', style: { flexWrap: 'wrap' } }, color, align,
        W.h('label', { class: 'w-check-row' }, bold, W.h('span', { text: W.t('ui.bold') })),
        W.h('label', { class: 'w-check-row' }, shadow, W.h('span', { text: W.t('ui.shadow') })),
        W.h('label', { class: 'w-check-row' }, strokeC, W.h('span', { text: W.t('ui.stroke') }))));
    const before = isNew ? null : snapLayers();
    const ok = await W.dialog({ title: W.t('r.editText'), body, buttons: [{ i18n: 'ui.cancel', value: false }, { i18n: 'ui.ok', value: true, primary: true }] });
    if (!ok) { Object.assign(t, orig); renderTextLayer(L); changed(); return false; }
    if (!isNew) { before.layers.find((l) => l.id === L.id).text = orig; L.name = t.content.split('\n')[0].slice(0, 24); pushHist({ label: W.t('r.editText'), type: 'doc', before, after: snapLayers() }); renderTextLayer(L); }
    changed();
    return true;
  }

  /* ═══════════ الطبقات ═══════════ */
  const layersEl = document.getElementById('layers');
  function renderLayers() {
    if (!doc) { layersEl.innerHTML = ''; return; }
    const L0 = cur();
    blendSel.value = L0 ? L0.blend : 'normal';
    opacitySl.set(L0 ? Math.round(L0.opacity * 100) : 100);
    layersEl.innerHTML = '';
    [...doc.layers].reverse().forEach((L) => {
      const thumb = IMG.makeCanvas(44, 32);
      const tg = thumb.getContext('2d');
      const s = Math.min(44 / doc.w, 32 / doc.h);
      tg.drawImage(L.canvas, (44 - doc.w * s) / 2, (32 - doc.h * s) / 2, doc.w * s, doc.h * s);
      thumb.className = 'w-thumb checker';
      const eye = W.iconButton(L.visible ? 'eye' : 'eye-off', 'ui.visible', (e) => { e.stopPropagation(); docChange(W.t('ui.visible'), () => { L.visible = !L.visible; }); }, { cls: 'sm' });
      const lock = W.iconButton(L.locked ? 'lock' : 'unlock', 'ui.lock', (e) => { e.stopPropagation(); L.locked = !L.locked; renderLayers(); }, { cls: 'sm' + (L.locked ? '' : ' faint') });
      const row = W.h('div', { class: 'w-list-item' + (L.id === doc.current ? ' selected' : ''), draggable: true, 'data-id': L.id }, eye, thumb, W.h('span', { class: 'w-name', text: (L.text ? 'T  ' : '') + L.name }), lock);
      row.addEventListener('click', () => { doc.current = L.id; renderLayers(); });
      row.addEventListener('dblclick', async () => {
        if (L.text) { editText(L); return; }
        const v = await W.prompt(W.t('ui.name'), L.name, { title: W.t('ui.rename') });
        if (v) docChange(W.t('ui.rename'), () => { L.name = v; });
      });
      row.addEventListener('contextmenu', (e) => { doc.current = L.id; renderLayers(); W.contextMenu(e, layerMenu()); });
      row.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/x-layer', L.id); });
      row.addEventListener('dragover', (e) => { if (e.dataTransfer.types.includes('text/x-layer')) { e.preventDefault(); row.classList.add('drag-over'); } });
      row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
      row.addEventListener('drop', (e) => {
        e.preventDefault(); row.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/x-layer');
        if (!id || id === L.id) return;
        docChange(W.t('r.layerProps'), () => {
          const from = layerIdx(id); const [m] = doc.layers.splice(from, 1);
          doc.layers.splice(layerIdx(L.id) + 1, 0, m);
        });
      });
      layersEl.append(row);
    });
  }
  const blendSel = W.h('select', { class: 'w-select sm' });
  const renderBlendSel = () => { const v = blendSel.value; blendSel.innerHTML = ''; BLENDS.forEach((b) => blendSel.append(W.h('option', { value: b, text: W.t('r.n.' + b) }))); blendSel.value = v || 'normal'; };
  renderBlendSel();
  blendSel.addEventListener('change', () => { const L = cur(); if (L) docChange(W.t('r.blend'), () => { L.blend = blendSel.value; }); });
  let opacityBefore = null;
  const opacitySl = W.slider({ i18n: 'r.opacityShort', min: 0, max: 100, value: 100, onInput: (v) => { const L = cur(); if (!L) return; if (!opacityBefore) opacityBefore = snapLayers(); L.opacity = v / 100; compDirty = true; render(); }, onChange: () => { if (opacityBefore) { pushHist({ label: W.t('ui.opacity'), type: 'doc', before: opacityBefore, after: snapLayers() }); opacityBefore = null; renderLayers(); } } });
  document.getElementById('layer-opts').append(W.h('div', { class: 'w-field' }, W.h('label', { 'data-i18n': 'r.blend', text: W.t('r.blend') }), blendSel), opacitySl);
  const layerBtns = document.getElementById('layer-btns');
  layerBtns.append(
    W.iconButton('plus', 'r.newLayer', () => addLayer(), { cls: 'sm', shortcut: 'Mod+Shift+N' }),
    W.iconButton('duplicate', 'r.dupLayer', () => dupLayer(), { cls: 'sm', shortcut: 'Mod+J' }),
    W.iconButton('merge', 'r.mergeDown', () => mergeDown(), { cls: 'sm', shortcut: 'Mod+E' }),
    W.iconButton('image', 'r.placeImage', () => placeImage(), { cls: 'sm' }),
    W.iconButton('trash', 'r.delLayer', () => delLayer(), { cls: 'sm' }));
  function addLayer() {
    if (!doc) return;
    docChange(W.t('r.newLayer'), () => {
      const L = makeLayer(W.t('r.layer', { n: ++layerSeq }), doc.w, doc.h);
      doc.layers.splice(layerIdx(doc.current) + 1, 0, L);
      doc.current = L.id;
    });
  }
  function dupLayer() {
    if (!doc) return;
    const L = cur();
    docChange(W.t('r.dupLayer'), () => {
      const n = Object.assign({}, L, { id: W.uid('L'), name: L.name + ' ' + W.t('ui.copySuffix'), canvas: IMG.cloneCanvas(L.canvas), text: L.text ? Object.assign({}, L.text) : null });
      doc.layers.splice(layerIdx(L.id) + 1, 0, n);
      doc.current = n.id;
    });
  }
  function delLayer() {
    if (!doc || doc.layers.length < 2) return;
    docChange(W.t('r.delLayer'), () => {
      const i = layerIdx(doc.current);
      doc.layers.splice(i, 1);
      doc.current = doc.layers[Math.max(0, i - 1)].id;
    });
  }
  function mergeDown() {
    const i = layerIdx(doc.current);
    if (i <= 0) return;
    docChange(W.t('r.mergeDown'), () => {
      const top = doc.layers[i], below = doc.layers[i - 1];
      const g = below.canvas.getContext('2d');
      if (top.visible) { g.globalAlpha = top.opacity; g.globalCompositeOperation = op(top.blend); g.drawImage(top.canvas, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; }
      below.text = null;
      doc.layers.splice(i, 1);
      doc.current = below.id;
    });
  }
  function flatten() {
    if (!doc) return;
    docChange(W.t('r.flatten'), () => {
      const L = makeLayer(W.t('r.background'), doc.w, doc.h);
      const g = L.canvas.getContext('2d');
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, doc.w, doc.h);
      composite(comp, { noHook: true });
      g.drawImage(comp, 0, 0);
      doc.layers = [L]; doc.current = L.id;
    });
  }
  function flipLayer(h) {
    const L = cur();
    if (!canPaint(L)) return;
    docChange(W.t(h ? 'r.flipLayerH' : 'r.flipLayerV'), () => {
      const c = IMG.makeCanvas(doc.w, doc.h), g = c.getContext('2d');
      g.translate(h ? doc.w : 0, h ? 0 : doc.h); g.scale(h ? -1 : 1, h ? 1 : -1); g.drawImage(L.canvas, 0, 0);
      L.canvas = c;
      if (L.text) { L.text = null; }
    });
  }
  const layerMenu = () => [
    { i18n: 'r.newLayer', icon: 'plus', action: addLayer },
    { i18n: 'r.dupLayer', icon: 'duplicate', action: dupLayer },
    { i18n: 'r.delLayer', icon: 'trash', action: delLayer },
    '-',
    { i18n: 'r.mergeDown', icon: 'merge', action: mergeDown },
    { i18n: 'r.flatten', action: flatten },
    { i18n: 'r.flipLayerH', icon: 'flip-h', action: () => flipLayer(true) },
    { i18n: 'r.flipLayerV', icon: 'flip-v', action: () => flipLayer(false) }
  ];

  /* ═══════════ لوحة الألوان والسجل ═══════════ */
  const colorPanel = document.getElementById('color-panel');
  function renderColorPanel() {
    colorPanel.innerHTML = '';
    const fg = W.h('input', { type: 'color', class: 'w-color', value: colors.fg });
    fg.addEventListener('input', () => { colors.fg = fg.value; renderTools(); });
    const bg = W.h('input', { type: 'color', class: 'w-color', value: colors.bg });
    bg.addEventListener('input', () => { colors.bg = bg.value; renderTools(); });
    colorPanel.append(
      W.h('div', { class: 'row', style: { marginBottom: '8px' } }, fg, W.h('span', { class: 'small', text: W.t('r.fgColor') }), W.h('div', { class: 'grow' }), bg, W.h('span', { class: 'small', text: W.t('r.bgColor') })),
      W.swatches((c) => { colors.fg = c; renderTools(); renderColorPanel(); })
    );
  }
  const histEl = document.getElementById('history');
  function renderHistory() {
    histEl.innerHTML = '';
    history.list.forEach((h, i) => {
      histEl.append(W.h('div', { class: 'w-list-item' + (i === history.index ? ' selected' : '') + (i > history.index ? ' faded' : ''), onclick: () => gotoHist(i) }, W.h('span', { class: 'w-name', text: h.label })));
    });
    histEl.scrollTop = histEl.scrollHeight;
  }

  /* ═══════════ التعديلات والمرشحات ═══════════ */
  /**
   * حوار تعديل مع معاينة حية: sliders [{key,i18n,min,max,value,step}], fn(canvas, params) → canvas
   */
  async function adjustDialog(titleKey, sliders, fn) {
    const L = cur();
    if (!doc || !canPaint(L) || !(await ensureRaster(L))) return;
    const orig = IMG.cloneCanvas(L.canvas);
    const params = {};
    sliders.forEach((s) => { params[s.key] = s.value; });
    let pending = false;
    const apply = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const g = L.canvas.getContext('2d');
        g.clearRect(0, 0, doc.w, doc.h); g.drawImage(orig, 0, 0);
        applyMasked(L, () => fn(IMG.cloneCanvas(orig), params));
        compDirty = true; render();
      });
    };
    const body = W.h('div', { style: { minWidth: '340px' } });
    sliders.forEach((s) => {
      if (s.type === 'checkbox') {
        const c = W.h('input', { type: 'checkbox' }); c.checked = !!s.value;
        c.addEventListener('change', () => { params[s.key] = c.checked; apply(); });
        body.append(W.h('label', { class: 'w-check-row' }, c, W.h('span', { text: W.t(s.i18n) })));
        return;
      }
      body.append(W.slider({ i18n: s.i18n, min: s.min, max: s.max, step: s.step || 1, value: s.value, reset: s.value, onInput: (v) => { params[s.key] = v; apply(); } }));
    });
    apply();
    const ok = await W.dialog({ title: W.t(titleKey).replace('…', ''), body, buttons: [{ i18n: 'ui.cancel', value: false }, { i18n: 'ui.apply', value: true, primary: true }] });
    await new Promise((r) => requestAnimationFrame(r));
    const g = L.canvas.getContext('2d');
    if (!ok) { g.clearRect(0, 0, doc.w, doc.h); g.drawImage(orig, 0, 0); changed(); return; }
    const before = orig.getContext('2d').getImageData(0, 0, doc.w, doc.h);
    const after = g.getImageData(0, 0, doc.w, doc.h);
    pushHist({ label: W.t(titleKey).replace('…', ''), type: 'pixels', layerId: L.id, rect: { x: 0, y: 0, w: doc.w, h: doc.h }, before, after });
    changed();
  }
  /** تعديل فوري دون حوار */
  async function instant(labelKey, fn) {
    const L = cur();
    if (!doc || !canPaint(L) || !(await ensureRaster(L))) return;
    pixelChange(W.t(labelKey).replace('…', ''), L, null, () => applyMasked(L, (c) => fn(c)));
  }
  const viaData = (fn) => (c, p) => { const g = c.getContext('2d'); const d = g.getImageData(0, 0, c.width, c.height); fn(d, p); g.putImageData(d, 0, 0); return c; };
  const viaFilter = (filterFn) => (c, p) => { const n = IMG.makeCanvas(c.width, c.height), g = n.getContext('2d'); g.filter = filterFn(p); g.drawImage(c, 0, 0); g.filter = 'none'; return n; };
  const ADJ = {
    brightness: () => adjustDialog('r.brightness', [{ key: 'brightness', i18n: 'a.brightness', min: -100, max: 100, value: 0 }, { key: 'contrast', i18n: 'a.contrast', min: -100, max: 100, value: 0 }], viaData((d, p) => IMG.adjust(d, p))),
    hueSat: () => adjustDialog('r.hueSat', [{ key: 'hue', i18n: 'a.hue', min: -180, max: 180, value: 0 }, { key: 'saturation', i18n: 'a.saturation', min: -100, max: 100, value: 0 }, { key: 'brightness', i18n: 'a.lightness', min: -100, max: 100, value: 0 }], viaData((d, p) => IMG.adjust(d, p))),
    exposure: () => adjustDialog('r.exposure', [{ key: 'exposure', i18n: 'a.exposure', min: -3, max: 3, step: 0.05, value: 0 }, { key: 'gamma', i18n: 'a.gamma', min: 0.2, max: 3, step: 0.05, value: 1 }], viaData((d, p) => IMG.adjust(d, p))),
    colorBalance: () => adjustDialog('r.colorBalance', [{ key: 'temperature', i18n: 'a.temperature', min: -100, max: 100, value: 0 }, { key: 'tint', i18n: 'a.tint', min: -100, max: 100, value: 0 }], viaData((d, p) => IMG.adjust(d, p))),
    vibrance: () => adjustDialog('r.vibrance', [{ key: 'vibrance', i18n: 'a.vibrance', min: -100, max: 100, value: 30 }, { key: 'saturation', i18n: 'a.saturation', min: -100, max: 100, value: 0 }], viaData((d, p) => IMG.adjust(d, p))),
    threshold: () => adjustDialog('r.threshold', [{ key: 't', i18n: 'a.level', min: 1, max: 255, value: 128 }], viaData((d, p) => IMG.threshold(d, p.t))),
    posterize: () => adjustDialog('r.posterize', [{ key: 'n', i18n: 'a.levels', min: 2, max: 32, value: 6 }], viaData((d, p) => IMG.posterize(d, p.n))),
    blur: () => adjustDialog('r.blur', [{ key: 'r', i18n: 'a.radius', min: 0, max: 100, step: 0.5, value: 4 }], viaFilter((p) => 'blur(' + p.r + 'px)')),
    sharpen: () => adjustDialog('r.sharpen', [{ key: 'a', i18n: 'a.amount', min: 0, max: 300, value: 80 }], viaData((d, p) => IMG.sharpen(d, p.a / 100))),
    noise: () => adjustDialog('r.noise', [{ key: 'a', i18n: 'a.amount', min: 0, max: 100, value: 15 }, { key: 'mono', i18n: 'a.mono', type: 'checkbox', value: true }], viaData((d, p) => IMG.noise(d, p.a, p.mono))),
    pixelate: () => adjustDialog('r.pixelate', [{ key: 's', i18n: 'a.size', min: 2, max: 200, value: 12 }], viaData((d, p) => IMG.pixelate(d, p.s))),
    vignette: () => adjustDialog('r.vignette', [{ key: 'a', i18n: 'a.amount', min: 0, max: 100, value: 50 }, { key: 's', i18n: 'a.size', min: 0, max: 100, value: 50 }], viaData((d, p) => IMG.vignette(d, p.a, p.s))),
    glow: () => adjustDialog('r.glow', [{ key: 'r', i18n: 'a.radius', min: 1, max: 60, value: 12 }, { key: 'a', i18n: 'a.amount', min: 0, max: 100, value: 45 }], (c, p) => {
      const blurred = IMG.blurCanvas(c, p.r);
      const g = c.getContext('2d'); g.globalAlpha = p.a / 100; g.globalCompositeOperation = 'screen'; g.drawImage(blurred, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      return c;
    }),
    grayscale: () => instant('r.grayscale', viaData((d) => IMG.adjust(d, { grayscale: true }))),
    invert: () => instant('r.invert', viaData((d) => IMG.adjust(d, { invert: true }))),
    sepia: () => instant('r.sepia', viaData((d) => IMG.adjust(d, { sepia: 100 }))),
    emboss: () => instant('r.emboss', viaData((d) => IMG.emboss(d))),
    edges: () => instant('r.edges', viaData((d) => IMG.edges(d))),
    autoLevels: () => instant('r.autoLevels', viaData((d) => {
      const h = IMG.histogram(d, 2);
      const total = h.l.reduce((a, b) => a + b, 0);
      const pct = (arr, p) => { let s = 0; for (let i = 0; i < 256; i++) { s += arr[i]; if (s >= total * p) return i; } return 255; };
      ['r', 'g', 'b'].forEach((ch, ci) => {
        const lo = pct(h[ch], 0.005), hi = pct(h[ch], 0.995);
        const scale = hi > lo ? 255 / (hi - lo) : 1;
        for (let i = ci; i < d.data.length; i += 4) d.data[i] = (d.data[i] - lo) * scale;
      });
    }))
  };

  /* ═══════════ عمليات الصورة ═══════════ */
  async function imageSize() {
    if (!doc) return;
    const ratio = doc.w / doc.h;
    const v = await W.form(W.t('r.imageSize').replace('…', ''), [
      { key: 'w', i18n: 'ui.width', type: 'number', value: doc.w, min: 1, max: 20000, row: 'a', onInput: (val, inputs) => { if (inputs.keep.checked) inputs.h.value = Math.round(val / ratio); } },
      { key: 'h', i18n: 'ui.height', type: 'number', value: doc.h, min: 1, max: 20000, row: 'a', onInput: (val, inputs) => { if (inputs.keep.checked) inputs.w.value = Math.round(val * ratio); } },
      { key: 'keep', i18n: 'r.keepRatio', type: 'checkbox', value: true }
    ]);
    if (!v || !v.w || !v.h) return;
    const w = Math.round(v.w), h = Math.round(v.h);
    docChange(W.t('r.imageSize').replace('…', ''), () => {
      const sx = w / doc.w, sy = h / doc.h;
      doc.layers.forEach((L) => {
        const n = IMG.makeCanvas(w, h), g = n.getContext('2d');
        g.imageSmoothingQuality = 'high';
        g.drawImage(L.canvas, 0, 0, w, h);
        L.canvas = n;
        if (L.text) { L.text.x *= sx; L.text.y *= sy; L.text.size *= Math.min(sx, sy); renderTextLayer(L); }
      });
      doc.w = w; doc.h = h; doc.sel = null;
    });
    fit();
  }
  async function canvasSize() {
    if (!doc) return;
    const v = await W.form(W.t('r.canvasSize').replace('…', ''), [
      { key: 'w', i18n: 'ui.width', type: 'number', value: doc.w, min: 1, max: 20000, row: 'a' },
      { key: 'h', i18n: 'ui.height', type: 'number', value: doc.h, min: 1, max: 20000, row: 'a' },
      { key: 'anchor', i18n: 'r.anchor', type: 'select', value: 'c', options: [{ value: 'c', i18n: 'ui.center' }, { value: 'tl', label: '↖' }, { value: 'tr', label: '↗' }, { value: 'bl', label: '↙' }, { value: 'br', label: '↘' }] }
    ]);
    if (!v) return;
    const w = Math.round(v.w), h = Math.round(v.h);
    const ox = v.anchor === 'c' ? (w - doc.w) / 2 : v.anchor.includes('l') ? 0 : w - doc.w;
    const oy = v.anchor === 'c' ? (h - doc.h) / 2 : v.anchor.includes('t') ? 0 : h - doc.h;
    docChange(W.t('r.canvasSize').replace('…', ''), () => {
      doc.layers.forEach((L) => { const n = IMG.makeCanvas(w, h); n.getContext('2d').drawImage(L.canvas, Math.round(ox), Math.round(oy)); L.canvas = n; if (L.text) { L.text.x += ox; L.text.y += oy; } });
      doc.w = w; doc.h = h; doc.sel = null;
    });
    fit();
  }
  function transformImage(kind) {
    if (!doc) return;
    const labels = { cw: 'r.rotate90', ccw: 'r.rotate90ccw', r180: 'r.rotate180', fh: 'r.flipH', fv: 'r.flipV' };
    docChange(W.t(labels[kind]), () => {
      const swap = kind === 'cw' || kind === 'ccw';
      const w = swap ? doc.h : doc.w, h = swap ? doc.w : doc.h;
      doc.layers.forEach((L) => {
        const n = IMG.makeCanvas(w, h), g = n.getContext('2d');
        if (kind === 'cw') { g.translate(w, 0); g.rotate(Math.PI / 2); }
        else if (kind === 'ccw') { g.translate(0, h); g.rotate(-Math.PI / 2); }
        else if (kind === 'r180') { g.translate(w, h); g.rotate(Math.PI); }
        else if (kind === 'fh') { g.translate(w, 0); g.scale(-1, 1); }
        else if (kind === 'fv') { g.translate(0, h); g.scale(1, -1); }
        g.drawImage(L.canvas, 0, 0);
        L.canvas = n; L.text = null;
      });
      doc.w = w; doc.h = h; doc.sel = null;
    });
    fit();
  }
  function cropToSelection() {
    if (!doc || !doc.sel) return;
    const b = selBounds();
    if (!b) return;
    cropRect = { x1: b.x, y1: b.y, x2: b.x + b.w, y2: b.y + b.h };
    applyCrop();
  }
  async function fillSelection() {
    const L = cur();
    if (!doc || !canPaint(L) || !(await ensureRaster(L))) return;
    pixelChange(W.t('r.fillFg'), L, null, () => applyMasked(L, (c) => { const g = c.getContext('2d'); g.fillStyle = colors.fg; g.fillRect(0, 0, doc.w, doc.h); return c; }));
  }
  async function clearSelection() {
    const L = cur();
    if (!doc || !doc.sel || !canPaint(L) || !(await ensureRaster(L))) return;
    pixelChange(W.t('r.clearSel'), L, null, () => { const g = L.canvas.getContext('2d'); g.globalCompositeOperation = 'destination-out'; g.drawImage(doc.sel.mask, 0, 0); g.globalCompositeOperation = 'source-over'; });
  }
  function layerFromSelection() {
    if (!doc) return;
    const L = cur();
    docChange(W.t('r.layerFromSel'), () => {
      const n = makeLayer(W.t('r.layer', { n: ++layerSeq }), doc.w, doc.h);
      const g = n.canvas.getContext('2d');
      g.drawImage(L.canvas, 0, 0);
      if (doc.sel) { g.globalCompositeOperation = 'destination-in'; g.drawImage(doc.sel.mask, 0, 0); }
      doc.layers.splice(layerIdx(L.id) + 1, 0, n);
      doc.current = n.id;
    });
  }

  /* ═══════════ الحافظة ═══════════ */
  let clip = null;
  async function copySel(merged, cut) {
    if (!doc) return;
    const src = merged ? (composite(comp, { noHook: true }), comp) : cur().canvas;
    const b = doc.sel ? selBounds() : { x: 0, y: 0, w: doc.w, h: doc.h };
    if (!b) return;
    const c = IMG.makeCanvas(b.w, b.h), g = c.getContext('2d');
    g.drawImage(src, -b.x, -b.y);
    if (doc.sel) { g.globalCompositeOperation = 'destination-in'; g.drawImage(doc.sel.mask, -b.x, -b.y); }
    clip = { canvas: c, x: b.x, y: b.y };
    try {
      const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (e) { /* الحافظة الداخلية تكفي */ }
    if (cut) clearSelection();
  }
  async function pasteImage(fromEvent) {
    let img = null;
    if (fromEvent) img = fromEvent;
    else {
      try {
        const items = await navigator.clipboard.read();
        for (const it of items) { const t = it.types.find((x) => x.startsWith('image/')); if (t) { img = await W.loadImage(URL.createObjectURL(await it.getType(t))); break; } }
      } catch (e) { /* تجاهل */ }
    }
    if (!img && clip) { addImageLayer(clip.canvas, W.t('r.layer', { n: layerSeq + 1 }), clip.x, clip.y); return; }
    if (!img) return;
    if (!doc) { openImageAsDoc(img, null); return; }
    addImageLayer(img, W.t('r.layer', { n: layerSeq + 1 }));
  }
  document.addEventListener('paste', async (e) => {
    if (e.target.closest('input, textarea, [contenteditable]')) return;
    const f = Array.from(e.clipboardData.files || []).find((x) => x.type.startsWith('image/'));
    if (!f) return;
    e.preventDefault();
    pasteImage(await W.loadImage(URL.createObjectURL(f)));
  });
  function addImageLayer(img, name, x, y) {
    const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    docChange(W.t('r.placeImage').replace('…', ''), () => {
      const L = makeLayer(name || W.t('r.layer', { n: ++layerSeq }), doc.w, doc.h);
      let w = iw, h = ih;
      if (x == null) { const s = Math.min(1, doc.w / iw, doc.h / ih); w = iw * s; h = ih * s; x = (doc.w - w) / 2; y = (doc.h - h) / 2; }
      const g = L.canvas.getContext('2d'); g.imageSmoothingQuality = 'high';
      g.drawImage(img, x, y, w, h);
      doc.layers.splice(layerIdx(doc.current) + 1, 0, L);
      doc.current = L.id;
    });
    setTool('move');
  }

  /* ═══════════ الملفات ═══════════ */
  const IMG_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'svg', 'avif', 'ico'];
  let fileFormat = 'retoush';
  function startDoc(d, meta) {
    doc = d;
    history.list = []; history.index = -1;
    meta = meta || {};
    fileFormat = meta.format || 'retoush';
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: !!meta.dirty });
    welcome.hide();
    stage.classList.add('has-doc');
    compDirty = true;
    renderLayers(); renderHistory(); fit();
  }
  function openImageAsDoc(img, meta) {
    const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
    const d = newDocument(w, h, 'transparent');
    d.layers[0].canvas.getContext('2d').drawImage(img, 0, 0);
    startDoc(d, meta);
  }
  async function newDocFlow() {
    if (!(await W.confirmDiscard())) return;
    const presets = [
      ['custom', W.t('ui.custom'), 1200, 800], ['ig', 'Instagram 1080×1080', 1080, 1080], ['story', W.lang === 'ar' ? 'قصة/ريلز 1080×1920' : 'Story/Reel 1080×1920', 1080, 1920],
      ['hd', 'Full HD 1920×1080', 1920, 1080], ['4k', '4K 3840×2160', 3840, 2160], ['a4', 'A4 300dpi 2480×3508', 2480, 3508], ['yt', W.lang === 'ar' ? 'صورة يوتيوب 1280×720' : 'YouTube thumbnail 1280×720', 1280, 720], ['x', 'X/Twitter 1600×900', 1600, 900]
    ];
    const v = await W.form(W.t('r.newDoc'), [
      { key: 'preset', i18n: 'r.preset', type: 'select', value: 'ig', options: presets.map((p) => ({ value: p[0], label: p[1] })), onInput: (val, inputs) => { const p = presets.find((x) => x[0] === val); if (p && val !== 'custom') { inputs.w.value = p[2]; inputs.h.value = p[3]; } } },
      { key: 'w', i18n: 'ui.width', type: 'number', value: 1080, min: 1, max: 20000, row: 'a' },
      { key: 'h', i18n: 'ui.height', type: 'number', value: 1080, min: 1, max: 20000, row: 'a' },
      { key: 'bg', i18n: 'r.bgFill', type: 'select', value: 'white', options: [{ value: 'white', i18n: 'r.white' }, { value: 'transparent', i18n: 'r.transparent' }, { value: 'fg', i18n: 'r.fg' }] }
    ]);
    if (!v) return;
    startDoc(newDocument(W.clamp(v.w | 0, 1, 20000), W.clamp(v.h | 0, 1, 20000), v.bg === 'white' ? '#ffffff' : v.bg === 'fg' ? colors.fg : 'transparent'), {});
  }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'صور ومشاريع', en: 'Images & projects' }, ext: IMG_EXT.concat(['retoush']) }], as: 'bytes' });
    if (f[0]) await loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { await loadFile(await W.files.readPath(p, 'bytes')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  async function loadFile(f) {
    try {
      const bytes = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
      if (f.ext === 'retoush') {
        const j = JSON.parse(W.files.decodeText(bytes));
        const d = { w: j.w, h: j.h, layers: [], current: null, sel: null };
        for (const L of j.layers) {
          const n = makeLayer(L.name, j.w, j.h);
          Object.assign(n, { visible: L.visible, opacity: L.opacity, blend: L.blend || 'normal', locked: !!L.locked, text: L.text || null });
          const img = await W.loadImage(L.png);
          n.canvas.getContext('2d').drawImage(img, 0, 0);
          d.layers.push(n);
        }
        d.current = d.layers[Math.min(j.current || 0, d.layers.length - 1)].id;
        layerSeq = d.layers.length;
        startDoc(d, { name: f.name, path: f.path, format: 'retoush' });
      } else {
        const img = await W.bytesToImage(bytes, f.ext);
        openImageAsDoc(img, { name: f.name, path: f.path, format: ['png', 'jpg', 'jpeg', 'webp'].includes(f.ext) ? (f.ext === 'jpeg' ? 'jpg' : f.ext) : 'retoush' });
      }
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  async function placeImage() {
    if (!doc) return;
    const f = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: IMG_EXT }], multiple: true, as: 'bytes' });
    for (const x of f) addImageLayer(await W.bytesToImage(x.data, x.ext), W.files.base(x.name));
  }
  async function serialize(fmt, quality) {
    if (fmt === 'retoush') {
      return JSON.stringify({ app: 'retoush', version: 1, w: doc.w, h: doc.h, current: layerIdx(doc.current), layers: doc.layers.map((L) => ({ name: L.name, visible: L.visible, opacity: L.opacity, blend: L.blend, locked: L.locked, text: L.text, png: L.canvas.toDataURL('image/png') })) });
    }
    composite(comp, { noHook: true });
    let src = comp;
    if (fmt === 'jpg') { src = IMG.makeCanvas(doc.w, doc.h); const g = src.getContext('2d'); g.fillStyle = '#ffffff'; g.fillRect(0, 0, doc.w, doc.h); g.drawImage(comp, 0, 0); }
    return W.canvasToBytes(src, fmt === 'jpg' ? 'image/jpeg' : fmt === 'webp' ? 'image/webp' : 'image/png', quality || 0.92);
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : W.t('ui.untitled'));
  const TYPE = { retoush: { name: { ar: 'مشروع رتوش', en: 'Retoush project' }, ext: ['retoush'] }, png: { name: { ar: 'صورة PNG', en: 'PNG image' }, ext: ['png'] }, jpg: { name: { ar: 'صورة JPG', en: 'JPG image' }, ext: ['jpg', 'jpeg'] }, webp: { name: { ar: 'صورة WebP', en: 'WebP image' }, ext: ['webp'] } };
  async function save(as) {
    if (!doc) return;
    if (as || !W.doc.path) {
      const res = await W.files.save({ data: await serialize('retoush'), name: baseName() + '.retoush', types: [TYPE.retoush, TYPE.png, TYPE.jpg, TYPE.webp] });
      if (!res) return;
      let ext = W.files.ext(res.name); if (ext === 'jpeg') ext = 'jpg';
      if (ext && ext !== 'retoush' && W.isElectron) await W.files.save({ data: await serialize(ext), name: res.name, path: res.path });
      fileFormat = TYPE[ext] ? ext : 'retoush';
      W.setDoc({ name: res.name, path: res.path, dirty: false });
      if (res.path) W.recent.add(res.path, res.name);
    } else {
      await W.files.save({ data: await serialize(fileFormat), name: W.doc.name, path: W.doc.path });
      W.setDirty(false);
    }
    W.toast(W.t('ui.saved'), 'success');
  }
  async function exportAs(fmt) {
    if (!doc) return;
    let q = 0.92;
    if (fmt === 'jpg' || fmt === 'webp') {
      const v = await W.form(W.t('cmd.export'), [{ key: 'q', i18n: 'r.quality', type: 'range', min: 10, max: 100, value: 92 }]);
      if (!v) return;
      q = v.q / 100;
    }
    const res = await W.files.save({ data: await serialize(fmt, q), name: baseName() + '.' + fmt, types: [TYPE[fmt]] });
    if (res) W.toast(W.t('ui.exported'), 'success');
  }

  /* ═══════════ القوائم ═══════════ */
  const needDoc = () => !doc;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'cmd.new', icon: 'file-plus', shortcut: 'Mod+N', action: newDocFlow },
      { i18n: 'cmd.open', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      { i18n: 'r.placeImage', icon: 'image', action: placeImage, disabled: needDoc },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => save(false), disabled: needDoc, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => save(true), disabled: needDoc, global: true },
      { i18n: 'cmd.export', icon: 'export', disabled: needDoc, submenu: [{ i18n: 'r.exportPng', action: () => exportAs('png') }, { i18n: 'r.exportJpg', action: () => exportAs('jpg') }, { i18n: 'r.exportWebp', action: () => exportAs('webp') }] },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'cmd.cut', icon: 'cut', shortcut: 'Mod+X', action: () => copySel(false, true), disabled: needDoc },
      { i18n: 'cmd.copy', icon: 'copy', shortcut: 'Mod+C', action: () => copySel(false), disabled: needDoc },
      { i18n: 'r.copyMerged', shortcut: 'Mod+Shift+C', action: () => copySel(true), disabled: needDoc },
      { i18n: 'r.pasteNew', icon: 'paste', shortcut: 'Mod+V', action: () => pasteImage(), noBind: true },
      '-',
      { i18n: 'r.fillFg', icon: 'bucket', shortcut: 'Alt+Backspace', action: fillSelection, disabled: needDoc },
      { i18n: 'r.clearSel', icon: 'eraser', shortcut: 'Delete', action: clearSelection, disabled: needDoc }
    ] },
    { i18n: 'menu.image', items: [
      { i18n: 'r.adjustments', icon: 'sliders', disabled: needDoc, submenu: [
        { i18n: 'r.autoLevels', icon: 'wand', shortcut: 'Mod+Shift+L', action: ADJ.autoLevels },
        '-',
        { i18n: 'r.brightness', action: ADJ.brightness },
        { i18n: 'r.hueSat', shortcut: 'Mod+U', action: ADJ.hueSat },
        { i18n: 'r.exposure', action: ADJ.exposure },
        { i18n: 'r.colorBalance', action: ADJ.colorBalance },
        { i18n: 'r.vibrance', action: ADJ.vibrance },
        '-',
        { i18n: 'r.grayscale', action: ADJ.grayscale },
        { i18n: 'r.sepia', action: ADJ.sepia },
        { i18n: 'r.invert', shortcut: 'Mod+I', action: ADJ.invert },
        { i18n: 'r.threshold', action: ADJ.threshold },
        { i18n: 'r.posterize', action: ADJ.posterize }
      ] },
      '-',
      { i18n: 'r.imageSize', shortcut: 'Mod+Alt+I', action: imageSize, disabled: needDoc },
      { i18n: 'r.canvasSize', shortcut: 'Mod+Alt+C', action: canvasSize, disabled: needDoc },
      '-',
      { i18n: 'r.rotate90', icon: 'rotate-cw', action: () => transformImage('cw'), disabled: needDoc },
      { i18n: 'r.rotate90ccw', icon: 'rotate-ccw', action: () => transformImage('ccw'), disabled: needDoc },
      { i18n: 'r.rotate180', action: () => transformImage('r180'), disabled: needDoc },
      { i18n: 'r.flipH', icon: 'flip-h', action: () => transformImage('fh'), disabled: needDoc },
      { i18n: 'r.flipV', icon: 'flip-v', action: () => transformImage('fv'), disabled: needDoc },
      '-',
      { i18n: 'r.cropSel', icon: 'crop', action: cropToSelection, disabled: () => !doc || !doc.sel }
    ] },
    { i18n: 'menu.layer', items: [
      { i18n: 'r.newLayer', icon: 'plus', shortcut: 'Mod+Shift+N', action: addLayer, disabled: needDoc },
      { i18n: 'r.dupLayer', icon: 'duplicate', shortcut: 'Mod+J', action: dupLayer, disabled: needDoc },
      { i18n: 'r.layerFromSel', action: layerFromSelection, disabled: needDoc },
      { i18n: 'r.delLayer', icon: 'trash', action: delLayer, disabled: needDoc },
      '-',
      { i18n: 'r.mergeDown', icon: 'merge', shortcut: 'Mod+E', action: mergeDown, disabled: needDoc },
      { i18n: 'r.flatten', shortcut: 'Mod+Shift+E', action: flatten, disabled: needDoc },
      '-',
      { i18n: 'r.flipLayerH', icon: 'flip-h', action: () => flipLayer(true), disabled: needDoc },
      { i18n: 'r.flipLayerV', icon: 'flip-v', action: () => flipLayer(false), disabled: needDoc }
    ] },
    { i18n: 'r.select', items: [
      { i18n: 'r.selectAll', shortcut: 'Mod+A', action: selectAll, disabled: needDoc },
      { i18n: 'r.deselect', shortcut: 'Mod+D', action: deselect, disabled: needDoc },
      { i18n: 'r.invertSel', shortcut: 'Mod+Shift+I', action: invertSel, disabled: needDoc }
    ] },
    { i18n: 'menu.filter', items: [
      { i18n: 'r.blur', action: ADJ.blur, disabled: needDoc },
      { i18n: 'r.sharpen', action: ADJ.sharpen, disabled: needDoc },
      { i18n: 'r.noise', action: ADJ.noise, disabled: needDoc },
      { i18n: 'r.pixelate', action: ADJ.pixelate, disabled: needDoc },
      { i18n: 'r.glow', action: ADJ.glow, disabled: needDoc },
      { i18n: 'r.vignette', action: ADJ.vignette, disabled: needDoc },
      '-',
      { i18n: 'r.emboss', action: ADJ.emboss, disabled: needDoc },
      { i18n: 'r.edges', action: ADJ.edges, disabled: needDoc }
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
  const chrome = W.mountChrome({ menus, shortcuts: TOOLS.filter(Boolean).map((t) => ['t.' + t[0], t[2]]) });
  const status = chrome.status;
  function updateStatus() {
    status.item('size').textContent = doc ? W.t('r.docInfo', { w: doc.w, h: doc.h }) : '';
    status.item('zoom').textContent = doc ? Math.round(V.z * 100) + '%' : '';
    status.item('pos');
    const zl = document.getElementById('zoomlabel');
    if (zl) zl.textContent = Math.round(V.z * 100) + '%';
  }
  // اختصارات الأدوات
  TOOLS.filter(Boolean).filter((t, i, arr) => arr.findIndex((x) => x[2] === t[2]) === i).forEach((t) => W.keys.bind(t[2], () => { if (t[2] === 'M' && (tool === 'rect' || tool === 'ellipse')) setTool(tool === 'rect' ? 'ellipse' : 'rect'); else if (t[2] === 'G' && (tool === 'bucket' || tool === 'gradient')) setTool(tool === 'bucket' ? 'gradient' : 'bucket'); else setTool(t[0]); }));
  W.keys.bind('X', swapColors);
  W.keys.bind('D', () => { colors.fg = '#000000'; colors.bg = '#ffffff'; renderTools(); renderColorPanel(); });
  W.keys.bind('[', () => { const o = opts[tool]; if (o && o.size) { o.size = Math.max(1, Math.round(o.size / 1.2)); renderOptions(); render(); } });
  W.keys.bind(']', () => { const o = opts[tool]; if (o && o.size) { o.size = Math.min(500, Math.round(o.size * 1.2)); renderOptions(); render(); } });
  W.keys.bind('Enter', () => { if (cropRect) applyCrop(); });
  W.keys.bind('Escape', () => { if (cropRect) { cropRect = null; renderOptions(); render(); } else deselect(); });
  W.keys.bind('Backspace', () => clearSelection());

  /* ═══════════ شاشة الترحيب ═══════════ */
  const welcome = W.welcome(stage, {
    text: 'r.welcomeText',
    actions: [
      { i18n: 'cmd.open', icon: 'folder', primary: true, action: open },
      { i18n: 'r.newDoc', icon: 'file-plus', action: newDocFlow }
    ],
    openRecent: openPath
  });
  W.dropZone(stage, async (files) => {
    for (const f of files) {
      if (f.ext === 'retoush') { if (await W.confirmDiscard()) await loadFile({ name: f.name, path: f.path, ext: f.ext, data: new Uint8Array(f.data) }); return; }
      if (!IMG_EXT.includes(f.ext)) continue;
      const img = await W.bytesToImage(new Uint8Array(f.data), f.ext);
      if (!doc) openImageAsDoc(img, { name: f.name, path: f.path, format: ['png', 'jpg', 'jpeg', 'webp'].includes(f.ext) ? (f.ext === 'jpeg' ? 'jpg' : f.ext) : 'retoush' });
      else addImageLayer(img, W.files.base(f.name));
    }
  });
  W.onExternalFile((f) => loadFile(f), 'bytes');
  W.on('langchange', () => { renderTools(); renderOptions(); renderBlendSel(); renderLayers(); renderColorPanel(); renderHistory(); updateStatus(); });
  new ResizeObserver(() => { resizeView(); }).observe(stage);
  renderTools(); renderOptions(); renderColorPanel(); setTool('brush'); resizeView();

  window.__retoush = {
    get doc() { return doc; }, newDoc: (w, h, bg) => startDoc(newDocument(w, h, bg || '#ffffff'), {}),
    setTool, colors, opts, composite: () => { composite(comp, { noHook: true }); return comp; }, undo, redo, get history() { return history; }, ADJ, selectAll, addLayer, flatten
  };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const img = new ImageData(4, 4);
      img.data.fill(255);
      IMG.adjust(img, { brightness: -50, contrast: 20 });
      if (img.data[0] >= 255) errors.push('adjust');
      const r = IMG.region(new ImageData(5, 5), 0, 0, 0);
      if (!r || r.w !== 5) errors.push('region');
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
