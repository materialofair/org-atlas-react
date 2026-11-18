import React from 'react'

// All glyphs share a 24-unit grid. Separate strokes represent the tool and its workpiece.
const symbol = (name, group, description, path) => ({ name, group, description, path })

export const backendIcons = {
  'org-unit': symbol('通用部门', '通用组织', '组织树表示带下级的部门。节点未指定图标时，有下级自动使用此图。', 'M9 2h6v5H9z M12 7v5M5 16v-4h14v4 M2 16h6v5H2z M16 16h6v5h-6z'),
  team: symbol('通用团队', '通用组织', '并肩的人形适合职能未定的小组。无下级且未指定图标时自动使用。', 'M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M3 20v-2a7 6 0 0 1 14 0v2z M16 5a3 3 0 0 1 0 6m2 2c3 1 4 3 4 6'),
  project: symbol('通用项目组', '通用组织', '旗帜代表共同交付目标，适合专项、试点或临时项目。', 'M5 21V3m0 1c4-3 7 3 13 0v9c-6 3-9-3-13 0 M2 21h7'),
  support: symbol('通用支持组', '通用组织', '耳麦表示响应请求，适合服务窗口、值班或支持团队。', 'M4 13v-2a8 8 0 0 1 16 0v4 M3 12h4v7H3z M17 12h4v7h-4z M19 19q0 3-6 3'),
  coordination: symbol('通用协作组', '通用组织', '两组对接箭头表示交接与协调，适合跨部门协作。', 'M3 8h16l-4-4m4 4-4 4 M21 16H5l4-4m-4 4 4 4'),
  workcell: symbol('通用作业单元', '通用组织', '同一框内的工位表示共同作业，适合产线班组或现场单元。', 'M3 4h18v15H3z M6 8h4v6H6z M14 8h4v6h-4z M6 19v2m12-2v2'),
  'backend-overview': symbol('后道封测总览', '封装与互连', '叠层表示封装制造，波形表示测试验证，两侧端点表示工程、质量与运营支持的协作。用于后道事业群或封测厂区门户。', 'M3 9.5 12 4l9 5.5-9 5.5z M8 9.7l2.1 1.2 1.5-3 1.5 4 2.7-2 M4.5 14l7.5 4.5 7.5-4.5 M4.5 14H1.7m17.8 0h2.8 M7 18l5 3 5-3'),
  package: symbol('封装总成', '封装与互连', '芯体与外部引脚，适合封装装联（Assembly）及器件封装团队。', 'M6 6h12v12H6z M9 9h6v6H9z M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3'),
  wafer: symbol('晶圆', '晶圆加工', '圆片上的管芯阵列，适合晶圆服务、薄化与来料管理团队。', 'M8 21a9.4 9.4 0 1 1 8 0z M7 5v12m5-14v16m5-14v12M4 8h16M3 13h18M6 17h12'),
  dicing: symbol('晶圆切割', '晶圆加工', '圆形刀片沿道切入工件，适合划片、切割与分选团队。', 'M6 13a7 7 0 1 1 12 0 M12 7a1.5 1.5 0 1 0 .01 0z M12 2v2m5 0-1 2m3 2-2 1M7 4l1 2 M3 16h7l2 3 2-3h7v5H3z'),
  bump: symbol('凸块互连', '晶圆加工', '并列的凸点位于晶圆表面，适合铜柱凸块和晶圆级互连团队。', 'M3 16h18v4H3z M5 16v-4a2 2 0 0 1 4 0v4m6 0v-4a2 2 0 0 1 4 0v4M5 7h4m6 0h4'),
  attach: symbol('固晶贴装', '封装与互连', '吸嘴将裸片放到载体上，适合固晶、贴片与装片工程团队。', 'M8 2h8l-1 5-2 2h-2L9 7z M12 9v3m-2-2 2 2 2-2M7 15h10v3H7z M3 18v3h18v-3'),
  bond: symbol('引线键合', '封装与互连', '弧形键合线连接裸片与焊盘，适合铜线、金线及线弧工程团队。', 'M2 20h20M4 17h8v3H4z M8 17v-4c0-9 10-10 10 0v4 M16 18h5'),
  mold: symbol('塑封成型', '封装与互连', '上、下模围住芯体，适合模封、后固化及成型生产团队。', 'M4 4h16v4H4z M12 8v4m-2-2 2 2 2-2 M3 16h4l2-2h6l2 2h4v4H3z'),
  stack: symbol('先进封装', '封装与互连', '多层芯片与基板叠置，适合扇出、倒装和异构集成团队。', 'm2 8 10-5 10 5-10 5z M3 12l9 5 9-5 M3 16l9 5 9-5'),
  finish: symbol('打标编带', '封装与互连', '带孔料带承载成品，适合打标、外观检查及编带团队。', 'M2 6h20v12H2z M6 10h4v4H6z M14 10h4v4h-4z M4 8h.1M12 8h.1M20 8h.1M4 16h.1M12 16h.1M20 16h.1'),
  probe: symbol('晶圆探针', '测试与质量', '倾斜的探针接触晶圆焊盘，适合 CP、探针卡与晶圆测试团队。', 'm12 4 3-2 4 4-2 3z M14 7l-5 7-2 1 1-3 5-6 M3 18h6m3 0h9 M4 21h16'),
  ate: symbol('自动测试', '测试与质量', '测试机屏幕显示数字波形，适合成品电测、ATE 程序与系统级测试团队。', 'M3 4h18v13H3z M5 12h3V8h4v5h3v-3h4 M9 20h6m-3-3v3'),
  reliability: symbol('可靠性验证', '测试与质量', '环境试验箱内的温度计，适合温循、老化及可靠性认证团队。', 'M3 3h18v18H3z M7 6h5v7H7z M16 7v7a2 2 0 1 0 2 0V7a1 1 0 0 0-2 0z M7 17h4'),
  analysis: symbol('失效分析', '测试与质量', '放大镜检查断面缺陷，适合失效定位、物理分析与异常调查团队。', 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z M15 15l6 6 M6 12l3-4 2 4 3-4'),
  equipment: symbol('设备维护', '生产支持', '机械扳手表示设备干预，适合保养、维修及备件团队。', 'M14 3a6 6 0 0 0-7 8l-4 5a2.5 2.5 0 0 0 4 4l5-6a6 6 0 0 0 8-8l-4 4-3-3z M5.5 18.5h.1'),
  planning: symbol('生产计划', '生产支持', '时间轴上的工单表示批次排程，适合工业工程、产能和生产控制团队。', 'M4 3v17h17 M7 6h7v3H7z M11 11h7v3h-7z M16 16h5'),
  materials: symbol('物料供应', '生产支持', '载料箱的箱体与封条，适合基板、引线框架、辅材和仓储团队。', 'm3 7 9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10 M7 5l10 4v4'),
  grinding: symbol('晶背减薄', '晶圆加工', '砂轮位于晶圆截面上方，表示磨削减薄与背面加工。', 'M4 3h12v3H4z M6 6v2h8V6 M4 10h12l-2 3H6z M2 17q10 3 20 0 M2 20q10 3 20 0'),
  'flip-chip': symbol('倒装贴合', '封装与互连', '翻转箭头与面朝下的凸点，适合 FC 贴合和倒装装联团队。', 'M4 8a6 6 0 0 1 10-4l2 2m0-4v4h-4 M6 10h13v4H6z M8 14v2m4-2v2m5-2v2 M3 20h18'),
  rdl: symbol('重布线', '晶圆加工', '焊盘沿两条折线向外引出，适合 RDL 布线及晶圆级互连工艺组。', 'M2 5h4v4H2z M18 15h4v4h-4z M6 7h5l4 5h5 M18 17h-6l-4-5H3 M4 19h4'),
  tsv: symbol('硅通孔互连', '存储产品与先进封装', '纵向导通柱贯穿硅层，适合 TSV 互连与通孔质量团队。', 'M3 6h6m6 0h6v12h-6M9 18H3V6 M9 3h6v18H9z M12 5v14 M5 10h2m10 4h2'),
  hbm: symbol('HBM 堆叠', '存储产品与先进封装', '多层 DRAM 叠在较宽的基础芯片上，适合 HBM 集成及层间互连团队。', 'M6 3h12v3H6z M6 8h12v3H6z M6 13h12v3H6z M3 18h18v3H3z M9 6v2m6-2v2M9 11v2m6-2v2'),
  underfill: symbol('底部填充', '存储产品与先进封装', '材料从侧面流入芯片与基板的间隙，适合底填和 MR-MUF 模塑底填工艺组。', 'M3 5h13v5H3z M3 18h18v3H3z M5 11v4m5-4v4 M21 8c0 3 0 5-3 6-2 1-4 1-6 1m2-2-2 2 2 2'),
  dram: symbol('DRAM 产品', '存储产品与先进封装', '以电容极板表示易失性存储单元，适合 DRAM 产品与电性验证团队。', 'M3 4h7v4h4 M7 8v4m-4 0h8m-8 3h8m-4 0v5 M16 4h5v15h-6m1-8h3m-3 4h3'),
  nand: symbol('NAND 闪存', '存储产品与先进封装', '串联单元与公共通道，适合闪存产品工程与测试团队。', 'M7 2v3m0 4v2m0 4v2m0 4v1 M4 5h6v4H4z M4 11h6v4H4z M4 17h6v4H4z M10 7h9m-9 6h9m-9 6h9'),
  dimm: symbol('内存模组', '存储产品与先进封装', '带金手指的内存条上排列多颗器件，适合 DIMM 装联与模组验证。', 'M2 6h20v11H2z M5 9h3v4H5z M10 9h3v4h-3z M15 9h3v4h-3z M4 17v2m3-2v2m3-2v2m5-2v2m3-2v2'),
  ssd: symbol('固态硬盘', '存储产品与先进封装', '板卡轮廓内区分主控、存储区和边缘接口，适合 SSD 装联与产品测试。', 'M3 4h16l2 2v14H3z M6 7h5v5H6z M14 8h4m-4 3h4M6 15h10m-9 5v-2m3 2v-2m3 2v-2'),
  'burn-in': symbol('通电老化', '测试与质量', '机架上的样品托盘配以电流符号，适合 Burn-in 老化筛选团队。', 'M3 3h11v18H3z M5 7h7m-7 5h7m-7 5h5 M20 5l-4 8h4l-2 6 5-9h-4z'),
  slt: symbol('系统级测试', '测试与质量', '处理器连接系统主板接口，适合 SLT 与整机使用场景验证。', 'M2 4h20v16H2z M5 8h6v6H5z M11 10h3l2-3h3 M11 12h3l2 4h3 M5 17h3'),
  binning: symbol('测试分档', '测试与质量', '一个输入分向三个分档箱，适合性能分档、分选及测试数据团队。', 'M10 2h4v4h-4z M12 6v7m-8 1v-4h16v4 M2 15h4v6H2z M10 15h4v6h-4z M18 15h4v6h-4z'),
  'test-solutions': symbol('测试解决方案', '工程与产品导入', '程序括号围住测试脉冲，适合 TSE、测试程序与平台开发团队。', 'M6 4H3v16h3m12-16h3v16h-3 M5 13h4l2-6 3 10 2-5h3'),
  characterization: symbol('电性表征', '测试与质量', '坐标轴上的两条特性曲线，适合产品表征与测试边界评估。', 'M3 3v17h18 M6 16c5 0 4-11 14-11 M6 18c7 0 6-9 14-9'),
  'yield-map': symbol('良率分析', '测试与质量', '晶圆图中标记异常区域，适合良率改善与空间缺陷分析。', 'M8 21a9.4 9.4 0 1 1 8 0z M7 7h3v3H7z M13 7h3v3h-3z M7 13h3v3H7z M13 13l4 4m0-4-4 4'),
  'process-integration': symbol('制程整合', '工程与产品导入', '两条工序路线汇入同一节点，适合 PIE、新流程整合与异常协调。', 'M2 3h5v5H2z M2 16h5v5H2z M7 5h2l5 7h3M7 19h2l5-7 M17 10h5v5h-5z'),
  industrial: symbol('工业工程', '生产支持', '工位节拍表与计时指针，适合 IE、产能建模和瓶颈分析。', 'M8 3h6m-3 0v2 M17 8a7 7 0 1 0 0 9 M11 8v5l3-2 M17 20v-5m4 5V9'),
  manufacturing: symbol('量产制造', '生产支持', '厂房锯齿顶和产线窗口，适合 MFG、班组生产与现场运营。', 'M2 21V10l6-4v5l6-4v5h3l1-9h3l1 18z M5 16h2m3 0h2m3 0h2'),
  'quality-engineering': symbol('质量工程', '测试与质量', '检验表上的勾选项，适合 QE、质量控制及异常处置团队。', 'M8 4H4v17h16V4h-4 M8 2h8v4H8z M7 11l2 2 3-4m2 3h3 M7 17h10'),
  ehs: symbol('环境健康与安全', '生产支持', '叶片嵌在防护盾内，适合 EHS、职业健康与现场安全团队。', 'M12 2l8 3v6c0 6-5 9-8 11-3-2-8-5-8-11V5z M8 15c-2-5 2-7 8-8 0 5-2 9-6 8m-2 2 5-6'),
  facilities: symbol('厂务系统', '生产支持', '阀门与公用管线，适合 FAC、洁净室设施和公用工程团队。', 'M3 13h5l4 3-4 3H3z M21 13h-5l-4 3 4 3h5z M12 15V8 M8 5h8v3H8z M2 11v10m20-10v10'),
  'product-engineering': symbol('产品工程', '工程与产品导入', '芯片旁的测量标尺，适合 PE、产品验证与量产表现分析。', 'M3 6h11v12H3z M6 9h5v6H6z M5 3v3m5-3v3M5 18v3m5-3v3 M17 3h4v18h-4z M17 7h2m-2 5h2m-2 5h2'),
  'application-engineering': symbol('应用工程', '工程与产品导入', '主机屏幕接到外部器件，适合 AE、客户平台与应用验证团队。', 'M2 3h15v10H2z M9 13v4m-4 0h8 M17 8h3v6 M15 15h7v6h-7z M17 18h3'),
  'project-management': symbol('项目管理', '工程与产品导入', '时间线上的菱形里程碑，适合跨部门 PM 与产品交付协调。', 'M2 12h4m5 0h3m5 0h3 M8 8l4 4-4 4-4-4z M17 5l3 3-3 3-3-3z M17 11v7m-4 1h7'),
  'customer-certification': symbol('客户认证', '工程与产品导入', '验证报告附带认可章，适合客户样品认证与交付验收团队。', 'M11 21H3V3h13v6 M6 7h7m-7 4h4 M20 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M14 18l-1 4 3-2 3 2-1-4'),
  traceability: symbol('批次追溯', '生产支持', '扫描框内的条码表示批次身份，适合在制品履历与物料追踪。', 'M2 8V4h4m12 0h4v4M2 16v4h4m12 0h4v-4 M6 8v8m3-8v8m4-8v8m2-8v8m3-8v8'),
  optical: symbol('光学外观检查', '测试与质量', '相机镜头朝向样品台，适合 AOI 与外观检验团队。', 'M4 4h16v6h-4l-2 4h-4l-2-4H4z M10 7h4 M12 16v2m-4-3-2 2m10-2 2 2 M3 21h18'),
  metrology: symbol('尺寸量测', '测试与质量', '卡尺的固定爪与游标夹住工件，适合厚度、间隙和尺寸量测。', 'M2 5h20v4H2z M4 9v10l3-3v-5m5-2v10l-3-3v-5 M8 5v2m5-2v2m5-2v2'),
  npi: symbol('新品导入', '工程与产品导入', '样品沿箭头跨入量产窗口，适合 NPI、试产移交与爬坡团队。', 'M2 7h7v7H2z M6 16v3h8m-3-3 3 3-3 3 M13 3h8v12h-5m-3-12v5'),
  'thermal-cycle': symbol('温度循环', '测试与质量', '循环箭头环绕冷热温标，适合温循试验与环境应力验证。', 'M3 10a9 9 0 0 1 16-4l2 2m0-5v5h-5 M21 14a9 9 0 0 1-16 4l-2-2m0 5v-5h5 M11 7v6a2 2 0 1 0 2 0V7a1 1 0 0 0-2 0z'),
  'fan-out': symbol('扇出封装', '存储产品与先进封装', '中央裸片的连接向四角展开，适合扇出封装和面板级互连团队。', 'M8 8h8v8H8z M8 10H5L2 7m6 7H5l-3 3m14-7h3l3-3m-6 7h3l3 3 M10 8V4L8 2m6 6V4l2-2m-6 14v4l-2 2m6-6v4l2 2'),
  'capacity-model': symbol('产能建模', '生产支持', '目标容量线叠加柱形负载，适合工业工程 IE 的产能评估。', 'M3 3v18h18 M6 17v-5h3v5z M12 17V8h3v9z M18 17V6h3v11z M5 5h4m2 0h3'),
  'lot-flow': symbol('在制品流转', '生产支持', '批次托盘沿箭头移交，适合生产制造 MFG 的在制品控制。', 'M2 5h7v6H2z M5 5v2 M15 14h7v6h-7z M18 14v2 M11 7h7v4m-3-2 3 3 3-3'),
  'process-transfer': symbol('制程移交', '工程与产品导入', '样品跨过交接线进入产线，适合制程整合 PIE 与量产移交。', 'M2 7h5v5H2z M11 3v4m0 9v5 M7 12h10m-3-3 3 3-3 3 M18 17h4v4h-4z'),
  'test-coverage': symbol('测试覆盖', '测试与质量', '测试矩阵中的勾选格表示覆盖项目，适合产品工程测试 TSE。', 'M3 3h18v18H3z M3 9h18M9 3v18 M12 15l2 2 4-5 M5 6h1'),
  'quality-release': symbol('质量放行', '测试与质量', '批次越过检验关卡，适合质量 QE 放行和异常品处置。', 'M3 4h10v8H3z M5 8l2 2 4-4 M3 17h15m-4-4 4 4-4 4 M21 12v9'),
  'water-systems': symbol('厂务水系统', '生产支持', '水滴和双层水面表示水处理与供水，用于厂务水务团队。', 'M12 2c-2 4-6 7-6 11a6 6 0 0 0 12 0c0-4-4-7-6-11z M9 13q0 3 3 3 M3 21h18'),
  'power-systems': symbol('厂务电力', '生产支持', '配电柜内的闪电表示电能分配，用于供配电团队。', 'M4 2h16v20H4z M13 5l-5 8h4l-1 5 6-9h-5z'),
  'gas-systems': symbol('气体与化学品', '生产支持', '阀头和双储罐表示集中供给，用于厂务气化系统。', 'M4 3h5m-3 0v3 M3 9q0-3 3-3h1q3 0 3 3v11H3z M15 3h5m-3 0v3 M14 9q0-3 3-3h1q3 0 3 3v11h-7z M4 13h5m6 0h5'),
  'air-systems': symbol('厂务空调', '生产支持', '三片风叶围绕轴心旋转，用于空调和空气处理团队。', 'M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M11 10c-4-2-3-6 0-8 3 1 5 5 2 8 M14 12c4-2 7 1 7 5-3 2-7 1-8-3 M11 14c0 5-4 6-8 4 0-4 3-7 7-6'),
  'fab-utilities': symbol('厂务公用系统', '生产支持', '主管连接多个供给支路，适合厂务 FAC 的水、电、气等运行团队。', 'M3 4h18v4H3z M6 8v6m6-6v6m6-6v6 M3 15h6v5H3z M11 15h3v5h-3z M17 15h4v5h-4z'),
  'die-recovery': symbol('裸片回收', '封装与互连', '托盘上的裸片配以回转箭头，适合 Die Recovery 活动。', 'M5 11h8v7H5z M2 20h15 M9 6a7 7 0 0 1 12 5m0 0V6m0 5h-5'),
  'post-electrical': symbol('电测后处理', '测试与质量', '测试波形结束后进入下一处理框，适合 Post Electrical。', 'M2 9h3l2-5 3 10 2-5h3 M4 18h9m-3-3 3 3-3 3 M16 13h6v8h-6z'),
  'module-assembly': symbol('模组装联', '存储产品与先进封装', '待装器件落在长条模组板上，适合内存模组装配。', 'M9 2h6v4H9z M12 8v4m-2-2 2 2 2-2 M2 14h20v5H2z M5 19v2m3-2v2m8-2v2m3-2v2'),
  'module-test': symbol('模组测试', '测试与质量', '插入测试座的模组带有状态波形，用于模组电性验证。', 'M3 5h18v9H3z M5 10h3l2-3 3 5 2-3h4 M5 16v3h14v-3 M8 19v2m8-2v2'),
  warehouse: symbol('仓储管理', '生产支持', '货架分层放置周转箱，适合内部仓库、外部仓储和物料保管。', 'M3 3v18m18-18v18 M3 12h18M3 19h18 M5 6h6v6H5z M14 7h5v5h-5z M8 14h8v5H8z'),
  'outbound-logistics': symbol('物流交接', '生产支持', '载货车与车轮表示批次运输、配送和交接。', 'M2 5h12v11H2z M14 9h4l4 4v3h-8 M7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'),
  'equipment-auto': symbol('设备自动化', '生产支持', '关节机械臂与末端夹爪表示自动上下料和设备自动化。', 'M3 21h10m-8 0v-3h6v3 M8 18l3-8-5-4 2-3 8 6-5 9 M15 8l4-3m-1-2 3 1 1 3'),
  'equipment-commission': symbol('设备调试', '生产支持', '三道调节滑轨用于设备安装后的调试与验收。', 'M4 3v6m0 5v7M2 9h4v5H2z M12 3v11m0 4v3m-2-7h4v4h-4z M20 3v3m0 5v10m-2-15h4v5h-4z'),
  'equipment-alarm': symbol('设备报警', '生产支持', '带警示信号的灯塔表示机台报警与现场响应。', 'M6 18v-6a6 6 0 0 1 12 0v6 M4 18h16v3H4z M12 2v2M3 6l2 2m16-2-2 2 M12 9v4m0 2v.1'),
  downtime: symbol('停机分析', '生产支持', '时钟旁的暂停键表示停机时长与设备利用率分析。', 'M15 4a8 8 0 1 0-5 15 M10 6v6l3 2 M15 12h2v9h-2z M20 12h2v9h-2z'),
  'shift-handover': symbol('轮班交接', '生产支持', '交接单与指向下一班的箭头，适合异常记录与值班交接。', 'M12 20H3V3h13v7 M6 7h7m-7 4h4m-4 4h3 M12 15h9m-4-4 4 4-4 4'),
  'plasma-grind': symbol('等离子研磨', '晶圆加工', '放电符号位于晶圆截面上方，适合 PSRG 晶圆减薄改造项目。', 'M4 3h16v3H4z M8 8l-2 4h3l-2 3m8-7-2 4h3l-2 3 M2 18q10 3 20 0m-20 3q10 3 20 0'),
  'sustainability-coe': symbol('制造可持续发展', '生产支持', '厂房与叶片结合，用于制造可持续发展卓越中心及协作项目。', 'M2 21V10l5-3v4l5-3v5 M2 21h19 M5 16h2m2 0h2 M14 16c-3-5 1-10 8-11 0 7-2 11-8 11zm-1 4 6-11'),
  'mobile-dram': symbol('移动内存', '存储产品与先进封装', '手机轮廓内的存储芯片表示移动 DRAM 产品和导入项目。', 'M6 2h12v20H6z M9 8h6v6H9z M10 6v2m3-2v2m-3 6v2m3-2v2 M11 19h2'),
  'line-expansion': symbol('产线扩建', '生产支持', '已有工位旁的新增工位和加号，表示扩建规划与新线导入。', 'M2 10h8v8H2z M14 10h8v8h-8z M4 21h16 M18 2v6m-3-3h6 M4 13h4m9 1h2'),
  'production-supervision': symbol('生产现场管理', '生产支持', '人员轮廓配合产线看板，用于生产主管与现场管理岗位。', 'M9 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M1 20v-3a5 5 0 0 1 10 0v3 M13 3h9v12h-9z M15 7h5m-5 4h3'),
  'external-assembly': symbol('外部封装工程', '封装与互连', '封装框中的裸片与外侧接口相连，适合外部封装工程协作。', 'M3 5h13v14H3z M6 9h7v6H6z M16 9h5V5m-2 2 2-2 2 2 M16 15h5v4'),
  'module-fa': symbol('模组失效分析', '测试与质量', '模组板上的器件与放大镜表示定位失效位置，适合 Module FA。', 'M2 5h19v5 M10 15H2V5 M5 8h3v3H5z M11 8h3 M5 15v3m3-3v3 M19 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M18 17l4 4'),
  'qms': symbol('质量管理体系', '测试与质量', '带勾选标记的受控文件叠页，适合 QMS 及体系审核团队。', 'M2 6v15h13 M6 2h12l3 3v13H6z M17 2v4h4 M9 9l1 1 2-3m2 2h3 M9 14l1 1 2-3m2 2h3'),
  'supply-planning': symbol('供应计划', '生产支持', '日程表与待交付箱件相叠，表示按时间协调供料与发运。', 'M9 17H3V4h16v4 M3 8h13 M7 2v4m7-4v4 M6 11h3m-3 3h2 M12 13l5-3 5 3v6l-5 3-5-3z M12 13l5 3 5-3m-5 3v6'),
}

export function getDepartmentIcon(node) {
  if (Object.hasOwn(backendIcons, node.icon)) return node.icon
  return node.children?.length ? 'org-unit' : 'team'
}

export function BackendIcon({ name, size = 24, label, className }) {
  if (!Object.hasOwn(backendIcons, name)) return null
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" className={className}
    data-backend-icon={name} aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    <path d={backendIcons[name].path} />
  </svg>
}
