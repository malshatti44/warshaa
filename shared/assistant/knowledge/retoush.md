# Retoush (ريتوش) — photo editor

Retoush works like Photoshop: documents with layers (top to bottom), adjustment layers, masks, selections, filters
and a history (undo). Coordinates are pixels from the top-left corner of the document.

## Working like a professional retoucher
- Look before you change: `document_info` gives the size and layers; `look` shows you the image. Look when the
  request depends on what the photo shows (too dark, dull, a colour cast, where the subject is).
- Non-destructive by default: tonal and colour changes go on **adjustment layers**
  (`layer.newAdjustmentLayer.<kind>`, same params as `image.adjustments.<kind>`), so they can be changed later.
  Apply directly (`image.adjustments.*`) only when the user asks for it.
- Layers: an adjustment layer changes everything below it. Filters (blur, sharpen, noise) and healing change the
  pixels of the **active pixel layer** only: after adding adjustment layers the active layer is the adjustment, so
  `layer.select` the photo layer (its id is in `document_info`, usually the bottom "Background") before a filter.
  A new empty layer (`layer.new.layer`) has no pixels: never filter it.
- Before retouching pixels, duplicate the photo layer (`layer.duplicate`) and work on the copy.
- Every command result ends with "→ now: …": read it, it is the real state (size, active layer, selection).
- Moderate amounts: «شوي / قليلاً» ≈ 10–20, normal ≈ 25–40, «كثير / جداً» ≈ 50–70 on −100..100 style scales.
- Only do what was asked: no rotation, crop or resize unless the request implies it.
- Never overwrite the user's original file. `save_file` to a new file next to it (`<name>-edited.jpg`) unless the
  user asks to replace it; keep a layered copy as `.psd` when there are layers worth keeping.
- One mistake is one `edit.undo`.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| brightness / contrast | `layer.newAdjustmentLayer.brightnessContrast` | `{"brightness":-150..150,"contrast":-50..100}` |
| levels | `layer.newAdjustmentLayer.levels` | `{"inBlack":0..253,"gamma":0.01..9.99,"inWhite":2..255}` |
| curves | `layer.newAdjustmentLayer.curves` | `{"points":[[0,0],[64,50],[192,205],[255,255]]}` (S-curve = more contrast) |
| hue / saturation | `layer.newAdjustmentLayer.hueSaturation` | `{"hue":-180..180,"saturation":-100..100,"lightness":-100..100}` |
| vibrance | `layer.newAdjustmentLayer.vibrance` | `{"vibrance":-100..100,"saturation":-100..100}` |
| black & white | `layer.newAdjustmentLayer.blackWhite` | `{}` (defaults are good) |
| exposure | `layer.newAdjustmentLayer.exposure` | `{"exposure":-20..20,"gamma":0.01..9.99}` |
| warm / cool | `layer.newAdjustmentLayer.photoFilter` | `{"filter":"warming85"|"cooling80","density":0..100}` |
| shadows / highlights | `image.adjustments.shadowsHighlights` | `{"shadowAmount":0..100,"highlightAmount":0..100}` (on the photo layer) |
| auto fix | `image.autoTone`, `image.autoContrast`, `image.autoColor` | `{}` — destructive, on the photo layer: only when the user asks for «تلقائي» |
| resize image | `image.imageSize` | `{"width":px,"resample":"bicubicSharper"}` — give ONE side (width or height) and the other follows the ratio; both sides squash the photo |
| canvas size | `image.canvasSize` | `{"width":px,"height":px,"anchor":"center"}` |
| crop | `crop_to_ratio` tool (ratio, optional width), or `image.crop` | `{"x":px,"y":px,"width":px,"height":px}` |
| rotate | `image.imageRotation.90cw`, `image.imageRotation.90ccw`, `image.imageRotation.180` | `{}` |
| pick a layer | `layer.select` | `{"layer":id}` |
| sharpen | `filter.sharpen.unsharpMask` | `{"amount":50..150,"radius":0.5..2,"threshold":0..10}` |
| blur | `filter.blur.gaussianBlur` | `{"radius":px}` |
| noise | `filter.noise.reduceNoise` | `{"strength":0..10,"preserveDetails":0..100}` |
| remove background | `layer.removeBackground` | `{}` (adds a mask from Select Subject) |
| selections | `select.subject`, `select.sky`, `select.inverse`, `select.all`, `select.deselect` | `{}` |
| text | `type.create` | `{"x":px,"y":px,"text":"…","size":pt,"color":"#rrggbb","font":"…"}` (y is the baseline) |
| new layer / duplicate | `layer.new.layer`, `layer.duplicate` | `{"name":"…"}` |
| undo / redo | `edit.undo`, `edit.redo` | `{}` |

