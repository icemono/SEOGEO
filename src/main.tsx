import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import {pages} from './pages'
import './index.css'
const root=document.getElementById('root')!
const path=location.pathname.replace(/^\/+|\/+$/g,'')
const page=pages.find(p=>p.path===path)||pages[0]
const app=<StrictMode><App page={page}/></StrictMode>
if(root.hasChildNodes())hydrateRoot(root,app)
else createRoot(root).render(app)
