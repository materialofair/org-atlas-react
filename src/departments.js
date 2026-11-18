// Capability groupings and reporting lines are fictional. Sources are documented in README.md.
function team(id, name, icon, leader, description, children) {
  return { id, name, icon, leader, description, children }
}
const t = team
export const root = t('backend', '后道封装测试事业群', 'package', '林知远',
  '统筹晶圆加工、芯片封装与电性测试，以及支撑量产的质量、设备和供应团队。', [
    t('assembly', '封装制造部', 'package', '陈思远', '从裸片到封装成品，组织芯片贴装、引线互连、塑封与外形加工。', [
      t('wire-bond', '引线键合课', 'bond', '沈嘉宁', '以细金属线连接芯片焊盘和载体，负责键合产线与线弧质量。', [
        t('copper-wire', '铜线生产组', 'bond', '许安然', '统筹铜线产品的生产与换线。', [
          t('qfn-bond', 'QFN 键合线', 'bond', '许清', '承接方形扁平无引脚封装产品。', [
            t('bond-shift-a', '甲班键合班组', 'bond', '王祺', '负责本班机台交接与首件确认。', [
              t('bond-cell', '细线键合单元', 'bond', '江澜', '跟踪本单元的作业批次与检验记录。')])])]),
        t('gold-wire', '金线工艺组', 'bond', '宋知夏', '维护金线产品的工艺窗口与异常记录。')]),
      t('die-attach', '固晶贴装课', 'attach', '赵以恒', '将裸片定位并固定在基板或引线框架上。'),
      t('molding', '塑封成型课', 'mold', '唐宁', '管理模塑包封、后固化和外观确认。'),
      t('singulation', '切单成型课', 'dicing', '陆宁'),
      t('finish-line', '成品后处理课', 'finish', undefined, undefined, [
        t('mark', '激光打标组', 'finish'), t('visual', '外观检查组', 'optical'), t('tape', '编带包装组', 'finish')]),
      t('assembly-process', '封装工艺整合课', 'process-integration', '吴桐', '衔接新封装导入、量产移交与跨工序异常处理。', [
        t('new-product', '新品导入组', 'npi', '沈辰', '协调样品批、试产验证与量产移交。'),
        t('module-build', '内存模组装联组', 'dimm', '王远', '负责 DIMM 模组试装与制造移交。'),
        t('drive-build', 'SSD 装联导入组', 'ssd', '余宁', '组织固态硬盘板卡的试装与验证。')])]),
    t('wafer-services', '晶圆加工部', 'wafer', '苏念', '组织晶圆减薄、切割及凸块加工，向封装产线交付合格裸片。', [
      t('wafer-prep', '晶圆备料课', 'wafer', '林鹿', '管理减薄、贴膜与划片。', [
        t('saw', '晶圆划片组', 'dicing', '江月', undefined, [
          t('blade-line', '刀片切割线', 'dicing', '温舒', undefined, [
            t('saw-shift', '划片乙班', 'dicing', '乔音', undefined, [t('saw-cell', '薄片切割单元', 'dicing', '程悦')])])])]),
      t('grinding', '背面减薄课', 'grinding', '秦禾'), t('bumping', '铜柱凸块课', 'bump', '郝清'), t('wafer-metrology', '晶圆厚度量测组', 'metrology', '罗周')]),
    t('advanced', '先进封装部', 'stack', '周亦辰', '整合倒装、扇出与多芯片堆叠封装平台。', [
      t('flip-chip', '倒装封装课', 'flip-chip', '徐舟', undefined, [
        t('fc-attach', '倒装贴片组', 'attach', '陆川', undefined, [
          t('fc-bga', 'FC-BGA 贴装线', 'attach', '梁森', undefined, [
            t('fc-shift', '贴装甲班', 'attach', '穆凡', undefined, [t('fc-cell', '高密度贴片单元', 'attach', '戴琦')])])])]),
      t('fan-out', '扇出封装课', 'fan-out', '丁言'), t('rdl', '重布线工艺课', 'rdl', '乔一'),
      t('hbm-integration', 'HBM 堆叠整合课', 'hbm', '丁乔', '整合多层存储芯片的垂直互连与层间封装。', [
        t('tsv-interconnect', '硅通孔互连组', 'tsv', '徐禾'), t('mold-underfill', '模塑底填组', 'underfill', '蓝晴'),
        t('hbm-delivery', 'HBM 项目管理组', 'project-management', '许岑')])]),
    t('test', '测试工程部', 'ate', '叶清和', '连接晶圆探针测试、封装后成品电测与测试程序开发。', [
      t('final-test', '成品测试课', 'ate', '任晴', undefined, [
        t('soc-test', 'SoC 量产测试组', 'ate', '季然', undefined, [
          t('digital-line', '数字芯片测试线', 'ate', '杜含', undefined, [
            t('test-shift', '终测乙班', 'ate', '郭烨', undefined, [t('test-cell', '多工位测试单元', 'ate', '夏恬')])])])]),
      t('wafer-probe', '晶圆探针测试课', 'probe', '方序'), t('slt', '系统级测试课', 'slt', '王铮'),
      t('test-solutions', '测试解决方案课', 'test-solutions', '李岚', '衔接产品表征、测试程序开发与量产测试。', [
        t('char-lab', '电性表征组', 'characterization', '邱澄'), t('burn-in-screen', '通电老化筛选组', 'burn-in', '方瑜'),
        t('memory-binning', '存储性能分档组', 'binning', '宋竹')]),
      t('memory-pe', '存储产品工程课', 'product-engineering', '沈庭', '跟踪产品测试表现并协调应用验证。', [
        t('dram-pe', 'DRAM 产品工程组', 'dram', '郭洲'), t('nand-pe', 'NAND 产品工程组', 'nand', '程安'),
        t('memory-ae', '存储应用工程组', 'application-engineering', '余栩')])]),
    t('quality', '质量与可靠性部', 'quality-engineering', '唐静宜', '负责可靠性验证、失效分析与封装产品的质量放行。', [
      t('reliability-lab', '可靠性实验室', 'reliability', '沈航', undefined, [
        t('stress', '环境应力组', 'reliability', '华音', undefined, [
          t('thermal', '温度循环试验室', 'thermal-cycle', '梅岚', undefined, [
            t('thermal-ops', '温循运行班', 'reliability', '裴尧', undefined, [t('thermal-cell', '试样监测单元', 'reliability', '陆星')])])])]),
      t('failure-lab', '失效分析实验室', 'analysis', '易辰'), t('incoming', '来料质量课', 'materials', '鲁蓉'),
      t('yield-analysis', '量产良率分析组', 'yield-map', '刘澈'), t('customer-qual', '客户认证组', 'customer-certification', '郑青')]),
    t('equipment', '设备工程部', 'equipment', '陆明', '保障生产设备可用性，协调预防保养、维修与备件管理。', [
      t('maintenance', '封装设备课', 'equipment', '傅青', undefined, [
        t('bonder-service', '键合设备组', 'equipment', '邵宁', undefined, [
          t('bonder-field', '现场维护队', 'equipment', '滕飞', undefined, [
            t('service-shift', '值班维修班', 'equipment', '梁曦', undefined, [t('service-cell', '键合机维修单元', 'equipment', '张澈')])])])]),
      t('tester-service', '测试设备课', 'ate', '林深'), t('spares', '备件管理课', 'materials', '张岩'),
      t('facility-services', '厂务工程课', 'facilities', '金林')]),
    t('operations', '生产运营部', 'manufacturing', '温予安', '统筹产能、投料排程、在制品流转与批次交付。', [
      t('production-control', '生产控制课', 'planning', '白露', undefined, [
        t('scheduling', '排程组', 'planning', '周扬', undefined, [
          t('assembly-planning', '封装排程队', 'planning', '余映', undefined, [
            t('dispatch', '现场调度班', 'planning', '席宁', undefined, [t('lot-dispatch', '批次派工单元', 'planning', '章平')])])])]),
      t('industrial', '工业工程课', 'industrial', '杨辰'), t('site-ehs', '环境健康与安全课', 'ehs', '廖可')]),
    t('supply', '物料供应部', 'materials', '顾行之', '负责封装基板、引线框架与耗材的供料及批次追溯。', [
      t('logistics', '生产物流课', 'materials', '叶舒', undefined, [
        t('warehouse', '基板仓储组', 'materials', '梁川', undefined, [
          t('substrate-store', '基板周转库', 'materials', '黄嘉', undefined, [
            t('receiving', '收发班', 'materials', '翁南', undefined, [t('kitting', '工单配料单元', 'materials', '吴言')])])])]),
      t('leadframes', '引线框架供应课', 'materials', '何平'), t('lot-trace', '物料批次追溯组', 'traceability', '韩舟')]),
  ])

const twoLevels = t('lab', '封装分析中心', 'analysis', '林鹿', '提供封装异常定位与物理分析服务。', [
  t('cross-section', '截面分析部', 'analysis'),
  t('acoustic', '先进封装声学扫描与无损检测部', 'analysis', '乔音', '使用声学扫描检查封装内部分层。'),
])
const threeLevels = t('test-center', '成品测试中心', 'ate', '陈嘉', '协调成品电测与测试质量。', [
  t('test-production', '量产测试部', 'ate', '陆宁', undefined, [
    t('ambient', '常温测试组', 'ate'), t('hot-cold', '高低温测试组', 'ate'),
  ]),
  t('test-quality', '测试质量部', 'reliability'),
])
const samples = new Map([['2', twoLevels], ['3', threeLevels], ['7', root]])
export function demoDepartments(levels) {
  const company = samples.get(levels)
  const selected = company ?? root.children[0]
  const byId = new Map()
  function visit(node) {
    byId.set(node.id, node)
    node.children?.forEach(visit)
  }
  visit(selected)
  return { root: selected, byId, rootLevel: company ? 1 : 2, title: company ? '组织图谱' : '封装制造部门户' }
}
