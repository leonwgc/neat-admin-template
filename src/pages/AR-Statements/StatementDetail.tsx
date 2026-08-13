/**
 * @file src/pages/AR-Statements/StatementDetail.tsx
 * @author leon.wang
 */

import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  type TableColumnsType,
} from '@derbysoft/neat-design';
import { ExportOutlined, SearchOutlined } from '@derbysoft/neat-design-icons';
import { TopBar } from '../../components/TopBar';
import useTable from '../../hooks/useTable';
import { getStateDetailList } from './api';
import './index.scss';

type ReconciliationStatus = 'MATCH' | 'DISCREPANCY';

type DetailRow = {
  channelResNo: string;
  hotelResNo: string;
  supplier: string;
  bookingTime: string;
  checkInCheckOutDate: string;
  orderStatus: string;
  customerOrderAmount: string;
  dsOrderAmount: string;
  discrepancyAmount: string;
  transactionFxRate: string;
  autoReconciliationResult: string;
  reconciliationResult: string;
  reviewResult: string;
  adjustmentRemark: string;
  reason: string;
};

const columns: TableColumnsType<DetailRow> = [
  {
    dataIndex:'ersp',
    title: 'Ersp',
    key: 'ersp',
    width: 200,
    fixed: 'left',
  },
  {
    title: 'ChannelResNo',
    dataIndex: 'channelResNo',
    key: 'channelResNo',
    width: 200,
  },
  {
    title: 'HotelResNo',
    dataIndex: 'hotelResNo',
    key: 'hotelResNo',
    width: 220,
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    width: 140,
  },
  {
    title: 'Booking Time',
    dataIndex: 'bookingTime',
    key: 'bookingTime',
    width: 180,
  },
  {
    title: 'Check-in/Check-out Date',
    dataIndex: 'checkInCheckOutDate',
    key: 'checkInCheckOutDate',
    width: 190,
  },
  {
    title: 'Order Status',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    width: 130,
  },
  {
    title: 'Customer Order Amount',
    dataIndex: 'customerOrderAmount',
    key: 'customerOrderAmount',
    width: 180,
  },
  {
    title: 'DS Order Amount',
    dataIndex: 'dsOrderAmount',
    key: 'dsOrderAmount',
    width: 165,
  },
  {
    title: 'Discrepancy Amount',
    dataIndex: 'discrepancyAmount',
    key: 'discrepancyAmount',
    width: 180,
  },
  {
    title: 'Transaction FX Rate',
    dataIndex: 'transactionFxRate',
    key: 'transactionFxRate',
    width: 170,
  },
  {
    title: 'Auto Reconciliation Result',
    dataIndex: 'autoReconciliationResult',
    key: 'autoReconciliationResult',
    width: 180,
    render: (value: ReconciliationStatus) => (
      <span
        className={
          value === 'MATCH'
            ? 'status-pill status-pill--match'
            : 'status-pill status-pill--discrepancy'
        }
      >
        {value}
      </span>
    ),
  },
  {
    title: 'Reconciliation Result',
    dataIndex: 'reconciliationResult',
    key: 'reconciliationResult',
    width: 170,
  },
  {
    title: 'Review Result',
    dataIndex: 'reviewResult',
    key: 'reviewResult',
    width: 150,
    render: (value: string) => {
      if (value === 'Pending Review') {
        return (
          <span className="status-pill status-pill--pending">{value}</span>
        );
      }
      if (value === 'Approved') {
        return (
          <span className="status-pill status-pill--approved">{value}</span>
        );
      }
      if (value === 'Rejected') {
        return (
          <span className="status-pill status-pill--rejected">{value}</span>
        );
      }
      return <span className="status-pill status-pill--default">{value}</span>;
    },
  },
  {
    title: 'Adjustment / Remark',
    dataIndex: 'adjustmentRemark',
    key: 'adjustmentRemark',
    width: 170,
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 130,
    render: () => (
      <button type="button" className="table-actions__link">
        Order Details
      </button>
    ),
  },
];

const StatementDetail: React.FC = () => {
  const { tableProps, form, submit } = useTable(
    getStateDetailList,
    (values) => {
      const { dateRange, ...rest } = values;
      if (dateRange && dateRange?.length === 2) {
        rest.start = dateRange[0].format('YYYY-MM-DD');
        rest.end = dateRange[1].format('YYYY-MM-DD');
      }

      return rest;
    },
    (data) => {
      if (Array.isArray(data)) {
        return {
          list: data,
          total: data.length,
        };
      }
      return {
        list: [],
        total: 0,
      };
    },
  );

  return (
    <div className="ar-statements">
      <TopBar
        title="Agoda提前3天仅境外预付单早 (90610000462546)"
        cat={<Space size={8}>Customer AR / AR Statements</Space>}
        extra={
          <Button
            type="primary"
            icon={<ExportOutlined />}
            className="ar-statements__upload-btn"
          >
            Export Statement Details
          </Button>
        }
      />

      <Form
        className="ar-statements__toolbar"
        form={form}
        onValuesChange={() => {
          submit();
        }}
      >
        <Space size={16} align="center">
          <Form.Item name="reconciliationResult">
            <Select
              defaultValue="All"
              style={{ width: 320 }}
              options={[
                { label: 'Statement Name', value: 'Statement Name' },
                { label: 'Agoda', value: 'Agoda' },
              ]}
            />
          </Form.Item>

          <Space.Compact block>
            <Form.Item name="filter">
              <Select
                defaultValue="Ersp"
                style={{ width: 158 }}
                options={[
                  { label: 'Ersp', value: 'Ersp' },
                  { label: 'Agoda', value: 'Agoda' },
                ]}
              />
            </Form.Item>
            <Form.Item name="search">
              <Input
                style={{ width: 322 }}
                placeholder="Search..."
                suffix={<SearchOutlined />}
              />
            </Form.Item>
          </Space.Compact>
        </Space>
      </Form>

      <Table {...tableProps} columns={columns} />
    </div>
  );
};

export default StatementDetail;
