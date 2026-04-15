/**
 * @file src/req/types.ts
 * @author leon.wang
 * @description HTTP 请求相关类型定义
 */

import type { AxiosResponse } from 'axios';

/**
 * API 响应数据结构
 */
export interface ApiResponse<T = unknown> {
  /** 响应码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 是否成功 */
  success: boolean;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T = unknown> {
  /** 数据列表 */
  list: T[];
  /** 总数 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 总页数 */
  totalPages: number;
}



/**
 * HTTP 错误类型
 */
export enum HttpErrorType {
  /** 网络错误 */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** 超时错误 */
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  /** 取消请求 */
  CANCEL_ERROR = 'CANCEL_ERROR',
  /** 服务器错误 */
  SERVER_ERROR = 'SERVER_ERROR',
  /** 业务错误 */
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  /** 认证错误 */
  AUTH_ERROR = 'AUTH_ERROR',
  /** 权限错误 */
  PERMISSION_ERROR = 'PERMISSION_ERROR',
  /** 未知错误 */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * 自定义 HTTP 错误
 */
export class HttpError extends Error {
  /** 错误类型 */
  type: HttpErrorType;
  /** 错误码 */
  code?: number;
  /** 原始错误 */
  originalError?: unknown;
  /** 响应数据 */
  response?: AxiosResponse;

  constructor(
    message: string,
    type: HttpErrorType,
    code?: number,
    originalError?: unknown,
    response?: AxiosResponse,
  ) {
    super(message);
    this.name = 'HttpError';
    this.type = type;
    this.code = code;
    this.originalError = originalError;
    this.response = response;
  }
}

/**
 * 请求取消控制器映射
 */
export interface CancelTokenMap {
  [key: string]: AbortController;
}
