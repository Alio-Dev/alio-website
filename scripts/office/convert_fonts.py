"""
Convert the brand webfonts (woff2, from @fontsource) to TTF for embedding in
the print-ready business-card PDF (gen_business_card_pdf.py uses reportlab,
which needs TTF/OTF — @fontsource only ships woff/woff2).

Output is committed to assets/office-fonts/, so this only needs to be re-run
if the @fontsource package versions change. Run: python convert_fonts.py
"""
import os
from pathlib import Path

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "office-fonts"


def find_pkg_dir(pkg):
    base = ROOT / "node_modules" / ".pnpm"
    hit = next(d for d in os.listdir(base) if d.startswith(f"@fontsource+{pkg}@"))
    return base / hit / "node_modules" / "@fontsource" / pkg / "files"


JOBS = [
    ("sora", "sora-latin-700-normal.woff2", "Sora-Bold.ttf"),
    ("sora", "sora-latin-600-normal.woff2", "Sora-SemiBold.ttf"),
    ("sora", "sora-latin-400-normal.woff2", "Sora-Regular.ttf"),
    ("instrument-sans", "instrument-sans-latin-400-normal.woff2", "InstrumentSans-Regular.ttf"),
    ("instrument-sans", "instrument-sans-latin-600-normal.woff2", "InstrumentSans-SemiBold.ttf"),
    ("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff2", "JetBrainsMono-Medium.ttf"),
]


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    for pkg, woff2_name, ttf_name in JOBS:
        src = find_pkg_dir(pkg) / woff2_name
        font = TTFont(src)
        font.flavor = None  # strip woff2 wrapper -> plain sfnt (TTF)
        font.save(OUT / ttf_name)
        print("  OK", ttf_name)


if __name__ == "__main__":
    build()
