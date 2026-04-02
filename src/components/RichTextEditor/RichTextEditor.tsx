/**
 * @file components/RichTextEditor/RichTextEditor.tsx
 * @author leon.wang
 */
import React, { FC, useRef, useEffect, useCallback, useState } from 'react';
import { Tooltip, Popover, Modal, Input } from '@derbysoft/neat-design';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  ClearOutlined,
  SmileOutlined,
  LinkOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CodeOutlined,
  MinusOutlined,
  PictureOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './RichTextEditor.scss';

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '48'];

const COLORS = [
  '#000000',
  '#434343',
  '#666666',
  '#999999',
  '#b7b7b7',
  '#cccccc',
  '#d9d9d9',
  '#ffffff',
  '#ff0000',
  '#ff4500',
  '#ff9900',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#1a73e8',
  '#9900ff',
  '#f4cccc',
  '#fce5cd',
  '#fff2cc',
  '#d9ead3',
  '#d0e0e3',
  '#cfe2f3',
  '#d9d2e9',
  '#ead1dc',
  '#ea9999',
  '#f9cb9c',
  '#ffe599',
  '#b6d7a8',
  '#a2c4c9',
  '#9fc5e8',
  '#b4a7d6',
  '#d5a6bd',
];

const EMOJIS = [
  '😀',
  '😂',
  '🤣',
  '😍',
  '🥰',
  '😎',
  '🤔',
  '😅',
  '👍',
  '👎',
  '👏',
  '🙏',
  '🤝',
  '✌️',
  '🖐️',
  '💪',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🖤',
  '🤍',
  '🎉',
  '🎊',
  '🎈',
  '🚀',
  '⭐',
  '🌟',
  '💯',
  '🔥',
  '🌈',
  '☀️',
  '🌙',
  '⚡',
  '🌊',
  '🌸',
  '🍎',
  '🍕',
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  /** Initial HTML content */
  defaultValue?: string;
  /** Controlled HTML content */
  value?: string;
  /** Called when content changes, returns inner HTML string */
  onChange?: (html: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Editor min-height in px */
  height?: number;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Additional className */
  className?: string;
  /** Maximum character count; shows warning in footer when exceeded */
  maxLength?: number;
  /** Show character and word count footer (default: true) */
  showWordCount?: boolean;
  /** Strip HTML formatting on paste — plain text only (default: false) */
  pasteAsPlainText?: boolean;
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

interface ToolbarBtnProps {
  title: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const ToolbarBtn: FC<ToolbarBtnProps> = ({
  title,
  active,
  onClick,
  children,
}) => (
  <Tooltip title={title} placement="top">
    <button
      type="button"
      className={`rte-toolbar__btn${active ? ' rte-toolbar__btn--active' : ''}`}
      onMouseDown={(e) => {
        e.preventDefault(); // prevent editor blur before execCommand
        onClick();
      }}
    >
      {children}
    </button>
  </Tooltip>
);

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * RichTextEditor — a dependency-free rich text editor built on contenteditable.
 * Supports bold/italic/underline/strikethrough, font size, text color, alignment,
 * ordered/unordered lists, and a preset emoji picker.
 */
const RichTextEditor: FC<RichTextEditorProps> = ({
  defaultValue = '',
  value,
  onChange,
  placeholder = '请输入内容...',
  height = 240,
  readOnly = false,
  className = '',
  maxLength,
  showWordCount = true,
  pasteAsPlainText = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const isControlled = value !== undefined;

  // Format / toolbar state
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>(
    {},
  );
  const [fontSize, setFontSize] = useState('16');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('transparent');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [bgColorPickerOpen, setBgColorPickerOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  // Mode state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState('');
  // Link / image dialog state
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageOpen, setImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  // Bubble toolbar & stats
  const [bubble, setBubble] = useState({ visible: false, x: 0, y: 0 });
  const [stats, setStats] = useState({ chars: 0, words: 0 });

  // Initialize content
  useEffect(() => {
    if (editorRef.current && defaultValue && !isControlled) {
      editorRef.current.innerHTML = defaultValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync controlled value
  useEffect(() => {
    if (
      isControlled &&
      editorRef.current &&
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML = value ?? '';
    }
  }, [isControlled, value]);

  // Exit fullscreen on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isMountedRef = useRef(false);

  // When leaving source mode the editor div re-mounts fresh;
  // write the edited HTML after the ref is attached.
  // Skip on initial mount to avoid overwriting defaultValue/value.
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    if (!isSourceMode && editorRef.current) {
      editorRef.current.innerHTML = sourceHtml;
      triggerChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSourceMode]);

  // Hide bubble toolbar on scroll
  useEffect(() => {
    const onScroll = () =>
      setBubble((v) => (v.visible ? { ...v, visible: false } : v));
    window.addEventListener('scroll', onScroll, true); // capture phase catches all scroll containers
    return () => window.removeEventListener('scroll', onScroll, true);
  }, []);

  // Save selection before toolbar interaction (called on selectionchange)
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (
      sel &&
      sel.rangeCount > 0 &&
      editorRef.current?.contains(sel.anchorNode)
    ) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  // Restore saved selection
  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (savedRangeRef.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    } else {
      editorRef.current?.focus();
    }
  }, []);

  // Execute a document.execCommand and refresh toolbar state
  const exec = useCallback(
    (command: string, value?: string) => {
      restoreSelection();
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      updateToolbarState();
      updateStats();
      triggerChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const closeBubble = useCallback(
    () => setBubble((v) => ({ ...v, visible: false })),
    [],
  );

  const triggerChange = useCallback(() => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const updateToolbarState = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      superscript: document.queryCommandState('superscript'),
      subscript: document.queryCommandState('subscript'),
    });
    const size = document.queryCommandValue('fontSize');
    if (size) {
      // execCommand fontSize uses 1–7, map back from pt values
      const ptMap: Record<string, string> = {
        '1': '10',
        '2': '13',
        '3': '16',
        '4': '18',
        '5': '24',
        '6': '32',
        '7': '48',
      };
      setFontSize(ptMap[size] ?? '16');
    }
    const color = document.queryCommandValue('foreColor');
    if (color) setTextColor(rgbToHex(color));
  }, []);

  // Insert emoji at cursor position
  const insertEmoji = useCallback(
    (emoji: string) => {
      restoreSelection();
      document.execCommand('insertText', false, emoji);
      editorRef.current?.focus();
      triggerChange();
      setEmojiOpen(false);
    },
    [restoreSelection, triggerChange],
  );

  // Font size uses execCommand 1–7 scale; map px → level
  const applyFontSize = useCallback(
    (px: string) => {
      const levels: Record<string, string> = {
        '10': '1',
        '12': '1',
        '13': '2',
        '14': '2',
        '16': '3',
        '18': '4',
        '20': '4',
        '24': '5',
        '28': '5',
        '32': '6',
        '36': '6',
        '48': '7',
      };
      const level = levels[px] ?? '3';
      setFontSize(px);
      exec('fontSize', level);
    },
    [exec],
  );

  const applyColor = useCallback(
    (color: string) => {
      setTextColor(color);
      setColorPickerOpen(false);
      exec('foreColor', color);
    },
    [exec],
  );

  const applyBgColor = useCallback(
    (color: string) => {
      setBgColor(color);
      setBgColorPickerOpen(false);
      exec('hiliteColor', color);
    },
    [exec],
  );

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => setIsFullscreen((v) => !v), []);

  // Source mode toggle
  const toggleSourceMode = useCallback(() => {
    if (!isSourceMode) {
      // Entering source mode: snapshot current HTML into textarea
      setSourceHtml(editorRef.current?.innerHTML ?? '');
    }
    setIsSourceMode((v) => !v);
    setBubble({ visible: false, x: 0, y: 0 });
  }, [isSourceMode]);

  // Insert link
  const openLinkDialog = useCallback(() => {
    saveSelection();
    setLinkText(window.getSelection()?.toString() ?? '');
    setLinkUrl('');
    setBubble({ visible: false, x: 0, y: 0 });
    setLinkOpen(true);
  }, [saveSelection]);

  const confirmLink = useCallback(() => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    if (window.getSelection()?.toString()) {
      document.execCommand('createLink', false, linkUrl.trim());
    } else {
      const text = linkText.trim() || linkUrl.trim();
      document.execCommand(
        'insertHTML',
        false,
        `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer">${text}</a>`,
      );
    }
    editorRef.current?.querySelectorAll('a:not([target])').forEach((a) => {
      (a as HTMLAnchorElement).target = '_blank';
      (a as HTMLAnchorElement).rel = 'noopener noreferrer';
    });
    editorRef.current?.focus();
    triggerChange();
    setLinkOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkUrl, linkText]);

  // Insert image by URL
  const openImageDialog = useCallback(() => {
    saveSelection();
    setImageUrl('');
    setBubble({ visible: false, x: 0, y: 0 });
    setImageOpen(true);
  }, [saveSelection]);

  const confirmImage = useCallback(() => {
    if (!imageUrl.trim()) return;
    restoreSelection();
    document.execCommand('insertImage', false, imageUrl.trim());
    editorRef.current?.focus();
    triggerChange();
    setImageOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  // Paste as plain text (strips HTML from clipboard)
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (!pasteAsPlainText) return;
      e.preventDefault();
      document.execCommand(
        'insertText',
        false,
        e.clipboardData.getData('text/plain'),
      );
      triggerChange();
    },
    [pasteAsPlainText, triggerChange],
  );

  // Word / char stats
  const updateStats = useCallback(() => {
    const text = editorRef.current?.innerText ?? '';
    setStats({
      chars: text.replace(/[\r\n]/g, '').length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
    });
  }, []);

  // Floating bubble position (fixed, viewport-relative)
  const updateBubble = useCallback(() => {
    const sel = window.getSelection();
    if (
      !sel ||
      sel.isCollapsed ||
      !editorRef.current?.contains(sel.anchorNode)
    ) {
      setBubble((v) => ({ ...v, visible: false }));
      return;
    }
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    setBubble({ visible: true, x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  // Combined handler for editor keyup / mouseup events
  const handleEditorInteraction = useCallback(() => {
    updateToolbarState();
    updateStats();
    updateBubble();
    saveSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Background color picker popover content
  const bgColorPicker = (
    <div className="rte-color-picker">
      {/* Transparent / clear option */}
      <button
        type="button"
        className={`rte-color-picker__swatch rte-color-picker__swatch--transparent${bgColor === 'transparent' ? ' rte-color-picker__swatch--active' : ''}`}
        onMouseDown={(e) => {
          e.preventDefault();
          applyBgColor('transparent');
        }}
        title="清除背景色"
      />
      {COLORS.filter((c) => c !== '#000000').map((c) => (
        <button
          key={c}
          type="button"
          className={`rte-color-picker__swatch${c === bgColor ? ' rte-color-picker__swatch--active' : ''}`}
          style={{ background: c }}
          onMouseDown={(e) => {
            e.preventDefault();
            applyBgColor(c);
          }}
        />
      ))}
    </div>
  );

  // ── Color picker popover content
  const colorPicker = (
    <div className="rte-color-picker">
      {COLORS.map((c) => (
        <button
          key={c}
          type="button"
          className={`rte-color-picker__swatch${c === textColor ? ' rte-color-picker__swatch--active' : ''}`}
          style={{ background: c }}
          onMouseDown={(e) => {
            e.preventDefault();
            applyColor(c);
          }}
        />
      ))}
    </div>
  );

  // ── Emoji picker popover content
  const emojiPicker = (
    <div className="rte-emoji-picker">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className="rte-emoji-picker__item"
          onMouseDown={(e) => {
            e.preventDefault();
            insertEmoji(emoji);
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ── Link dialog ── */}
      <Modal
        open={linkOpen}
        title="插入链接"
        onOk={confirmLink}
        onCancel={() => setLinkOpen(false)}
        width={420}
        centered
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            paddingTop: 8,
          }}
        >
          <div>
            <div style={{ marginBottom: 4, fontSize: 13 }}>链接地址 *</div>
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              onPressEnter={confirmLink}
              autoFocus
            />
          </div>
          <div>
            <div style={{ marginBottom: 4, fontSize: 13 }}>
              显示文字（留空则使用链接地址）
            </div>
            <Input
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="链接文字"
            />
          </div>
        </div>
      </Modal>

      {/* ── Image dialog ── */}
      <Modal
        open={imageOpen}
        title="插入图片"
        onOk={confirmImage}
        onCancel={() => setImageOpen(false)}
        width={420}
        centered
      >
        <div style={{ paddingTop: 8 }}>
          <div style={{ marginBottom: 4, fontSize: 13 }}>图片地址</div>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            onPressEnter={confirmImage}
            autoFocus
          />
        </div>
      </Modal>

      {/* ── Floating bubble toolbar (position: fixed, viewport coords) ── */}
      {bubble.visible && !isSourceMode && !readOnly && (
        <div
          className="rte-bubble"
          style={{ left: bubble.x, top: bubble.y - 46 }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <ToolbarBtn
            title="加粗"
            active={activeFormats.bold}
            onClick={() => exec('bold')}
          >
            <BoldOutlined />
          </ToolbarBtn>
          <ToolbarBtn
            title="斜体"
            active={activeFormats.italic}
            onClick={() => exec('italic')}
          >
            <ItalicOutlined />
          </ToolbarBtn>
          <ToolbarBtn
            title="下划线"
            active={activeFormats.underline}
            onClick={() => exec('underline')}
          >
            <UnderlineOutlined />
          </ToolbarBtn>
          <ToolbarBtn
            title="删除线"
            active={activeFormats.strikeThrough}
            onClick={() => exec('strikeThrough')}
          >
            <StrikethroughOutlined />
          </ToolbarBtn>
          <span className="rte-bubble__divider" />
          <ToolbarBtn title="插入链接" onClick={openLinkDialog}>
            <LinkOutlined />
          </ToolbarBtn>
          <ToolbarBtn title="清除格式" onClick={() => exec('removeFormat')}>
            <ClearOutlined />
          </ToolbarBtn>
          <span className="rte-bubble__arrow" />
        </div>
      )}

      {/* ── Editor container ── */}
      <div
        ref={containerRef}
        className={`rte ${className}${isFullscreen ? ' rte--fullscreen' : ''}`}
      >
        {/* ── Toolbar ── */}
        {!readOnly && (
          <div className="rte-toolbar" onClick={closeBubble}>
            {/* Inline formats */}
            <ToolbarBtn
              title="加粗 (Ctrl+B)"
              active={activeFormats.bold}
              onClick={() => exec('bold')}
            >
              <BoldOutlined />
            </ToolbarBtn>
            <ToolbarBtn
              title="斜体 (Ctrl+I)"
              active={activeFormats.italic}
              onClick={() => exec('italic')}
            >
              <ItalicOutlined />
            </ToolbarBtn>
            <ToolbarBtn
              title="下划线 (Ctrl+U)"
              active={activeFormats.underline}
              onClick={() => exec('underline')}
            >
              <UnderlineOutlined />
            </ToolbarBtn>
            <ToolbarBtn
              title="删除线"
              active={activeFormats.strikeThrough}
              onClick={() => exec('strikeThrough')}
            >
              <StrikethroughOutlined />
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* Font size */}
            <Tooltip title="字体大小" placement="top">
              <select
                className="rte-toolbar__select"
                value={fontSize}
                onMouseDown={saveSelection}
                onChange={(e) => applyFontSize(e.target.value)}
              >
                {FONT_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}px
                  </option>
                ))}
              </select>
            </Tooltip>

            {/* Text color */}
            <Popover
              content={colorPicker}
              trigger="click"
              open={colorPickerOpen}
              onOpenChange={(v) => { if (v) saveSelection(); setColorPickerOpen(v); }}
              placement="bottomLeft"
            >
              <Tooltip title="文字颜色" placement="top">
                <button
                  type="button"
                  className="rte-toolbar__color-btn"
                  onMouseDown={saveSelection}
                >
                  <span className="rte-toolbar__color-btn-text">A</span>
                  <span
                    className="rte-toolbar__color-indicator"
                    style={{ background: textColor }}
                  />
                </button>
              </Tooltip>
            </Popover>

            {/* Background color */}
            <Popover
              content={bgColorPicker}
              trigger="click"
              open={bgColorPickerOpen}
              onOpenChange={(v) => { if (v) saveSelection(); setBgColorPickerOpen(v); }}
              placement="bottomLeft"
            >
              <Tooltip title="背景颜色" placement="top">
                <button
                  type="button"
                  className="rte-toolbar__color-btn"
                  onMouseDown={saveSelection}
                >
                  <span
                    className="rte-toolbar__color-btn-text"
                    style={{ fontSize: 11 }}
                  >
                    bg
                  </span>
                  <span
                    className="rte-toolbar__color-indicator"
                    style={{
                      background:
                        bgColor === 'transparent'
                          ? 'linear-gradient(135deg, #fff 45%, #f00 45%, #f00 55%, #fff 55%)'
                          : bgColor,
                      border: '1px solid rgba(0,0,0,0.15)',
                    }}
                  />
                </button>
              </Tooltip>
            </Popover>

            <span className="rte-toolbar__divider" />

            {/* Alignment */}
            <ToolbarBtn
              title="左对齐"
              active={activeFormats.justifyLeft}
              onClick={() => exec('justifyLeft')}
            >
              <AlignLeftOutlined />
            </ToolbarBtn>
            <ToolbarBtn
              title="居中"
              active={activeFormats.justifyCenter}
              onClick={() => exec('justifyCenter')}
            >
              <AlignCenterOutlined />
            </ToolbarBtn>
            <ToolbarBtn
              title="右对齐"
              active={activeFormats.justifyRight}
              onClick={() => exec('justifyRight')}
            >
              <AlignRightOutlined />
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* Lists */}
            <ToolbarBtn
              title="有序列表"
              active={activeFormats.insertOrderedList}
              onClick={() => exec('insertOrderedList')}
            >
              <OrderedListOutlined />
            </ToolbarBtn>
            <ToolbarBtn
              title="无序列表"
              active={activeFormats.insertUnorderedList}
              onClick={() => exec('insertUnorderedList')}
            >
              <UnorderedListOutlined />
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* Emoji */}
            <Popover
              content={emojiPicker}
              trigger="click"
              open={emojiOpen}
              onOpenChange={(v) => {
                if (v) saveSelection();
                setEmojiOpen(v);
              }}
              placement="bottomLeft"
            >
              <Tooltip title="插入表情" placement="top">
                <button
                  type="button"
                  className="rte-toolbar__btn"
                  onMouseDown={saveSelection}
                >
                  <SmileOutlined />
                </button>
              </Tooltip>
            </Popover>

            {/* Clear formatting */}
            <ToolbarBtn title="清除格式" onClick={() => exec('removeFormat')}>
              <ClearOutlined />
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* Indent / outdent */}
            <ToolbarBtn title="减少缩进" onClick={() => exec('outdent')}>
              <MenuFoldOutlined />
            </ToolbarBtn>
            <ToolbarBtn title="增加缩进" onClick={() => exec('indent')}>
              <MenuUnfoldOutlined />
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* Superscript / subscript */}
            <ToolbarBtn
              title="上标"
              active={activeFormats.superscript}
              onClick={() => exec('superscript')}
            >
              <span className="rte-toolbar__text-icon">x²</span>
            </ToolbarBtn>
            <ToolbarBtn
              title="下标"
              active={activeFormats.subscript}
              onClick={() => exec('subscript')}
            >
              <span className="rte-toolbar__text-icon rte-toolbar__text-icon--sub">
                x₂
              </span>
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* Horizontal rule */}
            <ToolbarBtn
              title="插入分割线"
              onClick={() => exec('insertHorizontalRule')}
            >
              <MinusOutlined />
            </ToolbarBtn>
            {/* Link */}
            <ToolbarBtn title="插入链接 (Ctrl+K)" onClick={openLinkDialog}>
              <LinkOutlined />
            </ToolbarBtn>
            {/* Image */}
            <ToolbarBtn title="插入图片 URL" onClick={openImageDialog}>
              <PictureOutlined />
            </ToolbarBtn>

            <span className="rte-toolbar__divider" />

            {/* HTML source view */}
            <ToolbarBtn
              title="HTML 源码视图"
              active={isSourceMode}
              onClick={toggleSourceMode}
            >
              <CodeOutlined />
            </ToolbarBtn>
            {/* Fullscreen */}
            <ToolbarBtn
              title={isFullscreen ? '退出全屏 (Esc)' : '全屏编辑'}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <FullscreenExitOutlined />
              ) : (
                <FullscreenOutlined />
              )}
            </ToolbarBtn>
          </div>
        )}

        {/* ── Source mode / Editor area ── */}
        {isSourceMode ? (
          <textarea
            className="rte-source"
            value={sourceHtml}
            style={{ minHeight: isFullscreen ? undefined : height }}
            onChange={(e) => setSourceHtml(e.target.value)}
          />
        ) : (
          <div
            ref={editorRef}
            className={`rte-content${readOnly ? ' rte-content--readonly' : ''}`}
            contentEditable={!readOnly}
            suppressContentEditableWarning
            style={{ minHeight: isFullscreen ? undefined : height }}
            data-placeholder={placeholder}
            onInput={() => {
              triggerChange();
              updateStats();
            }}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openLinkDialog();
              }
            }}
            onKeyUp={handleEditorInteraction}
            onMouseUp={handleEditorInteraction}
            onSelect={saveSelection}
            onPaste={handlePaste}
          />
        )}

        {/* ── Footer: word count / char limit ── */}
        {!readOnly && (showWordCount || maxLength !== undefined) && (
          <div className="rte-footer">
            {showWordCount && (
              <span className="rte-footer__stats">
                {stats.words} 词 · {stats.chars} 字符
              </span>
            )}
            {maxLength !== undefined && (
              <span
                className={`rte-footer__limit${stats.chars > maxLength ? ' rte-footer__limit--over' : ''}`}
              >
                {stats.chars} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RichTextEditor;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert rgb(r,g,b) string returned by queryCommandValue to #rrggbb */
function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return rgb;
  return (
    '#' +
    [match[1], match[2], match[3]]
      .map((n) => parseInt(n).toString(16).padStart(2, '0'))
      .join('')
  );
}
