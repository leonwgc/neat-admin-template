# usePageFilters Hook

`usePageFilters` 适用于后台列表页中的“筛选条件 + 分页参数 + URL 同步”场景。它把表单值、分页状态和地址栏参数统一管理，能够在刷新页面、前进后退以及列表筛选时保持状态一致。

## 作用

这个 Hook 主要解决下面几类问题：

- 列表筛选条件需要同步到 URL，便于分享和回退
- 表单值和 URL 参数之间要保持双向转换
- 分页参数 `current` / `pageSize` 需要一起维护
- 请求发起前需要把表单值转成接口参数
- 请求成功后要把分页/筛选状态写回 URL

它结合了：

- `antd` 的 `Form.useForm()`
- `@ahooksjs/use-url-state` 的 URL 状态同步
- 项目中常见的分页列表请求模式

## 文件位置

- `src/hooks/usePageFilters.ts`

## API 说明

```ts
const result = usePageFilters<UrlState, FormValues>(options);
```

### 参数类型

```ts
export interface PageFilterUrlState {
  current: string | number;
  pageSize: string | number;
}

export interface PageFiltersOptions<UrlState extends PageFilterUrlState, FormValues> {
  initialState: UrlState;
  urlToFormValues: (state: Partial<UrlState>) => FormValues;
  formValuesToUrl: (values: Partial<FormValues>) => Partial<UrlState>;
  formValuesToRequest?: (values: FormValues) => ObjectType;
  requestToUrl?: (data: ObjectType) => Partial<UrlState>;
}
```

### 1) initialState

默认的 URL 状态值。通常包含分页参数和筛选参数，例如：

```ts
const initialState = {
  current: '1',
  pageSize: '10',
  keyword: '',
  status: 'all',
};
```

### 2) urlToFormValues

把 URL 中的状态转换成表单值，用于表单初始化：

```ts
urlToFormValues: (state) => ({
  keyword: state.keyword ?? '',
  status: state.status ?? 'all',
})
```

### 3) formValuesToUrl

当表单值变化时，把新值同步回 URL：

```ts
formValuesToUrl: (values) => ({
  keyword: values.keyword,
  status: values.status,
  current: '1',
})
```

### 4) formValuesToRequest

可选。把 UI 表单字段转换成接口请求参数：

```ts
formValuesToRequest: (values) => ({
  keyword: values.keyword,
  status: values.status,
})
```

### 5) requestToUrl

可选。请求返回后，把服务端返回的分页信息写回 URL：

```ts
requestToUrl: (data) => ({
  current: String((Number(data.pageNum) || 0) + 1),
  pageSize: String(data.pageSize ?? 10),
})
```

## 返回值

```ts
export interface PageFiltersResult<UrlState extends PageFilterUrlState, FormValues> {
  form: FormInstance;
  urlState: Partial<UrlState>;
  setUrlState: (
    state: SetStateAction<Partial<UrlState>>,
  ) => void;
  formValues: FormValues;
  defaultParams: [ObjectType, FormValues];
  getFormData: (values: ObjectType) => ObjectType;
  onBeforeRequest: (data: ObjectType) => ObjectType;
  onValuesChange: (
    changedValues: Partial<FormValues>,
    allValues: FormValues,
  ) => void;
}
```

### 关键字段说明

#### form

表单实例，常用于绑定 Ant Design 的 `Form` 组件。

#### urlState

当前 URL 中的状态对象，通常包含分页和筛选条件。

#### setUrlState

手动更新 URL 状态的方法，可直接写入新的查询参数。

#### formValues

由 `urlToFormValues` 计算后的表单值，通常用于页面展示和表单默认值。

#### defaultParams

默认请求参数，组合了分页参数和当前表单值：

```ts
[
  {
    current: Number(urlState.current) || 1,
    pageSize: Number(urlState.pageSize) || 10,
  },
  formValues,
]
```

#### getFormData

把表单值转换成接口参数，通常用于 `useTable` / `useRequest` 的请求参数处理。

#### onBeforeRequest

在请求前统一写回分页数据到 URL，并保留当前请求的分页状态。

```ts
setUrlState((previous) => ({
  ...previous,
  ...(options.requestToUrl?.(data) ?? {}),
  current: String((Number(data.pageNum) || 0) + 1),
  pageSize: String(data.pageSize ?? 10),
}));
```

#### onValuesChange

当表单字段发生变化时，自动把最新表单值同步回 URL：

```ts
setUrlState((previous) => ({
  ...previous,
  ...options.formValuesToUrl(allValues),
}));
```

