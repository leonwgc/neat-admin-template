````instructions
# AI Agent Instructions for ant-admin-template

## 🌐 Language Requirement
**Always respond in Chinese (中文) in the chat window.**

---

## Architecture Overview

React + TypeScript admin template using **menu-driven automatic routing**. Routes auto-generate from `config.menu.tsx` — no manual route config needed.

### Data Flow
```
config.menu.tsx → routeGenerator.tsx → RouteConfig.tsx → RouteGuard.tsx
  (菜单配置)         (组件映射)          (自动路由)        (权限守卫)
```

### Key Files
- [config.menu.tsx](src/config.menu.tsx) - **Single source of truth** for menus & routes
- [utils/routeGenerator.tsx](src/utils/routeGenerator.tsx) - Component mapping
- [RouteConfig.tsx](src/RouteConfig.tsx) - Auto-generated (**DO NOT EDIT**)
- [global/useUserInfo.ts](src/global/useUserInfo.ts) - Global state example (zustand-kit)
- [req.ts](src/req.ts) - Axios instance with env-based baseURL
- [locales/index.ts](src/locales/index.ts) - i18n namespace registry

---

## Adding New Pages (3 Steps)

### 1. Add menu item in \`config.menu.tsx\`
\`\`\`tsx
{
  key: 'product-list',
  get label() { return t('menu.products'); },  // ✅ Use getter for i18n
  route: '/app/products',                       // Must start with /app/
  permissions: [],
  hidden: false,  // true = route exists, but hidden from menu
}
\`\`\`

### 2. Register component in \`utils/routeGenerator.tsx\`
\`\`\`tsx
export const routeComponentMap: RouteComponentMap = {
  '/app/products': lazyLoad('pages/Product/ProductList'),  // Path relative to src/
};
\`\`\`

### 3. Create page component with \`default export\`
\`\`\`tsx
/**
 * @file pages/Product/ProductList.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import './ProductList.scss';

const ProductList: FC = () => {
  return <div>Product List</div>;
};

export default ProductList;  // ✅ Must use default export
\`\`\`

---

## Critical Conventions

### File Header (Mandatory)
\`\`\`tsx
/**
 * @file relative/path/from/src
 * @author leon.wang
 */
\`\`\`

### Import Order (4 Sections, Separated by Blank Lines)
\`\`\`tsx
// 1. React core
import React, { FC, useState } from 'react';

// 2. Third-party libraries
import { Button, Table } from '@derbysoft/neat-design';
import { useRequest } from 'ahooks';

// 3. Project modules
import { useNavTo } from '~/hooks/useNavTo';
import req from '~/req';

// 4. Styles (last)
import './Component.scss';
\`\`\`

### Component Pattern
\`\`\`tsx
export interface ComponentProps {
  /** Prop description */
  title?: string;
}

/**
 * Component description (English)
 */
export const Component: FC<ComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default Component;  // Both named & default export
\`\`\`

### UI Components & Icons
- **UI**: \`@derbysoft/neat-design\` (NOT \`antd\`)
- **Menu icons**: \`@ant-design/icons\`
- **Page icons**: \`@derbysoft/neat-design-icons\`
- **Illustrations**: \`@derbysoft/neat-design-illustrations\`

\`\`\`tsx
// ✅ Correct
import { Button } from '@derbysoft/neat-design';
import { UserOutlined } from '@ant-design/icons';  // Menu only
import { EmailOutlined } from '@derbysoft/neat-design-icons';  // In pages

// ❌ Wrong
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';  // In pages
\`\`\`

### Hooks Priority
1. **ahooks** (first choice)
2. **Project hooks** (\`~/hooks/*\`): \`useNavTo\`, \`useDsRequest\`, \`useDsTable\`, \`useGlobalState\`
3. React built-ins

### Styles (SCSS, Not CSS Modules)
\`\`\`scss
/**
 * @file components/ContactInfo/ContactInfo.scss
 * @author leon.wang
 */
@import 'scss/common.scss';  // ✅ Must import at top

.contact-info {
  &__item { }      // BEM Element
  &--active { }    // BEM Modifier
}
\`\`\`

\`\`\`tsx
<div className="contact-info">  {/* ✅ Double quotes */}
  <div className="contact-info__item"></div>
</div>
\`\`\`

### i18n
**Namespace format**: \`'pages.feature:keyName'\`

\`\`\`tsx
const { t } = useTranslation();  // Default namespace

return (
  <div>
    <h1>{t('pages.user:usersTitle')}</h1>
    <Button>{t('pages.user:usersBtnSubmit')}</Button>
  </div>
);
\`\`\`

**Key naming**: \`xxxTitle\`, \`xxxCol\`, \`xxxForm\`, \`xxxFormPh\`, \`xxxBtn\`, \`xxxMsg\`

**Add new translations**:
1. Create \`locales/pages/feature/zh.ts\` & \`en.ts\`
2. Import in \`locales/zh.ts\` & \`en.ts\`
3. **Register namespace** in \`locales/index.ts\`:
   \`\`\`tsx
   export const resources = {
     zh: {
       common: zh,
       'pages.feature': zh.pages.feature,  // ← Register here
     },
   } as const;  // ← as const for TypeScript
   \`\`\`

---

## Path Aliases
\`\`\`tsx
import { useNavTo } from '~/hooks/useNavTo';           // src/
import { ContactInfo } from 'components/ContactInfo';  // src/components/
import 'scss/common.scss';                             // src/scss/
\`\`\`

---

## State Management

### Global State (zustand-kit)
Use \`useGlobalState\` from \`zustand-kit\`. See \`src/global/useUserInfo.ts\` as reference:

\`\`\`tsx
import { useGlobalState } from 'zustand-kit';

type UserInfo = {
  userId: string;
  username: string;
  nickname: string;
  operations: string[];
};

const useUserInfo = () => {
  return useGlobalState<UserInfo | null>('UserInfo', {
    userId: '1',
    username: 'Admin',
    nickname: 'Flash',
    operations: [],
  });
};

export default useUserInfo;
\`\`\`

**Usage in components**:
\`\`\`tsx
import useUserInfo from '~/global/useUserInfo';

const [userInfo, setUserInfo] = useUserInfo();
\`\`\`

**Use cases**: User info, permissions, theme, and other cross-page shared data

### Local State
Use \`useState\` / ahooks for: form inputs, table data, modals, page-specific data

---

## Build Commands
\`\`\`bash
npm start          # Dev server (port 3002)
npm run build:qa   # QA environment
npm run build:uat  # UAT environment
npm run build:prod # Production environment
\`\`\`

---

## MCP Services (🚨 MANDATORY)

### Before Using Neat Design Components
\`\`\`typescript
// 1. Get component overview
mcp_neat-design-m_get_components_information()

// 2. Get component documentation
mcp_neat-design-m_get_component_document({ componentName: "Table" })

// 3. Get examples metadata
mcp_neat-design-m_get_component_examples_info({ componentName: "Table" })

// 4. Get example code
mcp_neat-design-m_get_component_example({
  componentName: "Table",
  exampleFileName: "basic.tsx"
})
\`\`\`

### Before Using Icons/Illustrations
\`\`\`typescript
mcp_neat-design-m_get_icons_information()
mcp_neat-design-m_get_all_icon_names()
mcp_neat-design-m_get_illustrations_information()
\`\`\`

### Before Using ahooks
\`\`\`typescript
mcp_ahooks_search_hooks({ keyword: "table" })
mcp_ahooks_get_hook_info({ name: "useAntdTable" })
\`\`\`

### Before Custom Styles
\`\`\`typescript
mcp_neat-design-m_get_use_create_styles_guide()
\`\`\`

**See** [01-mcp.neat.instructions.md](.github/instructions/01-mcp.neat.instructions.md) for detailed workflow.

---

## Common Pitfalls ⚠️

1. **Menu label not updating on language switch**
   - ❌ \`label: t('menu.users')\`
   - ✅ \`get label() { return t('menu.users'); }\`

2. **Manually editing auto-generated files**
   - ❌ Editing \`RouteConfig.tsx\`
   - ✅ Edit \`config.menu.tsx\` & \`routeGenerator.tsx\` only

3. **Missing namespace registration**
   - ❌ Forgot to register in \`locales/index.ts\`
   - ✅ Register all namespaces with \`as const\`

4. **Wrong icon library**
   - ❌ Using `@ant-design/icons` anywhere
   - ✅ Use `@derbysoft/neat-design-icons` for all icons

5. **Missing MCP query**
   - ❌ Using components without checking docs
   - ✅ Query MCP services first

6. **Wrong component import**
   - ❌ \`import { Button } from 'antd';\`
   - ✅ \`import { Button } from '@derbysoft/neat-design';\`

7. **Forgot default export**
   - ❌ \`export const MyPage: FC = () => {}\`
   - ✅ \`const MyPage: FC = () => {}; export default MyPage;\`

---

## Quick Checklist ✅

**New Component/Page**:
- [ ] File header with \`@file\` and \`@author\`
- [ ] Imports in 4-section order (blank line separated)
- [ ] Component uses \`const Name: FC<Props> = () => {}\`
- [ ] Props interface exported with JSDoc comments
- [ ] Default export at end
- [ ] SCSS imports \`@import 'scss/common.scss';\`
- [ ] BEM naming in SCSS
- [ ] Double quotes for \`className\`

**New Route**:
- [ ] Menu item in \`config.menu.tsx\` with getter function
- [ ] Component mapped in \`routeGenerator.tsx\`
- [ ] Route starts with \`/app/\`
- [ ] New translations added and namespace registered

**Using Neat Design**:
- [ ] MCP service queried first
- [ ] Import from \`@derbysoft/neat-design\`
- [ ] Icons from `@derbysoft/neat-design-icons`

---

## Tech Stack Summary
- **React** 18.3.1 + TypeScript
- **UI**: @derbysoft/neat-design 2.2.2 (based on Ant Design 5.x)
- **Icons**: @derbysoft/neat-design-icons (all icons)
- **Illustrations**: @derbysoft/neat-design-illustrations
- **State**: Zustand 5.0.9 + zustand-kit
- **Router**: React Router 7.7.1
- **Hooks**: ahooks 3.9.0
- **Forms**: React Hook Form 7.71.1 + @derbysoft/antd-form-builder
- **i18n**: i18next + react-i18next
- **Build**: Custom scripts (pack.mjs + build/)

---

## Additional Resources
- [00-dev.instructions.md](.github/instructions/00-dev.instructions.md) - Full coding standards
- [01-mcp.neat.instructions.md](.github/instructions/01-mcp.neat.instructions.md) - Neat Design MCP workflow
- [02-mcp.ant.instructions.md](.github/instructions/02-mcp.ant.instructions.md) - Ant Design MCP reference
- [utils/README.md](src/utils/README.md) - Route generator deep dive
- [locales/README.md](src/locales/README.md) - i18n system guide
````
