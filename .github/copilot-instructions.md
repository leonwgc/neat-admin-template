# Neat Admin - Copilot Instructions

## Project Overview

This is an enterprise administration dashboard built with React 18, TypeScript, and Neat Design.
Routes are driven by menu configuration, with support for internationalization, permission control, page state in Session Storage, and responsive layouts.

## Technology Stack

- React 18.3.1 + TypeScript
- `@derbysoft/neat-design` and `@derbysoft/neat-design-icons`
- `ahooks`, including `useRequest`
- `zustand` + `@derbysoft/zustand-kit`
- React Router 7
- i18next + react-i18next
- Axios 1.11
- SCSS、BEM、classnames

## Directory Conventions

```text
src/
├── components/       # Reusable components
├── pages/            # Business pages and page-level components
├── layouts/          # Application layouts, menus, and route guards
├── hooks/            # Hooks such as usePageState, useTable, and useReq
├── global/           # Global state and APIs
├── locales/          # Shared internationalization resources
├── scss/             # Global styles, variables, and mixins
├── req/              # Axios instance and request configuration
├── utils/             # Utilities such as route generation
├── config.menu.tsx   # Menu and route paths
├── config.operations.ts # Permission operations
└── RouteConfig.tsx   # Route rendering entry point
```

When a page or reusable component becomes complex, split it into separate files in the same directory. For example, page modal and drawer content should live in independent `.tsx` files, while the page file should contain only composition and business orchestration.

## Routing and Menus

This project does not use file-system routing. Adding a page requires all of the following:

1. Create the page component under `src/pages/<Module>/`.
2. Add the menu item, `route`, and permission configuration in `src/config.menu.tsx`.
3. Add the path-to-component mapping to `routeComponentMap` in `src/utils/routeGenerator.tsx`.
4. If the page needs translations, add `locales/en.ts` and `locales/zh.ts` under the page directory.
5. Add menu labels to `src/locales/common/en.ts` and `src/locales/common/zh.ts`.

Use `lazyLoad('pages/Module')` or `lazyLoad('pages/Module/index')` for lazy-loaded route components. Dynamic parameter routes must also be declared explicitly in `routeComponentMap`, for example `/app/ar-statements/:statementId`.

Menu item `key` values must be unique. Use a getter to call `i18n.t()` for `label` so language switching works. `permissions` controls access, and `hidden: true` hides the menu item while keeping the route.

## TypeScript and React

- Use function components and Hooks.
- Define explicit types for component props, API responses, and business data; avoid `any`.
- Use `import type` for type-only imports.
- Use optional chaining and nullish coalescing for optional data.
- Preserve project file header comments: `@file` and `@author`.
- Use default exports for components. When a component is reused in multiple locations, provide named exports through an `index.ts` in the same directory.
- Async error values are usually `unknown`; narrow them with `instanceof Error` or a type guard before accessing properties.

Import order: React core, third-party dependencies, internal project modules, then style files. Prefer aliases for internal project paths:

```ts
import Component from '~/components/Component';
import { mixin } from 'scss/mixins';
```

## UI and Styling

- Prefer `@derbysoft/neat-design` for page interactions and `@derbysoft/neat-design-icons` for icons.
- Use native form elements only when the component library cannot meet the requirement.
- Use SCSS and BEM naming; place style files in the same directory as the component or page.
- Shared variables and mixins come from `src/scss/common.scss` and `src/scss/mixins.scss`.
- Use `classNames` for conditional classes.
- Interactive buttons, loading states, error states, and empty states should all have clear visual feedback.
- Do not add complex decorative elements or new global styles unrelated to the existing design just for demonstration purposes.

## Page State and List Pages

Use `useTable` for all paginated lists. Use `usePageState` for page filters, pagination, and persisted state. This Hook uses `@derbysoft/zustand-kit` internally to persist state to `sessionStorage` and exports the alias `usePageFilters`.

Page state must include `current` and `pageSize`:

```ts
interface PageState {
  current: string | number;
  pageSize: string | number;
}
```

Recommended workflow:

1. Define page state and form value types.
2. Convert persisted state to form values with `stateToFormValues`, providing defaults.
3. Save filter values with `formValuesToState`.
4. Convert form fields to API fields with `formValuesToRequest`.
5. Pass `pageState` to `useTable` to reuse pagination parameters and pre-request state synchronization.
6. Call `pageState.onValuesChange` from the form's `onValuesChange`; call `submit()` when the list must refresh immediately.

`usePageState`'s `onBeforeRequest` writes the API's `pageNum` and `pageSize` back to state:

```ts
current: String((Number(data.pageNum) || 0) + 1),
pageSize: String(data.pageSize ?? 10),
```

Do not maintain duplicate, coupled React state, form state, and persisted page state in the same list page. Do not write UI state such as modal visibility or temporary selections into page filter state.

## Request Layer

- Use the Axios instance exported from `src/req`; do not create another Axios instance in a component.
- Prefer `src/hooks/useReq.tsx` for general business requests. It is based on ahooks `useRequest` and standardizes success unwrapping, failure callbacks, loading, and toast/notification handling.
- `useReq`'s `onSuccess` receives `response.data.data`, not the complete AxiosResponse.
- The `onFailed` parameter of `useReq` is `unknown`; narrow it before accessing error properties.
- Paginated lists must use `useTable`; do not duplicate pagination conversion and list response adaptation in a page.
- Example pages or special cases may use ahooks `useRequest` directly, but types and error handling must remain explicit.

Request functions must retain the AxiosPromise return structure. If a mock fallback is used, it must return an AxiosResponse-compatible object rather than a custom `{ code, data }` object.

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

Use `FileInputTrigger` for file uploads. Validate type and size first, then call the API with `FormData`. Use `URL.createObjectURL` for temporary preview URLs and release them at the appropriate time when they have a long lifecycle.

## Internationalization

Place page translations under the page directory's `locales/`, using `en.ts` or `zh.ts` as filenames. Page locales are discovered automatically by `src/locales/pageLocales.ts`; do not import them manually into the root language files.

Use the following pattern in components:

```tsx
const { t } = useTranslation('pages.table');
return <h1>{t('title')}</h1>;
```

Place menu labels in `src/locales/common/en.ts` and `src/locales/common/zh.ts`; use `i18n.t('menu.key')` for the `label` in menu configuration.

## Permissions

1. Define permission constants in `src/config.operations.ts`.
2. Configure `permissions` on menu items in `src/config.menu.tsx`.
3. Check operation permissions in components with `useUserInfo().hasPermission()`.

Do not only hide buttons while ignoring route permission configuration; page access control is enforced jointly by the menu, route generation, and `RouteGuard`.

## Validation and Commands

```bash
npm start          # Start the development server
npm run lint       # Run ESLint on src/
npm run build:qa   # QA build
npm run build:uat  # UAT build
npm run build:prod # Production build
```

After modifying code, run the smallest relevant type check or ESLint check first. For changes involving shared Hooks, routing, the request layer, or list state, also run the full `npm run lint` and the corresponding build.

## Editing Principles

- Read the target file and adjacent implementations before making the smallest necessary change.
- Follow existing Hooks, component libraries, and directory structure; do not reinvent existing capabilities.
- Do not modify unrelated code or revert changes already made by the user.
- Do not add copyright or license headers.
- Add brief comments only when genuinely needed for complex logic; avoid comments that provide no useful information.

---

**Last updated**: 2026-08-20
**Maintainer**: leon.wang
