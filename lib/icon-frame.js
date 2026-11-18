// Keep the 24-unit grid at standard weights. Heavier strokes need room for round caps.
export function iconPadding(strokeWidth) {
  return Math.max(0, (strokeWidth - 3) / 2)
}

export function iconViewBox(strokeWidth) {
  const pad = iconPadding(strokeWidth)
  return [-pad, -pad, 24 + 2 * pad, 24 + 2 * pad].join(' ')
}
