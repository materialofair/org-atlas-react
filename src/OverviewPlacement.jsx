import React, { useRef, useState } from 'react'
import { BackendOverview } from 'org-atlas-react'
import { overviewLayout, slotOrder } from '../lib/overview-layout.js'

const names = {
  top: '顶部', 'upper-left': '左上', 'middle-left': '左中', 'lower-left': '左下',
  'upper-right': '右上', 'middle-right': '右中', 'lower-right': '右下',
}

export function OverviewPlacement({ draft, onMove }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [drag, setDrag] = useState(null)
  const gesture = useRef(null)
  const skipClick = useRef(false)
  const { height, points } = overviewLayout(draft.items)
  const bySlot = new Map(draft.items.map(item => [item.position, item]))

  function pick(slot) {
    if (selected && slot !== selected && bySlot.has(selected)) {
      onMove(selected, slot)
      setSelected(null)
    } else {
      setSelected(selected !== slot && bySlot.has(slot) ? slot : null)
    }
  }

  function pointSlot(event) {
    const button = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-drop-position]')
    return event.currentTarget.parentElement.contains(button) ? button.dataset.dropPosition : null
  }

  function begin(event, slot) {
    if (!event.isPrimary || event.button !== 0) return
    skipClick.current = false
    if (!bySlot.has(slot)) return
    event.currentTarget.setPointerCapture(event.pointerId)
    gesture.current = { slot, x: event.clientX, y: event.clientY, moved: false }
  }
  function move(event) {
    const start = gesture.current
    if (!start || !event.isPrimary) return
    if (!start.moved && Math.hypot(event.clientX - start.x, event.clientY - start.y) < 5) return
    start.moved = true
    setSelected(start.slot)
    setHovered(pointSlot(event))
    const bounds = event.currentTarget.parentElement.getBoundingClientRect()
    setDrag({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, label: bySlot.get(start.slot).label })
  }
  function finish(event, cancelled = false) {
    if (!event.isPrimary) return
    const start = gesture.current
    gesture.current = null
    if (!start?.moved) return
    const target = cancelled ? null : pointSlot(event)
    if (target && target !== start.slot) onMove(start.slot, target)
    skipClick.current = true
    setDrag(null)
    setSelected(null)
    setHovered(null)
  }

  return <>
    <div className="fab-editor-preview">
      <div className="fab-placement-map">
        <BackendOverview {...draft} label="总览预览"/>
        {slotOrder.map(slot => {
          const item = bySlot.get(slot)
          const [x, y] = points[slot]
          return <button type="button" key={slot} data-drop-position={slot}
            className="fab-placement-slot" data-empty={!item || undefined} data-target={hovered === slot || undefined}
            style={{ left: (x / 380 * 100) + '%', top: (y / height * 100) + '%', height: (36 / height * 100) + '%' }}
            aria-label={names[slot] + '，' + (item?.label || '空位')} aria-pressed={selected === slot}
            title={names[slot] + ' · ' + (item?.label || '空位')}
            onPointerDown={e => begin(e, slot)} onPointerMove={move} onPointerUp={finish}
            onPointerCancel={e => finish(e, true)} onLostPointerCapture={e => finish(e, true)}
            onClick={e => { if (!skipClick.current || e.detail === 0) pick(slot); skipClick.current = false }}>
            {!item && names[slot]}
          </button>
        })}
        {drag && <span aria-hidden="true" className="fab-placement-ghost" style={{ left: drag.x, top: drag.y }}>{drag.label}</span>}
      </div>
    </div>
    <p className="fab-placement-help" aria-live="polite">{selected && bySlot.has(selected)
      ? `已选「${bySlot.get(selected).label}」，请选择目标位置。`
      : '拖动标签换位，也可依次点选标签和目标位置。'}</p>
  </>
}
