/**
 * @file src/pages/AR-Statements/index.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  type TableColumnsType,
} from '@derbysoft/neat-design';
import { TopBar } from '~/components/TopBar';
import './index.scss';
import {
  UploadOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@derbysoft/neat-design-icons';
import useTable from '~/hooks/useTable';
import { getStateList } from './api';
import ViewVoice from './ViewVoice';
import { useNavigate } from 'react-router';
import useGlobalState from '@derbysoft/zustand-kit';
import { useMount } from 'ahooks';

const summaryCards = [
  {
    title: 'Received Amount',
    value: '56,888',
    suffix: 'CNY',
    meta: '2026-01-01 — 暂今',
  },
  {
    title: 'Collected Amount',
    value: '6,600',
    suffix: 'CNY',
    meta: '截止至 2026-07-31',
  },
  {
    title: '本期待回款',
    value: '14',
    suffix: 'CNY',
    meta: '2026-07-01 — 2026-07-31',
  },
  {
    title: '本期回款率',
    value: '81%',
    meta: '2026-07-01 — 2026-07-31',
  },
];

const statusMap = {
  pending: 'status-badge status-badge--pending',
  confirmed: 'status-badge status-badge--confirmed',
  waiting: 'status-badge status-badge--waiting',
  completed: 'status-badge status-badge--completed',
  rejected: 'status-badge status-badge--rejected',
} as const;

type StatementStatus = keyof typeof statusMap;

interface StatementRow {
  statementName: string;
  customerEntityCode: string;
  customerAccount: string;
  currency: string;
  osAmount: string;
  confirmedAmount: string;
  invoiceId: string;
  invoiceStatus: string;
  paymentStatus: string;
  status: StatementStatus;
}

const ARStatementsPage: React.FC = () => {
  const [activeInvoice, setActiveInvoice] = useState<StatementRow | null>(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useGlobalState(
    'settings',
    {},
    { storage: 'sessionStorage' },
  );

  const columns: TableColumnsType<StatementRow> = [
    {
      title: 'Statement Name',
      dataIndex: 'statementName',
      key: 'statementName',
      fixed: 'left',
      width: 240,
      render: (_, record) => (
        <div className="statement-name-cell">
          <div className="statement-name-cell__title">
            {record.statementName}
          </div>
          <div className="statement-name-cell__meta">
            {record.customerEntityCode}
          </div>
        </div>
      ),
    },
    {
      title: 'Customer Entity Code',
      dataIndex: 'customerEntityCode',
      key: 'customerEntityCode',
      width: 150,
    },
    {
      title: 'Customer Account',
      dataIndex: 'customerAccount',
      key: 'customerAccount',
      width: 150,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      width: 110,
    },
    {
      title: 'OS Amount',
      dataIndex: 'osAmount',
      key: 'osAmount',
      width: 170,
      render: (value: string, record) => (
        <div className="money-cell">
          {value}
          <span>{record.currency}</span>
        </div>
      ),
    },
    {
      title: 'Confirmed Amount',
      dataIndex: 'confirmedAmount',
      key: 'confirmedAmount',
      width: 170,
      render: (value: string, record) => (
        <div className="money-cell">
          {value}
          <span>{record.currency}</span>
        </div>
      ),
    },
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      width: 150,
    },
    {
      title: 'Invoice Status',
      dataIndex: 'invoiceStatus',
      key: 'invoiceStatus',
      width: 180,
      render: (_, record) => (
        <span className={statusMap[record.status]}>{record.invoiceStatus}</span>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div className="table-actions">
          <button
            type="button"
            className="table-actions__link"
            onClick={() =>
              navigate(`/app/ar-statements/${record.customerEntityCode}`)
            }
          >
            Statement Details
          </button>
          <button
            type="button"
            className="table-actions__link table-actions__link--alt"
          >
            View Invoice
          </button>
        </div>
      ),
    },
  ];

  const { tableProps, form, submit } = useTable(
    getStateList,
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

  useMount(() => {
    form.setFieldsValue(filters);
  });

  return (
    <div className="ar-statements">
      <TopBar
        title="AR Statements"
        cat="Customer AR"
        extra={
          <Button
            type="primary"
            icon={<UploadOutlined />}
            className="ar-statements__upload-btn"
          >
            Upload Statement
          </Button>
        }
      />

      <div className="ar-statements__summary">
        {summaryCards.map((item) => (
          <div key={item.title} className="summary-card">
            <div className="summary-card__label">{item.title}</div>
            <div className="summary-card__value-row">
              <span className="summary-card__value">{item.value}</span>
              {item.suffix ? (
                <span className="summary-card__suffix">{item.suffix}</span>
              ) : null}
            </div>
            <div className="summary-card__meta">{item.meta}</div>
          </div>
        ))}
      </div>

      <Form
        className="ar-statements__toolbar"
        form={form}
        initialValues={filters}
        onValuesChange={(v, allValues) => {
          setFilters(allValues);
          submit();
        }}
      >
        <Space size={16} align="center">
          <Form.Item name="dateRange">
            <DatePicker.RangePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Space.Compact block>
            <Form.Item name="filter">
              <Select
                defaultValue="Statement Name"
                style={{ width: 158 }}
                options={[
                  { label: 'Statement Name', value: 'Statement Name' },
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
        <Button
          icon={<FilterOutlined />}
          className="toolbar-filters__icon-btn"
          aria-label="Filter"
        />
      </Form>

      <Table
        columns={columns}
        {...tableProps}
        rowKey={(record) => `${record.statementName}-${record.invoiceId}`}
      />

      <ViewVoice
        open={Boolean(activeInvoice)}
        invoiceId={activeInvoice?.invoiceId}
        onClose={() => setActiveInvoice(null)}
      />
    </div>
  );
};

export default ARStatementsPage;
