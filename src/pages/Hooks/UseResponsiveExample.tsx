/**
 * @file src/pages/Hooks/UseResponsiveExample.tsx
 * @author leon.wang
 */

import React from 'react';
import { Card, Tag, Space, Descriptions } from 'antd';
import { configResponsive, useResponsive } from 'ahooks';
import './UseResponsiveExample.scss';

configResponsive({
  mobile: 0,
  tablet: 640,
  desktop: 1024,
});

/**
 * UseResponsiveExample component - Demonstrates useResponsive hook usage
 */
const UseResponsiveExample: React.FC = () => {
  const customResponsive = useResponsive();

  return (
    <div className="use-responsive-example">
      <h2 className="use-responsive-example__title">
        useResponsive Hook - 响应式断点监听
      </h2>

      <div className="use-responsive-example__section">
        <Card title="自定义断点">
          <p className="use-responsive-example__desc">
            可以自定义断点配置，适配不同的设计需求
          </p>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="mobile (≥ 0px)">
              <Tag color={customResponsive.mobile ? 'green' : 'default'}>
                {customResponsive.mobile ? 'Active' : 'Inactive'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="tablet (≥ 640px)">
              <Tag color={customResponsive.tablet ? 'green' : 'default'}>
                {customResponsive.tablet ? 'Active' : 'Inactive'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="desktop (≥ 1024px)">
              <Tag color={customResponsive.desktop ? 'green' : 'default'}>
                {customResponsive.desktop ? 'Active' : 'Inactive'}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div className="use-responsive-example__section">
        <Card title="Hook API">
          <h3>useResponsive(config?)</h3>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Parameters">
              <code>config?: ResponsiveConfig</code> - 可选的自定义断点配置
            </Descriptions.Item>
            <Descriptions.Item label="Returns">
              <code>ResponsiveInfo</code> - 响应式断点信息对象
            </Descriptions.Item>
            <Descriptions.Item label="Default Breakpoints">
              <Space direction="vertical">
                <code>xs: 0</code>
                <code>sm: 576</code>
                <code>md: 768</code>
                <code>lg: 992</code>
                <code>xl: 1200</code>
                <code>xxl: 1600</code>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div className="use-responsive-example__section">
        <Card title="功能特性">
          <ul className="use-responsive-example__features">
            <li>
              <Tag color="blue">实时监听</Tag>
              自动监听窗口大小变化，实时更新断点状态
            </li>
            <li>
              <Tag color="green">自定义断点</Tag>
              支持自定义断点配置，灵活适配不同设计需求
            </li>
            <li>
              <Tag color="purple">性能优化</Tag>
              ahooks 内置防抖优化，避免频繁触发重渲染
            </li>
            <li>
              <Tag color="orange">TypeScript 支持</Tag>
              完整的 TypeScript 类型定义
            </li>
            <li>
              <Tag color="red">响应式设计</Tag>
              遵循 Ant Design 的响应式断点规范
            </li>
            <li>
              <Tag color="cyan">ahooks 提供</Tag>
              来自 ahooks 库的成熟解决方案，文档详见：
              <a
                href="https://ahooks.js.org/zh-CN/hooks/use-responsive"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: 8 }}
              >
                ahooks useResponsive
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default UseResponsiveExample;
