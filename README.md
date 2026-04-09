<div align="center">
  <h1>Neat Admin Template</h1>
  <p>Enterprise-level Admin Template based on React + TypeScript + Neat Design</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#development-guide">Development Guide</a>
  </p>
</div>

---

## 📖 Introduction

Neat Admin Template is a production-ready enterprise admin system template built with React 18 + TypeScript, based on Neat Design for modern UI experience. The project features **automatic route generation**, **i18n support**, **permission management**, and follows best practices to help you build high-quality admin dashboards quickly.

## ✨ Features

### Core Features

- 🚀 **Automatic Route Generation** - Menu-driven routing, no manual maintenance needed
- 🎨 **Neat Design UI** - Enterprise-level component library based on Neat Design
- 🌍 **Internationalization** - Built-in i18next, supports Chinese/English with TypeScript safety
- 🔐 **Permission Management** - Complete route and operation permission control
- 📱 **Responsive Layout** - Supports desktop and mobile devices
- 🎯 **TypeScript** - Full type definitions for excellent DX
- ⚡ **Performance Optimized** - Route lazy loading, code splitting
- 🛠️ **Developer Experience** - ESLint + Prettier for consistent code style

### Technical Highlights

- **State Management** - zustand + zustand-kit, lightweight and easy to use
- **Routing** - React Router 7.x with data preloading support
- **Request Handling** - Axios + ahooks
- **Styling** - SCSS + BEM naming convention, maintainable style architecture
- **Build Tools** - Custom build scripts with multi-environment support

## 🔧 Tech Stack

```json
{
  "Core Framework": "React 18.3.1 + TypeScript",
  "UI Library": "Neat Design",
  "State Management": "zustand-kit",
  "Routing": "React Router 7.7.1",
  "HTTP Client": "Axios 1.11.0",
  "Hooks Library": "ahooks 3.9.0",
  "i18n": "i18next 25.3.2 + react-i18next 15.6.1",
  "Styling": "SCSS + BEM",
  "Build Tools": "Custom Build Scripts"
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

#### Option 1: Clone the Repository

```bash
# Clone repository
git clone --depth 1 https://github.com/leonwgc/neat-admin-template.git my-admin-project

# Enter directory
cd my-admin-project

# Remove Git history (optional)
rm -rf .git

# Initialize new repository (optional)
git init

# Install dependencies
npm install
```

#### Option 2: Direct Use

```bash
# Clone to local
git clone https://github.com/leonwgc/neat-admin-template.git
cd neat-admin-template

# Install dependencies
npm install
```

### Development

```bash
# Start dev server (default port 3002)
npm start

# Visit http://localhost:3002
```

### Build

```bash
# Build for QA environment
npm run build:qa

# Build for UAT environment
npm run build:uat

# Build for production
npm run build:prod
```

### Configuration

Configuration files are located in `build/env/`:

- `config.qa.js` - QA environment config
- `config.uat.js` - UAT environment config
- `config.production.js` - Production environment config

## 📁 Project Structure

```
neat-admin-template/
├── build/                      # Build scripts
│   ├── env/                   # Environment configs
│   │   ├── config.qa.js
│   │   ├── config.uat.js
│   │   └── config.production.js
│   ├── config.js              # Build configuration
│   └── utils.js               # Build utilities
├── src/
│   ├── components/            # Shared components
│   │   ├── ErrorBoundary/    # Error boundary
│   │   ├── GlobalSearch/     # Global search
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── User/             # User management
│   │   ├── Form/             # Form examples
│   │   └── ...
│   ├── layouts/               # Layout components
│   │   ├── App.tsx           # Main layout
│   │   ├── Header.tsx        # Header
│   │   ├── Sider.tsx         # Sidebar
│   │   ├── Menus.tsx         # Menu
│   │   └── RouteGuard.tsx    # Route guard
│   ├── hooks/                 # Custom hooks
│   │   ├── useNavTo.tsx      # Navigation hook
│   │   ├── useDsRequest.tsx  # Data request hook
│   │   ├── useDsTable.tsx    # Table data hook
│   │   └── ...
│   ├── locales/               # Internationalization
│   │   ├── zh.ts             # Chinese
│   │   ├── en.ts             # English
│   │   └── index.ts          # i18n config
│   ├── utils/                 # Utilities
│   │   ├── routeGenerator.tsx # Route generator
│   │   └── ...
│   ├── scss/                  # Global styles
│   ├── config.menu.tsx        # Menu config (route source)
│   ├── config.route.ts        # Route config (auto-generated)
│   ├── config.operations.ts   # Operation permissions
│   ├── RouteConfig.tsx        # Route configuration (auto-generated)
│   ├── global/                # Global state hooks
   │   └── useUserInfo.ts    # User state example
