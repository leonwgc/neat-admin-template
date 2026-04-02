import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { ConfigProvider, App as AntdApp } from '@derbysoft/neat-design';
import zhCN from 'antd/es/locale/zh_CN';

import { ErrorBoundary } from './components/ErrorBoundary';
import RouteConfig from './RouteConfig';

import './App.scss';

dayjs.locale('zh-cn');

const App = () => {
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
      <ConfigProvider locale={zhCN}>
        <AntdApp>
          <RouteConfig />
        </AntdApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
