/**
 * @file src/req/interceptors.ts
 * @author leon.wang
 * @description Axios 拦截器配置
 */

import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import type { ApiResponse } from './types';

const notVerifyLocation = ['/nav/no-permission', '/nav/404', '/nav/500'];

/**
 * 配置请求拦截器
 *
 * @param instance - Axios 实例
 */
export const setupRequestInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 添加时间戳（防止缓存）
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now(),
        };
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
      const data = response.data as ApiResponse;

      // 如果返回的不是标准格式，直接返回原始数据
      if (!data || typeof data !== 'object' || !('code' in data)) {
        return response;
      }

      // 处理业务成功
      if (data.success || data.code === 0 || data.code === 200) {
        return response;
      }

      // 处理业务失败
      const errorMessage = data.message || 'Request failed';
      return Promise.reject(new Error(errorMessage));
    },
    (error) => {
      if (error.response.status === 401) {
        if (!notVerifyLocation.includes(location.pathname?.toLowerCase())) {
          // 如果响应头中包含 location，则跳转到该地址
          if (error.response.headers['location']) {
            window.location.replace(error.response.headers['location']);
          }
        }
      } else if (error.response.status === 403) {
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
