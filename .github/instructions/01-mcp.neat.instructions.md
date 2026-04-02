---
applyTo: '**/*.{tsx,ts}'
---
# Neat Design + ahooks MCP Service Usage Instructions

## 强制使用 Neat Design MCP 服务和 ahooks MCP 服务

当生成任何使用 Neat Design 组件的代码时，必须先通过 MCP 服务获取组件信息。Neat Design 是基于 Ant Design 5.x 构建的企业级设计系统，由 Derbysoft 开发维护。

## 1. 生成代码前的准备工作

### Neat Design 组件
在编写代码前，必须通过以下 MCP 工具获取组件信息：

#### 基础工具
- `get_components_information` - 获取 Neat Design 概览和架构信息
- `get_all_component_names` - 获取所有可用组件列表
- `get_component_document` - 获取特定组件的详细文档（API、props、使用说明）
- `get_component_examples_info` - 获取组件所有示例的元数据
- `get_component_example` - 获取组件使用示例的完整 TSX 代码

#### 样式工具（🚨 自定义样式时必须使用）
- `get_use_create_styles_guide` - 获取 useCreateStyles Hook 完整文档和类型定义文件位置
  - **MANDATORY**: 当需要创建任何自定义样式时必须调用此工具
  - **CRITICAL**: 必须分离样式代码到独立的 .style.ts 文件
  - **CRITICAL**: 必须读取 node_modules 中的实际类型定义文件以获取正确的 token 属性
  - **CRITICAL**: 绝不能猜测属性名如 `token['color-a']` - 会导致空指针错误

#### 图标工具（🚨 使用图标时必须使用）
- `get_icons_information` - 获取 Neat Design Icons 完整文档
  - **MANDATORY**: 当遇到任何图标、符号或矢量图形时必须调用此工具
  - **CRITICAL**: 绝不能使用其他图标库如 @ant-design/icons、react-icons 等
- `get_all_icon_names` - 获取所有可用图标名称列表
  - **MANDATORY**: 必须使用此工具查找正确的图标组件名称
  - **CRITICAL**: 绝不能猜测图标名称

#### 插图工具（🚨 使用插图时必须使用）
- `get_illustrations_information` - 获取 Neat Design Illustrations 完整文档
  - **MANDATORY**: 当遇到任何插图、图形或视觉内容时必须调用此工具
  - **CRITICAL**: 绝不能使用其他插图库或图片导入方式
- `get_all_illustration_names` - 获取所有可用插图名称列表
  - **MANDATORY**: 必须使用此工具查找正确的插图组件名称

#### Figma 转代码工具（🚨 实现/还原 Figma 设计时必须使用）
- `get_figma_to_code_guide` - 获取 Figma 设计转 ReactJS 代码的完整实现规则
  - **MANDATORY**: 当需要"实现"、"还原"、"转换"或"生成" Figma 设计时必须先调用此工具
  - **CRITICAL**: 包含 Figma 帧到 Neat Design 组件的映射规则
  - **CRITICAL**: 包含样式实现指导和组件 props 映射规则

### ahooks Hooks
在使用 React Hooks 时，**必须优先使用 ahooks 库**，并通过以下 MCP 工具获取 Hook 信息：

- `get_all_hook_names` - 获取所有可用的 ahooks Hook 列表
- `get_hook_info` - 获取特定 Hook 的详细信息（参数、返回值、使用示例）
- `search_hooks` - 按关键字搜索相关 Hooks
- `get_hooks_by_category` - 按类别浏览 Hooks（State, Effect, DOM, Request, Advanced, LifeCycle, UI）
- `get_all_categories` - 获取所有 Hook 类别

## 2. 必须调用 MCP 的场景

### Neat Design 组件场景
- ✅ 创建新页面时
- ✅ 添加新表单时
- ✅ 使用任何 Neat Design 组件时
- ✅ 需要参考最佳实践时
- ✅ 不确定组件 API 或 props 时
- ✅ 需要了解组件使用示例时
- ✅ 🚨 **创建任何自定义样式时（必须调用 get_use_create_styles_guide）**
- ✅ 🚨 **使用任何图标时（必须调用 get_icons_information 和 get_all_icon_names）**
- ✅ 🚨 **使用任何插图时（必须调用 get_illustrations_information 和 get_all_illustration_names）**
- ✅ 🚨 **实现/还原 Figma 设计时（必须先调用 get_figma_to_code_guide）**

