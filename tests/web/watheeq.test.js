// سيناريو اختبار وثيق: فتح PDF، تعليق عربي، توقيع، تظليل، تدوير، دمج، حذف، علامة مائية، بحث، حفظ
const path = require('path');
const FIX = path.join(__dirname, '..', 'fixtures', 'sample.pdf');
module.exports = async ({ page, shot, outDir }) => {
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.locator('.w-empty .w-btn.primary').click()]);
  await chooser.setFiles(FIX);
  await page.waitForFunction(() => window.__watheeq.doc && window.__watheeq.doc.pages.length === 3, null, { timeout: 15000 });
  await page.waitForTimeout(800);
  const D = () => page.evaluate(() => JSON.parse(JSON.stringify(window.__watheeq.doc)));
  const pageBox = async (i) => page.locator('.q-page').nth(i).boundingBox();
  // تعليق نصي عربي
  await page.keyboard.press('t');
  let b = await pageBox(0);
  await page.mouse.click(b.x + b.width * 0.6, b.y + b.height * 0.45);
  await page.locator('.w-dialog textarea').fill('تمت المراجعة والموافقة');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(200);
  let d = await D();
  if (d.pages[0].annots.length !== 1 || d.pages[0].annots[0].kind !== 'text') throw new Error('text annot');
  // توقيع مرسوم
  await page.keyboard.press('s');
  await page.waitForSelector('.q-pad');
  const pad = await page.locator('.q-pad').boundingBox();
  await page.mouse.move(pad.x + 60, pad.y + 90); await page.mouse.down();
  for (let k = 0; k <= 20; k++) await page.mouse.move(pad.x + 60 + k * 18, pad.y + 90 + Math.sin(k / 2) * 30);
  await page.mouse.up();
  await shot('signature-dialog');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(200);
  b = await pageBox(0);
  await page.mouse.click(b.x + b.width * 0.3, b.y + b.height * 0.8);
  await page.waitForTimeout(200);
  d = await D();
  const sig = d.pages[0].annots.find((a) => a.kind === 'sign');
  if (!sig || !/^data:image\/png/.test(sig.dataURL)) throw new Error('signature');
  // تظليل
  await page.keyboard.press('h');
  b = await pageBox(0);
  await page.mouse.move(b.x + 40, b.y + b.height * 0.2); await page.mouse.down();
  await page.mouse.move(b.x + 300, b.y + b.height * 0.25, { steps: 5 }); await page.mouse.up();
  d = await D();
  if (!d.pages[0].annots.find((a) => a.kind === 'mark')) throw new Error('mark');
  await page.keyboard.press('v');
  await shot('annotated');
  // تدوير الصفحة الثانية
  await page.locator('.q-thumbs .q-thumb').nth(1).click();
  await page.locator('[data-tip="q.rotR"]').first().click();
  d = await D();
  if (d.pages[1].rot !== 90) throw new Error('rotate');
  // دمج ملف آخر
  const [ch2] = await Promise.all([page.waitForEvent('filechooser'), page.locator('.q-sbtn', { hasText: 'إضافة ملفات' }).click()]);
  await ch2.setFiles(FIX);
  await page.waitForFunction(() => window.__watheeq.doc.pages.length === 6, null, { timeout: 15000 });
  // حذف الصفحة الأخيرة
  await page.locator('.q-thumbs .q-thumb').nth(5).click();
  await page.locator('[data-tip="q.delPages"]').first().click();
  d = await D();
  if (d.pages.length !== 5) throw new Error('delete ' + d.pages.length);
  // علامة مائية
  await page.locator('.q-sbtn', { hasText: 'علامة مائية' }).click();
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForFunction(() => window.__watheeq.doc.watermark, null, { timeout: 5000 });
  d = await D();
  if (d.watermark.text !== 'سري') throw new Error('watermark');
  // وضع ترتيب الصفحات
  await page.locator('.w-toolbar .w-seg button', { hasText: 'ترتيب الصفحات' }).click();
  await page.waitForTimeout(400);
  if ((await page.locator('.q-grid .q-thumb').count()) !== 5) throw new Error('organize grid');
  await shot('organize');
  await page.locator('.w-toolbar .w-seg button', { hasText: 'عرض' }).click();
  await page.waitForTimeout(300);
  // بحث
  await page.locator('.q-find').fill('fox');
  await page.locator('.q-find').press('Enter');
  await page.waitForFunction(() => window.__watheeq.find.hits.length === 5, null, { timeout: 10000 });
  // إنشاء PDF والتحقق منه
  const info = await page.evaluate(async () => {
    const bytes = await window.__watheeq.buildPDF();
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    const p1 = await pdf.getPage(1), p2 = await pdf.getPage(2);
    const ops = await p1.getOperatorList();
    const imgs = ops.fnArray.filter((f) => f === pdfjsLib.OPS.paintImageXObject).length;
    const meta = await pdf.getMetadata();
    return { n: pdf.numPages, rot2: p2.rotate, imgs, producer: meta.info.Producer, size: bytes.length };
  });
  if (info.n !== 5 || info.rot2 !== 90) throw new Error('built pdf ' + JSON.stringify(info));
  if (info.imgs < 3) throw new Error('annotations not embedded ' + JSON.stringify(info));
  if (!/WARSHA/.test(info.producer)) throw new Error('producer');
  await shot('final');
  // صورة للصفحة الأولى من الملف الناتج للمراجعة البصرية
  const png = await page.evaluate(async () => {
    const pdf = await pdfjsLib.getDocument({ data: await window.__watheeq.buildPDF() }).promise;
    const out = [];
    for (const n of [1, 2]) {
      const pg = await pdf.getPage(n); const vp = pg.getViewport({ scale: 1 });
      const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
      await pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      out.push(c.toDataURL('image/png'));
    }
    return out;
  });
  png.forEach((u, i) => require('fs').writeFileSync(path.join(outDir, 'watheeq-built-' + (i + 1) + '.png'), Buffer.from(u.split(',')[1], 'base64')));
  // حفظ عبر الواجهة (تنزيل في المتصفح)
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.keyboard.press('Control+s')]);
  const size = require('fs').statSync(await dl.path()).size;
  if (size < 3000) throw new Error('saved size ' + size);
};
