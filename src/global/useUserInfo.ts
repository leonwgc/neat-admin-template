/**
 * @file src/global/useUserInfo.ts
 * @author leon.wang
 */

import { useMemo } from 'react';
import { useGlobalSelector } from '@derbysoft/zustand-kit';

export interface UserInfo {
  userId: string;
  username: string;
  nickname: string;
  operations: string[];
}

export const defaultUserInfo: UserInfo = {
  userId: '',
  username: '',
  nickname: '',
  operations: [],
};

const useUserInfo = () => {
  const userInfo = useGlobalSelector<UserInfo, UserInfo>(
    'UserInfo',
    (state) => state,
  );

  const userInfoReady = useMemo(() => {
    return userInfo.userId !== '';
  }, [userInfo]);

  const loading = !userInfoReady;

  return { userInfo, loading, userInfoReady } as const;
};

export default useUserInfo;
