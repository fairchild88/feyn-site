import type { Metadata } from 'next';
import { PageIntro, Shell } from '../components';
import { ContentIndex } from '../content-components';
import { projects } from '@/lib/site';
export const metadata: Metadata = { title: 'Projects', description: 'Feyn 的项目与构建实践。' };
export default function Projects() { return <Shell><PageIntro eyebrow="Selected work" title="Projects"><p>从复杂系统到具体产品：只保留值得讲清楚的构建过程。</p></PageIntro><ContentIndex entries={projects.zh} basePath="/projects/" emptyTitle="项目整理中" emptyBody="首批项目案例将在内容准备完成后发布。这里不会使用虚构的占位项目。" /></Shell>; }
