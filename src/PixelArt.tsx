import type {Mode} from './content'
export function PixelHero({mode='SEO'}:{mode?:Mode}){return <div className={`pixel-hero hero-${mode.toLowerCase()}`} aria-hidden="true"><i className="antenna"/><i className="head"><b/><b/></i><i className="body">{mode[0]}</i><i className="foot left"/><i className="foot right"/></div>}
export function PixelWorld({mode='SEO',mini=false}:{mode?:Mode;mini?:boolean}){
 return <div className={`pixel-world world-${mode.toLowerCase()} ${mini?'mini-world':''}`} aria-hidden="true"><div className="cloud cloud-one"><i/><i/><i/></div><div className="cloud cloud-two"><i/><i/><i/></div><div className="hill hill-one"/><div className="hill hill-two"/><div className="world-coins"><span/><span/><span/></div><div className="world-bricks"><i>S</i><i>A</i><i>G</i></div><div className="world-robot"><PixelHero mode={mode}/></div><div className="pipe"><i/><span/></div><div className="ground"/></div>
}
