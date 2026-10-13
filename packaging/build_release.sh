#!/usr/bin/env bash
# Release build for packaging (Warsha / ورشة): x86_64-pc-windows-msvc with the C runtime linked
# statically, so no Visual C++ redistributable is needed. One log per app in logs/.
# Usage: packaging/build_release.sh [repo ...]   (default: every app, the launcher last)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UP="$ROOT/apps"; [ -d "$UP" ] || UP="$ROOT/upstream"
# the author's machine keeps Rust on E:; elsewhere the usual rustup install is used
[ -d /e/rust/cargo ] && export CARGO_HOME=/e/rust/cargo RUSTUP_HOME=/e/rust/rustup PATH=/e/rust/cargo/bin:$PATH
export CARGO_TARGET_DIR="$ROOT/target"
export CARGO_TARGET_X86_64_PC_WINDOWS_MSVC_RUSTFLAGS="-C target-feature=+crt-static"
TARGET=x86_64-pc-windows-msvc
LOGS="$ROOT/logs"; mkdir -p "$LOGS"
declare -A PKG=([craft-launcher]=artcraft-launcher)
apps=("$@")
[ ${#apps[@]} -eq 0 ] && apps=(deckcraft soundcraft photocraft vectorcraft filmcraft lightcraft pdfcraft effectcraft designcraft wordcraft gridcraft cadcraft craft-launcher)
echo "--- release build $(date '+%F %H:%M') (${apps[*]})" >> "$LOGS/_summary.txt"
for r in "${apps[@]}"; do
  pkg=${PKG[$r]:-$r}
  start=$(date +%s)
  ( cd "$UP/$r" && cargo build --release --target $TARGET -p "$pkg" ) > "$LOGS/$r.log" 2>&1
  code=$?
  echo "$(date +%H:%M) $r exit=$code $(( $(date +%s) - start ))s $(grep -c '^error' "$LOGS/$r.log") errors" | tee -a "$LOGS/_summary.txt"
done
