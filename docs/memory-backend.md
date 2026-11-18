# 存储器后道团队与图标选用

给组织节点选图标时，先看它负责的交付物。同一条 HBM 产线可能同时有封装、测试和客户认证人员，三个团队需要的标记各不相同。

## 美光台湾公开的后道职能

美光台湾的岗位地图在 Back-End 区列出以下九类职能，并描述它们之间的协作。右栏给出本项目设计的图标键名。这个公开页面能支持职能分类；地区、厂区和主管层级仍需以实际组织资料为准。[Micron Taiwan Job Map](https://tw.micron.com/about/careers/job-map)

| 公开职能 | 部门主要看什么 | 建议图标 |
| --- | --- | --- |
| 工业工程 IE | 设备产能模型、扩产资源 | `industrial` 节拍表 |
| 制造 MFG | 投产、产出与交期 | `manufacturing` 厂房 |
| 制程整合 PIE | 跨站流程、新品导入、异常协调 | `process-integration` 工序汇合 |
| 测试解决方案 TSE | 产品表征、测试方案与测试效率 | `test-solutions` 代码括号与脉冲 |
| 装联 Assembly | 封装产线稳定性与良率 | `package` 芯体和引脚 |
| 测试 Test | 量产电测、结果与失效模式 | `ate` 测试波形 |
| 质量工程 QE | 异常品处置、质量控制与客户反馈 | `quality-engineering` 检验表 |
| 环境健康与安全 EHS | 作业风险与环境健康 | `ehs` 盾牌和叶片 |
| 厂务 FAC | 支撑生产的公用设施与运行维护 | `facilities` 管线阀门 |

美光在 2024 年回顾中还介绍了两个不同的场景：台中 AATT 整合探针、3D 封装与测试能力；槟城设施的产品范围包括 NAND、PC DRAM、SSD 和内存模组。产品或工艺本身也可以成为细分团队的图标，例如为模组组选 `dimm`、为盘卡组选 `ssd`。其历史认证附件还记录了部分厂区的减薄、切割、打线和通电老化活动。[美光 2024 年进展摘要，第 12 页](https://sg.micron.com/content/dam/micron/global/public/documents/about/misc/2024/2024-micron-progress-summary.pdf) · [美光历史厂区认证范围](https://sg.micron.com/content/dam/micron/global/public/documents/about/certificate/iso-14001.pdf)

## SK 海力士公开的 HBM 分工

海力士在 2024 年 4 月介绍了 P&T（封装与测试）的职责，以及硅通孔 TSV 和模塑底填 MR-MUF 在 HBM 封装中的作用。图标库将三种常见关注点分开：`hbm` 表示堆叠整体，`tsv` 表示贯穿硅层的互连，`underfill` 表示芯片间隙填充。[SK hynix P&T 访谈](https://news.skhynix.com/en/top-team-insights-motto-of-package-and-technology-head-woojin-choi/)

同年 9 月，海力士描述了当时 HBM Business 下 HBM PE 部门中的产品工程、应用工程和项目管理团队。PE 关注产品测试与验证，AE 在系统层面评估产品，PM 协调客户与内部团队的交付节奏。客户认证是这组工作的重要目标，可在以认证为主责的团队使用单独的图章图标。[SK hynix HBM PE 访谈](https://news.skhynix.com/en/munphil-park-aims-to-strengthen-ai-memory-leadership/)

| Demo 中的使用场景 | 图标键名 | 视觉区别 |
| --- | --- | --- |
| 存储产品工程课 | `product-engineering` | 芯片和量尺 |
| 存储应用工程组 | `application-engineering` | 主机和外接器件 |
| HBM 项目管理组 | `project-management` | 里程碑时间线 |
| 客户认证组 | `customer-certification` | 报告和认可章 |

## Demo 里的位置

- 从默认的封装制造部门户进入「封装工艺整合课」，可以找到新品导入、内存模组装联和 SSD 装联导入。
- 点页尾「查看事业群全貌」后，进入「先进封装部 → HBM 堆叠整合课」可查看 TSV、模塑底填和项目管理。
- 进入「测试工程部」可分别查看测试解决方案课和存储产品工程课。前者包含表征、老化与分档，后者包含 DRAM、NAND 和应用工程。

Demo 的八个二级部门、下属团队的汇报线和负责人均为虚构。上述企业链接记录公开描述时的范围。全部图标由项目自绘，采用 MIT 协议。
