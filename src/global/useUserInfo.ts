/**
 * @file src/global/useUserInfo.ts
 * @author leon.wang
 */

import { useMemo } from 'react';
import { useGlobalSelector, useGlobalState } from '@derbysoft/zustand-kit';
import { USER_INFO_KEY, UserInfo, defaultUserInfo } from './config';

const useUserInfo = () => {
  const userInfo = useGlobalSelector<UserInfo, UserInfo>(
    USER_INFO_KEY,
    (state) => state,
  );
  const [, setGlobalUserInfo] = useGlobalState<UserInfo>(
    USER_INFO_KEY,
    defaultUserInfo,
  );

  const userInfoReady = useMemo(() => {
    return userInfo.userId !== '';
  }, [userInfo]);

  const hasPermission = (permissions?: string[] | string) => {
    if (!permissions || (Array.isArray(permissions) && !permissions.length)) {
      return true;
    }

    const requiredPermissions = Array.isArray(permissions)
      ? permissions
      : [permissions];

    return requiredPermissions.every((permission) =>
      userInfo.operations.includes(permission),
    );
  };

  const setUserInfo = (nextUserInfo: UserInfo) => {
    setGlobalUserInfo(nextUserInfo);
  };

  const resetUserInfo = () => {
    setGlobalUserInfo(defaultUserInfo);
  };

  const loading = !userInfoReady;

  return {
    userInfo,
    loading,
    userInfoReady,
    hasPermission,
    setUserInfo,
    resetUserInfo,
  } as const;
};

export default useUserInfo;
