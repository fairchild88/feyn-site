import type { Metadata } from 'next';
import { PageIntro, Shell } from '../../components';
import { site } from '@/lib/site';
export const metadata: Metadata = { title: 'Links', description: "Feyn's public profiles and contact details." };
export default function Links() { return <Shell locale="en"><PageIntro eyebrow="Links" title="Stay in touch"><p>All public profiles in one place. Email is usually the most direct route.</p></PageIntro><section className="link-list">{site.links.map((link, i) => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><span>0{i+1}</span><strong>{link.label}</strong><em>{link.handle}</em><b aria-hidden="true">↗</b></a>)}</section></Shell>; }
