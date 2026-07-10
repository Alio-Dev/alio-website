"""
Convert a saved .docx/.pptx into a proper Word/PowerPoint *template*
(.dotx/.potx) — same OOXML zip, with the main-part content type switched
from '...main+xml' (document/presentation) to the template variant. This is
NOT a file-rename: Word/PowerPoint identify templates by the declared
content type in [Content_Types].xml, which is what makes double-clicking
the file open a new untitled document instead of editing the template
itself.
"""

import shutil
import zipfile

_DOCX_DOC = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"
_DOCX_TPL = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml"
_PPTX_DOC = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"
_PPTX_TPL = "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml"


def _swap_content_type(src_path, dst_path, old_ct, new_ct):
    with zipfile.ZipFile(src_path, "r") as zin:
        names = zin.namelist()
        with zipfile.ZipFile(dst_path, "w", zipfile.ZIP_DEFLATED) as zout:
            for name in names:
                data = zin.read(name)
                if name == "[Content_Types].xml":
                    text = data.decode("utf-8")
                    if old_ct not in text:
                        raise RuntimeError(f"expected content type not found in {src_path}: {old_ct}")
                    text = text.replace(old_ct, new_ct)
                    data = text.encode("utf-8")
                zout.writestr(name, data)


def docx_to_dotx(docx_path, dotx_path):
    _swap_content_type(docx_path, dotx_path, _DOCX_DOC, _DOCX_TPL)


def pptx_to_potx(pptx_path, potx_path):
    _swap_content_type(pptx_path, potx_path, _PPTX_DOC, _PPTX_TPL)
