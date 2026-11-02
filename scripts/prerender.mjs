import {readFile,writeFile,mkdir,rm} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {render,pages} from '../dist-server/entry-server.js'
const template=await readFile('dist/index.html','utf8')
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const hashes=new Set()
for(const page of pages){
 const {path,mode,title,description}=page
 const url=`https://seogeo.dev/${path?path+'/':''}`
 const schema={'@context':'https://schema.org','@type':page.kind==='home'?'WebSite':'LearningResource',name:page.kind==='home'?'SEOGEO.dev':page.kind==='demo'?({SEO:'搜索引擎大冒险',ASO:'应用商店大冒险',GEO:'生成式搜索大冒险'})[mode]:`${mode} 入门指南`,url,inLanguage:'zh-CN',description,...(mode?{learningResourceType:page.kind==='demo'?'交互演示':'入门指南',educationalLevel:'Beginner',isAccessibleForFree:true,isPartOf:{'@type':'WebSite',name:'SEOGEO.dev',url:'https://seogeo.dev/'}}:{})}
 const json=JSON.stringify(schema).replaceAll('<','\\u003c')
 hashes.add(`'sha256-${createHash('sha256').update(json).digest('base64')}'`)
 const html=template.replace('<div id="root"></div>',`<div id="root">${render(page)}</div>`)
  .replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`)
  .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]+/g,`$1${escape(title)}`)
  .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]+/g,`$1${escape(description)}`)
  .replace(/(<link rel="canonical" href=")[^"]+/,`$1${url}`)
  .replace(/(<meta property="og:url" content=")[^"]+/,`$1${url}`)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<script type="application/ld+json">${json}</script>`)
 await mkdir(`dist/${path}`,{recursive:true});await writeFile(`dist/${path?path+'/':''}index.html`,html)
}
const headers=await readFile('public/_headers','utf8')
await writeFile('dist/_headers',headers.replace('script-src \'self\';',`script-src 'self' ${[...hashes].join(' ')};`))
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>https://seogeo.dev/${p.path?p.path+'/':''}</loc></url>`).join('\n')}\n</urlset>\n`)
await rm('dist-server',{recursive:true,force:true})
console.log(`Prerendered ${pages.length} pages with route metadata, structured data and CSP hashes.`)
