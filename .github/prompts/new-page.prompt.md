---
agent: agent
description: Scaffold a complete new page for this Neat Admin workspace, wiring menu config, routes, locales, API/mock data, and optional permissions in one pass.
---

# New Page Scaffolder

Generate a complete, working page for this repository at the workspace root. This app uses menu-driven routing, so a new page is not usable until every required wiring step below is done. Do all of them; a partial scaffold is a broken page.

## Inputs — ask the user if not provided

Collect these before generating anything. Infer sensible defaults, then confirm:

1. Module folder name (`PascalCase` or `Kebab-Case`, for example `AR-Invoices` or `Customer-Accounts`). This becomes `src/pages/<Module>/`.
2. Page type:
   - `list` — paginated list page using `usePageState` + `useTable`
   - `detail` — detail page accessed by route param
   - `both` — list page plus detail page
3. Route base path — must start with `/app/` and use kebab-case, such as `/app/ar-invoices`. For a detail path, append a param like `/app/ar-invoices/:invoiceId`.
4. Menu label — the sidebar text shown to users.
5. Menu group — which existing group in `src/config.menu.tsx` to place under, or a new group if needed.
6. Permissions (optional) — one or more operation keys from `src/config.operations.ts`. If a needed operation does not exist, add it there too.

## Before writing — read these to match the current repo

- `src/config.menu.tsx` — menu tree, route definitions, `hidden`, and `permissions`
- `src/utils/routeGenerator.tsx` — manual `routeComponentMap` for every route path
- `src/config.operations.ts` — operation constants and permission model
- `src/locales/pageLocales.ts` — auto-discovery and namespace derivation
- Example pages of the same type: `src/pages/Table/` or `src/pages/AR-Statements/`
- `AGENTS.md` and `.github/copilot-instructions.md` for project rules

Important: this repository is not under a `frontend/` folder. Use the root workspace paths directly.

## Namespace derivation (i18n) — get this exactly right

Page locales are auto-loaded from `src/pages/<Module>/locales/{en,zh}.ts`. The namespace is:

```
pages.<segments joined by ".">
```

where each folder segment has only its first character lowercased while keeping the rest of the segment intact. This is derived by `toNamespacePath` in `src/locales/pageLocales.ts`.

Examples:

- `src/pages/Table/locales/en.ts` → `pages.table`
- `src/pages/AR-Statements/locales/en.ts` → `pages.aR-Statements`
- `src/pages/AR-Statements/Detail/locales/en.ts` → `pages.aR-Statements.detail`

Do not invent a camelCase namespace or a custom naming style; follow the actual namespace algorithm from the project.

## Steps — do ALL of them

### 1. Page component(s)

Create under `src/pages/<Module>/`:

- List page: `index.tsx` and `index.scss`
- Detail page: `Detail.tsx` and `Detail.scss` when needed

Requirements:

- Use function components only.
- Add the file header comment pattern used in this repo, for example `/** @file src/pages/<Module>/index.tsx */`.
- Use `@derbysoft/neat-design` for UI and `@derbysoft/neat-design-icons` for icons.
- For list pages, use `usePageState` from `~/hooks/usePageState` and `useTable` from `~/hooks/useTable` for filter and pagination state.
- Render a `TopBar` plus a filter form and table when applicable.
- For detail pages, read the route param with `useParams()` and navigate with `useNavigate()`.
- Wrap visible text in `t('<namespace>.<key>')` or the page's actual translation pattern. Do not hard-code UI text.
- Use SCSS with the existing BEM style and project mixins.

### 2. API layer — `src/pages/<Module>/api.ts`

Follow the current API pattern already used in this repo:

- import `request` from `~/req`
- call `request.post(...)` or `request.get(...)`
- use a `.catch(() => Promise.resolve({...}))` fallback to mock data when the backend is unavailable
- keep the response shape compatible with the existing `useTable` / `useReq` flow, for example `{ code, data: { result: 'success', data } }`

This project expects the request layer to return responses shaped like the existing API examples, not a custom object format.

### 3. Mock data — `src/pages/<Module>/mock.ts`

Export mock list/detail data that the API fallback uses when the network request fails.

### 4. Locales — `src/pages/<Module>/locales/en.ts` + `zh.ts`

- Export `default { ... }` in both files.
- Keep keys aligned between the language files.
- English is the canonical source; provide accurate Chinese translations.
- Include every key used by the component.

### 5. Menu entry — `src/config.menu.tsx`

Add a menu item under the chosen group with:

- a unique `key`
- a `get label()` getter when following current menu conventions
- a `route`
- `permissions` if permissions are required
- `hidden: true` for detail-only menu entries that should not appear in the sidebar

For a detail page, add both:

1. the visible list route, and
2. the hidden route with the param, for example `/app/ar-statements/:statementId`

### 6. Route → component mapping — `src/utils/routeGenerator.tsx`

Add entries to `routeComponentMap` for every route path, including hidden detail routes. Use `lazyLoad('pages/<Module>')` and `lazyLoad('pages/<Module>/Detail')` as needed.

Important details:

- `lazyLoad` prefixes `../` internally, so the import path is relative to `src/`
- the map is manually maintained and must match the menu routes exactly
- if a route is missing from this map, the page will render nothing

### 7. Permissions (only if requested) — `src/config.operations.ts`

If a required operation does not exist, add it to the `operations` object. After that, reference it in the menu item's `permissions`.

## After generating

1. Run `npm run lint` from the repo root and fix any issues in the files you created or changed.
2. Verify consistency:
   - every route in `src/config.menu.tsx` has a matching entry in `src/utils/routeGenerator.tsx`
   - every `t('...')` key exists in both `src/pages/<Module>/locales/en.ts` and `zh.ts`
   - the `lazyLoad` path matches the actual file location
3. Summarize which files were created or edited and the page URL to visit.

Use the current router mode in the project: `src/index.tsx` uses `BrowserRouter`, so the actual URL pattern is the browser route form, typically `http://localhost:3000/app/...` after `npm start`.

## Guardrails

- Only touch the files listed above; no incidental refactoring.
- Keep source identifiers, comments, and commit-facing text in English; only locale catalog values are translated.
- Do not add tests, abstractions, or dependencies unless the user asks.
- Do not reference `frontend/` in this repo. All paths must be relative to the current workspace root.
