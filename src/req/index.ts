/**
 * @file src/req/index.ts
 * @author leon.wang
 * @description Axios 实例配置和导出
 */

import type { AxiosRequestConfig } from 'axios';
import { getRequestKey, getAxiosInstance } from './utils';

export interface CancelableRequest<T = unknown> {
  key: string;
  promise: Promise<T>;
  cancel: () => void;
}

/**
 * Axios 实例（单例）
 */
const request = getAxiosInstance();

/**
 * 请求取消器映射表
 */
const cancelTokenMap: Map<string, AbortController> = new Map();

/**
 * 取消指定请求
 *
 * @param config - 请求配置
 *
 * @example
 * ```typescript
 * const config = { url: '/api/data', method: 'get' };
 * cancelRequest(config);
 * ```
 */
export const cancelRequest = (config: AxiosRequestConfig): void => {
  const key = getRequestKey(config);
  const controller = cancelTokenMap.get(key);

  if (controller) {
    controller.abort();
    cancelTokenMap.delete(key);
  }
};

/**
 * 取消所有请求
 *
 * @example
 * ```typescript
 * // 在组件卸载或页面切换时取消所有请求
 * cancelAllRequests();
 * ```
 */
export const cancelAllRequests = (): void => {
  cancelTokenMap.forEach((controller, key) => {
    controller.abort();
    cancelTokenMap.delete(key);
  });
};

/**
 * 创建可取消请求句柄
 *
 * @param config - 请求配置
 * @returns 包含 promise/cancel/key 的句柄
 */
export const createCancelableRequest = <T = unknown>(
  config: AxiosRequestConfig,
): CancelableRequest<T> => {
  const key = getRequestKey(config);

  if (cancelTokenMap.has(key)) {
    cancelTokenMap.get(key)?.abort();
  }

  // 创建新的 AbortController
  const controller = new AbortController();
  cancelTokenMap.set(key, controller);

  // 添加取消令牌到请求配置
  const requestConfig: AxiosRequestConfig = {
    ...config,
    signal: controller.signal,
  };

  const promise = request(requestConfig)
    .then((response) => {
      cancelTokenMap.delete(key);
      return response.data;
    })
    .catch((error) => {
      cancelTokenMap.delete(key);
      throw error;
    });

  return {
    key,
    promise,
    cancel: () => {
      controller.abort();
      cancelTokenMap.delete(key);
    },
  };
};

/**
 * GET cancelable handle
 */
export const getCancelable = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): CancelableRequest<T> => {
  return createCancelableRequest<T>({
    ...config,
    url,
    method: 'get',
  });
};

/**
 * DELETE cancelable handle
 */
export const deleteCancelable = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): CancelableRequest<T> => {
  return createCancelableRequest<T>({
    ...config,
    url,
    method: 'delete',
  });
};

/**
 * POST cancelable handle
 */
export const postCancelable = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): CancelableRequest<T> => {
  return createCancelableRequest<T>({
    ...config,
    url,
    method: 'post',
    data,
  });
};

/**
 * PUT cancelable handle
 */
export const putCancelable = <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): CancelableRequest<T> => {
  return createCancelableRequest<T>({
    ...config,
    url,
    method: 'put',
    data,
  });
};

type RequestCancelableMethods = typeof request & {
  getCancelable: typeof getCancelable;
  postCancelable: typeof postCancelable;
  putCancelable: typeof putCancelable;
  deleteCancelable: typeof deleteCancelable;
  createCancelableRequest: typeof createCancelableRequest;
};

const requestCancelableMethods: RequestCancelableMethods = Object.assign(
  request,
  {
    getCancelable,
    postCancelable,
    putCancelable,
    deleteCancelable,
    createCancelableRequest,
  },
);

// 导出类型
export type {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
} from './types';
export { HttpError, HttpErrorType } from './types';

// 导出默认实例
export default requestCancelableMethods;
