import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import type { Mode } from './content'
import './index.css'
const root=document.getElementById('root')!
const route=location.pathname.match(/^\/learn\/(seo|aso|geo)\/?$/)?.[1]
const mode=(route?.toUpperCase()||'SEO') as Mode
const app=<StrictMode><App initialMode={mode}/></StrictMode>
if(root.hasChildNodes())hydrateRoot(root,app)
else createRoot(root).render(app)
