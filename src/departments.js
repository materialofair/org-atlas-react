// 示例数据。每行分别为部门标识、名称、负责人、职责和直属部门。
function department(id, name, leader, description, children = []) {
  return { id, name, leader, description, children }
}
const d = department
export const root = d('product-tech', '产品与技术事业群', '林知远',
  '连接产品、设计与工程团队，打造从用户洞察到技术交付的完整能力。', [
    d('product', '产品管理部', '陈思远', '洞察用户需求，制定产品路线图，推动核心产品持续迭代。', [
      d('consumer', '用户产品组', '沈嘉宁', '负责面向个人用户的产品体验，覆盖首次使用到长期留存。', [
        d('onboarding', '新用户体验小组', '许安然', '研究新用户的首次使用路径，优化注册、引导和首次任务体验。', [
          d('activation', '用户激活组', '许清', '分析注册后流失的原因，设计新用户激活流程。', [
            d('first-run', '首次使用体验组', '王祺', '帮助新用户在首次打开产品时完成第一项任务。', [
              d('welcome-guide', '欢迎引导组', '江澜', '负责欢迎页、互动指引与首次任务的文案和流程。')])])]),
        d('engagement', '用户活跃小组', '宋知夏', '跟踪日常使用中的障碍，完善内容发现与互动体验。')]),
      d('enterprise', '企业产品组', '赵以恒'),
      { id: 'strategy', name: '产品策略组', children: [
        { id: 'market-insights', name: '市场洞察' },
        { id: 'portfolio-planning', name: '产品组合规划' },
        { id: 'strategy-research', name: '战略研究' },
      ] }]),
    d('design', '体验设计部', '苏念', '以用户研究和设计系统，塑造一致、易用的产品体验。', [
      d('interaction', '交互设计组', '林鹿', '梳理用户任务和信息结构，验证跨端交互方案。', [
        d('mobile-design', '移动体验小组', '江月', '优化移动端的导航、触控反馈与任务流程。', [
          d('inclusive-design', '无障碍体验组', '温舒', '推动读屏、低视力和动作辅助用户的移动体验改进。', [
            d('screen-reader', '读屏体验组', '乔音', '为关键任务设计读屏顺序、标签和操作反馈。', [
              d('voiceover', 'iOS 读屏适配组', '程悦', '检查 VoiceOver 导航次序并维护 iOS 读屏规范。')])])])]),
      d('system-design', '设计系统组', '秦禾', '维护跨端组件、视觉规范与无障碍设计指南。'),
      d('user-research', '用户研究组', '吴桐', '通过访谈和可用性测试帮助团队理解用户。')]),
    d('engineering', '应用研发部', '周亦辰', '建设面向用户的应用服务，保障核心业务稳定交付。', [
      d('frontend', '前端工程组', '徐舟', '负责 Web 应用开发与工程基础设施。', [
        d('web-platform', 'Web 平台小组', '陆川', '维护构建工具、组件集成和应用性能监控。', [
          d('web-tooling', '前端工具链组', '梁森', '建设本地开发、构建与部署工具。', [
            d('build-systems', '构建系统组', '穆凡', '维护打包配置、按需加载策略与构建缓存。', [
              d('build-cache', '构建缓存组', '戴琦', '管理增量构建缓存，定位缓存失效和依赖变化。')])])])]),
      d('backend', '后端服务组', '丁言', '维护业务接口、服务编排与数据一致性。'),
      d('client', '客户端组', '乔一', '负责移动端应用的开发和版本交付。')]),
    d('data', '数据智能部', '叶清和', '建设数据资产与算法能力，为产品决策提供依据。', [
      d('analytics', '数据分析组', '任晴', '定义产品指标，分析用户行为和实验结果。', [
        d('experiment', '实验分析小组', '季然', '设计对照实验并评估产品改动的实际影响。', [
          d('experiment-metrics', '实验指标组', '杜含', '定义实验主指标与护栏指标，记录指标口径。', [
            d('metric-quality', '指标质量组', '郭烨', '检验指标采样偏差与异常波动。', [
              d('metric-validation', '口径校验组', '夏恬', '用样本和历史数据复核指标计算结果。')])])])]),
      d('algorithm', '算法应用组', '方序', '将检索和推荐算法应用到产品场景。')]),
    d('platform', '基础平台部', '陆明', '维护云基础设施和研发工具，提升工程团队交付效率。', [
      d('cloud', '云平台组', '傅青', '管理计算、存储与网络资源，提供稳定运行环境。', [
        d('compute', '计算服务小组', '邵宁', '负责计算资源调度、容量规划与运行成本。', [
          d('resource-scheduling', '资源调度组', '滕飞', '按照业务优先级分配计算资源。', [
            d('capacity-planning', '容量规划组', '梁曦', '预测集群容量与业务高峰的资源需求。', [
              d('peak-forecast', '峰值预测组', '张澈', '根据历史负载预测活动峰值，提供扩容建议。')])])])]),
      d('developer', '研发效能组', '林深', '建设持续集成、发布流水线与开发环境。')]),
    d('quality', '质量保障部', '唐静宜', '建立质量标准与测试体系，守护产品发布质量。', [
      d('automation', '自动化测试组', '沈航', '设计自动化回归策略，维护业务测试用例。', [
        d('integration', '集成验证小组', '华音', '检验服务间协作流程，验证发布前的关键路径。', [
          d('release-testing', '发布验证组', '梅岚', '在发布环境验证版本兼容性与关键业务流程。', [
            d('checkout-testing', '交易链路验证组', '裴尧', '覆盖下单、支付与退款的跨服务验证。', [
              d('refund-testing', '退款验证组', '陆星', '验证不同退款渠道的状态回传与订单一致性。')])])])]),
      d('reliability', '可靠性测试组', '易辰', '评估高负载、故障恢复与长时间运行表现。')]),
    d('security', '信息安全部', '顾行之', '负责产品安全与隐私保护，管理业务系统的安全风险。', [
      d('privacy', '隐私工程组', '叶舒', '将数据保护措施落到产品设计与研发流程。', [
        d('access', '访问治理小组', '梁川', '维护数据访问规则与授权审查流程。', [
          d('identity', '身份治理组', '黄嘉', '管理组织账号及其权限生命周期。', [
            d('account-review', '账号审查组', '翁南', '复核账号归属、访问范围和停用情况。', [
              d('service-accounts', '服务账号审查组', '吴言', '定期核对服务账号的使用范围和责任人。')])])])]),
      d('security-ops', '安全运营组', '何平', '跟踪安全事件并协调响应与修复。')]),
    d('operations', '技术运营部', '温予安', '协调交付资源与技术支持，让团队协作更顺畅。', [
      d('delivery', '项目交付组', '白露', '协调跨部门项目排期，跟进里程碑与依赖。', [
        d('release', '发布协调小组', '周扬', '维护发布计划、变更记录与上线沟通。', [
          d('release-train', '版本统筹组', '余映', '协调发布窗口、跨团队依赖与验收时间。', [
            d('gray-rollout', '灰度运营组', '席宁', '跟进分批上线过程，整理各批次的运行反馈。', [
              d('rollout-observation', '灰度观察组', '章平', '在放量前后比对业务指标并记录异常情况。')])])])]),
      d('support', '技术支持组', '余音', '处理产品使用与集成问题，沉淀常见问题解法。')])
  ])

