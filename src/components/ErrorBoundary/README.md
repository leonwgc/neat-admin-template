/**
 * @file components/ErrorBoundary/README.md
 * @author leon.wang
 */

# ErrorBoundary 错误边界组件

## 📋 概述

ErrorBoundary 是一个 React 类组件，用于捕获其子组件树中的 JavaScript 错误，记录错误并显示备用 UI，防止整个应用崩溃。

## ✨ 功能特性

- ✅ 捕获子组件树中的 React 渲染错误
- ✅ 显示用户友好的错误页面
- ✅ 支持自定义备用 UI
- ✅ 开发环境显示详细错误堆栈
- ✅ 提供错误回调用于日志上报
- ✅ 支持重新加载、返回首页等恢复操作

## 🚀 基础用法

### 简单使用

```tsx
import { ErrorBoundary } from '~/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 在路由级别使用（推荐）

```tsx
// App.tsx
import { ErrorBoundary } from '~/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <RouteConfig />
    </ErrorBoundary>
  );
};
```

### 在独立模块使用

```tsx
<ErrorBoundary errorTitle="功能模块错误">
  <ComplexFeatureModule />
</ErrorBoundary>
```

## 📖 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | 子组件 |
| `fallback` | `ReactNode \| ((error, errorInfo) => ReactNode)` | - | 自定义备用 UI |
| `onError` | `(error: Error, errorInfo: ErrorInfo) => void` | - | 错误回调函数 |
| `showDetails` | `boolean` | `process.env.NODE_ENV === 'development'` | 是否显示错误详情 |
| `errorTitle` | `string` | `'页面出错了'` | 错误标题 |
| `errorSubtitle` | `string` | `'抱歉，页面遇到了一些问题'` | 错误副标题 |
| `showReload` | `boolean` | `true` | 是否显示重新加载按钮 |
| `showHome` | `boolean` | `true` | 是否显示返回首页按钮 |
| `homePath` | `string` | `'/'` | 首页路径 |

## 💡 使用场景

### 1. 全局错误捕获

在应用顶层使用，捕获所有未处理的错误：

```tsx
// src/App.tsx
import { ErrorBoundary } from '~/components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 发送到错误监控服务
        logErrorToService({ error, errorInfo });
      }}
    >
      <Routes>
        {/* 路由配置 */}
      </Routes>
    </ErrorBoundary>
  );
};
```

### 2. 自定义备用 UI

```tsx
<ErrorBoundary
  fallback={
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>😵 出错了</h2>
      <p>我们正在处理这个问题</p>
      <Button onClick={() => window.location.reload()}>
        刷新页面
      </Button>
    </div>
  }
>
  <YourComponent />
</ErrorBoundary>
```

### 3. 动态备用 UI

根据错误信息显示不同的 UI：

```tsx
<ErrorBoundary
  fallback={(error, errorInfo) => {
    if (error.message.includes('网络')) {
      return <NetworkErrorPage />;
    }
    if (error.message.includes('权限')) {
      return <PermissionErrorPage />;
    }
    return <GenericErrorPage error={error} />;
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### 4. 错误日志上报

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // 上报到 Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    // 上报到自定义服务
    fetch('/api/log-error', {
      method: 'POST',
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }),
    });
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### 5. 嵌套错误边界

在不同层级使用多个错误边界：

```tsx
<ErrorBoundary errorTitle="应用错误">
  <Header />
  <ErrorBoundary errorTitle="侧边栏错误">
    <Sidebar />
  </ErrorBoundary>
  <ErrorBoundary errorTitle="内容区错误">
    <MainContent />
  </ErrorBoundary>
  <Footer />
</ErrorBoundary>
```

## ⚠️ 限制

ErrorBoundary **无法**捕获以下错误：

1. **事件处理器中的错误**
   ```tsx
   // ❌ 无法捕获
   <Button onClick={() => {
     throw new Error('点击错误');
   }}>
     点击
   </Button>

   // ✅ 需要使用 try-catch
   <Button onClick={() => {
     try {
       riskyOperation();
     } catch (error) {
       handleError(error);
     }
   }}>
     点击
   </Button>
   ```

