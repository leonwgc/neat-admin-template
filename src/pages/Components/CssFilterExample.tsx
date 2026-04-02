/**
 * @file src/pages/Components/CssFilterExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { Card, Row, Col, Slider, Switch, Space } from '@derbysoft/neat-design';
import './CssFilterExample.scss';

/**
 * CSS Filter Example component
 */
const CssFilterExample: React.FC = () => {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [saturate, setSaturate] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [dropShadow, setDropShadow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const filterStyle = {
    filter: `
      blur(${blur}px)
      brightness(${brightness}%)
      contrast(${contrast}%)
      grayscale(${grayscale}%)
      saturate(${saturate}%)
      hue-rotate(${hueRotate}deg)
      invert(${invert}%)
      sepia(${sepia}%)
      opacity(${opacity}%)
      ${dropShadow ? 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))' : ''}
    `.trim(),
  };

  const resetFilters = () => {
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setSaturate(100);
    setHueRotate(0);
    setInvert(0);
    setSepia(0);
    setOpacity(100);
    setDropShadow(false);
  };

  return (
    <div className="css-filter-example">
      <Card title="CSS Filter Interactive Demo">
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <div className="css-filter-example__preview">
              <div className="css-filter-example__preview-box" style={filterStyle}>
                <div className="css-filter-example__preview-content">
                  <h2>CSS Filter</h2>
                  <p>Interactive Demo</p>
                  <div className="css-filter-example__color-blocks">
                    <div className="css-filter-example__color-block css-filter-example__color-block--red" />
                    <div className="css-filter-example__color-block css-filter-example__color-block--green" />
                    <div className="css-filter-example__color-block css-filter-example__color-block--blue" />
                  </div>
                </div>
              </div>
              <div className="css-filter-example__code">
                <pre>{`filter: ${filterStyle.filter.replace(/\s+/g, ' ')};`}</pre>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="css-filter-example__controls">
              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div className="css-filter-example__control">
                  <label>blur: {blur}px</label>
                  <Slider min={0} max={20} value={blur} onChange={(val) => setBlur(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>brightness: {brightness}%</label>
                  <Slider min={0} max={200} value={brightness} onChange={(val) => setBrightness(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>contrast: {contrast}%</label>
                  <Slider min={0} max={200} value={contrast} onChange={(val) => setContrast(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>grayscale: {grayscale}%</label>
                  <Slider min={0} max={100} value={grayscale} onChange={(val) => setGrayscale(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>saturate: {saturate}%</label>
                  <Slider min={0} max={200} value={saturate} onChange={(val) => setSaturate(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>hue-rotate: {hueRotate}deg</label>
                  <Slider min={0} max={360} value={hueRotate} onChange={(val) => setHueRotate(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>invert: {invert}%</label>
                  <Slider min={0} max={100} value={invert} onChange={(val) => setInvert(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>sepia: {sepia}%</label>
                  <Slider min={0} max={100} value={sepia} onChange={(val) => setSepia(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>opacity: {opacity}%</label>
                  <Slider min={0} max={100} value={opacity} onChange={(val) => setOpacity(val as number)} />
                </div>

                <div className="css-filter-example__control">
                  <label>
                    <Space>
                      drop-shadow
                      <Switch checked={dropShadow} onChange={setDropShadow} />
                    </Space>
                  </label>
                </div>

                <button className="css-filter-example__reset-btn" onClick={resetFilters}>
                  Reset All Filters
                </button>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="Hover Effects">
            <div className="css-filter-example__hover-demo">
              <div className="css-filter-example__hover-item css-filter-example__hover-item--brightness">
                Brightness
              </div>
              <div className="css-filter-example__hover-item css-filter-example__hover-item--grayscale">
                Grayscale
              </div>
              <div className="css-filter-example__hover-item css-filter-example__hover-item--blur">
                Blur
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Preset Effects">
            <div className="css-filter-example__preset-demo">
              <div className="css-filter-example__preset-item css-filter-example__preset-item--vintage">
                Vintage
              </div>
              <div className="css-filter-example__preset-item css-filter-example__preset-item--cool">
                Cool
              </div>
              <div className="css-filter-example__preset-item css-filter-example__preset-item--warm">
                Warm
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Backdrop Filter">
            <div className="css-filter-example__backdrop-demo">
              <div className="css-filter-example__backdrop-bg">
                <div className="css-filter-example__backdrop-content">
                  Glassmorphism
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card
            title="Dark Mode (Filter-based Theme Switching)"
            extra={
              <Space>
                <span>Dark Mode:</span>
                <Switch checked={darkMode} onChange={setDarkMode} />
              </Space>
            }
          >
            <div className={`css-filter-example__theme-demo ${darkMode ? 'css-filter-example__theme-demo--dark' : ''}`}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <div className="css-filter-example__theme-card">
                    <h3>Card Title</h3>
                    <p>This is a sample card content. Toggle dark mode to see the filter effect.</p>
                    <button className="css-filter-example__theme-btn">Action Button</button>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="css-filter-example__theme-card">
                    <h3>Image Example</h3>
                    <div className="css-filter-example__theme-image">
                      <div className="css-filter-example__theme-image-content">
                        <div className="css-filter-example__theme-icon">🌞</div>
                        <p>Sunny Day</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="css-filter-example__theme-card">
                    <h3>Text Content</h3>
                    <ul className="css-filter-example__theme-list">
                      <li>List item one</li>
                      <li>List item two</li>
                      <li>List item three</li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <div className="css-filter-example__theme-info">
                <strong>CSS Implementation:</strong>
                <pre>{darkMode
                  ? 'filter: invert(1) hue-rotate(180deg);'
                  : 'filter: none;'
                }</pre>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Glassmorphism Effects (玻璃拟态)">
            <div className="css-filter-example__glass-container">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <div className="css-filter-example__glass-card css-filter-example__glass-card--light">
                    <div className="css-filter-example__glass-icon">💎</div>
                    <h3>Light Glass</h3>
                    <p>Classic glassmorphism with light background</p>
                    <div className="css-filter-example__glass-code">
                      <code>blur(10px) saturate(180%)</code>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="css-filter-example__glass-card css-filter-example__glass-card--dark">
                    <div className="css-filter-example__glass-icon">🌙</div>
                    <h3>Dark Glass</h3>
                    <p>Glassmorphism with dark tinted background</p>
                    <div className="css-filter-example__glass-code">
                      <code>blur(12px) brightness(0.9)</code>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="css-filter-example__glass-card css-filter-example__glass-card--gradient">
                    <div className="css-filter-example__glass-icon">🎨</div>
                    <h3>Gradient Glass</h3>
                    <p>Colorful gradient with glass effect</p>
                    <div className="css-filter-example__glass-code">
                      <code>blur(15px) saturate(200%)</code>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={8}>
                  <div className="css-filter-example__glass-card css-filter-example__glass-card--frosted">
                    <div className="css-filter-example__glass-icon">❄️</div>
                    <h3>Frosted Glass</h3>
                    <p>Heavy blur with frost effect</p>
                    <div className="css-filter-example__glass-code">
                      <code>blur(20px) brightness(1.15)</code>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="css-filter-example__glass-card css-filter-example__glass-card--colorful">
                    <div className="css-filter-example__glass-icon">🌈</div>
                    <h3>Colorful Glass</h3>
                    <p>Vibrant colors with saturation boost</p>
                    <div className="css-filter-example__glass-code">
                      <code>blur(10px) saturate(250%)</code>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="css-filter-example__glass-card css-filter-example__glass-card--contrast">
                    <div className="css-filter-example__glass-icon">⚡</div>
                    <h3>High Contrast</h3>
                    <p>Sharp edges with contrast enhancement</p>
                    <div className="css-filter-example__glass-code">
                      <code>blur(8px) contrast(130%)</code>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Modal with Backdrop Blur Effect">
            <div className="css-filter-example__modal-trigger">
              <button
                className="css-filter-example__modal-btn"
                onClick={() => setModalOpen(true)}
              >
                Open Modal with Blur Background
              </button>
              <p className="css-filter-example__modal-description">
                Click to see a modal with backdrop-filter blur effect on the mask.
                The background content will be blurred when the modal is open.
              </p>
            </div>

            {/* Background content for demonstration */}
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col span={8}>
                <div className="css-filter-example__sample-card">
                  <h4>Sample Card 1</h4>
                  <p>This content will be blurred when modal opens.</p>
                </div>
              </Col>
              <Col span={8}>
                <div className="css-filter-example__sample-card">
                  <h4>Sample Card 2</h4>
                  <p>Watch the blur effect applied to the background.</p>
                </div>
              </Col>
              <Col span={8}>
                <div className="css-filter-example__sample-card">
                  <h4>Sample Card 3</h4>
                  <p>backdrop-filter creates a glassmorphism effect.</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Custom Modal with Backdrop Filter */}
      {modalOpen && (
        <div className="css-filter-example__modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="css-filter-example__modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="css-filter-example__modal-header">
              <h2>Modal with Backdrop Blur</h2>
              <button
                className="css-filter-example__modal-close"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="css-filter-example__modal-body">
              <p>
                This modal uses <code>backdrop-filter: blur(10px)</code> on the overlay
                to create a blurred background effect.
              </p>
              <div className="css-filter-example__modal-code">
                <strong>CSS Implementation:</strong>
                <pre>{`.modal-overlay {
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
}`}</pre>
              </div>
              <p>
                This creates a modern glassmorphism effect commonly seen in
                iOS, macOS, and modern web applications.
              </p>
            </div>
            <div className="css-filter-example__modal-footer">
              <button
                className="css-filter-example__modal-btn css-filter-example__modal-btn--secondary"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}    </div>
  );
};

export default CssFilterExample;