### ahooks Hooks 场景
- ✅ 需要管理布尔状态时
- ✅ 需要发起网络请求时
- ✅ 需要使用组件生命周期时
- ✅ 需要防抖或节流时
- ✅ 需要监听 DOM 事件时
- ✅ 需要使用倒计时或定时器时
- ✅ 不确定是否有现成的 Hook 时

## 3. 标准工作流程

### 场景 1：创建登录页面（Neat Design + ahooks）

```typescript
// Step 1: 获取 Neat Design 概览信息
mcp_neat-design-m_get_components_information()

// Step 2: 获取所有可用组件
mcp_neat-design-m_get_all_component_names()

// Step 3: 获取表单组件文档
mcp_neat-design-m_get_component_document({ componentName: "Form" })
mcp_neat-design-m_get_component_document({ componentName: "Input" })
mcp_neat-design-m_get_component_document({ componentName: "Button" })

// Step 4: 获取组件使用示例信息
mcp_neat-design-m_get_component_examples_info({ componentName: "Form" })

// Step 5: 获取具体示例代码
mcp_neat-design-m_get_component_example({
  componentName: "Form",
  exampleFileName: "basic.tsx"
})

// Step 6: 搜索 ahooks 中的状态管理 Hooks
mcp_ahooks-mcp_search_hooks({ keyword: "state" })

// Step 7: 获取 ahooks Hook 信息
mcp_ahooks-mcp_get_hook_info({ name: "useBoolean" })  // 用于控制 loading 状态
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" })  // 用于登录请求

// Step 8: 基于获取的信息生成代码
```

### 场景 2：实现/还原 Figma 设计到 ReactJS 代码

```typescript
// Step 1: 🚨 MANDATORY - 获取 Figma 转代码实现指南
mcp_neat-design-m_get_figma_to_code_guide()

// Step 2: 获取所有可用组件（验证 Figma 帧对应的组件）
mcp_neat-design-m_get_all_component_names()

// Step 3: 获取设计中涉及的每个组件的文档
mcp_neat-design-m_get_component_document({ componentName: "Button" })
mcp_neat-design-m_get_component_document({ componentName: "Card" })
mcp_neat-design-m_get_component_document({ componentName: "Input" })

// Step 4: 获取组件实现示例
mcp_neat-design-m_get_component_examples_info({ componentName: "Button" })
mcp_neat-design-m_get_component_example({
  componentName: "Button",
  exampleFileName: "type.tsx"
})

// Step 5: 🚨 如果设计包含任何图标 - MANDATORY
mcp_neat-design-m_get_icons_information()
mcp_neat-design-m_get_all_icon_names()

// Step 6: 🚨 如果设计包含任何插图 - MANDATORY
mcp_neat-design-m_get_illustrations_information()
mcp_neat-design-m_get_all_illustration_names()

// Step 7: 🚨 如果需要自定义样式 - MANDATORY
mcp_neat-design-m_get_use_create_styles_guide()
// 必须读取 node_modules 中的类型定义文件以获取正确的 token 属性名

// Step 8: 基于获取的信息生成代码
```

### 场景 3：创建带倒计时的验证码输入（Neat Design + ahooks）

```typescript
// Step 1: 获取 Input 组件文档
mcp_neat-design-m_get_component_document({ componentName: "Input" })
mcp_neat-design-m_get_component_document({ componentName: "Button" })

// Step 2: 获取组件示例
mcp_neat-design-m_get_component_examples_info({ componentName: "Input" })

// Step 3: 搜索时间相关的 ahooks
mcp_ahooks-mcp_get_hooks_by_category({ category: "Effect" })

// Step 4: 获取倒计时 Hook 信息
mcp_ahooks-mcp_get_hook_info({ name: "useCountDown" })

// Step 5: 获取请求 Hook 信息
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" })

// Step 6: 获取布尔状态管理 Hook
mcp_ahooks-mcp_get_hook_info({ name: "useBoolean" })

// Step 7: 基于信息生成代码
```

