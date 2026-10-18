# Watheeq (وثيق) — PDF documents

Watheeq works like Acrobat: open PDFs (each gets a document id), read and search text, rotate, delete, insert, extract
and reorder pages, combine and split files, add text, stamps, watermarks, headers and footers, fill forms, recognise
scanned text (OCR), protect with a password, reduce the size, and export to Word, images or text. Pages are numbered
from 1; positions are points from the top-left of the page.

## Working like a professional
- The file open in the window is named in the app state: `doc_open` it first (you get its `doc` id), then work on that id.
- Read before acting: `document_info` (pages, sizes, bookmarks, forms, security), `text_extract` (some or all pages),
  `text_find` (where a phrase is); `look` shows a page.
- Write the result to a **new file** next to the original (`<name>-edited.pdf`, `<name>-signed.pdf`…) with `doc_save`
  `{"doc":id,"path":"…"}`; saving over the original asks the user first.
- Scans: `ocr.recognize` first (Arabic and English) so the text can be searched, copied or exported.
- Sharing by email: `optimize.reduce` to a new path. Confidential: `protect.password`.
- Summaries and answers about a PDF: `text_extract` then answer in the user's language, citing page numbers.

## Core commands (run with `run_command`, always with `"doc":id`)
| task | id | params |
|---|---|---|
| rotate pages | `page.rotate` | `{"doc":id,"pages":[1,2],"degrees":90}` |
| delete pages | `page.delete` | `{"doc":id,"pages":[3]}` |
| blank page | `page.insert_blank` | `{"doc":id,"at":2}` |
| insert pages from a file | `page.insert` | `{"doc":id,"at":2,"path":"…"}` |
| extract pages | `page.extract` | `{"doc":id,"pages":[1,2],"out":"….pdf"}` |
| add text | `edit.text` | `{"doc":id,"page":1,"at":[x,y],"text":"…","size":14}` |
| watermark | `edit.watermark` | `{"doc":id,"text":"سري","opacity":0.2,"font_size":60,"rotation":45}` |
| header / footer | `edit.header_footer` | `{"doc":id,…}` (find_commands for the fields) |
| stamp | `comment.stamp` | `{"doc":id,"page":1,"at":[x,y],…}` |
| fill & sign text | `sign.fill.text` | `{"doc":id,"page":1,"at":[x,y],"text":"…","font_size":12}` |
| OCR | `ocr.recognize` | `{"doc":id}` |
| password | `protect.password` | `{"doc":id,…}` (find_commands for the fields) |
| reduce size | `optimize.reduce` | `{"doc":id,"path":"…"}` |
| to Word / images | `export.docx`, `export.image` | `{"doc":id,"path":"….docx"}`, `{"doc":id,"dpi":150,…}` |

Combine and split have their own tools: `doc_combine` (files in order → one PDF) and `doc_split` (every N pages, before
given pages, or by bookmarks). For anything else use `find_commands`.

## Recipes
- **Merge files**: `doc_combine` with the paths in order and an `out` path.
- **Take pages 3–5 out as a new file**: `page.extract` with `pages` [3,4,5] and `out`.
- **Sign a form**: `doc_open`, `sign.fill.text` for the name and date at the right places (`text_find` "التوقيع" to find
  where), save as `-signed.pdf`.
- **Scanned paper to editable Word**: `ocr.recognize`, then `export.docx`.

## Arabic requests → tool
- «حوّل الصفحات الممسوحة / الصور إلى نص» (a scan, no selectable text) → `recognize_text` (it saves `<name>-نص.txt`).
- «افتح» → `doc_open`. «لخّص / وش يقول» → `text_extract` then summarise. «ابحث عن» → `text_find`.
- «دوّر الصفحة» → `page.rotate`. «احذف الصفحة» → `page.delete`. «استخرج الصفحات / صفحات في ملف منفصل» → one call: `extract_pages` `{"pages":[2,3]}`; it writes the new file itself (doc_save would save the whole document).
- «ادمج الملفات» → `doc_combine`. «قسّم الملف» → `doc_split`. «علامة مائية» → `edit.watermark`.
- «وقّع / عبّ النموذج» → `sign.fill.text`. «صغّر الحجم» → `optimize.reduce`. «حوّله وورد» → `export.docx`.
- «احمه بكلمة سر» → `protect.password`. «اقرأ الصورة / الممسوح» → `ocr.recognize`. «احفظ» → `doc_save` with a new path.
