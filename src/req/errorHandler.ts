/**
 * @file src/req/errorHandler.ts
 * @author leon.wang
 * @description HTTP 错误处理器
 */

import type { AxiosError, AxiosResponse } from 'axios';
import i18n from '~/i18n';
import { HttpError, HttpErrorType } from './types';

/**
 * 错误状态码映射
 */
const ERROR_CODE_MAP: Record<number, HttpErrorType> = {
  400: HttpErrorType.BUSINESS_ERROR,
  401: HttpErrorType.AUTH_ERROR,
  403: HttpErrorType.PERMISSION_ERROR,
  404: HttpErrorType.BUSINESS_ERROR,
  408: HttpErrorType.TIMEOUT_ERROR,
  500: HttpErrorType.SERVER_ERROR,
  502: HttpErrorType.SERVER_ERROR,
  503: HttpErrorType.SERVER_ERROR,
  504: HttpErrorType.TIMEOUT_ERROR,
};

/**
 * 获取错误消息
 *
 * @param error - Axios 错误对象
 * @returns 错误消息
 */
const getErrorMessage = (error: AxiosError): string => {
  const response = error.response as AxiosResponse<{ message?: string }>;

  // 优先使用服务端返回的错误消息
  if (response?.data?.message) {
    return response.data.message;
  }

  // 根据状态码返回默认消息
  const status = response?.status;

  switch (status) {
    case 400:
      return i18n.t('common.error.badRequest', '请求参数错误');
    case 401:
      return i18n.t('common.error.unauthorized', '未授权，请重新登录');
    case 403:
      return i18n.t('common.error.forbidden', '没有权限访问');
    case 404:
      return i18n.t('common.error.notFound', '请求的资源不存在');
    case 408:
      return i18n.t('common.error.timeout', '请求超时');
    case 500:
      return i18n.t('common.error.serverError', '服务器错误');
    case 502:
      return i18n.t('common.error.badGateway', '网关错误');
    case 503:
      return i18n.t('common.error.serviceUnavailable', '服务不可用');
    case 504:
      return i18n.t('common.error.gatewayTimeout', '网关超时');
    default:
      return error.message || i18n.t('common.error.unknown', '未知错误');
  }
};

/**
 * 获取错误类型
 *
 * @param error - Axios 错误对象
 * @returns 错误类型
 */
const getErrorType = (error: AxiosError): HttpErrorType => {
  // 请求被取消
  if (error.code === 'ERR_CANCELED') {
    return HttpErrorType.CANCEL_ERROR;
  }

  // 网络错误
  if (error.code === 'ERR_NETWORK' || !error.response) {
    return HttpErrorType.NETWORK_ERROR;
  }

  // 超时错误
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    return HttpErrorType.TIMEOUT_ERROR;
  }

  // 根据状态码判断
  const status = error.response?.status;
  if (status) {
    return ERROR_CODE_MAP[status] || HttpErrorType.UNKNOWN_ERROR;
  }

  return HttpErrorType.UNKNOWN_ERROR;
};

/**
 * 处理 HTTP 错误
 *
 * @param error - Axios 错误对象
 * @returns 封装后的错误对象
 *
 * @example
 * ```typescript
 * try {
 *   await api.get('/data');
 * } catch (error) {
 *   const httpError = handleHttpError(error);
 *   console.error(httpError);
 * }
 * ```
 */
export const handleHttpError = (error: unknown): HttpError => {
  const axiosError = error as AxiosError;
  const errorType = getErrorType(axiosError);
  const errorMessage = getErrorMessage(axiosError);
  const statusCode = axiosError.response?.status;

  // 创建标准化的错误对象
  const httpError = new HttpError(
    errorMessage,
    errorType,
    statusCode,
    error,
    axiosError.response,
  );

  // 特殊错误处理
  handleSpecialError(errorType, statusCode);

  return httpError;
};

/**
 * 处理特殊错误
 *
 * @param errorType - 错误类型
 * @param statusCode - 状态码
 */
const handleSpecialError = (
  errorType: HttpErrorType,
  statusCode?: number,
): void => {
  // 401 未授权 - 跳转到登录页
  if (errorType === HttpErrorType.AUTH_ERROR || statusCode === 401) {
    // TODO: 跳转到登录页（避免重复跳转）
  }

  // 403 无权限 - 跳转到无权限页面
  if (errorType === HttpErrorType.PERMISSION_ERROR || statusCode === 403) {
    if (!window.location.pathname.includes('/no-permission')) {
      window.location.href = '/no-permission';
    }
  }
};

/**
 * 格式化错误信息（用于日志上报）
 *
 * @param error - HTTP 错误对象
 * @returns 格式化的错误信息
 */
export const formatErrorForLog = (
  error: HttpError,
): Record<string, unknown> => {
  return {
    type: error.type,
    code: error.code,
    message: error.message,
    url: error.response?.config?.url,
    method: error.response?.config?.method,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };
};