### 场景 4：创建数据表格页面（Neat Design + ahooks）

```typescript
// Step 1: 获取 Table 组件文档
mcp_neat-design-m_get_component_document({ componentName: "Table" })

// Step 2: 获取 Table 组件示例信息
mcp_neat-design-m_get_component_examples_info({ componentName: "Table" })

// Step 3: 获取具体示例代码
mcp_neat-design-m_get_component_example({
  componentName: "Table",
  exampleFileName: "basic.tsx"
})

// Step 4: 获取分页组件文档
mcp_neat-design-m_get_component_document({ componentName: "Pagination" })

// Step 5: 搜索请求相关的 ahooks
mcp_ahooks-mcp_search_hooks({ keyword: "request" })

// Step 6: 获取 useRequest Hook 详细信息（用于表格数据请求）
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" })

// Step 7: 获取 useAntdTable Hook 信息（如果需要与 Ant Design Table 集成）
mcp_ahooks-mcp_get_hook_info({ name: "useAntdTable" })

// Step 8: 基于信息生成代码
```

### 场景 5：创建带自定义样式的卡片组件（🚨 useCreateStyles）

```typescript
// Step 1: 获取 Card 组件文档
mcp_neat-design-m_get_component_document({ componentName: "Card" })

// Step 2: 🚨 MANDATORY - 获取 useCreateStyles 完整指南
mcp_neat-design-m_get_use_create_styles_guide()

// Step 3: 读取类型定义文件位置（从 Step 2 返回的信息中获取）
// 必须读取以下文件以获取正确的 token 属性名：
// - node_modules/@derbysoft/neat-design-token/es/interface/Token.d.ts
// - node_modules/@derbysoft/neat-design-token/es/interface/AliasToken.d.ts
// - node_modules/@derbysoft/neat-design-token/es/interface/GlobalToken.d.ts
// - node_modules/@derbysoft/neat-design/es/theme/interface/ComponentTokenMap.d.ts

// Step 4: 创建独立的 .style.ts 文件
// - Card.style.ts - 样式代码（export useStyle hook）
// - Card.tsx - 组件代码（import useStyle from './Card.style'）

// Step 5: 基于信息生成代码
```

## 4. 代码注释要求

生成的代码中必须包含 MCP 调用说明：

```typescript
/**
 * @file src/pages/Login/Login.tsx
 * @author leon.wang
 * @description Login page using Neat Design components and ahooks
 *
 * MCP Services Used:
 * Neat Design:
 * - get_components_information: Overview
 * - get_all_component_names: Component list
 * - get_component_document: Form, Input, Button
 * - get_component_examples_info: Form examples
 * - get_component_example: Form basic.tsx
 *
 * ahooks:
 * - search_hooks: keyword "state"
 * - get_hook_info: useBoolean, useRequest
 */
```

## 5. 使用优先级

### Neat Design 组件优先级

#### 表单场景
首先调用 MCP 获取以下组件信息：
- Form, Input, Input.Password, Input.TextArea
- Select, Checkbox, Radio, Switch
- DatePicker, TimePicker, Upload
- Button

#### 数据展示场景
首先调用 MCP 获取以下组件信息：
- Table, List, Card
- Descriptions, Statistic
- Tree, Timeline

#### 反馈场景
首先调用 MCP 获取以下组件信息：
- Modal, Drawer
- SnackBar, Toast, Notification
- Progress, Spinner, Skeleton

#### 布局场景
首先调用 MCP 获取以下组件信息：
- Layout (Header, Sider, Content, Footer)
- Grid (Row, Col)
- Space, Divider

#### 导航场景
首先调用 MCP 获取以下组件信息：
- Menu, Tabs
- Breadcrumb, Pagination
- Steps

### ahooks Hooks 优先级（必须优先使用）

#### 状态管理
优先使用 ahooks，避免直接使用 useState：
- `useBoolean` - 布尔值状态管理（**必须使用**，替代 useState(boolean)）
- `useToggle` - 切换状态
- `useSet` - Set 数据结构
- `useMap` - Map 数据结构
- `useLocalStorageState` / `useSessionStorageState` - 持久化状态

