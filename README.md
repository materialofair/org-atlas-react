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
npm install ./org-atlas-react-1.2.1.tgz
```

```tsx
import { OrgExplorer, type Department } from 'org-atlas-react'
import 'org-atlas-react/style.css'

const organization: Department = {
  id: 'engineering',
  name: '技术中心',
  leader: '陈思远',
  description: '负责产品工程与基础平台。',
  children: [{
    id: 'platform',
    name: '平台部',
    leader: '陆明',
    description: '建设研发工具与公共服务。',
  }],
}

export function OrganizationPage() {
  return <OrgExplorer root={organization} theme="system" />
}
```

## 二级部门门户

将门户部门及其下属团队作为 `root` 传入。下面的接法会将产品管理部标为二级，其直属团队标为三级。搜索、同级切换和面包屑的范围均由传入的部门树决定。

```tsx
export function ProductPortal({ department }: { department: Department }) {
  return <OrgExplorer root={department} rootLevel={2} title="产品管理部门户" />
}
```

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

启动后，打开 `/?levels=2` 查看两级组织，`/?levels=3` 查看同时含二级和三级末级部门的组织。默认首页展示产品管理部门户，`/?levels=7` 可以浏览全组织。

- `npm run build` 生成组件库和生产版 Demo，分别位于 `dist/lib` 与 `dist/demo`。
- `npm pack` 重新构建库并在当前目录生成可分发的 tgz。
- `npm run test:browser` 验证七级下穿、返回、主题和移动布局。先启动 Demo，本机需要 Chrome 或通过 `npx playwright install chromium` 安装 Chromium。可用 `ORG_DEMO_URL` 指定测试地址。
- `node tests/react-compat.mjs 18.0.0 ./org-atlas-react-1.2.1.tgz` 在临时宿主中安装指定 React 版本和组件包，完成生产构建并在浏览器中验证七级往返。已验证 18.0.0、18.2.0、18.3.1 和 19.3.1。
- `src/departments.js` 存放可替换的示例组织数据。

## 许可证

本项目使用 [MIT 协议](LICENSE)。发行包中的 Lucide 图标及其 Feather 衍生图标沿用各自的 ISC / MIT 声明，全文随包附于 `dist/lib/LICENSE-lucide.txt`。
