"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft, ArrowRight, BadgeCheck, Boxes, Building2, ChartNoAxesColumnIncreasing,
  ChevronDown, ChevronRight, CodeXml, GitFork, Grid2X2, Layers3, List, Network, PenTool,
  Search, ShieldCheck, Workflow, X,
} from "lucide-react"
import { Campus } from "./Campus.jsx"

const icons = [Layers3, PenTool, CodeXml, ChartNoAxesColumnIncreasing, Boxes, BadgeCheck, ShieldCheck, Workflow]
const levelNumber = new Intl.NumberFormat("zh-CN-u-nu-hanidec")

function indexDepartments(root) {
  const index = new Map()
  function visit(node, ancestors, branch) {
    if (index.has(node.id)) throw new Error("部门 id 重复：" + node.id)
    const path = [...ancestors, node]
    index.set(node.id, { node, path, branch })
    node.children?.forEach((child, position) => {
      visit(child, path, ancestors.length === 0 ? position : branch)
    })
  }
  visit(root, [], 0)
  return index
}

// Preserve native link behavior for opening a department in a separate tab.
function DepartmentLink({ node, navigation, children, ...props }) {
  const href = navigation.getHref?.(node)
  if (href) {
    return <a {...props} href={href} onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
      event.preventDefault()
      navigation.select(node)
    }}>{children}</a>
  }
  return <button {...props} type="button" onClick={() => navigation.select(node)}>{children}</button>
}

function Button({ children, className = "", ...props }) {
  return <button type="button" className={`oe-button ${className}`} {...props}>{children}</button>
}

function Avatar({ name }) {
  return <span className="oe-avatar" aria-hidden="true">{Array.from(name)[0]}</span>
}

function DepartmentCard({ entry, navigation }) {
  const { node, branch } = entry
  const Icon = icons[branch % icons.length]
  const count = node.children?.length || 0
  const leader = node.leader?.trim()
  const description = node.description?.trim()
  return (
    <article className="oe-card" data-slot="card" data-tone={branch % icons.length}>
      <div className="oe-card-top">
        <span className="oe-symbol"><Icon size={20} strokeWidth={1.75} /></span>
        <h3><DepartmentLink className="oe-card-link" data-department-id={node.id} node={node} navigation={navigation}>{node.name}</DepartmentLink></h3>
        <ArrowRight aria-hidden="true" size={17} className="oe-open" />
      </div>
      {description && <p className="oe-summary">{description}</p>}
      {(leader || count > 0) && <div className="oe-card-foot">
        {leader && <span className="oe-leader" aria-label={`负责人 ${leader}`}><Avatar name={leader} /><span>{leader}</span></span>}
        {count > 0 && <span className="oe-count"><GitFork size={12} />{count} 个下级</span>}
      </div>}
    </article>
  )
}

function SiblingNav({ parent, node, navigation }) {
  return (
    <nav className="oe-siblings" aria-label="同级部门">
      <div className="oe-sibling-head"><h2>同级部门</h2><span>{parent.children.length}</span></div>
      <div className="oe-sibling-list">
        {parent.children.map(sibling => (
          sibling.id === node.id
            ? <span className="oe-sibling" aria-current="page" key={sibling.id}>{sibling.name}</span>
            : <DepartmentLink className="oe-sibling" key={sibling.id} node={sibling} navigation={navigation}>{sibling.name}</DepartmentLink>
        ))}
      </div>
      <span className="oe-sibling-picker">
        <select className="oe-sibling-select" aria-label="切换同级部门" value={node.id} title={node.name}
          onChange={event => navigation.select(parent.children.find(sibling => sibling.id === event.target.value))}>
          {parent.children.map(sibling => <option key={sibling.id} value={sibling.id}>{sibling.name}</option>)}
        </select>
        <ChevronDown size={16} aria-hidden="true" />
      </span>
    </nav>
  )
}

function Finder({ dialog, entries, navigation }) {
  const [query, setQuery] = useState("")
  const keyword = query.trim().toLocaleLowerCase()
  const results = entries.filter(({ node, path }) => keyword
    ? [node.name, node.leader].some(value => value?.trim().toLocaleLowerCase().includes(keyword))
    : path.length === 2)
  const selectResult = {
    ...navigation,
    select(node) {
      dialog.current.close()
      navigation.select(node)
    },
  }
  return (
    <dialog className="oe-dialog" ref={dialog} aria-label="搜索部门" onClose={() => setQuery("")}
      onClick={event => { if (event.target === dialog.current) dialog.current.close() }}>
      <div className="oe-dialog-panel">
        <div className="oe-finder-head">
          <Search size={18} />
          <input autoFocus value={query} aria-label="部门名称或负责人" placeholder="输入部门名称或负责人"
            onChange={event => setQuery(event.target.value)} />
          <Button className="oe-icon-button" aria-label="关闭搜索" onClick={() => dialog.current.close()}><X size={16} /></Button>
        </div>
        <div className="oe-results">
          {results.map(({ node, path }) => (
            <DepartmentLink key={node.id} className="oe-result" navigation={selectResult} node={node}>
              <span><strong>{node.name}</strong><small>{path.slice(0, -1).map(p => p.name).join(" / ") || "组织目录"}</small></span>
              {node.leader?.trim() && <span className="oe-result-leader">{node.leader.trim()}</span>}
            </DepartmentLink>
          ))}
          {results.length === 0 && <p className="oe-no-results">没有找到匹配的部门或负责人</p>}
        </div>
      </div>
    </dialog>
  )
}

