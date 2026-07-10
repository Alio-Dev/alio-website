"""
Generate a print-ready Business Card PDF — Alio Analytics.
85x55mm trim + 3mm bleed on all sides + printer's crop marks. True CMYK
colour space (reportlab writes /DeviceCMYK operators directly).

⚠️ CMYK ACCURACY CAVEAT (flagged per the brief's own instruction):
This uses a standard, UNCALIBRATED RGB->CMYK conversion formula (K = 1 -
max(R,G,B), undercolor-removed C/M/Y). It is genuine CMYK output — a press
can run it as-is — but it is NOT a colour-managed conversion against any
specific ICC profile (e.g. ISO Coated v2, US Web Coated SWOP, or the print
vendor's own profile). The brand's cyan (#07B7D1) and indigo (#2B3990) are
vivid colours that commonly shift on press without a proper profile
conversion. RECOMMENDATION: have a designer/prepress operator soft-proof
this file against the actual print vendor's ICC profile — and, ideally,
confirm the two brand colours against a Pantone bridge — before high-volume
print runs.

Real brand fonts (Sora / Instrument Sans / JetBrains Mono) are embedded as
actual TTF font programs in the PDF (converted from the project's webfont
files — see _convert_fonts.py) so the PDF is font-independent of the
viewing/printing machine, unlike the editable Office templates.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from reportlab.pdfgen import canvas
from reportlab.lib.colors import CMYKColor, black
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from brand import (
    PRIMARY_700, ACCENT_500, NEUTRAL_950, NEUTRAL_700, NEUTRAL_500, WHITE,
    COMPANY_NAME, EMAIL, PHONE, WEBSITE, ADDRESS, OUT_DIR, hx,
)

ROOT = Path(__file__).resolve().parents[2]
FONT_DIR = ROOT / "assets" / "office-fonts"
LOGO_DIR = ROOT / "assets" / "office-logos"

# ---- Register embedded TTF brand fonts ----
pdfmetrics.registerFont(TTFont("Sora-Bold", str(FONT_DIR / "Sora-Bold.ttf")))
pdfmetrics.registerFont(TTFont("Sora-SemiBold", str(FONT_DIR / "Sora-SemiBold.ttf")))
pdfmetrics.registerFont(TTFont("InstrumentSans", str(FONT_DIR / "InstrumentSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("InstrumentSans-SemiBold", str(FONT_DIR / "InstrumentSans-SemiBold.ttf")))
pdfmetrics.registerFont(TTFont("JetBrainsMono-Medium", str(FONT_DIR / "JetBrainsMono-Medium.ttf")))


def cmyk(hex_color):
    """Naive, uncalibrated RGB(hex) -> CMYK — see module caveat above."""
    r, g, b = (v / 255 for v in hx(hex_color))
    k = 1 - max(r, g, b)
    if k >= 1:
        return CMYKColor(0, 0, 0, 1)
    c = (1 - r - k) / (1 - k)
    m = (1 - g - k) / (1 - k)
    y = (1 - b - k) / (1 - k)
    return CMYKColor(c, m, y, k)


CMYK_NAVY = cmyk("131840")
CMYK_INDIGO = cmyk(PRIMARY_700)
CMYK_CYAN = cmyk(ACCENT_500)
CMYK_INK = cmyk(NEUTRAL_950)
CMYK_SLATE = cmyk(NEUTRAL_700)
CMYK_MUTED = cmyk(NEUTRAL_500)
CMYK_WHITE = CMYKColor(0, 0, 0, 0)
CMYK_REGISTER_K = CMYKColor(0, 0, 0, 1)  # crop marks: 100% K

TRIM_W, TRIM_H = 85 * mm, 55 * mm
BLEED = 3 * mm
MARK_GAP = 1.5 * mm   # gap between bleed edge and start of crop mark
MARK_LEN = 4 * mm
MARK_MARGIN = 6 * mm  # extra canvas room for marks beyond the bleed box

BLEED_W, BLEED_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
PAGE_W, PAGE_H = BLEED_W + 2 * MARK_MARGIN, BLEED_H + 2 * MARK_MARGIN
ORIGIN_X, ORIGIN_Y = MARK_MARGIN, MARK_MARGIN  # bleed-box bottom-left, in page coords


def draw_crop_marks(c):
    """Standard printer's crop marks at the four TRIM corners, 100% K."""
    c.setStrokeColor(CMYK_REGISTER_K)
    c.setLineWidth(0.35)
    trim_x0 = ORIGIN_X + BLEED
    trim_y0 = ORIGIN_Y + BLEED
    trim_x1 = trim_x0 + TRIM_W
    trim_y1 = trim_y0 + TRIM_H
    for x, dx in ((trim_x0, -1), (trim_x1, 1)):
        for y, dy in ((trim_y0, -1), (trim_y1, 1)):
            # horizontal mark
            c.line(x + dx * (BLEED + MARK_GAP), y, x + dx * (BLEED + MARK_GAP + MARK_LEN), y)
            # vertical mark
            c.line(x, y + dy * (BLEED + MARK_GAP), x, y + dy * (BLEED + MARK_GAP + MARK_LEN))


