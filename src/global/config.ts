// global UserInfo
export const USER_INFO_KEY = 'UserInfo';

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
