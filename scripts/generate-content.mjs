import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';
import { marked } from 'marked';

const root = process.cwd();
const contentRoot = path.resolve(root, process.env.FEYN_CONTENT_DIR || 'content');
const outputFile = path.join(root, 'generated', 'content.ts');

function fail(message) {
  throw new Error(`[content] ${message}`);
}

function readMarkdown(relativePath) {
  const file = path.join(contentRoot, relativePath);
  if (!fs.existsSync(file)) fail(`Missing ${relativePath}`);
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  return { data: parsed.data, body: parsed.content.trim(), file };
}

function text(value, field, file) {
  if (typeof value !== 'string' || !value.trim()) fail(`${field} must be a non-empty string in ${file}`);
  return value.trim();
}

function textList(value, field, file) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item.trim())) fail(`${field} must be a string list in ${file}`);
  return value.map((item) => item.trim());
}

function date(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function profile(locale) {
  const item = readMarkdown(`profile/${locale}.md`);
  return {
    locale,
    name: text(item.data.name, 'name', item.file),
    alternateName: text(locale === 'zh' ? item.data.englishName : item.data.chineseName, 'alternateName', item.file),
    eyebrow: text(item.data.eyebrow, 'eyebrow', item.file),
    role: text(item.data.role, 'role', item.file),
    intro: text(item.data.intro, 'intro', item.file),
    statements: textList(item.data.statements, 'statements', item.file),
    resumeCta: text(item.data.resumeCta, 'resumeCta', item.file),
  };
}

function resume(locale) {
  const item = readMarkdown(`resume/${locale}.md`);
  if (!Array.isArray(item.data.experience) || item.data.experience.length === 0) fail(`experience must be a non-empty list in ${item.file}`);
  return {
    locale,
    title: text(item.data.title, 'title', item.file),
    summary: text(item.data.summary, 'summary', item.file),
    experience: item.data.experience.map((entry, index) => ({
      period: text(entry?.period, `experience[${index}].period`, item.file),
      company: text(entry?.company, `experience[${index}].company`, item.file),
      title: text(entry?.title, `experience[${index}].title`, item.file),
      detail: text(entry?.detail, `experience[${index}].detail`, item.file),
    })),
  };
}

function links() {
  const item = readMarkdown('links/index.md');
  if (!Array.isArray(item.data.links) || item.data.links.length === 0) fail(`links must be a non-empty list in ${item.file}`);
  return {
    email: text(item.data.email, 'email', item.file),
    items: item.data.links.map((entry, index) => ({
      label: text(entry?.label, `links[${index}].label`, item.file),
      handle: text(entry?.handle, `links[${index}].handle`, item.file),
      href: text(entry?.href, `links[${index}].href`, item.file),
    })),
  };
}

function collection(kind, locale) {
  const directory = path.join(contentRoot, kind, locale);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .map((name) => {
      const relative = `${kind}/${locale}/${name}`;
      const item = readMarkdown(relative);
      const draft = item.data.draft !== false;
      return {
        slug: text(item.data.slug, 'slug', item.file),
        locale,
        title: text(item.data.title, 'title', item.file),
        description: text(item.data.description, 'description', item.file),
        publishedAt: date(item.data.publishedAt),
        updatedAt: date(item.data.updatedAt),
        tags: Array.isArray(item.data.tags) ? item.data.tags.map(String) : [],
        status: item.data.status ? String(item.data.status) : null,
        stack: Array.isArray(item.data.stack) ? item.data.stack.map(String) : [],
        repository: item.data.repository ? String(item.data.repository) : null,
        website: item.data.website ? String(item.data.website) : null,
        draft,
        html: marked.parse(item.body),
      };
    })
    .filter((item) => !item.draft)
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')));
}

const generated = {
  profiles: { zh: profile('zh'), en: profile('en') },
  resumes: { zh: resume('zh'), en: resume('en') },
  links: links(),
  blog: { zh: collection('blog', 'zh'), en: collection('blog', 'en') },
  projects: { zh: collection('projects', 'zh'), en: collection('projects', 'en') },
};

const source = `// Generated from feyn-content. Do not edit.\n\nexport type ContentEntry = { slug: string; locale: 'zh' | 'en'; title: string; description: string; publishedAt: string | null; updatedAt: string | null; tags: string[]; status: string | null; stack: string[]; repository: string | null; website: string | null; draft: boolean; html: string };\nexport type Profile = { locale: 'zh' | 'en'; name: string; alternateName: string; eyebrow: string; role: string; intro: string; statements: string[]; resumeCta: string };\nexport type Resume = { locale: 'zh' | 'en'; title: string; summary: string; experience: { period: string; company: string; title: string; detail: string }[] };\nexport type Content = { profiles: { zh: Profile; en: Profile }; resumes: { zh: Resume; en: Resume }; links: { email: string; items: { label: string; handle: string; href: string }[] }; blog: { zh: ContentEntry[]; en: ContentEntry[] }; projects: { zh: ContentEntry[]; en: ContentEntry[] } };\n\nexport const content: Content = ${JSON.stringify(generated, null, 2)};\n`;
if (!process.argv.includes('--check')) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, source);
}
console.log(`[content] validated ${contentRoot}`);
