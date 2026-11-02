import {readFile,writeFile,mkdir,rm} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {render,pages} from '../dist-server/entry-server.js'
const base='https://seogeo.dev/'
const template=await readFile('dist/index.html','utf8')
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const hashes=new Set()
const website={'@type':'WebSite','@id':`${base}#website`,name:'SEOGEO.dev',alternateName:'SEOGEO',url:base,inLanguage:'zh-CN'}
for(const page of pages){
 const {path,mode,title,description}=page
 const canonicalPath=page.canonicalPath??path
 const url=`${base}${canonicalPath?canonicalPath+'/':''}`
 const name=page.kind==='home'?'SEOGEO.dev':page.kind==='demo'?({SEO:'搜索引擎大冒险',ASO:'应用商店大冒险',GEO:'生成式搜索大冒险'})[mode]:`${mode} 入门指南`
 const resource={'@type':page.kind==='home'?'WebPage':['WebPage','LearningResource'],'@id':`${url}#webpage`,name,url,inLanguage:'zh-CN',description,isPartOf:{'@id':website['@id']},primaryImageOfPage:{'@type':'ImageObject',url:`${base}social-card.jpg`,width:1200,height:640},...(mode?{learningResourceType:page.kind==='demo'?'交互演示':'入门指南',educationalLevel:'Beginner',isAccessibleForFree:true}:{})}
 const graph=[website,resource]
 if(page.kind!=='home'){
  const breadcrumb={'@type':'BreadcrumbList','@id':`${url}#breadcrumb`,itemListElement:[{'@type':'ListItem',position:1,name:'首页',item:base},{'@type':'ListItem',position:2,name,item:url}]}
  resource.breadcrumb={'@id':breadcrumb['@id']}
  graph.push(breadcrumb)
 }
 const json=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')
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
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p=>p.sitemap!==false).map(p=>`  <url><loc>${base}${p.path?p.path+'/':''}</loc></url>`).join('\n')}\n</urlset>\n`)
await rm('dist-server',{recursive:true,force:true})
console.log(`Prerendered ${pages.length} pages; sitemap contains ${pages.filter(p=>p.sitemap!==false).length} canonical URLs.`)
