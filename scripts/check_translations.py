"""英訳ファイル（src/data/legacy-en/*.json）の段落数・目次数が原文と一致しているか確認する。"""
import json, os, sys
sys.stdout.reconfigure(encoding="utf-8")
ok = True
for trip in ["2008canada", "2009hokkaido", "2010canada", "2010indonesia"]:
    ja = json.load(open(f"src/data/legacy/{trip}.json", encoding="utf-8"))
    path = f"src/data/legacy-en/{trip}.json"
    if not os.path.exists(path):
        print(f"{trip}: 英訳なし"); continue
    en = json.load(open(path, encoding="utf-8"))
    done = 0
    for p in [ja["top"]] + ja["pages"]:
        slug = "top" if p is ja["top"] else p["slug"]
        n = sum(1 for b in p["blocks"] if b["type"] in ("heading", "text"))
        e = en.get(slug)
        if not e or "texts" not in e:
            print(f"  {trip}/{slug}: 未翻訳"); continue
        if len(e["texts"]) != n:
            ok = False; print(f"  [NG] {trip}/{slug}: 段落数 原文{n} 訳{len(e['texts'])}")
        else:
            done += 1
        if slug == "top":
            toc = next(b for b in p["blocks"] if b["type"] == "toc")["items"]
            if len(e.get("toc", [])) != len(toc):
                ok = False; print(f"  [NG] {trip}/top: 目次数 原文{len(toc)} 訳{len(e.get('toc', []))}")
    print(f"{trip}: {done}/{len(ja['pages']) + 1} ページ翻訳済み")
sys.exit(0 if ok else 1)
