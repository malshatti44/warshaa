/* سمات وتخطيطات منبر */
(function () {
  'use strict';
  const THEMES = {
    hadith: { name: { ar: 'حديث', en: 'Modern' }, bg: '#ffffff', title: '#111827', body: '#374151', accent: '#fd9801', accent2: '#4f46e5', titleFont: 'Cairo', bodyFont: 'IBM Plex Sans Arabic', deco: 'bar' },
    layl: { name: { ar: 'ليل', en: 'Night' }, bg: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)', title: '#ffffff', body: '#cbd5e1', accent: '#f59e0b', accent2: '#818cf8', titleFont: 'Cairo', bodyFont: 'Tajawal', deco: 'glow' },
    sahra: { name: { ar: 'صحراء', en: 'Desert' }, bg: 'linear-gradient(160deg,#fdf6ec 0%,#f3e3c7 100%)', title: '#7c2d12', body: '#5b3a1a', accent: '#c2410c', accent2: '#a16207', titleFont: 'El Messiri', bodyFont: 'Amiri', deco: 'dune' },
    nakheel: { name: { ar: 'نخيل', en: 'Palm' }, bg: 'linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%)', title: '#ecfdf5', body: '#d1fae5', accent: '#fbbf24', accent2: '#34d399', titleFont: 'Reem Kufi', bodyFont: 'Tajawal', deco: 'circle' },
    bahr: { name: { ar: 'بحر', en: 'Sea' }, bg: 'linear-gradient(180deg,#e0f2fe 0%,#bae6fd 100%)', title: '#0c4a6e', body: '#075985', accent: '#0284c7', accent2: '#0ea5e9', titleFont: 'Almarai', bodyFont: 'Almarai', deco: 'wave' },
    zaafaran: { name: { ar: 'زعفران', en: 'Saffron' }, bg: '#fff7ed', title: '#9a3412', body: '#431407', accent: '#ea580c', accent2: '#facc15', titleFont: 'Lalezar', bodyFont: 'Tajawal', deco: 'corner' },
    malaki: { name: { ar: 'ملكي', en: 'Royal' }, bg: 'linear-gradient(135deg,#2e1065 0%,#4c1d95 100%)', title: '#fde68a', body: '#ede9fe', accent: '#fbbf24', accent2: '#c4b5fd', titleFont: 'Aref Ruqaa', bodyFont: 'Noto Naskh Arabic', deco: 'frame' },
    ramadi: { name: { ar: 'رمادي', en: 'Slate' }, bg: '#f1f5f9', title: '#0f172a', body: '#334155', accent: '#0f766e', accent2: '#64748b', titleFont: 'Noto Kufi Arabic', bodyFont: 'IBM Plex Sans Arabic', deco: 'line' }
  };

  /** زخرفة الخلفية حسب السمة (SVG داخل الشريحة) */
  function decoration(theme, w, h) {
    const t = THEMES[theme] || THEMES.hadith;
    const a = t.accent, b = t.accent2;
    switch (t.deco) {
      case 'bar': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><rect x="0" y="' + (h - 14) + '" width="' + w + '" height="14" fill="' + a + '"/><rect x="0" y="' + (h - 14) + '" width="' + (w * 0.3) + '" height="14" fill="' + b + '"/></svg>';
      case 'glow': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '"><defs><radialGradient id="g1"><stop offset="0" stop-color="' + b + '" stop-opacity=".45"/><stop offset="1" stop-color="' + b + '" stop-opacity="0"/></radialGradient></defs><circle cx="' + (w * 0.88) + '" cy="' + (h * 0.12) + '" r="' + (h * 0.55) + '" fill="url(#g1)"/><circle cx="' + (w * 0.05) + '" cy="' + (h * 0.95) + '" r="' + (h * 0.35) + '" fill="url(#g1)"/></svg>';
      case 'dune': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><path d="M0 ' + (h * 0.82) + ' Q ' + (w * 0.25) + ' ' + (h * 0.7) + ' ' + (w * 0.5) + ' ' + (h * 0.84) + ' T ' + w + ' ' + (h * 0.8) + ' V ' + h + ' H 0 Z" fill="' + a + '" opacity=".18"/><path d="M0 ' + (h * 0.9) + ' Q ' + (w * 0.3) + ' ' + (h * 0.82) + ' ' + (w * 0.6) + ' ' + (h * 0.92) + ' T ' + w + ' ' + (h * 0.88) + ' V ' + h + ' H 0 Z" fill="' + b + '" opacity=".22"/></svg>';
      case 'circle': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '"><circle cx="' + (w * 0.92) + '" cy="' + (h * 0.15) + '" r="150" fill="none" stroke="' + a + '" stroke-width="3" opacity=".5"/><circle cx="' + (w * 0.92) + '" cy="' + (h * 0.15) + '" r="105" fill="' + b + '" opacity=".15"/></svg>';
      case 'wave': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><path d="M0 ' + (h * 0.88) + ' C ' + (w * 0.25) + ' ' + (h * 0.8) + ' ' + (w * 0.5) + ' ' + (h * 0.96) + ' ' + w + ' ' + (h * 0.86) + ' V ' + h + ' H 0 Z" fill="' + a + '" opacity=".3"/><path d="M0 ' + (h * 0.93) + ' C ' + (w * 0.3) + ' ' + (h * 0.88) + ' ' + (w * 0.6) + ' ' + h + ' ' + w + ' ' + (h * 0.92) + ' V ' + h + ' H 0 Z" fill="' + b + '" opacity=".35"/></svg>';
      case 'corner': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '"><path d="M' + w + ' 0 L' + (w - 260) + ' 0 L' + w + ' 260 Z" fill="' + a + '"/><path d="M0 ' + h + ' L180 ' + h + ' L0 ' + (h - 180) + ' Z" fill="' + b + '"/></svg>';
      case 'frame': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '"><rect x="24" y="24" width="' + (w - 48) + '" height="' + (h - 48) + '" fill="none" stroke="' + a + '" stroke-width="2" opacity=".7"/><rect x="34" y="34" width="' + (w - 68) + '" height="' + (h - 68) + '" fill="none" stroke="' + a + '" stroke-width="1" opacity=".4"/></svg>';
      case 'line': return '<svg class="deco" viewBox="0 0 ' + w + ' ' + h + '"><rect x="' + (w - 90) + '" y="70" width="8" height="90" fill="' + a + '"/></svg>';
    }
    return '';
  }

  /** تخطيطات الشرائح: ت\u064Fرجع كائنات أولية (role: title/body) */
  const LAYOUTS = {
    title: { name: { ar: 'شريحة عنوان', en: 'Title slide' } },
    content: { name: { ar: 'عنوان ومحتوى', en: 'Title & content' } },
    two: { name: { ar: 'عمودان', en: 'Two columns' } },
    section: { name: { ar: 'عنوان قسم', en: 'Section header' } },
    image: { name: { ar: 'صورة ونص', en: 'Image & text' } },
    quote: { name: { ar: 'اقتباس', en: 'Quote' } },
    titleOnly: { name: { ar: 'عنوان فقط', en: 'Title only' } },
    blank: { name: { ar: 'فارغة', en: 'Blank' } }
  };
  function layoutObjects(layout, rtl, uid) {
    const W2 = 1280, H = 720;
    const L = (ar, en) => (rtl ? ar : en);
    const t = (o) => Object.assign({ id: uid(), type: 'text', rot: 0, opacity: 1, style: {} }, o);
    const p = (s, cls) => '<div' + (cls ? ' class="' + cls + '"' : '') + '>' + s + '</div>';
    switch (layout) {
      case 'title': return [
        t({ role: 'title', x: 100, y: 230, w: W2 - 200, h: 150, html: p(L('عنوان العرض التقديمي', 'Presentation title')), style: { size: 64, align: 'center', valign: 'middle', bold: true } }),
        t({ role: 'subtitle', x: 160, y: 390, w: W2 - 320, h: 80, html: p(L('العنوان الفرعي أو اسم المقد\u0651م', 'Subtitle or presenter name')), style: { size: 28, align: 'center', valign: 'top' } })
      ];
      case 'content': return [
        t({ role: 'title', x: 80, y: 50, w: W2 - 160, h: 100, html: p(L('عنوان الشريحة', 'Slide title')), style: { size: 44, bold: true, valign: 'middle' } }),
        t({ role: 'body', x: 80, y: 170, w: W2 - 160, h: 470, html: p(L('النقطة الأولى', 'First point'), 'bullet') + p(L('النقطة الثانية', 'Second point'), 'bullet') + p(L('النقطة الثالثة', 'Third point'), 'bullet'), style: { size: 30 } })
      ];
      case 'two': return [
        t({ role: 'title', x: 80, y: 50, w: W2 - 160, h: 100, html: p(L('مقارنة', 'Comparison')), style: { size: 44, bold: true, valign: 'middle' } }),
        t({ role: 'body', x: rtl ? 660 : 80, y: 170, w: 540, h: 470, html: p(L('العمود الأول', 'First column'), 'bullet') + p(L('نقطة', 'Point'), 'bullet'), style: { size: 28 } }),
        t({ role: 'body', x: rtl ? 80 : 660, y: 170, w: 540, h: 470, html: p(L('العمود الثاني', 'Second column'), 'bullet') + p(L('نقطة', 'Point'), 'bullet'), style: { size: 28 } })
      ];
      case 'section': return [
        t({ role: 'title', x: 100, y: 260, w: W2 - 200, h: 130, html: p(L('عنوان القسم', 'Section title')), style: { size: 60, bold: true, valign: 'middle' } }),
        t({ role: 'subtitle', x: 100, y: 390, w: W2 - 200, h: 70, html: p(L('وصف مختصر للقسم', 'Short section description')), style: { size: 26 } })
      ];
      case 'image': return [
        t({ role: 'title', x: rtl ? 680 : 80, y: 80, w: 520, h: 110, html: p(L('عنوان', 'Title')), style: { size: 44, bold: true, valign: 'middle' } }),
        t({ role: 'body', x: rtl ? 680 : 80, y: 210, w: 520, h: 420, html: p(L('اكتب وصف\u064Bا هنا', 'Write a description here')), style: { size: 26 } }),
        { id: uid(), type: 'placeholder', x: rtl ? 80 : 680, y: 80, w: 520, h: 560, rot: 0, opacity: 1 }
      ];
      case 'quote': return [
        t({ role: 'title', x: 140, y: 200, w: W2 - 280, h: 250, html: p(L('«الكلمة الطيبة صدقة»', '“A kind word is charity”')), style: { size: 52, align: 'center', valign: 'middle', italic: false } }),
        t({ role: 'subtitle', x: 140, y: 470, w: W2 - 280, h: 60, html: p(L('— المصدر', '— Source')), style: { size: 24, align: 'center' } })
      ];
      case 'titleOnly': return [
        t({ role: 'title', x: 80, y: 50, w: W2 - 160, h: 100, html: p(L('عنوان الشريحة', 'Slide title')), style: { size: 44, bold: true, valign: 'middle' } })
      ];
      default: return [];
    }
  }
  globalThis.MinbarThemes = { THEMES, LAYOUTS, decoration, layoutObjects };
})();
