import { chipLifecycle } from './chip-lifecycle.js'
import { jobMap, taiwanSections } from './micron-taiwan.js'
import { xian } from './micron-xian.js'
import { micronHqSections } from './micron-hq.js'

// The sections group public responsibilities for browsing. Sources identify the employer's own terminology.
const tsp = 'https://www.samsung-dsrecruit.com/recruits/job_intro/testPackage_center/'
const pt = 'https://www.skcareers.com/Recruit/Detail/R241094'
const testTeams = 'https://talent.skhynix.com/hub/en/job/interview/76'

const cxmtOperations = 'https://static.cninfo.com.cn/finalpage/2026-08-29/1225529543.PDF#page=16'
const cxmtProcess = 'https://static.cninfo.com.cn/finalpage/2026-07-22/1225435990.PDF#page=162'
const cxmtCareers = 'https://job.hust.edu.cn/zpinfo1/2405543.htm'

const kyecSupport = 'https://www.kyec.com.tw/en/Solution/testing-technology-support'

const hq = {
  name: '美光总部 · Boise',
  sections: micronHqSections.map(({ name, source, items }) => ({ name, source, icons: items.map(([icon]) => icon) })),
}

function subtreeIcons(node) {
  return [node.icon, ...(node.children ?? []).flatMap(subtreeIcons)]
}

function micronCollection() {
  const sections = [
    { name: '台湾 · IT 信息技术', source: jobMap, icons: ['it-team', 'factory-software', 'data-pipeline', 'industrial-iot'] },
    { name: '台湾 · 运营与生产协调', source: jobMap, icons: ['operations-team', 'ops-dispatch', 'shift-roster', 'ops-kpi'] },
    ...hq.sections.map(section => ({ ...section, name: '总部与全球 · ' + section.name })),
    { name: '西安 · 封测厂区', source: xian.evidence.url, icons: [xian.icon] },
    ...xian.children.map(node => ({ name: '西安 · ' + node.name, source: node.evidence.url, icons: subtreeIcons(node) })),
    ...taiwanSections,
  ]
  // A shared glyph gets one card and one file in the company-wide collection.
  const seen = new Set()
  const uniqueSections = sections.map(section => {
    const icons = []
    for (const icon of section.icons) {
      if (seen.has(icon)) continue
      seen.add(icon)
      icons.push(icon)
    }
    return { ...section, icons }
  }).filter(section => section.icons.length)
  return { name: '美光 Micron', sections: uniqueSections, sourceSections: sections }
}

const assembly = 'https://news.skhynix.com/en/semiconductor-back-end-process-episode-6-conventional-packages/'
const nxpAssembly = 'https://community.nxp.com/pwmxy87654/attachments/pwmxy87654/ftf2016/79/1/INS-N2024%20Semiconductor%20101-102%20Functionality%20and%20Manufacturing%20of%20Integrated%20Circuits.pdf#page=63'

