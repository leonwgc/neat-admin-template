/**
 * @file layouts/Header.tsx
 * @author leon.wang
 */
import React from 'react';
import { Layout, Space, Flex, Avatar } from '@derbysoft/neat-design';
import type { MenuProps } from '@derbysoft/neat-design';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
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

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'language-zh',
      label: '简体中文',
      onClick: () => handleLanguageChange('zh'),
    },
    {
      key: 'language-en',
      label: 'English',
      onClick: () => handleLanguageChange('en'),
    },
    {
      key: 'sign-out',
      label: t('signOut'),
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
          <MenuOutlined className="mobile-menus" onClick={setTrue} />
          <Dropdown
            menu={{
              items: userMenuItems,
              selectedKeys: [`language-${currentLang}`],
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
