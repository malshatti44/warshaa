/* طيف Tayf — تحميض الصور وتصحيح الألوان */
(function () {
  'use strict';
  const IMG = globalThis.WarshaImg;

  W.init({
    id: 'tayf',
    i18n: {
      ar: {
        'y.import': 'استيراد صور…', 'y.export': 'تصدير…', 'y.exportAll': 'تصدير الكل…', 'y.basic': 'أساسي', 'y.presence': 'الحضور', 'y.hsl': 'الألوان (HSL)',
        'y.effects': 'المؤثرات', 'y.detail': 'التفاصيل', 'y.geometry': 'القص والتدوير', 'y.presets': 'إعدادات جاهزة', 'y.histogram': 'المدرج التكراري',
        'y.temperature': 'الحرارة', 'y.tint': 'الصبغة', 'y.exposure': 'التعريض', 'y.contrast': 'التباين', 'y.highlights': 'الإضاءات', 'y.shadows': 'الظلال',
        'y.whites': 'البياض', 'y.blacks': 'السواد', 'y.clarity': 'الوضوح', 'y.vibrance': 'الحيوية', 'y.saturation': 'التشبع', 'y.fade': 'البهتان',
        'y.vignette': 'تظليل الأطراف', 'y.vigSize': 'حجم التظليل', 'y.grain': 'الحبيبات', 'y.sharpen': 'الحدة', 'y.straighten': 'تقويم الأفق',
        'y.hue': 'الصبغة', 'y.sat': 'التشبع', 'y.lum': 'الإضاءة', 'y.b.red': 'أحمر', 'y.b.orange': 'برتقالي', 'y.b.yellow': 'أصفر', 'y.b.green': 'أخضر',
        'y.b.aqua': 'سماوي', 'y.b.blue': 'أزرق', 'y.b.purple': 'بنفسجي', 'y.b.magenta': 'أرجواني', 'y.before': 'قبل/بعد', 'y.reset': 'إعادة ضبط الكل',
        'y.copy': 'نسخ الإعدادات', 'y.paste': 'لصق الإعدادات', 'y.syncAll': 'تطبيق على كل الصور', 'y.auto': 'تلقائي', 'y.crop': 'قص', 'y.doneCrop': 'تم',
        'y.rotateL': 'تدوير لليسار', 'y.rotateR': 'تدوير لليمين', 'y.flip': 'قلب أفقي', 'y.ratio': 'النسبة', 'y.original': 'الأصلية', 'y.free': 'حرة',
        'y.welcomeText': 'استورد صورك لتحميضها: إضاءة، ألوان، تباين، وإعدادات جاهزة بلمسة واحدة', 'y.photos': '{n} صورة', 'y.remove': 'إزالة من المكتبة',
        'y.format': 'الصيغة', 'y.quality': 'الجودة', 'y.longEdge': 'الضلع الأطول (بكسل، 0 = الأصلي)', 'y.exported': 'تم تصدير {n} صورة', 'y.mono': 'أبيض وأسود',
        'y.p.none': 'الأصل', 'y.p.warm': 'دافئ', 'y.p.cool': 'بارد', 'y.p.bw': 'أبيض وأسود', 'y.p.bwContrast': 'أبيض وأسود درامي', 'y.p.cinema': 'سينمائي',
        'y.p.vintage': 'عتيق', 'y.p.vivid': 'حيوي', 'y.p.soft': 'ناعم', 'y.p.desert': 'صحراء', 'y.p.night': 'ليلي', 'y.p.matte': 'مطفي', 'y.p.golden': 'الساعة الذهبية',
        'y.compare': 'مقارنة', 'y.flag': 'تمييز', 'y.rating': 'التقييم'
      },
      en: {
        'y.import': 'Import photos…', 'y.export': 'Export…', 'y.exportAll': 'Export all…', 'y.basic': 'Basic', 'y.presence': 'Presence', 'y.hsl': 'Color (HSL)',
        'y.effects': 'Effects', 'y.detail': 'Detail', 'y.geometry': 'Crop & rotate', 'y.presets': 'Presets', 'y.histogram': 'Histogram',
        'y.temperature': 'Temperature', 'y.tint': 'Tint', 'y.exposure': 'Exposure', 'y.contrast': 'Contrast', 'y.highlights': 'Highlights', 'y.shadows': 'Shadows',
        'y.whites': 'Whites', 'y.blacks': 'Blacks', 'y.clarity': 'Clarity', 'y.vibrance': 'Vibrance', 'y.saturation': 'Saturation', 'y.fade': 'Fade',
        'y.vignette': 'Vignette', 'y.vigSize': 'Vignette size', 'y.grain': 'Grain', 'y.sharpen': 'Sharpening', 'y.straighten': 'Straighten',
        'y.hue': 'Hue', 'y.sat': 'Saturation', 'y.lum': 'Luminance', 'y.b.red': 'Red', 'y.b.orange': 'Orange', 'y.b.yellow': 'Yellow', 'y.b.green': 'Green',
        'y.b.aqua': 'Aqua', 'y.b.blue': 'Blue', 'y.b.purple': 'Purple', 'y.b.magenta': 'Magenta', 'y.before': 'Before/After', 'y.reset': 'Reset all',
        'y.copy': 'Copy settings', 'y.paste': 'Paste settings', 'y.syncAll': 'Apply to all photos', 'y.auto': 'Auto', 'y.crop': 'Crop', 'y.doneCrop': 'Done',
        'y.rotateL': 'Rotate left', 'y.rotateR': 'Rotate right', 'y.flip': 'Flip horizontal', 'y.ratio': 'Ratio', 'y.original': 'Original', 'y.free': 'Free',
        'y.welcomeText': 'Import your photos to develop them: light, color, contrast and one-click presets', 'y.photos': '{n} photos', 'y.remove': 'Remove from library',
        'y.format': 'Format', 'y.quality': 'Quality', 'y.longEdge': 'Long edge (px, 0 = original)', 'y.exported': '{n} photos exported', 'y.mono': 'Black & white',
        'y.p.none': 'Original', 'y.p.warm': 'Warm', 'y.p.cool': 'Cool', 'y.p.bw': 'Black & white', 'y.p.bwContrast': 'Dramatic B&W', 'y.p.cinema': 'Cinematic',
        'y.p.vintage': 'Vintage', 'y.p.vivid': 'Vivid', 'y.p.soft': 'Soft', 'y.p.desert': 'Desert', 'y.p.night': 'Night', 'y.p.matte': 'Matte', 'y.p.golden': 'Golden hour',
        'y.compare': 'Compare', 'y.flag': 'Flag', 'y.rating': 'Rating'
      }
    }
  });

  const DEFAULTS = {
    temperature: 0, tint: 0, exposure: 0, contrast: 0, highlights: 0, shadows: 0, whites: 0, blacks: 0,
    clarity: 0, vibrance: 0, saturation: 0, fade: 0, grayscale: false,
    vignette: 0, vigSize: 50, grain: 0, sharpen: 0,
    hsl: {}, rotate: 0, flip: false, straighten: 0, crop: null
  };
  const fresh = () => JSON.parse(JSON.stringify(DEFAULTS));
  const PRESETS = {
    none: {},
    warm: { temperature: 28, tint: 4, vibrance: 15, contrast: 8 },
    cool: { temperature: -25, tint: -3, vibrance: 10, highlights: -10 },
    bw: { grayscale: true, contrast: 15, clarity: 10 },
    bwContrast: { grayscale: true, contrast: 45, blacks: -25, whites: 20, clarity: 30, vignette: 35, grain: 15 },
    cinema: { temperature: -8, contrast: 20, shadows: 15, highlights: -25, saturation: -12, fade: 15, vignette: 30, hsl: { orange: { h: 0, s: 15, l: 5 }, blue: { h: -10, s: 10, l: -10 }, aqua: { h: -15, s: 15, l: 0 } } },
    vintage: { temperature: 18, tint: 6, contrast: -10, fade: 35, saturation: -25, vignette: 40, grain: 25 },
    vivid: { vibrance: 45, saturation: 12, contrast: 15, clarity: 15 },
    soft: { contrast: -18, highlights: -20, shadows: 20, clarity: -20, fade: 10, vibrance: 8 },
    desert: { temperature: 35, tint: 8, contrast: 12, hsl: { orange: { h: 5, s: 25, l: 10 }, yellow: { h: -10, s: 20, l: 5 }, blue: { h: 0, s: -20, l: 10 } }, vignette: 20 },
    night: { temperature: -35, exposure: -0.3, contrast: 20, highlights: -20, saturation: -15, vignette: 45 },
    matte: { fade: 40, contrast: -8, saturation: -10, blacks: 15 },
    golden: { temperature: 40, tint: 10, exposure: 0.15, highlights: -15, shadows: 20, vibrance: 20, vignette: 25 }
  };

  /* ═══════════ المكتبة ═══════════ */
  let photos = [];   // {id, name, path, img, w, h, thumb, settings, flag}
  let current = null;
  const stage = document.getElementById('stage');
  const view = document.getElementById('view');
  const vg = view.getContext('2d');
  const strip = document.getElementById('strip');
  const panel = document.getElementById('panel');
  const histCanvas = document.getElementById('hist');
  const P = () => photos.find((p) => p.id === current);
  const storeKey = (p) => (p.path ? 'tayf.s.' + p.path : null);

  async function addPhotos(files) {
    let firstNew = null;
    for (const f of files) {
      try {
        const img = await W.bytesToImage(f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data), f.ext);
        const p = { id: W.uid('p'), name: f.name, path: f.path || null, img, w: img.naturalWidth, h: img.naturalHeight, settings: fresh(), flag: false };
        const saved = storeKey(p) && W.store.get(storeKey(p), null);
        if (saved) p.settings = Object.assign(fresh(), saved);
        p.preview = makePreview(img, 1600);
        p.thumbSrc = makePreview(img, 220);
        photos.push(p);
        if (!firstNew) firstNew = p;
      } catch (e) { W.toast(W.t('ui.openFailed') + ': ' + f.name, 'error'); }
    }
    if (firstNew) { welcome.hide(); select(firstNew.id); }
    renderStrip();
  }
  function makePreview(img, max) {
    const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = IMG.makeCanvas(img.naturalWidth * s, img.naturalHeight * s);
    const g = c.getContext('2d'); g.imageSmoothingQuality = 'high';
    g.drawImage(img, 0, 0, c.width, c.height);
    return c;
  }
  async function importPhotos() {
    const f = await W.files.open({ types: [{ name: { ar: 'صور', en: 'Images' }, ext: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'avif'] }], multiple: true, as: 'bytes' });
    if (f.length) await addPhotos(f);
  }
  function select(id) {
    current = id;
    cropMode = false;
    renderStrip(); renderPanel(); process(); fitView();
  }
  function renderStrip() {
    strip.innerHTML = '';
    photos.forEach((p) => {
      const t = W.h('div', { class: 't-thumb' + (p.id === current ? ' active' : '') + (p.flag ? ' flagged' : ''), title: p.name });
      const c = IMG.makeCanvas(p.thumbSrc.width, p.thumbSrc.height);
      renderTo(c, p.thumbSrc, p.settings, true);
      t.append(c);
      if (p.flag) t.append(W.h('span', { class: 't-flag', html: W.icon('star') }));
      t.addEventListener('click', () => select(p.id));
      t.addEventListener('contextmenu', (e) => W.contextMenu(e, [
        { i18n: 'y.flag', icon: 'star', checked: () => p.flag, action: () => { p.flag = !p.flag; renderStrip(); } },
        { i18n: 'y.copy', icon: 'copy', action: () => { clipSettings = JSON.parse(JSON.stringify(p.settings)); } },
        { i18n: 'y.paste', icon: 'paste', disabled: () => !clipSettings, action: () => { p.settings = Object.assign(fresh(), JSON.parse(JSON.stringify(clipSettings))); persist(p); if (p.id === current) { renderPanel(); process(); } renderStrip(); } },
        '-',
        { i18n: 'y.remove', icon: 'trash', action: () => { photos = photos.filter((x) => x !== p); if (current === p.id) { current = photos[0] ? photos[0].id : null; if (current) select(current); else { welcome.show(); render(); } } renderStrip(); } }
      ]));
      strip.append(t);
    });
    strip.append(W.h('button', { class: 't-add', type: 'button', 'data-tip': 'y.import', html: W.icon('plus'), onclick: importPhotos }));
    status.item('count').textContent = photos.length ? W.t('y.photos', { n: photos.length }) : '';
  }

  /* ═══════════ المعالجة ═══════════ */
  /** يرسم الصورة المعالجة من مصدر إلى لوحة الهدف (يغي\u0651ر حجم الهدف) */
  function renderTo(target, src, s, light) {
    // الهندسة: تدوير 90°، قلب، تقويم، قص
    const rot = ((s.rotate % 360) + 360) % 360;
    const swap = rot === 90 || rot === 270;
    const bw = swap ? src.height : src.width, bh = swap ? src.width : src.height;
    const base = IMG.makeCanvas(bw, bh), bg = base.getContext('2d');
    bg.translate(bw / 2, bh / 2);
    bg.rotate(rot * Math.PI / 180);
    if (s.flip) bg.scale(-1, 1);
    if (s.straighten) {
      const a = s.straighten * Math.PI / 180;
      const sc = Math.abs(Math.cos(a)) + Math.abs(Math.sin(a)) * Math.max(bw / bh, bh / bw);
      bg.rotate(a); bg.scale(sc, sc);
    }
    bg.drawImage(src, -src.width / 2, -src.height / 2);
    let cw = bw, ch = bh, cx = 0, cy = 0;
    if (s.crop) { cx = s.crop.x * bw; cy = s.crop.y * bh; cw = Math.max(1, s.crop.w * bw); ch = Math.max(1, s.crop.h * bh); }
    target.width = Math.round(cw); target.height = Math.round(ch);
    const g = target.getContext('2d');
    g.drawImage(base, -cx, -cy);
    // اللون والإضاءة
    const d = g.getImageData(0, 0, target.width, target.height);
    IMG.adjust(d, s);
    IMG.hslBands(d, s.hsl || {});
    if (s.clarity) IMG.clarity(d, s.clarity);
    if (s.sharpen && !light) IMG.sharpen(d, s.sharpen / 100);
    if (s.vignette) IMG.vignette(d, s.vignette, s.vigSize);
    if (s.grain && !light) IMG.grain(d, s.grain, Math.max(1, Math.round(Math.max(target.width, target.height) / 1200)));
    g.putImageData(d, 0, 0);
    return target;
  }
  const processed = IMG.makeCanvas(1, 1);
  let showBefore = false, pending = false;
  function process() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      const p = P();
      if (!p) return;
      renderTo(processed, p.preview, cropMode ? Object.assign({}, p.settings, { crop: null }) : p.settings);
      const h = IMG.histogram(processed.getContext('2d').getImageData(0, 0, processed.width, processed.height), 3);
      IMG.drawHistogram(histCanvas, h);
      render();
    });
  }
  const refreshThumb = W.debounce(() => renderStrip(), 500);
  const persist = W.debounce((p) => { if (storeKey(p)) W.store.set(storeKey(p), p.settings); }, 600);
  function changed(p) { p = p || P(); persist(p); process(); refreshThumb(); W.setDirty(false); }

  /* ═══════════ العرض ═══════════ */
  const V = { z: 0, fit: true, px: 0, py: 0 };
  function resize() {
    const r = stage.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    view.width = r.width * dpr; view.height = r.height * dpr;
    view.style.width = r.width + 'px'; view.style.height = r.height + 'px';
    render();
  }
  function fitView() { V.fit = true; render(); }
  function render() {
    const dpr = window.devicePixelRatio || 1;
    vg.setTransform(1, 0, 0, 1, 0, 0);
    vg.clearRect(0, 0, view.width, view.height);
    const p = P();
    if (!p) return;
    const src = showBefore ? p.preview : processed;
    const W2 = view.width / dpr, H2 = view.height / dpr;
    const s = Math.min((W2 - 40) / src.width, (H2 - 40) / src.height);
    const dw = src.width * s, dh = src.height * s, dx = (W2 - dw) / 2, dy = (H2 - dh) / 2;
    vg.setTransform(dpr, 0, 0, dpr, 0, 0);
    vg.shadowColor = 'rgba(0,0,0,.5)'; vg.shadowBlur = 20;
    vg.imageSmoothingQuality = 'high';
    if (compare && !showBefore) {
      vg.drawImage(processed, dx, dy, dw, dh);
      vg.shadowBlur = 0;
      const ratio = compare;
      const bs = Math.min((W2 - 40) / p.preview.width, (H2 - 40) / p.preview.height);
      vg.save();
      vg.beginPath(); vg.rect(W.isRTL() ? dx + dw * ratio : dx, dy, dw * (1 - ratio), dh); vg.clip();
      if (!p.settings.crop && !p.settings.rotate && !p.settings.straighten && !p.settings.flip) vg.drawImage(p.preview, (W2 - p.preview.width * bs) / 2, (H2 - p.preview.height * bs) / 2, p.preview.width * bs, p.preview.height * bs);
      vg.restore();
      const lx = dx + dw * (W.isRTL() ? ratio : 1 - ratio);
      vg.fillStyle = '#fff'; vg.fillRect(lx - 1, dy, 2, dh);
    } else vg.drawImage(src, dx, dy, dw, dh);
    vg.shadowBlur = 0;
    view._map = { dx, dy, dw, dh };
    if (cropMode) drawCrop(dx, dy, dw, dh);
    if (showBefore) {
      vg.fillStyle = 'rgba(0,0,0,.6)'; vg.fillRect(dx + 10, dy + 10, 90, 26);
      vg.fillStyle = '#fff'; vg.font = '13px "IBM Plex Sans Arabic", sans-serif'; vg.textAlign = 'center'; vg.textBaseline = 'middle';
      vg.fillText(W.t('y.before').split('/')[0], dx + 55, dy + 23);
    }
  }
  let compare = 0;

  /* ═══════════ القص ═══════════ */
  let cropMode = false, cropRect = null, cropDrag = null;
  function startCrop() {
    const p = P(); if (!p) return;
    cropMode = true;
    cropRect = p.settings.crop ? Object.assign({}, p.settings.crop) : { x: 0, y: 0, w: 1, h: 1 };
    renderPanel(); process();
  }
  function endCrop(apply) {
    const p = P();
    if (apply && p) {
      const c = cropRect;
      p.settings.crop = c.x <= 0.001 && c.y <= 0.001 && c.w >= 0.999 && c.h >= 0.999 ? null : c;
    }
    cropMode = false; cropRect = null;
    renderPanel(); changed();
  }
  function drawCrop(dx, dy, dw, dh) {
    const c = cropRect;
    const x = dx + c.x * dw, y = dy + c.y * dh, w = c.w * dw, h = c.h * dh;
    vg.fillStyle = 'rgba(0,0,0,.55)';
    vg.beginPath(); vg.rect(dx, dy, dw, dh); vg.rect(x, y, w, h); vg.fill('evenodd');
    vg.strokeStyle = '#fff'; vg.lineWidth = 1.5; vg.strokeRect(x, y, w, h);
    vg.lineWidth = 0.7; vg.strokeStyle = 'rgba(255,255,255,.6)';
    for (let i = 1; i < 3; i++) { vg.beginPath(); vg.moveTo(x + w * i / 3, y); vg.lineTo(x + w * i / 3, y + h); vg.moveTo(x, y + h * i / 3); vg.lineTo(x + w, y + h * i / 3); vg.stroke(); }
    vg.fillStyle = '#fff';
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(([hx, hy]) => vg.fillRect(hx - 5, hy - 5, 10, 10));
  }
  let cropRatio = 0;
  view.addEventListener('pointerdown', (e) => {
    if (!cropMode || !view._map) {
      if (P() && e.button === 0 && compare) { const m = view._map; const move = (ev) => { const r = view.getBoundingClientRect(); let t = (ev.clientX - r.left - m.dx) / m.dw; if (!W.isRTL()) t = 1 - t; compare = W.clamp(t, 0.02, 0.98); render(); }; move(e); const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); }; window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); }
      return;
    }
    const m = view._map, r = view.getBoundingClientRect();
    const nx = (e.clientX - r.left - m.dx) / m.dw, ny = (e.clientY - r.top - m.dy) / m.dh;
    const c = cropRect;
    const near = (a, b) => Math.abs(a - b) * Math.min(m.dw, m.dh) < 12;
    let mode = 'move';
    if (near(nx, c.x) && near(ny, c.y)) mode = 'nw'; else if (near(nx, c.x + c.w) && near(ny, c.y)) mode = 'ne';
    else if (near(nx, c.x) && near(ny, c.y + c.h)) mode = 'sw'; else if (near(nx, c.x + c.w) && near(ny, c.y + c.h)) mode = 'se';
    else if (!(nx > c.x && nx < c.x + c.w && ny > c.y && ny < c.y + c.h)) mode = 'new';
    cropDrag = { mode, sx: nx, sy: ny, orig: Object.assign({}, c) };
    view.setPointerCapture(e.pointerId);
  });
  view.addEventListener('pointermove', (e) => {
    if (!cropDrag) return;
    const m = view._map, r = view.getBoundingClientRect();
    const nx = W.clamp((e.clientX - r.left - m.dx) / m.dw, 0, 1), ny = W.clamp((e.clientY - r.top - m.dy) / m.dh, 0, 1);
    const o = cropDrag.orig;
    let c = Object.assign({}, o);
    const ar = cropRatio ? cropRatio * (m.dh / m.dw) : 0; // نسبة في الإحداثيات المعيارية
    if (cropDrag.mode === 'move') { c.x = W.clamp(o.x + nx - cropDrag.sx, 0, 1 - o.w); c.y = W.clamp(o.y + ny - cropDrag.sy, 0, 1 - o.h); }
    else if (cropDrag.mode === 'new') { c = { x: Math.min(cropDrag.sx, nx), y: Math.min(cropDrag.sy, ny), w: Math.abs(nx - cropDrag.sx), h: Math.abs(ny - cropDrag.sy) }; if (ar) c.h = Math.min(1 - c.y, c.w / ar); }
    else {
      let x1 = o.x, y1 = o.y, x2 = o.x + o.w, y2 = o.y + o.h;
      if (cropDrag.mode.includes('w')) x1 = nx; if (cropDrag.mode.includes('e')) x2 = nx;
      if (cropDrag.mode.includes('n')) y1 = ny; if (cropDrag.mode.includes('s')) y2 = ny;
      c = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1) };
      if (ar) { const h = c.w / ar; if (cropDrag.mode.includes('n')) c.y = c.y + c.h - h; c.h = h; }
    }
    if (c.w > 0.02 && c.h > 0.02 && c.y + c.h <= 1.0001 && c.y >= -0.0001) cropRect = c;
    render();
  });
  view.addEventListener('pointerup', () => { cropDrag = null; });

  /* ═══════════ لوحة التحكم ═══════════ */
  let clipSettings = null;
  function sl(key, i18n, min, max, step, sub) {
    const p = P();
    const holder = sub ? (p.settings.hsl[sub] = p.settings.hsl[sub] || { h: 0, s: 0, l: 0 }) : p.settings;
    return W.slider({ i18n, min, max, step: step || 1, value: holder[key] || 0, reset: DEFAULTS[key] != null && !sub ? DEFAULTS[key] : 0, onInput: (v) => { holder[key] = v; changed(); } });
  }
  function section(key, open, ...children) {
    const body = W.h('div', { class: 'w-panel-body' + (open ? '' : ' hidden') }, ...children);
    const title = W.h('div', { class: 'w-panel-title t-sec' }, W.iconEl(open ? 'chevron-down' : (W.isRTL() ? 'chevron-left' : 'chevron-right')), W.h('span', { text: W.t(key) }));
    title.addEventListener('click', () => { body.classList.toggle('hidden'); title.firstChild.innerHTML = W.icon(body.classList.contains('hidden') ? (W.isRTL() ? 'chevron-left' : 'chevron-right') : 'chevron-down'); secOpen[key] = !body.classList.contains('hidden'); });
    return W.h('div', { class: 'w-panel' }, title, body);
  }
  const secOpen = { 'y.presets': true, 'y.basic': true, 'y.presence': true };
  function renderPanel() {
    panel.innerHTML = '';
    const p = P();
    if (!p) return;
    const s = p.settings;
    if (cropMode) {
      const ratios = [[0, 'y.free'], [-1, 'y.original'], [1, '1:1'], [4 / 3, '4:3'], [3 / 2, '3:2'], [16 / 9, '16:9'], [4 / 5, '4:5'], [9 / 16, '9:16']];
      const seg = W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '4px' } });
      ratios.forEach(([v, l]) => seg.append(W.h('button', { class: 'w-btn sm' + (cropRatio === v ? ' primary' : ''), type: 'button', text: l.startsWith('y.') ? W.t(l) : l, onclick: () => {
        cropRatio = v === -1 ? processed.width / processed.height : v;
        if (cropRatio) { const m = view._map; const ar = cropRatio * (m.dh / m.dw); let w = Math.min(1, ar), h = w / ar; if (h > 1) { h = 1; w = ar; } cropRect = { x: (1 - w) / 2, y: (1 - h) / 2, w, h }; }
        renderPanel(); render();
      } })));
      panel.append(section('y.geometry', true,
        W.h('div', { class: 'w-label-sm', text: W.t('y.ratio') }), seg,
        W.h('div', { style: { height: '10px' } }),
        sl('straighten', 'y.straighten', -45, 45, 0.5),
        W.h('div', { class: 'row', style: { flexWrap: 'wrap', gap: '6px' } },
          W.iconButton('rotate-ccw', 'y.rotateL', () => { s.rotate = (s.rotate - 90 + 360) % 360; cropRect = { x: 0, y: 0, w: 1, h: 1 }; changed(); }),
          W.iconButton('rotate-cw', 'y.rotateR', () => { s.rotate = (s.rotate + 90) % 360; cropRect = { x: 0, y: 0, w: 1, h: 1 }; changed(); }),
          W.iconButton('flip-h', 'y.flip', () => { s.flip = !s.flip; changed(); })),
        W.h('div', { class: 'row', style: { marginTop: '12px' } },
          W.h('button', { class: 'w-btn primary', type: 'button', onclick: () => endCrop(true) }, W.iconEl('check'), W.h('span', { text: W.t('y.doneCrop') })),
          W.h('button', { class: 'w-btn', type: 'button', text: W.t('ui.reset'), onclick: () => { cropRect = { x: 0, y: 0, w: 1, h: 1 }; s.straighten = 0; renderPanel(); changed(); } }),
          W.h('button', { class: 'w-btn ghost', type: 'button', text: W.t('ui.cancel'), onclick: () => endCrop(false) }))));
      return;
    }
    // إعدادات جاهزة
    const pre = W.h('div', { class: 't-presets' });
    Object.keys(PRESETS).forEach((k) => {
      const c = IMG.makeCanvas(1, 1);
      renderTo(c, p.thumbSrc, Object.assign(fresh(), { rotate: s.rotate, flip: s.flip }, JSON.parse(JSON.stringify(PRESETS[k]))), true);
      const b = W.h('button', { class: 't-preset', type: 'button', onclick: () => { const keep = { rotate: s.rotate, flip: s.flip, straighten: s.straighten, crop: s.crop }; p.settings = Object.assign(fresh(), JSON.parse(JSON.stringify(PRESETS[k])), keep); renderPanel(); changed(); } }, c, W.h('span', { text: W.t('y.p.' + k) }));
      pre.append(b);
    });
    panel.append(section('y.presets', secOpen['y.presets'], pre));
    panel.append(section('y.basic', secOpen['y.basic'],
      W.h('div', { class: 'row', style: { justifyContent: 'space-between', marginBottom: '6px' } },
        W.h('label', { class: 'w-check-row' }, (() => { const c = W.h('input', { type: 'checkbox' }); c.checked = !!s.grayscale; c.addEventListener('change', () => { s.grayscale = c.checked; changed(); }); return c; })(), W.h('span', { text: W.t('y.mono') })),
        W.h('button', { class: 'w-btn sm', type: 'button', onclick: autoTone }, W.iconEl('wand'), W.h('span', { text: W.t('y.auto') }))),
      sl('temperature', 'y.temperature', -100, 100), sl('tint', 'y.tint', -100, 100),
      sl('exposure', 'y.exposure', -3, 3, 0.05), sl('contrast', 'y.contrast', -100, 100),
      sl('highlights', 'y.highlights', -100, 100), sl('shadows', 'y.shadows', -100, 100),
      sl('whites', 'y.whites', -100, 100), sl('blacks', 'y.blacks', -100, 100)));
    panel.append(section('y.presence', secOpen['y.presence'], sl('clarity', 'y.clarity', -100, 100), sl('vibrance', 'y.vibrance', -100, 100), sl('saturation', 'y.saturation', -100, 100), sl('fade', 'y.fade', 0, 100)));
    const hslTabs = W.h('div', { class: 'w-seg', style: { marginBottom: '8px' } });
    const hslBody = W.h('div');
    let hslMode = 'h';
    const renderHsl = () => {
      hslBody.innerHTML = '';
      IMG.BANDS.forEach(([b]) => hslBody.append(sl(hslMode, 'y.b.' + b, -100, 100, 1, b)));
      hslBody.querySelectorAll('.w-range-row').forEach((row, i) => { const col = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'][i]; row.querySelector('.w-range-label span').style.color = col; });
      hslTabs.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b.dataset.m === hslMode));
    };
    [['h', 'y.hue'], ['s', 'y.sat'], ['l', 'y.lum']].forEach(([m, k]) => hslTabs.append(W.h('button', { type: 'button', 'data-m': m, text: W.t(k), onclick: () => { hslMode = m; renderHsl(); } })));
    renderHsl();
    panel.append(section('y.hsl', secOpen['y.hsl'], hslTabs, hslBody));
    panel.append(section('y.effects', secOpen['y.effects'], sl('vignette', 'y.vignette', 0, 100), sl('vigSize', 'y.vigSize', 0, 100), sl('grain', 'y.grain', 0, 100)));
    panel.append(section('y.detail', secOpen['y.detail'], sl('sharpen', 'y.sharpen', 0, 200)));
    panel.append(W.h('div', { class: 'row', style: { padding: '12px', flexWrap: 'wrap' } },
      W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('y.reset'), onclick: () => { p.settings = fresh(); renderPanel(); changed(); } }),
      W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('y.copy'), onclick: () => { clipSettings = JSON.parse(JSON.stringify(s)); W.toast(W.t('ui.copied')); } }),
      W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('y.paste'), disabled: !clipSettings, onclick: () => { p.settings = Object.assign(fresh(), JSON.parse(JSON.stringify(clipSettings))); renderPanel(); changed(); } }),
      W.h('button', { class: 'w-btn sm', type: 'button', text: W.t('y.syncAll'), onclick: () => { photos.forEach((x) => { if (x !== p) { x.settings = Object.assign(fresh(), JSON.parse(JSON.stringify(s)), { crop: x.settings.crop, rotate: x.settings.rotate, flip: x.settings.flip, straighten: x.settings.straighten }); persist(x); } }); renderStrip(); } })));
  }
  /** تحسين تلقائي بناء\u064B على المدرج */
  function autoTone() {
    const p = P(); if (!p) return;
    const c = IMG.makeCanvas(1, 1);
    renderTo(c, p.thumbSrc, Object.assign(fresh(), { rotate: p.settings.rotate }), true);
    const h = IMG.histogram(c.getContext('2d').getImageData(0, 0, c.width, c.height), 1);
    const total = h.l.reduce((a, b) => a + b, 0) || 1;
    let s = 0, mean = 0, lo = 0, hi = 255;
    for (let i = 0; i < 256; i++) { mean += i * h.l[i]; }
    mean /= total;
    for (let i = 0; i < 256; i++) { s += h.l[i]; if (s > total * 0.01) { lo = i; break; } }
    s = 0;
    for (let i = 255; i >= 0; i--) { s += h.l[i]; if (s > total * 0.01) { hi = i; break; } }
    const st = p.settings;
    st.exposure = W.round(W.clamp(Math.log2(118 / Math.max(10, mean)) * 0.8, -1.5, 1.5), 2);
    st.contrast = Math.round(W.clamp((180 - (hi - lo)) / 3, -20, 40));
    st.blacks = Math.round(W.clamp(-lo / 2, -40, 0));
    st.whites = Math.round(W.clamp((255 - hi) / 2, 0, 40));
    st.shadows = mean < 100 ? 20 : 5;
    st.highlights = hi > 245 ? -20 : 0;
    st.vibrance = 15;
    renderPanel(); changed();
  }

  /* ═══════════ التصدير ═══════════ */
  async function exportPhotos(list) {
    if (!list.length) return;
    const v = await W.form(W.t('y.export').replace('…', ''), [
      { key: 'fmt', i18n: 'y.format', type: 'select', value: 'jpg', options: [{ value: 'jpg', label: 'JPG' }, { value: 'png', label: 'PNG' }, { value: 'webp', label: 'WebP' }] },
      { key: 'q', i18n: 'y.quality', type: 'range', min: 40, max: 100, value: 92 },
      { key: 'edge', i18n: 'y.longEdge', type: 'number', value: 0, min: 0, max: 20000 }
    ]);
    if (!v) return;
    const out = await W.busy('ui.processing', async (prog) => {
      const files = [];
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        let src = p.img;
        if (v.edge > 0 && Math.max(p.w, p.h) > v.edge) src = makePreview(p.img, v.edge);
        const c = IMG.makeCanvas(1, 1);
        renderTo(c, src, p.settings, false);
        const mime = v.fmt === 'jpg' ? 'image/jpeg' : v.fmt === 'webp' ? 'image/webp' : 'image/png';
        const bytes = await W.canvasToBytes(c, mime, v.q / 100);
        files.push({ name: W.files.base(p.name) + (W.lang === 'ar' ? '-طيف' : '-tayf') + '.' + v.fmt, data: bytes });
        prog((i + 1) / list.length);
        await W.sleep(10);
      }
      return files;
    });
    if (out.length === 1) { const r = await W.files.save({ data: out[0].data, name: out[0].name, types: [{ name: { ar: 'صورة', en: 'Image' }, ext: [v.fmt] }] }); if (r) W.toast(W.t('y.exported', { n: 1 }), 'success'); }
    else { const r = await W.files.saveMany(out); if (r) W.toast(W.t('y.exported', { n: out.length }), 'success'); }
  }

  /* ═══════════ الشريط والقوائم ═══════════ */
  const tb = document.getElementById('toolbar');
  const tbtn = (icon, tip, fn, o) => { const b = W.iconButton(icon, tip, fn, o); tb.append(b); return b; };
  tb.append(W.h('button', { class: 'w-btn sm', type: 'button', onclick: importPhotos }, W.iconEl('images'), W.h('span', { 'data-i18n': 'y.import', text: W.t('y.import') })));
  tb.append(W.h('div', { class: 'w-sep' }));
  tbtn('crop', 'y.crop', () => (cropMode ? endCrop(true) : startCrop()), { shortcut: 'R' });
  tbtn('rotate-ccw', 'y.rotateL', () => { const p = P(); if (p) { p.settings.rotate = (p.settings.rotate - 90 + 360) % 360; p.settings.crop = null; changed(); renderPanel(); } });
  tbtn('rotate-cw', 'y.rotateR', () => { const p = P(); if (p) { p.settings.rotate = (p.settings.rotate + 90) % 360; p.settings.crop = null; changed(); renderPanel(); } });
  tbtn('flip-h', 'y.flip', () => { const p = P(); if (p) { p.settings.flip = !p.settings.flip; changed(); } });
  tb.append(W.h('div', { class: 'w-sep' }));
  const beforeBtn = tbtn('eye', 'y.before', () => { showBefore = !showBefore; beforeBtn.classList.toggle('active', showBefore); render(); }, { shortcut: '\\' });
  const cmpBtn = tbtn('compare', 'y.compare', () => { compare = compare ? 0 : 0.5; cmpBtn.classList.toggle('active', !!compare); render(); });
  tb.append(W.h('div', { class: 'grow' }));
  tb.append(W.h('button', { class: 'w-btn primary sm', type: 'button', onclick: () => { const p = P(); if (p) exportPhotos([p]); } }, W.iconEl('export'), W.h('span', { 'data-i18n': 'y.export', text: W.t('y.export') })));

  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'y.import', icon: 'images', shortcut: 'Mod+O', action: importPhotos },
      '-',
      { i18n: 'y.export', icon: 'export', shortcut: 'Mod+Shift+E', action: () => { const p = P(); if (p) exportPhotos([p]); } },
      { i18n: 'y.exportAll', action: () => exportPhotos(photos) },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'y.copy', icon: 'copy', shortcut: 'Mod+Shift+C', action: () => { const p = P(); if (p) clipSettings = JSON.parse(JSON.stringify(p.settings)); } },
      { i18n: 'y.paste', icon: 'paste', shortcut: 'Mod+Shift+V', action: () => { const p = P(); if (p && clipSettings) { p.settings = Object.assign(fresh(), JSON.parse(JSON.stringify(clipSettings))); renderPanel(); changed(); } } },
      { i18n: 'y.reset', shortcut: 'Mod+Shift+R', action: () => { const p = P(); if (p) { p.settings = fresh(); renderPanel(); changed(); } } },
      { i18n: 'y.auto', icon: 'wand', shortcut: 'Mod+U', action: autoTone }
    ] },
    { i18n: 'menu.view', items: [
      { i18n: 'y.before', shortcut: '\\', action: () => beforeBtn.click() },
      { i18n: 'y.compare', action: () => cmpBtn.click() },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus });
  const status = chrome.status;
  function step(d) { const i = photos.findIndex((p) => p.id === current); const n = photos[i + d]; if (n) select(n.id); }
  W.keys.bind(W.isRTL() ? 'ArrowLeft' : 'ArrowRight', () => step(1));
  W.keys.bind(W.isRTL() ? 'ArrowRight' : 'ArrowLeft', () => step(-1));
  W.keys.bind('Enter', () => { if (cropMode) endCrop(true); });
  W.keys.bind('Escape', () => { if (cropMode) endCrop(false); });

  const welcome = W.welcome(stage, { text: 'y.welcomeText', actions: [{ i18n: 'y.import', icon: 'images', primary: true, action: importPhotos }] });
  W.dropZone(stage, (files) => addPhotos(files.filter((f) => /^(jpe?g|png|webp|bmp|gif|avif)$/.test(f.ext)).map((f) => ({ name: f.name, path: f.path, ext: f.ext, data: new Uint8Array(f.data) }))));
  W.onExternalFile((f) => addPhotos([f]), 'bytes');
  W.on('langchange', () => { renderPanel(); renderStrip(); render(); });
  new ResizeObserver(resize).observe(stage);
  resize();
  renderStrip();

  window.__tayf = { get photos() { return photos; }, addPhotos, select, PRESETS, get processed() { return processed; }, autoTone };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const c = IMG.makeCanvas(40, 30); const g = c.getContext('2d'); g.fillStyle = '#884422'; g.fillRect(0, 0, 40, 30);
      const out = IMG.makeCanvas(1, 1);
      renderTo(out, c, Object.assign(fresh(), PRESETS.cinema, { rotate: 90, crop: { x: 0.1, y: 0.1, w: 0.5, h: 0.5 } }), false);
      if (out.width !== 15 || out.height !== 20) errors.push('geometry ' + out.width + 'x' + out.height);
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
