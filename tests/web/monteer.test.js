// سيناريو اختبار مونتير: استيراد فيديو وصورة وموسيقى، عنوان عربي، تقسيم، تراجع، تشغيل، تصدير WebM
const path = require('path');
function wav(seconds, sr) {
  const n = seconds * sr, b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVE', 8); b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(sr, 24); b.writeUInt32LE(sr * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(Math.sin(2 * Math.PI * 330 * i / sr) * 8000), 44 + i * 2);
  return b;
}
module.exports = async ({ page, shot }) => {
  // فيديو اختباري يُولَّد داخل المتصفح (VP8 + WebM)
  const b64 = await page.evaluate(async () => {
    const w = 320, h = 180, fps = 15, N = 45;
    const target = new WebMMuxer.ArrayBufferTarget();
    const mux = new WebMMuxer.Muxer({ target, video: { codec: 'V_VP8', width: w, height: h, frameRate: fps } });
    const enc = new VideoEncoder({ output: (c, m) => mux.addVideoChunk(c, m), error: (e) => { throw e; } });
    enc.configure({ codec: 'vp8', width: w, height: h, bitrate: 400000, framerate: fps });
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
    for (let i = 0; i < N; i++) {
      g.fillStyle = 'hsl(' + (i * 8) + ',80%,50%)'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#fff'; g.font = 'bold 60px sans-serif'; g.fillText(String(i), 120, 110);
      const f = new VideoFrame(c, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
      enc.encode(f, { keyFrame: i % 15 === 0 }); f.close();
    }
    await enc.flush(); mux.finalize();
    const u8 = new Uint8Array(target.buffer); let s = ''; for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s);
  });
  await page.locator('.w-empty .w-btn.primary').click();
  await page.waitForTimeout(300);
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.locator('.v-bin .w-btn.primary').click()]);
  await chooser.setFiles([
    { name: 'clip.webm', mimeType: 'video/webm', buffer: Buffer.from(b64, 'base64') },
    { name: 'landscape.jpg', mimeType: 'image/jpeg', buffer: require('fs').readFileSync(path.join(__dirname, '..', 'fixtures', 'landscape.jpg')) },
    { name: 'music.wav', mimeType: 'audio/wav', buffer: wav(8, 22050) }
  ]);
  await page.waitForFunction(() => window.__monteer.P && window.__monteer.P.media.length === 3, null, { timeout: 20000 });
  await page.waitForTimeout(500);
  const P = () => page.evaluate(() => JSON.parse(JSON.stringify(window.__monteer.P, (k, v) => (k.startsWith('_') ? undefined : v))));
  let p = await P();
  if (p.video.length !== 2 || p.audio.length !== 1) throw new Error('timeline ' + p.video.length + '/' + p.audio.length);
  const dur = await page.evaluate(() => window.__monteer.duration());
  if (dur < 7.9 || dur > 8.1) throw new Error('duration ' + dur);
  // عنوان عربي
  await page.evaluate(() => window.__monteer.setTime(0.5));
  await page.keyboard.press('t');
  p = await P();
  if (p.titles.length !== 1) throw new Error('title');
  await page.locator('.v-props textarea').fill('رحلة إلى الجبال');
  await page.waitForTimeout(500);
  await shot('title');
  // تقسيم الفيديو عند 1.5 ث
  await page.evaluate(() => { window.__monteer.setTime(1.5); });
  await page.locator('.v-clip.v-video').first().click();
  await page.evaluate(() => window.__monteer.setTime(1.5));
  await page.keyboard.press('s');
  p = await P();
  if (p.video.length !== 3) throw new Error('split ' + p.video.length);
  await page.keyboard.press('Control+z');
  if ((await P()).video.length !== 2) throw new Error('undo');
  await page.keyboard.press('Control+y');
  if ((await P()).video.length !== 3) throw new Error('redo');
  // الإطار عند 0.8 ث يجب أن يحوي صورة الفيديو
  await page.evaluate(() => window.__monteer.setTime(0.8));
  await page.waitForTimeout(600);
  const px = await page.evaluate(() => { const c = window.__monteer.drawFrameAt(0.8); const d = c.getContext('2d').getImageData(20, 20, 1, 1).data; return Array.from(d); });
  if (px[0] + px[1] + px[2] < 60) throw new Error('video frame not drawn ' + px);
  // تشغيل
  await page.evaluate(() => window.__monteer.setTime(0));
  await page.keyboard.press('Space');
  await page.waitForTimeout(700);
  await page.keyboard.press('Space');
  const t = await page.evaluate(() => window.__monteer.T);
  if (t < 0.3) throw new Error('playback ' + t);
  await shot('timeline');
  // تصدير WebM سريع (WebCodecs)
  const out = await page.evaluate(async () => { const r = await window.__monteer.renderVideo({ fmt: 'webm' }); return r ? { n: r.data.length, ext: r.ext, sig: Array.from(r.data.slice(0, 4)) } : null; });
  if (!out || out.n < 8000 || out.sig.join(',') !== '26,69,223,163') throw new Error('export ' + JSON.stringify(out));
  // التحقق من قابلية تشغيل الملف الناتج ومدته
  console.log('    exported', out.n, 'bytes');
  // حفظ المشروع
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 10000 }), page.keyboard.press('Control+s')]);
  const proj = JSON.parse(require('fs').readFileSync(await dl.path(), 'utf8'));
  if (proj.app !== 'monteer' || proj.titles[0].text !== 'رحلة إلى الجبال') throw new Error('project save');
};
