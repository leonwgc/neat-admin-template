/**
 * @file pages/Components/ErrorTest.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Card, Button, Space, Alert } from '@derbysoft/neat-design';
import { BugOutlined } from '@ant-design/icons';
import './ErrorTest.scss';

/**
 * Error Test Page
 * Demonstrates page-level error boundary isolation
 */
const ErrorTest: FC = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  // This will trigger an error when shouldThrowError is true
  if (shouldThrowError) {
    throw new Error('💥 渲染错误测试！这是一个故意触发的页面级错误。');
  }

  const handleTriggerError = () => {
    setShouldThrowError(true);
  };

  return (
    <div className="error-test">
      <h1>🧪 ErrorBoundary 页面级隔离测试</h1>

      <Alert
        message="测试说明"
        description="点击下方按钮会触发页面错误。观察：只有当前页面会显示错误，侧边栏菜单依然可用，您可以切换到其他页面。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card title="测试页面级错误隔离" className="error-test__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="error-test__description">
            <h3>🎯 测试目标</h3>
            <ul>
              <li>验证页面级 ErrorBoundary 能正确捕获错误</li>
              <li>确认错误只影响当前页面，不影响整个应用</li>
              <li>测试侧边栏菜单是否依然可用</li>
              <li>测试错误恢复功能（重新加载、返回首页、切换页面）</li>
            </ul>
          </div>

          <div className="error-test__actions">
            <h3>🐛 触发错误</h3>
            <p>点击按钮后，当前页面会立即崩溃并显示错误页面。</p>
            <Space>
              <Button
                type="primary"
                danger
                size="large"
                icon={<BugOutlined />}
                onClick={handleTriggerError}
              >
                触发渲染错误
              </Button>
            </Space>
          </div>

          <div className="error-test__expected">
            <h3>✅ 预期结果</h3>
            <div className="error-test__expected-box">
              <p><strong>1. 当前页面显示错误 UI</strong></p>
              <p>页面内容被 ErrorBoundary 捕获，显示：</p>
              <ul>
                <li>错误标题："页面加载失败"</li>
                <li>错误描述：友好的提示信息</li>
                <li>重新加载按钮</li>
                <li>返回首页按钮</li>
                <li>重试按钮</li>
              </ul>

              <p><strong>2. 侧边栏和导航依然正常</strong></p>
              <ul>
                <li>✅ 左侧菜单可以点击</li>
                <li>✅ 顶部 Header 正常显示</li>
                <li>✅ 可以切换到其他页面</li>
                <li>✅ 其他页面完全不受影响</li>
              </ul>

              <p><strong>3. 开发环境显示详细信息</strong></p>
              <ul>
                <li>错误消息："💥 渲染错误测试！..."</li>
                <li>组件堆栈信息</li>
                <li>完整的错误堆栈</li>
              </ul>
            </div>
          </div>

          <div className="error-test__instructions">
            <h3>📋 测试步骤</h3>
            <ol>
              <li><strong>第 1 步</strong>：点击上方"触发渲染错误"按钮</li>
              <li><strong>第 2 步</strong>：观察页面显示错误 UI，但侧边栏依然可用</li>
              <li><strong>第 3 步</strong>：尝试通过侧边栏切换到其他页面（验证隔离效果）</li>
              <li><strong>第 4 步</strong>：返回本页面，点击"重新加载"按钮测试恢复功能</li>
              <li><strong>第 5 步</strong>：或点击"返回首页"按钮跳转到首页</li>
            </ol>
          </div>

          <Alert
            message="💡 提示"
            description="如果错误被正确隔离，您应该能够通过左侧菜单自由切换到用户管理、表单、Hooks 等其他页面，这些页面不会受到影响。"
            type="success"
            showIcon
          />
        </Space>
      </Card>

      <Card title="🔍 对比测试" className="error-test__card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <h4>没有页面级 ErrorBoundary 的情况</h4>
            <div className="error-test__comparison error-test__comparison--bad">
              <p>❌ 整个应用崩溃</p>
              <p>❌ 侧边栏不可用</p>
              <p>❌ 无法切换页面</p>
              <p>❌ 必须刷新整个应用</p>
            </div>
          </div>

          <div>
            <h4>有页面级 ErrorBoundary 的情况（当前实现）</h4>
            <div className="error-test__comparison error-test__comparison--good">
              <p>✅ 只有当前页面崩溃</p>
              <p>✅ 侧边栏完全可用</p>
              <p>✅ 可以切换到其他页面</p>
              <p>✅ 其他页面正常运行</p>
              <p>✅ 提供多种恢复选项</p>
            </div>
          </div>
        </Space>
      </Card>

      <Card title="🛡️ 错误隔离架构" className="error-test__card">
        <pre className="error-test__architecture">
{`┌─────────────────────────────────────────┐
│  App.tsx (全局 ErrorBoundary)          │ ← 第 1 层防护
│  ┌───────────────────────────────────┐ │
│  │  ConfigProvider                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  RouteConfig                │ │ │
│  │  │  ┌───────────────────────┐  │ │ │
│  │  │  │ /error-test           │  │ │ │ ← 当前页面
│  │  │  │ (ErrorBoundary) ❌    │  │ │ │   (第 2 层防护)
│  │  │  ├───────────────────────┤  │ │ │
│  │  │  │ /users    ✅          │  │ │ │ ← 其他页面
│  │  │  ├───────────────────────┤  │ │ │   (不受影响)
│  │  │  │ /forms    ✅          │  │ │ │
│  │  │  ├───────────────────────┤  │ │ │
│  │  │  │ /dashboard ✅         │  │ │ │
│  │  │  └───────────────────────┘  │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘

✅ = 正常运行    ❌ = 显示错误页面`}
        </pre>
      </Card>
    </div>
  );
};

export default ErrorTest;
