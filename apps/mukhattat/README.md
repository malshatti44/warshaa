<p align="center">
  <a href="https://malshatti.com/apps/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/brand/warsha-logo-white.svg">
      <img alt="Warsha" src="docs/brand/warsha-logo.svg" width="200">
    </picture>
  </a>
</p>

<h1 align="center">Mukhattat</h1>

<p align="center">
  <b>Computer-aided design and drafting; an open-source, clean-room reimplementation of Autodesk AutoCAD, rebuilt in pure Rust.</b>
</p>

<p align="center">
  A fast, open-source take on the AutoCAD workflow: the command line, object snaps, layers,
  dimensions, hatches, blocks and DXF drawings you already know. It runs natively on macOS,
  Windows, Linux and FreeBSD, and in the browser via WebAssembly.<br>
  <i>By the Warsha team.</i>
</p>

<p align="center">
  <img alt="Written in Rust" src="https://img.shields.io/badge/written%20in-Rust-0b6f88?style=flat-square&logo=rust&logoColor=white">
  <img alt="Runs on macOS, Windows, Linux, FreeBSD and the web" src="https://img.shields.io/badge/runs%20on-macOS%20%C2%B7%20Windows%20%C2%B7%20Linux%20%C2%B7%20BSD%20%C2%B7%20Web-14a3c7?style=flat-square">
  <img alt="License: MIT OR Apache-2.0" src="https://img.shields.io/badge/license-MIT%20%2F%20Apache--2.0-0b6f88?style=flat-square">
  <img alt="Agent-drivable over MCP" src="https://img.shields.io/badge/agents-MCP-14a3c7?style=flat-square">
  <img alt="Status: early development" src="https://img.shields.io/badge/status-early%20development-f07a3a?style=flat-square">
</p>

<p align="center">
  <a href="https://discord.gg/warsha"><img alt="Join the Warsha community on Discord" src="https://img.shields.io/badge/Join%20us%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="40"></a>
</p>

<p align="center">
  <a href="https://malshatti.com/apps/mukhattat.html"><b>Mukhattat on malshatti.com</b></a> ·
  <a href="https://malshatti.com/apps/">Warsha</a> ·
  <a href="https://malshatti.com/apps/">All Warsha apps</a>
</p>

<br>

<p align="center">
  <img src="docs/images/ui-apartment.png" alt="Mukhattat with an apartment floor plan open: hatched grey walls, blue windows, green door swings, furniture outlines, yellow room names with areas, a yellow room schedule table, a multileader note and cyan dimensions with architectural ticks; Tool Sets on the left, Layers and Properties on the right, the command line at the bottom" width="100%">
  <br><sub><b>Apartment plan</b> (<a href="examples/apartment.dxf">examples/apartment.dxf</a>): walls with pick-point hatching, TrueType MTEXT room labels, a TABLE, a multileader and architectural dimensions — built entirely from Mukhattat commands.</sub>
</p>

> [!NOTE]
> **Warsha is a community of artists from all walks of life.** Painters, photographers,
> filmmakers, illustrators, designers, animators, hobbyists, and people who picked up a pencil
> last week. If you make things, you're one of us. **[Come say hi on Discord](https://discord.gg/warsha).**

<p align="center">
  <a href="#screenshots">Screenshots</a> ·
  <a href="#why-mukhattat">Why Mukhattat</a> ·
  <a href="#what-works-today">What works today</a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="#drive-it-from-agents-mcp-and-the-cli">Agents, MCP and the CLI</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="#downloads">Downloads</a> ·
  <a href="#the-warsha-apps">The Warsha apps</a> ·
  <a href="#license-and-credits">License and credits</a>
</p>

## Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/images/ui-layout.png" alt="A paper-space layout in Mukhattat: a white sheet with a dashed printable area and a viewport showing the apartment plan at scale, the status bar showing the A1 Plan layout tab and a PAPER toggle"></td>
    <td width="50%"><img src="docs/images/ui-bracket.png" alt="Mukhattat with a mounting bracket part drawing: front view with bolt holes, centre lines and dimensions, a hatched section view, notes and a title block"></td>
  </tr>
  <tr>
    <td><sub><b>Layouts</b>: paper space with viewports, page setups and PLOT to PDF. Double-click a viewport to work in model space through it.</sub></td>
    <td><sub><b>Mounting bracket</b>: a two-view part drawing with centre lines, hidden lines, an ANSI31 section hatch and a title block.</sub></td>
  </tr>
