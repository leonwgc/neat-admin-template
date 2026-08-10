/**
 * @file src/req/example.ts
 * @author leon.wang
 * @description req 模块使用示例（句柄式 cancel）
 */

/* eslint-disable no-console */

import request, {
  cancelAllRequests,
  cancelRequest,
  createCancelableRequest,
  deleteCancelable,
  getCancelable,
  postCancelable,
  putCancelable,
  type ApiResponse,
} from './index';

/**
 * 用户类型
 */
interface User {
  id: string;
  username: string;
  email: string;
}

/**
 * 用户列表返回结构
 */
interface UserListData {
  list: User[];
  total: number;
}

/**
 * 示例 1：命名导出 getCancelable
 */
export const example1_GetCancelable = async () => {
  const handle = getCancelable<ApiResponse<UserListData>>('/users', {
    params: { page: 1, pageSize: 20 },
  });

  const data = await handle.promise;
  console.log('用户总数:', data.data.total);
  return data;
};

/**
 * 示例 2：命名导出 postCancelable
 */
export const example2_PostCancelable = async () => {
  const handle = postCancelable<ApiResponse<User>>('/users', {
    username: 'john',
    email: 'john@example.com',
  });

  const data = await handle.promise;
  console.log('创建用户 ID:', data.data.id);
  return data;
};

/**
 * 示例 3：命名导出 putCancelable
 */
export const example3_PutCancelable = async (id: string) => {
  const handle = putCancelable<ApiResponse<User>>(`/users/${id}`, {
    username: 'john-updated',
  });

  const data = await handle.promise;
  console.log('更新用户名:', data.data.username);
  return data;
};

/**
 * 示例 4：命名导出 deleteCancelable
 */
export const example4_DeleteCancelable = async (id: string) => {
  const handle = deleteCancelable<ApiResponse<void>>(`/users/${id}`);
  const data = await handle.promise;
  console.log('删除结果:', data.result);
  return data;
};

/**
 * 示例 5：默认导出实例上的 cancelable 方法
 */
export const example5_RequestInstanceCancelable = async () => {
  const listHandle = request.getCancelable<ApiResponse<UserListData>>('/users', {
    params: { page: 1, pageSize: 10 },
  });

  const createHandle = request.postCancelable<ApiResponse<User>>('/users', {
    username: 'alice',
    email: 'alice@example.com',
  });

  const [listData, createdData] = await Promise.all([
    listHandle.promise,
    createHandle.promise,
  ]);

  console.log('列表数量:', listData.data.list.length);
  console.log('新建用户:', createdData.data.username);
};

/**
 * 示例 6：推荐写法 - 直接使用 cancel 句柄
 */
export const example6_HandleBasedCancel = async () => {
  const { promise, cancel } = getCancelable<ApiResponse<UserListData>>('/users', {
    params: { page: 1, pageSize: 100 },
  });

  setTimeout(() => {
    cancel();
  }, 300);

  try {
    const data = await promise;
    console.log('请求成功:', data.data.total);
  } catch (error) {
    console.log('请求被取消或失败:', error);
  }
};

/**
 * 示例 7：底层通用句柄（任意 method）
 */
export const example7_GenericCancelable = async () => {
  const handle = createCancelableRequest<ApiResponse<UserListData>>({
    url: '/users',
    method: 'get',
    params: { page: 1, pageSize: 20 },
  });

  console.log('request key:', handle.key);
  return handle.promise;
};

/**
 * 示例 8：通过 key + config 手动取消（兼容场景）
 */
export const example8_ManualCancelByConfig = async () => {
  const config = {
    url: '/users',
    method: 'get' as const,
    params: { page: 1, pageSize: 100 },
  };

  const handle = createCancelableRequest<ApiResponse<UserListData>>(config);

  cancelRequest(config);

  try {
    await handle.promise;
  } catch (error) {
    console.log('请求被取消或失败:', error);
  }
};

/**
 * 示例 9：组件卸载时取消全部请求
 */
export const example9_CancelAllOnUnmount = () => {
  /*
  import { useEffect } from 'react';

  useEffect(() => {
    return () => {
      cancelAllRequests();
    };
  }, []);
  */

  return cancelAllRequests;
};
