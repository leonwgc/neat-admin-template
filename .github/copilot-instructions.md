# Neat Admin Template - Copilot Instructions

## 📋 项目概述

这是一个基于 **React 18 + TypeScript + Neat Design** 的企业级管理后台模板。项目采用自动路由生成、国际化支持、权限管理等企业级特性，遵循最佳实践以帮助快速构建高质量的管理系统。

**作者**: leon.wang

## 🛠️ 技术栈

### 核心框架
- **React**: 18.3.1 - 使用最新的并发特性
- **TypeScript**: 严格类型检查，提供完整的类型定义
- **Neat Design**: @derbysoft/neat-design 企业级 UI 组件库

### 状态管理
- **zustand**: 5.0.9 - 轻量级状态管理
- **@derbysoft/zustand-kit**: 1.1.3 - zustand 增强工具包

### 路由系统
- **React Router**: 7.7.1 - 支持数据预加载的现代路由系统

### 国际化
- **i18next**: 25.3.2
- **react-i18next**: 15.6.1 - 内置中英文支持，具有 TypeScript 类型安全

### 工具库
- **ahooks**: 3.9.0 - React Hooks 工具集
- **axios**: 1.11.0 - HTTP 请求库
- **dayjs**: 1.11.13 - 日期处理
- **lodash**: 4.17.21 - 工具函数库

### 样式方案
- **SCSS** + **BEM** 命名规范
- 模块化 SCSS 架构，变量和 mixins 分离

## 📁 项目结构规范

```
src/
├── components/          # 可复用组件
│   ├── ComponentName/
│   │   ├── index.ts            # 导出组件
│   │   ├── ComponentName.tsx   # 组件实现
│   │   ├── ComponentName.scss  # 组件样式
│   │   └── README.md           # 组件文档（可选）
├── pages/              # 页面组件
├── layouts/            # 布局组件
├── hooks/              # 自定义 Hooks
├── utils/              # 工具函数
├── locales/            # 国际化资源
├── scss/               # 全局样式
├── global/             # 全局状态和 hooks
├── config.menu.tsx     # 菜单配置
├── config.route.ts     # 路由配置
├── config.operations.ts # 权限操作定义
└── config.ts           # 全局配置
```

## ✨ 代码风格指南

### TypeScript 规范

1. **类型定义优先**
   ```typescript
   // ✅ 推荐：为所有 props 定义接口
   interface ComponentProps {
     title: string;
     onClose?: () => void;
   }

   // ❌ 避免：使用 any
   const handleData = (data: any) => { /* ... */ }

   // ✅ 推荐：明确类型
   const handleData = (data: UserData) => { /* ... */ }
   ```

2. **使用类型导入**
   ```typescript
   import type { MenuProps } from '@derbysoft/neat-design';
   ```

3. **严格的 null 检查**
   ```typescript
   // 使用可选链和空值合并
   const value = user?.profile?.name ?? 'Default';
   ```

### React 组件规范

1. **函数组件优先**
   ```typescript
   // ✅ 推荐：使用函数组件和 Hooks
   const MyComponent: React.FC<Props> = ({ title }) => {
     const [count, setCount] = useState(0);
     return <div>{title}: {count}</div>;
   };

   // ❌ 避免：类组件（除非需要 ErrorBoundary）
   ```

2. **文件头注释**
   ```typescript
   /**
    * @file components/ComponentName/ComponentName.tsx
    * @author leon.wang
    */
   ```

3. **Props 接口文档**
   ```typescript
   export interface ComponentProps {
     /** 组件标题 */
     title: string;
     /** 是否禁用 */
     disabled?: boolean;
     /** 点击回调 */
     onClick?: () => void;
   }
   ```

4. **使用命名导出和默认导出**
   ```typescript
   // ComponentName.tsx - 默认导出组件
   export default ComponentName;

   // index.ts - 重新导出
   export { default as ComponentName } from './ComponentName';
   export type { ComponentProps } from './ComponentName';
   ```

### 导入规范

