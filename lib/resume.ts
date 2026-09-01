export type Locale = 'zh' | 'en';

import { content } from '@/generated/content';

export const resumes = content.resumes;

export function resumeMarkdown(locale: Locale) {
  const isZh = locale === 'zh';
  const resume = resumes[locale];
  const lines = [
    `# ${isZh ? '非' : 'Feyn'}`,
    '',
    'Arch & Build',
    '',
    `Email: hi@feyn.cc`,
    '',
    `## ${isZh ? '简介' : 'Summary'}`,
    '',
    resume.summary,
    '',
    `## ${isZh ? '经历' : 'Experience'}`,
    '',
    ...resume.experience.flatMap((item) => [`### ${item.title} · ${item.company}`, '', item.period, '', item.detail, '']),
  ];
  return lines.join('\n');
}
