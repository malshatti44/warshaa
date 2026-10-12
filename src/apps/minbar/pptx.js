/* كاتب PPTX لمنبر — يحو\u0651ل نموذج شرائح محايد إلى ملف PowerPoint يدعم العربية (rtl) */
(function () {
  'use strict';
  const EMU = 9525; // لكل بكسل
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
  const hex = (c) => String(c || '#000000').replace('#', '').toUpperCase().slice(0, 6).padEnd(6, '0');
  const NS_A = 'http://schemas.openxmlformats.org/drawingml/2006/main';
  const NS_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const NS_P = 'http://schemas.openxmlformats.org/presentationml/2006/main';
  const ARABIC = /[؀-ۿ]/;
  const PRST = { rect: 'rect', roundrect: 'roundRect', ellipse: 'ellipse', triangle: 'triangle', diamond: 'diamond', star: 'star5', arrow: 'rightArrow', arrowL: 'leftArrow', line: 'line', hexagon: 'hexagon', heart: 'heart', chevron: 'chevron', callout: 'wedgeRoundRectCallout' };

  function fillXml(f) {
    if (!f || f === 'none' || f === 'transparent') return '<a:noFill/>';
    if (typeof f === 'object' && f.stops) {
      return '<a:gradFill rotWithShape="1"><a:gsLst>' + f.stops.map((s) => '<a:gs pos="' + Math.round(s.pos * 1000) + '"><a:srgbClr val="' + hex(s.color) + '"/></a:gs>').join('') +
        '</a:gsLst><a:lin ang="' + Math.round(((f.angle || 90) - 90 + 360) % 360 * 60000) + '" scaled="0"/></a:gradFill>';
    }
    return '<a:solidFill><a:srgbClr val="' + hex(f) + '"' + (f.alpha != null ? '><a:alpha val="' + Math.round(f.alpha * 100000) + '"/></a:srgbClr>' : '/>') + '</a:solidFill>';
  }
  function xfrm(it) {
    return '<a:xfrm' + (it.rot ? ' rot="' + Math.round(it.rot * 60000) + '"' : '') + '><a:off x="' + Math.round(it.x * EMU) + '" y="' + Math.round(it.y * EMU) + '"/><a:ext cx="' + Math.max(1, Math.round(it.w * EMU)) + '" cy="' + Math.max(1, Math.round(it.h * EMU)) + '"/></a:xfrm>';
  }
  function runXml(r) {
    const sz = Math.round((r.size || 18) * 0.75 * 100);
    const lang = ARABIC.test(r.text) ? 'ar-SA' : 'en-US';
    let x = '<a:r><a:rPr lang="' + lang + '" sz="' + sz + '"' + (r.b ? ' b="1"' : '') + (r.i ? ' i="1"' : '') + (r.u ? ' u="sng"' : '') + (r.s ? ' strike="sngStrike"' : '') + ' dirty="0">';
    if (r.color) x += '<a:solidFill><a:srgbClr val="' + hex(r.color) + '"/></a:solidFill>';
    if (r.font) x += '<a:latin typeface="' + esc(r.font) + '"/><a:cs typeface="' + esc(r.font) + '"/>';
    return x + '</a:rPr><a:t>' + esc(r.text) + '</a:t></a:r>';
  }
  function parasXml(paras, rtlDefault) {
    if (!paras || !paras.length) return '<a:p><a:endParaRPr lang="ar-SA"/></a:p>';
    return paras.map((p) => {
      const rtl = p.dir ? p.dir === 'rtl' : rtlDefault;
      // في PowerPoint: محاذاة l/r فيزيائية
      const algn = { left: 'l', right: 'r', center: 'ctr', justify: 'just' }[p.align] || (rtl ? 'r' : 'l');
      let pPr = '<a:pPr algn="' + algn + '"' + (rtl ? ' rtl="1"' : '') + (p.bullet || p.num ? ' marL="457200" indent="-342900"' : ' marL="0" indent="0"') + '>';
      if (p.lineHeight) pPr += '<a:lnSpc><a:spcPct val="' + Math.round(p.lineHeight * 100000 / 1.2) + '"/></a:lnSpc>';
      if (p.bullet) pPr += '<a:buFont typeface="Arial"/><a:buChar char="•"/>';
      else if (p.num) pPr += '<a:buFont typeface="+mj-lt"/><a:buAutoNum type="' + (rtl ? 'arabicPeriod' : 'arabicPeriod') + '"/>';
      else pPr += '<a:buNone/>';
      pPr += '</a:pPr>';
      const runs = p.runs.filter((r) => r.text).map(runXml).join('');
      const end = '<a:endParaRPr lang="' + (rtl ? 'ar-SA' : 'en-US') + '" sz="' + Math.round(((p.runs[0] && p.runs[0].size) || 18) * 75) + '"/>';
      return '<a:p>' + pPr + runs + end + '</a:p>';
    }).join('');
  }

  async function write(model) {
    const zip = new JSZip();
    const zf = (n, d) => zip.file(n, d, { createFolders: false });
    const W = model.width || 1280, H = model.height || 720;
    const media = [];
    const slideXml = [], slideRels = [];
    model.slides.forEach((s, si) => {
      const rels = ['<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>'];
      let rid = 2, id = 2;
      const addImage = (dataURL) => {
        const m = /^data:image\/(png|jpe?g|gif);base64,(.*)$/.exec(dataURL || '');
        if (!m) return null;
        const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
        const name = 'image' + (media.length + 1) + '.' + ext;
        media.push({ name, b64: m[2] });
        const r = 'rId' + (rid++);
        rels.push('<Relationship Id="' + r + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/' + name + '"/>');
        return r;
      };
      let bg = '';
      if (s.bg) {
        if (s.bg.image) {
          const r = addImage(s.bg.image);
          if (r) bg = '<p:bg><p:bgPr><a:blipFill dpi="0" rotWithShape="1"><a:blip r:embed="' + r + '"/><a:srcRect/><a:stretch><a:fillRect/></a:stretch></a:blipFill><a:effectLst/></p:bgPr></p:bg>';
        } else bg = '<p:bg><p:bgPr>' + fillXml(s.bg.fill) + '<a:effectLst/></p:bgPr></p:bg>';
      }
      let tree = '';
      for (const it of s.items) {
        const nid = id++;
        if (it.kind === 'image') {
          const r = addImage(it.image);
          if (!r) continue;
          tree += '<p:pic><p:nvPicPr><p:cNvPr id="' + nid + '" name="Picture ' + nid + '"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>' +
            '<p:blipFill><a:blip r:embed="' + r + '">' + (it.opacity != null && it.opacity < 1 ? '<a:alphaModFix amt="' + Math.round(it.opacity * 100000) + '"/>' : '') + '</a:blip><a:stretch><a:fillRect/></a:stretch></p:blipFill>' +
            '<p:spPr>' + xfrm(it) + '<a:prstGeom prst="' + (it.rounded ? 'roundRect' : 'rect') + '"><a:avLst/></a:prstGeom></p:spPr></p:pic>';
          continue;
        }
        const isText = it.kind === 'text';
        const prst = isText ? 'rect' : (PRST[it.shape] || 'rect');
        const ln = it.stroke && it.stroke !== 'none' ? '<a:ln w="' + Math.round((it.strokeW || 1) * EMU) + '">' + fillXml(it.stroke) + '</a:ln>' : '<a:ln><a:noFill/></a:ln>';
        const anchor = { top: 't', middle: 'ctr', bottom: 'b' }[it.valign] || (isText ? 't' : 'ctr');
        tree += '<p:sp><p:nvSpPr><p:cNvPr id="' + nid + '" name="' + (isText ? 'TextBox ' : 'Shape ') + nid + '"/><p:cNvSpPr' + (isText ? ' txBox="1"' : '') + '/><p:nvPr/></p:nvSpPr>' +
          '<p:spPr>' + xfrm(it) + '<a:prstGeom prst="' + prst + '"><a:avLst/></a:prstGeom>' + fillXml(it.fill) + ln + '</p:spPr>' +
          '<p:txBody><a:bodyPr wrap="square" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="' + (model.rtl ? 1 : 0) + '" anchor="' + anchor + '"><a:noAutofit/></a:bodyPr><a:lstStyle/>' + parasXml(it.paras, model.rtl) + '</p:txBody></p:sp>';
      }
      slideXml.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '"><p:cSld>' + bg +
        '<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>' +
        tree + '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>' +
        (s.transition && s.transition !== 'none' ? '<p:transition spd="med">' + ({ fade: '<p:fade/>', slide: '<p:push dir="' + (model.rtl ? 'r' : 'l') + '"/>', zoom: '<p:zoom/>' }[s.transition] || '<p:fade/>') + '</p:transition>' : '') +
        '</p:sld>');
      slideRels.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + rels.join('') + '</Relationships>');
    });

    const n = model.slides.length;
    const cx = W * EMU, cy = H * EMU;
    zf('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
      '<Default Extension="png" ContentType="image/png"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="gif" ContentType="image/gif"/>' +
      '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>' +
      '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>' +
      '<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>' +
      '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>' +
      '<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>' +
      '<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>' +
      '<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>' +
      model.slides.map((s, i) => '<Override PartName="/ppt/slides/slide' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>').join('') +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>');
    zf('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>');
    const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    zf('docProps/core.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + esc(model.title || '') + '</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified></cp:coreProperties>');
    zf('docProps/app.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>WARSHA Minbar</Application><Slides>' + n + '</Slides></Properties>');
    zf('ppt/presentation.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '" saveSubsetFonts="1"' + (model.rtl ? ' rtl="1"' : '') + '>' +
      '<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>' +
      model.slides.map((s, i) => '<p:sldId id="' + (256 + i) + '" r:id="rId' + (i + 2) + '"/>').join('') +
      '</p:sldIdLst><p:sldSz cx="' + cx + '" cy="' + cy + '"/><p:notesSz cx="6858000" cy="9144000"/><p:defaultTextStyle><a:defPPr><a:defRPr lang="ar-SA"/></a:defPPr></p:defaultTextStyle></p:presentation>');
    zf('ppt/_rels/presentation.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>' +
      model.slides.map((s, i) => '<Relationship Id="rId' + (i + 2) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide' + (i + 1) + '.xml"/>').join('') +
      '<Relationship Id="rId' + (n + 2) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/>' +
      '<Relationship Id="rId' + (n + 3) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/>' +
      '<Relationship Id="rId' + (n + 4) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>' +
      '<Relationship Id="rId' + (n + 5) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/></Relationships>');
    zf('ppt/presProps.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentationPr xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '"/>');
    zf('ppt/viewProps.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:viewPr xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '"><p:normalViewPr><p:restoredLeft sz="15620"/><p:restoredTop sz="94660"/></p:normalViewPr><p:gridSpacing cx="76200" cy="76200"/></p:viewPr>');
    zf('ppt/tableStyles.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:tblStyleLst xmlns:a="' + NS_A + '" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>');
    const font = esc(model.font || 'Arial');
    zf('ppt/theme/theme1.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="' + NS_A + '" name="Warsha"><a:themeElements>' +
      '<a:clrScheme name="Warsha"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F2937"/></a:dk2><a:lt2><a:srgbClr val="F3F4F6"/></a:lt2>' +
      '<a:accent1><a:srgbClr val="FD9801"/></a:accent1><a:accent2><a:srgbClr val="4F46E5"/></a:accent2><a:accent3><a:srgbClr val="0EAE4E"/></a:accent3><a:accent4><a:srgbClr val="EE0B75"/></a:accent4><a:accent5><a:srgbClr val="0084FC"/></a:accent5><a:accent6><a:srgbClr val="790CE2"/></a:accent6>' +
      '<a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme>' +
      '<a:fontScheme name="Warsha"><a:majorFont><a:latin typeface="' + font + '"/><a:ea typeface=""/><a:cs typeface="' + font + '"/></a:majorFont><a:minorFont><a:latin typeface="' + font + '"/><a:ea typeface=""/><a:cs typeface="' + font + '"/></a:minorFont></a:fontScheme>' +
      '<a:fmtScheme name="Warsha"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>' +
      '<a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>' +
      '<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>' +
      '<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>' +
      '</a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>');
    const emptyTree = '<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree>';
    zf('ppt/slideMasters/slideMaster1.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '"><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg>' + emptyTree + '</p:cSld>' +
      '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>' +
      '<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle><a:lvl1pPr><a:defRPr sz="4400"/></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr><a:defRPr sz="2800"/></a:lvl1pPr></p:bodyStyle><p:otherStyle><a:lvl1pPr><a:defRPr sz="1800"/></a:lvl1pPr></p:otherStyle></p:txStyles></p:sldMaster>');
    zf('ppt/slideMasters/_rels/slideMaster1.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>');
    zf('ppt/slideLayouts/slideLayout1.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '" type="blank" preserve="1"><p:cSld name="Blank">' + emptyTree + '</p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>');
    zf('ppt/slideLayouts/_rels/slideLayout1.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>');
    slideXml.forEach((x, i) => zf('ppt/slides/slide' + (i + 1) + '.xml', x));
    slideRels.forEach((x, i) => zf('ppt/slides/_rels/slide' + (i + 1) + '.xml.rels', x));
    media.forEach((m) => zip.file('ppt/media/' + m.name, m.b64, { base64: true, createFolders: false }));
    return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  }
  globalThis.MinbarPptx = { write };
})();
