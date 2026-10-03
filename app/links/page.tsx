import type { Metadata } from 'next';
import { LinksList, PageIntro, Shell } from '../components';

export const metadata: Metadata = { title: '链接', description: 'Feyn 的公开社交媒体与联系方式。' };
export default function Links() { return <Shell><PageIntro eyebrow="Links" title="保持联系"><p>公开入口集中在这里。邮件通常是最直接的联系方式。</p></PageIntro><LinksList /></Shell>; }