#### 副作用管理
- `useMount` - 组件挂载时执行（**必须使用**，替代 useEffect(() => {}, [])）
- `useUnmount` - 组件卸载时执行
- `useUpdateEffect` - 忽略首次渲染的 useEffect
- `useDebounceEffect` - 防抖 Effect
- `useThrottleEffect` - 节流 Effect

#### 请求管理
- `useRequest` - **必须使用**，替代手动 fetch/axios
- `useAntdTable` - Ant Design Table 数据请求（与 Neat Design Table 兼容）
- 支持自动 loading、错误处理、重试、轮询等

#### DOM 操作
- `useEventListener` - 事件监听
- `useClickAway` - 点击外部区域
- `useScroll` - 滚动监听
- `useSize` - 元素尺寸监听
- `useFocusWithin` - 焦点状态

#### 定时器
- `useInterval` - setInterval 替代
- `useTimeout` - setTimeout 替代
- `useCountDown` - 倒计时
- `useRafInterval` - requestAnimationFrame 定时器

#### 性能优化
- `useDebounceFn` / `useDebounce` - 防抖（**必须使用**，替代手动 debounce）
- `useThrottleFn` / `useThrottle` - 节流（**必须使用**，替代手动 throttle）
- `useMemoizedFn` - 持久化函数引用

## 6. 🚨 关键要求和注意事项

### Neat Design 关键要求

#### 样式实现要求（🚨 MANDATORY）
1. **文件分离模式**
   - **必须**：创建独立的 `.style.ts` 文件（例如：`App.style.ts`）
   - **必须**：从样式文件导出 `useStyle` hook
   - **禁止**：在组件文件中直接编写样式代码
   - **禁止**：使用内联样式或其他 CSS 方法

2. **类型定义文件读取**
   - **必须**：读取 node_modules 中的实际类型定义文件
   - **禁止**：猜测属性名如 `token['color-a']` - 会导致空指针错误
   - **文件位置**：
     - `node_modules/@derbysoft/neat-design-token/es/interface/Token.d.ts`
     - `node_modules/@derbysoft/neat-design-token/es/interface/AliasToken.d.ts`
     - `node_modules/@derbysoft/neat-design-token/es/interface/GlobalToken.d.ts`
     - `node_modules/@derbysoft/neat-design/es/theme/interface/ComponentTokenMap.d.ts`
     - `node_modules/@derbysoft/neat-design/es/theme/interface/SubComponentTokenMap.d.ts`

3. **样式一致性**
   - **必须**：如果初始实现使用了 useCreateStyles，后续所有修改必须继续使用
   - **禁止**：在后续修改中切换到内联样式或其他方法

#### 图标使用要求（🚨 MANDATORY）
1. **必须使用 Neat Design Icons**
   - 包名：`@derbysoft/neat-design-icons`
   - **禁止**：使用 @ant-design/icons、react-icons 或其他图标库

2. **图标名称查找**
   - **必须**：使用 `get_all_icon_names` 工具查找正确的图标名称
   - **禁止**：猜测图标名称

#### 插图使用要求（🚨 MANDATORY）
1. **必须使用 Neat Design Illustrations**
   - 包名：`@derbysoft/neat-design-illustrations`
   - **禁止**：使用其他插图库或图片导入方式

2. **插图名称查找**
   - **必须**：使用 `get_all_illustration_names` 工具查找正确的插图名称
   - **禁止**：猜测插图名称

#### Figma 转代码要求（🚨 MANDATORY）
1. **必须先调用 get_figma_to_code_guide**
   - 关键词：实现、还原、转换、生成 Figma 设计
   - 包含完整的实现规则和映射指南

2. **遵循映射规则**
   - Figma 帧名称 → Neat Design 组件名称
   - 帧属性 → 组件 props
   - 遵循设计 token 系统

### ahooks 强制使用规则

#### 必须使用 ahooks 的场景

