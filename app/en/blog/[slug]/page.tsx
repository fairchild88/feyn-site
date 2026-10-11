import { notFound } from 'next/navigation';
import { Article } from '../../../content-components';
import { Shell } from '../../../components';
import { blog } from '@/lib/site';

export function generateStaticParams() { return blog.en.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = blog.en.find((item) => item.slug === slug); return { title: entry?.title ?? 'Blog' }; }
export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = blog.en.find((item) => item.slug === slug);
  if (!entry) notFound();
  const alternateHref = blog.zh.some((item) => item.slug === slug) ? `/blog/${slug}/` : undefined;
  return <Shell locale="en" alternateHref={alternateHref}><Article entry={entry} /></Shell>;
}
