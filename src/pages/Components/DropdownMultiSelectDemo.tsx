/**
 * @file src/pages/Components/DropdownMultiSelectDemo.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Divider, Tag, Space, Typography } from '@derbysoft/neat-design';
import DropdownMultiSelect from '~/components/DropdownMultiSelect';
import type { DropdownMultiSelectOption } from '~/components/DropdownMultiSelect';
import './DropdownMultiSelectDemo.scss';

const { Title, Paragraph } = Typography;

const ENTRY_OPTIONS: DropdownMultiSelectOption[] = [
  { label: '在线订阅', value: 'Online Subscription' },
  { label: '线下订阅', value: 'Offline Subscription' },
  { label: '人工审核', value: 'Manual Review' },
  { label: '绿通邀请', value: 'Green Channel' },
];

const values = Object.values(ENTRY_OPTIONS).map((option) => option.value);

/**
 * DropdownMultiSelect demo page
 */
const DropdownMultiSelectDemo: React.FC = () => {
  const [entryTypes, setEntryTypes] = useState<string[]>(values);

  return (
    <div className="dropdown-multi-select-demo">
      <Title level={4}>下拉多选组件示例</Title>
      <Paragraph type="secondary">
        支持多选草稿态、全选/取消全选和“应用”确认，适用于筛选场景。
      </Paragraph>

      <Card title="准入类型" className="dropdown-multi-select-demo__card">
        <DropdownMultiSelect
          value={entryTypes}
          options={ENTRY_OPTIONS}
          onChange={setEntryTypes}
          language="zh"
        />

        <Divider style={{ margin: '16px 0' }} />

        <Space wrap>
          {entryTypes.length === 0 && <Tag>未选择</Tag>}
          {entryTypes.map((item) => {
            const option = ENTRY_OPTIONS.find((entry) => entry.value === item);
            return (
              <Tag key={item} color="blue">
                {option?.label || item}
              </Tag>
            );
          })}
        </Space>
      </Card>
    </div>
  );
};

export default DropdownMultiSelectDemo;
