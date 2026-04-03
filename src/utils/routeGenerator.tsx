/**
 * @file src/utils/routeGenerator.tsx
 * @author leon.wang
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react';
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
  const Component = componentMap[path];
  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`No component found for route: ${path}`);
    }
    return null;
  }
  return <Component />;
};

/**
 * Map route paths to their corresponding components
 * This is the central mapping that connects routes to page components
 */
export const routeComponentMap: RouteComponentMap = {
  // Forms
  '/app/forms': lazyLoad('pages/Form/ResponsiveForm'),

  // Component Examples
  '/app/components/image-upload': lazyLoad(
    'pages/Components/ImageUploadExample',
  ),
  '/app/components/image-cropper': lazyLoad(
    'pages/Components/ImageCropperExample',
  ),
};
