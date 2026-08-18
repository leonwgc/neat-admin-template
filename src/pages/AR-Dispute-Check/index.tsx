/**
 * @file src/pages/AR-Dispute-Check/index.tsx
 * @author leon.wang
 */

import React from 'react';
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Select,
  Space,
  Table,
  type TableColumnsType,
} from '@derbysoft/neat-design';
import { TopBar } from '~/components/TopBar';
import {
  UploadOutlined,
  SearchOutlined,
  SuccessOutlined,
  ForbiddenOutlined,
} from '@derbysoft/neat-design-icons';
import useTable from '~/hooks/useTable';
import usePageState, { PageState } from '~/hooks/usePageState';
import { getDisputeList } from './api';
import { useNavigate } from 'react-router';
import { useTitle } from 'ahooks';
import './index.scss';

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

interface ARDisputeCheckFormState {
  filter: string;
  search: string;
  statementStatus: string;
  customerEntity: string;
}

const ARDisputeCheck: React.FC = () => {
  const navigate = useNavigate();
  const pageState = usePageState<
    ARDisputeCheckFormState & PageState,
    ARDisputeCheckFormState
  >({
    key: 'ar-dispute-check',
    initialState: {
      current: 1,
      pageSize: 10,
      filter: 'Statement Name',
      search: '',
      customerEntity: 'All Customer Entity',
      statementStatus: 'All Statement Status',
    },
    stateToFormValues: (state) => ({
      filter: state.filter ?? 'Statement Name',
      search: state.search ?? '',
      customerEntity: state.customerEntity ?? 'All Customer Entity',
      statementStatus: state.statementStatus ?? 'All Statement Status',
    }),
    formValuesToState: (values) => ({
      filter: values.filter ?? 'Statement Name',
      search: values.search ?? '',
      customerEntity: values.customerEntity ?? 'All Customer Entity',
      statementStatus: values.statementStatus ?? 'All Statement Status',
    }),
    formValuesToRequest: (values) => ({
      filter: values.filter,
      search: values.search,
      customerEntity: values.customerEntity,
      statementStatus: values.statementStatus,
    }),
  });

  useTitle('AR Dispute Check');

  const { tableProps, submit } = useTable(getDisputeList, {
    // form: pageState.form,
    // defaultParams: pageState.defaultParams,
    // getFormData: pageState.getFormData,
    // onBeforeRequest: pageState.onBeforeRequest,
    getResponseData: (data) => {
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
    ...pageState,
  });

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'Approve') {
      console.log('Approve dispute');
    } else if (e.key === 'Reject') {
      console.log('Reject dispute');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Approve Dispute',
      key: 'Approve',
      icon: <SuccessOutlined />,
    },
    {
      label: 'Reject Dispute',
      key: 'Reject',
      icon: <ForbiddenOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

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
      render: (value: string, record: StatementRow) => (
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
      width: 240,
      render: (_, record) => (
        <div className="table-actions">
          <Button
            type="link"
            onClick={() =>
              navigate(`/app/ar-dispute-check/${record.customerEntityCode}`)
            }
          >
            Order Details
          </Button>

          <Dropdown menu={menuProps} placement="bottomRight">
            <Button type="primary" size="small">
              Review
            </Button>
          </Dropdown>
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
        form={pageState.form}
        initialValues={pageState.formValues}
        onValuesChange={(changedValues, allValues) => {
          pageState.onValuesChange(changedValues, allValues);
          submit();
        }}
      >
        <Space size={16} align="center">
          <Form.Item name="customerEntity">
            <Select
              style={{ width: 216 }}
              options={[
                { label: 'All Customer Entity', value: 'All Customer Entity' },
              ]}
            />
          </Form.Item>

          <Form.Item name="statementStatus">
            <Select
              style={{ width: 216 }}
              options={[
                {
                  label: 'All Statement Status',
                  value: 'All Statement Status',
                },
              ]}
            />
          </Form.Item>
          <Space.Compact block>
            <Form.Item name="filter">
              <Select
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
      </Form>

      <Table
        columns={columns}
        {...tableProps}
        rowKey={(record) => `${record.statementName}-${record.invoiceId}`}
      />
    </div>
  );
};

export default ARDisputeCheck;
