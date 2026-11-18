import React, { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Check, Copy, Download, X } from 'lucide-react'
import { backendIcons, BackendIcon, exportIcon, getIconSource } from 'org-atlas-react'

const systemMode = window.matchMedia('(prefers-color-scheme: dark)')
function subscribeMode(listener) {
  systemMode.addEventListener('change', listener)
  return () => systemMode.removeEventListener('change', listener)
}

export function IconExportDialog({ name, palette, theme, onDismiss }) {
  const dialog = useRef(null)
  const sourceField = useRef(null)
  const [format, setFormat] = useState('svg')
  const [size, setSize] = useState(96)
  const [stroke, setStroke] = useState(1.55)
  const [customInk, setCustomInk] = useState(null)
  const [paper, setPaper] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [copied, setCopied] = useState(false)
  const darkSystem = useSyncExternalStore(subscribeMode, () => systemMode.matches)
  const dark = theme === 'dark' || (theme === 'system' && darkSystem)
  const themeColor = palette[dark ? 'dark' : 'light']
  const ink = customInk ?? themeColor
  const background = format === 'jpg' ? paper ?? (dark ? '#1b211e' : '#ffffff') : undefined
  const options = { size, strokeWidth: stroke, color: customInk ?? 'currentColor', themeColor, background }
  const vector = format === 'svg' || format === 'jsx'
  const code = vector ? getIconSource(name, format, options) : ''
  const icon = backendIcons[name]

  useLayoutEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])
  useEffect(() => {
    setCopied(false)
    setFeedback('')
  }, [format, size, stroke, customInk, background])

  async function download() {
    try {
      const blob = await exportIcon(name, format, options)
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = name + '-' + size + '.' + format
      document.body.append(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(link.href), 30000)
      setFeedback('已生成 ' + link.download)
    } catch {
      setFeedback('导出失败，请重试。')
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setFeedback('已复制 ' + format.toUpperCase() + ' 代码')
    } catch {
      sourceField.current.closest('details').open = true
      sourceField.current.focus()
      sourceField.current.select()
      setFeedback('已选中代码，请使用系统复制命令。')
    }
  }

  return <dialog ref={dialog} className="fab-export" aria-labelledby="fab-export-title"
    onCancel={event => { event.preventDefault(); onDismiss() }}
    onClick={event => { if (event.target === dialog.current) onDismiss() }}>
    <div className="fab-export-inner">
      <header className="fab-export-head"><div>
        <h2 id="fab-export-title">{icon.name}</h2><code>{name}</code>
      </div><button type="button" className="fab-export-close" aria-label="关闭" onClick={onDismiss}><X size={19}/></button></header>
      <div className="fab-export-workspace">
        <div className="fab-export-figure">
          <div className="fab-export-preview" style={{ color: ink, background: background }}>
            <BackendIcon name={name} size={104} strokeWidth={stroke} />
          </div>
          <p>{icon.description}</p>
        </div>
        <div className="fab-export-controls">
          <fieldset><legend>导出格式</legend><div className="fab-format-list">
            {['svg', 'png', 'jpg', 'jsx'].map(value => <button key={value} type="button" aria-pressed={value === format}
              onClick={() => setFormat(value)}>{value.toUpperCase()}</button>)}
          </div></fieldset>
          <div className="fab-export-pair">
            <label>尺寸<select value={size} onChange={event => setSize(Number(event.target.value))}>
              {[16, 24, 32, 48, 64, 96, 128, 256, 512, 1024, 2048].map(px => <option key={px} value={px}>{px} px</option>)}
            </select></label>
            <label>线宽<select value={stroke} onChange={event => setStroke(Number(event.target.value))}>
              {[1, 1.25, 1.55, 2, 2.5, 3].map(width => <option key={width}>{width}</option>)}
            </select></label>
          </div>
          <div><span className="fab-field-label">图标颜色</span><div className="fab-export-ink">
            <label className="fab-color-control"><input aria-label="自定义图标颜色" type="color" value={ink}
              onChange={event => setCustomInk(event.target.value)} /><code>{ink.toUpperCase()}</code></label>
            <button type="button" className="fab-theme-ink" aria-pressed={customInk === null} onClick={() => setCustomInk(null)}>
              {customInk === null && <Check size={13}/>}跟随主题</button>
          </div></div>
          {format === 'jpg' ? <label className="fab-export-paper">JPG 底色 <input type="color" value={background} onChange={event => setPaper(event.target.value)}/></label> :
            <p className="fab-export-hint">{format === 'png' ? '透明背景，可叠放在其他画面上。' :
              customInk === null ? '代码使用 currentColor，内联时随文字颜色变化。' : '代码将保留选定颜色。'}</p>}
        </div>
      </div>
      {vector && <details className="fab-export-source"><summary>查看 {format.toUpperCase()} 代码</summary>
        <textarea ref={sourceField} aria-label={format.toUpperCase() + ' 代码'} value={code} readOnly spellCheck={false}/>
      </details>}
      <footer className="fab-export-footer">
        <span role="status">{feedback}</span>
        {vector && <button className="oe-button" type="button" onClick={copy}>{copied ? <Check size={16}/> : <Copy size={16}/>}复制代码</button>}
        <button className="oe-button fab-download" type="button" onClick={download}><Download size={16}/>下载 {format.toUpperCase()}</button>
      </footer>
    </div>
  </dialog>
}
