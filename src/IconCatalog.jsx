import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { BackendIcon, backendIcons } from 'org-atlas-react'
import { IconExportDialog } from './IconExportDialog'
import { catalogResults, scopes } from './icon-scopes'

export function IconCatalog({ returnUrl, theme, themeControl, defaultScope, paletteStyle, palette }) {
  const urlScope = new URL(window.location.href).searchParams.get('collection')
  const [scope, setScope] = useState(() => {
    if (urlScope === 'xian' || urlScope === 'micron-hq') return 'micron'
    return Object.hasOwn(scopes, urlScope) ? urlScope : defaultScope
  })
  useEffect(() => {
    if (urlScope !== 'xian' && urlScope !== 'micron-hq') return
    const url = new URL(window.location.href)
    url.searchParams.set('collection', 'micron')
    window.history.replaceState(window.history.state, '', url)
  }, [urlScope])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const results = useMemo(() => catalogResults(query), [query])
  const { sections, matches, total, name } = results[scope]
  const sourceLabel = scope === 'process' ? '工序来源' : '职能来源'
  const searching = Boolean(query.trim())
  return <main className="org-explorer fab-catalog" data-theme={theme} style={paletteStyle}>
    <header className="oe-header"><div className="oe-wrap oe-bar">
      <a className="fab-link" href={returnUrl}><ArrowLeft size={16} />返回组织目录</a>
      {themeControl}
    </div></header>
    <div className="oe-wrap fab-library">
      <h1>后道团队图标库</h1>
      <p>点击图标可调色、下载图片或复制代码。全库按唯一图标计数，同一图标可出现在多个合集。</p>
      <div className="fab-catalog-filter" role="group" aria-label="图标范围">
        {Object.entries(results).map(([id, item]) => <button key={id} type="button" className="oe-button"
          aria-pressed={scope === id} onClick={() => {
            setScope(id)
            const url = new URL(window.location.href)
            url.searchParams.set('collection', id)
            window.history.replaceState(null, '', url)
          }}>{item.name} · {searching ? item.matches + ' / ' : ''}{item.total}</button>)}
      </div>
      <input className="fab-icon-search" type="search" aria-label="搜索团队图标"
        placeholder="搜索名称、职能或标识，如 Leader、离职率、OEE" value={query} onChange={event => setQuery(event.target.value)} />
      <p role="status">{searching
        ? (matches ? `${name} · 找到 ${matches} 枚，共 ${total} 枚` : `${name} · 没有匹配的图标（0 / ${total}）`)
        : `${name} · 显示 ${matches} 枚图标`}</p>
      {sections.map(({ name, source, icons }) => <section key={name}>
        <div className="fab-group-heading"><h2>{name}</h2>{source && <a href={source} aria-label={name + sourceLabel}>{sourceLabel} ↗</a>}</div>
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