1. **导入顺序**
   ```typescript
   // 1. React 核心
   import React, { useState, useEffect } from 'react';

   // 2. 第三方库
   import dayjs from 'dayjs';
   import { Button, Form } from '@derbysoft/neat-design';

   // 3. 项目内部
   import { useUserInfo } from '~/global/useUserInfo';
   import { ErrorBoundary } from '~/components/ErrorBoundary';

   // 4. 样式文件
   import './ComponentName.scss';
   ```

2. **路径别名使用**
   ```typescript
   // 使用配置的别名
   import Component from '~/components/Component';        // 使用 ~/
   import { mixin } from 'scss/mixins';                  // 使用 scss/
   import Button from 'components/Button';                // 使用 components/
   ```

## 🎨 样式开发规范

### SCSS 架构

```
src/scss/
├── index.scss           # 主入口
├── common.scss          # 变量定义 + 引入 mixins
├── mixins.scss          # 所有 Mixins 定义
├── global.scss          # 全局样式
└── helpWidgets.scss     # 辅助工具类
```

### BEM 命名规范

```scss
// ✅ 推荐：使用 BEM
.error-boundary {
  &__container {
    padding: 20px;
  }

  &__title {
    font-size: 24px;

    &--large {
      font-size: 32px;
    }
  }
}

// ❌ 避免：深层嵌套
.error-boundary .container .inner .title { } // 不推荐
```

### 使用 Mixins

```scss
// 项目提供了 60+ 个实用 Mixins，充分利用它们

// 布局
@include flex-center;
@include flex-between;
@include absolute-center;

// 文本
@include ellipsis;
@include multi-line-ellipsis(2);

// 响应式
@include mobile {
  // mobile styles
}

@include tablet {
  // tablet styles
}

// 动画
@include transition(all);
@include hover-lift;
```

### 变量使用

```scss
// 使用项目定义的 SCSS 变量
.my-component {
  color: $primary-color;
  background: $bg-color;
  z-index: $z-modal;
  border-radius: $border-radius-base;
}
```

## 🗺️ 路由和菜单配置

### 菜单配置 (config.menu.tsx)

菜单驱动路由生成，无需手动维护路由配置。

```typescript
import { MenuProps } from '@derbysoft/neat-design';
import i18n from './i18n';
import operations from './config.operations';

export type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[];
  route?: string;           // 路由路径
  permissions?: string[];   // 权限数组
  hidden?: boolean;         // 是否隐藏（但仍生成路由）
};

export const menus: MenuItem[] = [
  {
    key: 'feature',
    get label() {
      return i18n.t('menu.feature');  // 使用 getter 支持语言切换
    },
    icon: <IconComponent />,
    permissions: [],
    children: [
      {
        key: 'feature-detail',
        get label() {
          return i18n.t('menu.featureDetail');
        },
        route: '/app/feature/detail',
        permissions: [operations.featureRead],
      }
    ],
  },
];
```

**重要规则**:
1. 使用 `get label()` getter 函数支持动态语言切换
2. `key` 必须唯一
3. `route` 路径自动生成路由配置
4. `permissions` 控制访问权限
5. `hidden: true` 表示不在菜单中显示但仍可访问

### 页面组件开发

```typescript
// src/pages/Feature/FeatureDetail.tsx
import React from 'react';
import './FeatureDetail.scss';

const FeatureDetail: React.FC = () => {
  return (
    <div className="feature-detail">
      {/* 页面内容 */}
    </div>
  );
};

export default FeatureDetail;
```

路由会自动映射到：`src/pages/{route-path}/index.tsx` 或对应的组件文件。

## 🌍 国际化 (i18n)

### 添加翻译

```typescript
// src/locales/zh.ts
export default {
  menu: {
    myFeature: '我的功能',
  },
  pages: {
    myFeature: {
      title: '功能标题',
      description: '功能描述',
    },
  },
};

// src/locales/en.ts
export default {
  menu: {
    myFeature: 'My Feature',
  },
  pages: {
    myFeature: {
      title: 'Feature Title',
      description: 'Feature Description',
    },
  },
};
```

### 使用翻译

```typescript
// 在组件中使用
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.myFeature.title')}</h1>
      <p>{t('pages.myFeature.description')}</p>
    </div>
  );
};
```

### TypeScript 类型支持

项目已配置 i18next 类型定义，享受自动补全和类型检查：

