# SEOGEO.dev

用像素冒险，给开发者讲清 SEO、ASO 与 GEO。

- 官网：https://seogeo.dev/
- 独立演示：https://seogeo.dev/demo/
- 主题入口：`/demo/seo/`、`/demo/aso/`、`/demo/geo/`
- 实操指南：`/learn/seo/`、`/learn/aso/`、`/learn/geo/`

## 设计与内容边界

视觉以最初 GitHub 提交 `6453c00` 为基准：保留蓝天、云朵、金币、砖块、管道和像素机器人。首页负责概念与学习入口，独立演示页保留原版三主题、八关流程、播放/暂停、自定义问题与模拟结果；长解释、代码和检查清单放在指南页。

内容面向零基础开发者，区分发现、抓取、索引、排序、转化、检索与训练。不发起真实搜索或模型请求，不承诺排名、收录或 AI 引用。Google Search 提交按用户要求暂停：TXT 验证记录已添加，但未点击所有权验证、未提交 Sitemap，也未申请收录。

## 开发与发布

使用 Node.js 22.12+（或 Vite 支持的更新版本）。

```sh
npm ci
npm run dev
npm run check
npm run preview
```

`npm run check` 包含 TypeScript、客户端/SSR 构建、八个静态页面生成，以及 H1、canonical、元数据、站内链接、CSP、Sitemap 和本地字体校验。

```sh
npx wrangler login
npm run deploy
```

Cloudflare Workers 静态托管，配置位于 `wrangler.jsonc`。当前使用直接部署，未配置 Git 自动发布；凭据不保存在仓库。Cloudflare 域名重定向规则将 `www.seogeo.dev` 以 301 跳转至 `seogeo.dev`，保留路径与查询参数。404 为真实错误响应。

## 文件入口

- `src/Home.tsx`：像素风首页。
- `src/demo/Demo.tsx`、`src/demo/original.css`：从原版源码恢复并隔离作用域的闯关演示，含手机适配。
- `src/PixelArt.tsx`、`src/SiteChrome.tsx`：共享角色、像素场景、导航与页脚。
- `src/Guide.tsx`、`src/content.ts`：实操教程、一手来源与清单。
- `src/Checklist.tsx`：本地勾选保存与 Markdown 导出。
- `src/pages.ts`：页面清单和元数据。
- `scripts/prerender.mjs`：生成正文 HTML、JSON-LD、CSP hashes 与 Sitemap。
- `scripts/check-build.mjs`：检查最终发布文件。

Press Start 2P 与 ZCOOL KuaiLe 来自 Google Fonts，按 OFL 授权本地托管；授权文件见 `public/fonts/`。仅本地保存清单，不加载外部字体、分析或 AI 脚本。
