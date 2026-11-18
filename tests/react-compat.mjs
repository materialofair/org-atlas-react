import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { chromium } from 'playwright'
import { build, preview } from 'vite'

const [version, archive] = process.argv.slice(2)
if (!version || !archive) throw new Error('Usage: node tests/react-compat.mjs <react-version> <tgz>')
const root = mkdtempSync(join(tmpdir(), 'org-atlas-react-'))
let server, browser
try {
  writeFileSync(join(root, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
  execFileSync('npm', ['install', '--prefer-offline', '--strict-peer-deps', '--no-audit', '--no-fund',
    resolve(archive), 'react@' + version, 'react-dom@' + version], { cwd: root, stdio: 'inherit' })
  writeFileSync(join(root, 'index.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><div id="root"></div><script type="module" src="/main.jsx"></script>')
  writeFileSync(join(root, 'main.jsx'), `
    import React from 'react'
    import { createRoot } from 'react-dom/client'
    import { BackendIcon, BackendOverview, defaultOverviewItems, OrgExplorer, exportIcon, getIconSource } from 'org-atlas-react'
    import staticArt from 'org-atlas-react/backend-overview.svg'
    import 'org-atlas-react/style.css'

    let node
    for (let level = 7; level >= 1; level--) {
      node = { id: String(level), name: '团队 ' + level,
        ...(level % 2 ? {} : { leader: null, description: '   ' }),
        children: node ? [node] : [] }
    }
    document.title = React.version
    window.exportSocket = async () => ({
      jsx: getIconSource('test-socket', 'jsx'),
      type: (await exportIcon('test-socket', 'jpg')).type,
    })
    const second = { id: 'portal', name: '第二个门户', children: [
      { id: 'group', name: '设计系统部', leader: 'Maximilian Alexander von Hohenzollern-Schwarzenberg' }
    ] }
    createRoot(document.querySelector('#root')).render(<>
      <div style={{ width: 80, '--primary': '#164ec0' }}>
        <BackendOverview label="宿主主色" />
        <BackendOverview label="独立配色" color="#aa4477" centerIcon="wafer" items={[...defaultOverviewItems, { icon: 'buddy', label: '伙伴' }]} />
        <img src={staticArt} width="80" alt="静态总图" />
      </div>
      <BackendIcon name="test-socket" label="测试插座" strokeWidth={2} />
      <input aria-label="宿主搜索" />
      <OrgExplorer root={node} />
      <OrgExplorer root={second} title="全球产品平台与技术创新事业部组织门户" toolbar={<button>主题</button>} />
    </>)
  `)
  const options = { root, configFile: false, logLevel: 'error' }
  await build(options)
  server = await preview({ ...options, preview: { host: '127.0.0.1', port: 0 } })
  const channel = process.env.PLAYWRIGHT_CHANNEL || (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined)
  browser = await chromium.launch({ channel })
  const page = await browser.newPage({ viewport: { width: 320, height: 800 } })
  page.setDefaultTimeout(5000)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(server.resolvedUrls.local[0])
  for (const pkg of ['react', 'react-dom']) {
    const installed = JSON.parse(readFileSync(join(root, 'node_modules', pkg, 'package.json'), 'utf8'))
    assert.equal(installed.version, version)
  }
  // React 18.0.0 includes the release commit in its runtime version string.
  assert.equal((await page.title()).split('-')[0], version)
  assert.equal(await page.getByRole('img', { name: '测试插座' }).getAttribute('stroke-width'), '2')
  const download = await page.evaluate(() => window.exportSocket())
  assert.match(download.jsx, /function TestSocketIcon/)
  assert.equal(download.type, 'image/jpeg')
  const firstArt = page.getByRole('img', { name: '宿主主色' })
  const secondArt = page.getByRole('img', { name: '独立配色' })
  assert.equal(await firstArt.evaluate(el => getComputedStyle(el).color), 'rgb(22, 78, 192)')
  assert.equal(await secondArt.locator('text').count(), 6)
  assert.equal(await secondArt.locator('[data-overview-position="middle-left"] title').textContent(), '伙伴')
  assert.equal(await secondArt.locator('[data-overview-position="top"] title').textContent(), '人才')
  assert.equal(await secondArt.evaluate(el => getComputedStyle(el).color), 'rgb(170, 68, 119)')
  assert.notEqual(await firstArt.locator('linearGradient').first().getAttribute('id'),
    await secondArt.locator('linearGradient').first().getAttribute('id'))
  await page.getByRole('img', { name: '静态总图' }).evaluate(img => img.decode())
  const primary = page.getByRole('region', { name: '组织图谱', exact: true })
  const embedded = page.getByRole('region', { name: '全球产品平台与技术创新事业部组织门户' })
  await embedded.getByRole('button', { name: '主题', exact: true }).waitFor()
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    'A long portal title must leave both toolbar buttons on screen')
  const hostInput = page.getByRole('textbox', { name: '宿主搜索' })
  await hostInput.focus()
  await page.keyboard.press('Control+k')
  assert.equal(await page.getByRole('dialog').count(), 0, 'The host owns shortcuts outside the explorer')
  assert.ok(await hostInput.evaluate(input => input === document.activeElement))
  await embedded.getByRole('button', { name: '主题', exact: true }).focus()
  await page.keyboard.press('Control+k')
  const dialog = embedded.getByRole('dialog')
  await dialog.getByRole('textbox').fill('Maximilian')
  const result = dialog.getByRole('button', { name: /设计系统部/ })
  await result.waitFor()
  assert.ok(await result.evaluate(row => {
    const list = row.parentElement
    return list.scrollWidth <= list.clientWidth && row.firstElementChild.clientWidth >= row.clientWidth * .4
  }), 'Long names must leave room for the department and fit the search list')
  await page.keyboard.press('Escape')
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null })
  await page.reload()
  for (let level = 1; level <= 7; level++) {
    await page.getByRole('heading', { level: 1, name: '团队 ' + level }).waitFor()
    assert.equal(await primary.locator('.oe-avatar, .oe-summary, .oe-hero p').count(), 0)
    if (level < 7) await page.getByRole('button', { name: '团队 ' + (level + 1), exact: true }).click()
  }
  for (let level = 6; level >= 1; level--) {
    await page.getByRole('button', { name: '返回上一级' }).click()
    await page.getByRole('heading', { level: 1, name: '团队 ' + level }).waitFor()
  }
  assert.deepEqual(errors, [])
  console.log('PASS · React ' + version + ' · strict install, production build, embedded layout, host shortcuts, canvas fallback, seven-level navigation')
} finally {
  await browser?.close()
  if (server) await server.close()
  rmSync(root, { recursive: true, force: true })
}
