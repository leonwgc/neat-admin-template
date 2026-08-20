# Neat Admin - Copilot Instructions

## 项目概述

这是一个基于 React 18、TypeScript 和 Neat Design 的企业级管理后台。
项目使用菜单配置驱动路由，支持国际化、权限控制、Session Storage 页面状态和响应式布局。

## 技术栈

- React 18.3.1 + TypeScript
- `@derbysoft/neat-design` 与 `@derbysoft/neat-design-icons`
- `ahooks`，包括 `useRequest`
- `zustand` + `@derbysoft/zustand-kit`
- React Router 7
- i18next + react-i18next
- Axios 1.11
- SCSS、BEM、classnames

## 目录约定

```text
src/
├── components/       # 可复用组件
├── pages/            # 业务页面和页面级组件
├── layouts/          # 应用布局、菜单和路由守卫
├── hooks/            # usePageState、useTable、useReq 等 Hook
├── global/           # 全局状态和全局 API
├── locales/          # 公共国际化资源
├── scss/             # 全局样式、变量和 mixins
├── req/              # Axios 实例和请求配置
├── utils/             # 路由生成等工具
├── config.menu.tsx   # 菜单和路由路径
├── config.operations.ts # 权限操作
└── RouteConfig.tsx   # 路由渲染入口
```

页面或可复用组件较复杂时，拆分为同目录下的独立文件。例如页面弹窗内容、抽屉内容等应放在独立的 `.tsx` 文件中，页面文件只保留组合和业务编排。

## 路由和菜单

项目不是文件系统路由。新增页面必须同时完成以下配置：

1. 在 `src/pages/<Module>/` 创建页面组件。
2. 在 `src/config.menu.tsx` 添加菜单项、`route` 和权限配置。
3. 在 `src/utils/routeGenerator.tsx` 的 `routeComponentMap` 中添加路径到组件的映射。
4. 页面需要翻译时，在页面目录下添加 `locales/en.ts` 和 `locales/zh.ts`。
5. 在 `src/locales/common/en.ts` 和 `src/locales/common/zh.ts` 添加菜单文案。

路由组件使用 `lazyLoad('pages/Module')` 或 `lazyLoad('pages/Module/index')` 懒加载。动态参数路由也必须在 `routeComponentMap` 中显式声明，例如 `/app/ar-statements/:statementId`。

菜单项的 `key` 必须唯一；`label` 使用 getter 调用 `i18n.t()`，以支持语言切换；`permissions` 控制访问权限；`hidden: true` 表示隐藏菜单但保留路由。

## TypeScript 和 React

- 使用函数组件和 Hooks。
- 为组件 Props、接口响应和业务数据定义明确类型，避免 `any`。
- 类型只用于编译时的导入使用 `import type`。
- 使用可选链和空值合并处理可选数据。
- 保留项目文件头注释：`@file` 和 `@author`。
- 组件使用默认导出；需要被多个位置复用时，可通过同目录 `index.ts` 提供命名导出。
- 异步错误值通常是 `unknown`，必须先使用 `instanceof Error` 或类型守卫后再访问属性。

导入顺序：React 核心、第三方依赖、项目内部模块、样式文件。项目内部路径优先使用别名：

```ts
import Component from '~/components/Component';
import { mixin } from 'scss/mixins';
```

## UI 和样式

- 页面交互优先使用 `@derbysoft/neat-design`，图标优先使用 `@derbysoft/neat-design-icons`。
- 只有组件库无法满足需求时才使用原生表单元素。
- 使用 SCSS 和 BEM 命名；样式文件放在组件或页面同目录。
- 公共变量和 mixins 来自 `src/scss/common.scss`、`src/scss/mixins.scss`。
- 使用 `classNames` 处理条件 class。
- 交互按钮、加载状态、错误状态和空数据状态都应有明确表现。
- 不要为了示例添加与现有设计无关的复杂装饰或新的全局样式。

## 页面状态和列表页

分页列表统一使用 `useTable`。页面筛选、分页和持久化状态使用 `usePageState`；该 Hook 内部使用 `@derbysoft/zustand-kit` 保存到 `sessionStorage`，并导出别名 `usePageFilters`。

页面状态必须包含 `current` 和 `pageSize`：

