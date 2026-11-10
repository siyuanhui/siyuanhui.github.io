import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { journalCategoryIds } from './data/journal';
import { topicIds } from './data/topics';

const building = process.argv.includes('build');
const pattern = building ? ['**/*.{md,mdx}', '!**/template-*'] : '**/*.{md,mdx}';

const tags = z.array(z.string()).default([]);

const caseStudy = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  period: z.string(),
  tags,
  language: z.enum(['en', 'zh']),
  status: z.enum(['in-progress', 'completed']).optional(),
  featured: z.boolean().default(false),
  featuredOrder: z.number().optional(),
  draft: z.boolean().default(false),
  translationKey: z.string(),
  role: z.string().optional(),
  tools: z.string().optional(),
  course: z.string().optional(),
  order: z.number().default(0),
  facts: z.array(z.string()).default([]),
  github: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern, base: './src/content/projects', deferRender: true }),
  schema: caseStudy,
});

const research = defineCollection({
  loader: glob({ pattern, base: './src/content/research', deferRender: true }),
  schema: caseStudy,
});

const garden = defineCollection({
  loader: glob({ pattern, base: './src/content/garden', deferRender: true }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags,
    language: z.enum(['en', 'zh']),
    status: z.enum(['seedling', 'growing', 'evergreen']).default('seedling'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    translationKey: z.string(),
    topic: z.enum(topicIds),
    kind: z.enum(['note', 'reference']).default('note'),
    course: z.string().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern, base: './src/content/journal', deferRender: true }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags,
    language: z.enum(['en', 'zh']),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    translationKey: z.string(),
    form: z.enum(['thought', 'essay']).default('thought'),
    category: z.enum(journalCategoryIds).optional(),
    course: z.string().optional(),
    analyzes: z.string().optional(),
    version: z.enum(['original', 'revised']).optional(),
    pdf: z.string().optional(),
    audio: z.string().optional(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern, base: './src/content/courses', deferRender: true }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags,
    language: z.enum(['en', 'zh']),
    draft: z.boolean().default(false),
    translationKey: z.string(),
    code: z.string(),
    period: z.string().optional(),
    university: z.string().optional(),
    pdfs: z.array(z.object({ href: z.string(), label: z.string() })).default([]),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/now', deferRender: true }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags,
    language: z.enum(['en', 'zh']),
    draft: z.boolean().default(false),
    summary: z.string(),
  }),
});

export const collections = { projects, research, garden, journal, courses, now };
