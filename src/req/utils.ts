import axios, { AxiosInstance, type AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptors';

export const getBaseURL = (): string => {
  if (process.env.NODE_ENV === 'qa') {
    return '/unifyplatform-backend-qa';
  }
  return '';
};

export const preventDuplicateRequestHeader = 'Prevent-Duplicate-Request';

export const checkPreventDuplicateRequest = (
  config: AxiosRequestConfig,
): boolean => {
  if (
    config.headers &&
    config.headers[preventDuplicateRequestHeader] === 'true'
  ) {
    return true;
  }
  return false;
};

/**
 * 生成请求的唯一 key
 *
 * @param config - 请求配置
 * @returns 唯一 key
 */
export const getRequestKey = (config: AxiosRequestConfig): string => {
  const { method = 'get', url = '', params = {}, data = {} } = config;
  return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;
};

/**
 * 创建 Axios 实例
 */
export const getAxiosInstance = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL || getBaseURL(),
    timeout: 30000, // 30 秒超时
    withCredentials: true, // 跨域请求是否携带凭证
    headers: {
      'Content-Type': 'application/json',
    },
  });

  setupInterceptors(instance);

  return instance;
};
