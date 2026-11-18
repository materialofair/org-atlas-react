// Run against the same built entry point installed by a host application.
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import { createServer, transformWithOxc } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { backendIcons, BackendIcon, exportIcon } from '../dist/lib/index.js'

const server = await createServer({ configFile: false, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } })
let browser
try {
  await server.listen()
  const channel = process.env.PLAYWRIGHT_CHANNEL || (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined)
  browser = await chromium.launch({ channel })
  const page = await browser.newPage()
  await page.route('**/audit.html', route => route.fulfill({ contentType: 'text/html', body: '<main></main>' }))
  await page.goto(new URL('audit.html', server.resolvedUrls.local[0]).href)
  const errors = []
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
  const count = await page.evaluate(async () => {
    const { backendIcons, getIconSource, exportIcon } = await import('/dist/lib/index.js')
    const unique = new Set()
    async function pixels(blob, size) {
      const url = URL.createObjectURL(blob)
      try {
        const img = new Image()
        img.src = url
        await img.decode()
        if (img.naturalWidth !== size || img.naturalHeight !== size) throw Error('Incorrect image size')
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        return ctx.getImageData(0, 0, size, size).data
      } finally { URL.revokeObjectURL(url) }
    }
    for (const [key, icon] of Object.entries(backendIcons)) {
      if (unique.has(icon.path)) throw Error(key + ': duplicate drawing')
      unique.add(icon.path)
      document.querySelector('main').innerHTML = getIconSource(key, 'svg')
      const { x, y, width, height } = document.querySelector('path').getBBox()
      if (Math.min(x, y, 24 - x - width, 24 - y - height) < 1.5 || width < 8 || height < 8) throw Error(key + ': check optical bounds')
      for (const [size, strokeWidth] of [[16, 1.55], [24, 3], [48, 6]]) {
        const options = { size, strokeWidth, color: '#306b54' }
        const vector = await pixels(await exportIcon(key, 'svg', options), size)
        const raster = await pixels(await exportIcon(key, 'png', options), size)
        let ink = 0, difference = 0
        for (let i = 3; i < vector.length; i += 4) {
          ink += raster[i]
          difference += Math.abs(vector[i] - raster[i])
        }
        if (ink < size * size * 12 || difference > ink * 0.06) throw Error(key + ': SVG/PNG silhouette at ' + size)
      }
      const jpg = await pixels(await exportIcon(key, 'jpg', { size: 48, color: '#111111', background: '#ffffff' }), 48)
      if (jpg[0] < 235 || !jpg.some((n, i) => i % 4 === 0 && n < 70)) throw Error(key + ': JPEG foreground or background')
      const jsx = await (await exportIcon(key, 'jsx')).text()
      if (!jsx.includes('export default function') || !jsx.includes('d="' + icon.path + '"')) throw Error(key + ': JSX geometry')
    }
    return unique.size
  })
  // Compile each standalone component and compare its actual SVG with the library component.
  for (const key of Object.keys(backendIcons)) {
    const jsx = await (await exportIcon(key, 'jsx')).text()
    const { code } = await transformWithOxc(jsx, key + '.jsx', { jsx: { runtime: 'classic' } })
    const source = code.replace(/(['"])react\1/g, JSON.stringify(import.meta.resolve('react')))
    const { default: Glyph } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'))
    const props = { size: 48, strokeWidth: 6, color: '#306b54', label: 'audit' }
    const expected = renderToStaticMarkup(createElement(BackendIcon, { name: key, ...props }))
    const result = renderToStaticMarkup(createElement(Glyph, props))
    for (const attr of ['viewBox', 'd', 'stroke-width', 'stroke', 'width', 'height', 'aria-label']) {
      const re = new RegExp(' ' + attr + '="([^"]*)"')
      assert.equal(re.exec(result)?.[1], re.exec(expected)[1], key + ': ' + attr)
    }
  }
  assert.deepEqual(errors, [])
  console.log('PASS · ' + count + ' glyphs: unique paths, optical bounds, SVG/PNG silhouettes at three sizes and weights, JPG and JSX')
} finally {
  await browser?.close()
  await server.close()
}
