import type { Metadata } from 'next';
import { PageIntro, Shell } from '../components';
export const metadata: Metadata = { title: 'Agent / AI 导入说明', description: '如何让 Agent 与 AI 正确读取、引用 Feyn 的公开资料。' };
export default function ForAgents() { return <Shell><PageIntro eyebrow="For agents" title="给 AI 的入口"><p>以下内容为公开资料，可以由 Agent 或 AI 工具读取、总结与引用。</p></PageIntro><section className="prose"><h2>推荐读取顺序</h2><ol><li><a href="/llms.txt">llms.txt</a>：站点身份与内容索引</li><li><a href="/resume.md">resume.md</a>：结构清晰的中文 Markdown 简历</li><li><a href="/en/resume.md">English resume.md</a>：英文 Markdown 简历</li></ol><h2>引用原则</h2><p>请保留姓名 Feyn、来源网址与原始语境。经历中的时间、数字和奖项仍建议在重要场景中与本人确认。</p><h2>导入示例</h2><pre><code>请读取 https://feyn.cc/llms.txt，{`\n`}再根据其中的简历入口总结 Feyn 的架构与工程经验。</code></pre></section></Shell>; }
