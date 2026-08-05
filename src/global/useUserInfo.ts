/**
 * @file src/global/useUserInfo.ts
 * @author leon.wang
 */

import { useGlobalState } from '@derbysoft/zustand-kit';
import { USER_INFO_KEY } from './config';
import useDsRequest from '../hooks/useDsRequest';
import req from '../req';
import createFetchOnce from '../utils/createFetchOnce';
import { useMount } from 'ahooks';

const fetchUserInfoOnce = createFetchOnce(() => req.get('/auth/userinfo'));

const useUserInfo = () => {
  const [userInfo, setGlobalUserInfo] = useGlobalState<UserInfo>(
    USER_INFO_KEY,
    {} as UserInfo,
  );

  const { loading, refresh, run } = useDsRequest(
    () => req.get('/auth/userinfo'),
    {
      manual: true,
      onSuccess: (data) => {
        setGlobalUserInfo(data as UserInfo);
      },
    },
  );

  const hasPermission = (permissions?: string[] | string) => {
    if (!permissions || (Array.isArray(permissions) && !permissions.length)) {
      return true;
    }

    const requiredPermissions = Array.isArray(permissions)
      ? permissions
      : [permissions];

    return requiredPermissions.every((permission) =>
      userInfo.operations?.includes?.(permission),
    );
  };

  const setUserInfo = (nextUserInfo: UserInfo) => {
    setGlobalUserInfo(nextUserInfo);
  };

  const resetUserInfo = () => {
    setGlobalUserInfo({} as UserInfo);
  };

  useMount(() => {
    if (!loading && !userInfo.userId) {
      run();
    }
  });

  return {
    userInfo,
    loading,
    userInfoReady: !loading,
    hasPermission,
    setUserInfo,
    resetUserInfo,
    refreshUserInfo: refresh,
  } as const;
};

export default useUserInfo;
