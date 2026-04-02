import React, { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router';
import { hasPermission } from './Menus.helper';
import allMenuRoutes from '~/config.route';
import useUserInfo from '../global/useUserInfo';

interface RouteGuardProps {
  children: ReactNode;
  userPermissions?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [userInfo] = useUserInfo();
  const { operations = [] } = userInfo;

  return !hasPermission(
    operations,
    allMenuRoutes.find((item) => item.route === pathname)?.permissions,
  ) ? (
    <Navigate to="/no-permission" replace />
  ) : (
    children
  );
};

export default RouteGuard;
