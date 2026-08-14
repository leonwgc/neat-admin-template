# useTable Hook

`useTable` 是对 `ahooks` 的 `useAntdTable` 的轻量封装，用于统一管理后台列表页中的分页、表单筛选、排序参数、数据转换和请求错误处理。

## 作用

适用于多数后台列表场景，内置能力包括：

- 自动组装分页参数 `pageNum` / `pageSize`
- 自动拼接表单参数
- 支持排序参数转换 `sorts`
- 支持统一的表单参数转换和返回数据转换
- 自动注入 `loading`、`pagination`、`scroll`
- 统一处理请求异常并显示全局 `toast` / `notification`

## 文件位置

- `src/hooks/useTable.tsx`

## 当前 API 形态

```ts
const {
  tableProps,
  form,
  submit,
  reset,
  type,
  changeType,
} = useTable(request, options);
```

### 参数签名

```ts
const useTable = (
  request: (data: ObjectType) => AxiosPromise<ResponseDataType>,
  options?: Options,
) => {
  // ...
};
```

其中 `Options` 扩展自 `useAntdTable` 的原生第二个参数：

```ts
type Options = Parameters<typeof useAntdTable>[1] & {
  getFormData?: (values: ObjectType) => ObjectType;
  getResponseData?: (
    data: ObjectType | ObjectType[],
  ) => ListResult<ObjectType>;
  onBeforeRequest?: (params: ObjectType) => ObjectType;
};
```

## 默认行为

当前实现中，hook 会自动处理以下逻辑：

1. `current`、`pageSize` 和 `sorter` 组装成请求参数
2. 表单值通过 `getFormData` 转换（如果传入）
3. 请求前统一走 `onBeforeRequest`，默认直接返回原参数
4. 响应成功后，如果有 `getResponseData`，则使用它转换结果；否则默认读取：

```ts
{
  total: result.totals,
  list: result.records,
}
```

5. 请求结束后，自动设置 `loading = false`
6. 返回的 `tableProps` 自动补充：

```ts
{
  loading,
  pagination,
  scroll: { x: 'max-content' },
}
```

## 典型用法

```tsx
import React from 'react';
import { Button, Form, Input, Table } from '@derbysoft/neat-design';
import useTable from '~/hooks/useTable';

const fetchList = (params: Record<string, any>) => {
  return request.get('/api/users', { params });
};

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const UserListPage = () => {
  const { tableProps, form, submit } = useTable(fetchList, {
    debounceWait: 300,
    getFormData: (values) => ({
      keyword: values.keyword,
      status: values.status,
    }),
    getResponseData: (data) => ({
      list: data.records,
      total: data.total,
    }),
  });

  return (
    <>
      <Form form={form} layout="inline" onFinish={submit}>
        <Form.Item name="keyword">
          <Input placeholder="Search user" />
        </Form.Item>
        <Button type="primary" onClick={submit}>
          Search
        </Button>
      </Form>

      <Table {...tableProps} columns={columns} rowKey="id" />
    </>
  );
};
```

## 参数说明

### request

列表请求函数，返回值应为 axios promise：

```ts
(data: ObjectType) => AxiosPromise<ResponseDataType>
```

实际请求参数会自动编排为：

```ts
{
  pageNum: current - 1,
  pageSize,
  ...formData,
  sorts: [
    {
      direction: 'DESC' | 'ASC',
      property: sorter?.columnKey,
    },
  ],
}
```

### getFormData

可选，作用是把表单对象转为接口字段。比如：

```ts
getFormData: (values) => ({
  keyword: values.keyword,
  beginDate: values.beginDate,
  endDate: values.endDate,
  status: values.status,
})
```

### getResponseData

可选，作用是统一转换后端返回数据。比如：

```ts
getResponseData: (data) => ({
  list: data.items,
  total: data.total,
})
```

### onBeforeRequest

可选，允许在发送请求前对参数做最后加工：

```ts
onBeforeRequest: (params) => ({
  ...params,
  tenantId: 'demo-tenant',
})
```

### 其他 useAntdTable 配置项

你可以直接透传 `ahooks` 的配置，例如：

```ts
{
  debounceWait: 400,
  defaultPageSize: 20,
  onFinally: () => {
    console.log('请求结束');
  },
}
```

## 返回值说明

```ts
{
  tableProps,
  form,
  submit,
  reset,
  type,
  changeType,
}
```

说明：

- `tableProps`: 直接透传给表格组件
- `form`: 表单实例，可用于筛选条件绑定
- `submit`: 提交筛选条件
- `reset`: 重置筛选条件
- `type`: 当前查询模式
- `changeType`: 切换查询模式

## 约定

1. `request` 通常返回统一结构：

```ts
{
  data: {
    result: 'success',
    data: {...},
  },
}
```

2. 如果后端返回结构不符合默认 `result === 'success'` + `resData.totals/records` 约定，建议通过 `getResponseData` 统一转换。
3. `getFormData` 更适合把 UI 表单字段转换成接口字段，避免页面直接污染请求参数。
4. `onBeforeRequest` 更适合做统一注入，如 `tenantId`、`userId`、`traceId` 等公共参数。

## 迁移说明

旧版本的 `useTable` 形态是：

```ts
useTable(request, formValuesTransform, responseDataTransform, options)
```

当前版本已重构为：

```ts
useTable(request, options)
```

其中：

- `formValuesTransform` -> `getFormData`
- `responseDataTransform` -> `getResponseData`
- `options` 保持兼容 `useAntdTable` 原生配置

## 结论

`useTable` 适合在后台列表页中统一收敛分页、筛选、排序、转换和错误处理逻辑。该封装让页面组件只关注展示与表单绑定，减少重复代码，提高列表开发的一致性和维护效率。