For anything else use `find_commands` (Arabic or English words) and follow the `params` it returns.

## Recipes
- **Dark photo** («غامقة», «فتّحها»): `layer.newAdjustmentLayer.levels` with `inWhite` lowered to the brightest real tone (e.g. 220)
  and `gamma` 1.1–1.3; or brightnessContrast +20/+10.
- **Flat, dull photo**: curves S-curve, then vibrance +20 (both adjustment layers).
- **Colour cast** (too yellow/blue): photoFilter adjustment layer the opposite way (cooling80 for yellow), or
  `image.autoColor` on a duplicate of the photo layer.
- **Black & white**: `layer.newAdjustmentLayer.blackWhite` `{}`, then curves for contrast if it looks flat.
- **Background blur (portrait look)**: `layer.select` the photo layer → `layer.duplicate` → `select.subject` →
  `select.inverse` → `filter.blur.gaussianBlur` `{"radius":20}` (or `filter.blur.lensBlur` `{"radius":30}`) →
  `select.deselect`.
- **Sharpen**: `layer.select` the photo layer (or its duplicate) → `filter.sharpen.unsharpMask` amount 60–80, radius 1.
- **Portrait skin**: duplicate the photo layer, `filter.noise.reduceNoise` light (strength 3–4) or
  `filter.noise.dustAndScratches` radius 2 threshold 10 on the copy; finish with unsharpMask amount 60 radius 1.
- **Instagram** (always 1080 wide): square post = `crop_to_ratio` `{"ratio":"1:1","width":1080}` → 1080×1080;
  portrait post = `{"ratio":"4:5","width":1080}` → 1080×1350; story = `{"ratio":"9:16","width":1080}` → 1080×1920.
  Then contrast/vibrance adjustment layers, sharpen the photo layer lightly (unsharpMask 50, radius 0.8), and
  `save_file` a new `.jpg`.
- **Web**: long side 1600–2048 px (`image.imageSize` with that one side), unsharpMask 50 radius 0.8, new `.jpg`.
- **Print**: keep full size, sharpen a little more (amount 100 radius 1.5), save `.tif` or `.psd`.
- **Cut out / remove background**: `layer.removeBackground`, then save as `.png` to keep transparency.
- **Title text**: `type.create` near the top centre: x ≈ width×0.1, y ≈ height×0.15, size ≈ height/20 pt, white
  `#ffffff` on dark photos, black on light ones.

## Arabic requests → command
- «فتّح / غامقة / معتمة» → levels or brightnessContrast adjustment layer (brighter). «غمّق» → the opposite.
- «تباين» → brightnessContrast or curves adjustment layer. «ألوان أحلى / حيوية» → vibrance adjustment layer.
- «أبيض وأسود / رمادي» → `layer.newAdjustmentLayer.blackWhite`. «دافئة» → photoFilter warming85. «باردة» → cooling80.
- «وضوح / حدة» → `filter.sharpen.unsharpMask` on the photo layer. «ضبابية / تمويه» → `filter.blur.gaussianBlur`.
- «قص / مربع / انستقرام / ستوري» → `crop_to_ratio`. «صغّر / كبّر الحجم / عرض N» → `image.imageSize` with one side.
- «دوّر» → `image.imageRotation.*`. «اقلب» → `image.imageRotation.flipCanvasHorizontal` (or `flipCanvasVertical`).
- «شيل / أزل الخلفية» → `layer.removeBackground`. «ضبّب الخلفية» → the background blur recipe.
- «اكتب / نص / عنوان» → `type.create`. «تراجع» → `edit.undo`. «احفظ / صدّر» → `save_file` with a new name.
