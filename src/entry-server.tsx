import {renderToString} from 'react-dom/server'
import App from './App'
import type {Mode} from './content'
export function render(mode:Mode='SEO'){return renderToString(<App initialMode={mode}/>)}