function Breadcrumbs({ root, path, navigation }) {
  return (
    <nav className="oe-breadcrumbs" aria-label="部门路径">
      <Building2 size={15} />
      <DepartmentLink className="oe-crumb" node={root} navigation={navigation}>组织目录</DepartmentLink>
      {path.map((item, i) => (
        <span className="oe-crumb-step" key={item.id}>
          <ChevronRight size={13} aria-hidden="true" />
          {i + 1 === path.length
            ? <span aria-current="page">{item.name}</span>
            : <DepartmentLink className="oe-crumb" node={item} navigation={navigation}>{item.name}</DepartmentLink>}
        </span>
      ))}
    </nav>
  )
}

export function OrgExplorer({ root, rootLevel = 1, title = "组织图谱", selectedId, onNavigate, getHref, theme = "system", className = "", toolbar }) {
  const index = useMemo(() => indexDepartments(root), [root])
  const entries = useMemo(() => Array.from(index.values()), [index])
  const [internalId, setInternalId] = useState(root.id)
  const [view, setView] = useState("grid")
  const container = useRef(null)
  const dialog = useRef(null)
  const heading = useRef(null)
  const { node, path } = index.get(selectedId ?? internalId) || index.get(root.id)
  const parent = path.at(-2)
  const children = node.children || []
  const leader = node.leader?.trim()
  const description = node.description?.trim()
  const showSiblings = parent?.children.length > 1
  const useWideRows = showSiblings && children.length <= 3
  const previousPath = useRef(path)
  const navigation = {
    getHref,
    select(next) {
      if (selectedId === undefined) setInternalId(next.id)
      onNavigate?.(next)
    },
  }

  useEffect(() => {
    const from = previousPath.current
    previousPath.current = path
    if (from.at(-1).id === node.id) return

    // On ascent, resume at the child from the previous branch in the tab order.
    const child = from[path.length - 1]?.id === node.id ? from[path.length] : undefined
    const card = child && container.current.querySelector(`[data-department-id="${CSS.escape(child.id)}"]`)
    if (card) card.focus()
    else heading.current.focus({ preventScroll: true })
  }, [node.id, path])
  useEffect(() => {
    const element = container.current
    const doc = element.ownerDocument
    function onShortcut(event) {
      if (event.defaultPrevented || !(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return
      const focus = doc.activeElement
      const activeExplorer = focus === doc.body || focus === doc.documentElement
        ? doc.querySelector(".org-explorer")
        : focus?.closest(".org-explorer")
      if (activeExplorer !== element) return
      event.preventDefault()
      if (!dialog.current.open) dialog.current.showModal()
    }
    doc.addEventListener("keydown", onShortcut)
    return () => doc.removeEventListener("keydown", onShortcut)
  }, [])

  return (
    <section ref={container} aria-label={title} className={`org-explorer ${className}`.trim()} data-theme={theme}>
      <header className="oe-header"><div className="oe-wrap oe-bar">
        <DepartmentLink className="oe-brand" node={root} navigation={navigation}>
          <span className="oe-brand-mark"><Network size={19} /></span>
          <span className="oe-brand-label" title={title}>{title}</span>
        </DepartmentLink>
        <div className="oe-toolbar">
          <Button className="oe-search" aria-label="搜索部门或负责人" onClick={() => dialog.current.showModal()}>
            <Search size={16} /><span>搜索部门或负责人</span><kbd>⌘/Ctrl K</kbd>
          </Button>
          {toolbar}
        </div>
      </div></header>
      <div className="oe-wrap oe-body">
        <Breadcrumbs root={root} path={path} navigation={navigation} />
        <section className="oe-hero">
          <Campus />
          <div className="oe-hero-content">
            <span className="oe-badge"><span className="oe-dot" />{levelNumber.format(rootLevel + path.length - 1)}级部门</span>
            <h1 tabIndex={-1} ref={heading}>{node.name}</h1>
            {description && <p>{description}</p>}
            {(leader || children.length > 0) && <div className="oe-meta">
              {leader && <><Avatar name={leader} /><span>负责人</span><strong>{leader}</strong></>}
              {leader && children.length > 0 && <span className="oe-divider" />}
              {children.length > 0 && <><GitFork size={14} /><span>{children.length} 个直属部门</span></>}
            </div>}
          </div>
        </section>
        <div className="oe-browser" data-sidebar={showSiblings || undefined}>
          {showSiblings && <SiblingNav parent={parent} node={node} navigation={navigation} />}
          <section className="oe-directory">
            <div className="oe-section-head">
              <div className="oe-section-title"><h2>{children.length ? "直属部门" : "部门层级"}</h2>
                {children.length > 0 && <span className="oe-total">{children.length}</span>}
              </div>
              <div className="oe-actions">
                {parent && <DepartmentLink node={parent} navigation={navigation} className="oe-button oe-back"><ArrowLeft size={15} />返回上一级</DepartmentLink>}
                {children.length > 0 && <div className="oe-view-group" role="group" aria-label="部门展示方式">
                  {[[Grid2X2, "grid", "卡片视图"], [List, "list", "列表视图"]].map(([Icon, mode, label]) => (
                    <Button key={mode} aria-label={label} title={label} aria-pressed={view === mode}
                      className="oe-view-button" onClick={() => setView(mode)}><Icon size={15} /></Button>
                  ))}
                </div>}
              </div>
            </div>
            {children.length
              ? <div className="oe-cards" data-view={view} data-rows={useWideRows || undefined} style={{ "--oe-columns": Math.min(children.length, showSiblings ? 3 : 4) }}>{children.map(child =>
                  <DepartmentCard key={child.id} entry={index.get(child.id)} navigation={navigation} />)}</div>
              : <div className="oe-leaf"><GitFork size={19} />该部门暂无下级部门</div>}
          </section>
        </div>
      </div>
      <Finder dialog={dialog} entries={entries} navigation={navigation} />
    </section>
  )
}
