# 美光西安封测厂区：公开职能与选图依据

Demo 页尾的「进入西安厂区」打开 `?site=xian`。页面把工序、岗位和建设项目整理为八个导航分组。每个条目附西安本地来源，负责人留空。分组与层级用于查找资料；公开文件能确认的范围如下。

| 资料 | 能确认什么 | 如何体现在门户 |
| --- | --- | --- |
| [美光 2025-10-17 公司声明](https://investors.micron.com/news/press-release/2025/Statement-on-Data-Center-Business-in-China-10-17-2025/default.aspx)和[西安厂区认证范围](https://www.micron.com/content/dam/micron/global/public/documents/about/certificate/iso-14001.pdf) | 西安是封装测试生产基地。2025–2028 年 ISO 14001 证书附件 /05 涵盖半导体器件和模组产品制造与测试。 | 将器件测试与模组测试分别展示，给模组装联和模组测试设计不同图形。 |
| [历史证书附件 /05 MXA](https://www.micron.cn/content/dam/micron/global/public/documents/about/certificate/iso-14001.pdf) | 西安条目列过测试现场、通电老化、电测后处理、模组与封装装联、裸片回收和仓储物流。这一版证书有效期截至 2025 年 1 月。 | 工作范围可作为选图依据；门户标注「历史认证附件」。 |
| [美光西安在西电发布的 2022 届招聘公告](https://job.xidian.edu.cn/campus/view/id/732615)与[西安 2025 招聘简章](https://51uns.bysjy.com.cn/Announce/Details/3323874?schoolCode=10828) | 西安岗位涉及封装测试、设备自动化、工艺良率、工业工程、质量可靠性和生产主管。技术员职责还涉及新机安装、设备报警、交接记录和停机数据。 | 岗位按招聘届别标注，维护类图标按具体任务细分。本次未核实这些岗位目前是否在招。 |
| [美光 2023 年投资公告](https://investors.micron.com/node/46101/pdf)与[2024-03-27 奠基公告](https://investors.micron.com/node/46886/pdf) | 西安已有 DRAM 封测能力；公告提出引入移动 DRAM、NAND 和 SSD 产品线，并宣布将在西安建立封测制造可持续发展卓越中心。 | 扩建产品和中心单列。此次查到的材料未逐线确认三条产线的实际量产时间。 |
| [西安高新区 PSRG 项目公示](https://xdz.xa.gov.cn/ztzl/hjbh/hjjg/jsxmhbsts/2052277972313362433.html)与[环评审批公告，第 7 项](https://xdz.xa.gov.cn/ztzl/hjbh/hjjg/jsxmhbsts/2057691824989429762.html) | 公示描述已有晶圆研磨产线及拟增设的等离子研磨工序；环评批复日期为 2026-05-18。 | 在「器件封装与晶圆加工」下区分已有研磨工序和获批的 PSRG 改造项目。 |

## 按职责选图

| 使用场景 | 图标键名 | 图形语言 |
| --- | --- | --- |
| 器件封装、测试与工艺改造 | `die-recovery`、`post-electrical`、`plasma-grind` | 回转箭头指向裸片；波形连接处理框；放电符号位于晶圆上方。 |
| 模组装联与验证 | `module-assembly`、`module-test` | 装配图中器件落向板卡，测试图中板卡已插入测试座。 |
| 设备与自动化 | `equipment-auto`、`equipment-commission`、`equipment-alarm`、`downtime` | 机械臂、调试滑轨、报警灯和带暂停键的时钟分别表示四类工作。 |
| 现场与物流 | `production-supervision`、`shift-handover`、`warehouse`、`outbound-logistics` | 人员与看板、交接单、货架、载货车。 |
| 项目与产品方向 | `line-expansion`、`mobile-dram`、`sustainability-coe` | 新增工位、手机内存、厂房与叶片。 |

其余工序复用共享库中的 `burn-in`、`grinding`、`yield-map`、`industrial`、`reliability`、`nand` 和 `ssd` 等图标。西安节点的数据和引用在 `src/xian.js` 中维护，图标源文件为 `lib/backend-icons.jsx`。
