export CARGO_HOME=/e/rust/cargo RUSTUP_HOME=/e/rust/rustup PATH=/e/rust/cargo/bin:$PATH CARGO_TARGET_DIR=/e/warsha-src/target-check
cd /e/warsha-src/shared/assistant
cargo check --target x86_64-pc-windows-msvc --message-format short 2>&1 | grep -E "^(error|warning)|^src|-->|could not" | head -60
