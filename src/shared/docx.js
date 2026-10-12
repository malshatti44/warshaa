/* محو\u0651ل DOCX ↔ HTML مع دعم كامل للعربية (bidi/rtl، الخطوط المعقدة cs)
 * ي\u064Fستخدم في سطر (وقابل لإعادة الاستخدام). يعتمد على JSZip.
 *   WarshaDocx.fromElement(rootEl, {page}) → Promise<Uint8Array>
 *   WarshaDocx.toHTML(arrayBuffer) → Promise<{html, page}>
 */
(function () {
  'use strict';
  const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-\uFEFF]/;
  const ARABIC_SEG = /([؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-\uFEFF]+(?:[\s،؛؟.,:;!?()\-«»"']*[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-\uFEFF]+)*)/;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const MM_TWIP = 56.6929;
  const PX_TWIP = 15; // 1px = 15 twips (96dpi)
  const PX_EMU = 9525;

  function rgbToHex(c) {
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(c || '');
    if (!m) return null;
    if (m[4] !== undefined && parseFloat(m[4]) === 0) return null;
    return [m[1], m[2], m[3]].map((v) => (+v).toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  const firstFamily = (ff) => String(ff || '').split(',')[0].trim().replace(/^['"]|['"]$/g, '');

  /* ══════════════ HTML → DOCX ══════════════ */
  async function fromElement(root, opts) {
    opts = opts || {};
    const page = Object.assign({ size: 'A4', width: 210, height: 297, orientation: 'portrait', margins: { top: 25, right: 25, bottom: 25, left: 25 }, dir: 'rtl' }, opts.page || {});
    const zip = new JSZip();
    const zfile = zip.file.bind(zip);
    zip.file = (name, data) => zfile(name, data, { createFolders: false });
    const rels = [];
    const media = [];
    let relSeq = 10, docPrId = 1, numSeq = 3;
    const numInstances = []; // {id, abstract}
    const addRel = (type, target, external) => {
      const id = 'rId' + (relSeq++);
      rels.push({ id, type, target, external });
      return id;
    };
    const rootDir = getComputedStyle(root).direction;

    function runProps(el, text) {
      const cs = getComputedStyle(el);
      const p = [];
      const fam = firstFamily(cs.fontFamily);
      if (fam) p.push('<w:rFonts w:ascii="' + esc(fam) + '" w:hAnsi="' + esc(fam) + '" w:cs="' + esc(fam) + '" w:eastAsia="' + esc(fam) + '"/>');
      const bold = parseInt(cs.fontWeight, 10) >= 600;
      if (bold) p.push('<w:b/><w:bCs/>');
      if (cs.fontStyle === 'italic') p.push('<w:i/><w:iCs/>');
      let underline = false, strike = false, bg = null;
      for (let n = el; n && n !== root; n = n.parentElement) {
        const ncs = getComputedStyle(n);
        const line = ncs.textDecorationLine || '';
        if (line.includes('underline')) underline = true;
        if (line.includes('line-through')) strike = true;
        if (!bg) { const b = rgbToHex(ncs.backgroundColor); if (b && !/^(P|LI|H\d|DIV|BLOCKQUOTE|TD|TH|PRE)$/.test(n.tagName)) bg = b; }
        if (/^(P|LI|H\d|DIV|BLOCKQUOTE|TD|TH|PRE)$/.test(n.tagName)) break;
      }
      if (strike) p.push('<w:strike/>');
      const color = rgbToHex(cs.color);
      if (color && color !== '000000' && color !== '111111') p.push('<w:color w:val="' + color + '"/>');
      const sz = Math.round(parseFloat(cs.fontSize) * 0.75 * 2);
      if (sz) p.push('<w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/>');
      if (bg) p.push('<w:shd w:val="clear" w:color="auto" w:fill="' + bg + '"/>');
      if (underline) p.push('<w:u w:val="single"/>');
      if (cs.verticalAlign === 'super') p.push('<w:vertAlign w:val="superscript"/>');
      else if (cs.verticalAlign === 'sub') p.push('<w:vertAlign w:val="subscript"/>');
      if (text && ARABIC.test(text)) p.push('<w:rtl/>');
      return p.length ? '<w:rPr>' + p.join('') + '</w:rPr>' : '';
    }

    function textRuns(el, text, extraRPr) {
      // تقسيم النص حسب الكتابة (عربي/غير عربي) لضبط w:rtl
      const out = [];
      const parts = text.split(ARABIC_SEG).filter((s) => s !== '');
      for (const part of parts) {
        let rPr = runProps(el, part);
        if (extraRPr) rPr = rPr ? rPr.replace('<w:rPr>', '<w:rPr>' + extraRPr) : '<w:rPr>' + extraRPr + '</w:rPr>';
        const pieces = part.split('\t');
        const inner = pieces.map((s, i) => (i ? '<w:tab/>' : '') + (s ? '<w:t xml:space="preserve">' + esc(s) + '</w:t>' : '')).join('');
        out.push('<w:r>' + rPr + inner + '</w:r>');
      }
      return out.join('');
    }

    async function imageRun(img) {
      let src = img.getAttribute('src') || '';
      let bytes = null, ext = 'png';
      const w = Math.max(1, Math.round(img.getBoundingClientRect().width / (opts.zoom || 1)) || img.naturalWidth || 100);
      const h = Math.max(1, Math.round(img.getBoundingClientRect().height / (opts.zoom || 1)) || img.naturalHeight || 100);
      try {
        if (/^data:image\/(png|jpeg|jpg|gif);base64,/.test(src)) {
          ext = /^data:image\/(\w+)/.exec(src)[1].replace('jpeg', 'jpg');
          bytes = W.b64.decode(src.split(',')[1]);
        } else {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth || w; c.height = img.naturalHeight || h;
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          bytes = W.dataURLToBytes(c.toDataURL('image/png'));
        }
      } catch (e) { return ''; }
      const name = 'image' + (media.length + 1) + '.' + ext;
      media.push({ name, bytes });
      const rid = addRel('http://schemas.openxmlformats.org/officeDocument/2006/relationships/image', 'media/' + name);
      const id = docPrId++;
      const cx = w * PX_EMU, cy = h * PX_EMU;
      return '<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="' + cx + '" cy="' + cy + '"/><wp:docPr id="' + id + '" name="Picture ' + id + '"/>' +
        '<wp:cNvGraphicFramePr><a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/></wp:cNvGraphicFramePr>' +
        '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
        '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="' + id + '" name="' + name + '"/><pic:cNvPicPr/></pic:nvPicPr>' +
        '<pic:blipFill><a:blip r:embed="' + rid + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
        '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic>' +
        '</a:graphicData></a:graphic></wp:inline></w:drawing></w:r>';
    }

    async function inline(node, ctx) {
      let out = '';
      for (const ch of Array.from(node.childNodes)) {
        if (ch.nodeType === 3) {
          const t = ch.nodeValue.replace(/[\r\n]+/g, ' ');
          if (t) out += textRuns(ch.parentElement, t, ctx.link ? '<w:rStyle w:val="Hyperlink"/>' : '');
        } else if (ch.nodeType === 1) {
          const tag = ch.tagName;
          if (tag === 'BR') out += '<w:r><w:br/></w:r>';
          else if (tag === 'IMG') out += await imageRun(ch);
          else if (tag === 'A' && ch.getAttribute('href') && !ctx.link) {
            const rid = addRel('http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink', ch.getAttribute('href'), true);
            out += '<w:hyperlink r:id="' + rid + '" w:history="1">' + (await inline(ch, Object.assign({}, ctx, { link: true }))) + '</w:hyperlink>';
          } else if (isBlock(ch)) {
            // كتلة داخل سطر (نادر): نعاملها كسطر جديد
            out += '<w:r><w:br/></w:r>' + (await inline(ch, ctx));
          } else if (ch.classList && ch.classList.contains('page-break')) {
            out += '<w:r><w:br w:type="page"/></w:r>';
          } else out += await inline(ch, ctx);
        }
      }
      return out;
    }

    function isBlock(el) {
      return /^(P|DIV|H[1-6]|BLOCKQUOTE|PRE|UL|OL|LI|TABLE|HR|FIGURE|SECTION|ARTICLE)$/.test(el.tagName);
    }

    function paraProps(el, extra) {
      const cs = getComputedStyle(el);
      const p = [];
      const tag = el.tagName;
      if (/^H[1-6]$/.test(tag)) p.push('<w:pStyle w:val="Heading' + tag[1] + '"/>');
      else if (tag === 'BLOCKQUOTE') p.push('<w:pStyle w:val="Quote"/>');
      if (extra && extra.num) p.push('<w:numPr><w:ilvl w:val="' + extra.num.level + '"/><w:numId w:val="' + extra.num.id + '"/></w:numPr>');
      const rtl = cs.direction === 'rtl';
      if (rtl) p.push('<w:bidi/>');
      const mt = Math.round(parseFloat(cs.marginTop) * PX_TWIP) || 0;
      const mb = Math.round(parseFloat(cs.marginBottom) * PX_TWIP) || 0;
      let line = '';
      const lh = parseFloat(cs.lineHeight), fs = parseFloat(cs.fontSize);
      if (!isNaN(lh) && fs) line = ' w:line="' + Math.round((lh / fs) * 240 / 1.15) + '" w:lineRule="auto"';
      p.push('<w:spacing w:before="' + mt + '" w:after="' + mb + '"' + line + '/>');
      const indPx = parseFloat(rtl ? cs.marginRight : cs.marginLeft) || 0;
      const padPx = parseFloat(rtl ? cs.paddingRight : cs.paddingLeft) || 0;
      if (!extra || !extra.num) {
        const ind = Math.round((indPx + padPx) * PX_TWIP);
        if (ind > 0) p.push('<w:ind w:start="' + ind + '" w:left="' + (rtl ? 0 : ind) + '" w:right="' + (rtl ? ind : 0) + '"/>');
      }
      // المحاذاة: قيم left/right منطقية (بداية/نهاية) في الفقرات ثنائية الاتجاه
      const ta = cs.textAlign;
      let jc = null;
      if (ta === 'center') jc = 'center';
      else if (ta === 'justify') jc = 'both';
      else if (ta === 'right') jc = rtl ? null : 'right';
      else if (ta === 'left') jc = rtl ? 'right' : null;
      else if (ta === 'end') jc = 'right';
      if (jc) p.push('<w:jc w:val="' + jc + '"/>');
      return '<w:pPr>' + p.join('') + '</w:pPr>';
    }

    async function para(el, extra) {
      return '<w:p>' + paraProps(el, extra) + (await inline(el, {})) + '</w:p>';
    }

    async function list(el, level, out) {
      const ordered = el.tagName === 'OL';
      const numId = ordered ? numSeq++ : 1;
      if (ordered) numInstances.push({ id: numId, abstract: 1 });
      for (const li of Array.from(el.children)) {
        if (li.tagName !== 'LI') continue;
        // محتوى العنصر دون القوائم الفرعية، ثم القوائم الفرعية بمستوى أعمق
        out.push('<w:p>' + paraProps(li, { num: { id: numId, level } }) + (await inlineExcluding(li)) + '</w:p>');
        for (const sub of Array.from(li.children)) if (sub.tagName === 'UL' || sub.tagName === 'OL') await list(sub, Math.min(level + 1, 8), out);
      }
    }
    async function inlineExcluding(li) {
      let out = '';
      for (const ch of Array.from(li.childNodes)) {
        if (ch.nodeType === 1 && (ch.tagName === 'UL' || ch.tagName === 'OL')) continue;
        if (ch.nodeType === 1 && isBlock(ch)) { out += await inline(ch, {}); continue; }
        const wrap = { childNodes: [ch] };
        out += await inline(wrap, {});
      }
      return out;
    }

    async function table(el) {
      const rows = Array.from(el.rows || []);
      if (!rows.length) return '';
      const rtl = getComputedStyle(el).direction === 'rtl';
      const cols = Math.max(...rows.map((r) => Array.from(r.cells).reduce((s, c) => s + (c.colSpan || 1), 0)));
      const totalW = Math.round((el.getBoundingClientRect().width / (opts.zoom || 1)) * PX_TWIP) || 9000;
      const colW = Math.round(totalW / cols);
      let xml = '<w:tbl><w:tblPr><w:tblW w:w="' + totalW + '" w:type="dxa"/>' + (rtl ? '<w:bidiVisual/>' : '') +
        '<w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:left w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:right w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="999999"/></w:tblBorders>' +
        '<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>';
      for (let i = 0; i < cols; i++) xml += '<w:gridCol w:w="' + colW + '"/>';
      xml += '</w:tblGrid>';
      for (const r of rows) {
        xml += '<w:tr>';
        for (const c of Array.from(r.cells)) {
          const span = c.colSpan || 1;
          const bg = rgbToHex(getComputedStyle(c).backgroundColor);
          xml += '<w:tc><w:tcPr><w:tcW w:w="' + colW * span + '" w:type="dxa"/>' + (span > 1 ? '<w:gridSpan w:val="' + span + '"/>' : '') + (bg ? '<w:shd w:val="clear" w:color="auto" w:fill="' + bg + '"/>' : '') + '</w:tcPr>';
          const inner = await blocks(c);
          xml += inner || '<w:p>' + paraProps(c) + (await inline(c, {})) + '</w:p>';
          xml += '</w:tc>';
        }
        xml += '</w:tr>';
      }
      return xml + '</w:tbl><w:p/>';
    }

    async function blocks(container) {
      const out = [];
      const hasBlocks = Array.from(container.children).some(isBlock);
      if (!hasBlocks && container !== root) return '';
      let inlineBuffer = [];
      const flushInline = async () => {
        if (!inlineBuffer.length) return;
        const wrap = { childNodes: inlineBuffer };
        out.push('<w:p>' + paraProps(container) + (await inline(wrap, {})) + '</w:p>');
        inlineBuffer = [];
      };
      for (const ch of Array.from(container.childNodes)) {
        if (ch.nodeType === 1 && ch.classList.contains('page-break')) { await flushInline(); out.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>'); continue; }
        if (ch.nodeType === 1 && isBlock(ch)) {
          await flushInline();
          const tag = ch.tagName;
          if (tag === 'UL' || tag === 'OL') await list(ch, 0, out);
          else if (tag === 'TABLE') out.push(await table(ch));
          else if (tag === 'HR') out.push('<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="999999"/></w:pBdr></w:pPr></w:p>');
          else if ((tag === 'DIV' || tag === 'SECTION' || tag === 'ARTICLE' || tag === 'FIGURE') && Array.from(ch.children).some(isBlock)) out.push(await blocks(ch));
          else out.push(await para(ch));
        } else if (ch.nodeType === 3 && !ch.nodeValue.trim()) {
          continue;
        } else {
          inlineBuffer.push(ch);
        }
      }
      await flushInline();
      return out.join('');
    }

    const body = await blocks(root);
    const land = page.orientation === 'landscape';
    const pw = Math.round((land ? page.height : page.width) * MM_TWIP), ph = Math.round((land ? page.width : page.height) * MM_TWIP);
    const m = page.margins;
    const sect = '<w:sectPr><w:pgSz w:w="' + pw + '" w:h="' + ph + '"' + (land ? ' w:orient="landscape"' : '') + '/>' +
      '<w:pgMar w:top="' + Math.round(m.top * MM_TWIP) + '" w:right="' + Math.round(m.right * MM_TWIP) + '" w:bottom="' + Math.round(m.bottom * MM_TWIP) + '" w:left="' + Math.round(m.left * MM_TWIP) + '" w:header="709" w:footer="709" w:gutter="0"/>' +
      (rootDir === 'rtl' ? '<w:bidi/>' : '') + '</w:sectPr>';

    const docXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="' + W_NS + '" xmlns:r="' + R_NS + '" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
      '<w:body>' + body + sect + '</w:body></w:document>';

    const defFont = esc(opts.defaultFont || 'Arial');
    const heading = (n, sz) => '<w:style w:type="paragraph" w:styleId="Heading' + n + '"><w:name w:val="heading ' + n + '"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="120"/><w:outlineLvl w:val="' + (n - 1) + '"/></w:pPr><w:rPr><w:b/><w:bCs/><w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/></w:rPr></w:style>';
    const stylesXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="' + W_NS + '">' +
      '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="' + defFont + '" w:hAnsi="' + defFont + '" w:cs="' + defFont + '" w:eastAsia="' + defFont + '"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="en-US" w:bidi="ar-SA"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>' +
      heading(1, 40) + heading(2, 32) + heading(3, 28) + heading(4, 24) + heading(5, 22) + heading(6, 20) +
      '<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="720" w:right="720"/></w:pPr><w:rPr><w:i/><w:iCs/><w:color w:val="555555"/></w:rPr></w:style>' +
      '<w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="720"/></w:pPr></w:style>' +
      '<w:style w:type="character" w:styleId="Hyperlink"><w:name w:val="Hyperlink"/><w:rPr><w:color w:val="0563C1"/><w:u w:val="single"/></w:rPr></w:style>' +
      '<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>' +
      '</w:styles>';

    const lvl = (i, fmt, text, font) => '<w:lvl w:ilvl="' + i + '"><w:start w:val="1"/><w:numFmt w:val="' + fmt + '"/><w:lvlText w:val="' + text + '"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="' + (720 * (i + 1)) + '" w:hanging="360"/></w:pPr>' + (font ? '<w:rPr><w:rFonts w:ascii="' + font + '" w:hAnsi="' + font + '" w:hint="default"/></w:rPr>' : '') + '</w:lvl>';
    let bulletLv = '', decLv = '';
    const bullets = ['•', '◦', '▪'];
    for (let i = 0; i < 9; i++) {
      bulletLv += lvl(i, 'bullet', bullets[i % 3], 'Arial');
      decLv += lvl(i, i % 3 === 0 ? 'decimal' : i % 3 === 1 ? 'lowerLetter' : 'lowerRoman', '%' + (i + 1) + '.');
    }
    let nums = '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num><w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>';
    for (const n of numInstances) nums += '<w:num w:numId="' + n.id + '"><w:abstractNumId w:val="' + n.abstract + '"/><w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride></w:num>';
    const numberingXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="' + W_NS + '">' +
      '<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>' + bulletLv + '</w:abstractNum>' +
      '<w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>' + decLv + '</w:abstractNum>' + nums + '</w:numbering>';

    const settingsXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="' + W_NS + '"><w:defaultTabStop w:val="720"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>';

    const docRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>' +
      rels.map((r) => '<Relationship Id="' + r.id + '" Type="' + r.type + '" Target="' + esc(r.target) + '"' + (r.external ? ' TargetMode="External"' : '') + '/>').join('') +
      '</Relationships>';

    const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
      '<Default Extension="png" ContentType="image/png"/><Default Extension="jpg" ContentType="image/jpeg"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="gif" ContentType="image/gif"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>' +
      '<Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>' +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>');
    zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>');
    zip.file('docProps/core.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<dc:title>' + esc(opts.title || '') + '</dc:title><dc:creator>' + esc(opts.author || '') + '</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified></cp:coreProperties>');
    zip.file('docProps/app.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>' + esc(opts.application || 'WARSHA Satr') + '</Application></Properties>');
    zip.file('word/document.xml', docXml);
    zip.file('word/styles.xml', stylesXml);
    zip.file('word/numbering.xml', numberingXml);
    zip.file('word/settings.xml', settingsXml);
    zip.file('word/_rels/document.xml.rels', docRels);
    for (const m2 of media) zip.file('word/media/' + m2.name, m2.bytes);
    return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  }

  /* ══════════════ DOCX → HTML ══════════════ */
  async function toHTML(buffer) {
    const zip = await JSZip.loadAsync(buffer);
    const read = async (p) => { const f = zip.file(p); return f ? f.async('string') : null; };
    const parse = (s) => new DOMParser().parseFromString(s, 'application/xml');
    const docXml = await read('word/document.xml');
    if (!docXml) throw new Error('Not a DOCX file');
    const doc = parse(docXml);
    const relsDoc = parse((await read('word/_rels/document.xml.rels')) || '<Relationships/>');
    const rels = {};
    Array.from(relsDoc.getElementsByTagName('Relationship')).forEach((r) => { rels[r.getAttribute('Id')] = { target: r.getAttribute('Target'), type: r.getAttribute('Type') }; });
    const stylesDoc = parse((await read('word/styles.xml')) || '<w:styles xmlns:w="' + W_NS + '"/>');
    const styleNames = {};
    Array.from(stylesDoc.getElementsByTagNameNS(W_NS, 'style')).forEach((s) => {
      const n = s.getElementsByTagNameNS(W_NS, 'name')[0];
      styleNames[s.getAttributeNS(W_NS, 'styleId') || s.getAttribute('w:styleId')] = n ? (n.getAttributeNS(W_NS, 'val') || n.getAttribute('w:val') || '').toLowerCase() : '';
    });
    const numDoc = parse((await read('word/numbering.xml')) || '<w:numbering xmlns:w="' + W_NS + '"/>');
    const absFmt = {};
    Array.from(numDoc.getElementsByTagNameNS(W_NS, 'abstractNum')).forEach((a) => {
      const id = attr(a, 'abstractNumId');
      absFmt[id] = {};
      Array.from(a.getElementsByTagNameNS(W_NS, 'lvl')).forEach((l) => {
        const f = l.getElementsByTagNameNS(W_NS, 'numFmt')[0];
        absFmt[id][attr(l, 'ilvl')] = f ? attr(f, 'val') : 'decimal';
      });
    });
    const numToAbs = {};
    Array.from(numDoc.getElementsByTagNameNS(W_NS, 'num')).forEach((n) => {
      const a = n.getElementsByTagNameNS(W_NS, 'abstractNumId')[0];
      if (a) numToAbs[attr(n, 'numId')] = attr(a, 'val');
    });
    const mediaCache = {};
    async function mediaURL(rid) {
      const rel = rels[rid];
      if (!rel) return null;
      if (mediaCache[rid]) return mediaCache[rid];
      const path = 'word/' + rel.target.replace(/^\.?\//, '').replace(/^word\//, '');
      const f = zip.file(path);
      if (!f) return null;
      const b64 = await f.async('base64');
      const ext = (/\.(\w+)$/.exec(path) || [])[1] || 'png';
      const mime = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', bmp: 'image/bmp', svg: 'image/svg+xml', webp: 'image/webp' }[ext.toLowerCase()] || 'image/png';
      mediaCache[rid] = 'data:' + mime + ';base64,' + b64;
      return mediaCache[rid];
    }
    function attr(el, name) { return el.getAttributeNS(W_NS, name) || el.getAttribute('w:' + name); }
    function child(el, name) { if (!el) return null; for (const c of el.children) if (c.localName === name) return c; return null; }
    function val(el, name) { const c = child(el, name); return c ? attr(c, 'val') : null; }
    function on(el, name) { const c = child(el, name); if (!c) return false; const v = attr(c, 'val'); return v == null || (v !== '0' && v !== 'false' && v !== 'none'); }

    function runStyle(rPr) {
      if (!rPr) return { open: '', close: '' };
      const st = [];
      let open = '', close = '';
      if (on(rPr, 'b') || on(rPr, 'bCs')) { open += '<b>'; close = '</b>' + close; }
      if (on(rPr, 'i') || on(rPr, 'iCs')) { open += '<i>'; close = '</i>' + close; }
      const u = child(rPr, 'u');
      if (u && attr(u, 'val') !== 'none') { open += '<u>'; close = '</u>' + close; }
      if (on(rPr, 'strike') || on(rPr, 'dstrike')) { open += '<s>'; close = '</s>' + close; }
      const color = val(rPr, 'color');
      if (color && color !== 'auto') st.push('color:#' + color);
      const sz = val(rPr, 'szCs') || val(rPr, 'sz');
      if (sz) st.push('font-size:' + (parseInt(sz, 10) / 2) + 'pt');
      const fonts = child(rPr, 'rFonts');
      if (fonts) { const f = attr(fonts, 'cs') || attr(fonts, 'ascii') || attr(fonts, 'hAnsi'); if (f) st.push("font-family:'" + f.replace(/'/g, '') + "'"); }
      const hl = val(rPr, 'highlight');
      const HL = { yellow: '#ffff00', green: '#00ff00', cyan: '#00ffff', magenta: '#ff00ff', blue: '#0000ff', red: '#ff0000', darkBlue: '#000080', darkCyan: '#008080', darkGreen: '#008000', darkMagenta: '#800080', darkRed: '#800000', darkYellow: '#808000', darkGray: '#808080', lightGray: '#c0c0c0', black: '#000000' };
      if (hl && HL[hl]) st.push('background-color:' + HL[hl]);
      const shd = child(rPr, 'shd');
      if (shd) { const fill = attr(shd, 'fill'); if (fill && fill !== 'auto') st.push('background-color:#' + fill); }
      const va = val(rPr, 'vertAlign');
      if (va === 'superscript') { open += '<sup>'; close = '</sup>' + close; }
      if (va === 'subscript') { open += '<sub>'; close = '</sub>' + close; }
      if (st.length) { open = '<span style="' + st.join(';') + '">' + open; close += '</span>'; }
      return { open, close };
    }

    async function runsHTML(container) {
      let out = '';
      for (const n of Array.from(container.children)) {
        const ln = n.localName;
        if (ln === 'r') {
          const rs = runStyle(child(n, 'rPr'));
          let inner = '';
          for (const c of Array.from(n.children)) {
            if (c.localName === 't') inner += esc(c.textContent);
            else if (c.localName === 'tab') inner += '\t';
            else if (c.localName === 'br') inner += attr(c, 'type') === 'page' ? '\u0000PB\u0000' : '<br>';
            else if (c.localName === 'drawing' || c.localName === 'pict') {
              const blip = c.getElementsByTagNameNS('http://schemas.openxmlformats.org/drawingml/2006/main', 'blip')[0];
              const imgData = c.getElementsByTagName('v:imagedata')[0];
              const rid = blip ? (blip.getAttributeNS(R_NS, 'embed') || blip.getAttribute('r:embed')) : imgData ? (imgData.getAttributeNS(R_NS, 'id') || imgData.getAttribute('r:id')) : null;
              const url = rid ? await mediaURL(rid) : null;
              const ext = c.getElementsByTagNameNS('http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing', 'extent')[0];
              const w = ext ? Math.round(parseInt(ext.getAttribute('cx'), 10) / PX_EMU) : null;
              if (url) inner += '<img src="' + url + '"' + (w ? ' style="width:' + w + 'px;max-width:100%"' : '') + '>';
            } else if (c.localName === 'sym') {
              const ch = attr(c, 'char');
              if (ch) inner += '&#x' + ch + ';';
            }
          }
          out += inner ? rs.open + inner + rs.close : '';
        } else if (ln === 'hyperlink') {
          const rid = n.getAttributeNS(R_NS, 'id') || n.getAttribute('r:id');
          const href = rid && rels[rid] ? rels[rid].target : (attr(n, 'anchor') ? '#' + attr(n, 'anchor') : '#');
          out += '<a href="' + esc(href) + '">' + (await runsHTML(n)) + '</a>';
        } else if (ln === 'ins' || ln === 'smartTag' || ln === 'fldSimple' || ln === 'customXml' || ln === 'sdt' || ln === 'sdtContent') {
          out += await runsHTML(ln === 'sdt' ? (child(n, 'sdtContent') || n) : n);
        }
      }
      return out;
    }

    function paraInfo(p) {
      const pPr = child(p, 'pPr');
      const info = { tag: 'p', style: [], dir: null, num: null };
      if (!pPr) return info;
      const sid = val(pPr, 'pStyle');
      const sname = sid ? (styleNames[sid] || sid.toLowerCase()) : '';
      const hm = /heading\s*(\d)/.exec(sname) || /^heading(\d)$/i.exec(sid || '');
      if (hm) info.tag = 'h' + Math.min(6, +hm[1]);
      else if (sname === 'title') info.tag = 'h1';
      else if (sname === 'subtitle') info.tag = 'h2';
      else if (/quote/.test(sname)) info.tag = 'blockquote';
      const rtl = on(pPr, 'bidi');
      info.dir = rtl ? 'rtl' : null;
      const jc = val(pPr, 'jc');
      if (jc === 'center') info.style.push('text-align:center');
      else if (jc === 'both' || jc === 'distribute') info.style.push('text-align:justify');
      else if (jc === 'right' || jc === 'end') info.style.push('text-align:' + (rtl ? 'left' : 'right'));
      else if (jc === 'left' || jc === 'start') info.style.push('text-align:' + (rtl ? 'right' : 'left'));
      const numPr = child(pPr, 'numPr');
      if (numPr) {
        const numId = val(numPr, 'numId');
        const lvl = parseInt(val(numPr, 'ilvl') || '0', 10);
        if (numId && numId !== '0') {
          const abs = numToAbs[numId];
          const fmt = abs != null && absFmt[abs] ? absFmt[abs][String(lvl)] : 'decimal';
          info.num = { id: numId, level: lvl, ordered: fmt !== 'bullet' && fmt !== 'none' };
        }
      }
      const ind = child(pPr, 'ind');
      if (ind && !info.num) {
        const start = parseInt(attr(ind, 'start') || (rtl ? attr(ind, 'right') : attr(ind, 'left')) || '0', 10);
        if (start > 0) info.style.push('margin-inline-start:' + Math.round(start / PX_TWIP) + 'px');
      }
      return info;
    }

    async function paraHTML(p) {
      const info = paraInfo(p);
      let inner = await runsHTML(p);
      const parts = inner.split('\u0000PB\u0000');
      const tagOpen = (info.tag) + (info.dir ? ' dir="rtl"' : '') + (info.style.length ? ' style="' + info.style.join(';') + '"' : '');
      const mk = (s) => '<' + tagOpen + '>' + (s.replace(/\t/g, '&emsp;') || '<br>') + '</' + info.tag + '>';
      if (parts.length > 1) return { html: parts.map(mk).join('<div class="page-break" contenteditable="false"></div>'), info };
      return { html: mk(parts[0]), info };
    }

    async function tableHTML(tbl) {
      const rows = Array.from(tbl.children).filter((c) => c.localName === 'tr');
      const tblPr = child(tbl, 'tblPr');
      const rtl = tblPr && on(tblPr, 'bidiVisual');
      // حساب دمج الصفوف العمودي
      const grid = rows.map((tr) => Array.from(tr.children).filter((c) => c.localName === 'tc'));
      let html = '<table' + (rtl ? ' dir="rtl"' : '') + '><tbody>';
      for (let ri = 0; ri < grid.length; ri++) {
        html += '<tr>';
        let col = 0;
        for (const tc of grid[ri]) {
          const tcPr = child(tc, 'tcPr');
          const gs = parseInt(tcPr ? val(tcPr, 'gridSpan') || '1' : '1', 10);
          const vm = tcPr ? child(tcPr, 'vMerge') : null;
          const vmVal = vm ? (attr(vm, 'val') || 'continue') : null;
          if (vmVal === 'continue') { col += gs; continue; }
          let rowspan = 1;
          if (vmVal === 'restart') {
            for (let rj = ri + 1; rj < grid.length; rj++) {
              let c2 = 0, found = false;
              for (const tc2 of grid[rj]) {
                const p2 = child(tc2, 'tcPr');
                const g2 = parseInt(p2 ? val(p2, 'gridSpan') || '1' : '1', 10);
                if (c2 === col) { const v2 = p2 ? child(p2, 'vMerge') : null; found = v2 && (attr(v2, 'val') || 'continue') === 'continue'; break; }
                c2 += g2;
              }
              if (found) rowspan++; else break;
            }
          }
          const shd = tcPr ? child(tcPr, 'shd') : null;
          const fill = shd ? attr(shd, 'fill') : null;
          let inner = '';
          for (const c of Array.from(tc.children)) {
            if (c.localName === 'p') inner += (await paraHTML(c)).html;
            else if (c.localName === 'tbl') inner += await tableHTML(c);
          }
          html += '<td' + (gs > 1 ? ' colspan="' + gs + '"' : '') + (rowspan > 1 ? ' rowspan="' + rowspan + '"' : '') + (fill && fill !== 'auto' ? ' style="background-color:#' + fill + '"' : '') + '>' + inner + '</td>';
          col += gs;
        }
        html += '</tr>';
      }
      return html + '</tbody></table>';
    }

    const body = doc.getElementsByTagNameNS(W_NS, 'body')[0];
    let html = '';
    const listStack = []; // [{tag, level}]
    const closeLists = (toLevel) => {
      while (listStack.length > toLevel) html += '</li></' + listStack.pop().tag + '>';
    };
    async function walk(container) {
      for (const n of Array.from(container.children)) {
        const ln = n.localName;
        if (ln === 'p') {
          const r = await paraHTML(n);
          if (r.info.num) {
            const lvl = r.info.num.level;
            const tag = r.info.num.ordered ? 'ol' : 'ul';
            if (listStack.length > lvl + 1) closeLists(lvl + 1);
            if (listStack.length === lvl + 1 && listStack[lvl].tag !== tag) closeLists(lvl);
            if (listStack.length === lvl + 1) html += '</li>';
            while (listStack.length < lvl + 1) { html += '<' + tag + (r.info.dir ? ' dir="rtl"' : '') + '>'; listStack.push({ tag, level: listStack.length }); }
            const liInner = r.html.replace(/^<[^>]+>/, '').replace(/<\/[a-z0-9]+>$/i, '');
            html += '<li>' + liInner;
          } else {
            closeLists(0);
            html += r.html;
          }
        } else if (ln === 'tbl') {
          closeLists(0);
          html += await tableHTML(n);
        } else if (ln === 'sdt') {
          await walk(child(n, 'sdtContent') || n);
        }
      }
    }
    await walk(body);
    closeLists(0);

    // إعداد الصفحة
    const sect = body.getElementsByTagNameNS(W_NS, 'sectPr');
    const page = {};
    const sp = sect[sect.length - 1];
    if (sp) {
      const sz = child(sp, 'pgSz'), mar = child(sp, 'pgMar');
      if (sz) {
        const w = parseInt(attr(sz, 'w'), 10) / MM_TWIP, h = parseInt(attr(sz, 'h'), 10) / MM_TWIP;
        page.orientation = w > h ? 'landscape' : 'portrait';
        page.width = Math.round(Math.min(w, h)); page.height = Math.round(Math.max(w, h));
      }
      if (mar) page.margins = { top: Math.round(+attr(mar, 'top') / MM_TWIP), right: Math.round(+attr(mar, 'right') / MM_TWIP), bottom: Math.round(+attr(mar, 'bottom') / MM_TWIP), left: Math.round(+attr(mar, 'left') / MM_TWIP) };
      page.dir = on(sp, 'bidi') ? 'rtl' : null;
    }
    return { html, page };
  }

  globalThis.WarshaDocx = { fromElement, toHTML };
})();
