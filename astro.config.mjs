import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { contentPlugin } from './src/plugins/content-extras.mjs';

// https://siyuanhui.github.io — user site, served from the domain root.
export default defineConfig({
  site: 'https://siyuanhui.github.io',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: satteri({
      features: {
        math: true,
        gfm: true,
        wikilinks: true,
        rawHtml: true,
        smartPunctuation: false,
      },
      hastPlugins: [contentPlugin],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      defaultColor: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          zh: 'zh-CN',
        },
      },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
