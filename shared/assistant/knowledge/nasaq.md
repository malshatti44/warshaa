# Nasaq (نسق) — page layout and publishing

Nasaq works like InDesign: a document of pages (in spreads) with frames. Text lives in **stories** that flow through
text frames; pictures sit in graphic frames. Coordinates are points in **spread coordinates** (72 pt = 1 inch); a
frame's `rect` is `[x0, y0, x1, y1]` (left, top, right, bottom). Page bounds and margins are in `document_info`.

## Working like a professional designer
- Start from `document_info`: pages (index, bounds, margins, columns), items (id, kind, bounds, story), stories
  (id, overset), styles and swatches. `look` renders the current page.
- Keep inside the margins; align frames to the page or margins (`object.align` `{"edge":…,"to":"margins"}`).
- Text: create a frame with its text in one step (`frame.create` with `"content":"text","text":"…"`), or replace a
  story's text with `set_story_text`. After adding text check `document_info`: an **overset** story doesn't fit — make
  the frame bigger or the text smaller.
- Arabic: paragraphs aligned `right`, justified Arabic is `rightJustified`; Arabic text in several columns flows right
  to left with `story.setDirection` `{"direction":"rightToLeft"}`.
- Typography: one heading font and one body font, body 10–12 pt with leading ≈ 120–140%, headings 2–3× the body,
  consistent spacing before/after paragraphs; prefer paragraph styles (`style.paragraph.apply`) for repeated looks.
- Colours: make a swatch (`swatch.create`) and fill with its name (`object.fill` `{"swatch":"…","ids":[…]}`).
- Pictures: `place_image` into a frame or at x, y with a width.
- Print / share: `file.exportPdf` `{"path":"….pdf"}`; a page as an image: `export_png`. Don't save unless asked
  (`save_document`, native format).

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| new frame (text / graphic / shape) | `frame.create` | `{"rect":[x0,y0,x1,y1],"content":"text","text":"…"}` (`"shape":"ellipse"` for round) |
| select items | `selection.set` | `{"ids":[…]}` |
| character format | `type.char` | `{"attrs":{"fontFamily":"…","size":pt,"fill":"swatch name"}}` (on the selected text or frames) |
| paragraph format | `type.para` | `{"attrs":{"align":"right|center|left|rightJustified|leftJustified","spaceAfter":pt}}` |
| paragraph style | `style.paragraph.apply` | `{"name":"…"}` |
| Arabic columns | `story.setDirection` | `{"direction":"rightToLeft"}` |
| swatch / fill / stroke | `swatch.create`, `object.fill`, `object.stroke` | `{"name":"…","color":"#rrggbb"}`, `{"swatch":"…","ids":[…]}`, `{"swatch":"…","weight":pt}` |
| align | `object.align` | `{"edge":"hcenter|vcenter|left|right|top|bottom","to":"page|margins","ids":[…]}` |
| pages | `layout.pages.insert`, `layout.pages.delete` | `{"count":1}`, `{"pages":[index]}` |
| grid of frames | `frame.grid` | `{"rect":[…],"cols":2,"rows":2,"gutter":12}` |
| export PDF | `file.exportPdf` | `{"path":"….pdf"}` |

For anything else use `find_commands`.

## Recipes
- **Flyer / poster (one page)**: background colour frame the size of the page (fill swatch), a big title frame at
  the top third, a picture frame in the middle, body text below, contact line at the bottom; everything centred with
  `object.align` to the margins.
- **Certificate**: landscape page, border frame (stroke 3–6 pt in the brand colour), title «شهادة شكر وتقدير» large
  and centred, recipient name larger, the reason below, date and signature lines at the bottom.
- **Newsletter / magazine page**: a header band, two or three columns of body text (Arabic: right to left), pictures
  with captions, a pull quote.
- **Text that doesn't fit**: enlarge the frame (`frame.create` again bigger, or check `find_commands` "fit"), or reduce
  the size by 1 pt at a time.

## Arabic requests → command
- «عنوان / نص» → `frame.create` with text. «غيّر النص» → `set_story_text`. «صورة» → `place_image`.
- «لوّن / خلفية» → `swatch.create` + `object.fill`. «إطار / حدود» → `object.stroke`.
- «وسّط» → `object.align` hcenter (and vcenter) to the page. «يمين / ضبط» → `type.para` right / rightJustified.
- «أعمدة / هوامش» → `margins_and_columns` (margins in cm). «صفحة جديدة» → `layout.pages.insert`. «صدّر PDF» → `file.exportPdf`. «احفظ» → `save_document`.
