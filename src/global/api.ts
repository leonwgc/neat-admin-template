import req from '~/req';
import { preventDuplicateRequestHeader } from '../req/utils';

export const getUserInfo = () => {
  return req.get('/auth/userinfo', {
    headers: { [preventDuplicateRequestHeader]: 'true' },
  });
};
