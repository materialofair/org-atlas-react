const design = 'https://www.synopsys.com/glossary/what-is-system-on-a-chip.html'
const fab = 'https://www.asml.com/en/company/stories/2021/semiconductor-manufacturing-process-steps'
const assembly = 'https://news.skhynix.com/en/semiconductor-back-end-process-episode-6-conventional-packages/'

export const chipLifecycle = {
  name: '芯片全流程',
  sections: [
    { name: '规格定义与系统架构', source: design,
      icons: ['chip-spec', 'chip-architecture'] },
    { name: '电路设计与功能验证', source: 'https://www.synopsys.com/implementation-and-signoff.html',
      icons: ['rtl-design', 'analog-schematic', 'logic-verification'] },
    { name: '数字实现、签核与流片', source: design,
      icons: ['logic-synthesis', 'scan-chain', 'chip-floorplan', 'place-route', 'design-signoff', 'tapeout'] },
    { name: '掩模与晶圆图形化（按层重复）', source: fab,
      icons: ['photomask', 'wafer', 'film-deposition', 'resist-coat', 'lithography', 'wafer-etch', 'ion-implant'] },
    { name: '晶圆互连与平坦化', source: 'https://ir.appliedmaterials.com/static-files/109fae11-37aa-4eb4-993a-f82f880dfc3b',
      icons: ['metal-interconnect', 'wafer-cmp', 'metrology'] },
    { name: '晶圆电测与裸片筛选', source: 'https://www.ti.com/en-us/about-ti/worldwide-manufacturing/assembly-test',
      icons: ['probe', 'yield-map'] },
    { name: '裸片准备、封装与互连', source: assembly,
      icons: ['grinding', 'wafer-mount', 'dicing', 'attach', 'bond', 'flip-chip', 'mold', 'ball-attach', 'package-singulation'] },
    { name: '成品测试与分选', source: 'https://www.kyec.com.tw/en/Solution/testing-technology-support',
      icons: ['ate', 'burn-in', 'slt', 'binning'] },
    { name: '工程样片点亮与表征', source: 'https://www.synopsys.com/content/dam/synopsys/resources/other/synopsys-corporate-overview-q3fy2025.pdf',
      icons: ['silicon-bringup', 'characterization', 'sample-delivery', 'customer-certification'] },
    { name: '质量放行与出货包装', source: 'https://www.ti.com/lit/an/szza021c/szza021c.pdf',
      icons: ['quality-release', 'finish', 'dry-pack', 'traceability'] },
    { name: '发货通知与物流交接', source: 'https://api-portal.ti.com/email-order-gettingstarted',
      icons: ['warehouse', 'shipment-notice', 'outbound-logistics'] },
    { name: '客户收货', source: 'https://www.fedex.com/en-us/delivery-options/signature-services.html',
      icons: ['delivery-receipt'] },
  ],
}
