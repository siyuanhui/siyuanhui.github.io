import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { ui } from '../i18n/ui';
import { loadCollection, localize } from '../lib/content';
import { localePath, type Locale } from '../lib/paths';

export async function buildFeed(context: APIContext, locale: Locale) {
  const t = ui(locale);
  const items = [];
  for (const name of ['projects', 'research', 'garden', 'journal'] as const) {
    const entries = localize(await loadCollection(name), locale);
    for (const { entry } of entries) {
      items.push({
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.date,
        link: localePath(locale, `/${name}/${entry.data.translationKey}/`),
        categories: entry.data.tags,
      });
    }
  }
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  return rss({
    title: locale === 'zh' ? '惠思远' : 'Siyuan Hui',
    description: t.siteDescription,
    site: context.site ?? 'https://siyuanhui.github.io',
    items,
    customData: `<language>${locale === 'zh' ? 'zh-cn' : 'en-us'}</language>`,
    trailingSlash: true,
  });
}
