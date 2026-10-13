"""Translation memory for the Arabic builds.

  python tm.py batches     -> (re)write batches/NNNN.in.tsv for every key without a translation
  python tm.py check NNNN  -> validate batches/NNNN.out.tsv against its .in.tsv
  python tm.py merge       -> fold every valid *.out.tsv into tm.json
  python tm.py stats

A key is the English source, or "ctx\x1fsource" for a disambiguating context (not @id/@plural).
Batch files hold one row per key: "id <TAB> ctx <TAB> source" in, "id <TAB> arabic" out
(\\n and \\t escaped). Seeds: the upstream Arabic rows of pdfcraft and designcraft.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(r"E:\craft-ar\i18n")
KEYS = ROOT / "keys"
BATCH = ROOT / "batches"
BATCH.mkdir(exist_ok=True)
TM = ROOT / "tm.json"
APP_ORDER = ["craft-launcher", "gridcraft", "effectcraft", "cadcraft", "designcraft", "wordcraft",
             "deckcraft", "soundcraft", "pdfcraft", "photocraft", "lightcraft", "filmcraft", "vectorcraft"]
BATCH_WORDS = 1500
BATCH_ROWS = 260


def esc(s):
    return s.replace("\\", "\\\\").replace("\n", "\\n").replace("\t", "\\t")


def unesc(s):
    out, i = [], 0
    while i < len(s):
        if s[i] == "\\" and i + 1 < len(s):
            out.append({"n": "\n", "t": "\t", "\\": "\\"}.get(s[i + 1], s[i + 1]))
            i += 2
        else:
            out.append(s[i])
            i += 1
    return "".join(out)


def key_of(ctx, src):
    if ctx and not ctx.startswith("@"):
        return ctx + "\x1f" + src
    if ctx in ("@plural", "@id"):
        return ctx + "\x1f" + src
    return src


def load_tm():
    return json.loads(TM.read_text(encoding="utf-8")) if TM.exists() else {}


def save_tm(tm):
    TM.write_text(json.dumps(dict(sorted(tm.items())), ensure_ascii=False, indent=0), encoding="utf-8")


PH = re.compile(r"\{[^{}]*\}|%[sd]|\$\d")


def placeholders(s):
    return sorted(PH.findall(s))


def problems(src, ar, ctx=""):
    out = []
    if ctx == "@id":
        return [] if ar.strip() else ["empty"]
    if ctx in ("@format", "@template"):
        return format_problems(src, ar)
    if ctx == "@plural":
        forms = ar.split("|")
        if len(forms) != 6:
            out.append(f"{len(forms)} plural forms, want 6 (zero|one|two|few|many|other)")
        want = set(placeholders(src.split("|")[-1]))
        for f in forms:
            if set(placeholders(f)) != want:
                out.append(f"form {f[:30]!r} placeholders {sorted(set(placeholders(f)))} want {sorted(want)}")
        return out
    if placeholders(src) != placeholders(ar):
        out.append(f"placeholders {placeholders(src)} vs {placeholders(ar)}")
    for shortcut in re.findall(r"\((?:Ctrl|⌘|Cmd|Shift|Alt|⌥|⇧)[^)\s]*\)", src):
        if shortcut not in ar:
            out.append(f"shortcut {shortcut} missing")
    if src.endswith("…") != ar.endswith("…"):
        out.append("ellipsis")
    if src.count("\n") != ar.count("\n"):
        out.append("newlines")
    if "|" in src and src.count("|") != ar.count("|") and not key_of("@plural", src):
        out.append("pipes")
    if not ar.strip() and src.strip():
        out.append("empty")
    return out


RUST_PH = re.compile(r"(?<!\{)\{([^{}:]*)(:[^{}]*)?\}(?!\})")


def format_problems(src, ar):
    """Rust format! strings: positional args keep their order, named args their set; a plural
    suffix (`photo{}` in English) may become `{:.0}` (consumes the arg, prints nothing)."""
    def parse(t):
        pos, named = [], set()
        for name, spec in RUST_PH.findall(t):
            if name == "" or name.isdigit():
                pos.append(name)
            else:
                named.add(name)
        return pos, named
    sp, sn = parse(src)
    ap, an = parse(ar)
    out = []
    if len(sp) != len(ap):
        out.append(f"positional args {len(sp)} vs {len(ap)}")
    if sn != an:
        out.append(f"named args {sorted(sn)} vs {sorted(an)}")
    if src.count("{{") != ar.count("{{") or src.count("}}") != ar.count("}}"):
        out.append("escaped braces")
    if not ar.strip():
        out.append("empty")
    return out


def all_keys():
    seen, ordered, seeds = set(), [], {}
    for app in APP_ORDER:
        f = KEYS / f"{app}.json"
        if not f.exists():
            continue
        for r in json.loads(f.read_text(encoding="utf-8")):
            k = key_of(r["ctx"], r["src"])
            if r.get("ar") and k not in seeds:
                seeds[k] = r["ar"]
            if k in seen:
                continue
            seen.add(k)
            ordered.append((k, r["ctx"], r["src"], app, r.get("hint")))
    return ordered, seeds


def cmd_batches():
    tm = load_tm()
    ordered, seeds = all_keys()
    for k, v in seeds.items():
        tm.setdefault(k, v)
    save_tm(tm)
    pending_out = {p.name.split(".")[0] for p in BATCH.glob("*.out.tsv")}
    for p in BATCH.glob("*.in.tsv"):
        if p.name.split(".")[0] not in pending_out:
            p.unlink()
    todo = [x for x in ordered if x[0] not in tm and x[2].strip() and not is_untranslatable(x[2])]
    in_flight = set()
    for p in BATCH.glob("*.in.tsv"):
        for line in p.read_text(encoding="utf-8").splitlines():
            in_flight.add(line.split("\t")[0])
    n = max([int(p.name[:4]) for p in BATCH.glob("*.in.tsv")] + [0])
    rows, words, made = [], 0, 0
    todo = [x for x in todo if x[0] not in in_flight]

    def flush():
        nonlocal n, rows, words, made
        if not rows:
            return
        n += 1
        made += 1
        with open(BATCH / f"{n:04d}.in.tsv", "w", encoding="utf-8", newline="\n") as f:
            for i, (k, ctx, src, app, hint) in enumerate(rows):
                shown = ctx if ctx in ("@plural", "@id", "@format", "@template") or not ctx.startswith("@") else ""
                f.write(f"{n:04d}-{i:03d}\t{esc(shown)}\t{esc(src)}\t{app}\t{esc(hint or '')}\n")
        rows, words = [], 0

    for x in todo:
        rows.append(x)
        words += len(x[2].split())
        if words >= BATCH_WORDS or len(rows) >= BATCH_ROWS:
            flush()
    flush()
    print(f"{len(todo)} keys to translate in {made} new batches; tm has {len(tm)}")


def is_untranslatable(src):
    s = src.strip()
    if not re.search(r"[A-Za-z]{2,}", s):
        return True  # symbols, numbers, units like "px", "%"
    return False


def read_in(num):
    rows = {}
    for line in (BATCH / f"{num}.in.tsv").read_text(encoding="utf-8").splitlines():
        id_, ctx, src, app = line.split("	")[:4]
        rows[id_] = (unesc(ctx), unesc(src), app)
    return rows


def read_out(num):
    out = {}
    for ln, line in enumerate((BATCH / f"{num}.out.tsv").read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        if "\t" not in line:
            print(f"  line {ln}: no tab: {line[:60]}")
            continue
        id_, ar = line.split("\t", 1)
        out[id_.strip()] = unesc(ar)
    return out


def cmd_check(num):
    ins, outs = read_in(num), read_out(num)
    bad = 0
    for id_, (ctx, src, app) in ins.items():
        if id_ not in outs:
            print(f"  MISSING {id_}: {src[:70]}")
            bad += 1
            continue
        p = problems(src, outs[id_], ctx)
        if p:
            bad += 1
            print(f"  {id_}: {'; '.join(p)}\n     src: {src[:100]}\n     ar : {outs[id_][:100]}")
    extra = set(outs) - set(ins)
    for e in extra:
        print(f"  EXTRA id {e}")
    print(f"batch {num}: {len(ins)} rows, {bad} problems, {len(extra)} extra")
    return bad == 0 and not extra


def cmd_merge():
    tm = load_tm()
    added = 0
    for p in sorted(BATCH.glob("*.out.tsv")):
        num = p.name[:4]
        ins, outs = read_in(num), read_out(num)
        for id_, (ctx, src, app) in ins.items():
            if id_ in outs and not problems(src, outs[id_], ctx):
                k = key_of(ctx, src)
                if k not in tm:
                    added += 1
                tm[k] = outs[id_]
    save_tm(tm)
    print(f"merged {added} new; tm has {len(tm)}")


def cmd_stats():
    tm = load_tm()
    ordered, _ = all_keys()
    per = {}
    for k, ctx, src, app, _ in ordered:
        d = per.setdefault(app, [0, 0])
        d[0] += 1
        if k in tm or is_untranslatable(src):
            d[1] += 1
    for app, (tot, done) in per.items():
        print(f"{app:15s} {done:5d}/{tot:5d} ({100 * done // max(tot, 1)}%) [first-owner keys]")
    print(f"tm entries: {len(tm)}")


if __name__ == "__main__":
    {"batches": cmd_batches, "merge": cmd_merge, "stats": cmd_stats}.get(sys.argv[1], lambda: None)() \
        if sys.argv[1] != "check" else cmd_check(sys.argv[2])
