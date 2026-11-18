import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { chromium } from 'playwright'
import { transformWithOxc } from 'vite'

const base = process.env.ORG_DEMO_URL || 'http://127.0.0.1:5188'
const channel = process.env.PLAYWRIGHT_CHANNEL || (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined)
const browser = await chromium.launch({ channel })
try {
  const page = await browser.newPage({ colorScheme: 'light', permissions: ['clipboard-read', 'clipboard-write'] })
  await page.goto(new URL('?view=icons&collection=lifecycle', base).href)
  assert.equal(await page.getByRole('button', { name: /芯片全流程/, pressed: true }).count(), 1)
  const lifecycleIds = await page.locator('.fab-icon-grid code').allTextContents()
  assert.equal(new Set(lifecycleIds).size, lifecycleIds.length)
  const milestones = ['chip-spec', 'rtl-design', 'tapeout', 'photomask', 'wafer-etch', 'probe', 'bond', 'ate', 'silicon-bringup', 'quality-release', 'outbound-logistics', 'delivery-receipt']
  let last = -1
  for (const key of milestones) {
    const index = lifecycleIds.indexOf(key)
    assert.ok(index > last, key)
    last = index
  }
  await page.getByRole('searchbox').fill('GDSII')
  await page.getByRole('button', { name: '流片数据交付', exact: true }).click()
  await page.getByRole('dialog', { name: '流片数据交付' }).waitFor()
  console.log('PASS · 芯片全流程专题、设计到签收顺序、GDSII 搜索及导出入口')
  await page.goto(new URL('?view=icons&collection=process', base).href)
  assert.equal(await page.getByRole('button', { name: /后道制造工序/, pressed: true }).count(), 1)
  const stationIds = await page.locator('.fab-icon-grid code').allTextContents()
  assert.equal(stationIds.length, 29)
  assert.equal(new Set(stationIds).size, stationIds.length)
  for (const key of ['dicing', 'package-singulation', 'lead-plating', 'ball-attach', 'dry-pack']) {
    assert.ok(stationIds.includes(key), key)
  }
  await page.getByRole('searchbox').fill('C-SAM')
  assert.deepEqual(await page.locator('.fab-icon-grid code').allTextContents(), ['acoustic-microscopy'])
  await page.getByRole('button', { name: '扫描声学显微检测', exact: true }).click()
  await page.getByRole('dialog', { name: '扫描声学显微检测' }).waitFor()
  console.log('PASS · 工序专题直达、29 个唯一工位、C-SAM 检索与导出面板')
  await page.goto(new URL('?view=icons&collection=kyec', base).href)
  assert.equal(await page.locator('.fab-icon-grid article').count(), 21)
  const trigger = page.getByRole('button', { name: '影像传感器测试', exact: true })
  await trigger.focus()
  await trigger.press('Enter')
  const panel = page.getByRole('dialog', { name: '影像传感器测试' })
  await panel.waitFor()
  await panel.getByLabel('尺寸').selectOption('256')
  await panel.getByLabel('线宽').selectOption('2')
  async function download(format) {
    await panel.getByRole('button', { name: format, exact: true }).click()
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      panel.getByRole('button', { name: '下载 ' + format }).click(),
    ])
    assert.equal(download.suggestedFilename(), 'cis-test-256.' + format.toLowerCase())
    return readFile(await download.path())
  }
  const svg = (await download('SVG')).toString()
  const attributes = await page.evaluate(source => {
    const root = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement
    return [root.localName, root.getAttribute('width'), root.getAttribute('stroke'), root.getAttribute('stroke-width'), root.querySelector('path').getAttribute('d')]
  }, svg)
  assert.deepEqual(attributes.slice(0, 4), ['svg', '256', 'currentColor', '2'])
  assert.equal(attributes[4], await panel.locator('.fab-export-preview path').getAttribute('d'))

  async function pixels(bytes, mime) {
    return page.evaluate(async ({ data, mime }) => {
      const img = new Image()
      img.src = 'data:' + mime + ';base64,' + data
      await img.decode()
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      // On the top edge of the pixel array and far outside the glyph.
      return [img.width, img.height, ...ctx.getImageData(0, 0, 1, 1).data, ...ctx.getImageData(100, 117, 1, 1).data]
    }, { data: bytes.toString('base64'), mime })
  }
  const png = await download('PNG')
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
  assert.deepEqual(await pixels(png, 'image/png'), [256, 256, 0, 0, 0, 0, 48, 107, 84, 255])
  await panel.getByRole('button', { name: 'JPG', exact: true }).click()
  await panel.getByLabel('JPG 底色').fill('#102030')
  await panel.getByLabel('自定义图标颜色').fill('#55ccaa')
  const jpg = await download('JPG')
  assert.deepEqual([...jpg.subarray(0, 3)], [255, 216, 255])
  const result = await pixels(jpg, 'image/jpeg')
  const expected = [256, 256, 16, 32, 48, 255, 85, 204, 170, 255]
  result.forEach((value, i) => assert.ok(Math.abs(value - expected[i]) <= 3))
  const jsx = (await download('JSX')).toString()
  const transformed = await transformWithOxc(jsx, 'CisTestIcon.jsx', { jsx: { runtime: 'classic' } })
  const source = transformed.code.replace(/(['"])react\1/g, JSON.stringify(import.meta.resolve('react')))
  const { default: Component } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'))
  const markup = renderToStaticMarkup(React.createElement(Component, { label: 'CIS' }))
  assert.match(markup, /stroke="#55ccaa"/)
  assert.match(markup, /aria-label="CIS"/)
  assert.ok(markup.includes(attributes[4]))
  await panel.getByRole('button', { name: '复制代码' }).click()
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), jsx)
  await page.keyboard.press('Escape')
  assert.ok(await trigger.evaluate(el => el === document.activeElement))

  await page.emulateMedia({ colorScheme: 'dark' })
  await page.setViewportSize({ width: 320, height: 640 })
  await trigger.click()
  assert.equal(await panel.getByLabel('自定义图标颜色').inputValue(), '#a0d7b5')
  assert.ok(await panel.evaluate(el => el.scrollWidth <= el.clientWidth))
  await panel.getByRole('button', { name: 'JPG', exact: true }).click()
  assert.equal(await panel.getByLabel('JPG 底色').inputValue(), '#1b211e')
  await panel.getByRole('button', { name: '关闭' }).click()
  console.log('PASS · KYEC 专题、四种真实下载、透明与指定底色像素、JSX 渲染与复制、键盘焦点、320px 深色布局')
} finally {
  await browser.close()
}
