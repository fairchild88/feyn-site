export function GET() { return new Response('User-agent: *\nAllow: /\nSitemap: https://feyn.cc/sitemap.xml\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } }); }
