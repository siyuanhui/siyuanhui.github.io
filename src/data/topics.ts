export const topicIds = [
  'computer-architecture',
  'digital-vlsi',
  'semiconductors',
  'mathematics',
  'ai-ml',
  'physics',
  'interdisciplinary',
  'questions',
] as const;

export type TopicId = (typeof topicIds)[number];

export const topics: { id: TopicId; en: string; zh: string }[] = [
  { id: 'computer-architecture', en: 'Computer Architecture', zh: '计算机体系结构' },
  { id: 'digital-vlsi', en: 'Digital VLSI', zh: '数字超大规模集成电路' },
  { id: 'semiconductors', en: 'Semiconductors', zh: '半导体' },
  { id: 'mathematics', en: 'Mathematics', zh: '数学' },
  { id: 'ai-ml', en: 'AI & ML', zh: '人工智能与机器学习' },
  { id: 'physics', en: 'Physics', zh: '物理' },
  { id: 'interdisciplinary', en: 'Interdisciplinary', zh: '交叉领域' },
  { id: 'questions', en: 'Questions & explorations', zh: '问题与探索' },
];

export function topicLabel(id: string, locale: 'en' | 'zh') {
  const topic = topics.find((item) => item.id === id);
  if (!topic) return id;
  return locale === 'zh' ? topic.zh : topic.en;
}
