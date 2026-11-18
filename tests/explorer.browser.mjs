import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import { demoDepartments, backend, root } from '../src/departments.js'

const demoUrl = process.env.ORG_DEMO_URL || 'http://127.0.0.1:5188'
const companyUrl = new URL('?levels=7', demoUrl).href
const chromeChannel = process.env.PLAYWRIGHT_CHANNEL ||
  (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined)

function seventhLevelPath(node, ancestors = []) {
  const path = [...ancestors, node]
  if (path.length === 7) return path
  for (const child of node.children ?? []) {
    const result = seventhLevelPath(child, path)
    if (result) return result
  }
}

assert.equal(backend.children.length, 9, 'Micron Taiwan lists nine back-end functions')
const branch = seventhLevelPath(root)
assert.equal(branch.length, 7)

const browser = await chromium.launch({ channel: chromeChannel })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' })
  page.setDefaultTimeout(5000)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))

  async function assertSelected(node) {
    await page.getByRole('heading', { level: 1, name: node.name, exact: true }).waitFor()
    const profile = page.locator('.oe-hero')
    if (node.description?.trim()) await profile.getByText(node.description, { exact: true }).waitFor()
    else assert.equal(await profile.locator('p').count(), 0)
    if (node.leader?.trim()) await profile.getByText(node.leader, { exact: true }).waitFor()
    else assert.equal(await profile.getByText('负责人', { exact: true }).count(), 0)
  }

  async function measureCards() {
    const cards = page.locator('.oe-cards [data-slot=card]')
    await cards.first().waitFor()
    return cards.evaluateAll(items => items.map(card => {
      const box = card.getBoundingClientRect()
      const footer = card.querySelector('.oe-card-foot')?.getBoundingClientRect()
      return { height: box.height, footerInset: footer ? box.bottom - footer.bottom : null }
    }))
  }

  function assertAligned(values, label) {
    assert.ok(Math.max(...values) - Math.min(...values) <= 1, label + ': ' + values.join(', '))
  }

  const portalBranch = branch.slice(1)
  await page.goto(new URL('#/assembly', demoUrl).href)
  await assertSelected(portalBranch[1])
  await page.getByRole('link', { name: '后道团队图标库' }).click()
  await page.getByRole('heading', { name: '后道团队图标库' }).waitFor()
  await page.getByRole('button', { name: /美光 Micron/, pressed: true }).waitFor()
  await page.getByRole('searchbox').fill('台湾')
  const taiwanKeys = await page.locator('.fab-icon-grid code').allTextContents()
  for (const id of ['risk-fmea', 'smart-factory-ai', 'hbm', 'probe', 'it-team', 'test-solutions']) {
    assert.ok(taiwanKeys.includes(id), id)
  }
  assert.equal(new Set(taiwanKeys).size, taiwanKeys.length)
  await page.getByRole('searchbox').fill('')
  await page.getByRole('button', { name: /全部图标/ }).click()
  const catalog = await page.locator('.fab-icon-grid article').evaluateAll(cards =>
    cards.map(card => ({ key: card.querySelector('code').textContent, icon: card.querySelector('svg')?.dataset.backendIcon,
      described: !!card.querySelector('p').textContent.trim() })))
  assert.equal(catalog.length, 158)
  assert.equal(new Set(catalog.map(item => item.key)).size, catalog.length)
  assert.ok(catalog.every(item => item.key === item.icon && item.described))
  assert.equal(catalog.filter(item => ['org-unit', 'team', 'project', 'support', 'coordination', 'workcell'].includes(item.key)).length, 6)
  // Verify every glyph, including older sets, against the resolved accent in all ten themes.
  for (const mode of ['light', 'dark']) {
    await page.getByRole('combobox', { name: '显示主题' }).selectOption(mode)
    for (const accent of ['jade', 'blue', 'plum', 'copper', 'slate']) {
      await page.getByRole('combobox', { name: '主题色', exact: true }).selectOption(accent)
      const expected = await page.locator('.fab-accent-picker').evaluate(el => getComputedStyle(el, '::before').backgroundColor)
      const strokes = await page.locator('.fab-sample path').evaluateAll(paths => [...new Set(paths.map(path => getComputedStyle(path).stroke))])
      assert.deepEqual(strokes, [expected])
    }
  }
  await page.getByRole('combobox', { name: '显示主题' }).selectOption('system')
  await page.getByRole('combobox', { name: '主题色', exact: true }).selectOption('jade')
  function checkIcon(node) {
    if (node.icon) assert.ok(catalog.some(item => item.key === node.icon), node.name)
    node.children?.forEach(checkIcon)
  }
  checkIcon(root)

  const iconSearch = page.getByRole('searchbox', { name: '搜索团队图标' })
  for (const [query, key] of [['TSE', 'test-solutions'], ['底填', 'underfill'], ['FAC', 'facilities'], ['通用组织', 'team'], ['测试覆盖', 'test-coverage'], ['IT团队', 'it-team'], ['运营团队', 'operations-team']]) {
    await iconSearch.fill(query)
    await page.locator('.fab-icon-grid article').filter({ has: page.getByText(key, { exact: true }) }).waitFor()
  }
  for (const [name, query] of [[/三星 TSP/, 'CoA'], [/SK 海力士/, 'TAT'], [/长鑫存储 CXMT/, '晶圆级老化'], [/美光 Micron/, 'DOE'], [/京元电子/, 'CIS']]) {
    await page.getByRole('button', { name }).click()
    await iconSearch.fill(query)
    assert.equal(await page.locator('.fab-icon-grid article').count(), 1)
    assert.match(await page.getByRole('link', { name: /职能来源/ }).getAttribute('href'), /^https:/)
  }
  await page.getByRole('button', { name: /全部图标/ }).click()
  await iconSearch.fill('no-such-symbol')
  await page.getByRole('status').waitFor()
  await iconSearch.fill('')
  assert.equal(await page.locator('.fab-icon-grid article').count(), catalog.length)
  await page.getByRole('link', { name: '返回组织目录' }).click()
  await assertSelected(portalBranch[1])
  console.log('PASS · 158 枚图标、职能搜索与说明、部门映射、图鉴返回当前部门')
  await page.goto(demoUrl)
  await assertSelected(portalBranch[0])
  await page.getByText('二级部门', { exact: true }).waitFor()
  assert.equal(await page.getByRole('link', { name: '返回上一级' }).count(), 0)
  assert.deepEqual(await page.locator('.oe-card h3').allTextContents(), portalBranch[0].children.map(n => n.name))
  const wideArt = page.locator('.fab-overview-wide')
  await wideArt.waitFor()
  const accentSelect = page.getByRole('combobox', { name: '主题色', exact: true })
  const tones = new Set()
  for (const value of ['blue', 'plum', 'copper', 'slate', 'jade']) {
    await accentSelect.selectOption(value)
    const expected = await wideArt.evaluate(el => getComputedStyle(el).color)
    assert.deepEqual(await page.locator('.oe-card .oe-symbol path').evaluateAll(paths =>
      [...new Set(paths.map(path => getComputedStyle(path).stroke))]), [expected])
    tones.add(await wideArt.locator('stop').first().evaluate(stop => getComputedStyle(stop).stopColor))
  }
  assert.equal(tones.size, 5)
  assert.equal(await page.locator('.oe-brand-mark svg').getAttribute('data-backend-icon'), 'backend-overview')
  assert.equal(await page.locator('.oe-card').filter({ has: page.getByRole('link', { name: '封装（Assembly）', exact: true }) }).locator('.oe-symbol svg').getAttribute('data-backend-icon'), 'package')
  assert.deepEqual(await page.locator('.oe-card .oe-symbol svg').evaluateAll(icons => icons.map(icon => icon.dataset.backendIcon)),
    portalBranch[0].children.map(node => node.icon))
  for (const [i, node] of portalBranch.slice(1).entries()) {
    await page.getByRole('heading', { name: node.name, exact: true }).getByRole('link').click()
    await assertSelected(node)
    await page.locator('.oe-badge').getByText(['三级部门','四级部门','五级部门','六级部门','七级部门'][i]).waitFor()
  }
  await page.reload()
  await assertSelected(portalBranch.at(-1))
  await page.getByRole('navigation', { name: '部门路径' }).getByRole('link', { name: portalBranch[0].name }).click()
  await assertSelected(portalBranch[0])
  await page.getByRole('button', { name: /搜索部门/ }).click()
  const finder = page.getByRole('dialog')
  await finder.getByRole('textbox').fill('晶圆加工部')
  await finder.getByText('没有找到匹配的部门或负责人').waitFor()
  await finder.getByRole('textbox').fill(portalBranch.at(-1).name)
  await finder.getByRole('link').click()
  await assertSelected(portalBranch.at(-1))
  await page.goto(new URL('#/wafer-services', demoUrl).href)
  await assertSelected(portalBranch[0])
  for (const [id, childIcon] of [['wire-bond', 'org-unit'], ['bond-shift', 'team']]) {
    await page.goto(new URL('#/' + id, demoUrl).href)
    await page.locator('.oe-card .oe-symbol svg[data-backend-icon="' + childIcon + '"]').waitFor()
  }
  console.log('PASS · 默认部门门户、二至七级标识、部门内搜索、刷新与越界链接回退')

  for (const width of [768, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(new URL('#/backend', companyUrl).href)
    const metrics = await measureCards()
    assertAligned(metrics.map(m => m.height), 'Homepage card heights at ' + width)
    assertAligned(metrics.map(m => m.footerInset), 'Homepage footers at ' + width)
    await page.goto(new URL('#/assembly', companyUrl).href)
    const mixed = await measureCards()
    assertAligned(mixed.map(m => m.height), 'Mixed card heights at ' + width)
    await page.getByRole('button', { name: '列表视图' }).click()
    assertAligned((await measureCards()).map(m => m.height), 'List row heights at ' + width)
    await page.getByRole('button', { name: '卡片视图' }).click()
    await page.goto(new URL('#/finish-line', companyUrl).href)
    const sparse = await measureCards()
    assertAligned(sparse.map(m => m.height), 'Name-only card heights at ' + width)
    assert.ok(sparse[0].height < mixed[0].height, 'Name-only groups should stay compact')
  }
  console.log('PASS · 首页、混排卡片与列表同组等高，页脚对齐，纯名称组保持紧凑')

  await page.goto(new URL('#/backend', companyUrl).href)
  const waferCard = page.getByRole('heading', { name: '工业工程（IE）' }).getByRole('link')
  await waferCard.focus()
  await page.keyboard.press('Enter')
  await page.getByRole('heading', { name: '工业工程（IE）', level: 1 }).waitFor()
  await page.getByRole('link', { name: '返回上一级' }).press('Enter')
  await waferCard.waitFor()
  assert.ok(await waferCard.evaluate(link => link === document.activeElement), 'Return focus to the department just visited')
  await page.keyboard.press('Tab')
  assert.equal(await page.locator(':focus').textContent(), '生产制造（MFG）')

  const leaf = branch.at(-1)
  const parent = branch.at(-2)
  await page.goto(companyUrl)
  await assertSelected(root)

  assert.equal(await page.locator('.oe-cards [data-slot=card]').count(), root.children.length)
  await page.getByRole('button', { name: '列表视图' }).click()
  assert.equal(await page.getByRole('button', { name: '列表视图' }).getAttribute('aria-pressed'), 'true')
  await page.getByRole('button', { name: '卡片视图' }).click()
  assert.equal(await page.getByRole('button', { name: '卡片视图' }).getAttribute('aria-pressed'), 'true')

  for (const node of branch.slice(1)) {
    await page.getByRole('heading', { name: node.name, exact: true }).getByRole('link').click()
    await assertSelected(node)
  }
  await page.getByText('七级部门', { exact: true }).waitFor()

  const deepLink = page.url()
  await page.reload()
  await assertSelected(leaf)
  await page.goBack()
  await assertSelected(parent)
  await page.goForward()
  await assertSelected(leaf)
  for (const node of branch.slice(0, -1).reverse()) {
    await page.getByRole('link', { name: '返回上一级' }).click()
    await assertSelected(node)
  }
  for (const unit of backend.children) {
    await page.goto(new URL('#/' + unit.id, companyUrl).href)
    await assertSelected(unit)
    await page.getByRole('link', { name: '美光职类地图' }).waitFor()
  }
  console.log('PASS · 九个公开职能、七级示例、逐级返回、刷新与浏览器历史')

  const search = page.getByRole('button', { name: /搜索部门/ })
  await search.click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('textbox').fill(leaf.name)
  await dialog.getByRole('link').filter({ hasText: leaf.name }).click()
  await assertSelected(leaf)
  assert.equal(page.url(), deepLink)
  console.log('PASS · 按七级团队名称搜索并定位')

  const theme = page.getByRole('combobox', { name: '显示主题' })
  const headingColor = () => page.getByRole('heading', { level: 1 }).evaluate(
    element => getComputedStyle(element).color,
  )
  await theme.selectOption('light')
  const light = await headingColor()
  await theme.selectOption('dark')
  const dark = await headingColor()
  assert.notEqual(light, dark, 'Theme must change rendered text color')
  await page.reload()
  await assertSelected(leaf)
  assert.equal(await theme.inputValue(), 'dark')
  assert.equal(await headingColor(), dark)
  await theme.selectOption('system')
  assert.equal(await headingColor(), light)
  await page.emulateMedia({ colorScheme: 'dark' })
  assert.equal(await headingColor(), dark)
  console.log('PASS · 明暗主题、刷新持久化、系统主题响应')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(deepLink)
  await assertSelected(leaf)
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    'The seven-level breadcrumb must fit within the mobile viewport')
  const breadcrumb = page.getByRole('navigation', { name: '部门路径' })
  await breadcrumb.getByRole('link', { name: branch[2].name, exact: true }).click()
  await assertSelected(branch[2])
  await page.goto(new URL('#/assembly', companyUrl).href)
  await page.getByRole('combobox', { name: '切换同级部门' }).selectOption('industrial')
  await page.getByRole('heading', { name: '工业工程（IE）', level: 1 }).waitFor()
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.getByRole('navigation', { name: '同级部门' }).getByRole('link', { name: '封装（Assembly）' }).click()
  const finishing = branch[2].children.find(node => node.id === 'finish-line')
  const singulation = branch[2].children.find(node => node.id === 'singulation')
  const singulationCard = page.locator('[data-slot=card]').filter({ has: page.getByRole('heading', { name: singulation.name }) })
  assert.equal(await singulationCard.locator('.oe-summary').count(), 0)
  assert.equal(await singulationCard.locator('.oe-leader').count(), 0)
  await page.getByRole('heading', { name: finishing.name }).getByRole('link').click()
  await assertSelected(finishing)
  for (const view of ['卡片视图', '列表视图']) {
    await page.getByRole('button', { name: view }).click()
    assert.equal(await page.locator('[data-slot=card]').count(), finishing.children.length)
    assert.equal(await page.locator('[data-slot=card] :is(.oe-summary, .oe-card-foot)').count(), 0)
  }
  await search.click()
  const nameOnly = finishing.children[0]
  await dialog.getByRole('textbox').fill(nameOnly.name)
  const result = dialog.getByRole('link').filter({ hasText: nameOnly.name })
  assert.equal(await result.locator('.oe-result-leader').count(), 0)
  await result.click()
  await assertSelected(nameOnly)
  await page.setViewportSize({ width: 390, height: 844 })
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  console.log('PASS · 混排、纯名称网格和列表、缺资料搜索与详情、桌面和手机同级导航')

  const twoLevels = new URL('?levels=2', demoUrl).href
  await page.goto(twoLevels)
  await page.getByRole('heading', { name: '截面分析部' }).getByRole('link').click()
  await page.getByText('二级部门', { exact: true }).waitFor()
  await page.locator('.oe-leaf').waitFor()
  assert.equal(await page.locator('[data-slot=card]').count(), 0)
  const picker = page.getByRole('combobox', { name: '切换同级部门' })
  await picker.focus()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  assert.ok(await picker.evaluate(select => select.matches(':focus-visible')))
  await picker.selectOption('acoustic')
  await page.getByRole('heading', { level: 1, name: '先进封装声学扫描与无损检测部' }).waitFor()

  for (const width of [320, 390, 768, 960]) {
    await page.setViewportSize({ width, height: 844 })
    const geometry = await picker.evaluate(select => {
      const box = select.getBoundingClientRect()
      const icon = select.nextElementSibling.getBoundingClientRect()
      return {
        inset: box.right - icon.right,
        centerOffset: (box.top + box.height / 2) - (icon.top + icon.height / 2),
        textGap: parseFloat(getComputedStyle(select).paddingInlineEnd) - (box.right - icon.left),
        height: box.height,
        fits: document.documentElement.scrollWidth <= innerWidth,
      }
    })
    assert.equal(geometry.inset, 12)
    assert.ok(Math.abs(geometry.centerOffset) < 1)
    assert.ok(geometry.textGap >= 8)
    assert.ok(geometry.fits)
    assert.ok(geometry.height >= (width <= 610 ? 44 : 40))
  }
  await page.reload()
  await page.getByRole('heading', { level: 1, name: '先进封装声学扫描与无损检测部' }).waitFor()
  await page.getByRole('link', { name: '返回上一级' }).click()
  await page.getByRole('heading', { level: 1, name: '质量分析示例' }).waitFor()
  await search.click()
  await dialog.getByRole('textbox').fill('截面分析部')
  await dialog.getByRole('link').click()
  await page.locator('.oe-leaf').waitFor()
  console.log('PASS · 二级组织、长名称、键盘焦点及四种宽度的箭头留白')

  await page.goto(new URL('?levels=3', companyUrl).href)
  await page.getByRole('heading', { name: '量产测试部' }).getByRole('link').click()
  await page.getByRole('heading', { name: '高低温测试组' }).getByRole('link').click()
  await page.getByText('三级部门', { exact: true }).waitFor()
  await page.locator('.oe-leaf').waitFor()
  await page.getByRole('link', { name: '返回上一级' }).click()
  await picker.selectOption('test-quality')
  await page.getByText('二级部门', { exact: true }).waitFor()
  await page.locator('.oe-leaf').waitFor()
  await search.click()
  await dialog.getByRole('textbox').fill('高低温测试组')
  await dialog.getByRole('link').click()
  await page.getByText('三级部门', { exact: true }).waitFor()
  await page.getByRole('navigation', { name: '部门路径' }).getByRole('link', { name: '测试职能示例' }).click()
  await page.getByRole('heading', { level: 1, name: '测试职能示例' }).waitFor()
  console.log('PASS · 三级组织，二级、三级分支末级混排、搜索和返回')
  await page.getByRole('link', { name: '进入西安厂区' }).click()
  await page.getByRole('heading', { name: '美光西安封装测试', level: 1 }).waitFor()
  assert.equal(await page.locator('.oe-card h3').count(), 8)
  await page.locator('.fab-overview-art svg[data-backend-icon="backend-overview"]').waitFor({ state: 'attached' })
  await page.getByRole('heading', { name: '工程与设备岗位' }).getByRole('link').click()
  await page.getByRole('heading', { name: '设备与自动化工程' }).getByRole('link').click()
  await page.getByRole('heading', { name: '停机数据分析' }).getByRole('link').click()
  await page.reload()
  await page.getByRole('heading', { name: '停机数据分析', level: 1 }).waitFor()
  assert.match(await page.locator('.fab-footer span a').getAttribute('href'), /bysjy/)
  await page.getByRole('link', { name: '后道团队图标库' }).click()
  await page.getByRole('button', { name: /美光 Micron/, pressed: true }).waitFor()
  const micronKeys = await page.locator('.fab-icon-grid code').allTextContents()
  assert.equal(new Set(micronKeys).size, micronKeys.length)
  for (const node of demoDepartments('7').byId.values()) {
    assert.ok(micronKeys.includes(node.icon ?? (node.children?.length ? 'org-unit' : 'team')), node.name)
  }
  for (const site of ['xian', 'micron-hq']) {
    for (const node of demoDepartments(undefined, site).byId.values()) {
      if (node.icon) assert.ok(micronKeys.includes(node.icon), site + ': ' + node.icon)
    }
  }
  for (const key of ['it-team', 'factory-software', 'data-pipeline', 'industrial-iot', 'operations-team', 'ops-dispatch', 'shift-roster', 'ops-kpi']) {
    assert.ok(micronKeys.includes(key), key)
  }
  await page.getByRole('button', { name: /全部图标/ }).click()
  assert.equal(await page.locator('.fab-icon-grid article').count(), catalog.length)
  await page.getByRole('button', { name: /美光 Micron/ }).click()
  assert.equal(await page.locator('.fab-icon-grid article').count(), micronKeys.length)
  await page.getByRole('searchbox').fill('QMS')
  await page.getByRole('heading', { name: '质量管理体系', exact: true }).waitFor()
  await page.getByRole('searchbox').fill('PSRG')
  await page.getByRole('heading', { name: '等离子研磨' }).waitFor()
  await page.getByRole('link', { name: '返回组织目录' }).click()
  await page.getByRole('heading', { name: '停机数据分析', level: 1 }).waitFor()
  await page.getByRole('link', { name: '进入台湾门户' }).click()
  await assertSelected(backend)
  console.log('PASS · 西安厂区切换、多级岗位、来源、刷新、图标检索与返回')
  await page.getByRole('link', { name: '进入美光总部' }).click()
  await page.getByRole('heading', { name: '美光总部 · 后道职能', level: 1 }).waitFor()
  assert.equal(await page.locator('.oe-card h3').count(), 6)
  await page.getByRole('heading', { name: 'TSE · 关键设备组' }).getByRole('link').click()
  await page.getByRole('heading', { name: '探针卡验证' }).getByRole('link').click()
  await page.reload()
  await page.getByRole('heading', { name: '探针卡验证', level: 1 }).waitFor()
  assert.match(await page.locator('.fab-footer span a').getAttribute('href'), /pid=44281038/)
  await page.getByRole('link', { name: '后道团队图标库' }).click()
  await page.getByRole('button', { name: /美光 Micron/, pressed: true }).waitFor()
  assert.equal(await page.locator('.fab-icon-grid article').count(), micronKeys.length)
  await page.getByRole('link', { name: '返回组织目录' }).click()
  await page.getByRole('heading', { name: '探针卡验证', level: 1 }).waitFor()
  console.log('PASS · 美光总部入口、六组职责、子项证据、专题图标库与返回')
  for (const legacy of ['xian', 'micron-hq']) {
    await page.goto(new URL('?levels=7&view=icons&collection=' + legacy + '#/backend', demoUrl).href)
    await page.getByRole('button', { name: /美光 Micron/, pressed: true }).waitFor()
    assert.equal(new URL(page.url()).searchParams.get('collection'), 'micron')
    assert.equal(new URL(page.url()).hash, '#/backend')
    assert.equal(await page.getByRole('button', { name: /西安示例/ }).count(), 0)
  }
  assert.deepEqual(errors, [])
  console.log('PASS · 手机直达七级、面包屑返回、无页面运行时错误')
} finally {
  await browser.close()
}
