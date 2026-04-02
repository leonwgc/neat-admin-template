import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { globalRequestDeduplicator } from './utils/requestDeduplicator';

const getGateWayPath = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '/xxx-dev';
    case 'qa':
      return '/xxx-qa';
    case 'uat':
      return '/xxx-uat';
    case 'production':
      return '/xxx';
    default:
      return '/xxx';
  }
};

// `params` are the URL parameters to be sent with the request
// Must be a plain object or a URLSearchParams object
// `data` is the data to be sent as the request body
// Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'

// 创建axios实例
const req = axios.create({
  baseURL: getGateWayPath(),
  withCredentials: true,
  timeout: 30000, // 30秒超时
});

// 请求拦截器
req.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加请求时间戳（用于性能监控）
    config.headers['X-Request-Time'] = Date.now().toString();

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
req.interceptors.response.use(
  (response) => {
    // 计算请求耗时
    const requestTime = response.config.headers?.['X-Request-Time'];
    if (requestTime) {
      const duration = Date.now() - parseInt(requestTime as string, 10);
      if (duration > 3000 && process.env.NODE_ENV === 'development') {
        // TODO: report slow request metric
        // console.warn(`[慢请求] ${response.config.url} 耗时 ${duration}ms`);
      }
    }

    return response;
  },
  (error: AxiosError) => {
    // 处理网络错误
    if (!error.response) {
      // 网络连接失败，请检查网络设置
      return Promise.reject(error);
    }

    // 处理HTTP错误状态码
    const { status } = error.response;
    switch (status) {
      case 401:
        // 登录已过期，请重新登录
        // 可以在这里触发登出逻辑
        break;
      case 403:
        // 没有权限访问该资源
        break;
      case 404:
        // 请求的资源不存在
        break;
      case 429:
        // 请求过于频繁，请稍后再试
        break;
      case 500:
        // 服务器错误，请稍后再试
        break;
      case 503:
        // 服务暂时不可用，请稍后再试
        break;
      default:
        if (status >= 500) {
          // 服务器错误
        } else if (status >= 400) {
          // 请求错误
        }
    }

    return Promise.reject(error);
  },
);

/**
 * 带去重的请求方法
 * 防止相同请求在短时间内重复发送
 */
export const requestWithDedup = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: <T = any>(url: string, config?: any) => {
    return globalRequestDeduplicator.execute(
      url,
      'GET',
      () => req.get<T>(url, config).then((res) => res.data),
      config?.params,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T = any>(url: string, data?: any, config?: any) => {
    return globalRequestDeduplicator.execute(
      url,
      'POST',
      () => req.post<T>(url, data, config).then((res) => res.data),
      data,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: <T = any>(url: string, data?: any, config?: any) => {
    return globalRequestDeduplicator.execute(
      url,
      'PUT',
      () => req.put<T>(url, data, config).then((res) => res.data),
      data,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: <T = any>(url: string, config?: any) => {
    return globalRequestDeduplicator.execute(
      url,
      'DELETE',
      () => req.delete<T>(url, config).then((res) => res.data),
      config?.params,
    );
  },
};

export default req;
