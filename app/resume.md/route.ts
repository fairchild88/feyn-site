import { resumeMarkdown } from '@/lib/resume';
export function GET() { return new Response(resumeMarkdown('zh'), { headers: { 'content-type': 'text/markdown; charset=utf-8', 'content-disposition': 'inline; filename="feyn-resume-zh.md"' } }); }
