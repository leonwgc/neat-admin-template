/**
 * @file pages/Components/TextEllipsisDemo.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Card, Space, Slider, Typography } from '@derbysoft/neat-design';
import { TextEllipsis } from 'components/TextEllipsis';

const { Title, Paragraph } = Typography;

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const chineseText = `这是一段很长的中文文本，用于演示文本省略组件的功能。当文本内容超过指定的行数时，会自动显示省略号。你可以通过设置 rows 属性来控制显示的行数。这个组件支持任意长度的文本，并且会在文本末尾添加省略号，当鼠标悬停时会显示完整的文本内容。组件使用了 CSS 的 -webkit-line-clamp 属性来实现多行文本截断效果，这是一个非常实用的功能。`;

/**
 * TextEllipsis component demo page
 */
const TextEllipsisDemo: FC = () => {
  const [rows, setRows] = useState(2);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>TextEllipsis 文本省略组件</Title>
      <Paragraph>
        用于显示指定行数的文本，超出部分自动显示省略号。鼠标悬停时显示完整内容。
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 基础示例 */}
        <Card title="基础用法 - 单行截断" bordered>
          <div style={{ maxWidth: '400px' }}>
            <TextEllipsis rows={1}>
              This is a very long text that will be truncated to one line with
              ellipsis at the end.
            </TextEllipsis>
          </div>
        </Card>

        {/* 多行截断 */}
        <Card title="多行截断 - 固定 3 行" bordered>
          <div style={{ maxWidth: '600px' }}>
            <TextEllipsis rows={3}>{longText}</TextEllipsis>
          </div>
        </Card>

        {/* 中文文本 */}
        <Card title="中文文本截断 - 固定 2 行" bordered>
          <div style={{ maxWidth: '600px' }}>
            <TextEllipsis rows={2}>{chineseText}</TextEllipsis>
          </div>
        </Card>

        {/* 动态行数控制 */}
        <Card title="动态行数控制" bordered>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <span>行数: {rows}</span>
              <Slider
                min={1}
                max={10}
                value={rows}
                onChange={(value) => setRows(value as number)}
                style={{ width: '300px', marginLeft: '20px' }}
              />
            </div>
            <div style={{ maxWidth: '600px' }}>
              <TextEllipsis rows={rows}>{longText}</TextEllipsis>
            </div>
          </Space>
        </Card>

        {/* 自定义样式 */}
        <Card title="自定义样式" bordered>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ maxWidth: '500px' }}>
              <TextEllipsis
                rows={2}
                style={{
                  fontSize: '16px',
                  color: '#1890ff',
                  lineHeight: '1.8',
                }}
              >
                {chineseText}
              </TextEllipsis>
            </div>
            <div style={{ maxWidth: '500px' }}>
              <TextEllipsis
                rows={3}
                style={{
                  fontSize: '14px',
                  color: '#52c41a',
                  backgroundColor: '#f6ffed',
                  padding: '8px',
                  borderRadius: '4px',
                }}
              >
                {longText}
              </TextEllipsis>
            </div>
          </Space>
        </Card>

        {/* 容器宽度影响 */}
        <Card title="不同容器宽度" bordered>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                宽度 300px:
              </div>
              <div style={{ width: '300px', border: '1px dashed #d9d9d9', padding: '8px' }}>
                <TextEllipsis rows={2}>{chineseText}</TextEllipsis>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                宽度 500px:
              </div>
              <div style={{ width: '500px', border: '1px dashed #d9d9d9', padding: '8px' }}>
                <TextEllipsis rows={2}>{chineseText}</TextEllipsis>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                宽度 100%:
              </div>
              <div style={{ border: '1px dashed #d9d9d9', padding: '8px' }}>
                <TextEllipsis rows={2}>{chineseText}</TextEllipsis>
              </div>
            </div>
          </Space>
        </Card>

        {/* API 说明 */}
        <Card title="API" bordered>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>参数</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>说明</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>类型</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px' }}>children</td>
                <td style={{ padding: '8px' }}>文本内容</td>
                <td style={{ padding: '8px' }}>React.ReactNode</td>
                <td style={{ padding: '8px' }}>-</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px' }}>rows</td>
                <td style={{ padding: '8px' }}>显示的行数</td>
                <td style={{ padding: '8px' }}>number</td>
                <td style={{ padding: '8px' }}>1</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px' }}>className</td>
                <td style={{ padding: '8px' }}>自定义类名</td>
                <td style={{ padding: '8px' }}>string</td>
                <td style={{ padding: '8px' }}>-</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px' }}>style</td>
                <td style={{ padding: '8px' }}>自定义样式</td>
                <td style={{ padding: '8px' }}>React.CSSProperties</td>
                <td style={{ padding: '8px' }}>-</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>title</td>
                <td style={{ padding: '8px' }}>鼠标悬停提示</td>
                <td style={{ padding: '8px' }}>string</td>
                <td style={{ padding: '8px' }}>children 文本</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Space>
    </div>
  );
};

export default TextEllipsisDemo;
