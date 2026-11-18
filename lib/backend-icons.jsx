import React from 'react'

// All glyphs share a 24-unit grid. Separate strokes represent the tool and its workpiece.
const symbol = (name, group, description, path) => ({ name, group, description, path })

export const backendIcons = {
  package: symbol('封装总成', '封装与互连', '芯体与外部引脚，适合封装制造、事业群及产品整合团队。', 'M6 6h12v12H6z M9 9h6v6H9z M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3'),
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
}
export function BackendIcon({ name, size = 24, label, className }) {
  if (!Object.hasOwn(backendIcons, name)) return null
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" className={className}
    data-backend-icon={name} aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    <path d={backendIcons[name].path} />
  </svg>
}
