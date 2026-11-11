import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const i18n = readFileSync(join(root, 'i18n.js'), 'utf8');

const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const en = {};
for (const match of html.matchAll(/data-i18n="([^"]+)"[^>]*>([^<]*)</g)) en[match[1]] = decode(match[2]);
for (const match of html.matchAll(/data-i18n-html="([^"]+)"[^>]*>([\s\S]*?)<\/p>/g)) en[match[1]] = decode(match[2]);
const zh = {};
for (const match of i18n.matchAll(/"((?:\\.|[^"\\])*)": "((?:\\.|[^"\\])*)"/g)) {
  zh[match[1]] = JSON.parse(`"${match[2]}"`);
}

const required = [
  'about.p1', 'about.p2',
  'honor.mcm', 'honor.buddy', 'honor.upc', 'honor.cpho',
  'date.jan2026', 'date.mar2025', 'date.jan2025', 'date.nov2023',
  'umich.name', 'umich.role', 'umich.dates', 'umich.note',
  'sjtu.name', 'sjtu.role', 'sjtu.dates', 'sjtu.note',
  'navarra.name', 'navarra.role', 'navarra.dates', 'navarra.note',
  'course.311', 'course.216', 'course.270', 'course.280', 'course.215', 'course.301', 'course.370', 'course.312',
  'coursework.title', 'coursework.inprogress',
  'gan.title', 'gan.role', 'gan.dates', 'gan.desc',
  'prp.title', 'prp.role', 'prp.dates', 'prp.desc',
  'intern.title', 'intern.role', 'intern.dates', 'intern.desc',
  'ta.title', 'ta.role', 'ta.dates', 'ta.desc',
  'mentor.title', 'mentor.role', 'mentor.dates',
  'proj.mult.title', 'proj.mult.p1', 'proj.mult.p2',
  'proj.lc2k.title', 'proj.lc2k.tags', 'proj.lc2k.p1', 'proj.lc2k.p2',
  'proj.robot.title', 'proj.robot.tags', 'proj.robot.p1',
  'date.fall2026', 'date.marMay2025', 'status.progress',
  'skills.title', 'skills.programming', 'skills.tools', 'skills.languages',
  'lang.chinese', 'lang.english', 'lang.spanish',
  'contact.title', 'contact.lede', 'footer',
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const files = walk(dist);
const pages = files.filter((file) => file.endsWith('.html') || file.endsWith('.xml'));
const corpus = decode(pages.map((file) => readFileSync(file, 'utf8')).join('\n'));
const failures = [];

for (const key of required) {
  if (!corpus.includes(en[key])) failures.push(`missing EN ${key}: ${en[key]}`);
  if (!corpus.includes(zh[key])) failures.push(`missing ZH ${key}: ${zh[key]}`);
}

for (const phrase of [
  "Hi, I'm Siyuan.",
  'Curious about how things work, and why they matter.',
  'Computer Engineering student at the University of Michigan. Exploring computer systems, semiconductors, and intelligence — with a love for music and ideas beyond engineering.',
  '你好，我是思远。',
  '好奇事物如何运作，以及它们为何重要。',
  'This is a literature review and a research plan.',
  'No model has been implemented here, and no outcome is claimed.',
  'EECS 312 · Cadence · IBM 130 nm CMOS PDK',
  'rogerhui@umich.edu',
  'https://github.com/siyuanhui',
  'https://www.linkedin.com/in/siyuanhui',
  'https://x.com/RogerHuiIsBack',
]) {
  if (!corpus.includes(phrase)) failures.push(`missing phrase: ${phrase}`);
}

for (const banned of [
  'Template: rendering math and code',
  'Template: reference sheet',
  'Template: course page',
  'Template: a short journal note',
  'Template: an academic essay',
  'Template: project case study',
  'Template: MDX note',
  'DRAFT_TEMPLATE_NOT_FOR_PUBLICATION',
]) {
  if (corpus.includes(banned)) failures.push(`draft leaked: ${banned}`);
}

if (!html.includes('data-i18n="about.p1"')) failures.push('legacy index.html was overwritten');
const resumeOnDisk = existsSync(join(root, 'public', 'resume.pdf'));
const resumeLinked = corpus.includes('href="/resume.pdf"') || corpus.includes("href='/resume.pdf'");
if (resumeOnDisk && !resumeLinked) failures.push('public/resume.pdf exists but the built site does not link /resume.pdf');
if (!resumeOnDisk && resumeLinked) failures.push('resume.pdf is linked but public/resume.pdf is absent');
if (resumeOnDisk && corpus.includes('isn’t on this site')) failures.push('résumé page still says the file is absent');

const htmlFiles = files.filter((file) => file.endsWith('.html'));
const idMap = new Map();
function idsOf(file) {
  if (idMap.has(file)) return idMap.get(file);
  const text = readFileSync(file, 'utf8');
  const ids = new Set();
  for (const match of text.matchAll(/\sid="([^"]+)"/g)) ids.add(match[1]);
  idMap.set(file, ids);
  return ids;
}

const fileSet = new Set(files);
let links = 0;
for (const file of htmlFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('data:') || href.startsWith('#')) continue;
    if (/^https?:\/\//.test(href)) continue;
    links += 1;
    const url = new URL(href, 'https://siyuanhui.github.io/');
    const pathname = decodeURIComponent(url.pathname);
    const candidates = [];
    if (pathname.endsWith('/')) candidates.push(join(dist, pathname, 'index.html'));
    else {
      candidates.push(join(dist, pathname));
      candidates.push(`${join(dist, pathname)}.html`);
      candidates.push(join(dist, pathname, 'index.html'));
    }
    const target = candidates.find((candidate) => fileSet.has(candidate));
    if (!target) {
      failures.push(`broken link ${href} in ${relative(dist, file)}`);
      continue;
    }
    if (url.hash) {
      const id = url.hash.slice(1);
      if (id && !idsOf(target).has(id)) failures.push(`missing #${id} for ${href} in ${relative(dist, file)}`);
    }
  }
}

const external = new Set();
for (const file of htmlFiles) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/href="(https?:\/\/[^"]+)"/g)) external.add(match[1]);
}
for (const href of [...external].filter((href) => !href.startsWith('https://siyuanhui.github.io'))) {
  try {
    const response = await fetch(href, {
      redirect: 'follow',
      headers: { 'user-agent': 'siyuanhui-site-linkcheck' },
      signal: AbortSignal.timeout(15000),
    });
    if (response.status === 404 || response.status === 410) failures.push(`external ${response.status} ${href}`);
    else if (response.status >= 400) console.log(`warn external ${response.status} ${href}`);
    else console.log(`ok ${response.status} ${href}`);
  } catch (error) {
    console.log(`warn external unreachable ${href}: ${error.message}`);
  }
}

if (!fileSet.has(join(dist, 'favicon.svg'))) failures.push('missing favicon');
if (!fileSet.has(join(dist, 'sitemap-index.xml')) && !files.some((file) => file.endsWith('sitemap-index.xml'))) {
  failures.push('missing sitemap');
}
if (!fileSet.has(join(dist, 'rss.xml'))) failures.push('missing rss');
if (!fileSet.has(join(dist, '404.html'))) failures.push('missing 404');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`checked ${htmlFiles.length} pages, ${links} internal links, ${external.size} external links`);
