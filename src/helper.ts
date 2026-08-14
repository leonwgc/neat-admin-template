import dayjs from 'dayjs';

export const onSuccessHandler =
  (onSuccess?: RequestHandler, onFailed?: RequestHandler) =>
  (data, params?) => {
    if (data?.data?.result === 'success') {
      onSuccess?.(data?.data?.data, params);
    } else {
      onFailed?.(data?.data?.error, params, data?.data);
    }
  };

export const checkFileType = (file: File, accept: string) => {
  const acceptedTypes = accept.split(',').map((type) => type.trim());
  const fileType = file.type;
  return acceptedTypes.includes(fileType);
};

export const checkFileSize = (file: File, maxSize: number) => {
  const fileSizeInMB = file.size / (1024 * 1024);
  return fileSizeInMB <= maxSize;
};

// only same origin url can be downloaded, otherwise it will be blocked by CORS policy
export const downloadFile = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const dateRangeFormItemProps = {
  normalize: (value) => {
    if (Array.isArray(value) && value.length === 2) {
      return value.map((v) => dayjs(v).format('YYYY-MM-DD'));
    }
    return value;
  },
  getValueProps: (value) => {
    if (Array.isArray(value) && value.length === 2) {
      return {
        value: value.map((v) => dayjs(v)),
      };
    }
    return { value };
  },
};