```ts
interface PageState {
  current: string | number;
  pageSize: string | number;
}
```

推荐流程：

1. 定义页面状态和表单值类型。
2. 通过 `stateToFormValues` 将持久化状态转换为表单值，并提供默认值。
3. 通过 `formValuesToState` 保存筛选条件。
4. 通过 `formValuesToRequest` 将表单字段转换为接口字段。
5. 将 `pageState` 传给 `useTable`，复用分页参数和请求前状态同步。
6. 在表单 `onValuesChange` 中调用 `pageState.onValuesChange`，需要立即刷新列表时再调用 `submit()`。

`usePageState` 的 `onBeforeRequest` 会将接口的 `pageNum` 和 `pageSize` 写回状态：

```ts
current: String((Number(data.pageNum) || 0) + 1),
pageSize: String(data.pageSize ?? 10),
```

不要在同一个列表页重复维护互相耦合的 React state、表单 state 和页面持久化 state，也不要把弹窗开关、临时选中项等 UI 状态写入页面筛选状态。

## 请求层

- 使用 `src/req` 导出的 Axios 实例，不要在组件中创建新的 Axios 实例。
- 一般业务请求优先使用 `src/hooks/useReq.tsx`，它基于 ahooks `useRequest`，统一处理成功解包、失败回调、loading 和 toast/notification。
- `useReq` 的 `onSuccess` 接收到的是 `response.data.data`，不是完整 AxiosResponse。
- `useReq` 的 `onFailed` 参数类型是 `unknown`，访问错误属性前必须进行类型收窄。
- 分页列表必须使用 `useTable`，不要在页面中重复实现分页转换和列表响应适配。
- 示例页或特殊场景可以直接使用 ahooks `useRequest`，但应保持类型和错误处理明确。

请求函数必须保持返回 AxiosPromise 的结构。若使用 mock fallback，也要返回与 AxiosResponse 兼容的对象，不能直接返回自定义 `{ code, data }` 对象。

```tsx
const { run, loading } = useReq(uploadInvoiceImage, {
  onSuccess: (data: unknown) => {
    const result = data as { imageUrl?: string };
    setSrc(result.imageUrl);
  },
  onFailed: (error: unknown) => {
    const message = error instanceof Error ? error.message : undefined;
    toast.error(message || 'Upload failed');
  },
});
```

文件上传需使用 `FileInputTrigger`，先校验类型和大小，再使用 `FormData` 调用接口。临时预览 URL 使用 `URL.createObjectURL`；有长期生命周期时应在适当时机释放 URL。

## 国际化

页面翻译放在页面目录的 `locales/` 下，文件名为 `en.ts` 或 `zh.ts`。页面 locale 会由 `src/locales/pageLocales.ts` 自动发现，不需要再手动导入到根语言文件。

组件中使用：

```tsx
const { t } = useTranslation('pages.table');
return <h1>{t('title')}</h1>;
```

菜单文案放在 `src/locales/common/en.ts` 和 `src/locales/common/zh.ts`，菜单配置中的 label 使用 `i18n.t('menu.key')`。

## 权限

1. 在 `src/config.operations.ts` 定义权限常量。
2. 在 `src/config.menu.tsx` 的菜单项中配置 `permissions`。
3. 组件内通过 `useUserInfo().hasPermission()` 检查操作权限。

不要只隐藏按钮而忽略路由权限配置；页面访问控制由菜单、路由生成和 `RouteGuard` 共同完成。

## 验证和命令

```bash
npm start          # 启动开发服务
npm run lint       # ESLint 检查 src/
npm run build:qa   # QA 构建
npm run build:uat  # UAT 构建
npm run build:prod # 生产构建
```

修改代码后，优先运行最小范围的类型检查或 ESLint；涉及共享 Hook、路由、请求层或列表状态时，再运行完整的 `npm run lint` 和对应构建。

## 编辑原则

- 先阅读目标文件和相邻实现，再进行最小修改。
- 遵循现有 Hook、组件库和目录结构，不重复发明已有能力。
- 不修改与任务无关的代码，不撤销用户已有改动。
- 不添加版权或许可证头。
- 只在复杂逻辑确实需要时添加简短注释，避免无信息量注释。

---

**最后更新**: 2026-08-20
**维护者**: leon.wang
