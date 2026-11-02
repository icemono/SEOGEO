import type {Mode} from './content'
export type SitePage={path:string;kind:'home'|'demo'|'guide';mode?:Mode;title:string;description:string}
export const pages:SitePage[]=[
 {path:'',kind:'home',title:'SEOGEO.dev — 用像素冒险学懂 SEO、ASO 与 GEO',description:'给开发者的零基础发现指南。保留像素闯关的乐趣，用独立演示理解搜索、应用商店与 AI 答案的原理，再带着实操清单改进自己的项目。'},
 {path:'demo',kind:'demo',mode:'SEO',title:'搜索与发现大冒险 · 交互演示 | SEOGEO.dev',description:'在像素闯关演示中切换 SEO、ASO、GEO，点击八个步骤，输入一个问题，观察发现、检索与展示的简化过程。无需注册，不发起真实搜索。'},
 ...(['SEO','ASO','GEO'] as Mode[]).map(mode=>({path:`demo/${mode.toLowerCase()}`,kind:'demo' as const,mode,title:`${mode} 像素闯关演示 | SEOGEO.dev`,description:`从零体验 ${mode} 的八步发现流程。点击关卡、查看解释、自定义问题，理解机制与边界。此页面为本地教学模拟。`})),
 {path:'learn/seo',kind:'guide',mode:'SEO',title:'SEO 入门：从发布到搜索结果 | SEOGEO.dev',description:'给开发者的 SEO 零基础教程：用 8 个步骤理解网页发布、发现、抓取、索引、查询、召回、排序与展示，配合 HTML 示例和网站上线检查清单。'},
 {path:'learn/aso',kind:'guide',mode:'ASO',title:'ASO 入门：从应用上架到安装转化 | SEOGEO.dev',description:'给应用开发者的 ASO 入门教程：从产品定位、商店元数据和审核，到搜索匹配、安装转化与效果验证。区分 Apple 和 Google Play 的平台规则。'},
 {path:'learn/geo',kind:'guide',mode:'GEO',title:'GEO 入门：从内容证据到 AI 引用 | SEOGEO.dev',description:'给开发者的 GEO 入门教程：理解内容、可信证据、联网检索、生成答案与引用之间的关系。区分搜索与训练，学习观察效果，不承诺被 AI 引用。'},
]
