import { Shell } from './components';
import Link from 'next/link';
export default function NotFound() { return <Shell><section className="not-found"><p className="eyebrow">404</p><h1>这一页还没有被构建。</h1><Link className="text-link" href="/">回到首页 ↗</Link></section></Shell>; }
