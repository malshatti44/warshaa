"""Minimal MCP stdio client for an app's `<id>-cli.exe mcp` (headless or --connect)."""
import json, subprocess, threading, time, os

class Stdio:
    def __init__(self, argv, env=None):
        self.p = subprocess.Popen(argv, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, env=dict(os.environ, **(env or {})))
        self.inbox, self.n = [], 0
        threading.Thread(target=self._read, daemon=True).start()
        self.req("initialize", {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "warsha-assistant", "version": "1"}})
        self._send({"jsonrpc": "2.0", "method": "notifications/initialized"})
        self.tools = self.req("tools/list")["result"]["tools"]

    def _read(self):
        for line in self.p.stdout:
            try: self.inbox.append(json.loads(line))
            except ValueError: pass

    def _send(self, m):
        self.p.stdin.write((json.dumps(m, ensure_ascii=False) + "\n").encode()); self.p.stdin.flush()

    def req(self, method, params=None, timeout=120):
        self.n += 1; rid = self.n
        self._send({"jsonrpc": "2.0", "id": rid, "method": method, "params": params or {}})
        end = time.time() + timeout
        while time.time() < end:
            for m in list(self.inbox):
                if m.get("id") == rid:
                    self.inbox.remove(m); return m
            time.sleep(0.02)
        raise TimeoutError(method)

    def call(self, name, args=None):
        r = self.req("tools/call", {"name": name, "arguments": args or {}})
        res = r.get("result") or {}
        text = "\n".join(c.get("text", "") for c in res.get("content", []) if c.get("type") == "text")
        return (not res.get("isError")), text, res
