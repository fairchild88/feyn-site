import { nav, site } from '@/lib/site';
import type { Locale } from '@/lib/resume';
import { EmailContact } from './email-contact';
import { LanguageSwitch } from './language-switch';

export function LocaleRedirect({ locale }: { locale: Locale }) {
  const code = `(()=>{try{const c='${locale}',p=new URLSearchParams(location.search),q=p.get('lang');if(q==='zh'||q==='en'){localStorage.setItem('feyn-locale',q);history.replaceState(null,'',location.pathname)}const s=q||localStorage.getItem('feyn-locale'),l=(navigator.languages&&navigator.languages[0])||navigator.language||'',d=/^zh(?:-|$)/i.test(l)?'zh':'en',n=s||d;if(n!==c)location.replace(n==='zh'?'/?lang=zh':'/en/?lang=en')}catch{}})()`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export function Shell({ locale='zh', alternateHref, children }: { locale?: Locale; alternateHref?: string; children: React.ReactNode }) {
  const alt = locale === 'zh' ? { label: 'EN', href: '/en/?lang=en' } : { label: 'ZH', href: '/?lang=zh' };
  return <main>
    <header className="site-header">
      <a className="home-link" href={locale === 'zh' ? '/' : '/en/'} aria-label={locale === 'zh' ? 'Feyn 首页' : 'Feyn home'}>Feyn</a>
      <nav aria-label={locale === 'zh' ? '主要导航' : 'Primary navigation'}>
        {nav[locale].map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        <LanguageSwitch locale={locale === 'zh' ? 'en' : 'zh'} href={alternateHref ?? alt.href} />
      </nav>
    </header>
    {children}
    <footer><span>© 2026 Feyn</span><span className="footer-links"><a href="/rss.xml">RSS</a><span aria-hidden="true">·</span><EmailContact encodedEmail={site.encodedEmail} locale={locale} /></span></footer>
  </main>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</header>;
}

export function LinksList({ locale = 'zh' }: { locale?: Locale }) {
  return <section className="link-list">
    {site.links.map((link, index) => <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      <span>{String(index + 1).padStart(2, '0')}</span><strong>{link.label}</strong><em>{link.handle}</em><b aria-hidden="true">↗</b>
    </a>)}
    <div className="email-row">
      <span>{String(site.links.length + 1).padStart(2, '0')}</span><strong>Email</strong>
      <EmailContact encodedEmail={site.encodedEmail} locale={locale} label={locale === 'zh' ? '点击显示' : 'Click to reveal'} />
    </div>
  </section>;
}
