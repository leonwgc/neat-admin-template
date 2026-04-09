import dayjs from 'dayjs';

export const renderTableDate = (date, dateFormat = 'YYYY-MM-DD HH:mm') => {
  return date ? dayjs(date).format(dateFormat) : '--';
};

export const renderTableValue = (value) => {
  return value || '--';
};
