import React, { useId } from 'react'
import { backendIcons } from './backend-icons.jsx'

export const defaultOverviewItems = [
  { label: '质量', icon: 'quality-engineering' },
  { label: '成本', icon: 'unit-cost' },
  { label: '人才', icon: 'team' },
  { label: '安全', icon: 'ehs' },
  { label: '产出', icon: 'units-per-hour' },
]

function glyphWidth(char) {
  if (/[ilI1.,:;!|' ]/.test(char)) return .4
  if (/[MW@%]/.test(char)) return 1
  return /[ -~]/.test(char) ? .72 : 1
}

function captionLines(label) {
  const lines = ['']
  let width = 0
  for (const char of label) {
    const advance = glyphWidth(char)
    if (width + advance > 5) {
      if (lines.length === 2) {
        lines[1] = Array.from(lines[1]).slice(0, -1).join('') + '…'
        break
      }
      lines.push('')
      width = 0
    }
    lines[lines.length - 1] += char
    width += advance
  }
  return lines
}

export function BackendOverview({ color, className, label, items = defaultOverviewItems, centerIcon }) {
  const id = useId()
  const top = id + '-surface'
  const substrate = id + '-substrate'
  if (!Array.isArray(items) || items.length < 4 || items.length > 7) {
    throw new RangeError('BackendOverview expects 4 to 7 items')
  }
  const sideCount = Math.floor(items.length / 2)
  const hasTop = items.length % 2 === 1
  const height = sideCount === 3 ? 198 : 164
  const cx = 190
  const cy = height / 2 + (hasTop ? 10 : 0)
  const nodes = items.map((item, index) => {
    if (hasTop && index === sideCount) return { ...item, x: cx, y: 23, top: true }
    const left = index < sideCount
    const row = left ? index : index - sideCount - Number(hasTop)
    const firstY = hasTop ? 54 : 32
    const y = firstY + row * (height - 31 - firstY) / (sideCount - 1)
    const inset = hasTop && row === sideCount - 1 ? 14 : 0
    const x = left ? 68 + inset : 312 - inset
    return { ...item, x, y, top: false }
  })
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 380 ${height}`} fill="none"
    strokeLinecap="round" strokeLinejoin="round" className={className}
    style={{ color: color ?? 'var(--org-art-accent, var(--org-primary, var(--primary, #47846f)))' }}
    aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    {label && <desc>{items.map(item => item.label).join('、')}</desc>}
    <defs>
      <linearGradient id={top} x2="1" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="color-mix(in srgb, currentColor 55%, white)"/><stop offset=".55" stopColor="color-mix(in srgb, currentColor 84%, white)"/><stop offset="1" stopColor="color-mix(in srgb, currentColor 88%, black)"/>
      </linearGradient>
      <linearGradient id={substrate} x2="1" y2="1">
        <stop stopColor="color-mix(in srgb, currentColor 64%, black)"/><stop offset="1" stopColor="color-mix(in srgb, currentColor 40%, black)"/>
      </linearGradient>
    </defs>

    {nodes.map((node, index) => {
      const lines = captionLines(node.label)
      const textUnits = Math.max(...lines.map(line => Array.from(line).reduce((sum, char) => sum + glyphWidth(char), 0)))
      const width = Math.max(78, 42 + Math.ceil(textUnits * 14))
      const halfHeight = lines.length === 1 ? 16 : 22
      const direction = node.x < cx ? 1 : -1
      const portX = node.x + direction * width / 2
      const connector = node.top
        ? `M${cx} ${node.y + halfHeight}V${cy}`
        : `M${portX} ${node.y}h${direction * 12}L${cx} ${cy}`
      return <g key={index}>
        <path d={connector} stroke="currentColor" strokeOpacity=".32" strokeWidth="1.25"/>
        <g transform={`translate(${node.x} ${node.y})`}>
          <title>{node.label}</title>
          <rect x={-width / 2} y={-halfHeight} width={width} height={halfHeight * 2} rx="11"
            fill="currentColor" fillOpacity=".045" stroke="currentColor" strokeOpacity=".29"/>
          <svg x={-width / 2 + 9} y="-10" width="20" height="20" viewBox="0 0 24 24">
            <path d={backendIcons[node.icon]?.path ?? backendIcons.team.path} stroke="currentColor" strokeWidth="1.7"/>
          </svg>
          <text fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="560">
            {lines.map((line, i) => <tspan key={i} x={-width / 2 + 35} y={lines.length === 1 ? 5 : -3 + i * 16}>{line}</tspan>)}
          </text>
        </g>
      </g>
    })}
    {centerIcon && backendIcons[centerIcon]?.path ? (
      <svg x={cx - 35} y={cy - 35} width="70" height="70" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="var(--oe-card, Canvas)"/>
        <path d={backendIcons[centerIcon].path} stroke="currentColor" strokeWidth="1.35"/>
      </svg>
    ) : <g transform={`translate(${cx} ${cy}) scale(.93) translate(-170 -92)`}>
      <path d="m110 101 60-29 60 29v6l-60 30-60-30z" fill="color-mix(in srgb, currentColor 43%, black)"/>
      <path d="m110 101 60-30 60 30-60 30z" fill={`url(#${substrate})`} stroke="color-mix(in srgb, currentColor 93%, white)"/>
      <g fill="color-mix(in srgb, currentColor 25%, white)">
        <path d="m120 102 4-2 4 2-4 2zm9 4.5 4-2 4 2-4 2zm9 4.5 4-2 4 2-4 2zm9 4.5 4-2 4 2-4 2zm9 4.5 4-2 4 2-4 2z"/>
        <path d="m184 120 4-2 4 2-4 2zm9-4.5 4-2 4 2-4 2zm9-4.5 4-2 4 2-4 2zm9-4.5 4-2 4 2-4 2z"/>
      </g>
      <path d="m121 87 49-24 49 24v7l-49 25-49-25z" fill="color-mix(in srgb, currentColor 75%, black)"/>
      <path d="m121 87 49-24 49 24-49 25z" fill="color-mix(in srgb, currentColor 41%, white)" stroke="color-mix(in srgb, currentColor 72%, white)"/>
      <path d="m128 69 42-21 42 21v10l-42 21-42-21z" fill="color-mix(in srgb, currentColor 71%, black)"/>
      <path d="m170 90 42-21v10l-42 21z" fill="color-mix(in srgb, currentColor 55%, black)"/>
      <path d="m128 69 42-21 42 21-42 21z" fill="color-mix(in srgb, currentColor 20%, white)" stroke="color-mix(in srgb, currentColor 53%, white)"/>
      <path d="m134 66 36-18 36 18v4l-36 18-36-18z" fill="color-mix(in srgb, currentColor 88%, black)"/>
      <path d="m134 66 36-18 36 18-36 18z" fill={`url(#${top})`} stroke="color-mix(in srgb, currentColor 34%, white)"/>
      <path d="m149 67 8 4 4-2 1-8 4 13 5-10 4 2 12-6" stroke="color-mix(in srgb, currentColor 34%, black)" strokeWidth="2.4"/>
    </g>}
  </svg>
}
