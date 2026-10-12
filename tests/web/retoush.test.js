// سيناريو اختبار رتوش: مستند جديد، رسم، تعبئة، طبقات، تحديد، تعديلات، نص، تصدير
module.exports = async ({ page, shot }) => {
  await page.evaluate(() => window.__retoush.newDoc(800, 500, '#ffffff'));
  await page.waitForTimeout(300);
  const view = page.locator('#view');
  const box = await view.boundingBox();
  const doc2screen = async (x, y) => page.evaluate(([x, y]) => {
    const v = document.getElementById('view').getBoundingClientRect();
    const d = window.__retoush.doc;
    // تقريب: نعيد حساب من التحويل الداخلي عبر نقطة معروفة
    return null;
  }, [x, y]);
  void doc2screen;
  // رسم بالفرشاة
  await page.keyboard.press('b');
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  await page.mouse.move(cx - 150, cy - 40);
  await page.mouse.down();
  for (let i = 0; i <= 20; i++) await page.mouse.move(cx - 150 + i * 15, cy - 40 + Math.sin(i / 3) * 40);
  await page.mouse.up();
  const histLen = await page.evaluate(() => window.__retoush.history.list.length);
  if (histLen < 1) throw new Error('brush stroke not recorded');
  const px = await page.evaluate(() => { const c = window.__retoush.composite(); const g = c.getContext('2d'); const d = g.getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i + 2] > 150 && d[i] < 100) n++; return n; });
  if (px < 500) throw new Error('brush pixels: ' + px);
  // طبقة جديدة + شكل
  await page.evaluate(() => window.__retoush.addLayer());
  await page.keyboard.press('u');
  await page.mouse.move(cx + 60, cy + 30); await page.mouse.down(); await page.mouse.move(cx + 200, cy + 130, { steps: 4 }); await page.mouse.up();
  const layers = await page.evaluate(() => window.__retoush.doc.layers.length);
  if (layers !== 2) throw new Error('layers: ' + layers);
  // تحديد مستطيل وتعبئة
  await page.keyboard.press('m');
  await page.mouse.move(cx - 300, cy - 150); await page.mouse.down(); await page.mouse.move(cx - 200, cy - 80, { steps: 3 }); await page.mouse.up();
  const hasSel = await page.evaluate(() => !!window.__retoush.doc.sel);
  if (!hasSel) throw new Error('selection not created');
  await page.keyboard.press('Alt+Backspace');
  await shot('drawn');
  // تعديل السطوع عبر القائمة
  await page.locator('.w-menu-trigger', { hasText: 'صورة' }).dispatchEvent('mousedown');
  await page.locator('.w-menu-item', { hasText: 'تعديلات' }).hover();
  await page.locator('.w-menu-item', { hasText: 'السطوع والتباين' }).click();
  await page.waitForTimeout(200);
  await page.locator('.w-dialog input[type=range]').first().fill('40');
  await page.waitForTimeout(150);
  await shot('adjust');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.keyboard.press('Control+d');
  // نص
  await page.keyboard.press('t');
  await page.mouse.click(cx + 120, cy - 150);
  await page.waitForTimeout(300);
  await page.locator('.w-dialog textarea').fill('رتوش ورشة');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(200);
  const textLayer = await page.evaluate(() => window.__retoush.doc.layers.some((l) => l.text && l.text.content === 'رتوش ورشة'));
  if (!textLayer) throw new Error('text layer missing');
  // تراجع/إعادة
  const n0 = await page.evaluate(() => window.__retoush.doc.layers.length);
  await page.keyboard.press('Control+z');
  const n1 = await page.evaluate(() => window.__retoush.doc.layers.length);
  if (n1 !== n0 - 1) throw new Error('undo text layer');
  await page.keyboard.press('Control+y');
  await shot('final');
  // تصدير PNG
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 8000 }),
    (async () => {
      await page.locator('.w-menu-trigger').nth(0).dispatchEvent('mousedown');
      await page.locator('.w-menu-item', { hasText: 'تصدير' }).hover();
      await page.locator('.w-menu-item', { hasText: 'PNG' }).click();
    })()
  ]);
  const size = require('fs').statSync(await dl.path()).size;
  if (size < 2000) throw new Error('png too small: ' + size);
};
