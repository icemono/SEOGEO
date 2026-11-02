import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import type { Mode } from '../content'
import { PixelHero } from '../PixelArt'
import { SiteHeader, SiteFooter } from '../SiteChrome'
import './original.css'

type Level = { label: string; title: string; description: string; code: string }
type Journey = {
  name: string; subtitle: string; phase1: string; phase2: string; queryLabel: string
  defaultQuery: string; placeholder: string; resultTitle: (query: string) => string
  resultMeta: string; resultText: string; levels: Level[]
}

const journeys: Record<Mode, Journey> = {
  SEO: {
    name: '搜索引擎大冒险', subtitle: '网页先进入索引库，才有机会响应用户搜索。',
    phase1: '搜索前建库', phase2: '用户查询', queryLabel: '搜索关键词',
    defaultQuery: '如何学习 SEO', placeholder: '输入你想搜索的问题…',
    resultMeta: 'example.com › guides › seo · 模拟示例',
    resultTitle: (query) => `${query}｜新手完整指南`,
    resultText: '搜索引擎可能根据查询动态生成标题与摘要。',
    levels: [
      { label: '发布', title: '站长发布网页', description: '网页上线只是起点，还需允许搜索引擎访问，并提供清晰的链接入口。', code: 'publish("/seo-guide")' },
      { label: '发现', title: '爬虫发现 URL', description: '系统通过站内外链接或 Sitemap 发现 URL；发现并不等于已经收录。', code: 'discover(url) // links + sitemap' },
      { label: '抓取', title: '抓取并渲染页面', description: '爬虫下载 HTML；对依赖 JavaScript 的页面，还可能执行渲染。', code: 'fetch(url) → render(JavaScript)' },
      { label: '索引', title: '理解并建立索引', description: '系统分析内容与规范 URL，判断页面是否适合进入索引库。', code: 'parse → canonicalize → index?' },
      { label: '输入', title: '用户提交查询', description: '现在用户才输入问题，系统通常从已有索引查找相关内容。', code: 'query = userInput' },
      { label: '召回', title: '筛选候选页面', description: '系统从已有索引中快速找出一批与查询相关的候选页面。', code: 'retrieve(index, query)' },
      { label: '排序', title: '计算结果顺序', description: '相关性、质量、体验、时效性和查询场景等信号共同参与排序。', code: 'rank(candidates, context)' },
      { label: '展示', title: '生成搜索结果页', description: '系统展示排序结果，并可能根据查询动态生成标题与摘要。', code: 'render(SERP)' },
    ],
  },
  ASO: {
    name: '应用商店大冒险', subtitle: '产品与商店页先准备就绪，再参与搜索和推荐。',
    phase1: '上架与建档', phase2: '发现与转化', queryLabel: '商店搜索词',
    defaultQuery: '离线日记', placeholder: '输入 App 搜索词…',
    resultMeta: 'App Store · 生活 · 模拟示例',
    resultTitle: (query) => `与“${query}”相关的应用示例`,
    resultText: '排名与展示会因商店、地区、设备和用户而变化。',
    levels: [
      { label: '产品', title: '打磨 App 质量', description: '稳定性、性能、留存和真实用户价值是长期 ASO 的基础。', code: 'quality = value + stability' },
      { label: '素材', title: '准备商店元数据', description: '准确设置名称、副标题、描述、关键词、图标、截图与预览视频。', code: 'metadata = text + creatives' },
      { label: '审核', title: '提交商店审核', description: '平台检查政策、隐私和功能；通过审核不代表获得靠前排名。', code: 'submit(build) → review' },
      { label: '建档', title: '商店索引应用', description: '商店处理可索引字段并建立应用档案；不同平台的可索引字段与处理规则不同。', code: 'store.index(metadata)' },
      { label: '搜索', title: '用户发起搜索', description: '用户输入需求，所在地区、设备与商店环境共同形成查询上下文。', code: 'query = userInput' },
      { label: '匹配', title: '召回相关应用', description: '商店从应用库中找出元数据、类别等与查询相关的候选应用。', code: 'match(catalog, query)' },
      { label: '排序', title: '计算展示顺序', description: '文本相关性和用户行为等信号可能影响排序；各平台的具体机制并未完全公开。', code: 'rank(apps, market, device)' },
      { label: '转化', title: '用户选择下载', description: '用户可以从搜索结果直接下载，也可以先看详情；图标、截图、文案和评分会影响选择。', code: 'impression → productPage? → download' },
    ],
  },
  GEO: {
    name: '生成式搜索大冒险', subtitle: '以启用联网检索的 AI 搜索为例，理解答案与引用。',
    phase1: '内容与证据', phase2: '提问与生成', queryLabel: '用户提示词',
    defaultQuery: 'GEO 和 SEO 有什么区别', placeholder: '输入想问 AI 的问题…',
    resultMeta: 'AI GENERATED ANSWER · SOURCES',
    resultTitle: (query) => `回答：${query}`,
    resultText: '答案由模型综合生成；来源展示和引用并不保证发生。',
    levels: [
      { label: '研究', title: '研究真实用户问题', description: '识别用户意图、子问题与术语，先确保内容真正解决问题。', code: 'intent → questions → coverage' },
      { label: '创作', title: '提供清晰且原创的内容', description: '用明确结构、直接答案、示例与可验证细节降低理解成本。', code: 'answer + examples + structure' },
      { label: '证据', title: '强化实体与可信证据', description: '标明作者、日期、来源与实体关系；避免虚构数据和空泛结论。', code: 'claims → evidence → sources' },
      { label: '开放', title: '保持可访问与可发现', description: '确保页面可抓取、速度合理并被相关系统索引或实时检索；各引擎机制不同。', code: 'accessible + crawlable + indexable' },
      { label: '提问', title: '用户提交提示词', description: '用户问题、对话历史、地区和产品能力共同构成生成上下文。', code: 'prompt = userInput' },
      { label: '检索', title: '系统检索并选择来源', description: '本演示以启用联网检索为前提：系统可能查询搜索索引或知识库，筛选证据。', code: 'retrieve(query) → sources[]' },
      { label: '生成', title: '模型组织答案', description: '模型综合上下文和来源生成回答；结果具有概率性，可能出现错误。', code: 'generate(prompt, sources)' },
      { label: '引用', title: '展示答案与可能的引用', description: '系统可能展示来源链接，但 GEO 无法保证内容被选中、引用或如何表述。', code: 'answer + citations?' },
    ],
  },
}

