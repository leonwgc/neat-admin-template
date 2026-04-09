/**
 * @file: src/components/AntTable/AntTable.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import React from 'react';
import { Table, type TableProps } from '@derbysoft/neat-design';
// import './AntTable.scss';

const baseClassName = 'ant-custom-table';

const AntTable: React.FC<TableProps> = (tableProps = {}) => {
  return (
    <div className={baseClassName}>
      <Table {...tableProps} />
    </div>
  );
};

export default AntTable;
