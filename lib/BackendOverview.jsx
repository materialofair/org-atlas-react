import React, { useId } from 'react'
import { backendIcons } from './backend-icons.jsx'

const functions = [
  { name: '质量', x: 46, y: 62, path: backendIcons['quality-engineering'].path },
  { name: '成本', x: 80, y: 138, path: backendIcons['unit-cost'].path },
  { name: '人才', x: 170, y: 21, path: backendIcons.team.path },
  { name: '安全', x: 294, y: 62, path: 'M12 2.5 20 6v5.5c0 4.5-3.7 8-8 10-4.3-2-8-5.5-8-10V6z M12 7.5v7m-3.5-3.5h7' },
  { name: '产出', x: 260, y: 138, path: 'M5 3.5h8v7H5z M5 14.5h14a3 3 0 0 1 0 6H5a3 3 0 0 1 0-6z M6 17.5h.2m11.6 0h.2 M16 7h6m-2.6-2.7L22 7l-2.6 2.7' },
]

export function BackendOverview({ color, className, label }) {
  const id = useId()
  const top = id + '-surface'
  const substrate = id + '-substrate'
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 164" fill="none"
    strokeLinecap="round" strokeLinejoin="round" className={className}
    style={{ color: color ?? 'var(--org-art-accent, var(--org-primary, var(--primary, #47846f)))' }}
    aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    <defs>
      <linearGradient id={top} x2="1" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="color-mix(in srgb, currentColor 55%, white)"/><stop offset=".55" stopColor="color-mix(in srgb, currentColor 84%, white)"/><stop offset="1" stopColor="color-mix(in srgb, currentColor 88%, black)"/>
      </linearGradient>
      <linearGradient id={substrate} x2="1" y2="1">
        <stop stopColor="color-mix(in srgb, currentColor 64%, black)"/><stop offset="1" stopColor="color-mix(in srgb, currentColor 40%, black)"/>
      </linearGradient>
    </defs>

    <g stroke="currentColor" strokeOpacity=".48" strokeWidth="1.25">
      <path d="M84 62h18l31 19h15 M118 138h5l21-22 M170 37v27 M256 62h-18l-31 19h-15 M222 138h-5l-21-22"/>
    </g>
    {functions.map(({ name, x, y, path }) => (
      <g key={name} transform={`translate(${x} ${y})`}>
        <rect x="-38" y="-15" width="76" height="30" rx="12"
          fill="currentColor" fillOpacity=".05" stroke="currentColor" strokeOpacity=".32"/>
        <svg x="-29" y="-10" width="20" height="20" viewBox="0 0 24 24">
          <path d={path} stroke="currentColor" strokeWidth="1.8"/>
        </svg>
        <text x="8" y="5" textAnchor="middle" fill="currentColor"
          fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600">{name}</text>
      </g>
    ))}

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
  </svg>
}
