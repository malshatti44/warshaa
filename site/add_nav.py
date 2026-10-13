"""Add «تطبيقاتي / Apps» (→ ./apps/) after «الدورات» in the menus and footers of the live pages.
Works on the bytes, so each file keeps its own line endings. Idempotent.

  python add_nav.py live-ssh/index.html live-ssh/portfolio.html live-ssh/courses.html
"""
import re
import sys

LINK = {
    "nav-link": '<a href="./apps/" class="nav-link" data-ar="تطبيقاتي" data-en="Apps">تطبيقاتي</a>',
    "mobile-link": '<a href="./apps/" class="mobile-link" data-ar="تطبيقاتي" data-en="Apps">تطبيقاتي</a>',
    "footer-link": '<a href="./apps/" class="footer-link" data-ar="تطبيقاتي" data-en="Apps">تطبيقاتي</a>',
}


def patch(path):
    raw = open(path, "rb").read()
    text = raw.decode("utf-8")
    if 'href="./apps/"' in text:
        print(path, "already has the link")
        return
    out, n = [], 0
    # split keeping every line ending exactly as it is
    for line in re.split(r"(?<=\n)", text):
        out.append(line)
        m = re.match(r'(\s*)<a href="(?:\./courses\.html|#courses)" class="(nav-link|mobile-link|footer-link)(?: active)?"[^>]*data-ar="الدورات"', line)
        if m:
            ending = line[len(line.rstrip("\r\n")):]
            out.append(m.group(1) + LINK[m.group(2)] + ending)
            n += 1
    open(path, "wb").write("".join(out).encode("utf-8"))
    print(path, f"+{n} links")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        patch(p)
