// سيناريو اختبار مخطط: رسم بالأوامر العربية والإحداثيات، التقاط، قص، إزاحة، أبعاد، DXF
module.exports = async ({ page, shot }) => {
  await page.locator('.w-empty .w-btn.primary').click();
  await page.waitForTimeout(300);
  const M = (fn, arg) => page.evaluate(fn, arg);
  const type = async (t) => { await page.keyboard.type(t); await page.keyboard.press('Enter'); await page.waitForTimeout(30); };
  const ents = () => M(() => window.__mukhattat.D.entities.map((e) => ({ type: e.type, layer: e.layer })));
  // مستطيل بالأمر العربي وإحداثيات نسبية
  await page.locator('#cmdinput').focus();
  await type('مستطيل'); await type('0,0'); await type('@100,60');
  let e = await ents();
  if (e.length !== 1 || e[0].type !== 'pline') throw new Error('rect ' + JSON.stringify(e));
  // خطوط بالأمر L وإحداثيات قطبية
  await type('l'); await type('-20,30'); await type('@140<0'); await page.keyboard.press('Escape');
  await type('L'); await type('50,-20'); await type('50,80'); await page.keyboard.press('Escape');
  // دائرة بنصف قطر مكتوب
  await type('دائرة'); await type('50,30'); await type('15');
  e = await ents();
  if (e.length !== 4) throw new Error('entities ' + e.length);
  await M(() => window.__mukhattat.zoomExtents());
  await shot('drawing');
  // التقاط نقطة النهاية بالماوس: خط من ركن المستطيل
  const P = (x, y) => M(([a, b]) => { const s = window.__mukhattat.w2s({ x: a, y: b }); const r = document.querySelector('#cad').getBoundingClientRect(); return { x: r.left + s.x, y: r.top + s.y }; }, [x, y]);
  await type('l');
  let q = await P(100.6, 60.4);
  await page.mouse.move(q.x, q.y); await page.mouse.click(q.x, q.y);
  await type('@0,25'); await page.keyboard.press('Escape');
  const snapped = await M(() => { const l = window.__mukhattat.D.entities[4]; return l.a; });
  if (Math.abs(snapped.x - 100) > 1e-6 || Math.abs(snapped.y - 60) > 1e-6) throw new Error('endpoint snap ' + JSON.stringify(snapped));
  // قص الجزء الأوسط من الخط الأفقي داخل الدائرة
  await type('قص');
  q = await P(50, 30);
  // الجزء بين تقاطعي الدائرة والخط العمودي: نقرة عند x=44
  q = await P(44, 30);
  await page.mouse.click(q.x, q.y);
  await page.keyboard.press('Escape');
  const lines = await M(() => window.__mukhattat.D.entities.filter((x) => x.type === 'line' && Math.abs(x.a.y - 30) < 1e-6 && Math.abs(x.b.y - 30) < 1e-6).map((l) => [Math.round(Math.min(l.a.x, l.b.x) * 100) / 100, Math.round(Math.max(l.a.x, l.b.x) * 100) / 100]));
  if (!lines.some((l) => l[1] === 35) || !lines.some((l) => l[0] === 50)) throw new Error('trim ' + JSON.stringify(lines));
  // إزاحة متوازية للمستطيل للداخل
  await type('o'); await type('5');
  q = await P(100, 10); await page.mouse.click(q.x, q.y);
  q = await P(80, 15); await page.mouse.click(q.x, q.y);
  await page.keyboard.press('Escape');
  const off = await M(() => { const p = window.__mukhattat.D.entities.filter((x) => x.type === 'pline'); return p.length > 1 ? p[1].pts : null; });
  if (!off || Math.abs(Math.min(...off.map((p) => p.x)) - 5) > 1e-6 || Math.abs(Math.max(...off.map((p) => p.y)) - 55) > 1e-6) throw new Error('offset ' + JSON.stringify(off));
  // بُعد
  await type('بعد'); await type('0,0'); await type('100,0'); await type('50,-12');
  const dim = await M(() => window.__mukhattat.D.entities.find((x) => x.type === 'dim'));
  if (!dim || Math.abs(dim.off + 12) > 1e-6) throw new Error('dim ' + JSON.stringify(dim));
  // تراجع وإعادة
  const n0 = (await ents()).length;
  await page.keyboard.press('Control+z');
  if ((await ents()).length !== n0 - 1) throw new Error('undo');
  await page.keyboard.press('Control+y');
  // نص عربي
  await type('نص'); await type('10,70'); await type('6');
  await page.locator('.w-dialog input').fill('غرفة المعيشة');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(200);
  await M(() => window.__mukhattat.zoomExtents());
  await shot('final');
  // DXF: كتابة ثم قراءة
  const rt = await M(() => { const txt = WarshaDXF.write(window.__mukhattat.dxfDoc()); const r = WarshaDXF.parse(txt); return { n: r.entities.length, text: (r.entities.find((x) => x.type === 'text' && /غرفة/.test(x.text)) || {}).text, head: txt.slice(0, 40) }; });
  if (rt.text !== 'غرفة المعيشة' || rt.n < 8) throw new Error('dxf ' + JSON.stringify(rt));
  // SVG للطباعة
  const svg = await M(() => window.__mukhattat.exportSVGString().svg);
  if (!svg.includes('<polygon') || !svg.includes('غرفة المعيشة')) throw new Error('svg');
};
