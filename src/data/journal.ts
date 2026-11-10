export const journalCategoryIds = [
  'literary-analysis',
  'academic-writing',
  'music-culture',
  'philosophy',
  'personal',
  'art',
  'travel',
  'everyday',
  'tech',
] as const;

export type JournalCategoryId = (typeof journalCategoryIds)[number];

/** The first five are essay categories. The rest file shorter notes. */
export const journalCategories: { id: JournalCategoryId; en: string; zh: string; essay: boolean }[] = [
  { id: 'literary-analysis', en: 'Literary Analysis', zh: '文学分析', essay: true },
  { id: 'academic-writing', en: 'Academic Writing', zh: '学术写作', essay: true },
  { id: 'music-culture', en: 'Music & Culture', zh: '音乐与文化', essay: true },
  { id: 'philosophy', en: 'Philosophy & Reflections', zh: '哲学与随想', essay: true },
  { id: 'personal', en: 'Personal Essays', zh: '个人随笔', essay: true },
  { id: 'art', en: 'Art & Aesthetics', zh: '艺术与审美', essay: false },
  { id: 'travel', en: 'Travel', zh: '行旅', essay: false },
  { id: 'everyday', en: 'Everyday', zh: '日常', essay: false },
  { id: 'tech', en: 'Tech & Philosophy', zh: '技术与哲学', essay: false },
];

export function categoryLabel(id: string, locale: 'en' | 'zh') {
  const category = journalCategories.find((item) => item.id === id);
  if (!category) return id;
  return locale === 'zh' ? category.zh : category.en;
}
