import { LocaleRedirect, Shell } from './components';
import { EmailContact } from './email-contact';
import { blog, profiles, projects, site } from '@/lib/site';
import type { Locale } from '@/lib/resume';

export function HomeContent({ locale }: { locale: Locale }) {
  const profile = profiles[locale];
  const prefix = locale === 'zh' ? '/' : '/en/';
  const copy = locale === 'zh' ? {
    projects: '从复杂系统到具体产品，记录解决问题的过程。',
    projectsEmpty: '项目案例整理中。',
    allProjects: '所有项目',
    blog: '关于架构、工程与 AI 产品实践的长期思考。',
    blogEmpty: '文章整理中。',
    allPosts: '所有文章',
    about: '关于我',
    socials: '社交链接',
  } : {
    projects: 'From complex systems to concrete products: notes on solving problems.',
    projectsEmpty: 'Project case studies are being prepared.',
    allProjects: 'All projects',
    blog: 'Durable ideas on architecture, engineering, and AI product practice.',
    blogEmpty: 'Articles are being prepared.',
    allPosts: 'All posts',
    about: 'About',
    socials: 'Social links',
  };

  return <Shell locale={locale}>
    <LocaleRedirect locale={locale} />
    <section className="hero">
      <h1>{profile.eyebrow}</h1>
      <p className="role">{profile.role}</p>
      <p>{profile.intro}</p>
      {profile.statements.map((statement) => <p key={statement}>{statement}</p>)}
    </section>
    <section className="home-section" aria-labelledby="home-projects">
      <h2 id="home-projects">Projects</h2>
      <p>{copy.projects}</p>
      {projects[locale].length ? <ul className="home-entries">
        {projects[locale].slice(0, 3).map((entry) => <li key={entry.slug}>
          <a href={`${prefix}projects/${entry.slug}/`}>{entry.title}</a>
          <p>{entry.description}</p>
        </li>)}
      </ul> : <p className="muted">{copy.projectsEmpty}</p>}
      <p className="section-link"><a href={`${prefix}projects/`}>{copy.allProjects}</a></p>
    </section>
    <section className="home-section" aria-labelledby="home-blog">
      <h2 id="home-blog">Blog</h2>
      <p>{copy.blog}</p>
      {blog[locale].length ? <ul className="home-entries">
        {blog[locale].slice(0, 5).map((entry) => <li key={entry.slug}>
          <a href={`${prefix}blog/${entry.slug}/`}>{entry.title}</a>
          {entry.publishedAt ? <time dateTime={entry.publishedAt}>{entry.publishedAt}</time> : null}
        </li>)}
      </ul> : <p className="muted">{copy.blogEmpty}</p>}
      <p className="section-link"><a href={`${prefix}blog/`}>{copy.allPosts}</a> · <a href="/rss.xml">RSS</a></p>
    </section>
    <section className="home-section" aria-labelledby="home-about">
      <h2 id="home-about">{copy.about}</h2>
      <p><a href={`${prefix}resume/`}>{profile.resumeCta}</a></p>
      <div className="link-row" aria-label={copy.socials}>
        {site.links.map((link) => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{link.label}</a>)}
        <EmailContact encodedEmail={site.encodedEmail} locale={locale} />
      </div>
    </section>
  </Shell>;
}
