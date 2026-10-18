"""Prototype of the in-app assistant loop (the Rust crate `warsha-assistant` follows it).

  a = Assistant(Retoush(mcp))        # mcp: a stdio_mcp.Stdio on `<app>-cli mcp`
  for ev in a.ask("زد التباين شوي"): print(ev)

The model sees a small, stable toolset with plain names (open_file, save_file, document_info, look, find_commands,
run_command, …); each app's adapter maps it onto that app's MCP server.
"""
import json
import re
import os
import time
import urllib.request

from arsearch import Index

KNOW = r"E:\warsha-src\shared\assistant\knowledge"

SYSTEM = """You are «مساعد ورشة» (Warsha Assistant), built into {app_ar} ({app_en}). You operate the app for the user with
your tools: you do the work yourself, you don't tell the user how to do it by hand.

Rules:
- Reply in the user's language (Arabic by default: clear, short Modern Standard Arabic, friendly). No tables.
- Act at once when the request is clear. Ask one short question only when you can't proceed (nothing open and no file
  named, or a choice that changes the result a lot).
- Commands: use the ids in the guide below; for anything else call `find_commands` and use the `params` it returns
  exactly. Never invent ids or parameter names. Tools (open_file, save_file, …) are called directly, never through
  run_command.
- When a tool fails, read the error and fix the call, or try another command, before giving up.
- Honesty: say something was done only when its tool call succeeded. If you could not do it, say so plainly.
- Do only what was asked: don't open, save or export files, and don't add extras, unless the request asks for it.
- Work in the document the app state names; don't create a new one unless the user asks for a new document.
- Finish with one or two sentences: what you changed (with the values), and at most one useful next step.

{guide}
"""


def fn(name, desc, props=None, required=()):
    return {"type": "function", "function": {"name": name, "description": desc,
                                             "parameters": {"type": "object", "properties": props or {}, "required": list(required)}}}


def load_ar(path):
    tsv = {}
    if not path or not os.path.exists(path):
        return tsv
    for line in open(path, encoding="utf-8"):
        p = line.rstrip("\n").split("\t")
        if not line.startswith("#") and len(p) >= 3:
            tsv.setdefault(p[1], p[2])
    return tsv


class Adapter:
    """What differs per app. Subclasses fill these in."""
    app = app_ar = ar_path = None
    catalog_tool, catalog_args = "command_list", {}

    def __init__(self, mcp):
        self.mcp = mcp
        self.opened = set()  # files the user opened: never overwritten without asking

    def hidden(self, cid):
        return False

    def run(self, cid, params):
        raise NotImplementedError

    def tools(self):
        return []

    def call(self, name, args):
        """-> (ok, text, image|None) for one of `tools()`; None when the name isn't one of them."""
        return None

    def state_line(self):
        """One line on the app after a change (size, active layer…), so the model sees what really happened."""
        return ""

    def annotate(self, c, ids):
        """A short note for a find_commands hit (e.g. a better alternative), or None."""
        return None