## 工作机制

这个 Hook 内部遵循一个简单的状态流：

1. 读取 URL 中的查询参数
2. 通过 `urlToFormValues` 转成表单值
3. 表单值变化时，使用 `formValuesToUrl` 再写回 URL
4. 请求发送前，用 `getFormData` / `onBeforeRequest` 做转换和同步
5. 分页数据更新后，URL 状态继续保持最新

这样做的好处是：

- 刷新页面不会丢失查询条件
- 地址栏参数即是查询条件快照
- 组件之间无需额外共享状态
- 列表页的查询状态比较稳定、可回退

## 典型用法

```tsx
import React from 'react';
import { Form, Input, Select, Button } from '@derbysoft/neat-design';
import usePageFilters from '~/hooks/usePageFilters';

const initialState = {
  current: '1',
  pageSize: '10',
  keyword: '',
  status: 'all',
};

const UserPage = () => {
  const {
    form,
    formValues,
    defaultParams,
    getFormData,
    onBeforeRequest,
    onValuesChange,
  } = usePageFilters({
    initialState,
    urlToFormValues: (state) => ({
      keyword: state.keyword ?? '',
      status: state.status ?? 'all',
    }),
    formValuesToUrl: (values) => ({
      keyword: values.keyword ?? '',
      status: values.status ?? 'all',
      current: '1',
    }),
    formValuesToRequest: (values) => ({
      keyword: values.keyword,
      status: values.status,
    }),
    requestToUrl: (data) => ({
      current: String((Number(data.pageNum) || 0) + 1),
      pageSize: String(data.pageSize ?? 10),
    }),
  });

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formValues}
    >
      <Form.Item name="keyword">
        <Input placeholder="请输入关键词" />
      </Form.Item>

      <Form.Item name="status">
        <Select
          options={[
            { label: '全部', value: 'all' },
            { label: '启用', value: 'enabled' },
            { label: '禁用', value: 'disabled' },
          ]}
        />
      </Form.Item>

      <Button onClick={() => console.log(defaultParams, getFormData(formValues))}>
        查询
      </Button>
    </Form>
  );
};
```

## 和 useTable 的配合方式

这个 Hook 最常见的用法是和列表查询 hook 一起使用：

```tsx
const filters = usePageFilters({
  initialState: {
    current: '1',
    pageSize: '10',
    keyword: '',
  },
  urlToFormValues: (state) => ({
    keyword: state.keyword ?? '',
  }),
  formValuesToUrl: (values) => ({
    keyword: values.keyword ?? '',
    current: '1',
  }),
  formValuesToRequest: (values) => ({
    keyword: values.keyword,
  }),
  requestToUrl: (data) => ({
    current: String((Number(data.pageNum) || 0) + 1),
    pageSize: String(data.pageSize ?? 10),
  }),
});
```

随后将 `form`、`onValuesChange`、`getFormData` 和 `onBeforeRequest` 传给列表请求逻辑，能够实现：

- URL 反向同步表单
- 表单更新同步到地址栏
- 请求前自动注入分页信息
- 返回后继续维护分页状态

## 使用建议

1. `initialState` 中尽量保留 `current` 和 `pageSize`，否则分页状态可能丢失。
2. `urlToFormValues` 要兼容空值，避免 `undefined` 直接写入表单。
3. `formValuesToUrl` 尽量只保留查询条件，不要把临时 UI 状态也写进 URL。
4. `formValuesToRequest` 用来做跨字段转换，避免页面组件直接污染请求字段。
5. 如果列表页有多个筛选项，建议把所有筛选字段都统一收敛到一个 `UrlState` 中。

## 适用场景

适合以下页面：

- 用户列表
- 订单列表
- 退款审核
- 账户流水查询
- 报表筛选页
- 支持前进后退和地址栏恢复状态的管理后台页面

## 注意事项

- 这个 Hook 不直接发请求，它更偏向筛选状态管理和参数桥接。
- `current` 和 `pageSize` 默认都被当作字符串处理，实际业务中要注意转数字。
- `formValuesToUrl` 和 `requestToUrl` 都会对 URL 参数做同步，所以不要在同一层重复写入同名字段，否则可能造成状态覆盖。
- 如果想让地址栏中也保留更复杂的查询结构，建议在 `urlToFormValues` 中做统一归一化处理。

## 总结

`usePageFilters` 的核心价值在于：把“列表筛选状态”和“URL 查询状态”绑定起来，减少各页面手写 `setState + URL sync + request params` 的重复逻辑，提升后台管理系统的查询一致性和可分享性。
