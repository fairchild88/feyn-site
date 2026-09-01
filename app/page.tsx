import { LocaleRedirect, Shell } from './components';
import { profiles, site } from '@/lib/site';

export default function Home() {
  const profile = profiles.zh;
  return <Shell>
    <LocaleRedirect locale="zh" />
    <section className="hero">
      <p className="eyebrow">{profile.eyebrow}</p>
      <h1>Arch &amp; <em>Build</em></h1>
      <p className="intro">{profile.intro}</p>
      <div className="link-row" aria-label="社交链接">{site.links.map((link) => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{link.label}</a>)}</div>
    </section>
    <section className="statement">
      {profile.statements.map((statement) => <p key={statement}>{statement}</p>)}
      <a className="text-link" href="/resume/">{profile.resumeCta} ↗</a>
    </section>
  </Shell>;
}
