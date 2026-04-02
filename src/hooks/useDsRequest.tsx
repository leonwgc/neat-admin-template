/**
 * @file src/hooks/useDsRequest.tsx
 * @author leon.wang
 */
import { useCallback, type DependencyList } from 'react';
import { useRequest } from 'ahooks';
import { AxiosPromise } from 'axios';
import { message } from 'antd';

type RequestHandler = (data: unknown, params: unknown[]) => void;

const onUseRequestSuccessHanlder =
  (onSuccess: RequestHandler, onFailed?: RequestHandler) => (data, params?) => {
    if (data?.data?.result === 'success') {
      onSuccess?.(data?.data?.data, params);
    } else {
      onFailed?.(data?.data?.error, params);
    }
  };
export type ObjectType = Record<string, unknown>;

export type ListObjectType = {
  pageSize?: number;
  pageNum?: number;
  totals: number;
  totalPages?: number;
  records: ObjectType[];
};

export type ResponseDataType = {
  result: 'success' | 'fail';
  timestamp?: number;
  data?: ObjectType | ObjectType[] | ListObjectType;
};

type Options<TParams = unknown, TData = unknown> = {
  manual?: boolean;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  // handle logical error
  onFailed?: (data: TData, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  defaultParams?: TParams;
  refreshDeps?: DependencyList;
  refreshDepsAction?: () => void;
  loadingDelay?: number;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  pollingErrorRetryCount?: number;
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;
  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;
  debounceMaxWait?: number;
  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;
  retryCount?: number;
  retryInterval?: number;
  ready?: boolean;
};

const useDsRequest = (
  request: (...params: unknown[]) => AxiosPromise<ResponseDataType>,
  options: Options = {}
) => {
  const onError = useCallback((error) => {
    message.error({
      icon: 'fail',
      content: error?.message || '请求失败，请稍后再试',
    });
  }, []);

  return useRequest(request, {
    ...options,
    onSuccess: onUseRequestSuccessHanlder(
      options?.onSuccess,
      options?.onFailed
    ),
    onError,
  });
};

export default useDsRequest;
