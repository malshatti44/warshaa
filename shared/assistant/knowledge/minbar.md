# Minbar (منبر) — presentations

Minbar works like PowerPoint: a presentation of slides (16:9, 960×540 pt), each with a layout and shapes
(placeholders, text boxes, shapes, pictures, tables, charts). Shape and format commands act on the **current slide**
(`go_to_slide`) and on the selected shapes (`select`, or `ids`). Slide indexes start at 0.

## Working like a professional presenter
- `document_info` lists the slides (index, title, layout, transition, notes); `slide_info` lists one slide's shapes
  (ids, kinds, boxes, text); `look` shows the current slide.
- One idea per slide: a short title (≤ 6 words) and at most 5 bullets of ≤ 8 words. Put details in the speaker notes
  (`speaker_notes`), not on the slide.
- Build on layouts: `new_slide` with `title` and `points` (one short point per item) fills the placeholders and keeps the
  theme's fonts and sizes. Add free text boxes only for extras.
- A complete talk: title slide → agenda / goals → content slides → summary → questions or thanks.
- Consistency: one theme (`design.theme`), one subtle transition for all slides, animations only where they help
  (bullets appearing one by one).
- Arabic text reads right to left: a new text box with Arabic text gets `format.rtl` `{"on":true}` and right alignment.
- Don't save or export unless asked; then `save_presentation` (.minbar / .pptx) or `export` (pdf, png, pptx).

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| new slide at a place | `slide.new` | `{"layout":"titleAndContent","at":index,"title":"…","body":"line 1\nline 2"}` |
| duplicate / delete / move | `slide.duplicate`, `slide.delete`, `slide.move` | `{"index":i}` / `{"from":i,"to":j}` |
| change layout | `slide.layout` | `{"layout":"twoContent","index":i}` |
| speaker notes | `slide.notes` | `{"text":"…","index":i}` |
| replace a shape's text | `text.set` | `{"id":shape,"text":"…"}` |
| theme | `design.theme` | `{"name":"Harbor|Ember|Meadow|Nocturne|Paper|Coral Reef|Slate|Minbar"}` |
| background | `design.background` | `{"color":"#RRGGBB","all":true}` |
| transition | `transition_all` tool (every slide), or `transition.set` (current slide) | `{"kind":"fade|push|wipe|morph|…","duration":ms}` |
| animation | `animation.set` | `{"effect":"fade|fly|zoom|wipe|appear","ids":[shape]}` |
| font / size / colour / bold | `format.font`, `format.size`, `format.color`, `format.bold` | `{"family":…}`, `{"size":pt}`, `{"color":"#RRGGBB"}`, `{"on":true}` |
| alignment / RTL | `format.align`, `format.rtl` | `{"align":"right|center|left"}`, `{"on":true}` |
| bullets / numbering | `format.bullets`, `format.numbering` | `{"on":true}` |
| align / distribute shapes | `arrange.align`, `arrange.distribute` | `{"edge":"center|middle|left|…","to":"slide","ids":[…]}`, `{"dir":"horizontal","ids":[…]}` |
| slide size | `design.slideSize` | `{"preset":"widescreen|standard"}` |
| slide numbers | `design.headerFooter` | `{"slideNumber":true}` |

For anything else use `find_commands`.

## Recipes
- **A lesson / talk from a topic**: slide 0 is already the title slide → `text.set` its title (and subtitle) by shape
  id from `slide_info`; then `new_slide` with points for goals, 2–4 content slides, a summary, and a closing slide
  («شكراً» / questions).
  Write real, correct content in the user's language, 3–5 bullets each. Then one transition for all.
- **Comparison**: layout "comparison" or "twoContent". **Data**: `insert_chart` (column for comparing, line for time,
  pie for parts of a whole ≤ 5 slices). **Table**: `insert_table` with `data` rows (header row first).
- **Picture slide**: layout "pictureWithCaption" then `insert_picture` with the file path.
- **Make it look professional**: a theme, consistent title sizes (36–44 pt), body 20–28 pt, enough empty space,
  no more than 2 fonts and 3 colours.

## Arabic requests → tool
- «سوّ عرض عن… / شرائح عن…» → one call: `build_presentation` (title, subtitle, slides each with a title and 3–5 points).
- «ضيف شريحة» → `new_slide` (title + points). «احذف الشريحة N» → `delete_slide` `{"slide":N}`.
- «ملاحظات المتحدث / ملاحظات» → `speaker_notes` `{"slide":N,"text":"…"}`. «انتقال» → `transition_all` (or `transition.set` for one slide).
- «حركة / أنيميشن / ظهور للنقاط» → `animate` `{"effect":"appear","target":"points"}` (on the current slide). «الثيم / التصميم / القالب» → `design.theme`. «خلفية» → `design.background`.
- «جدول» → `insert_table`. «رسم بياني / مخطط» → `insert_chart`. «صورة» → `insert_picture`.
- «صدّر PDF» → `export` with a .pdf path. «احفظ» → `save_presentation`.
