# HTTP 请求封装

基于 Axios 的企业级 HTTP 请求封装，提供统一的请求/响应处理、错误处理、请求取消等功能。

## 📋 目录结构

```
req/
├── index.ts           # 主入口，导出配置好的 axios 实例
├── types.ts           # TypeScript 类型定义
├── interceptors.ts    # 请求/响应拦截器
├── errorHandler.ts    # 错误处理器
└── README.md          # 使用文档
```

## ✨ 特性

- ✅ **TypeScript 类型安全** - 完整的类型定义
- ✅ **请求/响应拦截** - 统一处理认证、参数、错误
- ✅ **错误处理** - 统一的错误提示和特殊错误处理（401、403 等）
- ✅ **请求取消** - 支持取消单个或所有请求
- ✅ **加载提示** - 自动显示/隐藏 loading
- ✅ **国际化支持** - 错误消息支持 i18n
- ✅ **开发调试** - 开发环境详细日志输出

## 🚀 快速开始

### 基础使用

```typescript
import request from '~/req';

// GET 请求
const fetchUserList = async () => {
  const response = await request.get('/users');
  return response.data;
};

// POST 请求
const createUser = async (userData: UserData) => {
  const response = await request.post('/users', userData);
  return response.data;
};

// PUT 请求
const updateUser = async (id: string, userData: UserData) => {
  const response = await request.put(`/users/${id}`, userData);
  return response.data;
};

// DELETE 请求
const deleteUser = async (id: string) => {
  const response = await request.delete(`/users/${id}`);
  return response.data;
};
```

### 使用 ahooks

推荐使用 `ahooks` 的 `useRequest` Hook：

```typescript
import { useRequest } from 'ahooks';
import request from '~/req';

const UserList: React.FC = () => {
  const { data, loading, error, run, refresh } = useRequest(
    async () => {
      const res = await request.get('/users');
      return res.data;
    },
    {
      manual: false, // 自动执行
      debounceWait: 300, // 防抖
    }
  );

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" />;

  return (
    <div>
      <Button onClick={refresh}>刷新</Button>
      <List dataSource={data} />
    </div>
  );
};
```

## 📖 高级用法

### 1. 请求配置

```typescript
import request, { type RequestConfig } from '~/req';

const config: RequestConfig = {
  url: '/users',
  method: 'get',
  showLoading: true,      // 是否显示 loading，默认 true
  showError: true,        // 是否显示错误提示，默认 true
  requireAuth: true,      // 是否需要认证，默认 true
  timeout: 10000,         // 超时时间（毫秒）
};

const response = await request(config);
```

### 2. 取消请求

```typescript
import request, { cancelRequest, cancelAllRequests } from '~/req';

// 取消指定请求
const config = { url: '/users', method: 'get' };
cancelRequest(config);

// 取消所有请求（常用于页面卸载）
useEffect(() => {
  return () => {
    cancelAllRequests();
  };
}, []);
```

### 3. 可取消的请求

```typescript
import { requestWithCancel, cancelRequest } from '~/req';

const fetchData = async () => {
  const config = { url: '/users', method: 'get' };

  try {
    const data = await requestWithCancel(config);
    console.log(data);
  } catch (error) {
    if (error.type === 'CANCEL_ERROR') {
      console.log('Request cancelled');
    }
  }
};

// 取消请求
const config = { url: '/users', method: 'get' };
cancelRequest(config);
```

### 4. 分页请求

```typescript
import request, { type PaginationParams, type PaginationResponse } from '~/req';

interface User {
  id: string;
  name: string;
}

const fetchUserPage = async (
  params: PaginationParams
): Promise<PaginationResponse<User>> => {
  const response = await request.get('/users/page', { params });
  return response.data;
};

// 使用
const pageData = await fetchUserPage({ page: 1, pageSize: 20 });
console.log(pageData.list, pageData.total);
```

### 5. 自定义错误处理

```typescript
import request from '~/req';

const fetchData = async () => {
  try {
    const response = await request.get('/users', {
      showError: false, // 禁用默认错误提示
      customErrorHandler: (error) => {
        // 自定义错误处理逻辑
        console.error('Custom error handler:', error);
        // 自定义错误提示
        Modal.error({
          title: 'Error',
          content: error.message,
        });
      },
    });
    return response.data;
  } catch (error) {
    // 错误已被自定义处理器处理
  }
};
```

### 6. 文件上传

```typescript
import request from '~/req';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await request.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total || 1)
      );
      console.log(`Upload progress: ${percent}%`);
    },
  });

  return response.data;
};
```

### 9. 文件下载

```typescript
import request from '~/req';

const downloadFile = async (fileId: string) => {
  const response = await request.get(`/files/${fileId}/download`, {
    responseType: 'blob',
  });

  // 创建下载链接
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'filename.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
```

## 🔧 配置说明

### 基础配置

在 `index.ts` 中配置：

