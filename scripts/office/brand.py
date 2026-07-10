"""
Shared Alio Analytics brand constants for the editable Office templates
(Letterhead.docx, Proposal.docx, Presentation.pptx, Invoice.xlsx).

Every value here is sourced from BRAND.md (repo root) and
src/styles/tokens.css — nothing is invented. If BRAND.md changes, update
here to match.

FONT STRATEGY (documented per the brief):
python-docx / python-pptx / openpyxl cannot safely embed font binaries into
OOXML — doing so manually risks "needs repair" corruption prompts in Word/
PowerPoint/Excel, which the brief explicitly wants avoided. Instead, every
template sets the REAL brand font names (Sora / Instrument Sans / JetBrains
Mono) as the primary typeface. If the brand fonts are not installed on the
machine opening the file, Word/PowerPoint/Excel silently substitute the next
font in the paragraph's font list / the system default — layout (sizes,
spacing, colors) is unaffected either way.
  -> To make the brand fonts actually RENDER for reviewers, install these on
     the machine opening the files (already present in the repo, used for
     the SVG/PNG brand-kit assets):
       node_modules/@fontsource/sora/files (700, 600, 400 TTF/OTF)
       node_modules/@fontsource/instrument-sans/files (600, 400)
       node_modules/@fontsource/jetbrains-mono/files (500, 400)
     Or the public Google Fonts downloads of the same families.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOGO_DIR = ROOT / "assets" / "office-logos"
OUT_DIR = ROOT / "public" / "brand-kit"

# ---- Fonts (BRAND.md §4) ----
FONT_DISPLAY = "Sora"            # headings / display — 700 display/H1-H2, 600 H3-H6
FONT_BODY = "Instrument Sans"    # body / UI — 400/500/600
FONT_MONO = "JetBrains Mono"     # code / data / labels — 400/500

# ---- Colors (BRAND.md §3 / tokens.css) ----
PRIMARY_700 = "2B3990"   # brand indigo (logo)
PRIMARY_800 = "232E74"
PRIMARY_950 = "131840"   # navy (sidebar / dark surfaces)
ACCENT_500 = "07B7D1"    # brand cyan (logo)
ACCENT_600 = "0793AC"    # accent text on white (500 fails contrast per BRAND.md)
NEUTRAL_950 = "12141D"   # ink / primary text
NEUTRAL_700 = "444B5C"   # secondary text
NEUTRAL_500 = "717A8F"   # tertiary text
NEUTRAL_200 = "DDE1E8"   # border
NEUTRAL_100 = "EEF0F4"   # subtle border
NEUTRAL_50 = "F7F8FA"    # subtle bg
WHITE = "FFFFFF"
SUCCESS_500 = "16A468"
DANGER_500 = "DC3D43"

# ---- Identity (BRAND.md §1, §10) ----
COMPANY_NAME = "Alio Analytics, Lda"
TAGLINE_EN = "Clarity from complexity."
TAGLINE_PT = "Clareza na complexidade."
TAGLINE_SECONDARY = "Built in Angola. Engineered for the world."

# ---- Fiscal (BRAND.md §10) — placeholders where the brief requires a fillable field ----
NIF = "5001021800"
ADDRESS = "Rua 49, Bairro Nova Vida, Edifício E-67, Kilamba Kiaxi, Luanda, Angola"
IBAN = "AO06 0006 0000 74963202301 93"
BANK_NAME = "Banco de Fomento Angola (BFA)"
EMAIL = "info@alio.ao"
WEBSITE = "www.alio.ao"
PHONE = "+244 923 710 906"
AGT_NOTE = "Processado por programa validado — AGT"
IVA_RATE = 0.14  # BRAND.md §8 / §10 — 14%

LOGO_ICON_NAVY = LOGO_DIR / "alio-icon-navy.png"
LOGO_ICON_WHITE = LOGO_DIR / "alio-icon-white.png"
LOGO_ICON_GRADIENT = LOGO_DIR / "alio-icon-gradient.png"
LOGO_FULL = LOGO_DIR / "alio-logo-full.png"


def hx(hexstr):
    """'2B3990' -> (0x2B, 0x39, 0x90) for RGBColor-style consumers."""
    return tuple(int(hexstr[i:i + 2], 16) for i in (0, 2, 4))
