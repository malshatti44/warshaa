// سيناريو اختبار صدى: توليد نغمة، تحديد، قص، لصق، مؤثرات، تراجع، تصدير WAV
module.exports = async ({ page, shot }) => {
  const S = () => page.evaluate(() => { const a = window.__sada.A; return a ? { sr: a.sr, n: a.ch[0].length, nch: a.ch.length, sel: window.__sada.sel, hist: window.__sada.hist.index } : null; });
  // توليد نغمة من قائمة المؤثرات (ينشئ مستندًا جديدًا)
  await page.locator('.s-fx', { hasText: 'نغمة' }).click();
  await page.locator('.w-dialog input[type=number]').nth(2).fill('3');
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(400);
  let s = await S();
  if (!s || s.n !== 144000) throw new Error('tone ' + JSON.stringify(s));
  // إضافة ضجيج وردي بعد النغمة
  await page.keyboard.press('End');
  await page.locator('.s-fx', { hasText: 'ضجيج' }).click();
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(300);
  s = await S();
  if (s.n !== 240000) throw new Error('noise insert ' + s.n);
  await shot('generated');
  // تحديد بالسحب على الموجة
  const box = await page.locator('#wave').boundingBox();
  await page.mouse.move(box.x + box.width * 0.1, box.y + 100); await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, box.y + 120, { steps: 6 }); await page.mouse.up();
  s = await S();
  const selLen = s.sel.b - s.sel.a;
  if (selLen < 20000) throw new Error('selection ' + JSON.stringify(s.sel));
  // قص ثم لصق في النهاية
  await page.keyboard.press('Control+x');
  s = await S();
  if (s.n !== 240000 - selLen) throw new Error('cut');
  await page.keyboard.press('End');
  await page.keyboard.press('Control+v');
  s = await S();
  if (s.n !== 240000) throw new Error('paste ' + s.n);
  // مؤثر: تسوية على كامل الملف
  await page.keyboard.press('Escape');
  await page.evaluate(() => { window.__sada.sel = { a: 0, b: 0 }; });
  await page.locator('.s-fx', { hasText: 'تسوية' }).click();
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForTimeout(400);
  const peak = await page.evaluate(() => { let m = 0; window.__sada.A.ch[0].forEach((v) => { m = Math.max(m, Math.abs(v)); }); return m; });
  if (Math.abs(peak - Math.pow(10, -1 / 20)) > 0.01) throw new Error('normalize peak ' + peak);
  // معادل الصوت (OfflineAudioContext)
  await page.locator('.s-fx', { hasText: 'معادل' }).click();
  await page.locator('.w-dialog .w-btn.primary').click();
  await page.waitForFunction(() => window.__sada.hist.index >= 4, null, { timeout: 10000 });
  // تسريع
  await page.evaluate(() => window.__sada.runFx('speed', { factor: 2 }));
  s = await S();
  if (Math.abs(s.n - 120000) > 2) throw new Error('speed ' + s.n);
  await page.keyboard.press('Control+z');
  s = await S();
  if (s.n !== 240000) throw new Error('undo speed ' + s.n);
  await page.keyboard.press('Control+y');
  s = await S();
  if (Math.abs(s.n - 120000) > 2) throw new Error('redo speed ' + s.n);
  await shot('edited');
  // تشغيل لثانية
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  const isPlaying = await page.evaluate(() => window.__sada.playing);
  await page.keyboard.press('Space');
  if (!isPlaying) throw new Error('playback did not start');
  // تصدير WAV
  const [dl] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    (async () => {
      await page.keyboard.press('Control+e');
      const sel = page.locator('.w-dialog select').first();
      await sel.selectOption('wav16');
      await page.locator('.w-dialog .w-btn.primary').click();
    })()
  ]);
  const buf = require('fs').readFileSync(await dl.path());
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.length !== 44 + s.n * 2) throw new Error('wav export ' + buf.length);
  // MP3 إن كانت المكتبة متاحة
  const mp3 = await page.evaluate(async () => { if (!window.__sada.hasMp3()) return 'skip'; const b = await window.__sada.encodeMp3(window.__sada.A.ch, window.__sada.A.sr, 128); return b.length; });
  if (mp3 === 'skip' || mp3 < 10000) throw new Error('mp3 ' + mp3);
  const opus = await page.evaluate(async () => { if (!window.__sada.hasOpus()) return 'skip'; try { const b = await window.__sada.encodeOpus(window.__sada.A.ch, window.__sada.A.sr, 96); return b.length; } catch (e) { return 'err ' + e.message; } });
  if (opus !== 'skip' && !(opus > 5000)) throw new Error('opus ' + opus);
  console.log('    mp3 bytes', mp3, 'opus bytes', opus);
};