const glossary: Record<Mode, Array<[string, string]>> = {
  SEO: [['可抓取','爬虫能够访问并读取页面。'],['Sitemap','列出重要 URL、帮助发现页面的文件。'],['渲染','执行资源与 JavaScript，得到可见内容。'],['规范 URL','重复内容中被搜索系统选为代表的 URL；站长可以建议。'],['查询','用户提交的问题或关键词。'],['召回','从索引中筛选候选结果的过程。'],['查询场景','地区、语言、设备与时效需求等上下文。'],['动态摘要','根据具体查询选取或生成的结果说明。']],
  ASO: [['留存','安装后仍持续使用产品的用户比例。'],['元数据','名称、描述、关键词、分类等商店信息。'],['审核','商店对功能、政策、安全与隐私的检查。'],['索引字段','商店用于理解和匹配应用的文本字段。'],['查询上下文','用户地区、语言、设备和商店版本。'],['候选应用','初步匹配、等待进一步排序的应用集合。'],['转化','从看到应用到完成下载等目标行为；不一定经过详情页。'],['本地化','针对不同语言和市场调整素材。']],
  GEO: [['用户意图','用户真正希望完成的任务或获得的信息。'],['原创信息','独立提供的数据、经验、研究或观点。'],['实体','可明确识别的人、组织、产品或概念。'],['可索引','内容有机会进入可检索的数据集合。'],['提示词','用户提交的指令、问题与上下文。'],['检索增强','生成答案前查找外部资料并交给模型。'],['概率性','相同问题可能产生不同且不一定正确的结果。'],['引用','答案中标明信息出处的链接或说明。']],
}

