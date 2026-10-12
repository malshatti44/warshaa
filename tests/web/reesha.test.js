// سيناريو اختبار ريشة: لوحة جديدة، أشكال، قلم، نص عربي، تجميع، تراجع، تصدير
module.exports = async ({ page, shot }) => {
  await page.locator('.w-empty .w-btn.primary').click();
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(300);
  const R = (x, y) => page.evaluate(([a, b]) => window.__reesha.toScreen(a, b), [x, y]);
  const dragDoc = async (x1, y1, x2, y2, mods) => {
    const a = await R(x1, y1), b = await R(x2, y2);
    for (const m of mods || []) await page.keyboard.down(m);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    await page.mouse.move((a.x + b.x) / 2, (a.y + b.y) / 2, { steps: 4 });
    await page.mouse.move(b.x, b.y, { steps: 4 }); await page.mouse.up();
    for (const m of mods || []) await page.keyboard.up(m);
  };
  const count = () => page.evaluate(() => window.__reesha.doc.objects.length);
  // مستطيل
  await page.keyboard.press('r');
  await dragDoc(100, 100, 500, 400);
  if ((await count()) !== 1) throw new Error('rect not created');
  const rect = await page.evaluate(() => window.__reesha.doc.objects[0]);
  if (rect.type !== 'rect' || Math.abs(rect.w - 400) > 2) throw new Error('rect geometry ' + JSON.stringify(rect));
  // استدارة الزوايا من لوحة الخصائص
  await page.locator('.w-range-row', { hasText: 'استدارة الزوايا' }).locator('input[type=number]').fill('40');
  await page.locator('.w-range-row', { hasText: 'استدارة الزوايا' }).locator('input[type=number]').press('Enter');
  if ((await page.evaluate(() => window.__reesha.doc.objects[0].rx)) !== 40) throw new Error('corner radius');
  // دائرة ونجمة
  const blank = await R(-20, -20);
  await page.mouse.click(blank.x, blank.y);
  await page.keyboard.press('e');
  await dragDoc(600, 120, 900, 420, ['Shift']);
  await page.keyboard.press('s');
  await dragDoc(620, 560, 960, 900);
  if ((await count()) !== 3) throw new Error('shapes: ' + (await count()));
  const circ = await page.evaluate(() => window.__reesha.doc.objects[1]);
  if (Math.abs(circ.w - circ.h) > 1) throw new Error('shift did not constrain circle');
  // قلم بمنحنيات ثم إغلاق المسار
  await page.keyboard.press('p');
  const pts = [[120, 600], [300, 520], [420, 700], [260, 900]];
  for (let i = 0; i < pts.length; i++) {
    const a = await R(pts[i][0], pts[i][1]);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    if (i % 2) await page.mouse.move(a.x + 40, a.y + 10, { steps: 3 });
    await page.mouse.up();
  }
  const f = await R(120, 600);
  await page.mouse.click(f.x, f.y);
  const path = await page.evaluate(() => window.__reesha.doc.objects[3]);
  if (!path || path.type !== 'path' || !path.closed || path.nodes.length !== 4 || !path.nodes[1].cout) throw new Error('pen path ' + JSON.stringify(path));
  // نص عربي
  await page.keyboard.press('t');
  const tp = await R(540, 1000);
  await page.mouse.click(tp.x, tp.y);
  await page.locator('.w-dialog textarea').fill('ورشة للتصميم');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(300);
  const txt = await page.evaluate(() => window.__reesha.doc.objects[4]);
  if (!txt || txt.type !== 'text' || txt.content !== 'ورشة للتصميم') throw new Error('text ' + JSON.stringify(txt));
  const dir = await page.evaluate(() => document.querySelector('#root text').getAttribute('direction'));
  if (dir !== 'rtl') throw new Error('arabic text not rtl');
  await shot('drawing');
  // تحديد الكل ثم تجميع ثم تراجع
  await page.mouse.click(5, 300); // تركيز
  await page.keyboard.press('v');
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Control+g');
  if ((await count()) !== 1) throw new Error('group failed: ' + (await count()));
  await page.keyboard.press('Control+z');
  if ((await count()) !== 5) throw new Error('undo group: ' + (await count()));
  // تحريك المستطيل بالسحب
  await page.keyboard.press('Escape');
  const before = await page.evaluate(() => window.__reesha.doc.objects[0].x);
  await dragDoc(300, 150, 340, 190);
  const after = await page.evaluate(() => window.__reesha.doc.objects[0].x);
  if (Math.abs(after - before - 40) > 2) throw new Error('move ' + before + ' -> ' + after);
  // تدرج لوني
  await page.locator('.e-paint').first().locator('.w-seg button').nth(2).click();
  const fill = await page.evaluate(() => window.__reesha.doc.objects[0].fill);
  if (!fill || fill.type !== 'linear') throw new Error('gradient');
  await shot('selected');
  // تصدير SVG
  const svgText = await page.evaluate(() => window.__reesha.exportSVGString());
  if (!svgText.includes('<rect') || !svgText.includes('linearGradient') || !svgText.includes('ورشة للتصميم') || svgText.includes('data-id')) throw new Error('svg export');
  // PNG
  const png = await page.evaluate(async () => { const c = await window.__reesha.renderPNG(1); const d = c.getContext('2d').getImageData(300, 300, 1, 1).data; return [c.width, d[3]]; });
  if (png[0] !== 1080 || png[1] !== 255) throw new Error('png ' + png);
  // وضع العقد
  await page.keyboard.press('Escape');
  await page.keyboard.press('a');
  const pp = await R(300, 520);
  await page.mouse.click(pp.x, pp.y);
  await page.waitForTimeout(100);
  await shot('nodes');
};
