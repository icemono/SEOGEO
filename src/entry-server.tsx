import {renderToString} from 'react-dom/server'
import App from './App'
import type {SitePage} from './pages'
export {pages} from './pages'
export function render(page:SitePage){return renderToString(<App page={page}/>)}
