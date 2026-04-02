/**
 * @file layouts/Header.tsx
 * @author leon.wang
 */
import React from 'react';
import { Layout, Space, Flex, Avatar } from '@derbysoft/neat-design';
import type { MenuProps } from '@derbysoft/neat-design';
import {
  MenuOutlined,
  GlobalOutlined,
  BankOutlined,
  ControlOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useBoolean } from 'ahooks';
import { useTranslation } from 'react-i18next';

import MobileMenus from './MobileMenus';
import { changeLanguage, type Language } from '~/i18n';
import DerbySoftLogo from './DerbySoftLogo';
import './Header.scss';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const [open, { setTrue, setFalse }] = useBoolean(false);
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language as Language;

  const handleLanguageChange = async (lang: Language) => {
    await changeLanguage(lang);
    // No need to reload - components will re-render automatically
  };

  const languageMenuItems = [
    {
      key: 'zh',
      label: '简体中文',
      onClick: () => handleLanguageChange('zh'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => handleLanguageChange('en'),
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div>
          <div style={{ color: '#1B2C34' }}>Felicia Lawson</div>
          <div style={{ fontSize: 12, color: '#647075' }}>
            felicia.lawson@goooooogle.net
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'companies',
      label: t('common:companies'),
      icon: <BankOutlined />,
      onClick: () => {
        // Navigate to companies
      },
    },
    {
      key: 'admin-console',
      label: t('common:adminConsole'),
      icon: <ControlOutlined />,
      onClick: () => {
        // Navigate to admin console
      },
    },
    {
      key: 'invite-user',
      label: t('common:inviteUser'),
      icon: <UserAddOutlined />,
      onClick: () => {
        // Open invite user modal
      },
    },
    {
      key: 'sign-out',
      label: t('common:signOut'),
      icon: <LogoutOutlined />,
      onClick: () => {
        // Sign out
      },
    },
  ];

  return (
    <div className="neat-header">
      <Layout.Header {...props}>
        <Flex align="center" gap={16}>
          <DerbySoftLogo />
        </Flex>

        <Space size={8}>
          <Dropdown
            menu={{ items: languageMenuItems, selectedKeys: [currentLang] }}
            placement="bottomRight"
          >
            <button
              className="header-lang-btn"
              aria-label={t('common:switchLanguage')}
            >
              <GlobalOutlined className="header-lang-btn__icon" />
              <span className="header-lang-btn__text">
                {currentLang === 'zh' ? '简体中文' : 'English'}
              </span>
              <DownOutlined className="header-lang-btn__arrow" />
            </button>
          </Dropdown>
          <MenuOutlined className="mobile-menus" onClick={setTrue} />
          <Dropdown
            menu={{
              items: userMenuItems,
              style: { width: 320, padding: 0 },
            }}
            placement="bottomRight"
            trigger={['hover']}
            popupRender={(menu) => (
              <div className="pop-user-actions">{menu}</div>
            )}
          >
            <Avatar style={{ cursor: 'pointer', userSelect: 'none' }}>D</Avatar>
          </Dropdown>
        </Space>
      </Layout.Header>
      <MobileMenus open={open} onClose={setFalse} />
    </div>
  );
};

export default Header;
