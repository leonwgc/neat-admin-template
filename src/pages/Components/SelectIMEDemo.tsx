/**
 * @file src/pages/Components/SelectIMEDemo.tsx
 * @author leon.wang
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Select,
  Card,
  Tag,
  Typography,
  Divider,
  Space,
} from '@derbysoft/neat-design';

const { Title, Paragraph, Text } = Typography;

const MOCK_OPTIONS = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' },
  { label: '武汉', value: 'wuhan' },
  { label: '西安', value: 'xian' },
  { label: '南京', value: 'nanjing' },
  { label: '重庆', value: 'chongqing' },
];

function filterOptions(keyword: string) {
  if (!keyword) return MOCK_OPTIONS;
  return MOCK_OPTIONS.filter((o) => o.label.includes(keyword));
}

/**
 * IME-aware Select Demo
 *
 * 演示如何通过原生 compositionstart/compositionend 事件
 * 解决中文输入法拼音阶段触发多余搜索的问题。
 */
const SelectIMEDemo: React.FC = () => {
  // ── IME-aware Select ──────────────────────────────────────────────────────
  const [composing, setComposing] = useState(false);
  const [options, setOptions] = useState(MOCK_OPTIONS);
  const [searchLog, setSearchLog] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input =
      containerRef.current?.querySelector<HTMLInputElement>('input');
    if (!input) return;

    const onCompositionStart = () => setComposing(true);
    const onCompositionEnd = (e: CompositionEvent) => {
      setComposing(false);
      const val = (e.target as HTMLInputElement).value;
      setSearchLog((prev) =>
        [`[compositionend] 搜索: "${val}"`, ...prev].slice(0, 8),
      );
      setOptions(filterOptions(val));
    };

    input.addEventListener('compositionstart', onCompositionStart);
    input.addEventListener('compositionend', onCompositionEnd);
    return () => {
      input.removeEventListener('compositionstart', onCompositionStart);
      input.removeEventListener('compositionend', onCompositionEnd);
    };
  }, []);

  const handleSearch = (val: string) => {
    if (composing) {
      return;
    }
    setSearchLog((prev) => [`[onSearch] 搜索: "${val}"`, ...prev].slice(0, 8));
    setOptions(filterOptions(val));
  };

  // ── 对照组：未处理 IME 的 Select ─────────────────────────────────────────
  const [rawOptions, setRawOptions] = useState(MOCK_OPTIONS);
  const [rawLog, setRawLog] = useState<string[]>([]);

  const handleRawSearch = (val: string) => {
    setRawLog((prev) => [`[onSearch] 搜索: "${val}"`, ...prev].slice(0, 8));
    setRawOptions(filterOptions(val));
  };

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <Title level={4}>中文输入法（IME）与 Select 搜索</Title>
      <Paragraph type="secondary">
        使用拼音输入法时，<Text code>onSearch</Text>{' '}
        会在每个拼音字母输入时触发， 而非等待汉字上屏。通过绑定原生{' '}
        <Text code>compositionstart / compositionend</Text>{' '}
        事件，可精准拦截拼音阶段的冗余请求。
      </Paragraph>

      <Divider />

      <Space
        size={32}
        align="start"
        style={{ width: '100%', flexWrap: 'wrap' }}
      >
        {/* ── 已处理 IME ── */}
        <Card
          title="✅ IME 感知版"
          style={{ width: 380, flexShrink: 0 }}
          bodyStyle={{ paddingBottom: 12 }}
        >
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            拼音阶段的 <Text code>onSearch</Text>{' '}
            被拦截，仅在汉字上屏后触发搜索。
          </Paragraph>
          <div ref={containerRef}>
            <Select
              showSearch
              filterOption={false}
              onSearch={handleSearch}
              options={options}
              placeholder="输入城市名（试试拼音输入法）"
              style={{ width: '100%' }}
            />
          </div>
          <Divider style={{ margin: '12px 0 8px' }} />
          <div style={{ minHeight: 120 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              触发日志（最新在前）
            </Text>
            {searchLog.map((log, i) => {
              const isBlocked = log.includes('拦截');
              return (
                <div key={i} style={{ marginTop: 4 }}>
                  <Tag
                    color={isBlocked ? 'warning' : 'success'}
                    style={{ fontSize: 11 }}
                  >
                    {log}
                  </Tag>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── 未处理 IME（对照） ── */}
        <Card
          title="❌ 未处理 IME（对照）"
          style={{ width: 380, flexShrink: 0 }}
          bodyStyle={{ paddingBottom: 12 }}
        >
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            每个拼音字母都会触发 <Text code>onSearch</Text>，造成大量冗余请求。
          </Paragraph>
          <Select
            showSearch
            filterOption={false}
            onSearch={handleRawSearch}
            options={rawOptions}
            placeholder="输入城市名（试试拼音输入法）"
            style={{ width: '100%' }}
          />
          <Divider style={{ margin: '12px 0 8px' }} />
          <div style={{ minHeight: 120 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              触发日志（最新在前）
            </Text>
            {rawLog.map((log, i) => (
              <div key={i} style={{ marginTop: 4 }}>
                <Tag color="error" style={{ fontSize: 11 }}>
                  {log}
                </Tag>
              </div>
            ))}
          </div>
        </Card>
      </Space>

      <Divider />

      <Card title="核心实现" size="small">
        <Paragraph>
          <ol>
            <li>
              用 <Text code>containerRef</Text> 包裹 Select，在{' '}
              <Text code>useEffect</Text> 中通过{' '}
              <Text code>querySelector('input')</Text> 拿到内部原生输入框。
            </li>
            <li>
              绑定 <Text code>compositionstart</Text> 将{' '}
              <Text code>composing</Text> 置为 <Text code>true</Text>。
            </li>
            <li>
              绑定 <Text code>compositionend</Text> 将{' '}
              <Text code>composing</Text> 置回 <Text code>false</Text>，
              并用事件携带的 <Text code>target.value</Text>
              （已上屏汉字）主动触发一次搜索。
            </li>
            <li>
              在 <Text code>onSearch</Text> 回调中检查{' '}
              <Text code>composing</Text>，为 <Text code>true</Text> 时直接
              return。
            </li>
            <li>
              <Text code>useEffect</Text>{' '}
              返回清理函数，组件卸载时移除监听防止内存泄漏。
            </li>
          </ol>
        </Paragraph>
      </Card>
    </div>
  );
};

export default SelectIMEDemo;