```typescript
// i18next.d.ts 已配置
t('pages.myFeature.title')  // ✅ 类型安全
t('invalid.key')            // ❌ TypeScript 错误
```

## 🔐 权限管理

### 定义权限操作

```typescript
// src/config.operations.ts
const operations = {
  // 功能读取权限
  featureRead: 'feature:read',
  // 功能写入权限
  featureWrite: 'feature:write',
  // 功能删除权限
  featureDelete: 'feature:delete',
} as const;

export default operations;
```

### 在菜单中使用

```typescript
// config.menu.tsx
{
  key: 'feature',
  route: '/app/feature',
  permissions: [operations.featureRead],
}
```

### 在组件中检查权限

```typescript
import { useUserInfo } from '~/global/useUserInfo';
import operations from '~/config.operations';

const MyComponent = () => {
  const { hasPermission } = useUserInfo();

  const canWrite = hasPermission(operations.featureWrite);

  return (
    <>
      {canWrite && <Button>编辑</Button>}
    </>
  );
};
```

## 🎣 自定义 Hooks

### 命名规范

```typescript
// ✅ 推荐：use 前缀
export const useFeatureData = () => { /* ... */ }

// ❌ 避免：不使用 use 前缀
export const getFeatureData = () => { /* ... */ }
```

### Hook 示例

```typescript
/**
 * @file hooks/useFeature.tsx
 * @author leon.wang
 */
import { useState, useEffect } from 'react';

export interface UseFeatureOptions {
  autoFetch?: boolean;
}

export const useFeature = (id: string, options?: UseFeatureOptions) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options?.autoFetch) {
      fetchData();
    }
  }, [id, options?.autoFetch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // fetch logic
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
};
```

## 📦 组件开发规范

### 组件目录结构

```
components/MyComponent/
├── index.ts              # 导出文件
├── MyComponent.tsx       # 组件实现
├── MyComponent.scss      # 组件样式
└── README.md             # 组件文档（可选）
```

### 组件模板

```typescript
/**
 * @file components/MyComponent/MyComponent.tsx
 * @author leon.wang
 */
import React from 'react';
import classNames from 'classnames';
import './MyComponent.scss';

export interface MyComponentProps {
  /** 组件标题 */
  title?: string;
  /** 组件类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 点击事件 */
  onClick?: () => void;
}

/**
 * MyComponent - 组件描述
 *
 * @example
 * ```tsx
 * <MyComponent title="示例">内容</MyComponent>
 * ```
 */
const MyComponent: React.FC<MyComponentProps> = ({
  title,
  className,
  children,
  onClick,
}) => {
  const cls = classNames('my-component', className);

  return (
    <div className={cls} onClick={onClick}>
      {title && <h3 className="my-component__title">{title}</h3>}
      <div className="my-component__content">{children}</div>
    </div>
  );
};

export default MyComponent;
```

```typescript
// index.ts
export { default as MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### 组件样式

```scss
// MyComponent.scss
@import 'scss/common';

.my-component {
  // 使用项目变量
  padding: $spacing-md;
  background: $bg-color;
  border-radius: $border-radius-base;

  // BEM 命名
  &__title {
    font-size: $font-size-lg;
    color: $text-color;
  }

  &__content {
    margin-top: $spacing-sm;
  }

  // 修饰符
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // 响应式
  @include mobile {
    padding: $spacing-sm;
  }
}
```

## 🌐 HTTP 请求规范

### 使用 axios 实例

```typescript
// src/req.ts 已配置统一的 axios 实例
import request from '~/req';

// 发起请求
const fetchData = async () => {
  try {
    const response = await request.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};
```

### 使用 ahooks

```typescript
import { useRequest } from 'ahooks';

const MyComponent = () => {
  const { data, loading, error, run } = useRequest(
    async () => {
      const res = await request.get('/api/data');
      return res.data;
    },
    {
      manual: false, // 自动执行
    }
  );

  return (
    <div>
      {loading && <Spin />}
      {error && <Alert message="Error" />}
      {data && <DataDisplay data={data} />}
    </div>
  );
};
```

## 🏗️ 构建和部署

### 环境配置

项目支持多环境构建：

```bash
# 开发环境
npm start

# QA 环境
npm run build:qa

# UAT 环境
npm run build:uat

# 生产环境
npm run build:prod
```

### 环境配置文件

```
build/env/
├── config.production.js
├── config.qa.js
└── config.uat.js
```

### 环境变量使用

```typescript
// 在代码中检查环境
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}

