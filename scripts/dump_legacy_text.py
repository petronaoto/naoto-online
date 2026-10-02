"""英訳作業用: 旧旅行記の本文（見出し・段落）をページごとに番号付きで書き出す。"""
import json, sys
sys.stdout.reconfigure(encoding="utf-8")
trip = sys.argv[1]
only = sys.argv[2:] 
d = json.load(open(f"src/data/legacy/{trip}.json", encoding="utf-8"))
for p in [d["top"]] + d["pages"]:
    slug = "top" if p is d["top"] else p["slug"]
    if only and slug not in only: continue
    print(f"### {slug}")
    i = 0
    for b in p["blocks"]:
        if b["type"] in ("heading", "text"):
            print(f"[{i}] {b['ja']}")
            i += 1
        elif b["type"] == "toc":
            for it in b["items"]: print(f"  toc: {it['label']} | {it['title']}")
        elif b["type"] == "members":
            print("  members:", [m["name"] for m in b["items"]])
