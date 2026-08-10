import req from '~/req';
import { preventDuplicateRequestHeader } from '~/config';

export const getUserInfo = () => {
  return req.get('/auth/userinfo', {
    headers: preventDuplicateRequestHeader,
  });
};
