export const onSuccessHandler =
  (onSuccess?: RequestHandler, onFailed?: RequestHandler) =>
  (data, params?) => {
    if (data?.data?.result === 'success') {
      onSuccess?.(data?.data?.data, params);
    } else {
      onFailed?.(data?.data?.error, params, data?.data);
    }
  };
