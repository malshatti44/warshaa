# Kashf (كشف) — spreadsheets

Kashf works like Excel: a workbook of sheets, cells addressed A1-style ("B7", "A1:D10", "Sheet2!A1"), formulas starting
with "=", tables, charts, sorting and filters. Most work is done with the tools directly (`write_range`, `set_cell`,
`format_range`, `insert_chart`, `create_table`, `sort_range`, `filter`); `run_command` covers the rest.

## Working like a professional analyst
- Read before changing: `document_info` (sheets, used ranges, selection) and `read_range` (values, or `formulas:true`).
- Layout of a good sheet: a header row (bold, filled, centred), one column per field, one row per record, no empty
  rows inside the data, totals below with formulas, numbers right-aligned with a number format.
- Use formulas, never typed results: totals `=SUM(B2:B10)`, average `=AVERAGE(...)`, count `=COUNTA(...)`,
  conditions `=IF(B2>=50,"ناجح","راسب")`, lookups `=XLOOKUP(...)` or `=VLOOKUP(...,FALSE)`, conditional sums
  `=SUMIF(...)` / `=COUNTIF(...)`. Check a result with `evaluate_formula` or `get_cell` when it matters.
- Write a whole table in one `write_range` (rows of values, header row first; formulas as strings "=…").
- A formula is text that starts with "=" and uses cell addresses: «عمود المعدل» → the header, then one `=AVERAGE(B2:C2)`,
  `=AVERAGE(B3:C3)`… per row in a single `write_range`. Never write "(x + y) / 2" or numbers you computed.
- Arabic sheets read right to left: `view.rightToLeft` `{"on":true}` when the data is Arabic.
- Make it readable: `format_range` the header (bold, fill colour, centre), number formats (Number, Currency,
  Percentage, Date), borders `all`; `home.autofitColumnWidth`; `view.freezeTopRow` for long lists.
- Charts: column/bar to compare, line for change over time, pie for parts of a whole (≤ 6 slices); the range includes
  the header row; give a title.
- Don't save unless asked; then `save_workbook` (.xlsx, .csv, …).

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| sheet right to left | `view.rightToLeft` | `{"on":true}` |
| freeze header | `view.freezeTopRow` | `{}` |
| autofit columns | `home.autofitColumnWidth` | `{"cols":"A:F"}` |
| column width | `home.columnWidth` | `{"cols":"B:B","chars":20}` |
| merge and centre | `home.mergeCenter` | `{"range":"A1:E1"}` |
| conditional colour | `home.conditionalFormat` | `{"range":"C2:C20","rule":{"type":"cellIs","operator":"lessThan","value":"50","preset":"lightRedFill"}}` (types: cellIs, colorScale, dataBar, duplicate, top10, containsText…; presets: lightRedFill, yellowFill, greenFill, redText) |
| rename sheet | `sheet.rename` | `{"name":"…"}` |
| new sheet | `home.insertSheet` | `{"name":"…"}` |
| remove duplicates | `data.removeDuplicates` | `{"range":"A1:D50","header":true}` |

For anything else use `find_commands` (and `list_functions` for formula functions).

## Recipes
- **Grades sheet**: header [الاسم, المادة 1…, المجموع, المعدل, النتيجة]; students as rows; totals `=SUM`, average
  `=AVERAGE`, result `=IF(avg>=50,"ناجح","راسب")`; header formatted; conditional colour for failing marks; RTL.
- **Budget**: [البند, المبلغ]; total row `=SUM`; Currency format; a pie chart of the expenses.
- **Sales report**: data table (`create_table`), sort by amount descending (`sort_range`), totals, a column chart.
- **Clean data**: sort, filter, `data.removeDuplicates`.

## Arabic requests → tool
- «اكتب / أدخل / عبّ الجدول» → `write_range`. «خلية» → `set_cell`. «اقرأ / شنو قيمة» → `read_range` / `get_cell`.
- «مجموع / متوسط / عدد» → formulas `=SUM` / `=AVERAGE` / `=COUNT` with `set_cell` or `write_range`.
- «نسّق / غامق / لوّن / حدود» → `format_range`. «رسم بياني / مخطط» → `insert_chart`. «جدول منسق» → `create_table`.
- «رتّب» → `sort_range`. «فلتر / صفّي» → `filter`. «ثبّت الصف الأول / صف العناوين» → just `freeze_top_row` (no cell changes; never rewrite the data).
- «من اليمين لليسار» → `view.rightToLeft`. «احفظ / صدّر» → `save_workbook`.
