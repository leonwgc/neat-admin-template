/**
 * @file src/pages/AR-Dispute-Check/index.tsx
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
import { getDisputeList } from './api';
import ViewVoice from './ViewVoice';
import { useNavigate } from 'react-router';
import useGlobalState from '@derbysoft/zustand-kit';
import { useMount, useTitle } from 'ahooks';
import { dateRangeFormItemProps } from '~/helper';

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
  status: string;
  ersp?: string;
  channelResNo?: string;
  hotelResNo?: string;
  supplier?: string;
  bookingTime?: string;
  discrepancyAmount?: string;
  reconciliationResult?: string;
  reviewResult?: string;
  adjustmentRemark?: string;
}

const ARDisputeCheck: React.FC = () => {
  const [activeInvoice, setActiveInvoice] = useState<StatementRow | null>(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useGlobalState(
    'settings',
    {},
    { storage: 'sessionStorage' },
  );

  useTitle('AR Dispute Check');

  const { tableProps, form, submit } = useTable(
    getDisputeList,
    (values) => values,
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

  const columns: TableColumnsType<StatementRow> = [
    {
      title: 'Associated Statement',
      dataIndex: 'statementName',
      key: 'statementName',
      fixed: 'left',
      width: 260,
      render: (_, record) => (
        <div className="statement-name-cell">
          <div className="statement-name-cell__title">
            {record.statementName}
          </div>
          <div className="statement-name-cell__meta">
            {record.customerEntityCode || record.invoiceId || '—'}
          </div>
        </div>
      ),
    },
    {
      title: 'Ersp',
      dataIndex: 'ersp',
      key: 'ersp',
      width: 170,
      render: (value?: string) => value || '—',
    },
    {
      title: 'ChannelResNo',
      dataIndex: 'channelResNo',
      key: 'channelResNo',
      width: 180,
      render: (value?: string) => value || '—',
    },
    {
      title: 'HotelResNo',
      dataIndex: 'hotelResNo',
      key: 'hotelResNo',
      width: 200,
      render: (value?: string) => value || '—',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 140,
      render: (value?: string) => value || '—',
    },
    {
      title: 'Booking Time',
      dataIndex: 'bookingTime',
      key: 'bookingTime',
      width: 170,
      render: (value?: string) => value || '—',
    },
    {
      title: 'Discrepancy Amount',
      dataIndex: 'discrepancyAmount',
      key: 'discrepancyAmount',
      width: 170,
      render: (value?: string, record) => (
        <div className="money-cell">
          {value || '0.00'}
          <span>{record.currency || 'CNY'}</span>
        </div>
      ),
    },
    {
      title: 'Reconciliation Result',
      dataIndex: 'reconciliationResult',
      key: 'reconciliationResult',
      width: 170,
      render: (value?: string) => {
        const normalized = value || '—';
        const isTrue = normalized === 'True';

        return (
          <span
            className={
              isTrue
                ? 'status-badge status-badge--confirmed'
                : 'status-badge status-badge--rejected'
            }
          >
            {normalized}
          </span>
        );
      },
    },
    {
      title: 'Review Result',
      dataIndex: 'reviewResult',
      key: 'reviewResult',
      width: 150,
      render: (value?: string) => {
        const normalized = value || '—';

        if (normalized === 'Pending Review') {
          return (
            <span className="status-badge status-badge--pending">
              {normalized}
            </span>
          );
        }

        if (normalized === 'Approved') {
          return (
            <span className="status-badge status-badge--confirmed">
              {normalized}
            </span>
          );
        }

        if (normalized === 'Rejected') {
          return (
            <span className="status-badge status-badge--rejected">
              {normalized}
            </span>
          );
        }

        return (
          <span className="status-badge status-badge--waiting">
            {normalized}
          </span>
        );
      },
    },
    {
      title: 'Adjustment / Remark',
      dataIndex: 'adjustmentRemark',
      key: 'adjustmentRemark',
      width: 170,
      render: (value?: string) => value || '—',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div className="table-actions">
          <Button
            type="link"
            onClick={() =>
              navigate(`/app/ar-statements/${record.customerEntityCode}`)
            }
          >
            Order Details
          </Button>

          <Button type="link" onClick={() => setActiveInvoice(record)}>
            Review
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="ar-statements">
      <TopBar
        title="AR Dispute Check"
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
          <Form.Item name="dateRange" {...dateRangeFormItemProps}>
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

export default ARDisputeCheck;
