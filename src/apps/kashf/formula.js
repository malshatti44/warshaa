/* محرك المعادلات لكشف — تحليل وتقييم صيغ متوافقة مع Excel مع أسماء دوال عربية بديلة */
(function () {
  'use strict';

  /* ───── عناوين الخلايا ───── */
  function colName(c) {
    let s = '';
    c = c + 1;
    while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); }
    return s;
  }
  function colIndex(name) {
    let n = 0;
    for (const ch of name.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
    return n - 1;
  }
  const addr = (r, c) => colName(c) + (r + 1);
  function parseAddr(a) {
    const m = /^\$?([A-Za-z]{1,3})\$?(\d+)$/.exec(a);
    return m ? { r: parseInt(m[2], 10) - 1, c: colIndex(m[1]) } : null;
  }

  /* ───── الأخطاء ───── */
  class FErr { constructor(code) { this.err = code; } toString() { return this.err; } }
  const ERR = {
    DIV0: new FErr('#DIV/0!'), VALUE: new FErr('#VALUE!'), REF: new FErr('#REF!'), NAME: new FErr('#NAME?'),
    NA: new FErr('#N/A'), NUM: new FErr('#NUM!'), CIRC: new FErr('#CIRC!'), NULL: new FErr('#NULL!')
  };
  const isErr = (v) => v instanceof FErr;

  /* ───── المحلل اللفظي ───── */
  const ID_CHAR = /[A-Za-z0-9_.$؀-ۿ٠-٩]/;
  function tokenize(src) {
    const t = [];
    let i = 0;
    const n = src.length;
    while (i < n) {
      const ch = src[i];
      if (/\s/.test(ch)) { i++; continue; }
      const start = i;
      if (ch === '"') {
        let s = ''; i++;
        while (i < n) {
          if (src[i] === '"') { if (src[i + 1] === '"') { s += '"'; i += 2; continue; } i++; break; }
          s += src[i++];
        }
        t.push({ type: 'str', v: s, s: start, e: i });
        continue;
      }
      if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(src[i + 1]))) {
        const m = /^(\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\.)/.exec(src.slice(i));
        // رقم يليه نقطتان = مرجع صفوف (غير مدعوم) — نعامله كرقم
        i += m[0].length;
        t.push({ type: 'num', v: parseFloat(m[0]), s: start, e: i });
        continue;
      }
      if (ch === "'" || ID_CHAR.test(ch)) {
        let sheet = null;
        if (ch === "'") {
          let s = ''; i++;
          while (i < n) { if (src[i] === "'") { if (src[i + 1] === "'") { s += "'"; i += 2; continue; } i++; break; } s += src[i++]; }
          if (src[i] === '!') { sheet = s; i++; } else { t.push({ type: 'err', v: ERR.NAME, s: start, e: i }); continue; }
        }
        let j = i;
        while (j < n && ID_CHAR.test(src[j])) j++;
        let word = src.slice(i, j);
        if (!sheet && src[j] === '!') { sheet = word; i = j + 1; j = i; while (j < n && ID_CHAR.test(src[j])) j++; word = src.slice(i, j); }
        i = j;
        let k = i; while (k < n && /\s/.test(src[k])) k++;
        if (/^\$?[A-Za-z]{1,3}\$?\d+$/.test(word)) {
          const m = /^(\$?)([A-Za-z]{1,3})(\$?)(\d+)$/.exec(word);
          t.push({ type: 'ref', sheet, c: colIndex(m[2]), r: parseInt(m[4], 10) - 1, absC: !!m[1], absR: !!m[3], s: start, e: i });
        } else if (!sheet && src[k] === '(') {
          t.push({ type: 'func', v: word.toUpperCase(), s: start, e: i });
        } else if (/^\$?[A-Za-z]{1,3}$/.test(word) && src[i] === ':') {
          const m = /^(\$?)([A-Za-z]{1,3})$/.exec(word);
          t.push({ type: 'colref', sheet, c: colIndex(m[2]), absC: !!m[1], s: start, e: i });
        } else if (/^(TRUE|FALSE|صح|خطأ)$/i.test(word) && !sheet) {
          t.push({ type: 'bool', v: /^(TRUE|صح)$/i.test(word), s: start, e: i });
        } else {
          t.push({ type: 'name', v: word, sheet, s: start, e: i });
        }
        continue;
      }
      if (ch === '#') {
        const m = /^#(DIV\/0!|VALUE!|REF!|NAME\?|N\/A|NUM!|NULL!|CIRC!)/i.exec(src.slice(i));
        if (m) { i += m[0].length; t.push({ type: 'err', v: new FErr(m[0].toUpperCase()), s: start, e: i }); continue; }
      }
      const two = src.slice(i, i + 2);
      if (two === '<=' || two === '>=' || two === '<>') { t.push({ type: 'op', v: two, s: start, e: i + 2 }); i += 2; continue; }
      if ('+-*/^&=<>%(),;:{}'.includes(ch)) { t.push({ type: ch === '(' || ch === ')' ? ch : (ch === ',' || ch === ';') ? 'sep' : ch === ':' ? ':' : 'op', v: ch, s: start, e: i + 1 }); i++; continue; }
      // محرف غير معروف
      t.push({ type: 'err', v: ERR.NAME, s: start, e: i + 1 });
      i++;
    }
    return t;
  }

  /* ───── المحلل النحوي ───── */
  function parse(src) {
    const toks = tokenize(src);
    let p = 0;
    const peek = () => toks[p];
    const next = () => toks[p++];
    const expect = (type) => { const t = next(); if (!t || t.type !== type) throw new FErr('#ERROR!'); return t; };
    function primary() {
      const t = next();
      if (!t) throw new FErr('#ERROR!');
      if (t.type === 'num') return { t: 'num', v: t.v };
      if (t.type === 'str') return { t: 'str', v: t.v };
      if (t.type === 'bool') return { t: 'bool', v: t.v };
      if (t.type === 'err') return { t: 'err', v: t.v };
      if (t.type === 'ref') {
        if (peek() && peek().type === ':') {
          next();
          const t2 = next();
          if (!t2 || t2.type !== 'ref') throw new FErr('#ERROR!');
          return { t: 'range', sheet: t.sheet, r1: Math.min(t.r, t2.r), c1: Math.min(t.c, t2.c), r2: Math.max(t.r, t2.r), c2: Math.max(t.c, t2.c) };
        }
        return { t: 'ref', sheet: t.sheet, r: t.r, c: t.c };
      }
      if (t.type === 'colref') {
        expect(':');
        const t2 = next();
        if (!t2 || (t2.type !== 'name' && t2.type !== 'colref')) throw new FErr('#ERROR!');
        const c2 = t2.type === 'colref' ? t2.c : colIndex(t2.v.replace(/\$/g, ''));
        return { t: 'range', sheet: t.sheet, r1: 0, c1: Math.min(t.c, c2), r2: 1e9, c2: Math.max(t.c, c2) };
      }
      if (t.type === 'func') {
        expect('(');
        const args = [];
        if (peek() && peek().type === ')') { next(); return { t: 'func', name: t.v, args }; }
        while (true) {
          if (peek() && (peek().type === 'sep' || peek().type === ')')) args.push({ t: 'empty' });
          else args.push(expr());
          const s = next();
          if (!s) throw new FErr('#ERROR!');
          if (s.type === ')') break;
          if (s.type !== 'sep') throw new FErr('#ERROR!');
        }
        return { t: 'func', name: t.v, args };
      }
      if (t.type === '(') { const e = expr(); expect(')'); return e; }
      if (t.type === 'op' && (t.v === '-' || t.v === '+')) { const a = unaryLevel(); return t.v === '-' ? { t: 'neg', a } : a; }
      if (t.type === 'op' && t.v === '{') {
        // مصفوفة ثابتة {1,2;3,4}
        const rows = [[]];
        while (peek() && !(peek().type === 'op' && peek().v === '}')) {
          const tk = next();
          if (tk.type === 'sep') { if (tk.v === ';') rows.push([]); continue; }
          if (tk.type === 'num') rows[rows.length - 1].push(tk.v);
          else if (tk.type === 'str') rows[rows.length - 1].push(tk.v);
          else if (tk.type === 'bool') rows[rows.length - 1].push(tk.v);
          else if (tk.type === 'op' && tk.v === '-' && peek() && peek().type === 'num') rows[rows.length - 1].push(-next().v);
        }
        next();
        return { t: 'array', v: rows };
      }
      if (t.type === 'name') return { t: 'err', v: ERR.NAME };
      throw new FErr('#ERROR!');
    }
    function postfix() {
      let a = primary();
      while (peek() && peek().type === 'op' && peek().v === '%') { next(); a = { t: 'pct', a }; }
      return a;
    }
    function unaryLevel() { return postfix(); }
    function power() {
      let a = unaryLevel();
      while (peek() && peek().type === 'op' && peek().v === '^') { next(); a = { t: 'bin', op: '^', a, b: unaryLevel() }; }
      return a;
    }
    function mul() {
      let a = power();
      while (peek() && peek().type === 'op' && (peek().v === '*' || peek().v === '/')) { const op = next().v; a = { t: 'bin', op, a, b: power() }; }
      return a;
    }
    function add() {
      let a = mul();
      while (peek() && peek().type === 'op' && (peek().v === '+' || peek().v === '-')) { const op = next().v; a = { t: 'bin', op, a, b: mul() }; }
      return a;
    }
    function concat() {
      let a = add();
      while (peek() && peek().type === 'op' && peek().v === '&') { next(); a = { t: 'bin', op: '&', a, b: add() }; }
      return a;
    }
    function compare() {
      let a = concat();
      while (peek() && peek().type === 'op' && ['=', '<>', '<', '>', '<=', '>='].includes(peek().v)) { const op = next().v; a = { t: 'bin', op, a, b: concat() }; }
      return a;
    }
    function expr() { return compare(); }
    const ast = expr();
    if (p < toks.length) throw new FErr('#ERROR!');
    return ast;
  }

  /* ───── التحويلات ───── */
  function toNum(v) {
    if (v == null || v === '') return 0;
    if (typeof v === 'number') return v;
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (isErr(v)) return v;
    const s = String(v).trim().replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/,/g, '');
    if (/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?%?$/i.test(s)) return s.endsWith('%') ? parseFloat(s) / 100 : parseFloat(s);
    return ERR.VALUE;
  }
  const toStr = (v) => (v == null ? '' : typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : typeof v === 'number' ? fmtGeneral(v) : String(v));
  function toBool(v) {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (v == null || v === '') return false;
    if (isErr(v)) return v;
    const s = String(v).toUpperCase();
    if (s === 'TRUE' || s === 'صح') return true;
    if (s === 'FALSE' || s === 'خطأ') return false;
    return ERR.VALUE;
  }
  function fmtGeneral(n) {
    if (!isFinite(n)) return '#NUM!';
    if (Number.isInteger(n) && Math.abs(n) < 1e15) return String(n);
    const a = Math.abs(n);
    if (a !== 0 && (a < 1e-9 || a >= 1e15)) return n.toExponential(5).replace(/\.?0+e/, 'e');
    return String(parseFloat(n.toPrecision(11)));
  }

  /* ───── التواريخ (رقم تسلسلي متوافق مع Excel) ───── */
  const EPOCH = Date.UTC(1899, 11, 30);
  const dateToSerial = (y, m, d) => (Date.UTC(y, m - 1, d) - EPOCH) / 86400000;
  function serialToDate(s) { const d = new Date(EPOCH + Math.round(s * 86400000)); return d; }

  /* ───── الدوال ───── */
  const ALIASES = {
    'مجموع': 'SUM', 'المجموع': 'SUM', 'متوسط': 'AVERAGE', 'المتوسط': 'AVERAGE', 'أكبر': 'MAX', 'اكبر': 'MAX', 'أصغر': 'MIN', 'اصغر': 'MIN',
    'عدد': 'COUNT', 'إذا': 'IF', 'اذا': 'IF', 'تقريب': 'ROUND', 'اليوم': 'TODAY', 'الآن': 'NOW', 'دمج': 'CONCAT', 'طول': 'LEN',
    'بحث_عمودي': 'VLOOKUP', 'مجموع_إذا': 'SUMIF', 'عد_إذا': 'COUNTIF', 'و': 'AND', 'أو': 'OR', 'ليس': 'NOT', 'مطلق': 'ABS', 'جذر': 'SQRT'
  };
  const FN = {};
  const flat = (args, opts) => {
    const out = [];
    for (const a of args) {
      if (a && a.range) { for (const row of a.range) for (const v of row) { if (opts && opts.keepEmpty) out.push(v); else if (v != null && v !== '') out.push(v); } }
      else out.push(a);
    }
    return out;
  };
  const nums = (args) => {
    const out = [];
    for (const a of args) {
      if (a && a.range) { for (const row of a.range) for (const v of row) if (typeof v === 'number') out.push(v); else if (isErr(v)) return v; }
      else { const n = toNum(a); if (isErr(n)) return n; out.push(n); }
    }
    return out;
  };
  const scalar = (a) => (a && a.range ? (a.range[0] ? a.range[0][0] : null) : a);
  function criteria(crit) {
    crit = scalar(crit);
    if (typeof crit === 'number' || typeof crit === 'boolean') return (v) => v === crit || (typeof v === 'string' && toNum(v) === crit);
    const s = String(crit == null ? '' : crit);
    const m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(s);
    const op = m[1] || '=', rhs = m[2];
    const rn = toNum(rhs);
    const isNumRhs = !isErr(rn) && rhs !== '';
    const wild = /[*?]/.test(rhs) ? new RegExp('^' + rhs.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i') : null;
    return (v) => {
      if (isNumRhs && typeof v === 'number') {
        switch (op) { case '=': return v === rn; case '<>': return v !== rn; case '<': return v < rn; case '>': return v > rn; case '<=': return v <= rn; case '>=': return v >= rn; }
      }
      const vs = toStr(v).toLowerCase(), rs = rhs.toLowerCase();
      if (op === '=') return wild ? wild.test(toStr(v)) : vs === rs;
      if (op === '<>') return wild ? !wild.test(toStr(v)) : vs !== rs;
      if (isNumRhs) return false;
      switch (op) { case '<': return vs < rs; case '>': return vs > rs; case '<=': return vs <= rs; case '>=': return vs >= rs; }
      return false;
    };
  }
  const grid = (a) => (a && a.range ? a.range : [[scalar(a)]]);
  const round = (n, d) => { const m = Math.pow(10, d); return Math.round((n + Number.EPSILON * Math.sign(n)) * m) / m; };

  Object.assign(FN, {
    SUM: (a) => { const n = nums(a); return isErr(n) ? n : n.reduce((s, x) => s + x, 0); },
    AVERAGE: (a) => { const n = nums(a); if (isErr(n)) return n; return n.length ? n.reduce((s, x) => s + x, 0) / n.length : ERR.DIV0; },
    MIN: (a) => { const n = nums(a); if (isErr(n)) return n; return n.length ? Math.min(...n) : 0; },
    MAX: (a) => { const n = nums(a); if (isErr(n)) return n; return n.length ? Math.max(...n) : 0; },
    COUNT: (a) => flat(a).filter((v) => typeof v === 'number').length,
    COUNTA: (a) => flat(a).filter((v) => v != null && v !== '').length,
    COUNTBLANK: (a) => flat(a, { keepEmpty: true }).filter((v) => v == null || v === '').length,
    PRODUCT: (a) => { const n = nums(a); return isErr(n) ? n : n.reduce((s, x) => s * x, 1); },
    MEDIAN: (a) => { const n = nums(a); if (isErr(n)) return n; if (!n.length) return ERR.NUM; n.sort((x, y) => x - y); const m = n.length >> 1; return n.length % 2 ? n[m] : (n[m - 1] + n[m]) / 2; },
    STDEV: (a) => { const n = nums(a); if (isErr(n)) return n; if (n.length < 2) return ERR.DIV0; const mu = n.reduce((s, x) => s + x, 0) / n.length; return Math.sqrt(n.reduce((s, x) => s + (x - mu) * (x - mu), 0) / (n.length - 1)); },
    VAR: (a) => { const n = nums(a); if (isErr(n)) return n; if (n.length < 2) return ERR.DIV0; const mu = n.reduce((s, x) => s + x, 0) / n.length; return n.reduce((s, x) => s + (x - mu) * (x - mu), 0) / (n.length - 1); },
    LARGE: (a) => { const n = nums([a[0]]); const k = toNum(scalar(a[1])); if (isErr(n)) return n; n.sort((x, y) => y - x); return n[k - 1] != null ? n[k - 1] : ERR.NUM; },
    SMALL: (a) => { const n = nums([a[0]]); const k = toNum(scalar(a[1])); if (isErr(n)) return n; n.sort((x, y) => x - y); return n[k - 1] != null ? n[k - 1] : ERR.NUM; },
    RANK: (a) => { const v = toNum(scalar(a[0])); const n = nums([a[1]]); if (isErr(n) || isErr(v)) return ERR.VALUE; const asc = a[2] && toNum(scalar(a[2])); n.sort((x, y) => (asc ? x - y : y - x)); const i = n.indexOf(v); return i < 0 ? ERR.NA : i + 1; },
    ROUND: (a) => { const n = toNum(scalar(a[0])), d = a[1] ? toNum(scalar(a[1])) : 0; if (isErr(n)) return n; return round(n, d); },
    ROUNDUP: (a) => { const n = toNum(scalar(a[0])), d = a[1] ? toNum(scalar(a[1])) : 0; if (isErr(n)) return n; const m = Math.pow(10, d); return Math.sign(n) * Math.ceil(Math.abs(n) * m - 1e-9) / m; },
    ROUNDDOWN: (a) => { const n = toNum(scalar(a[0])), d = a[1] ? toNum(scalar(a[1])) : 0; if (isErr(n)) return n; const m = Math.pow(10, d); return Math.sign(n) * Math.floor(Math.abs(n) * m + 1e-9) / m; },
    INT: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : Math.floor(n); },
    TRUNC: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : Math.trunc(n); },
    ABS: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : Math.abs(n); },
    SQRT: (a) => { const n = toNum(scalar(a[0])); if (isErr(n)) return n; return n < 0 ? ERR.NUM : Math.sqrt(n); },
    POWER: (a) => { const x = toNum(scalar(a[0])), y = toNum(scalar(a[1])); if (isErr(x)) return x; if (isErr(y)) return y; return Math.pow(x, y); },
    MOD: (a) => { const x = toNum(scalar(a[0])), y = toNum(scalar(a[1])); if (isErr(x)) return x; if (isErr(y)) return y; if (y === 0) return ERR.DIV0; return x - y * Math.floor(x / y); },
    PI: () => Math.PI,
    EXP: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : Math.exp(n); },
    LN: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : n <= 0 ? ERR.NUM : Math.log(n); },
    LOG10: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : n <= 0 ? ERR.NUM : Math.log10(n); },
    LOG: (a) => { const n = toNum(scalar(a[0])), b = a[1] ? toNum(scalar(a[1])) : 10; return isErr(n) ? n : n <= 0 ? ERR.NUM : Math.log(n) / Math.log(b); },
    RAND: () => Math.random(),
    RANDBETWEEN: (a) => { const lo = Math.ceil(toNum(scalar(a[0]))), hi = Math.floor(toNum(scalar(a[1]))); return lo + Math.floor(Math.random() * (hi - lo + 1)); },
    SIGN: (a) => { const n = toNum(scalar(a[0])); return isErr(n) ? n : Math.sign(n); },
    CEILING: (a) => { const n = toNum(scalar(a[0])), s = a[1] ? toNum(scalar(a[1])) : 1; return s ? Math.ceil(n / s) * s : 0; },
    FLOOR: (a) => { const n = toNum(scalar(a[0])), s = a[1] ? toNum(scalar(a[1])) : 1; return s ? Math.floor(n / s) * s : 0; },
    SUMPRODUCT: (a) => {
      const gs = a.map(grid);
      const rows = gs[0].length, cols = gs[0][0] ? gs[0][0].length : 0;
      let s = 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        let p = 1;
        for (const g of gs) { const v = g[r] && g[r][c]; p *= typeof v === 'number' ? v : 0; }
        s += p;
      }
      return s;
    },
    COUNTIF: (a) => { const f = criteria(a[1]); return flat([a[0]], { keepEmpty: true }).filter((v) => f(v)).length; },
    SUMIF: (a) => {
      const f = criteria(a[1]);
      const rg = grid(a[0]), sg = a[2] ? grid(a[2]) : rg;
      let s = 0;
      rg.forEach((row, r) => row.forEach((v, c) => { if (f(v)) { const x = sg[r] && sg[r][c]; if (typeof x === 'number') s += x; } }));
      return s;
    },
    AVERAGEIF: (a) => {
      const f = criteria(a[1]);
      const rg = grid(a[0]), sg = a[2] ? grid(a[2]) : rg;
      let s = 0, n = 0;
      rg.forEach((row, r) => row.forEach((v, c) => { if (f(v)) { const x = sg[r] && sg[r][c]; if (typeof x === 'number') { s += x; n++; } } }));
      return n ? s / n : ERR.DIV0;
    },
    SUMIFS: (a) => {
      const sg = grid(a[0]);
      const conds = [];
      for (let i = 1; i < a.length; i += 2) conds.push([grid(a[i]), criteria(a[i + 1])]);
      let s = 0;
      sg.forEach((row, r) => row.forEach((x, c) => { if (conds.every(([g, f]) => f(g[r] && g[r][c])) && typeof x === 'number') s += x; }));
      return s;
    },
    COUNTIFS: (a) => {
      const conds = [];
      for (let i = 0; i < a.length; i += 2) conds.push([grid(a[i]), criteria(a[i + 1])]);
      const g0 = conds[0][0];
      let n = 0;
      g0.forEach((row, r) => row.forEach((x, c) => { if (conds.every(([g, f]) => f(g[r] && g[r][c]))) n++; }));
      return n;
    },
    AND: (a) => { for (const v of flat(a)) { const b = toBool(v); if (isErr(b)) return b; if (!b) return false; } return true; },
    OR: (a) => { for (const v of flat(a)) { const b = toBool(v); if (isErr(b)) return b; if (b) return true; } return false; },
    NOT: (a) => { const b = toBool(scalar(a[0])); return isErr(b) ? b : !b; },
    XOR: (a) => flat(a).reduce((s, v) => s !== !!toBool(v), false),
    CONCAT: (a) => flat(a).map(toStr).join(''),
    CONCATENATE: (a) => flat(a).map(toStr).join(''),
    TEXTJOIN: (a) => { const d = toStr(scalar(a[0])), skip = toBool(scalar(a[1])); return flat(a.slice(2), { keepEmpty: true }).filter((v) => !(skip && (v == null || v === ''))).map(toStr).join(d); },
    LEN: (a) => toStr(scalar(a[0])).length,
    LEFT: (a) => toStr(scalar(a[0])).slice(0, a[1] ? toNum(scalar(a[1])) : 1),
    RIGHT: (a) => { const s = toStr(scalar(a[0])), n = a[1] ? toNum(scalar(a[1])) : 1; return n ? s.slice(-n) : ''; },
    MID: (a) => toStr(scalar(a[0])).substr(toNum(scalar(a[1])) - 1, toNum(scalar(a[2]))),
    UPPER: (a) => toStr(scalar(a[0])).toUpperCase(),
    LOWER: (a) => toStr(scalar(a[0])).toLowerCase(),
    PROPER: (a) => toStr(scalar(a[0])).toLowerCase().replace(/(^|\s)\S/g, (m) => m.toUpperCase()),
    TRIM: (a) => toStr(scalar(a[0])).replace(/\s+/g, ' ').trim(),
    REPT: (a) => toStr(scalar(a[0])).repeat(Math.max(0, toNum(scalar(a[1])))),
    SUBSTITUTE: (a) => { const s = toStr(scalar(a[0])), f = toStr(scalar(a[1])), r = toStr(scalar(a[2])); return f ? s.split(f).join(r) : s; },
    REPLACE: (a) => { const s = toStr(scalar(a[0])), st = toNum(scalar(a[1])) - 1, n = toNum(scalar(a[2])); return s.slice(0, st) + toStr(scalar(a[3])) + s.slice(st + n); },
    FIND: (a) => { const i = toStr(scalar(a[1])).indexOf(toStr(scalar(a[0])), a[2] ? toNum(scalar(a[2])) - 1 : 0); return i < 0 ? ERR.VALUE : i + 1; },
    SEARCH: (a) => { const i = toStr(scalar(a[1])).toLowerCase().indexOf(toStr(scalar(a[0])).toLowerCase(), a[2] ? toNum(scalar(a[2])) - 1 : 0); return i < 0 ? ERR.VALUE : i + 1; },
    VALUE: (a) => toNum(scalar(a[0])),
    TEXT: (a) => { const v = toNum(scalar(a[0])); const f = toStr(scalar(a[1])); if (isErr(v)) return toStr(scalar(a[0])); const m = /0(?:\.(0+))?/.exec(f); const dec = m && m[1] ? m[1].length : 0; let s = v.toFixed(dec); if (/#,##/.test(f)) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); if (/%/.test(f)) s = (v * 100).toFixed(dec) + '%'; return s; },
    ISBLANK: (a) => { const v = scalar(a[0]); return v == null || v === ''; },
    ISNUMBER: (a) => typeof scalar(a[0]) === 'number',
    ISTEXT: (a) => typeof scalar(a[0]) === 'string' && scalar(a[0]) !== '',
    ISERROR: (a) => isErr(scalar(a[0])),
    ISEVEN: (a) => toNum(scalar(a[0])) % 2 === 0,
    ISODD: (a) => Math.abs(toNum(scalar(a[0])) % 2) === 1,
    NA: () => ERR.NA,
    CHOOSE: (a) => { const i = toNum(scalar(a[0])); return a[i] != null ? scalar(a[i]) : ERR.VALUE; },
    TODAY: () => { const d = new Date(); return dateToSerial(d.getFullYear(), d.getMonth() + 1, d.getDate()); },
    NOW: () => { const d = new Date(); return dateToSerial(d.getFullYear(), d.getMonth() + 1, d.getDate()) + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400; },
    DATE: (a) => dateToSerial(toNum(scalar(a[0])), toNum(scalar(a[1])), toNum(scalar(a[2]))),
    YEAR: (a) => serialToDate(toNum(scalar(a[0]))).getUTCFullYear(),
    MONTH: (a) => serialToDate(toNum(scalar(a[0]))).getUTCMonth() + 1,
    DAY: (a) => serialToDate(toNum(scalar(a[0]))).getUTCDate(),
    WEEKDAY: (a) => serialToDate(toNum(scalar(a[0]))).getUTCDay() + 1,
    DAYS: (a) => toNum(scalar(a[0])) - toNum(scalar(a[1])),
    EDATE: (a) => { const d = serialToDate(toNum(scalar(a[0]))); return dateToSerial(d.getUTCFullYear(), d.getUTCMonth() + 1 + toNum(scalar(a[1])), d.getUTCDate()); },
    VLOOKUP: (a) => {
      const key = scalar(a[0]), g = grid(a[1]), col = toNum(scalar(a[2])), approx = a[3] == null ? true : toBool(scalar(a[3]));
      if (col < 1 || (g[0] && col > g[0].length)) return ERR.REF;
      return lookup(key, g.map((r) => r[0]), approx, (i) => g[i][col - 1]);
    },
    HLOOKUP: (a) => {
      const key = scalar(a[0]), g = grid(a[1]), row = toNum(scalar(a[2])), approx = a[3] == null ? true : toBool(scalar(a[3]));
      if (row < 1 || row > g.length) return ERR.REF;
      return lookup(key, g[0], approx, (i) => g[row - 1][i]);
    },
    XLOOKUP: (a) => {
      const key = scalar(a[0]), look = flat([a[1]], { keepEmpty: true }), ret = flat([a[2]], { keepEmpty: true });
      const i = look.findIndex((v) => eq(v, key));
      if (i < 0) return a[3] ? scalar(a[3]) : ERR.NA;
      return ret[i];
    },
    MATCH: (a) => {
      const key = scalar(a[0]), list = flat([a[1]], { keepEmpty: true }), type = a[2] == null ? 1 : toNum(scalar(a[2]));
      if (type === 0) { const i = list.findIndex((v) => eq(v, key)); return i < 0 ? ERR.NA : i + 1; }
      let best = -1;
      for (let i = 0; i < list.length; i++) { if (list[i] == null) continue; const c = cmp(list[i], key); if (type > 0 ? c <= 0 : c >= 0) best = i; else break; }
      return best < 0 ? ERR.NA : best + 1;
    },
    INDEX: (a) => {
      const g = grid(a[0]); let r = toNum(scalar(a[1])), c = a[2] ? toNum(scalar(a[2])) : 1;
      if (g.length === 1 && a[2] == null) { c = r; r = 1; }
      const row = g[r - 1];
      if (!row || row[c - 1] === undefined) return ERR.REF;
      return row[c - 1];
    },
    ROWS: (a) => grid(a[0]).length,
    COLUMNS: (a) => (grid(a[0])[0] || []).length,
    IFS: (a) => { for (let i = 0; i < a.length; i += 2) { const b = toBool(scalar(a[i])); if (isErr(b)) return b; if (b) return scalar(a[i + 1]); } return ERR.NA; },
    SWITCH: (a) => { const v = scalar(a[0]); for (let i = 1; i + 1 < a.length; i += 2) if (eq(v, scalar(a[i]))) return scalar(a[i + 1]); return a.length % 2 === 0 ? scalar(a[a.length - 1]) : ERR.NA; },
    UNIQUE: (a) => { const seen = new Set(); return flat([a[0]]).filter((v) => { const k = toStr(v); if (seen.has(k)) return false; seen.add(k); return true; }).length; }
  });
  FN.AVG = FN.AVERAGE;
  function eq(a, b) {
    if (typeof a === 'string' && typeof b === 'string') return a.toLowerCase() === b.toLowerCase();
    return a === b || (a != null && b != null && toStr(a) === toStr(b) && typeof a === typeof b);
  }
  function cmp(a, b) {
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    const sa = toStr(a).toLowerCase(), sb = toStr(b).toLowerCase();
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  }
  function lookup(key, list, approx, pick) {
    if (!approx) { const i = list.findIndex((v) => eq(v, key)); return i < 0 ? ERR.NA : pick(i); }
    let best = -1;
    for (let i = 0; i < list.length; i++) { if (list[i] == null || list[i] === '') continue; if (cmp(list[i], key) <= 0) best = i; else break; }
    return best < 0 ? ERR.NA : pick(best);
  }

  /* ───── المقي\u0651م ───── */
  /**
   * ctx: { getCell(sheetName|null, r, c) → value, sheetExists(name), maxRow(sheet), maxCol(sheet) }
   */
  function evaluate(ast, ctx) {
    const ev = (n) => {
      switch (n.t) {
        case 'num': case 'str': case 'bool': return n.v;
        case 'err': return n.v;
        case 'empty': return null;
        case 'array': return { range: n.v };
        case 'ref': {
          if (n.sheet && !ctx.sheetExists(n.sheet)) return ERR.REF;
          const v = ctx.getCell(n.sheet, n.r, n.c);
          return v;
        }
        case 'range': {
          if (n.sheet && !ctx.sheetExists(n.sheet)) return ERR.REF;
          const r2 = Math.min(n.r2, ctx.maxRow(n.sheet)), c2 = Math.min(n.c2, ctx.maxCol(n.sheet));
          const out = [];
          for (let r = n.r1; r <= r2; r++) { const row = []; for (let c = n.c1; c <= c2; c++) row.push(ctx.getCell(n.sheet, r, c)); out.push(row); }
          return { range: out };
        }
        case 'neg': { const v = toNum(scalar(ev(n.a))); return isErr(v) ? v : -v; }
        case 'pct': { const v = toNum(scalar(ev(n.a))); return isErr(v) ? v : v / 100; }
        case 'bin': {
          const a = scalar(ev(n.a)), b = scalar(ev(n.b));
          if (isErr(a)) return a;
          if (isErr(b)) return b;
          switch (n.op) {
            case '&': return toStr(a) + toStr(b);
            case '=': return eq(a == null ? (typeof b === 'number' ? 0 : '') : a, b == null ? (typeof a === 'number' ? 0 : '') : b);
            case '<>': return !eq(a == null ? '' : a, b == null ? '' : b);
            case '<': return cmp(a, b) < 0;
            case '>': return cmp(a, b) > 0;
            case '<=': return cmp(a, b) <= 0;
            case '>=': return cmp(a, b) >= 0;
          }
          const x = toNum(a), y = toNum(b);
          if (isErr(x)) return x;
          if (isErr(y)) return y;
          switch (n.op) {
            case '+': return x + y;
            case '-': return x - y;
            case '*': return x * y;
            case '/': return y === 0 ? ERR.DIV0 : x / y;
            case '^': return Math.pow(x, y);
          }
          return ERR.VALUE;
        }
        case 'func': {
          const name = ALIASES[n.name] || ALIASES[n.name.toLowerCase()] || n.name;
          if (name === 'IF') {
            const c = toBool(scalar(ev(n.args[0])));
            if (isErr(c)) return c;
            if (c) return n.args[1] ? scalar(ev(n.args[1])) : true;
            return n.args[2] ? scalar(ev(n.args[2])) : false;
          }
          if (name === 'IFERROR' || name === 'IFNA') {
            const v = scalar(ev(n.args[0]));
            if (isErr(v) && (name === 'IFERROR' || v.err === '#N/A')) return n.args[1] ? scalar(ev(n.args[1])) : '';
            return v;
          }
          const fn = FN[name];
          if (!fn) return ERR.NAME;
          const args = n.args.map((a) => (a.t === 'empty' ? null : ev(a)));
          for (const a of args) if (isErr(a) && !['ISERROR', 'ISBLANK', 'ISNUMBER', 'ISTEXT', 'COUNT', 'COUNTA'].includes(name)) return a;
          try {
            const r = fn(args);
            if (typeof r === 'number' && !isFinite(r)) return ERR.NUM;
            return r === undefined ? null : r;
          } catch (e) { return ERR.VALUE; }
        }
      }
      return ERR.VALUE;
    };
    const v = ev(ast);
    if (v && v.range) return v.range.length === 1 && v.range[0].length === 1 ? v.range[0][0] : (v.range[0] ? v.range[0][0] : null);
    return v;
  }

  /* ───── إعادة كتابة المراجع (النسخ، الإدراج، الحذف) ───── */
  /** يمر على رموز الصيغة ويستبدل المراجع؛ fn(tok) يرجع نص\u064Bا جديد\u064Bا أو null للإبقاء */
  function rewriteRefs(src, fn) {
    let toks;
    try { toks = tokenize(src); } catch (e) { return src; }
    let out = '', last = 0;
    for (const t of toks) {
      if (t.type !== 'ref' && t.type !== 'colref') continue;
      const rep = fn(t);
      if (rep == null) continue;
      out += src.slice(last, t.s) + rep;
      last = t.e;
    }
    return out + src.slice(last);
  }
  const quoteSheet = (s) => (s == null ? '' : (/^[A-Za-z_؀-ۿ][\w؀-ۿ.]*$/.test(s) ? s : "'" + s.replace(/'/g, "''") + "'") + '!');
  function refText(t, r, c) {
    if (t.type === 'colref') return quoteSheet(t.sheet) + (t.absC ? '$' : '') + colName(c);
    return quoteSheet(t.sheet) + (t.absC ? '$' : '') + colName(c) + (t.absR ? '$' : '') + (r + 1);
  }
  /** إزاحة المراجع النسبية بمقدار dr, dc */
  function shift(src, dr, dc) {
    return rewriteRefs(src, (t) => {
      const r = t.type === 'ref' && !t.absR ? t.r + dr : t.r;
      const c = !t.absC ? t.c + dc : t.c;
      if ((t.type === 'ref' && r < 0) || c < 0) return '#REF!';
      return refText(t, r, c);
    });
  }
  /** تعديل المراجع عند إدراج/حذف صفوف أو أعمدة في ورقة sheetName */
  function adjustInsert(src, ownSheet, sheetName, axis, at, count) {
    return rewriteRefs(src, (t) => {
      const target = t.sheet || ownSheet;
      if (target !== sheetName) return null;
      let r = t.r, c = t.c;
      if (axis === 'row' && t.type === 'ref') {
        if (count > 0 && r >= at) r += count;
        if (count < 0) { if (r >= at && r < at - count) return '#REF!'; if (r >= at - count) r += count; }
      }
      if (axis === 'col') {
        if (count > 0 && c >= at) c += count;
        if (count < 0) { if (c >= at && c < at - count) return '#REF!'; if (c >= at - count) c += count; }
      }
      if (r === t.r && c === t.c) return null;
      return refText(t, r, c);
    });
  }
  /** تحويل الأسماء العربية والفواصل المنقوطة إلى صيغة Excel القياسية */
  function toExcel(src) {
    let toks;
    try { toks = tokenize(src); } catch (e) { return src; }
    let out = '', last = 0;
    for (const t of toks) {
      let rep = null;
      if (t.type === 'func' && ALIASES[src.slice(t.s, t.e)]) rep = ALIASES[src.slice(t.s, t.e)];
      else if (t.type === 'sep' && t.v === ';') rep = ',';
      else if (t.type === 'bool' && /[^\x00-\x7f]/.test(src.slice(t.s, t.e))) rep = t.v ? 'TRUE' : 'FALSE';
      if (rep == null) continue;
      out += src.slice(last, t.s) + rep;
      last = t.e;
    }
    return out + src.slice(last);
  }
  function refsOf(src) {
    try { return tokenize(src).filter((t) => t.type === 'ref' || t.type === 'colref'); } catch (e) { return []; }
  }

  globalThis.KashfFormula = {
    colName, colIndex, addr, parseAddr, tokenize, parse, evaluate, shift, adjustInsert, toExcel, refsOf,
    FErr, ERR, isErr, toNum, toStr, toBool, fmtGeneral, dateToSerial, serialToDate,
    functions: () => Object.keys(FN).concat(['IF', 'IFERROR', 'IFNA']).sort(),
    aliases: ALIASES
  };
})();
