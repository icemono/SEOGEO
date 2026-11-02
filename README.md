# SEOGEO.dev

面向开发者的 SEO、ASO 与 GEO 零基础交互指南。

线上网站：https://seogeo.dev/

## 内容与功能

- SEO、ASO、GEO 各 8 步：通俗解释、开发者行动、示例代码、术语与机制边界。
- 自定义本地模拟提问，不请求搜索或 AI API。
- 主题概念对照、完整文字版、FAQ 与一手资料链接。
- 三组上线清单，浏览器本地保存，支持复制 Markdown 或下载兜底。
- 响应式布局、键盘操作、减少动态效果支持；不加载外部字体或分析脚本。

## 本地开发

Node.js 22.12+（或当前 Vite 支持的更高版本）。

```sh
npm ci
npm run dev
```

默认地址见 Vite 输出。生产预览使用 `npm run build && npm run preview`。

## 构建

```sh
npm run build
```

TypeScript 检查后构建客户端，使用 React 服务端渲染生成首页和 `/learn/seo/`、`/learn/aso/`、`/learn/geo/` 的完整静态 HTML，再在浏览器中 hydrate。主要内容和完整文字课程无需等待 JavaScript 才能被读取。未实现真实搜索、任意网站诊断或模型调用。

## 部署到 Cloudflare

```sh
npx wrangler login
npm run deploy
```

`wrangler.jsonc` 配置 Workers 静态托管，绑定 `seogeo.dev` 和 `www.seogeo.dev`，采用真实 404 页面。主站规范地址为 `https://seogeo.dev/`。登录凭据由 Wrangler 管理，不在仓库保存。

本次通过直接上传部署。Cloudflare Pages 的 Git 安装返回异常，未配置 Git 推送自动部署；后续改动需运行上面的部署命令。

## 编辑入口

- `src/content.ts`：课程、清单、FAQ、引用。
- `src/Workbench.tsx`：学习交互。
- `src/Checklist.tsx`：清单和浏览器本地状态。
- `src/App.tsx`、`src/index.css`：页面与视觉系统。
- `scripts/prerender.mjs`：静态页面生成。
- `public/robots.txt`、`public/sitemap.xml`、`public/_headers`：爬虫与响应策略。

代码与内容已上线不等于搜索引擎已收录或 AI 已引用。Search Console 所有权验证和搜索提交未在本次任务中执行。
