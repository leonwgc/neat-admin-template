/**
 * @file src/pages/Components/MasonryExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Slider,
  InputNumber,
  Row,
  Col,
} from '@derbysoft/neat-design';
import Masonry from '../../components/Masonry';
import './MasonryExample.scss';

interface PhotoItem {
  id: number;
  title: string;
  height: number;
  color: string;
  description?: string;
}

/**
 * Example page for Masonry component
 */
const MasonryExample: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(16);

  // Generate random photo items
  const generateItems = (count: number): PhotoItem[] => {
    const colors = [
      '#1890ff',
      '#52c41a',
      '#faad14',
      '#f5222d',
      '#722ed1',
      '#eb2f96',
      '#13c2c2',
      '#fa8c16',
    ];

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Item ${index + 1}`,
      height: Math.floor(Math.random() * 200) + 150,
      color: colors[index % colors.length],
      description: `This is a description for item ${index + 1}`,
    }));
  };

  const [items] = useState(generateItems(20));
  const [imageItems] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/400/${
        300 + Math.floor(Math.random() * 300)
      }?random=${i}`,
      title: `Photo ${i + 1}`,
    }))
  );

  // Basic render function
  const renderBasicItem = (item: PhotoItem) => (
    <Card
      className="masonry-example__card"
      style={{ backgroundColor: item.color }}
    >
      <div style={{ height: item.height, color: '#fff', padding: '16px' }}>
        <h3 style={{ margin: 0, color: '#fff' }}>{item.title}</h3>
        <p style={{ margin: '8px 0 0', color: '#fff', opacity: 0.9 }}>
          {item.description}
        </p>
      </div>
    </Card>
  );

  // Image render function
  const renderImageItem = (item: {
    id: number;
    url: string;
    title: string;
  }) => (
    <Card
      hoverable
      cover={
        <img
          alt={item.title}
          src={item.url}
          style={{ width: '100%', display: 'block' }}
        />
      }
      className="masonry-example__image-card"
    >
      <Card.Meta title={item.title} description="Click to view details" />
    </Card>
  );

  // Rich content render function
  const renderRichItem = (item: PhotoItem, index: number) => (
    <Card hoverable className="masonry-example__rich-card">
      <div
        className="masonry-example__rich-header"
        style={{ backgroundColor: item.color, height: item.height * 0.4 }}
      >
        <h3 style={{ margin: 0, color: '#fff', padding: '16px' }}>
          {item.title}
        </h3>
      </div>
      <div className="masonry-example__rich-content">
        <p>{item.description}</p>
        <div className="masonry-example__rich-footer">
          <Space>
            <Button type="primary" size="small">
              View
            </Button>
            <Button size="small">Edit</Button>
          </Space>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="masonry-example">
      <h2 className="masonry-example__title">Masonry Component Examples</h2>
      <p className="masonry-example__description">
        A waterfall layout component that automatically distributes items across
        columns with optimal height balance.
      </p>

      {/* Controls */}
      <Card className="masonry-example__controls">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div>
              <label>Columns: {columns}</label>
              <Slider
                min={1}
                max={6}
                value={columns}
                onChange={(value) => setColumns(value)}
              />
            </div>
          </Col>
          <Col span={12}>
            <div>
              <label>Gap: {gap}px</label>
              <Slider
                min={0}
                max={48}
                value={gap}
                onChange={(value) => setGap(value)}
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Example 1: Basic Usage */}
      <div className="masonry-example__section">
        <h3>1. Basic Usage</h3>
        <p>Simple masonry layout with colored cards of varying heights</p>
        <Masonry
          items={items}
          columns={columns}
          gap={gap}
          renderItem={renderBasicItem}
        />
        <div className="masonry-example__code">
          {`<Masonry
  items={items}
  columns={${columns}}
  gap={${gap}}
  renderItem={(item) => (
    <Card style={{ backgroundColor: item.color }}>
      <div style={{ height: item.height }}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </Card>
  )}
/>`}
        </div>
      </div>

      {/* Example 2: Image Gallery */}
      <div className="masonry-example__section">
        <h3>2. Image Gallery</h3>
        <p>Masonry layout with images - perfect for photo galleries</p>
        <Masonry
          items={imageItems}
          columns={columns}
          gap={gap}
          renderItem={renderImageItem}
        />
        <div className="masonry-example__code">
          {`<Masonry
  items={imageItems}
  columns={${columns}}
  gap={${gap}}
  renderItem={(item) => (
    <Card
      hoverable
      cover={<img alt={item.title} src={item.url} />}
    >
      <Card.Meta title={item.title} />
    </Card>
  )}
/>`}
        </div>
      </div>

      {/* Example 3: Responsive Columns */}
      <div className="masonry-example__section">
        <h3>3. Responsive Columns</h3>
        <p>Automatically adjust columns based on screen width</p>
        <Masonry
          items={items.slice(0, 12)}
        //   columns={3}
          gap={16}
          responsive={{
            1200: 4,
            992: 3,
            768: 2,
            576: 1,
          }}
          renderItem={renderBasicItem}
        />
        <div className="masonry-example__code">
          {`<Masonry
  items={items}
  columns={3}
  gap={16}
  responsive={{
    1200: 4,  // 4 columns on large screens
    992: 3,   // 3 columns on medium screens
    768: 2,   // 2 columns on tablets
    576: 1,   // 1 column on mobile
  }}
  renderItem={renderItem}
/>`}
        </div>
      </div>

      {/* API Documentation */}
      <div className="masonry-example__section">
        <h3>Props</h3>
        <table className="masonry-example__table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>items</td>
              <td>T[]</td>
              <td>Array of items to render</td>
              <td>-</td>
            </tr>
            <tr>
              <td>columns</td>
              <td>number</td>
              <td>Number of columns</td>
              <td>3</td>
            </tr>
            <tr>
              <td>gap</td>
              <td>number</td>
              <td>Gap between items (in pixels)</td>
              <td>16</td>
            </tr>
            <tr>
              <td>renderItem</td>
              <td>(item: T, index: number) =&gt; ReactNode</td>
              <td>Custom render function for each item</td>
              <td>-</td>
            </tr>
            <tr>
              <td>className</td>
              <td>string</td>
              <td>Custom className</td>
              <td>''</td>
            </tr>
            <tr>
              <td>responsive</td>
              <td>{`{ [breakpoint: number]: number }`}</td>
              <td>Responsive columns configuration</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Usage Tips */}
      <div className="masonry-example__section">
        <h3>Usage Tips</h3>
        <ul className="masonry-example__list">
          <li>
            Use for photo galleries, Pinterest-style layouts, or content grids
          </li>
          <li>
            Items with varying heights will be distributed evenly across columns
          </li>
          <li>
            The component automatically balances column heights for optimal
            layout
          </li>
          <li>
            Use the responsive prop to adjust columns based on screen width
          </li>
          <li>
            Custom renderItem function provides full control over item
            appearance
          </li>
          <li>Works great with images, cards, or any custom content</li>
        </ul>
      </div>

      {/* Use Cases */}
      <div className="masonry-example__section">
        <h3>Common Use Cases</h3>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Photo Gallery" hoverable>
              <p>
                Display images of varying sizes in an attractive grid layout
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Blog Posts" hoverable>
              <p>Show blog post cards with different content lengths</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Product Showcase" hoverable>
              <p>Display products with varying descriptions and images</p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MasonryExample;