// Short organizations are independent demo trees. A branch ends wherever its data ends.
const twoLevels = d('design-studio', '设计中心', '林鹿', '负责设计系统建设与产品体验研究。', [
  { id: 'design-systems', name: '设计系统部' },
  d('inclusive-research', '企业产品体验设计与无障碍研究部', '乔音', '研究跨端产品的可用性与无障碍体验。'),
])

const threeLevels = d('service-center', '客户服务中心', '陈嘉', '协调客户支持和服务质量。', [
  d('customer-support', '客户支持部', '陆宁', undefined, [
    { id: 'customer-help', name: '客户咨询组' },
    { id: 'technical-help', name: '技术支持组' },
  ]),
  { id: 'service-quality', name: '服务质量部' },
])

const companySamples = new Map([['2', twoLevels], ['3', threeLevels], ['7', root]])
const productDepartment = root.children.find(node => node.id === 'product')

export function demoDepartments(levels) {
  const company = companySamples.get(levels)
  const selected = company ?? productDepartment
  const byId = new Map()
  function visit(node) {
    byId.set(node.id, node)
    node.children?.forEach(visit)
  }
  visit(selected)
  return { root: selected, byId, rootLevel: company ? 1 : 2, title: company ? '组织图谱' : '产品管理部门户' }
}
