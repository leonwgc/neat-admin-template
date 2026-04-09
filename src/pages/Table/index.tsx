/**
 * @file: src/modules/Plan/containers/PlanList.js
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { TableColumnsType } from 'antd';
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
  ];

  return (
    <div>
      <Table {...tableProps} columns={columns} rowKey="productId" />
    </div>
  );
}
