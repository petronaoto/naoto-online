"""2026アルプス旅行の写真・動画を Web 用素材に変換する。

- 元フォルダ（Google Drive）は読み取り専用。変更・削除しない。
- 写真: 回転補正 → トリミング → ナンバープレート等のぼかし → 長辺2400px → JPEG(q86)。EXIFは付けない。
  （AVIF/WebP への変換と srcset は Astro のビルド時に行う）
- 動画: 区間を切り出し、音声なし H.264（長辺720px）+ ポスター画像。メタデータは付けない。

使い方: python scripts/prepare_alps_media.py [--force]
"""
import json
import os
import subprocess
import sys

from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = r"G:\My Drive\12_写真・動画\2026_ヨーロッパバイクツーリング"
OUT_IMG = os.path.join(ROOT, "src", "assets", "alps")
OUT_VID = os.path.join(ROOT, "public", "media", "alps")
SPEC = json.load(open(os.path.join(ROOT, "scripts", "alps_media.json"), encoding="utf-8"))


def blur(im, boxes):
    w, h = im.size
    for x0, y0, x1, y1 in boxes:
        box = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
        region = im.crop(box).filter(ImageFilter.GaussianBlur(radius=max(6, (box[2] - box[0]) // 6)))
        im.paste(region, box)
    return im


def photo(key, spec, force):
    out = os.path.join(OUT_IMG, key + ".jpg")
    if os.path.exists(out) and not force:
        return
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, spec["file"]))).convert("RGB")
    if spec.get("blur"):
        im = blur(im, spec["blur"])
    if spec.get("crop"):
        w, h = im.size
        c = spec["crop"]
        im = im.crop((int(c[0] * w), int(c[1] * h), int(c[2] * w), int(c[3] * h)))
    im.thumbnail((2400, 2400), Image.LANCZOS)
    im.save(out, "JPEG", quality=86, optimize=True, progressive=True)
    print("photo", key, im.size, os.path.getsize(out) // 1024, "KB", flush=True)


def video(key, spec, force):
    out = os.path.join(OUT_VID, key + ".mp4")
    poster = os.path.join(OUT_VID, key + ".jpg")
    if os.path.exists(out) and not force:
        return
    src = os.path.join(SRC, spec["file"])
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(spec["start"]), "-t", str(spec["dur"]), "-i", src,
                    "-an", "-vf", "scale='if(gt(iw,ih),960,-2)':'if(gt(iw,ih),-2,960)',fps=30",
                    "-c:v", "libx264", "-profile:v", "high", "-crf", "31", "-preset", "slow", "-pix_fmt", "yuv420p",
                    "-movflags", "+faststart", "-map_metadata", "-1", out], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "0.5", "-i", out, "-frames:v", "1", "-q:v", "4", poster], check=True)
    print("video", key, os.path.getsize(out) // 1024, "KB", flush=True)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    force = "--force" in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    os.makedirs(OUT_IMG, exist_ok=True)
    os.makedirs(OUT_VID, exist_ok=True)
    for key, spec in SPEC["photos"].items():
        if not only or key in only:
            photo(key, spec, force or bool(only))
    for key, spec in SPEC["videos"].items():
        if not only or key in only:
            video(key, spec, force or bool(only))


if __name__ == "__main__":
    main()
