// سيناريو اختبار سطر: كتابة وتنسيق وقوائم وتراجع وجدول وبحث وتصدير
module.exports = async ({ page, shot }) => {
  const ed = page.locator('#doc');
  const html = () => ed.innerHTML();
  await ed.click();
  await page.keyboard.type('مرحبًا بكم في سطر، معالج النصوص العربي.');
  await page.keyboard.press('Enter');
  await page.keyboard.type('هذه فقرة ثانية فيها كلمة English وأرقام 2026.');
  await page.keyboard.press('Shift+Home');
  await page.keyboard.press('Control+b');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await page.keyboard.type('عنوان القسم');
  await page.keyboard.press('Control+Alt+1');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Control+Alt+0');
  await page.keyboard.type('قائمة:');
  await page.keyboard.press('Enter');
  await page.locator('[data-tip="satr.bullets"]').click();
  await page.keyboard.type('العنصر الأول');
  await page.keyboard.press('Enter');
  await page.keyboard.type('العنصر الثاني');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.type('بعد القائمة');
  let h = await html();
  if (!/<b>|font-weight/.test(h)) throw new Error('bold not applied');
  if (!/<h1[^>]*>(<span[^>]*>)?عنوان القسم(<\/span>)?<\/h1>/.test(h)) throw new Error('heading not applied: ' + h);
  if (/<p>\s*<ul/.test(h)) throw new Error('list nested in paragraph');
  if (!/<li>العنصر الأول<ul><li>العنصر الثاني<\/li><\/ul><\/li><\/ul><p>بعد القائمة<\/p>/.test(h.replace(/<br>/g, '').replace(/<\/?span[^>]*>/g, ''))) throw new Error('list structure: ' + h);
  if (!/<p>قائمة:<\/p>/.test(h.replace(/<\/?span[^>]*>/g, ''))) throw new Error('paragraph before list lost: ' + h);
  // تراجع وإعادة
  await page.keyboard.press('Control+z');
  await page.keyboard.press('Control+z');
  const undone = await html();
  if (undone === h) throw new Error('undo did nothing');
  await page.keyboard.press('Control+y');
  await page.keyboard.press('Control+y');
  if ((await html()) !== h) throw new Error('redo mismatch');
  // جدول
  await page.locator('[data-tip="satr.insertTable"]').click();
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.keyboard.type('خلية');
  await page.waitForTimeout(300);
  h = await html();
  if (!/<table/.test(h)) throw new Error('table not inserted');
  if (!/<th>(<span[^>]*>)?خلية/.test(h)) throw new Error('caret not in first cell: ' + h.slice(-300));
  // محاذاة
  await page.locator('[data-tip="ui.center"]').click();
  // بحث
  await page.keyboard.press('Control+f');
  await page.locator('#find input').first().fill('سطر');
  await page.waitForTimeout(300);
  const count = await page.locator('#find .count').textContent();
  if (!/1/.test(count)) throw new Error('find count: ' + count);
  await shot('edited');
  await page.keyboard.press('Escape');
  // إعداد الصفحة
  await page.locator('.w-menu-trigger').nth(0).dispatchEvent('mousedown');
  await page.locator('.w-menu-item', { hasText: 'إعداد الصفحة' }).click();
  await page.waitForTimeout(200);
  await shot('pagesetup');
  await page.keyboard.press('Escape');
  // تصدير docx
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 8000 }),
    (async () => {
      await page.locator('.w-menu-trigger').nth(0).dispatchEvent('mousedown');
      await page.locator('.w-menu-item', { hasText: 'تصدير' }).hover();
      await page.locator('.w-menu-item', { hasText: 'Word' }).click();
    })()
  ]);
  const out = require('path').join(require('os').tmpdir(), 'satr-test.docx'); await dl.saveAs(out);
  const size = require('fs').statSync(out).size;
  if (size < 2000) throw new Error('docx too small: ' + size);
};
