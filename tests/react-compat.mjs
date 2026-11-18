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
  writeFileSync(join(root, 'index.html'), '<div id="root"></div><script type="module" src="/main.jsx"></script>')
  writeFileSync(join(root, 'main.jsx'), `
    import React from 'react'
    import { createRoot } from 'react-dom/client'
    import { OrgExplorer } from 'org-atlas-react'
    import 'org-atlas-react/style.css'

    let node
    for (let level = 7; level >= 1; level--) {
      node = { id: String(level), name: '团队 ' + level,
        ...(level % 2 ? {} : { leader: null, description: '   ' }),
        children: node ? [node] : [] }
    }
    document.title = React.version
    createRoot(document.querySelector('#root')).render(<OrgExplorer root={node} />)
  `)
  const options = { root, configFile: false, logLevel: 'error' }
  await build(options)
  server = await preview({ ...options, preview: { host: '127.0.0.1', port: 0 } })
  const channel = process.env.PLAYWRIGHT_CHANNEL || (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined)
  browser = await chromium.launch({ channel })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(server.resolvedUrls.local[0])
  for (const pkg of ['react', 'react-dom']) {
    const installed = JSON.parse(readFileSync(join(root, 'node_modules', pkg, 'package.json'), 'utf8'))
    assert.equal(installed.version, version)
  }
  // React 18.0.0 includes the release commit in its runtime version string.
  assert.equal((await page.title()).split('-')[0], version)
  for (let level = 1; level <= 7; level++) {
    await page.getByRole('heading', { level: 1, name: '团队 ' + level }).waitFor()
    assert.equal(await page.locator('.oe-avatar, .oe-summary, .oe-hero p').count(), 0)
    if (level < 7) await page.getByRole('button', { name: '团队 ' + (level + 1), exact: true }).click()
  }
  for (let level = 6; level >= 1; level--) {
    await page.getByRole('button', { name: '返回上一级' }).click()
    await page.getByRole('heading', { level: 1, name: '团队 ' + level }).waitFor()
  }
  assert.deepEqual(errors, [])
  console.log('PASS · React ' + version + ' · strict install, production build, seven-level navigation')
} finally {
  await browser?.close()
  if (server) await server.close()
  rmSync(root, { recursive: true, force: true })
}
