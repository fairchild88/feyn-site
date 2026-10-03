import { Buffer } from 'node:buffer';
import { content } from '@/generated/content';

export const profiles = content.profiles;
export const blog = content.blog;
export const projects = content.projects;

export const site = {
  nameZh: profiles.zh.name,
  nameEn: profiles.en.name,
  roleZh: profiles.zh.role,
  roleEn: profiles.en.role,
  // Only this encoded value crosses the email component's client boundary.
  encodedEmail: Buffer.from(content.links.email, 'utf8').toString('base64'),
  links: content.links.items.filter((link) => !link.href.toLowerCase().startsWith('mailto:')),
} as const;

export const nav = {
  zh: [
    { label: 'Links', href: '/links/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Resume', href: '/resume/' },
  ],
  en: [
    { label: 'Links', href: '/en/links/' },
    { label: 'Blog', href: '/en/blog/' },
    { label: 'Projects', href: '/en/projects/' },
    { label: 'Resume', href: '/en/resume/' },
  ],
};
