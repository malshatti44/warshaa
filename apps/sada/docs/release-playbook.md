# Release playbook

The release playbook shared by every warsha app lives in warsharules:
[`../warsharules/release/playbook.md`](../../warsharules/release/playbook.md)
(`malshatti44/warshaa`). It is the canonical copy; don't duplicate it here.

Sada's implementation (`.github/workflows/release.yml`, `packaging/`,
`cargo xtask version`) was copied from Nasaq/Retoush and renamed. Sada-specific
details are in [releasing.md](releasing.md).
