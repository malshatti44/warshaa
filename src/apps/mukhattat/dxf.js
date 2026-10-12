/* مخطط — قراءة وكتابة ملفات DXF (ASCII) */
(function () {
  'use strict';
  // ألوان ACI الأساسية
  const ACI = { 1: '#ff0000', 2: '#ffff00', 3: '#00ff00', 4: '#00ffff', 5: '#0000ff', 6: '#ff00ff', 7: '#ffffff', 8: '#808080', 9: '#c0c0c0', 10: '#ff0000', 30: '#ff7f00', 40: '#ffbf00', 50: '#ffff00', 90: '#7fff00', 130: '#00ff7f', 150: '#00bfff', 170: '#0040ff', 190: '#7f00ff', 210: '#ff00bf', 250: '#333333', 251: '#505050', 252: '#696969', 253: '#828282', 254: '#bebebe', 255: '#ffffff' };
  function aciToHex(n) { n = Math.abs(n | 0); return ACI[n] || '#ffffff'; }
  function hexToAci(hex) {
    const c = String(hex || '#ffffff').replace('#', '');
    const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
    let best = 7, bd = Infinity;
    Object.entries(ACI).forEach(([k, v]) => {
      const rr = parseInt(v.slice(1, 3), 16), gg = parseInt(v.slice(3, 5), 16), bb = parseInt(v.slice(5, 7), 16);
      const d = (r - rr) ** 2 + (g - gg) ** 2 + (b - bb) ** 2;
      if (d < bd) { bd = d; best = +k; }
    });
    return best;
  }
  /** فك ترميز \U+XXXX ونصوص MTEXT البسيطة */
  function decodeText(s) {
    return String(s || '').replace(/\\U\+([0-9A-Fa-f]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\P/g, '\n').replace(/\\[A-Za-z][^;\\]*;/g, '').replace(/[{}]/g, '').replace(/%%c/gi, '⌀').replace(/%%d/gi, '°').replace(/%%p/gi, '±');
  }
  function encodeText(s) {
    return String(s || '').replace(/\n/g, ' ').replace(/[^\x20-\x7E]/g, (ch) => '\\U+' + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0'));
  }

  function parse(text) {
    const lines = String(text).replace(/\r/g, '').split('\n');
    const pairs = [];
    for (let i = 0; i + 1 < lines.length; i += 2) pairs.push([parseInt(lines[i].trim(), 10), lines[i + 1].replace(/\s+$/, '')]);
    const layers = {};
    const ents = [];
    let i = 0;
    let section = null;
    const next = () => pairs[i++];
    const peek = () => pairs[i];
    // قراءة كيان: نجمع أزواجه حتى الرمز 0 التالي
    const readEntity = () => {
      const props = [];
      while (i < pairs.length && pairs[i][0] !== 0) props.push(pairs[i++]);
      return props;
    };
    const get = (props, code, def) => { const p = props.find((x) => x[0] === code); return p ? p[1] : def; };
    const num = (props, code, def) => { const v = get(props, code, null); return v == null ? def : parseFloat(v); };
    while (i < pairs.length) {
      const [c, v] = next();
      if (c === 0 && v === 'SECTION') { const nm = next(); section = nm && nm[1]; continue; }
      if (c === 0 && v === 'ENDSEC') { section = null; continue; }
      if (c === 0 && v === 'EOF') break;
      if (section === 'TABLES' && c === 0 && v === 'LAYER') {
        const p = readEntity();
        const name = get(p, 2, null) != null ? decodeText(get(p, 2, null)) : null;
        if (name) { const col = num(p, 62, 7); layers[name] = { name, color: aciToHex(col), visible: col >= 0 }; }
        continue;
      }
      if ((section === 'ENTITIES' || section === 'BLOCKS') && c === 0) {
        if (section === 'BLOCKS') { readEntity(); continue; }
        const type = v;
        const p = readEntity();
        const layer = decodeText(get(p, 8, '0'));
        const col = get(p, 62, null);
        const base = { layer, color: col != null && +col !== 256 && +col !== 0 ? aciToHex(+col) : null };
        if (type === 'LINE') ents.push(Object.assign({ type: 'line', a: { x: num(p, 10, 0), y: num(p, 20, 0) }, b: { x: num(p, 11, 0), y: num(p, 21, 0) } }, base));
        else if (type === 'CIRCLE') ents.push(Object.assign({ type: 'circle', c: { x: num(p, 10, 0), y: num(p, 20, 0) }, r: num(p, 40, 1) }, base));
        else if (type === 'ARC') ents.push(Object.assign({ type: 'arc', c: { x: num(p, 10, 0), y: num(p, 20, 0) }, r: num(p, 40, 1), a0: num(p, 50, 0), a1: num(p, 51, 360) }, base));
        else if (type === 'POINT') ents.push(Object.assign({ type: 'point', p: { x: num(p, 10, 0), y: num(p, 20, 0) } }, base));
        else if (type === 'TEXT' || type === 'MTEXT') {
          let t = p.filter((x) => x[0] === 3).map((x) => x[1]).join('') + get(p, 1, '');
          ents.push(Object.assign({ type: 'text', p: { x: num(p, 10, 0), y: num(p, 20, 0) }, h: num(p, 40, 2.5), text: decodeText(t), rot: num(p, 50, 0), align: 'left' }, base));
        } else if (type === 'LWPOLYLINE') {
          const pts = [];
          let cur = null;
          p.forEach(([cc, vv]) => { if (cc === 10) { cur = { x: parseFloat(vv), y: 0 }; pts.push(cur); } else if (cc === 20 && cur) cur.y = parseFloat(vv); });
          const flags = num(p, 70, 0);
          if (pts.length >= 2) ents.push(Object.assign({ type: 'pline', pts, closed: !!(flags & 1) }, base));
        } else if (type === 'POLYLINE') {
          const flags = num(p, 70, 0);
          const pts = [];
          while (i < pairs.length && pairs[i][0] === 0 && pairs[i][1] === 'VERTEX') { i++; const vp = readEntity(); pts.push({ x: num(vp, 10, 0), y: num(vp, 20, 0) }); }
          if (i < pairs.length && pairs[i][1] === 'SEQEND') { i++; readEntity(); }
          if (pts.length >= 2) ents.push(Object.assign({ type: 'pline', pts, closed: !!(flags & 1) }, base));
        } else if (type === 'ELLIPSE') {
          // تقريب القطع الناقص بمضلع
          const cx = num(p, 10, 0), cy = num(p, 20, 0), mx = num(p, 11, 1), my = num(p, 21, 0), ratio = num(p, 40, 1);
          const t0 = num(p, 41, 0), t1 = num(p, 42, Math.PI * 2);
          const R = Math.hypot(mx, my), ang = Math.atan2(my, mx);
          const pts = [];
          const n = 72, span = (t1 - t0 + Math.PI * 4) % (Math.PI * 2) || Math.PI * 2;
          for (let k = 0; k <= n; k++) { const t = t0 + span * k / n; const ex = R * Math.cos(t), ey = R * ratio * Math.sin(t); pts.push({ x: cx + ex * Math.cos(ang) - ey * Math.sin(ang), y: cy + ex * Math.sin(ang) + ey * Math.cos(ang) }); }
          ents.push(Object.assign({ type: 'pline', pts, closed: Math.abs(span - Math.PI * 2) < 1e-6 }, base));
        }
        void peek;
        continue;
      }
    }
    return { layers: Object.values(layers), entities: ents };
  }

  function write(doc) {
    const out = [];
    const w = (c, v) => { out.push(String(c)); out.push(String(v)); };
    const f = (n) => (Math.round(n * 1e6) / 1e6).toString();
    w(0, 'SECTION'); w(2, 'HEADER');
    w(9, '$ACADVER'); w(1, 'AC1009');
    w(9, '$INSUNITS'); w(70, { mm: 4, cm: 5, m: 6 }[doc.units] || 4);
    w(0, 'ENDSEC');
    w(0, 'SECTION'); w(2, 'TABLES');
    w(0, 'TABLE'); w(2, 'LTYPE'); w(70, 1);
    w(0, 'LTYPE'); w(2, 'CONTINUOUS'); w(70, 0); w(3, 'Solid line'); w(72, 65); w(73, 0); w(40, 0);
    w(0, 'ENDTAB');
    w(0, 'TABLE'); w(2, 'LAYER'); w(70, doc.layers.length);
    doc.layers.forEach((l) => { w(0, 'LAYER'); w(2, encodeText(l.name)); w(70, 0); w(62, (l.visible === false ? -1 : 1) * hexToAci(l.color)); w(6, 'CONTINUOUS'); });
    w(0, 'ENDTAB');
    w(0, 'ENDSEC');
    w(0, 'SECTION'); w(2, 'ENTITIES');
    const common = (e) => { w(8, encodeText(e.layer || '0')); if (e.color) w(62, hexToAci(e.color)); };
    (doc.entities || []).forEach((e) => {
      if (e.type === 'line') { w(0, 'LINE'); common(e); w(10, f(e.a.x)); w(20, f(e.a.y)); w(30, 0); w(11, f(e.b.x)); w(21, f(e.b.y)); w(31, 0); }
      else if (e.type === 'circle') { w(0, 'CIRCLE'); common(e); w(10, f(e.c.x)); w(20, f(e.c.y)); w(30, 0); w(40, f(e.r)); }
      else if (e.type === 'arc') { w(0, 'ARC'); common(e); w(10, f(e.c.x)); w(20, f(e.c.y)); w(30, 0); w(40, f(e.r)); w(50, f(e.a0)); w(51, f(e.a1)); }
      else if (e.type === 'point') { w(0, 'POINT'); common(e); w(10, f(e.p.x)); w(20, f(e.p.y)); w(30, 0); }
      else if (e.type === 'text') { w(0, 'TEXT'); common(e); w(10, f(e.p.x)); w(20, f(e.p.y)); w(30, 0); w(40, f(e.h)); w(1, encodeText(e.text)); if (e.rot) w(50, f(e.rot)); }
      else if (e.type === 'pline') {
        w(0, 'POLYLINE'); common(e); w(66, 1); w(10, 0); w(20, 0); w(30, 0); w(70, e.closed ? 1 : 0);
        e.pts.forEach((p) => { w(0, 'VERTEX'); w(8, encodeText(e.layer || '0')); w(10, f(p.x)); w(20, f(p.y)); w(30, 0); });
        w(0, 'SEQEND'); w(8, encodeText(e.layer || '0'));
      } else if (e.type === 'lines') {
        e.list.forEach((l) => { w(0, 'LINE'); common(e); w(10, f(l.a.x)); w(20, f(l.a.y)); w(30, 0); w(11, f(l.b.x)); w(21, f(l.b.y)); w(31, 0); });
      }
    });
    w(0, 'ENDSEC');
    w(0, 'EOF');
    return out.join('\r\n') + '\r\n';
  }

  globalThis.WarshaDXF = { parse, write, aciToHex, hexToAci, decodeText, encodeText };
})();
