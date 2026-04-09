import { data } from './mock';

export const getDataList = async ({ current, pageSize }) => {
  return {
    total: data.totals,
    list: data.records.slice((current - 1) * pageSize, current * pageSize),
  };
};
