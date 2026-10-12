/*
 * سجل منصة ورشة WARSHA — المصدر الوحيد لبيانات المنصة والمطو\u0651ر والتطبيقات.
 * ي\u064Fقرأ من واجهة التطبيقات (كـ globalThis.WARSHA_REGISTRY) ومن العملية الرئيسية
 * وسكربتات البناء (كوحدة CommonJS).
 */
(function (registry) {
  if (typeof module !== 'undefined' && module.exports) module.exports = registry;
  else globalThis.WARSHA_REGISTRY = registry;
})({
  version: '1.0.0',
  platform: {
    id: 'warsha',
    appId: 'com.malshatti.warsha',
    productName: 'Warsha',
    name: { ar: 'ورشة', en: 'WARSHA' },
    tagline: {
      ar: 'منصة تطبيقات إبداعية عربية متكاملة',
      en: 'An integrated Arabic creative suite'
    },
    color: '#4f46e5'
  },
  developer: {
    name: { ar: 'محمد الشطي', en: 'Mohammed Alshatti' },
    website: 'https://malshatti.com',
    websiteLabel: 'malshatti.com',
    email: 'info@malshatti.com'
  },
  repository: 'malshatti44/warshaa',
  copyrightYear: 2026,

  categories: [
    { id: 'photo', name: { ar: 'الصور', en: 'Photo' } },
    { id: 'design', name: { ar: 'التصميم', en: 'Design' } },
    { id: 'media', name: { ar: 'الفيديو والصوت', en: 'Video & Audio' } },
    { id: 'docs', name: { ar: 'المستندات', en: 'Documents' } }
  ],

  apps: [
    {
      id: 'retoush', productName: 'Retoush', color: '#0070f6', category: 'photo',
      name: { ar: 'رتوش', en: 'Retoush' },
      desc: { ar: 'تحرير الصور والرسم بالطبقات', en: 'Layered photo editing & painting' },
      files: [
        { ext: ['retoush'], name: { ar: 'مشروع رتوش', en: 'Retoush project' } },
        { ext: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'], name: { ar: 'صورة', en: 'Image' } }
      ]
    },
    {
      id: 'reesha', productName: 'Reesha', color: '#fd6101', category: 'design',
      name: { ar: 'ريشة', en: 'Reesha' },
      desc: { ar: 'رسم متجهي وتصميم الشعارات والرسومات', en: 'Vector illustration & logo design' },
      files: [
        { ext: ['reesha'], name: { ar: 'مشروع ريشة', en: 'Reesha project' } },
        { ext: ['svg'], name: { ar: 'رسم متجهي SVG', en: 'SVG vector' } }
      ]
    },
    {
      id: 'monteer', productName: 'Monteer', color: '#6203c9', category: 'media',
      name: { ar: 'مونتير', en: 'Monteer' },
      desc: { ar: 'مونتاج الفيديو وإضافة العناوين والموسيقى', en: 'Video editing with titles & music' },
      files: [
        { ext: ['monteer'], name: { ar: 'مشروع مونتير', en: 'Monteer project' } }
      ]
    },
    {
      id: 'tayf', productName: 'Tayf', color: '#01a89a', category: 'photo',
      name: { ar: 'طيف', en: 'Tayf' },
      desc: { ar: 'تحميض الصور وتصحيح الألوان والإضاءة', en: 'Photo developing, color & light grading' },
      files: [
        { ext: ['jpg', 'jpeg', 'png', 'webp'], name: { ar: 'صورة', en: 'Image' } }
      ]
    },
    {
      id: 'watheeq', productName: 'Watheeq', color: '#ea1822', category: 'docs',
      name: { ar: 'وثيق', en: 'Watheeq' },
      desc: { ar: 'عرض ملفات PDF ودمجها وتقسيمها وتوقيعها', en: 'View, merge, split & sign PDF files' },
      files: [
        { ext: ['pdf'], name: { ar: 'مستند PDF', en: 'PDF document' } }
      ]
    },
    {
      id: 'wamda', productName: 'Wamda', color: '#ee0b75', category: 'design',
      name: { ar: 'ومضة', en: 'Wamda' },
      desc: { ar: 'تصاميم سريعة للتواصل الاجتماعي بقوالب جاهزة', en: 'Quick social media designs from templates' },
      files: [
        { ext: ['wamda'], name: { ar: 'تصميم ومضة', en: 'Wamda design' } }
      ]
    },
    {
      id: 'nasaq', productName: 'Nasaq', color: '#fb3448', category: 'design',
      name: { ar: 'نسق', en: 'Nasaq' },
      desc: { ar: 'تنسيق الصفحات والمجلات والكتيبات للطباعة', en: 'Page layout for magazines, brochures & print' },
      files: [
        { ext: ['nasaq'], name: { ar: 'مستند نسق', en: 'Nasaq document' } }
      ]
    },
    {
      id: 'satr', productName: 'Satr', color: '#0062ee', category: 'docs',
      name: { ar: 'سطر', en: 'Satr' },
      desc: { ar: 'معالج نصوص لكتابة المستندات وتنسيقها', en: 'Word processor for writing & formatting documents' },
      files: [
        { ext: ['satr'], name: { ar: 'مستند سطر', en: 'Satr document' } },
        { ext: ['docx'], name: { ar: 'مستند Word', en: 'Word document' } },
        { ext: ['html', 'htm', 'txt', 'md'], name: { ar: 'نص', en: 'Text' } }
      ]
    },
    {
      id: 'minbar', productName: 'Minbar', color: '#fd9801', category: 'docs',
      name: { ar: 'منبر', en: 'Minbar' },
      desc: { ar: 'عروض تقديمية احترافية بقوالب عربية', en: 'Professional presentations with Arabic themes' },
      files: [
        { ext: ['minbar'], name: { ar: 'عرض منبر', en: 'Minbar presentation' } }
      ]
    },
    {
      id: 'kashf', productName: 'Kashf', color: '#0eae4e', category: 'docs',
      name: { ar: 'كشف', en: 'Kashf' },
      desc: { ar: 'جداول بيانات ومعادلات ورسوم بيانية', en: 'Spreadsheets, formulas & charts' },
      files: [
        { ext: ['kashf'], name: { ar: 'مصنف كشف', en: 'Kashf workbook' } },
        { ext: ['xlsx'], name: { ar: 'مصنف Excel', en: 'Excel workbook' } },
        { ext: ['csv'], name: { ar: 'ملف CSV', en: 'CSV file' } }
      ]
    },
    {
      id: 'mukhattat', productName: 'Mukhattat', color: '#0084fc', category: 'design',
      name: { ar: 'مخطط', en: 'Mukhattat' },
      desc: { ar: 'رسم هندسي ثنائي الأبعاد ومخططات CAD', en: '2D CAD drafting & technical drawings' },
      files: [
        { ext: ['mukhattat'], name: { ar: 'مخطط', en: 'Mukhattat drawing' } },
        { ext: ['dxf'], name: { ar: 'رسم DXF', en: 'DXF drawing' } }
      ]
    },
    {
      id: 'sada', productName: 'Sada', color: '#790ce2', category: 'media',
      name: { ar: 'صدى', en: 'Sada' },
      desc: { ar: 'تسجيل الصوت وتحريره ومعالجته', en: 'Audio recording, editing & processing' },
      files: [
        { ext: ['wav', 'mp3', 'ogg', 'm4a', 'flac', 'webm', 'opus'], name: { ar: 'ملف صوتي', en: 'Audio file' } }
      ]
    }
  ]
});
