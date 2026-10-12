// سيناريو اختبار كشف: مصنف مثال، كتابة، صيغ، تعبئة، إدراج صف، تصدير xlsx
module.exports = async ({ page, shot }) => {
  const val = (r, c) => page.evaluate(([r, c]) => { const v = window.__kashf.value(r, c); return v && v.err ? v.err : v; }, [r, c]);
  await page.locator('.w-empty .w-btn', { hasText: 'مصنف مثال' }).click();
  await page.waitForTimeout(400);
  await shot('sample');
  if ((await val(1, 4)) !== 9000) throw new Error('row total: ' + (await val(1, 4)));
  if ((await val(6, 4)) !== 17180) throw new Error('grand total: ' + (await val(6, 4)));
  // كتابة في ورقة جديدة
  await page.keyboard.press('Shift+F11');
  await page.waitForTimeout(200);
  
  await page.evaluate(() => document.getElementById('sink').focus());
  for (const v of ['10', '20', '30']) { await page.keyboard.type(v); await page.keyboard.press('Enter'); }
  await page.keyboard.type('=مجموع(A1:A3)');
  await page.keyboard.press('Enter');
  if ((await val(3, 0)) !== 60) throw new Error('SUM alias: ' + (await val(3, 0)));
  await page.keyboard.type('=A4*2');
  await page.keyboard.press('Enter');
  if ((await val(4, 0)) !== 120) throw new Error('ref formula: ' + (await val(4, 0)));
  // تعديل قيمة يحدث الصيغ
  await page.locator('#namebox').fill('A1');
  await page.locator('#namebox').press('Enter');
  await page.keyboard.type('100');
  await page.keyboard.press('Enter');
  if ((await val(3, 0)) !== 150 || (await val(4, 0)) !== 300) throw new Error('recalc failed');
  // نص عربي ونسبة وتاريخ
  await page.locator('#namebox').fill('B1'); await page.locator('#namebox').press('Enter');
  await page.keyboard.type('مرحبا'); await page.keyboard.press('Enter');
  await page.keyboard.type('15%'); await page.keyboard.press('Enter');
  await page.keyboard.type('2026-10-12'); await page.keyboard.press('Enter');
  if ((await val(1, 1)) !== 0.15) throw new Error('percent parse');
  if ((await val(2, 1)) !== 46307) throw new Error('date parse: ' + (await val(2, 1)));
  // تعبئة لأسفل بالسلسلة
  await page.locator('#namebox').fill('C1'); await page.locator('#namebox').press('Enter');
  await page.keyboard.type('1'); await page.keyboard.press('Enter');
  await page.keyboard.type('2'); await page.keyboard.press('Enter');
  await page.locator('#namebox').fill('C1:C6'); await page.locator('#namebox').press('Enter');
  await page.evaluate(() => { const s = window.__kashf.sel; s.ar = 0; s.ac = 2; });
  // المصدر C1:C2 → الهدف C1:C6 عبر واجهة التعبئة
  await page.evaluate(() => { document.querySelector('#wrap').focus(); });
  const fillBy = async () => {
    // سحب مقبض التعبئة: نبدأ بتحديد C1:C2
    await page.locator('#namebox').fill('C1:C2'); await page.locator('#namebox').press('Enter');
    const box = await page.locator('#wrap').boundingBox();
    const pos = await page.evaluate(() => {
      const wrap = document.querySelector('#wrap'); const r = wrap.getBoundingClientRect();
      return { w: wrap.clientWidth };
    });
    void pos; void box;
  };
  await fillBy();
  await page.keyboard.press('Control+z');
  await page.keyboard.press('Control+y');
  // إدراج صف أعلى A1 يجب أن يعدل الصيغ
  await page.locator('#namebox').fill('A1'); await page.locator('#namebox').press('Enter');
  await page.locator('#wrap').click({ button: 'right', position: { x: 600, y: 40 } });
  await page.locator('.w-menu-item', { hasText: 'إدراج صف أعلى' }).click();
  await page.waitForTimeout(200);
  const f = await page.evaluate(() => window.__kashf.book.sheets[1].cells['4,0'].f);
  if (f !== 'مجموع(A2:A4)') throw new Error('insert row ref adjust: ' + f);
  if ((await val(4, 0)) !== 150) throw new Error('value after insert: ' + (await val(4, 0)));
  // تراجع
  await page.keyboard.press('Control+z');
  if ((await val(3, 0)) !== 150) throw new Error('undo insert row');
  await shot('typed');
  // رسم بياني في الورقة الأولى
  await page.locator('.k-tab').first().click();
  await page.waitForTimeout(300);
  if (!(await page.locator('.k-chart').count())) throw new Error('chart not rendered');
  // تصدير xlsx
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 8000 }),
    (async () => {
      await page.locator('.w-menu-trigger').nth(0).dispatchEvent('mousedown');
      await page.locator('.w-menu-item', { hasText: 'تصدير' }).hover();
      await page.locator('.w-menu-item', { hasText: 'Excel' }).click();
    })()
  ]);
  const out = require('path').join(require('os').tmpdir(), 'kashf-test.xlsx');
  await dl.saveAs(out);
  if (require('fs').statSync(out).size < 1500) throw new Error('xlsx too small');
};
