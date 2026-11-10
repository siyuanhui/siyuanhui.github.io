import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './paths';

export type CollectionName = 'projects' | 'research' | 'garden' | 'journal' | 'courses';
type AnyEntry = CollectionEntry<CollectionName>;

export interface Picked<T> {
  entry: T;
  fallback: boolean;
}

export async function loadCollection<C extends CollectionName>(name: C) {
  return getCollection(name);
}

export function localize<T extends { data: { translationKey: string; language: string; draft?: boolean } }>(
  entries: T[],
  locale: Locale,
  opts?: { drafts?: boolean },
): Picked<T>[] {
  const groups = new Map<string, T[]>();
  for (const entry of entries) {
    if (entry.data.draft && !opts?.drafts) continue;
    const list = groups.get(entry.data.translationKey) ?? [];
    list.push(entry);
    groups.set(entry.data.translationKey, list);
  }
  return [...groups.values()].map((list) => {
    const match = list.find((entry) => entry.data.language === locale);
    const entry = match ?? list[0];
    return { entry, fallback: entry.data.language !== locale };
  });
}

export async function staticPaths(name: CollectionName) {
  const entries = await getCollection(name);
  const slugs = new Set<string>();
  for (const entry of entries) {
    if (entry.data.draft && !import.meta.env.DEV) continue;
    slugs.add(entry.data.translationKey);
  }
  return [...slugs].map((slug) => ({ params: { slug } }));
}

export async function findLocalized<C extends CollectionName>(name: C, slug: string, locale: Locale) {
  const entries = await getCollection(name);
  const group = entries.filter(
    (entry) => entry.data.translationKey === slug && (!entry.data.draft || import.meta.env.DEV),
  );
  if (group.length === 0) return undefined;
  const match = group.find((entry) => entry.data.language === locale);
  const entry = match ?? group[0];
  return { entry, fallback: entry.data.language !== locale };
}

export async function nowEntry(locale: Locale) {
  const entries = await getCollection('now');
  const visible = entries.filter((entry) => !entry.data.draft || import.meta.env.DEV);
  const match = visible.find((entry) => entry.data.language === locale);
  const entry = match ?? visible[0];
  if (!entry) return undefined;
  return { entry, fallback: entry.data.language !== locale };
}

export function byOrder<T extends { data: { order?: number } }>(items: T[]) {
  return [...items].sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export function featuredFirst<T extends { data: { featured?: boolean; featuredOrder?: number; date: Date } }>(
  items: T[],
) {
  return [...items].sort((a, b) => {
    const feature = Number(Boolean(b.data.featured)) - Number(Boolean(a.data.featured));
    if (feature) return feature;
    const order = (a.data.featuredOrder ?? 99) - (b.data.featuredOrder ?? 99);
    if (order) return order;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export function relatedOf<T extends AnyEntry>(entries: T[], current: T, locale: Locale) {
  const tags = new Set(current.data.tags ?? []);
  const topic = 'topic' in current.data ? current.data.topic : undefined;
  const category = 'category' in current.data ? current.data.category : undefined;
  return localize(
    entries.filter((entry) => entry.data.translationKey !== current.data.translationKey),
    locale,
  )
    .map((item) => {
      let score = 0;
      for (const tag of item.entry.data.tags ?? []) if (tags.has(tag)) score += 2;
      if (topic && 'topic' in item.entry.data && item.entry.data.topic === topic) score += 1;
      if (category && 'category' in item.entry.data && item.entry.data.category === category) score += 1;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
