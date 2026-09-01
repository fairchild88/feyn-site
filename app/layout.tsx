import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://feyn.cc'),
  title: { default: '非 Feyn — Arch & Build', template: '%s — Feyn' },
  description: 'Feyn 的个人站点：架构、工程、AI 产品实践与作品。',
  alternates: { canonical: '/', languages: { 'zh-CN': '/', 'en': '/en/' } },
  icons: { icon: '/favicon.svg' },
  openGraph: { title: '非 Feyn — Arch & Build', description: '架构、工程、AI 产品实践与作品。', url: '/', siteName: 'Feyn', locale: 'zh_CN', type: 'website', images: [{ url: '/og.png', width: 1729, height: 910, alt: 'Feyn — Arch & Build' }] },
  twitter: { card: 'summary_large_image', title: '非 Feyn — Arch & Build', description: '架构、工程、AI 产品实践与作品。', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
