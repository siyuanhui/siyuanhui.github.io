import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function publicFileExists(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  const pathname = href.split(/[?#]/)[0] ?? href;
  const file = fileURLToPath(new URL(`../../public${pathname}`, import.meta.url));
  return existsSync(file);
}

export function resumeHref() {
  return publicFileExists('/resume.pdf') ? '/resume.pdf' : null;
}
