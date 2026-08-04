/**
 * @file src/req/index.ts
 * @author leon.wang
 * @description Axios 实例配置和导出
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptors';
import type { CancelTokenMap } from './types';

/**
 * 获取 API 基础 URL
 */
const getBaseURL = (): string => {
  // 可以根据环境变量或配置文件获取

  if (process.env.NODE_ENV === 'qa') {
    return '/unifyplatform-backend-qa';
  }
  return '';
};

/**
 * 创建 Axios 实例
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    timeout: 30000, // 30 秒超时
    withCredentials: true, // 跨域请求是否携带凭证
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 配置拦截器
  setupInterceptors(instance);

  return instance;
};

/**
 * Axios 实例（单例）
 */
const request = createAxiosInstance();

/**
 * 请求取消器映射表
 */
const cancelTokenMap: CancelTokenMap = {};

/**
 * 生成请求的唯一 key
 *
 * @param config - 请求配置
 * @returns 唯一 key
 */
const generateRequestKey = (config: AxiosRequestConfig): string => {
  const { method = 'get', url = '', params = {}, data = {} } = config;
  return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;
};

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
  const key = generateRequestKey(config);
  const controller = cancelTokenMap[key];

  if (controller) {
    controller.abort();
    delete cancelTokenMap[key];
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
  Object.keys(cancelTokenMap).forEach((key) => {
    cancelTokenMap[key].abort();
  });
  Object.keys(cancelTokenMap).forEach((key) => {
    delete cancelTokenMap[key];
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
  const key = generateRequestKey(config);

  // 如果存在相同的请求，先取消它
  if (cancelTokenMap[key]) {
    cancelTokenMap[key].abort();
  }

  // 创建新的 AbortController
  const controller = new AbortController();
  cancelTokenMap[key] = controller;

  // 添加取消令牌到请求配置
  const requestConfig: AxiosRequestConfig = {
    ...config,
    signal: controller.signal,
  };

  return request(requestConfig)
    .then((response) => {
      delete cancelTokenMap[key];
      return response.data;
    })
    .catch((error) => {
      delete cancelTokenMap[key];
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
