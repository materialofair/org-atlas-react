import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import { ChevronDown, Monitor, Moon, Sun } from 'lucide-react'
import { OrgExplorer } from 'org-atlas-react'
import 'org-atlas-react/style.css'
import { demoDepartments } from './departments'
import './style.css'

const { root, byId, rootLevel, title } = demoDepartments(new URLSearchParams(window.location.search).get('levels'))
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
    document.title = byId.get(id).name + ' · ' + title
  }, [id])

  function selectTheme(next) {
    setTheme(next)
    try {
      localStorage.setItem(themeKey, next)
    } catch {
      // A browser with storage disabled still applies the theme for this visit.
    }
  }

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
        toolbar={<ThemeSelect value={theme} onChange={selectTheme} />}
      />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
