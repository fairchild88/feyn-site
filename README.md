# feyn.cc

Feyn 的双语个人站点，包含首页、公开链接、Blog、Projects、在线简历、Markdown 简历、Agent 入口、RSS、sitemap 与 SEO 元数据。

## 仓库职责

- `feyn-site`（本仓库）：Next/Vinext 程序、样式、内容生成器和 Cloudflare 部署。
- `feyn-content`（私有仓库）：Obsidian Markdown 内容，位于 Personal Vault 内。

本地开发时，仓库根目录的 `content` 是指向 `feyn-content` 的软链接；它被 Git 忽略。构建只读取该目录，不会扫描或发布上级 Obsidian Vault 中的其他内容。

## 本地使用

```bash
pnpm install
pnpm content:check
pnpm dev
pnpm build
```

也可以不用软链接：

```bash
FEYN_CONTENT_DIR=/absolute/path/to/feyn-content pnpm build
```

## 发布流程

1. 程序提交到本仓库 `main`，触发构建并部署。
2. 内容提交到 `feyn-content/main`，内容仓库发送 `repository_dispatch`，触发本仓库读取对应内容 commit 后构建并部署。
3. `draft: true`（或缺少明确的 `draft: false`）的 Blog/Project 不发布。

本仓库 Actions 需要：

- `FEYN_CONTENT_TOKEN`：仅对私有 `feyn-content` 有 Contents Read 权限的 fine-grained PAT。
- `CLOUDFLARE_API_TOKEN`：仅允许目标 Worker 部署的 Cloudflare Token。
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID。

内容仓库需要 `SITE_DISPATCH_TOKEN`：仅对 `feyn-site` 有 Contents Write 权限的 fine-grained PAT。不要把密钥写入 Markdown、源码或 Obsidian。
