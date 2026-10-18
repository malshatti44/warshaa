<p align="center">
  <a href="https://malshatti.com/apps/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/brand/warsha-logo-white.svg">
      <img alt="Warsha" src="docs/brand/warsha-logo.svg" width="200">
    </picture>
  </a>
</p>

<h1 align="center">Warsha</h1>

<p align="center">
  <b>One place to install, update and open every app in the Warsha App Suite, rebuilt in pure Rust.</b><br>
  Retoush, Tayf, Monteer, Nasaq, Reesha, Watheeq, Wamda, Satr,<br>
  Minbar, Kashf, Mukhattat and Sada: the right build for your computer, kept up to date.
</p>

<p align="center">
  <img alt="100% Rust" src="https://img.shields.io/badge/100%25-Rust-b7410e?style=flat-square&logo=rust">
  <img alt="macOS · Windows · Linux · FreeBSD · Web" src="https://img.shields.io/badge/macOS%20%C2%B7%20Windows%20%C2%B7%20Linux%20%C2%B7%20FreeBSD%20%C2%B7%20Web-native-26282e?style=flat-square">
  <img alt="License: MIT OR Apache-2.0" src="https://img.shields.io/badge/license-MIT%20%2F%20Apache--2.0-3a3a3a?style=flat-square">
  <img alt="Status: early alpha" src="https://img.shields.io/badge/status-early%20alpha-d69e2e?style=flat-square">
</p>

<p align="center">
  <a href="https://discord.gg/warsha"><img alt="Join the Warsha community on Discord" src="https://img.shields.io/badge/Join%20us%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" height="40"></a>
</p>

<p align="center">
  <a href="https://github.com/malshatti44/warshaa"><b>Download Warsha</b></a> ·
  <a href="https://malshatti.com/apps/">Warsha</a> ·
  <a href="https://malshatti.com/apps/">The Warsha App Suite</a>
</p>

> [!NOTE]
> **Warsha is a community of artists from all walks of life.** Painters, photographers,
> filmmakers, illustrators, designers, animators, hobbyists, and people who picked up a pencil
> last week. If you make things, you're one of us. **[Come say hi on Discord](https://discord.gg/warsha).**

<p align="center">
  <a href="#what-it-does">What it does</a> ·
  <a href="#features">Features</a> ·
  <a href="#downloads">Downloads</a> ·
  <a href="#build-from-source">Build from source</a> ·
  <a href="#the-warsha-app-suite">Warsha App Suite</a> ·
  <a href="https://discord.gg/warsha">Discord</a>
</p>

<p align="center">
  <img src="docs/screenshots/warsha-grid.png" alt="Warsha on macOS in the grid view (dark theme): a card for each Warsha App with its icon, status, version, release date and an Install or Open button" width="900">
</p>
<p align="center">
  <img src="docs/screenshots/warsha-table.png" alt="The same apps in the table view (light theme), with columns for each app's status, installed and latest versions, and release date" width="900"><br>
  <sub>Switch between the grid and a sortable table.</sub>
</p>

## What it does

The Warsha apps each ship their own builds for every platform. Warsha saves you from
hunting through a dozen release pages: it lists every app in the suite, shows which ones you have
and which version, installs the right build for your operating system and processor, and tells
you when an update is out. It is a small native app that can sit in your menu bar or system tray.

## Features

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>📦 Install in one click</h3>
      Picks the right download for your OS and CPU (DMG, MSI, AppImage, .deb, .rpm and more), checks it against the release's SHA-256 checksums and installs it.
    </td>
    <td width="33%" valign="top">
      <h3>🔄 Stay up to date</h3>
      Checks each app's GitHub releases and updates the ones you have. A notification tells you when there's something new.
    </td>
    <td width="33%" valign="top">
      <h3>🧭 Always at hand</h3>
      Opens any Warsha app from one window, or from the tray and menu-bar icon. Native egui, no Electron, no web view.
    </td>
  </tr>
</table>

The web version shows the same catalog in the browser, with the latest download for each app.

## Interface languages

