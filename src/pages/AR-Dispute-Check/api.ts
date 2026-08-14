import request from '~/req';
import { listData, listDetailData } from './mock';

export const getDisputeList = (data) =>
  request.post('/api/ar-statements/dispute-list', data).catch(() => {
    return Promise.resolve({
      code: 200,
      data: {
        result: 'success',
        data: listData,
      },
    });
  });
