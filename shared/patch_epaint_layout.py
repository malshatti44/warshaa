"""Patch epaint 0.36.2 text_layout.rs: direction-aware runs and bidi row reordering."""
import pathlib

p = pathlib.Path(r"E:\craft-ar\shared\epaint\src\text\text_layout.rs")
s = p.read_text(encoding="utf-8")


def sub(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)


# 1. TextRun gets a direction
sub("""    /// Byte range within the section text.
    byte_range: ByteRange,
}""", """    /// Byte range within the section text.
    byte_range: ByteRange,

    /// Right-to-left letters (Arabic, Hebrew…): shaped right to left, then placed by
    /// [`super::bidi`]. Every other run is shaped left to right.
    rtl: bool,
}""")

# 2. segment_into_runs splits on direction too
sub("""        let base_char = grapheme_str.chars().next().unwrap_or(' ');
        let font_key = font.resolve_face(base_char);

        if let Some(last_run) = out.last_mut()
            && last_run.font_key == font_key
        {
            last_run.byte_range.end = byte_end;
            continue;
        }
        out.push(TextRun {
            font_key,
            byte_range: byte_offset..byte_end,
        });""", """        let base_char = grapheme_str.chars().next().unwrap_or(' ');
        let font_key = font.resolve_face(base_char);
        let rtl = super::bidi::is_rtl_char(base_char);

        if let Some(last_run) = out.last_mut()
            && last_run.font_key == font_key
            && last_run.rtl == rtl
        {
            last_run.byte_range.end = byte_end;
            continue;
        }
        out.push(TextRun {
            font_key,
            byte_range: byte_offset..byte_end,
            rtl,
        });""")

# 3. shape_text takes the run direction
sub("""            let glyph_buffer = shape_text(font_face, run_text, &format.coords, shape_buffer, flags);""",
    """            let glyph_buffer =
                shape_text(font_face, run_text, &format.coords, shape_buffer, flags, run.rtl);""")
sub("""    mut buffer: harfrust::UnicodeBuffer,
    flags: harfrust::BufferFlags,
) -> harfrust::GlyphBuffer {""", """    mut buffer: harfrust::UnicodeBuffer,
    flags: harfrust::BufferFlags,
    rtl: bool,
) -> harfrust::GlyphBuffer {""")
sub("""    buffer.guess_segment_properties();

    shaper.shape(buffer, harfrust::ShapeOptions::new())""", """    buffer.guess_segment_properties();
    // Runs are split by direction, so say it rather than guess it: a guess makes
    // Arabic-Indic digits (script Arabic, but left to right) come out backwards.
    buffer.set_direction(if rtl {
        harfrust::Direction::RightToLeft
    } else {
        harfrust::Direction::LeftToRight
    });

    shaper.shape(buffer, harfrust::ShapeOptions::new())""")

# 4. reorder rows after elision, before alignment
sub("""    let justify = job.justify && job.wrap.max_width.is_finite();
""", """    reorder_bidi_rows(fonts, pixels_per_point, &job, &mut rows);

    let justify = job.justify && job.wrap.max_width.is_finite();
""")

helpers = pathlib.Path(r"E:\craft-ar\shared\bidi_layout_helpers.rs").read_text(encoding="utf-8")
marker = "// ----------------------------------------------------------------------------\n\n#[cfg(test)]\nmod tests {"
sub(marker, helpers.strip("\n") + "\n\n" + marker)

p.write_text(s, encoding="utf-8", newline="\n")

m = pathlib.Path(r"E:\craft-ar\shared\epaint\src\text\mod.rs")
ms = m.read_text(encoding="utf-8")
if "pub mod bidi;" not in ms:
    ms = ms.replace("pub mod cursor;", "pub mod bidi;\npub mod cursor;", 1)
    m.write_text(ms, encoding="utf-8", newline="\n")
print("patched")
