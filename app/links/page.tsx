import type { Metadata } from 'next';
import { PageIntro, Shell } from '../components';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: '链接', description: 'Feyn 的公开社交媒体与联系方式。' };
export default function Links() { return <Shell><PageIntro eyebrow="Links" title="保持联系"><p>公开入口集中在这里。邮件通常是最直接的联系方式。</p></PageIntro><section className="link-list">{site.links.map((link, i) => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><span>0{i+1}</span><strong>{link.label}</strong><em>{link.handle}</em><b aria-hidden="true">↗</b></a>)}</section></Shell>; }
