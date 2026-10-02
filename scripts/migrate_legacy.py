"""旧旅行記（静的HTML）を構造化データ（JSON）へ移行する。

入力: リポジトリ直下の 2008canada/ 2009hokkaido/ 2010canada/ 2010indonesia/ の *.htm
出力: src/data/legacy/<trip>.json

本文の文字列は一切変更しない（HTMLの内側をそのまま保持する）。
英訳は別ファイル src/data/legacy-en/<trip>.json に持ち、ここでは扱わない。
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "data", "legacy")

TRIPS = {
    "2008canada": "top.htm",
    "2009hokkaido": "hokkaidotop.htm",
    "2010canada": "2010canadatop.htm",
    "2010indonesia": "indonesiatop.htm",
}

BLOCK_RE = re.compile(
    r'<div class="text-block section-title"[^>]*>(?P<h>.*?)</div>'
    r'|<div class="text-block"[^>]*>(?P<t>.*?)</div>'
    r'|<div class="image-container"[^>]*>\s*<img src="(?P<src>[^"]+)" alt="(?P<alt>[^"]*)"\s*/?>\s*</div>'
    r'|<div class="toc-list">(?P<toc1>.*?)</div>'
    r'|<div style="display: grid; gap: 10px[^"]*">(?P<toc2>.*?)</div>\s*(?=<div class="text-block|<div class="navigation-links|$)'
    r'|<div class="navigation-links">(?P<nav>.*?)</div>',
    re.S,
)


def main_html(path):
    s = open(path, encoding="utf-8").read()
    title = re.search(r"<title>(.*?)</title>", s, re.S).group(1)
    h1 = re.search(r'<header class="hero">\s*<h1>(.*?)</h1>', s, re.S).group(1)
    body = re.search(r'<main class="content-section">(.*)</main>', s, re.S).group(1)
    return title, h1, body


def parse_toc(html):
    items = []
    for m in re.finditer(r'<a href="([^"]+)"[^>]*>(.*?)</a>', html, re.S):
        href, inner = m.group(1), m.group(2)
        spans = re.findall(r"<span[^>]*>(.*?)</span>", inner, re.S)
        if spans:
            items.append({"href": href, "label": spans[0].strip(), "title": spans[1].strip() if len(spans) > 1 else ""})
        else:
            text = re.sub(r"<i[^>]*></i>", "", inner).strip()
            items.append({"href": href, "label": "", "title": text})
    return items


def parse_members(body):
    # インドネシア目次のメンバー紹介（画像＋名前）
    m = re.search(r'<div style="display: flex[^"]*">((?:\s*<div[^>]*>\s*<img[^>]*>\s*<div[^>]*>.*?</div>\s*</div>)+)\s*</div>', body, re.S)
    if not m:
        return None, body
    items = [
        {"src": a, "alt": b, "name": c.strip()}
        for a, b, c in re.findall(r'<img src="([^"]+)" alt="([^"]*)"[^>]*>\s*<div[^>]*>(.*?)</div>', m.group(1), re.S)
    ]
    return (m.start(), {"type": "members", "items": items}), body[: m.start()] + "<!--MEMBERS-->" + body[m.end():]


def parse_page(trip, fname):
    title, h1, body = main_html(os.path.join(ROOT, trip, fname))
    members, body = parse_members(body)
    blocks = []
    pos = 0
    for m in BLOCK_RE.finditer(body):
        gap = body[pos:m.start()]
        if "<!--MEMBERS-->" in gap and members:
            blocks.append(members[1])
        rest = re.sub(r"<!--MEMBERS-->", "", gap).strip()
        rest = re.sub(r"^\s*<div[^>]*>\s*$|^\s*</div>\s*$", "", rest, flags=re.M).strip()
        if rest:
            raise SystemExit(f"未処理のHTMLがあります: {trip}/{fname}: {rest[:200]!r}")
        pos = m.end()
        if m.group("h") is not None:
            blocks.append({"type": "heading", "ja": m.group("h")})
        elif m.group("t") is not None:
            blocks.append({"type": "text", "ja": m.group("t")})
        elif m.group("src") is not None:
            blocks.append({"type": "image", "src": m.group("src"), "alt": m.group("alt")})
        elif m.group("toc1") is not None:
            blocks.append({"type": "toc", "items": parse_toc(m.group("toc1"))})
        elif m.group("toc2") is not None:
            blocks.append({"type": "toc", "items": parse_toc(m.group("toc2"))})
        # navigation-links は新UIで自動生成するので保持しない（前後リンクのみ）
    tail = re.sub(r"<!--MEMBERS-->", "", body[pos:]).strip()
    if tail.strip(" \n\t</div>"):
        raise SystemExit(f"末尾に未処理のHTML: {trip}/{fname}: {tail[:200]!r}")
    return {"slug": fname[:-4], "htmlTitle": title, "h1": h1, "blocks": blocks}


def order_key(slug):
    m = re.search(r"(\d+)", slug.replace("2010canada", ""))
    return int(m.group(1)) if m else 0


def main():
    os.makedirs(OUT, exist_ok=True)
    for trip, top in TRIPS.items():
        topPage = parse_page(trip, top)
        toc = [b for b in topPage["blocks"] if b["type"] == "toc"][0]["items"]
        order = [i["href"] for i in toc]
        files = sorted(f for f in os.listdir(os.path.join(ROOT, trip)) if f.endswith(".htm") and f != top)
        missing = set(files) - set(order)
        if missing:
            raise SystemExit(f"目次にないページ: {trip}: {missing}")
        pages = [parse_page(trip, f) for f in order]
        data = {"trip": trip, "top": topPage, "pages": pages}
        with open(os.path.join(OUT, trip + ".json"), "w", encoding="utf-8", newline="\n") as fp:
            json.dump(data, fp, ensure_ascii=False, indent=1)
        n_text = sum(1 for p in [topPage] + pages for b in p["blocks"] if b["type"] in ("text", "heading"))
        n_img = sum(1 for p in [topPage] + pages for b in p["blocks"] if b["type"] == "image")
        print(f"{trip}: pages={len(pages) + 1} text={n_text} images={n_img}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
