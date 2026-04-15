# API Demo 页面

这是一个完整的演示页面，展示了 `~/req` HTTP 请求封装的所有核心功能。

## 📋 页面结构

```
ApiDemo/
├── index.tsx         # 主页面组件
├── index.scss        # 页面样式
├── api.ts            # 模拟 API 接口
├── types.ts          # TypeScript 类型定义
├── locales/          # 国际化资源
│   ├── zh.ts         # 中文翻译
│   └── en.ts         # 英文翻译
└── README.md         # 本文档
```

## ✨ 功能演示

### 1. 基础列表请求（自动执行）
- ✅ 自动发起请求
- ✅ Loading 状态管理
- ✅ 错误处理
- ✅ 刷新功能

### 2. 手动触发请求
- ✅ 手动触发加载
- ✅ 请求参数传递
- ✅ 结果展示

### 3. 创建用户（POST 请求）
- ✅ POST 请求演示
- ✅ 成功后自动刷新列表
- ✅ 错误提示

### 4. 搜索（防抖）
- ✅ 实时搜索
- ✅ 500ms 防抖延迟
- ✅ 避免频繁请求

### 5. 并发请求
- ✅ 同时发起多个请求
- ✅ Promise.all 处理
- ✅ 提高加载效率

### 6. 重试机制
- ✅ 自动重试失败的请求
- ✅ 最多重试 3 次
- ✅ 模拟不稳定 API（50% 失败率）

### 7. 轮询请求
- ✅ 定时轮询数据
- ✅ 3 秒轮询间隔
- ✅ 可启动/停止

## 🎯 使用的技术

- **ahooks**: useRequest Hook 管理请求状态
- **Neat Design**: UI 组件库
- **i18next**: 国际化支持
- **TypeScript**: 完整的类型安全

## 📖 代码示例

### 基础用法

```typescript
const { data, loading, error, refresh } = useRequest(
  async () => {
    const res = await demoApi.getList({ page: 1, pageSize: 10 });
    return res.data.data;
  }
);
```

### 手动触发

```typescript
const { data, loading, run } = useRequest(
  async (id: string) => {
    const res = await demoApi.getDetail(id);
    return res.data.data;
  },
  { manual: true }
);
```

### 防抖搜索

```typescript
const { data, loading, run } = useRequest(
  async (keyword: string) => {
    const res = await demoApi.search(keyword);
    return res.data.data;
  },
  {
    manual: true,
    debounceWait: 500,
  }
);
```

### 重试请求

```typescript
const { loading, run } = useRequest(
  async () => {
    const res = await demoApi.unstableApi();
    return res.data.data;
  },
  {
    manual: true,
    retryCount: 3,
  }
);
```

### 轮询请求

```typescript
const { data, run, cancel } = useRequest(
  async () => {
    const res = await demoApi.getStats();
    return res.data.data;
  },
  {
    manual: true,
    pollingInterval: 3000,
    pollingWhenHidden: false,
  }
);
```

## 🔍 模拟 API

所有 API 都是模拟的，使用 `setTimeout` 模拟网络延迟：

- `getList`: 800ms 延迟
- `getDetail`: 600ms 延迟
- `create`: 1000ms 延迟
- `search`: 500ms 延迟
- `getStats`: 400ms 延迟
- `getConfig`: 300ms 延迟
- `unstableApi`: 800ms 延迟 + 50% 失败率

## 📱 访问路径

菜单路径：**接口请求 > API 示例**

URL: `/app/api-request/api-demo`

## 💡 学习要点

1. **useRequest 的基本用法**: 自动管理 loading、error、data 状态
2. **manual 模式**: 手动触发请求
3. **debounceWait**: 防抖处理，避免频繁请求
4. **retryCount**: 自动重试失败的请求
5. **pollingInterval**: 轮询请求，实时更新数据
6. **Promise.all**: 并发请求，提高效率
7. **onSuccess/onError**: 请求成功/失败的回调
8. **国际化**: 使用 i18next 支持多语言

## 🚀 扩展建议

你可以基于这个演示页面，创建更多的功能演示：

- 文件上传/下载
- 请求取消
- 请求缓存
- 乐观更新
- 分页加载
- 无限滚动

---

**创建日期**: 2026-04-15
**作者**: leon.wang