1. **布尔状态** - 必须使用 `useBoolean` 而非 `useState(false)`
   ```typescript
   // ❌ 错误
   const [visible, setVisible] = useState(false);

   // ✅ 正确
   const [visible, { setTrue, setFalse, toggle }] = useBoolean(false);
   ```

2. **请求处理** - 必须使用 `useRequest` 而非手动 fetch
   ```typescript
   // ❌ 错误
   const [loading, setLoading] = useState(false);
   const fetchData = async () => {
     setLoading(true);
     try {
       const res = await fetch(url);
       // ...
     } finally {
       setLoading(false);
     }
   };

   // ✅ 正确
   const { data, loading, error, run } = useRequest(fetchData);
   ```

3. **组件生命周期** - 必须使用 `useMount`/`useUnmount`
   ```typescript
   // ❌ 错误
   useEffect(() => {
     init();
   }, []);

   // ✅ 正确
   useMount(() => {
     init();
   });
   ```

4. **防抖节流** - 必须使用 `useDebounceFn`/`useThrottleFn`
   ```typescript
   // ❌ 错误
   const debounced = debounce(handleSearch, 500);

   // ✅ 正确
   const { run: handleSearch } = useDebounceFn(search, { wait: 500 });
   ```

## 7. 验证清单

生成代码后，确保：
- [ ] 已调用 `get_components_information` 了解 Neat Design 概览
- [ ] 已调用相关 MCP 服务获取所有使用组件的信息
- [ ] 已获取并参考组件使用示例代码
- [ ] 组件使用符合 MCP 返回的 API 文档
- [ ] 组件 props 类型与 MCP 文档一致
- [ ] 代码注释中说明了使用的 MCP 服务
- [ ] import 语句正确（从 '@derbysoft/neat-design' 和 'ahooks' 导入）
- [ ] **优先使用 ahooks 替代原生 Hooks**
- [ ] 如使用了 useRequest，确保已调用 ahooks MCP 获取其 API
- [ ] 状态管理优先使用 useBoolean/useToggle 而非 useState(boolean)
- [ ] 🚨 **如果有自定义样式，已调用 get_use_create_styles_guide**
- [ ] 🚨 **如果有自定义样式，已创建独立的 .style.ts 文件**
- [ ] 🚨 **如果有自定义样式，已读取 node_modules 中的类型定义文件**
- [ ] 🚨 **如果使用图标，已调用 get_icons_information 和 get_all_icon_names**
- [ ] 🚨 **如果使用图标，仅使用 @derbysoft/neat-design-icons**
- [ ] 🚨 **如果使用插图，已调用 get_illustrations_information 和 get_all_illustration_names**
- [ ] 🚨 **如果使用插图，仅使用 @derbysoft/neat-design-illustrations**
- [ ] 🚨 **如果实现/还原 Figma 设计，已先调用 get_figma_to_code_guide**

## 8. 错误处理

如果 MCP 服务返回组件不存在：
1. 调用 `get_all_component_names` 查看所有可用组件
2. 调用 `get_components_information` 了解 Neat Design 架构
3. 选择最接近需求的组件

如果不确定是否有合适的 ahooks：
1. 调用 `get_all_categories` 查看所有类别
2. 调用 `get_hooks_by_category` 浏览特定类别的 Hooks
3. 调用 `search_hooks` 按关键字搜索

## 9. 示例：完整的 MCP 驱动开发流程

### 示例 1：创建用户注册页面（Neat Design + ahooks）

