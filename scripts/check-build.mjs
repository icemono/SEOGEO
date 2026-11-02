import assert from 'node:assert/strict'
import {readFile,access} from 'node:fs/promises'
import {createHash} from 'node:crypto'
const routes=['','demo/','demo/seo/','demo/aso/','demo/geo/','learn/seo/','learn/aso/','learn/geo/']
const sitemap=await readFile('dist/sitemap.xml','utf8')
const headers=await readFile('dist/_headers','utf8')
const descriptions=new Set()
for(const route of routes){
 const html=await readFile(`dist/${route}index.html`,'utf8')
 const head=html.match(/<head>([\s\S]*?)<\/head>/)?.[1]
 const body=html.match(/<body>([\s\S]*?)<\/body>/)?.[1]
 const canonicalRoute=route==='demo/seo/'?'demo/':route
 const expected=`https://seogeo.dev/${canonicalRoute}`
 assert.ok(head&&body,`${route}: complete HTML document`)
 assert.equal((body.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1,`${route}: one H1`)
 assert.equal((head.match(/rel="canonical"/g)||[]).length,1,`${route}: one canonical`)
 assert.ok(head.includes(`rel="canonical" href="${expected}"`),`${route}: canonical`)
 assert.ok(head.includes(`property="og:url" content="${expected}"`),`${route}: social URL`)
 assert.ok(!/<meta[^>]+name="(?:robots|googlebot)"[^>]+content="[^"]*noindex/i.test(head),`${route}: indexable meta`)
 const description=head.match(/<meta name="description" content="([^"]+)"/)?.[1]
 assert.ok(description,`${route}: description`);descriptions.add(description)
 if(route.startsWith('learn/'))assert.equal((body.match(/class="guide-lesson"/g)||[]).length,8,`${route}: all eight guide steps`)
 if(route.startsWith('demo/'))assert.equal((body.match(/class="level-block/g)||[]).length,8,`${route}: all eight game stages`)
 if(!route)assert.ok(body.includes('href="/demo/"'), 'Homepage leads to a dedicated demo')
 assert.ok(sitemap.includes(`<loc>${expected}</loc>`),`${route}: canonical sitemap entry`)
 if(route==='demo/seo/')assert.ok(!sitemap.includes('<loc>https://seogeo.dev/demo/seo/</loc>'),'Duplicate SEO demo excluded from sitemap')
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){
  const path=match[1];await access(`dist${path.endsWith('/')?path+'index.html':path}`)
 }
 const json=head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
 assert.ok(json,`${route}: structured data`)
 const graph=JSON.parse(json)['@graph']
 assert.ok(Array.isArray(graph),`${route}: schema graph`)
 assert.ok(graph.some(n=>n['@type']==='WebSite'&&n.url==='https://seogeo.dev/'&&n.name==='SEOGEO.dev'),`${route}: site identity`)
 const resource=graph.find(n=>n['@id']===`${expected}#webpage`)
 assert.equal(resource?.url,expected,`${route}: schema URL`)
 if(route)assert.ok(graph.some(n=>n['@type']==='BreadcrumbList'&&n.itemListElement.at(-1).item===expected),`${route}: breadcrumb`)
 const hash=createHash('sha256').update(json).digest('base64')
 assert.ok(headers.includes(`'sha256-${hash}'`),`${route}: current CSP hash`)
 console.log(`Verified ${expected}`)
}
assert.equal(descriptions.size,routes.length,'Each page has a distinct description')
const redirects=await readFile('dist/_redirects','utf8')
assert.ok(redirects.includes('/demo/seo/ /demo/ 301'),'Duplicate URL has permanent redirect')
const robots=await readFile('dist/robots.txt','utf8')
assert.ok(robots.includes('Sitemap: https://seogeo.dev/sitemap.xml'))
assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots),'Site is not globally blocked')
const image=await readFile('dist/social-card.jpg')
assert.equal(image.subarray(0,3).toString('hex'),'ffd8ff','Share image is a real JPEG')
for(const font of ['press-start-2p','zcool-kuaile']){
 const data=await readFile(`dist/fonts/${font}.woff2`)
 assert.equal(data.subarray(0,4).toString(),'wOF2',`${font}: real local WOFF2 font`)
}
assert.ok((await readFile('dist/404.html','utf8')).includes('noindex'))
console.log('Build checks passed: routes, semantic HTML, links, metadata, CSP, fonts and production assets.')
