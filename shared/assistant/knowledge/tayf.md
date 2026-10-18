# Tayf (طيف) — photo library and RAW development

Tayf works like Lightroom: a library (catalog) of photos with ratings, flags, albums and keywords, and non-destructive
develop settings per photo (the original file is never changed). Develop tools edit the **active** photo
(`select_photos`, or `id` on the develop tools). Export renders new files.

## Working like a professional photographer
- `document_info` shows the library view, the selection and the active photo; `query_photos` lists photos (id, name,
  rating, flag, edited); `look` shows the active photo with its settings.
- Develop order: crop and straighten → white balance (`wb.temp`, `wb.tint`) → exposure → contrast → highlights /
  shadows → whites / blacks → presence (`effects.clarity`, `effects.texture`, `color.vibrance`) → colour (HSL mixer) →
  detail → vignette. Small moves: exposure ±0.3–1, the −100..100 sliders 10–40.
- Typical fixes: dark photo → `light.exposure` +0.5…+1, `light.shadows` +30; flat → `light.contrast` +20,
  `effects.clarity` +15, `color.vibrance` +20; hazy landscape → `effects.dehaze` +20; harsh sky → `light.highlights`
  −40; portraits → keep clarity ≤ 0 on skin, `effects.texture` −10.
- Change many photos at once: set the first, then `develop.autoSync` on with the others selected, or `apply_preset`.
- Choose the best: `photo.rate` (1–5 stars), `photo.flag` pick/reject; albums for sets (`album.create`, `album.addPhotos`).
- Export: `export` with `path` (one photo, .jpg / .png / .tif) or `dir` (many); web/social: long edge 2048 px,
  jpg quality 85. Don't export unless asked.

## Core controls (`set_develop` `{"values":{…}}`)
`light.exposure` (−5..5), `light.contrast`, `light.highlights`, `light.shadows`, `light.whites`, `light.blacks`,
`wb.temp` (2000..50000 K), `wb.tint`, `color.vibrance`, `color.saturation`, `effects.clarity`, `effects.texture`,
`effects.dehaze`, `vignette.amount`, HSL `mixer.<red|orange|yellow|green|aqua|blue|purple|magenta>.<hue|sat|lum>`,
colour grading `grading.<shadows|midtones|highlights>.<hue|sat|lum>`. All other sliders: `list_controls`.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| auto settings | `develop.auto` | `{}` |
| black & white | `develop.treatment` | `{"bw":true}` (or `develop.autoBwMix` `{}`) |
| straighten | `crop.autoStraighten` | `{}` |
| rating / flag | `photo.rate`, `photo.flag` | `{"rating":4,"ids":[…]}`, `{"flag":"pick","ids":[…]}` |
| album | `album.create`, `album.addPhotos` | `{"name":"…","addSelected":true}`, `{"id":album,"ids":[…]}` |
| sync edits | `develop.autoSync` | `{"on":true}` |
| select by rating / flag | `library.selectBy` | `{"rating":4}` |

For anything else use `find_commands`.

## Recipes
- **Quick professional edit**: `develop.auto`, then adjust: highlights −30, shadows +25, clarity +10, vibrance +15;
  `crop.autoStraighten` if the horizon tilts.
- **Moody black & white**: `develop.treatment` bw, contrast +30, clarity +20, vignette −20.
- **Warm golden look**: `wb.temp` +600 K from the current value, `grading.highlights` hue 45 sat 20.
- **Square crop for Instagram**: `crop` `{"rect":[x0,y0,x1,y1]}` (normalised 0..1, a centred square), then export
  with long edge 1080.

## Arabic requests → tool
- «استورد الصور» → `import`. «اختر / فعّل الصورة» → `select_photos`. «فتّح / غمّق» → `adjust` `{"changes":{"light.exposure":0.5}}` (minus to darken).
- «تباين / وضوح / حيوية» → `adjust` light.contrast / effects.clarity / color.vibrance. «أدفى / أبرد» → `adjust` wb.temp +800 / -800.
- «أبيض وأسود» → `develop.treatment`. «تلقائي» → `develop.auto`. «قص مربع / ١٦:٩» → `crop_to_ratio`. «عدّل الميل» → `crop.autoStraighten`.
- «قيّمها نجوم» → `rate_photo`. «علّمها مختارة / مرفوضة» → `flag_photo` pick / reject. «ألبوم» → `album.create`. «صدّر» → `export`.
