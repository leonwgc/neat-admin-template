/**
 * @file src/layouts/RouteGuard.tsx
 * @author leon.wang
 */

import React, { ReactNode, useMemo } from 'react';
import { useLocation, Navigate } from 'react-router';
import allMenuRoutes from '~/config.route';
import useUserInfo from '../global/useUserInfo';

interface RouteGuardProps {
  children: ReactNode;
  userPermissions?: string[];
}

interface MenuRouteRecord {
  route?: string;
  permissions?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { userInfoReady, hasPermission } = useUserInfo();

  const menuPermissions = useMemo(() => {
    const routes = allMenuRoutes as MenuRouteRecord[];
    const menu = routes.find((item) => item.route === pathname);
    return menu?.permissions || [];
  }, [pathname]);

  return userInfoReady && !hasPermission(menuPermissions) ? (
    <Navigate to="/no-permission" replace />
  ) : (
    children
  );
};

export default RouteGuard;
