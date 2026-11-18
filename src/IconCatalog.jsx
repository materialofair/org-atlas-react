import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { BackendIcon, backendIcons } from 'org-atlas-react'

const entries = Object.entries(backendIcons)
const groups = [...new Set(entries.map(([, icon]) => icon.group))]

export function IconCatalog({ returnUrl, theme, themeControl }) {
  return <main className="org-explorer fab-catalog" data-theme={theme}>
    <header className="oe-header"><div className="oe-wrap oe-bar">
      <a className="fab-link" href={returnUrl}><ArrowLeft size={16} />返回组织目录</a>
      {themeControl}
    </div></header>
    <div className="oe-wrap fab-library">
      <h1>后道团队图标库</h1>
      <p>选择与团队职责相符的图标。卡片下方的英文标识可直接填入部门数据的 <code>icon</code> 字段。</p>
      {groups.map(group => <section key={group}>
        <h2>{group}</h2>
        <div className="fab-icon-grid">{entries.filter(([, icon]) => icon.group === group).map(([id, icon]) =>
          <article key={id}>
            <span className="fab-sample"><BackendIcon name={id} size={36} /></span>
            <h3>{icon.name}</h3><code>{id}</code><p>{icon.description}</p>
          </article>)}</div>
      </section>)}
    </div>
  </main>
}
