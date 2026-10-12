// سيناريو اختبار نسق: قالب مجلة بتدفق تلقائي، تحرير النص، ربط إطارات، صفحة رئيسية، تصدير
module.exports = async ({ page, shot }) => {
  await shot('welcome');
  await page.locator('.n-tplcard', { hasText: 'مقالة مجلة' }).click();
  await page.waitForFunction(() => window.__nasaq.D && window.__nasaq.D.pages.length >= 2, null, { timeout: 20000 });
  await page.waitForTimeout(600);
  const info = () => page.evaluate(() => { const D = window.__nasaq.D; const fl = window.__nasaq.flows; return { pages: D.pages.length, overset: Object.values(fl).some((f) => f.overset), stories: Object.keys(D.stories).length }; });
  let i = await info();
  if (i.overset) throw new Error('autoflow left overset text');
  await shot('magazine');
  // رقم الصفحة من الصفحة الرئيسية يظهر في كل صفحة
  const nums = await page.evaluate(() => Array.from(document.querySelectorAll('#pages .n-page')).map((p) => Array.from(p.querySelectorAll('.n-masterel')).map((e) => e.textContent).join('|')));
  if (nums[0].indexOf('١') < 0 || nums[1].indexOf('٢') < 0) throw new Error('page numbers ' + JSON.stringify(nums));
  // إطار نص جديد في صفحة جديدة
  await page.evaluate(() => { window.__nasaq.goPage(0); });
  const pagesBefore = i.pages;
  await page.locator('[data-tip="n.addPage"]').first().click();
  i = await info();
  if (i.pages !== pagesBefore + 1) throw new Error('add page');
  await page.keyboard.press('t');
  const pg = await page.locator('#pages .n-page').nth(1).boundingBox();
  await page.mouse.move(pg.x + pg.width * 0.15, pg.y + pg.height * 0.15); await page.mouse.down();
  await page.mouse.move(pg.x + pg.width * 0.85, pg.y + pg.height * 0.3, { steps: 5 }); await page.mouse.up();
  await page.waitForTimeout(200);
  const sel = await page.evaluate(() => window.__nasaq.sel.length);
  if (sel !== 1) throw new Error('frame not created');
  // كتابة نص طويل في محرر القصة
  const ed = page.locator('.n-editor');
  await ed.click();
  const long = 'هذا نص تجريبي طويل لاختبار تدفق النص بين الإطارات المترابطة في برنامج نسق. '.repeat(14);
  await page.keyboard.insertText(long);
  await page.waitForTimeout(700);
  let st = await page.evaluate(() => { const f = window.__nasaq.D.pages[1].els.find((x) => x.type === 'text'); return { sid: f.story, overset: window.__nasaq.flows[f.story].overset }; });
  if (!st.overset) throw new Error('expected overset in small frame');
  // ربط بإطار تالٍ أسفل الصفحة
  await page.locator('.w-btn', { hasText: 'ربط بإطار تالٍ' }).click();
  await page.mouse.move(pg.x + pg.width * 0.15, pg.y + pg.height * 0.4); await page.mouse.down();
  await page.mouse.move(pg.x + pg.width * 0.85, pg.y + pg.height * 0.9, { steps: 5 }); await page.mouse.up();
  await page.waitForTimeout(400);
  st = await page.evaluate((sid) => ({ frames: window.__nasaq.D.stories[sid].frames.length, overset: window.__nasaq.flows[sid].overset, second: window.__nasaq.flows[sid].out.slice(1).some((o) => o.length) }), st.sid);
  if (st.frames !== 2 || st.overset || !st.second) throw new Error('threading ' + JSON.stringify(st));
  await shot('threaded');
  // تراجع يزيل الربط
  await page.keyboard.press('Escape');
  await page.mouse.click(5, 300);
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(200);
  // تصدير PNG للصفحة الأولى والتحقق من محتواها
  const px = await page.evaluate(async () => { const c = await window.__nasaq.pageCanvas(0, 0.5); const d = c.getContext('2d').getImageData(Math.round(c.width / 2), 6, 1, 1).data; return { w: c.width, top: Array.from(d) }; });
  if (px.top[0] < 200 || px.top[1] > 120) throw new Error('png render (red band expected) ' + JSON.stringify(px));
  // HTML التصدير يحتوي النص العربي ولا يحتوي عناصر الواجهة
  const html = await page.evaluate(() => window.__nasaq.exportHTML());
  if (!html.includes('جماليات') || html.includes('n-ui') || html.includes('data-id')) throw new Error('export html');
  // حفظ المستند
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 10000 }), page.keyboard.press('Control+s')]);
  const doc = JSON.parse(require('fs').readFileSync(await dl.path(), 'utf8'));
  if (doc.app !== 'nasaq' || doc.pages.length < 3) throw new Error('save');
};
