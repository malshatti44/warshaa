// سيناريو اختبار طيف: استيراد صورة، إعداد جاهز، تعديل، قص، تصدير
const path = require('path');
module.exports = async ({ page, shot }) => {
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('.w-empty .w-btn').first().click()
  ]);
  await chooser.setFiles(path.join(__dirname, '..', 'fixtures', 'landscape.jpg'));
  await page.waitForTimeout(800);
  const n = await page.evaluate(() => window.__tayf.photos.length);
  if (n !== 1) throw new Error('photos: ' + n);
  await shot('imported');
  // إعداد جاهز سينمائي
  await page.locator('.t-preset', { hasText: 'سينمائي' }).click();
  await page.waitForTimeout(300);
  const s = await page.evaluate(() => window.__tayf.photos[0].settings);
  if (s.contrast !== 20) throw new Error('preset not applied');
  // تعديل التعريض
  await page.locator('.w-range-row', { hasText: 'التعريض' }).locator('input[type=number]').fill('0.6');
  await page.locator('.w-range-row', { hasText: 'التعريض' }).locator('input[type=number]').press('Enter');
  await page.waitForTimeout(200);
  if ((await page.evaluate(() => window.__tayf.photos[0].settings.exposure)) !== 0.6) throw new Error('exposure');
  await shot('developed');
  // قص 1:1
  await page.locator('[data-tip="y.crop"]').click();
  await page.locator('.w-btn', { hasText: '1:1' }).click();
  await page.waitForTimeout(200);
  await shot('crop');
  await page.locator('.w-btn.primary', { hasText: 'تم' }).click();
  await page.waitForTimeout(400);
  const dims = await page.evaluate(() => [window.__tayf.processed.width, window.__tayf.processed.height]);
  if (Math.abs(dims[0] - dims[1]) > 2) throw new Error('crop not square: ' + dims);
  // تصدير
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    (async () => {
      await page.locator('.w-toolbar .w-btn.primary').click();
      await page.locator('.w-dialog .w-btn.primary').click();
    })()
  ]);
  const size = require('fs').statSync(await dl.path()).size;
  if (size < 5000) throw new Error('export too small ' + size);
};
