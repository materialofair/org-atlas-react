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
const maskStyles = new URL('../lib/icon-mask.css', import.meta.url)
const themeHelp = ['内联 SVG 随 CSS color 换色。通过外部文件动态换色，加载同目录 icon-mask.css 并使用：', '',
  '<span class="org-icon-mask" style="--org-icon:url(./probe-card.svg); --org-icon-color:var(--primary)" aria-hidden="true"></span>', '',
  '普通 img 请切换 themes/{jade,blue,plum,copper,slate}/{light,dark}/ 下的同名 SVG。', '',
  '如果图标独立传递含义，使用 role="img" 和 aria-label 提供名称。']
await copyFile(maskStyles, new URL('icon-mask.css', out))
const guide = ['# 半导体后道团队图标', '', '图标采用 24 × 24 坐标系。内联 SVG 时颜色跟随 currentColor。', '',
  '[存储器后道职能与选图依据](memory-backend.md) · [西安厂区资料与选图](xian-backend.md) · [三星与 SK 海力士公开职能](samsung-hynix.md) · [长鑫后道职能](cxmt-backend.md) · [美光总部职能](micron-hq.md)', '',
  '后道门户总标使用 [backend-overview.svg](backend-overview.svg)。页头大图使用[带四个职能节点的展开图](artwork/backend-overview.svg)。', '',
  ...themeHelp, '', '外部 img 标签直接选 themes/blue/dark/ 等目录中的具名配色 SVG。', '',
  '| 文件 | 团队图标 | 类别 | 图形含义与适用团队 |', '| --- | --- | --- | --- |']
for (const [key, icon] of Object.entries(backendIcons)) {
  const svg = renderToStaticMarkup(createElement(BackendIcon, { name: key, label: icon.name }))
  await writeFile(new URL(key + '.svg', out), svg + '\n')
  guide.push(`| [${key}.svg](${key}.svg) | ${icon.name} | ${icon.group} | ${icon.description} |`)
}
for (const [accent, palette] of Object.entries(accents)) {
  for (const mode of ['light', 'dark']) {
    const dir = new URL(`themes/${accent}/${mode}/`, out)
    await mkdir(dir, { recursive: true })
    for (const [key, icon] of Object.entries(backendIcons)) {
      const svg = renderToStaticMarkup(createElement(BackendIcon, { name: key, label: icon.name, color: palette[mode] }))
      await writeFile(new URL(key + '.svg', dir), svg + '\n')
    }
  }
}
const productionOut = new URL('../dist/production-icons/', import.meta.url)
for (const [id, company] of Object.entries(productionCollections)) {
  const dir = new URL(id + '/', productionOut)
  await mkdir(dir, { recursive: true })
  await copyFile(maskStyles, new URL('icon-mask.css', dir))
  const sections = []
  for (const section of company.sections) {
    const files = section.icons.map(key => `[${backendIcons[key].name}](${key}.svg)`)
    sections.push(`- ${section.name} · ${files.join('、')}。[职能来源](${section.source})`)
    for (const key of section.icons) await copyFile(new URL(key + '.svg', out), new URL(key + '.svg', dir))
  }
  for (const accent of Object.keys(accents)) {
    for (const mode of ['light', 'dark']) {
      const subdir = `themes/${accent}/${mode}/`
      await mkdir(new URL(subdir, dir), { recursive: true })
      for (const key of company.sections.flatMap(section => section.icons)) {
        const path = subdir + key + '.svg'
        await copyFile(new URL(path, out), new URL(path, dir))
      }
    }
  }
  guide.push('', '## ' + company.name, '', ...sections)
  const rows = company.sections.flatMap(section => section.icons.map(key =>
    `| [${key}.svg](${key}.svg) | ${backendIcons[key].name} | ${backendIcons[key].description} |`))
  const companyGuide = ['# ' + company.name, '', ...themeHelp.map(line => line.replace('./probe-card.svg', './' + company.sections[0].icons[0] + '.svg')), '', ...sections, '', '| 文件 | 图标 | 使用说明 |', '| --- | --- | --- |', ...rows]
  await writeFile(new URL('README.md', dir), companyGuide.join('\n') + '\n')
}
await copyFile(new URL('../LICENSE', import.meta.url), new URL('LICENSE', productionOut))
const index = ['# 后道职能图标专题', '', ...Object.entries(productionCollections).map(([id, company]) =>
  `- [${company.name} 图标与用法](${id}/README.md)`), '',
  '[三星与 SK 海力士调研](samsung-hynix.md) · [长鑫后道调研](cxmt-backend.md) · [美光总部调研](micron-hq.md)']
await writeFile(new URL('README.md', productionOut), index.join('\n') + '\n')
for (const file of ['samsung-hynix.md', 'cxmt-backend.md', 'micron-hq.md']) {
  const source = new URL('../docs/' + file, import.meta.url)
  for (const dest of [out, productionOut]) await copyFile(source, new URL(file, dest))
}
guide.push('', '## 总图配色', '')
for (const [id, palette] of Object.entries(accents)) {
  guide.push(`- ${palette.name} · [浅色](artwork/backend-overview-${id}-light.svg) / [深色](artwork/backend-overview-${id}-dark.svg)`)
}
await writeFile(new URL('README.md', out), guide.join('\n') + '\n')
await copyFile(new URL('../LICENSE', import.meta.url), new URL('LICENSE', out))
await copyFile(new URL('../docs/memory-backend.md', import.meta.url), new URL('memory-backend.md', out))
await copyFile(new URL('../docs/xian-backend.md', import.meta.url), new URL('xian-backend.md', out))
