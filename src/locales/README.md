# 多语言（i18n）使用指南

## 📖 概述

本项目采用模块化的多语言组织方式，每个页面/模块可以定义自己的翻译文件，最终汇总到统一的语言资源中。通过命名空间机制避免翻译键的冲突。

## 📁 目录结构

```
src/
├── locales/              # 所有翻译文件统一管理
│   ├── index.ts          # 导出所有语言资源
│   ├── en.ts             # 英文翻译汇总
│   ├── zh.ts             # 中文翻译汇总
│   ├── common/           # 公共翻译（全局使用）
│   │   ├── en.ts         # 公共英文翻译
│   │   └── zh.ts         # 公共中文翻译
│   └── pages/            # 页面专属翻译
│       └── user/         # User 页面翻译
│           ├── en.ts
│           └── zh.ts
└── pages/
    └── User/
        ├── Users.tsx
        ├── Add.tsx
        └── Edit.tsx
```

## 🎯 命名空间规则

### 1. 公共模块（Common Module）

**位置**: `src/locales/common/`
**命名空间**: 无（直接在根层级）
**用途**: 存放全局通用的翻译，如菜单、通用操作按钮等

**访问方式**:
```typescript
t('switchLanguage')       // 切换语言
t('menu.users')           // 菜单：用户
t('hotel.checkIn')        // 酒店：入住
```

### 2. 页面模块（Page Module）

**位置**: `src/pages/[PageName]/locales/`
**命名空间**: `pages.[pageName].[subModule]`
**用途**: 存放页面专属的翻译

**访问方式**:
```typescript
t('pages.user.users.pageTitle')              // 页面标题
t('pages.user.users.columns.name')           // 表格列名
t('pages.user.users.actions.submit')         // 操作按钮
```

## 📝 创建新页面的翻译

### Step 1: 创建页面翻译文件

在 `src/locales/pages/` 目录下创建对应的页面文件夹，添加 `en.ts` 和 `zh.ts`：

```typescript
// src/locales/pages/user/en.ts
/**
 * @file locales/pages/user/en.ts
 * @author leon.wang
 */

export default {
  users: {
    pageTitle: 'Users',
    columns: {
      name: 'Name',
      age: 'Age',
    },
    actions: {
      submit: 'Submit',
      reset: 'Reset',
    },
  },
  addUser: {
    pageTitle: 'Add User',
  },
};
```

```typescript
// src/locales/pages/user/zh.ts
/**
 * @file locales/pages/user/zh.ts
 * @author leon.wang
 */

export default {
  users: {
    pageTitle: '用户列表',
    columns: {
      name: '姓名',
      age: '年龄',
    },
    actions: {
      submit: '提交',
      reset: '重置',
    },
  },
  addUser: {
    pageTitle: '添加用户',
  },
};
```

### Step 2: 导入到主翻译文件

在 `src/locales/en.ts` 和 `src/locales/zh.ts` 中导入并注册：

```typescript
// src/locales/en.ts
import commonEn from './common/en';
import userEn from './pages/user/en';

const en = {
  ...commonEn,
  pages: {
    user: userEn,
  },
};

export default en;
```

同时在 `src/locales/index.ts` 中注册命名空间（用于简化翻译键）：

```typescript
import zh from './zh';
import en from './en';

const resources = {
  en: {
    translation: en,
    'pages.user': en.pages.user,  // 注册命名空间
  },
  zh: {
    translation: zh,
    'pages.user': zh.pages.user,  // 注册命名空间
  },
};

export default resources;
```

```typescript
// src/locales/zh.ts
import commonZh from './common/zh';
import userZh from './pages/user/zh';

const zh = {
  ...commonZh,
  pages: {
    user: userZh,
  },
};

export default zh;
```

### Step 3: 在组件中使用

**方式一：使用命名空间（推荐）**
```typescript
import { useTranslation } from 'react-i18next';

export default () => {
  // 指定命名空间，简化翻译键
  const { t } = useTranslation('pages.user');

  return (
    <div>
      <h1>{t('users.pageTitle')}</h1>
      <Button>{t('users.actions.submit')}</Button>
    </div>
  );
};
```

**方式二：使用完整路径**
```typescript
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.user.users.pageTitle')}</h1>
      <Button>{t('pages.user.users.actions.submit')}</Button>
    </div>
  );
};
```

