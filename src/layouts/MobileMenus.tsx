/**
 * @file src/layouts/MobileMenus.tsx
 * @author leon.wang
 */

import React, { useCallback } from 'react';
import { Avatar, Drawer, DrawerProps } from '@derbysoft/neat-design';
import Menus from './Menus';
import { menus } from '~/config.menu';
import useUserInfo from '../global/useUserInfo';
import './MobileMenus.scss';

const MobileMenus: React.FC<DrawerProps> = (props) => {
  const onMenuClick = useCallback(() => {
    props.onClose?.();
  }, [props]);

  const { userInfo } = useUserInfo();

  return (
    <Drawer
      className="app-drawer__menus--mobile"
      title={<Avatar>{userInfo?.nickname?.[0] || 'D'}</Avatar>}
      placement="left"
      styles={{
        body: {
          padding: 0,
        },
      }}
      width={320}
      {...props}
    >
      <Menus onClick={onMenuClick} menus={menus} />
    </Drawer>
  );
};

export default MobileMenus;
