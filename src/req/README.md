# HTTP 请求封装

基于 Axios 的请求模块，提供统一实例、重复请求拦截、请求取消能力，以及基础的 401/403 跳转处理。

## 目录结构

```text
req/
├── index.ts        # 模块入口：导出 axios 实例与取消相关方法
├── interceptors.ts # 请求/响应拦截器（重复请求、401/403 处理）
├── req.config.ts   # 请求相关配置（免校验路径、SSO 地址）
├── types.ts        # 通用类型与 HttpError 定义
├── utils.ts        # baseURL、请求 key、实例创建等工具
├── example.ts      # 使用示例
└── README.md
```

## 当前能力（与代码一致）

- TypeScript 类型导出：`ApiResponse`、`PaginationParams`、`PaginationResponse`、`HttpError`、`HttpErrorType`
- 单例 Axios 实例：默认超时 30s、`withCredentials: true`
- 重复请求拦截：通过请求头 `Prevent-Duplicate-Request: true` 启用
- 请求取消：支持按配置取消单个请求，或取消全部请求
- 响应错误处理：
  - `401`：若当前路径不在免校验白名单，且响应头存在 `location`，则跳转到该地址
  - `403`：跳转到 `/nav/no-permission`

## 快速开始

```typescript
import request from '~/req';

const fetchUsers = async () => {
  const res = await request.get('/users');
  return res.data;
};

const createUser = async (payload: { username: string; email: string }) => {
  const res = await request.post('/users', payload);
  return res.data;
};
```

## 重复请求拦截

只有显式添加以下请求头，才会启用“相同请求去重”逻辑：

```typescript
import request from '~/req';
import { preventDuplicateRequestHeader } from '~/config';

await request.get('/users', {
  params: { page: 1, pageSize: 20 },
  headers: {
    ...preventDuplicateRequestHeader,
  },
});
```

请求唯一 key 由以下字段组成：

```text
${method}_${url}_${serialized(params)}_${serialized(data)}
```

其中 `serialized(...)` 使用稳定序列化策略：

- 普通对象会按 key 排序后再序列化（避免对象字段顺序不同导致误判）
- `URLSearchParams` 会按参数名排序后序列化
- `FormData` 会按字段名排序后序列化（`File` 会带上 `name/size/type`）
- 字符串类型 `data` 若是 JSON 字符串，会先尝试解析再稳定序列化

若同 key 请求已在进行中，后续请求会被直接拒绝，并抛出带额外标识的错误对象：

```typescript
try {
  await request.get('/users', { headers: preventDuplicateRequestHeader });
} catch (error) {
  const e = error as Error & {
    isDuplicateRequest?: boolean;
    requestKey?: string;
  };

  if (e.isDuplicateRequest) {
    console.log('重复请求被拦截:', e.requestKey);
  }
}
```

## 请求取消

### 1) 取消单个请求

`cancelRequest` 根据传入配置计算 key，并中止对应请求。

```typescript
import type { InternalAxiosRequestConfig } from 'axios';
import { cancelRequest } from '~/req';

const config = {
  url: '/users',
  method: 'get',
} as InternalAxiosRequestConfig;

cancelRequest(config);
```

### 2) 可取消请求（推荐）

`requestWithCancel` 会为同 key 请求自动覆盖旧请求并保留新请求。

```typescript
import type { InternalAxiosRequestConfig } from 'axios';
import { requestWithCancel, cancelRequest } from '~/req';

const config = { url: '/users', method: 'get' as const };
const promise = requestWithCancel<{ list: unknown[] }>(config);

// 需要时取消
cancelRequest(config as InternalAxiosRequestConfig);

const data = await promise;
```

### 3) 取消全部请求

```typescript
import { useEffect } from 'react';
import { cancelAllRequests } from '~/req';

useEffect(() => {
  return () => {
    cancelAllRequests();
  };
}, []);
```

## 响应与错误处理说明

当前实现不会自动把响应“解包”为业务数据，`request.get/post/...` 返回的是 Axios 原始响应对象。

```typescript
const res = await request.get('/users');
// res 是 AxiosResponse
console.log(res.data);
```

`requestWithCancel` 返回的是 `response.data`。

```typescript
const data = await requestWithCancel({ url: '/users', method: 'get' });
```

当前实现对错误处理的实际行为：

- 会移除重复请求追踪表中的 key
- `401` 和 `403` 执行页面跳转逻辑
- 其余错误透传（`Promise.reject(error)`）

注意：当前拦截器未把 Axios 错误统一转换为 `HttpError`，`types.ts` 中 `HttpError` 是可复用类型定义。

## 基础配置

`utils.ts` 中实例默认配置：

```typescript
axios.create({
  baseURL: baseURL || getBaseURL(),
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

`getBaseURL()` 当前逻辑：

- `NODE_ENV === 'qa'` 时返回 `/unifyplatform-backend-qa`
- 其他环境返回空字符串 `''`

## 类型定义

```typescript
export interface ApiResponse<T = unknown> {
  data: T;
  result: 'success' | 'error';
  message?: string;
  [key: string]: unknown;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T = unknown> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## 相关文件

- 入口：`src/req/index.ts`
- 拦截器：`src/req/interceptors.ts`
- 工具与实例：`src/req/utils.ts`
- 请求配置：`src/req/req.config.ts`
- 类型定义：`src/req/types.ts`
- 使用示例：`src/req/example.ts`

---

最后更新：2026-08-10
维护者：leon.wang
