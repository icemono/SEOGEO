import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { courses, modes, type Mode } from './content'
import { Icon } from './icons'

export const modeIcons = {SEO:'search',ASO:'grid',GEO:'sparkle'}
export function ModeTabs({mode,onChange,label}:{mode:Mode;onChange:(m:Mode)=>void;label:string}) {
 const refs=useRef<(HTMLButtonElement|null)[]>([])
 function keydown(event:KeyboardEvent<HTMLButtonElement>,index:number) {
  let next=index
  if(event.key==='ArrowRight') next=(index+1)%3
  else if(event.key==='ArrowLeft') next=(index+2)%3
  else if(event.key==='Home') next=0
  else if(event.key==='End') next=2
  else return
  event.preventDefault();onChange(modes[next]);refs.current[next]?.focus()
 }
 return <div className="mode-tabs" role="tablist" aria-label={label}>{modes.map((m,i)=><button key={m} ref={el=>{refs.current[i]=el}} role="tab" aria-selected={mode===m} tabIndex={mode===m?0:-1} onClick={()=>onChange(m)} onKeyDown={e=>keydown(e,i)}><Icon name={modeIcons[m]}/><span>{m} <span className="tab-name">{courses[m].name}</span></span></button>)}</div>
}
export function Workbench({mode,setMode}:{mode:Mode;setMode:(mode:Mode)=>void}) {
 const [active,setActive]=useState(0)
 const [playing,setPlaying]=useState(false)
 const [query,setQuery]=useState('')
 const [submitted,setSubmitted]=useState('')
 const [copied,setCopied]=useState(false)
 const lessonRef=useRef<HTMLElement>(null)
 const course=courses[mode], step=course.lessons[active]
 useEffect(()=>{try {const saved=JSON.parse(localStorage.getItem('seogeo-learning-v1')||'null');if(saved?.mode===mode&&Number.isInteger(saved.active)&&saved.active>=0&&saved.active<8)setActive(saved.active)}catch{}},[])
 useEffect(()=>{try{localStorage.setItem('seogeo-learning-v1',JSON.stringify({mode,active}))}catch{}},[mode,active])
 useEffect(()=>{
  if(!playing)return
  const timer=setTimeout(()=>{if(active===3||active===7){setPlaying(false);return}setActive(a=>a+1)},2800)
  return ()=>clearTimeout(timer)
 },[playing,active])
 useEffect(()=>{setCopied(false)},[mode,active])
 function selectMode(m:Mode){setMode(m);setActive(0);setPlaying(false);setQuery('');setSubmitted('')}
 function selectStep(i:number,focus=false){setActive(i);setPlaying(false);if(focus)requestAnimationFrame(()=>lessonRef.current?.focus({preventScroll:true}))}
 function submit(e:FormEvent){e.preventDefault();const value=query.trim()||course.query;setSubmitted(value);setActive(5);setPlaying(false)}
 async function copy(){try{await navigator.clipboard.writeText(step.code);setCopied(true)}catch{setCopied(false)}}
 return <><div className="workbench">
  <ModeTabs mode={mode} onChange={selectMode} label="选择学习主题"/>
  <div className="workbench-body">
   <nav className="step-rail" aria-label={`${mode} 学习步骤`}>{course.lessons.map((l,i)=><div key={l.label}>{(i===0||i===4)&&<p className="phase-label">{i===0?'01':'02'} / {course.phases[i===0?0:1]}</p>}<button aria-current={i===active?'step':undefined} onClick={()=>selectStep(i,true)}><span className="step-number">{String(i+1).padStart(2,'0')}</span><span>{l.label}</span><Icon size={16}/></button></div>)}</nav>
   <article className="lesson-panel" aria-label="当前课程" tabIndex={-1} ref={lessonRef}>
    <div className="lesson-topline"><span>{mode} / STEP {String(active+1).padStart(2,'0')}</span><button className="text-button" onClick={()=>setPlaying(p=>!p)} aria-pressed={playing}>{playing?'暂停演示':'自动演示'}</button></div>
    <h3><span>{String(active+1).padStart(2,'0')}</span> {step.title}</h3>
    <p className="lesson-text">{step.text}</p>
    <div className="code-block"><div className="code-header"><span>{mode==='SEO'?'网页与搜索':mode==='ASO'?'应用与商店':'内容与 AI'} · 示例</span><button onClick={copy} aria-label="复制当前示例代码"><Icon name={copied?'check':'copy'} size={15}/>{copied?'已复制':'复制代码'}</button></div><pre><code>{step.code}</code></pre></div>
    {active===4&&<form className="query-form" onSubmit={submit}><label htmlFor="query-input">试一试，换成你的问题</label><div><input id="query-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder={course.query} maxLength={120}/><button className="button primary" type="submit">查看模拟过程 <Icon size={16}/></button></div></form>}
    {active>=5&&<div className="simulation"><span className="mono">{mode==='GEO'?'AI ANSWER':mode==='ASO'?'APP DISCOVERY':'SEARCH RESULTS'} / 本地模拟</span><strong>{submitted||course.query}</strong>{active===5?<p>正在从已有内容中选取相关候选项。</p>:active===6?<p>根据相关性与场景组织结果；这里不计算真实排名。</p>:<><p>{mode==='GEO'?'先做好网站访问与内容基础，再用固定问题集观察 AI 引用。示例答案仅用于说明流程。':mode==='ASO'?'静页日记 · 离线记录生活与灵感。示例展示不代表真实商店结果。':'开发者博客 SEO 入门 | Dev Notes。先检查页面访问、HTML 正文和索引状态。'}</p><a href="#references">核对相关官方资料 <Icon name="external" size={14}/></a></>}</div>}
    <div className="action-note"><h4>开发者现在可以做什么</h4><p><Icon name="check" size={18}/>{step.action}</p></div>
    <details className="term"><summary>术语解释：{step.term[0]}</summary><p>{step.term[1]}</p></details>
    <p className="caveat"><span aria-hidden="true">i</span>{step.caveat}</p>
    <div className="lesson-controls"><button className="button secondary" disabled={active===0} onClick={()=>selectStep(active-1,true)}><span className="back-icon"><Icon size={16}/></span>上一步</button><span className="lesson-count">{active+1} / 8</span><button className="button primary" onClick={()=>selectStep(active===7?0:active+1,true)}>{active===7?'再学一次':`下一步 · ${course.lessons[active+1].label}`}<Icon size={17}/></button></div>
   </article>
  </div>
  <div className="workbench-note"><span aria-hidden="true">ⓘ</span> 这是简化的原理演示，不会发起真实搜索，也不预测排名或引用。</div>
 </div><details className="reading-version"><summary>阅读 {mode} 完整文字版 · 适合逐条查阅</summary><div>{course.lessons.map((l,i)=><article key={l.label}><h3>{String(i+1).padStart(2,'0')} / {l.title}</h3><p>{l.text}</p><p><strong>现在可以做：</strong>{l.action}</p><p className="reading-caveat">{l.caveat}</p></article>)}</div></details></>
}
