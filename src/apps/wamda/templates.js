/* ومضة — مكتبة القوالب الجاهزة (النصوص بالعربية والإنجليزية) */
(function () {
  'use strict';
  const T = (text, x, y, w, size, o) => Object.assign({ type: 'text', text, x, y, w, size, font: 'Cairo', weight: 400, color: '#ffffff', align: 'center', lh: 1.3 }, o || {});
  const S = (kind, x, y, w, h, fill, o) => Object.assign({ type: 'shape', kind, x, y, w, h, fill }, o || {});
  const I = (name, x, y, size, color, o) => Object.assign({ type: 'icon', name, x, y, w: size, h: size, color }, o || {});
  const grad = (c1, c2, angle) => ({ type: 'linear', c1, c2, angle: angle == null ? 135 : angle });

  const SIZES = [
    { id: 'post', w: 1080, h: 1080, name: { ar: 'منشور مربع', en: 'Square post' }, cat: 'social' },
    { id: 'portrait', w: 1080, h: 1350, name: { ar: 'منشور عمودي', en: 'Portrait post' }, cat: 'social' },
    { id: 'story', w: 1080, h: 1920, name: { ar: 'قصة / ريلز', en: 'Story / Reel' }, cat: 'social' },
    { id: 'youtube', w: 1280, h: 720, name: { ar: 'صورة مصغرة يوتيوب', en: 'YouTube thumbnail' }, cat: 'video' },
    { id: 'x', w: 1600, h: 900, name: { ar: 'منشور X', en: 'X post' }, cat: 'social' },
    { id: 'fbcover', w: 1640, h: 624, name: { ar: 'غلاف فيسبوك', en: 'Facebook cover' }, cat: 'social' },
    { id: 'linkedin', w: 1200, h: 627, name: { ar: 'منشور لينكدإن', en: 'LinkedIn post' }, cat: 'social' },
    { id: 'poster', w: 1240, h: 1754, name: { ar: 'ملصق A4', en: 'A4 poster' }, cat: 'print' },
    { id: 'invite', w: 1500, h: 2100, name: { ar: 'بطاقة دعوة', en: 'Invitation' }, cat: 'print' },
    { id: 'card', w: 1050, h: 600, name: { ar: 'بطاقة عمل', en: 'Business card' }, cat: 'print' }
  ];

  const TEMPLATES = [
    {
      id: 'sale', size: 'post', name: { ar: 'عرض خاص', en: 'Special offer' },
      bg: { type: 'gradient', c1: '#ff3d77', c2: '#ff9a3d', angle: 135 },
      els: [
        S('circle', -160, -160, 520, 520, '#ffffff', { opacity: 0.12 }),
        S('circle', 760, 760, 480, 480, '#ffffff', { opacity: 0.12 }),
        T({ ar: 'عرض خاص', en: 'SPECIAL OFFER' }, 90, 150, 900, 84, { weight: 700 }),
        T({ ar: 'خصم 50%', en: '50% OFF' }, 40, 270, 1000, 230, { font: 'Lalezar', lh: 1.1, shadow: { color: 'rgba(0,0,0,0.25)', x: 0, y: 12, blur: 30 } }),
        T({ ar: 'على جميع المنتجات', en: 'on all products' }, 90, 590, 900, 60, { font: 'Tajawal', weight: 700 }),
        S('rect', 340, 760, 400, 120, '#ffffff', { radius: 60 }),
        T({ ar: 'تسو\u0651ق الآن', en: 'Shop now' }, 340, 782, 400, 54, { weight: 700, color: '#ff3d77' })
      ]
    },
    {
      id: 'ramadan', size: 'post', name: { ar: 'رمضان كريم', en: 'Ramadan Kareem' },
      bg: { type: 'gradient', c1: '#0b1a3a', c2: '#1e3a8a', angle: 180 },
      els: [
        I('moon', 400, 110, 280, '#fbbf24'),
        I('star', 170, 190, 70, '#fde68a'), I('star', 850, 150, 50, '#fde68a'), I('sparkles', 810, 400, 80, '#fde68a'),
        T({ ar: 'رمضان كريم', en: 'Ramadan Kareem' }, 40, 430, 1000, 150, { font: 'Aref Ruqaa', weight: 700, color: '#fbbf24' }),
        T({ ar: 'كل عام وأنتم بخير', en: 'Wishing you a blessed month' }, 90, 690, 900, 56, { font: 'El Messiri', color: '#e0e7ff' }),
        S('rect', 390, 820, 300, 6, '#fbbf24', { radius: 3 }),
        T({ ar: '١٤٤٨ هـ', en: '1448 AH' }, 290, 860, 500, 44, { font: 'Tajawal', color: '#c7d2fe' })
      ]
    },
    {
      id: 'eid', size: 'story', name: { ar: 'عيد مبارك', en: 'Eid Mubarak' },
      bg: { type: 'gradient', c1: '#4c1d95', c2: '#db2777', angle: 160 },
      els: [
        S('circle', -200, 1400, 700, 700, '#ffffff', { opacity: 0.1 }),
        S('circle', 700, -150, 600, 600, '#ffffff', { opacity: 0.1 }),
        I('sparkles', 390, 400, 300, '#fde68a'),
        T({ ar: 'عيد مبارك', en: 'Eid Mubarak' }, 40, 760, 1000, 190, { font: 'Aref Ruqaa', weight: 700 }),
        T({ ar: 'تقب\u0651ل الله منا ومنكم صالح الأعمال', en: 'May Allah accept our good deeds' }, 90, 1050, 900, 64, { font: 'Amiri', color: '#fde68a', lh: 1.6 }),
        S('rect', 240, 1500, 600, 130, '#ffffff', { radius: 65, opacity: 0.18 }),
        T({ ar: 'من عائلتنا إليكم', en: 'From our family' }, 240, 1530, 600, 52, { weight: 700 })
      ]
    },
    {
      id: 'quote', size: 'post', name: { ar: 'اقتباس', en: 'Quote' },
      bg: { type: 'color', color: '#f5efe6' },
      els: [
        T('«', 760, 20, 240, 320, { font: 'Amiri', color: '#d6a77a', align: 'center', lh: 1 }),
        T({ ar: 'العلم يرفع بيت\u064Bا لا عماد له\nوالجهل يهدم بيت العز والشرف', en: 'Knowledge raises a house without pillars,\nignorance tears down the house of glory.' }, 90, 330, 900, 70, { font: 'Amiri', weight: 700, color: '#3b2f2f', lh: 1.7 }),
        S('rect', 440, 700, 200, 6, '#d6a77a', { radius: 3 }),
        T({ ar: '— أمير الشعراء أحمد شوقي', en: '— Ahmed Shawqi' }, 140, 740, 800, 44, { font: 'Tajawal', color: '#7c6a5a' })
      ]
    },
    {
      id: 'hiring', size: 'post', name: { ar: 'نحن نوظ\u0651ف', en: "We're hiring" },
      bg: { type: 'color', color: '#ffffff' },
      els: [
        S('rect', 0, 0, 1080, 330, grad('#0062ee', '#3b82f6', 135)),
        T({ ar: 'نحن نوظ\u0651ف!', en: "We're hiring!" }, 40, 85, 1000, 120, { font: 'Lalezar' }),
        T({ ar: 'مصمم جرافيك', en: 'Graphic Designer' }, 40, 390, 1000, 90, { weight: 700, color: '#0f172a' }),
        T({ ar: '• خبرة سنتين على الأقل\n• إتقان أدوات التصميم\n• حس إبداعي وروح الفريق', en: '• 2+ years of experience\n• Mastery of design tools\n• Creativity and team spirit' }, 170, 550, 740, 48, { font: 'Tajawal', color: '#334155', align: 'start', lh: 1.7 }),
        S('rect', 240, 880, 600, 110, '#0062ee', { radius: 55 }),
        T({ ar: 'أرسل سيرتك الذاتية الآن', en: 'Send your CV today' }, 240, 903, 600, 46, { weight: 700 })
      ]
    },
    {
      id: 'workshop', size: 'x', name: { ar: 'ورشة عمل', en: 'Workshop' },
      bg: { type: 'gradient', c1: '#0f172a', c2: '#1e293b', angle: 135 },
      els: [
        S('rect', 1576, 0, 24, 900, '#22d3ee'),
        S('circle', -150, 430, 640, 640, grad('#22d3ee', '#6366f1', 135), { opacity: 0.35 }),
        I('palette', 120, 520, 230, '#ffffff', { opacity: 0.9 }),
        T({ ar: 'ورشة عمل', en: 'WORKSHOP' }, 560, 110, 940, 60, { weight: 700, color: '#22d3ee', align: 'start' }),
        T({ ar: 'أساسيات التصميم\nالجرافيكي', en: 'Graphic Design\nFundamentals' }, 460, 200, 1040, 124, { font: 'Lalezar', align: 'start', lh: 1.15 }),
        I('calendar', 1444, 560, 56, '#22d3ee'),
        T({ ar: 'الخميس ١٥ أكتوبر', en: 'Thursday, Oct 15' }, 700, 556, 720, 44, { font: 'Tajawal', weight: 700, color: '#e2e8f0', align: 'start' }),
        I('clock', 1444, 650, 56, '#22d3ee'),
        T({ ar: '٧:٠٠ مساء\u064B', en: '7:00 PM' }, 700, 646, 720, 44, { font: 'Tajawal', weight: 700, color: '#e2e8f0', align: 'start' }),
        I('home', 1444, 740, 56, '#22d3ee'),
        T({ ar: 'قاعة الإبداع — الدور الثاني', en: 'Creativity Hall — 2nd floor' }, 700, 736, 720, 44, { font: 'Tajawal', weight: 700, color: '#e2e8f0', align: 'start' })
      ]
    },
    {
      id: 'youtube', size: 'youtube', name: { ar: 'صورة مصغرة', en: 'Thumbnail' },
      bg: { type: 'gradient', c1: '#111827', c2: '#7f1d1d', angle: 120 },
      els: [
        S('rect', -60, 500, 1400, 300, '#dc2626', { rot: -4 }),
        T({ ar: '١٠ أسرار', en: '10 SECRETS' }, 360, 50, 860, 170, { font: 'Lalezar', color: '#facc15', align: 'start', lh: 1.1, outline: { color: '#000000', w: 6 }, shadow: { color: 'rgba(0,0,0,0.6)', x: 0, y: 10, blur: 0 } }),
        T({ ar: 'لن يخبرك بها أحد!', en: 'Nobody tells you!' }, 260, 290, 960, 92, { weight: 700, align: 'start', outline: { color: '#000000', w: 4 } }),
        T({ ar: 'شاهد الآن', en: 'Watch now' }, 620, 570, 600, 70, { weight: 700, align: 'start' }),
        I('play', 110, 470, 170, '#ffffff')
      ]
    },
    {
      id: 'product', size: 'story', name: { ar: 'منتج جديد', en: 'New product' },
      bg: { type: 'color', color: '#fef3c7' },
      els: [
        S('circle', 190, 330, 700, 700, '#fbbf24'),
        { type: 'image', src: null, x: 265, y: 405, w: 550, h: 550, radius: 275 },
        T({ ar: 'منتج جديد', en: 'NEW ARRIVAL' }, 40, 1110, 1000, 120, { font: 'Lalezar', color: '#78350f' }),
        T({ ar: 'تصميم أنيق وجودة عالية', en: 'Elegant design, premium quality' }, 90, 1290, 900, 56, { font: 'Tajawal', color: '#92400e' }),
        S('rect', 290, 1440, 500, 140, '#78350f', { radius: 70 }),
        T({ ar: '٩٩ ر.س', en: '$99' }, 290, 1462, 500, 76, { weight: 700, color: '#fef3c7' }),
        T({ ar: 'اطلبه الآن عبر الرابط', en: 'Order now — link in bio' }, 90, 1700, 900, 44, { font: 'Tajawal', weight: 700, color: '#78350f' })
      ]
    },
    {
      id: 'opening', size: 'post', name: { ar: 'افتتاح قريب\u064Bا', en: 'Grand opening' },
      bg: { type: 'color', color: '#0a0a0a' },
      els: [
        S('rect', 60, 60, 960, 960, 'none', { stroke: '#d4af37', strokeW: 4 }),
        T({ ar: 'افتتاح', en: 'GRAND' }, 40, 230, 1000, 160, { font: 'Reem Kufi', weight: 700, color: '#d4af37', lh: 1.1 }),
        T({ ar: 'قريب\u064Bا', en: 'OPENING' }, 40, 420, 1000, 200, { font: 'Reem Kufi', weight: 700, lh: 1.1 }),
        S('rect', 390, 720, 300, 4, '#d4af37'),
        T({ ar: 'ترق\u0651بونا', en: 'Stay tuned' }, 140, 760, 800, 60, { font: 'Tajawal', color: '#e5e5e5' })
      ]
    },
    {
      id: 'thanks', size: 'post', name: { ar: 'شكر\u064Bا لكم', en: 'Thank you' },
      bg: { type: 'gradient', c1: '#fce7f3', c2: '#e0e7ff', angle: 135 },
      els: [
        I('heart', 440, 150, 200, '#ec4899'),
        T({ ar: 'شكر\u064Bا لكم', en: 'Thank you' }, 40, 380, 1000, 170, { font: 'Aref Ruqaa', weight: 700, color: '#831843' }),
        T({ ar: '١٠ آلاف متابع', en: '10K followers' }, 90, 640, 900, 96, { weight: 700, color: '#4338ca' }),
        T({ ar: 'وجودكم سر نجاحنا', en: 'You are the secret of our success' }, 90, 800, 900, 50, { font: 'Tajawal', color: '#6b21a8' })
      ]
    },
    {
      id: 'invitation', size: 'invite', name: { ar: 'دعوة زفاف', en: 'Wedding invitation' },
      bg: { type: 'color', color: '#fffdf7' },
      els: [
        S('rect', 70, 70, 1360, 1960, 'none', { stroke: '#b08d57', strokeW: 6 }),
        S('rect', 100, 100, 1300, 1900, 'none', { stroke: '#b08d57', strokeW: 2 }),
        T({ ar: 'بسم الله الرحمن الرحيم', en: 'With joyful hearts' }, 150, 220, 1200, 64, { font: 'Amiri', color: '#8b6b3d' }),
        T({ ar: 'دعوة', en: 'Invitation' }, 150, 360, 1200, 220, { font: 'Aref Ruqaa', weight: 700, color: '#b08d57', lh: 1.2 }),
        T({ ar: 'يتشر\u0651ف آل فلان بدعوتكم لحضور\nحفل زفاف ابنهم', en: 'The family requests the honor of your presence\nat the wedding of their son' }, 150, 760, 1200, 64, { font: 'Amiri', color: '#3f3f46', lh: 1.7 }),
        T({ ar: 'أحمد & سارة', en: 'Ahmed & Sara' }, 150, 1040, 1200, 150, { font: 'Aref Ruqaa', weight: 700, color: '#b08d57', lh: 1.3 }),
        T({ ar: 'الجمعة ٢٠ نوفمبر ٢٠٢٦ — الساعة الثامنة مساء\u064B\nقاعة الياسمين', en: 'Friday, November 20, 2026 — 8:00 PM\nJasmine Hall' }, 150, 1400, 1200, 56, { font: 'Tajawal', color: '#52525b', lh: 1.7 }),
        T({ ar: 'وبحضوركم يكتمل فرحنا', en: 'Your presence completes our joy' }, 150, 1750, 1200, 60, { font: 'Amiri', color: '#8b6b3d' })
      ]
    },
    {
      id: 'card', size: 'card', name: { ar: 'بطاقة عمل', en: 'Business card' },
      bg: { type: 'color', color: '#0f172a' },
      els: [
        S('rect', 0, 0, 360, 600, grad('#fd6101', '#ee0b75', 160)),
        I('sparkles', 110, 230, 140, '#ffffff'),
        T({ ar: 'اسمك هنا', en: 'Your Name' }, 420, 110, 570, 72, { weight: 700, align: 'start', lh: 1.2 }),
        T({ ar: 'المسمى الوظيفي', en: 'Job Title' }, 420, 210, 570, 40, { font: 'Tajawal', color: '#fd9a5b', align: 'start' }),
        I('mail', 954, 336, 36, '#fd6101'),
        T('name@example.com', 420, 330, 510, 30, { font: 'Tajawal', color: '#cbd5e1', align: 'start' }),
        I('globe', 954, 401, 36, '#fd6101'),
        T('www.example.com', 420, 395, 510, 30, { font: 'Tajawal', color: '#cbd5e1', align: 'start' }),
        I('home', 954, 466, 36, '#fd6101'),
        T({ ar: 'المدينة، الدولة', en: 'City, Country' }, 420, 460, 510, 30, { font: 'Tajawal', color: '#cbd5e1', align: 'start' })
      ]
    }
  ];

  globalThis.WAMDA = { SIZES, TEMPLATES };
})();
