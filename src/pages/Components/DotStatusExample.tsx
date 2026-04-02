import { Card, Space, Divider } from '@derbysoft/neat-design';
import DotStatus from '../../components/DotStatus';
import './DotStatusExample.scss';

/**
 * DotStatus 组件示例页面
 * 展示 DotStatus 组件的各种使用场景
 */
const DotStatusExample = () => {
  return (
    <div className="dot-status-example">
      <Card title="DotStatus 组件示例" className="dot-status-example__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="dot-status-example__description">
            <p>
              <strong>DotStatus</strong> 是一个用于显示状态的组件，由一个彩色圆点和文本组成。
            </p>
            <p>
              常用于显示订单状态、任务进度、系统状态等场景。
            </p>
          </div>

          <Card title="基础用法" type="inner">
            <Space direction="vertical" size="middle">
              <DotStatus text="待处理" />
              <DotStatus text="进行中" iconColor="#1890ff" />
              <DotStatus text="已完成" iconColor="#52c41a" />
              <DotStatus text="已取消" iconColor="#999" />
            </Space>
          </Card>

          <Card title="带描述信息" type="inner">
            <Space direction="vertical" size="middle">
              <DotStatus
                text="订单待支付"
                description="请在30分钟内完成支付"
                iconColor="#faad14"
              />
              <DotStatus
                text="订单处理中"
                description="预计2小时内发货"
                iconColor="#1890ff"
              />
              <DotStatus
                text="订单已完成"
                description="感谢您的购买"
                iconColor="#52c41a"
              />
              <DotStatus
                text="订单已取消"
                description="已退款至原支付账户"
                iconColor="#999"
              />
            </Space>
          </Card>

          <Card title="自定义颜色" type="inner">
            <Space direction="vertical" size="middle">
              <DotStatus
                text="成功状态"
                iconColor="#52c41a"
                textColor="#52c41a"
              />
              <DotStatus
                text="警告状态"
                iconColor="#faad14"
                textColor="#faad14"
              />
              <DotStatus
                text="错误状态"
                iconColor="#ff4d4f"
                textColor="#ff4d4f"
              />
              <DotStatus
                text="信息状态"
                iconColor="#1890ff"
                textColor="#1890ff"
              />
              <DotStatus
                text="默认状态"
                iconColor="#d9d9d9"
                textColor="#999"
              />
            </Space>
          </Card>

          <Card title="不同场景应用" type="inner">
            <div className="dot-status-example__scenarios">
              <div className="dot-status-example__scenario">
                <h4>订单状态</h4>
                <Space direction="vertical" size="small">
                  <DotStatus
                    text="待付款"
                    description="订单号: 202311170001"
                    iconColor="#faad14"
                  />
                  <DotStatus
                    text="待发货"
                    description="订单号: 202311170002"
                    iconColor="#1890ff"
                  />
                  <DotStatus
                    text="已发货"
                    description="订单号: 202311170003"
                    iconColor="#13c2c2"
                  />
                  <DotStatus
                    text="已签收"
                    description="订单号: 202311170004"
                    iconColor="#52c41a"
                  />
                </Space>
              </div>

              <div className="dot-status-example__scenario">
                <h4>任务状态</h4>
                <Space direction="vertical" size="small">
                  <DotStatus
                    text="未开始"
                    description="等待分配"
                    iconColor="#d9d9d9"
                  />
                  <DotStatus
                    text="进行中"
                    description="正在处理"
                    iconColor="#1890ff"
                  />
                  <DotStatus
                    text="已暂停"
                    description="等待恢复"
                    iconColor="#faad14"
                  />
                  <DotStatus
                    text="已完成"
                    description="任务完成"
                    iconColor="#52c41a"
                  />
                </Space>
              </div>

              <div className="dot-status-example__scenario">
                <h4>系统状态</h4>
                <Space direction="vertical" size="small">
                  <DotStatus
                    text="在线"
                    description="系统运行正常"
                    iconColor="#52c41a"
                  />
                  <DotStatus
                    text="繁忙"
                    description="负载较高"
                    iconColor="#faad14"
                  />
                  <DotStatus
                    text="离线"
                    description="系统维护中"
                    iconColor="#999"
                  />
                  <DotStatus
                    text="异常"
                    description="请联系管理员"
                    iconColor="#ff4d4f"
                  />
                </Space>
              </div>
            </div>
          </Card>

          <Card title="组件 API" type="inner" className="dot-status-example__api">
            <div className="dot-status-example__table">
              <table>
                <thead>
                  <tr>
                    <th>属性</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>默认值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>text</code></td>
                    <td>主要文本内容</td>
                    <td><code>string</code></td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td><code>description</code></td>
                    <td>描述信息（可选）</td>
                    <td><code>string</code></td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td><code>iconColor</code></td>
                    <td>圆点颜色</td>
                    <td><code>string</code></td>
                    <td><code>#FF9800</code></td>
                  </tr>
                  <tr>
                    <td><code>textColor</code></td>
                    <td>文本颜色</td>
                    <td><code>string</code></td>
                    <td><code>#333</code></td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td>自定义类名</td>
                    <td><code>string</code></td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="使用代码" type="inner" className="dot-status-example__usage">
            <div className="dot-status-example__code">
              <pre>{`import DotStatus from '@/components/DotStatus';

// 基础用法
<DotStatus text="待处理" />

// 带描述
<DotStatus
  text="订单待支付"
  description="请在30分钟内完成支付"
  iconColor="#faad14"
/>

// 自定义颜色
<DotStatus
  text="成功状态"
  iconColor="#52c41a"
  textColor="#52c41a"
/>

// 完整示例
<DotStatus
  text="任务进行中"
  description="预计还需2小时"
  iconColor="#1890ff"
  textColor="#1890ff"
  className="custom-class"
/>`}</pre>
            </div>
          </Card>

          <Divider />

          <div className="dot-status-example__tips">
            <h4>使用建议：</h4>
            <ul>
              <li>根据业务场景选择合适的圆点颜色，保持颜色语义的一致性</li>
              <li>建议使用以下颜色：成功 <code>#52c41a</code>，警告 <code>#faad14</code>，错误 <code>#ff4d4f</code>，信息 <code>#1890ff</code></li>
              <li>描述信息应简洁明了，避免过长的文本</li>
              <li>在列表中使用时，建议保持垂直对齐，使用 Space 组件包裹</li>
              <li>圆点大小为 6px，已经过视觉优化，不建议修改</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default DotStatusExample;
