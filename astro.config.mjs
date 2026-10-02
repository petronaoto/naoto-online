// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://naoto.online',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ i18n: { defaultLocale: 'ja', locales: { ja: 'ja', en: 'en' } } })],
  vite: {
    worker: { format: 'es' },
  },
  image: {
    // 旧旅行記の写真は小さい（400〜640px）ので、元サイズを超えて拡大しない
    responsiveStyles: false,
  },
});
