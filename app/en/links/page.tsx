import type { Metadata } from 'next';
import { LinksList, PageIntro, Shell } from '../../components';
export const metadata: Metadata = { title: 'Links', description: "Feyn's public profiles and contact details." };
export default function Links() { return <Shell locale="en"><PageIntro eyebrow="Links" title="Stay in touch"><p>All public profiles in one place. Email is usually the most direct route.</p></PageIntro><LinksList locale="en" /></Shell>; }
