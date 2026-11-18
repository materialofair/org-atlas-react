# 存储器后道团队与图标选用

给组织节点选图标时，先看它负责的交付物。同一条 HBM 产线可能同时有封装、测试和客户认证人员，三个团队需要的标记各不相同。

## 美光台湾公开的后道职能

美光台湾的岗位地图在 Back-End 区列出以下九类职能，并描述它们之间的协作。右栏给出本项目设计的图标键名。这个公开页面能支持职能分类；地区、厂区和主管层级仍需以实际组织资料为准。[Micron Taiwan Job Map](https://tw.micron.com/about/careers/job-map)

| 公开职能 | 部门主要看什么 | 建议图标 |
| --- | --- | --- |
| 工业工程 IE | 设备产能模型、扩产资源 | `industrial` 节拍表 |
| 制造 MFG | 投产、产出与交期 | `manufacturing` 厂房 |
| 制程整合 PIE | 跨站流程、新品导入、异常协调 | `process-integration` 工序汇合 |
| 产品工程测试 TSE | 产品表征、测试方案与测试效率 | `test-solutions` 代码括号与脉冲 |
| 装联 Assembly | 封装产线稳定性与良率 | `package` 芯体和引脚 |
| 测试 Test | 量产电测、结果与失效模式 | `ate` 测试波形 |
| 质量工程 QE | 异常品处置、质量控制与客户反馈 | `quality-engineering` 检验表 |
| 环境健康与安全 EHS | 作业风险与环境健康 | `ehs` 盾牌和叶片 |
| 厂务 FAC | 支撑生产的公用设施与运行维护 | `facilities` 管线阀门 |

美光在 2024 年回顾中还介绍了两个不同的场景：台中 AATT 整合探针、3D 封装与测试能力；槟城设施的产品范围包括 NAND、PC DRAM、SSD 和内存模组。产品或工艺本身也可以成为细分团队的图标，例如为模组组选 `dimm`、为盘卡组选 `ssd`。其历史认证附件还记录了部分厂区的减薄、切割、打线和通电老化活动。[美光 2024 年进展摘要，第 12 页](https://sg.micron.com/content/dam/micron/global/public/documents/about/misc/2024/2024-micron-progress-summary.pdf) · [美光历史厂区认证范围](https://sg.micron.com/content/dam/micron/global/public/documents/about/certificate/iso-14001.pdf)

### 台湾职能的补充图标

可在「美光 Micron」中搜索“台湾”，或直接搜索以下键名。跨厂共用的图形只占一张卡，按地区检索时仍可查看对应地区的来源。台湾门户的组织节点、工序图例和通用团队图标都可在美光集合中找到。

| 使用场景 | 图标键名 | 选图依据 |
| --- | --- | --- |
| 工业工程投资评估 | `equipment-capex` | IE 对照设备产能模型与资本支出计划 |
| 失效模式与影响分析 | `risk-fmea` | QE 与封装、测试工程协作执行 FMEA |
| 客户退货处置 | `quality-return` | QE 跟进客户退回产品及异常处置 |
| 质量变更评审 | `change-review` | QE 的跨部门职责包括变更管理 |
| 安全训练与演练 | `safety-drill` | EHS 联合制造及厂务安排训练和演练 |
| 智能制造与 AI | `smart-factory-ai` | 横向 SMAI 团队结合制造数据开发分析应用，与前后道团队协作 |

这些名称描述工作内容。台湾门户将相关工作作为可浏览条目，实际团队边界、岗位隶属和主管以使用方资料为准。[美光台湾职类地图](https://tw.micron.com/about/careers/job-map)

## SK 海力士公开的 HBM 分工

海力士在 2024 年 4 月介绍了 P&T（封装与测试）的职责，以及硅通孔 TSV 和模塑底填 MR-MUF 在 HBM 封装中的作用。图标库将三种常见关注点分开：`hbm` 表示堆叠整体，`tsv` 表示贯穿硅层的互连，`underfill` 表示芯片间隙填充。[SK hynix P&T 访谈](https://news.skhynix.com/en/top-team-insights-motto-of-package-and-technology-head-woojin-choi/)

同年 9 月，海力士描述了当时 HBM Business 下 HBM PE 部门中的产品工程、应用工程和项目管理团队。PE 关注产品测试与验证，AE 在系统层面评估产品，PM 协调客户与内部团队的交付节奏。客户认证是这组工作的重要目标，可在以认证为主责的团队使用单独的图章图标。[SK hynix HBM PE 访谈](https://news.skhynix.com/en/munphil-park-aims-to-strengthen-ai-memory-leadership/)

| 图标适用场景 | 图标键名 | 视觉区别 |
| --- | --- | --- |
| 存储产品工程课 | `product-engineering` | 芯片和量尺 |
| 存储应用工程组 | `application-engineering` | 主机和外接器件 |
| HBM 项目管理组 | `project-management` | 里程碑时间线 |
| 客户认证组 | `customer-certification` | 报告和认可章 |

## 美光后道门户怎么浏览

首页的九类职能按美光台湾中文职类地图命名，以英文版核对缩写。中文的「产品工程测试」对应英文的 Test Solutions Engineering；「测试」是另一个独立入口。默认从二级门户进入，页尾可浏览「美光台湾」这一示例上级。下级编组及七级导航是展示方式，负责人未公开即省略。[美光中文职类地图](https://tw.micron.com/about/careers/job-map-tch) · [美光英文岗位地图](https://tw.micron.com/about/careers/job-map)

| 从首页进入 | 细分图标 | 设计含义 |
| --- | --- | --- |
| 工业工程 → 产能建模 | `capacity-model` | 柱形负载与容量目标线 |
| 生产制造 → 在制品流转 | `lot-flow` | 作业批次的站间转移 |
| 制程整合 → 试产转量产 | `process-transfer` | 样品跨过制程交接线 |
| 产品工程测试 → 测试覆盖评估 | `test-coverage` | 勾选的测试矩阵 |
| 质量 → 质量放行评审 | `quality-release` | 通过检验关卡的批次 |
| 厂务运营工程 → 系统整合 | `fab-utilities` | 公用系统的主管与分支 |

美光还公开列出 FAC 的六个方向：水务、电力、气体与化学品、空调、系统整合和总务。前四项分别用水滴、配电柜、储罐和风叶表示。门户将这六项标记为公开职能。[来源：英文职类地图的 Back-End / Facilities](https://tw.micron.com/about/careers/job-map)

「封装 → 先进封装与 HBM」参考台中厂区披露的先进封测与 DRAM 产品能力。工艺能力的公开记录用于解释卡片主题，团队编组为示例。海力士部分仅作为共享图标库的历史设计参考。[美光台中先进封装测试厂](https://tw.micron.com/about/blog/company/events/taiwan-new-facility-supports-hbm3e-ramp-dram-tech-deployment)

## 职责未知时

只提供名称与 ID 即可使用。省略图标时，有子节点自动显示 `org-unit`，无子节点显示 `team`。已知是项目、支持、跨部门协作或作业单元，可显式选择 `project`、`support`、`coordination`、`workcell`。全部图标均由本项目绘制，使用 MIT 许可证。
