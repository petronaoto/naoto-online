/**
 * 旧旅行記（2008〜2010）のデータアクセス。
 * 日本語原文: src/data/legacy/<trip>.json（scripts/migrate_legacy.py が旧HTMLから生成。手で編集しない）
 * 英訳:       src/data/legacy-en/<trip>.json（ページごとに、本文ブロックと同じ順序の訳文配列を持つ）
 */
import type { Lang } from '../i18n';

export type LegacyBlock =
  | { type: 'heading'; ja: string }
  | { type: 'text'; ja: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'toc'; items: { href: string; label: string; title: string }[] }
  | { type: 'members'; items: { src: string; alt: string; name: string }[] };

export type LegacyPage = { slug: string; htmlTitle: string; h1: string; blocks: LegacyBlock[] };
export type LegacyTrip = { trip: string; top: LegacyPage; pages: LegacyPage[] };

/** 英訳。texts は heading/text ブロックの出現順に対応 */
export type LegacyEnPage = {
  h1?: string;
  texts?: string[];
  toc?: { label: string; title: string }[];
  members?: string[];
};
export type LegacyEn = Record<string, LegacyEnPage>;

const ja = import.meta.glob<LegacyTrip>('../data/legacy/*.json', { eager: true, import: 'default' });
const en = import.meta.glob<LegacyEn>('../data/legacy-en/*.json', { eager: true, import: 'default' });

export const LEGACY_TRIPS = ['2008canada', '2009hokkaido', '2010canada', '2010indonesia'] as const;

export const legacyTrip = (trip: string): LegacyTrip => ja[`../data/legacy/${trip}.json`];
export const legacyEn = (trip: string): LegacyEn => en[`../data/legacy-en/${trip}.json`] ?? {};

/** 旧ファイル名（day1.htm）→ 新URL（/2008canada/day1/） */
export const pagePath = (trip: string, file: string) => `/${trip}/${file.replace(/\.htm$/, '')}/`;

/** 目次の項目（日付ラベルとタイトル）を言語に応じて返す */
export const tocItems = (trip: string, lang: Lang) => {
  const data = legacyTrip(trip);
  const toc = data.top.blocks.find((b) => b.type === 'toc') as Extract<LegacyBlock, { type: 'toc' }>;
  const enToc = legacyEn(trip).top?.toc;
  return toc.items.map((it, i) => ({
    slug: it.href.replace(/\.htm$/, ''),
    href: pagePath(trip, it.href),
    label: lang === 'en' && enToc?.[i] ? enToc[i].label : it.label,
    title: lang === 'en' && enToc?.[i] ? enToc[i].title : it.title,
    translated: lang === 'ja' || !!enToc?.[i],
  }));
};

/**
 * 表示用のテキストを返す。英語ページで訳がない場合は日本語原文を返し、translated=false にする。
 * 原文の inline HTML（<strong> と旧ページへの <a>）は保持し、リンク先だけ新URLへ置き換える。
 */
export const blockText = (trip: string, slug: string, index: number, original: string, lang: Lang) => {
  const tr = lang === 'en' ? legacyEn(trip)[slug]?.texts?.[index] : undefined;
  const html = (tr ?? original).replace(/<a href="([\w-]+)\.htm"[^>]*>/g, (_m, p) => `<a href="${lang === 'en' ? '/en' : ''}/${trip}/${p}/">`);
  return { html, translated: lang === 'ja' || tr !== undefined };
};