if (process.env.NODE_ENV === 'production') {
  // Production-specific code
}
```

## 🚨 错误处理

### 使用 ErrorBoundary

```typescript
import { ErrorBoundary } from '~/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 记录错误
        console.error('Error:', error, errorInfo);
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
};
```

### 错误日志

```typescript
// 开发环境打印详细日志
if (process.env.NODE_ENV === 'development') {
  console.error('Detailed error:', error);
}

// 生产环境上报错误
if (process.env.NODE_ENV === 'production') {
  // 上报到错误监控服务
  reportError(error);
}
```

## 📝 代码注释规范

### JSDoc 注释

```typescript
/**
 * 获取用户信息
 *
 * @param userId - 用户 ID
 * @param options - 可选配置
 * @returns 用户信息 Promise
 *
 * @example
 * ```typescript
 * const user = await getUserInfo('123', { cache: true });
 * ```
 */
export const getUserInfo = async (
  userId: string,
  options?: FetchOptions
): Promise<UserInfo> => {
  // 实现
};
```

### TODO 注释

```typescript
// TODO: 优化性能 - leon.wang - 2026-04-03
// FIXME: 修复边界情况 - leon.wang - 2026-04-03
// NOTE: 重要说明
```

## 🎯 性能优化建议

### 1. 代码分割

```typescript
// 使用动态导入进行路由懒加载
import { lazy } from 'react';

const PageComponent = lazy(() => import('~/pages/Feature'));
```

### 2. 防抖和节流

```typescript
import { useDebounceFn, useThrottleFn } from 'ahooks';

const { run: debouncedSearch } = useDebounceFn(
  (value) => {
    // 搜索逻辑
  },
  { wait: 300 }
);
```

### 3. memo 优化

```typescript
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // 渲染逻辑
});
```

### 4. useMemo 和 useCallback

```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

## 🧪 开发最佳实践

### 1. 保持组件简单

- 单一职责原则
- 组件尽量在 200 行以内
- 复杂逻辑提取到自定义 Hooks

### 2. 避免 prop drilling

```typescript
// 使用 Context 或 zustand 传递深层数据
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### 3. 类型安全

```typescript
// ✅ 推荐：明确类型
interface User {
  id: string;
  name: string;
}

const user: User = { id: '1', name: 'John' };

// ❌ 避免：隐式 any
const user = { id: '1', name: 'John' };
```

### 4. 常量提取

```typescript
// constants.ts
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg'];

// 使用
import { MAX_FILE_SIZE } from './constants';
```

### 5. 错误处理

```typescript
// ✅ 推荐：明确的错误处理
try {
  const result = await apiCall();
  handleSuccess(result);
} catch (error) {
  if (error instanceof NetworkError) {
    handleNetworkError(error);
  } else {
    handleUnknownError(error);
  }
}
```

## 📚 参考资源

- [Neat Design 文档](https://neat-design.derbysoft.com/)
- [React 官方文档](https://react.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [React Router 文档](https://reactrouter.com/)
- [zustand 文档](https://docs.pmnd.rs/zustand)
- [ahooks 文档](https://ahooks.js.org/)
- [i18next 文档](https://www.i18next.com/)

## 🤖 AI 编程助手指南

当使用 GitHub Copilot 或其他 AI 助手时：

1. **遵循本文档的所有规范和最佳实践**
2. **生成的代码必须包含完整的 TypeScript 类型定义**
3. **自动添加文件头注释和 JSDoc**
4. **使用项目已有的工具和 Hooks**
5. **生成 SCSS 时使用项目的 mixins 和变量**
6. **国际化文本必须使用 i18n.t()**
7. **组件必须包含 Props 接口文档**
8. **遵循 BEM 命名规范编写样式**

---

**最后更新**: 2026-04-03
**维护者**: leon.wang
