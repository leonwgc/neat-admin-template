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
  [path: string]: LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
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
  menus: MenuItem[]
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
  importPath: string
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
  componentMap: RouteComponentMap
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
  // Dashboard
  '/app/dashboard': lazyLoad('pages/Dashboard/Dashboard'),

  // Flow Designer
  '/app/flow-designer': lazyLoad('pages/FlowDesigner'),

  // PDF Viewer
  '/app/pdf-viewer': lazyLoad('pages/PdfViewer'),

  // System Management
  '/app/system/users': lazyLoad('pages/User/Users'),
  '/app/system/roles': lazyLoad('pages/System/RoleManagement'),
  '/app/system/menus': lazyLoad('pages/System/MenuManagement'),
  '/app/system/permissions': lazyLoad('pages/System/PermissionManagement'),
  '/app/system/security': lazyLoad('pages/Security/SecuritySettings'),
  '/app/system/request-control': lazyLoad('pages/Security/RequestControlDemo'),

  // JS Features
  '/app/js-feature/intl-number-format': lazyLoad('pages/Js/IntlNumberFormatExample'),
  '/app/js-feature/element-height': lazyLoad('pages/Js/ElementHeightDemo'),
  '/app/js-feature/weakmap': lazyLoad('pages/Js/WeakMapDemo'),
  '/app/js-feature/proxy': lazyLoad('pages/Js/ProxyDemo'),
  '/app/js-feature/typescript-advanced-types': lazyLoad('pages/Js/TypeScriptAdvancedTypes'),
  '/app/js-feature/broadcast-channel': lazyLoad('pages/Js/BroadcastChannelDemo'),
  '/app/performance': lazyLoad('pages/Performance'),

  // CSS Features
  '/app/css': lazyLoad('pages/Form/CssFeature'),
  '/app/css/box-model': lazyLoad('pages/Css/CssBoxModelDemo'),
  '/app/css/render-optimization': lazyLoad('pages/Css/CssRenderOptimization'),
  '/app/css/grid': lazyLoad('pages/Css/CssGridExample'),
  '/app/css/flexbox': lazyLoad('pages/Css/CssFlexExample'),
  '/app/css/container-queries': lazyLoad('pages/Css/CssContainerQueriesExample'),
  '/app/css/blend-modes': lazyLoad('pages/Css/CssBlendModesExample'),
  '/app/css/animation': lazyLoad('pages/Css/CssAnimationExample'),
  '/app/css/sticky-table': lazyLoad('pages/Css/StickyTableDemo'),
  '/app/css/sticky-examples': lazyLoad('pages/Css/CssStickyExamples'),
  '/app/css/scss-mixins': lazyLoad('pages/Css/ScssMixinsGuide'),

  // User Management
  '/app/users': lazyLoad('pages/User/Users'),
  '/app/users/add': lazyLoad('pages/User/Add'),
  '/app/users/table': lazyLoad('pages/User/ExpandTable'),
  '/app/users/edit': lazyLoad('pages/User/Edit'),

  // Forms
  '/app/forms': lazyLoad('pages/Form/ResponsiveForm'),
  '/app/forms/dynamic-list': lazyLoad('pages/Form/DynamicList'),
  '/app/forms/validation': lazyLoad('pages/Form/FormValidation'),
  '/app/forms/virtual-list': lazyLoad('pages/Form/VirtualLists'),

  '/app/form/add-phone-number': lazyLoad('pages/Form/AddPhoneNumber'),

  // React Hooks Examples
  '/app/hooks/use-transition': lazyLoad('pages/Hooks/UseTransition'),
  '/app/hooks/use-suspense': lazyLoad('pages/Hooks/UseSuspense'),
  '/app/hooks/use-ahooks-countdown': lazyLoad('pages/Hooks/UseAHooksCountdown'),
  '/app/hooks/verification-code-countdown': lazyLoad('pages/Hooks/VerificationCodeCountdown'),
  '/app/hooks/use-responsive': lazyLoad('pages/Hooks/UseResponsiveExample'),
  '/app/hooks/use-ds-table': lazyLoad('pages/Hooks/UseDsTableExample'),
  '/app/hooks/use-lock-async-func': lazyLoad('pages/Hooks/UseLockAsyncFunc'),
  '/app/hooks/use-global-state': lazyLoad('pages/Hooks/ZustandKitDemo'),
  '/app/hooks/use-form-field': lazyLoad('pages/Hooks/UseFormFieldHook'),
  '/app/hooks/react-hook-form': lazyLoad('pages/Hooks/ReactHookForm'),

  // JavaScript/Library Examples
  '/app/js/sortable-demo': lazyLoad('pages/Js/SortableDemo'),


  // Component Examples
  '/app/components/dot-status': lazyLoad('pages/Components/DotStatusExample'),
  '/app/components/verification-code': lazyLoad('pages/Components/VerificationCodeExample'),
  '/app/components/contact-info': lazyLoad('pages/Components/ContactInfoExample'),
  '/app/components/user-contact-card': lazyLoad('pages/Components/UserContactCardExample'),
  '/app/components/email-success-modal': lazyLoad('pages/Components/EmailSuccessModalExample'),
  '/app/components/verification-code-page': lazyLoad(
    'pages/Components/VerificationCodePageExample'
  ),
  '/app/components/masonry': lazyLoad('pages/Components/MasonryExample'),
  '/app/components/chatbot': lazyLoad('pages/Components/ChatBot'),
  '/app/components/image-upload': lazyLoad('pages/Components/ImageUploadExample'),
  '/app/components/image-cropper': lazyLoad('pages/Components/ImageCropperExample'),
  '/app/components/rich-text-editor': lazyLoad('pages/Components/RichTextEditorExample'),
  '/app/components/number-roll': lazyLoad('pages/Components/NumberRollExample'),
  '/app/components/fade-in': lazyLoad('pages/Components/FadeInExample'),
  '/app/components/text-ellipsis': lazyLoad('pages/Components/TextEllipsisDemo'),
  '/app/components/animated': lazyLoad('pages/Components/AnimatedDemo'),
  '/app/components/css-filter': lazyLoad('pages/Components/CssFilterExample'),
  '/app/components/error-boundary': lazyLoad('pages/Components/ErrorBoundaryDemo'),
  '/app/components/error-test': lazyLoad('pages/Components/ErrorTest'),
  '/app/components/error-monitor': lazyLoad('pages/Components/ErrorMonitorDemo'),

  // libs
  '/app/hooks/zustand-demo': lazyLoad('pages/Hooks/ZustandDemo'),

  // Games
  '/app/games/tetris-3d': lazyLoad('pages/Games/Tetris3D'),
  '/app/games/flappy-birds-3d': lazyLoad('pages/Games/FlappyBirds3D'),
  '/app/games/snake-3d': lazyLoad('pages/Games/Snake3D'),
  '/app/games/match-3': lazyLoad('pages/Games/Match3'),

  // Hotel Management
  '/app/hotel/room-calendar': lazyLoad('pages/Hotel/RoomCalendar'),
  '/app/hotel/phone-management': lazyLoad('pages/Hotel/AddPhoneNumber'),
  '/app/hotel/login-page': lazyLoad('pages/Hotel/LoginPage'),

  // AI Assistant
  '/app/ai/settings': lazyLoad('pages/AI/AISettings'),
};
