// سيناريو اختبار ومضة: قالب، تحرير نص مباشر، إضافة عناصر، صفحات، تصدير PNG
const path = require('path');
module.exports = async ({ page, shot }) => {
  await shot('welcome');
  // ابدأ من قالب "عرض خاص"
  await page.locator('.m-welcome .m-tcard', { hasText: 'عرض خاص' }).click();
  await page.waitForTimeout(500);
  const n0 = await page.evaluate(() => window.__wamda.doc.pages[0].els.length);
  if (n0 !== 7) throw new Error('template elements: ' + n0);
  await shot('template');
  const W = () => page.evaluate(() => window.__wamda.doc);
  const R = (x, y) => page.evaluate(([a, b]) => window.__wamda.toScreen(a, b), [x, y]);
  // نقر مزدوج على النص الكبير لتحريره
  const big = await page.evaluate(() => window.__wamda.doc.pages[0].els[3]);
  const c = await R(big.x + big.w / 2, big.y + big.h / 2);
  await page.mouse.dblclick(c.x, c.y);
  await page.waitForTimeout(150);
  if ((await page.evaluate(() => window.__wamda.editing)) !== big.id) throw new Error('not editing');
  await page.keyboard.type('خصم 70%');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const html = (await W()).pages[0].els[3].html;
  if (html !== 'خصم 70%') throw new Error('edited text: ' + html);
  // سحب نص لتحريكه مع الالتصاق بمركز الصفحة
  const sub = (await W()).pages[0].els[4];
  const s1 = await R(sub.x + sub.w / 2, sub.y + sub.h / 2);
  await page.mouse.move(s1.x, s1.y); await page.mouse.down();
  await page.mouse.move(s1.x + 20, s1.y + 40, { steps: 5 });
  await page.mouse.move(s1.x + 2, s1.y + 80, { steps: 5 });
  await page.mouse.up();
  const sub2 = (await W()).pages[0].els[4];
  if (Math.abs(sub2.x + sub2.w / 2 - 540) > 0.5) throw new Error('snap to center failed ' + (sub2.x + sub2.w / 2));
  if (sub2.y <= sub.y + 50) throw new Error('move failed');
  // تبويب العناصر: نجمة وأيقونة
  await page.locator('.m-tab', { hasText: 'العناصر' }).click();
  await page.locator('.m-item[data-tip="m.s.star"]').click();
  await page.locator('.m-grid5 .m-item').first().click();
  if ((await W()).pages[0].els.length !== 9) throw new Error('elements not added');
  // لون التعبئة من لوحة الخصائص (الأيقونة مختارة)
  const sel = await page.evaluate(() => window.__wamda.sel[0]);
  const last = (await W()).pages[0].els[8];
  if (last.id !== sel || last.type !== 'icon') throw new Error('selection after add');
  // تراجع ثم إعادة
  await page.keyboard.press('Control+z');
  if ((await W()).pages[0].els.length !== 8) throw new Error('undo');
  await page.keyboard.press('Control+y');
  if ((await W()).pages[0].els.length !== 9) throw new Error('redo');
  // صورة مرفوعة
  await page.locator('.m-tab', { hasText: 'الصور' }).click();
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.locator('.m-sidepanel .w-btn.primary').click()]);
  await chooser.setFiles(path.join(__dirname, '..', 'fixtures', 'landscape.jpg'));
  await page.waitForTimeout(400);
  await page.locator('.m-uimg').first().click();
  await page.waitForTimeout(300);
  const img = (await W()).pages[0].els.find((o) => o.type === 'image');
  if (!img) throw new Error('image not added');
  await page.locator('.m-fbtn', { hasText: 'أبيض وأسود' }).click();
  if (!(await W()).pages[0].els.find((o) => o.type === 'image').filter.gray) throw new Error('filter');
  await shot('edited');
  // صفحة ثانية بقالب آخر
  await page.locator('.m-padd').click();
  await page.locator('.m-tab', { hasText: 'القوالب' }).click();
  await page.locator('.m-sidepanel .m-tcard', { hasText: 'رمضان' }).click();
  await page.waitForTimeout(300);
  const d = await W();
  if (d.pages.length !== 2 || d.pages[1].els.length < 5) throw new Error('page 2');
  await shot('page2');
  // تصدير PNG للصفحة الحالية والتحقق من البكسلات
  const px = await page.evaluate(async () => {
    const c = await window.__wamda.pageCanvas(0.5);
    const g = c.getContext('2d');
    const at = (x, y) => Array.from(g.getImageData(x, y, 1, 1).data);
    return { w: c.width, bg: at(5, 5), moon: at(270, 120) };
  });
  if (px.w !== 540) throw new Error('png size ' + px.w);
  if (px.bg[2] < 40 || px.bg[3] !== 255) throw new Error('bg not rendered ' + px.bg);
  // تنزيل فعلي عبر الواجهة
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 20000 }),
    (async () => { await page.locator('.w-toolbar .w-btn.primary').click(); await page.locator('.w-dialog .w-btn.primary').click(); })()
  ]);
  const size = require('fs').statSync(await dl.path()).size;
  if (size < 10000) throw new Error('export small ' + size);
};
