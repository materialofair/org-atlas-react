import { writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BackendOverview } from '../dist/lib/index.js'
import { accents } from '../src/accents.js'

// Resolve tints when exporting files so SVG readers without CSS variables or color-mix can use them.
export function overviewSvg(hex) {
  const channels = hex.slice(1).match(/../g).map(pair => parseInt(pair, 16))
  const markup = renderToStaticMarkup(createElement(BackendOverview, { color: hex, label: '后道封测总览：质量、成本、人才、安全、产出' }))
  return markup.replace(/color-mix\(in srgb, currentColor (\d+)%, (white|black)\)/g, (_, amount, base) => {
    const weight = Number(amount) / 100
    const neutral = base === 'white' ? 255 : 0
    return '#' + channels.map(channel => Math.round(channel * weight + neutral * (1 - weight)).toString(16).padStart(2, '0')).join('')
  }) + '\n'
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await writeFile(new URL('../dist/lib/backend-overview.svg', import.meta.url), overviewSvg(accents.jade.light))
}
