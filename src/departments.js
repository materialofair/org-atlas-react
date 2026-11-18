// Public functions follow Micron Taiwan's Back-End job map. Subteams illustrate the work.
export const jobMap = 'https://tw.micron.com/about/careers/job-map-tch'
export const siteArticle = 'https://tw.micron.com/about/blog/company/events/taiwan-new-facility-supports-hbm3e-ramp-dram-tech-deployment'

function unit(id, name, icon, description, children) {
  return { id, name, icon, description, children }
}

// FAC's six sections are named explicitly in the Back-End section of Micron's Job Map.
export const facilitySections = [
  unit('facility-water', '水务', 'water-systems', '供水与水处理系统的运行维护。'),
  unit('facility-power', '电力', 'power-systems', '厂区供配电与电力系统维护。'),
  unit('facility-gas', '气体与化学品', 'gas-systems', '气体和化学品供应系统的运行维护。'),
  unit('facility-air', '空调', 'air-systems', '空调与空气处理系统运行。'),
  unit('utilities', '系统整合', 'fab-utilities', '整合厂务系统的运行信息与维护需求。'),
  unit('facility-support', '总务', 'support', '协调厂区日常综合服务。'),
]

export const backend = unit('backend', '美光后道封装测试', 'package',
  '按美光台湾公开的封装测试职能浏览，从产能规划、封装与电测，到质量、环安卫和厂务支持。', [
    unit('assembly', '封装（Assembly）', 'package', '维持封装产线稳定，改善设备产出、制程良率与产品质量。', [
      unit('wire-bond', '引线键合', 'bond', '以键合线连接芯片焊盘与封装载体。', [
        unit('wire-production', '键合生产组', undefined, '协调作业班组与机台。', [
          unit('bond-shift', '键合轮班组', 'workcell', undefined, [
            unit('bond-cell', '键合作业单元', undefined)])])]),
      unit('die-attach', '固晶贴装', 'attach', '将裸片定位并固定在载体上。'),
      unit('hbm-integration', '先进封装与 HBM', 'hbm', '美光台中先进封测厂公开介绍了先进探测、封装与测试的整合。', [
        unit('stacking', '三维封装整合', 'stack'), unit('dram-package', 'DRAM 封装验证', 'dram')]),
      unit('singulation', '切单成型', 'dicing'),
      unit('finish-line', '成品后处理', 'finish', undefined, [
        unit('mark', '标记作业', 'finish'), unit('visual', '外观检查', 'optical'), unit('shift-support', '轮班协作', undefined)]),
    ]),
    unit('industrial', '工业工程（IE）', 'industrial', '建立设备产能模型，评估扩产投资与实际产出的差距。', [
      unit('capacity', '产能建模', 'capacity-model', '对照目标负载与机台可用产能。'),
      unit('capex', '设备投资评估', 'planning'), unit('ie-project', '改善项目组', 'project')]),
    unit('operations', '生产制造（MFG）', 'manufacturing', '跟踪在制品、生产进度与出货目标，协调产线资源。', [
      unit('lot-control', '在制品流转', 'lot-flow'), unit('scheduling', '投产排程', 'planning'),
      unit('production-control', '现场协调', 'coordination')]),
    unit('integration', '制程整合（PIE）', 'process-integration', '将新产品流程导入量产，协调制程异常调查和良率改善。', [
      unit('transfer', '试产转量产', 'process-transfer'), unit('yield', '良率改善', 'yield-map'), unit('new-product', '新品导入', 'npi')]),
    unit('test-solutions', '产品工程测试（TSE）', 'test-solutions', '围绕产品特性开发测试方案，评估覆盖范围与量产测试效率。', [
      unit('test-coverage', '测试覆盖评估', 'test-coverage'), unit('char-lab', '产品电性表征', 'characterization')]),
    unit('test', '测试（Test）', 'ate', '执行产品测试，分析失效模式与测试良率，推动量产改善。', [
      unit('final-test', '成品电测', 'ate'), unit('memory-binning', '性能分档', 'binning'), unit('slt', '系统验证', 'slt')]),
    unit('quality', '质量（QE）', 'quality-engineering', '跟进质量异常和客户反馈，确认不合格品得到妥善处置。', [
      unit('quality-release', '质量放行评审', 'quality-release'), unit('failure-lab', '失效分析', 'analysis'), unit('customer-qual', '客户质量支持', 'support')]),
    unit('site-ehs', '环境安全卫生（EHS）', 'ehs', '识别现场作业风险，协调安全、职业健康和环境管理。', [
      unit('risk', '现场风险评估', 'ehs'), unit('drills', '教育训练与演练', 'team')]),
    unit('facility-services', '厂务运营工程（FAC）', 'facilities', '管理水、电、气化、空调、系统整合与总务六个方向，保障厂务系统稳定运行。', facilitySections),
  ])

export const root = unit('micron-tw', '美光台湾', 'org-unit', '本目录收录美光台湾公开职类中的后道封装测试范围。', [backend])

// Compact fixtures exercise short and uneven trees using the same quality and test functions.
const twoLevels = unit('lab', '质量分析示例', 'quality-engineering', undefined, [
  unit('cross-section', '截面分析部', 'analysis'),
  unit('acoustic', '先进封装声学扫描与无损检测部', 'analysis', '观察封装内部界面与分层情况。'),
])
const threeLevels = unit('test-center', '测试职能示例', 'ate', undefined, [
  unit('test-production', '量产测试部', 'ate', undefined, [
    unit('ambient', '常温测试组', 'team'), unit('hot-cold', '高低温测试组', 'ate')]),
  unit('test-quality', '测试质量部', 'quality-engineering'),
])
const samples = new Map([['2', twoLevels], ['3', threeLevels], ['7', root]])
export function demoDepartments(levels) {
  const selected = samples.get(levels) ?? backend
  const byId = new Map()
  function visit(node) {
    byId.set(node.id, node)
    node.children?.forEach(visit)
  }
  visit(selected)
  return { root: selected, byId, rootLevel: selected === backend ? 2 : 1, title: '美光后道 · 门户示例' }
}
