<div align="center">
  <h1>Neat Admin Template</h1>
  <p>Enterprise-level Admin Template based on React + TypeScript + Neat Design</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#development-guide">Development Guide</a> •
    <a href="#internationalization">Internationalization</a>
  </p>
</div>

---

## Introduction

Neat Admin Template is a production-ready enterprise admin system template built with React 18 + TypeScript and Neat Design.

Current implementation highlights:

- Menu-driven route extraction with centralized route-to-component mapping
- i18next + react-i18next with TypeScript typing
- Auto discovery of page locales from src/pages/**/locales
- Permission-aware menu and route guard workflow
- Responsive layout for desktop/mobile

## Features

- React 18 + TypeScript project scaffold for admin systems
- Neat Design component system and icon set
- SPA routing
- Menu config as route source of truth
- Route lazy loading for page modules
- i18n (zh/en) with runtime language switching and persistence
- Permission operation constants and user permission checks
- SCSS + BEM style organization
- ESLint-based static checks

## Tech Stack

Core dependencies:

- React 18.3.1
- TypeScript
- React Router 7.7.1
- i18next 25.x + react-i18next 15.x
- zustand 5.x + @derbysoft/zustand-kit
- axios + ahooks
- @derbysoft/neat-design + @derbysoft/neat-design-icons

Build/dev tools:

- @derbysoft/pack
- ESLint 9
- rimraf

## Quick Start

### Prerequisites

- Node.js >= 16
- npm >= 8

### Install

```bash
npm install
```

### Run Locally

```bash
npm start
```

Default local URL:

- http://localhost:3000

### Quality Check

```bash
npm run lint
```

### Build

```bash
npm run build:qa
npm run build:uat
npm run build:prod
```

### Generate docs site bundle

```bash
npm run doc
```

## Scripts

From package.json:

- npm start: start dev server via pack.js
- npm run clean: remove dist
- npm run doc: generate docs bundle
- npm run lint: run eslint on src
- npm run build:qa: install deps + clean + build with qa env
- npm run build:uat: install deps + clean + build with uat env
- npm run build:prod: install deps + clean + build with production env

## Project Structure

```text
neat-admin-template/
├── build/                          # Build system and env configs
│   ├── env/
│   │   ├── config.qa.js
│   │   ├── config.uat.js
│   │   └── config.production.js
│   ├── config.js
│   ├── index.js
│   └── utils.js
├── docs/                           # Built docs output
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary/
│   │   ├── FadeIn/
│   │   ├── ImageCropper/
│   │   ├── ImageUpload/
│   │   └── Redirect/
│   ├── global/
│   │   └── useUserInfo.ts
│   ├── hooks/
│   │   └── useNavTo.tsx
│   ├── layouts/
│   │   ├── App.tsx
│   │   ├── Header.tsx
│   │   ├── Sider.tsx
│   │   ├── Menus.tsx
│   │   ├── MobileMenus.tsx
│   │   └── RouteGuard.tsx
│   ├── locales/
│   │   ├── common/
│   │   │   ├── en.ts
│   │   │   └── zh.ts
│   │   ├── en.ts
│   │   ├── zh.ts
│   │   ├── pageLocales.ts          # Page locale auto discovery
│   │   └── index.ts
│   ├── pages/
│   │   ├── Components/
│   │   │   ├── locales/
│   │   │   │   ├── en.ts
│   │   │   │   └── zh.ts
│   │   ├── Form/
│   │   │   ├── locales/
│   │   │   │   ├── en.ts
│   │   │   │   └── zh.ts
│   │   ├── Table/
│   │   │   ├── locales/
│   │   │   │   ├── en.ts
│   │   │   │   └── zh.ts
│   │   ├── NoPermission/
│   │   └── NotFound/
│   ├── scss/
│   ├── utils/
│   │   └── routeGenerator.tsx
│   ├── config.menu.tsx
│   ├── config.operations.ts
│   ├── config.route.ts
│   ├── config.ts
│   ├── i18n.ts
│   ├── RouteConfig.tsx
│   ├── App.tsx
│   └── index.tsx
├── doc.js
├── pack.js
├── package.json
└── tsconfig.json
```

## Routing Architecture

The current routing flow is:

- config.menu.tsx defines menu tree and route paths
- utils/routeGenerator.tsx extracts routes from menu config
- utils/routeGenerator.tsx maps path to page component via routeComponentMap
- RouteConfig.tsx renders routes dynamically from extracted menu routes

Important note:

- Route extraction is automatic from menu
- You still need to maintain routeComponentMap entries for each route path

Example route map:

```tsx
export const routeComponentMap = {
  '/app/forms': lazyLoad('pages/Form/ResponsiveForm'),
  '/app/forms/table': lazyLoad('pages/Table'),
};
```

