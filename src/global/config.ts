// global UserInfo
import type { Operation } from '~/config.operations';

export const USER_INFO_KEY = 'UserInfo';

export interface UserInfo {
  userId: string;
  username: string;
  nickname: string;
  operations: Operation[];
}

export const defaultUserInfo: UserInfo = {
  userId: '',
  username: '',
  nickname: '',
  operations: [],
};
