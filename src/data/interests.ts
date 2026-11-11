import type { JournalCategoryId } from './journal';
import type { TopicId } from './topics';

export const interestIds = ['music', 'art', 'fitness'] as const;

export type InterestId = (typeof interestIds)[number];

/**
 * Music and Art already have journal categories. Fitness does not match a
 * garden topic or a journal category, so it is reached only through `interests`.
 */
export const interestSources: Record<InterestId, { categories: JournalCategoryId[]; topics: TopicId[] }> = {
  music: { categories: ['music-culture'], topics: [] },
  art: { categories: ['art'], topics: [] },
  fitness: { categories: [], topics: [] },
};
