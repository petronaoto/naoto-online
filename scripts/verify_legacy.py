"""旧旅行記の内容が失われていないことを検証する。

比較対象:
  1. 旧HTML（リポジトリ直下 20XXxxx/*.htm） … 正
  2. 移行後データ（src/data/legacy/*.json）
  3. ビルド成果物（dist/）… `--dist` 指定時。日本語ページの本文と画像を照合する

各ページについて、ページ数・本文ブロック数・本文文字列（完全一致）・画像の枚数とファイル名・順序を突き合わせる。
"""
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRIPS = ["2008canada", "2009hokkaido", "2010canada", "2010indonesia"]


def norm(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def from_old(trip):
    out = {}
    for f in sorted(os.listdir(os.path.join(ROOT, trip))):
        if not f.endswith(".htm"):
            continue
        s = open(os.path.join(ROOT, trip, f), encoding="utf-8").read()
        body = re.search(r'<main class="content-section">(.*)</main>', s, re.S).group(1)
        texts = [norm(t) for t in re.findall(r'<div class="text-block[^"]*"[^>]*>(.*?)</div>', body, re.S)]
        imgs = re.findall(r'<img src="([^"]+)"', body)
        out[f[:-4]] = (texts, imgs)
    return out


def from_json(trip):
    d = json.load(open(os.path.join(ROOT, "src", "data", "legacy", trip + ".json"), encoding="utf-8"))
    out = {}
    for p in [d["top"]] + d["pages"]:
        texts = [norm(b["ja"]) for b in p["blocks"] if b["type"] in ("text", "heading")]
        imgs = []
        for b in p["blocks"]:
            if b["type"] == "image":
                imgs.append(b["src"])
            elif b["type"] == "members":
                imgs += [i["src"] for i in b["items"]]
        out[p["slug"]] = (texts, imgs)
    return out


def from_dist(trip):
    d = json.load(open(os.path.join(ROOT, "src", "data", "legacy", trip + ".json"), encoding="utf-8"))
    out = {}
    for p in [d["top"]] + d["pages"]:
        path = os.path.join(ROOT, "dist", trip, "index.html" if p is d["top"] else os.path.join(p["slug"], "index.html"))
        s = open(path, encoding="utf-8").read()
        texts = [norm(t) for t in re.findall(r'<(?:p|h2)[^>]*data-legacy-text[^>]*>(.*?)</(?:p|h2)>', s, re.S)]
        imgs = re.findall(r'data-legacy-src="([^"]+)"', s)
        out[p["slug"]] = (texts, imgs)
    return out


def compare(label, a, b):
    ok = True
    if set(a) != set(b):
        print(f"  [NG] {label}: ページ集合が違う 不足={sorted(set(a) - set(b))} 余分={sorted(set(b) - set(a))}")
        return False
    for slug in sorted(a):
        ta, ia = a[slug]
        tb, ib = b[slug]
        if ta != tb:
            ok = False
            for i, (x, y) in enumerate(zip(ta, tb)):
                if x != y:
                    print(f"  [NG] {label} {slug}: 本文{i}番目が不一致\n    旧: {x[:80]!r}\n    新: {y[:80]!r}")
                    break
            if len(ta) != len(tb):
                print(f"  [NG] {label} {slug}: 本文ブロック数 {len(ta)} → {len(tb)}")
        if ia != ib:
            ok = False
            print(f"  [NG] {label} {slug}: 画像 {len(ia)} → {len(ib)} 不足={sorted(set(ia) - set(ib))[:5]}")
    return ok


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    check_dist = "--dist" in sys.argv
    all_ok = True
    print(f"{'旅行記':<15}{'ページ':>6}{'本文ブロック':>10}{'本文文字数':>10}{'画像':>6}  結果")
    for trip in TRIPS:
        old = from_old(trip)
        ok = compare("JSON", old, from_json(trip))
        if check_dist:
            ok = compare("dist", old, from_dist(trip)) and ok
        all_ok &= ok
        nt = sum(len(t) for t, _ in old.values())
        nc = sum(len(x) for t, _ in old.values() for x in t)
        ni = sum(len(i) for _, i in old.values())
        print(f"{trip:<15}{len(old):>6}{nt:>10}{nc:>10}{ni:>6}  {'OK' if ok else 'NG'}")
    # 画像ファイルの実在確認（未参照ファイルも含め、元フォルダの全画像を一覧化）
    for trip in TRIPS:
        for _, (_, imgs) in from_json(trip).items():
            for src in imgs:
                if not os.path.exists(os.path.join(ROOT, trip, src)):
                    all_ok = False
                    print(f"  [NG] 画像ファイルがない: {trip}/{src}")
    print("すべて一致" if all_ok else "不一致あり")
    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