</table>

## Why Mukhattat

- **The workflow you know.** Type `L`, click two points, type `@5<45`, press Enter. The command
  line, prompts with clickable `[Keywords]`, AutoComplete, object snaps, polar tracking, ortho,
  direct distance entry, window and crossing selection, grips, and right-click-to-repeat behave
  the way decades of drafting habit expect.
- **Open files.** DXF is read and written natively (ASCII and binary, R12 through 2018), and DWG
  files (R13 through 2018) open and save through the open-source acadrust library. Export to SVG
  and PNG today.
- **Fast and native.** Pure Rust and egui, no Electron, no web view. One binary on macOS
  (universal), Windows, Linux and FreeBSD, plus a WebAssembly build for the browser.
- **Built for agents.** Every menu item, tool and prompt is a command. Agents can type at the
  command line exactly like a person, call any command with JSON, inspect the drawing to verify
  their work, and render it — over MCP, a JSON control channel, or the CLI.
- **Free.** MIT OR Apache-2.0, with no account and no subscription.

## What works today

Mukhattat is in early, fast development. Honest status (see [ROADMAP.md](ROADMAP.md) for parity
numbers):

| Area | Status |
|---|---|
| Drawing area | Model space with adaptive grid, axes, pan/zoom (wheel, middle-drag, pinch), crosshair cursor with pickbox, UCS icon, ViewCube, viewport label |
| Command line | Prompts with keywords, history, AutoComplete, aliases, `@dx,dy`, `@d<a`, `#x,y`, direct distance entry, Enter/space/right-click to repeat, transparent commands, `.scr`-style scripts |
| Draw | LINE, PLINE (arcs, widths), CIRCLE (center/radius/diameter, 2P, 3P), ARC, RECTANG (fillet/chamfer), POLYGON, ELLIPSE (+arcs), SPLINE, POINT, XLINE, RAY, DONUT, TEXT, MTEXT |
| Modify | ERASE, MOVE, COPY, ROTATE, SCALE, MIRROR, STRETCH, OFFSET, TRIM, EXTEND, FILLET, CHAMFER, BREAK, JOIN, EXPLODE, rectangular/polar ARRAY, draw order, OVERKILL |
| Precision | Object snaps (endpoint, midpoint, center, geometric center, node, quadrant, intersection, insertion, perpendicular, tangent, nearest; deferred tangent/perpendicular for the first point of a line, e.g. belt lines tangent to two circles), polar tracking, ortho, grid snap |
| Layers & properties | Layers palette and Layer Properties Manager (on/off, freeze, lock, plot, colour, linetype), layer tools (isolate, freeze, off, lock, match, previous), Properties palette with per-object editing, linetypes, lineweights, colour index and true colour |
| Annotation | All DIM* commands with full DIMSTYLE variables, overrides and every arrowhead, associative dimensions that follow geometry, MLEADER, TABLE, TrueType fonts (`.ttf`, `.otf`, `.ttc` collections), MTEXT formatting codes (fonts, heights, colours, stacked fractions), our own single-stroke drafting font |
| Hatch & blocks | Pick-point hatch boundaries with islands, pattern, solid and gradient fills from our own pattern library, BLOCK/INSERT, attributes and nested blocks |
| Files | DXF read (R12–2018, ASCII and binary) and write (R2000), including dimension styles, associativity, tables and constraints; DWG read (via the acadrust library) and write (R2000); PDF plotting, SVG and PNG export. Entities Mukhattat doesn't model yet are not kept on save: see [file-format parity](docs/file-format-parity.md) |
| Layouts & plotting | Paper-space layouts, viewports (scale, lock, per-viewport layer freeze), MSPACE/PSPACE through viewports, page setups, PLOT and EXPORTPDF |
| Parametric | Geometric and dimensional constraints, AUTOCONSTRAIN, PARAMETERS with expressions, conflict detection; constraints re-solve after every edit |
| Grips | Hot grips with Space to cycle Stretch, Move, Rotate, Scale and Mirror |
| Interface languages | English, Ukrainian (Українська), Brazilian Portuguese (Português (Brasil)), German (Deutsch), Spanish (Español), Czech (Čeština), Russian (Русский), French (Français) and Simplified Chinese (简体中文, with an installed CJK font), live switching and a remembered Auto/system-language choice; [details](docs/localization.md) |
| Automation | MCP server, JSON control channel, `mukhattat-cli` (info, convert, run, commands, mcp) |

