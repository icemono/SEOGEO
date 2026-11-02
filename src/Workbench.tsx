import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
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
