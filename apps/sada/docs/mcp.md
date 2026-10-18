# MCP server

Sada speaks the [Model Context Protocol](https://modelcontextprotocol.io) over stdio, so
Claude and other agents can make music with it.

```sh
sada-cli mcp                    # headless engine (no window, no audio device)
sada-cli mcp --demo             # headless, starting from the demo session
sada --control 7801 &           # the desktop app…
sada-cli mcp --connect 7801     # …driven over MCP: same tools plus screenshots and clicks
```

Claude Code:

```sh
claude mcp add sada -- sada-cli mcp --demo
```

## Tools

| Tool | Purpose |
|---|---|
| `list_commands` | Discover every command (id, label, menu path, shortcut, params doc, enabled). |
| `execute` | Run one command with JSON params. |
| `batch` | Run several commands in order (`keep_going` optional). Any failed call makes the tool result `isError: true`; with `keep_going` the remaining calls still run and every result is listed. |
| `inspect_session` | Verify work: tracks, clips, mixer, plugins, sends, automation, markers, selection; each `sources[]` entry includes `loaded` (decoded audio in the pool). |
| `new_session`, `open_session`, `save_session` | Session files (`.sada`, audio in `Audio Files/`). `open_session` returns `missing`: the media files that could not be loaded (empty when all are found). `save_session` won't save over another existing file unless `replace` is true. |
| `import_audio` | WAV, AIFF, FLAC, MP3, OGG, AAC/M4A, ALAC, CAF onto a new or existing track. |
| `bounce_mix` | Render to WAV/AIFF/FLAC; returns peak dBFS and integrated LUFS. |
| `parity` | Feature-parity report. |
| `screenshot`, `ui_inspect`, `ui_set`, `menu_invoke`, `click`, `drag`, `key` | App only (with `--connect`). |

Resources: `sada://session` (full session JSON), `sada://commands`.

## Conventions

- Programmatic calls never open dialogs; empty params act on the current selection.
- Positions: samples, `{"seconds": x}`, or `"bars_beats:5|1|000"`-style strings.
- Tracks by name or id; clips by id.
- Every command is undoable through `edit.undo` unless it is a query or a view setting.

The acceptance test `crates/automation/tests/agent_tasks.rs` drives a realistic session end to end
through MCP only (mixing, plugins, routing, editing with undo, markers, tempo, automation, bounce,
save and reopen).
