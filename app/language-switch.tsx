'use client';

import type { Locale } from '@/lib/resume';

export function LanguageSwitch({ locale, href }: { locale: Locale; href: string }) {
  function rememberLocale() {
    try {
      localStorage.setItem('feyn-locale', locale);
    } catch {
      // Navigation still works when browser storage is unavailable.
    }
  }

  return <a
    href={href}
    lang={locale}
    aria-label={locale === 'en' ? 'Switch to English' : '切换到中文'}
    onClick={rememberLocale}
  >{locale === 'en' ? 'EN' : 'ZH'}</a>;
}
