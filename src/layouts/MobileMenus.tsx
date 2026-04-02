import React, { useCallback } from 'react';
import { Avatar, Drawer, DrawerProps } from '@derbysoft/neat-design';
import Menus from './Menus';
import { menus } from '~/config.menu';
import './MobileMenus.scss';

const MobileMenus: React.FC<DrawerProps> = (props) => {
  const onMenuClick = useCallback(() => {
    props.onClose?.(null);
  }, [props]);

  return (
    <Drawer
      className="app-drawer__menus--mobile"
      title={<Avatar>LW</Avatar>}
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