The interface is in English, Brazilian Portuguese (Português (Brasil)), Czech (Čeština), French
(Français), German (Deutsch), Hungarian (Magyar), Japanese (日本語), Polish (Polski), Russian
(Русский), Simplified Chinese (简体中文) or Spanish (Español). **Auto**, the default, follows the
system or browser language; **Settings → Language** picks one and switches at once, and the choice
is kept between runs. Czech locales (`cs-CZ`, `cs_CZ.UTF-8`…) select Czech, German ones (`de-DE`,
`de-AT`, `de-CH`, `de_DE.UTF-8`…) German, French ones (`fr-FR`, `fr-CA`…) French, Hungarian ones
(`hu`, `hu-HU`, `hu_HU.UTF-8`…) Hungarian, Japanese ones (`ja`, `ja-JP`, `ja_JP.UTF-8`…) Japanese,
Polish ones (`pl`, `pl-PL`, `pl_PL.UTF-8`) Polish, Spanish ones (`es-ES`, `es-MX`, `es-419`…)
Spanish, and Portuguese ones (`pt-BR`, and `pt-PT` too, for now) Brazilian Portuguese. Simplified
Chinese locales (`zh-CN`, `zh-SG`, `zh-Hans`, and POSIX forms such as `zh_CN.UTF-8`) select
Chinese; Traditional Chinese ones don't. To try a language without changing the setting, start the
desktop app with `WARSHA_LAUNCHER_LOCALE=pt-BR`, or add `?lang=ru` to the web address.

The CJK languages are drawn with the system's own CJK font (Hiragino Sans or PingFang on macOS,
Yu Gothic, Meiryo or Microsoft YaHei on Windows, Noto Sans CJK, IPA, Takao or WenQuanYi on Linux and
FreeBSD). Where the system has no font for one, and in the web version, the interface stays in
English and Settings says why. Product names and release notes stay as published; text without a
translation falls back to English.

## Where apps are installed

Warsha installs each app where your system normally keeps applications, using the
app's official release package, so an app installed by the launcher is the same as one you
installed by hand (and the launcher finds apps you installed yourself):

| System | Where | How |
|---|---|---|
| macOS | `/Applications/<App>.app` | Copied from the signed, notarized release DMG |
| Windows | `C:\Program Files\<App>` | The release MSI, through Windows Installer (with Start menu entry and Apps & features entry) |
| Linux | `/usr/bin`, `/usr/share/applications` | The release `.deb` (apt) or `.rpm` (dnf, zypper), with your system's password prompt. Without those, a Flatpak, or an AppImage in `~/Applications` |
| Linux, inside the launcher's Flatpak, with no Flatpak on the host | `~/.var/app/com.malshatti.warsha/data/warsha/apps/<app>` | The release tarball, unpacked into the launcher's own folder and run inside the same sandbox, with its settings in a `home/` folder beside it. Nothing is installed on the host, and each app's configuration stays in the sandbox |
| FreeBSD | `/usr/local` | The release tree, with a password prompt (polkit); `~/.local` when polkit isn't installed |

Warsha keeps itself current too: when a new version is out, **Update and restart**
downloads it, verifies it, puts it where this copy is installed (the `.app`, the Windows Installer
package or portable folder, the AppImage, or the `.deb`/`.rpm`) and reopens it.

Updates use the same format an app was installed with. Every download is checked against the
release's published SHA-256 before it is installed, and a running app is never replaced.