```typescript
/**
 * 任务：创建带表单验证和请求的用户注册页面
 */

// Step 1: 获取 Neat Design 概览
mcp_neat-design-m_get_components_information();

// Step 2: 获取表单组件文档
mcp_neat-design-m_get_component_document({ componentName: "Form" });
mcp_neat-design-m_get_component_document({ componentName: "Input" });
mcp_neat-design-m_get_component_document({ componentName: "Button" });

// Step 3: 获取表单组件示例
mcp_neat-design-m_get_component_examples_info({ componentName: "Form" });
mcp_neat-design-m_get_component_example({
  componentName: "Form",
  exampleFileName: "validate.tsx"
});

// Step 4: 搜索 ahooks 请求相关 Hooks
mcp_ahooks-mcp_search_hooks({ keyword: "request" });

// Step 5: 获取 useRequest Hook 详细信息
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" });

// Step 6: 获取状态管理 Hook
mcp_ahooks-mcp_get_hook_info({ name: "useBoolean" });

// Step 7: 基于获取的信息生成代码
// - 使用 Form 组件创建表单
// - 使用 useRequest 处理注册请求（自动 loading、错误处理）
// - 使用 useBoolean 管理模态框显示状态
// - 遵循 MCP 返回的最佳实践

// Step 8: 在代码注释中记录
/**
 * MCP Services Used:
 * Neat Design:
 * - get_components_information: Overview
 * - get_component_document: Form, Input, Button
 * - get_component_examples_info: Form examples
 * - get_component_example: Form validate.tsx
 * ahooks:
 * - search_hooks: "request"
 * - get_hook_info: useRequest, useBoolean
 */
```

### 示例 2：实现 Figma 设计的仪表盘页面（🚨 完整流程）

```typescript
/**
 * 任务：根据 Figma 设计实现仪表盘页面
 */

// Step 1: 🚨 MANDATORY - 获取 Figma 转代码指南
mcp_neat-design-m_get_figma_to_code_guide();

// Step 2: 获取所有可用组件
mcp_neat-design-m_get_all_component_names();

// Step 3: 获取设计中涉及的组件文档
mcp_neat-design-m_get_component_document({ componentName: "Card" });
mcp_neat-design-m_get_component_document({ componentName: "Statistic" });
mcp_neat-design-m_get_component_document({ componentName: "Table" });

// Step 4: 获取组件示例
mcp_neat-design-m_get_component_examples_info({ componentName: "Card" });
mcp_neat-design-m_get_component_example({
  componentName: "Card",
  exampleFileName: "basic.tsx"
});

// Step 5: 🚨 MANDATORY - 获取图标信息（设计包含图标）
mcp_neat-design-m_get_icons_information();
mcp_neat-design-m_get_all_icon_names();

// Step 6: 🚨 MANDATORY - 获取样式指南（需要自定义样式）
mcp_neat-design-m_get_use_create_styles_guide();

// Step 7: 读取类型定义文件
// 读取 node_modules/@derbysoft/neat-design-token/es/interface/Token.d.ts
// 读取 node_modules/@derbysoft/neat-design/es/theme/interface/ComponentTokenMap.d.ts

// Step 8: 获取 ahooks 请求 Hook
mcp_ahooks-mcp_get_hook_info({ name: "useRequest" });

// Step 9: 基于信息生成代码
// - 创建 Dashboard.tsx (组件代码)
// - 创建 Dashboard.style.ts (样式代码，export useStyle hook)
// - 使用 Neat Design Icons（从 @derbysoft/neat-design-icons 导入）
// - 使用 useCreateStyles（读取类型定义文件获取正确的 token 属性）
// - 使用 useRequest 获取仪表盘数据

// Step 10: 在代码注释中记录
/**
 * MCP Services Used:
 * Neat Design:
 * - get_figma_to_code_guide: Figma implementation rules
 * - get_all_component_names: Component list
 * - get_component_document: Card, Statistic, Table
 * - get_component_examples_info: Card examples
 * - get_component_example: Card basic.tsx
 * - get_icons_information: Icon usage guide
 * - get_all_icon_names: Available icons
 * - get_use_create_styles_guide: Styling guide and type definitions
 * ahooks:
 * - get_hook_info: useRequest
 */
```

## 10. 性能优化

- 对于常用组件，优先使用缓存的 MCP 信息
- 在项目初始化时调用 `get_components_information` 了解整体架构
- 在项目初始化时调用 `get_all_component_names` 和 `get_all_hook_names` 建立索引
- 批量调用 MCP 服务获取多个组件信息

## 11. 特殊说明

