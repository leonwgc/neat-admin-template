/**
 * @file src/pages/Table/index.tsx
 * @author leon.wang
 */

/**
 * @file: src/pages/Table/index.tsx
 * @author leon.wang
 */

import { TableColumnsType, Table } from '@derbysoft/neat-design';
import dayjs from 'dayjs';
import { useAntdTable } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { getDataList } from './api';

export default function List() {
  const { t } = useTranslation();

  const { tableProps } = useAntdTable(getDataList, {
    defaultPageSize: 10,
  });

  const columns: TableColumnsType = [
    {
      title: t('pages.table.name'),
      dataIndex: ['name', 'last'],
      fixed: 'left',
    },
    {
      title: t('pages.table.email'),
      dataIndex: 'email',
    },
    {
      title: t('pages.table.phone'),
      dataIndex: 'phone',
    },
    {
      title: t('pages.table.gender'),
      dataIndex: 'gender',
    },
    {
      title: t('pages.table.dateTime'),
      dataIndex: 'createdAt',
      render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        scroll={{ x: 'max-content' }}
        columns={columns}
        rowKey="productId"
      />
    </div>
  );
}
