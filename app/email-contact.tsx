'use client';

import { useId, useState } from 'react';
import type { Locale } from '@/lib/resume';

export function EmailContact({ encodedEmail, locale = 'zh', label }: {
  encodedEmail: string;
  locale?: Locale;
  label?: string;
}) {
  const detailsId = useId();
  const [address, setAddress] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = locale === 'zh' ? {
    reveal: 'Email · 点击显示',
    hide: '收起',
    copy: '复制',
    compose: '写邮件',
    copied: '已复制',
    failed: '请选中邮箱地址手动复制。',
  } : {
    reveal: 'Email · Click to reveal',
    hide: 'Hide',
    copy: 'Copy',
    compose: 'Write email',
    copied: 'Copied',
    failed: 'Please select the address to copy it manually.',
  };

  function toggle() {
    setCopyStatus('idle');
    setAddress(address ? null : new TextDecoder().decode(
      Uint8Array.from(atob(encodedEmail), (character) => character.charCodeAt(0)),
    ));
  }

  async function copyAddress() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  return <span className="email-contact">
    <button className="text-button" type="button" onClick={toggle} aria-expanded={!!address} aria-controls={detailsId}>
      {address ? copy.hide : label ?? copy.reveal}
    </button>
    <span className="email-details" id={detailsId} hidden={!address}>
      {address ? <>
        <span className="email-address">{address}</span>
        <button className="text-button" type="button" onClick={copyAddress}>{copy.copy}</button>
        <a href={`mailto:${address}`}>{copy.compose}</a>
      </> : null}
      <span className="email-status" role="status" aria-live="polite" aria-atomic="true">
        {copyStatus === 'copied' ? copy.copied : copyStatus === 'failed' ? copy.failed : ''}
      </span>
    </span>
  </span>;
}