class Retoush(Adapter):
    app, app_ar = "retoush", "ريتوش"
    ar_path = r"E:\warsha-src\upstream\retoush\crates\ui-egui\src\i18n\ar.tsv"
    FILE_OK = {"file.new", "file.newFromClipboard", "file.close", "file.closeAll", "file.closeOthers", "file.fileInfo",
               "file.automate.fitImage", "file.automate.conditionalModeChange", "file.scripts.flattenAllLayerEffects",
               "file.scripts.flattenAllMasks", "file.scripts.deleteAllEmptyLayers"}

    def hidden(self, cid):
        if cid.startswith("file."):
            return cid not in self.FILE_OK
        return cid.startswith("layer.smartObjects.") and cid != "layer.smartObjects.convertToSmartObject" \
            or cid in ("pattern.import", "pattern.export", "edit.presets.migratePresets", "measurementLog.export", "plugin.reload") \
            or cid.startswith("layer.videoLayers.")

    def run(self, cid, params):
        ok, text, _ = self.mcp.call("command_run", {"id": cid, "params": params})
        return ok, text

    def tools(self):
        return [
            fn("open_file", "Open an image or document file (jpg, png, psd, tif, webp, raw, …) and make it the active document.",
               {"path": {"type": "string"}}, ["path"]),
            fn("new_document", "Create a new blank document.",
               {"width": {"type": "integer"}, "height": {"type": "integer"}, "background": {"type": "string", "description": "white | black | transparent | #rrggbb"},
                "name": {"type": "string"}}),
            fn("save_file", "Save or export the active document. The extension picks the format (jpg, png, psd, tif, webp). "
               "Use a new file name next to the original (e.g. name-edited.jpg); saving over the opened original asks the user first.",
               {"path": {"type": "string"}}, ["path"]),
            fn("document_info", "The active document: name, file, size, layers (top first), recent history, selection."),
            fn("look", "See the current image (a preview picture of the document)."),
            fn("crop_to_ratio", "Crop the image to an aspect ratio, keeping the largest centred area ('1:1' square, '4:5', '9:16', '16:9'), "
               "and optionally resize it to a width in the same call (Instagram: width 1080).",
               {"ratio": {"type": "string"}, "width": {"type": "integer", "description": "resize to this width after cropping (optional)"},
                "anchor": {"type": "string", "description": "center (default) | top | bottom | left | right"}}, ["ratio"]),
        ]

    def _doc(self):
        ok, text, _ = self.mcp.call("doc_inspect", {})
        return json.loads(text) if ok else None

    def state_line(self):
        d = self._doc()
        if not d:
            return "no document open"
        act = next((l for l in d.get("layers", []) if l.get("id") == d.get("activeLayer")), None)
        kind = act.get("kind") if act else "?"
        if act and kind == "Pixel" and not act.get("bounds"):
            kind = "empty pixel layer"
        sel = "selection active" if d.get("hasSelection") else "no selection"
        return (f"document {d['width']}×{d['height']}, {len(d.get('layers', []))} layers, active layer "
                f"#{d.get('activeLayer')} \"{act.get('name') if act else '?'}\" ({kind}), {sel}")

    def annotate(self, c, ids):
        if c["id"].startswith("image.adjustments."):
            alt = "layer.newAdjustmentLayer." + c["id"].split(".", 2)[2]
            if alt in ids:
                return f"prefer {alt}: same params, as an editable adjustment layer"
        return None

    def call(self, name, args):
        if name == "open_file":
            ok, text, _ = self.mcp.call("doc_open", {"path": args.get("path", "")})
            if ok:
                self.opened.add(os.path.normcase(os.path.abspath(args.get("path", ""))))
            return ok, text, None
        if name == "new_document":
            ok, text, _ = self.mcp.call("doc_new", {k: v for k, v in args.items() if v not in (None, "")})
            return ok, text, None
        if name == "save_file":
            path = args.get("path", "")
            target = os.path.normcase(os.path.abspath(path))
            if target in self.opened and not args.get("confirmed"):
                return False, "CONFIRM:" + path, None
            a = {"path": path}
            ok, text, _ = self.mcp.call("doc_save", a)
            return ok, text or "saved", None
        if name == "document_info":
            d = self._doc()
            if d is None:
                return False, "no document open", None
            layers = []
            for l in d.get("layers", []):
                kind = l.get("kind")
                if kind == "Adjustment" and isinstance(l.get("adjustment"), dict):
                    kind = "Adjustment:" + next(iter(l["adjustment"]))
                layers.append({"id": l.get("id"), "name": l.get("name"), "kind": kind, "visible": l.get("visible"),
                               "opacity": l.get("opacity"), "mask": l.get("hasMask")})
            out = {"name": d.get("name"), "file": d.get("path"), "width": d.get("width"), "height": d.get("height"),
                   "mode": d.get("mode"), "depth": d.get("depth"), "layers": layers, "history": d.get("history", [])[-8:],
                   "selection": d.get("selectionBounds"), "activeLayer": d.get("activeLayer")}
            return True, json.dumps(out, ensure_ascii=False), None
        if name == "look":
            ok, text, res = self.mcp.call("doc_render_preview", {"max_side": 768})
            image = next((c for c in (res or {}).get("content", []) if c.get("type") == "image"), None)
            return ok and image is not None, "preview attached" if image else (text or "no preview"), image
        if name == "crop_to_ratio":
            d = self._doc()
            if d is None:
                return False, "no document open", None
            try:
                a, b = (float(x) for x in str(args.get("ratio", "1:1")).replace("/", ":").split(":"))
            except ValueError:
                return False, "ratio must look like 1:1, 4:5 or 16:9", None
            W, H = d["width"], d["height"]
            w, h = (W, round(W * b / a)) if W * b / a <= H else (round(H * a / b), H)
            anchor = args.get("anchor") or "center"
            x = 0 if anchor == "left" else W - w if anchor == "right" else (W - w) // 2
            y = 0 if anchor == "top" else H - h if anchor == "bottom" else (H - h) // 2
            p = {"x": x, "y": y, "width": w, "height": h}
            tw = args.get("width")
            if tw:
                p.update(targetWidth=int(tw), targetHeight=round(int(tw) * h / w))
            ok, text = self.run("image.crop", p)
            return ok, f"cropped ({x},{y}) {w}×{h}" + (f", resized to {p['targetWidth']}×{p['targetHeight']}" if tw else "") + ". now: " + self.state_line() if ok else text, None
        return None