export const productionCollections = {
  lifecycle: chipLifecycle,
  process: {
    name: '后道制造工序',
    sections: [
      { name: '晶圆准备与取片', source: assembly,
        icons: ['probe', 'grinding', 'wafer-mount', 'dicing', 'uv-tape-release', 'die-pick'] },
      { name: '固晶、互连与塑封', source: nxpAssembly,
        icons: ['epoxy-dispense', 'attach', 'die-attach-cure', 'plasma-clean', 'bond', 'mold', 'post-mold-cure'] },
      { name: '倒装互连', source: assembly, icons: ['flip-chip', 'underfill'] },
      { name: '引线框架封装后处理', source: nxpAssembly, icons: ['lead-plating', 'trim-form'] },
      { name: '基板封装植球与分割', source: assembly, icons: ['ball-attach', 'solder-reflow', 'package-singulation'] },
      { name: '产品标识与外观检查', source: nxpAssembly, icons: ['laser-mark', 'optical'] },
      { name: '封装无损检测', source: 'https://www.ti.com/en-us/quality-reliability/faqs/failure-analysis',
        icons: ['xray-inspection', 'acoustic-microscopy'] },
      { name: '成品测试与分选', source: 'https://www.kyec.com.tw/zh-tw', icons: ['ate', 'burn-in', 'binning'] },
      { name: '编带与出货包装', source: 'https://www.ti.com/lit/an/szza021c/szza021c.pdf#page=21',
        icons: ['finish', 'dry-pack'] },
    ],
  },
  micron: micronCollection(),
  'micron-hq': hq,
  kyec: {
    name: '京元电子 KYEC',
    sections: [
      { name: '量产测试服务', source: 'https://www.kyec.com.tw/zh-tw',
        icons: ['probe', 'ate', 'burn-in'] },
      { name: '产品专项测试', source: kyecSupport,
        icons: ['cis-test', 'rf-test', 'mixed-signal-test', 'display-driver', 'mems-test', 'dram-array-test'] },
      { name: '测试开发与平台转换', source: kyecSupport,
        icons: ['test-solutions', 'characterization', 'test-correlation', 'parameter-compensation', 'platform-conversion'] },
      { name: '治具与设备研发', source: 'https://www.kyec.com.tw/zh-cn/Service/设备研发/24',
        icons: ['strip-handler', 'tester-control'] },
      { name: '测试硬件与数据服务', source: kyecSupport,
        icons: ['load-board', 'test-socket', 'probe-card', 'efab-data', 'yield-map'] },
    ],
  },
  samsung: {
    name: '三星 TSP',
    sections: [
      { name: '生产管理与 SCM', source: tsp + 'productionManagement.php',
        icons: ['bottleneck-control', 'unit-cost', 'sample-delivery', 'supply-planning', 'production-progress'] },
      { name: '采购与外协封测', source: tsp + 'buy.php',
        icons: ['osat-sourcing', 'safety-stock', 'fifo-lanes', 'warehouse'] },
      { name: '评价分析与材料质量', source: tsp + 'analysis.php',
        icons: ['incoming-coa', 'defect-classifier', 'material-qualification', 'reliability', 'metrology'] },
      { name: '设备软件与实时控制', source: tsp + 'softwareDev.php',
        icons: ['tester-control', 'anomaly-monitor'] },
      { name: '量产工艺与设备改善', source: tsp + 'semiProcess_tech.php',
        icons: ['equipment-throughput', 'equipment-auto', 'ate', 'dicing'] },
    ],
  },
  hynix: {
    name: 'SK 海力士 P&T',
    sections: [
      { name: 'P&T 制造运营', source: pt, icons: ['hbm-schedule', 'production-progress', 'unit-cost'] },
      { name: '封装量产技术', source: pt, icons: ['equipment-throughput', 'material-qualification', 'yield-map', 'hbm'] },
      { name: 'HBM 测试技术', source: pt, icons: ['hbm-stack-test', 'analysis'] },
      { name: '移动与 SoC 测试团队', source: testTeams, icons: ['mobile-package-test', 'soc-program', 'test-tat', 'test-solutions'] },
      { name: 'HBM 封装产品开发', source: 'https://talent.skhynix.com/hub/ko/job/interview/93',
        icons: ['package-design', 'package-section', 'stack'] },
    ],
  },
  cxmt: {
    name: '长鑫存储 CXMT',
    sections: [
      { name: '后道计划与生产调度', source: cxmtOperations, icons: ['test-load-split', 'production-progress', 'order-due-date'] },
      { name: '外包商与项目管理', source: cxmtOperations, icons: ['vendor-onboarding', 'vendor-scorecard'] },
      { name: '后道采购与对账', source: cxmtOperations, icons: ['contract-review', 'invoice-match'] },
      { name: '晶圆测试（CP）', source: cxmtProcess, icons: ['probe', 'dc-parametric', 'margin-window', 'wafer-repair', 'wafer-burn-in'] },
      { name: '芯片封装（委外生产）', source: cxmtProcess, icons: ['grinding', 'dicing', 'attach', 'bond', 'mold', 'ball-attach'] },
      { name: '成品测试（FT，以自测为主）', source: cxmtProcess, icons: ['burn-in', 'dram-array-test', 'binning'] },
      { name: '模组加工与测试（自有及外协）', source: cxmtOperations, icons: ['module-assembly', 'module-test'] },
      { name: '封装、模组与产品验证研发', source: cxmtCareers, icons: ['package-design', 'module-layout', 'slt', 'analysis', 'reliability'] },
    ],
  },
}
