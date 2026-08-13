/**
 * @file src/utils/routeGenerator.tsx
 * @author leon.wang
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react';
import { matchPath } from 'react-router';
import { MenuItem } from '~/config.menu';

/**
 * Route component mapping configuration
 */
export interface RouteComponentMap {
  [path: string]:
    | LazyExoticComponent<ComponentType<unknown>>
    | ComponentType<unknown>;
}

/**
 * Generated route configuration
 */
export interface GeneratedRoute {
  path: string;
  element: JSX.Element;
  permissions?: string[];
  children?: GeneratedRoute[];
}

/**
 * Extract all routes from menu items recursively
 *
 * @param menus - Menu items configuration
 * @returns Array of route paths with permissions
 */
export const extractRoutesFromMenus = (
  menus: MenuItem[],
): Array<{ path: string; permissions: string[] }> => {
  const routes: Array<{ path: string; permissions: string[] }> = [];

  const traverse = (items: MenuItem[]) => {
    items.forEach((item) => {
      if (item.route) {
        routes.push({
          path: item.route,
          permissions: item.permissions || [],
        });
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };

  traverse(menus);
  return routes;
};

/**
 * Lazy load page component
 *
 * @param importPath - Dynamic import path
 * @returns Lazy loaded component
 */
export const lazyLoad = (
  importPath: string,
): LazyExoticComponent<ComponentType<unknown>> => {
  return lazy(() => import(`../${importPath}`));
};

/**
 * Generate route element from path and component map
 *
 * @param path - Route path
 * @param componentMap - Route component mapping
 * @returns Route element or null
 */
export const getRouteElement = (
  path: string,
  componentMap: RouteComponentMap,
): JSX.Element | null => {
  const ExactComponent = componentMap[path];
  if (ExactComponent) {
    return <ExactComponent />;
  }

  const dynamicRoute = Object.entries(componentMap).find(([routePath]) =>
    matchPath({ path: routePath, end: true }, path),
  );

  if (!dynamicRoute) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`No component found for route: ${path}`);
    }
    return null;
  }

  const DynamicComponent = componentMap[dynamicRoute[0]];
  return <DynamicComponent />;
};

/**
 * Map route paths to their corresponding components
 * This is the central mapping that connects routes to page components
 */
export const routeComponentMap: RouteComponentMap = {
  // Forms
  '/app/forms': lazyLoad('pages/Form/ResponsiveForm'),
  '/app/forms/table': lazyLoad('pages/Table'),

  // Customer AR
  '/app/ar-statements': lazyLoad('pages/AR-Statements'),
  '/app/ar-statements/:statementId': lazyLoad(
    'pages/AR-Statements/StatementDetail',
  ),

  // Component Examples
  '/app/components/image-upload': lazyLoad(
    'pages/Components/ImageUploadExample',
  ),
  '/app/components/image-cropper': lazyLoad(
    'pages/Components/ImageCropperExample',
  ),
  '/app/components/select-ime-demo': lazyLoad('pages/Components/SelectIMEDemo'),

  // API Request Example
  '/app/api-request/api-demo': lazyLoad('pages/ApiDemo/index'),
  // Result pages
  '/app/result-page/no-permission': lazyLoad('pages/NotAccess'),
  '/app/result-page/mantainance': lazyLoad('pages/Maintenance/index'),
};