def bleed_rect(c, fill):
    """Fill the full bleed box (artwork must extend to the bleed edge, not the trim edge)."""
    c.setFillColor(fill)
    c.rect(ORIGIN_X, ORIGIN_Y, BLEED_W, BLEED_H, stroke=0, fill=1)


def gradient_bar(c, x, y, w, h):
    """Two-tone approximation of the brand gradient (cyan -> indigo), same
    convention used in the Word/PowerPoint templates for consistency."""
    c.setFillColor(CMYK_CYAN)
    c.rect(x, y, w / 2, h, stroke=0, fill=1)
    c.setFillColor(CMYK_INDIGO)
    c.rect(x + w / 2, y, w / 2, h, stroke=0, fill=1)


def centered_text(c, cx, y, text, font, size, color):
    c.setFont(font, size)
    c.setFillColor(color)
    w = c.stringWidth(text, font, size)
    c.drawString(cx - w / 2, y, text)


def front_page(c):
    bleed_rect(c, CMYK_NAVY)
    gradient_bar(c, ORIGIN_X, ORIGIN_Y, BLEED_W, 2.2 * mm)

    cx = ORIGIN_X + BLEED_W / 2
    icon_w = 24 * mm
    icon_h = icon_w / 1.4018
    c.drawImage(
        str(LOGO_DIR / "alio-icon-white.png"),
        cx - icon_w / 2, ORIGIN_Y + BLEED_H - 26 * mm, width=icon_w, height=icon_h,
        mask="auto",
    )

    y_word = ORIGIN_Y + BLEED_H - 34 * mm
    c.setFont("Sora-Bold", 15)
    c.setFillColor(CMYK_WHITE)
    w1 = c.stringWidth("alio", "Sora-Bold", 15)
    c.setFont("Sora-SemiBold", 15)
    w2 = c.stringWidth(" analytics", "Sora-SemiBold", 15)
    start_x = cx - (w1 + w2) / 2
    c.setFont("Sora-Bold", 15)
    c.setFillColor(CMYK_WHITE)
    c.drawString(start_x, y_word, "alio")
    c.setFont("Sora-SemiBold", 15)
    c.setFillColor(cmyk("C4CAD6"))
    c.drawString(start_x + w1, y_word, " analytics")

    centered_text(c, cx, ORIGIN_Y + BLEED_H - 39.5 * mm, "CLARITY FROM COMPLEXITY",
                  "JetBrainsMono-Medium", 5.6, CMYK_CYAN)


def back_page(c):
    bleed_rect(c, CMYK_WHITE)
    gradient_bar(c, ORIGIN_X, ORIGIN_Y, 2.2 * mm, BLEED_H)  # vertical accent bar, left edge

    left = ORIGIN_X + BLEED + 7 * mm
    top = ORIGIN_Y + BLEED_H - BLEED - 6 * mm

    icon_w = 13 * mm
    icon_h = icon_w / 1.4018
    c.drawImage(
        str(LOGO_DIR / "alio-icon-navy.png"),
        ORIGIN_X + BLEED_W - BLEED - icon_w - 6 * mm, top - icon_h, width=icon_w, height=icon_h,
        mask="auto",
    )

    c.setFont("Sora-Bold", 12.5)
    c.setFillColor(CMYK_INK)
    c.drawString(left, top - 7 * mm, "{{ Nome Completo }}")

    c.setFont("InstrumentSans-SemiBold", 8.5)
    c.setFillColor(CMYK_INDIGO)
    c.drawString(left, top - 12 * mm, "{{ Cargo / Title }}")

    c.setFillColor(CMYK_CYAN)
    c.rect(left, top - 14.5 * mm, 9 * mm, 0.5 * mm, stroke=0, fill=1)

    contact = [EMAIL, PHONE, WEBSITE, "Kilamba Kiaxi, Luanda"]
    y = top - 20 * mm
    for line in contact:
        c.setFillColor(CMYK_CYAN)
        c.circle(left + 0.6 * mm, y + 1.1 * mm, 0.5 * mm, stroke=0, fill=1)
        c.setFont("InstrumentSans", 7.6)
        c.setFillColor(CMYK_SLATE)
        c.drawString(left + 2.4 * mm, y, line)
        y -= 4.6 * mm


def build():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / "alio-business-card-print.pdf"
    c = canvas.Canvas(str(out_path), pagesize=(PAGE_W, PAGE_H))
    c.setTitle("Alio Analytics — Business Card (print-ready)")

    front_page(c)
    draw_crop_marks(c)
    c.showPage()

    back_page(c)
    draw_crop_marks(c)
    c.showPage()

    c.save()
    print("  OK", out_path.name, f"- {PAGE_W/mm:.1f}x{PAGE_H/mm:.1f}mm page, "
          f"{TRIM_W/mm:.0f}x{TRIM_H/mm:.0f}mm trim + {BLEED/mm:.0f}mm bleed, 2 pages (front/back)")


if __name__ == "__main__":
    build()
