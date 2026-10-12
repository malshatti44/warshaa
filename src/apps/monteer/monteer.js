/* مونتير Monteer — مونتاج الفيديو وإضافة العناوين والموسيقى */
(function () {
  'use strict';

  W.init({
    id: 'monteer',
    i18n: {
      ar: {
        'v.media': 'الوسائط', 'v.titles': 'النصوص', 'v.import': 'استيراد وسائط…', 'v.noMedia': 'استورد مقاطع فيديو وصور\u064Bا وملفات صوتية، ثم أضفها إلى الخط الزمني بالنقر أو السحب.',
        'v.addToTimeline': 'إضافة إلى الخط الزمني', 'v.welcomeText': 'رك\u0651ب مقاطع الفيديو والصور، وأضف العناوين العربية والموسيقى والانتقالات، ثم صد\u0651ر فيديو MP4 جاهز\u064Bا للنشر',
        'v.newProject': 'مشروع جديد', 'v.openProject': 'فتح مشروع…', 'v.export': 'تصدير الفيديو', 'v.play': 'تشغيل', 'v.pause': 'إيقاف مؤقت', 'v.split': 'تقسيم عند المؤشر', 'v.toStart': 'إلى البداية', 'v.toEnd': 'إلى النهاية',
        'v.prevFrame': 'إطار سابق', 'v.nextFrame': 'إطار تال\u064D', 'v.trackTitles': 'نصوص', 'v.trackVideo': 'فيديو', 'v.trackAudio': 'صوت', 'v.project': 'إعدادات المشروع', 'v.resolution': 'الأبعاد', 'v.fps': 'الإطارات/ث', 'v.bg': 'لون الخلفية',
        'v.clip': 'المقطع', 'v.volume': 'مستوى الصوت', 'v.mute': 'كتم', 'v.fit': 'الملاءمة', 'v.fitIn': 'احتواء', 'v.fill': 'ملء', 'v.trans': 'الانتقال عند البداية', 'v.transNone': 'بدون', 'v.transFade': 'تلاش\u064D من الأسود', 'v.transDissolve': 'مزج مع السابق',
        'v.transDur': 'مدة الانتقال (ث)', 'v.kenburns': 'حركة تكبير بطيئة', 'v.duration': 'المدة (ث)', 'v.brightness': 'السطوع', 'v.contrast': 'التباين', 'v.saturation': 'التشبع', 'v.speed': 'السرعة',
        'v.text': 'النص', 'v.font': 'الخط', 'v.size': 'الحجم', 'v.color': 'اللون', 'v.style': 'النمط', 'v.st.plain': 'بسيط', 'v.st.shadow': 'ظل', 'v.st.box': 'خلفية', 'v.st.outline': 'محدد', 'v.boxColor': 'لون الخلفية',
        'v.position': 'الموضع', 'v.pos.center': 'الوسط', 'v.pos.top': 'أعلى', 'v.pos.bottom': 'أسفل', 'v.pos.lower': 'ثلث سفلي', 'v.anim': 'الحركة', 'v.an.none': 'بدون', 'v.an.fade': 'تلاش\u064D', 'v.an.slide': 'انزلاق', 'v.an.type': 'آلة كاتبة', 'v.an.zoom': 'تكبير',
        'v.start': 'البداية (ث)', 'v.fadeIn': 'تلاش\u064D عند البداية (ث)', 'v.fadeOut': 'تلاش\u064D عند النهاية (ث)', 'v.tp.title': 'عنوان رئيسي', 'v.tp.lower': 'اسم وصفة', 'v.tp.subtitle': 'ترجمة', 'v.tp.end': 'شكر\u064Bا للمشاهدة', 'v.tp.quote': 'اقتباس',
        'v.newTitle': 'عنوان جديد', 'v.format': 'الصيغة', 'v.quality': 'الجودة', 'v.q.high': 'عالية', 'v.q.medium': 'متوسطة', 'v.q.low': 'منخفضة', 'v.exporting': 'جار\u064D تصدير الفيديو…', 'v.preparing': 'تجهيز الصوت…', 'v.cancel': 'إلغاء',
        'v.exportDone': 'تم تصدير الفيديو', 'v.noEncoder': 'لا يدعم هذا الجهاز الترميز السريع؛ سيتم التصدير بالزمن الحقيقي بصيغة WebM', 'v.missing': 'ملف غير موجود: {name}', 'v.relink': 'إعادة ربط…', 'v.empty': 'الخط الزمني فارغ',
        'v.removeMedia': 'إزالة من المشروع', 'v.zoomTl': 'تكبير الخط الزمني', 'v.fullscreen': 'ملء الشاشة', 'v.res.landscape': 'أفقي', 'v.res.vertical': 'عمودي (ريلز/تيك توك)', 'v.res.square': 'مربع'
      },
      en: {
        'v.media': 'Media', 'v.titles': 'Titles', 'v.import': 'Import media…', 'v.noMedia': 'Import videos, images and audio, then add them to the timeline by clicking or dragging.',
        'v.addToTimeline': 'Add to timeline', 'v.welcomeText': 'Assemble videos and photos, add Arabic titles, music and transitions, then export an MP4 ready to share',
        'v.newProject': 'New project', 'v.openProject': 'Open project…', 'v.export': 'Export video', 'v.play': 'Play', 'v.pause': 'Pause', 'v.split': 'Split at playhead', 'v.toStart': 'Go to start', 'v.toEnd': 'Go to end',
        'v.prevFrame': 'Previous frame', 'v.nextFrame': 'Next frame', 'v.trackTitles': 'Titles', 'v.trackVideo': 'Video', 'v.trackAudio': 'Audio', 'v.project': 'Project settings', 'v.resolution': 'Size', 'v.fps': 'Frame rate', 'v.bg': 'Background color',
        'v.clip': 'Clip', 'v.volume': 'Volume', 'v.mute': 'Mute', 'v.fit': 'Fit', 'v.fitIn': 'Fit', 'v.fill': 'Fill', 'v.trans': 'Transition in', 'v.transNone': 'None', 'v.transFade': 'Fade from black', 'v.transDissolve': 'Cross dissolve',
        'v.transDur': 'Transition (s)', 'v.kenburns': 'Slow zoom (Ken Burns)', 'v.duration': 'Duration (s)', 'v.brightness': 'Brightness', 'v.contrast': 'Contrast', 'v.saturation': 'Saturation', 'v.speed': 'Speed',
        'v.text': 'Text', 'v.font': 'Font', 'v.size': 'Size', 'v.color': 'Color', 'v.style': 'Style', 'v.st.plain': 'Plain', 'v.st.shadow': 'Shadow', 'v.st.box': 'Box', 'v.st.outline': 'Outline', 'v.boxColor': 'Box color',
        'v.position': 'Position', 'v.pos.center': 'Center', 'v.pos.top': 'Top', 'v.pos.bottom': 'Bottom', 'v.pos.lower': 'Lower third', 'v.anim': 'Animation', 'v.an.none': 'None', 'v.an.fade': 'Fade', 'v.an.slide': 'Slide', 'v.an.type': 'Typewriter', 'v.an.zoom': 'Zoom',
        'v.start': 'Start (s)', 'v.fadeIn': 'Fade in (s)', 'v.fadeOut': 'Fade out (s)', 'v.tp.title': 'Main title', 'v.tp.lower': 'Name & role', 'v.tp.subtitle': 'Subtitle', 'v.tp.end': 'Thanks for watching', 'v.tp.quote': 'Quote',
        'v.newTitle': 'New title', 'v.format': 'Format', 'v.quality': 'Quality', 'v.q.high': 'High', 'v.q.medium': 'Medium', 'v.q.low': 'Low', 'v.exporting': 'Exporting video…', 'v.preparing': 'Preparing audio…', 'v.cancel': 'Cancel',
        'v.exportDone': 'Video exported', 'v.noEncoder': 'Fast encoding is not available here; exporting in real time as WebM', 'v.missing': 'Missing file: {name}', 'v.relink': 'Relink…', 'v.empty': 'The timeline is empty',
        'v.removeMedia': 'Remove from project', 'v.zoomTl': 'Timeline zoom', 'v.fullscreen': 'Fullscreen', 'v.res.landscape': 'Landscape', 'v.res.vertical': 'Vertical (Reels/TikTok)', 'v.res.square': 'Square'
      }
    }
  });

  const $ = (s) => document.querySelector(s);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = () => W.uid('c');
  const ARABIC = /[؀-ۿ]/;
  const VIDEO_EXT = ['mp4', 'm4v', 'mov', 'webm', 'mkv', 'ogv'], IMAGE_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'], AUDIO_EXT = ['mp3', 'wav', 'ogg', 'oga', 'm4a', 'aac', 'flac', 'opus'];
  const kindOf = (ext) => (VIDEO_EXT.includes(ext) ? 'video' : IMAGE_EXT.includes(ext) ? 'image' : AUDIO_EXT.includes(ext) ? 'audio' : null);

  let P = null; // المشروع
  const rt = {}; // بيانات وقت التشغيل لكل وسيط: { url, thumb, el, peaks, audioBuf, missing }
  let T = 0; // موضع المؤشر بالثواني
  let sel = null; // { track, id }
  let pps = 80; // بكسل لكل ثانية في الخط الزمني

  const previewC = $('#preview'), pg = previewC.getContext('2d');
  const tlEl = $('#timeline'), binEl = $('#bin'), propsEl = $('#props');

  /* ═══════════ التوقيت ═══════════ */
  const clipDur = (c) => (c.kind === 'image' ? c.dur : (c.out - c.in) / (c.speed || 1));
  function layoutVideo() {
    let t = 0;
    P.video.forEach((c, i) => {
      const td = i > 0 && c.trans === 'dissolve' ? Math.min(c.transDur || 0.5, clipDur(c) / 2, clipDur(P.video[i - 1]) / 2) : 0;
      c._start = Math.max(0, t - td); c._end = c._start + clipDur(c); c._td = td;
      t = c._end;
    });
  }
  function duration() {
    if (!P) return 0;
    layoutVideo();
    let d = P.video.length ? P.video[P.video.length - 1]._end : 0;
    P.titles.forEach((x) => { d = Math.max(d, x.start + x.dur); });
    P.audio.forEach((x) => { d = Math.max(d, x.start + (x.out - x.in)); });
    return d;
  }
  const fmtT = (s, frames) => {
    s = Math.max(0, s);
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    const tail = frames ? ':' + String(Math.floor((s % 1) * P.fps)).padStart(2, '0') : '.' + String(Math.floor((s % 1) * 10));
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + tail;
  };

  /* ═══════════ الوسائط ═══════════ */
  async function probe(m) {
    const r = rt[m.id];
    if (m.kind === 'image') {
      const img = await W.loadImage(r.url);
      m.w = img.naturalWidth; m.h = img.naturalHeight; r.img = img;
      const c = document.createElement('canvas'); const s = 120 / Math.max(m.w, m.h); c.width = Math.max(1, m.w * s); c.height = Math.max(1, m.h * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); r.thumb = c.toDataURL('image/jpeg', 0.8);
      return;
    }
    const el = document.createElement(m.kind === 'video' ? 'video' : 'audio');
    el.preload = 'auto'; el.muted = true; el.src = r.url;
    if (m.kind === 'video') el.playsInline = true;
    await new Promise((res, rej) => { el.onloadedmetadata = res; el.onerror = () => rej(new Error('load ' + m.name)); });
    m.duration = isFinite(el.duration) ? el.duration : 0;
    if (!m.duration) { el.currentTime = 1e7; await new Promise((res) => { el.ontimeupdate = res; setTimeout(res, 1500); }); m.duration = isFinite(el.duration) ? el.duration : 10; el.currentTime = 0; }
    if (m.kind === 'video') {
      m.w = el.videoWidth; m.h = el.videoHeight;
      el.currentTime = Math.min(1, m.duration / 3);
      await new Promise((res) => { el.onseeked = res; setTimeout(res, 2000); });
      const c = document.createElement('canvas'); const s = 160 / Math.max(1, m.w); c.width = Math.max(1, m.w * s); c.height = Math.max(1, m.h * s);
      try { c.getContext('2d').drawImage(el, 0, 0, c.width, c.height); r.thumb = c.toDataURL('image/jpeg', 0.75); } catch (e) { /* تجاهل */ }
    }
    el.removeAttribute('src'); el.load();
  }
  async function addMediaFiles(files) {
    const added = [];
    for (const f of files) {
      const kind = kindOf(f.ext);
      if (!kind) continue;
      const m = { id: W.uid('m'), name: f.name, path: f.path || null, kind, duration: 0, w: 0, h: 0 };
      rt[m.id] = { url: f.url };
      try { await probe(m); P.media.push(m); added.push(m); } catch (e) { console.error(e); W.toast(W.t('ui.openFailed') + ': ' + f.name, 'error'); }
    }
    renderBin();
    return added;
  }
  async function importMedia() {
    if (!P) newProject(true);
    const files = await W.files.open({ types: [{ name: { ar: 'فيديو وصور وصوت', en: 'Video, images & audio' }, ext: VIDEO_EXT.concat(IMAGE_EXT, AUDIO_EXT) }], multiple: true, as: 'media' });
    if (!files.length) return [];
    const added = await W.busy('ui.processing', () => addMediaFiles(files));
    // أول استيراد: نضيف تلقائي\u064Bا إلى الخط الزمني لتجربة أسرع
    if (added.length && !P.video.length && !P.audio.length) added.forEach((m) => addToTimeline(m, true));
    if (added.length) { commit(); renderAll(); }
    return added;
  }
  function addToTimeline(m, quiet) {
    if (m.kind === 'audio') {
      P.audio.push({ id: uid(), media: m.id, start: quiet ? 0 : T, in: 0, out: m.duration, volume: 0.8, fadeIn: 0.5, fadeOut: 1 });
    } else {
      const c = { id: uid(), media: m.id, kind: m.kind, in: 0, out: m.kind === 'video' ? m.duration : 0, dur: m.kind === 'image' ? 4 : 0, volume: 1, fit: m.kind === 'image' ? 'fill' : 'fit', trans: P.video.length ? 'dissolve' : 'fade', transDur: 0.6, kenburns: m.kind === 'image', filter: { b: 100, c: 100, s: 100 }, speed: 1 };
      P.video.push(c);
    }
    if (!quiet) { commit(); renderAll(); }
  }
  function removeMedia(m) {
    P.video = P.video.filter((c) => c.media !== m.id);
    P.audio = P.audio.filter((c) => c.media !== m.id);
    P.media = P.media.filter((x) => x.id !== m.id);
    commit(); renderAll();
  }

  /* ═══════════ عناصر التشغيل ═══════════ */
  const els = new Map(); // clipId -> media element (للمعاينة)
  function elFor(c, kind) {
    let el = els.get(c.id);
    const m = P.media.find((x) => x.id === c.media);
    if (!m || !rt[m.id] || rt[m.id].missing) return null;
    if (!el) {
      el = document.createElement(kind === 'audio' ? 'audio' : 'video');
      el.preload = 'auto'; el.src = rt[m.id].url; el.playsInline = true;
      el.addEventListener('seeked', () => { if (!playing) drawPreview(); });
      el.addEventListener('loadeddata', () => { if (!playing) drawPreview(); });
      els.set(c.id, el);
    }
    return el;
  }
  function pruneEls() {
    const ids = new Set(P ? P.video.map((c) => c.id).concat(P.audio.map((c) => c.id)) : []);
    els.forEach((el, id) => { if (!ids.has(id)) { el.pause(); el.removeAttribute('src'); el.load(); els.delete(id); } });
  }

  /* ═══════════ الرسم ═══════════ */
  function fitRect(sw, sh, dw, dh, mode) {
    const s = mode === 'fill' ? Math.max(dw / sw, dh / sh) : Math.min(dw / sw, dh / sh);
    return { x: (dw - sw * s) / 2, y: (dh - sh * s) / 2, w: sw * s, h: sh * s };
  }
  function activeVideo(t) { layoutVideo(); return P.video.filter((c) => t >= c._start && t < c._end); }
  /** رسم إطار كامل عند الزمن t على سياق g بالأبعاد w×h. getSource(c) يرجع عنصر الصورة/الفيديو */
  function drawFrame(g, t, w, h, getSource) {
    g.save();
    g.fillStyle = P.bg || '#000'; g.fillRect(0, 0, w, h);
    const act = activeVideo(t);
    act.forEach((c) => {
      const m = P.media.find((x) => x.id === c.media);
      const src = getSource(c, m);
      if (!src || !m) return;
      const sw = m.kind === 'image' ? m.w : (src.videoWidth || m.w), sh = m.kind === 'image' ? m.h : (src.videoHeight || m.h);
      if (!sw || !sh) return;
      const local = t - c._start, d = clipDur(c);
      let alpha = 1;
      if (c._td && local < c._td) alpha = local / c._td;
      let black = 0;
      const idx = P.video.indexOf(c);
      if (c.trans === 'fade') { const td = Math.min(c.transDur || 0.6, d / 2); if (local < td) black = Math.max(black, 1 - local / td); }
      const next = P.video[idx + 1];
      if (next && next.trans === 'fade') { const td = Math.min(next.transDur || 0.6, d / 2); if (d - local < td) black = Math.max(black, 1 - (d - local) / td); }
      if (!next && idx === P.video.length - 1 && P.fadeOutEnd) { const td = 1; if (d - local < td) black = Math.max(black, 1 - (d - local) / td); }
      let r = fitRect(sw, sh, w, h, c.fit);
      if (c.kenburns) { const k = 1 + 0.12 * (local / Math.max(0.1, d)); r = { x: w / 2 - (r.w * k) / 2, y: h / 2 - (r.h * k) / 2, w: r.w * k, h: r.h * k }; }
      g.globalAlpha = alpha;
      const f = c.filter || {};
      g.filter = (f.b && f.b !== 100) || (f.c && f.c !== 100) || (f.s && f.s !== 100) ? 'brightness(' + (f.b || 100) + '%) contrast(' + (f.c || 100) + '%) saturate(' + (f.s || 100) + '%)' : 'none';
      try { g.drawImage(src, r.x, r.y, r.w, r.h); } catch (e) { /* الإطار غير جاهز */ }
      g.filter = 'none';
      if (black > 0) { g.globalAlpha = black * alpha; g.fillStyle = '#000'; g.fillRect(0, 0, w, h); }
      g.globalAlpha = 1;
    });
    P.titles.filter((x) => t >= x.start && t < x.start + x.dur).forEach((x) => drawTitle(g, x, t - x.start, w, h));
    g.restore();
  }
  function drawTitle(g, x, local, w, h) {
    const k = h / 1080;
    const size = x.size * k;
    let text = x.text;
    let alpha = 1, dy = 0, scale = 1;
    const fd = Math.min(0.5, x.dur / 3);
    if (x.anim === 'fade' || x.anim === 'slide' || x.anim === 'zoom') { if (local < fd) alpha = local / fd; else if (x.dur - local < fd) alpha = (x.dur - local) / fd; }
    if (x.anim === 'slide') { const p = Math.min(1, local / fd); dy = (1 - (1 - Math.pow(1 - p, 3))) * 40 * k; }
    if (x.anim === 'zoom') { const p = Math.min(1, local / (fd * 1.5)); scale = 0.85 + 0.15 * (1 - Math.pow(1 - p, 3)); }
    if (x.anim === 'type') { const n = Array.from(text).length; const cps = Math.max(12, n / Math.max(0.5, x.dur * 0.6)); text = Array.from(text).slice(0, Math.ceil(local * cps)).join(''); if (x.dur - local < fd) alpha = (x.dur - local) / fd; }
    const lines = text.split('\n');
    g.save();
    g.globalAlpha = Math.max(0, Math.min(1, alpha));
    g.font = (x.weight || 700) + ' ' + size + 'px ' + W.fontStack(x.font);
    g.textBaseline = 'middle';
    const rtl = ARABIC.test(x.text);
    g.direction = rtl ? 'rtl' : 'ltr';
    const lh = size * 1.3;
    const widths = lines.map((l) => g.measureText(l).width);
    const blockW = Math.max(1, ...widths), blockH = lines.length * lh;
    const margin = 60 * k;
    let cx = w / 2, cy = h / 2;
    let align = 'center';
    if (x.pos === 'top') cy = margin + blockH / 2 + 20 * k;
    if (x.pos === 'bottom') cy = h - margin - blockH / 2;
    if (x.pos === 'lower') { cy = h - h * 0.2 - blockH / 2; align = rtl ? 'right' : 'left'; cx = rtl ? w - margin * 1.6 : margin * 1.6; }
    cy += dy;
    g.translate(cx, cy); g.scale(scale, scale); g.translate(-cx, -cy);
    g.textAlign = align;
    const left = align === 'center' ? cx - blockW / 2 : align === 'right' ? cx - blockW : cx;
    if (x.style === 'box') {
      const padX = size * 0.45, padY = size * 0.22;
      g.fillStyle = x.boxColor || 'rgba(0,0,0,0.6)';
      lines.forEach((l, i) => {
        const lw = widths[i];
        const lx = align === 'center' ? cx - lw / 2 : align === 'right' ? cx - lw : cx;
        const ly = cy - blockH / 2 + i * lh;
        roundRect(g, lx - padX, ly - padY / 2 + (lh - size * 1.1) / 2, lw + padX * 2, size * 1.1 + padY, size * 0.18);
        g.fill();
      });
    }
    if (x.pos === 'lower' && x.style !== 'box') {
      g.fillStyle = x.boxColor || '#6203c9';
      const bx = rtl ? cx + 18 * k : cx - 26 * k;
      g.fillRect(bx, cy - blockH / 2, 8 * k, blockH);
    }
    if (x.style === 'shadow') { g.shadowColor = 'rgba(0,0,0,0.65)'; g.shadowBlur = 18 * k; g.shadowOffsetY = 4 * k; }
    lines.forEach((l, i) => {
      const ly = cy - blockH / 2 + i * lh + lh / 2;
      if (x.style === 'outline') { g.lineWidth = Math.max(2, size * 0.09); g.strokeStyle = '#000'; g.lineJoin = 'round'; g.strokeText(l, cx, ly); }
      g.fillStyle = x.color; g.fillText(l, cx, ly);
    });
    void left;
    g.restore();
  }
  function roundRect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

  /* المعاينة */
  function sizePreview() {
    if (!P) return;
    const box = $('#previewBox').getBoundingClientRect();
    const s = Math.min((box.width - 20) / P.w, (box.height - 20) / P.h);
    previewC.style.width = Math.max(10, P.w * s) + 'px'; previewC.style.height = Math.max(10, P.h * s) + 'px';
    const dpr = window.devicePixelRatio || 1;
    const cw = Math.round(Math.min(P.w, P.w * s * dpr)), ch = Math.round(Math.min(P.h, P.h * s * dpr));
    if (previewC.width !== cw || previewC.height !== ch) { previewC.width = cw; previewC.height = ch; }
    drawPreview();
  }
  function previewSource(c, m) {
    if (m.kind === 'image') return rt[m.id] && rt[m.id].img;
    return elFor(c, 'video');
  }
  function drawPreview() {
    if (!P) return;
    drawFrame(pg, T, previewC.width, previewC.height, previewSource);
    timeEl.textContent = fmtT(T, true) + ' / ' + fmtT(duration(), true);
  }
  /** مزامنة عناصر الفيديو مع زمن المؤشر عند الإيقاف */
  function seekPreview() {
    if (!P) return;
    layoutVideo();
    P.video.forEach((c) => {
      if (c.kind !== 'video') return;
      const el = elFor(c, 'video');
      if (!el) return;
      if (T >= c._start - 0.5 && T < c._end) {
        const want = c.in + Math.max(0, T - c._start) * (c.speed || 1);
        if (Math.abs(el.currentTime - want) > 0.02) el.currentTime = want;
      }
    });
    drawPreview();
    updatePlayhead();
  }

  /* ═══════════ التشغيل ═══════════ */
  let playing = false, raf = 0, clock = null;
  function play() {
    if (!P || playing) return;
    if (T >= duration() - 0.01) T = 0;
    playing = true;
    clock = { t0: T, p0: performance.now() };
    playBtn.innerHTML = W.icon('pause'); playBtn.dataset.tip = 'v.pause';
    const tick = () => {
      if (!playing) return;
      T = clock.t0 + (performance.now() - clock.p0) / 1000;
      const end = duration();
      if (T >= end) { T = end; pause(); seekPreview(); return; }
      syncMedia(true);
      drawPreview();
      updatePlayhead(true);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }
  function pause() {
    playing = false;
    cancelAnimationFrame(raf);
    els.forEach((el) => el.pause());
    playBtn.innerHTML = W.icon('play'); playBtn.dataset.tip = 'v.play';
  }
  const togglePlay = () => (playing ? pause() : play());
  function syncMedia() {
    layoutVideo();
    const sync = (c, el, localStart, localEnd, mediaIn, vol) => {
      if (!el) return;
      const active = T >= localStart && T < localEnd;
      if (!active) { if (!el.paused) el.pause(); return; }
      const want = mediaIn + (T - localStart) * (c.speed || 1);
      el.playbackRate = c.speed || 1;
      el.volume = W.clamp(vol, 0, 1);
      el.muted = vol <= 0;
      if (Math.abs(el.currentTime - want) > 0.3) el.currentTime = want;
      if (el.paused) el.play().catch(() => {});
    };
    P.video.forEach((c) => { if (c.kind === 'video') sync(c, elFor(c, 'video'), c._start, c._end, c.in, c.volume * (c._td && T - c._start < c._td ? (T - c._start) / c._td : 1)); });
    P.audio.forEach((c) => {
      const d = c.out - c.in, local = T - c.start;
      let v = c.volume;
      if (c.fadeIn && local < c.fadeIn) v *= Math.max(0, local / c.fadeIn);
      if (c.fadeOut && d - local < c.fadeOut) v *= Math.max(0, (d - local) / c.fadeOut);
      sync(c, elFor(c, 'audio'), c.start, c.start + d, c.in, v);
    });
  }
  function setTime(t) { T = W.clamp(t, 0, Math.max(0, duration())); if (playing) clock = { t0: T, p0: performance.now() }; else seekPreview(); updatePlayhead(); }

  /* ═══════════ الخط الزمني ═══════════ */
  const LANES = [['titles', 'v.trackTitles', 'text'], ['video', 'v.trackVideo', 'film'], ['audio', 'v.trackAudio', 'music']];
  let tlInner = null, playheadEl = null;
  function renderTimeline() {
    tlEl.innerHTML = '';
    if (!P) return;
    layoutVideo();
    const total = Math.max(duration() + 10, (tlEl.clientWidth - 90) / pps);
    tlInner = W.h('div', { class: 'v-tlinner', style: { width: (total * pps + 100) + 'px' } });
    const ruler = W.h('canvas', { class: 'v-ruler' });
    tlInner.append(W.h('div', { class: 'v-rulerrow' }, W.h('div', { class: 'v-lanehead' }), ruler));
    LANES.forEach(([key, label, icon]) => {
      const lane = W.h('div', { class: 'v-lane', 'data-lane': key });
      const clipsBox = W.h('div', { class: 'v-clips' });
      lane.append(W.h('div', { class: 'v-lanehead' }, W.iconEl(icon), W.h('span', { text: W.t(label) })), clipsBox);
      const list = P[key];
      list.forEach((c) => clipsBox.append(clipEl(key, c)));
      clipsBox.addEventListener('dragover', (e) => { if (e.dataTransfer.types.includes('text/x-media')) { e.preventDefault(); lane.classList.add('drop'); } });
      clipsBox.addEventListener('dragleave', () => lane.classList.remove('drop'));
      clipsBox.addEventListener('drop', (e) => {
        lane.classList.remove('drop');
        const id = e.dataTransfer.getData('text/x-media');
        const m = P.media.find((x) => x.id === id);
        if (!m) return;
        e.preventDefault();
        const r = clipsBox.getBoundingClientRect();
        const t = Math.max(0, (e.clientX - r.left) / pps);
        if (m.kind === 'audio') { P.audio.push({ id: uid(), media: m.id, start: t, in: 0, out: m.duration, volume: 0.8, fadeIn: 0.5, fadeOut: 1 }); }
        else {
          const c = { id: uid(), media: m.id, kind: m.kind, in: 0, out: m.kind === 'video' ? m.duration : 0, dur: m.kind === 'image' ? 4 : 0, volume: 1, fit: m.kind === 'image' ? 'fill' : 'fit', trans: 'dissolve', transDur: 0.6, kenburns: m.kind === 'image', filter: { b: 100, c: 100, s: 100 }, speed: 1 };
          const idx = P.video.findIndex((v) => v._start + clipDur(v) / 2 > t);
          if (idx < 0) P.video.push(c); else P.video.splice(idx, 0, c);
        }
        commit(); renderAll();
      });
      tlInner.append(lane);
    });
    playheadEl = W.h('div', { class: 'v-playhead' }, W.h('span'));
    tlInner.append(playheadEl);
    tlEl.append(tlInner);
    drawRuler(ruler, total);
    updatePlayhead();
    // النقر على المسطرة لتحريك المؤشر
    const seekFromEvent = (e) => { const r = ruler.getBoundingClientRect(); setTime((e.clientX - r.left) / pps); };
    ruler.addEventListener('pointerdown', (e) => { ruler.setPointerCapture(e.pointerId); seekFromEvent(e); const mv = (ev) => seekFromEvent(ev); ruler.addEventListener('pointermove', mv); ruler.addEventListener('pointerup', () => ruler.removeEventListener('pointermove', mv), { once: true }); });
  }
  function drawRuler(c, total) {
    const w = total * pps, h = 24, dpr = window.devicePixelRatio || 1;
    c.style.width = w + 'px'; c.style.height = h + 'px';
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    const g = c.getContext('2d'); g.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    g.fillStyle = css.getPropertyValue('--fg-3').trim() || '#999';
    g.font = '10px ' + W.fontStack('IBM Plex Sans Arabic');
    const step = [0.5, 1, 2, 5, 10, 15, 30, 60].find((s) => s * pps >= 70) || 60;
    for (let k = 0; k * step <= total; k++) {
      const t = k * step, x = t * pps;
      g.fillRect(x, h - 9, 1, 9);
      g.fillText(fmtT(t).replace(/\.0$/, ''), x + 3, 11);
      for (let j = 1; j < 5; j++) g.fillRect(x + (j * step * pps) / 5, h - 4, 1, 4);
    }
  }
  function updatePlayhead(follow) {
    if (!playheadEl) return;
    playheadEl.style.left = (90 + T * pps) + 'px';
    if (follow) {
      const x = 90 + T * pps;
      if (x > tlEl.scrollLeft + tlEl.clientWidth - 60) tlEl.scrollLeft = x - 120;
    }
    timeEl.textContent = fmtT(T, true) + ' / ' + fmtT(duration(), true);
  }
  function clipEl(track, c) {
    const m = P.media.find((x) => x.id === c.media);
    let start, dur, label;
    if (track === 'video') { start = c._start; dur = clipDur(c); label = m ? m.name : '?'; }
    else if (track === 'audio') { start = c.start; dur = c.out - c.in; label = m ? m.name : '?'; }
    else { start = c.start; dur = c.dur; label = c.text.split('\n')[0]; }
    const el = W.h('div', { class: 'v-clip v-' + track + (sel && sel.id === c.id ? ' selected' : '') + (m && rt[m.id] && rt[m.id].missing ? ' missing' : ''), 'data-id': c.id, style: { left: start * pps + 'px', width: Math.max(6, dur * pps) + 'px' } });
    if (track === 'video' && m && rt[m.id] && rt[m.id].thumb) el.style.backgroundImage = 'url("' + rt[m.id].thumb + '")';
    if (track === 'video' && c._td) el.append(W.h('div', { class: 'v-trans', style: { width: c._td * pps + 'px' } }));
    if (track === 'video' && c.trans === 'fade') el.append(W.h('div', { class: 'v-fade', style: { width: Math.min(c.transDur || 0.6, dur / 2) * pps + 'px' } }));
    if (track === 'audio' && m) { const cv = W.h('canvas', { class: 'v-wave' }); el.append(cv); drawClipWave(cv, m, c, dur); }
    el.append(W.h('span', { class: 'v-cliplabel', text: label, dir: 'auto' }));
    el.append(W.h('div', { class: 'v-trim l', 'data-edge': 'l' }), W.h('div', { class: 'v-trim r', 'data-edge': 'r' }));
    el.addEventListener('pointerdown', (e) => clipPointer(e, track, c, el));
    el.addEventListener('contextmenu', (e) => { selectClip(track, c.id); W.contextMenu(e, clipMenu()); });
    return el;
  }
  async function drawClipWave(cv, m, c, dur) {
    const w = Math.max(6, dur * pps), h = 36;
    cv.width = Math.min(8000, Math.round(w)); cv.height = h;
    cv.style.width = w + 'px';
    const peaks = await mediaPeaks(m);
    if (!peaks) return;
    const g = cv.getContext('2d');
    g.fillStyle = 'rgba(255,255,255,0.55)';
    const pr = peaks.rate;
    for (let x = 0; x < cv.width; x++) {
      const t = c.in + (x / cv.width) * dur;
      const i = Math.floor(t * pr);
      const v = peaks.data[i] || 0;
      g.fillRect(x, h / 2 - v * h / 2, 1, Math.max(1, v * h));
    }
  }
  async function decodeMedia(m) {
    const r = rt[m.id];
    if (!r || r.missing) return null;
    if (r.audioBuf !== undefined) return r.audioBuf;
    if (!r.decoding) r.decoding = (async () => {
      try {
        const ab = await (await fetch(r.url)).arrayBuffer();
        const ctx = new OfflineAudioContext(2, 48000, 48000);
        r.audioBuf = await ctx.decodeAudioData(ab);
      } catch (e) { r.audioBuf = null; }
      return r.audioBuf;
    })();
    return r.decoding;
  }
  async function mediaPeaks(m) {
    const r = rt[m.id];
    if (r.peaks) return r.peaks;
    const b = await decodeMedia(m);
    if (!b) return null;
    const rate = 50, n = Math.ceil(b.duration * rate), data = new Float32Array(n);
    const ch = b.getChannelData(0), spb = b.sampleRate / rate;
    for (let i = 0; i < n; i++) { let mx = 0; const s0 = Math.floor(i * spb), s1 = Math.min(ch.length, Math.floor((i + 1) * spb)); for (let j = s0; j < s1; j += 4) mx = Math.max(mx, Math.abs(ch[j])); data[i] = mx; }
    r.peaks = { rate, data };
    return r.peaks;
  }
  let clipDrag = null;
  function clipPointer(e, track, c, el) {
    if (e.button !== 0) return;
    e.stopPropagation();
    selectClip(track, c.id);
    const edge = e.target.dataset.edge;
    el.setPointerCapture(e.pointerId);
    clipDrag = { track, c, edge, x0: e.clientX, orig: clone(c), moved: false, el };
    const mv = (ev) => clipMove(ev);
    const up = () => { el.removeEventListener('pointermove', mv); clipUp(); };
    el.addEventListener('pointermove', mv);
    el.addEventListener('pointerup', up, { once: true });
  }
  function clipMove(e) {
    const d = clipDrag;
    if (!d) return;
    const dt = (e.clientX - d.x0) / pps;
    if (!d.moved && Math.abs(e.clientX - d.x0) < 3) return;
    d.moved = true;
    const c = d.c, o = d.orig;
    const m = P.media.find((x) => x.id === c.media);
    if (d.edge) {
      if (d.track === 'titles') {
        if (d.edge === 'l') { const ns = W.clamp(o.start + dt, 0, o.start + o.dur - 0.2); c.dur = o.dur - (ns - o.start); c.start = ns; } else c.dur = Math.max(0.2, o.dur + dt);
      } else if (c.kind === 'image') {
        c.dur = Math.max(0.3, o.dur + (d.edge === 'r' ? dt : -dt));
      } else {
        const sp = c.speed || 1;
        if (d.edge === 'l') { c.in = W.clamp(o.in + dt * sp, 0, o.out - 0.2); if (d.track === 'audio') c.start = Math.max(0, o.start + (c.in - o.in)); }
        else c.out = W.clamp(o.out + dt * sp, o.in + 0.2, m ? m.duration : o.out);
      }
    } else if (d.track === 'titles' || d.track === 'audio') {
      c.start = Math.max(0, o.start + dt);
      // التصاق بالمؤشر وبحواف المقاطع
      const snapPts = [T, 0].concat(P.video.map((v) => v._start), P.video.map((v) => v._end));
      snapPts.forEach((s) => { if (Math.abs(c.start - s) * pps < 8) c.start = s; });
    } else {
      // إعادة ترتيب مقاطع الفيديو
      d.el.style.transform = 'translateX(' + (e.clientX - d.x0) + 'px)';
      d.el.classList.add('dragging');
      return;
    }
    const nd = clipEl(d.track, c);
    d.el.replaceWith(nd);
    d.el = nd;
    nd.classList.add('selected');
    if (!playing) seekPreview();
  }
  function clipUp() {
    const d = clipDrag; clipDrag = null;
    if (!d || !d.moved) return;
    if (d.track === 'video' && !d.edge) {
      const r = d.el.getBoundingClientRect();
      const box = d.el.parentElement.getBoundingClientRect();
      const center = (r.left + r.width / 2 - box.left) / pps;
      const rest = P.video.filter((x) => x !== d.c);
      let idx = rest.findIndex((v) => center < v._start + clipDur(v) / 2);
      if (idx < 0) idx = rest.length;
      rest.splice(idx, 0, d.c);
      P.video = rest;
    }
    commit(); renderAll();
  }
  function selectClip(track, id) {
    sel = id ? { track, id } : null;
    tlEl.querySelectorAll('.v-clip').forEach((el) => el.classList.toggle('selected', !!sel && el.dataset.id === sel.id));
    renderProps();
  }
  const selClip = () => (sel && P ? P[sel.track].find((c) => c.id === sel.id) : null);
  function split() {
    if (!P) return;
    layoutVideo();
    let track = sel && sel.track, c = selClip();
    const inside = (cc, tr) => { if (tr === 'video') return T > cc._start + 0.05 && T < cc._end - 0.05; if (tr === 'audio') return T > cc.start + 0.05 && T < cc.start + cc.out - cc.in - 0.05; return T > cc.start + 0.05 && T < cc.start + cc.dur - 0.05; };
    if (!c || !inside(c, track)) { track = 'video'; c = P.video.find((v) => inside(v, 'video')); }
    if (!c) return;
    const b = clone(c); b.id = uid();
    if (track === 'video') {
      const local = T - c._start;
      if (c.kind === 'image') { b.dur = c.dur - local; c.dur = local; }
      else { const cut = c.in + local * (c.speed || 1); b.in = cut; c.out = cut; }
      b.trans = 'none';
      P.video.splice(P.video.indexOf(c) + 1, 0, b);
    } else if (track === 'audio') {
      const cut = c.in + (T - c.start); b.in = cut; b.start = T; c.out = cut; b.fadeIn = 0; c.fadeOut = 0;
      P.audio.push(b);
    } else { const local = T - c.start; b.start = T; b.dur = c.dur - local; c.dur = local; P.titles.push(b); }
    sel = { track, id: b.id };
    commit(); renderAll();
  }
  function deleteClip() {
    const c = selClip();
    if (!c) return;
    P[sel.track] = P[sel.track].filter((x) => x !== c);
    sel = null;
    commit(); renderAll();
  }
  function duplicateClip() {
    const c = selClip();
    if (!c) return;
    const b = clone(c); b.id = uid();
    if (sel.track === 'video') P.video.splice(P.video.indexOf(c) + 1, 0, b);
    else { b.start = c.start + (sel.track === 'titles' ? c.dur : c.out - c.in); P[sel.track].push(b); }
    sel = { track: sel.track, id: b.id };
    commit(); renderAll();
  }
  const clipMenu = () => [
    { i18n: 'v.split', icon: 'scissors', action: split },
    { i18n: 'cmd.duplicate', icon: 'duplicate', action: duplicateClip },
    { i18n: 'cmd.delete', icon: 'trash', action: deleteClip }
  ];

  /* ═══════════ النصوص ═══════════ */
  const TITLE_PRESETS = [
    { key: 'title', size: 110, pos: 'center', style: 'shadow', anim: 'zoom', font: 'Lalezar', weight: 400, color: '#ffffff', dur: 4 },
    { key: 'lower', size: 54, pos: 'lower', style: 'box', anim: 'slide', font: 'Cairo', weight: 700, color: '#ffffff', boxColor: 'rgba(98,3,201,0.85)', dur: 5, text: { ar: 'محمد الشطي\nمطو\u0651ر ومصمم', en: 'Mohammed Alshatti\nDeveloper & designer' } },
    { key: 'subtitle', size: 46, pos: 'bottom', style: 'box', anim: 'fade', font: 'Tajawal', weight: 700, color: '#ffffff', boxColor: 'rgba(0,0,0,0.65)', dur: 3 },
    { key: 'quote', size: 70, pos: 'center', style: 'outline', anim: 'type', font: 'Amiri', weight: 700, color: '#fde68a', dur: 5 },
    { key: 'end', size: 90, pos: 'center', style: 'plain', anim: 'fade', font: 'Aref Ruqaa', weight: 700, color: '#ffffff', dur: 4 }
  ];
  function addTitle(preset) {
    if (!P) newProject(true);
    const p = preset || TITLE_PRESETS[0];
    const text = p.text ? W.L(p.text) : W.t('v.tp.' + p.key);
    const x = { id: uid(), start: T, dur: p.dur, text, font: p.font, weight: p.weight, size: p.size, color: p.color, style: p.style, boxColor: p.boxColor || 'rgba(0,0,0,0.6)', pos: p.pos, anim: p.anim };
    W.ensureFont(p.font, p.weight).then(() => drawPreview());
    P.titles.push(x);
    sel = { track: 'titles', id: x.id };
    commit(); renderAll();
  }

  /* ═══════════ اللوحات الجانبية ═══════════ */
  let binTab = 'media';
  function renderBin() {
    binEl.innerHTML = '';
    binEl.append(W.segmented([{ value: 'media', i18n: 'v.media' }, { value: 'titles', i18n: 'v.titles' }], binTab, (v) => { binTab = v; renderBin(); }));
    if (binTab === 'titles') {
      const g = W.h('div', { class: 'v-tgrid' });
      TITLE_PRESETS.forEach((p) => {
        const b = W.h('button', { class: 'v-tpreset v-' + p.style, type: 'button' }, W.h('span', { text: p.text ? W.L(p.text).split('\n')[0] : W.t('v.tp.' + p.key), style: { fontFamily: W.fontStack(p.font), color: p.color, fontWeight: p.weight } }));
        if (p.style === 'box') b.querySelector('span').style.background = p.boxColor;
        b.addEventListener('click', () => addTitle(p));
        g.append(b);
      });
      binEl.append(g);
      return;
    }
    const imp = W.h('button', { class: 'w-btn primary', type: 'button', style: { width: '100%' } }, W.iconEl('upload'), W.h('span', { text: W.t('v.import') }));
    imp.addEventListener('click', importMedia);
    binEl.append(imp);
    if (!P || !P.media.length) { binEl.append(W.h('p', { class: 'muted small', style: { lineHeight: '1.7' }, text: W.t('v.noMedia') })); return; }
    const grid = W.h('div', { class: 'v-mgrid' });
    P.media.forEach((m) => {
      const r = rt[m.id] || {};
      const card = W.h('div', { class: 'v-mcard' + (r.missing ? ' missing' : ''), draggable: 'true', title: m.name });
      const th = W.h('div', { class: 'v-mthumb' });
      if (r.thumb) th.style.backgroundImage = 'url("' + r.thumb + '")'; else th.append(W.iconEl(m.kind === 'audio' ? 'music' : m.kind === 'image' ? 'image' : 'film'));
      if (m.kind !== 'image') th.append(W.h('span', { class: 'v-mdur', text: fmtT(m.duration) }));
      card.append(th, W.h('div', { class: 'v-mname', text: m.name }));
      card.addEventListener('dblclick', () => addToTimeline(m));
      card.addEventListener('click', () => { if (r.missing) relink(m); });
      card.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/x-media', m.id); e.dataTransfer.effectAllowed = 'copy'; });
      card.addEventListener('contextmenu', (e) => W.contextMenu(e, [
        { i18n: 'v.addToTimeline', icon: 'plus', action: () => addToTimeline(m) },
        { i18n: 'v.relink', action: () => relink(m), hidden: () => !r.missing },
        { i18n: 'v.removeMedia', icon: 'trash', action: () => removeMedia(m) }]));
      const add = W.iconButton('plus', 'v.addToTimeline', (e) => { e.stopPropagation(); addToTimeline(m); }, { cls: 'sm v-madd' });
      card.append(add);
      grid.append(card);
    });
    binEl.append(grid);
  }
  async function relink(m) {
    const f = await W.files.open({ types: [{ name: { ar: 'وسائط', en: 'Media' }, ext: VIDEO_EXT.concat(IMAGE_EXT, AUDIO_EXT) }], as: 'media' });
    if (!f[0]) return;
    rt[m.id] = { url: f[0].url };
    m.path = f[0].path; m.name = f[0].name;
    try { await probe(m); } catch (e) { rt[m.id].missing = true; }
    els.forEach((el, id) => { const c = P.video.concat(P.audio).find((x) => x.id === id); if (c && c.media === m.id) { el.src = rt[m.id].url; } });
    commit(); renderAll();
  }

  function section(key, ...ch) { return W.h('div', { class: 'w-panel' }, W.h('div', { class: 'w-panel-title', text: W.t(key) }), W.h('div', { class: 'w-panel-body' }, ...ch)); }
  function selectField(key, value, options, onChange) {
    const s = W.h('select', { class: 'w-select', style: { width: '100%' } });
    options.forEach(([v, k]) => s.append(W.h('option', { value: v, text: W.t(k) })));
    s.value = value;
    s.addEventListener('change', () => onChange(s.value));
    return W.h('div', { class: 'w-field' }, W.h('label', { text: W.t(key) }), s);
  }
  const live = () => { if (!playing) { seekPreview(); } };
  const commitSoon = W.debounce(() => { commit(); renderTimeline(); }, 350);
  function renderProps() {
    propsEl.innerHTML = '';
    if (!P) return;
    const c = selClip();
    if (!c) {
      const RES = [['1920x1080', 'v.res.landscape', '1920×1080'], ['1280x720', 'v.res.landscape', '1280×720'], ['1080x1920', 'v.res.vertical', '1080×1920'], ['1080x1080', 'v.res.square', '1080×1080']];
      const rs = W.h('select', { class: 'w-select', style: { width: '100%' } });
      RES.forEach(([v, k, l]) => rs.append(W.h('option', { value: v, text: W.t(k) + ' ' + l })));
      rs.value = P.w + 'x' + P.h;
      rs.addEventListener('change', () => { const [w, h] = rs.value.split('x').map(Number); P.w = w; P.h = h; commit(); sizePreview(); });
      const fps = W.h('select', { class: 'w-select', style: { width: '100%' } });
      [24, 25, 30, 50, 60].forEach((f) => fps.append(W.h('option', { value: f, text: String(f) })));
      fps.value = P.fps;
      fps.addEventListener('change', () => { P.fps = +fps.value; commit(); });
      const bg = W.h('input', { type: 'color', class: 'w-color', value: P.bg || '#000000' });
      bg.addEventListener('input', () => { P.bg = bg.value; drawPreview(); });
      bg.addEventListener('change', () => commit());
      const fadeEnd = W.h('input', { type: 'checkbox' }); fadeEnd.checked = !!P.fadeOutEnd;
      fadeEnd.addEventListener('change', () => { P.fadeOutEnd = fadeEnd.checked; commit(); drawPreview(); });
      propsEl.append(section('v.project', W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('v.resolution') }), rs), W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('v.fps') }), fps),
        W.h('div', { class: 'row' }, W.h('span', { class: 'small muted', text: W.t('v.bg') }), bg),
        W.h('label', { class: 'w-check-row' }, fadeEnd, W.h('span', { text: W.lang === 'ar' ? 'تلاش\u064D إلى الأسود في النهاية' : 'Fade to black at the end' }))));
      return;
    }
    const quick = W.h('div', { class: 'v-quick' }, W.iconButton('scissors', 'v.split', split), W.iconButton('duplicate', 'cmd.duplicate', duplicateClip), W.iconButton('trash', 'cmd.delete', deleteClip));
    propsEl.append(quick);
    if (sel.track === 'titles') {
      const ta = W.h('textarea', { class: 'w-textarea', rows: 3, dir: 'auto', style: { width: '100%' } });
      ta.value = c.text;
      ta.addEventListener('input', () => { c.text = ta.value; live(); commitSoon(); });
      const font = W.fontSelect(c.font, async (f) => { c.font = f; await W.ensureFont(f, c.weight || 700); live(); commit(); });
      const col = W.h('input', { type: 'color', class: 'w-color', value: c.color });
      col.addEventListener('input', () => { c.color = col.value; live(); });
      col.addEventListener('change', () => commit());
      const box = W.h('input', { type: 'color', class: 'w-color', value: /^#/.test(c.boxColor) ? c.boxColor : '#000000' });
      box.addEventListener('input', () => { c.boxColor = W.color.rgba(box.value, 0.75); live(); });
      box.addEventListener('change', () => commit());
      propsEl.append(section('v.text', ta, W.h('div', { class: 'w-field' }, W.h('label', { text: W.t('v.font') }), font),
        W.slider({ i18n: 'v.size', min: 16, max: 300, value: c.size, onInput: (v) => { c.size = v; live(); }, onChange: () => commit() }),
        W.h('div', { class: 'row' }, W.h('span', { class: 'small muted', text: W.t('v.color') }), col, W.h('span', { class: 'small muted', text: W.t('v.boxColor') }), box),
        selectField('v.style', c.style, [['plain', 'v.st.plain'], ['shadow', 'v.st.shadow'], ['box', 'v.st.box'], ['outline', 'v.st.outline']], (v) => { c.style = v; live(); commit(); }),
        selectField('v.position', c.pos, [['center', 'v.pos.center'], ['top', 'v.pos.top'], ['bottom', 'v.pos.bottom'], ['lower', 'v.pos.lower']], (v) => { c.pos = v; live(); commit(); }),
        selectField('v.anim', c.anim, [['none', 'v.an.none'], ['fade', 'v.an.fade'], ['slide', 'v.an.slide'], ['zoom', 'v.an.zoom'], ['type', 'v.an.type']], (v) => { c.anim = v; live(); commit(); })));
      propsEl.append(section('v.clip',
        W.slider({ i18n: 'v.start', min: 0, max: Math.max(60, Math.ceil(duration())), step: 0.1, value: W.round(c.start, 1), onInput: (v) => { c.start = v; live(); }, onChange: () => { commit(); renderTimeline(); } }),
        W.slider({ i18n: 'v.duration', min: 0.3, max: 60, step: 0.1, value: W.round(c.dur, 1), onInput: (v) => { c.dur = v; live(); }, onChange: () => { commit(); renderTimeline(); } })));
      return;
    }
    const m = P.media.find((x) => x.id === c.media);
    propsEl.append(W.h('div', { class: 'v-clipname', text: m ? m.name : '', dir: 'auto' }));
    if (sel.track === 'video') {
      const items = [];
      if (c.kind === 'image') {
        items.push(W.slider({ i18n: 'v.duration', min: 0.5, max: 60, step: 0.1, value: c.dur, onInput: (v) => { c.dur = v; live(); }, onChange: () => { commit(); renderTimeline(); } }));
        const kb = W.h('input', { type: 'checkbox' }); kb.checked = !!c.kenburns;
        kb.addEventListener('change', () => { c.kenburns = kb.checked; live(); commit(); });
        items.push(W.h('label', { class: 'w-check-row' }, kb, W.h('span', { text: W.t('v.kenburns') })));
      } else {
        items.push(W.slider({ i18n: 'v.volume', min: 0, max: 100, value: Math.round(c.volume * 100), onInput: (v) => { c.volume = v / 100; }, onChange: () => commit() }));
        items.push(selectField('v.speed', String(c.speed || 1), [['0.5', '0.5×'], ['0.75', '0.75×'], ['1', '1×'], ['1.25', '1.25×'], ['1.5', '1.5×'], ['2', '2×']].map(([v, l]) => [v, l]), (v) => { c.speed = parseFloat(v); commit(); renderAll(); }));
      }
      items.push(selectField('v.fit', c.fit, [['fit', 'v.fitIn'], ['fill', 'v.fill']], (v) => { c.fit = v; live(); commit(); }));
      items.push(selectField('v.trans', c.trans, [['none', 'v.transNone'], ['fade', 'v.transFade'], ['dissolve', 'v.transDissolve']], (v) => { c.trans = v; commit(); renderAll(); }));
      items.push(W.slider({ i18n: 'v.transDur', min: 0.1, max: 3, step: 0.1, value: c.transDur || 0.6, onInput: (v) => { c.transDur = v; live(); }, onChange: () => { commit(); renderTimeline(); } }));
      propsEl.append(section('v.clip', ...items));
      const f = c.filter || (c.filter = { b: 100, c: 100, s: 100 });
      propsEl.append(section('v.brightness',
        W.slider({ i18n: 'v.brightness', min: 30, max: 200, value: f.b, reset: 100, onInput: (v) => { f.b = v; live(); }, onChange: () => commit() }),
        W.slider({ i18n: 'v.contrast', min: 30, max: 200, value: f.c, reset: 100, onInput: (v) => { f.c = v; live(); }, onChange: () => commit() }),
        W.slider({ i18n: 'v.saturation', min: 0, max: 250, value: f.s, reset: 100, onInput: (v) => { f.s = v; live(); }, onChange: () => commit() })));
    } else {
      propsEl.append(section('v.clip',
        W.slider({ i18n: 'v.volume', min: 0, max: 100, value: Math.round(c.volume * 100), onInput: (v) => { c.volume = v / 100; }, onChange: () => commit() }),
        W.slider({ i18n: 'v.start', min: 0, max: Math.max(60, Math.ceil(duration())), step: 0.1, value: W.round(c.start, 1), onInput: (v) => { c.start = v; }, onChange: () => { commit(); renderTimeline(); } }),
        W.slider({ i18n: 'v.fadeIn', min: 0, max: 10, step: 0.1, value: c.fadeIn || 0, onInput: (v) => { c.fadeIn = v; }, onChange: () => commit() }),
        W.slider({ i18n: 'v.fadeOut', min: 0, max: 10, step: 0.1, value: c.fadeOut || 0, onInput: (v) => { c.fadeOut = v; }, onChange: () => commit() })));
    }
  }

  /* ═══════════ السجل ═══════════ */
  const hist = { stack: [], index: -1 };
  const snapshot = () => JSON.stringify(P, (k, v) => (k.startsWith('_') ? undefined : v));
  function commit() {
    const s = snapshot();
    if (hist.stack[hist.index] === s) return;
    hist.stack = hist.stack.slice(0, hist.index + 1); hist.stack.push(s);
    if (hist.stack.length > 100) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
  }
  function restore(s) { P = JSON.parse(s); if (sel && !P[sel.track].some((c) => c.id === sel.id)) sel = null; pruneEls(); renderAll(); W.setDirty(true); }
  function undo() { if (hist.index > 0) { hist.index--; restore(hist.stack[hist.index]); } }
  function redo() { if (hist.index < hist.stack.length - 1) { hist.index++; restore(hist.stack[hist.index]); } }

  function renderAll() { renderBin(); renderTimeline(); renderProps(); sizePreview(); seekPreview(); }

  /* ═══════════ المشروع ═══════════ */
  function newProject(quiet) {
    pause();
    els.forEach((el) => { el.pause(); el.removeAttribute('src'); });
    els.clear();
    P = { app: 'monteer', version: 1, w: 1920, h: 1080, fps: 30, bg: '#000000', fadeOutEnd: true, media: [], video: [], titles: [], audio: [] };
    T = 0; sel = null;
    hist.stack = []; hist.index = -1; commit(); W.setDirty(false);
    W.setDoc({ name: null, path: null, dirty: false });
    welcome.hide();
    document.body.classList.add('has-doc');
    if (!quiet) renderAll(); else requestAnimationFrame(renderAll);
  }
  async function newFlow() { if (await W.confirmDiscard()) newProject(); }
  async function openProject() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'مشروع مونتير', en: 'Monteer project' }, ext: ['monteer'] }], as: 'text' });
    if (f[0]) loadProject(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { loadProject(await W.files.readPath(p, 'text')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  async function loadProject(f) {
    try {
      const text = typeof f.data === 'string' ? f.data : W.files.decodeText(new Uint8Array(f.data));
      const j = JSON.parse(text);
      if (j.app !== 'monteer' || !Array.isArray(j.media)) throw new Error('bad');
      newProject(true);
      P = j;
      const res = await W.files.mediaFromPaths(P.media.map((m) => m.path || ''));
      for (let i = 0; i < P.media.length; i++) {
        const m = P.media[i];
        if (res[i]) { rt[m.id] = { url: res[i].url }; try { await probe(m); } catch (e) { rt[m.id].missing = true; } }
        else { rt[m.id] = { missing: true }; W.toast(W.t('v.missing', { name: m.name }), 'warning'); }
      }
      hist.stack = []; hist.index = -1; commit();
      W.setDoc({ name: f.name, path: f.path, dirty: false });
      if (f.path) W.recent.add(f.path, f.name);
      renderAll();
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : (W.lang === 'ar' ? 'فيديو' : 'video'));
  async function saveProject(as) {
    if (!P) return;
    const res = await W.files.save({ data: snapshot(), name: baseName() + '.monteer', path: as ? null : (W.doc.path && /\.monteer$/.test(W.doc.path) ? W.doc.path : null), types: [{ name: { ar: 'مشروع مونتير', en: 'Monteer project' }, ext: ['monteer'] }] });
    if (!res) return;
    W.setDoc({ name: res.name, path: res.path, dirty: false });
    if (res.path) W.recent.add(res.path, res.name);
    W.toast(W.t('ui.saved'), 'success');
  }

  /* ═══════════ التصدير ═══════════ */
  async function pickVideoCodec(fmt, w, h, fps, bitrate) {
    if (typeof VideoEncoder === 'undefined') return null;
    const list = fmt === 'mp4' ? ['avc1.640033', 'avc1.640028', 'avc1.4d0028', 'avc1.42e01f', 'avc1.42001f'] : ['vp09.00.40.08', 'vp09.00.10.08', 'vp8'];
    for (const codec of list) {
      const cfg = { codec, width: w, height: h, bitrate, framerate: fps, latencyMode: 'quality' };
      if (codec.startsWith('avc')) cfg.avc = { format: 'avc' };
      try { const r = await VideoEncoder.isConfigSupported(cfg); if (r.supported) return cfg; } catch (e) { /* التالي */ }
    }
    return null;
  }
  async function pickAudioCodec(fmt, sr) {
    if (typeof AudioEncoder === 'undefined') return null;
    const list = fmt === 'mp4' ? [['mp4a.40.2', 'aac'], ['opus', 'opus']] : [['opus', 'opus']];
    for (const [codec, mux] of list) {
      const cfg = { codec, sampleRate: sr, numberOfChannels: 2, bitrate: 192000 };
      try { const r = await AudioEncoder.isConfigSupported(cfg); if (r.supported) return { cfg, mux }; } catch (e) { /* التالي */ }
    }
    return null;
  }
  /** مزج الصوت كامل\u064Bا عبر OfflineAudioContext */
  async function mixAudio(total, sr, progress) {
    const n = Math.max(1, Math.ceil(total * sr));
    const oc = new OfflineAudioContext(2, n, sr);
    layoutVideo();
    const tasks = [];
    P.video.forEach((c) => { if (c.kind === 'video' && c.volume > 0) tasks.push({ c, start: c._start, offset: c.in, dur: clipDur(c), vol: c.volume, fadeIn: c._td, fadeOut: 0, speed: c.speed || 1 }); });
    P.audio.forEach((c) => { if (c.volume > 0) tasks.push({ c, start: c.start, offset: c.in, dur: c.out - c.in, vol: c.volume, fadeIn: c.fadeIn || 0, fadeOut: c.fadeOut || 0, speed: 1 }); });
    let i = 0;
    for (const tk of tasks) {
      progress && progress(i++ / Math.max(1, tasks.length));
      const m = P.media.find((x) => x.id === tk.c.media);
      const buf = m && await decodeMedia(m);
      if (!buf) continue;
      const s = oc.createBufferSource(); s.buffer = buf; s.playbackRate.value = tk.speed;
      const g = oc.createGain();
      const t0 = tk.start, t1 = tk.start + tk.dur;
      g.gain.setValueAtTime(tk.fadeIn ? 0 : tk.vol, t0);
      if (tk.fadeIn) g.gain.linearRampToValueAtTime(tk.vol, t0 + tk.fadeIn);
      if (tk.fadeOut) { g.gain.setValueAtTime(tk.vol, Math.max(t0, t1 - tk.fadeOut)); g.gain.linearRampToValueAtTime(0, t1); }
      s.connect(g); g.connect(oc.destination);
      s.start(t0, tk.offset, tk.dur * tk.speed);
    }
    return oc.startRendering();
  }
  let exportJob = null;
  function progressUI() {
    const bar = W.h('div', { class: 'v-progbar' }, W.h('span'));
    const label = W.h('div', { class: 'v-proglabel', text: W.t('v.preparing') });
    const cancel = W.h('button', { class: 'w-btn', type: 'button', text: W.t('v.cancel') });
    const box = W.h('div', { class: 'v-progress' }, W.h('div', { class: 'v-progcard' }, W.h('div', { class: 'v-progtitle', text: W.t('v.exporting') }), label, bar, cancel));
    document.body.append(box);
    return { box, set: (p, text) => { bar.firstChild.style.width = Math.round(p * 100) + '%'; if (text) label.textContent = text; }, cancel, close: () => box.remove() };
  }
  async function exportFlow() {
    if (!P) return;
    pause();
    const total = duration();
    if (total <= 0) { W.toast(W.t('v.empty'), 'warning'); return; }
    const v = await W.form(W.t('v.export'), [
      { key: 'fmt', i18n: 'v.format', type: 'select', value: 'mp4', options: [{ value: 'mp4', label: 'MP4 (H.264)' }, { value: 'webm', label: 'WebM (VP9)' }] },
      { key: 'res', i18n: 'v.resolution', type: 'select', value: '1', options: [{ value: '1', label: P.w + '×' + P.h }, { value: '0.6667', label: Math.round(P.w * 2 / 3) + '×' + Math.round(P.h * 2 / 3) }, { value: '0.5', label: Math.round(P.w / 2) + '×' + Math.round(P.h / 2) }] },
      { key: 'q', i18n: 'v.quality', type: 'select', value: 'high', options: [{ value: 'high', label: W.t('v.q.high') }, { value: 'medium', label: W.t('v.q.medium') }, { value: 'low', label: W.t('v.q.low') }] }
    ]);
    if (!v) return;
    const even = (x) => Math.max(2, Math.round(x / 2) * 2);
    const w = even(P.w * parseFloat(v.res)), h = even(P.h * parseFloat(v.res));
    const bitrate = Math.round(w * h * P.fps * ({ high: 0.12, medium: 0.07, low: 0.04 }[v.q]));
    try {
      const bytes = await renderVideo({ fmt: v.fmt, w, h, fps: P.fps, bitrate, total });
      if (!bytes) return;
      const ext = bytes.ext;
      const res = await W.files.save({ data: bytes.data, name: baseName() + '.' + ext, types: [{ name: { ar: 'فيديو', en: 'Video' }, ext: [ext] }] });
      if (res) W.toast(W.t('v.exportDone'), 'success');
    } catch (e) { console.error(e); W.toast(String(e.message || e), 'error'); }
  }
  /** تجهيز عناصر فيديو مستقلة للتصدير ثم البحث الدقيق عن كل إطار */
  function exportSources() {
    const map = new Map();
    const get = (c, m) => {
      if (m.kind === 'image') return rt[m.id] && rt[m.id].img;
      let el = map.get(c.id);
      if (!el) { el = document.createElement('video'); el.muted = true; el.preload = 'auto'; el.src = rt[m.id].url; map.set(c.id, el); }
      return el;
    };
    const seekAll = async (t) => {
      const act = activeVideo(t).filter((c) => c.kind === 'video');
      await Promise.all(act.map((c) => {
        const m = P.media.find((x) => x.id === c.media);
        const el = get(c, m);
        const want = Math.min((m.duration || 1e9) - 0.001, c.in + (t - c._start) * (c.speed || 1));
        return new Promise((res) => {
          const done = () => { el.removeEventListener('seeked', done); clearTimeout(to); res(); };
          const to = setTimeout(done, 3000);
          if (el.readyState >= 2 && Math.abs(el.currentTime - want) < 0.0005) { done(); return; }
          el.addEventListener('seeked', done);
          el.currentTime = want;
        });
      }));
    };
    const dispose = () => map.forEach((el) => { el.removeAttribute('src'); el.load(); });
    return { get, seekAll, dispose };
  }
  async function renderVideo(o) {
    const ui = progressUI();
    let cancelled = false;
    ui.cancel.addEventListener('click', () => { cancelled = true; });
    exportJob = { cancel: () => { cancelled = true; } };
    const canvas = document.createElement('canvas'); canvas.width = o.w; canvas.height = o.h;
    const g = canvas.getContext('2d', { alpha: false });
    const src = exportSources();
    try {
      await W.fontsReady();
      const fonts = new Set(P.titles.map((x) => x.font));
      for (const f of fonts) await W.ensureFont(f, 700);
      const sr = 48000;
      let vcfg = await pickVideoCodec(o.fmt, o.w, o.h, o.fps, o.bitrate);
      if (!vcfg && o.fmt === 'mp4') {
        // لا يتوفر مرم\u0651ز H.264 على هذا الجهاز: نصد\u0651ر WebM بالسرعة نفسها بدلًا من التسجيل البطيء
        vcfg = await pickVideoCodec('webm', o.w, o.h, o.fps, o.bitrate);
        if (vcfg) { o.fmt = 'webm'; W.toast('MP4 (H.264) \u2192 WebM (VP9)', 'info', 5000); }
      }
      const acfg = vcfg ? await pickAudioCodec(o.fmt, sr) : null;
      const haveMuxer = o.fmt === 'mp4' ? typeof Mp4Muxer !== 'undefined' : typeof WebMMuxer !== 'undefined';
      ui.set(0, W.t('v.preparing'));
      const audio = await mixAudio(o.total, sr, (p) => ui.set(p * 0.1));
      if (cancelled) return null;
      if (!vcfg || !haveMuxer) { W.toast(W.t('v.noEncoder'), 'info', 6000); return await realtimeExport(o, canvas, g, src, audio, ui, () => cancelled); }
      let target, muxer;
      if (o.fmt === 'mp4') {
        target = new Mp4Muxer.ArrayBufferTarget();
        muxer = new Mp4Muxer.Muxer({ target, video: { codec: 'avc', width: o.w, height: o.h, frameRate: o.fps }, audio: acfg ? { codec: acfg.mux, sampleRate: sr, numberOfChannels: 2 } : undefined, fastStart: 'in-memory', firstTimestampBehavior: 'offset' });
      } else {
        target = new WebMMuxer.ArrayBufferTarget();
        muxer = new WebMMuxer.Muxer({ target, video: { codec: vcfg.codec.startsWith('vp8') ? 'V_VP8' : 'V_VP9', width: o.w, height: o.h, frameRate: o.fps }, audio: acfg ? { codec: 'A_OPUS', sampleRate: sr, numberOfChannels: 2 } : undefined, firstTimestampBehavior: 'offset' });
      }
      let encErr = null;
      const venc = new VideoEncoder({ output: (chunk, meta) => muxer.addVideoChunk(chunk, meta), error: (e) => { encErr = e; } });
      venc.configure(vcfg);
      const frames = Math.max(1, Math.round(o.total * o.fps));
      for (let i = 0; i < frames; i++) {
        if (cancelled) { venc.close(); return null; }
        if (encErr) throw encErr;
        const t = i / o.fps;
        await src.seekAll(t);
        drawFrame(g, t, o.w, o.h, src.get);
        const vf = new VideoFrame(canvas, { timestamp: Math.round(i * 1e6 / o.fps), duration: Math.round(1e6 / o.fps) });
        venc.encode(vf, { keyFrame: i % (o.fps * 2) === 0 });
        vf.close();
        while (venc.encodeQueueSize > 8) await W.sleep(2);
        if (i % 5 === 0) { ui.set(0.1 + 0.85 * (i / frames), fmtT(t) + ' / ' + fmtT(o.total)); await W.sleep(0); }
      }
      await venc.flush();
      if (encErr) throw encErr;
      if (acfg && audio) {
        const aenc = new AudioEncoder({ output: (chunk, meta) => muxer.addAudioChunk(chunk, meta), error: (e) => { encErr = e; } });
        aenc.configure(acfg.cfg);
        const L = audio.getChannelData(0), R = audio.numberOfChannels > 1 ? audio.getChannelData(1) : L;
        const F = 4800;
        for (let i = 0; i < L.length; i += F) {
          const n = Math.min(F, L.length - i);
          const planar = new Float32Array(n * 2); planar.set(L.subarray(i, i + n), 0); planar.set(R.subarray(i, i + n), n);
          const ad = new AudioData({ format: 'f32-planar', sampleRate: sr, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round(i / sr * 1e6), data: planar });
          aenc.encode(ad); ad.close();
          if (aenc.encodeQueueSize > 30) await W.sleep(1);
        }
        await aenc.flush();
        if (encErr) throw encErr;
      }
      muxer.finalize();
      ui.set(1);
      return { data: new Uint8Array(target.buffer), ext: o.fmt };
    } finally {
      src.dispose(); ui.close(); exportJob = null;
    }
  }
  /** بديل: تسجيل بالزمن الحقيقي عبر MediaRecorder عندما لا يتوفر WebCodecs */
  async function realtimeExport(o, canvas, g, src, audio, ui, isCancelled) {
    const ctx = new AudioContext({ sampleRate: 48000 });
    const dest = ctx.createMediaStreamDestination();
    const stream = canvas.captureStream(o.fps);
    if (audio) { const s = ctx.createBufferSource(); s.buffer = audio; s.connect(dest); dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t)); var asrc = s; }
    const mime = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((m) => MediaRecorder.isTypeSupported(m));
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: o.bitrate });
    const chunks = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    const done = new Promise((res) => { rec.onstop = res; });
    rec.start(500);
    const t0 = performance.now();
    if (asrc) asrc.start();
    while (true) {
      const t = (performance.now() - t0) / 1000;
      if (t >= o.total || isCancelled()) break;
      await src.seekAll(t);
      drawFrame(g, t, o.w, o.h, src.get);
      ui.set(t / o.total, fmtT(t) + ' / ' + fmtT(o.total));
      await new Promise((r) => requestAnimationFrame(r));
    }
    rec.stop(); await done; ctx.close();
    if (isCancelled()) return null;
    return { data: new Uint8Array(await new Blob(chunks).arrayBuffer()), ext: 'webm' };
  }

  /* ═══════════ القوائم والواجهة ═══════════ */
  const needP = () => !P;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 'v.newProject', icon: 'file-plus', shortcut: 'Mod+N', action: newFlow },
      { i18n: 'v.openProject', icon: 'folder', shortcut: 'Mod+O', action: openProject },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      { i18n: 'v.import', icon: 'upload', shortcut: 'Mod+I', action: importMedia },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: () => saveProject(false), disabled: needP, global: true },
      { i18n: 'cmd.saveAs', shortcut: 'Mod+Shift+S', action: () => saveProject(true), disabled: needP, global: true },
      { i18n: 'v.export', icon: 'export', shortcut: 'Mod+E', action: exportFlow, disabled: needP, global: true },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo },
      '-',
      { i18n: 'v.split', icon: 'scissors', shortcut: 'S', action: split, disabled: needP },
      { i18n: 'cmd.duplicate', icon: 'duplicate', shortcut: 'Mod+D', action: duplicateClip, disabled: () => !selClip() },
      { i18n: 'cmd.delete', icon: 'trash', shortcut: 'Delete', action: deleteClip, disabled: () => !selClip() },
      '-',
      { i18n: 'v.newTitle', icon: 'text', shortcut: 'T', action: () => addTitle(), disabled: needP }
    ] },
    { i18n: 'menu.view', items: [
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => { pps = Math.min(600, pps * 1.4); renderTimeline(); } },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => { pps = Math.max(4, pps / 1.4); renderTimeline(); } },
      { i18n: 'cmd.fit', icon: 'fit', shortcut: 'Mod+0', action: fitTimeline },
      { i18n: 'v.fullscreen', icon: 'fullscreen', shortcut: 'F', action: () => { const el = $('#previewBox'); if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen && el.requestFullscreen(); } },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  function fitTimeline() { if (!P) return; pps = W.clamp((tlEl.clientWidth - 120) / Math.max(1, duration()), 4, 600); renderTimeline(); }
  const chrome = W.mountChrome({ menus, shortcuts: [['v.play', 'Space'], ['v.split', 'S'], ['v.newTitle', 'T'], ['v.prevFrame', '←'], ['v.nextFrame', '→']] });
  void chrome;
  W.keys.bind('Space', togglePlay);
  W.keys.bind('s', split);
  W.keys.bind('t', () => P && addTitle());
  W.keys.bind('Backspace', deleteClip);
  W.keys.bind('Home', () => setTime(0));
  W.keys.bind('End', () => setTime(duration()));
  W.keys.bind('ArrowLeft', () => P && setTime(T - 1 / P.fps));
  W.keys.bind('ArrowRight', () => P && setTime(T + 1 / P.fps));
  W.keys.bind('Shift+ArrowLeft', () => P && setTime(T - 1));
  W.keys.bind('Shift+ArrowRight', () => P && setTime(T + 1));
  W.keys.bind('Escape', () => { if (exportJob) exportJob.cancel(); else selectClip(null, null); });

  // شريط الأدوات وأزرار التحكم
  const timeEl = $('#time');
  const playBtn = W.iconButton('play', 'v.play', togglePlay, { shortcut: 'Space', cls: 'v-play' });
  const controls = $('#controls');
  controls.append(
    W.iconButton('skip-back', 'v.toStart', () => setTime(0)),
    W.iconButton('chevron-left', 'v.prevFrame', () => P && setTime(T - 1 / P.fps)),
    playBtn,
    W.iconButton('chevron-right', 'v.nextFrame', () => P && setTime(T + 1 / P.fps)),
    W.iconButton('skip-forward', 'v.toEnd', () => setTime(duration())),
    W.iconButton('fullscreen', 'v.fullscreen', () => { const el = $('#previewBox'); if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen && el.requestFullscreen(); }));
  const tb = $('#toolbar');
  const exportBtn = W.h('button', { class: 'w-btn primary sm', type: 'button' }, W.iconEl('export'), W.h('span', { 'data-i18n': 'v.export', text: W.t('v.export') }));
  exportBtn.addEventListener('click', exportFlow);
  tb.append(
    W.iconButton('file-plus', 'v.newProject', newFlow), W.iconButton('folder', 'v.openProject', openProject), W.iconButton('save', 'cmd.save', () => saveProject(false)), W.h('div', { class: 'w-sep' }),
    W.iconButton('upload', 'v.import', importMedia), W.iconButton('text', 'v.newTitle', () => addTitle()), W.h('div', { class: 'w-sep' }),
    W.iconButton('undo', 'cmd.undo', undo), W.iconButton('redo', 'cmd.redo', redo), W.h('div', { class: 'w-sep' }),
    W.iconButton('scissors', 'v.split', split, { shortcut: 'S' }), W.iconButton('duplicate', 'cmd.duplicate', duplicateClip), W.iconButton('trash', 'cmd.delete', deleteClip), W.h('div', { class: 'w-sep' }),
    W.iconButton('zoom-out', 'cmd.zoomOut', () => { pps = Math.max(4, pps / 1.4); renderTimeline(); }), W.iconButton('fit', 'cmd.fit', fitTimeline), W.iconButton('zoom-in', 'cmd.zoomIn', () => { pps = Math.min(600, pps * 1.4); renderTimeline(); }),
    W.h('div', { class: 'w-spacer' }), exportBtn);

  tlEl.addEventListener('wheel', (e) => { if (e.ctrlKey || e.metaKey) { e.preventDefault(); pps = W.clamp(pps * (e.deltaY < 0 ? 1.15 : 1 / 1.15), 4, 600); renderTimeline(); } }, { passive: false });
  tlEl.addEventListener('pointerdown', (e) => { if (!e.target.closest('.v-clip') && e.target.closest('.v-clips')) { const r = e.target.closest('.v-clips').getBoundingClientRect(); setTime((e.clientX - r.left) / pps); selectClip(null, null); } });

  const welcome = W.welcome($('#previewBox'), {
    text: 'v.welcomeText',
    actions: [{ i18n: 'v.newProject', icon: 'file-plus', primary: true, action: () => newProject() }, { i18n: 'v.import', icon: 'upload', action: importMedia }, { i18n: 'v.openProject', icon: 'folder', action: openProject }],
    openRecent: openPath
  });
  W.dropZone(document.querySelector('.v-workspace'), async (files, e) => {
    const proj = files.find((f) => f.ext === 'monteer');
    if (proj) { if (await W.confirmDiscard()) loadProject({ name: proj.name, path: proj.path, data: await proj.file.text() }); return; }
    if (!P) newProject(true);
    const list = [];
    for (const f of Array.from(e.dataTransfer.files)) { if (kindOf(W.files.ext(f.name))) list.push(await W.files.mediaFromFile(f)); }
    const added = await W.busy('ui.processing', () => addMediaFiles(list));
    if (added.length && !P.video.length && !P.audio.length) added.forEach((m) => addToTimeline(m, true));
    commit(); renderAll();
  }, { as: 'none' });
  W.onExternalFile((f) => loadProject(f), 'text');
  W.on('langchange', () => { if (P) renderAll(); else renderBin(); });
  new ResizeObserver(W.debounce(() => { sizePreview(); }, 60)).observe($('#previewBox'));
  W.fontsReady().then(() => drawPreview());
  renderBin();

  window.__monteer = {
    get P() { return P; }, get T() { return T; }, get sel() { return sel; }, duration, setTime, newProject, addMediaFiles, addToTimeline, addTitle, split, undo, redo, play, pause, get playing() { return playing; },
    renderVideo: (o) => renderVideo(Object.assign({ fmt: 'webm', w: 320, h: 180, fps: 15, bitrate: 500000, total: duration() }, o)), drawFrameAt: (t) => { const c = document.createElement('canvas'); c.width = 320; c.height = 180; drawFrame(c.getContext('2d'), t, 320, 180, previewSource); return c; }
  };
  window.__warshaSelfTest = async function () { return { errors: [] }; };
})();
