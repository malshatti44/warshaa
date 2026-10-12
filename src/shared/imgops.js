/* عمليات معالجة الصور المشتركة (رتوش، طيف، ومضة) — تعمل على ImageData و Canvas */
(function () {
  'use strict';
  const clamp8 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

  function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
    }
    return [h, s, l];
  }
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  function hsl2rgb(h, s, l) {
    if (s === 0) { const v = l * 255; return [v, v, v]; }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255];
  }

  /**
   * تطبيق مجموعة تعديلات لونية دفعة واحدة على ImageData (في مكانها)
   * p: { exposure(-3..3), brightness(-100..100), contrast(-100..100), highlights, shadows, whites, blacks (-100..100),
   *      temperature(-100..100), tint(-100..100), saturation(-100..100), vibrance(-100..100), hue(-180..180),
   *      gamma(0.2..3), clarity? (ي\u064Fعالج خارجي\u064Bا), fade(0..100), grayscale(bool), sepia(0..100), invert(bool) }
   */
  function adjust(img, p) {
    const d = img.data;
    const ex = Math.pow(2, p.exposure || 0);
    const br = (p.brightness || 0) * 1.28;
    const ct = (p.contrast || 0) / 100;
    const cf = ct >= 0 ? 1 + ct * 1.5 : 1 + ct;
    const temp = (p.temperature || 0) / 100, tint = (p.tint || 0) / 100;
    const sat = 1 + (p.saturation || 0) / 100;
    const vib = (p.vibrance || 0) / 100;
    const hue = (p.hue || 0) / 360;
    const hi = (p.highlights || 0) / 100, sh = (p.shadows || 0) / 100, wh = (p.whites || 0) / 100, bl = (p.blacks || 0) / 100;
    const gamma = p.gamma || 1;
    const fade = (p.fade || 0) / 100;
    const sepia = (p.sepia || 0) / 100;
    // جدول بحث للتوهين اللوني (المنحنى) لتسريع العمليات الأحادية
    const lut = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      let v = i / 255;
      v = v * ex;
      // الظلال والإضاءات
      const lum = v;
      if (sh) v += sh * 0.5 * Math.pow(1 - Math.min(1, lum), 2) * (1 - lum) * 1.2;
      if (hi) v += hi * 0.5 * Math.pow(Math.min(1, lum), 2) * 0.8 * (hi < 0 ? 1 : (1 - lum) + 0.3);
      if (wh) v += wh * 0.25 * Math.pow(Math.min(1, lum), 3);
      if (bl) v += bl * 0.25 * Math.pow(1 - Math.min(1, lum), 3);
      v = (v - 0.5) * cf + 0.5;
      v += br / 255;
      if (gamma !== 1) v = Math.pow(Math.max(0, v), 1 / gamma);
      if (fade) v = v * (1 - fade * 0.25) + fade * 0.12;
      lut[i] = v * 255;
    }
    const needHSL = hue !== 0 || sat !== 1 || vib !== 0;
    for (let i = 0; i < d.length; i += 4) {
      let r = lut[d[i]], g = lut[d[i + 1]], b = lut[d[i + 2]];
      if (temp) { r += temp * 30; b -= temp * 30; }
      if (tint) { g -= tint * 25; r += tint * 8; b += tint * 8; }
      if (needHSL) {
        if (vib || sat !== 1) {
          const avg = (r + g + b) / 3;
          const mx = Math.max(r, g, b);
          let s2 = sat;
          if (vib) s2 *= 1 + vib * (1 - (mx - avg) / 128) * 0.8;
          r = avg + (r - avg) * s2; g = avg + (g - avg) * s2; b = avg + (b - avg) * s2;
        }
        if (hue) {
          const hsl = rgb2hsl(clamp8(r), clamp8(g), clamp8(b));
          const c = hsl2rgb((hsl[0] + hue + 1) % 1, hsl[1], hsl[2]);
          r = c[0]; g = c[1]; b = c[2];
        }
      }
      if (p.grayscale) { const y = 0.299 * r + 0.587 * g + 0.114 * b; r = g = b = y; }
      if (sepia) {
        const nr = r * 0.393 + g * 0.769 + b * 0.189, ng = r * 0.349 + g * 0.686 + b * 0.168, nb = r * 0.272 + g * 0.534 + b * 0.131;
        r = r + (nr - r) * sepia; g = g + (ng - g) * sepia; b = b + (nb - b) * sepia;
      }
      if (p.invert) { r = 255 - r; g = 255 - g; b = 255 - b; }
      d[i] = clamp8(r); d[i + 1] = clamp8(g); d[i + 2] = clamp8(b);
    }
    return img;
  }

  /** تعديل HSL حسب نطاقات الألوان الثمانية: bands = {red:{h,s,l}, orange, yellow, green, aqua, blue, purple, magenta} */
  const BANDS = [['red', 0], ['orange', 30], ['yellow', 60], ['green', 120], ['aqua', 180], ['blue', 225], ['purple', 270], ['magenta', 315]];
  function hslBands(img, bands) {
    const active = BANDS.filter(([k]) => bands[k] && (bands[k].h || bands[k].s || bands[k].l));
    if (!active.length) return img;
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const hsl = rgb2hsl(d[i], d[i + 1], d[i + 2]);
      if (hsl[1] < 0.04) continue;
      const hue = hsl[0] * 360;
      let dh = 0, ds = 0, dl = 0;
      for (const [k, c] of active) {
        let dist = Math.abs(hue - c); if (dist > 180) dist = 360 - dist;
        const wgt = dist >= 45 ? 0 : 1 - dist / 45;
        if (!wgt) continue;
        const b = bands[k];
        dh += (b.h || 0) * wgt; ds += (b.s || 0) * wgt; dl += (b.l || 0) * wgt;
      }
      if (!dh && !ds && !dl) continue;
      const h = ((hue + dh * 0.6) % 360 + 360) % 360 / 360;
      const s2 = Math.max(0, Math.min(1, hsl[1] * (1 + ds / 100)));
      const l2 = Math.max(0, Math.min(1, hsl[2] + dl / 100 * 0.35 * hsl[1]));
      const c = hsl2rgb(h, s2, l2);
      d[i] = clamp8(c[0]); d[i + 1] = clamp8(c[1]); d[i + 2] = clamp8(c[2]);
    }
    return img;
  }
  /** حبيبات فيلمية */
  function grain(img, amount, size) {
    if (!amount) return img;
    const d = img.data, w = img.width, a = amount * 0.9, sz = Math.max(1, size | 0);
    for (let i = 0; i < d.length; i += 4) {
      const p = i / 4, x = p % w, y = (p - x) / w;
      const seed = Math.sin(Math.floor(x / sz) * 12.9898 + Math.floor(y / sz) * 78.233) * 43758.5453;
      const n = ((seed - Math.floor(seed)) - 0.5) * a;
      d[i] = clamp8(d[i] + n); d[i + 1] = clamp8(d[i + 1] + n); d[i + 2] = clamp8(d[i + 2] + n);
    }
    return img;
  }

  /** التفاف (convolution) 3×3 */
  function convolve(img, k, divisor, offset) {
    const w = img.width, h = img.height, src = img.data;
    const out = new Uint8ClampedArray(src.length);
    divisor = divisor || k.reduce((a, b) => a + b, 0) || 1;
    offset = offset || 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let r = 0, g = 0, b = 0;
        for (let ky = -1; ky <= 1; ky++) {
          const yy = Math.min(h - 1, Math.max(0, y + ky));
          for (let kx = -1; kx <= 1; kx++) {
            const xx = Math.min(w - 1, Math.max(0, x + kx));
            const wgt = k[(ky + 1) * 3 + (kx + 1)];
            const i = (yy * w + xx) * 4;
            r += src[i] * wgt; g += src[i + 1] * wgt; b += src[i + 2] * wgt;
          }
        }
        const o = (y * w + x) * 4;
        out[o] = r / divisor + offset; out[o + 1] = g / divisor + offset; out[o + 2] = b / divisor + offset; out[o + 3] = src[o + 3];
      }
    }
    img.data.set(out);
    return img;
  }
  function sharpen(img, amount) {
    const a = amount == null ? 1 : amount;
    const copy = new ImageData(new Uint8ClampedArray(img.data), img.width, img.height);
    convolve(copy, [0, -1, 0, -1, 5, -1, 0, -1, 0], 1);
    const d = img.data, s = copy.data;
    for (let i = 0; i < d.length; i += 4) { d[i] += (s[i] - d[i]) * a; d[i + 1] += (s[i + 1] - d[i + 1]) * a; d[i + 2] += (s[i + 2] - d[i + 2]) * a; }
    return img;
  }
  function emboss(img) { return convolve(img, [-2, -1, 0, -1, 1, 1, 0, 1, 2], 1, 0); }
  function edges(img) {
    convolve(img, [-1, -1, -1, -1, 8, -1, -1, -1, -1], 1, 0);
    return img;
  }
  function noise(img, amount, mono) {
    const d = img.data, a = (amount || 20) * 2.55;
    for (let i = 0; i < d.length; i += 4) {
      if (mono) { const n = (Math.random() - 0.5) * a; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
      else { d[i] += (Math.random() - 0.5) * a; d[i + 1] += (Math.random() - 0.5) * a; d[i + 2] += (Math.random() - 0.5) * a; }
    }
    return img;
  }
  function pixelate(img, size) {
    const w = img.width, h = img.height, d = img.data;
    size = Math.max(2, size | 0);
    for (let by = 0; by < h; by += size) for (let bx = 0; bx < w; bx += size) {
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let y = by; y < Math.min(h, by + size); y++) for (let x = bx; x < Math.min(w, bx + size); x++) { const i = (y * w + x) * 4; r += d[i]; g += d[i + 1]; b += d[i + 2]; a += d[i + 3]; n++; }
      r /= n; g /= n; b /= n; a /= n;
      for (let y = by; y < Math.min(h, by + size); y++) for (let x = bx; x < Math.min(w, bx + size); x++) { const i = (y * w + x) * 4; d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = a; }
    }
    return img;
  }
  function threshold(img, t) {
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) { const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]; const v = y >= t ? 255 : 0; d[i] = d[i + 1] = d[i + 2] = v; }
    return img;
  }
  function posterize(img, levels) {
    const d = img.data, n = Math.max(2, levels | 0), step = 255 / (n - 1);
    for (let i = 0; i < d.length; i += 4) { d[i] = Math.round(d[i] / step) * step; d[i + 1] = Math.round(d[i + 1] / step) * step; d[i + 2] = Math.round(d[i + 2] / step) * step; }
    return img;
  }
  function vignette(img, amount, size) {
    const w = img.width, h = img.height, d = img.data;
    const a = (amount || 50) / 100, s = 0.3 + (size == null ? 50 : size) / 100 * 0.7;
    const cx = w / 2, cy = h / 2, maxD = Math.sqrt(cx * cx + cy * cy);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) / maxD;
      const f = dist <= s ? 1 : 1 - a * Math.pow((dist - s) / (1 - s), 2);
      const i = (y * w + x) * 4;
      d[i] *= f; d[i + 1] *= f; d[i + 2] *= f;
    }
    return img;
  }
  /** تمويه سريع بالاعتماد على مرشحات Canvas */
  function blurCanvas(canvas, radius) {
    const c = document.createElement('canvas');
    c.width = canvas.width; c.height = canvas.height;
    const g = c.getContext('2d');
    g.filter = 'blur(' + radius + 'px)';
    // توسيع الحواف لتفادي الإطار الشفاف
    g.drawImage(canvas, 0, 0);
    g.filter = 'none';
    return c;
  }
  /** وضوح محلي (clarity) عبر قناع التمويه */
  function clarity(img, amount) {
    if (!amount) return img;
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    c.getContext('2d').putImageData(img, 0, 0);
    const blurred = blurCanvas(c, Math.max(2, Math.round(Math.min(img.width, img.height) / 120))).getContext('2d').getImageData(0, 0, img.width, img.height).data;
    const d = img.data, a = amount / 100 * 0.8;
    for (let i = 0; i < d.length; i += 4) {
      const l = (d[i] + d[i + 1] + d[i + 2]) / 765;
      const mid = 1 - Math.abs(l - 0.5) * 2;
      const k = a * mid;
      d[i] = clamp8(d[i] + (d[i] - blurred[i]) * k);
      d[i + 1] = clamp8(d[i + 1] + (d[i + 1] - blurred[i + 1]) * k);
      d[i + 2] = clamp8(d[i + 2] + (d[i + 2] - blurred[i + 2]) * k);
    }
    return img;
  }
  /** المدرج التكراري للقنوات */
  function histogram(img, step) {
    const d = img.data, r = new Uint32Array(256), g = new Uint32Array(256), b = new Uint32Array(256), l = new Uint32Array(256);
    step = step || 4;
    for (let i = 0; i < d.length; i += 4 * step) {
      if (d[i + 3] < 8) continue;
      r[d[i]]++; g[d[i + 1]]++; b[d[i + 2]]++;
      l[Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2])]++;
    }
    return { r, g, b, l };
  }
  function drawHistogram(canvas, h) {
    const g = canvas.getContext('2d');
    const w = canvas.width, ht = canvas.height;
    g.clearRect(0, 0, w, ht);
    let max = 1;
    for (let i = 1; i < 255; i++) max = Math.max(max, h.r[i], h.g[i], h.b[i]);
    g.globalCompositeOperation = 'screen';
    [['r', 'rgba(255,60,60,.75)'], ['g', 'rgba(60,220,90,.75)'], ['b', 'rgba(70,120,255,.75)']].forEach(([k, col]) => {
      g.fillStyle = col;
      g.beginPath(); g.moveTo(0, ht);
      for (let i = 0; i < 256; i++) g.lineTo(i / 255 * w, ht - Math.min(1, h[k][i] / max) * ht);
      g.lineTo(w, ht); g.closePath(); g.fill();
    });
    g.globalCompositeOperation = 'source-over';
  }
  /** منطقة متصلة متشابهة اللون: يرجع مصفوفة (1 = ضمن المنطقة) وحدودها */
  function region(img, x, y, tolerance) {
    const w = img.width, h = img.height, d = img.data;
    x = x | 0; y = y | 0;
    if (x < 0 || y < 0 || x >= w || y >= h) return null;
    const i0 = (y * w + x) * 4;
    const tr = d[i0], tg = d[i0 + 1], tb = d[i0 + 2], ta = d[i0 + 3];
    const tol = (tolerance || 0) * 2.55;
    const inR = new Uint8Array(w * h);
    const match = (p) => {
      const i = p * 4;
      return Math.abs(d[i] - tr) <= tol && Math.abs(d[i + 1] - tg) <= tol && Math.abs(d[i + 2] - tb) <= tol && Math.abs(d[i + 3] - ta) <= tol;
    };
    const stack = [y * w + x];
    let minX = x, maxX = x, minY = y, maxY = y;
    while (stack.length) {
      const p = stack.pop();
      if (inR[p]) continue;
      const py = Math.floor(p / w);
      let l = p - py * w, r = l;
      while (l > 0 && !inR[py * w + l - 1] && match(py * w + l - 1)) l--;
      while (r < w - 1 && !inR[py * w + r + 1] && match(py * w + r + 1)) r++;
      for (let xx = l; xx <= r; xx++) {
        const q = py * w + xx;
        inR[q] = 1;
        if (py > 0 && !inR[q - w] && match(q - w)) stack.push(q - w);
        if (py < h - 1 && !inR[q + w] && match(q + w)) stack.push(q + w);
      }
      if (l < minX) minX = l; if (r > maxX) maxX = r; if (py < minY) minY = py; if (py > maxY) maxY = py;
    }
    return { mask: inR, x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
  }
  /** تعبئة متصلة (دلو الطلاء) — selMask اختياري (قناع التحديد بقيم ألفا) */
  function floodFill(img, x, y, color, tolerance, selMask) {
    const r = region(img, x, y, tolerance);
    if (!r) return null;
    const d = img.data;
    for (let q = 0; q < r.mask.length; q++) {
      if (!r.mask[q]) continue;
      const a = selMask ? selMask[q * 4 + 3] / 255 : 1;
      if (!a) continue;
      const i = q * 4;
      d[i] += (color[0] - d[i]) * a; d[i + 1] += (color[1] - d[i + 1]) * a; d[i + 2] += (color[2] - d[i + 2]) * a; d[i + 3] += (color[3] - d[i + 3]) * a;
    }
    return { x: r.x, y: r.y, w: r.w, h: r.h };
  }
  /** تحديد بالعصا السحرية: يرجع قناع\u064Bا (ImageData) */
  function magicWand(img, x, y, tolerance) {
    const r = region(img, x, y, tolerance);
    const out = new ImageData(img.width, img.height);
    if (!r) return out;
    for (let q = 0; q < r.mask.length; q++) if (r.mask[q]) out.data[q * 4 + 3] = 255;
    return out;
  }
  function cloneCanvas(c) {
    const n = document.createElement('canvas');
    n.width = c.width; n.height = c.height;
    n.getContext('2d').drawImage(c, 0, 0);
    return n;
  }
  function makeCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
    return c;
  }
  globalThis.WarshaImg = { adjust, convolve, sharpen, emboss, edges, noise, pixelate, threshold, posterize, vignette, blurCanvas, clarity, histogram, drawHistogram, floodFill, magicWand, region, hslBands, grain, BANDS, cloneCanvas, makeCanvas, rgb2hsl, hsl2rgb };
})();
