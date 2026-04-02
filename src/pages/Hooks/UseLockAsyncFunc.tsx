/**
 * @file pages/Hooks/UseLockAsyncFunc.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import {
  Button,
  Card,
  Space,
  Typography,
  Alert,
  Divider,
  Spinner,
} from '@derbysoft/neat-design';
import useLockAsyncFunc from '~/hooks/useLockAsyncFunc';
import './UseLockAsyncFunc.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * UseLockAsyncFunc Hook 示例
 * 演示如何使用 useLockAsyncFunc 防止异步函数并发执行
 */
const UseLockAsyncFunc: FC = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 添加日志
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
  };

  // 模拟异步操作（3 秒）
  const simulateAsync = async (id: string): Promise<void> => {
    addLog(`${id}: 开始执行`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    addLog(`${id}: 执行完成`);
  };

  // 示例 1: 使用 useLockAsyncFunc 的异步函数（防止并发）
  const lockedAsyncFunc = useLockAsyncFunc(async () => {
    setLoading(true);
    await simulateAsync('锁定函数');
    setCounter1((prev) => prev + 1);
    setLoading(false);
  });

  // 示例 2: 普通异步函数（允许并发）
  const normalAsyncFunc = async () => {
    setLoading(true);
    await simulateAsync('普通函数');
    setCounter2((prev) => prev + 1);
    setLoading(false);
  };

  // 清空日志
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="use-lock-async-func">
      <Title level={2}>useLockAsyncFunc Hook 示例</Title>
      <Paragraph>
        <Text strong>useLockAsyncFunc</Text> 是一个防止异步函数并发执行的 React
        Hook。 当函数正在执行时，后续调用会被忽略，直到当前执行完成。
      </Paragraph>

      <Alert
        message="使用场景"
        description="防止用户快速点击按钮导致的重复提交、多次 API 调用等问题。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 示例 1: 锁定函数 */}
        <Card title="示例 1: 使用 useLockAsyncFunc（防并发）" bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text>点击次数: </Text>
              <Text strong style={{ fontSize: 20, color: '#1890ff' }}>
                {counter1}
              </Text>
            </div>
            <Button
              type="primary"
              onClick={lockedAsyncFunc}
              // loading={loading}
              size="large"
            >
              快速点击我（3 秒后完成）
            </Button>
            <Spinner spinning={loading} />
            <Alert
              message="提示"
              description="尝试快速多次点击按钮，只有第一次点击会被执行。"
              type="success"
              showIcon
            />
          </Space>
        </Card>

        {/* 示例 2: 普通函数对比 */}
        <Card title="示例 2: 普通异步函数（允许并发）" bordered={false}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text>点击次数: </Text>
              <Text strong style={{ fontSize: 20, color: '#52c41a' }}>
                {counter2}
              </Text>
            </div>
            <Button
              onClick={normalAsyncFunc}
              // loading={loading}
              size="large"
            >
              快速点击我（3 秒后完成）
            </Button>
            <Spinner spinning={loading} />
            <Alert
              message="注意"
              description="每次点击都会创建新的异步任务，可能导致重复执行。"
              type="warning"
              showIcon
            />
          </Space>
        </Card>

        {/* 执行日志 */}
        <Card
          title="执行日志"
          bordered={false}
          extra={
            <Button onClick={clearLogs} size="small">
              清空日志
            </Button>
          }
        >
          <div className="use-lock-async-func__logs">
            {logs.length === 0 ? (
              <Text type="secondary">暂无日志</Text>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="use-lock-async-func__log-item">
                  {log}
                </div>
              ))
            )}
          </div>
        </Card>

        <Divider />

        {/* 代码示例 */}
        <Card title="代码示例" bordered={false}>
          <pre className="use-lock-async-func__code">
            {`import useLockAsyncFunc from '~/hooks/useLockAsyncFunc';

const MyComponent = () => {
  const [counter, setCounter] = useState(0);

  // 使用 useLockAsyncFunc 包装异步函数
  const handleSubmit = useLockAsyncFunc(async () => {
    // 模拟 API 调用
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ data: 'example' }),
    });

    setCounter(prev => prev + 1);
  });

  return (
    <Button onClick={handleSubmit}>
      提交（防止重复点击）
    </Button>
  );
};`}
          </pre>
        </Card>

        {/* API 文档 */}
        <Card title="API 文档" bordered={false}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div>
              <Text strong>函数签名:</Text>
              <pre className="use-lock-async-func__code-inline">
                {`useLockAsyncFunc<P extends any[], V>(fn: (...args: P) => Promise<V>)`}
              </pre>
            </div>
            <div>
              <Text strong>参数:</Text>
              <ul>
                <li>
                  <Text code>fn</Text> - 需要加锁的异步函数
                </li>
              </ul>
            </div>
            <div>
              <Text strong>返回值:</Text>
              <ul>
                <li>返回一个包装后的函数，该函数在执行时会检查锁状态</li>
                <li>如果锁已被占用（函数正在执行），则忽略本次调用</li>
              </ul>
            </div>
            <div>
              <Text strong>特性:</Text>
              <ul>
                <li>✅ 防止并发执行</li>
                <li>✅ 自动管理锁状态</li>
                <li>✅ TypeScript 类型安全</li>
                <li>✅ 支持任意参数和返回值类型</li>
              </ul>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default UseLockAsyncFunc;
