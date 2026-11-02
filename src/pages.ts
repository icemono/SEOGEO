import type {Mode} from './content'
export type SitePage={path:string;kind:'home'|'demo'|'guide';mode?:Mode;title:string;description:string;canonicalPath?:string;sitemap?:boolean}
export const pages:SitePage[]=[
 {path:'',kind:'home',title:'SEO、ASO、GEO 入门教程与交互演示 | SEOGEO.dev',description:'面向开发者的 SEO（搜索引擎优化）、ASO（应用商店优化）与 GEO（生成式引擎优化）零基础教程。通过像素闯关演示、代码示例和上线清单，理解作品如何被发现。'},
 {path:'demo',kind:'demo',mode:'SEO',title:'SEO、ASO、GEO 交互演示：搜索与发现大冒险 | SEOGEO.dev',description:'在像素闯关演示中切换 SEO、ASO、GEO，点击八个步骤，输入一个问题，观察发现、检索与展示的简化过程。无需注册，不发起真实搜索。'},
 ...(['SEO','ASO','GEO'] as Mode[]).map(mode=>({path:`demo/${mode.toLowerCase()}`,kind:'demo' as const,mode,...(mode==='SEO'?{canonicalPath:'demo',sitemap:false}:{}),title:`${mode} 像素闯关演示 | SEOGEO.dev`,description:`通过八关像素演示，从零理解 ${mode} 的发现机制。点击关卡、查看解释、自定义问题，理解机制与边界。此页面为本地教学模拟。`})),
 {path:'learn/seo',kind:'guide',mode:'SEO',title:'SEO 入门：从发布到搜索结果 | SEOGEO.dev',description:'给开发者的 SEO 零基础教程：用 8 个步骤理解网页发布、发现、抓取、索引、查询、召回、排序与展示，配合 HTML 示例和网站上线检查清单。'},
 {path:'learn/aso',kind:'guide',mode:'ASO',title:'ASO 入门：从应用上架到安装转化 | SEOGEO.dev',description:'给应用开发者的 ASO 入门教程：从产品定位、商店元数据和审核，到搜索匹配、安装转化与效果验证。区分 Apple 和 Google Play 的平台规则。'},
 {path:'learn/geo',kind:'guide',mode:'GEO',title:'GEO 入门：从内容证据到 AI 引用 | SEOGEO.dev',description:'给开发者的 GEO 入门教程：理解内容、可信证据、联网检索、生成答案与引用之间的关系。区分搜索与训练，学习观察效果，不承诺被 AI 引用。'},
]
