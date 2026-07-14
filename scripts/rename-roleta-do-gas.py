"""
Produce public/propostas/sonagas/roleta-do-gas.html — a text-substituted
copy of rota-do-gas-seguro.html for use as the default view inside the
combined Roleta app.

Only the two literal display strings are changed (verified via exhaustive
grep before writing this: every other 'Rota'-shaped substring in the source
is part of the JS identifiers wheelRotation/newRotation, and 'Seguro'
appears nowhere else) — this is NOT a blind global string replace, which
would have corrupted those JS identifiers and broken the prize-wheel
animation:
  'ROTA DO'    -> 'ROLETA DO'
  'GÁS SEGURO' -> 'GÁS'

Net on-screen effect: the stacked title
  ROTA DO
  GÁS SEGURO
becomes
  ROLETA DO
  GÁS
i.e. "Roleta do Gás" — matching the requested rename exactly.

Uses plain string .index() to find the exact template <script> boundaries
(not a single greedy/non-greedy regex spanning open-tag+content+close-tag —
that approach silently mis-located the closing </script> in an earlier
version of this script and corrupted the output; index()-based boundaries
are unambiguous since there is exactly one
'<script type="__bundler/template">' open tag and its matching close tag is
the next literal '</script>' after it).

Run: python scripts/rename-roleta-do-gas.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "propostas" / "sonagas" / "rota-do-gas-seguro.html"
DST = ROOT / "public" / "propostas" / "sonagas" / "roleta-do-gas.html"

OPEN_TAG = '<script type="__bundler/template">'
CLOSE_TAG = "</script>"

REPLACEMENTS = [
    ("ROTA DO", "ROLETA DO"),
    ("GÁS SEGURO", "GÁS"),
]


def main():
    raw = SRC.read_text(encoding="utf-8")

    tag_start = raw.index(OPEN_TAG)
    content_start = tag_start + len(OPEN_TAG)
    content_end = raw.index(CLOSE_TAG, content_start)

    template_json_text = raw[content_start:content_end]
    template_str = json.loads(template_json_text)

    before_len = len(template_str)
    changed = []
    for old, new in REPLACEMENTS:
        count = template_str.count(old)
        if count != 1:
            raise SystemExit(
                f"Expected exactly 1 occurrence of {old!r}, found {count}. "
                "Aborting — re-verify before editing."
            )
        template_str = template_str.replace(old, new)
        changed.append((old, new, count))

    # Sanity: prove the JS identifiers survived untouched.
    for guard in ("wheelRotation", "newRotation"):
        if guard not in template_str:
            raise SystemExit(f"Guard check failed — {guard!r} missing after replace!")

    new_template_json = json.dumps(template_str, ensure_ascii=False)
    # The template's own HTML content contains nested `<script src="UUID">
    # </script>` references (loading the canvas runtime). The ORIGINAL file
    # escapes these as they cross into the outer JSON string (seen as
    # `</script>` on inspection) specifically so a literal `</script>`
    # substring never appears inside the JSON blob — otherwise a naive
    # scan for the template's own closing </script> tag (ours, or any
    # browser's HTML parser) would stop at the wrong, premature spot.
    # json.dumps() does not preserve that escaping (forward slashes are
    # emitted literally), so re-apply it here — same defensive technique
    # the bundler's own runtime script uses for its injected script tag:
    # `JSON.stringify(x).replace(/<\//g, '<\\/')`.
    new_template_json = new_template_json.replace("</", "<\\/")

    new_raw = raw[:content_start] + new_template_json + raw[content_end:]

    # Structural sanity before writing: exactly one manifest/template/ext_resources
    # script block each, and the file still ends the same way as the source.
    assert new_raw.count('<script type="__bundler/manifest">') == 1
    assert new_raw.count('<script type="__bundler/template">') == 1
    assert new_raw.endswith(raw[-40:].split(CLOSE_TAG)[-1]) or raw.endswith(
        new_raw[-40:]
    ), "trailing document structure changed unexpectedly"

    DST.write_text(new_raw, encoding="utf-8")

    print("Replacements applied:")
    for old, new, count in changed:
        print(f"  {old!r} -> {new!r}  (x{count})")
    print(f"Template length: {before_len} -> {len(template_str)} chars")
    print(f"Raw file length: {len(raw)} -> {len(new_raw)} chars")
    print(f"Wrote {DST}")


if __name__ == "__main__":
    main()
