import { Suspense, useState, lazy } from 'react';
import { Card, Button, Space, Spin, Alert, Tabs } from '@derbysoft/neat-design';
import './UseSuspense.scss';

// 模拟一个需要加载的组件
const SlowComponent = lazy(() => {
  return new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="use-suspense__slow-content">
            <Alert
              message="组件加载完成"
              description="这是一个通过 lazy() 和 Suspense 延迟加载的组件。在加载过程中会显示 Suspense 的 fallback 内容。"
              type="success"
              showIcon
            />
            <div className="use-suspense__data">
              <h4>加载的数据：</h4>
              <ul>
                <li>用户数据已加载</li>
                <li>文章列表已加载</li>
                <li>评论数据已加载</li>
              </ul>
            </div>
          </div>
        ),
      });
    }, 2000); // 模拟 2 秒的加载时间
  });
});

// 另一个快速加载的组件
const FastComponent = lazy(() => {
  return new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="use-suspense__fast-content">
            <Alert
              message="快速组件"
              description="这个组件只需要 500ms 就能加载完成"
              type="info"
              showIcon
            />
          </div>
        ),
      });
    }, 500);
  });
});

/**
 * UseSuspense 示例页面
 * 展示 React Suspense 的使用场景
 */
const UseSuspense = () => {
  const [showSlow, setShowSlow] = useState(false);
  const [showFast, setShowFast] = useState(false);
  const [showBoth, setShowBoth] = useState(false);

  const handleReset = () => {
    setShowSlow(false);
    setShowFast(false);
    setShowBoth(false);
  };

  return (
    <div className="use-suspense">
      <Card title="React Suspense 示例" className="use-suspense__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="use-suspense__description">
            <p>
              <strong>Suspense</strong> 允许你在组件加载时显示一个备用内容（fallback）。
            </p>
            <p>
              它常与 <code>lazy()</code> 配合使用来实现代码分割和懒加载，
              也可以用于数据获取等异步操作。
            </p>
          </div>

          <Card title="示例 1：单个懒加载组件" type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Button type="primary" onClick={() => setShowSlow(true)}>
                  加载慢速组件（2秒）
                </Button>
                <Button
                  onClick={() => setShowSlow(false)}
                  style={{ marginLeft: 8 }}
                >
                  卸载组件
                </Button>
              </div>

              {showSlow && (
                <Suspense
                  fallback={
                    <div className="use-suspense__loading">
                      <Spin size="large" />
                      <p>正在加载组件...</p>
                    </div>
                  }
                >
                  <SlowComponent />
                </Suspense>
              )}
            </Space>
          </Card>

          <Card title="示例 2：快速加载组件" type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Button type="primary" onClick={() => setShowFast(true)}>
                  加载快速组件（500ms）
                </Button>
                <Button
                  onClick={() => setShowFast(false)}
                  style={{ marginLeft: 8 }}
                >
                  卸载组件
                </Button>
              </div>

              {showFast && (
                <Suspense
                  fallback={
                    <div className="use-suspense__loading">
                      <Spin />
                      <p>加载中...</p>
                    </div>
                  }
                >
                  <FastComponent />
                </Suspense>
              )}
            </Space>
          </Card>

          <Card title="示例 3：多个组件同时加载" type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Button type="primary" onClick={() => setShowBoth(true)}>
                  同时加载两个组件
                </Button>
                <Button
                  onClick={() => setShowBoth(false)}
                  style={{ marginLeft: 8 }}
                >
                  卸载组件
                </Button>
              </div>

              {showBoth && (
                <div className="use-suspense__both">
                  <Suspense
                    fallback={
                      <div className="use-suspense__loading">
                        <Spin />
                        <p>加载快速组件...</p>
                      </div>
                    }
                  >
                    <FastComponent />
                  </Suspense>

                  <Suspense
                    fallback={
                      <div className="use-suspense__loading">
                        <Spin size="large" />
                        <p>加载慢速组件...</p>
                      </div>
                    }
                  >
                    <SlowComponent />
                  </Suspense>
                </div>
              )}
            </Space>
          </Card>

          <Card title="示例 4：嵌套 Suspense" type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="嵌套边界"
                description="外层 Suspense 可以捕获内层所有组件的加载状态，也可以为不同组件设置独立的加载状态"
                type="info"
                showIcon
              />
              <Tabs
                items={[
                  {
                    key: '1',
                    label: '独立边界',
                    children: (
                      <div>
                        <p>每个组件都有自己的 Suspense 边界：</p>
                        <Suspense fallback={<Spin />}>
                          <FastComponent />
                        </Suspense>
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    label: '共享边界',
                    children: (
                      <div>
                        <p>多个组件共享一个 Suspense 边界：</p>
                        <Suspense
                          fallback={
                            <div className="use-suspense__loading">
                              <Spin size="large" />
                              <p>加载所有内容...</p>
                            </div>
                          }
                        >
                          <FastComponent />
                        </Suspense>
                      </div>
                    ),
                  },
                ]}
              />
            </Space>
          </Card>

          <Card title="使用说明" type="inner" className="use-suspense__usage">
            <div className="use-suspense__code">
              <pre>{`// 1. 使用 lazy 定义懒加载组件
const LazyComponent = lazy(() => import('./Component'));

// 2. 使用 Suspense 包裹组件
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

// 3. 嵌套使用
<Suspense fallback={<PageLoading />}>
  <Header />
  <Suspense fallback={<ContentLoading />}>
    <Content />
  </Suspense>
  <Footer />
</Suspense>`}</pre>
            </div>
            <div className="use-suspense__tips">
              <h4>核心要点：</h4>
              <ul>
                <li>
                  <strong>lazy()</strong>: 定义一个懒加载的组件
                </li>
                <li>
                  <strong>Suspense</strong>: 定义组件加载时的备用 UI
                </li>
                <li>
                  <strong>fallback</strong>: 必需属性，指定加载时显示的内容
                </li>
                <li>可以嵌套使用，为不同层级提供不同的加载状态</li>
                <li>配合路由使用可以实现页面级别的代码分割</li>
                <li>提升首屏加载速度，改善用户体验</li>
              </ul>
            </div>

            <Alert
              message="注意事项"
              description="Suspense 目前主要用于组件懒加载。React 未来会支持数据获取等更多场景。"
              type="warning"
              showIcon
              style={{ marginTop: 16 }}
            />
          </Card>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button onClick={handleReset}>
              重置所有示例
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default UseSuspense;
