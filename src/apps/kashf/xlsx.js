/* قراءة وكتابة ملفات XLSX لكشف (يعتمد على JSZip) */
(function () {
  'use strict';
  const F = globalThis.KashfFormula;
  const NS = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
  const RNS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const xmlText = (s) => esc(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
  const hex = (c) => 'FF' + String(c || '#000000').replace('#', '').toUpperCase().padEnd(6, '0').slice(0, 6);

  /* ══════════ الكتابة ══════════ */
  async function write(book, opts) {
    opts = opts || {};
    const zip = new JSZip();
    const zf = (n, d) => zip.file(n, d, { createFolders: false });
    const shared = [], sharedIdx = new Map();
    const sst = (s) => { s = String(s); if (!sharedIdx.has(s)) { sharedIdx.set(s, shared.length); shared.push(s); } return sharedIdx.get(s); };

    // الأنماط
    const fonts = ['<font><sz val="11"/><color rgb="FF000000"/><name val="Calibri"/><family val="2"/></font>'];
    const fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'];
    const borders = ['<border><left/><right/><top/><bottom/><diagonal/></border>'];
    const numFmts = [];
    const xfs = ['<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'];
    const keyIdx = { font: new Map(), fill: new Map(), border: new Map(), fmt: new Map(), xf: new Map() };
    const intern = (kind, list, xml, base) => { if (!keyIdx[kind].has(xml)) { keyIdx[kind].set(xml, list.length + (base || 0)); list.push(xml); } return keyIdx[kind].get(xml); };
    function numFmtId(st) {
      const fmt = st.fmt || 'general';
      const dec = st.dec != null ? st.dec : 2;
      const d = dec > 0 ? '.' + '0'.repeat(dec) : '';
      let code = null;
      if (fmt === 'general') return 0;
      if (fmt === 'text') return 49;
      if (fmt === 'number') code = '#,##0' + d;
      else if (fmt === 'currency') code = '"' + (st.cur || '$') + '" #,##0' + d;
      else if (fmt === 'percent') { if (dec === 0) return 9; if (dec === 2) return 10; code = '0' + d + '%'; }
      else if (fmt === 'date') code = 'yyyy-mm-dd';
      else if (fmt === 'time') code = 'hh:mm';
      else if (fmt === 'datetime') code = 'yyyy-mm-dd hh:mm';
      if (!code) return 0;
      const xml = '<numFmt numFmtId="{ID}" formatCode="' + esc(code) + '"/>';
      if (!keyIdx.fmt.has(code)) { const id = 164 + numFmts.length; keyIdx.fmt.set(code, id); numFmts.push(xml.replace('{ID}', id)); }
      return keyIdx.fmt.get(code);
    }
    function xfFor(st, rtl) {
      if (!st || !Object.keys(st).length) return 0;
      const fontXml = '<font>' + (st.b ? '<b/>' : '') + (st.i ? '<i/>' : '') + (st.s ? '<strike/>' : '') + (st.u ? '<u/>' : '') +
        '<sz val="' + (st.fs ? Math.round(st.fs * 0.75 * 2) / 2 : 11) + '"/><color rgb="' + hex(st.color || '#000000') + '"/><name val="' + esc(st.font || 'Calibri') + '"/><family val="2"/></font>';
      const fontId = intern('font', fonts, fontXml);
      let fillId = 0;
      if (st.bg) fillId = intern('fill', fills, '<fill><patternFill patternType="solid"><fgColor rgb="' + hex(st.bg) + '"/><bgColor indexed="64"/></patternFill></fill>');
      let borderId = 0;
      const bd = st.border;
      if (bd && (bd.t || bd.r || bd.b || bd.l)) {
        const x = '<border>' + (bd.l ? '<left style="thin"><color auto="1"/></left>' : '<left/>') + (bd.r ? '<right style="thin"><color auto="1"/></right>' : '<right/>') +
          (bd.t ? '<top style="thin"><color auto="1"/></top>' : '<top/>') + (bd.b ? '<bottom style="thin"><color auto="1"/></bottom>' : '<bottom/>') + '<diagonal/></border>';
        borderId = intern('border', borders, x);
      }
      const nf = numFmtId(st);
      let horiz = null;
      if (st.align === 'center') horiz = 'center';
      else if (st.align === 'start') horiz = rtl ? 'right' : 'left';
      else if (st.align === 'end') horiz = rtl ? 'left' : 'right';
      const vert = st.valign === 'top' ? 'top' : st.valign === 'middle' ? 'center' : null;
      const align = (horiz || vert || st.wrap) ? '<alignment' + (horiz ? ' horizontal="' + horiz + '"' : '') + (vert ? ' vertical="' + vert + '"' : '') + (st.wrap ? ' wrapText="1"' : '') + (rtl ? ' readingOrder="2"' : '') + '/>' : '';
      const xf = '<xf numFmtId="' + nf + '" fontId="' + fontId + '" fillId="' + fillId + '" borderId="' + borderId + '" xfId="0"' +
        (nf ? ' applyNumberFormat="1"' : '') + (fontId ? ' applyFont="1"' : '') + (fillId ? ' applyFill="1"' : '') + (borderId ? ' applyBorder="1"' : '') + (align ? ' applyAlignment="1">' + align + '</xf>' : '/>');
      return intern('xf', xfs, xf);
    }

    const sheetXml = [];
    book.sheets.forEach((sh, si) => {
      const keys = Object.keys(sh.cells);
      const byRow = new Map();
      for (const k of keys) {
        const [r, c] = k.split(',').map(Number);
        if (!byRow.has(r)) byRow.set(r, []);
        byRow.get(r).push(c);
      }
      const rows = Array.from(byRow.keys()).sort((a, b) => a - b);
      let data = '';
      const rowHs = new Set(Object.keys(sh.rowH || {}).map(Number));
      const allRows = Array.from(new Set(rows.concat(Array.from(rowHs)))).sort((a, b) => a - b);
      for (const r of allRows) {
        const ht = sh.rowH && sh.rowH[r] ? ' ht="' + (sh.rowH[r] * 0.75).toFixed(2) + '" customHeight="1"' : '';
        data += '<row r="' + (r + 1) + '"' + ht + '>';
        const cols = (byRow.get(r) || []).sort((a, b) => a - b);
        for (const c of cols) {
          const cell = sh.cells[r + ',' + c];
          const ref = F.addr(r, c);
          const s = xfFor(cell.style, sh.rtl);
          const sAttr = s ? ' s="' + s + '"' : '';
          const val = opts.valueOf ? opts.valueOf(si, r, c) : cell.v;
          if (cell.f) {
            const f = '<f>' + xmlText(F.toExcel(cell.f)) + '</f>';
            if (typeof val === 'number' && isFinite(val)) data += '<c r="' + ref + '"' + sAttr + '>' + f + '<v>' + val + '</v></c>';
            else if (typeof val === 'boolean') data += '<c r="' + ref + '"' + sAttr + ' t="b">' + f + '<v>' + (val ? 1 : 0) + '</v></c>';
            else if (F.isErr(val)) data += '<c r="' + ref + '"' + sAttr + ' t="e">' + f + '<v>' + esc(val.err) + '</v></c>';
            else data += '<c r="' + ref + '"' + sAttr + ' t="str">' + f + '<v>' + xmlText(val == null ? '' : val) + '</v></c>';
          } else if (typeof cell.v === 'number') data += '<c r="' + ref + '"' + sAttr + '><v>' + cell.v + '</v></c>';
          else if (typeof cell.v === 'boolean') data += '<c r="' + ref + '"' + sAttr + ' t="b"><v>' + (cell.v ? 1 : 0) + '</v></c>';
          else if (cell.v != null && cell.v !== '') data += '<c r="' + ref + '"' + sAttr + ' t="s"><v>' + sst(cell.v) + '</v></c>';
          else if (s) data += '<c r="' + ref + '"' + sAttr + '/>';
        }
        data += '</row>';
      }
      let cols = '';
      const cw = Object.keys(sh.colW || {}).map(Number).sort((a, b) => a - b);
      if (cw.length) cols = '<cols>' + cw.map((c) => '<col min="' + (c + 1) + '" max="' + (c + 1) + '" width="' + Math.max(1, (sh.colW[c] - 5) / 7).toFixed(2) + '" customWidth="1"/>').join('') + '</cols>';
      let pane = '';
      if (sh.freeze && (sh.freeze.r || sh.freeze.c)) {
        const fr = sh.freeze.r || 0, fc = sh.freeze.c || 0;
        pane = '<pane' + (fc ? ' xSplit="' + fc + '"' : '') + (fr ? ' ySplit="' + fr + '"' : '') + ' topLeftCell="' + F.addr(fr, fc) + '" activePane="' + (fr && fc ? 'bottomRight' : fr ? 'bottomLeft' : 'topRight') + '" state="frozen"/>';
      }
      const merges = (sh.merges || []).length ? '<mergeCells count="' + sh.merges.length + '">' + sh.merges.map((m) => '<mergeCell ref="' + F.addr(m.r1, m.c1) + ':' + F.addr(m.r2, m.c2) + '"/>').join('') + '</mergeCells>' : '';
      sheetXml.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="' + NS + '" xmlns:r="' + RNS + '">' +
        '<sheetViews><sheetView workbookViewId="0"' + (sh.rtl ? ' rightToLeft="1"' : '') + (si === book.active ? ' tabSelected="1"' : '') + '>' + pane + '</sheetView></sheetViews>' +
        '<sheetFormatPr defaultRowHeight="18"/>' + cols + '<sheetData>' + data + '</sheetData>' + merges + '</worksheet>');
    });

    const stylesXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="' + NS + '">' +
      (numFmts.length ? '<numFmts count="' + numFmts.length + '">' + numFmts.join('') + '</numFmts>' : '') +
      '<fonts count="' + fonts.length + '">' + fonts.join('') + '</fonts>' +
      '<fills count="' + fills.length + '">' + fills.join('') + '</fills>' +
      '<borders count="' + borders.length + '">' + borders.join('') + '</borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="' + xfs.length + '">' + xfs.join('') + '</cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
    const sstXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst xmlns="' + NS + '" count="' + shared.length + '" uniqueCount="' + shared.length + '">' +
      shared.map((s) => '<si><t xml:space="preserve">' + xmlText(s) + '</t></si>').join('') + '</sst>';
    const wbXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="' + NS + '" xmlns:r="' + RNS + '">' +
      '<bookViews><workbookView activeTab="' + (book.active || 0) + '"/></bookViews><sheets>' +
      book.sheets.map((s, i) => '<sheet name="' + esc(s.name.slice(0, 31)) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>').join('') +
      '</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>';
    const n = book.sheets.length;
    const wbRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      book.sheets.map((s, i) => '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>').join('') +
      '<Relationship Id="rId' + (n + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      '<Relationship Id="rId' + (n + 2) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>';
    zf('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      book.sheets.map((s, i) => '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join('') +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>' +
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>');
    zf('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>');
    zf('docProps/app.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>WARSHA Kashf</Application></Properties>');
    zf('xl/workbook.xml', wbXml);
    zf('xl/_rels/workbook.xml.rels', wbRels);
    zf('xl/styles.xml', stylesXml);
    zf('xl/sharedStrings.xml', sstXml);
    sheetXml.forEach((x, i) => zf('xl/worksheets/sheet' + (i + 1) + '.xml', x));
    return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  }

  /* ══════════ القراءة ══════════ */
  async function read(buffer) {
    const zip = await JSZip.loadAsync(buffer);
    const get = async (p) => { const f = zip.file(p.replace(/^\//, '')); return f ? f.async('string') : null; };
    const parse = (s) => new DOMParser().parseFromString(s, 'application/xml');
    const byTag = (el, tag) => Array.from(el.getElementsByTagNameNS(NS, tag));
    const child = (el, tag) => { for (const c of el.children) if (c.localName === tag) return c; return null; };
    const wb = parse(await get('xl/workbook.xml'));
    const relsDoc = parse((await get('xl/_rels/workbook.xml.rels')) || '<Relationships/>');
    const rels = {};
    Array.from(relsDoc.getElementsByTagName('Relationship')).forEach((r) => { rels[r.getAttribute('Id')] = r.getAttribute('Target'); });
    // السلاسل المشتركة
    const shared = [];
    const sstStr = await get('xl/sharedStrings.xml');
    if (sstStr) byTag(parse(sstStr), 'si').forEach((si) => shared.push(byTag(si, 't').filter((t) => !t.closest || !t.parentElement || t.parentElement.localName !== 'rPh').map((t) => t.textContent).join('')));
    // الأنماط
    const stylesStr = await get('xl/styles.xml');
    const xfStyles = [];
    if (stylesStr) {
      const st = parse(stylesStr);
      const customFmt = {};
      byTag(st, 'numFmt').forEach((n) => { customFmt[n.getAttribute('numFmtId')] = n.getAttribute('formatCode'); });
      const fontsEl = byTag(st, 'fonts')[0], fillsEl = byTag(st, 'fills')[0], bordersEl = byTag(st, 'borders')[0];
      const fonts = fontsEl ? Array.from(fontsEl.children) : [];
      const fills = fillsEl ? Array.from(fillsEl.children) : [];
      const borders = bordersEl ? Array.from(bordersEl.children) : [];
      const cellXfs = byTag(st, 'cellXfs')[0];
      (cellXfs ? Array.from(cellXfs.children) : []).forEach((xf) => {
        const s = {};
        const nf = parseInt(xf.getAttribute('numFmtId') || '0', 10);
        const code = customFmt[nf] || '';
        if ((nf >= 14 && nf <= 17) || nf === 22 || (code && /[yd]/i.test(code.replace(/"[^"]*"/g, '')) && !/h/i.test(code))) s.fmt = 'date';
        else if ((nf >= 18 && nf <= 21) || (nf >= 45 && nf <= 47) || (code && /h/i.test(code.replace(/"[^"]*"/g, '')))) s.fmt = /[yd]/i.test(code) ? 'datetime' : 'time';
        else if (nf === 9 || nf === 10 || /%/.test(code)) { s.fmt = 'percent'; s.dec = nf === 9 ? 0 : nf === 10 ? 2 : ((/\.(0+)/.exec(code) || [, ''])[1].length); }
        else if (nf === 49) s.fmt = 'text';
        else if ([3, 4, 37, 38, 39, 40].includes(nf) || /#,##0/.test(code)) {
          const cur = /"([^"]+)"|\[\$([^-\]]+)/.exec(code);
          s.fmt = cur ? 'currency' : 'number';
          if (cur) s.cur = (cur[1] || cur[2]).trim();
          s.dec = [4, 39, 40].includes(nf) ? 2 : nf === 3 || nf === 37 || nf === 38 ? 0 : ((/\.(0+)/.exec(code) || [, ''])[1].length);
        } else if (nf === 2) { s.fmt = 'number'; s.dec = 2; }
        const font = fonts[parseInt(xf.getAttribute('fontId') || '0', 10)];
        if (font && xf.getAttribute('fontId') !== '0') {
          if (child(font, 'b')) s.b = true;
          if (child(font, 'i')) s.i = true;
          if (child(font, 'u')) s.u = true;
          if (child(font, 'strike')) s.s = true;
          const sz = child(font, 'sz'); if (sz) { const pt = parseFloat(sz.getAttribute('val')); if (pt && pt !== 11) s.fs = Math.round(pt / 0.75); }
          const col = child(font, 'color'); if (col && col.getAttribute('rgb')) { const c = '#' + col.getAttribute('rgb').slice(-6).toLowerCase(); if (c !== '#000000') s.color = c; }
          const nm = child(font, 'name'); if (nm && !/^(Calibri|Arial|Aptos.*)$/i.test(nm.getAttribute('val'))) s.font = nm.getAttribute('val');
        }
        const fill = fills[parseInt(xf.getAttribute('fillId') || '0', 10)];
        if (fill) {
          const pf = child(fill, 'patternFill');
          if (pf && pf.getAttribute('patternType') === 'solid') { const fg = child(pf, 'fgColor'); if (fg && fg.getAttribute('rgb')) s.bg = '#' + fg.getAttribute('rgb').slice(-6).toLowerCase(); }
        }
        const bd = borders[parseInt(xf.getAttribute('borderId') || '0', 10)];
        if (bd) {
          const has = (side) => { const e = child(bd, side); return !!(e && e.getAttribute('style')); };
          const b = { l: has('left'), r: has('right'), t: has('top'), b: has('bottom') };
          if (b.l || b.r || b.t || b.b) s.border = b;
        }
        const al = child(xf, 'alignment');
        if (al) {
          const h = al.getAttribute('horizontal');
          if (h === 'center' || h === 'centerContinuous') s.align = 'center';
          else if (h === 'left') s.alignPhys = 'left';
          else if (h === 'right') s.alignPhys = 'right';
          const v = al.getAttribute('vertical');
          if (v === 'top') s.valign = 'top'; else if (v === 'center') s.valign = 'middle';
          if (al.getAttribute('wrapText') === '1') s.wrap = true;
        }
        xfStyles.push(s);
      });
    }
    const book = { sheets: [], active: 0 };
    const view = byTag(wb, 'workbookView')[0];
    if (view && view.getAttribute('activeTab')) book.active = parseInt(view.getAttribute('activeTab'), 10) || 0;
    for (const sh of byTag(wb, 'sheet')) {
      const name = sh.getAttribute('name');
      const rid = sh.getAttributeNS(RNS, 'id') || sh.getAttribute('r:id');
      let target = rels[rid] || '';
      target = target.startsWith('/') ? target.slice(1) : 'xl/' + target.replace(/^\.\//, '');
      const xml = await get(target);
      const sheet = { name, rtl: false, cells: {}, colW: {}, rowH: {}, merges: [], freeze: { r: 0, c: 0 }, charts: [], rows: 200, cols: 26 };
      if (!xml) { book.sheets.push(sheet); continue; }
      const d = parse(xml);
      const sv = byTag(d, 'sheetView')[0];
      if (sv && (sv.getAttribute('rightToLeft') === '1' || sv.getAttribute('rightToLeft') === 'true')) sheet.rtl = true;
      const pane = byTag(d, 'pane')[0];
      if (pane && pane.getAttribute('state') === 'frozen') sheet.freeze = { r: parseInt(pane.getAttribute('ySplit') || '0', 10), c: parseInt(pane.getAttribute('xSplit') || '0', 10) };
      byTag(d, 'col').forEach((c) => {
        const w = parseFloat(c.getAttribute('width'));
        if (!w || c.getAttribute('customWidth') !== '1' && !c.getAttribute('width')) return;
        const min = parseInt(c.getAttribute('min'), 10) - 1, max = Math.min(parseInt(c.getAttribute('max'), 10) - 1, min + 200);
        for (let i = min; i <= max; i++) sheet.colW[i] = Math.round(w * 7 + 5);
      });
      const sharedF = {};
      let maxR = 0, maxC = 0;
      for (const row of byTag(d, 'row')) {
        const ri = parseInt(row.getAttribute('r'), 10) - 1;
        if (row.getAttribute('customHeight') === '1' && row.getAttribute('ht')) sheet.rowH[ri] = Math.round(parseFloat(row.getAttribute('ht')) / 0.75);
        for (const c of Array.from(row.children)) {
          if (c.localName !== 'c') continue;
          const ref = F.parseAddr(c.getAttribute('r'));
          if (!ref) continue;
          const t = c.getAttribute('t');
          const vEl = child(c, 'v'), fEl = child(c, 'f');
          const cell = {};
          const styleIdx = parseInt(c.getAttribute('s') || '0', 10);
          const st = xfStyles[styleIdx] ? Object.assign({}, xfStyles[styleIdx]) : null;
          if (st && Object.keys(st).length) cell.style = st;
          if (fEl) {
            let ftext = fEl.textContent;
            if (fEl.getAttribute('t') === 'shared') {
              const si = fEl.getAttribute('si');
              if (ftext) sharedF[si] = { f: ftext, r: ref.r, c: ref.c };
              else if (sharedF[si]) ftext = F.shift(sharedF[si].f, ref.r - sharedF[si].r, ref.c - sharedF[si].c);
            }
            if (ftext) cell.f = ftext;
          }
          if (!cell.f) {
            if (t === 's') cell.v = shared[parseInt(vEl ? vEl.textContent : '0', 10)] || '';
            else if (t === 'inlineStr') { const is = child(c, 'is'); cell.v = is ? byTag(is, 't').map((x) => x.textContent).join('') : ''; }
            else if (t === 'b') cell.v = vEl ? vEl.textContent === '1' : false;
            else if (t === 'str' || t === 'e') cell.v = vEl ? vEl.textContent : '';
            else if (vEl) cell.v = parseFloat(vEl.textContent);
          }
          if (cell.v === undefined && !cell.f && !cell.style) continue;
          sheet.cells[ref.r + ',' + ref.c] = cell;
          maxR = Math.max(maxR, ref.r); maxC = Math.max(maxC, ref.c);
        }
      }
      byTag(d, 'mergeCell').forEach((m) => {
        const [a, b] = m.getAttribute('ref').split(':').map(F.parseAddr);
        if (a && b) sheet.merges.push({ r1: a.r, c1: a.c, r2: b.r, c2: b.c });
      });
      // تحويل المحاذاة الفيزيائية إلى منطقية حسب اتجاه الورقة
      for (const k in sheet.cells) {
        const s = sheet.cells[k].style;
        if (s && s.alignPhys) { s.align = (s.alignPhys === 'right') === sheet.rtl ? 'start' : 'end'; delete s.alignPhys; }
      }
      sheet.rows = Math.max(200, maxR + 50);
      sheet.cols = Math.max(26, maxC + 5);
      book.sheets.push(sheet);
    }
    if (!book.sheets.length) throw new Error('No sheets');
    book.active = Math.min(book.active, book.sheets.length - 1);
    return book;
  }

  /* ══════════ CSV ══════════ */
  function parseCSV(text) {
    text = text.replace(/^\uFEFF/, '');
    const first = text.split(/\r?\n/, 1)[0] || '';
    const counts = { ',': (first.match(/,/g) || []).length, ';': (first.match(/;/g) || []).length, '\t': (first.match(/\t/g) || []).length };
    const delim = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || ',';
    const rows = [];
    let row = [], field = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
        else field += ch;
      } else if (ch === '"') q = true;
      else if (ch === delim) { row.push(field); field = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(field); rows.push(row); row = []; field = ''; }
      else field += ch;
    }
    if (field || row.length) { row.push(field); rows.push(row); }
    return rows;
  }
  function toCSV(rows) {
    return '\uFEFF' + rows.map((r) => r.map((v) => { const s = v == null ? '' : String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\r\n');
  }

  globalThis.KashfXlsx = { write, read, parseCSV, toCSV };
})();
