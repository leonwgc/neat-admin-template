/**
 * @file pages/Components/RichTextEditorExample.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Card, Divider, Button, Space, Tag, Alert } from '@derbysoft/neat-design';
import RichTextEditor from '~/components/RichTextEditor';
import './RichTextEditorExample.scss';

const DEFAULT_HTML = `<p>欢迎使用 <b>RichTextEditor</b> 富文本编辑器！</p><p>这是一个<span style="color:#1677ff">纯原生</span>实现，不依赖任何第三方库。</p><p>试试工具栏上的各项功能 😎</p>`;

/**
 * RichTextEditor demo page
 */
const RichTextEditorExample: FC = () => {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <div className="rte-example">
      <h2 className="rte-example__title">RichTextEditor 富文本编辑器</h2>
      <p className="rte-example__desc">
        基于原生 <code>contenteditable</code> + <code>document.execCommand</code> 实现，零第三方依赖。
        支持加粗、斜体、下划线、删除线、字体大小、文字颜色、对齐方式、列表、撤销/重做和 Emoji 插入。
      </p>

      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="注意：document.execCommand 已被标记为 deprecated，但在主流浏览器中仍完全可用。生产环境推荐使用 TipTap 或 Quill 等专业编辑器。"
      />

      {/* ── 基础编辑器 ── */}
      <Card title="基础用法" className="rte-example__card">
        <RichTextEditor
          defaultValue={DEFAULT_HTML}
          onChange={setHtml}
          placeholder="请输入内容..."
          height={200}
        />
        <div className="rte-example__actions">
          <Space>
            <Button type="primary" onClick={() => setPreviewVisible((v) => !v)}>
              {previewVisible ? '隐藏预览' : '查看 HTML'}
            </Button>
            <Button onClick={() => setHtml('')}>清空内容</Button>
          </Space>
        </div>
        {previewVisible && (
          <div className="rte-example__html-preview">
            <pre>{html}</pre>
          </div>
        )}
      </Card>

      <Divider />

      {/* ── 受控模式 ── */}
      <Card title="受控模式 (value + onChange)" className="rte-example__card">
        <RichTextEditor
          value={html}
          onChange={setHtml}
          height={160}
        />
        <p className="rte-example__hint">
          与上方编辑器共享同一个 <code>html</code> state，两个编辑器内容实时同步。
        </p>
      </Card>

      <Divider />

      {/* ── 只读模式 ── */}
      <Card title="只读模式 (readOnly)" className="rte-example__card">
        <RichTextEditor
          value={DEFAULT_HTML}
          readOnly
          height={100}
        />
        <p className="rte-example__hint">只读模式隐藏工具栏，不可编辑，适合展示已保存的内容。</p>
      </Card>

      <Divider />

      {/* ── 粘贴纯文本 + 字符限制 ── */}
      <Card title="粘贴净化 + 字符限制 (pasteAsPlainText + maxLength)" className="rte-example__card">
        <RichTextEditor
          placeholder="从网页/Word 粘贴内容会自动去除格式..."
          height={120}
          pasteAsPlainText
          maxLength={200}
          showWordCount
        />
        <p className="rte-example__hint">
          开启 <code>pasteAsPlainText</code> 后，从外部粘贴的内容会自动剥离 HTML 格式；
          <code>maxLength=200</code> 超出时底部计数器变红。
        </p>
      </Card>

      <Divider />

      {/* ── 功能说明 ── */}
      <Card title="功能清单" className="rte-example__card">
        <div className="rte-example__feature-list">
          {[
          { label: '加粗 / 斜体 / 下划线 / 删除线', color: 'blue' as const },
            { label: '字体大小（12px - 48px）', color: 'blue' as const },
            { label: '文字颜色 + 背景色（32色板）', color: 'blue' as const },
            { label: '左对齐 / 居中 / 右对齐', color: 'green' as const },
            { label: '有序列表 / 无序列表', color: 'green' as const },
            { label: '缩进 / 减少缩进', color: 'green' as const },
            { label: '上标 / 下标', color: 'green' as const },
            { label: '插入分割线', color: 'orange' as const },
            { label: '插入链接 (Ctrl+K)', color: 'orange' as const },
            { label: '插入图片 URL', color: 'orange' as const },
            { label: '撤销 / 重做 (Ctrl+Z / Ctrl+Y)', color: 'orange' as const },
            { label: '清除格式', color: 'orange' as const },
            { label: '40 个预制 Emoji', color: 'purple' as const },
            { label: '浮动气泡工具栏', color: 'purple' as const },
            { label: '粘贴纯文本模式', color: 'purple' as const },
            { label: 'HTML 源码视图', color: 'purple' as const },
            { label: '全屏编辑 (Esc 退出)', color: 'purple' as const },
            { label: '字符 / 词数统计', color: 'purple' as const },
            { label: '最大字符数限制', color: 'purple' as const },
            { label: '零第三方依赖', color: 'purple' as const },
          ].map((item) => (
            <Tag key={item.label} color={item.color} className="rte-example__tag">
              {item.label}
            </Tag>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RichTextEditorExample;
