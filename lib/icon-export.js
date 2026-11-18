import { backendIcons } from './backend-icons.jsx'

const hex = /^#[0-9a-f]{6}$/i

function drawing(name, { size = 24, strokeWidth = 1.55, color = 'currentColor' }) {
  if (!Object.hasOwn(backendIcons, name)) throw new RangeError('Unknown icon')
  if (!Number.isInteger(size) || size < 1 || size > 2048) throw new RangeError('Size must be 1–2048 px')
  if (!Number.isFinite(strokeWidth) || strokeWidth <= 0 || strokeWidth > 6) throw new RangeError('Stroke width must be greater than 0 and at most 6')
  if (color !== 'currentColor' && !hex.test(color)) throw new TypeError('Use currentColor or a six-digit hex color')
  return { ...backendIcons[name], size, strokeWidth, color }
}

export function getIconSource(name, format, options = {}) {
  const icon = drawing(name, options)
  if (format === 'svg') return `<svg xmlns="http://www.w3.org/2000/svg" width="${icon.size}" height="${icon.size}" viewBox="0 0 24 24" fill="none" stroke="${icon.color}" stroke-width="${icon.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${icon.name}">
  <path d="${icon.path}" />
</svg>
`
  if (format !== 'jsx') throw new TypeError('Expected svg or jsx')
  const component = name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('') + 'Icon'
  return `import React from 'react'

export default function ${component}({ size = ${icon.size}, color = "${icon.color}", strokeWidth = ${icon.strokeWidth}, label, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...props}>
      <path d="${icon.path}" />
    </svg>
  )
}
`
}

export async function exportIcon(name, format, options = {}) {
  if (format === 'svg' || format === 'jsx') {
    return new Blob([getIconSource(name, format, options)], { type: format === 'svg' ? 'image/svg+xml' : 'text/plain;charset=utf-8' })
  }
  if (format !== 'png' && format !== 'jpg') throw new TypeError('Expected png, jpg, svg or jsx')
  const { path, size, color, strokeWidth } = drawing(name, options)
  const ink = color === 'currentColor' ? options.themeColor ?? '#000000' : color
  const paper = options.background ?? (format === 'jpg' ? '#ffffff' : undefined)
  if (!hex.test(ink) || (paper !== undefined && !hex.test(paper))) throw new TypeError('Raster colors require six-digit hex')
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D unavailable')
  if (paper) {
    ctx.fillStyle = paper
    ctx.fillRect(0, 0, size, size)
  }
  ctx.scale(size / 24, size / 24)
  ctx.strokeStyle = ink
  ctx.lineWidth = strokeWidth
  ctx.lineCap = ctx.lineJoin = 'round'
  ctx.stroke(new Path2D(path))
  const mime = format === 'png' ? 'image/png' : 'image/jpeg'
  return new Promise((resolve, reject) => canvas.toBlob(blob => {
    if (blob?.type === mime) resolve(blob)
    else reject(new Error('Image encoding unavailable'))
  }, mime, 0.95))
}
