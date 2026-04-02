/**
 * @file pages/Components/AnimatedDemo.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Space, Row, Col, Typography, Divider } from '@derbysoft/neat-design';
import { Animated, AnimationType } from 'components/Animated';

import './AnimatedDemo.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * AnimatedDemo page
 * Demonstrates various animation effects and trigger timings of the Animated component
 */
const AnimatedDemo: FC = () => {
  const { t } = useTranslation();
  const [manualPlay, setManualPlay] = useState(false);

  const animationTypes: AnimationType[] = [
    'fade',
    'fadeUp',
    'fadeDown',
    'fadeLeft',
    'fadeRight',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'scale',
    'scaleUp',
    'scaleDown',
    'rotate',
    'bounce',
    'flip',
    'zoom',
  ];

  const triggerManualAnimation = () => {
    setManualPlay(false);
    setTimeout(() => {
      setManualPlay(true);
    }, 50);
  };

  return (
    <div className="animated-demo">
      <div className="animated-demo__hero">
        <Title level={1} className="animated-demo__title">
          {t('pages.components:animatedTitle')}
        </Title>
        <Paragraph className="animated-demo__desc">
          {t('pages.components:animatedDesc')}
        </Paragraph>
      </div>

      {/* onLoad trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnLoad')}
        className="animated-demo__section"
      >
        <div className="animated-demo__grid">
          {animationTypes.slice(0, 8).map((type, index) => (
            <Animated key={type} type={type} duration={800} delay={index * 80}>
              <div className="animated-demo__box" data-type={type}>
                <Text className="animated-demo__box-text">{type}</Text>
              </div>
            </Animated>
          ))}
        </div>
      </Card>

      {/* onHover trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnHover')}
        className="animated-demo__section"
      >
        <div className="animated-demo__grid">
          {['scale', 'scaleUp', 'bounce', 'rotate'].map((type) => (
            <Animated key={type} type={type as AnimationType} trigger="onHover" duration={500}>
              <div className="animated-demo__box animated-demo__box--hover" data-type={type}>
                <Text className="animated-demo__box-text">{type}</Text>
                <div className="animated-demo__box-hint">Hover</div>
              </div>
            </Animated>
          ))}
        </div>
      </Card>

      {/* onClick trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnClick')}
        className="animated-demo__section"
      >
        <div className="animated-demo__grid">
          {['bounce', 'flip', 'zoom', 'rotate'].map((type) => (
            <Animated key={type} type={type as AnimationType} trigger="onClick" duration={600}>
              <div className="animated-demo__box animated-demo__box--clickable" data-type={type}>
                <Text className="animated-demo__box-text">{type}</Text>
                <div className="animated-demo__box-hint">Click</div>
              </div>
            </Animated>
          ))}
        </div>
      </Card>

      {/* onVisible trigger demo */}
      <Card
        title={t('pages.components:animatedSectionOnVisible')}
        className="animated-demo__section"
      >
        <Paragraph className="animated-demo__hint">
          {t('pages.components:animatedOnVisibleDesc')}
        </Paragraph>
        <Row gutter={[20, 20]}>
          {animationTypes.map((type, index) => (
            <Col key={type} xs={24} sm={12} md={8} lg={6}>
              <Animated
                type={type}
                trigger="onVisible"
                duration={800}
                delay={index * 50}
              >
                <div className="animated-demo__visible-card">
                  <Text className="animated-demo__visible-text">{type}</Text>
                </div>
              </Animated>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Manual trigger demo */}
      <Card
        title={t('pages.components:animatedSectionManual')}
        className="animated-demo__section"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Button
            type="primary"
            onClick={triggerManualAnimation}
            className="animated-demo__trigger-btn"
          >
            {t('pages.components:animatedBtnTrigger')}
          </Button>
          <div className="animated-demo__grid">
            {['fadeUp', 'scale', 'bounce', 'flip'].map((type) => (
              <Animated
                key={type}
                type={type as AnimationType}
                trigger="manual"
                play={manualPlay}
                duration={800}
              >
                <div className="animated-demo__box" data-type={type}>
                  <Text className="animated-demo__box-text">{type}</Text>
                </div>
              </Animated>
            ))}
          </div>
        </Space>
      </Card>

      {/* Repeat animation demo */}
      <Card
        title={t('pages.components:animatedSectionRepeat')}
        className="animated-demo__section"
      >
        <div className="animated-demo__grid">
          <Animated type="bounce" repeat duration={1000}>
            <div className="animated-demo__box animated-demo__box--repeat" data-type="bounce">
              <Text className="animated-demo__box-text">Infinite</Text>
              <div className="animated-demo__box-hint">Bounce</div>
            </div>
          </Animated>
          <Animated type="rotate" repeat repeatCount={3} duration={1000}>
            <div className="animated-demo__box animated-demo__box--repeat" data-type="rotate">
              <Text className="animated-demo__box-text">Rotate</Text>
              <div className="animated-demo__box-hint">3 times</div>
            </div>
          </Animated>
          <Animated type="scale" trigger="onHover" repeat duration={600}>
            <div className="animated-demo__box animated-demo__box--hover animated-demo__box--repeat" data-type="scale">
            </div>
          </Animated>
        </div>
      </Card>

      {/* Configuration examples */}
      <Card
        title={t('pages.components:animatedSectionConfig')}
        className="animated-demo__section"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="animated-demo__config-group">
            <div className="animated-demo__config-label">
              {t('pages.components:animatedConfigDuration')}
            </div>
            <div className="animated-demo__config-items">
              <Animated type="fadeUp" duration={300} trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="duration">
                  <span className="animated-demo__config-value">300ms</span>
                </div>
              </Animated>
              <Animated type="fadeUp" duration={600} trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="duration">
                  <span className="animated-demo__config-value">600ms</span>
                </div>
              </Animated>
              <Animated type="fadeUp" duration={1200} trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="duration">
                  <span className="animated-demo__config-value">1200ms</span>
                </div>
              </Animated>
            </div>
          </div>

          <div className="animated-demo__config-group">
            <div className="animated-demo__config-label">
              {t('pages.components:animatedConfigDelay')}
            </div>
            <div className="animated-demo__config-items">
              <Animated type="scale" delay={0} trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="delay">
                  <span className="animated-demo__config-value">0ms</span>
                </div>
              </Animated>
              <Animated type="scale" delay={200} trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="delay">
                  <span className="animated-demo__config-value">200ms</span>
                </div>
              </Animated>
              <Animated type="scale" delay={400} trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="delay">
                  <span className="animated-demo__config-value">400ms</span>
                </div>
              </Animated>
            </div>
          </div>

          <div className="animated-demo__config-group">
            <div className="animated-demo__config-label">
              {t('pages.components:animatedConfigEasing')}
            </div>
            <div className="animated-demo__config-items">
              <Animated type="fadeUp" easing="linear" trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="easing">
                  <span className="animated-demo__config-value">linear</span>
                </div>
              </Animated>
              <Animated type="fadeUp" easing="ease-in" trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="easing">
                  <span className="animated-demo__config-value">ease-in</span>
                </div>
              </Animated>
              <Animated type="fadeUp" easing="ease-out" trigger="onHover">
                <div className="animated-demo__box animated-demo__box--small animated-demo__box--hover" data-config="easing">
                  <span className="animated-demo__config-value">ease-out</span>
                </div>
              </Animated>
            </div>
          </div>
        </Space>
      </Card>

      <Divider />

      {/* Usage example code */}
      <Card
        title={t('pages.components:animatedSectionUsage')}
        className="animated-demo__code-section"
      >
        <Typography>
          <Paragraph>
            <pre className="animated-demo__code">
              {`import { Animated } from 'components/Animated';

// Basic usage - fade animation on load
<Animated type="fade" duration={600}>
  <div>Your content</div>
</Animated>

// Hover animation
<Animated type="scale" trigger="onHover">
  <Button>Hover me</Button>
</Animated>

// Click animation
<Animated type="bounce" trigger="onClick">
  <div>Click me</div>
</Animated>

// Viewport visibility animation
<Animated type="fadeUp" trigger="onVisible" delay={200}>
  <Card>This animates when scrolled into view</Card>
</Animated>

// Manual control
const [play, setPlay] = useState(false);
<Animated type="zoom" trigger="manual" play={play}>
  <div>Controlled animation</div>
</Animated>

// Repeat animation
<Animated type="rotate" repeat repeatCount={3}>
  <div>Repeats 3 times</div>
</Animated>`}
            </pre>
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default AnimatedDemo;
