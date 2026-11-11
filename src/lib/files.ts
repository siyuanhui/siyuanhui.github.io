import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function publicFileExists(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  const pathname = href.split(/[?#]/)[0] ?? href;
  const file = join(process.cwd(), 'public', pathname);
  return existsSync(file);
}

export function resumeHref() {
  return publicFileExists('/resume.pdf') ? '/resume.pdf' : null;
}
