/**
 * @file src/config.ts
 * @author leon.wang
 */
import type { AxiosRequestConfig } from 'axios';

export const preventDuplicateRequestHeaderKey = 'PREVENT-DUPLICATE-REQUEST';
export const preventDuplicateRequestHeaderValue = 'YES';

export const defaultRoute = '/app/ar-statements';

export const preventDuplicateRequestHeader = {
  [preventDuplicateRequestHeaderKey]: preventDuplicateRequestHeaderValue,
} as AxiosRequestConfig['headers'];