💡 **推荐使用方式一**，键名更简洁，代码更易读。

---

## 🔑 翻译键使用规范

### 命名空间的优势

✅ **简化键名**：`t('users.title')` 比 `t('pages.user.users.title')` 更简洁
✅ **提高可读性**：减少冗余前缀
✅ **避免重复**：不需要每次都写完整路径
✅ **易于维护**：修改命名空间结构更方便

### 使用场景

| 场景 | 命名空间 | 翻译键示例 |
|------|---------|-----------|
| 全局通用 | 无（默认） | `t('switchLanguage')` |
| User 页面 | `pages.user` | `t('users.pageTitle')` |
| Order 页面 | `pages.order` | `t('list.pageTitle')` |

### 访问方式对比

```typescript
// ❌ 不使用命名空间 - 键名过长
const { t } = useTranslation();
t('pages.user.users.pageTitle')
t('pages.user.users.columns.name')
t('pages.user.users.actions.submit')

// ✅ 使用命名空间 - 简洁清晰
const { t } = useTranslation('pages.user');
t('users.pageTitle')
t('users.columns.name')
t('users.actions.submit')

// ✅ 访问全局翻译
const { t } = useTranslation();
t('menu.users')
t('switchLanguage')
```

### 全局公共翻译

放在 `locales/common/`，无命名空间前缀：

```typescript
// ✅ 推荐
t('switchLanguage')
t('menu.users')
t('hotel.checkIn')
t('guestInfo.nameLabel')

// ❌ 不推荐
t('common.switchLanguage')  // 不需要 common 前缀
```

### 页面专属翻译

使用 `pages.[模块名].[子模块]` 格式：

```typescript
// ✅ 推荐
t('pages.user.users.pageTitle')          // User/Users 页面
t('pages.user.addUser.submitButton')     // User/Add 页面
t('pages.order.list.columns.orderId')    // Order/List 页面

// ❌ 不推荐
t('users.pageTitle')                     // 缺少命名空间，易冲突
t('page.user.users.title')               // page 应为 pages（复数）
```

### 组件专属翻译

如果组件在多个页面使用，可以放在组件目录下：

```typescript
// src/components/ContactInfo/locales/en.ts
export default {
  emailLabel: 'Email',
  phoneLabel: 'Phone',
};

// 在主翻译文件中注册
const en = {
  ...commonEn,
  components: {
    contactInfo: contactInfoEn,
  },
};

// 使用
t('components.contactInfo.emailLabel')
```

## 🌐 命名空间层级建议

### 标准结构

```
pages.
  ├── user.
  │   ├── users.          # Users 列表页
  │   │   ├── pageTitle
  │   │   ├── columns.
  │   │   │   ├── name
  │   │   │   └── age
  │   │   ├── form.
  │   │   │   └── nameLabel
  │   │   ├── actions.
  │   │   │   ├── submit
  │   │   │   └── reset
  │   │   └── messages.
  │   │       └── deleteSuccess
  │   ├── addUser.        # Add User 页
  │   └── editUser.       # Edit User 页
  ├── order.
  │   ├── list.
  │   └── detail.
  └── dashboard.
      └── overview.
```

## 💡 最佳实践

### 1. 文件组织

```
✅ 推荐：统一在 src/locales/pages/ 下管理
src/locales/
  ├── common/
  │   ├── en.ts
  │   └── zh.ts
  └── pages/
      ├── user/
      │   ├── en.ts
      │   └── zh.ts
      └── order/
          ├── en.ts
          └── zh.ts

src/pages/
  ├── User/
  │   ├── Users.tsx
  │   ├── Add.tsx
  │   └── Edit.tsx
  └── Order/
      ├── List.tsx
      └── Detail.tsx

❌ 不推荐：分散在各个页面目录下
src/pages/
  ├── User/
  │   ├── Users.tsx
  │   ├── Add.tsx
  │   └── locales/      # 分散在这里
  │       ├── en.ts
  │       └── zh.ts
  └── Order/
      ├── List.tsx
      └── locales/      # 分散在这里
          ├── en.ts
          └── zh.ts
```

### 2. 键名设计

