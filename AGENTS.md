# org-atlas-react 工作指南

本仓库同时交付可嵌入的 React 组件和一个演示网站。接入已有门户，使用包导出的 `OrgExplorer`；修改组件行为，编辑 `lib/`；调整演示数据或 URL，编辑 `src/`。

## 先跑起来

在仓库根目录使用 npm 和锁文件。Vite 8 要求 Node 20.19+（20.x）或 22.12+。

```sh
npm ci
npm run dev -- --port 5188
```

打开 `http://127.0.0.1:5188/`。默认首页是美光后道封测门户，应显示“二级部门”和九张职能卡。美光公开职能来自台湾职类地图，下级为演示编组，负责人留空。`/?levels=2`、`/?levels=3` 和 `/?levels=7` 分别演示两级、混合深度和完整组织数据。`/?site=xian` 打开独立西安资料目录，按 `lib/micron-xian.js` 的条目来源更新，范围见 `docs/xian-backend.md`。

`/?view=icons` 展示图标及其使用说明。三星、SK 海力士与长鑫集合由 `lib/production-collections.js` 维护，更新职能时同步核对 `docs/samsung-hynix.md` 或 `docs/cxmt-backend.md`。`?site=micron-hq` 打开总部职能页；`lib/micron-hq.js` 同时驱动职能树与图标集合。`productionCollections.micron` 汇总台湾（`lib/micron-taiwan.js`）、IT、运营、总部与西安；保留原总部子集供宿主兼容。图鉴将 `collection=xian` 和 `collection=micron-hq` 归一为 `collection=micron`，保留部门哈希。新增图标需验证所有预设的浅深模式、外部 SVG 遮罩和配色导出。Demo 总览编辑入口在 `src/OverviewArtwork.jsx`，宿主可用 `BackendOverview.items` 配置 4～7 个图标与标签。宽幅总图的单一图形源是 `lib/BackendOverview.jsx`，从这里修改后重新构建组件和独立 SVG。部署构建后的 Demo 时，通过 HTTP 静态服务打开解压目录的 `index.html`。

## 在其他项目里使用

从 GitHub Release 下载名为 `org-atlas-react-<版本>.tgz` 的组件包，例如将 v1.19.1 的包放在宿主项目根目录后执行 `npm install ./org-atlas-react-1.19.1.tgz`。Web 宿主使用版本匹配的 React 18+ 和 React DOM。CSS 已随包编译，导入一次即可。

```tsx
import { OrgExplorer, type Department } from 'org-atlas-react'
import 'org-atlas-react/style.css'

export function DepartmentPortal({ department }: { department: Department }) {
  return <OrgExplorer root={department} rootLevel={2} title="部门门户" />
}
```

- 每个节点使用稳定且全树唯一的字符串 `id` 和部门名称 `name`。`children` 可省略或为空数组，`leader`、`description` 可缺省。更新数据时传入新的树对象。
- `root` 决定浏览和搜索的范围，`rootLevel` 决定层级编号。公司首页一般从 1 开始，二级部门门户传对应子树和 2。
- 默认点击由组件维护选中项。需要深链时由宿主管路由，传 `selectedId`、`onNavigate(node)`、`getHref(node)`。完整示例见 `src/main.jsx`，包括前进后退、刷新和越界 ID 回退。
- 主题支持 `light`、`dark`、`system`。可在组件的 `className` 对应元素上覆盖语义颜色变量。完整属性见 `lib/index.d.ts`，示例见 README。

## 改动落点

| 需求 | 从这里开始 |
| --- | --- |
| 下穿、返回焦点、面包屑、搜索、同级切换 | `lib/OrgExplorer.jsx` |
| 卡片尺寸、窄屏控件、明暗主题、宿主嵌入 | `lib/style.css`。断点跟随组件容器宽度 |
| 新增公开属性或导出 | 同步 `lib/index.js`、`lib/index.d.ts`、README 和调用示例 |
| 后道图标形状、说明和展示页 | `lib/backend-icons.jsx`、`lib/index.d.ts`、`src/IconCatalog.jsx`。行业依据见 `docs/memory-backend.md`。新增图标时同步键名类型和示例数据，执行 `npm run export:icons` 检查独立 SVG，并用 `npm run test:icons` 检查全库边界和导出轮廓。 |
| 单图导出与下载 | `lib/icon-export.js` 读取注册表的相同 path，提供源码与 Blob API。`src/IconExportDialog.jsx` 管理预览与下载，`tests/icon-export.browser.mjs` 解码检查四种格式。 |
| 芯片全流程专题 | `lib/chip-lifecycle.js` 维护从设计到交货的工段及出处，通过 `productionCollections.lifecycle.sections` 读取。与后道专题共用工位键。 |
| 后道制造工序专题 | `productionCollections.process.sections` 定义工段、选图与原始资料。区分引线框架和基板路线，在 `?view=icons&collection=process` 检查新增工位。 |
| 京元专业测试专题 | `lib/production-collections.js`、`docs/kyec-testing.md`。集合 ID 为 `kyec`，保留专业测试厂的排名口径。 |
| 演示组织及门户根节点 | `src/departments.js` |
| 演示路由、主题持久化与门户工具栏 | `src/main.jsx`、`src/style.css` |
| 发包内容、外置 React、声明和图标许可 | `package.json`、`vite.lib.config.js` |
| Demo 生产构建和开发别名 | `vite.config.js`。开发时指向库源码，生产构建使用包的导出 |

## 验证一次改动

保持开发服务运行，在另一个终端执行 `npm run test:browser`。测试默认连接 5188，可用 `ORG_DEMO_URL` 指向其他预览地址。macOS 安装了 Google Chrome 时使用本机 Chrome，其他环境可先执行 `npx playwright install chromium`。

样式改动要核对真实窗口中的等高卡片、长名称、纯名称、下拉箭头和键盘焦点。功能改动要从门户根节点进入末级，再从上级、面包屑和浏览器历史返回。Demo 回归用例放入 `tests/explorer.browser.mjs`，独立宿主接入用例放入 `tests/react-compat.mjs`。验证生产版时使用：

```sh
npm run build
npm run preview -- --port 5189
# 在另一个终端运行
ORG_DEMO_URL=http://127.0.0.1:5189 npm run test:browser
```

验证交付给宿主的真实文件时：

```sh
npm pack
version=$(node -p 'require("./package.json").version')
node tests/react-compat.mjs 18.0.0 "./org-atlas-react-${version}.tgz"
node tests/react-compat.mjs 19.3.1 "./org-atlas-react-${version}.tgz"
```

该测试会新建临时项目，严格安装指定的 React / React DOM 与组件包，验证生产构建、320px 长标题和长姓名、多实例快捷键，以及无法绘制装饰图时的七级往返。

## 交付文件

源码 ZIP 从发布标签对应的 Git 提交导出，包含此指南、源码、锁文件和测试。组件 TGZ 由 `npm pack` 生成，含 ESM、CSS、类型及许可证。静态 Demo ZIP 的网站入口为 `dist/demo` 的内容，随附依赖许可。Release 中的 `SHA256SUMS` 用于校验源码、组件、Demo 和独立 SVG 图标包。发布时核对标签、远端提交、压缩包文件清单，并从 GitHub 下载资产验证校验值。在下载目录执行 `shasum -a 256 -c SHA256SUMS`（Linux 可用 `sha256sum -c SHA256SUMS`）。
