/**
 * @file src/pages/AR-Dispute-Check/Detail.tsx
 * @author leon.wang
 */

import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Space } from '@derbysoft/neat-design';
import { TopBar } from '~/components/TopBar';
import { useTitle } from 'ahooks';
import { useParams } from 'react-router';
import './Detail.scss';
import {
  ArrowLeftOutlined,
  ForbiddenOutlined,
  SuccessOutlined,
} from '@derbysoft/neat-design-icons';

const orderInfo = [
  { label: 'Ersp', value: 'GQ504094550V7LHRA5CS4' },
  { label: 'Booking Time', value: '2026-07-20 15:00' },
  { label: 'Supplier', value: 'ACCOR' },
  { label: 'Order Status', value: 'Confirmed', valueType: 'status' },
  { label: 'ChannelResNo', value: 'H250617030352-0-9L5c' },
  { label: 'Distributor Code', value: 'ALTAYYAR' },
  { label: 'HotelResNo', value: '5307AER0510' },
  { label: 'Hotel Code', value: 'B921' },
  { label: 'Check-in Date', value: '2026-07-20' },
  { label: 'Check-out Date', value: '2026-07-22' },
  { label: 'Knights', value: '2' },
  { label: 'Rooms', value: '1' },
] as const;

const reconciliationInfo = [
  {
    label: 'Associated Statement',
    value: 'Agoda提前3天仅境外预付单早',
    action: 'View',
  },
  { label: 'Statement ID', value: '90610000462546' },
  { label: 'Transaction / Settlement', value: 'USD/CNY' },
  { label: 'Transaction FX Rate', value: '6.77' },
  { label: 'Customer Order Amount', value: '567.89', suffix: 'USD' },
  { label: 'DS Order Amount', value: '3844.62', suffix: 'CNY' },
  { label: 'Discrepancy Amount', value: '5307AER0510' },
  { label: 'Reconciliation Result', value: 'True' },
  {
    label: 'Auto Reconciliation Result',
    value: 'DISCREPANCY',
    valueType: 'pill-red',
  },
  { label: 'Review Result', value: 'Pending Review', valueType: 'pill-yellow' },
  { label: 'Reviewer', value: 'Robert Fox' },
  { label: 'Adjustment', value: '—' },
  { label: 'Remark', value: '—' },
] as const;

const Detail: React.FC = () => {
  const { disputeId } = useParams();
  const navigate = useNavigate();
  useTitle(`Order Details - ${disputeId}`);

  const renderValue = (item: {
    value: string;
    valueType?: string;
    suffix?: string;
    action?: string;
  }) => {
    if (item.valueType === 'status') {
      return (
        <span className="ar-dispute-detail__status">
          <span className="ar-dispute-detail__status-dot" />
          {item.value}
        </span>
      );
    }

    if (item.valueType === 'pill-red') {
      return (
        <span className="ar-dispute-detail__pill ar-dispute-detail__pill--red">
          {item.value}
        </span>
      );
    }

    if (item.valueType === 'pill-yellow') {
      return (
        <span className="ar-dispute-detail__pill ar-dispute-detail__pill--yellow">
          {item.value}
        </span>
      );
    }

    if (item.suffix) {
      return (
        <span className="ar-dispute-detail__value-with-suffix">
          {item.value}
          <span className="ar-dispute-detail__suffix">{item.suffix}</span>
        </span>
      );
    }

    return item.value;
  };

  return (
    <div className="ar-dispute-detail">
      <TopBar
        title={`Order Details - ${disputeId}`}
        cat={
          <Space size={8} split=">">
            <span>Customer AR</span>
            <span>AR Dispute Audit</span>
          </Space>
        }
        extra={
          <div className="ar-dispute-detail__header-actions">
            <Button
              type="tertiary"
              className="ar-dispute-detail__ghost-btn"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/app/ar-dispute-check')}
            >
              Back to List
            </Button>
            <Button
              className="ar-dispute-detail__secondary-btn"
              icon={<ForbiddenOutlined />}
            >
              Reject Dispute
            </Button>
            <Button type="primary" icon={<SuccessOutlined />}>
              Approve Dispute
            </Button>
          </div>
        }
      />

      <div className="ar-dispute-detail__content">
        <Card title="Order Info" className="ar-dispute-detail__card">
          <div className="ar-dispute-detail__grid">
            {orderInfo.map((item) => (
              <div key={item.label} className="ar-dispute-detail__row">
                <div className="ar-dispute-detail__label">{item.label}</div>
                <div className="ar-dispute-detail__value">
                  {renderValue(item)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Reconciliation Info" className="ar-dispute-detail__card">
          <div className="ar-dispute-detail__grid">
            {reconciliationInfo.map((item) => (
              <div key={item.label} className="ar-dispute-detail__row">
                <div className="ar-dispute-detail__label">{item.label}</div>
                <div className="ar-dispute-detail__value">
                  <span className="ar-dispute-detail__desc-content">
                    {renderValue(item)}
                    {item.action ? (
                      <button
                        type="button"
                        className="ar-dispute-detail__link-btn"
                      >
                        {item.action}
                      </button>
                    ) : null}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