## Development Guide

### Add a New Page

This project is not file-system auto routing. The complete flow is:

1. Create page component under src/pages
2. Add page locales under src/pages/<Module>/locales/en.ts and zh.ts
3. Add menu text keys in src/locales/common/en.ts and src/locales/common/zh.ts
4. Add permission key in src/config.operations.ts (if page needs operation control)
5. Add menu route in src/config.menu.tsx
6. Add route-component mapping in src/utils/routeGenerator.tsx

End-to-end example: add a new page under Components module

Step A: create page component

```tsx
// src/pages/Components/FilePreviewExample.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const FilePreviewExample: React.FC = () => {
  const { t } = useTranslation('pages.components');

  return <div>{t('filePreview.title')}</div>;
};

export default FilePreviewExample;
```

Step B: add page locale files (auto discovered)

```tsx
// src/pages/Components/locales/en.ts
export default {
  imageUpload: {
    // existing keys
  },
  imageCropper: {
    // existing keys
  },
  filePreview: {
    title: 'File Preview',
  },
};

// src/pages/Components/locales/zh.ts
export default {
  imageUpload: {
    // existing keys
  },
  imageCropper: {
    // existing keys
  },
  filePreview: {
    title: '文件预览',
  },
};
```

Step C: add menu label keys in common locale

```tsx
// src/locales/common/en.ts
menu: {
  // existing keys
  filePreview: 'File Preview',
}

// src/locales/common/zh.ts
menu: {
  // existing keys
  filePreview: '文件预览',
}
```

Step D: add permission operation (optional but recommended)

```tsx
// src/config.operations.ts
const operations = {
  // existing keys
  filePreviewRead: 'filePreviewRead',
};
```

Step E: register menu route

```tsx
// src/config.menu.tsx (inside components children)
{
  key: 'file-preview',
  get label() {
    return t('menu.filePreview');
  },
  route: '/app/components/file-preview',
  permissions: [operations.filePreviewRead],
}
```

Step F: map route to component

```tsx
// src/utils/routeGenerator.tsx
'/app/components/file-preview': lazyLoad('pages/Components/FilePreviewExample'),
```

After these steps, route extraction (from menu) and page locale loading (from src/pages/**/locales) both work automatically.

### Permission Model

Operation constants are managed in src/config.operations.ts.

Example:

```tsx
permissions: [operations.formRead]
```

Permission checks are typically based on user operation list in src/global/useUserInfo.ts and enforced in menu/guard logic.

### Styling

- Use SCSS and BEM naming
- Import shared styles from src/scss

## Internationalization

### Current i18n Implementation

- i18n setup is in src/i18n.ts
- Supported languages: zh and en
- default language: zh
- language detection priority:
  1) URL query (lang)
  2) localStorage (app_language)
  3) browser language
  4) zh

### Locale Sources

- Common/global translations:
  - src/locales/common/en.ts
  - src/locales/common/zh.ts
- Page translations (auto discovered):
  - src/pages/**/locales/en.ts
  - src/pages/**/locales/zh.ts

### Auto Discovery Rule

Page locale namespace is derived from path:

- src/pages/Form/locales/en.ts -> pages.form
- src/pages/Table/locales/zh.ts -> pages.table
- src/pages/Order/Detail/locales/en.ts -> pages.order.detail

No manual import is needed in src/locales/en.ts or src/locales/zh.ts for page locales.
No manual namespace registration is needed in src/locales/index.ts for page locales.

### Usage Patterns

Recommended:

```tsx
const { t } = useTranslation('pages.table');
t('columns.name');
```

Also supported:

```tsx
t('pages.table:columns.name');
```

### Missing Locale File Behavior

- If both en.ts and zh.ts are missing for a page namespace, page keys are missing
- If one language file is missing, i18next falls back to fallbackLng (zh)
- If key is missing in both current language and fallback language, key text is rendered

Recommendation:

- Keep en.ts and zh.ts keys aligned for every page locale module

### Troubleshooting: Menu Switches Language But Page Text Does Not

Check these items in order:

1. locale files are in exact path pattern: src/pages/<Page>/locales/en.ts and zh.ts
2. component namespace matches file path namespace (for example pages.table)
3. keys exist in both en.ts and zh.ts
4. app is using i18n.t/useTranslation from react-i18next correctly

## State Management

- Global state pattern uses @derbysoft/zustand-kit
- Example hook: src/global/useUserInfo.ts
- Use local hooks for page-level state in src/hooks

## Path Aliases

From tsconfig.json:

- ~/* -> src/*
- scss/* -> src/scss/*
- components/* -> src/components/*

## Contributing

Issues and Pull Requests are welcome.

Recommended commit types:

- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore

## License

ISC

## Author

leon.wang
