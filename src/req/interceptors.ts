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

/**
 * 配置请求拦截器
 *
 * @param instance - Axios 实例
 */
export const setupRequestInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
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
    (response: AxiosResponse) => response,
    (error: AxiosError<unknown>) => {
      if (error.status === 401) {
        if (!notVerifyLocation.includes(location.pathname?.toLowerCase())) {
          // 如果响应头中包含 location，则跳转到该地址
          if (error?.response?.headers['location']) {
            window.location.replace(error.response.headers['location']);
          }
        }
      } else if (error.status === 403) {
        // 如果是 403 错误，跳转到无权限页面
        location.href = '/nav/no-permission';
      }
      return Promise.reject(error);
    },
  );
};

/**
 * 配置所有拦截器
 *
 * @param instance - Axios 实例
 */
export const setupInterceptors = (instance: AxiosInstance): void => {
  setupRequestInterceptors(instance);
  setupResponseInterceptors(instance);
};
