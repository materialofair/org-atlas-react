# org-atlas-react

用于 React 的部门组织浏览组件。首页显示根部门和直属部门，点击卡片可逐级浏览。只要提供稳定的 ID 和部门名称即可浏览，负责人和职责介绍可按需补充。根部门默认为第一级，可用 `rootLevel` 指定它在公司中的实际层级。层级由每个节点的 `children` 决定，可省略该字段或传入空数组结束分支。同一组织中，部门可以分别在二级、三级或更深处结束。

## 安装与使用

最低版本为 React 18.0.0。组件使用宿主项目的 React 实例，Web 项目请搭配相同版本的 React DOM。默认 Demo 采用美光台湾公开的后道职能，也可切换到西安厂区，按本地资料浏览。

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
npm install ./org-atlas-react-1.10.0.tgz
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

默认首页为二级「美光后道封装测试」。九张职能卡片可直接进入对应团队；页尾可打开上级目录。示例七级路径为美光台湾 → 后道封装测试 → 封装 → 引线键合 → 键合生产组 → 键合轮班组 → 键合作业单元。

图标库（`?view=icons`）收录 132 枚图标。拿不准专业图标时，可以选择通用部门 `org-unit`、团队 `team`、项目 `project`、支持 `support`、协作 `coordination` 或作业单元 `workcell`。也可以直接省略 `Department.icon`，有下级会显示部门图标，末级会显示团队图标。未知键同样适用此规则。自定义详情插图时可用 `getDepartmentIcon(node)` 获取与卡片一致的图标。也可在组件外使用：

```tsx
import { BackendIcon, backendIcons } from 'org-atlas-react'

<BackendIcon name="bond" size={28} label={backendIcons.bond.name} />
```

后道总部门或厂区可设置 `icon: 'backend-overview'`，封装装联部门使用 `icon: 'package'`。页头可传 `brandMark={<BackendIcon name="backend-overview" size={23} />}`。支持导入静态资源的宿主可从 `org-atlas-react/backend-overview.svg` 引入宽幅插图，独立 SVG 包也附有 `artwork/backend-overview.svg`。

宽幅图需要随宿主换色时，使用 `<BackendOverview color="var(--primary)" />`。省略 `color` 时依次读取 `--org-art-accent`、`--org-primary` 和 `--primary`。图形从同一个颜色派生亮面、侧壁、触点和连线。组件可从 `org-atlas-react` 导入。在 Demo 右上角色点选择松绿、靛蓝、梅紫、赤铜或石墨，旁边的选择器控制明暗模式。直接使用 `<img>` 的网站可从独立图标包的 `artwork/` 目录选择五种颜色各自的浅色与深色 SVG。

