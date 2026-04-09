import { useGlobalState } from '@derbysoft/zustand-kit';
import operations from '../config.operations';

type UserInfo = {
  userId: string;
  username: string;
  nickname: string;
  operations: string[];
};

const useUserInfo = () => {
  // TODO: In a real application, user info would be fetched from an API or derived from authentication state
  return useGlobalState<UserInfo | null>('UserInfo', {
    userId: '1',
    username: 'Leon',
    nickname: 'LW',
    operations: [
      operations.formRead,
      operations.imageUploadRead,
      operations.imageCropRead,
    ],
  });
};

export default useUserInfo;
