import request from '~/req';
import { listData } from './mock';

export const getStateList = (data) =>
  request.post('/api/ar-statements/state-list', data).catch(() => {
    return Promise.resolve({
      code: 200,
      data: {
        result: 'success',
        data: listData,
      },
    });
  });
