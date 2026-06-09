/**
 * @file src/layouts/App.tsx
 * @author leon.wang
 */

import React from 'react';
import { Layout } from '@derbysoft/neat-design';
import { Outlet } from 'react-router';
import classNames from 'classnames';
import Header from './Header';
import Sider from './Sider';
import RouteGuard from './RouteGuard';
import './App.scss';

const App: React.FC<{
  hasSider?: boolean;
  hasContentHeader?: boolean;
}> = ({ hasSider = true, hasContentHeader = false }) => {
  return (
    <Layout className="app-layout">
      <Header className="app-layout__header" />
      <Layout className="app-layout__body">
        {hasSider && <Sider />}
        <Layout.Content
          className={classNames('app-layout__main', {
            'app-layout__main--no-sider': !hasSider,
          })}
        >
          <Layout className="app-layout__inner">
            {hasContentHeader && (
              <Layout.Header className="app-layout__inner-header"></Layout.Header>
            )}

            <Layout.Content className="app-layout__inner-content">
              <RouteGuard>
                <Outlet />
              </RouteGuard>
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
