// The job map describes responsibilities. The portal also uses generic symbols for illustrative subteams.
export const jobMap = 'https://tw.micron.com/about/careers/job-map-tch'
export const siteArticle = 'https://tw.micron.com/about/blog/company/events/taiwan-new-facility-supports-hbm3e-ramp-dram-tech-deployment'
const portalGuide = 'https://github.com/materialofair/org-atlas-react/blob/main/docs/memory-backend.md'

export const taiwanSections = [
  { name: '台湾 · 工业工程与生产', source: jobMap,
    icons: ['industrial', 'capacity-model', 'equipment-capex', 'manufacturing', 'lot-flow', 'planning'] },
  { name: '台湾 · 质量与变更管理', source: jobMap,
    icons: ['quality-engineering', 'risk-fmea', 'quality-return', 'change-review', 'quality-release', 'analysis'] },
  { name: '台湾 · 环安卫与厂务', source: jobMap,
    icons: ['ehs', 'safety-drill', 'facilities', 'water-systems', 'power-systems', 'gas-systems', 'air-systems', 'fab-utilities'] },
  { name: '台湾 · 智能制造与人工智能', source: jobMap, icons: ['smart-factory-ai'] },
  { name: '台湾 · 制程整合与测试工程', source: jobMap,
    icons: ['process-integration', 'process-transfer', 'npi', 'yield-map', 'test-solutions', 'test-coverage', 'characterization', 'ate', 'binning', 'slt'] },
  { name: '台湾台中 · HBM 先进封测', source: siteArticle, icons: ['hbm', 'stack', 'dram', 'probe'] },
  { name: '台湾门户 · 封装工序示意', source: portalGuide, icons: ['backend-overview', 'package', 'bond', 'attach', 'dicing', 'finish', 'optical'] },
  { name: '台湾门户 · 通用组织图例', source: portalGuide, icons: ['org-unit', 'workcell', 'project', 'coordination', 'support', 'team'] },
]
