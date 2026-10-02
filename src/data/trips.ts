import type { ImageMetadata } from 'astro';
import type { L10n } from '../i18n';
import cover2008 from '../assets/covers/2008canada.jpg';
import cover2009 from '../assets/covers/2009hokkaido.jpg';
import cover2010c from '../assets/covers/2010canada.jpg';
import cover2010i from '../assets/covers/2010indonesia.jpg';
import coverAlps from '../assets/alps/d3-switchbacks.jpg';

/** 旅ごとの「ものさし」。A案（峠）では今回の旅は標高、過去の旅はそれぞれに合う指標で語る */
export type Metric = { value: string; unit?: L10n; label: L10n };

export type Trip = {
  slug: string;
  legacy: boolean;
  title: L10n;
  subtitle: L10n;
  period: L10n;
  year: string;
  /** カードに出す月表記 */
  when: string;
  cover: ImageMetadata;
  coverAlt: L10n;
  summary: L10n;
  metrics: Metric[];
};

export const trips: Trip[] = [
  {
    slug: '2026alps',
    legacy: false,
    title: { ja: 'アルプス・バイクツーリング', en: 'Across the Alps by Motorcycle' },
    subtitle: { ja: 'ユーラシアを走ってきた後輩と、峠を越えた5日間', en: 'Five days over the passes with a friend who had ridden across Eurasia' },
    period: { ja: '2026年9月26日〜10月4日', en: '26 Sep – 4 Oct 2026' },
    year: '2026',
    when: 'SEP 2026',
    cover: coverAlps,
    coverAlt: { ja: 'ステルヴィオ峠のボルミオ側の九十九折を見下ろす', en: 'Looking down on the Bormio-side hairpins of the Stelvio Pass' },
    summary: {
      ja: 'ミュンヘンから時計回りにドロミテ、ステルヴィオ峠を巡る958km。世界一周の途中の後輩と3日間を走り、最後の2日間はひとりで帰った。',
      en: 'A 958 km clockwise loop from Munich through the Dolomites and over the Stelvio. Three days with a friend in the middle of his round-the-world ride, then two days alone.',
    },
    metrics: [
      { value: '958', unit: { ja: 'km', en: 'km' }, label: { ja: '総走行距離', en: 'Distance' } },
      { value: '2,758', unit: { ja: 'm', en: 'm' }, label: { ja: '最高地点', en: 'Highest point' } },
      { value: '8', unit: { ja: '峠', en: 'passes' }, label: { ja: '越えた峠', en: 'Mountain passes' } },
    ],
  },
  {
    slug: '2010canada',
    legacy: true,
    title: { ja: 'カナダ旅行', en: 'Canada' },
    subtitle: { ja: 'カナディアンロッキーと黄金色のアラスカハイウェイ', en: 'The Canadian Rockies and the golden Alaska Highway' },
    period: { ja: '2010年9月4日〜9月28日', en: '4–28 Sep 2010' },
    year: '2010',
    when: 'SEP 2010',
    cover: cover2010c,
    coverAlt: { ja: '黄葉の森と川', en: 'River and autumn forest' },
    summary: {
      ja: 'カナディアンロッキー登山と、黄金色に染まるアラスカハイウェイ。1年半ぶりに大陸の土を踏んだ25日間。',
      en: 'Climbing in the Canadian Rockies and driving the Alaska Highway in full autumn gold: 25 days back on the continent.',
    },
    metrics: [
      { value: '25', unit: { ja: '日間', en: 'days' }, label: { ja: '旅の日数', en: 'Duration' } },
      { value: '64°N', label: { ja: 'ドーソン・シティ', en: 'Dawson City' } },
      { value: 'Dempster', label: { ja: 'デンプスター・ハイウェイ', en: 'Dempster Highway' } },
    ],
  },
  {
    slug: '2010indonesia',
    legacy: true,
    title: { ja: 'インドネシア旅行', en: 'Indonesia' },
    subtitle: { ja: 'ロンボク島のダイビングとスマトラ島のジャングル', en: 'Diving off Lombok and the jungles of Sumatra' },
    period: { ja: '2010年3月4日〜3月23日', en: '4–23 Mar 2010' },
    year: '2010',
    when: 'MAR 2010',
    cover: cover2010i,
    coverAlt: { ja: 'スマトラ島の水田と椰子', en: 'Rice paddies and palms in Sumatra' },
    summary: {
      ja: 'ロンボク島ギリ・トゥラワガンでのダイビング、そしてスマトラ島でのジャングル探検。赤道をまたいだ20日間。',
      en: 'Diving at Gili Trawangan off Lombok, then exploring the jungles of Sumatra: twenty days across the equator.',
    },
    metrics: [
      { value: '20', unit: { ja: '日間', en: 'days' }, label: { ja: '旅の日数', en: 'Duration' } },
      { value: '3', unit: { ja: '島', en: 'islands' }, label: { ja: 'ジャワ・ロンボク・スマトラ', en: 'Java, Lombok, Sumatra' } },
      { value: '0°', label: { ja: '赤道に立つ', en: 'On the equator' } },
    ],
  },
  {
    slug: '2009hokkaido',
    legacy: true,
    title: { ja: '北海道ツーリング', en: 'Hokkaido Motorcycle Tour' },
    subtitle: { ja: 'ただ一人、日本最北端の宗谷岬へ', en: 'Alone to Cape Soya, the northern tip of Japan' },
    period: { ja: '2009年8月', en: 'Aug 2009' },
    year: '2009',
    when: 'AUG 2009',
    cover: cover2009,
    coverAlt: { ja: '北海道の直線道路', en: 'A straight road in Hokkaido' },
    summary: {
      ja: '名古屋から北海道を一周する単独ツーリング。孤独と戦いながら日本最北端に立った。',
      en: 'A solo motorcycle loop of Hokkaido from Nagoya, ending at the northernmost point of Japan.',
    },
    metrics: [
      { value: '45°31′N', label: { ja: '宗谷岬', en: 'Cape Soya' } },
      { value: '250', unit: { ja: 'cc', en: 'cc' }, label: { ja: 'ホーネット250', en: 'Honda Hornet 250' } },
      { value: '1', unit: { ja: '人', en: 'rider' }, label: { ja: '単独行', en: 'Solo' } },
    ],
  },
  {
    slug: '2008canada',
    legacy: true,
    title: { ja: 'カナダ西部の旅', en: 'Western Canada in Winter' },
    subtitle: { ja: 'スキー＆スノボと漆黒の夜空に舞うオーロラ', en: 'Skiing, snowboarding and the aurora in a pitch-black sky' },
    period: { ja: '2009年2月12日〜3月2日', en: '12 Feb – 2 Mar 2009' },
    year: '2009',
    when: 'FEB 2009',
    cover: cover2008,
    coverAlt: { ja: 'イエローナイフのオーロラ', en: 'Aurora over Yellowknife' },
    summary: {
      ja: 'バンクーバーから極北イエローナイフへ。氷点下26℃のなか、オーロラを追いかけた6,300kmの雪原の旅。',
      en: 'From Vancouver to Yellowknife in the far north: 6,300 km across the snow at −26 °C, chasing the aurora.',
    },
    metrics: [
      { value: '6,300', unit: { ja: 'km', en: 'km' }, label: { ja: '走行距離', en: 'Distance' } },
      { value: '−26', unit: { ja: '℃', en: '°C' }, label: { ja: '最低気温', en: 'Coldest' } },
      { value: '62°N', label: { ja: 'イエローナイフ', en: 'Yellowknife' } },
    ],
  },
];

export const tripBySlug = (slug: string) => trips.find((x) => x.slug === slug)!;
