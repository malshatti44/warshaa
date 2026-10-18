# Installation

Retoush is currently an early-alpha project. Release artifacts, when available, are published through the repository's GitHub Releases page. Verify the release notes and checksums before running downloaded artifacts.

For source builds, continue to [Building](building.md). The desktop application, headless CLI, and web target are separate workspace applications:

- `apps/retoush`: native desktop application
- `apps/retoush-cli`: headless CLI, JSON-lines server, and MCP server
- `apps/retoush-web`: WebAssembly application built with Trunk

Platform packaging and signing details are maintained in the existing [release documentation](https://github.com/malshatti44/warshaa). Signing is conditional on the configured release secrets; the existence of an artifact alone is not proof that it was signed.

## Trusting input files

Treat PSD, PSB, `.retoush`, raster images, profiles, LUTs, patterns, and embedded document content as potentially malicious. Review [Secure file handling](../security/secure-file-handling.md) before using unknown files in privileged or sensitive environments.
