# Sada (صدى) — audio editing and mixing

Sada works like Pro Tools: a session of tracks (audio, aux, MIDI, instrument) with clips on a timeline, a mixer
(volume, pan, plug-in inserts in slots 0–9, sends) and a master. Write every time as `{"seconds": 12.5}`: a bare
number means samples, not seconds.

## Working like a professional audio engineer
- `document_info` (`inspect_session` summary) lists tracks (names, clips, inserts), markers and the transport.
- Voice (podcast, narration, lesson): on the voice track insert in this order — `eq_7band` (cut rumble below ~80 Hz),
  `compressor` (gentle, ratio 3:1), `de_esser`, then `maximizer` on the master if it must be loud. Normalise or level
  clips with `clip.gain` / `audiosuite.process` normalize.
- Music under speech: music track volume −18 to −12 dB (`mix.volume`), fade in and out (`edit.fades_create`).
- Space: one `room_reverb` or `plate_reverb` (mix 15–25%) rather than reverb on everything; delays `mod_delay`.
- Panning: voices centre; instruments spread (`mix.pan` −1 left … 1 right).
- Loudness for sharing: speech/podcast about −16 LUFS, music about −14 LUFS; `bounce_mix` reports the LUFS.
- Don't bounce or save unless asked; then `bounce_mix` (wav/aiff/flac) or `save_session`.

## Core commands (run with `run_command`)
| task | id | params |
|---|---|---|
| new track | `track.new` | `{"kind":"audio","format":"mono|stereo","name":"…"}` |
| rename track | `track.rename` | `{"track":"…","name":"…"}` |
| volume / pan | `mix.volume`, `mix.pan` | `{"tracks":["name"],"db":-6}`, `{"tracks":["name"],"pan":-0.5}` |
| insert a plug-in | `mix.insert` | `{"track":"name","slot":0,"plugin":"eq_7band|compressor|de_esser|expander_gate|room_reverb|plate_reverb|mod_delay|maximizer|saturator|chorus","params":{…}}` |
| clip gain | `clip.gain` | `{"clips":[id],"db":3}` |
| process a clip | `audiosuite.process` | `{"process":"normalize|reverse|gain|time_stretch|pitch_shift","clips":[id]}` |
| fades | `edit.fades_create` | `{"tracks":["name"],"start":{"seconds":0},"end":{"seconds":3},"shape":"s-curve"}` |
| trim to a range | `edit.trim_to_selection` | `{"tracks":["name"],"start":{"seconds":s},"end":{"seconds":e}}` |
| go to a time | `transport.locate` | `{"at":{"seconds":s}}` |
| tempo / meter | `event.tempo`, `event.meter` | (find_commands for params) |

Built-in plug-ins: eq_1band, eq_7band, compressor, expander_gate, de_esser, maximizer, channel_strip, room_reverb,
plate_reverb, mod_delay, chorus, flanger, phaser, saturator, lofi, pitch_shifter, gain, trim, dither; instruments:
subtractive_synth, drum_synth, sampler. For anything else use `find_commands`.

## Recipes
- **Clean a voice recording**: import to a mono track → insert expander_gate (slot 0), eq_7band (1), compressor (2),
  de_esser (3) → normalise the clip → bounce at about −16 LUFS.
- **Podcast with music**: voice track as above; music on a stereo track at −15 dB with a 3 s fade in and a 5 s fade
  out; the music ends after the last word.
- **Lesson audio**: one voice track, cut long silences, normalise, bounce wav.

## Arabic requests → tool
- «استورد / ضيف صوت» → `import_audio`. «مسار جديد» → `track.new`. «ارفع / خفّض الصوت» → `mix.volume`.
- «نقّ الصوت / شيل الضجيج» → expander_gate + eq (`mix.insert`). «صدى / ريفيرب» → `add_effect` room_reverb.
- «تلاشي / فيد إن / فيد آوت» → `fade_clip` (seconds). «وحّد مستوى الصوت» → `audiosuite.process` normalize.
- «صدّر / اطلع الملف» → `bounce_mix`. «احفظ الجلسة» → `save_session`.