class Assistant:
    def __init__(self, adapter, url="http://127.0.0.1:8790/v1/chat/completions", think=False, model="local", api_key=None):
        self.ad, self.url, self.think, self.model, self.api_key = adapter, url, think, model, api_key
        # Asked before saving over an original file; the evaluations answer no (keep the original).
        self.confirm = lambda path: False
        self.questions = []
        ok, text, _ = adapter.mcp.call(adapter.catalog_tool, adapter.catalog_args)
        raw = json.loads(text)
        cat = raw if isinstance(raw, list) else next(v for v in raw.values() if isinstance(v, list))
        cat = [c for c in cat if not adapter.hidden(c["id"])]
        ar = load_ar(adapter.ar_path)
        for c in cat:
            c["ar"] = ar.get(c.get("label", ""), "")
            menu = c.get("menu") or []
            menu = [menu] if isinstance(menu, str) else menu
            c["menu_ar"] = [ar.get(m, m) for m in menu]
        self.cat = {c["id"]: c for c in cat}
        self.index = Index(cat, {"id": 3, "label": 3, "ar": 3, "menu": 1, "menu_ar": 1, "params": 0.3})
        self.tools = [
            fn("find_commands", "Search the app's commands by meaning, in Arabic or English (e.g. 'تباين', 'gaussian blur'). "
               "Returns ids with their params doc.", {"query": {"type": "string"}}, ["query"]),
            fn("run_command", "Run an app command by id with its params (ids from the guide or find_commands).",
               {"id": {"type": "string"}, "params": {"type": "object"}}, ["id"]),
        ] + adapter.tools()
        self.tool_names = {t["function"]["name"] for t in self.tools}
        guide = open(rf"{KNOW}\{adapter.app}.md", encoding="utf-8").read()
        self.messages = [{"role": "system", "content": SYSTEM.format(app_ar=adapter.app_ar, app_en=adapter.app, guide=guide)}]
        self.log = []

    def find(self, query):
        out = []
        for c in self.index.search(query, 8):
            p = c.get("params")
            hit = {"id": c["id"], "label": c.get("ar") or c.get("label"), "menu": " › ".join(c["menu_ar"]),
                   "params": (p if isinstance(p, str) else json.dumps(p))[:400] if p else "{}"}
            note = self.ad.annotate(c, self.cat)
            if note:
                hit["note"] = note
            out.append(hit)
        return json.dumps(out, ensure_ascii=False) if out else "no matching command; try other words (English works too)"

    def tool(self, name, args):
        if name == "find_commands":
            return True, self.find(args.get("query", "")), None
        if name == "run_command":
            cid = args.get("id", "")
            params = args.get("params") or {}
            if isinstance(params, str):
                try:
                    params = json.loads(params)
                except ValueError:
                    params = {}
            if cid in self.tool_names:  # a tool passed as a command: call the tool
                return self.tool(cid, params)
            if cid not in self.cat:
                near = [c["id"] for c in self.index.search(cid.replace(".", " "), 5)]
                return False, f"unknown command id `{cid}`. Similar ids: {near}. Use find_commands.", None
            ok, text = self.ad.run(cid, params)
            text = (text or "done")[:1500]
            if ok:
                text += "\n→ now: " + self.ad.state_line()
            return ok, text, None
        r = self.ad.call(name, args)
        if r is None:
            return False, f"no tool named {name}", None
        ok, text, image = r
        if not ok and (text or "").startswith("CONFIRM:"):
            # Saving over the original: the user decides (the app asks with two buttons).
            self.questions.append(text[8:])
            if not self.confirm(text[8:]):
                return False, ("The user chose to keep the original file. Save a copy under a new name next to it "
                               "(e.g. add -edited) instead."), None
            return self.tool(name, dict(args, confirmed=True))
        return ok, (text or "")[:2500], image

    def complete(self):
        body = {"model": self.model, "messages": self.messages, "tools": self.tools, "temperature": 0.2, "max_tokens": 2000}
        if not self.think:
            body["chat_template_kwargs"] = {"enable_thinking": False}
        h = {"Content-Type": "application/json"}
        if self.api_key:
            h["Authorization"] = f"Bearer {self.api_key}"
        req = urllib.request.Request(self.url, json.dumps(body).encode(), h)
        t = time.time()
        r = json.load(urllib.request.urlopen(req, timeout=900))
        self.log.append({"llm_s": round(time.time() - t, 1), "usage": r.get("usage")})
        return r["choices"][0]["message"]

    def ask(self, text, state=None, max_steps=14):
        """`state`: one line about the app now (open document, size), put before the request; the
        adapter's live line (caret, selection…) follows it, as in the app (agent.rs)."""
        live = self.ad.state_line() if hasattr(self.ad, "state_line") else ""
        if live:
            state = f"{state}; now: {live}" if state else f"now: {live}"
        self.messages.append({"role": "user", "content": f"[{state}]\n{text}" if state else text})
        failed = {}
        made = 0
        for _ in range(max_steps):
            m = self.complete()
            calls = m.get("tool_calls") or []
            msg = {"role": "assistant", "content": m.get("content") or ""}
            if calls:
                msg["tool_calls"] = calls
            self.messages.append(msg)
            if not calls:
                yield ("answer", (m.get("content") or "").strip())
                return
            images = []
            circling = False  # the same call a fourth time, or 30 calls, end the turn (agent.rs)
            for c in calls:
                f = c["function"]
                try:
                    args = json.loads(f.get("arguments") or "{}")
                except ValueError:
                    args = {}
                ok, out, image = self.tool(f["name"], args)
                yield ("tool", f["name"], args, ok, out[:300])
                body = out if ok else f"ERROR: {out}"
                # The same call again: a failure won't fix itself, and a success won't do more (agent.rs).
                key = f["name"] + json.dumps(args, sort_keys=True, ensure_ascii=False)
                failed[key] = failed.get(key, 0) + 1
                made += 1
                circling = circling or failed[key] >= 4 or made >= 30
                if not ok and failed[key] >= 2:
                    body += ("\nYou already made this exact call and it failed again. Don't repeat it: read the error, use another tool "
                             "or command (find_commands), or tell the user you couldn't.")
                elif ok and failed[key] >= 3:
                    body += ("\nYou have made this exact call several times; repeating it changes nothing. Take the next step with another "
                             "tool or command (find_commands if you need one), or answer the user.")
                self.messages.append({"role": "tool", "tool_call_id": c.get("id", ""), "content": body})
                if image:
                    images.append(image)
            for im in images:
                self.messages.append({"role": "user", "content": [
                    {"type": "text", "text": "(the preview you asked for)"},
                    {"type": "image_url", "image_url": {"url": f"data:{im.get('mimeType', 'image/png')};base64,{im['data']}"}}]})
            if circling:
                text = "توقفت لأني كنت أكرر الخطوة نفسها دون فائدة. جرّب أن تصيغ الطلب بطريقة أخرى أو بتفاصيل أكثر."
                self.messages.append({"role": "assistant", "content": text})
                yield ("answer", "(stopped: circling) " + text)
                return
        yield ("answer", "(stopped: too many steps)")


def clean_schema(v):
    """Small-model friendly schema (as adapters/generic.rs clean_schema)."""
    if isinstance(v, dict):
        out = {}
        for k, x in v.items():
            if k in ("$schema", "default", "format", "minimum", "maximum", "additionalProperties", "title", "examples"):
                continue
            if k == "type" and isinstance(x, list):
                x = next((t for t in x if t != "null"), "string")
            elif k == "description" and isinstance(x, str):
                x = x.split("\n")[0][:200]
            elif k in ("anyOf", "oneOf") and isinstance(x, list):
                nn = [a for a in x if a.get("type") != "null"]
                if len(nn) == 1:
                    for ik, iv in clean_schema(nn[0]).items():
                        out.setdefault(ik, iv)
                    continue
                x = [clean_schema(a) for a in x]
            else:
                x = clean_schema(x)
            out[k] = x
        return out
    if isinstance(v, list):
        return [clean_schema(a) for a in v]
    return v


