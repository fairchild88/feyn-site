import type { Metadata } from 'next';
import { HomeContent } from '../home-content';
export const metadata: Metadata = { title: 'Feyn — Arch & Build', description: 'Feyn on architecture, engineering, AI products, and the work of building.', alternates: { canonical: '/en/', languages: { 'zh-CN': '/', en: '/en/' } } };
export default function EnglishHome() {
  return <HomeContent locale="en" />;
}