```typescript
// ✅ 清晰的层级结构
{
  users: {
    pageTitle: '...',
    columns: { ... },
    actions: { ... },
    messages: { ... },
  }
}

// ❌ 扁平化，不易维护
{
  usersPageTitle: '...',
  usersColumnName: '...',
  usersActionSubmit: '...',
}
```

### 3. 翻译键命名

```typescript
// ✅ 语义化命名
pageTitle, submitButton, deleteConfirm

// ❌ 含义不清
title1, btn2, msg3
```

### 4. 添加文件头注释

```typescript
/**
 * @file pages/User/locales/en.ts
 * @author leon.wang
 */

/**
 * User management pages translations (English)
 * Namespace: pages.user
 */
export default {
  // ...
};
```

## 📋 完整示例

### 创建 Order 订单页面的多语言

```typescript
// src/locales/pages/order/en.ts
/**
 * @file locales/pages/order/en.ts
 * @author leon.wang
 */

export default {
  list: {
    pageTitle: 'Order List',
    columns: {
      orderId: 'Order ID',
      amount: 'Amount',
      status: 'Status',
    },
    status: {
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
    },
  },
  detail: {
    pageTitle: 'Order Detail',
    basicInfo: 'Basic Information',
    paymentInfo: 'Payment Information',
  },
};
```

```typescript
// src/locales/pages/order/zh.ts
/**
 * @file locales/pages/order/zh.ts
 * @author leon.wang
 */

export default {
  list: {
    pageTitle: '订单列表',
    columns: {
      orderId: '订单号',
      amount: '金额',
      status: '状态',
    },
    status: {
      pending: '待处理',
      completed: '已完成',
      cancelled: '已取消',
    },
  },
  detail: {
    pageTitle: '订单详情',
    basicInfo: '基本信息',
    paymentInfo: '支付信息',
  },
};
```

```typescript
// src/locales/en.ts
import orderEn from './pages/order/en';

const en = {
  ...commonEn,
  pages: {
    user: userEn,
    order: orderEn,  // 添加 order 模块
  },
};
```

```typescript
// src/pages/Order/List.tsx
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('pages.order.list.pageTitle')}</h1>
      <Table
        columns={[
          {
            title: t('pages.order.list.columns.orderId'),
            dataIndex: 'orderId',
          },
          {
            title: t('pages.order.list.columns.status'),
            dataIndex: 'status',
            render: (status) => t(`pages.order.list.status.${status}`),
          },
        ]}
      />
    </div>
  );
};
```

## 🔄 迁移现有页面

如果你要迁移现有页面到新的多语言结构：

1. 在 `src/locales/pages/` 下创建对应的页面目录，如 `order/`
2. 创建 `en.ts` 和 `zh.ts` 文件，移入翻译内容
3. 在 `src/locales/en.ts` 和 `zh.ts` 中导入并注册
4. 更新组件中的翻译键（如果命名空间有变化）
5. 测试切换语言功能是否正常

## ❓ FAQ

**Q: 什么时候应该放在 common 模块？**
A: 在多个页面/模块都会使用的翻译，如菜单、通用按钮（确定、取消）、全局提示等。

**Q: 命名空间会不会太长？**
A: 虽然键名较长，但能有效避免冲突，且 IDE 会有自动补全，实际使用并不麻烦。

**Q: 可以使用变量拼接翻译键吗？**
A: 可以，例如: `t(\`pages.order.list.status.${status}\`)`

**Q: 如何处理带参数的翻译？**
A: 使用插值语法，例如: `'Found {{count}} items'` → `t('key', { count: 10 })`

---

## 🎉 总结

新的多语言组织方式具有以下优势：

1. ✅ **集中管理**: 所有翻译文件统一在 `src/locales/` 目录下
2. ✅ **模块化**: 通过 `common/` 和 `pages/` 目录分离公共和页面专属翻译
3. ✅ **可扩展**: 新增页面只需在 `locales/pages/` 下添加文件夹
4. ✅ **无冲突**: 通过命名空间避免键名冲突
5. ✅ **易查找**: 不用在各个页面目录中寻找翻译文件
6. ✅ **易维护**: 翻译文件集中，便于统一管理和修改
7. ✅ **类型安全**: 可以为翻译键生成 TypeScript 类型

遵循本指南，可以让项目的多语言管理更加规范和高效！
