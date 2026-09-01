import { content } from '@/generated/content';

export const profiles = content.profiles;
export const blog = content.blog;
export const projects = content.projects;

export const site = {
  nameZh: profiles.zh.name,
  nameEn: profiles.en.name,
  roleZh: profiles.zh.role,
  roleEn: profiles.en.role,
  email: content.links.email,
  links: content.links.items,
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
