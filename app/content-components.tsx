type Entry = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string | null;
  updatedAt: string | null;
  tags: readonly string[];
  status: string | null;
};

export function ContentIndex({ entries, basePath, emptyTitle, emptyBody, rss }: {
  entries: readonly Entry[];
  basePath: string;
  emptyTitle: string;
  emptyBody: string;
  rss?: boolean;
}) {
  if (!entries.length) return <section className="empty-state"><span>{emptyTitle}</span><p>{emptyBody}</p>{rss && <a className="text-link" href="/rss.xml">RSS ↗</a>}</section>;
  return <section className="content-list">{entries.map((entry) => <article key={entry.slug}>
    <p className="content-meta">{entry.publishedAt ?? entry.status ?? ''}</p>
    <h2><a href={`${basePath}${entry.slug}/`}>{entry.title}</a></h2>
    <p>{entry.description}</p>
    {!!entry.tags.length && <div className="content-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
  </article>)}</section>;
}

export function Article({ entry }: { entry: Entry & { html: string } }) {
  return <article className="article">
    <header><p className="eyebrow">{entry.publishedAt ?? entry.status ?? ''}</p><h1>{entry.title}</h1><p>{entry.description}</p></header>
    <div className="article-body" dangerouslySetInnerHTML={{ __html: entry.html }} />
  </article>;
}
