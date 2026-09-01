import type { Metadata } from 'next';
import { PageIntro, Shell } from '../../components';
import { ContentIndex } from '../../content-components';
import { projects } from '@/lib/site';
export const metadata: Metadata = { title: 'Projects', description: "Selected projects and building practice from Feyn." };
export default function Projects() { return <Shell locale="en"><PageIntro eyebrow="Selected work" title="Projects"><p>From complex systems to concrete products: only work whose story is worth telling clearly.</p></PageIntro><ContentIndex entries={projects.en} basePath="/en/projects/" emptyTitle="Projects are being prepared" emptyBody="The first case studies will appear when their source material is ready. No fictional placeholders." /></Shell>; }
