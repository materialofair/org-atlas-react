// The sections group public responsibilities for browsing. Sources identify the employer's own terminology.
const tsp = 'https://www.samsung-dsrecruit.com/recruits/job_intro/testPackage_center/'
const pt = 'https://www.skcareers.com/Recruit/Detail/R241094'
const testTeams = 'https://talent.skhynix.com/hub/en/job/interview/76'

const cxmtOperations = 'https://static.cninfo.com.cn/finalpage/2026-08-29/1225529543.PDF#page=16'
const cxmtProcess = 'https://static.cninfo.com.cn/finalpage/2026-07-22/1225435990.PDF#page=162'
const cxmtCareers = 'https://job.hust.edu.cn/zpinfo1/2405543.htm'

export const productionCollections = {
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
