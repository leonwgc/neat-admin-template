/**
 * @file components/GlobalSearch/GlobalSearch.tsx
 * @author leon.wang
 */
import React, { FC, useEffect, useState, useMemo } from 'react';
import { Command } from 'cmdk';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, FolderOutlined } from '@ant-design/icons';

import { menus } from '~/config.menu';
import { flattenMenus, filterMenusByPermissions } from '~/utils/flattenMenus';
import useNavTo from '~/hooks/useNavTo';
import useUserInfo from '../../global/useUserInfo';

import './GlobalSearch.scss';

export interface GlobalSearchProps {
  /** 是否打开搜索框 */
  open: boolean;
  /** 关闭回调 */
  onOpenChange: (open: boolean) => void;
}

/**
 * 全局搜索组件
 * 支持 Cmd+K / Ctrl+K 快捷键唤起
 * 使用 Fuse.js 实现模糊搜索
 */
export const GlobalSearch: FC<GlobalSearchProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const navTo = useNavTo();
  const [userInfo] = useUserInfo();
  const { operations = [] } = userInfo;

  const [search, setSearch] = useState('');

  // 扁平化菜单并过滤权限
  const flatMenus = useMemo(() => {
    const flattened = flattenMenus(menus);
    return filterMenusByPermissions(flattened, operations);
  }, [operations]);

  // 配置 Fuse.js
  const fuse = useMemo(
    () =>
      new Fuse(flatMenus, {
        keys: [
          { name: 'label', weight: 2 }, // 标题权重更高
          { name: 'key', weight: 1 },
          { name: 'route', weight: 1 },
        ],
        threshold: 0.3, // 模糊匹配度 (0-1，越小越精确)
        includeScore: true,
        minMatchCharLength: 1,
      }),
    [flatMenus],
  );

  // 搜索结果
  const results = useMemo(() => {
    if (!search) {
      // 无搜索词时显示最近访问的菜单（这里简化为显示前10个）
      return flatMenus.slice(0, 10);
    }
    return fuse.search(search).map((result) => result.item);
  }, [search, fuse, flatMenus]);

  // 处理选择菜单项
  const handleSelect = (route: string) => {
    navTo(route);
    onOpenChange(false);
    setSearch('');
  };

  // 监听键盘快捷键 Cmd+K / Ctrl+K 和 ESC
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  // 关闭时重置搜索词，打开时自动聚焦
  useEffect(() => {
    if (!open) {
      setSearch('');
    } else {
      // 打开时自动聚焦输入框
      setTimeout(() => {
        const input = document.querySelector(
          '[cmdk-input]',
        ) as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }, 100);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="global-search-overlay" onClick={() => onOpenChange(false)}>
      <Command
        className="global-search"
        onClick={(e) => e.stopPropagation()}
        label={t('common:searchMenuPlaceholder')}
      >
        <div className="global-search__header">
          <SearchOutlined className="global-search__icon" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder={t('common:searchMenuPlaceholder')}
            className="global-search__input"
          />
          {/* <kbd className="global-search__shortcut">ESC</kbd> */}
        </div>

        <Command.List className="global-search__list">
          <Command.Empty className="global-search__empty">
            {t('common:searchNoResults')}
          </Command.Empty>

          {results.length > 0 && (
            <Command.Group
              heading={
                search ? t('common:searchResults') : t('common:searchRecent')
              }
              className="global-search__group"
            >
              {results.map((item) => (
                <Command.Item
                  key={item.key}
                  value={`${item.label}-${item.key}`}
                  onSelect={() => item.route && handleSelect(item.route)}
                  className="global-search__item"
                >
                  <div className="global-search__item-icon">
                    {item.icon || <FolderOutlined />}
                  </div>
                  <div className="global-search__item-content">
                    <div className="global-search__item-label">
                      {item.label}
                    </div>
                    {item.parentPath && item.parentPath.length > 0 && (
                      <div className="global-search__item-path">
                        {item.parentPath.join(' / ')}
                      </div>
                    )}
                  </div>
                  {item.route && (
                    <div className="global-search__item-route">
                      {item.route}
                    </div>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>

        <div className="global-search__footer">
          <div className="global-search__footer-item">
            <kbd>↑↓</kbd>
            <span>{t('common:searchNavigate')}</span>
          </div>
          <div className="global-search__footer-item">
            <kbd>↵</kbd>
            <span>{t('common:searchSelect')}</span>
          </div>
          <div className="global-search__footer-item">
            <kbd>ESC</kbd>
            <span>{t('common:searchClose')}</span>
          </div>
        </div>
      </Command>
    </div>
  );
};
