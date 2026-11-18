import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import { BookOpen, ChevronDown, Monitor, Moon, Sun } from 'lucide-react'
import { BackendIcon, BackendOverview, getDepartmentIcon, OrgExplorer } from 'org-atlas-react'
import 'org-atlas-react/style.css'
import { backend, demoDepartments, facilitySections, jobMap, siteArticle } from './departments'
import { IconCatalog } from './IconCatalog'
import { accents } from './accents'
import packageImage from './assets/wire-bond-package.webp'
import './style.css'

const pageUrl = new URL(window.location.href)
const catalogOpen = pageUrl.searchParams.get('view') === 'icons'
function catalogLink(open) {
  const url = new URL(window.location.href)
  if (open) {
    url.searchParams.set('view', 'icons')
    if (root.evidence || root === backend || root.id === 'micron-tw') url.searchParams.set('collection', 'micron')
  }
  else { url.searchParams.delete('view'); url.searchParams.delete('collection') }
  return url.href
}
function departmentArt(node) {
  if (node.icon === 'backend-overview') {
    return <div className="fab-overview-art">
      <BackendOverview className="fab-overview-wide" color="var(--oe-primary)" label="封装测试，质量、成本、人才、安全、产出" />
    </div>
  }
  return <div className="fab-art" aria-hidden="true">
    {node.icon === 'package'
      ? <img src={packageImage} alt="" />
      : <BackendIcon className="fab-hero-icon" name={getDepartmentIcon(node)} size={96} />}
  </div>
}

const { root, byId, rootLevel, title } = demoDepartments(pageUrl.searchParams.get('levels'), pageUrl.searchParams.get('site'))
const themeKey = 'org-atlas-demo.theme'
const themes = {
  system: { label: '跟随系统', Icon: Monitor },
  light: { label: '浅色', Icon: Sun },
  dark: { label: '深色', Icon: Moon },
}

function readPreference(key, choices, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return Object.hasOwn(choices, saved) ? saved : fallback
  } catch {
    return fallback
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // The current tab still applies the preference when storage is disabled.
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
  const [theme, setTheme] = useState(() => readPreference(themeKey, themes, 'system'))
  const [accent, setAccent] = useState(() => readPreference('org-atlas-demo.accent', accents, 'jade'))
  const palette = accents[accent]
  const paletteStyle = { '--org-primary': `light-dark(${palette.light}, ${palette.dark})`, '--org-primary-foreground': 'light-dark(white, #172022)' }

  useEffect(() => {
    document.title = catalogOpen ? '后道团队图标库' : byId.get(id).name + ' · ' + title
  }, [id])

  function selectTheme(next) {
    setTheme(next)
    savePreference(themeKey, next)
  }

  const officialFunction = backend.children.some(node => node.id === id) || facilitySections.some(node => node.id === id)
  const publicScope = id === 'backend' || id === 'micron-tw' || officialFunction
  const evidence = byId.get(id).evidence
  const themeControl = <div className="fab-appearance">
    <label className="fab-accent-picker" title={'主题色 · ' + palette.name}>
      <select aria-label="主题色" value={accent} onChange={event => {
        setAccent(event.target.value)
        savePreference('org-atlas-demo.accent', event.target.value)
      }}>
        {Object.entries(accents).map(([id, entry]) => <option key={id} value={id}>{entry.name}</option>)}
      </select>
    </label>
    <ThemeSelect value={theme} onChange={selectTheme} />
  </div>
  if (catalogOpen) return <IconCatalog palette={palette} paletteStyle={paletteStyle} defaultScope={root.evidence ? 'micron' : 'all'} returnUrl={catalogLink(false)} theme={theme} themeControl={themeControl} />
  const sourceInfo = evidence
    ? <>{root.id === 'micron-hq' ? '美光总部资料' : '西安公开资料'} · <a href={evidence.url}>{evidence.label}</a></>
    : <>{publicScope ? '美光公开职能 · 门户示例' : '模拟团队 · 用于展示职能下钻'} · <a href={jobMap}>美光职类地图</a>
        {id === 'hbm-integration' && <> · <a href={siteArticle}>台中厂区资料</a></>}</>
  return (
    <div className="demo-page" data-demo-theme={theme} style={paletteStyle}>
      <OrgExplorer
        root={root}
        rootLevel={rootLevel}
        title={title}
        selectedId={id}
        onNavigate={node => { window.location.hash = departmentHref(node) }}
        getHref={departmentHref}
        theme={theme}
        renderArtwork={departmentArt}
        brandMark={root.icon === 'backend-overview' ? <BackendIcon name="backend-overview" size={23} /> : undefined}
        itemLabel={root.evidence ? '条目' : '部门'}
        toolbar={<><a className="fab-link" href={catalogLink(true)} aria-label="后道团队图标库" title="后道团队图标库">
          <BookOpen size={16} /><span>图标库</span>
        </a>{themeControl}</>}
      />
      <footer className="fab-footer">
        <span>{sourceInfo}</span>
        <nav aria-label="厂区导航">
          {root.id !== 'micron-hq' && <a href="?site=micron-hq">进入美光总部</a>}
          {root.id !== 'xian' && <a href="?site=xian">进入西安厂区</a>}
          {root.evidence && <a href="?">进入台湾门户</a>}
          {!root.evidence && <a href={rootLevel === 2 ? '?levels=7' : '?'}>{rootLevel === 2 ? '查看上级目录' : '进入美光后道门户'}</a>}
        </nav>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
