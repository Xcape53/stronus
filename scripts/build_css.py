"""Build the production CSS bundle from the editable source stylesheets."""

from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "css" / "site-portfolio.min.css"
SOURCES = (
    ROOT / "css" / "font-awesome-portfolio.css",
    ROOT / "css" / "plugin-portfolio.css",
    ROOT / "css" / "spacing-portfolio.css",
    ROOT / "css" / "scroll_top.css",
    ROOT / "css" / "style.css",
    ROOT / "css" / "responsive.css",
    ROOT / "isti-icon" / "style.css",
)


def build() -> None:
    npx = shutil.which("npx.cmd" if os.name == "nt" else "npx")
    if npx is None:
        raise SystemExit("npx is required to rebuild the CSS bundle")

    command = [
        npx,
        "--yes",
        "clean-css-cli@5.6.3",
        "-O1",
        "-o",
        str(OUTPUT),
        *(str(source) for source in SOURCES),
    ]
    subprocess.run(command, cwd=ROOT, check=True)
    bundle = OUTPUT.read_text(encoding="utf-8")
    bundle = bundle.replace("url('fonts/icomoon", "url('../isti-icon/fonts/icomoon")
    OUTPUT.write_text(bundle, encoding="utf-8", newline="\n")
    print(f"Built {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
