import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { BackendIcon, backendIcons } from 'org-atlas-react'

import { demoDepartments } from './departments'

const xianIcons = new Set(Array.from(demoDepartments(undefined, 'xian').byId.values(), node => node.icon))
const entries = Object.entries(backendIcons)
const groups = [...new Set(entries.map(([, icon]) => icon.group))]

export function IconCatalog({ returnUrl, theme, themeControl, xianSite }) {
  const [query, setQuery] = useState('')
  const [xianOnly, setXianOnly] = useState(xianSite)
  const term = query.trim().toLowerCase()
  const matches = entries.filter(([id, icon]) =>
    (!xianOnly || xianIcons.has(id)) && [id, icon.name, icon.group, icon.description].some(text => text.toLowerCase().includes(term)))
  return <main className="org-explorer fab-catalog" data-theme={theme}>
    <header className="oe-header"><div className="oe-wrap oe-bar">
      <a className="fab-link" href={returnUrl}><ArrowLeft size={16} />返回组织目录</a>
      {themeControl}
    </div></header>
    <div className="oe-wrap fab-library">
      <h1>后道团队图标库</h1>
      <p>不确定用哪一枚时，可从通用组织中选择，也可省略 <code>icon</code>。有下级时自动使用部门图标，末级使用团队图标。</p>
      <div className="fab-catalog-filter" role="group" aria-label="图标范围">
        <button type="button" className="oe-button" aria-pressed={!xianOnly} onClick={() => setXianOnly(false)}>全部图标 · {entries.length}</button>
        <button type="button" className="oe-button" aria-pressed={!!xianOnly} onClick={() => setXianOnly(true)}>西安示例 · {xianIcons.size}</button>
      </div>
      <input className="fab-icon-search" type="search" aria-label="搜索团队图标"
        placeholder="搜索名称、职能或标识，如 TSE、底填" value={query} onChange={event => setQuery(event.target.value)} />
      {!matches.length && <p role="status">没有匹配的团队图标</p>}
      {groups.filter(group => matches.some(([, icon]) => icon.group === group)).map(group => <section key={group}>
        <h2>{group}</h2>
        <div className="fab-icon-grid">{matches.filter(([, icon]) => icon.group === group).map(([id, icon]) =>
          <article key={id}>
            <span className="fab-sample"><BackendIcon name={id} size={36} /></span>
            <h3>{icon.name}</h3><code>{id}</code><p>{icon.description}</p>
          </article>)}</div>
      </section>)}
    </div>
  </main>
}
