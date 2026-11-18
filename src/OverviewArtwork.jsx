import React, { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, Pencil, Plus, X } from 'lucide-react'
import { BackendIcon, BackendOverview, backendIcons, defaultOverviewItems } from 'org-atlas-react'

const defaults = { items: defaultOverviewItems, centerIcon: '' }
const groups = new Map()
for (const [key, icon] of Object.entries(backendIcons)) {
  if (!groups.has(icon.group)) groups.set(icon.group, [])
  groups.get(icon.group).push(<option key={key} value={key}>{icon.name}</option>)
}
const options = Array.from(groups, ([group, entries]) => <optgroup key={group} label={group}>{entries}</optgroup>)

function IconSelect({ children, ...props }) {
  return <span className="fab-editor-select"><select {...props}>{children}{options}</select><ChevronDown size={14} aria-hidden="true"/></span>
}

function readOverview(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    if (Array.isArray(value?.items) && value.items.length >= 4 && value.items.length <= 7 &&
        (value.centerIcon === '' || Object.hasOwn(backendIcons, value.centerIcon)) &&
        value.items.every(item => typeof item?.label === 'string' && item.label.trim() && Object.hasOwn(backendIcons, item.icon))) {
      return value
    }
  } catch { /* Storage can be unavailable or contain a previous format. */ }
  return defaults
}

function OverviewEditor({ value, onSave, onClose }) {
  const [draft, setDraft] = useState(value)
  const dialog = useRef(null)
  useLayoutEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])
  function changeItem(index, patch) {
    setDraft({ ...draft, items: draft.items.map((item, i) => i === index ? { ...item, ...patch } : item) })
  }
  function submit(event) {
    event.preventDefault()
    onSave({ ...draft, items: draft.items.map(item => ({ ...item, label: item.label.trim() })) })
  }
  return <dialog className="fab-export fab-overview-editor" ref={dialog} aria-label="编辑总览"
    onCancel={event => { event.preventDefault(); onClose() }}>
    <form className="fab-export-inner" onSubmit={submit}>
      <header className="fab-export-head"><h2>编辑总览</h2>
        <button className="fab-export-close" type="button" aria-label="关闭" onClick={onClose}><X size={18}/></button>
      </header>
      <div className="fab-editor-preview"><BackendOverview {...draft} label="总览预览" /></div>
      <label className="fab-editor-center">中央图标
        <IconSelect value={draft.centerIcon} onChange={e => setDraft({ ...draft, centerIcon: e.target.value })}>
          <option value="">封测芯片（立体）</option>
        </IconSelect>
      </label>
      <div className="fab-editor-heading"><strong>周边图标</strong><span>{draft.items.length} / 7</span></div>
      {draft.items.map((item, i) => <div className="fab-editor-row" key={i}>
        <BackendIcon name={item.icon} size={20}/>
        <IconSelect aria-label={`第 ${i + 1} 项图标`} value={item.icon} onChange={e => changeItem(i, { icon: e.target.value })}/>
        <input aria-label={`第 ${i + 1} 项标签`} value={item.label} placeholder="显示标签" required
          onChange={e => changeItem(i, { label: e.target.value })}/>
        <button className="fab-export-close" type="button" aria-label={`删除第 ${i + 1} 项`} disabled={draft.items.length === 4}
          onClick={() => setDraft({ ...draft, items: draft.items.filter((_, n) => n !== i) })}><X size={16}/></button>
      </div>)}
      <button className="oe-button fab-editor-add" type="button" disabled={draft.items.length === 7}
        onClick={() => setDraft({ ...draft, items: [...draft.items, { icon: 'team', label: '新职能' }] })}><Plus size={15}/>添加图标</button>
      <footer className="fab-editor-footer">
        <button type="button" className="oe-button" onClick={() => setDraft(defaults)}>恢复默认</button>
        <button type="button" className="oe-button" onClick={onClose}>取消</button>
        <button type="submit" className="oe-button fab-editor-save" disabled={draft.items.some(item => !item.label.trim())}>保存</button>
      </footer>
    </form>
  </dialog>
}

export function OverviewArtwork({ departmentId }) {
  const key = 'org-atlas-demo.overview.' + departmentId
  const [value, setValue] = useState(() => readOverview(key))
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')
  function save(next) {
    try {
      localStorage.setItem(key, JSON.stringify(next))
      setNotice('')
    } catch {
      setNotice('浏览器存储不可用，本次设置仅在当前页面生效。')
    }
    setValue(next)
    setEditing(false)
  }
  return <div className="fab-overview-art">
    <BackendOverview {...value} className="fab-overview-wide" color="var(--oe-primary)" label="封测职能总览" />
    <button type="button" className="fab-overview-edit" onClick={() => setEditing(true)}><Pencil size={13}/>编辑总览</button>
    {notice && <small role="status">{notice}</small>}
    {editing && <OverviewEditor value={value} onSave={save} onClose={() => setEditing(false)}/>}
  </div>
}
