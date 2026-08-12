# useFetch Hook

`useFetch` 是对 `ahooks` 的 `useRequest` 做的一层统一封装，适合项目中所有接口请求场景。它主要用于统一处理：

- 请求成功/失败回调
- 默认错误提示
- `App.useApp()` 的通知和 Toast 能力
- 统一错误兜底逻辑
- 兼容 `AxiosPromise` 请求方式

## 文件位置

- `src/hooks/useFetch.tsx`

## 作用

这个 Hook 让页面不必在每处重复写：

- `useRequest` 的默认参数
- 错误提示逻辑
- 通知/异常处理
- 成功失败分支处理

它适用于：

- 页面初始化请求
- 表单提交
- 按钮点击请求
- 刷新/重试接口

## 基础用法

```tsx
import React from 'react';
import { Button } from '@derbysoft/neat-design';
import useFetch from '~/hooks/useFetch';
import request from '~/req';

const fetchUser = () => request.get('/api/user/info');

const UserInfo = () => {
  const { data, loading, run } = useFetch(fetchUser, {
    manual: false,
    toastDefaultError: true,
    onSuccess: (res) => {
      console.log('success', res);
    },
    onFailed: (error) => {
      console.log('logical error', error);
    },
  });

  return (
    <Button loading={loading} onClick={run}>
      Refresh
    </Button>
  );
};
```

## 参数说明

### 1) request

请求方法，类型为：

```ts
(...params) => AxiosPromise<ResponseDataType>
```

例如：

```ts
const fetchList = (params: Record<string, any>) =>
  request.get('/api/list', { params });
```

### 2) options

`options` 继承自 `ahooks` 的 `useRequest` 配置项，并新增了几个项目专用字段：

```ts
type Options = Parameters<typeof useRequest>[1] & {
  async?: boolean;
  toastDefaultError?: boolean;
  onFailed?: (data: unknown, params: unknown, res?: unknown) => void;
};
```

#### `async?: boolean`

默认值：`false`

当设置为 `true` 时，如果请求失败并触发 `onFailed`，会抛出错误，适合在外层捕获异常：

```tsx
const { run } = useFetch(fetchData, {
  async: true,
  onFailed: (error) => {
    console.error(error);
  },
});
```

#### `toastDefaultError?: boolean`

是否在默认错误场景下触发 Toast 提示。一般用于统一告警。

```tsx
const { run } = useFetch(fetchData, {
  toastDefaultError: true,
});
```

#### `onFailed?: (data, params, res) => void`

用于处理逻辑错误或业务失败场景。一般在接口返回失败状态、业务异常时调用。

```tsx
const { run } = useFetch(fetchData, {
  onFailed: (error, params, res) => {
    console.warn('业务请求失败', error, params, res);
  },
});
```

## 返回值

它本质上返回的是 `ahooks` 的 `useRequest` 返回值，例如：

```ts
{
  data,
  error,
  loading,
  cancel,
  refresh,
  run,
  mutate,
  params,
}
```

这意味着你可以直接使用 `run`、`refresh`、`loading` 等能力，不需要自己额外包一层。

## 默认行为

`useFetch` 内部已经做了一层统一处理：

1. 获取 `toast` 和 `notification` 实例
2. 在请求错误时统一调用 `errorHandler`
3. 对 5xx / 离线状态显示全局通知
4. 在 `toastDefaultError` 开启时显示默认失败 Toast
5. 调用 `options.onFailed` 或兜底错误提示

因此，这个 Hook 非常适合后台管理系统中统一的接口错误处理逻辑。

## 错误处理逻辑

下面是它的默认错误分支：

```ts
if (error.response?.status >= 500 || !navigator.onLine) {
  notification.warning({
    message: error?.message || t('common.error.defaultMessage'),
    description: t('common.error.defaultMessageTitle'),
    placement: 'bottomRight',
  });
} else {
  if (toastDefaultError) {
    toast.error('Operation failed');
  }
}
```

也就是说：

- 服务端报错或网络异常：显示通知提醒
- 普通失败：按 `toastDefaultError` 决定是否弹 Toast

## 常见用法示例

### 1. 页面初始化请求

```tsx
const { data, loading } = useFetch(fetchUser, {
  manual: false,
});
```

### 2. 提交表单

```tsx
const { run, loading } = useFetch(
  (values) => request.post('/api/user/save', values),
  {
    manual: true,
    toastDefaultError: true,
  },
);

const handleSubmit = async () => {
  await run(formValues);
};
```

### 3. 需要显式处理失败

```tsx
const { run } = useFetch(fetchOrder, {
  async: true,
  toastDefaultError: true,
  onFailed: (error) => {
    console.error('订单查询失败', error);
  },
});
```

### 4. 直接抛出异常给上层处理

```tsx
const { runAsync, loading } = useFetch(
  () => request.get('/api/order/detail'),
  {
    async: true,
    manual: true,
    toastDefaultError: true,
    onFailed: (error) => {
      console.error('请求失败', error);
    },
  },
);

const handleLoad = async () => {
  try {
    await runAsync();
  } catch (error) {
    console.error('上层捕获异常', error);
  }
};
```

当 `async: true` 时，失败会抛给调用方，适合在页面中用 `try / catch` 统一处理更复杂的业务流程。

### 5. 使用 `Promise.then` 链式处理

```tsx
const { runAsync } = useFetch(
  () => request.get('/api/user/profile'),
  {
    manual: true,
    toastDefaultError: true,
  },
);

runAsync()
  .then((res) => {
    console.log('请求成功', res);
  })
  .catch((error) => {
    console.error('请求失败', error);
  });
```

这种写法适合在不想显式写 `async/await` 的场景中，快速处理成功和失败分支。

## 注意事项

1. `useFetch` 仍然是 `useRequest` 的增强封装，不是独立的请求库。
2. `request` 函数要返回 `AxiosPromise`，否则可能无法触发统一错误处理。
3. 如果页面有特殊错误提示需求，建议在 `options.onFailed` 中自行覆盖默认行为。
4. `toastDefaultError` 适合统一全局提示，但某些页面可能需要更具体的提示文案。

## 建议

在项目中，统一使用 `useFetch` 替代直接调用 `useRequest`，能避免各个页面反复实现类似的错误处理逻辑，提升一致性和维护性。

如果是简单数据请求，推荐直接使用 `useFetch`；如果需求较复杂、需要更细粒度的分页与表单联动，通常再结合 `useTable` 这类更业务化的封装。