```typescript
const instance = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000,          // 30 秒超时
  withCredentials: false,  // 是否携带凭证
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 环境配置

根据不同环境配置不同的 API 地址：

```typescript
const getBaseURL = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return '/api'; // 开发环境使用代理
  }

  // 生产环境从全局配置获取
  return (window as any).__API_BASE_URL__ || '/api';
};
```

### Token 配置

在 `interceptors.ts` 中修改 `getToken` 方法：

```typescript
const getToken = (): string | null => {
  return localStorage.getItem('token');
  // 或从其他地方获取
  // return store.getState().auth.token;
};
```

## 🎯 类型定义

### ApiResponse

标准 API 响应格式：

```typescript
interface ApiResponse<T = any> {
  code: number;      // 响应码
  message: string;   // 响应消息
  data: T;           // 响应数据
  success: boolean;  // 是否成功
}
```

### RequestConfig

扩展的请求配置：

```typescript
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;              // 是否显示 loading
  showError?: boolean;                // 是否显示错误提示
  requireAuth?: boolean;              // 是否需要认证
  customErrorHandler?: (error: any) => void;  // 自定义错误处理
}
```

### HttpError

标准化的 HTTP 错误：

```typescript
class HttpError extends Error {
  type: HttpErrorType;      // 错误类型
  code?: number;            // 错误码
  originalError?: any;      // 原始错误
  response?: AxiosResponse; // 响应对象
}
```

## 🚨 错误处理

### 错误类型

```typescript
enum HttpErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',         // 网络错误
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',         // 超时错误
  CANCEL_ERROR = 'CANCEL_ERROR',           // 取消请求
  SERVER_ERROR = 'SERVER_ERROR',           // 服务器错误
  BUSINESS_ERROR = 'BUSINESS_ERROR',       // 业务错误
  AUTH_ERROR = 'AUTH_ERROR',               // 认证错误
  PERMISSION_ERROR = 'PERMISSION_ERROR',   // 权限错误
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',         // 未知错误
}
```

### 特殊错误处理

- **401 未授权**: 自动清除用户信息并跳转到登录页
- **403 无权限**: 自动跳转到无权限页面
- **其他错误**: 显示错误提示消息

## 🌍 国际化

错误消息支持国际化，在 `locales/common` 中配置：

```typescript
// locales/zh.ts
export default {
  common: {
    error: {
      badRequest: '请求参数错误',
      unauthorized: '未授权，请重新登录',
      forbidden: '没有权限访问',
      notFound: '请求的资源不存在',
      timeout: '请求超时',
      serverError: '服务器错误',
      unknown: '未知错误',
    },
  },
};

// locales/en.ts
export default {
  common: {
    error: {
      badRequest: 'Bad Request',
      unauthorized: 'Unauthorized',
      forbidden: 'Forbidden',
      notFound: 'Not Found',
      timeout: 'Request Timeout',
      serverError: 'Server Error',
      unknown: 'Unknown Error',
    },
  },
};
```

## 📝 最佳实践

### 1. 使用 TypeScript

定义请求和响应类型：

```typescript
interface UserListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUsers = async (
  params: UserListParams
): Promise<User[]> => {
  const response = await request.get<ApiResponse<User[]>>('/users', { params });
  return response.data.data;
};
```

### 2. 封装 API 方法

创建 API 模块：

```typescript
// api/user.ts
import request, { type ApiResponse } from '~/req';

export const userApi = {
  // 获取用户列表
  getList: (params: UserListParams) => {
    return request.get<ApiResponse<User[]>>('/users', { params });
  },

  // 获取用户详情
  getDetail: (id: string) => {
    return request.get<ApiResponse<User>>(`/users/${id}`);
  },

  // 创建用户
  create: (data: CreateUserDto) => {
    return request.post<ApiResponse<User>>('/users', data);
  },

  // 更新用户
  update: (id: string, data: UpdateUserDto) => {
    return request.put<ApiResponse<User>>(`/users/${id}`, data);
  },

  // 删除用户
  delete: (id: string) => {
    return request.delete<ApiResponse<void>>(`/users/${id}`);
  },
};
```

### 3. 配合 ahooks 使用

```typescript
import { useRequest } from 'ahooks';
import { userApi } from '~/api/user';

const UserManagement: React.FC = () => {
  // 获取列表
  const { data, loading, refresh } = useRequest(
    () => userApi.getList({ page: 1, pageSize: 20 })
  );

  // 创建用户
  const { run: createUser, loading: creating } = useRequest(
    userApi.create,
    {
      manual: true,
      onSuccess: () => {
        message.success('创建成功');
        refresh();
      },
    }
  );

  return (
    <div>
      {/* UI 代码 */}
    </div>
  );
};
```

### 4. 组件卸载时取消请求

```typescript
import { useEffect } from 'react';
import { cancelAllRequests } from '~/req';

const MyComponent: React.FC = () => {
  useEffect(() => {
    return () => {
      // 组件卸载时取消所有请求
      cancelAllRequests();
    };
  }, []);

  return <div>...</div>;
};
```

## 🔍 调试

开发环境会自动打印详细的请求/响应日志：

```
📤 Request: { url: '/users', method: 'get', params: {...}, data: {...} }
📥 Response: { url: '/users', method: 'get', status: 200, data: {...} }
```

错误信息：

```
HTTP Error: {
  type: 'SERVER_ERROR',
  code: 500,
  message: '服务器错误',
  url: '/users',
  method: 'get',
  originalError: {...}
}
```

## 📚 参考资源

- [Axios 文档](https://axios-http.com/)
- [ahooks 文档](https://ahooks.js.org/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

**最后更新**: 2026-04-15
**维护者**: leon.wang
