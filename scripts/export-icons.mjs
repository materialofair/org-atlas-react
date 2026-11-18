import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BackendIcon, backendIcons, productionCollections } from '../dist/lib/index.js'

import { accents } from '../src/accents.js'
import { overviewSvg } from './build-overview.mjs'

const out = new URL('../dist/backend-icons/', import.meta.url)
await mkdir(out, { recursive: true })
const artwork = new URL('artwork/', out)
await mkdir(artwork, { recursive: true })
await copyFile(new URL('../dist/lib/backend-overview.svg', import.meta.url), new URL('backend-overview.svg', artwork))
for (const [name, palette] of Object.entries(accents)) {
  for (const mode of ['light', 'dark']) {
    await writeFile(new URL(`backend-overview-${name}-${mode}.svg`, artwork), overviewSvg(palette[mode]))
  }
}
const guide = ['# 半导体后道团队图标', '', '图标采用 24 × 24 坐标系。内联 SVG 时颜色跟随 currentColor。', '',
  '[存储器后道职能与选图依据](memory-backend.md) · [西安厂区资料与选图](xian-backend.md) · [三星与 SK 海力士公开职能](samsung-hynix.md)', '',
  '后道门户总标使用 [backend-overview.svg](backend-overview.svg)。页头大图使用[带四个职能节点的展开图](artwork/backend-overview.svg)。', '',
  '| 文件 | 团队图标 | 类别 | 图形含义与适用团队 |', '| --- | --- | --- | --- |']
for (const [key, icon] of Object.entries(backendIcons)) {
  const svg = renderToStaticMarkup(createElement(BackendIcon, { name: key, label: icon.name }))
  await writeFile(new URL(key + '.svg', out), svg + '\n')
  guide.push(`| [${key}.svg](${key}.svg) | ${icon.name} | ${icon.group} | ${icon.description} |`)
}
const productionOut = new URL('../dist/production-icons/', import.meta.url)
for (const [id, company] of Object.entries(productionCollections)) {
  const dir = new URL(id + '/', productionOut)
  await mkdir(dir, { recursive: true })
  const sections = []
  for (const section of company.sections) {
    const files = section.icons.map(key => `[${backendIcons[key].name}](${key}.svg)`)
    sections.push(`- ${section.name} · ${files.join('、')}。[职能来源](${section.source})`)
    for (const key of section.icons) await copyFile(new URL(key + '.svg', out), new URL(key + '.svg', dir))
  }
  guide.push('', '## ' + company.name, '', ...sections)
  const rows = company.sections.flatMap(section => section.icons.map(key =>
    `| [${key}.svg](${key}.svg) | ${backendIcons[key].name} | ${backendIcons[key].description} |`))
  const companyGuide = ['# ' + company.name, '', ...sections, '', '| 文件 | 图标 | 使用说明 |', '| --- | --- | --- |', ...rows]
  await writeFile(new URL('README.md', dir), companyGuide.join('\n') + '\n')
}
await copyFile(new URL('../LICENSE', import.meta.url), new URL('LICENSE', productionOut))
await copyFile(new URL('../docs/samsung-hynix.md', import.meta.url), new URL('README.md', productionOut))
guide.push('', '## 总图配色', '')
for (const [id, palette] of Object.entries(accents)) {
  guide.push(`- ${palette.name} · [浅色](artwork/backend-overview-${id}-light.svg) / [深色](artwork/backend-overview-${id}-dark.svg)`)
}
await copyFile(new URL('../docs/samsung-hynix.md', import.meta.url), new URL('samsung-hynix.md', out))
await writeFile(new URL('README.md', out), guide.join('\n') + '\n')
await copyFile(new URL('../LICENSE', import.meta.url), new URL('LICENSE', out))
await copyFile(new URL('../docs/memory-backend.md', import.meta.url), new URL('memory-backend.md', out))
await copyFile(new URL('../docs/xian-backend.md', import.meta.url), new URL('xian-backend.md', out))
