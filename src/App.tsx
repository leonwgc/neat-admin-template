/**
 * @file src/App.tsx
 * @author leon.wang
 */

import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

import { ConfigProvider, App as AntdApp } from '@derbysoft/neat-design';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './components/ErrorBoundary';
import RouteConfig from './RouteConfig';
import { useMount } from 'ahooks';
import useGlobalState, { configureDevtools } from '@derbysoft/zustand-kit';
import operations from './config.operations';
import { type UserInfo, defaultUserInfo } from './global/useUserInfo';
import './App.scss';

configureDevtools(process.env.NODE_ENV === 'development');

const App = () => {
  const { i18n } = useTranslation();

  const [, setUserInfo] = useGlobalState<UserInfo>('UserInfo', defaultUserInfo);

  useEffect(() => {
    const locale = i18n.language === 'zh' ? 'zh-cn' : 'en';
    dayjs.locale(locale);
  }, [i18n.language]);

  useMount(() => {
    // Simulate user info loading
    setTimeout(() => {
      setUserInfo({
        userId: '1',
        username: 'Leon',
        nickname: 'LW',
        operations: [
          operations.formRead,
          operations.imageUploadRead,
          operations.imageCropRead,
        ],
      });
    }, 1000);
  });

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log error in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('App Error Boundary:', error, errorInfo);
        }
      }}
    >
      <ConfigProvider locale={i18n.language === 'zh' ? zhCN : enUS}>
        <AntdApp>
          <RouteConfig />
        </AntdApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
