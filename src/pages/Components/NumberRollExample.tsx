/**
 * @file pages/Components/NumberRollExample.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Card, Button, Space, Slider, Divider } from '@derbysoft/neat-design';
import { PlusOutlined, MinusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useInterval } from 'ahooks';
import NumberRoll from '~/components/NumberRoll';
import './NumberRollExample.scss';

/**
 * NumberRoll component demo page
 */
const NumberRollExample: FC = () => {
  const [count, setCount] = useState(12345);
  const [live, setLive] = useState(0);
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(800);

  // Auto-increment live counter when running
  useInterval(
    () => {
      setLive((v) => v + Math.floor(Math.random() * 100) + 1);
    },
    running ? 600 : undefined,
  );

  return (
    <div className="number-roll-example">
      <h2 className="number-roll-example__title">NumberRoll 数字滚动</h2>
      <p className="number-roll-example__desc">
        每个数字独立做插槽滚动动画，数值变化时平滑过渡，适用于大屏统计、计数器等场景。
      </p>

      {/* ── Basic counter ── */}
      <Card title="基础用法 — 可交互计数器" className="number-roll-example__card">
        <div className="number-roll-example__demo">
          <NumberRoll value={count} duration={duration} fontSize={48} color="#1677ff" />
        </div>
        <div className="number-roll-example__controls">
          <Space>
            <Button
              icon={<MinusOutlined />}
              onClick={() => setCount((v) => Math.max(0, v - 1000))}
            >
              -1000
            </Button>
            <Button
              icon={<MinusOutlined />}
              onClick={() => setCount((v) => Math.max(0, v - 1))}
            >
              -1
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCount((v) => v + 1)}
            >
              +1
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCount((v) => v + 1000)}
            >
              +1000
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => setCount(0)}
            >
              重置
            </Button>
          </Space>
          <div className="number-roll-example__slider-row">
            <span className="number-roll-example__slider-label">动画时长：{duration}ms</span>
            <Slider
              value={duration}
              min={200}
              max={2000}
              step={100}
              onChange={(v) => setDuration(v as number)}
              style={{ width: 200 }}
            />
          </div>
        </div>
      </Card>

      {/* ── Live auto counter ── */}
      <Card title="实时数据模拟" className="number-roll-example__card">
        <div className="number-roll-example__demo">
          <NumberRoll value={live} fontSize={40} color="#52c41a" separator="," />
        </div>
        <div className="number-roll-example__controls">
          <Space>
            <Button
              type={running ? undefined : 'primary'}
              onClick={() => setRunning((v) => !v)}
            >
              {running ? '暂停' : '开始自动累加'}
            </Button>
            <Button onClick={() => { setLive(0); setRunning(false); }}>重置</Button>
          </Space>
        </div>
      </Card>

      {/* ── Different sizes ── */}
      <Card title="不同尺寸" className="number-roll-example__card">
        <div className="number-roll-example__sizes">
          {([16, 24, 32, 48, 64] as const).map((size) => (
            <div key={size} className="number-roll-example__size-row">
              <span className="number-roll-example__size-label">{size}px</span>
              <NumberRoll value={count} fontSize={size} duration={duration} />
            </div>
          ))}
        </div>
      </Card>

      {/* ── Prefix / suffix / decimals ── */}
      <Card title="前缀、后缀与小数" className="number-roll-example__card">
        <div className="number-roll-example__variants">
          <div className="number-roll-example__variant-row">
            <span className="number-roll-example__variant-label">货币（人民币）</span>
            <NumberRoll value={count} prefix="¥" decimals={2} fontSize={36} color="#fa8c16" fontWeight={800} />
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div className="number-roll-example__variant-row">
            <span className="number-roll-example__variant-label">百分比</span>
            <NumberRoll value={Math.min(99, Math.abs(count % 100))} suffix="%" decimals={1} separator="" fontSize={36} color="#722ed1" />
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div className="number-roll-example__variant-row">
            <span className="number-roll-example__variant-label">美元</span>
            <NumberRoll value={count} prefix="$" decimals={2} fontSize={36} color="#13c2c2" />
          </div>
          <Divider style={{ margin: '12px 0' }} />
          <div className="number-roll-example__variant-row">
            <span className="number-roll-example__variant-label">无分隔符</span>
            <NumberRoll value={count} separator="" fontSize={36} color="#f5222d" />
          </div>
        </div>
      </Card>

      {/* ── Dashboard style ── */}
      <Card title="大屏统计卡片示例" className="number-roll-example__card">
        <div className="number-roll-example__dashboard">
          {[
            { label: '今日访问量', value: count, color: '#1677ff', suffix: '' },
            { label: '累计用户数', value: live + 8000, color: '#52c41a', suffix: '' },
            { label: '转化率', value: Math.min(99, Math.abs(count % 100)), color: '#fa8c16', suffix: '%', decimals: 1, separator: '' },
            { label: '收入（万元）', value: Math.floor(count / 100), color: '#722ed1', prefix: '¥' },
          ].map((item) => (
            <div key={item.label} className="number-roll-example__stat-card">
              <div className="number-roll-example__stat-label">{item.label}</div>
              <NumberRoll
                value={item.value}
                duration={duration}
                fontSize={32}
                color={item.color}
                prefix={item.prefix ?? ''}
                suffix={item.suffix ?? ''}
                decimals={(item as { decimals?: number }).decimals}
                separator={(item as { separator?: string }).separator ?? ','}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NumberRollExample;
