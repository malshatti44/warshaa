/* صدى Sada — تسجيل الصوت وتحريره ومعالجته */
(function () {
  'use strict';

  W.init({
    id: 'sada',
    i18n: {
      ar: {
        's.record': 'تسجيل', 's.stopRec': 'إيقاف التسجيل', 's.play': 'تشغيل', 's.pause': 'إيقاف مؤقت', 's.stop': 'إيقاف', 's.toStart': 'إلى البداية', 's.toEnd': 'إلى النهاية', 's.loop': 'تكرار التحديد',
        's.trim': 'الإبقاء على التحديد فقط', 's.silence': 'تحويل التحديد إلى صمت', 's.zoomSel': 'تكبير على التحديد', 's.welcomeText': 'سج\u0651ل صوتك أو افتح ملف\u064Bا صوتي\u064Bا، ثم قص\u0651 وعد\u0651ل وأضف المؤثرات وصد\u0651ر بصيغ WAV وMP3',
        's.newRecording': 'تسجيل جديد', 's.openAudio': 'فتح ملف صوتي…', 's.effects': 'المؤثرات', 's.generate': 'توليد', 's.info': 'معلومات', 's.input': 'جهاز الإدخال', 's.default': 'الافتراضي',
        's.fx.gain': 'تضخيم / خفض', 's.fx.normalize': 'تسوية مستوى الصوت', 's.fx.fadeIn': 'تلاش\u064D عند البداية', 's.fx.fadeOut': 'تلاش\u064D عند النهاية', 's.fx.reverse': 'عكس', 's.fx.speed': 'تغيير السرعة',
        's.fx.eq': 'معادل الصوت', 's.fx.highpass': 'إزالة الطنين المنخفض', 's.fx.compressor': 'ضاغط', 's.fx.gate': 'بوابة الضوضاء', 's.fx.echo': 'صدى', 's.fx.reverb': 'تردد (قاعة)', 's.fx.truncate': 'حذف فترات الصمت',
        's.fx.mono': 'تحويل إلى أحادي', 's.fx.voice': 'تحسين الصوت البشري', 's.fx.invert': 'قلب الطور',
        's.gen.tone': 'نغمة…', 's.gen.noise': 'ضجيج…', 's.gen.silence': 'صمت…',
        's.db': 'المقدار (dB)', 's.peak': 'الذروة المستهدفة (dB)', 's.factor': 'السرعة', 's.bass': 'الجهير (dB)', 's.mid': 'الوسط (dB)', 's.treble': 'الحدة (dB)', 's.cutoff': 'التردد (Hz)',
        's.threshold': 'العتبة (dB)', 's.ratio': 'النسبة', 's.delay': 'التأخير (ms)', 's.feedback': 'الارتداد (%)', 's.mix': 'المزج (%)', 's.room': 'حجم القاعة (ث)', 's.minSilence': 'أقل مدة للصمت (ms)', 's.keep': 'الإبقاء على (ms)',
        's.freq': 'التردد (Hz)', 's.amp': 'الشدة (%)', 's.duration': 'المدة (ث)', 's.wave': 'شكل الموجة', 's.sine': 'جيبية', 's.square': 'مربعة', 's.saw': 'منشارية', 's.white': 'أبيض', 's.pink': 'وردي', 's.brown': 'بني', 's.color': 'النوع',
        's.preview': 'معاينة', 's.apply': 'تطبيق', 's.sampleRate': 'معدل العينات', 's.channels': 'القنوات', 's.length': 'المدة', 's.selection': 'التحديد', 's.peakLevel': 'الذروة', 's.rms': 'متوسط القوة',
        's.mono': 'أحادي', 's.stereo': 'ستيريو', 's.format': 'الصيغة', 's.bitrate': 'معدل البت', 's.onlySel': 'تصدير التحديد فقط', 's.importInsert': 'إدراج ملف صوتي عند المؤشر…', 's.importMix': 'دمج ملف صوتي كطبقة عند المؤشر…',
        's.micDenied': 'تعذ\u0651ر الوصول إلى الميكروفون', 's.recording': 'جار\u064D التسجيل', 's.noAudio': 'لا يوجد صوت', 's.exporting': 'جار\u064D التصدير…', 's.processing': 'جار\u064D المعالجة…', 's.unsupported': 'هذه الصيغة غير مدعومة على هذا الجهاز'
      },
      en: {
        's.record': 'Record', 's.stopRec': 'Stop recording', 's.play': 'Play', 's.pause': 'Pause', 's.stop': 'Stop', 's.toStart': 'Go to start', 's.toEnd': 'Go to end', 's.loop': 'Loop selection',
        's.trim': 'Trim to selection', 's.silence': 'Silence selection', 's.zoomSel': 'Zoom to selection', 's.welcomeText': 'Record your voice or open an audio file, then cut, edit, add effects and export to WAV & MP3',
        's.newRecording': 'New recording', 's.openAudio': 'Open audio…', 's.effects': 'Effects', 's.generate': 'Generate', 's.info': 'Info', 's.input': 'Input device', 's.default': 'Default',
        's.fx.gain': 'Amplify', 's.fx.normalize': 'Normalize', 's.fx.fadeIn': 'Fade in', 's.fx.fadeOut': 'Fade out', 's.fx.reverse': 'Reverse', 's.fx.speed': 'Change speed',
        's.fx.eq': 'Equalizer', 's.fx.highpass': 'Remove rumble', 's.fx.compressor': 'Compressor', 's.fx.gate': 'Noise gate', 's.fx.echo': 'Echo', 's.fx.reverb': 'Reverb (hall)', 's.fx.truncate': 'Truncate silence',
        's.fx.mono': 'Convert to mono', 's.fx.voice': 'Enhance voice', 's.fx.invert': 'Invert phase',
        's.gen.tone': 'Tone…', 's.gen.noise': 'Noise…', 's.gen.silence': 'Silence…',
        's.db': 'Amount (dB)', 's.peak': 'Target peak (dB)', 's.factor': 'Speed', 's.bass': 'Bass (dB)', 's.mid': 'Mid (dB)', 's.treble': 'Treble (dB)', 's.cutoff': 'Frequency (Hz)',
        's.threshold': 'Threshold (dB)', 's.ratio': 'Ratio', 's.delay': 'Delay (ms)', 's.feedback': 'Feedback (%)', 's.mix': 'Mix (%)', 's.room': 'Room size (s)', 's.minSilence': 'Minimum silence (ms)', 's.keep': 'Keep (ms)',
        's.freq': 'Frequency (Hz)', 's.amp': 'Amplitude (%)', 's.duration': 'Duration (s)', 's.wave': 'Waveform', 's.sine': 'Sine', 's.square': 'Square', 's.saw': 'Sawtooth', 's.white': 'White', 's.pink': 'Pink', 's.brown': 'Brown', 's.color': 'Type',
        's.preview': 'Preview', 's.apply': 'Apply', 's.sampleRate': 'Sample rate', 's.channels': 'Channels', 's.length': 'Length', 's.selection': 'Selection', 's.peakLevel': 'Peak', 's.rms': 'RMS',
        's.mono': 'Mono', 's.stereo': 'Stereo', 's.format': 'Format', 's.bitrate': 'Bitrate', 's.onlySel': 'Export selection only', 's.importInsert': 'Insert audio file at cursor…', 's.importMix': 'Mix audio file at cursor…',
        's.micDenied': 'Could not access the microphone', 's.recording': 'Recording', 's.noAudio': 'No audio', 's.exporting': 'Exporting…', 's.processing': 'Processing…', 's.unsupported': 'This format is not supported on this device'
      }
    }
  });

  const $ = (s) => document.querySelector(s);
  const stage = $('#stage'), waveC = $('#wave'), rulerC = $('#ruler'), overC = $('#overview');
  const AUDIO_EXT = ['wav', 'mp3', 'ogg', 'oga', 'm4a', 'aac', 'flac', 'webm', 'opus', 'mp4'];

  let A = null; // { sr, ch: [Float32Array] }
  let sel = { a: 0, b: 0 };
  const view = { start: 0, spp: 256 };
  let clip = null;
  let actx = null;
  const ac = () => { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); return actx; };
  const len = () => (A ? A.ch[0].length : 0);
  const nch = () => (A ? A.ch.length : 0);
  const hasSel = () => sel.b > sel.a;
  const range = () => (hasSel() ? [sel.a, sel.b] : [0, len()]);
  const dbToLin = (db) => Math.pow(10, db / 20);
  const linToDb = (l) => (l > 0 ? 20 * Math.log10(l) : -Infinity);

  /* ═══════════ الوقت والتنسيق ═══════════ */
  function fmtTime(samples, sr, ms) {
    sr = sr || (A ? A.sr : 48000);
    const t = samples / sr;
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = Math.floor(t % 60), f = Math.floor((t % 1) * 1000);
    return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(s).padStart(2, '0') + (ms !== false ? '.' + String(f).padStart(3, '0') : '');
  }

  /* ═══════════ القمم (للرسم السريع) ═══════════ */
  const BLOCK = 256;
  let peaks = null;
  function buildPeaks() {
    if (!A) { peaks = null; return; }
    peaks = A.ch.map((d) => {
      const n = Math.ceil(d.length / BLOCK);
      const p = new Float32Array(n * 2);
      for (let i = 0; i < n; i++) {
        let mn = 1, mx = -1;
        const e = Math.min(d.length, (i + 1) * BLOCK);
        for (let j = i * BLOCK; j < e; j++) { const v = d[j]; if (v < mn) mn = v; if (v > mx) mx = v; }
        p[i * 2] = mn; p[i * 2 + 1] = mx;
      }
      return p;
    });
  }
  function minmax(c, s0, s1) {
    const d = A.ch[c];
    s0 = Math.max(0, Math.floor(s0)); s1 = Math.min(d.length, Math.ceil(s1));
    if (s1 <= s0) return null;
    let mn = 1, mx = -1;
    if (s1 - s0 > BLOCK * 2 && peaks) {
      const b0 = Math.ceil(s0 / BLOCK), b1 = Math.floor(s1 / BLOCK);
      for (let j = s0; j < b0 * BLOCK; j++) { const v = d[j]; if (v < mn) mn = v; if (v > mx) mx = v; }
      const p = peaks[c];
      for (let b = b0; b < b1; b++) { if (p[b * 2] < mn) mn = p[b * 2]; if (p[b * 2 + 1] > mx) mx = p[b * 2 + 1]; }
      for (let j = b1 * BLOCK; j < s1; j++) { const v = d[j]; if (v < mn) mn = v; if (v > mx) mx = v; }
    } else for (let j = s0; j < s1; j++) { const v = d[j]; if (v < mn) mn = v; if (v > mx) mx = v; }
    return [mn, mx];
  }

  /* ═══════════ الرسم ═══════════ */
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  function sizeCanvas(c) {
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { g, w, h };
  }
  let playPos = -1, recLive = null;
  function draw() {
    drawWave(); drawRuler(); drawOverview(); updateTimes();
  }
  function drawWave() {
    const { g, w, h } = sizeCanvas(waveC);
    g.fillStyle = css('--canvas-bg') || '#111'; g.fillRect(0, 0, w, h);
    if (!A && !recLive) return;
    const accent = css('--accent') || '#790ce2';
    const channels = recLive ? recLive.ch : A.ch;
    const lanes = channels.length;
    const laneH = h / lanes;
    const x0 = (s) => (s - view.start) / view.spp;
    // التحديد
    if (A && hasSel()) {
      const xa = Math.max(0, x0(sel.a)), xb = Math.min(w, x0(sel.b));
      if (xb > xa) { g.fillStyle = 'rgba(255,255,255,0.13)'; g.fillRect(xa, 0, xb - xa, h); }
    }
    for (let c = 0; c < lanes; c++) {
      const top = c * laneH, mid = top + laneH / 2, amp = laneH / 2 - 4;
      g.fillStyle = 'rgba(255,255,255,0.03)'; g.fillRect(0, top + 2, w, laneH - 4);
      g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(0, mid + 0.5); g.lineTo(w, mid + 0.5); g.stroke();
      if (recLive) {
        // أثناء التسجيل: نرسم آخر جزء مسجل
        const data = recLive.flat[c];
        const n = recLive.n;
        const spp = Math.max(1, n / w);
        g.fillStyle = '#ef4444';
        for (let x = 0; x < w; x++) {
          const s0 = Math.floor(x * spp), s1 = Math.min(n, Math.floor((x + 1) * spp));
          if (s0 >= n) break;
          let mn = 0, mx = 0;
          for (let j = s0; j < s1; j++) { const v = data[j]; if (v < mn) mn = v; if (v > mx) mx = v; }
          g.fillRect(x, mid - mx * amp, 1, Math.max(1, (mx - mn) * amp));
        }
        continue;
      }
      const inSel = (s) => hasSel() && s >= sel.a && s < sel.b;
      if (view.spp >= 1) {
        for (let x = 0; x < w; x++) {
          const s0 = view.start + x * view.spp;
          const r = minmax(c, s0, s0 + view.spp);
          if (!r) break;
          g.fillStyle = inSel(s0) ? '#ffffff' : accent;
          g.fillRect(x, mid - r[1] * amp, 1, Math.max(1, (r[1] - r[0]) * amp));
        }
      } else {
        // تكبير شديد: نرسم العينات كنقاط متصلة
        const d = A.ch[c];
        g.strokeStyle = accent; g.lineWidth = 1.5;
        g.beginPath();
        const s0 = Math.floor(view.start), s1 = Math.min(d.length, Math.ceil(view.start + w * view.spp) + 1);
        for (let s = s0; s < s1; s++) { const x = x0(s), y = mid - d[s] * amp; if (s === s0) g.moveTo(x, y); else g.lineTo(x, y); }
        g.stroke();
        if (1 / view.spp > 6) { g.fillStyle = accent; for (let s = s0; s < s1; s++) g.fillRect(x0(s) - 2, mid - d[s] * amp - 2, 4, 4); }
      }
      if (lanes > 1) { g.fillStyle = 'rgba(255,255,255,0.45)'; g.font = '11px sans-serif'; g.fillText(c === 0 ? 'L' : 'R', 6, top + 14); }
    }
    if (!A) return;
    // المؤشر
    const cx = x0(sel.a);
    if (!hasSel() && cx >= 0 && cx <= w) { g.fillStyle = '#facc15'; g.fillRect(Math.round(cx), 0, 1, h); }
    if (playPos >= 0) { const px = x0(playPos); if (px >= 0 && px <= w) { g.fillStyle = '#22c55e'; g.fillRect(Math.round(px), 0, 2, h); } }
  }
  function niceStep(sec) {
    const steps = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600];
    return steps.find((s) => s >= sec) || 3600;
  }
  function drawRuler() {
    const { g, w, h } = sizeCanvas(rulerC);
    g.fillStyle = css('--bg-2') || '#222'; g.fillRect(0, 0, w, h);
    if (!A) return;
    const sr = A.sr;
    const step = niceStep((90 * view.spp) / sr);
    const t0 = view.start / sr, t1 = (view.start + w * view.spp) / sr;
    g.fillStyle = css('--fg-3') || '#999'; g.strokeStyle = css('--border-2') || '#555';
    g.font = '10.5px ' + W.fontStack('IBM Plex Sans Arabic');
    g.textBaseline = 'top';
    for (let k = Math.floor(t0 / step); k * step <= t1; k++) {
      const t = Math.round(k * step * 1000) / 1000;
      const x = (t * sr - view.start) / view.spp;
      g.fillRect(Math.round(x), h - 8, 1, 8);
      const label = step < 1 ? fmtTime(t * sr, sr, true).replace(/^00:/, '') : fmtTime(t * sr, sr, false);
      g.fillText(label, x + 3, 3);
      for (let k = 1; k < 5; k++) { const xs = x + (k * step * sr) / view.spp / 5; g.fillRect(Math.round(xs), h - 4, 1, 4); }
    }
    if (hasSel()) { g.fillStyle = 'rgba(250,204,21,0.35)'; const xa = (sel.a - view.start) / view.spp, xb = (sel.b - view.start) / view.spp; g.fillRect(xa, h - 3, xb - xa, 3); }
  }
  function drawOverview() {
    const { g, w, h } = sizeCanvas(overC);
    g.fillStyle = css('--bg-2') || '#222'; g.fillRect(0, 0, w, h);
    if (!A || !len()) return;
    const spp = len() / w;
    g.fillStyle = css('--fg-3') || '#888';
    const mid = h / 2;
    for (let x = 0; x < w; x++) {
      let mn = 0, mx = 0;
      for (let c = 0; c < nch(); c++) { const r = minmax(c, x * spp, (x + 1) * spp); if (r) { mn = Math.min(mn, r[0]); mx = Math.max(mx, r[1]); } }
      g.fillRect(x, mid - mx * (mid - 2), 1, Math.max(1, (mx - mn) * (mid - 2)));
    }
    const vx = view.start / spp, vw = (waveC.clientWidth * view.spp) / spp;
    g.strokeStyle = css('--accent'); g.lineWidth = 2; g.strokeRect(vx + 1, 1, Math.max(4, Math.min(w, vw) - 2), h - 2);
    g.fillStyle = 'rgba(255,255,255,0.06)'; g.fillRect(vx, 0, vw, h);
    if (playPos >= 0) { g.fillStyle = '#22c55e'; g.fillRect(playPos / spp, 0, 1, h); }
  }
  function clampView() {
    if (!A) return;
    const w = waveC.clientWidth;
    const maxSpp = Math.max(0.02, len() / Math.max(1, w));
    view.spp = W.clamp(view.spp, 0.02, Math.max(0.02, maxSpp * 1.0));
    view.start = W.clamp(view.start, 0, Math.max(0, len() - w * view.spp));
  }
  function fitAll() { if (!A) return; view.spp = len() / Math.max(1, waveC.clientWidth); view.start = 0; clampView(); draw(); }
  function zoomAt(f, px) {
    if (!A) return;
    px = px == null ? waveC.clientWidth / 2 : px;
    const s = view.start + px * view.spp;
    view.spp /= f;
    clampView();
    view.start = s - px * view.spp;
    clampView(); draw();
  }
  function zoomSel() { if (!A || !hasSel()) return; view.spp = (sel.b - sel.a) / (waveC.clientWidth * 0.9); view.start = sel.a - (sel.b - sel.a) * 0.05; clampView(); draw(); }
  function ensureVisible(s) {
    const w = waveC.clientWidth;
    if (s < view.start || s > view.start + w * view.spp) { view.start = s - w * view.spp * 0.1; clampView(); }
  }

  /* ═══════════ التفاعل مع الموجة ═══════════ */
  let dragSel = null;
  const sampleAt = (e) => { const r = waveC.getBoundingClientRect(); return W.clamp(Math.round(view.start + (e.clientX - r.left) * view.spp), 0, len()); };
  waveC.addEventListener('pointerdown', (e) => {
    if (!A || e.button !== 0) return;
    waveC.setPointerCapture(e.pointerId);
    const s = sampleAt(e);
    if (e.shiftKey) { const anchor = Math.abs(s - sel.a) < Math.abs(s - sel.b) ? sel.b : sel.a; dragSel = { anchor }; sel = { a: Math.min(anchor, s), b: Math.max(anchor, s) }; }
    else { dragSel = { anchor: s }; sel = { a: s, b: s }; }
    if (playing()) { const was = true; stopPlay(); if (was && !hasSel()) startPlay(); }
    draw();
  });
  waveC.addEventListener('pointermove', (e) => {
    if (!A) return;
    const s = sampleAt(e);
    status.item('pos').textContent = fmtTime(s);
    if (!dragSel) return;
    sel = { a: Math.min(dragSel.anchor, s), b: Math.max(dragSel.anchor, s) };
    // تمرير تلقائي عند الاقتراب من الحافة
    const r = waveC.getBoundingClientRect();
    if (e.clientX > r.right - 20) { view.start += view.spp * 20; clampView(); }
    if (e.clientX < r.left + 20) { view.start -= view.spp * 20; clampView(); }
    draw();
  });
  waveC.addEventListener('pointerup', () => { dragSel = null; updateInfo(); });
  waveC.addEventListener('dblclick', () => { if (A) { sel = { a: 0, b: len() }; draw(); updateInfo(); } });
  stage.addEventListener('wheel', (e) => {
    if (!A) return;
    e.preventDefault();
    const r = waveC.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) zoomAt(e.deltaY < 0 ? 1.25 : 0.8, e.clientX - r.left);
    else { view.start += (e.deltaX || e.deltaY) * view.spp; clampView(); draw(); }
  }, { passive: false });
  let dragOver = false;
  const overToView = (e) => { const r = overC.getBoundingClientRect(); const spp = len() / r.width; view.start = (e.clientX - r.left) * spp - (waveC.clientWidth * view.spp) / 2; clampView(); draw(); };
  overC.addEventListener('pointerdown', (e) => { if (!A) return; overC.setPointerCapture(e.pointerId); dragOver = true; overToView(e); });
  overC.addEventListener('pointermove', (e) => { if (dragOver) overToView(e); });
  overC.addEventListener('pointerup', () => { dragOver = false; });

  /* ═══════════ التحرير والسجل ═══════════ */
  const hist = { stack: [], index: -1 };
  function pushHist(rec) {
    hist.stack = hist.stack.slice(0, hist.index + 1);
    hist.stack.push(rec);
    // حد\u0651 للذاكرة: نحتفظ بآخر 40 خطوة
    if (hist.stack.length > 40) hist.stack.shift();
    hist.index = hist.stack.length - 1;
    W.setDirty(true);
  }
  function concat(a, b) { const o = new Float32Array(a.length + b.length); o.set(a); o.set(b, a.length); return o; }
  /** استبدال المقطع [s, e) بقنوات جديدة — كل التعديلات تمر من هنا (مع إمكانية التراجع) */
  function replaceRange(s, e, newCh, label, noHist) {
    const removed = A.ch.map((d) => d.slice(s, e));
    newCh = conform(newCh, nch());
    A.ch = A.ch.map((d, c) => {
      const n = newCh[c];
      const o = new Float32Array(d.length - (e - s) + n.length);
      o.set(d.subarray(0, s)); o.set(n, s); o.set(d.subarray(e), s + n.length);
      return o;
    });
    if (!noHist) pushHist({ s, removed, insertedLen: newCh[0].length, label, selBefore: Object.assign({}, sel) });
    invalidate();
    return newCh[0].length;
  }
  function undo() {
    if (hist.index < 0) return;
    const r = hist.stack[hist.index];
    if (r.full) { const cur = { sr: A.sr, ch: A.ch }; A = r.full; r.full = cur; }
    else {
      const ins = A.ch.map((d) => d.slice(r.s, r.s + r.insertedLen));
      replaceRange(r.s, r.s + r.insertedLen, r.removed, null, true);
      r.redo = ins;
    }
    hist.index--;
    sel = Object.assign({}, r.selBefore || { a: 0, b: 0 });
    afterEdit(true);
  }
  function redo() {
    if (hist.index >= hist.stack.length - 1) return;
    const r = hist.stack[hist.index + 1];
    if (r.full) { const cur = { sr: A.sr, ch: A.ch }; A = r.full; r.full = cur; }
    else replaceRange(r.s, r.s + r.removed[0].length, r.redo, null, true);
    hist.index++;
    afterEdit(true);
  }
  /** تغيير شامل (عدد القنوات أو معدل العينات) */
  function replaceAll(newA, label) {
    pushHist({ full: { sr: A.sr, ch: A.ch }, label, selBefore: Object.assign({}, sel) });
    A = newA;
    invalidate();
  }
  let cachedBuffer = null;
  function invalidate() { cachedBuffer = null; buildPeaks(); }
  function afterEdit(keepView) {
    sel.a = W.clamp(sel.a, 0, len()); sel.b = W.clamp(sel.b, sel.a, len());
    if (!keepView) clampView(); else clampView();
    draw(); updateInfo(); W.setDirty(true);
  }
  function conform(chs, n) {
    if (chs.length === n) return chs;
    if (n === 1) { const o = new Float32Array(chs[0].length); chs.forEach((d) => { for (let i = 0; i < o.length; i++) o[i] += d[i] / chs.length; }); return [o]; }
    if (chs.length === 1) return Array.from({ length: n }, () => chs[0].slice());
    return chs.slice(0, n);
  }
  const segment = (s, e) => A.ch.map((d) => d.slice(s, e));
  function copy() { if (!A || !hasSel()) return; clip = { sr: A.sr, ch: segment(sel.a, sel.b) }; }
  function cut() { if (!A || !hasSel()) return; copy(); del(); }
  function del() { if (!A || !hasSel()) return; replaceRange(sel.a, sel.b, A.ch.map(() => new Float32Array(0)), 'delete'); sel = { a: sel.a, b: sel.a }; afterEdit(); }
  async function paste() {
    if (!clip) return;
    if (!A) { startDoc({ sr: clip.sr, ch: clip.ch.map((d) => d.slice()) }); return; }
    const data = clip.sr === A.sr ? clip.ch : await resample(clip.ch, clip.sr, A.sr);
    const n = replaceRange(sel.a, sel.b, data.map((d) => d.slice()), 'paste');
    sel = { a: sel.a, b: sel.a + n };
    afterEdit();
  }
  function trim() { if (!A || !hasSel()) return; const seg = segment(sel.a, sel.b); replaceAll({ sr: A.sr, ch: seg }, 'trim'); sel = { a: 0, b: len() }; fitAll(); updateInfo(); }
  function silence() { if (!A || !hasSel()) return; replaceRange(sel.a, sel.b, A.ch.map(() => new Float32Array(sel.b - sel.a)), 'silence'); afterEdit(); }
  function selectAll() { if (A) { sel = { a: 0, b: len() }; draw(); updateInfo(); } }

  /* ═══════════ التشغيل ═══════════ */
  let player = null, raf = 0, loop = false;
  const playing = () => !!player;
  function audioBuffer() {
    if (cachedBuffer) return cachedBuffer;
    const b = ac().createBuffer(nch(), Math.max(1, len()), A.sr);
    A.ch.forEach((d, c) => b.copyToChannel(d, c));
    cachedBuffer = b;
    return b;
  }
  let analyser = null;
  function startPlay() {
    if (!A || !len()) return;
    stopPlay();
    const ctx = ac();
    const src = ctx.createBufferSource();
    src.buffer = audioBuffer();
    if (!analyser) { analyser = ctx.createAnalyser(); analyser.fftSize = 1024; analyser.connect(ctx.destination); }
    src.connect(analyser);
    let from = sel.a, to = hasSel() ? sel.b : len();
    if (from >= len()) from = 0;
    if (loop && hasSel()) { src.loop = true; src.loopStart = sel.a / A.sr; src.loopEnd = sel.b / A.sr; src.start(0, from / A.sr); }
    else src.start(0, from / A.sr, (to - from) / A.sr);
    player = { src, t0: ctx.currentTime, from, to };
    src.onended = () => { if (player && player.src === src) { player = null; playPos = -1; cancelAnimationFrame(raf); draw(); updateTransport(); } };
    updateTransport();
    const tick = () => {
      if (!player) return;
      let pos = player.from + (ctx.currentTime - player.t0) * A.sr;
      if (loop && hasSel() && pos >= sel.b) pos = sel.a + ((pos - sel.a) % (sel.b - sel.a));
      playPos = Math.min(pos, len());
      // تتبع الموضع أثناء التشغيل
      const w = waveC.clientWidth;
      if (playPos > view.start + w * view.spp * 0.92 || playPos < view.start) { view.start = playPos - w * view.spp * 0.1; clampView(); }
      drawWave(); drawOverview(); updateTimes(); meter();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }
  function stopPlay(keepPos) {
    if (!player) return;
    const p = player;
    player = null;
    try { p.src.onended = null; p.src.stop(); } catch (e) { /* تجاهل */ }
    cancelAnimationFrame(raf);
    if (keepPos && !hasSel() && playPos >= 0) sel = { a: Math.round(playPos), b: Math.round(playPos) };
    playPos = -1;
    draw(); updateTransport();
  }
  function togglePlay() { if (recorder) { stopRecording(); return; } if (playing()) stopPlay(true); else startPlay(); }
  const meterEl = $('#meter');
  function meter(level) {
    let peak = level;
    if (peak == null && analyser) {
      const buf = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(buf);
      peak = 0; for (let i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i]));
    }
    const db = linToDb(peak || 0);
    const pct = W.clamp((db + 60) / 60, 0, 1) * 100;
    meterEl.style.setProperty('--level', pct + '%');
    meterEl.classList.toggle('clip', peak >= 0.99);
  }

  /* ═══════════ التسجيل ═══════════ */
  let recorder = null;
  let inputDevice = '';
  async function startRecording() {
    if (recorder) return;
    stopPlay();
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: inputDevice ? { exact: inputDevice } : undefined, echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch (e) { console.error(e); W.toast(W.t('s.micDenied'), 'error'); return; }
    const ctx = ac();
    const track = stream.getAudioTracks()[0];
    const chCount = Math.min(2, (track.getSettings && track.getSettings().channelCount) || 1);
    const srcNode = ctx.createMediaStreamSource(stream);
    const proc = ctx.createScriptProcessor(4096, 2, 2);
    const chunks = Array.from({ length: chCount }, () => []);
    recLive = { ch: new Array(chCount), flat: Array.from({ length: chCount }, () => new Float32Array(ctx.sampleRate * 60)), n: 0 };
    proc.onaudioprocess = (ev) => {
      if (!recorder) return;
      let peak = 0;
      for (let c = 0; c < chCount; c++) {
        const d = new Float32Array(ev.inputBuffer.getChannelData(c));
        chunks[c].push(d);
        let f = recLive.flat[c];
        if (recLive.n + d.length > f.length) { const g2 = new Float32Array(f.length * 2); g2.set(f); recLive.flat[c] = f = g2; }
        f.set(d, recLive.n);
        for (let i = 0; i < d.length; i++) peak = Math.max(peak, Math.abs(d[i]));
      }
      recLive.n += ev.inputBuffer.length;
      meter(peak);
      recTime.textContent = fmtTime(recLive.n, ctx.sampleRate, false);
      drawWave();
    };
    srcNode.connect(proc);
    const mute = ctx.createGain(); mute.gain.value = 0;
    proc.connect(mute); mute.connect(ctx.destination);
    recorder = { stream, proc, srcNode, mute, chunks, sr: ctx.sampleRate, chCount };
    welcome.hide();
    document.body.classList.add('recording');
    updateTransport();
  }
  async function stopRecording() {
    if (!recorder) return;
    const r = recorder; recorder = null;
    r.proc.disconnect(); r.srcNode.disconnect(); r.mute.disconnect();
    r.stream.getTracks().forEach((t) => t.stop());
    document.body.classList.remove('recording');
    recLive = null;
    const total = r.chunks[0].reduce((n, d) => n + d.length, 0);
    const ch = r.chunks.map((list) => { const o = new Float32Array(total); let p = 0; list.forEach((d) => { o.set(d, p); p += d.length; }); return o; });
    meter(0);
    updateTransport();
    if (!total) { draw(); return; }
    if (!A) { startDoc({ sr: r.sr, ch }, { name: (W.lang === 'ar' ? 'تسجيل' : 'Recording') + ' ' + new Date().toLocaleTimeString().replace(/[:\s]/g, '-') + '.wav' }); return; }
    const data = r.sr === A.sr ? ch : await resample(ch, r.sr, A.sr);
    const n = replaceRange(sel.a, sel.b, data, 'record');
    sel = { a: sel.a, b: sel.a + n };
    afterEdit();
  }
  const toggleRecord = () => (recorder ? stopRecording() : startRecording());

  /* ═══════════ الملفات ═══════════ */
  function parseWav(bytes) {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const str = (o, n) => String.fromCharCode(...bytes.subarray(o, o + n));
    if (str(0, 4) !== 'RIFF' || str(8, 4) !== 'WAVE') return null;
    let o = 12, fmt = null, data = null;
    while (o + 8 <= bytes.length) {
      const id = str(o, 4), size = dv.getUint32(o + 4, true);
      if (id === 'fmt ') {
        fmt = { format: dv.getUint16(o + 8, true), ch: dv.getUint16(o + 10, true), sr: dv.getUint32(o + 12, true), bits: dv.getUint16(o + 22, true) };
        if (fmt.format === 0xFFFE && size >= 40) fmt.format = dv.getUint16(o + 8 + 24, true); // WAVE_FORMAT_EXTENSIBLE
      }
      if (id === 'data') { data = { o: o + 8, size: Math.min(size, bytes.length - o - 8) }; break; }
      o += 8 + size + (size & 1);
    }
    if (!fmt || !data) return null;
    const format = fmt.format;
    if (format !== 1 && format !== 3) return null;
    const bps = fmt.bits / 8, frames = Math.floor(data.size / (bps * fmt.ch));
    const ch = Array.from({ length: fmt.ch }, () => new Float32Array(frames));
    for (let i = 0; i < frames; i++) {
      for (let c = 0; c < fmt.ch; c++) {
        const p = data.o + (i * fmt.ch + c) * bps;
        let v;
        if (format === 3 && fmt.bits === 32) v = dv.getFloat32(p, true);
        else if (format === 3 && fmt.bits === 64) v = dv.getFloat64(p, true);
        else if (fmt.bits === 8) v = (bytes[p] - 128) / 128;
        else if (fmt.bits === 16) v = dv.getInt16(p, true) / 32768;
        else if (fmt.bits === 24) { let x = bytes[p] | (bytes[p + 1] << 8) | (bytes[p + 2] << 16); if (x & 0x800000) x |= ~0xFFFFFF; v = x / 8388608; }
        else if (fmt.bits === 32) v = dv.getInt32(p, true) / 2147483648;
        else return null;
        ch[c][i] = v;
      }
    }
    return { sr: fmt.sr, ch };
  }
  function encodeWav(chs, sr, bits) {
    bits = bits || 16;
    const n = chs[0].length, nc = chs.length, bps = bits / 8;
    const buf = new ArrayBuffer(44 + n * nc * bps);
    const dv = new DataView(buf);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); dv.setUint32(4, 36 + n * nc * bps, true); w(8, 'WAVE'); w(12, 'fmt ');
    dv.setUint32(16, 16, true); dv.setUint16(20, bits === 32 ? 3 : 1, true); dv.setUint16(22, nc, true); dv.setUint32(24, sr, true);
    dv.setUint32(28, sr * nc * bps, true); dv.setUint16(32, nc * bps, true); dv.setUint16(34, bits, true);
    w(36, 'data'); dv.setUint32(40, n * nc * bps, true);
    let p = 44;
    for (let i = 0; i < n; i++) {
      for (let c = 0; c < nc; c++) {
        const v = Math.max(-1, Math.min(1, chs[c][i]));
        if (bits === 16) { dv.setInt16(p, v < 0 ? v * 32768 : v * 32767, true); p += 2; }
        else if (bits === 24) { const x = Math.round(v < 0 ? v * 8388608 : v * 8388607); dv.setUint8(p, x & 255); dv.setUint8(p + 1, (x >> 8) & 255); dv.setUint8(p + 2, (x >> 16) & 255); p += 3; }
        else { dv.setFloat32(p, chs[c][i], true); p += 4; }
      }
    }
    return new Uint8Array(buf);
  }
  async function decodeBytes(bytes, ext) {
    if (ext === 'wav') { const w = parseWav(bytes); if (w) return w; }
    const ctx = ac();
    const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    const b = await ctx.decodeAudioData(ab);
    return { sr: b.sampleRate, ch: Array.from({ length: b.numberOfChannels }, (_, c) => b.getChannelData(c).slice()) };
  }
  async function resample(chs, from, to) {
    if (from === to) return chs;
    const n = Math.max(1, Math.round(chs[0].length * to / from));
    const oc = new OfflineAudioContext(chs.length, n, to);
    const b = oc.createBuffer(chs.length, chs[0].length, from);
    chs.forEach((d, c) => b.copyToChannel(d, c));
    const s = oc.createBufferSource(); s.buffer = b; s.connect(oc.destination); s.start();
    const r = await oc.startRendering();
    return Array.from({ length: r.numberOfChannels }, (_, c) => r.getChannelData(c).slice());
  }
  function startDoc(a, meta) {
    stopPlay();
    A = a;
    sel = { a: 0, b: 0 };
    hist.stack = []; hist.index = -1;
    invalidate();
    meta = meta || {};
    W.setDoc({ name: meta.name || null, path: meta.path || null, dirty: !!meta.dirty });
    welcome.hide();
    document.body.classList.add('has-doc');
    requestAnimationFrame(() => { fitAll(); updateInfo(); updateTransport(); });
  }
  async function loadFile(f) {
    try {
      const bytes = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
      const a = await W.busy('s.processing', () => decodeBytes(bytes, f.ext));
      startDoc(a, { name: f.name, path: f.path });
      if (f.path) W.recent.add(f.path, f.name);
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  async function open() {
    if (!(await W.confirmDiscard())) return;
    const f = await W.files.open({ types: [{ name: { ar: 'ملفات صوتية', en: 'Audio files' }, ext: AUDIO_EXT }], as: 'bytes' });
    if (f[0]) await loadFile(f[0]);
  }
  async function openPath(p) { if (!(await W.confirmDiscard())) return; try { await loadFile(await W.files.readPath(p, 'bytes')); } catch (e) { W.toast(W.t('ui.openFailed'), 'error'); } }
  async function importAudio(mix) {
    if (!A) { open(); return; }
    const f = await W.files.open({ types: [{ name: { ar: 'ملفات صوتية', en: 'Audio files' }, ext: AUDIO_EXT }], as: 'bytes' });
    if (!f[0]) return;
    try {
      let a = await W.busy('s.processing', () => decodeBytes(f[0].data, f[0].ext));
      let data = a.sr === A.sr ? a.ch : await resample(a.ch, a.sr, A.sr);
      data = conform(data, nch());
      if (!mix) {
        const n = replaceRange(sel.a, sel.a, data, 'insert');
        sel = { a: sel.a, b: sel.a + n };
      } else {
        const s = sel.a, e = Math.min(len(), s + data[0].length);
        const mixed = A.ch.map((d, c) => { const o = new Float32Array(Math.max(e - s, data[c].length)); for (let i = 0; i < o.length; i++) o[i] = (s + i < d.length ? d[s + i] : 0) + (data[c][i] || 0); return o; });
        replaceRange(s, e, mixed, 'mix');
        sel = { a: s, b: s + mixed[0].length };
      }
      afterEdit();
    } catch (e) { console.error(e); W.toast(W.t('ui.openFailed'), 'error'); }
  }
  const baseName = () => (W.doc.name ? W.files.base(W.doc.name) : (W.lang === 'ar' ? 'صوت' : 'audio'));
  async function save() {
    if (!A) return;
    if (W.doc.path && /\.wav$/i.test(W.doc.path)) {
      const res = await W.files.save({ data: encodeWav(A.ch, A.sr, 16), name: W.doc.name, path: W.doc.path, types: [{ name: { ar: 'ملف WAV', en: 'WAV audio' }, ext: ['wav'] }] });
      if (res) { W.setDoc({ dirty: false }); W.toast(W.t('ui.saved'), 'success'); }
      return;
    }
    exportFlow();
  }
  const hasMp3 = () => typeof window.lamejs !== 'undefined' && window.lamejs.Mp3Encoder;
  const hasOpus = () => typeof window.AudioEncoder !== 'undefined' && typeof window.WebMMuxer !== 'undefined';
  async function exportFlow(preset) {
    if (!A) return;
    const fmts = [{ value: 'wav16', label: 'WAV 16-bit' }, { value: 'wav24', label: 'WAV 24-bit' }, { value: 'wav32', label: 'WAV 32-bit float' }];
    if (hasMp3()) fmts.unshift({ value: 'mp3', label: 'MP3' });
    if (hasOpus()) fmts.push({ value: 'opus', label: 'Opus (WebM)' });
    const v = preset || await W.form(W.t('cmd.export'), [
      { key: 'fmt', i18n: 's.format', type: 'select', value: fmts[0].value, options: fmts },
      { key: 'kbps', i18n: 's.bitrate', type: 'select', value: '192', options: ['96', '128', '192', '256', '320'].map((k) => ({ value: k, label: k + ' kbps' })) },
      { key: 'onlySel', i18n: 's.onlySel', type: 'checkbox', value: false }
    ]);
    if (!v) return;
    const [s, e] = v.onlySel && hasSel() ? [sel.a, sel.b] : [0, len()];
    const chs = segment(s, e);
    try {
      const { bytes, ext } = await W.busy('s.exporting', async () => {
        if (v.fmt === 'mp3') return { bytes: await encodeMp3(chs, A.sr, parseInt(v.kbps, 10)), ext: 'mp3' };
        if (v.fmt === 'opus') return { bytes: await encodeOpus(chs, A.sr, parseInt(v.kbps, 10)), ext: 'webm' };
        return { bytes: encodeWav(chs, A.sr, v.fmt === 'wav24' ? 24 : v.fmt === 'wav32' ? 32 : 16), ext: 'wav' };
      });
      const res = await W.files.save({ data: bytes, name: baseName() + '.' + ext, types: [{ name: { ar: 'ملف صوتي', en: 'Audio file' }, ext: [ext] }] });
      if (res) { W.toast(W.t('ui.exported'), 'success'); if (ext === 'wav' && !v.onlySel) W.setDoc({ name: res.name, path: res.path, dirty: false }); }
    } catch (err) { console.error(err); W.toast(W.t('s.unsupported') + ' — ' + (err.message || err), 'error'); }
  }
  async function encodeMp3(chs, sr, kbps) {
    const OK = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000];
    if (!OK.includes(sr)) { chs = await resample(chs, sr, 48000); sr = 48000; }
    const nc = Math.min(2, chs.length);
    const enc = new lamejs.Mp3Encoder(nc, sr, kbps);
    const toI16 = (d) => { const o = new Int16Array(d.length); for (let i = 0; i < d.length; i++) { const v = Math.max(-1, Math.min(1, d[i])); o[i] = v < 0 ? v * 32768 : v * 32767; } return o; };
    const L = toI16(chs[0]), R = nc > 1 ? toI16(chs[1]) : null;
    const parts = [];
    const B = 1152 * 16;
    for (let i = 0; i < L.length; i += B) {
      const out = nc > 1 ? enc.encodeBuffer(L.subarray(i, i + B), R.subarray(i, i + B)) : enc.encodeBuffer(L.subarray(i, i + B));
      if (out.length) parts.push(new Uint8Array(out));
      if (i % (B * 64) === 0) await W.sleep(0);
    }
    const end = enc.flush();
    if (end.length) parts.push(new Uint8Array(end));
    const total = parts.reduce((n, p) => n + p.length, 0);
    const o = new Uint8Array(total); let p = 0; parts.forEach((x) => { o.set(x, p); p += x.length; });
    return o;
  }
  async function encodeOpus(chs, sr, kbps) {
    if (sr !== 48000) { chs = await resample(chs, sr, 48000); sr = 48000; }
    const nc = Math.min(2, chs.length);
    const target = new WebMMuxer.ArrayBufferTarget();
    const muxer = new WebMMuxer.Muxer({ target, audio: { codec: 'A_OPUS', sampleRate: sr, numberOfChannels: nc } });
    let err = null;
    const enc = new AudioEncoder({ output: (chunk, meta) => muxer.addAudioChunk(chunk, meta), error: (e) => { err = e; } });
    enc.configure({ codec: 'opus', sampleRate: sr, numberOfChannels: nc, bitrate: kbps * 1000 });
    const F = 4800;
    for (let i = 0; i < chs[0].length; i += F) {
      const n = Math.min(F, chs[0].length - i);
      const planar = new Float32Array(n * nc);
      for (let c = 0; c < nc; c++) planar.set(chs[c].subarray(i, i + n), c * n);
      const ad = new AudioData({ format: 'f32-planar', sampleRate: sr, numberOfFrames: n, numberOfChannels: nc, timestamp: Math.round(i / sr * 1e6), data: planar });
      enc.encode(ad); ad.close();
      if (enc.encodeQueueSize > 20) await W.sleep(0);
    }
    await enc.flush();
    if (err) throw err;
    muxer.finalize();
    return new Uint8Array(target.buffer);
  }

  /* ═══════════ المؤثرات ═══════════ */
  async function offline(chs, sr, build, extraSec) {
    const n = chs[0].length + Math.round((extraSec || 0) * sr);
    const oc = new OfflineAudioContext(chs.length, Math.max(1, n), sr);
    const b = oc.createBuffer(chs.length, Math.max(1, chs[0].length), sr);
    chs.forEach((d, c) => b.copyToChannel(d, c));
    const s = oc.createBufferSource(); s.buffer = b;
    const out = build(oc, s);
    out.connect(oc.destination);
    s.start();
    const r = await oc.startRendering();
    return Array.from({ length: r.numberOfChannels }, (_, c) => r.getChannelData(c).slice());
  }
  function impulse(oc, seconds, decay) {
    const n = Math.round(oc.sampleRate * seconds);
    const b = oc.createBuffer(2, n, oc.sampleRate);
    for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay); }
    return b;
  }
  const FX = {
    gain: { fields: [{ key: 'db', i18n: 's.db', min: -30, max: 30, step: 0.5, value: 6 }], run: (chs, p) => { const g = dbToLin(p.db); return chs.map((d) => d.map((v) => v * g)); } },
    normalize: { fields: [{ key: 'peak', i18n: 's.peak', min: -12, max: 0, step: 0.1, value: -1 }], run: (chs, p) => { let m = 0; chs.forEach((d) => { for (let i = 0; i < d.length; i++) m = Math.max(m, Math.abs(d[i])); }); if (!m) return chs; const g = dbToLin(p.peak) / m; return chs.map((d) => d.map((v) => v * g)); } },
    fadeIn: { run: (chs) => chs.map((d) => d.map((v, i) => v * Math.pow(i / d.length, 1.5))) },
    fadeOut: { run: (chs) => chs.map((d) => d.map((v, i) => v * Math.pow(1 - i / d.length, 1.5))) },
    reverse: { run: (chs) => chs.map((d) => d.slice().reverse()) },
    invert: { run: (chs) => chs.map((d) => d.map((v) => -v)) },
    speed: { fields: [{ key: 'factor', i18n: 's.factor', min: 0.25, max: 4, step: 0.05, value: 1.25 }], run: async (chs, p, sr) => {
      const n = Math.max(1, Math.round(chs[0].length / p.factor));
      const oc = new OfflineAudioContext(chs.length, n, sr);
      const b = oc.createBuffer(chs.length, chs[0].length, sr); chs.forEach((d, c) => b.copyToChannel(d, c));
      const s = oc.createBufferSource(); s.buffer = b; s.playbackRate.value = p.factor; s.connect(oc.destination); s.start();
      const r = await oc.startRendering();
      return Array.from({ length: r.numberOfChannels }, (_, c) => r.getChannelData(c).slice());
    } },
    eq: { fields: [{ key: 'bass', i18n: 's.bass', min: -15, max: 15, step: 0.5, value: 3 }, { key: 'mid', i18n: 's.mid', min: -15, max: 15, step: 0.5, value: 0 }, { key: 'treble', i18n: 's.treble', min: -15, max: 15, step: 0.5, value: 2 }],
      run: (chs, p, sr) => offline(chs, sr, (oc, s) => {
        const lo = oc.createBiquadFilter(); lo.type = 'lowshelf'; lo.frequency.value = 200; lo.gain.value = p.bass;
        const mi = oc.createBiquadFilter(); mi.type = 'peaking'; mi.frequency.value = 1200; mi.Q.value = 0.8; mi.gain.value = p.mid;
        const hi = oc.createBiquadFilter(); hi.type = 'highshelf'; hi.frequency.value = 4500; hi.gain.value = p.treble;
        s.connect(lo); lo.connect(mi); mi.connect(hi); return hi;
      }) },
    highpass: { fields: [{ key: 'cutoff', i18n: 's.cutoff', min: 20, max: 400, step: 5, value: 80 }], run: (chs, p, sr) => offline(chs, sr, (oc, s) => { const f = oc.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = p.cutoff; f.Q.value = 0.7; s.connect(f); return f; }) },
    compressor: { fields: [{ key: 'threshold', i18n: 's.threshold', min: -60, max: 0, step: 1, value: -24 }, { key: 'ratio', i18n: 's.ratio', min: 1, max: 20, step: 0.5, value: 4 }],
      run: async (chs, p, sr) => { const r = await offline(chs, sr, (oc, s) => { const c = oc.createDynamicsCompressor(); c.threshold.value = p.threshold; c.ratio.value = p.ratio; c.attack.value = 0.005; c.release.value = 0.15; c.knee.value = 6; s.connect(c); return c; }); return FX.normalize.run(r, { peak: -1 }); } },
    gate: { fields: [{ key: 'threshold', i18n: 's.threshold', min: -80, max: -10, step: 1, value: -45 }], run: (chs, p, sr) => {
      const th = dbToLin(p.threshold);
      const atk = Math.exp(-1 / (0.002 * sr)), rel = Math.exp(-1 / (0.08 * sr)), hold = Math.round(0.05 * sr);
      const n = chs[0].length;
      const env = new Float32Array(n);
      let e = 0, h = 0, g = 0;
      for (let i = 0; i < n; i++) {
        let v = 0; for (let c = 0; c < chs.length; c++) v = Math.max(v, Math.abs(chs[c][i]));
        e = v > e ? v : e * 0.999 + v * 0.001;
        if (e > th) h = hold; else if (h > 0) h--;
        const target = e > th || h > 0 ? 1 : 0;
        g = target > g ? target + (g - target) * atk : target + (g - target) * rel;
        env[i] = g;
      }
      return chs.map((d) => d.map((v, i) => v * env[i]));
    } },
    echo: { fields: [{ key: 'delay', i18n: 's.delay', min: 40, max: 1500, step: 10, value: 320 }, { key: 'feedback', i18n: 's.feedback', min: 0, max: 90, step: 1, value: 40 }, { key: 'mix', i18n: 's.mix', min: 0, max: 100, step: 1, value: 40 }],
      run: (chs, p, sr) => { const D = Math.round(p.delay / 1000 * sr), fb = p.feedback / 100, mix = p.mix / 100; return chs.map((d) => { const o = new Float32Array(d.length); const buf = new Float32Array(d.length); for (let i = 0; i < d.length; i++) { const del = i >= D ? buf[i - D] : 0; buf[i] = d[i] + del * fb; o[i] = d[i] * (1 - mix * 0.5) + del * mix; } return o; }); } },
    reverb: { fields: [{ key: 'room', i18n: 's.room', min: 0.3, max: 6, step: 0.1, value: 2 }, { key: 'mix', i18n: 's.mix', min: 0, max: 100, step: 1, value: 30 }],
      run: async (chs, p, sr) => {
        const wet = await offline(chs, sr, (oc, s) => { const cv = oc.createConvolver(); cv.buffer = impulse(oc, p.room, 3); s.connect(cv); return cv; });
        const m = p.mix / 100;
        return chs.map((d, c) => d.map((v, i) => v * (1 - m) + wet[Math.min(c, wet.length - 1)][i] * m * 0.6));
      } },
    truncate: { fields: [{ key: 'threshold', i18n: 's.threshold', min: -80, max: -10, step: 1, value: -45 }, { key: 'minSilence', i18n: 's.minSilence', min: 100, max: 5000, step: 50, value: 600 }, { key: 'keep', i18n: 's.keep', min: 0, max: 2000, step: 50, value: 250 }],
      run: (chs, p, sr) => {
        const th = dbToLin(p.threshold), minS = Math.round(p.minSilence / 1000 * sr), keep = Math.round(p.keep / 1000 * sr);
        const n = chs[0].length, win = Math.round(0.01 * sr);
        const keepMask = [];
        let runStart = -1;
        const segs = [];
        for (let i = 0; i < n; i += win) {
          let m = 0; for (let c = 0; c < chs.length; c++) for (let j = i; j < Math.min(n, i + win); j++) m = Math.max(m, Math.abs(chs[c][j]));
          if (m < th) { if (runStart < 0) runStart = i; } else if (runStart >= 0) { if (i - runStart >= minS) segs.push([runStart, i]); runStart = -1; }
        }
        if (runStart >= 0 && n - runStart >= minS) segs.push([runStart, n]);
        void keepMask;
        if (!segs.length) return chs;
        return chs.map((d) => {
          const parts = []; let p0 = 0;
          segs.forEach(([a, b]) => { const half = Math.floor(keep / 2); parts.push(d.subarray(p0, a + half)); p0 = Math.max(a + half, b - (keep - half)); });
          parts.push(d.subarray(p0));
          const o = new Float32Array(parts.reduce((k, x) => k + x.length, 0)); let q = 0; parts.forEach((x) => { o.set(x, q); q += x.length; });
          return o;
        });
      } },
    voice: { run: async (chs, p, sr) => {
      let r = await FX.highpass.run(chs, { cutoff: 80 }, sr);
      r = await offline(r, sr, (oc, s) => { const pe = oc.createBiquadFilter(); pe.type = 'peaking'; pe.frequency.value = 3000; pe.Q.value = 1; pe.gain.value = 3; const lo = oc.createBiquadFilter(); lo.type = 'lowshelf'; lo.frequency.value = 180; lo.gain.value = 1.5; s.connect(lo); lo.connect(pe); return pe; });
      return FX.compressor.run(r, { threshold: -22, ratio: 3.5 }, sr);
    } }
  };
  async function runFx(id, params) {
    const fx = FX[id];
    const [s, e] = range();
    if (e <= s) return;
    const seg = segment(s, e);
    const out = await fx.run(seg, params || {}, A.sr);
    if (id === 'mono') return;
    const n = replaceRange(s, e, out, id);
    if (hasSel()) sel = { a: s, b: s + n };
    afterEdit();
  }
  async function previewFx(id, params) {
    const [s, e0] = range();
    const e = Math.min(e0, s + A.sr * 8);
    const out = await FX[id].run(segment(s, e), params, A.sr);
    stopPlay(); stopPreview();
    const ctx = ac();
    const b = ctx.createBuffer(out.length, out[0].length, A.sr);
    out.forEach((d, c) => b.copyToChannel(d, c));
    previewSrc = ctx.createBufferSource(); previewSrc.buffer = b; previewSrc.connect(ctx.destination); previewSrc.start();
  }
  let previewSrc = null;
  function stopPreview() { if (previewSrc) { try { previewSrc.stop(); } catch (e) { /* تجاهل */ } previewSrc = null; } }
  async function fxFlow(id) {
    if (!A) return;
    stopPlay();
    if (id === 'mono') { if (nch() > 1) { replaceAll({ sr: A.sr, ch: conform(A.ch, 1) }, 'mono'); afterEdit(); } return; }
    const fx = FX[id];
    if (!fx.fields) { await W.busy('s.processing', () => runFx(id)); return; }
    const vals = {};
    const body = W.h('div', { class: 'col', style: { minWidth: '360px' } });
    fx.fields.forEach((f) => { vals[f.key] = f.value; body.append(W.slider({ i18n: f.i18n, min: f.min, max: f.max, step: f.step, value: f.value, onInput: (v) => { vals[f.key] = v; } })); });
    const ok = await W.dialog({ title: W.t('s.fx.' + id), body, buttons: [
      { i18n: 's.preview', keepOpen: true, onClick: () => previewFx(id, Object.assign({}, vals)) },
      { i18n: 'ui.cancel', value: false }, { i18n: 's.apply', value: true, primary: true }] });
    stopPreview();
    if (!ok) return;
    await W.busy('s.processing', () => runFx(id, Object.assign({}, vals)));
  }
  /* التوليد */
  async function generate(kind) {
    const fields = kind === 'tone' ? [
      { key: 'wave', i18n: 's.wave', type: 'select', value: 'sine', options: [{ value: 'sine', label: W.t('s.sine') }, { value: 'square', label: W.t('s.square') }, { value: 'saw', label: W.t('s.saw') }] },
      { key: 'freq', i18n: 's.freq', type: 'number', value: 440, min: 20, max: 20000, row: 'a' }, { key: 'amp', i18n: 's.amp', type: 'number', value: 50, min: 1, max: 100, row: 'a' },
      { key: 'dur', i18n: 's.duration', type: 'number', value: 2, min: 0.05, max: 600 }]
      : kind === 'noise' ? [
        { key: 'color', i18n: 's.color', type: 'select', value: 'white', options: ['white', 'pink', 'brown'].map((c) => ({ value: c, label: W.t('s.' + c) })) },
        { key: 'amp', i18n: 's.amp', type: 'number', value: 30, min: 1, max: 100, row: 'a' }, { key: 'dur', i18n: 's.duration', type: 'number', value: 2, min: 0.05, max: 600, row: 'a' }]
        : [{ key: 'dur', i18n: 's.duration', type: 'number', value: 1, min: 0.01, max: 3600 }];
    const v = await W.form(W.t('s.gen.' + kind), fields);
    if (!v) return;
    const sr = A ? A.sr : 48000, nc = A ? nch() : 1;
    const n = Math.round(W.clamp(parseFloat(v.dur) || 1, 0.01, 3600) * sr);
    const amp = W.clamp(parseFloat(v.amp) || 50, 0, 100) / 100;
    const d = new Float32Array(n);
    if (kind === 'tone') {
      const f = W.clamp(parseFloat(v.freq) || 440, 1, sr / 2);
      for (let i = 0; i < n; i++) { const ph = (i * f / sr) % 1; d[i] = amp * (v.wave === 'square' ? (ph < 0.5 ? 1 : -1) : v.wave === 'saw' ? 2 * ph - 1 : Math.sin(2 * Math.PI * ph)); }
      const ramp = Math.min(n / 2, Math.round(0.005 * sr));
      for (let i = 0; i < ramp; i++) { d[i] *= i / ramp; d[n - 1 - i] *= i / ramp; }
    } else if (kind === 'noise') {
      let b0 = 0, b1 = 0, b2 = 0, last = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        if (v.color === 'pink') { b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2 * amp; }
        else if (v.color === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5 * amp; }
        else d[i] = w * amp;
      }
    }
    const chs = Array.from({ length: nc }, () => d.slice());
    if (!A) { startDoc({ sr, ch: chs }, { dirty: true }); sel = { a: 0, b: n }; return; }
    const m = replaceRange(sel.a, sel.b, chs, 'generate');
    sel = { a: sel.a, b: sel.a + m };
    afterEdit();
  }

  /* ═══════════ الواجهة ═══════════ */
  const timeEl = $('#time'), recTime = $('#rectime');
  function updateTimes() {
    if (!A) { timeEl.textContent = '00:00.000'; return; }
    timeEl.textContent = fmtTime(playPos >= 0 ? playPos : sel.a);
    status.item('sel').textContent = hasSel() ? W.t('s.selection') + ': ' + fmtTime(sel.a) + ' → ' + fmtTime(sel.b) + ' (' + fmtTime(sel.b - sel.a) + ')' : '';
    status.item('len').textContent = fmtTime(len()) + ' • ' + (A.sr / 1000) + ' kHz • ' + (nch() > 1 ? W.t('s.stereo') : W.t('s.mono'));
  }
  const infoEl = $('#info');
  function updateInfo() {
    infoEl.innerHTML = '';
    if (!A) return;
    const [s, e] = range();
    let pk = 0, sum = 0, n = 0;
    const step = Math.max(1, Math.floor((e - s) / 2e6));
    A.ch.forEach((d) => { for (let i = s; i < e; i += step) { const v = d[i]; pk = Math.max(pk, Math.abs(v)); sum += v * v; n++; } });
    const rows = [['s.sampleRate', A.sr + ' Hz'], ['s.channels', nch() > 1 ? W.t('s.stereo') : W.t('s.mono')], ['s.length', fmtTime(len())]]
      .concat(hasSel() ? [['s.selection', fmtTime(e - s)]] : []).concat([['s.peakLevel', (pk ? linToDb(pk).toFixed(1) : '-∞') + ' dB'], ['s.rms', (n && sum ? linToDb(Math.sqrt(sum / n)).toFixed(1) : '-∞') + ' dB']]);
    rows.forEach(([k, v]) => infoEl.append(W.h('div', { class: 's-row' }, W.h('span', { class: 'muted', text: W.t(k) }), W.h('span', { class: 's-val', text: v }))));
    updateTimes();
  }
  const sideFx = $('#fx'), sideGen = $('#gen');
  const FX_LIST = [['gain', 'volume'], ['normalize', 'sliders'], ['fadeIn', 'fade-in'], ['fadeOut', 'fade-out'], ['voice', 'mic'], ['eq', 'sliders'], ['highpass', 'filter'], ['compressor', 'contrast'], ['gate', 'volume-x'],
    ['echo', 'repeat'], ['reverb', 'waveform'], ['speed', 'clock'], ['truncate', 'scissors'], ['reverse', 'refresh'], ['invert', 'flip-v'], ['mono', 'music']];
  function renderSide() {
    sideFx.innerHTML = ''; sideGen.innerHTML = '';
    FX_LIST.forEach(([id, icon]) => { const b = W.h('button', { class: 's-fx', type: 'button' }, W.iconEl(icon), W.h('span', { text: W.t('s.fx.' + id) })); b.addEventListener('click', () => fxFlow(id)); sideFx.append(b); });
    [['tone', 'waveform'], ['noise', 'sparkles'], ['silence', 'volume-x']].forEach(([id, icon]) => { const b = W.h('button', { class: 's-fx', type: 'button' }, W.iconEl(icon), W.h('span', { text: W.t('s.gen.' + id) })); b.addEventListener('click', () => generate(id)); sideGen.append(b); });
  }
  const devSel = $('#device');
  async function listDevices() {
    try {
      const devs = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'audioinput');
      devSel.innerHTML = '';
      devSel.append(W.h('option', { value: '', text: W.t('s.default') }));
      devs.forEach((d, i) => { if (d.deviceId && d.deviceId !== 'default') devSel.append(W.h('option', { value: d.deviceId, text: d.label || ('Mic ' + (i + 1)) })); });
      devSel.value = inputDevice;
    } catch (e) { /* تجاهل */ }
  }
  devSel.addEventListener('change', () => { inputDevice = devSel.value; });
  if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', listDevices);

  const needA = () => !A;
  const menus = [
    { i18n: 'menu.file', items: [
      { i18n: 's.newRecording', icon: 'mic', shortcut: 'Mod+N', action: async () => { if (await W.confirmDiscard()) { A = null; document.body.classList.remove('has-doc'); startRecording(); } } },
      { i18n: 's.openAudio', icon: 'folder', shortcut: 'Mod+O', action: open },
      { i18n: 'cmd.recent', submenu: W.recent.menu(openPath), hidden: () => !W.isElectron },
      { i18n: 's.importInsert', icon: 'plus', shortcut: 'Mod+I', action: () => importAudio(false), disabled: needA },
      { i18n: 's.importMix', icon: 'layers', action: () => importAudio(true), disabled: needA },
      '-',
      { i18n: 'cmd.save', icon: 'save', shortcut: 'Mod+S', action: save, disabled: needA, global: true },
      { i18n: 'cmd.export', icon: 'export', shortcut: 'Mod+E', action: () => exportFlow(), disabled: needA, global: true },
      '-',
      { i18n: 'cmd.close', shortcut: 'Mod+W', action: () => window.close(), hidden: () => !W.isElectron }
    ] },
    { i18n: 'menu.edit', items: [
      { i18n: 'cmd.undo', icon: 'undo', shortcut: 'Mod+Z', action: undo, disabled: () => hist.index < 0 },
      { i18n: 'cmd.redo', icon: 'redo', shortcut: ['Mod+Y', 'Mod+Shift+Z'], action: redo, disabled: () => hist.index >= hist.stack.length - 1 },
      '-',
      { i18n: 'cmd.cut', icon: 'cut', shortcut: 'Mod+X', action: cut, disabled: () => !hasSel() },
      { i18n: 'cmd.copy', icon: 'copy', shortcut: 'Mod+C', action: copy, disabled: () => !hasSel() },
      { i18n: 'cmd.paste', icon: 'paste', shortcut: 'Mod+V', action: paste, disabled: () => !clip },
      { i18n: 'cmd.delete', icon: 'trash', shortcut: 'Delete', action: del, disabled: () => !hasSel() },
      '-',
      { i18n: 's.trim', icon: 'crop', shortcut: 'Mod+T', action: trim, disabled: () => !hasSel() },
      { i18n: 's.silence', icon: 'volume-x', shortcut: 'Mod+L', action: silence, disabled: () => !hasSel() },
      { i18n: 'cmd.selectAll', shortcut: 'Mod+A', action: selectAll }
    ] },
    { i18n: 's.effects', items: FX_LIST.map(([id, icon]) => ({ i18n: 's.fx.' + id, icon, action: () => fxFlow(id), disabled: needA })).concat(['-'], ['tone', 'noise', 'silence'].map((k) => ({ i18n: 's.gen.' + k, action: () => generate(k) }))) },
    { i18n: 'menu.view', items: [
      { i18n: 'cmd.zoomIn', icon: 'zoom-in', shortcut: 'Mod+=', action: () => zoomAt(2) },
      { i18n: 'cmd.zoomOut', icon: 'zoom-out', shortcut: 'Mod+-', action: () => zoomAt(0.5) },
      { i18n: 's.zoomSel', shortcut: 'Mod+Shift+E', action: zoomSel },
      { i18n: 'cmd.fit', icon: 'fit', shortcut: 'Mod+0', action: fitAll },
      '-',
      ...W.stdViewItems()
    ] },
    W.stdHelpMenu()
  ];
  const chrome = W.mountChrome({ menus, shortcuts: [['s.play', 'Space'], ['s.record', 'R'], ['s.toStart', 'Home'], ['s.toEnd', 'End']] });
  const status = chrome.status;
  W.keys.bind('Space', togglePlay);
  W.keys.bind('r', toggleRecord);
  W.keys.bind('l', () => { loop = !loop; updateTransport(); });
  W.keys.bind('Home', () => { if (A) { sel = { a: 0, b: 0 }; view.start = 0; draw(); } });
  W.keys.bind('End', () => { if (A) { sel = { a: len(), b: len() }; ensureVisible(len()); draw(); } });
  W.keys.bind('Backspace', del);
  W.keys.bind('Escape', () => { if (recorder) stopRecording(); else if (playing()) stopPlay(); else if (A) { sel = { a: sel.a, b: sel.a }; draw(); updateInfo(); } });
  ['ArrowLeft', 'ArrowRight'].forEach((k) => {
    const dir = k === 'ArrowRight' ? 1 : -1;
    W.keys.bind(k, () => { if (!A) return; const p = W.clamp(sel.a + dir * A.sr, 0, len()); sel = { a: p, b: p }; ensureVisible(p); draw(); });
    W.keys.bind('Shift+' + k, () => { if (!A) return; const st = Math.round(A.sr / 10); if (dir > 0) sel.b = Math.min(len(), sel.b + st); else sel.a = Math.max(0, sel.a - st); draw(); updateInfo(); });
  });

  // شريط النقل
  const tb = $('#toolbar');
  const recBtn = W.h('button', { class: 's-rec', type: 'button', 'data-tip': 's.record', 'data-shortcut': 'R', html: '<span></span>' });
  recBtn.addEventListener('click', toggleRecord);
  const playBtn = W.iconButton('play', 's.play', togglePlay, { shortcut: 'Space', cls: 's-play' });
  const loopBtn = W.iconButton('repeat', 's.loop', () => { loop = !loop; updateTransport(); }, { shortcut: 'L' });
  function updateTransport() {
    playBtn.innerHTML = W.icon(playing() ? 'pause' : 'play');
    playBtn.dataset.tip = playing() ? 's.pause' : 's.play';
    recBtn.classList.toggle('on', !!recorder);
    recBtn.dataset.tip = recorder ? 's.stopRec' : 's.record';
    loopBtn.classList.toggle('active', loop);
    recTime.textContent = recorder ? recTime.textContent : '';
  }
  const transport = W.h('div', { class: 's-transport', dir: 'ltr' });
  tb.prepend(transport);
  transport.append(
    W.iconButton('skip-back', 's.toStart', () => { if (A) { stopPlay(); sel = { a: 0, b: 0 }; view.start = 0; draw(); } }, { shortcut: 'Home' }),
    playBtn,
    W.iconButton('stop', 's.stop', () => { stopPlay(); if (recorder) stopRecording(); }),
    W.iconButton('skip-forward', 's.toEnd', () => { if (A) { stopPlay(); sel = { a: len(), b: len() }; ensureVisible(len()); draw(); } }, { shortcut: 'End' }),
    recBtn, loopBtn);
  transport.after(W.h('div', { class: 'w-sep' }),
    W.iconButton('cut', 'cmd.cut', cut), W.iconButton('copy', 'cmd.copy', copy), W.iconButton('paste', 'cmd.paste', paste), W.iconButton('trash', 'cmd.delete', del),
    W.iconButton('crop', 's.trim', trim), W.iconButton('volume-x', 's.silence', silence), W.h('div', { class: 'w-sep' }),
    W.iconButton('undo', 'cmd.undo', undo), W.iconButton('redo', 'cmd.redo', redo), W.h('div', { class: 'w-sep' }),
    W.iconButton('zoom-out', 'cmd.zoomOut', () => zoomAt(0.5)), W.iconButton('fit', 'cmd.fit', fitAll), W.iconButton('zoom-in', 'cmd.zoomIn', () => zoomAt(2)), W.h('div', { class: 'w-spacer' }));

  const welcome = W.welcome(stage, {
    text: 's.welcomeText',
    actions: [{ i18n: 's.newRecording', icon: 'mic', primary: true, action: startRecording }, { i18n: 's.openAudio', icon: 'folder', action: open }],
    openRecent: openPath
  });
  W.dropZone(stage, async (files) => {
    const f = files.find((x) => AUDIO_EXT.includes(x.ext));
    if (!f) return;
    if (A) { const bytes = new Uint8Array(f.data); const a = await decodeBytes(bytes, f.ext); const data = conform(a.sr === A.sr ? a.ch : await resample(a.ch, a.sr, A.sr), nch()); const n = replaceRange(sel.a, sel.a, data, 'insert'); sel = { a: sel.a, b: sel.a + n }; afterEdit(); }
    else if (await W.confirmDiscard()) loadFile({ name: f.name, path: f.path, ext: f.ext, data: new Uint8Array(f.data) });
  });
  W.onExternalFile((f) => loadFile(f), 'bytes');
  W.on('langchange', () => { renderSide(); listDevices(); updateInfo(); updateTransport(); });
  W.on('themechange', draw);
  new ResizeObserver(() => { clampView(); draw(); }).observe(stage);
  renderSide(); listDevices(); updateTransport(); draw();

  window.__sada = {
    get A() { return A; }, get sel() { return sel; }, set sel(v) { sel = v; draw(); updateInfo(); }, get hist() { return hist; },
    startDoc, encodeWav, parseWav, runFx, generate, exportFlow, encodeMp3: (c, s, k) => encodeMp3(c, s, k), encodeOpus, hasMp3, hasOpus, undo, redo, cut, paste, trim, togglePlay, get playing() { return playing(); }
  };
  window.__warshaSelfTest = async function () {
    const errors = [];
    try {
      const ch = [new Float32Array([0, 0.5, -0.5, 1, -1]), new Float32Array([0.25, -0.25, 0, 0.75, -0.75])];
      const back = parseWav(encodeWav(ch, 44100, 16));
      if (!back || back.sr !== 44100 || back.ch.length !== 2 || Math.abs(back.ch[0][1] - 0.5) > 0.001 || Math.abs(back.ch[1][3] - 0.75) > 0.001) errors.push('wav16 roundtrip');
      const b24 = parseWav(encodeWav(ch, 48000, 24));
      if (!b24 || Math.abs(b24.ch[0][2] + 0.5) > 0.0001) errors.push('wav24 roundtrip');
      const b32 = parseWav(encodeWav(ch, 48000, 32));
      if (!b32 || b32.ch[1][4] !== -0.75) errors.push('wav32 roundtrip');
    } catch (e) { errors.push(String(e.stack || e)); }
    return { errors };
  };
})();
