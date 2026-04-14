/**
 * @file src/global/useUserInfo.ts
 * @author leon.wang
 */

import { useMemo } from 'react';
import { useGlobalSelector } from '@derbysoft/zustand-kit';
import { USER_INFO_KEY, UserInfo } from './config';

const useUserInfo = () => {
  const userInfo = useGlobalSelector<UserInfo, UserInfo>(
    USER_INFO_KEY,
    (state) => state,
  );

  const userInfoReady = useMemo(() => {
    return userInfo.userId !== '';
  }, [userInfo]);

  const loading = !userInfoReady;

  return { userInfo, loading, userInfoReady } as const;
};

export default useUserInfo;
