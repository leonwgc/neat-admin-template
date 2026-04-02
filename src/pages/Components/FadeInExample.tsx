/**
 * @file src/pages/Components/FadeInExample.tsx
 * @author leon.wang
 */

import React from 'react';
import { Card, Space, Button } from '@derbysoft/neat-design';
import FadeIn from '~/components/FadeIn';
import './FadeInExample.scss';

const FadeInExample: React.FC = () => {
  const [key, setKey] = React.useState(0);

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="fade-in-example">
      <h2>FadeIn Component Example</h2>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="Basic Usage" extra={<Button onClick={handleReplay}>Replay Animation</Button>}>
          <FadeIn key={`basic-${key}`}>
            <Card type="inner" title="Card with Fade-in Animation">
              <p>This card appears with a fade-in animation effect.</p>
              <p>The animation is triggered when the component mounts.</p>
            </Card>
          </FadeIn>
        </Card>

        <Card title="Multiple Elements with Different Delays">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <FadeIn key={`delay1-${key}`} delay={0}>
              <Card type="inner" size="small">
                <strong>Element 1</strong> - No delay
              </Card>
            </FadeIn>
            <FadeIn key={`delay2-${key}`} delay={200}>
              <Card type="inner" size="small">
                <strong>Element 2</strong> - 200ms delay
              </Card>
            </FadeIn>
            <FadeIn key={`delay3-${key}`} delay={400}>
              <Card type="inner" size="small">
                <strong>Element 3</strong> - 400ms delay
              </Card>
            </FadeIn>
            <FadeIn key={`delay4-${key}`} delay={600}>
              <Card type="inner" size="small">
                <strong>Element 4</strong> - 600ms delay
              </Card>
            </FadeIn>
          </Space>
        </Card>

        <Card title="Custom Duration and Timing">
          <Space direction="horizontal" size="large" wrap>
            <FadeIn key={`fast-${key}`} duration={300} timingFunction="ease-in">
              <Card type="inner" size="small" style={{ width: 200 }}>
                <div className="fade-in-example__demo-box">
                  <strong>Fast (300ms)</strong>
                  <p>ease-in</p>
                </div>
              </Card>
            </FadeIn>
            <FadeIn key={`medium-${key}`} duration={600} timingFunction="ease-out">
              <Card type="inner" size="small" style={{ width: 200 }}>
                <div className="fade-in-example__demo-box">
                  <strong>Medium (600ms)</strong>
                  <p>ease-out</p>
                </div>
              </Card>
            </FadeIn>
            <FadeIn key={`slow-${key}`} duration={1200} timingFunction="linear">
              <Card type="inner" size="small" style={{ width: 200 }}>
                <div className="fade-in-example__demo-box">
                  <strong>Slow (1200ms)</strong>
                  <p>linear</p>
                </div>
              </Card>
            </FadeIn>
          </Space>
        </Card>

        <Card title="API Reference">
          <table className="fade-in-example__api-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Description</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>children</td>
                <td>Children elements to apply fade-in animation</td>
                <td>ReactNode</td>
                <td>-</td>
              </tr>
              <tr>
                <td>duration</td>
                <td>Animation duration in milliseconds</td>
                <td>number</td>
                <td>600</td>
              </tr>
              <tr>
                <td>delay</td>
                <td>Delay before animation starts in milliseconds</td>
                <td>number</td>
                <td>0</td>
              </tr>
              <tr>
                <td>className</td>
                <td>Custom className</td>
                <td>string</td>
                <td>''</td>
              </tr>
              <tr>
                <td>timingFunction</td>
                <td>Animation timing function</td>
                <td>'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'</td>
                <td>'ease-in-out'</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Space>
    </div>
  );
};

export default FadeInExample;
