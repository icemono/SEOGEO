# Ahrefs Web Analytics — 2026-11-17

用户授权为 seogeo.dev 安装 Ahrefs Web Analytics。项目：Seogeo，10718230。

## 安装

在 `index.html` 的 `<head>` 中直接安装官方异步片段，构建后覆盖全部七个规范页面。公开 data-key：`eWBuH3vI2CZUOwDPgt91vw`。这不是账号密钥。

- 脚本：`https://analytics.ahrefs.com/analytics.js`
- 默认事件接口：`https://analytics.ahrefs.com/api/event`
- 默认脚本错误接口：`https://analytics.ahrefs.com/api/error`

`public/_headers` 为 script-src/connect-src 增加该单一来源；`scripts/prerender.mjs` 继续注入 JSON-LD hashes，不开放 unsafe-inline。没有安装第二份跟踪代码或自定义采集演示输入、清单内容的事件。

首页 FAQ 和 README 已更新实际统计说明。官方脚本默认记录访问及链接/表单等交互；检查脚本可见 localhost/127.0.0.1 事件被忽略，表单字段内容没有作为默认事件载荷读取。

## 验证

- `npm run check`：TypeScript、SSR/客户端构建、SEO 输出检查通过；每份预渲染 HTML 的 head 中恰好一份正确项目的 async 片段，CSP 保留 JSON-LD hashes 并允许 Ahrefs 来源。
- 生产七个规范页面均返回 200，包含正确项目片段，响应 CSP 允许脚本和上报连接。
- Chrome 读取生产页面 DOM，确认片段异步加载、data-key 正确；检查时未看到相关控制台错误或警告。
- Ahrefs 项目设置中执行“验证安装”后，页面明确显示“脚本已安装”。当时数据采集状态为“尚未采集到数据”，因此不能把安装通过称为已有真实访问数据。
- 本地截图：`output/playwright/ahrefs-installation-2026-11-17.jpg`（不跟踪进 Git）。

Cloudflare Worker 部署版本：`203cfe71-a6fe-4394-8877-a01b2d777e03`。

官方依据：[安装排查](https://help.ahrefs.com/en/articles/10631520-troubleshooting-ahrefs-web-analytics-snippet-isn-t-found-on-your-website)、[统计与数据说明](https://help.ahrefs.com/en/articles/10247870-about-ahrefs-web-analytics)。
