# HTTP 请求封装（req）

基于 Axios 的请求模块，提供：

- 统一 Axios 实例
- 重复请求拦截（按请求头启用）
- 句柄式请求取消能力（推荐）
- 401/403 响应处理

## 目录结构

```text
src/req/
├── index.ts         # 模块入口与导出
├── interceptors.ts  # 请求/响应拦截器
├── req.config.ts    # 请求相关配置
├── types.ts         # 通用类型定义
├── utils.ts         # 工具方法
├── example.ts       # 使用示例
└── README.md
```

## 快速开始

```ts
import request from '~/req';

const fetchUsers = async () => {
  const res = await request.get('/users');
  return res.data;
};
```

## 导出能力

### 1) 默认实例

默认导出的 `request` 已扩展以下方法：

- request.getCancelable
- request.postCancelable
- request.putCancelable
- request.deleteCancelable
- request.createCancelableRequest

```ts
import request from '~/req';

const handle = request.getCancelable('/users', {
  params: { page: 1, pageSize: 20 },
});

// 直接取消，不需要重建 config
handle.cancel();

await handle.promise;
```

### 2) 命名导出

- createCancelableRequest(config)
- getCancelable(url, config?)
- postCancelable(url, data?, config?)
- putCancelable(url, data?, config?)
- deleteCancelable(url, config?)
- cancelRequest(config)
- cancelAllRequests()

```ts
import {
  getCancelable,
  postCancelable,
  putCancelable,
  deleteCancelable,
} from '~/req';

await getCancelable('/users', { params: { page: 1, pageSize: 20 } }).promise;
await postCancelable('/users', { username: 'john' }).promise;
await putCancelable('/users/1', { username: 'john-updated' }).promise;
await deleteCancelable('/users/1').promise;
```

## 取消请求

### 1) 推荐：句柄式取消

```ts
import { getCancelable } from '~/req';

const handle = getCancelable('/users', {
  params: { page: 1, pageSize: 100 },
});

handle.cancel();
await handle.promise;
```

### 2) 通过 config 手动取消

```ts
import { createCancelableRequest, cancelRequest } from '~/req';

const config = {
  url: '/users',
  method: 'get' as const,
  params: { page: 1, pageSize: 100 },
};

const handle = createCancelableRequest(config);

cancelRequest(config);
await handle.promise;
```

### 3) 组件卸载时取消全部请求

```ts
import { useEffect } from 'react';
import { cancelAllRequests } from '~/req';

useEffect(() => {
  return () => {
    cancelAllRequests();
  };
}, []);
```

## 重复请求拦截

重复请求拦截默认不启用，需要在请求头中显式传入：

```ts
import request from '~/req';
import { preventDuplicateRequestHeader } from '~/config';

await request.get('/users', {
  params: { page: 1, pageSize: 20 },
  headers: {
    ...preventDuplicateRequestHeader,
  },
});
```

- 启用条件：请求头包含 Prevent-Duplicate-Request: true
- 判重 key：method + url + params + data（稳定序列化）
- 命中重复时：请求会被 reject，并附带
  - isDuplicateRequest: true
  - requestKey: string

## 响应与错误处理

- request.get/post/put/delete 返回 AxiosResponse
- createCancelableRequest/getCancelable/postCancelable/putCancelable/deleteCancelable 返回 { key, promise, cancel }
- 401：根据响应头 location 跳转（且不在免校验路径时）
- 403：跳转到 /nav/no-permission

## 类型导出

模块导出以下类型/类：

- ApiResponse
- PaginationParams
- PaginationResponse
- HttpError
- HttpErrorType

## 参考示例

完整示例请查看 src/req/example.ts。

---

最后更新：2026-08-10
维护者：leon.wang
