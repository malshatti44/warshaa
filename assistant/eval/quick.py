"""Quick checks of the local model: Arabic reply, speed, one tool call."""
import json, time, urllib.request, sys

URL = "http://127.0.0.1:8790/v1/chat/completions"

def chat(messages, tools=None, **kw):
    body = {"model": "local", "messages": messages, "temperature": 0.3, **kw}
    if tools:
        body["tools"] = tools
    t = time.time()
    req = urllib.request.Request(URL, json.dumps(body).encode(), {"Content-Type": "application/json"})
    r = json.load(urllib.request.urlopen(req, timeout=600))
    return r, time.time() - t

r, dt = chat([{"role": "user", "content": "اشرح لي باختصار في جملتين: ما فائدة طبقات الضبط (Adjustment Layers) في تحرير الصور؟"}], max_tokens=300)
m = r["choices"][0]["message"]
print(f"{dt:.1f}s", r["usage"], r.get("timings", {}).get("predicted_per_second"))
print("reasoning:", (m.get("reasoning_content") or "")[:200])
print("content:", m["content"])

tools = [{"type": "function", "function": {"name": "command_run", "description": "Run an engine command by id with JSON params.",
          "parameters": {"type": "object", "properties": {"id": {"type": "string"}, "params": {"type": "object"}}, "required": ["id"]}}},
         {"type": "function", "function": {"name": "doc_open", "description": "Open an image file.",
          "parameters": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}}}]
sysmsg = ("أنت مساعد داخل تطبيق ريتوش لتحرير الصور. الأوامر المتاحة: adjust.brightness_contrast {brightness:-150..150, contrast:-50..100}، "
          "image.rotate {degrees}. نفّذ طلب المستخدم بالأدوات.")
r, dt = chat([{"role": "system", "content": sysmsg}, {"role": "user", "content": "افتح الصورة D:\photos\cat.jpg وزد التباين شوي"}], tools=tools, max_tokens=400)
m = r["choices"][0]["message"]
print(f"\n{dt:.1f}s", r["usage"])
print("tool_calls:", json.dumps(m.get("tool_calls"), ensure_ascii=False))
print("content:", m.get("content"))
