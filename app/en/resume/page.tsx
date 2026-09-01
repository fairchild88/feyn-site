import type { Metadata } from 'next';
import { PageIntro, Shell } from '../../components';
import { resumes } from '@/lib/resume';
export const metadata: Metadata = { title: 'Resume', description: "Feyn's experience in architecture and engineering." };
export default function Resume() { const resume = resumes.en; return <Shell locale="en"><PageIntro eyebrow="Resume" title={resume.title}><p>{resume.summary}</p><div className="page-actions"><a href="/en/resume.md">Markdown version</a><a href="/for-agents/">Agent / AI guide</a></div></PageIntro><section className="resume-list"><h2>Experience</h2>{resume.experience.map((item) => <article key={`${item.company}-${item.period}`}><time>{item.period}</time><div><h3>{item.title}</h3><p className="company">{item.company}</p><p>{item.detail}</p></div></article>)}</section></Shell>; }
