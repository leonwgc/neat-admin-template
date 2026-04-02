import { useGlobalState } from '@derbysoft/zustand-kit';

type UserInfo = {
  userId: string;
  username: string;
  nickname: string;
  operations: string[];
};

const useUserInfo = () => {
  return useGlobalState<UserInfo | null>('UserInfo', {
    userId: '1',
    username: 'Admin',
    nickname: 'Flash',
    operations: [],
  });
};

export default useUserInfo;
