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
