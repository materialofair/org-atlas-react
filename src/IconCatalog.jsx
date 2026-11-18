import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { BackendIcon, backendIcons, productionCollections } from 'org-atlas-react'
import { IconExportDialog } from './IconExportDialog'
import { demoDepartments } from './departments'

const entries = Object.entries(backendIcons)
const xianIcons = new Set(Array.from(demoDepartments(undefined, 'xian').byId.values(), node => node.icon))
const groups = [...new Set(entries.map(([, icon]) => icon.group))]
const allSections = groups.map(name => ({ name, icons: entries.filter(([, icon]) => icon.group === name).map(([id]) => id) }))

export function IconCatalog({ returnUrl, theme, themeControl, defaultScope, paletteStyle, palette }) {
  const urlScope = new URL(window.location.href).searchParams.get('collection')
  const [scope, setScope] = useState(['all', 'xian'].includes(urlScope) || Object.hasOwn(productionCollections, urlScope) ? urlScope : defaultScope)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const term = query.trim().toLowerCase()
  const collection = productionCollections[scope]
  const sections = (collection?.sections ?? allSections).map(section => ({
    ...section,
    icons: section.icons.filter(id => {
      const icon = backendIcons[id]
      return (scope !== 'xian' || xianIcons.has(id)) &&
        [id, icon.name, icon.group, icon.description, section.name, collection?.name].some(value => value?.toLowerCase().includes(term))
    }),
  })).filter(section => section.icons.length)
  const filters = [['all', '全部图标', entries.length], ['xian', '西安示例', xianIcons.size],
    ...Object.entries(productionCollections).map(([id, group]) => [id, group.name, group.sections.flatMap(s => s.icons).length])]
  return <main className="org-explorer fab-catalog" data-theme={theme} style={paletteStyle}>
    <header className="oe-header"><div className="oe-wrap oe-bar">
      <a className="fab-link" href={returnUrl}><ArrowLeft size={16} />返回组织目录</a>
      {themeControl}
    </div></header>
    <div className="oe-wrap fab-library">
      <h1>后道团队图标库</h1>
      <p>按职能查找图标，点击卡片可调色、下载图片或复制代码。不确定时可省略 <code>icon</code>，目录会根据是否有下级自动选择部门或团队图标。</p>
      <div className="fab-catalog-filter" role="group" aria-label="图标范围">
        {filters.map(([id, label, count]) => <button key={id} type="button" className="oe-button"
          aria-pressed={scope === id} onClick={() => {
            setScope(id)
            const url = new URL(window.location.href)
            url.searchParams.set('collection', id)
            window.history.replaceState(null, '', url)
          }}>{label} · {count}</button>)}
      </div>
      <input className="fab-icon-search" type="search" aria-label="搜索团队图标"
        placeholder="搜索名称、职能或标识，如 TAT、来料" value={query} onChange={event => setQuery(event.target.value)} />
      {!sections.length && <p role="status">没有匹配的团队图标</p>}
      {sections.map(({ name, source, icons }) => <section key={name}>
        <div className="fab-group-heading"><h2>{name}</h2>{source && <a href={source} aria-label={name + '职能来源'}>职能来源 ↗</a>}</div>
        <div className="fab-icon-grid">{icons.map(id => {
          const icon = backendIcons[id]
          return <article key={id}>
            <span className="fab-sample"><BackendIcon name={id} size={36} /></span>
            <h3><button className="fab-open-icon" type="button" aria-haspopup="dialog"
              onClick={() => setSelected(id)}>{icon.name}</button></h3><code>{id}</code><p>{icon.description}</p>
          </article>
        })}</div>
      </section>)}
    </div>
    {selected && <IconExportDialog name={selected} palette={palette} theme={theme} onDismiss={() => setSelected(null)} />}
  </main>
}
