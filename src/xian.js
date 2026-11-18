// Grouping is for navigation. Each entry carries its own Xi'an-specific evidence.
const report = (label, url) => ({ label, url })
const site = report('美光 2025 年西安厂区声明', 'https://investors.micron.com/news/press-release/2025/Statement-on-Data-Center-Business-in-China-10-17-2025/default.aspx')
const scope = report('西安认证范围（2025–2028）', 'https://www.micron.com/content/dam/micron/global/public/documents/about/certificate/iso-14001.pdf')
const activities = report('西安历史认证附件（MXA）', 'https://www.micron.cn/content/dam/micron/global/public/documents/about/certificate/iso-14001.pdf')
const roles = report('美光 2022 届西安岗位记录', 'https://job.xidian.edu.cn/campus/view/id/732615')
const technicians = report('美光西安 2025 招聘简章', 'https://51uns.bysjy.com.cn/Announce/Details/3323874?schoolCode=10828')
const expansion = report('美光 2024 年扩建公告', 'https://investors.micron.com/node/46886/pdf')
const approval = report('西安高新区 2026 年环评审批决定', 'https://xdz.xa.gov.cn/ztzl/hjbh/hjjg/jsxmhbsts/2057691824989429762.html')
const project = report('西安高新区 PSRG 项目公示', 'https://xdz.xa.gov.cn/ztzl/hjbh/hjjg/jsxmhbsts/2052277972313362433.html')
function entry(id, name, icon, description, evidence, children) {
  return { id, name, icon, description, evidence, children }
}

export const xian = entry('xian', '美光西安封装测试', 'package', '按西安厂区的公开业务、历史岗位和项目记录浏览。以下为资料分组，负责人和内部汇报线未披露。', site, [
  entry('xa-package', '器件封装与晶圆加工', 'package', '西安厂区承担 DRAM 器件封测，研磨环节另有本地项目公示。', expansion, [
    entry('xa-die-recovery', '裸片回收', 'die-recovery', '旧版西安认证附件明确列有 Die Recovery。', activities),
    entry('xa-grind', '晶圆研磨', 'grinding', '高新区项目公示记载了厂区已有的晶圆研磨线。', project),
    entry('xa-psrg', 'PSRG 研磨改造项目', 'plasma-grind', '项目拟增加等离子研磨工序，环评于 2026 年 5 月获批。', approval),
  ]),
  entry('xa-test', '器件测试', 'ate', '西安历史认证记录涵盖测试现场、老化与电测后处理。', activities, [
    entry('xa-floor', '量产电测', 'ate', '厂区活动范围中列有测试现场（Test Floor）。', activities),
    entry('xa-burn', '通电老化', 'burn-in', '厂区认证附件列有 Burn-in。', activities),
    entry('xa-post', '电测后处理', 'post-electrical', 'Post Electrical 对应电测完成后的处理环节。', activities),
  ]),
  entry('xa-modules', '内存模组制造与测试', 'dimm', '西安厂区的认证范围包括半导体模组产品制造与测试。', scope, [
    entry('xa-module-build', '模组装联', 'module-assembly', '将存储器件装联为模组；历史附件列有 Module Assembly。', activities),
    entry('xa-module-test', '模组测试', 'module-test', '模组产品的测试与器件级测试分别展示。', scope),
  ]),
  entry('xa-logistics', '仓储与物流', 'warehouse', '西安认证附件列有内部与外部仓储以及物流活动。', activities, [
    entry('xa-storage', '内外部仓储', 'warehouse', '收存、保管与周转是此图标表达的仓储职责。', activities),
    entry('xa-shipping', '物流流转', 'outbound-logistics', '按物流活动设计，用于批次运输与交接。', activities),
  ]),
  entry('xa-engineering', '工程与设备岗位', 'equipment', '西安校招记录列出设备自动化、工艺良率、工业工程和质量可靠性方向。', roles, [
    entry('xa-automation', '设备与自动化工程', 'equipment-auto', '历史岗位方向；设备技术员简章另列出了安装调试、设备报警及停机分析。', roles, [
      entry('xa-commission', '安装与调试', 'equipment-commission', '设备技术员参与新设备安装与调试。', technicians),
      entry('xa-alarm', '设备报警处理', 'equipment-alarm', '设备技术员处理设备报警与生产故障。', technicians),
      entry('xa-downtime', '停机数据分析', 'downtime', '分析计划与非计划停机以及设备使用率。', technicians),
    ]),
    entry('xa-yield', '工艺与良率工程', 'yield-map', '西安校招列出的工艺及良率工程师方向。', roles),
    entry('xa-ie', '工业工程', 'industrial', '西安历史校招岗位包含工业工程师。', roles),
    entry('xa-quality', '质量与可靠性工程', 'reliability', '西安历史校招岗位包含质量及可靠性工程师。', roles),
  ]),
  entry('xa-supervision', '生产管理岗位', 'production-supervision', '西安校招记录列有生产主管，设备岗位说明涉及现场记录与交接。', roles, [
    entry('xa-supervisor', '生产主管', 'production-supervision', '美光西安历史招聘中出现的管理岗位。', roles),
    entry('xa-handover', '异常交接记录', 'shift-handover', '技术员职责包括编写异常处理交接与学习报告。', technicians),
  ]),
  entry('xa-expansion', '扩建产品方向（规划）', 'line-expansion', '2024 年公告提出新增移动 DRAM、NAND、SSD 产品方向，分别列为项目规划。', expansion, [
    entry('xa-mobile', '移动 DRAM 导入规划', 'mobile-dram', '扩建公告列出的移动内存方向。', expansion),
    entry('xa-nand', 'NAND 导入规划', 'nand', '扩建公告列出的闪存方向。', expansion),
    entry('xa-ssd', 'SSD 导入规划', 'ssd', '扩建公告列出的固态硬盘方向。', expansion),
  ]),
  entry('xa-coe', '可持续发展卓越中心（公告）', 'sustainability-coe', '美光在 2024 年奠基时宣布将在西安建立封装和测试制造可持续发展卓越中心。', expansion),
])