export default function Demo({initialMode='SEO'}:{initialMode?:Mode}) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [queryError,setQueryError]=useState('')
  const mapRef=useRef<HTMLDivElement>(null)
  const [resultExpanded, setResultExpanded] = useState(false)
  const [queries, setQueries] = useState<Record<Mode, string>>({
    SEO: journeys.SEO.defaultQuery, ASO: journeys.ASO.defaultQuery, GEO: journeys.GEO.defaultQuery,
  })
  const journey = journeys[mode]
  const query = queries[mode]

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (active === 7) setPlaying(false)
      else if (active === 3) { setActive(4); setPlaying(false) }
      else setActive((value) => value + 1)
    }, 2200)
    return () => window.clearTimeout(timer)
  }, [active, playing])

  useEffect(()=>{
    const map=mapRef.current
    if(!map||!window.matchMedia('(max-width:760px)').matches)return
    const block=map.querySelector<HTMLElement>('[aria-current="step"]')
    if(!block)return
    const target=block.getBoundingClientRect().left-map.getBoundingClientRect().left+map.scrollLeft-(map.clientWidth-block.clientWidth)/2
    map.scrollTo({left:Math.max(0,target),behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})
  },[active,mode])

  const selectMode = (nextMode: Mode) => { setQueryError('');setMode(nextMode); setActive(0); setPlaying(false); setResultExpanded(false) }
  const launch = (event?: FormEvent) => {
    event?.preventDefault()
    if (!query.trim()) {setQueryError('先输入一个问题，再开始模拟。');return}
    setQueryError('')
    setActive(5); setPlaying(true)
  }
  const restart = () => { setActive(0); setPlaying(false); setResultExpanded(false) }
  const handlePrimary = () => {
    if (active === 4) launch()
    else if (active === 7) restart()
    else setPlaying(!playing)
  }

  const goPrevious = () => {
    if (active === 0) return
    setPlaying(false); setResultExpanded(false); setActive((value) => value - 1)
  }
  const goNext = () => {
    setPlaying(false); setResultExpanded(false)
    if (active === 3) setActive(4)
    else if (active === 4) launch()
    else if (active < 7) setActive((value) => value + 1)
  }

  return (
    <>
    <SiteHeader demo/>
    <main id="game" className={`demo-page mode-${mode.toLowerCase()}`}>
      <header className="game-hud">
        <div className="logo">{mode}<span>QUEST</span></div>
        <div className="mode-tabs" role="tablist" aria-label="选择优化流程">
          {(['SEO', 'ASO', 'GEO'] as Mode[]).map((item) => (
            <button role="tab" aria-selected={mode === item} onKeyDown={(event:KeyboardEvent<HTMLButtonElement>)=>{const modes:Mode[]=['SEO','ASO','GEO'];const index=modes.indexOf(item);if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:2))%3;selectMode(modes[next]);event.currentTarget.parentElement?.querySelectorAll('button')[next]?.focus()}}} className={mode === item ? 'selected' : ''} onClick={() => selectMode(item)} key={item}>{item}</button>
          ))}
        </div>
        <div className="score">STEP {String(active + 1).padStart(2, '0')} / 08<small>交互演示 · 不发起真实搜索</small></div>
        <div className="world">PHASE<br /><b>{active < 4 ? 'BUILD' : 'QUERY'}</b></div>
      </header>

      <section className="game-shell">
        <div className="sky">
          <div className="cloud cloud-one"><i /><i /><i /></div><div className="cloud cloud-two"><i /><i /><i /></div>
          <div className="hill hill-one" /><div className="hill hill-two" />
          <div className="intro">
            <span>{active < 4 ? `PHASE 1 · ${journey.phase1}` : `PHASE 2 · ${journey.phase2}`}</span>
            <h1>{journey.name}</h1><p>{journey.subtitle}</p>
          </div>

          {active === 4 ? (
            <form className="search-box is-ready" onSubmit={launch}>
              <label htmlFor="player-query">{journey.queryLabel} · PLAYER INPUT</label>
              <div>
                <input id="player-query" value={query} onChange={(event) => setQueries({ ...queries, [mode]: event.target.value })} placeholder={journey.placeholder} aria-invalid={!!queryError} aria-describedby={queryError?'query-error':undefined} maxLength={100} />
                <button type="submit">GO!</button>
              </div>
            {queryError&&<p id="query-error" className="query-error" role="alert">{queryError}</p>}
            </form>
          ) : (
            <div className="phase-board"><small>{active < 4 ? 'OFFLINE PIPELINE' : 'ONLINE PIPELINE'}</small><b>{active < 4 ? journey.phase1 : `正在处理：“${query}”`}</b></div>
          )}

          <div className="stage-map" ref={mapRef}><div className="map-inner"><div className="level-path">
            <div className="phase-label build">阶段一 · {journey.phase1}</div>
            <div className="phase-label query">阶段二 · {journey.phase2}</div>
            {journey.levels.map((level, index) => (
              <button key={`${mode}-${level.label}`} aria-label={`第 ${index+1} 关：${level.label}`} aria-current={index===active?'step':undefined} className={`level-block ${index === active ? 'active' : ''} ${index < active ? 'passed' : ''}`} onClick={() => { setActive(index); setPlaying(false); setResultExpanded(false) }}>
                <span>{index + 1}</span><b>{level.label}</b>
              </button>
            ))}
          </div>
          <div className="coin coin-one">{mode[0]}</div><div className="coin coin-two">{mode[1]}</div><div className="coin coin-three">{mode[2]}</div>
          <div className="player-track"><div className={`hero-position position-${active}`}><PixelHero mode={mode} /></div></div>

          </div></div>
          <aside className="info-card" key={`${mode}-${active}`}>
            <span>{mode} · LEVEL {active + 1}</span>
            <h2>{journey.levels[active].title}</h2><p>{journey.levels[active].description}</p>
            <div className="code">{active === 4 ? `query = "${query}"` : journey.levels[active].code}</div>
            <button className="term" type="button">? {glossary[mode][active][0]}<span role="tooltip">{glossary[mode][active][1]}</span></button>
          </aside>

          {active === 7 && (
            <div className={`result-card ${resultExpanded ? 'expanded' : ''}`}>
              <small>{journey.resultMeta}</small><strong>{journey.resultTitle(query)}</strong><p>{journey.resultText}</p>
              {resultExpanded && <div className="result-detail">{mode === 'SEO' ? '模拟示例已展开：实际标题、摘要与顺序可能随查询变化。' : mode === 'ASO' ? '商店详情示例：截图、评分、本地化与产品体验共同影响安装。' : '这里没有生成真实引用。请在下方实操指南中查看可核对的官方资料。'}</div>}
              <button className="result-action" onClick={() => setResultExpanded(!resultExpanded)}>{resultExpanded ? '收起' : mode === 'SEO' ? '查看搜索结果' : mode === 'ASO' ? '查看商店详情' : '展开引用来源'}</button>
            </div>
          )}
          <div className="pipe"><i /><span /></div><div className="ground" />
        </div>

        <footer className="game-footer">
          <div className="lesson"><i>!</i><span><b>本关知识</b>{journey.levels[active].description}</span></div>
          <div className="game-controls">
            <button onClick={restart}>↻ 重置</button>
            <button onClick={goPrevious} disabled={active === 0}>← 上一步</button>
            <button onClick={goNext} disabled={active === 7}>下一步 →</button>
            <button className="primary" onClick={handlePrimary}>{active === 4 ? '▶ 提交输入' : active === 7 ? '↻ 再玩一次' : playing ? 'Ⅱ 暂停' : '▶ 继续'}</button>
          </div>
        </footer>
      </section>
    </main>
    <div className="demo-after page-width"><p>八关是简化教学路径；抓取、收录和引用都不保证发生。</p><a href={`/learn/${mode.toLowerCase()}/`}>阅读 {mode} 实操指南与上线清单 →</a></div>
    <SiteFooter/>
    </>
  )
}
