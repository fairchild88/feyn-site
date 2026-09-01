import type { Metadata } from 'next';
import { PageIntro, Shell } from '../components';
import { resumes } from '@/lib/resume';
export const metadata: Metadata = { title: '简历', description: 'Feyn 的在线简历与工作经历。' };
export default function Resume() { const resume = resumes.zh; return <Shell><PageIntro eyebrow="Resume" title={resume.title}><p>{resume.summary}</p><div className="page-actions"><a href="/resume.md">Markdown 版本</a><a href="/for-agents/">Agent / AI 导入说明</a></div></PageIntro><section className="resume-list"><h2>工作经历</h2>{resume.experience.map((item) => <article key={`${item.company}-${item.period}`}><time>{item.period}</time><div><h3>{item.title}</h3><p className="company">{item.company}</p><p>{item.detail}</p></div></article>)}</section></Shell>; }
