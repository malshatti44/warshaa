# Satr (سطر) — word processor

Satr works like Word: a document of paragraphs (blocks) with styles (Normal, Heading 1–3, Title, …), lists, tables,
pictures, headers and footers, in sections with page size and margins. Editing happens at the **caret**: typing
replaces the selection; formatting commands apply to the selection (or the caret's paragraph).
Arabic paragraphs are right to left by themselves.

## Working like a professional writer
- `document_info` shows the blocks (index, style, text), pages and sections; `get_text` the plain text; `look` a page.
- Where you type: `caret.docEnd` before adding at the end, `caret.docStart` for the beginning; `select_text` to
  select words or a paragraph you want to change or format.
- Write whole paragraphs with `type_text` `{"text":"…","paragraphs":true}` (one paragraph per line).
- Structure with styles, not manual formatting: titles `para.heading1`, sections `para.heading2`, sub-sections
  `para.heading3`, body `para.normal`. Then a table of contents is one command (`references.toc`).
- Formal Arabic documents: a clear title, short paragraphs, consistent fonts (one for headings, one for text), 1.15–1.5
  line spacing, justified text (`para.align` `{"value":"justify"}`) for long text.
- Letters: date, recipient, subject line, greeting, body, closing («وتفضلوا بقبول فائق الاحترام والتقدير»), signature.
- Don't save or export unless asked; then `save_document` with the extension of the format (.docx, .pdf, .odt, …).

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| go to end / start | `caret.docEnd`, `caret.docStart` | `{}` |
| new paragraph | `text.newParagraph` | `{}` |
| select all / a text | `select.all`, `select.text` | `{}` / `{"text":"…","occurrence":1}` |
| heading styles | `para.heading1`, `para.heading2`, `para.heading3`, `para.normal` | `{}` |
| any style | `para.style` | `{"style":"Title|Heading 1|Quote|…"}` |
| bold / italic / underline | `format.bold`, `format.italic`, `format.underline` | `{"value":true}` |
| font / size / colour | `format.font`, `format.size`, `format.color` | `{"name":"…"}`, `{"size":pt}`, `{"color":"RRGGBB"}` (no #) |
| highlight | `format.highlight` | `{"color":"yellow"}` |
| alignment | `para.align` | `{"value":"right|center|left|justify"}` |
| direction | `para.rtl`, `para.ltr` | `{"value":true}` |
| line spacing / spacing | `para.lineSpacing`, `para.spacing` | `{"value":1.5}`, `{"before":pt,"after":pt}` |
| bullets / numbering | `para.bullets`, `para.numbering` | `{}` / `{"kind":"numbered"}` (`{"off":true}` removes) |
| table | `insert.table` | `{"rows":n,"cols":n}` |
| picture | `insert.picture` | `{"path":"…","width":pt}` |
| page break | `insert.pageBreak` | `{}` |
| header / footer / page numbers | `insert.header`, `insert.footer`, `insert.pageNumber` | `{"text":"…"}`, `{"position":"bottom","align":"center"}` |
| table of contents | `references.toc` | `{"levels":3,"title":"المحتويات"}` |
| find and replace all | `edit.replaceAll` | `{"text":"…","with":"…"}` |
| page setup | `layout.size`, `layout.orientation`, `layout.margins` | `{"name":"A4"}`, `{"value":"landscape"}`, `{"preset":"normal"}` |
| word count | `review.wordCount` | `{}` |
| undo | `edit.undo` | `{}` |

For anything else use `find_commands`.

## Recipes
- **Report**: Title (`para.style` Title) → short introduction → sections each with `para.heading1` and paragraphs
  → conclusion; then `references.toc` after the title, page numbers at the bottom centre.
- **Formal letter**: as above under letters, A4, normal margins, right aligned date line.
- **Format a word or sentence**: `select_text` it → the format command(s).
- **Turn lines into a list**: `select_text` the first line, extend if needed, then `para.bullets` or `para.numbering`.
- **Table with data**: `insert.table` then type cell by cell (`type_text` then `caret.right`/Tab to move), or ask
  whether the user prefers a spreadsheet (Kashf) for many numbers.

## Arabic requests → command
- A paragraph command (heading, alignment, bullets…) works on the caret's paragraph: put the caret there first with
  `go_to_paragraph`. «السطر الأول / الفقرة الأولى» → `go_to_paragraph` 1, then the command. «الأخير» → `go_to_paragraph` -1.
- «وسّط / عنوان / نقاط للسطر N» → one call: `format_paragraph` `{"paragraph":N,"align":"center"}` (or style / list).
- «اكتب / أضف فقرة» → `caret.docEnd` then `type_text` with paragraphs. «عنوان» → the caret on that line, then `para.heading1`.
- «استبدل X بـ Y» (a word everywhere) → one call: `replace_all` `{"text":"X","with":"Y"}`. Don't select first.
- New list («اكتب … على شكل نقاط / قائمة») → `caret.docEnd`, `para.bullets` (or `para.numbering`), then `type_text` the
  items with paragraphs:true. Never type "1." "-" or "•" yourself. Existing lines → select them, then `para.bullets`.
- «غامق / عريض» → `format.bold`. «مائل» → `format.italic`. «تسطير» → `format.underline`. «لوّن» → `format.color`.
- «وسّط» → `para.align` center. «ضبط / محاذاة من الجهتين» → justify. «يمين / يسار» → right / left.
- «نقاط» → `para.bullets`. «ترقيم» → `para.numbering`. «جدول» → `insert.table`. «فهرس» → `references.toc`.
- «رقم الصفحات» → `insert.pageNumber`. «استبدل كل …» → `edit.replaceAll`. «كم كلمة» → `review.wordCount`.
- «احفظ PDF / Word» → `save_document` with .pdf / .docx.