def compact(text, drop):
    """Tool-result JSON without noisy keys, numbers to one decimal (as generic.rs compact)."""
    def walk(v):
        if isinstance(v, dict):
            return {k: walk(x) for k, x in v.items() if k not in drop and x is not None}
        if isinstance(v, list):
            return [walk(x) for x in v]
        if isinstance(v, float) and v != int(v):
            return round(v, 1)
        return v
    try:
        return json.dumps(walk(json.loads(text)), ensure_ascii=False, separators=(",", ":"))
    except ValueError:
        return text


class Generic(Adapter):
    """An app described by a spec (adapters/specs.rs)."""

    def __init__(self, mcp, app, app_ar, ar_path, spec):
        super().__init__(mcp)
        self.app, self.app_ar, self.ar_path, self.spec = app, app_ar, ar_path, spec
        self.catalog_tool = spec["catalog"]
        by = {t["name"]: t for t in mcp.tools}
        self._tools, self._map = [], {}
        for k in spec["keep"]:
            m, n, d = (tuple(k) + ("", ""))[:3]
            if m not in by:
                continue
            name = n or m
            self._map[name] = m
            self._tools.append(fn(name, d or by[m]["description"][:320], None))
            self._tools[-1]["function"]["parameters"] = clean_schema(by[m]["inputSchema"])
        if spec.get("look"):
            self._map["look"] = spec["look"][0]
            self._tools.append(fn("look", "See the current work (a picture), to check the result or what the user means."))
        self._macros = {m["name"]: m for m in spec.get("macros", [])}
        for mac in self._macros.values():
            self._tools.append(fn(mac["name"], mac["desc"], mac["props"], mac["required"]))
        self._helpers = {h["name"]: h for h in spec.get("helpers", [])}
        for h in self._helpers.values():
            self._tools.append(fn(h["name"], h["desc"], h["props"], h["required"]))

    def _into_folder(self, name, args):
        """A save path that is a folder with the extension stuck on: save inside it (as generic.rs)."""
        for t, key in self.spec.get("saves", []):
            path = args.get(key) if t == name else None
            if not path:
                continue
            stem, ext = os.path.splitext(path)
            if ext and not os.path.exists(path) and os.path.isdir(stem):
                base = os.path.splitext(os.path.basename(sorted(self.opened)[-1]))[0] if self.opened else "untitled"
                return {**args, key: os.path.join(stem, base + ext)}
        return args

    def _guard(self, name, args):
        for t, key in self.spec.get("saves", []):
            if t == name:
                path = args.get(key) or ""
                if path and not args.get("confirmed") and os.path.normcase(os.path.abspath(path)) in self.opened:
                    return (False, "CONFIRM:" + path, None)
        return None

    def _note_opened(self, name, args):
        for t, key in self.spec.get("opens", []):
            if t == name:
                v = args.get(key)
                for path in (v if isinstance(v, list) else [v] if v else []):
                    self.opened.add(os.path.normcase(os.path.abspath(path)))

    def command(self, cid, params):
        tool, key = self.spec["run"]
        ok, text, _ = self.mcp.call(tool, {key: cid, "params": params})
        return ok, text

    def _fill(self, t, args):
        if isinstance(t, str) and t.startswith("$"):
            return args.get(t[1:])
        if isinstance(t, dict):
            return {k: v for k, v in ((k, self._fill(v, args)) for k, v in t.items()) if v is not None}
        if isinstance(t, list):
            return [self._fill(v, args) for v in t]
        return t

    def hidden(self, cid):
        return self.spec.get("hidden", lambda i: False)(cid)

    def run(self, cid, params):
        params = self._into_folder(cid, params)
        g = self._guard(cid, params)
        if g:
            return g[0], g[1]
        params = {k: v for k, v in params.items() if k != "confirmed"}
        ok, text = self.command(cid, params)
        if ok:
            self._note_opened(cid, params)
            text = self._autosave(text)
        return ok, text if ok else self._hint(text)

    def _autosave(self, text):
        """Apps driven through files: save what the step changed (as generic.rs)."""
        f = self.spec.get("autosave")
        path = f(self.mcp) if f else None
        return f"{text}\n(saved to {path}; the window opens it)" if path else text

    def _hint(self, text):
        """A failure's advice from the spec's hints (as generic.rs)."""
        for needle, h in self.spec.get("hints", ()):
            if needle in (text or ""):
                return f"{text}\n{h}"
        return text

    def tools(self):
        return self._tools

    def state_line(self):
        f = self.spec.get("state")
        return f(self.mcp) if f else ""

    def call(self, name, args):
        if name in self._helpers:
            ok, text = self._helpers[name]["run"](self, args)
            if ok:
                text = self._autosave(text)
            out = compact(text or "done", self.spec.get("drop", ()))[:3000]
            return ok, self._with_state(name, out) if ok else out, None
        if name in self._macros:
            out = []
            for cid, tpl in self._macros[name]["steps"]:
                ok, text = self.run(cid, self._fill(tpl, args))
                if not ok:
                    return False, f"{cid} failed: {text}", None
                out.append(compact(text or "done", self.spec.get("drop", ())))
            return True, self._with_state(name, "\n".join(out)), None
        m = self._map.get(name)
        if not m:
            return None
        if name == "look":
            ok, text, res = self.mcp.call(m, self.spec["look"][1])
            image = next((c for c in (res or {}).get("content", []) if c.get("type") == "image"), None)
            return (True, "picture attached", image) if image else (False, text or "no picture", None)
        args = self._into_folder(m, args)
        g = self._guard(m, args)
        if g:
            return g
        args = {k: v for k, v in args.items() if k != "confirmed"}
        ok, text, res = self.mcp.call(m, args)
        if ok:
            self._note_opened(m, args)
            text = self._autosave(text)
        out = compact(text or "done", self.spec.get("drop", ()))[:3000]
        return ok, self._with_state(name, out) if ok else self._hint(out), None

    def _with_state(self, name, text):
        if name in self.spec.get("after", ()) and self.spec.get("state"):
            line = self.spec["state"](self.mcp)
            if line:
                text += "\n→ now: " + line
        return text


