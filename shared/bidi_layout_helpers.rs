// ----------------------------------------------------------------------------
// Right-to-left text (see `bidi.rs`).

/// Reorder the glyphs of every row that holds right-to-left letters into visual order.
fn reorder_bidi_rows(
    fonts: &mut FontsImpl,
    pixels_per_point: f32,
    job: &LayoutJob,
    rows: &mut [PlacedRow],
) {
    let mut start = 0;
    while start < rows.len() {
        let mut end = start;
        while end + 1 < rows.len() && !rows[end].ends_with_newline {
            end += 1;
        }
        let paragraph = &mut rows[start..=end];
        let direction = super::bidi::paragraph_direction(
            paragraph.iter().flat_map(|placed| placed.row.glyphs.iter()),
        );
        if let Some(base_rtl) = direction {
            for placed in paragraph.iter_mut() {
                if placed.row.glyphs.is_empty() {
                    continue;
                }
                let row = Arc::make_mut(&mut placed.row);
                reorder_bidi_row(fonts, pixels_per_point, job, row, base_rtl);
            }
        }
        start = end + 1;
    }
}

fn reorder_bidi_row(
    fonts: &mut FontsImpl,
    pixels_per_point: f32,
    job: &LayoutJob,
    row: &mut Row,
    base_rtl: bool,
) {
    use super::bidi;

    let units = bidi::units(&row.glyphs);
    let Some(levels) = bidi::glyph_levels(&row.glyphs, &units, base_rtl) else {
        return;
    };

    // Brackets and the like on a right-to-left level face the other way.
    for (glyph, level) in row.glyphs.iter_mut().zip(&levels) {
        if level.is_rtl()
            && let Some(mirror) = bidi::mirrored(glyph.chr)
            && let Some(new_glyph) = glyph_for_char(fonts, pixels_per_point, job, glyph, mirror)
        {
            *glyph = new_glyph;
        }
    }

    let unit_levels: Vec<u8> = units
        .iter()
        .map(|u| levels.get(u.range.start).map_or(0, |l| l.number()))
        .collect();
    let order = bidi::visual_order(&unit_levels);
    if order.iter().enumerate().all(|(i, &u)| i == u) {
        return;
    }

    // Each unit keeps its width (gaps from letter spacing included) and moves as a block.
    let lefts: Vec<f32> = units
        .iter()
        .map(|u| row.glyphs.get(u.range.start).map_or(0.0, |g| g.pos.x))
        .collect();
    let widths: Vec<f32> = (0..units.len())
        .map(|k| match lefts.get(k + 1) {
            Some(next) => next - lefts[k],
            None => row
                .glyphs
                .get(units[k].range.clone())
                .map_or(0.0, |gs| gs.iter().map(|g| g.advance_width).sum()),
        })
        .collect();

    let mut cursor = lefts.first().copied().unwrap_or(0.0);
    let mut glyphs = Vec::with_capacity(row.glyphs.len());
    for &u in &order {
        let delta = ((cursor - lefts[u]) * pixels_per_point).round() / pixels_per_point;
        if let Some(unit_glyphs) = row.glyphs.get(units[u].range.clone()) {
            glyphs.extend(unit_glyphs.iter().map(|g| {
                let mut g = *g;
                g.pos.x += delta;
                g
            }));
        }
        cursor += widths[u];
    }
    if glyphs.len() == row.glyphs.len() {
        row.glyphs = glyphs;
    }
}

/// A glyph for `chr` in the same section and place as `template` (used for mirroring).
fn glyph_for_char(
    fonts: &mut FontsImpl,
    pixels_per_point: f32,
    job: &LayoutJob,
    template: &Glyph,
    chr: char,
) -> Option<Glyph> {
    let section = job.sections.get(template.section_index as usize)?;
    let mut font = fonts.font(&section.format.font_id.family);
    let font_size = section.format.font_id.size;
    let face_key = font.resolve_face(chr);
    let metrics = font
        .fonts_by_id
        .get(&face_key)?
        .styled_metrics(pixels_per_point, font_size, &section.format.coords);
    let (_, info) = font.glyph_info(chr, &metrics);
    let glyph_id = info.id?;
    let face = font.fonts_by_id.get_mut(&face_key)?;
    let (alloc, physical_x) = face.allocate_glyph(
        font.atlas,
        &metrics,
        &ShapedGlyph {
            glyph_id,
            h_pos: template.pos.x * pixels_per_point,
            is_cjk: false,
        },
    );
    Some(Glyph {
        chr,
        pos: pos2(physical_x as f32 / pixels_per_point, template.pos.y),
        advance_width: info.advance_width_unscaled.0 * metrics.px_scale_factor / pixels_per_point,
        uv_rect: alloc.uv_rect,
        ..*template
    })
}
