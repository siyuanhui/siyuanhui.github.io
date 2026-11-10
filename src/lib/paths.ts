export type Locale = 'en' | 'zh';

const SITE = 'https://siyuanhui.github.io';

function splitSuffix(path: string): [string, string] {
  const index = path.search(/[?#]/);
  if (index === -1) return [path, ''];
  return [path.slice(0, index), path.slice(index)];
}

function isFile(path: string) {
  const leaf = path.split('/').filter(Boolean).pop() ?? '';
  return leaf.includes('.');
}

/** `path` is unlocalized (`/projects/`, `/rss.xml`). */
export function localePath(locale: Locale, path: string) {
  const [raw, suffix] = splitSuffix(path.startsWith('/') ? path : `/${path}`);
  let base = raw || '/';
  if (!isFile(base) && base !== '/' && !base.endsWith('/')) base = `${base}/`;
  if (locale === 'zh') {
    if (base === '/') base = '/zh/';
    else if (!base.startsWith('/zh/')) base = `/zh${base}`;
  }
  return base + suffix;
}

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE}/`).href;
}

export function htmlLang(locale: Locale) {
  return locale === 'zh' ? 'zh-CN' : 'en';
}

export function contentLang(language: string) {
  return language === 'zh' ? 'zh-CN' : 'en';
}
