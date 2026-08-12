# useTable Hook

`useTable` 是对 `ahooks` 的 `useAntdTable` 进行封装的通用列表表格 Hook，统一处理分页、筛选参数、表单值转换、响应结构转换和错误处理。

## 作用

适用于大多数后台列表页场景，特点包括：

- 自动管理分页参数
- 自动合并表单筛选条件
- 支持排序参数转换
- 统一处理成功与失败返回结构
- 支持自定义 `useAntdTable` 配置项
- 统一给表格注入 `loading`、`pagination` 和 `scroll`

## 文件位置

- `src/hooks/useTable.tsx`

## 基础用法

```tsx
import React from 'react';
import { Table } from '@derbysoft/neat-design';
import useTable from '~/hooks/useTable';

const fetchList = (params: Record<string, any>) => {
  return request.get('/api/list', { params });
};

const DemoPage = () => {
  const { tableProps, form, submit } = useTable(fetchList);

  return (
    <div>
      <Form form={form} onFinish={submit} layout="inline">
        <Form.Item name="keyword">
          <Input placeholder="Search" />
        </Form.Item>
        <Button onClick={submit}>Search</Button>
      </Form>

      <Table
        {...tableProps}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};
```

## 参数说明

### 1) request

列表请求函数，签名如下：

```ts
(data: ObjectType) => AxiosPromise<ResponseDataType>
```

它接收的参数会自动组装为：

```ts
{
  pageNum: current - 1,
  pageSize,
  ...filterParams,
  sorts: [...],
}
```

### 2) formValuesTransform

可选。用于在提交筛选表单前转成后端需要的参数结构：

```tsx
const formValuesTransform = (values) => ({
  keyword: values.keyword,
  status: values.status,
  beginDate: values.beginDate,
  endDate: values.endDate,
});
```

### 3) responseDataTransform

可选。用于把后端返回结构转换成 `list` + `total` 的统一格式：

```tsx
const responseDataTransform = (data) => ({
  list: data.records,
  total: data.total,
});
```

### 4) options

可选。传入 `useAntdTable` 的第二个参数配置，支持覆盖默认行为：

```tsx
const { tableProps } = useTable(request, undefined, undefined, {
  debounceWait: 500,
  defaultPageSize: 20,
  onSuccess: () => {
    console.log('request success');
  },
  onFinally: () => {
    console.log('request finished');
  },
});
```

## 默认行为

默认配置中，hook 已内置：

```ts
{
  debounceWait: 400,
  form,
  onFinally() {
    setLoading(false);
  },
}
```

并且在返回值中，统一补充：

```ts
{
  loading,
  pagination,
  scroll: { x: 'max-content' },
}
```

## 返回值

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

### 说明

- `tableProps`: 直接透传给 `Table` 组件
- `form`: 表单实例，可用于构造筛选表单
- `submit`: 提交筛选表单
- `reset`: 重置筛选条件
- `type`: 当前查询类型
- `changeType`: 切换查询类型

## 常见使用场景

### 1. 列表页 + 查询表单

```tsx
const { tableProps, form, submit } = useTable(fetchList);
```

### 2. 自定义筛选参数

```tsx
const { tableProps } = useTable(
  fetchList,
  (values) => ({
    keyword: values.keyword,
    state: values.state,
  }),
);
```

### 3. 自定义返回结果结构

```tsx
const { tableProps } = useTable(
  fetchList,
  undefined,
  (data) => ({
    list: data.items,
    total: data.page.total,
  }),
);
```

### 4. 覆盖默认请求配置

```tsx
const { tableProps } = useTable(fetchList, undefined, undefined, {
  debounceWait: 300,
  defaultPageSize: 30,
});
```

## 注意事项

1. `request` 函数应返回后端统一结果结构，或配合 `responseDataTransform` 做转换。
2. `formValuesTransform` 适合把表单数据转换成接口参数。
3. `options` 只用于覆盖 `useAntdTable` 的配置，不会覆盖表单实例和 loading 封装逻辑。
4. 如果后端返回结构与默认 `result === 'success'` 格式不一致，需要自行处理 `responseDataTransform`。

## 示例：完整列表页

```tsx
import React from 'react';
import { Button, Form, Input, Table } from '@derbysoft/neat-design';
import useTable from '~/hooks/useTable';

const fetchList = (params) => request.get('/api/users', { params });

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const UserListPage = () => {
  const { tableProps, form, submit } = useTable(fetchList, undefined, undefined, {
    debounceWait: 300,
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

## 结论

`useTable` 适合统一后台列表页业务代码，避免每个页面重复实现分页、筛选、转换和错误处理逻辑。对于企业管理后台场景，它是一个高复用、低耦合的统一表格封装方案。
