// The first five slots match the original portal. Extra items fill the middle rows.
export const slotOrder = ['upper-left', 'lower-left', 'top', 'upper-right', 'lower-right', 'middle-left', 'middle-right']

const legacySlots = {
  4: ['upper-left', 'lower-left', 'upper-right', 'lower-right'],
  5: slotOrder.slice(0, 5),
  6: ['upper-left', 'middle-left', 'lower-left', 'upper-right', 'middle-right', 'lower-right'],
  7: ['upper-left', 'middle-left', 'lower-left', 'top', 'upper-right', 'middle-right', 'lower-right'],
}

export function placedItems(items) {
  const used = new Set()
  const reserved = items.map(({ position }) => {
    if (!slotOrder.includes(position) || used.has(position)) return null
    used.add(position)
    return position
  })
  const priority = [...legacySlots[items.length], ...slotOrder]
  return items.map((item, index) => {
    const position = reserved[index] ?? priority.find(slot => !used.has(slot))
    used.add(position)
    return { ...item, position }
  })
}

export function overviewLayout(items) {
  const slots = items.map(item => item.position)
  const hasTop = slots.includes('top')
  const height = slots.some(slot => slot.startsWith('middle-')) ? 198 : 164
  const upper = hasTop ? 54 : 32
  const lower = height - 31
  const lowerX = hasTop ? 82 : 68
  return {
    height, cy: height / 2 + (hasTop ? 10 : 0),
    points: {
      top: [190, 23],
      'upper-left': [68, upper], 'upper-right': [312, upper],
      'middle-left': [68, (upper + lower) / 2], 'middle-right': [312, (upper + lower) / 2],
      'lower-left': [lowerX, lower], 'lower-right': [380 - lowerX, lower],
    },
  }
}
