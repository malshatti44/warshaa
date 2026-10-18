# Wamda (ومضة) — motion graphics and visual effects

Wamda works like After Effects: a project of items (compositions, footage, solids); a composition has layers (top to
bottom) — text, shape, solid, footage, null, camera, light, adjustment — each with properties (transform/position,
transform/scale, transform/opacity, transform/rotation, …) that can be animated with keyframes. Times are seconds.

## Working like a professional motion designer
- `document_info` / `get_comp` show the project, the active composition and its layers (ids); `get_layer` a layer's
  properties; `look` renders the frame at the current time (or `render_frame` with `time`).
- Start with a composition (`comp.new`, e.g. 1920×1080, 30 fps, 5–10 s); build layers; animate; render.
- Animate with intent: a short entrance (0.4–0.8 s), a hold, an exit; ease every move (`interpolation`
  "easyEase"); stagger related layers by 0.1–0.2 s; avoid moving many things at once.
- Fast entrances and exits: built-in presets — `anim.applyBuiltinPreset` with fadeIn, fadeOut, wipeInFromLeft,
  wipeInFromRight, wipeInFromTop, wipeInFromBottom, diagonalSweepIn, clockReveal, blindsOpen, pixelDissolveIn,
  mosaicFadeIn, cardFlipIn, lensPopIn, lineSweepIn (outs: wipeOutToRight, clockWipeOut, blindsClose, pixelDissolveOut,
  cardFlipOut).
- Custom moves: `add_keyframe` on a property with `keys` [{time, value}…] and `interpolation` "easyEase"; e.g.
  position from off-screen to centre, scale 80→100, opacity 0→100.
- Text: `layer.newText` with font, size, fill; Arabic text is right to left by itself; keep titles inside the safe area.
- Effects: `add_effect` (`Gaussian Blur`, `Glow`, `Drop Shadow`, `Curves`…; `list_effects` lists them).
- Render: `renderQueue.add` `{"comp":…,"format":"h264","output":"….mp4"}` then `renderQueue.render`. Don't render or
  save unless asked.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| new composition | `comp.new` | `{"name":"…","width":1920,"height":1080,"frameRate":30,"duration":6,"background":"#101820"}` |
| text layer | `layer.newText` | `{"text":"…","font":"…","size":96,"fill":"#ffffff","position":[960,540]}` |
| solid / shape | `layer.newSolid`, `layer.newShape` | `{"color":"#…"}`, `{"kind":"rect|rounded|ellipse|star|polygon","size":[w,h],"fill":"#…"}` |
| null / camera | `layer.newNull`, `layer.newCamera` | `{}`, `{"preset":"50mm"}` |
| animation preset | `anim.applyBuiltinPreset` | `{"preset":"fadeIn","layers":[id]}` |
| easy ease | `keys.easyEase` | `{}` (on the selected keys) |
| render | `renderQueue.add`, `renderQueue.render` | `{"comp":…,"format":"h264","output":"….mp4"}`, `{"wait":true}` |
| deselect | `edit.deselectAll` | `{}` |

For anything else use `find_commands` (and `list_effects` for effects).

## Recipes
- **Animated title card**: comp 1920×1080 5 s; dark solid background; title text centred; `anim.applyBuiltinPreset`
  fadeIn on the title, a subtitle with wipeInFromBottom 0.2 s later; fadeOut at the end.
- **Logo reveal**: import the logo, scale keyframes 80→100 and opacity 0→100 over 0.6 s with easyEase, a Glow effect.
- **Lower third**: a rounded rectangle shape at the bottom left, name and title texts on it, wipeInFromLeft, hold 4 s,
  wipeOutToRight.
- **Instagram/Reels**: comp 1080×1920, 30 fps; big text in the middle third.

## Arabic requests → tool
- «تكوين جديد / مشهد» → `comp.new`. «نص / عنوان» → `layer.newText`. «شكل» → `layer.newShape`. «خلفية» → `new_solid` (e.g. #000000). «شفافية ٥٠٪» → `set_property` transform/opacity 50 without `time`.
- «حرّكه / أنيميشن» → `add_keyframe` (easyEase). «يظهر تدريجياً» → preset fadeIn. «يختفي» → fadeOut.
- «احذف طبقة» → `delete_layers`. «تأثير / ضبابية / توهج» → `add_effect`. «اعرض لقطة» → `look`. «صدّر فيديو / رندر» → renderQueue.
