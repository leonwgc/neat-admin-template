import { data } from './mock';

export const getDataList = async ({ current, pageSize }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: data.totals,
        list: data.records.slice((current - 1) * pageSize, current * pageSize),
      });
    }, 500);
  });
};
