/**
 * @file src/layouts/Menus.tsx
 * @author leon.wang
 */

import { Menu, MenuProps, Skeleton } from '@derbysoft/neat-design';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '../config.menu';
import {
  getFlatMenus,
  getFilterMenus,
  getLevelKeys,
  LevelKeysProps,
  getMenuPaths,
} from './Menus.helper';
import { useLocalStorageState } from 'ahooks';
import { NAV_MENU_COLLAPSED_KEY } from './Sider';
import useUserInfo from '../global/useUserInfo';

type Props = MenuProps & {
  onClick?: () => void;
  collapsed?: boolean;
  menus: MenuItem[];
};

export default (props: Props) => {
  const { onClick, collapsed, menus, ...menuProps } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Extract to trigger re-computation
  const [menuCollapsed] = useLocalStorageState<boolean>(NAV_MENU_COLLAPSED_KEY);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { userInfo, loading } = useUserInfo();
  const { operations = [] } = userInfo;

  // Add currentLanguage as dependency to re-compute menus when language changes
  const filterMenus = useMemo(
    () => getFilterMenus(operations, menus),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [menus, operations, currentLanguage],
  );
  const levelKeys = useMemo(
    () => getLevelKeys(filterMenus as LevelKeysProps[]),
    [filterMenus],
  );
  const flatMenus = useMemo(
    () => getFlatMenus(menus),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [menus, currentLanguage],
  );

  useEffect(() => {
    const paths = getMenuPaths(pathname, filterMenus);
    if (paths.length) {
      const key = paths[paths.length - 1].key as string;
      setSelectedKeys([key]);
      if (!menuCollapsed) {
        setOpenKeys(paths.slice(0, -1).map((item) => item.key) as string[]);
      }
    }
  }, [pathname, filterMenus, menuCollapsed]);

  const onOpenChange: MenuProps['onOpenChange'] = useCallback(
    (keys) => {
      const currentOpenKey = keys.find((key) => !openKeys.includes(key));

      if (currentOpenKey !== undefined) {
        const repeatIndex = keys
          .filter((key) => key !== currentOpenKey)
          .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

        setOpenKeys(
          keys
            .filter((_, index) => index !== repeatIndex)
            .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
      } else {
        setOpenKeys(keys);
      }
    },
    [levelKeys, openKeys],
  );

  return (
    <Skeleton active loading={loading} style={{ padding: 12 }}>
      <Menu
        style={{ borderInlineEnd: 'none' }}
        onClick={(item) => {
          const menu = flatMenus.find((m) => m.key === item.key);
          if (menu?.route) {
            navigate(menu?.route);
            onClick?.();
          }
        }}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        items={filterMenus}
        inlineCollapsed={collapsed}
        {...menuProps}
      />
    </Skeleton>
  );
};
