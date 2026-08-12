/**
 * @file src/hooks/useReq.tsx
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

// type Options<TParams extends unknown[] = any[], TData = unknown> = {
//   manual?: boolean;
//   async?: boolean; // default false
//   toastDefaultError?: boolean; // toast operation failed when onError triggerd
//   onBefore?: (params: TParams) => void;
//   onSuccess?: (data: TData, params: TParams) => void;
//   // handle logical error
//   onFailed?: (data: TData, params: TParams, res?: TData) => void;
//   onFinally?: (params: TParams, data?: TData, e?: Error) => void;
//   defaultParams?: TParams;
//   refreshDeps?: DependencyList;
//   refreshDepsAction?: () => void;
//   loadingDelay?: number;
//   pollingInterval?: number;
//   pollingWhenHidden?: boolean;
//   pollingErrorRetryCount?: number;
//   refreshOnWindowFocus?: boolean;
//   focusTimespan?: number;
//   debounceWait?: number;
//   debounceLeading?: boolean;
//   debounceTrailing?: boolean;
//   debounceMaxWait?: number;
//   throttleWait?: number;
//   throttleLeading?: boolean;
//   throttleTrailing?: boolean;
//   cacheKey?: string;
//   cacheTime?: number;
//   staleTime?: number;
//   retryCount?: number;
//   retryInterval?: number;
//   ready?: boolean;
// };

export const errorHandler = (
  error,
  notificationApi,
  toastDefaultError,
  toast,
) => {
  if (error.response?.status >= 500 || !navigator.onLine) {
    notificationApi.warning({
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

const useReq = (
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

export default useReq;
