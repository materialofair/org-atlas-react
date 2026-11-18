import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BackendIcon, backendIcons } from '../dist/lib/index.js'

const out = new URL('../dist/backend-icons/', import.meta.url)
await mkdir(out, { recursive: true })
const artwork = new URL('artwork/', out)
await mkdir(artwork, { recursive: true })
await copyFile(new URL('../lib/backend-overview.svg', import.meta.url), new URL('backend-overview.svg', artwork))
const guide = ['# 半导体后道团队图标', '', '图标采用 24 × 24 坐标系。内联 SVG 时颜色跟随 currentColor。', '',
  '[存储器后道职能与选图依据](memory-backend.md) · [西安厂区资料与选图](xian-backend.md)', '',
  '后道门户总标使用 [backend-overview.svg](backend-overview.svg)。页头大图使用[带四个职能节点的展开图](artwork/backend-overview.svg)。', '',
  '| 文件 | 团队图标 | 类别 | 图形含义与适用团队 |', '| --- | --- | --- | --- |']
for (const [key, icon] of Object.entries(backendIcons)) {
  const svg = renderToStaticMarkup(createElement(BackendIcon, { name: key, label: icon.name }))
  await writeFile(new URL(key + '.svg', out), svg + '\n')
  guide.push(`| [${key}.svg](${key}.svg) | ${icon.name} | ${icon.group} | ${icon.description} |`)
}
await writeFile(new URL('README.md', out), guide.join('\n') + '\n')
await copyFile(new URL('../LICENSE', import.meta.url), new URL('LICENSE', out))
await copyFile(new URL('../docs/memory-backend.md', import.meta.url), new URL('memory-backend.md', out))
await copyFile(new URL('../docs/xian-backend.md', import.meta.url), new URL('xian-backend.md', out))
