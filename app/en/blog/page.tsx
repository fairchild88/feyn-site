import type { Metadata } from 'next';
import { PageIntro, Shell } from '../../components';
import { ContentIndex } from '../../content-components';
import { blog } from '@/lib/site';
export const metadata: Metadata = { title: 'Blog', description: 'Notes on architecture, engineering, and AI product practice.' };
export default function Blog() { return <Shell locale="en"><PageIntro eyebrow="Writing" title="Blog"><p>Notes on architecture, engineering, products, and the changes worth paying attention to.</p></PageIntro><ContentIndex entries={blog.en} basePath="/en/blog/" emptyTitle="No posts yet" emptyBody="I am preparing the first set of articles worth keeping for the long term." rss /></Shell>; }
