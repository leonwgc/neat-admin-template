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
import { message } from '@derbysoft/neat-design';
import { handleHttpError } from './errorHandler';
import type { ApiResponse, RequestConfig } from './types';

// 请求计数器（用于控制 loading）
let loadingCount = 0;
let loadingTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * 显示加载提示
 */
const showLoading = () => {
  loadingCount++;

  // 防抖处理，避免频繁显示/隐藏
  if (loadingTimer) {
    clearTimeout(loadingTimer);
  }

  loadingTimer = setTimeout(() => {
    if (loadingCount > 0) {
      message.loading({
        content: 'Loading...',
        key: 'global-loading',
        duration: 0,
      });
    }
  }, 200);
};

/**
 * 隐藏加载提示
 */
const hideLoading = () => {
  loadingCount = Math.max(0, loadingCount - 1);

  if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
  }

  if (loadingCount === 0) {
    message.destroy('global-loading');
  }
};

/**
 * 获取 Token
 *
 * @returns Token 字符串
 */
const getToken = (): string | null => {
  // 从 localStorage 获取 token
  return localStorage.getItem('token');
};

/**
 * 配置请求拦截器
 *
 * @param instance - Axios 实例
 */
export const setupRequestInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const requestConfig = config as InternalAxiosRequestConfig &
        RequestConfig;

      // 显示加载提示
      if (requestConfig.showLoading !== false) {
        showLoading();
      }

      // 添加认证 Token
      if (requestConfig.requireAuth !== false) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // 添加时间戳（防止缓存）
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now(),
        };
      }

      // 添加公共参数
      const commonParams = {
        // 可以添加其他公共参数
      };

      if (config.method === 'get') {
        config.params = { ...config.params, ...commonParams };
      } else {
        config.data = { ...config.data, ...commonParams };
      }

      return config;
    },
    (error) => {
      hideLoading();
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
      const requestConfig = response.config as InternalAxiosRequestConfig &
        RequestConfig;

      // 隐藏加载提示
      if (requestConfig.showLoading !== false) {
        hideLoading();
      }

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

      if (requestConfig.showError !== false) {
        message.error(errorMessage);
      }

      return Promise.reject(new Error(errorMessage));
    },
    (error) => {
      const requestConfig = error.config as InternalAxiosRequestConfig &
        RequestConfig;

      // 隐藏加载提示
      if (requestConfig?.showLoading !== false) {
        hideLoading();
      }

      // 使用自定义错误处理器
      if (requestConfig?.customErrorHandler) {
        requestConfig.customErrorHandler(error);
        return Promise.reject(error);
      }

      // 统一错误处理
      const showError = requestConfig?.showError !== false;
      const httpError = handleHttpError(error, showError);

      return Promise.reject(httpError);
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
