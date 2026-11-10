---
title: "Template: course page"
description: "Template for a course page. Not a published course note."
date: 2026-01-01
tags:
  - template
language: en
draft: true
translationKey: template-course
code: TEMPLATE
period: "Only if the site or your notes state a term"
university: "Only if you are sure"
pdfs:
  - href: /files/courses/template/sheet.pdf
    label: Template sheet (file intentionally absent)
---

This course page is a template. The PDF above is declared and then omitted in the render because the file is not in `public/`. Drop a file at `public/files/courses/<code>/` and point `pdfs` at it.

Garden notes and reference sheets with `course: EECS 370` (or another real code) show up beside that course once they are published. Projects already link here when their `course` field matches.
