"""2026アルプス旅行のルート・標高データを生成する。

入力: C:\\dev\\touring-plan\\maps\\euro_route_data.json（計画書作成時の OSRM ルート。座標は [lat, lon]）
出力:
  src/data/alps/route.json    … 日ごとの経路（[lon, lat]、間引き済み）
  src/data/alps/profile.json  … 約1kmごとの [累積km, 標高m]（Open-Meteo Elevation API / Copernicus DEM 90m）
"""
import json
import math
import os
import sys
import time
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = r"C:\dev\touring-plan\maps\euro_route_data.json"
OUT = os.path.join(ROOT, "src", "data", "alps")

# 実際に走った版（9/30 リヴィーニョ泊）のキー
DAYS = [
    "day1:allround,garmisch,mittenwald,innsbruck,brenner,vipiteno",
    "day2:vipiteno,ortisei,p_gardena,corvara,p_campo,p_pordoi,p_sella,bolzano",
    "day3:bolzano,merano,prato,stelvio,bormio,foscagno,livigno",
    "day4:livigno,zernez,scuol,martina,nauders,landeck,imst,fernpass,reutte,fuessen",
    "day5:fuessen,schwanstein,allround",
]


def hav(a, b):
    r = 6371.0
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))


def elevations(points):
    out = []
    for i in range(0, len(points), 100):
        chunk = points[i:i + 100]
        url = "https://api.open-meteo.com/v1/elevation?latitude={}&longitude={}".format(
            ",".join(f"{p[0]:.5f}" for p in chunk), ",".join(f"{p[1]:.5f}" for p in chunk))
        for attempt in range(5):
            try:
                with urllib.request.urlopen(url, timeout=30) as r:
                    out += json.load(r)["elevation"]
                break
            except Exception as e:  # レート制限などは待って再試行
                print("retry", e, flush=True)
                time.sleep(3 + attempt * 5)
        else:
            raise SystemExit("標高の取得に失敗しました")
        time.sleep(0.6)
    return out


def main():
    data = json.load(open(SRC, encoding="utf-8"))
    os.makedirs(OUT, exist_ok=True)
    route, samples = [], []
    total = 0.0
    for di, key in enumerate(DAYS):
        cs = data[key]["coords"]
        # 経路: 約150m間隔に間引く
        thin, acc = [cs[0]], 0.0
        for a, b in zip(cs, cs[1:]):
            acc += hav(a, b)
            if acc >= 0.15:
                thin.append(b)
                acc = 0.0
        thin.append(cs[-1])
        route.append({"day": di + 1, "km": round(data[key]["distance_km"]),
                      "coords": [[round(p[1], 5), round(p[0], 5)] for p in thin]})
        # 標高サンプル: 約1km間隔
        acc, start = 0.0, total
        samples.append((di + 1, total, cs[0]))
        for a, b in zip(cs, cs[1:]):
            d = hav(a, b)
            acc += d
            total += d
            if acc >= 1.0:
                samples.append((di + 1, total, b))
                acc = 0.0
        samples.append((di + 1, total, cs[-1]))
        print(f"day{di + 1}: {total - start:.1f} km, route pts {len(thin)}", flush=True)
    ele = elevations([s[2] for s in samples])
    profile = [[s[0], round(s[1], 2), round(e)] for s, e in zip(samples, ele)]
    json.dump(route, open(os.path.join(OUT, "route.json"), "w", encoding="utf-8"), separators=(",", ":"))
    json.dump(profile, open(os.path.join(OUT, "profile.json"), "w", encoding="utf-8"), separators=(",", ":"))
    top = max(profile, key=lambda p: p[2])
    print(f"total {total:.1f} km, samples {len(profile)}, max {top}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
