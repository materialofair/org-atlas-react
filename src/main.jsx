import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import { BookOpen, ChevronDown, Monitor, Moon, Sun } from 'lucide-react'
import { BackendIcon, OrgExplorer } from 'org-atlas-react'
import 'org-atlas-react/style.css'
import { demoDepartments } from './departments'
import { IconCatalog } from './IconCatalog'
import packageImage from './assets/wire-bond-package.webp'
import './style.css'

const pageUrl = new URL(window.location.href)
const catalogOpen = pageUrl.searchParams.get('view') === 'icons'
function catalogLink(open) {
  const url = new URL(window.location.href)
  if (open) url.searchParams.set('view', 'icons')
  else url.searchParams.delete('view')
  return url.href
}
function departmentArt(node) {
  return <div className="fab-art" aria-hidden="true">
    {node.icon === 'package'
      ? <img src={packageImage} alt="" />
      : <BackendIcon className="fab-hero-icon" name={node.icon} size={96} />}
  </div>
}

const { root, byId, rootLevel, title } = demoDepartments(pageUrl.searchParams.get('levels'))
const themeKey = 'org-atlas-demo.theme'
const themes = {
  system: { label: '跟随系统', Icon: Monitor },
  light: { label: '浅色', Icon: Sun },
  dark: { label: '深色', Icon: Moon },
}

function readTheme() {
  try {
    const saved = localStorage.getItem(themeKey)
    return Object.hasOwn(themes, saved) ? saved : 'system'
  } catch {
    return 'system'
  }
}

function ThemeSelect({ value, onChange }) {
  const { Icon } = themes[value]
  return (
    <label className="demo-theme-picker" title="显示主题">
      <Icon size={15} aria-hidden="true" />
      <select aria-label="显示主题" value={value} onChange={event => onChange(event.target.value)}>
        {Object.entries(themes).map(([id, { label }]) => (
          <option key={id} value={id}>{label}</option>
        ))}
      </select>
      <ChevronDown size={12} aria-hidden="true" />
    </label>
  )
}

function departmentHref(node) {
  return '#/' + encodeURIComponent(node.id)
}

function readDepartmentId() {
  try {
    const id = decodeURIComponent(window.location.hash.slice(2))
    return byId.has(id) ? id : root.id
  } catch {
    return root.id
  }
}

function subscribeToNavigation(notify) {
  function onChange() {
    notify()
    window.scrollTo(0, 0)
  }
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function App() {
  const id = useSyncExternalStore(subscribeToNavigation, readDepartmentId)
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.title = catalogOpen ? '后道团队图标库' : byId.get(id).name + ' · ' + title
  }, [id])

  function selectTheme(next) {
    setTheme(next)
    try {
      localStorage.setItem(themeKey, next)
    } catch {
      // A browser with storage disabled still applies the theme for this visit.
    }
  }

  const themeControl = <ThemeSelect value={theme} onChange={selectTheme} />
  if (catalogOpen) return <IconCatalog returnUrl={catalogLink(false)} theme={theme} themeControl={themeControl} />
  return (
    <div className="demo-page" data-demo-theme={theme}>
      <OrgExplorer
        root={root}
        rootLevel={rootLevel}
        title={title}
        selectedId={id}
        onNavigate={node => { window.location.hash = departmentHref(node) }}
        getHref={departmentHref}
        theme={theme}
        renderArtwork={departmentArt}
        toolbar={<><a className="fab-link" href={catalogLink(true)} aria-label="后道团队图标库" title="后道团队图标库">
          <BookOpen size={16} /><span>图标库</span>
        </a>{themeControl}</>}
      />
      <footer className="fab-footer"><span>示例组织 · 部门与负责人均为虚构</span>
        <a href={rootLevel === 2 ? '?levels=7' : '?'}>{rootLevel === 2 ? '查看事业群全貌' : '进入封装制造部门户'}</a>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
