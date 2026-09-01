import { blog, projects } from '@/lib/site';

const paths = ['', 'links/', 'blog/', 'projects/', 'resume/', 'for-agents/', 'en/', 'en/links/', 'en/blog/', 'en/projects/', 'en/resume/', ...blog.zh.map(({ slug }) => `blog/${slug}/`), ...blog.en.map(({ slug }) => `en/blog/${slug}/`), ...projects.zh.map(({ slug }) => `projects/${slug}/`), ...projects.en.map(({ slug }) => `en/projects/${slug}/`)];
export function GET() { const urls = paths.map((path) => `<url><loc>https://feyn.cc/${path}</loc></url>`).join(''); return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'content-type': 'application/xml; charset=utf-8' } }); }
