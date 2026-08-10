/**
 * @file src/req/interceptors.ts
 * @author leon.wang
 * @description Axios 拦截器配置
 */

import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import { notVerifyLocation } from './req.config';
import { getRequestKey } from './utils';
import { checkPreventDuplicateRequest } from './utils';

// 保存正在进行的请求：key=>AbortController
const pendingMap: Map<string, AbortController> = new Map();

/**
 * 配置请求拦截器
 *
 * @param instance - Axios 实例
 */
export const setupRequestInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (checkPreventDuplicateRequest(config)) {
        const key = getRequestKey(config);

        if (pendingMap.has(key)) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.log(`Duplicate request intercepted: ${key}`);
          }
          const duplicateError = new Error(`Duplicate request: ${key}`) as Error & {
            isDuplicateRequest?: boolean;
            requestKey?: string;
          };
          duplicateError.isDuplicateRequest = true;
          duplicateError.requestKey = key;
          return Promise.reject(duplicateError);
        }

        const controller = new AbortController();
        config.signal = controller.signal;
        pendingMap.set(key, controller);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

/**
 * 配置响应拦截器
 *
 * @param instance - Axios 实例
 */
export const setupResponseInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (checkPreventDuplicateRequest(response.config)) {
        const key = getRequestKey(response.config);
        pendingMap.delete(key);
      }

      return response;
    },
    (error: AxiosError<unknown>) => {
      if (error?.config && checkPreventDuplicateRequest(error.config)) {
        const key = getRequestKey(error.config);
        pendingMap.delete(key);
      }

      const status = error.response?.status;

      if (status === 401) {
        if (!notVerifyLocation.includes(location.pathname?.toLowerCase())) {
          if (error?.response?.headers['location']) {
            window.location.replace(error.response.headers['location']);
          }
        }
      } else if (status === 403) {
        location.href = '/nav/no-permission';
      }
      return Promise.reject(error);
    },
  );
};

export const setupInterceptors = (instance: AxiosInstance): void => {
  setupRequestInterceptors(instance);
  setupResponseInterceptors(instance);
};
