import React, { ReactNode, useMemo } from 'react';
import { useLocation, Navigate } from 'react-router';
import { hasPermission } from './Menus.helper';
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
  const [userInfo] = useUserInfo();
  const { operations = [] } = userInfo;

  const menuPermissions = useMemo(() => {
    const routes = allMenuRoutes as MenuRouteRecord[];
    const menu = routes.find((item) => item.route === pathname);
    return menu?.permissions || [];
  }, [pathname]);

  return !hasPermission(operations, menuPermissions) ? (
    <Navigate to="/no-permission" replace />
  ) : (
    children
  );
};

export default RouteGuard;
