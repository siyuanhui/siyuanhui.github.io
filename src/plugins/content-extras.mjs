import katex from 'katex';
import { defineHastPlugin } from 'satteri';

function classList(node) {
  const value = node.properties?.className;
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') return value.split(/\s+/);
  return [];
}

function hasClass(node, name) {
  return classList(node).includes(name);
}

function localeFrom(ctx) {
  const path = ctx.fileURL?.pathname ?? '';
  if (path.includes('.zh.')) return 'zh';
  const language = ctx.data?.astro?.frontmatter?.language;
  return language === 'zh' ? 'zh' : 'en';
}

function isFilePath(path) {
  const leaf = path.split('/').filter(Boolean).pop() ?? '';
  return leaf.includes('.');
}

function withSlash(path) {
  if (path === '/' || isFilePath(path) || path.endsWith('/')) return path;
  return `${path}/`;
}

function localizeHref(href, locale) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const suffix = cut === -1 ? '' : href.slice(cut);
  let next = withSlash(path);
  if (locale === 'zh' && next !== '/zh' && !next.startsWith('/zh/')) {
    next = next === '/' ? '/zh/' : `/zh${next}`;
  }
  return next + suffix;
}

function wikiHref(href) {
  const prefixed = href.match(/^(projects|research|garden|journal):([a-z0-9-]+)$/i);
  if (prefixed) {
    const section = prefixed[1].toLowerCase();
    return `/${section}/${prefixed[2]}/`;
  }
  if (/^[a-z0-9-]+$/.test(href)) return `/garden/${href}/`;
  return null;
}

function renderTex(tex, display) {
  return katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    trust: false,
    strict: 'ignore',
  });
}

/**
 * KaTeX for Sätteri math nodes, locale-aware links, lazy images,
 * scrollable tables, and removal of headings that have no body.
 */
export const contentPlugin = defineHastPlugin({
  name: 'content-extras',
  element: {
    filter: ['a', 'img', 'table', 'code', 'pre', 'h2'],
    visit(node, ctx) {
      const locale = localeFrom(ctx);

      if (node.tagName === 'code' && hasClass(node, 'math-inline')) {
        ctx.replaceNode(node, { type: 'raw', value: renderTex(ctx.textContent(node), false) });
        return;
      }

      if (node.tagName === 'pre') {
        const code = (node.children ?? []).find(
          (child) => child.type === 'element' && child.tagName === 'code' && hasClass(child, 'math-display'),
        );
        if (code) {
          ctx.replaceNode(node, { type: 'raw', value: renderTex(ctx.textContent(code), true) });
        }
        return;
      }

      if (node.tagName === 'a' && typeof node.properties?.href === 'string') {
        let href = node.properties.href;
        if (/^https?:\/\//.test(href)) {
          ctx.setProperty(node, 'target', '_blank');
          ctx.setProperty(node, 'rel', 'noopener noreferrer');
          return;
        }
        const wiki = wikiHref(href);
        if (wiki) {
          const label = href.includes(':') ? href.split(':').slice(1).join(':') : href;
          if (ctx.textContent(node) === href) {
            ctx.setField(node, 'children', [{ type: 'text', value: label }]);
          }
          href = wiki;
        }
        if (href.startsWith('/')) ctx.setProperty(node, 'href', localizeHref(href, locale));
        return;
      }

      if (node.tagName === 'img') {
        if (node.properties?.loading == null) ctx.setProperty(node, 'loading', 'lazy');
        if (node.properties?.decoding == null) ctx.setProperty(node, 'decoding', 'async');
        return;
      }

      if (node.tagName === 'table') {
        const parent = ctx.parent(node);
        const wrapped =
          parent?.type === 'element' &&
          parent.tagName === 'div' &&
          hasClass(parent, 'table-scroll');
        if (!wrapped) ctx.wrapNode(node, { raw: '<div class="table-scroll"></div>' });
        return;
      }

      if (node.tagName === 'h2' && node.properties?.id === 'footnote-label' && locale === 'zh') {
        ctx.setField(node, 'children', [{ type: 'text', value: '注' }]);
      }
    },
  },
  after(root, ctx) {
    const children = root.children ?? [];
    const starts = [];
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.type === 'element' && child.tagName === 'h2' && child.properties?.id !== 'footnote-label') {
        starts.push(i);
      }
    }
    if (starts.length === 0) return;
    starts.push(children.length);
    for (let s = starts.length - 2; s >= 0; s -= 1) {
      const start = starts[s];
      const end = starts[s + 1];
      let text = '';
      for (let i = start + 1; i < end; i += 1) text += ctx.textContent(children[i]);
      if (text.trim() !== '') continue;
      for (let i = end - 1; i >= start; i -= 1) ctx.removeChildAt(root, i);
    }
  },
});
