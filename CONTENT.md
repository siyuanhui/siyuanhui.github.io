# Writing for this site

Content is Markdown or MDX with frontmatter. You do not edit layout files to publish a note. Put the file in the right folder, set `draft: false`, and rebuild.

Drafts (`draft: true`, and anything named `template-*`) show up in `npm run dev` and are excluded from the production build.

## Where files go

| Kind | Folder | Public URL |
| --- | --- | --- |
| Project case study | `src/content/projects/` | `/projects/<translationKey>/` |
| Research case study | `src/content/research/` | `/research/<translationKey>/` |
| Garden note or reference sheet | `src/content/garden/` | `/garden/<translationKey>/` |
| Course page | `src/content/courses/` | `/garden/courses/<translationKey>/` |
| Journal note or essay | `src/content/journal/` | `/journal/<translationKey>/` |
| Now | `src/content/now/en.md` and `zh.md` | `/now/` |

Write English as `name.en.md` and Chinese as `name.zh.md`. Give both the same `translationKey`. That key is the URL slug. A page does not need a translation: the other language shows the original with a short notice. The interface is still translated.

Copy a template, rename it so it does not start with `template-`, then edit it:

- `src/content/projects/template-case-study.md`
- `src/content/garden/template-technical-note.md`
- `src/content/garden/template-reference-sheet.md`
- `src/content/garden/template-mdx-note.mdx`
- `src/content/courses/template-course.md`
- `src/content/journal/template-journal-note.md`
- `src/content/journal/template-academic-essay.md`

In dev, the technical-note template is at `/garden/template-technical-note/`.

## Frontmatter

Common fields: `title`, `description`, `date`, `tags`, `language` (`en` or `zh`), `draft`, `translationKey`. Projects and research also use `period`, `role`, `tools`, `course`, `status` (`in-progress` or `completed`), `facts` (short bullets), `featured`, and optional `github`.

Garden notes use `topic` and `status` (`seedling`, `growing`, `evergreen`). Topics:

- `computer-architecture`
- `digital-vlsi`
- `semiconductors`
- `mathematics`
- `ai-ml`
- `physics`
- `interdisciplinary`
- `questions`

`kind: reference` marks a formula sheet. Set `course` to a code already on the site, such as `EECS 370`, when the note belongs to that course.

Journal entries use `form` (`thought` or `essay`) and `category`:

Essays: `literary-analysis`, `academic-writing`, `music-culture`, `philosophy`, `personal`.

Other notes: `art`, `travel`, `everyday`, `tech`.

Optional essay fields: `analyzes` (the work discussed), `version` (`original` or `revised`), `course`, `pdf`, `audio`. A `pdf` or `audio` path is shown only when the file is actually in `public/`.

## Case studies

Use only the sections you can fill. A heading with an empty body is dropped. The template lists the ones that are available:

Problem and objective, My contribution, Architecture and design, Implementation, Testing and verification, Results, Trade-offs, Challenges and lessons.

The summary at the top is the frontmatter (`role`, `period`, `tools`, `status`, `facts`). Leave a field out rather than inventing it. For research, say what is a goal, what is in progress, what has been implemented, and what has been validated. Do not turn a literature review into a result.

## Math, code, diagrams, footnotes

Inline math is `$E = mc^2$`. Display math is a `$$` fence. Code fences are highlighted. Tables are standard Markdown. Footnotes use `[^1]` and a `## Bibliography` section is just Markdown.

Diagrams should be SVG or PNG that you export yourself. Put them next to the note and use a relative image, or put them under `public/files/` and link with a root path. Mermaid is not bundled; a schematic from Cadence is a figure, not a diagram you redraw in the page.

Wikilinks: `[[slug]]` goes to a garden note, `[[projects:slug]]` to a project, and the same for `research` and `journal`. Ordinary Markdown links work too. Write them without a locale prefix (`/projects/lc2k-toolchain/`); Chinese pages add `/zh`.

## Coursework and files

The coursework list at `/garden/courses/` is the courses already named on the site. Completed courses are not given a campus or a term, because the current site does not state those. EECS 370 and EECS 312 are marked in progress for Fall 2026, which the site does state. A course becomes its own page only after you publish a file in `src/content/courses/`. Until then the row is just the name, plus a link to a real project when one exists (the multiplier for EECS 312, the LC2K toolchain for EECS 370).

Drop files here, then point frontmatter at them:

```text
public/resume.pdf
public/files/courses/<code>/sheet.pdf
public/files/essays/essay.pdf
public/files/projects/<slug>/figure.png
public/files/journal/<slug>/photo.jpg
```

Do not publish material you are not free to post. That includes instructor slides, textbook pages, solution keys, exam problems, and unpublished research data. A reference sheet should be your own summary. An essay PDF should be your own paper. If a course forbids public write-ups, keep the file as `draft: true` or leave it off the site.

## Now, search, and feeds

Edit `src/content/now/en.md` and `zh.md` for the Now page. `summary` is the line on the homepage. Set `draft: true` on both to hide the section.

Search is the `/search/` page. It indexes published projects, research, notes, and journal entries in the browser. There is no account and no external search service.

`/rss.xml` and `/zh/rss.xml` list published projects, research, notes, and journal entries. The homepage omits Garden notes, Journal entries, and Selected notes when there is nothing published, and it does not invent stand-in cards.

## Interface copy

Navigation, the homepage hero, and other chrome live in `src/i18n/ui.ts`. The approved English hero is there. Biographical paragraphs, honors, education, and skills live in `src/data/profile.json` and in the Markdown under `src/content/`.
