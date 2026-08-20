# AGENTS.md

## Project Overview

React 18 + TypeScript admin project using Neat Design. Not file-system routing — routes are menu-driven.

## Key Commands

```bash
npm start          # Dev server on localhost:3000
npm run lint       # ESLint on src/
npm run build:qa   # QA build
npm run build:uat  # UAT build
npm run build:prod # Production build
```

## Routing System (Critical)

Routes are **menu-driven**, not file-system auto-routing:

1. `src/config.menu.tsx` — defines menu tree + route paths
2. `src/utils/routeGenerator.tsx` — extracts routes from menu, maps to components via `routeComponentMap`
3. `src/RouteConfig.tsx` — renders routes dynamically

**Adding a new page requires ALL of:**
1. Create page component under `src/pages/<Module>/`
2. Add page locales: `src/pages/<Module>/locales/en.ts` + `zh.ts`
3. Add menu label keys in `src/locales/common/en.ts` + `zh.ts`
4. Add menu item in `src/config.menu.tsx` with `route` + optional `permissions`
5. Add route-component mapping in `src/utils/routeGenerator.tsx`

## i18n Auto-Discovery

Page locales are **auto-discovered** from `src/pages/**/locales/`. Namespace derived from path:
- `src/pages/Form/locales/en.ts` → `pages.form`
- `src/pages/Table/locales/zh.ts` → `pages.table`

**No manual import needed** in `src/locales/en.ts` or `src/locales/zh.ts` for page locales.

Use: `const { t } = useTranslation('pages.table');`

## Path Aliases

- `~/*` → `src/*`
- `scss/*` → `src/scss/*`
- `components/*` → `src/components/*`

## Styling

- SCSS + BEM naming
- Use project mixins from `src/scss/mixins.scss`
- Use `classNames` library for conditional classes

## State Management

- zustand + @derbysoft/zustand-kit for global state
- Example: `src/global/useUserInfo.ts`
- Page-level state: custom hooks in `src/hooks/`

## List Pages

Use `useTable` hook (wraps ahooks `useAntdTable`) for all paginated tables. It auto-manages:
- Pagination params (`pageNum`/`pageSize`)
- Form filter binding
- Sort conversion
- Response data transformation

See `src/hooks/useTable.md` for API details.

## Permission Model

- Operations defined in `src/config.operations.ts`
- Menu items use `permissions: [operations.xxxRead]`
- Check in components: `const { hasPermission } = useUserInfo();`

## Code Style

- ESLint 9 with Prettier
- Single quotes, semicolons required
- `import type` for type-only imports
- Function components only (no class components)
- Use Neat Design components (`@derbysoft/neat-design`) for UI

## Reference Files

- `src/config.menu.tsx` — menu/route config
- `src/utils/routeGenerator.tsx` — route extraction + component mapping
- `src/hooks/useTable.tsx` — list page hook
- `src/global/useUserInfo.ts` — user state + permissions
- `.github/copilot-instructions.md` — detailed conventions (Chinese)