│   ├── req.ts                 # Request wrapper
│   ├── i18n.ts                # i18n initialization
│   └── App.tsx                # App entry
├── pack.js                    # Dev server
├── build.js                   # Build script for docs
└── package.json
```

## 📝 Development Guide

### Adding New Pages (3 Steps)

#### Step 1: Create Page Component

```tsx
/**
 * @file pages/Product/ProductList.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Button, Table } from '@derbysoft/neat-design';
import './ProductList.scss';

const ProductList: FC = () => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <Table />
    </div>
  );
};

export default ProductList; // Must use default export
```

Create style file:

```scss
/**
 * @file pages/Product/ProductList.scss
 * @author leon.wang
 */
@import 'scss/common.scss'; // Must import

.product-list {
  padding: 20px;

  &__header {
    margin-bottom: 16px;
  }
}
```

#### Step 2: Configure Menu (Route Source)

Add menu item in `src/config.menu.tsx`:

```tsx
import { ShopOutlined } from '@derbysoft/neat-design-icons';

{
  key: 'product',
  get label() { return t('menu.products'); },  // Use getter for dynamic translation
  icon: <ShopOutlined />,
  permissions: [],
  children: [
    {
      key: 'product-list',
      get label() { return t('menu.productList'); },
      route: '/app/products',        // Define route path
      permissions: [],
    },
    {
      key: 'product-detail',
      get label() { return t('menu.productDetail'); },
      route: '/app/products/:id',
      hidden: true,  // Hidden from menu, but route exists
    },
  ],
}
```

#### Step 3: Register Component Mapping

Add in `src/utils/routeGenerator.tsx`:

```tsx
export const routeComponentMap: RouteComponentMap = {
  // ...existing routes
  '/app/products': lazyLoad('pages/Product/ProductList'),
  '/app/products/:id': lazyLoad('pages/Product/ProductDetail'),
};
```

**Done!** Routes are auto-generated, no need to manually edit `RouteConfig.tsx`.

### Menu Configuration

```tsx
interface MenuItem {
  key: string; // Unique identifier
  label: string | { (): string }; // Menu text (use getter for dynamic translation)
  route?: string; // Route path (must start with /app/)
  icon?: ReactNode; // Menu icon (@ant-design/icons)
  permissions?: string[]; // Permission list
  hidden?: boolean; // true: route exists but menu hidden
  children?: MenuItem[]; // Sub-menus
}
```

### Internationalization

#### Adding New Translations (Auto Discovery)

Page locales are now auto-discovered from `src/pages/**/locales`.
You do **not** need to manually import page locale files in `src/locales/en.ts`, `src/locales/zh.ts`, or register namespaces in `src/locales/index.ts`.

1. **Create translation files under page directory**

```typescript
// src/pages/Product/locales/zh.ts
export default {
  productTitle: '产品列表',
  productColName: '产品名称',
  productBtnAdd: '添加产品',
};

// src/pages/Product/locales/en.ts
export default {
  productTitle: 'Product List',
  productColName: 'Product Name',
  productBtnAdd: 'Add Product',
};
```

2. **Use translations in page/component**

```tsx
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ProductPage: FC = () => {
  const { t } = useTranslation('pages.product');

  return (
    <div>
      <h1>{t('productTitle')}</h1>
      <button>{t('productBtnAdd')}</button>
    </div>
  );
};
```

You can also use full key path style:

```tsx
t('pages.product:productTitle');
```

#### Namespace Mapping Rule

- File path `src/pages/Product/locales/en.ts` maps to namespace `pages.product`
- File path `src/pages/Form/locales/zh.ts` maps to namespace `pages.form`
- Nested page folders also work (example: `src/pages/Order/Detail/locales/en.ts` -> `pages.order.detail`)

#### Missing Locale File Behavior

- If a page has no `en.ts` and no `zh.ts`, page keys under that namespace are missing
- If only one language exists, switching to the other language falls back to `fallbackLng` (current default is `zh`)
- If key is missing in both current language and fallback language, i18next displays the key itself

To avoid mixed-language UI, keep key sets aligned between `en.ts` and `zh.ts`.

#### Troubleshooting: Menu Switches But Page Text Does Not

- Confirm page locale files are placed under `src/pages/<PageName>/locales/en.ts` and `src/pages/<PageName>/locales/zh.ts`
- Confirm component uses matching namespace (for example `useTranslation('pages.table')`)
- Confirm translation keys exist in both language files

### State Management

#### Global State (zustand-kit)

Create a custom hook in `src/global/` using `useGlobalState`. See `src/global/useUserInfo.ts` as reference:

```tsx
// src/global/useUserInfo.ts
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
```

Usage in components:

```tsx
import useUserInfo from '~/global/useUserInfo';

