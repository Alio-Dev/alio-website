"""
Change public/propostas/sonagas/roleta-do-gas.html's background from dark
navy to warm cream (#F7F5F0), matching Roleta Digital's body background, per
explicit client-facing request to unify both games' page background.

Only elements directly exposed to the page background are touched (the body
gradient, the "ROLETA DO"/"GAS" title text+badge, and the bare "PREMIOS"
label). Every other element (white quiz/prize cards, navy accent chips, the
"DICAS DE SEGURANCA" footer panel) already carries its own opaque
background and needs no change.

Uses the same defensive methodology as rename-roleta-do-gas.py: locate the
__bundler/template <script> block via raw.index() (not a spanning regex,
which previously dropped the closing tag), apply verified single-occurrence
string replacements, then re-escape "</" to "<\\/" after json.dumps() so a
literal "</script>" from a nested <script src="UUID"></script> reference
inside the template's own markup can't corrupt the re-serialized JSON.
"""

import json
from pathlib import Path

SRC = Path("public/propostas/sonagas/roleta-do-gas.html")

OPEN_TAG = '<script type="__bundler/template">'
CLOSE_TAG = "</script>"

raw = SRC.read_text(encoding="utf-8")

# --- 1. Outer wrapper (pre-unpack loading screen) -------------------------
OUTER_REPLACEMENTS = [
    (
        "body { background: #0B1E3D; display: flex; align-items: center; "
        "justify-content: center; min-height: 100vh; font-family: "
        "-apple-system, BlinkMacSystemFont, sans-serif; }",
        "body { background: #F7F5F0; display: flex; align-items: center; "
        "justify-content: center; min-height: 100vh; font-family: "
        "-apple-system, BlinkMacSystemFont, sans-serif; }",
    ),
    (
        "#__bundler_thumbnail { position: fixed; inset: 0; width: 100%; "
        "height: 100%; display: flex; align-items: center; "
        "justify-content: center; background: #0B1E3D; z-index: 9999; }",
        "#__bundler_thumbnail { position: fixed; inset: 0; width: 100%; "
        "height: 100%; display: flex; align-items: center; "
        "justify-content: center; background: #F7F5F0; z-index: 9999; }",
    ),
]

for old, new in OUTER_REPLACEMENTS:
    count = raw.count(old)
    assert count == 1, f"expected 1 occurrence, found {count}: {old[:60]!r}"
    raw = raw.replace(old, new, 1)

# --- 2. Locate the template script block -----------------------------------
tag_start = raw.index(OPEN_TAG)
content_start = tag_start + len(OPEN_TAG)
content_end = raw.index(CLOSE_TAG, content_start)
template_json_text = raw[content_start:content_end]

template = json.loads(template_json_text)

# --- 3. In-template replacements (verified single-occurrence each) --------
TEMPLATE_REPLACEMENTS = [
    (
        "body { margin: 0; background: radial-gradient(ellipse at 50% -10%, "
        "#1B4F9C 0%, #0B1E3D 55%, #060F22 100%); font-family: 'Nunito', "
        "sans-serif; color: #0B1E3D; }",
        "body { margin: 0; background: #F7F5F0; font-family: 'Nunito', "
        "sans-serif; color: #0B1E3D; }",
    ),
    (
        '<div class="disp" style="font-size: 15px; font-weight: 700; '
        'color: #F2C94C; letter-spacing: 0.14em;">ROLETA DO</div>',
        '<div class="disp" style="font-size: 15px; font-weight: 700; '
        'color: #B5760F; letter-spacing: 0.14em;">ROLETA DO</div>',
    ),
    (
        '<div class="disp" style="font-size: 42px; font-weight: 800; '
        "line-height: 1; color: #FFE58A; background: linear-gradient(180deg, "
        "#FFF6D8 0%, #FFE58A 40%, #E8B93A 70%, #C6941F 100%); "
        "-webkit-background-clip: text; background-clip: text; "
        "-webkit-text-fill-color: transparent; text-shadow: 0 3px 0 "
        "rgba(139,94,10,0.5), 0 8px 16px rgba(0,0,0,0.4), 0 0 30px "
        'rgba(242,201,74,0.4); letter-spacing: 0.01em; margin-top: 2px;">GÁS</div>',
        '<div class="disp" style="font-size: 42px; font-weight: 800; '
        "line-height: 1; color: #8A6318; background: linear-gradient(180deg, "
        "#C6941F 0%, #B5760F 45%, #8A6318 100%); -webkit-background-clip: "
        "text; background-clip: text; -webkit-text-fill-color: transparent; "
        "text-shadow: 0 2px 0 rgba(255,255,255,0.4), 0 4px 10px "
        'rgba(139,94,10,0.25); letter-spacing: 0.01em; margin-top: 2px;">GÁS</div>',
    ),
    (
        '<div class="disp" style="font-size: 15px; font-weight: 800; '
        'color: #FFFFFF; text-align: center;">PRÉMIOS</div>',
        '<div class="disp" style="font-size: 15px; font-weight: 800; '
        'color: #163363; text-align: center;">PRÉMIOS</div>',
    ),
]

for old, new in TEMPLATE_REPLACEMENTS:
    count = template.count(old)
    assert count == 1, f"expected 1 occurrence, found {count}: {old[:70]!r}"
    template = template.replace(old, new, 1)

# --- 4. Guard: game logic identifiers untouched -----------------------------
assert template.count("wheelRotation") > 0
assert template.count("newRotation") > 0

# --- 5. Re-serialize, re-escaping "</" so nested <script> refs stay intact -
new_template_json_text = json.dumps(template, ensure_ascii=False).replace(
    "</", "<\\/"
)

new_raw = (
    raw[:content_start] + new_template_json_text + raw[content_end:]
)

SRC.write_text(new_raw, encoding="utf-8")
print("wrote", SRC, "template len:", len(template))
