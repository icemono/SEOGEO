import {readFile,writeFile,mkdir,rm} from 'node:fs/promises'
import {render} from '../dist-server/entry-server.js'
const template=await readFile('dist/index.html','utf8')
for(const [path,mode,title] of [['','SEO','SEOGEO.dev — 开发者的 SEO、ASO 与 GEO 入门指南'],['learn/seo','SEO','SEO 入门：从发布到搜索结果 | SEOGEO.dev'],['learn/aso','ASO','ASO 入门：从应用上架到安装转化 | SEOGEO.dev'],['learn/geo','GEO','GEO 入门：从内容证据到 AI 引用 | SEOGEO.dev']]){
 const url=`https://seogeo.dev/${path?path+'/':''}`
 const html=template.replace('<div id="root"></div>',`<div id="root">${render(mode)}</div>`).replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/(<meta property="og:title" content=")[^"]+/,`$1${title}`).replace(/(<link rel="canonical" href=")[^"]+/,`$1${url}`).replace(/(<meta property="og:url" content=")[^"]+/,`$1${url}`)
 await mkdir(`dist/${path}`,{recursive:true});await writeFile(`dist/${path?path+'/':''}index.html`,html)
}
await rm('dist-server',{recursive:true,force:true})
console.log('Prerendered homepage and 3 learning routes with full HTML.')
