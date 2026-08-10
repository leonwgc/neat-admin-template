import axios, {
  AxiosError,
  AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import { setupInterceptors } from './interceptors';
import {
  preventDuplicateRequestHeaderKey,
  preventDuplicateRequestHeaderValue,
} from '../config';
import { notVerifyLocation } from './req.config';

const getHeaderValue = (
  headers: AxiosRequestConfig['headers'],
  key: string,
): unknown => {
  if (!headers) {
    return undefined;
  }

  // AxiosHeaders（axios v1）支持 get
  if (
    typeof (headers as { get?: (name: string) => unknown }).get === 'function'
  ) {
    return (headers as { get: (name: string) => unknown }).get(key);
  }

  // 兼容普通对象和大小写差异
  const headerRecord = headers as Record<string, unknown>;
  const directValue = headerRecord[key];

  if (directValue !== undefined) {
    return directValue;
  }

  const lowerKey = key.toLowerCase();
  const foundKey = Object.keys(headerRecord).find(
    (headerKey) => headerKey.toLowerCase() === lowerKey,
  );

  if (!foundKey) {
    return undefined;
  }

  return headerRecord[foundKey];
};

const isFormData = (value: unknown): value is FormData => {
  return typeof FormData !== 'undefined' && value instanceof FormData;
};

const isURLSearchParams = (value: unknown): value is URLSearchParams => {
  return (
    typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams
  );
};

const sortObject = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sortObject(item));
  }

  if (
    value &&
    typeof value === 'object' &&
    !isFormData(value) &&
    !isURLSearchParams(value)
  ) {
    const sortedEntries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, sortObject(v)]);

    return Object.fromEntries(sortedEntries);
  }

  return value;
};

const serializeRequestPart = (value: unknown): string => {
  if (value === undefined) {
    return '';
  }

  if (value === null) {
    return 'null';
  }

  if (isURLSearchParams(value)) {
    const sortedParams = Array.from(value.entries()).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    return JSON.stringify(sortedParams);
  }

  if (isFormData(value)) {
    const sortedEntries = Array.from(value.entries())
      .map(([k, v]) => {
        if (v instanceof File) {
          return [k, `file:${v.name}:${v.size}:${v.type}`];
        }
        return [k, String(v)];
      })
      .sort(([a], [b]) => a.localeCompare(b));

    return JSON.stringify(sortedEntries);
  }

  if (typeof value === 'string') {
    // 兼容 data 为 JSON 字符串的场景，尽量按对象语义稳定化
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(sortObject(parsed));
    } catch {
      return value;
    }
  }

  if (typeof value === 'object') {
    return JSON.stringify(sortObject(value));
  }

  return String(value);
};

export const checkPreventDuplicateRequest = (
  config: AxiosRequestConfig,
): boolean => {
  const headerValue = getHeaderValue(
    config.headers,
    preventDuplicateRequestHeaderKey,
  );
  return headerValue === preventDuplicateRequestHeaderValue;
};

/**
 * 生成请求的唯一 key
 *
 * @param config - 请求配置
 * @returns 唯一 key
 */
export const getRequestKey = (config: AxiosRequestConfig): string => {
  const { method = 'get', url = '', params = {}, data = {} } = config;
  return `${method.toLowerCase()}_${url}_${serializeRequestPart(params)}_${serializeRequestPart(data)}`;
};

/**
 * 创建 Axios 实例
 */
export const getAxiosInstance = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000, // 30 秒超时
    withCredentials: true, // 跨域请求是否携带凭证
    headers: {
      'Content-Type': 'application/json',
    },
  });

  setupInterceptors(instance);

  return instance;
};

export const handleResponseError = (error: AxiosError): void => {
  const status = error?.response?.status;

  switch (status) {
    case 401:
      handle401Error(error);
      break;
    case 403:
      handle403Error(error);
      break;
    default:
      break;
  }
};

export const handle401Error = (error: AxiosError): void => {
  if (!notVerifyLocation.includes(location.pathname?.toLowerCase())) {
    if (error?.response?.headers['location']) {
      window.location.replace(error.response.headers['location']);
    }
  }
};

export const handle403Error = (error: AxiosError): void => {
  if (error?.response?.status === 403) {
    location.href = '/nav/no-permission';
  }
};
