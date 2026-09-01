import { notFound } from 'next/navigation';
import { Article } from '../../content-components';
import { Shell } from '../../components';
import { projects } from '@/lib/site';

export function generateStaticParams() { return projects.zh.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = projects.zh.find((item) => item.slug === slug); return { title: entry?.title ?? 'Projects' }; }
export default async function ProjectArticle({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = projects.zh.find((item) => item.slug === slug); if (!entry) notFound(); return <Shell><Article entry={entry} /></Shell>; }
