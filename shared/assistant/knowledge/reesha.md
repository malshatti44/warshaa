# Reesha (ريشة) — vector illustration

Reesha works like Illustrator: documents with artboards, layers and vector objects (paths, live shapes, text,
images, groups). Units are points (72 pt = 1 inch); x grows to the right and y downwards from the artboard's top-left.
A new document is US Letter 612×792 pt unless a size is given.

## Working like a professional designer
- `document_info` first when you need sizes, artboards or object ids; `look` to see the result.
- Draw with the tools: `draw_shape` (rectangle, ellipse, polygon, star, line), `add_text`, `draw_path`; style with
  `set_paint`; rotate/scale/move with `transform`; combine with `pathfinder`; live effects with `apply_effect`.
  These return the new object's id: keep it to style or move that object later (`ids`).
- Geometry: `x`,`y` of a rectangle or ellipse is its **top-left corner**, not its centre. To put a shape of size w×h
  centred at (cx, cy): x = cx − w/2, y = cy − h/2 (artboard centre = width/2, height/2). Polygons and stars take
  `cx`,`cy` (the centre). `add_text` `y` is the baseline.
- `transform` changes objects *relative* to where they are: `dx`/`dy` move, `rotate`, `scale`. Its `origin` is only the
  pivot for rotating or scaling; it never moves anything. To place objects use `align_objects` (e.g. centre on the
  artboard) or `dx`/`dy`.
- Many tools and commands act on the **selection**; pass `ids` (all ids are in `document_info`) to act on specific
  objects. "All shapes" = every id from `document_info`, or `select.all` first.
- Arranging several objects: `align_objects`, `distribute_objects` (even gaps), `group_objects`.
- Centring: don't compute centred coordinates yourself. Draw the object anywhere, then `align_objects` with its id,
  `"horizontal":"center","vertical":"center","to":"artboard"` (only horizontal for «أفقياً», only vertical for «عمودياً»).

## Arabic requests → tool
- «في الوسط / وسّط / بالمنتصف» → `align_objects` center to the artboard (never `distribute_objects`).
- «وزّع / مسافات متساوية / بالتساوي» → `distribute_objects`.
- «حاذِ لليمين / لليسار / للأعلى / للأسفل» → `align_objects` right / left / top / bottom.
- «جمّع / اجعلها مجموعة» → `group_objects`. «لوّن / غيّر اللون» → `set_paint` with `ids`.
- «دوّر» → `transform` rotate. «كبّر / صغّر» → `transform` scale (%). «حرّك» → `transform` dx/dy.
- «ظل» → `apply_effect` `stylize.dropShadow`. «صدّر» → `export`. «احفظ» → `save_file`.
- Filled shapes without an outline: pass `"stroke":"none"`. Colours as "#rrggbb".
- Keep things editable: group related objects (`object.group`), keep text as text unless the user asks for outlines.
- Layout: centre with `object.align` `{"horizontal":"center","vertical":"center","to":"artboard"}`; even gaps with
  `object.distributeSpacing`. Leave margins of at least 5% of the artboard.
- Logos: simple geometry, 2–3 colours, a bold sans font, then `type.createOutlines` only when asked to finalise.
- Never overwrite the user's original file; `save_file` to a new name. `export` for png/jpg/svg/pdf.
- One mistake is one `undo`.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| new document | `file.new` | `{"width":pt,"height":pt,"name":"…"}` (A4 = 595×842; 1 pt = 1 px at 72 ppi, so a 1080 px square post = 1080×1080) |
| new artboard | `artboard.new` | `{"x":pt,"y":pt,"width":pt,"height":pt,"name":"…"}` |
| fit artboard to art | `artboard.fitToArt` | `{}` |
| select all / none | `select.all`, `select.none` | `{}` |
| group / ungroup | `object.group`, `object.ungroup` | `{}` |
| align | `object.align` | `{"horizontal":"left|center|right","vertical":"top|center|bottom","to":"selection|artboard"}` |
| distribute evenly | `object.distributeSpacing` | `{"axis":"horizontal|vertical","spacing":pt}` |
| order | `object.arrange.bringToFront`, `object.arrange.sendToBack` | `{}` |
| duplicate | `edit.duplicate` | `{"dx":pt,"dy":pt}` |
| text to outlines | `type.createOutlines` | `{}` |
| trace an image | `imageTrace.makeAndExpand` | `{"params":{"mode":"color|blackAndWhite|logo"}}` |
| undo / redo | `edit.undo`, `edit.redo` | `{}` |

For anything else use `find_commands` and follow the `params` it returns.

## Recipes
- **Simple logo**: `draw_shape` a circle or rounded square in the brand colour (stroke none), `add_text` the name in
  white on it; `align_objects` both ids to the artboard centre (horizontal and vertical "center"); `group_objects`.
- **Badge / sticker**: star or polygon shape, a circle on top, text on it; `apply_effect` `stylize.dropShadow`.
- **Card / poster**: background rectangle the size of the artboard, title text large at the top third, body text
  smaller, a shape accent; align to the artboard centre.
- **Icon set**: one artboard per icon (`artboard.new`), same stroke width (2 pt) and corner radius on all.
- **Export**: web = `export` png or svg; print = pdf. Name the file after the work (e.g. `logo.png`).