def reesha_state(m):
    ok, t, _ = m.call("doc_inspect", {"depth": 0})
    if not ok:
        return ""
    d = json.loads(t)
    out = ""
    a = (d.get("artboards") or [{}])[0]
    if a:
        out += f"artboard {a['width']:.0f}×{a['height']:.0f} pt (centre {a['x'] + a['width'] / 2:.0f},{a['y'] + a['height'] / 2:.0f})"
    out += f", {d.get('objects', 0)} objects"
    b = d.get("selectionBounds")
    if isinstance(b, dict):
        x, y, w, h = b["x"], b["y"], b["width"], b["height"]
        out += f", selected {len(d.get('selection') or [])}: x {x:.0f}..{x + w:.0f}, y {y:.0f}..{y + h:.0f} (centre {x + w / 2:.0f},{y + h / 2:.0f})"
    return out


def minbar_state(m):
    ok, t, _ = m.call("inspect_document", {})
    if not ok:
        return ""
    d = json.loads(t)
    slides = d.get("slides", [])
    cur = (d.get("selection") or {}).get("slide")
    s = next((x for x in slides if x.get("index") == cur), None)
    out = f"{len(slides)} slides, theme {d.get('theme')}"
    if s:
        out += f", current slide {cur} \"{s.get('title', '')}\" ({s.get('layout')}, {s.get('shapes')} shapes)"
    untitled = [str(x["index"] + 1) for x in slides if not (x.get("title") or "").strip() and isinstance(x.get("index"), int)]
    if untitled:
        out += ", slides without a title (counting from 1): " + ", ".join(untitled)
    return out


def satr_state(m):
    ok, t, _ = m.call("inspect_document", {})
    if not ok:
        return ""
    d = json.loads(t)
    blocks = d.get("blocks", [])
    sel = d.get("selection") or {}
    path = (sel.get("focus") or {}).get("path") or [None]
    cur = next((b for b in blocks if b.get("index") == path[0]), None)
    out = f"{len(blocks)} paragraphs, {d.get('pages')} pages"
    if cur:
        out += f", caret in paragraph {cur['index']} ({cur.get('style')}): \"{(cur.get('text') or '')[:40]}\""
    if sel.get("anchor") != sel.get("focus"):
        out += ", text selected"
    return out


def kashf_state(m):
    ok, t, _ = m.call("inspect_workbook", {})
    if not ok:
        return ""
    d = json.loads(t)
    sheets = d.get("sheets") or []
    i = d.get("activeSheet") or 0
    s = sheets[i] if isinstance(i, int) and i < len(sheets) else (sheets[0] if sheets else {})
    return f"sheet \"{s.get('name')}\" used range {s.get('usedRange')}, active cell {d.get('activeCell')}, selection {d.get('selection')}"


TICKS = 254016000000


def monteer_place_clip(ad, args):
    if not isinstance(args.get("item"), int):
        return False, "item (a project item id from document_info) is needed"
    p = {"item": args["item"], "seconds": float(args.get("at_seconds") or 0), "insert": bool(args.get("insert", False))}
    if args.get("track"):
        p["track"] = args["track"]
    if args.get("duration_seconds") is not None:
        p["duration"] = round(float(args["duration_seconds"]) * TICKS)
    if args.get("source_in_seconds") is not None:
        p["sourceIn"] = round(float(args["source_in_seconds"]) * TICKS)
    for k in ("video", "audio"):
        if isinstance(args.get(k), bool):
            p[k] = args[k]
    return ad.command("timeline.place", p)


def satr_go_to_paragraph(ad, args):
    n = args.get("paragraph")
    if not isinstance(n, int) or n == 0:
        return False, "paragraph: 1 for the first, 2 for the second…, -1 for the last"
    ok, t, _ = ad.mcp.call("inspect_document", {})
    blocks = json.loads(t).get("blocks") or [] if ok else []
    i = n - 1 if n > 0 else len(blocks) + n
    if not 0 <= i < len(blocks):
        return False, f"the document has {len(blocks)} paragraphs"
    return ad.command("caret.set", {"pos": {"block": blocks[i].get("index", i), "off": 0}})


def without_marker(text):
    """A point without the bullet or number someone typed before it (as specs.rs)."""
    t = text.strip().lstrip("-•*·–—▪●").lstrip()
    m = re.match(r"^[0-9\u0660-\u0669]+[.)\-،]\s*", t)
    return t[m.end():] if m else t


def minbar_new_slide(ad, args):
    title = (args.get("title") or "").strip()
    if not title:
        return False, "title is needed"
    points = [without_marker(x) for x in args.get("points") or [] if isinstance(x, str)]
    points = [x for x in points if x]
    a = {"layout": args.get("layout") or ("titleAndContent" if points else "title"), "title": title}
    if points:
        a["body"] = "\n".join(points)
    ok, t, _ = ad.mcp.call("add_slide", a)
    return ok, t