- 本项目使用 **Neat Design**（基于 Ant Design 5.x）
- 本项目使用 **ahooks** 3.x 版本
- 所有 UI 组件从 **'@derbysoft/neat-design'** 包导入
- 所有图标从 **'@derbysoft/neat-design-icons'** 包导入
- 所有插图从 **'@derbysoft/neat-design-illustrations'** 包导入
- 所有 Hooks 从 **'ahooks'** 包导入
- 类型定义从 '@derbysoft/neat-design' 和 'ahooks' 导入
- **禁止**使用 '@ant-design/icons'、'react-icons' 或其他图标库
- **禁止**使用其他插图库或直接导入图片

## 12. 示例模板

每次生成使用 Neat Design 组件和 ahooks 的文件时，请遵循以下模板：

### 组件文件模板

```typescript
/**
 * @file src/pages/YourPage/YourPage.tsx
 * @author leon.wang
 * @description [页面描述]
 *
 * MCP Services Used:
 * Neat Design:
 * - [列出所有调用的 Neat Design MCP 服务]
 * ahooks:
 * - [列出所有调用的 ahooks MCP 服务]
 */

import React from 'react';
import { [从 MCP 获取的 Neat Design 组件列表] } from '@derbysoft/neat-design';
import { [从 MCP 获取的图标列表] } from '@derbysoft/neat-design-icons';
import { [从 MCP 获取的 ahooks Hooks 列表] } from 'ahooks';

// Styles
import useStyle from './YourPage.style';

import './YourPage.scss';

// [基于 MCP 返回的信息定义接口]

const YourPage: React.FC = () => {
  // [使用 ahooks Hooks]

  // [使用样式 Hook]
  const { prefixCls, styles } = useStyle();

  // [参考 MCP 示例代码实现组件]

  return (
    <div className={`${prefixCls}-your-page ${styles}`}>
      {/* 组件内容 */}
    </div>
  );
};

export default YourPage;
```

### 样式文件模板（如果需要自定义样式）

```typescript
/**
 * @file src/pages/YourPage/YourPage.style.ts
 * @author leon.wang
 * @description Custom styles for YourPage component
 */

import { useCreateStyles } from '@derbysoft/neat-design';

const useStyle = () => {
  const createStyles = useCreateStyles();

  return createStyles(
    ({ css, prefixCls, token, componentsToken, subComponentsToken, ladderColor }) => {
      // 确保已读取 node_modules 中的类型定义文件
      // 绝不猜测属性名如 token['color-a']

      return css`
        &.${prefixCls}-your-page {
          // 使用设计 tokens
          background: ${token['color-bg']};
          padding: ${token['spacing-base']}px;

          // 更多样式...
        }
      `;
    }
  );
};

export default useStyle;
```

---

## 🚨 最终检查清单

在提交代码前，必须确认：

### Neat Design 相关
- [ ] 已调用 `get_components_information` 了解架构
- [ ] 已调用 `get_component_document` 获取所有使用组件的文档
- [ ] 已调用 `get_component_examples_info` 和 `get_component_example` 参考示例
- [ ] 如有自定义样式，已调用 `get_use_create_styles_guide`
- [ ] 如有自定义样式，已创建独立的 `.style.ts` 文件
- [ ] 如有自定义样式，已读取 node_modules 中的类型定义文件
- [ ] 如有图标，已调用 `get_icons_information` 和 `get_all_icon_names`
- [ ] 如有图标，仅使用 `@derbysoft/neat-design-icons`
- [ ] 如有插图，已调用 `get_illustrations_information` 和 `get_all_illustration_names`
- [ ] 如有插图，仅使用 `@derbysoft/neat-design-illustrations`
- [ ] 如实现 Figma 设计，已先调用 `get_figma_to_code_guide`

### ahooks 相关
- [ ] 已调用 ahooks MCP 服务获取所有使用的 Hooks 信息
- [ ] 布尔状态使用 `useBoolean` 而非 `useState(boolean)`
- [ ] 请求处理使用 `useRequest` 而非手动 fetch
- [ ] 生命周期使用 `useMount`/`useUnmount` 而非 `useEffect`
- [ ] 防抖节流使用 `useDebounceFn`/`useThrottleFn`

### 代码质量
- [ ] 所有 import 语句正确
- [ ] 代码注释包含 MCP 服务使用说明
- [ ] 遵循项目编码规范
- [ ] TypeScript 类型完整准确

---
