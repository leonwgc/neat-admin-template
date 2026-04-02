/**
 * @file src/RouteConfig.tsx
 * @author leon.wang
 */

import { Route, Routes, useNavigate } from 'react-router';
import App from './layouts/App';
import { lazy, Suspense } from 'react';
import Redirect from './components/Redirect';
import { ErrorBoundary } from './components/ErrorBoundary';
import { menus } from './config.menu';
import {
  extractRoutesFromMenus,
  routeComponentMap,
  getRouteElement,
} from './utils/routeGenerator';
import { defaultRoute } from './config';

const NoPermission = lazy(() => import('./pages/NoPermission/NoPermission'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Extract all routes from menu configuration
const menuRoutes = extractRoutesFromMenus(menus);

/**
 * RouteConfig
 *
 * This component automatically generates routes from menu configuration.
 * Routes are dynamically created based on config.menu.tsx, avoiding duplication.
 *
 * @returns {JSX.Element} The routes of the application.
 */
const RouteConfig = () => {
  const navigate = useNavigate();

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Redirect to={defaultRoute} />} />

        <Route
          path="no-permission"
          element={<App hasSider={false} hasContentHeader={false} />}
        >
          <Route index element={<NoPermission />} />
        </Route>

        <Route path="app" element={<App />}>
          {/* Auto-generated routes from menu configuration with page-level error boundaries */}
          {menuRoutes.map(({ path }) => {
            const element = getRouteElement(path, routeComponentMap);
            if (!element) return null;

            // Extract the relative path (remove /app prefix)
            const relativePath = path.replace(/^\/app\/?/, '');

            return (
              <Route
                key={path}
                path={relativePath}
                element={
                  <ErrorBoundary
                    errorTitle="页面加载失败"
                    errorSubtitle="该页面遇到了问题，您可以尝试重新加载或返回首页"
                    showHome
                    onGoHome={() => navigate('/app/css')}
                  >
                    {element}
                  </ErrorBoundary>
                }
              />
            );
          })}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