def minbar_build(ad, args):
    title = (args.get("title") or "").strip()
    slides = args.get("slides") or []
    if not title or not slides:
        return False, "title and slides ([{title, points}]) are needed"
    thin = [x.get("title", "") for x in slides if not isinstance(x, dict) or len(x.get("points") or []) < 3]
    if thin:
        return False, "give every slide 3 to 5 points; these have fewer: " + ", ".join(map(str, thin))
    ok, t, _ = ad.mcp.call("inspect_slide", {"index": 0})
    shapes = (json.loads(t).get("shapes") or []) if ok else []

    def place(kinds):
        return next((x["id"] for x in shapes if x.get("placeholder") in kinds), None)
    i = place(("ctrTitle", "title"))
    if i is not None:
        ok, t, _ = ad.mcp.call("set_text", {"id": i, "text": title})
        if not ok:
            return ok, t
    sub = args.get("subtitle")
    j = place(("subTitle", "body"))
    if j is not None and sub:
        ad.mcp.call("set_text", {"id": j, "text": sub})
    ad.mcp.call("go_to_slide", {"index": 0})
    for x in slides:
        ok, t = minbar_new_slide(ad, x)
        if not ok:
            return ok, t
    return True, f'title slide "{title}" and {len(slides)} content slides'


def _slide_index(args):
    n = args.get("slide")
    return n - 1 if isinstance(n, int) and n >= 1 else None


def minbar_delete_slide(ad, args):
    i = _slide_index(args)
    return (False, "slide: 1 for the first slide, 2 for the second…") if i is None else ad.command("slide.delete", {"index": i})


def minbar_animate(ad, args):
    effect = args.get("effect") or "appear"
    target = args.get("target") or "points"
    ok, t, _ = ad.mcp.call("inspect_slide", {})
    if not ok:
        return False, t
    shapes = json.loads(t).get("shapes") or []

    def is_title(x):
        return x.get("placeholder") in ("title", "ctrTitle")
    if target == "title":
        ids = [x["id"] for x in shapes if is_title(x)]
    elif target == "all":
        ids = [x["id"] for x in shapes]
    else:
        ids = [x["id"] for x in shapes if not is_title(x) and (x.get("text") or "").strip()]
    if not ids:
        return False, f"the current slide has no {target} to animate"
    return ad.command("animation.set", {"effect": effect, "ids": ids})


def minbar_speaker_notes(ad, args):
    i = _slide_index(args)
    if i is None:
        return False, "slide: 1 for the first slide, 2 for the second…"
    return ad.command("slide.notes", {"text": args.get("text") or "", "index": i})


def monteer_transition(ad, args):
    ok, t, _ = ad.mcp.call("sequence_inspect", {})
    try:
        seq = json.loads(t)
    except ValueError:
        return False, "no sequence open"
    clip = args.get("clip")
    if not isinstance(clip, int):
        clip = next((tr["items"][0]["clip"] for tr in seq.get("video") or [] if tr.get("items")), None)
    if clip is None:
        return False, "no video clip on the timeline"
    fr = (seq.get("settings") or {}).get("frame_rate") or {}
    frames = max(1, round(float(args.get("seconds") or 1) * float(fr.get("num") or 30) / float(fr.get("den") or 1)))
    effect = args.get("effect") or "cross_dissolve"
    edge = args.get("edge") or "in"
    edges = ["out"] if edge in ("out", "end") else ["in", "out"] if edge == "both" else ["in"]
    for e in edges:
        ok, t = ad.command("sequence.applyVideoTransition", {"clip": clip, "effect": effect, "frames": frames, "edge": e})
        if not ok:
            return ok, t
    return True, f"{effect} at the {' and '.join(edges)} of clip {clip}, {frames} frames"


def satr_format_paragraph(ad, args):
    ok, t = satr_go_to_paragraph(ad, args)
    if not ok:
        return ok, t
    done = []
    if args.get("align"):
        ok, t = ad.command("para.align", {"value": args["align"]})
        if not ok:
            return ok, t
        done.append(f"aligned {args['align']}")
    if args.get("style"):
        ok, t = ad.command("para.style", {"style": args["style"]})
        if not ok:
            return ok, t
        done.append(f"style {args['style']}")
    if args.get("list") in ("bullets", "numbering"):
        ok, t = ad.command("para.bullets" if args["list"] == "bullets" else "para.numbering", {})
        if not ok:
            return ok, t
        done.append(args["list"])
    return (True, ", ".join(done)) if done else (False, "give align, style and/or list")


def monteer_state(m):
    ok, t, _ = m.call("sequence_inspect", {})
    if not ok or t.strip() in ("", "null"):
        return "no sequence open"
    s = json.loads(t)
    # sequence.inspect: {"video": [{name, items, transitions}], "audio": […]}; older shapes: "tracks"/"clips"
    tracks = []
    fr = (s.get("settings") or {}).get("frame_rate") or {}
    fps = fr.get("num", 0) / max(fr.get("den", 1), 1)

    def clip(c):
        d = f"clip #{c.get('clip', c.get('id'))} {c.get('name', '')}"
        if fps and "startFrame" in c and "endFrame" in c:
            d += f" {c['startFrame'] / fps:.1f}–{c['endFrame'] / fps:.1f} s"
        return d
    for tr in (s.get("video") or []) + (s.get("audio") or []) + (s.get("tracks") or []):
        items = tr.get("items") or tr.get("clips") or []
        if items:
            names = ", ".join(clip(c) for c in items[:4]) + (", …" if len(items) > 4 else "")
            d = f"{tr.get('name') or tr.get('id')}{' (locked)' if tr.get('locked') else ''}: {len(items)} clips ({names})"
            if tr.get("transitions"):
                d += f" and {len(tr['transitions'])} transitions"
            tracks.append(d)
    return f"sequence \"{s.get('name', '')}\", " + (", ".join(tracks) if tracks else "empty")


