/**
 * @file src/hooks/useFetch.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { useCallback } from 'react';
import { useRequest } from 'ahooks';
import { AxiosPromise } from 'axios';
import { App } from '@derbysoft/neat-design';
import i18n from '~/i18n';
import { onSuccessHandler } from '../helper';

const t = (key) => i18n.t(key);

type Options = Parameters<typeof useRequest>[1] & {
  async?: boolean; // default false
  toastDefaultError?: boolean; // toast operation failed when onError triggerd
  onFailed?: (data: unknown, params: unknown, res?: unknown) => void;
};

export const errorHandler = (error, notification, toastDefaultError, toast) => {
  if (error.response?.status >= 500 || !navigator.onLine) {
    notification.warning({
      message: error?.message || t('common.error.defaultMessage'),
      description: t('common.error.defaultMessageTitle'),
      placement: 'bottomRight',
    });
  } else {
    if (toastDefaultError) {
      toast.error('Operation failed');
    }
  }
};

const useFetch = (
  request: (...params) => AxiosPromise<ResponseDataType>,
  options?: Options,
) => {
  const { toast, notification } = App.useApp();
  const { toastDefaultError } = options || {};
  const onError = useCallback(
    (error) => {
      errorHandler(error, notification, toastDefaultError, toast);
    },
    [notification, toastDefaultError, toast],
  );

  return useRequest(request, {
    ...options,
    onSuccess: onSuccessHandler(options?.onSuccess, (error, params, res) => {
      if (typeof options?.onFailed === 'function') {
        options?.onFailed(error, params, res);
      } else {
        if (toastDefaultError) {
          toast.error(t('common.error.unknown'));
        }
      }

      if (options?.async) {
        throw error;
      }
    }),
    onError,
  });
};

export default useFetch;