const [userInfo, setUserInfo] = useUserInfo();
```

**Use cases**: User info, permissions, theme, and other cross-page shared data

**Convention**: All global state hooks are placed in `src/global/`

#### Local State

Use `useState` or ahooks for: form inputs, table data, modals, page-specific data

### Code Standards

#### File Header (Required)

```typescript
/**
 * @file relative/path/from/src
 * @author leon.wang
 */
```

#### Import Order

```typescript
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
```

#### Component Development

```tsx
export interface ComponentProps {
  /** Prop description */
  title?: string;
  /** Callback function */
  onSubmit?: (data: any) => void;
}

/**
 * Component description (use English)
 * Used for displaying product information
 */
export const Component: FC<ComponentProps> = ({ title, onSubmit }) => {
  return <div>{title}</div>;
};

export default Component; // Export both named and default
```

#### UI Component Usage

```tsx
// ✅ Correct
import { Button, Form, Input } from '@derbysoft/neat-design';
import { EmailOutlined } from '@derbysoft/neat-design-icons';

// ❌ Wrong
import { Button } from 'antd';
import { EmailOutlined } from '@ant-design/icons';
```

**Rules:**

- Icons: `@derbysoft/neat-design-icons`
- UI components: `@derbysoft/neat-design` (DO NOT use antd directly)

#### SCSS Standards

```scss
/**
 * @file components/ContactInfo/ContactInfo.scss
 * @author leon.wang
 */
@import 'scss/common.scss'; // ✅ Must import

.contact-info {
  padding: 16px;

  &__item {
    // BEM Element
    display: flex;
  }

  &--active {
    // BEM Modifier
    background: #f0f0f0;
  }
}
```

### Path Aliases

```typescript
"~/*"          → "src/*"
"scss/*"       → "src/scss/*"
"components/*" → "src/components/*"
```

Usage example:

```tsx
import { useNavTo } from '~/hooks/useNavTo';
import { ContactInfo } from 'components/ContactInfo';
import 'scss/common.scss';
```

## 🎯 Core Features

### Automatic Route Generation

The project adopts a **menu-driven routing** design philosophy:

```
config.menu.tsx → routeGenerator.tsx → RouteConfig.tsx → RouteGuard.tsx
  (Menu Config)     (Component Map)      (Auto Routes)     (Guard)
```

**Advantages:**

- 📌 Single source of truth: Menu config drives routes and navigation
- 📌 No duplication: Routes defined only once
- 📌 Type safety: Full TypeScript type support
- 📌 Permission integration: Routes automatically inherit menu permissions

Detailed docs: [src/utils/README.md](src/utils/README.md)

### Permission Management

#### Route Permissions

```tsx
{
  key: 'user-management',
  label: 'User Management',
  route: '/app/users',
  permissions: ['user:read'],  // Only has these permissions will see this route
}
```

#### Operation Permissions

```tsx
import useUserInfo from '~/global/useUserInfo';

const [userInfo] = useUserInfo();
const canDelete = userInfo?.operations.includes('user:delete');

{
  canDelete && <Button>Delete</Button>;
}
```

### Performance Optimization

- ✅ Route lazy loading
- ✅ Code splitting

## 🤝 Contributing

Issues and Pull Requests are welcome!

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code formatting
refactor: Code refactoring
perf: Performance optimization
test: Testing related
chore: Build/toolchain updates
```

## 📄 License

ISC

## 👤 Author

leon.wang
