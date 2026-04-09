/**
 * @file: src/modules/Plan/containers/PlanList.js
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import Table from 'src/components/AntTable/AntTable';
import { useAntdTable } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { getDataList } from './api';

export default function List() {
  const { t } = useTranslation('pages.table');

  const { tableProps } = useAntdTable(getDataList, {
    defaultPageSize: 10,
  });

  const columns: TableColumnsType = [
    {
      title: t('columns.name'),
      dataIndex: ['name', 'last'],
      fixed: 'left',
    },
    {
      title: t('columns.email'),
      dataIndex: 'email',
    },
    {
      title: t('columns.phone'),
      dataIndex: 'phone',
    },
    {
      title: t('columns.gender'),
      dataIndex: 'gender',
    },
    {
      title: t('columns.dateTime'),
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
