/**
 * @file src/pages/AR-Dispute-Check/RejectConfirmContent.tsx
 * @author leon.wang
 */

import React from 'react';
import { Input } from '@derbysoft/neat-design';

export interface RejectConfirmContentProps {
  onRemarkChange: (remark: string) => void;
}

const RejectConfirmContent: React.FC<RejectConfirmContentProps> = ({
  onRemarkChange,
}) => {
  const [remark, setRemark] = React.useState('');

  const handleRemarkChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const nextRemark = event.target.value;
    setRemark(nextRemark);
    onRemarkChange(nextRemark);
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        请慎重，一旦驳回后，禁止再操作批准
      </div>
      <Input.TextArea
        rows={4}
        value={remark}
        placeholder="Please input"
        onChange={handleRemarkChange}
      />
    </div>
  );
};

export default RejectConfirmContent;
