import { notFound } from 'next/navigation';
import { Article } from '../../../content-components';
import { Shell } from '../../../components';
import { projects } from '@/lib/site';

export function generateStaticParams() { return projects.en.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = projects.en.find((item) => item.slug === slug); return { title: entry?.title ?? 'Projects' }; }
export default async function ProjectArticle({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = projects.en.find((item) => item.slug === slug); if (!entry) notFound(); return <Shell locale="en"><Article entry={entry} /></Shell>; }
