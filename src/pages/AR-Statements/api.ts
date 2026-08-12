import request from '~/req';
import { listData } from './mock';

export const getStateList = () =>
  request.get('/api/ar-statements/state-list').catch(() => {
    return Promise.resolve({
      code: 200,
      data: {
        result: 'success',
        data: listData,
      },
    });
  });