The launcher writes its log to `logs/warsha.log` in its data folder
(`~/.local/share/warsha` on Linux, `~/Library/Application Support/Warsha`
on macOS, `%LOCALAPPDATA%\Warsha` on Windows, `WarshaLauncherData` beside the
portable zip's executable) and keeps the previous two runs as `warsha.1.log` and
`warsha.2.log`. `RUST_LOG` changes what it records (`debug`, `info,zbus=warn`, …).

## Downloads

Download the build for your computer from the [latest release](https://github.com/malshatti44/warshaa), or browse [all releases](https://github.com/malshatti44/warshaa). Every release has a `SHA256SUMS.txt` to check the files against. `<ver>` is the version number, for example `0.1.0`.

**Windows** (10 and 11)

| File | What it is |
|---|---|
| `warsha-<ver>-windows-x64.msi` | Installer for most PCs (Intel and AMD, 64-bit). Installs for the current user, no admin rights needed |
| `warsha-<ver>-windows-arm64.msi` | Installer for Windows on Arm (Snapdragon and other Arm PCs) |
| `warsha-<ver>-windows-x86.msi` | Installer for 32-bit Windows |
| `warsha-<ver>-windows-{x64,arm64,x86}-portable.zip` | No install: unzip and run `warsha.exe`. Keeps its settings in the folder |

**macOS** (11 Big Sur or later)

| File | What it is |
|---|---|
| `warsha-<ver>-macos-universal.dmg` | Universal app for Apple silicon and Intel Macs, signed and notarized. Drag Warsha to Applications |

**Linux** (x86_64 and aarch64; glibc 2.35 or newer, e.g. Ubuntu 22.04+, Debian 12+, Fedora 36+)

| File | What it is |
|---|---|
| `warsha-<ver>-linux-{x86_64,aarch64}.AppImage` | Runs on almost any distro without installing; `chmod +x` and run. The `.AppImage.zsync` beside it lets AppImageUpdate fetch only what changed |
| `warsha-<ver>-linux-{x86_64,aarch64}.deb` | Debian, Ubuntu, Mint, Pop!_OS: `sudo apt install ./warsha-…deb` |
| `warsha-<ver>-linux-{x86_64,aarch64}.rpm` | Fedora, openSUSE, RHEL: `sudo dnf install ./warsha-…rpm` |
| `warsha-<ver>-linux-{x86_64,aarch64}.flatpak` | Flatpak bundle: `flatpak install --user warsha-…flatpak`. Inside the sandbox the launcher installs apps as Flatpaks on the host through `flatpak-spawn --host`; where the host has no Flatpak it falls back to each app's release tarball, unpacked and run inside the sandbox with the app's settings kept in it. Either way it can only reach the host as far as that permission allows; the AppImage, .deb and .rpm builds are the recommended way to run the launcher on Linux |
| `warsha-<ver>-linux-{x86_64,aarch64}.tar.gz` | Plain tree (`bin/`, `share/`) for everyone else and for scripts |

RISC-V (riscv64): `warsha-<ver>-linux-riscv64.{deb,rpm,tar.gz}`, built against Ubuntu 24.04 (needs glibc 2.39+).

The tray icon uses the StatusNotifierItem standard: KDE, Xfce, Cinnamon and most other desktops show it; on GNOME install the AppIndicator extension.

**FreeBSD** (14, x86_64)

| File | What it is |
|---|---|
| `warsha-<ver>-freebsd-x86_64.tar.gz` | A tree laid out like `/usr/local` |

```sh
pkg install libxkbcommon wayland libX11 libXcursor libXrandr libXi libxcb mesa-libs vulkan-loader fontconfig freetype2
tar -xzf warsha-<ver>-freebsd-x86_64.tar.gz --strip-components 1 -C /usr/local
warsha
```

**Web (WebAssembly)**

| File | What it is |
|---|---|
| `warsha-web-<ver>.zip` | The catalog as a static site you can host anywhere; see [`packaging/web/README.md`](packaging/web/README.md) |

## Build from source

You need a recent stable Rust (1.90 or newer). On Linux, install the windowing headers first
(Debian/Ubuntu: `sudo apt install libxkbcommon-dev libwayland-dev libx11-dev libxrandr-dev libxi-dev libgl1-mesa-dev`).

```sh
git clone https://github.com/malshatti44/warshaa
cd warsha
cargo run --release -p warsha   # the desktop app
cargo xtask ci                             # fmt, clippy, tests and the wasm check
```

The web version builds with [trunk](https://trunkrs.dev/):

```sh
rustup target add wasm32-unknown-unknown
cd apps/warsha-web && trunk serve
```

### Installing your own builds

To install and update the Warsha apps from checkouts on your machine instead of GitHub, clone them
next to this repo (`../retoush`, `../satr`, …) and run:

```sh
cargo xtask local sync      # git pull every app, build and package each new version into ../local-mirror
cargo xtask local serve     # serve the builds and a release feed on http://127.0.0.1:8787/
WARSHA_LAUNCHER_DOWNLOAD_BASE=http://127.0.0.1:8787/ cargo run --release -p warsha --features local-mirror
```

Run `sync` again whenever you want updates, or let the server do it: `cargo xtask local serve
--sync-every 1h` pulls and builds on that interval while it serves. An app is rebuilt when its
checkout's version isn't in the mirror yet (`--rebuild` forces it), and the launcher's next check
picks it up. Add `--every-commit` to build every new commit instead, as a dev version between
releases (`0.4.0` builds as `0.4.1-dev.<commit time>`), which the launcher offers as an update. While
`WARSHA_LAUNCHER_DOWNLOAD_BASE` is set (loopback addresses only), the launcher asks only the
mirror, never GitHub. Only builds with the `local-mirror` feature read it; releases never have it. `cargo xtask local help` lists the options (`--only`, `--no-pull`, `--arch`, …).

New contributors and AI agents: start with [`AGENTS.md`](AGENTS.md). Release packaging lives in
[`packaging/`](packaging/) and [`.github/workflows/release.yml`](.github/workflows/release.yml).

> [!IMPORTANT]
> **Status:** Warsha is new and in early alpha. Expect rough edges, and please file
> issues (include your OS, which app you were installing and the launcher's log file) or tell us on
> [Discord](https://discord.gg/warsha).

## The Warsha App Suite

Warsha installs the **Warsha App Suite**: free, open-source creative tools from the
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
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.kashf.png" alt="" width="32" height="32"> | **Kashf** | Spreadsheets and data | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/kashf.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.satr.png" alt="" width="32" height="32"> | **Satr** | Word processing and documents | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/satr.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.minbar.png" alt="" width="32" height="32"> | **Minbar** | Presentations and slide decks | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/minbar.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.mukhattat.png" alt="" width="32" height="32"> | **Mukhattat** | Computer-aided design | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/mukhattat.html) |
| <img src="https://raw.githubusercontent.com/malshatti44/warshaa/main/assets/app-icon/hicolor/64x64/apps/com.malshatti.sada.png" alt="" width="32" height="32"> | **Sada** | Audio recording and editing | [GitHub](https://github.com/malshatti44/warshaa) | [Website](https://malshatti.com/apps/sada.html) |

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
  <a href="https://malshatti.com/apps/">The Warsha App Suite</a> ·
  <a href="https://github.com/malshatti44/warshaa">Warsha</a>
</p>

---

## Thanks

The community built launchers for the Warsha App Suite before we did, and Warsha learned a
lot from them. Thank you to their authors:

| Project | Author | What we learned from it |
|---|---|---|
| [Warsha Suite Updater](https://github.com/Lyraedan/Warsha-Suit-Updater) | [@Lyraedan](https://github.com/Lyraedan) | Noticing apps installed or removed outside the updater with a quiet background re-scan, detecting Arch and AUR installs through pacman, and a platform picker that lists the downloads for every OS |
| [warshacenter](https://github.com/avokadosauce/warshacenter) | [@avokadosauce](https://github.com/avokadosauce) | Finding the latest release without spending API quota (the `releases/latest` redirect plus `SHA256SUMS.txt`), and verifying every file |
| [WARSHASPACE](https://github.com/emircesur/WARSHASPACE) | [@emircesur](https://github.com/emircesur) | Adopting apps that were already installed, falling back gracefully when GitHub rate-limits, background update notifications |
| [GetWarsha](https://github.com/mbirnbach/getwarsha) | [@mbirnbach](https://github.com/mbirnbach) | Picking the right download for each OS and CPU, recognising Windows Installer and macOS installs, a native Rust/egui launcher |
| [WarshaHub](https://github.com/WarshaHubLauncher/WarshaHub) | [WarshaHubLauncher](https://github.com/WarshaHubLauncher) | Strict checks on where downloads come from, clear rate-limit messages, never replacing an app while it runs |
| [warsha-suite](https://github.com/erikerikerik/warsha-suite) | [@erikerikerik](https://github.com/erikerikerik) | ETag-cached release checks and installs that recover cleanly from interruptions |
| [Warsha apps Launcher & Installer](https://github.com/ZifuM/Warsha-apps-launcher-installer) | [@ZifuM](https://github.com/ZifuM) | Release-page fallbacks and starting AppImage apps with a clean environment |
| [Warsha](https://github.com/EricVogt93/warsha) | [@EricVogt93](https://github.com/EricVogt93) | Desktop integration for AppImages and a careful self-update design |
| [LandingWarsha](https://github.com/rallegretti/LandingWarsha) | [@rallegretti](https://github.com/rallegretti) | Working with the Windows Installer directly and offering stable releases only |
| [Warsha apps Manager](https://github.com/CryptoKey98/warsha-apps-manager) | [@CryptoKey98](https://github.com/CryptoKey98) | Scheduled background update checks and per-app launch options |
| [Warsha Hub Launcher](https://github.com/tinyplayerss/warsha-hub-launcher) | [@tinyplayerss](https://github.com/tinyplayerss) | A friendly, one-window hub for the whole suite |
| [WarshaHub](https://github.com/MegaTheLEGEND/WarshaHub) | [@MegaTheLEGEND](https://github.com/MegaTheLEGEND) | Serving the apps' web builds from a self-hosted launcher |

## License and credits

Warsha is dual-licensed under [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.
Copyright (c) 2026 Warsha Team and the Warsha contributors. Required notices are in [NOTICE](NOTICE).

Bundled fonts, icons, images and other assets keep their own open licenses; each one is listed
with its author, source and license in [ATTRIBUTION.md](ATTRIBUTION.md).

The app icons of the Warsha apps (`assets/app-icons/`) are each app's own icon, copied unmodified
from its repository and licensed like that app (MIT OR Apache-2.0).

**The Warsha name, logo and "A" mark are not licensed under MIT or Apache-2.0.** They (everything
in [`docs/brand/`](docs/brand/), plus the app icon in [`assets/app-icon/`](assets/app-icon/), the
logo in the launcher's header and the "A" tray icon)
are trademarks of the Warsha Team and are not covered by this license. They may be used only unmodified, and only as
part of this repository and Warsha, under [`docs/brand/LICENSE-brand.txt`](docs/brand/LICENSE-brand.txt).
Forks and modified versions must remove them.

<p align="center">
  <a href="https://malshatti.com/apps/"><img alt="Warsha" src="docs/brand/warsha-mark.svg" width="28"></a><br>
  <sub>Made by the <a href="https://malshatti.com/apps/">Warsha</a> team and community.</sub>
</p>
