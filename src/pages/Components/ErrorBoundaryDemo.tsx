/**
 * @file pages/Components/ErrorBoundaryDemo.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Card, Button, Space, Alert, Divider } from '@derbysoft/neat-design';
import { BugOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '~/components/ErrorBoundary';
import './ErrorBoundaryDemo.scss';

/**
 * Component that throws an error
 */
const BuggyComponent: FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('💥 组件崩溃了！这是一个测试错误。');
  }
  return <div className="buggy-component">✅ 组件正常运行</div>;
};

/**
 * Component that throws async error
 */
const AsyncBuggyComponent: FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  React.useEffect(() => {
    if (shouldThrow) {
      // Simulate async error
      setTimeout(() => {
        throw new Error('💥 异步错误！这是在 useEffect 中抛出的错误。');
      }, 100);
    }
  }, [shouldThrow]);

  return (
    <div>
      <Button danger onClick={() => setShouldThrow(true)}>
        触发异步错误
      </Button>
      {shouldThrow && <div>等待错误...</div>}
    </div>
  );
};

/**
 * Error Boundary demo page
 * Demonstrates various use cases of ErrorBoundary component
 */
const ErrorBoundaryDemo: FC = () => {
  const [showBuggy1, setShowBuggy1] = useState(false);
  const [showBuggy2, setShowBuggy2] = useState(false);
  const [showBuggy3, setShowBuggy3] = useState(false);

  return (
    <div className="error-boundary-demo">
      <h1>ErrorBoundary 错误边界组件</h1>

      <Alert
        message="什么是错误边界？"
        description="错误边界是 React 组件，用于捕获其子组件树中的 JavaScript 错误，记录错误，并显示备用 UI，而不是让整个组件树崩溃。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* Example 1: Basic Usage */}
      <Card title="示例 1：基础用法" className="error-boundary-demo__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <p>当子组件抛出错误时，错误边界会捕获并显示备用 UI。</p>
            <Button
              type="primary"
              danger
              icon={<BugOutlined />}
              onClick={() => setShowBuggy1(true)}
            >
              触发错误
            </Button>
          </div>

          <ErrorBoundary>
            <div className="error-boundary-demo__test-area">
              <BuggyComponent shouldThrow={showBuggy1} />
            </div>
          </ErrorBoundary>
        </Space>
      </Card>

      {/* Example 2: Custom Fallback */}
      <Card title="示例 2：自定义备用 UI" className="error-boundary-demo__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <p>可以提供自定义的备用 UI 来替代默认的错误页面。</p>
            <Button
              type="primary"
              danger
              icon={<BugOutlined />}
              onClick={() => setShowBuggy2(true)}
            >
              触发错误
            </Button>
          </div>

          <ErrorBoundary
            fallback={
              <Alert
                message="自定义错误提示"
                description="这是一个自定义的错误备用 UI"
                type="error"
                showIcon
                action={
                  <Button size="small" danger onClick={() => setShowBuggy2(false)}>
                    重置
                  </Button>
                }
              />
            }
          >
            <div className="error-boundary-demo__test-area">
              <BuggyComponent shouldThrow={showBuggy2} />
            </div>
          </ErrorBoundary>
        </Space>
      </Card>

      {/* Example 3: Error Callback */}
      <Card title="示例 3：错误回调" className="error-boundary-demo__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <p>可以通过 onError 回调来记录错误信息到日志服务。</p>
            <Button
              type="primary"
              danger
              icon={<BugOutlined />}
              onClick={() => setShowBuggy3(true)}
            >
              触发错误
            </Button>
          </div>

          <ErrorBoundary
            onError={(error, errorInfo) => {
              // eslint-disable-next-line no-console
              console.log('📝 记录错误到服务:', {
                error: error.message,
                componentStack: errorInfo.componentStack,
              });
            }}
            errorTitle="组件出错"
            errorSubtitle="错误已记录到日志系统"
          >
            <div className="error-boundary-demo__test-area">
              <BuggyComponent shouldThrow={showBuggy3} />
            </div>
          </ErrorBoundary>
        </Space>
      </Card>

      {/* Example 4: Nested Error Boundaries */}
      <Card title="示例 4：嵌套错误边界" className="error-boundary-demo__card">
        <p>可以在不同层级使用多个错误边界，只有最近的边界会捕获错误。</p>
        <Divider />
        <ErrorBoundary errorTitle="外层错误边界">
          <div className="error-boundary-demo__nested">
            <h4>外层区域</h4>
            <ErrorBoundary errorTitle="内层错误边界">
              <div className="error-boundary-demo__nested-inner">
                <h4>内层区域</h4>
                <BuggyComponent shouldThrow={false} />
              </div>
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      </Card>

      {/* Warning about async errors */}
      <Card title="⚠️ 注意事项" className="error-boundary-demo__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="错误边界无法捕获以下错误："
            description={
              <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                <li>事件处理器中的错误（使用 try-catch）</li>
                <li>异步代码（setTimeout、Promise 等）</li>
                <li>服务端渲染的错误</li>
                <li>错误边界自身抛出的错误</li>
              </ul>
            }
            type="warning"
            showIcon
          />

          <div>
            <p>
              <strong>示例：异步错误（无法被捕获）</strong>
            </p>
            <ErrorBoundary>
              <AsyncBuggyComponent />
            </ErrorBoundary>
            <Alert
              message="异步错误不会被错误边界捕获，需要在代码中使用 try-catch 或 Promise.catch() 处理"
              type="info"
              style={{ marginTop: 12 }}
            />
          </div>
        </Space>
      </Card>

      {/* Best Practices */}
      <Card title="💡 最佳实践" className="error-boundary-demo__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <h4>1. 粒度控制</h4>
            <p>在关键区域使用错误边界，如：</p>
            <ul>
              <li>路由级别（每个页面一个错误边界）</li>
              <li>独立功能模块</li>
              <li>第三方组件</li>
            </ul>
          </div>

          <div>
            <h4>2. 错误上报</h4>
            <p>在生产环境中，使用 onError 回调将错误发送到监控服务：</p>
            <pre className="error-boundary-demo__code">
              {`<ErrorBoundary
  onError={(error, errorInfo) => {
    // 发送到 Sentry、LogRocket 等服务
    logErrorToService({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }}
>
  <YourComponent />
</ErrorBoundary>`}
            </pre>
          </div>

          <div>
            <h4>3. 用户友好的提示</h4>
            <p>提供清晰的错误信息和恢复操作按钮，如重新加载、返回首页等。</p>
          </div>

          <div>
            <h4>4. 开发环境调试</h4>
            <p>在开发环境显示详细的错误堆栈，方便调试。</p>
          </div>
        </Space>
      </Card>

      {/* Code Examples */}
      <Card title="📝 使用示例" className="error-boundary-demo__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <h4>基础用法</h4>
            <pre className="error-boundary-demo__code">
              {`import { ErrorBoundary } from '~/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>`}
            </pre>
          </div>

          <div>
            <h4>自定义备用 UI</h4>
            <pre className="error-boundary-demo__code">
              {`<ErrorBoundary
  fallback={<div>自定义错误页面</div>}
>
  <YourComponent />
</ErrorBoundary>`}
            </pre>
          </div>

          <div>
            <h4>动态备用 UI</h4>
            <pre className="error-boundary-demo__code">
              {`<ErrorBoundary
  fallback={(error, errorInfo) => (
    <div>
      <h2>出错了</h2>
      <details>
        <summary>错误详情</summary>
        <pre>{error.message}</pre>
      </details>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>`}
            </pre>
          </div>

          <div>
            <h4>配置选项</h4>
            <pre className="error-boundary-demo__code">
              {`<ErrorBoundary
  errorTitle="自定义标题"
  errorSubtitle="自定义副标题"
  showDetails={true}
  showReload={true}
  showHome={true}
  homePath="/dashboard"
  onError={(error, errorInfo) => {
    console.log('Error:', error);
  }}
>
  <YourComponent />
</ErrorBoundary>`}
            </pre>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ErrorBoundaryDemo;
