# org-atlas-react

用于 React 的部门组织浏览组件。首页显示根部门和直属部门，点击卡片可逐级浏览。只要提供稳定的 ID 和部门名称即可浏览，负责人和职责介绍可按需补充。根部门默认为第一级，可用 `rootLevel` 指定它在公司中的实际层级。层级由每个节点的 `children` 决定，可省略该字段或传入空数组结束分支。同一组织中，部门可以分别在二级、三级或更深处结束。

## 安装与使用

最低版本为 React 18.0.0。组件使用宿主项目的 React 实例，Web 项目请搭配相同版本的 React DOM。示例组织和负责人均为虚构数据。

从 [GitHub Releases](https://github.com/materialofair/org-atlas-react/releases) 可下载源码、已编译的组件安装包和静态 Demo。接入步骤、源码入口和验证命令也整理在 [AGENTS.md](AGENTS.md)。

如需自己构建安装包：

```sh
git clone https://github.com/materialofair/org-atlas-react.git
cd org-atlas-react
npm ci
npm pack
```

将生成的压缩包复制到宿主项目，在宿主项目目录执行：

```sh
npm install ./org-atlas-react-1.4.0.tgz
```

```tsx
import { OrgExplorer, type Department } from 'org-atlas-react'
import 'org-atlas-react/style.css'

const organization: Department = {
  id: 'assembly',
  name: '封装制造部',
  icon: 'package',
  leader: '陈思远',
  description: '负责裸片装联、引线键合与模封。',
  children: [{
    id: 'wire-bond',
    name: '引线键合课',
    icon: 'bond',
    leader: '陆明',
    description: '负责芯片焊盘至封装载体的引线互连。',
  }],
}

export function OrganizationPage() {
  return <OrgExplorer root={organization} theme="system" />
}
```

## 二级部门门户

将门户部门及其下属团队作为 `root` 传入。下面的接法会将封装制造部标为二级，其直属团队标为三级。搜索、同级切换和面包屑的范围均由传入的部门树决定。

```tsx
export function AssemblyPortal({ department }: { department: Department }) {
  return <OrgExplorer root={department} rootLevel={2} title="封装制造部门户" />
}
```

## 半导体后道演示与图标

首页是二级封装制造部门户，可进入引线键合、固晶贴装、塑封成型、切单成型、成品后处理和封装工艺整合六个团队。页尾的“查看事业群全貌”可切至八个二级部门。选取引线键合课 → 铜线生产组 → QFN 键合线 → 甲班键合班组 → 细线键合单元，可从三级走到七级。

顶栏的“图标库”（`?view=icons`）收录 48 枚图标，覆盖晶圆加工、封装与互连、存储产品与先进封装、测试与质量、工程与产品导入、生产支持六类。可按中文职责、英文标识或缩写（例如 TSE、TSV、HBM）检索。每项列有图形含义、适用团队和英文标识。通过 `Department.icon` 指定标识；缺省时组件显示通用部门图标。也可在组件外使用：

```tsx
import { BackendIcon, backendIcons } from 'org-atlas-react'

<BackendIcon name="bond" size={28} label={backendIcons.bond.name} />
```

React 组件使用 `currentColor` 跟随主题；相邻已有文字时可省略 `label`。独立 SVG 图标包随 Release 提供，内含中文说明和 MIT 许可证。本地执行 `npm run export:icons` 可在 `dist/backend-icons/` 生成相同内容。

### 行业依据

美光台湾岗位地图中的九类后道职能，以及 SK 海力士公开的 HBM PE 团队分工，已映射到本项目的图标键名。选图示例、公开出处与 Demo 路径见[存储器后道团队与图标选用](https://github.com/materialofair/org-atlas-react/blob/v1.4.0/docs/memory-backend.md)。

| 公开业务与工艺 | 演示中的组织划分 |
| --- | --- |
| [Amkor 的装联说明](https://amkor.com/blog/automotive-chip-shortages-an-assembly-perspective/)介绍了划片、固晶和引线键合的关系。 | 把晶圆加工与封装制造设为两个部；键合、固晶和塑封各有直属团队。 |
| [日月光凸块服务](https://ase.aseglobal.com/bumping-services/)及 [Amkor 封装技术](https://amkor.com/technology/)列出铜柱、倒装和堆叠等能力。 | 晶圆加工部下设铜柱凸块课；先进封装部覆盖倒装、扇出和重布线。 |
| [Amkor 测试服务](https://amkor.com/test-services/)分别列出晶圆探针、成品与系统级测试；[日月光实验室](https://ase.aseglobal.com/lab-services/)覆盖材料、热应力和失效分析。 | 测试工程部负责量产电测；质量与可靠性部负责试验验证和失效分析。 |

以上来源支持工艺和能力的选择。设备工程、生产运营、物料供应的划分，以及部门名称、汇报关系、七级班组和负责人均为演示建模。首页的引线键合 BGA 分解图由 ImageGen 生成，用作结构示意。

## 组件接口

| 属性 | 用途 |
| --- | --- |
| `root` | 部门树。每个节点必填全树唯一的字符串 `id` 和显示名称 `name`。`leader`、`description` 可省略，也可为 null、空字符串或空白字符。叶节点可省略 `children`。 |
| `rootLevel` | 根部门在公司中的实际层级，取正整数，默认 1。 |
| `title` | 顶栏的门户名称，默认“组织图谱”。 |
| `selectedId` | 受控浏览时由宿主指定当前部门。省略时组件在内部管理选择。 |
| `onNavigate(node)` | 用户进入部门或点击上级时收到目标节点。受控模式下由宿主更新 `selectedId`。 |
| `getHref(node)` | 可选的真实链接生成函数，适用于浏览器历史、直接访问和新标签页。由宿主从 URL 还原 `selectedId`。 |
| `theme` | `light`、`dark` 或默认的 `system`。后者会跟随设备设置。 |
| `className` | 附加到组件根元素，可用于限定自定义主题。 |
| `renderArtwork(node)` | 可按当前部门返回详情区的装饰插图，默认展示园区插画。 |
| `toolbar` | 顶栏右侧的 React 节点。Demo 在这里放置主题选择器。 |

## 主题与 Tailwind CSS

组件采用 shadcn/ui 风格和语义化 CSS 变量，以 Tailwind CSS 4 编译。导入包内样式即可使用。宿主项目可以继续使用自己的 Tailwind 配置。可通过组件的 `className` 覆盖局部主题，例如：

```tsx
<OrgExplorer root={organization} theme="light" className="company-org" />
```

```css
.company-org {
  --primary: #235da8;
  --primary-foreground: #fff;
  --ring: #4178bd;
  --radius: 0.75rem;
}
```

使用 `selectedId` 和 `onNavigate` 可接入已有路由。仓库内的 `src/main.jsx` 演示了完整的 hash 路由、浏览器历史和主题持久化。

## 本地开发

```sh
npm ci
npm run dev -- --port 5188
```

启动后，打开 `/?levels=2` 查看两级组织，`/?levels=3` 查看同时含二级和三级末级部门的组织。默认首页展示封装制造部门户，`/?levels=7` 可以浏览全组织。

- `npm run build` 生成组件库和生产版 Demo，分别位于 `dist/lib` 与 `dist/demo`。
- `npm pack` 重新构建库并在当前目录生成可分发的 tgz。
- `npm run test:browser` 验证七级下穿、返回、主题和移动布局。先启动 Demo，本机需要 Chrome 或通过 `npx playwright install chromium` 安装 Chromium。可用 `ORG_DEMO_URL` 指定测试地址。
- `node tests/react-compat.mjs 18.0.0 ./org-atlas-react-1.4.0.tgz` 在临时宿主中安装指定 React 版本和组件包，完成生产构建并在浏览器中验证七级往返。已验证 18.0.0、18.2.0、18.3.1 和 19.3.1。
- `src/departments.js` 存放可替换的示例组织数据。

## 许可证

本项目使用 [MIT 协议](LICENSE)。发行包中的 Lucide 图标及其 Feather 衍生图标沿用各自的 ISC / MIT 声明，全文随包附于 `dist/lib/LICENSE-lucide.txt`。
