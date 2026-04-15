/**
 * @file src/req/example.ts
 * @author leon.wang
 * @description API 使用示例
 *
 * 这个文件展示了如何使用封装的 axios 实例创建 API 模块
 * 实际使用时，请在 src/api 目录下创建对应的 API 模块文件
 */

/* eslint-disable no-console */

import request, {
  type ApiResponse,
  type PaginationParams,
  type PaginationResponse,
  type RequestConfig,
  cancelRequest,
  requestWithCancel,
} from './index';

/* ============================================
 * 类型定义示例
 * ============================================ */

/**
 * 用户数据类型
 */
interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * 用户列表查询参数
 */
interface UserListParams extends PaginationParams {
  keyword?: string;
  role?: string;
  status?: 'active' | 'inactive';
}

/**
 * 创建用户 DTO
 */
interface CreateUserDto {
  username: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

/**
 * 更新用户 DTO
 */
interface UpdateUserDto extends Partial<CreateUserDto> {
  status?: 'active' | 'inactive';
}

/* ============================================
 * API 模块示例
 * ============================================ */

/**
 * 用户 API 模块
 *
 * @example
 * ```typescript
 * import { userApi } from '~/api/user';
 *
 * // 获取用户列表
 * const { data } = await userApi.getList({ page: 1, pageSize: 20 });
 * console.log(data.data.list);
 * ```
 */
export const userApi = {
  /**
   * 获取用户列表（分页）
   */
  getList: (params: UserListParams) => {
    return request.get<ApiResponse<PaginationResponse<User>>>('/users', {
      params,
    });
  },

  /**
   * 获取用户详情
   */
  getDetail: (id: string) => {
    return request.get<ApiResponse<User>>(`/users/${id}`);
  },

  /**
   * 创建用户
   */
  create: (data: CreateUserDto) => {
    return request.post<ApiResponse<User>>('/users', data);
  },

  /**
   * 更新用户
   */
  update: (id: string, data: UpdateUserDto) => {
    return request.put<ApiResponse<User>>(`/users/${id}`, data);
  },

  /**
   * 删除用户
   */
  delete: (id: string) => {
    return request.delete<ApiResponse<void>>(`/users/${id}`);
  },

  /**
   * 批量删除用户
   */
  batchDelete: (ids: string[]) => {
    return request.post<ApiResponse<void>>('/users/batch-delete', { ids });
  },

  /**
   * 导出用户列表
   */
  export: (params: UserListParams) => {
    return request.get<Blob>('/users/export', {
      params,
      responseType: 'blob',
    } as RequestConfig);
  },
};

/* ============================================
 * 组件中使用示例
 * ============================================ */

/**
 * 示例 1: 基础使用
 */
export const example1_BasicUsage = async () => {
  try {
    // GET 请求
    const response = await request.get<ApiResponse<User[]>>('/users');
    console.log('用户列表:', response.data.data);

    // POST 请求
    const createResponse = await request.post<ApiResponse<User>>('/users', {
      username: 'john',
      email: 'john@example.com',
    });
    console.log('创建成功:', createResponse.data.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

/**
 * 示例 2: 配合 ahooks 使用
 */
export const example2_WithAhooks = () => {
  // 在 React 组件中使用
  /*
  import { useRequest } from 'ahooks';

  const UserList: React.FC = () => {
    // 自动请求
    const { data, loading, error, refresh } = useRequest(
      async () => {
        const res = await userApi.getList({ page: 1, pageSize: 20 });
        return res.data.data;
      }
    );

    // 手动触发
    const { run: createUser, loading: creating } = useRequest(
      async (userData: CreateUserDto) => {
        const res = await userApi.create(userData);
        return res.data.data;
      },
      {
        manual: true,
        onSuccess: () => {
          message.success('创建成功');
          refresh();
        },
      }
    );

    if (loading) return <Spin />;
    if (error) return <Alert message="加载失败" />;

    return (
      <div>
        <Button onClick={() => createUser(userData)}>
          创建用户
        </Button>
        <List dataSource={data?.list} />
      </div>
    );
  };
  */
};

/**
 * 示例 3: 取消请求
 */
export const example3_CancelRequest = () => {
  // 在 React 组件中使用
  /*
  import { useEffect } from 'react';
  import { cancelAllRequests } from '~/req';

  const MyComponent: React.FC = () => {
    useEffect(() => {
      // 发起请求
      fetchData();

      // 组件卸载时取消所有请求
      return () => {
        cancelAllRequests();
      };
    }, []);

    const fetchData = async () => {
      try {
        const response = await request.get('/data');
        console.log(response.data);
      } catch (error) {
        if (error.type === 'CANCEL_ERROR') {
          console.log('请求已取消');
        }
      }
    };

    return <div>...</div>;
  };
  */
};

/**
 * 示例 4: 可取消的单个请求
 */
export const example4_CancellableRequest = async () => {
  const config = { url: '/users', method: 'get' as const };

  // 发起可取消的请求
  const promise = requestWithCancel(config);

  // 2 秒后取消请求
  setTimeout(() => {
    cancelRequest(config);
  }, 2000);

  try {
    const data = await promise;
    console.log('数据:', data);
  } catch {
    console.log('请求被取消或失败');
  }
};

/**
 * 示例 5: 自定义错误处理
 */
export const example5_CustomErrorHandler = async () => {
  try {
    const response = await request.get('/data', {
      showError: false,
      customErrorHandler: (error) => {
        console.error('自定义错误处理:', error);

        // 可以显示自定义的错误提示
        // Modal.error({
        //   title: '错误',
        //   content: error.message,
        // });
      },
    } as RequestConfig);
    console.log(response.data);
  } catch {
    // 错误已被自定义处理器处理
  }
};

/**
 * 示例 6: 文件上传
 */
export const example6_FileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'avatar');

  try {
    const response = await request.post<ApiResponse<{ url: string }>>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          console.log(`上传进度: ${percent}%`);
        },
      }
    );

    console.log('文件 URL:', response.data.data.url);
    return response.data.data.url;
  } catch (error) {
    console.error('上传失败:', error);
    throw error;
  }
};

/**
 * 示例 7: 文件下载
 */
export const example7_FileDownload = async (fileId: string) => {
  try {
    const response = await request.get<Blob>(`/files/${fileId}/download`, {
      responseType: 'blob',
    } as RequestConfig);

    // 创建下载链接
    const blob = response.data as unknown as Blob;
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `file-${fileId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('下载失败:', error);
  }
};

/**
 * 示例 8: 分页请求
 */
export const example8_PaginationRequest = async () => {
  try {
    const response = await userApi.getList({
      page: 1,
      pageSize: 20,
      keyword: 'john',
      role: 'admin',
    });

    const { list, total, page, pageSize, totalPages } = response.data.data;

    console.log('用户列表:', list);
    console.log('总数:', total);
    console.log('当前页:', page);
    console.log('每页数量:', pageSize);
    console.log('总页数:', totalPages);
  } catch (error) {
    console.error('请求失败:', error);
  }
};
