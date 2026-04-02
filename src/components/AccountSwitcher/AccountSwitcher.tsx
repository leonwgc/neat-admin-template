/**
 * @file components/AccountSwitcher/AccountSwitcher.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';

import type { MenuProps } from '@derbysoft/neat-design';
import { ArrowDownOutlined, HotelOutlined } from '@derbysoft/neat-design-icons';
import { Dropdown } from '@derbysoft/neat-design';

import './AccountSwitcher.scss';
import classNames from 'classnames';

export interface Account {
  /** Account ID */
  id: string;
  /** Company name */
  company?: string;
}

/**
 * Account switcher dropdown component
 * Allows users to switch between different accounts
 * Manages account state internally
 */
export const AccountSwitcher: FC = () => {
  // Default accounts list
  const accounts: Account[] = [
    { id: '1', company: 'goooooogle' },
    { id: '2', company: '谷ooooooooooooo歌' },
  ];

  const [open, setOpen] = useState(false);

  // Internal state management
  const [currentAccount, setCurrentAccount] = useState<Account>(accounts[0]);

  const handleAccountChange = (account: Account) => {
    setCurrentAccount(account);
  };

  const menuItems: MenuProps['items'] = accounts.map((account) => ({
    key: account.id,
    label: account.company,
    onClick: () => handleAccountChange(account),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems, selectedKeys: [currentAccount.id] }}
      placement="bottomLeft"
      trigger={['click']}
      onOpenChange={setOpen}
    >
      <button
        className={classNames('account-switcher', {
          'account-switcher--open': open,
        })}
      >
        <HotelOutlined className="account-switcher__icon" />
        <span className="account-switcher__name">{currentAccount.company}</span>
        <ArrowDownOutlined className="account-switcher__arrow" />
      </button>
    </Dropdown>
  );
};

export default AccountSwitcher;
