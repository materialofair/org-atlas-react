import React, { useId } from 'react'

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

    <g stroke="color-mix(in srgb, currentColor 77%, white)" strokeWidth="1.6">
      <path d="M73 41h28l27 16h28 M67 119h28l34-21h14 M269 45h-28l-26 15h-28 M274 118h-29l-29-18h-17"/>
      <path d="M91 47h8l19 11m124 53h7" opacity=".5"/>
    </g>
    <g fill="color-mix(in srgb, currentColor 13%, white)" stroke="color-mix(in srgb, currentColor 75%, white)" strokeWidth="1.3">
      <rect x="47" y="28" width="26" height="26" rx="8"/>
      <rect x="41" y="106" width="26" height="26" rx="8"/>
      <rect x="269" y="32" width="26" height="26" rx="8"/>
      <rect x="274" y="105" width="26" height="26" rx="8"/>
    </g>
    <g stroke="color-mix(in srgb, currentColor 60%, black)" strokeWidth="1.6">
      <path d="M54 47h12m-10-3v-4m4 4v-8m4 8v-6"/>
      <path d="M48 115h12m-12 7h12"/><rect x="51" y="112.8" width="2.8" height="4.4" rx="1" fill="color-mix(in srgb, currentColor 24%, white)"/><rect x="55" y="119.8" width="2.8" height="4.4" rx="1" fill="color-mix(in srgb, currentColor 24%, white)"/>
      <path d="m282 38 6 2v4q0 4-6 7-6-3-6-7v-4zm-2.6 6 1.9 1.9 3.6-4"/>
      <path d="M280 124v-10l4 2v-4l5 3v-5h3v14zm3-4h1m3 0h1"/>
    </g>

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
