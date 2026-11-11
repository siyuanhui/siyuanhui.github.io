# Siyuan Hui

Personal site for [siyuanhui.github.io](https://siyuanhui.github.io): a professional portfolio and a place for notes and writing. English is the default. Chinese lives under `/zh/`.

The files `index.html`, `style.css`, `i18n.js`, and `.nojekyll` at the repository root are the current live site. GitHub Pages is still set to deploy that root from the `main` branch. This Astro project does not replace those files, so merging the redesign does not take the live site down. Publishing the new site is a separate settings change, described below.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run preview  # serve dist/
npm run check    # types
npm run verify   # production build and link/content check
```

Node 22 or newer.

## Routes

| Page | English | 中文 |
| --- | --- | --- |
| Home | `/` | `/zh/` |
| Projects | `/projects/` | `/zh/projects/` |
| Research | `/research/` | `/zh/research/` |
| Garden | `/garden/` | `/zh/garden/` |
| Coursework | `/garden/courses/` | `/zh/garden/courses/` |
| Journal | `/journal/` | `/zh/journal/` |
| About | `/#about` | `/zh/#about` |
| Résumé | `/resume/` | `/zh/resume/` |
| Now | `/now/` | `/zh/now/` |
| Search | `/search/` | `/zh/search/` |

Old `?lang=zh` and `?lang=en` links redirect to the matching route, including the old section hashes (`#projects` → `/projects/`, `#experience` → `/research/`, `#about` → `/#about`, `#education` → `/#education`). `/about/` and `/zh/about/` refresh to those homepage anchors.

## Résumé

There is no public PDF in the repo. The Résumé item in the nav always goes to `/resume/`, which shows contact links. When you add `public/resume.pdf` and rebuild, that page also offers the download and embeds the file. Until the file exists, nothing points at a missing PDF.

## Drafts

Files whose names start with `template-`, and any entry with `draft: true`, are available in `npm run dev` and omitted from `npm run build`. See [CONTENT.md](CONTENT.md) for how to add a project, a note, a course page, or an essay.

## Publishing

This repo’s Pages source is **Deploy from a branch: `main` / (root)**. The workflow in `.github/workflows/pages.yml` builds the Astro site and, on `main`, uploads the artifact. It publishes with GitHub Actions only after the source is switched. While the source is still “Deploy from a branch”, the deploy job notices that and does not replace the live site.

After this pull request is merged, to put the redesign online:

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions**.
3. Re-run the “Deploy GitHub Pages” workflow (or push another commit).

If the pull request is merged and the source is left on “Deploy from a branch”, visitors keep seeing the existing root `index.html`. The new pages are in the repository and in the Actions artifact, not at the public URL. The live site does not go blank and does not show an unstyled Astro source tree.
