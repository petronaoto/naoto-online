import type { ImageMetadata } from 'astro';

/** 2026アルプスの写真（scripts/prepare_alps_media.py が生成） */
const alps = import.meta.glob<ImageMetadata>('../assets/alps/*.jpg', { eager: true, import: 'default' });

export const alpsImage = (key: string): ImageMetadata => {
  const img = alps[`../assets/alps/${key}.jpg`];
  if (!img) throw new Error(`写真が見つかりません: ${key}`);
  return img;
};

/** 旧旅行記の写真（リポジトリ直下の元フォルダをそのまま参照する） */
const legacy = import.meta.glob<ImageMetadata>(
  ['/2008canada/*.{jpg,JPG,gif,png}', '/2009hokkaido/*.{jpg,JPG,gif,png}', '/2010canada/*.{jpg,JPG,gif,png}', '/2010indonesia/*.{jpg,JPG,gif,png}'],
  { eager: true, import: 'default' },
);

export const legacyImage = (trip: string, src: string): ImageMetadata => {
  const img = legacy[`/${trip}/${src}`];
  if (!img) throw new Error(`旧旅行記の写真が見つかりません: ${trip}/${src}`);
  return img;
};
