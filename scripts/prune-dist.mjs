// ビルド後、どのHTML/CSS/JSからも参照されていない dist/_astro のファイルを削除する。
// （Astro は変換元の原寸画像も出力するが、このサイトでは使わないため）
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(dist);
const text = files
  .filter((f) => ['.html', '.css', '.js', '.xml', '.json'].includes(extname(f)))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');
let removed = 0;
let bytes = 0;
for (const f of files.filter((f) => f.includes(`${join(dist, '_astro')}`))) {
  const name = basename(f);
  if (!text.includes(name)) {
    bytes += statSync(f).size;
    unlinkSync(f);
    removed++;
  }
}
console.log(`prune-dist: 未参照ファイル ${removed} 件（${(bytes / 1e6).toFixed(1)} MB）を削除`);
