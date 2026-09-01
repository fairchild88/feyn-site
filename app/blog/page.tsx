import type { Metadata } from 'next';
import { PageIntro, Shell } from '../components';
import { ContentIndex } from '../content-components';
import { blog } from '@/lib/site';
export const metadata: Metadata = { title: 'Blog', description: 'Feyn 关于架构、工程与 AI 产品实践的文章。' };
export default function Blog() { return <Shell><PageIntro eyebrow="Writing" title="Blog"><p>关于架构、工程、产品与正在发生的变化。</p></PageIntro><ContentIndex entries={blog.zh} basePath="/blog/" emptyTitle="暂未发布文章" emptyBody="我正在整理第一批值得长期保留的内容。你也可以通过 RSS 订阅之后的更新。" rss /></Shell>; }
