"""After `E:\\warsha-src` has been renamed to `E:\\warsha-src`: point every path in the working scripts at the
new folder. Text files only; build output, git data, backups, media and logs are left alone.

  python move_root.py E:\\warsha-src [--apply]
"""
import os
import re
import sys

OLD = "warsha-src"
NEW = "warsha-src"
SKIP_DIRS = {".git", "target", "target-check", "dist", "backups", "logs", "node_modules", "__pycache__", "media", "out-showcase"}
TEXT = {".py", ".sh", ".ps1", ".rs", ".toml", ".md", ".txt", ".json", ".jsonl", ".html", ".css", ".js", ".iss", ".cfg", ".ini", ".yaml", ".yml", ".tsv", ""}


def main():
    root = sys.argv[1]
    apply = "--apply" in sys.argv
    files = hits = 0
    for dirpath, dirs, names in os.walk(root):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith("work")]
        for n in names:
            if os.path.splitext(n)[1].lower() not in TEXT:
                continue
            p = os.path.join(dirpath, n)
            if os.path.getsize(p) > 20_000_000:
                continue
            try:
                s = open(p, encoding="utf-8").read()
            except (UnicodeDecodeError, OSError):
                continue
            if OLD not in s:
                continue
            k = s.count(OLD)
            files += 1
            hits += k
            if apply:
                open(p, "w", encoding="utf-8", newline="").write(s.replace(OLD, NEW))
    print(f"{'APPLIED' if apply else 'DRY RUN'}: {hits} paths in {files} files")


if __name__ == "__main__":
    main()