2. **异步代码中的错误**
   ```tsx
   // ❌ 无法捕获
   useEffect(() => {
     setTimeout(() => {
       throw new Error('异步错误');
     }, 1000);
   }, []);

   // ✅ 需要使用 try-catch 或 Promise.catch
   useEffect(() => {
     setTimeout(() => {
       try {
         riskyOperation();
       } catch (error) {
         handleError(error);
       }
     }, 1000);
   }, []);
   ```

3. **服务端渲染（SSR）的错误**

4. **错误边界自身抛出的错误**

## 🎯 最佳实践

### 1. 粒度控制

使用合适的错误边界粒度：

- **粗粒度**：应用级别，捕获所有错误
- **中粒度**：页面级别，每个路由一个错误边界
- **细粒度**：组件级别，关键功能模块使用独立错误边界

```tsx
// 应用级别
<ErrorBoundary>
  <App />
</ErrorBoundary>

// 页面级别
<Route path="/dashboard" element={
  <ErrorBoundary>
    <Dashboard />
  </ErrorBoundary>
} />

// 组件级别
<ErrorBoundary errorTitle="图表加载失败">
  <ComplexChart />
</ErrorBoundary>
```

### 2. 错误监控集成

与第三方错误监控服务集成：

```tsx
import * as Sentry from '@sentry/react';

<ErrorBoundary
  onError={(error, errorInfo) => {
    // Sentry
    Sentry.captureException(error, {
      contexts: { react: { componentStack: errorInfo.componentStack } },
    });

    // LogRocket
    LogRocket.captureException(error, {
      tags: { section: 'payment' },
      extra: { componentStack: errorInfo.componentStack },
    });
  }}
>
  <PaymentWidget />
</ErrorBoundary>
```

### 3. 用户体验优化

提供清晰的错误信息和恢复路径：

```tsx
<ErrorBoundary
  errorTitle="支付模块暂时不可用"
  errorSubtitle="我们正在修复这个问题，请稍后再试"
  fallback={(error) => (
    <Result
      status="error"
      title="支付失败"
      subTitle={error.message}
      extra={[
        <Button type="primary" onClick={retryPayment}>
          重试支付
        </Button>,
        <Button onClick={contactSupport}>
          联系客服
        </Button>,
      ]}
    />
  )}
>
  <PaymentForm />
</ErrorBoundary>
```

### 4. 开发环境调试

开发环境显示详细错误信息：

```tsx
<ErrorBoundary
  showDetails={process.env.NODE_ENV === 'development'}
  onError={(error, errorInfo) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.group('🐛 Error Boundary Caught:');
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      // eslint-disable-next-line no-console
      console.error('Component Stack:', errorInfo.componentStack);
      // eslint-disable-next-line no-console
      console.groupEnd();
    }
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## 📊 错误统计示例

```tsx
// 创建错误统计中间件
let errorCount = 0;
const errorStats = new Map();

const logError = (error: Error) => {
  errorCount++;
  const errorKey = error.message;
  errorStats.set(errorKey, (errorStats.get(errorKey) || 0) + 1);

  // eslint-disable-next-line no-console
  console.log(`Total errors: ${errorCount}`);
  // eslint-disable-next-line no-console
  console.log('Error stats:', Object.fromEntries(errorStats));
};

<ErrorBoundary onError={(error) => logError(error)}>
  <YourApp />
</ErrorBoundary>
```

## 🔗 相关资源

- [React 官方文档 - Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [演示页面](http://localhost:3002/app/components/error-boundary)
- [Sentry 错误监控](https://sentry.io/)
- [LogRocket 日志服务](https://logrocket.com/)

## 📝 示例代码

完整的使用示例请参考：[ErrorBoundaryDemo.tsx](../../pages/Components/ErrorBoundaryDemo.tsx)

---

**提示**：访问 `/app/components/error-boundary` 查看交互式演示和更多示例。
