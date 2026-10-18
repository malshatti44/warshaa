# Monteer (مونتير) — video editing

Monteer works like Premiere Pro: a project holds media items (videos, sounds, pictures) in bins and sequences; a
sequence has video tracks (V1, V2…) and audio tracks (A1, A2…) with clips on a timeline. Times are given in
seconds to the helper tools; the app itself counts in ticks (254016000000 per second) — never compute ticks yourself.

## Working like a professional editor
- `document_info` shows the project (items with ids and durations, sequences) and the active sequence (tracks,
  clips with ids, start and duration); `look` shows the frame at the playhead (or at `seconds`).
- Order of work: import media (`media_import`) → make a sequence (`file.newSequence`, or `file.newSequenceFromClip`
  from the first clip so the settings match it) → place clips (`place_clip`) → trims and cuts → transitions → titles
  → music and levels → export.
- Pacing: cut on action, 2–5 s per shot for promos and social media, longer for talks; short cross dissolves
  (10–20 frames) between scenes, not between every clip.
- Social formats: horizontal 1920×1080; vertical (Reels/TikTok/Shorts) 1080×1920; square 1080×1080.
- Music under speech goes low (about −18 dB to −12 dB); fade music in and out (`sequence.applyAudioTransition`).
- Titles: `graphics.newText` — large, short, on screen 3–5 s; keep them inside the safe area (10% from the edges).
- Arabic subtitles: a caption track (`captions.newTrack`) and `captions.add` for each line.
- Export: `file.exportMedia` `{"path":"….mp4","format":"h264"}` (h264 for sharing). Don't export or save unless asked.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| new sequence | `file.newSequence` | `{"name":"…","width":1920,"height":1080,"fps":30}` |
| sequence from a clip | `file.newSequenceFromClip` | `{"items":[item id]}` |
| cut at a time | `playhead.set` then `sequence.addEditAllTracks` | `{"seconds":s}` then `{}` (cuts every track at the playhead) |
| delete and close the gap | `edit.rippleDelete` | `{"clips":[id]}` |
| move the playhead | `playhead.set` | `{"seconds":12.5}` |
| speed | `clip.speedDuration` | `{"clips":[id],"speed":200}` |
| video transition | `sequence.applyVideoTransition` | `{"clip":id,"effect":"cross_dissolve","frames":15,"edge":"in"}` |
| audio fade | `sequence.applyAudioTransition` | `{"clip":id,"effect":"constant_power","frames":30,"edge":"out"}` |
| effect | `effects.apply` | `{"clips":[id],"effect":"gaussian_blur"}` |
| title | `graphics.newText` | `{"text":"…","seconds":4,"size":120}` |
| captions | `captions.newTrack`, `captions.add` | `{"format":"Subtitle","language":"ar"}`, `{"text":"…","seconds":s,"durationSeconds":3}` |
| export | `file.exportMedia` | `{"path":"….mp4","format":"h264"}` |

For anything else use `find_commands`.

## Recipes
- **Quick edit from clips**: import → sequence from the first clip → `place_clip` each clip back to back on V1
  (`at_seconds` = end of the previous) → cross dissolves between scenes → music on A1 for the whole length with a fade
  out → a title at the start.
- **Vertical reel**: sequence 1080×1920, 30 fps; place clips; titles centred; export h264.
- **Trim the start of a clip**: place it with `source_in_seconds`, or find_commands "trim".
- **Remove a section**: `playhead.set` to its start + `sequence.addEditAllTracks`; the same at its end; then
  `edit.rippleDelete` the clip in between (its id from `document_info`).

## Arabic requests → tool
- «استورد / ضيف فيديو» → `media_import`. «حط المقطع / ضيفه على الخط الزمني» → `place_clip`.
- «سلسلة جديدة / مشروع عمودي» → `file.newSequence`. «قص عند الثانية N» → `playhead.set` + `sequence.addEditAllTracks`. «احذف الجزء» → `edit.rippleDelete`.
- «انتقال / تلاشي» → `add_transition` (edge in = the clip's start, out = its end). «موسيقى» → `media_import` + `place_clip` on A1.
- «عنوان / نص» → `graphics.newText`. «ترجمة / كابشن» → captions. «سرّع / بطّئ» → `clip.speedDuration`.
- «صدّر فيديو» → `file.exportMedia`.