图鉴中「三星 TSP」和「SK 海力士 P&T」按公开职能分组，每组链接到原始资料。深链分别为 `?view=icons&collection=samsung` 和 `?view=icons&collection=hynix`。Release 的 `production-icons.zip` 专题包按公司分目录保存 SVG、中文说明及职能出处，本地执行 `npm run export:icons` 会生成 `dist/production-icons/`。宿主可以导入 `productionCollections`，读取每家公司的 `sections`、`source` 和图标键名数组 `icons`。[调研与选图说明](https://github.com/materialofair/org-atlas-react/blob/v1.10.0/docs/samsung-hynix.md)

「长鑫存储 CXMT」集合可通过 `?view=icons&collection=cxmt` 打开，或在宿主读取 `productionCollections.cxmt`。[下载长鑫独立 SVG 包](https://github.com/materialofair/org-atlas-react/releases/download/v1.10.0/org-atlas-react-1.10.0-cxmt-icons.zip)。28 枚图标按职责分为计划与调度、外包管理、后道采购、晶圆测试、委外封装、成品测试、模组加工测试及研发。[长鑫职能与选图依据](https://github.com/materialofair/org-atlas-react/blob/v1.10.0/docs/cxmt-backend.md)

React 组件使用 `currentColor` 跟随主题；相邻已有文字时可省略 `label`。独立 SVG 图标包随 Release 提供，内含中文说明和 MIT 许可证。本地执行 `npm run export:icons` 可在 `dist/backend-icons/` 生成相同内容。

### 美光总部与图标主题

打开 `?site=micron-hq` 查阅 Boise 职能和全球运营背景，`?view=icons&collection=micron-hq` 直达 25 枚图标。[下载总部独立 SVG 包](https://github.com/materialofair/org-atlas-react/releases/download/v1.10.0/org-atlas-react-1.10.0-micron-hq-icons.zip)。完整来源和岗位范围见[总部调研](https://github.com/materialofair/org-atlas-react/blob/v1.10.0/docs/micron-hq.md)。

全部团队图标支持以下三种接入方式：

- **React 或内联 SVG**：默认跟随文字颜色。可传 `<BackendIcon name="probe-card" color="var(--primary)" />`，或用 Tailwind 的 `className="text-primary"`。组织卡片自动使用宿主主题主色。
- **外部 SVG 随页面实时换色**：导入 `org-atlas-react/icon-mask.css` 或使用 SVG 包中的 `icon-mask.css`，给元素设置 `class="org-icon-mask"` 和 `style="--org-icon:url(./probe-card.svg)"`。遮罩颜色读取 `--org-icon-color`、`--org-primary`、`--primary` 或文字颜色。图标旁已有文字时加 `aria-hidden="true"`。
- **普通 img**：从完整图标包选择 `themes/{jade,blue,plum,copper,slate}/{light,dark}/<键名>.svg`。切主题时切换 src；原始单色 SVG 保留在根目录。

### 西安厂区

页尾选择「进入西安厂区」，或打开 `?site=xian`。八个分组覆盖器件封装、测试、模组制造与测试、仓储物流与供应计划、工程设备岗位、生产管理、扩建产品规划与可持续发展中心公告。点击任一条目可查看西安本地来源。图标库中可切换「西安示例」与「全部图标」。查询某个图标时可输入「裸片回收」「模组测试」或「PSRG」。[查阅西安研究与选图说明](https://github.com/materialofair/org-atlas-react/blob/v1.10.0/docs/xian-backend.md)。

### 行业依据

职能名称和职责来自美光台湾中英文职类地图；先进封装示例另参照美光台中厂区资料。下级编组和层级用于演示。后道门户采用总览标识，封装部门详情展示引线键合 BGA 分解图。查看[职能与选图说明](https://github.com/materialofair/org-atlas-react/blob/v1.10.0/docs/memory-backend.md)、[美光中文职类地图](https://tw.micron.com/about/careers/job-map-tch)和[台中先进封测厂资料](https://tw.micron.com/about/blog/company/events/taiwan-new-facility-supports-hbm3e-ramp-dram-tech-deployment)。

## 组件接口

| 属性 | 用途 |
| --- | --- |
| `root` | 部门树。每个节点必填全树唯一的字符串 `id` 和显示名称 `name`。`leader`、`description` 可省略，也可为 null、空字符串或空白字符。叶节点可省略 `children`。 |
| `itemLabel` | 层级及分组的单位，默认“部门”。西安资料目录使用“条目”。 |
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

启动后，打开 `/?levels=2` 查看两级组织，`/?levels=3` 查看同时含二级和三级末级部门的组织。默认首页展示美光后道门户，`/?levels=7` 可以浏览全组织。

- `npm run build` 生成组件库和生产版 Demo，分别位于 `dist/lib` 与 `dist/demo`。
- `npm pack` 重新构建库并在当前目录生成可分发的 tgz。
- `npm run test:browser` 验证七级下穿、返回、主题和移动布局。先启动 Demo，本机需要 Chrome 或通过 `npx playwright install chromium` 安装 Chromium。可用 `ORG_DEMO_URL` 指定测试地址。
- `node tests/react-compat.mjs 18.0.0 ./org-atlas-react-1.10.0.tgz` 在临时宿主中安装指定 React 版本和组件包，完成生产构建并在浏览器中验证七级往返。已验证 18.0.0、18.2.0、18.3.1 和 19.3.1。
- `src/departments.js` 存放可替换的示例组织数据。

## 许可证

本项目使用 [MIT 协议](LICENSE)。发行包中的 Lucide 图标及其 Feather 衍生图标沿用各自的 ISC / MIT 声明，全文随包附于 `dist/lib/LICENSE-lucide.txt`。
