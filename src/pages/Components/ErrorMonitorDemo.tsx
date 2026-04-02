/**
 * @file pages/Components/ErrorMonitorDemo.tsx
 * @author leon.wang
 */
import React, { FC, useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Table,
  Tag,
  Alert,
  Statistic,
  Row,
  Col,
  Descriptions,
  Modal,
} from '@derbysoft/neat-design';
import { Modal as AntdModal } from 'antd';
import {
  BugOutlined,
  ThunderboltOutlined,
  DeleteOutlined,
  EyeOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import errorMonitor, { ErrorReport, ErrorType, ErrorLevel } from '~/utils/errorMonitor';
import './ErrorMonitorDemo.scss';

/**
 * Error Monitor Demo Page
 * Demonstrates error monitoring and reporting system
 */
const ErrorMonitorDemo: FC = () => {
  const [errors, setErrors] = useState<ErrorReport[]>([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    byType: {} as Record<ErrorType, number>,
    byLevel: {} as Record<ErrorLevel, number>,
  });
  const [selectedError, setSelectedError] = useState<ErrorReport | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  // 加载错误日志
  const loadErrors = () => {
    setErrors(errorMonitor.getErrors());
    setStatistics(errorMonitor.getStatistics());
  };

  useEffect(() => {
    loadErrors();
    // 每 2 秒刷新一次
    const timer = setInterval(loadErrors, 2000);
    return () => clearInterval(timer);
  }, []);

  // 触发 React 错误
  const triggerReactError = () => {
    throw new Error('🐛 这是一个测试的 React 渲染错误！');
  };

  // 触发 Promise rejection
  const triggerPromiseError = () => {
    Promise.reject(new Error('⚠️ 这是一个测试的 Promise rejection 错误！'));
  };

  // 触发 setTimeout 错误
  const triggerAsyncError = () => {
    setTimeout(() => {
      throw new Error('⏰ 这是一个测试的异步错误！');
    }, 100);
  };

  // 触发网络错误（模拟）
  const triggerNetworkError = () => {
    errorMonitor.reportNetworkError('模拟的网络请求失败', {
      url: '/api/test',
      method: 'GET',
      status: 500,
    });
    loadErrors();
  };

  // 清除所有错误日志
  const handleClearErrors = () => {
    AntdModal.confirm({
      title: '确认清除',
      content: '确定要清除所有错误日志吗？',
      onOk: () => {
        errorMonitor.clearErrors();
        loadErrors();
      },
    });
  };

  // 查看错误详情
  const handleViewDetail = (error: ErrorReport) => {
    setSelectedError(error);
    setDetailVisible(true);
  };

  // 获取错误类型标签颜色
  const getTypeColor = (type: ErrorType): string => {
    const colors: Record<ErrorType, string> = {
      [ErrorType.REACT_ERROR]: 'blue',
      [ErrorType.JS_ERROR]: 'orange',
      [ErrorType.PROMISE_ERROR]: 'purple',
      [ErrorType.RESOURCE_ERROR]: 'cyan',
      [ErrorType.NETWORK_ERROR]: 'red',
    };
    return colors[type] || 'default';
  };

  // 获取错误级别标签颜色
  const getLevelColor = (level: ErrorLevel): string => {
    const colors: Record<ErrorLevel, string> = {
      [ErrorLevel.INFO]: 'green',
      [ErrorLevel.WARNING]: 'orange',
      [ErrorLevel.ERROR]: 'red',
      [ErrorLevel.FATAL]: 'magenta',
    };
    return colors[level] || 'default';
  };

  // 获取错误类型中文名
  const getTypeName = (type: ErrorType): string => {
    const names: Record<ErrorType, string> = {
      [ErrorType.REACT_ERROR]: 'React 错误',
      [ErrorType.JS_ERROR]: 'JS 错误',
      [ErrorType.PROMISE_ERROR]: 'Promise 错误',
      [ErrorType.RESOURCE_ERROR]: '资源错误',
      [ErrorType.NETWORK_ERROR]: '网络错误',
    };
    return names[type] || type;
  };

  // 表格列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 180,
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: ErrorType) => (
        <Tag className={`tag-${getTypeColor(type)}`}>{getTypeName(type)}</Tag>
      ),
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: ErrorLevel) => (
        <Tag className={`tag-${getLevelColor(level)}`}>{level.toUpperCase()}</Tag>
      ),
    },
    {
      title: '错误消息',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      render: (timestamp: number) => new Date(timestamp).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: unknown, record: ErrorReport) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetail(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  return (
    <div className="error-monitor-demo">
      <h1>🔍 错误监控与上报系统</h1>

      <Alert
        message="功能说明"
        description="本系统自动监控和上报应用中的各类错误，包括 React 错误、JavaScript 错误、Promise rejection、资源加载失败和网络请求失败。错误会被存储在本地和上报到服务器。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 错误统计 */}
      <Card title="错误统计" className="error-monitor-demo__stats">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="总错误数"
              value={statistics.total}
              prefix={<BugOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="React 错误"
              value={statistics.byType[ErrorType.REACT_ERROR] || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="JS 错误"
              value={statistics.byType[ErrorType.JS_ERROR] || 0}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="网络错误"
              value={statistics.byType[ErrorType.NETWORK_ERROR] || 0}
              valueStyle={{ color: '#f5222d' }}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={6}>
            <Statistic
              title="严重错误"
              value={statistics.byLevel[ErrorLevel.FATAL] || 0}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="错误"
              value={statistics.byLevel[ErrorLevel.ERROR] || 0}
              valueStyle={{ color: '#f5222d' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="警告"
              value={statistics.byLevel[ErrorLevel.WARNING] || 0}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="信息"
              value={statistics.byLevel[ErrorLevel.INFO] || 0}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
        </Row>
      </Card>

      {/* 触发错误测试 */}
      <Card title="🧪 触发测试错误" className="error-monitor-demo__trigger">
        <Space size="large" wrap>
          <Button
            danger
            type="primary"
            icon={<BugOutlined />}
            onClick={triggerReactError}
          >
            触发 React 错误
          </Button>
          <Button
            danger
            icon={<WarningOutlined />}
            onClick={triggerPromiseError}
          >
            触发 Promise 错误
          </Button>
          <Button
            danger
            icon={<ThunderboltOutlined />}
            onClick={triggerAsyncError}
          >
            触发异步错误
          </Button>
          <Button
            danger
            icon={<InfoCircleOutlined />}
            onClick={triggerNetworkError}
          >
            触发网络错误
          </Button>
        </Space>

        <Alert
          message="提示"
          description="点击按钮后会触发相应类型的错误。React 错误会导致当前页面崩溃并显示 ErrorBoundary 页面，其他错误会被自动捕获并记录。"
          type="warning"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>

      {/* 错误日志列表 */}
      <Card
        title="错误日志列表"
        extra={
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleClearErrors}
            disabled={errors.length === 0}
          >
            清除所有日志
          </Button>
        }
        className="error-monitor-demo__list"
      >
        <Table
          dataSource={errors}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 错误详情弹窗 */}
      <Modal
        title="错误详情"
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        {selectedError && (
          <div className="error-monitor-demo__detail">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="错误 ID">
                {selectedError.id}
              </Descriptions.Item>
              <Descriptions.Item label="错误类型">
                <Tag className={`tag-${getTypeColor(selectedError.type)}`}>
                  {getTypeName(selectedError.type)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="错误级别">
                <Tag className={`tag-${getLevelColor(selectedError.level)}`}>
                  {selectedError.level.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="错误消息">
                {selectedError.message}
              </Descriptions.Item>
              <Descriptions.Item label="页面 URL">
                {selectedError.url}
              </Descriptions.Item>
              <Descriptions.Item label="发生时间">
                {new Date(selectedError.timestamp).toLocaleString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="用户代理">
                <div style={{ wordBreak: 'break-all' }}>
                  {selectedError.userAgent}
                </div>
              </Descriptions.Item>
              {selectedError.stack && (
                <Descriptions.Item label="错误堆栈">
                  <pre className="error-monitor-demo__stack">
                    {selectedError.stack}
                  </pre>
                </Descriptions.Item>
              )}
              {selectedError.componentStack && (
                <Descriptions.Item label="组件堆栈">
                  <pre className="error-monitor-demo__stack">
                    {selectedError.componentStack}
                  </pre>
                </Descriptions.Item>
              )}
              {selectedError.extra && (
                <Descriptions.Item label="额外信息">
                  <pre className="error-monitor-demo__stack">
                    {JSON.stringify(selectedError.extra, null, 2)}
                  </pre>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ErrorMonitorDemo;
