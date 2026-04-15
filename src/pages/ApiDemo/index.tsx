/**
 * @file src/pages/ApiDemo/index.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import {
  Card,
  Button,
  Space,
  message,
  Table,
  Tag,
  Divider,
  Alert,
  Input,
  Spin,
  Badge,
} from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import { demoApi } from './api';
import type { User } from './types';
import './index.scss';

/**
 * API Demo 页面 - 展示 req 封装的各种功能
 */
const ApiDemo: React.FC = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState('1');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 示例 1: 基础 GET 请求（自动执行）
  const {
    data: userList,
    loading: listLoading,
    error: listError,
    refresh: refreshList,
  } = useRequest(
    async () => {
      const res = await demoApi.getList({ page: 1, pageSize: 10 });
      return res.data.data;
    },
    {
      onSuccess: () => {
        message.success(t('pages.apiDemo.loadSuccess'));
      },
    }
  );

  // 示例 2: 手动触发的请求
  const {
    data: userDetail,
    loading: detailLoading,
    run: fetchDetail,
  } = useRequest(
    async (id: string) => {
      const res = await demoApi.getDetail(id);
      return res.data.data;
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(t('pages.apiDemo.detailLoadSuccess'));
      },
    }
  );

  // 示例 3: 创建用户（POST 请求）
  const { loading: creating, run: createUser } = useRequest(
    async (userData: Partial<User>) => {
      const res = await demoApi.create(userData);
      return res.data.data;
    },
    {
      manual: true,
      onSuccess: () => {
        message.success(t('pages.apiDemo.createSuccess'));
        refreshList();
      },
      onError: (error) => {
        message.error(error.message || t('pages.apiDemo.createFailed'));
      },
    }
  );

  // 示例 4: 搜索（防抖）
  const {
    data: searchResults,
    loading: searching,
    run: search,
  } = useRequest(
    async (keyword: string) => {
      if (!keyword.trim()) return [];
      const res = await demoApi.search(keyword);
      return res.data.data;
    },
    {
      manual: true,
      debounceWait: 500,
    }
  );

  // 示例 5: 并发请求
  const { loading: batchLoading, run: batchFetch } = useRequest(
    async () => {
      const [users, stats, config] = await Promise.all([
        demoApi.getList({ page: 1, pageSize: 5 }),
        demoApi.getStats(),
        demoApi.getConfig(),
      ]);
      message.success(t('pages.apiDemo.batchSuccess'));
      return {
        users: users.data.data,
        stats: stats.data.data,
        config: config.data.data,
      };
    },
    {
      manual: true,
    }
  );

  // 示例 6: 重试请求
  const { loading: retryLoading, run: retryFetch } = useRequest(
    async () => {
      const res = await demoApi.unstableApi();
      return res.data.data;
    },
    {
      manual: true,
      retryCount: 3,
      onSuccess: () => {
        message.success(t('pages.apiDemo.retrySuccess'));
      },
      onError: () => {
        message.error(t('pages.apiDemo.retryFailed'));
      },
    }
  );

  // 示例 7: 轮询请求
  const {
    data: pollingData,
    loading: pollingLoading,
    run: startPolling,
    cancel: stopPolling,
  } = useRequest(
    async () => {
      const res = await demoApi.getStats();
      return res.data.data;
    },
    {
      manual: true,
      pollingInterval: 1000,
      pollingWhenHidden: false,
    }
  );

  // 表格列定义
  const columns = [
    {
      title: t('pages.apiDemo.table.name'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('pages.apiDemo.table.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('pages.apiDemo.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? t('pages.apiDemo.active') : t('pages.apiDemo.inactive')}
        </Tag>
      ),
    },
  ];

  return (
    <div className="api-demo">
      <div className="api-demo__header">
        <h2>{t('pages.apiDemo.title')}</h2>
        <p>{t('pages.apiDemo.description')}</p>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 功能概览 */}
        <Card title={t('pages.apiDemo.overview.title')}>
          <Space wrap>
            <Badge status="success" text={t('pages.apiDemo.feature.autoLoading')} />
            <Badge status="success" text={t('pages.apiDemo.feature.errorHandling')} />
            <Badge status="success" text={t('pages.apiDemo.feature.cancel')} />
            <Badge status="success" text={t('pages.apiDemo.feature.retry')} />
            <Badge status="success" text={t('pages.apiDemo.feature.debounce')} />
            <Badge status="success" text={t('pages.apiDemo.feature.polling')} />
            <Badge status="success" text={t('pages.apiDemo.feature.concurrent')} />
            <Badge status="success" text={t('pages.apiDemo.feature.i18n')} />
          </Space>
        </Card>

        {/* 示例 1: 基础列表请求 */}
        <Card
          title={t('pages.apiDemo.example1.title')}
          extra={
            <Button onClick={refreshList} loading={listLoading}>
              {t('pages.apiDemo.refresh')}
            </Button>
          }
        >
          <Alert
            message={t('pages.apiDemo.example1.description')}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          {listError ? (
            <Alert
              message={t('pages.apiDemo.loadFailed')}
              description={listError.message}
              type="error"
              showIcon
            />
          ) : (
            <Table
              dataSource={userList?.list || []}
              columns={columns}
              loading={listLoading}
              pagination={false}
              rowKey="id"
            />
          )}
        </Card>

        {/* 示例 2: 手动触发请求 */}
        <Card title={t('pages.apiDemo.example2.title')}>
          <Alert
            message={t('pages.apiDemo.example2.description')}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Space>
            <Input
              placeholder={t('pages.apiDemo.enterUserId')}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              onClick={() => fetchDetail(userId)}
              loading={detailLoading}
              disabled={!userId}
            >
              {t('pages.apiDemo.loadDetail')}
            </Button>
          </Space>
          {userDetail && (
            <div style={{ marginTop: 16 }}>
              <Divider orientation="left">{t('pages.apiDemo.userInfo')}</Divider>
              <Space direction="vertical">
                <div>
                  <strong>{t('pages.apiDemo.table.name')}:</strong> {userDetail.username}
                </div>
                <div>
                  <strong>{t('pages.apiDemo.table.email')}:</strong> {userDetail.email}
                </div>
                <div>
                  <strong>{t('pages.apiDemo.table.status')}:</strong>{' '}
                  <Tag color={userDetail.status === 'active' ? 'success' : 'default'}>
                    {userDetail.status === 'active'
                      ? t('pages.apiDemo.active')
                      : t('pages.apiDemo.inactive')}
                  </Tag>
                </div>
              </Space>
            </div>
          )}
        </Card>

        {/* 示例 3: 创建用户 (POST) */}
        <Card title={t('pages.apiDemo.example3.title')}>
          <Alert
            message={t('pages.apiDemo.example3.description')}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            onClick={() =>
              createUser({
                username: `user_${Date.now()}`,
                email: `user${Date.now()}@example.com`,
                status: 'active',
              })
            }
            loading={creating}
          >
            {t('pages.apiDemo.createUser')}
          </Button>
        </Card>

        {/* 示例 4: 搜索（防抖） */}
        <Card title={t('pages.apiDemo.example4.title')}>
          <Alert
            message={t('pages.apiDemo.example4.description')}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input.Search
              placeholder={t('pages.apiDemo.searchPlaceholder')}
              onSearch={search}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                search(e.target.value);
              }}
              value={searchKeyword}
              loading={searching}
              allowClear
            />
            {searching && <Spin />}
            {searchResults && searchResults.length > 0 && (
              <Table
                dataSource={searchResults}
                columns={columns}
                pagination={false}
                rowKey="id"
              />
            )}
          </Space>
        </Card>

        {/* 示例 5: 并发请求 */}
        <Card title={t('pages.apiDemo.example5.title')}>
          <Alert
            message={t('pages.apiDemo.example5.description')}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Button type="primary" onClick={batchFetch} loading={batchLoading}>
            {t('pages.apiDemo.batchFetch')}
          </Button>
        </Card>

        {/* 示例 6: 重试机制 */}
        <Card title={t('pages.apiDemo.example6.title')}>
          <Alert
            message={t('pages.apiDemo.example6.description')}
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Button onClick={retryFetch} loading={retryLoading}>
            {t('pages.apiDemo.testRetry')}
          </Button>
        </Card>

        {/* 示例 7: 轮询请求 */}
        <Card title={t('pages.apiDemo.example7.title')}>
          <Alert
            message={t('pages.apiDemo.example7.description')}
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Space>
            <Button type="primary" onClick={startPolling}>
              {t('pages.apiDemo.startPolling')}
            </Button>
            <Button onClick={stopPolling}>{t('pages.apiDemo.stopPolling')}</Button>
          </Space>
          {pollingData && (
            <div style={{ marginTop: 16 }}>
              <Alert
                message={`${t('pages.apiDemo.totalUsers')}: ${pollingData.totalUsers} | ${t(
                  'pages.apiDemo.activeUsers'
                )}: ${pollingData.activeUsers}`}
                type="success"
              />
            </div>
          )}
        </Card>
      </Space>
    </div>
  );
};

export default ApiDemo;
