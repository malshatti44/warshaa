// سيناريو اختبار منبر: عرض مثال، تحرير نص، شكل، عرض تقديمي، تصدير PPTX
module.exports = async ({ page, shot }) => {
  await page.locator('.w-empty .w-btn', { hasText: 'عرض مثال' }).click();
  await page.waitForTimeout(500);
  await shot('sample');
  const n = await page.evaluate(() => window.__minbar.deck.slides.length);
  if (n !== 5) throw new Error('slides: ' + n);
  // الشريحة الثانية
  await page.locator('.mb-thumb').nth(1).click();
  await page.waitForTimeout(200);
  // مربع نص جديد
  await page.locator('[data-tip="m.textbox"]').click();
  await page.keyboard.type('نص جديد من الاختبار');
  await page.keyboard.press('Escape');
  const html = await page.evaluate(() => { const s = window.__minbar.deck.slides[1]; return s.objects[s.objects.length - 1].html; });
  if (!/نص جديد من الاختبار/.test(html)) throw new Error('text not saved: ' + html);
  // شكل
  await page.locator('[data-tip="m.shape"]').click();
  await page.locator('.w-menu-item', { hasText: 'نجمة' }).click();
  await page.waitForTimeout(200);
  const cnt = await page.evaluate(() => window.__minbar.deck.slides[1].objects.length);
  if (cnt < 4) throw new Error('shape not added');
  // سحب الشكل
  const box = await page.locator('.mb-sel').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2 + 40, { steps: 5 });
  await page.mouse.up();
  await shot('edit');
  // تراجع
  await page.keyboard.press('Control+z');
  // عرض تقديمي
  await page.keyboard.press('F5');
  await page.waitForTimeout(700);
  await shot('show');
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  if (await page.locator('#show:not(.hidden)').count()) throw new Error('show did not exit');
  // تصدير pptx
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 10000 }),
    (async () => {
      await page.locator('.w-menu-trigger').nth(0).dispatchEvent('mousedown');
      await page.locator('.w-menu-item', { hasText: 'تصدير' }).hover();
      await page.locator('.w-menu-item', { hasText: 'PowerPoint' }).click();
    })()
  ]);
  const out = require('path').join(require('os').tmpdir(), 'minbar-test.pptx');
  await dl.saveAs(out);
};
