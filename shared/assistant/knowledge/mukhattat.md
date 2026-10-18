# Mukhattat (مخطط) — CAD drafting

Mukhattat works like AutoCAD: a drawing of entities (lines, polylines, circles, arcs, text, dimensions, hatches,
blocks) on layers, in model space with real-world units (metric drawings in millimetres unless set otherwise).
Coordinates are `[x, y]` with y **up**. Entities are identified by **handles** (hex strings like "1A3").

## Working like a professional draftsperson
- `document_info` (`inspect_drawing`) gives the units, extents, layers and counts; `query_entities` lists entities with
  handles (filter by type, layer or window); `look` renders the drawing fitted to its extents.
- Draw with `run_command` and JSON params (exact geometry, no prompts): `line`, `pline`, `circle`, `arc`, `rectang`,
  `text`, `mtext`, `dimlinear`, `hatch`. Always these commands with JSON params (never typed command-line input: it opens dialogs and waits for prompts).
- Organise on layers: walls, doors, windows, furniture, dimensions, text — each its own colour (`layer.new`).
- Draw to real size (a 4 m wall in a metric drawing is 4000 units), then add dimensions and text at a readable height
  (text ≈ 2.5–5 mm × the plot scale).
- Edit by handle: `move`, `copy`, `rotate`, `scale`, `mirror`, `offset` (parallel walls), `trim`, `extend`, `fillet`.
- Finish with `zoom` `{"mode":"extents"}`. Save as .dxf/.dwg, or export .pdf/.png/.svg with `save` and that extension.
  Don't save unless asked.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| line(s) | `line` | `{"points":[[0,0],[4000,0],[4000,3000]],"closed":false}` |
| polyline | `pline` | `{"vertices":[[0,0],[4000,0],[4000,3000],[0,3000]],"closed":true,"width":0}` |
| rectangle | `rectang` | `{"p1":[0,0],"p2":[4000,3000]}` |
| circle / arc | `circle`, `arc` | `{"center":[x,y],"radius":r}`, `{"center":[x,y],"radius":r,"start":0,"end":90}` |
| text | `text`, `mtext` | `{"at":[x,y],"text":"…","height":250,"justify":"MC"}` |
| dimension | `dimlinear` | `{"p1":[0,0],"p2":[4000,0],"at":[2000,-500]}` |
| hatch | `hatch` | `{"points":[[x,y]],"pattern":"ANSI31","scale":50}` (a point inside a closed area) |
| layer | `layer.new` | `{"name":"Walls","color":"red","current":true}` |
| move / copy / rotate | `move`, `copy`, `rotate` | `{"handles":["…"],"delta":[dx,dy]}`, `{"handles":[…],"delta":[dx,dy],"count":n}`, `{"handles":[…],"base":[x,y],"angle":90}` |
| offset | `offset` | `{"handle":"…","distance":200,"side":[x,y]}` |
| mirror / scale | `mirror`, `scale` | `{"handles":[…],"p1":[x,y],"p2":[x,y]}`, `{"handles":[…],"base":[x,y],"factor":2}` |
| array | `array` | `{"type":"rectangular",…}` (find_commands "arrayrect" for its parameters) |
| erase | `erase` | `{"handles":["…"]}` |
| zoom to all | `zoom` | `{"mode":"extents"}` |
| units | `units` | `{"insunits":4}` (4 = millimetres) |

For anything else use `find_commands`.

## Recipes
- **Room plan**: metric drawing; layer Walls; outer walls as a closed `pline` (e.g. 5000×4000), inner face with
  `offset` 200 inwards; door opening: trim, then an arc for the swing on layer Doors; dimensions on layer Dims along
  each side; room name with `mtext` in the middle; zoom extents.
- **Simple part**: a `rectang` outline with `fillet` corners, holes with `circle`, centre lines on their own layer,
  `dimlinear` for overall sizes.
- **Repeat elements** (chairs, columns): draw one, make a `block`, `insert` copies, or `copy` with `count`.

## Arabic requests → tool
- «ارسم خط / مستطيل / دائرة» → `line` / `rectang` / `circle`. «جدار» → `pline`, then «سماكة الجدار / الجدار الداخلي» → `offset_wall` (distance in mm, e.g. 200 for 20 cm).
- «طبقة» → `layer.new`. «أبعاد / قياس» → `dimlinear`. «نص / عنوان» → `text`/`mtext`. «تهشير» → `hatch`.
- «حرّك» → `move_entities` (dx, dy in mm; no handles = everything). «انسخ / دوّر / كبّر» → `copy` / `rotate` / `scale` (handles from `query_entities`).
- «احفظ DXF» / «صدّر PDF» → `save` with that extension.
