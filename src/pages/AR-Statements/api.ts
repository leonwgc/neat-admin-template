import request from '~/req';
import { listData, listDetailData } from './mock';

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

export const getStateDetailList = (data) =>
  request.post('/api/ar-statements/state-detail-list', data).catch(() => {
    return Promise.resolve({
      code: 200,
      data: {
        result: 'success',
        data: listDetailData,
      },
    });
  });

export const uploadInvoiceImage = (invoiceId: string, file: File) => {
  const formData = new FormData();
  formData.append('invoiceId', invoiceId);
  formData.append('file', file);

  return request
    .post('/api/ar-statements/upload-invoice-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch(() => {
      return Promise.resolve({
        code: 200,
        data: {
          result: 'success',
          data: {
            imageUrl:
              'https://q5.itc.cn/images01/20250410/32df2886f4084249bb003171984b5443.jpeg',
          },
        },
      });
    });
};
