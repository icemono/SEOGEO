import Home from './Home'
import Guide from './Guide'
import Demo from './demo/Demo'
import type {SitePage} from './pages'
export default function App({page}:{page:SitePage}){return <><a className="skip-link" href={page.kind==='demo'?'#game':'#main'}>跳到主要内容</a>{page.kind==='demo'?<Demo initialMode={page.mode}/>:page.kind==='guide'?<Guide topic={page.mode!}/>:<Home/>}</>}
