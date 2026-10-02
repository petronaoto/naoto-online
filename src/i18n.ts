export type Lang = 'ja' | 'en';
export const LANGS: Lang[] = ['ja', 'en'];

/** 日英の文字列ペア。ja が原文 */
export type L10n = { ja: string; en: string };

export const t = (v: L10n | string, lang: Lang): string => (typeof v === 'string' ? v : v[lang]);

/** 言語に応じたURLを作る。日本語はルート、英語は /en/ 配下 */
export const href = (lang: Lang, path = '/'): string => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ja' ? p : `/en${p}`;
};

/** 現在のパスを、もう一方の言語のパスに変換する */
export const switchPath = (pathname: string, to: Lang): string => {
  const base = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return href(to, base);
};

export const ui = {
  siteName: { ja: 'naoto.online', en: 'naoto.online' },
  tagline: { ja: '旅の記録', en: 'Travel journals' },
  journeys: { ja: '旅行記', en: 'Journeys' },
  alps: { ja: '2026 アルプス', en: 'Alps 2026' },
  map: { ja: '地図', en: 'Map' },
  readJournal: { ja: '旅行記を読む', en: 'Read the journal' },
  allJourneys: { ja: 'すべての旅', en: 'All journeys' },
  contents: { ja: '目次', en: 'Contents' },
  prev: { ja: '前へ', en: 'Previous' },
  next: { ja: '次へ', en: 'Next' },
  backToTrip: { ja: '目次へ戻る', en: 'Back to contents' },
  elevation: { ja: '標高プロファイル', en: 'Elevation profile' },
  together: { ja: '友人と（Day1–3）', en: 'Together (Day 1–3)' },
  solo: { ja: '単独（Day4–5）', en: 'Solo (Day 4–5)' },
  profileNote: {
    ja: '走行ルートに沿った約1kmごとの地形標高（Copernicus DEM）。峠の数値は公称標高。',
    en: 'Terrain elevation about every 1 km along the route (Copernicus DEM). Pass heights are official figures.',
  },
  translatedNote: {
    ja: '',
    en: 'Translated from the original Japanese journal.',
  },
  switchTo: { ja: 'English', en: '日本語' },
  photo: { ja: '写真', en: 'Photo' },
  video: { ja: '動画', en: 'Video' },
  skip: { ja: '本文へ移動', en: 'Skip to content' },
  footer: {
    ja: '写真と文章の無断転載はご遠慮ください。',
    en: 'Please do not reuse photos or text without permission.',
  },
  notFound: { ja: 'ページが見つかりません', en: 'Page not found' },
  home: { ja: 'トップへ', en: 'Home' },
} satisfies Record<string, L10n>;
