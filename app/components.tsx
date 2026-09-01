import { nav, site } from '@/lib/site';
import type { Locale } from '@/lib/resume';

export function Mark() { return <span className="brand" aria-hidden="true"><span className="brand-line" /><span className="brand-letter">F</span></span>; }

export function LocaleRedirect({ locale }: { locale: Locale }) {
  const code = `(()=>{try{const c='${locale}',p=new URLSearchParams(location.search),q=p.get('lang');if(q==='zh'||q==='en'){localStorage.setItem('feyn-locale',q);history.replaceState(null,'',location.pathname)}const s=q||localStorage.getItem('feyn-locale'),l=(navigator.languages&&navigator.languages[0])||navigator.language||'',d=/^zh(?:-|$)/i.test(l)?'zh':'en',n=s||d;if(n!==c)location.replace(n==='zh'?'/?lang=zh':'/en/?lang=en')}catch{}})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export function Shell({ locale='zh', children }: { locale?: Locale; children: React.ReactNode }) {
  const alt = locale === 'zh' ? { label: 'EN', href: '/en/?lang=en' } : { label: 'ZH', href: '/?lang=zh' };
  return <main>
    <header className="site-header">
      <a href={locale === 'zh' ? '/' : '/en/'} aria-label="Feyn home"><Mark /></a>
      <nav aria-label={locale === 'zh' ? '主要导航' : 'Primary navigation'}>
        {nav[locale].map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        <a href={alt.href}>{alt.label}</a>
      </nav>
    </header>
    {children}
    <footer><span>© 2026 Feyn</span><span><a href="/rss.xml">RSS</a> · <a href={`mailto:${site.email}`}>{site.email}</a></span></footer>
  </main>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</header>;
}