## Quick start

Desktop and web UI builds require Rust 1.95 or later. The core workspace's declared minimum
remains Rust 1.90.

```sh
git clone https://github.com/malshatti44/warshaa
cd mukhattat
cargo run --release -p mukhattat -- --sample       # opens the sample drawing
```

Then try typing at the command line:

```text
line 0,0 @10,0 @0,5 c          a closed triangle
circle 5,2 1                    a circle
offset 0.25                     then pick the circle and a side
zoom e                          zoom to extents
```

The web build: `cd apps/mukhattat-web && trunk serve` (needs [trunk](https://trunkrs.dev)).

### Fonts

Mukhattat has no fonts in its repository; it uses the TrueType/OpenType fonts installed on your
system. Builds made with the optional [warsha-fonts](https://github.com/malshatti44/warshaa)
input (`WARSHA_FONTS_DIR=<absolute path to a checkout> cargo build --release`) also embed its
fonts: BIZ UDPGothic, BIZ UDMincho and Shippori Mincho (Japanese) and Noto Sans Arabic (the web
build, which has no system fonts, only BIZ UDPGothic Regular and Noto Sans Arabic). A text style
can use them by family name, and they draw characters a text's font lacks when no installed
wide-coverage CJK font has them. Without `WARSHA_FONTS_DIR` nothing is embedded. SHX
fonts (including big fonts such as `chineset.shx`) aren't read yet: text in an SHX style is drawn
with our own stroke font, and any character a text's font lacks (CJK, for example) is drawn from
an installed font that has it, preferring wide-coverage fonts such as Noto Sans CJK, Source Han
Sans, WenQuanYi, PingFang or Microsoft JhengHei. Two settings, set with `SETVAR` or (for every
run) an environment variable, steer this:

| Variable | Environment | Meaning |
|---|---|---|
| `FONTALT` | `MUKHATTAT_FONTALT` | Font used instead of a text style font that can't be found (an SHX file, a missing TTF), by file or family name, e.g. `Noto Sans CJK TC`. Empty (default) = our stroke font. |
| `FONTFALLBACK` | `MUKHATTAT_FONTFALLBACK` | Fonts tried first for characters a text's font lacks, comma-separated, e.g. `Noto Sans CJK TC, msjh.ttc`. |

`.` clears either one.

**Your own fonts.** Any `.ttf`, `.otf` or `.ttc` font works: install it in the system font folder
(Windows `C:\Windows\Fonts` or per-user fonts, macOS `/Library/Fonts` or `~/Library/Fonts`,
Linux and the BSDs `/usr/share/fonts`, `/usr/local/share/fonts`, `~/.local/share/fonts` or
`~/.fonts`) and name it in a text style (`STYLE`, or `style {"name":"FA","font":"Vazirmatn"}`)
by file name (`Vazirmatn-Regular.ttf`) or family name (`Vazirmatn`), or inline in MTEXT with
`\fVazirmatn;`. Restart Mukhattat after installing a font: the font folders are scanned once.

**Right-to-left text (Persian, Arabic, Urdu, Hebrew).** TEXT and MTEXT lines are laid out with the
Unicode Bidirectional Algorithm (the paragraph direction comes from its first letter, so numbers
and Latin words inside Persian text keep their own order), and Arabic-script text is shaped with
OpenType (contextual letter forms, lam-alef and other ligatures, ZWNJ / ZWJ, mark positioning).
Justification (left, centre, right, MTEXT attachment and wrapping) still refers to the text's box.
Our stroke font has no Arabic letters, so Persian in a stroke-font style is drawn from an
installed font that has them: Vazirmatn, Noto Naskh Arabic, Noto Sans Arabic, Segoe UI, Tahoma,
Arial and DejaVu Sans are looked for first. To choose the font, install a free Persian font such
as [Vazirmatn](https://github.com/rastikerdar/vazirmatn) (SIL Open Font License) and either use it
in the text style or set `FONTFALLBACK` (`MUKHATTAT_FONTFALLBACK="Vazirmatn"`). Formatting changes
inside a word (an MTEXT colour change in the middle of a Persian word) break the joining at that
point.

### Logs

The desktop app writes its `log` records to standard error and to `logs/mukhattat.log` in the
settings directory (Linux and the BSDs `~/.config/mukhattat/logs/`, or
`$XDG_CONFIG_HOME/mukhattat/logs/`; macOS `~/Library/Application Support/Mukhattat/logs/`; Windows
`%APPDATA%\Mukhattat\logs\`; or under `MUKHATTAT_CONFIG_DIR`). A start from a desktop menu or the
Dock has no terminal, so this file is what to attach to a bug report. Each launch moves the
previous log to `mukhattat.1.log` (and that one to `mukhattat.2.log`), so the log of a run that
crashed survives the next start. The file stops growing at 16 MiB. `--version` writes no file.

| Variable | Effect |
|---|---|
| `MUKHATTAT_CONFIG_DIR` | Use this directory instead of the platform settings directory (the log goes to its `logs/`) |
| `RUST_LOG` | Log levels for standard error and the log file. Default: `info` for Mukhattat's own crates, `warn` for everything else. env_logger-style directives replace that, e.g. `RUST_LOG=debug`, `RUST_LOG=warn,mukhattat_io=trace` or `RUST_LOG=info,wgpu_core=warn`; a directive ending in `*` covers every target starting with it (`mukhattat*=debug`). `mukhattat_engine=debug` also logs every command-line message. |

The logger is `apps/mukhattat/src/logging.rs`; the web build logs to the browser console instead.

## Drive it from agents, MCP and the CLI

```sh
# MCP server on stdio, headless:
mukhattat-cli mcp
# …or bridged to the running app (start it with --control 7979):
mukhattat-cli mcp --connect 127.0.0.1:7979

# One-shot headless runs:
mukhattat-cli run --sample --script 'CIRCLE 22,3 1\n' --save out.dxf --export out.png
mukhattat-cli info drawing.dxf
mukhattat-cli convert drawing.dxf drawing.svg

# Frame part of the drawing (model space, drawing units, lower-left corner first):
mukhattat-cli convert drawing.dwg detail.png --window 0,0,20000,15000
mukhattat-cli run drawing.dwg --cmd 'zoom {"mode":"window","p1":[0,0],"p2":[20000,15000]}' --export detail.png
mukhattat-cli run drawing.dwg --cmd 'select {"window":[[0,0],[20000,15000]]}' --cmd 'zoom {"mode":"object"}' --export sel.png
```

How image exports (PNG 2400×1600, SVG, PDF) are framed: `convert` fits the model-space extents.
`run --export` shows the current view when the script or commands changed it (`zoom`, `pan`,
`view.set`, …) and otherwise fits the extents too. `--window x0,y0,x1,y1` shows exactly that
rectangle, centred and scaled without distortion; `--view extents` or `--view current` forces
either framing. To frame a selection set, `zoom {"mode":"object"}` after selecting.

MCP tools include `command_line` (type at the prompt), `execute` (any command with JSON),
`inspect_drawing`, `query_entities`, `render` (returns a PNG) and, when connected to the app,
`screenshot` and `ui_click`. The desktop app's JSON control channel is documented in
[docs/control-protocol.md](docs/control-protocol.md).

## Architecture

```text
geom ─┐                       f64 geometry: arcs, bulges, splines, intersections, offsets
dxf   │  (standalone)         DXF tag reader/writer
color ┤                       colour index, true colour
doc   ┤                       drawing database, copy-on-write entity store (cheap undo)
fonts ┤ render               stroke font + TEXT/MTEXT layout │ display lists, linetypes, hatches, dims, CPU raster
io    ┤                       DXF mapping, SVG/PNG export
engine┤                       sessions, commands, command line + prompts, snaps, selection, undo
ui-egui · mcp                 the swappable egui front end · MCP server
apps: mukhattat · mukhattat-cli · mukhattat-web
```

Nothing below `ui-egui` knows about egui, so the front end can be replaced. `cargo xtask ci`
checks formatting, clippy, tests, asset attribution, the crate layering and the wasm build.

Drafting and layer-palette icon buttons use the pinned `warsha-ui` button component for interaction,
accessible labels and keyboard focus. Mukhattat keeps its multicolor icon painter, dark palette,
disabled tint and tool commands. The native host saves workspace visibility and toolset choices
atomically; `MUKHATTAT_CONFIG_DIR` selects an isolated profile. Compact toolbar groups move into a
More menu, and status readouts truncate with a full-value tooltip before they reach layout tabs.
Painted toolbar and tab controls
have accessible labels and visible keyboard focus. Property controls remain application-specific.

## Accessibility

Over the drawing area Mukhattat hides the system cursor and draws its own crosshair. Tools that follow the system cursor (Windows Magnifier set to follow or centre the mouse pointer, other screen magnifiers, screen recorders, remote desktops) lose track of it there. Turn on **View ▸ Accessibility ▸ Show System Cursor** to keep a small system crosshair visible at the centre of the drawn one, or start Mukhattat with the environment variable `MUKHATTAT_SYSTEM_CURSOR=1` (on Windows, set it once with `setx MUKHATTAT_SYSTEM_CURSOR 1` and start Mukhattat again). Agents can switch it with the control channel: `ui.set {"systemCursor": true}`.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the stage, measured parity and the estimate of remaining work, and [docs/gaps.md](docs/gaps.md) for everything still missing.

## Downloads

**Download Mukhattat** from GitHub: the [latest release](https://github.com/malshatti44/warshaa) has every build listed below, and [all releases](https://github.com/malshatti44/warshaa) has earlier versions and their notes. `<ver>` in the file names is the version number, and `SHA256SUMS.txt` lists a checksum for every file.

### Windows

| Build | Installer | Portable |
|---|---|---|
| x64 (64-bit Intel/AMD) | `mukhattat-<ver>-windows-x64.msi` | `mukhattat-<ver>-windows-x64-portable.zip` |
| arm64 (Snapdragon and other ARM PCs) | `mukhattat-<ver>-windows-arm64.msi` | `mukhattat-<ver>-windows-arm64-portable.zip` |
| x86 (32-bit) | `mukhattat-<ver>-windows-x86.msi` | `mukhattat-<ver>-windows-x86-portable.zip` |

Installers and executables are code-signed.

The installer adds Mukhattat to the Start menu and asks whether to add a desktop shortcut too (unticked by default). For a silent install with the desktop shortcut: `msiexec /i mukhattat-<ver>-windows-x64.msi /qn DESKTOPSHORTCUT=1`.

**If the app doesn't open on Windows:** the desktop app initializes only DirectX 12 by default.
Letting wgpu also create an OpenGL instance can crash some graphics drivers (AMD's
`atio6axx.dll`) before the window appears, so the app would flash in Task Manager and quit.
`WGPU_BACKEND` overrides the default for troubleshooting (for example `dx12` or `vulkan`). In
PowerShell, from the folder containing the executable:

```powershell
$env:WGPU_BACKEND = "vulkan"
& .\mukhattat.exe
Remove-Item Env:WGPU_BACKEND                     # restore the default for later launches
```

An explicit `gl` override can bring the driver crash back on affected systems. The macOS, Linux
and web backend defaults are unchanged.

### macOS

| Build | File | Notes |
|---|---|---|
| App, universal (Apple silicon + Intel) | `mukhattat-<ver>-macos-universal.dmg` | Signed and notarized |
| Command-line tool, universal | `mukhattat-cli-<ver>-macos-universal.zip` | Signed and notarized |

### Linux

| Format | x86_64 | aarch64 (ARM64) | Notes |
|---|---|---|---|
| AppImage | `mukhattat-<ver>-linux-x86_64.AppImage` | `mukhattat-<ver>-linux-aarch64.AppImage` | Runs anywhere; updates itself with [AppImageUpdate](https://github.com/AppImageCommunity/AppImageUpdate) (`.zsync` files) |
| Flatpak | `mukhattat-<ver>-linux-x86_64.flatpak` | `mukhattat-<ver>-linux-aarch64.flatpak` | Sandboxed; `flatpak install --user <file>` |
| Debian/Ubuntu | `mukhattat-<ver>-linux-x86_64.deb` | `mukhattat-<ver>-linux-aarch64.deb` | |
| Fedora/RHEL/openSUSE | `mukhattat-<ver>-linux-x86_64.rpm` | `mukhattat-<ver>-linux-aarch64.rpm` | |
| Tarball | `mukhattat-<ver>-linux-x86_64.tar.gz` | `mukhattat-<ver>-linux-aarch64.tar.gz` | Unpack anywhere |

RISC-V (riscv64): `mukhattat-<ver>-linux-riscv64.tar.gz`, cross-compiled; needs glibc 2.39 or newer (Ubuntu 24.04+, Debian 13+).

### FreeBSD

| Build | File |
|---|---|
| x86_64 | `mukhattat-<ver>-freebsd-x86_64.tar.gz` |

### Web (WebAssembly)

| Build | File | Notes |
|---|---|---|
| Static site | `mukhattat-web-<ver>.zip` | Runs in a modern browser; host it on any static server |

## The Warsha apps

Mukhattat is one of the **Warsha apps**: free, open-source creative tools from the
[Warsha](https://malshatti.com/apps/) team, each written from scratch in Rust and each able to
stand on its own.

| | App | What it's for | Code | Learn more |
|:-:|---|---|---|---|
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.retoush.png" alt="" width="32" height="32"> | **Retoush** | Image editing: layers, masks, type and real PSD files | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/retoush.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.reesha.png" alt="" width="32" height="32"> | **Reesha** | Vector illustration | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/reesha.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.monteer.png" alt="" width="32" height="32"> | **Monteer** | Video editing, color and sound | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/monteer.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.tayf.png" alt="" width="32" height="32"> | **Tayf** | Photo library and raw development | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/tayf.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.watheeq.png" alt="" width="32" height="32"> | **Watheeq** | Reading, organizing and protecting PDFs | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/watheeq.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.wamda.png" alt="" width="32" height="32"> | **Wamda** | Motion graphics and visual effects | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/wamda.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.nasaq.png" alt="" width="32" height="32"> | **Nasaq** | Page layout and publishing | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/nasaq.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/mukhattat-64.png" alt="" width="32" height="32"> | **Mukhattat** | **Computer-aided design and drafting · you are here** | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/mukhattat.html) |

And [**Warsha**](https://malshatti.com/apps/) itself, our AI image and video studio for artists who want real control.

<br>

<p align="center">
  <a href="https://discord.gg/warsha"><img alt="Join the Warsha community on Discord" src="https://img.shields.io/badge/Join%20us%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="40"></a>
</p>

<h3 align="center">Come make things with us</h3>

<p align="center">
  Our Discord is where artists of every kind hang out: people who paint, shoot, draw, cut film,
  set type, and people still figuring out what they like to make. Share what you're working on,
  ask for help, tell us what's broken, or tell us what you wish these tools could do.
  Whatever your medium and however long you've been at it, you're welcome here.
</p>

<p align="center">
  <a href="https://discord.gg/warsha"><b>discord.gg/warsha</b></a> ·
  <a href="https://malshatti.com/apps/">malshatti.com</a> ·
  <a href="https://malshatti.com/apps/">The Warsha apps</a> ·
  <a href="https://malshatti.com/apps/mukhattat.html">Mukhattat</a>
</p>

## License and credits

Mukhattat is dual-licensed under [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.
Copyright (c) 2026 Warsha Team and the Mukhattat contributors. Required notices are in [NOTICE](NOTICE).

Bundled fonts, icons, images and other assets keep their own open licenses; each one is listed
with its author, source and license in [ATTRIBUTION.md](ATTRIBUTION.md).

Mukhattat's icons, its single-stroke drafting font, its hatch patterns and its linetypes are all
original work, drawn or defined in code. The sample drawings are generated in code too.

The Warsha name, wordmark and logos in [`docs/brand/`](docs/brand/) are trademarks of the
Warsha Team and are not covered by this license. They may be used only unmodified, and only as
part of this repository and Mukhattat, under [`docs/brand/LICENSE-brand.txt`](docs/brand/LICENSE-brand.txt).
Forks and modified versions must remove them.

<sub>Autodesk, AutoCAD and DWG are trademarks or registered trademarks of Autodesk, Inc. in the United States and/or other countries. Mukhattat is an independent, open-source project and is not affiliated with, sponsored by or endorsed by Autodesk, Inc.; these names are used only to describe the workflows and file formats it is compatible with.</sub>

<p align="center">
  <a href="https://malshatti.com/apps/"><img alt="Warsha" src="docs/brand/warsha-mark.svg" width="28"></a><br>
  <sub>Made by the <a href="https://malshatti.com/apps/">Warsha</a> team and community.</sub>
</p>

Tool Sets, Layers, and Properties can be regrouped, split, floated within the app window, closed, and reopened. The drawing canvas stays visible and cannot be closed or turned into a tab. Drag a panel header to a target edge or another header. Its context menu offers Float panel, Move to group, and Close panel. Existing panel toggles reopen panels at their saved location; Reset Panel Layout restores the app layout. Floating panels remain inside the current app window.