SPECS = {
    "monteer": dict(
        app_ar="مونتير", ar=r"E:\warsha-src\upstream\monteer\crates\ui-egui\src\i18n\ar.tsv",
        catalog="command_list", run=("command_run", "id"),
        keep=[("media_import", "", "Import media files (video, audio, pictures) into the project by absolute path. Returns the new item ids."),
              ("doc_inspect", "document_info", "The project (items with ids and durations, bins, sequences) and the active sequence (tracks, clips, transitions, playhead).")],
        look=("render_preview", {"max_side": 768}),
        opens=[("media_import", "paths"), ("file.open", "path")], saves=[("file.saveAs", "path"), ("file.exportMedia", "path")],
        hidden=lambda i: i in ("file.exit", "file.close"),
        state=monteer_state, after=("place_clip", "media_import", "add_transition"),
        drop=("thumbnail", "waveform", "peaks", "metadata"),
        macros=[],
        helpers=[dict(name="place_clip", desc="Put a project item (video, sound or picture) on the active sequence's timeline at a time in seconds. Returns the new clip id.",
                      props={"item": {"type": "integer", "description": "project item id"}, "at_seconds": {"type": "number"},
                             "track": {"type": "string", "description": "V1, V2… for video, A1… for sound only, or new"},
                             "duration_seconds": {"type": "number"}, "source_in_seconds": {"type": "number", "description": "start this far into the source"},
                             "video": {"type": "boolean"}, "audio": {"type": "boolean"}, "insert": {"type": "boolean", "description": "push later clips along"}},
                      required=["item", "at_seconds"], run=monteer_place_clip),
                 dict(name="add_transition", desc="Add a video transition (cross_dissolve by default: a fade) at a clip's start (edge in), end (out) or both.",
                      props={"edge": {"type": "string", "description": "in, out or both"}, "seconds": {"type": "number"}, "effect": {"type": "string"},
                             "clip": {"type": "integer", "description": "clip id; default the first video clip"}},
                      required=[], run=monteer_transition)]),
    "kashf": dict(
        app_ar="كشف", ar="",
        catalog="list_commands", run=("execute_command", "command"),
        keep=[("new_workbook",), ("open_workbook",), ("save_workbook",),
              ("inspect_workbook", "document_info", "The workbook: sheets (name, used range, tables, charts), names, selection, active cell, undo history."),
              ("read_range",), ("write_range",), ("set_cell",), ("get_cell",), ("evaluate_formula",), ("select",), ("format_range",),
              ("insert_chart",), ("create_table",), ("sort_range",), ("filter",), ("undo",), ("list_functions",)],
        look=None, opens=[("open_workbook", "path")], saves=[("save_workbook", "path")],
        hidden=lambda i: i.startswith("file."),
        state=kashf_state,
        after=("write_range", "set_cell", "format_range", "insert_chart", "create_table", "sort_range", "filter", "undo"),
        drop=("redo", "dirty", "mode", "calcMode", "protected", "visibility", "zoom", "tabColor", "validations", "comments", "images", "shapes"),
        macros=[
            dict(name="freeze_top_row", desc="Freeze the header row (ثبّت صف العناوين / الصف الأول) so it stays visible while scrolling. Changes no cell.",
                 props={}, required=[], steps=[("view.freezeTopRow", {})]),
        ]),
    "satr": dict(
        app_ar="سطر", ar=r"E:\warsha-src\upstream\satr\crates\ui-egui\src\i18n\ar.tsv",
        catalog="list_commands", run=("execute", "command"),
        keep=[("new_document",), ("open_document",), ("save_document",), ("type_text",), ("select_text",), ("get_text",),
              ("inspect_document", "document_info", "The document: paragraphs (index, style, text), pages, sections, caret and selection.")],
        look=("render_page", {"page": 1}), opens=[("open_document", "path")], saves=[("save_document", "path")],
        hidden=lambda i: i.startswith("file."),
        state=satr_state,
        after=("type_text", "select_text", "go_to_paragraph", "replace_all", "format_paragraph"),
        drop=("properties", "docGrid", "headers", "footers", "pageBorders", "lineNumbers", "comments", "parts", "canRedo", "canUndo",
              "len", "props"),
        macros=[
            dict(name="replace_all", desc="Replace a word or phrase with another everywhere in the document, in one call.",
                 props={"text": {"type": "string"}, "with": {"type": "string"}}, required=["text", "with"],
                 steps=[("edit.replaceAll", {"text": "$text", "with": "$with"})]),
        ],
        helpers=[dict(name="format_paragraph", desc="Format paragraph N (1 = the first line, -1 = the last) in one call: align (right, center, left, justify), style (Title, Heading 1, Heading 2, Normal) and/or list (bullets, numbering).",
                      props={"paragraph": {"type": "integer"}, "align": {"type": "string"}, "style": {"type": "string"},
                             "list": {"type": "string", "description": "bullets or numbering"}}, required=["paragraph"], run=satr_format_paragraph),
                 dict(name="go_to_paragraph", desc="Put the caret at the start of paragraph N (1 = the first line, -1 = the last), "
                      "before a paragraph command such as para.heading1, para.align or para.bullets.",
                      props={"paragraph": {"type": "integer", "description": "1 = first, 2 = second…, -1 = last"}},
                      required=["paragraph"], run=satr_go_to_paragraph)]),
    "minbar": dict(
        app_ar="منبر", ar=r"E:\warsha-src\upstream\minbar\crates\ui-egui\src\ar.tsv",
        catalog="list_commands", run=("run_command", "command"),
        keep=[("new_presentation",), ("open_presentation",), ("save_presentation",), ("export",),
              ("inspect_document", "document_info", "The presentation: slides (index, id, title, layout, shape count, transition, animations, notes), theme, current slide."),
              ("inspect_slide", "slide_info"), ("go_to_slide",), ("add_shape",), ("add_text_box",), ("set_text",),
              ("insert_picture",), ("insert_table",), ("insert_chart",), ("select",)],
        look=("render_slide", {}), opens=[("open_presentation", "path")], saves=[("save_presentation", "path"), ("export", "path")],
        hidden=lambda i: i.startswith("file.") and i not in ("file.new",),
        state=minbar_state,
        after=("build_presentation", "new_slide", "delete_slide", "speaker_notes", "animate", "go_to_slide", "add_shape", "add_text_box", "set_text", "insert_picture", "insert_table", "insert_chart",
               "transition_all"),
        values=(),
        drop=("layouts", "media", "redo", "comments", "rotation", "preset", "sections", "dirty"),
        helpers=[
            dict(name="build_presentation", desc="Make a whole presentation in one call: the title slide (title, subtitle) and the content slides, each with its title and 3 to 5 short points.",
                 props={"title": {"type": "string"}, "subtitle": {"type": "string"},
                        "slides": {"type": "array", "items": {"type": "object", "properties": {"title": {"type": "string"}, "points": {"type": "array", "items": {"type": "string"}}},
                                                              "required": ["title", "points"]}}},
                 required=["title", "slides"], run=minbar_build),
            dict(name="new_slide", desc="Add a slide after the current one: its title and its points (the layout draws the bullets, so no -, • or numbers). Without points it is a title slide.",
                 props={"title": {"type": "string"}, "points": {"type": "array", "items": {"type": "string"}, "description": "one short point per item"},
                        "layout": {"type": "string", "description": "titleAndContent (default with points), title (default without), sectionHeader, twoContent, comparison, titleOnly, blank"}},
                 required=["title"], run=minbar_new_slide),
            dict(name="delete_slide", desc="Delete slide N (1 = the first slide, as people count).",
                 props={"slide": {"type": "integer", "description": "1 = first"}}, required=["slide"], run=minbar_delete_slide),
            dict(name="speaker_notes", desc="Write the speaker notes of slide N (1 = the first slide), replacing what is there.",
                 props={"slide": {"type": "integer", "description": "1 = first"}, "text": {"type": "string"}}, required=["slide", "text"],
                 run=minbar_speaker_notes),
            dict(name="animate", desc="Animate the current slide's points, title or everything (they appear one after another in the show).",
                 props={"effect": {"type": "string", "description": "appear, fade, fly, zoom or wipe"},
                        "target": {"type": "string", "description": "points (default), title or all"}},
                 required=["effect"], run=minbar_animate),
        ],
        macros=[
            dict(name="transition_all", desc="Give every slide the same transition (fade, push, wipe, morph, …).",
                 props={"kind": {"type": "string"}, "duration": {"type": "integer", "description": "ms"}}, required=["kind"],
                 steps=[("transition.set", {"kind": "$kind", "duration": "$duration"}), ("transition.applyAll", {})]),
        ]),
    "reesha": dict(
        app_ar="ريشة", ar=r"E:\warsha-src\upstream\reesha\crates\ui-egui\src\i18n\ar.tsv",
        catalog="command_list", run=("command_run", "id"),
        keep=[("open_file",), ("save_file",), ("export",),
              ("doc_inspect", "document_info", "The document: artboards, every object (id, kind, bounds, fill, text), selection, history."),
              ("draw_shape",), ("draw_path",), ("add_text",),
              ("set_paint", "", "Set fill, stroke and/or stroke width on the objects in `ids` (every id is in document_info). Without `ids` only the current selection changes."),
              ("transform", "", "Rotate, scale, reflect or move (dx/dy) the objects in `ids`, relative to where they are. `origin` is only the pivot of a rotation or scale; it doesn't move anything."),
              ("pathfinder",), ("apply_effect",), ("undo",)],
        state=reesha_state,
        after=("draw_shape", "draw_path", "add_text", "set_paint", "transform", "pathfinder", "apply_effect", "undo",
               "align_objects", "distribute_objects", "group_objects"),
        look=("render_preview", {"max_side": 768}), opens=[("open_file", "path")], saves=[("save_file", "path"), ("export", "path")],
        hidden=lambda i: i.startswith("file.") and i not in ("file.new", "file.newFromTemplate", "file.close"),
        values=("stylize.dropShadow",),
        drop=("strokeOptions", "preview", "printable", "template", "dimImages", "clip", "locked", "visible", "labelColor", "layerRows",
              "pasteRemembersLayers", "isolation", "key", "target", "appearanceItem", "fillActive", "redo", "revision", "previewMode"),
        macros=[
            dict(name="align_objects", desc="Align objects (by id) to the artboard or to each other, e.g. centre them on the artboard.",
                 props={"ids": {"type": "array", "items": {"type": "integer"}}, "horizontal": {"type": "string", "enum": ["left", "center", "right"]},
                        "vertical": {"type": "string", "enum": ["top", "center", "bottom"]}, "to": {"type": "string", "enum": ["artboard", "selection"]}},
                 required=["ids"],
                 steps=[("select.set", {"ids": "$ids"}), ("object.align", {"horizontal": "$horizontal", "vertical": "$vertical", "to": "$to"})]),
            dict(name="distribute_objects", desc="Space objects (by id) evenly, horizontally or vertically (optionally with a fixed gap in pt).",
                 props={"ids": {"type": "array", "items": {"type": "integer"}}, "axis": {"type": "string", "enum": ["horizontal", "vertical"]},
                        "spacing": {"type": "number"}},
                 required=["ids", "axis"],
                 steps=[("select.set", {"ids": "$ids"}), ("object.distributeSpacing", {"axis": "$axis", "spacing": "$spacing"})]),
            dict(name="group_objects", desc="Group objects (by id) into one group.",
                 props={"ids": {"type": "array", "items": {"type": "integer"}}}, required=["ids"],
                 steps=[("select.set", {"ids": "$ids"}), ("object.group", {})]),
        ]),
}


from specs_more import MORE  # noqa: E402
SPECS.update(MORE)


def make(app, mcp):
    if app == "retoush":
        return Retoush(mcp)
    s = SPECS[app]
    return Generic(mcp, app, s["app_ar"], s["ar"], s)
