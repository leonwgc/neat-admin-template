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

// 保存正在进行的请求：key=>AbortController
const pendingMap = new Map();

/**
 * 生成请求唯一key：method + url + params + data
 */
function getRequestKey(config) {
  const { method, url, params, data } = config;
  return [
    method?.toLowerCase(),
    url,
    JSON.stringify(params || {}),
    JSON.stringify(data || {}),
  ].join('|');
}

/**
 * 配置请求拦截器
 *
 * @param instance - Axios 实例
 */
export const setupRequestInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const key = getRequestKey(config);

      // ✅ 如果该请求已经在执行中：直接抛出，不发送请求，达到忽略效果
      if (pendingMap.has(key)) {
        // 标记自定义错误，业务层识别
        return Promise.reject({
          __isDuplicate: true,
          message: '重复请求，已忽略',
        });
      }

      // 创建控制器，存入map
      const controller = new AbortController();
      config.signal = controller.signal;
      pendingMap.set(key, controller);

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
      const key = getRequestKey(response.config);
      pendingMap.delete(key);
      return response;
    },
    (error: AxiosError<unknown>) => {
      if (error?.config) {
        const key = getRequestKey(error.config);
        pendingMap.delete(key);
      }

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
