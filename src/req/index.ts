/**
 * @file src/req/index.ts
 * @author leon.wang
 * @description Axios 实例配置和导出
 */

import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getRequestKey, getAxiosInstance } from './utils';

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
export const cancelRequest = (config: InternalAxiosRequestConfig): void => {
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
 * 带取消功能的请求方法
 *
 * @param config - 请求配置
 * @returns Promise
 *
 * @example
 * ```typescript
 * // 发起可取消的请求
 * const data = await requestWithCancel({
 *   url: '/api/data',
 *   method: 'get',
 * });
 *
 * // 取消请求
 * cancelRequest({ url: '/api/data', method: 'get' });
 * ```
 */
export const requestWithCancel = <T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> => {
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

  return request(requestConfig)
    .then((response) => {
      cancelTokenMap.delete(key);
      return response.data;
    })
    .catch((error) => {
      cancelTokenMap.delete(key);
      throw error;
    });
};

// 导出类型
export type {
  ApiResponse,
  PaginationParams,
  PaginationResponse,
} from './types';
export { HttpError, HttpErrorType } from './types';

// 导出默认实例
export default request;
