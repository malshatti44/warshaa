"""Monteer (video editing) tasks. Each starts with a project holding still.png (item 1) and
voice.wav (item 2) and an empty 1920 × 1080 sequence."""
import glob
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from tasks.nasaq import png  # noqa: E402
from tasks.sada import write_voice  # noqa: E402

TICKS = 254016000000


def seq(m):
    ok, t, _ = m.call("sequence_inspect", {})
    try:
        return json.loads(t)
    except ValueError:
        return {}


def clips(m, kind):
    return [it for tr in seq(m).get(kind) or [] for it in tr.get("items") or []]


def setup(m, ad, work):
    png(os.path.join(work, "still.png"), 320, 180)
    write_voice(work)
    m.call("media_import", {"paths": [os.path.join(work, "still.png"), os.path.join(work, "voice.wav")]})
    m.call("command_run", {"id": "file.newSequence", "params": {}})
    return ("app state: a project with media items #1 still.png (picture) and #2 voice.wav (audio, 2 s), and an empty "
            "sequence \"Sequence 01\" (1920 × 1080, 23.976 fps); work in it")


def with_still(m, work):
    m.call("command_run", {"id": "timeline.place", "params": {"item": 1, "seconds": 0, "duration": 5 * TICKS}})


def c_place(m, a, w):
    v = clips(m, "video")
    return (1, f"{len(v)} video clip") if any(c.get("item") == 1 for c in v) else (0, "no picture on the timeline")


def c_music(m, a, w):
    au = clips(m, "audio")
    return (1, "voice.wav on an audio track") if any(c.get("item") == 2 for c in au) else (0, "no audio clip")


def c_duration(m, a, w):
    v = [c for c in clips(m, "video") if c.get("item") == 1]
    if not v:
        return 0, "no picture clip"
    s = v[0].get("duration", 0) / TICKS
    return (1, f"{round(s, 2)} s") if abs(s - 5) < 0.1 else (0.4, f"{round(s, 2)} s")


def c_title(m, a, w):
    v = [c for c in clips(m, "video") if c.get("item") != 1]
    text = json.dumps(v, ensure_ascii=False)
    if "مرحبا" in text:
        return 1, "title «مرحبا»"
    return (0.5 if v else 0), f"{len(v)} other video clips"


def c_transition(m, a, w):
    tr = [t for track in seq(m).get("video") or [] for t in track.get("transitions") or []]
    fx = json.dumps(clips(m, "video")).lower()
    if tr:
        return 1, f"{len(tr)} transition(s)"
    return (0.5 if "opacity" in fx and "keyframes\": 0" not in fx else 0), "no transition"


def c_vertical(m, a, w):
    st = seq(m).get("settings") or {}
    if st.get("width") == 1080 and st.get("height") == 1920:
        return 1, "1080 × 1920"
    return 0, f"{st.get('width')} × {st.get('height')}"


def c_speed(m, a, w):
    au = [c for c in clips(m, "audio") if c.get("item") == 2]
    if not au:
        return 0, "no audio clip"
    sp = au[0].get("speed", 1)
    return (1, f"speed {sp}") if sp >= 1.9 else (0, f"speed {sp}")


def with_voice(m, work):
    m.call("command_run", {"id": "timeline.place", "params": {"item": 2, "seconds": 0}})


def c_cut(m, a, w):
    v = [c for c in clips(m, "video") if c.get("item") == 1]
    if len(v) >= 2:
        return 1, f"{len(v)} pieces"
    return 0, f"{len(v)} pieces"


TASKS = [
    ("حط الصورة على الخط الزمني", None, c_place),
    ("ضيف الملف voice.wav كصوت", None, c_music),
    ("حط الصورة على الخط الزمني وخلها تطول ٥ ثواني", None, c_duration),
    ("أضف عنوان «مرحبا»", with_still, c_title),
    ("أضف انتقال تلاشي على بداية المقطع", with_still, c_transition),
    ("خلّ السلسلة عمودية للجوال", None, c_vertical),
    ("سرّع الصوت مرتين", with_voice, c_speed),
    ("قص المقطع عند الثانية ٢", with_still, c_cut),
]
