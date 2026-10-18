"""Sada (audio) tasks. Each starts with a new empty session (48 kHz)."""
import glob
import json
import math
import os
import struct
import wave


def session(m):
    return json.loads(m.call("inspect_session", {})[1])


def setup(m, ad, work):
    m.call("new_session", {})
    return "app state: a new empty session is open (48 kHz, no tracks); work in it"


def write_voice(work):
    p = os.path.join(work, "voice.wav")
    with wave.open(p, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(48000)
        w.writeframes(b"".join(struct.pack("<h", int(8000 * math.sin(2 * math.pi * 220 * i / 48000))) for i in range(48000 * 2)))
    return p


def with_file(m, work):
    write_voice(work)


def with_track(m, work):
    m.call("import_audio", {"path": write_voice(work)})


def tracks(m):
    return session(m).get("tracks") or []


def c_new_track(m, a, w):
    t = [x for x in tracks(m) if "تعليق" in (x.get("name") or "")]
    if not t:
        return 0, f"tracks {[x.get('name') for x in tracks(m)]}"
    return (1, "stereo track «تعليق»") if t[0].get("format") == "Stereo" else (0.6, f"format {t[0].get('format')}")


def c_import(m, a, w):
    clips = sum(len(x.get("clips") or []) for x in tracks(m))
    return (1, f"{clips} clip") if clips else (0, "no clips")


def c_tempo(m, a, w):
    bpm = [t.get("bpm") for t in session(m).get("tempo") or []]
    return (1, "90 bpm") if bpm and abs(bpm[0] - 90) < 0.01 else (0, f"tempo {bpm}")


def c_louder(m, a, w):
    t = tracks(m)
    if not t:
        return 0, "no track"
    vol = t[0].get("volume_db", 0)
    gain = max((c.get("gain_db", 0) for c in t[0].get("clips") or []), default=0)
    if 0 < vol <= 12 or 0 < gain <= 12:
        return 1, f"volume {vol} dB, clip gain {gain} dB"
    return 0, f"volume {vol} dB, clip gain {gain} dB"


def c_reverb(m, a, w):
    t = tracks(m)
    ins = [json.dumps(i, ensure_ascii=False).lower() for x in t for i in x.get("inserts") or []]
    ok = any("reverb" in i for i in ins)
    return (1, "reverb insert") if ok else (0, f"inserts {ins[:3]}")


def c_bounce(m, a, w):
    out = [p for p in glob.glob(os.path.join(w, "**", "*.*"), recursive=True)
           if os.path.basename(p) != "voice.wav" and p.lower().endswith((".wav", ".mp3", ".flac", ".aif", ".aiff"))]
    return (1, os.path.basename(out[0])) if out else (0, "no audio file written")


def c_fades(m, a, w):
    clips = [c for x in tracks(m) for c in x.get("clips") or []]
    if not clips:
        return 0, "no clip"
    c = clips[0]
    fi, fo = c.get("fade_in", 0), c.get("fade_out", 0)
    score = 1 if fi and fo else 0.5 if fi or fo else 0
    return score, f"fades {fi}/{fo}"


def c_save(m, a, w):
    found = [p for p in glob.glob(os.path.join(w, "**", "*"), recursive=True) if os.path.isfile(p) and not p.endswith(".wav")]
    return (1, os.path.basename(found[0])) if found else (0, "no session file")


TASKS = [
    ("أضف مسار صوت ستيريو اسمه «تعليق»", None, c_new_track),
    ("استورد الملف voice.wav من المجلد {work}", with_file, c_import),
    ("خلّ سرعة الجلسة ٩٠", None, c_tempo),
    ("ارفع صوت المسار شوي", with_track, c_louder),
    ("أضف صدى (ريفيرب) على المسار", with_track, c_reverb),
    ("صدّر المكس كملف wav في المجلد {work}", with_track, c_bounce),
    ("أضف فيد إن وفيد آوت للمقطع", with_track, c_fades),
    ("احفظ الجلسة في المجلد {work} باسم مشروعي", None, c_save),
]
