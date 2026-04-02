import { useState } from 'react';
import {
  Card,
  Space,
  Button,
  message,
  Alert,
  Divider,
} from '@derbysoft/neat-design';
import VerificationCodeInput from '../../components/VerificationCodeInput';
import './VerificationCodeExample.scss';
import { useCountDown } from 'ahooks';

/**
 * VerificationCodeInput 组件示例页面
 */
const VerificationCodeExample = () => {
  const [code2, setCode2] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleComplete1 = (code: string) => {
    message.success(`验证码输入完成: ${code}`);
  };

  const handleComplete2 = (code: string) => {
    message.success(`验证码验证成功: ${code}`);
  };

  // verification code countdown
  const [leftSec, setLeftSec] = useState(0);
  const [nth, setNth] = useState(0);

  const [countdown] = useCountDown({
    leftTime: leftSec * 1000, // leftTime、targetDate、interval、onEnd support dynamic change.
    interval: 1000,
    onEnd: () => {
      setNth((prev) => prev + 1);
      setLeftSec(0);
    },
  });

  const handleSendCode = () => {
    message.info('验证码已发送至 +86 13912345678');
    setLeftSec(6);
  };

  return (
    <div className="verification-code-example">
      <Card
        title="验证码输入组件示例"
        className="verification-code-example__card"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="verification-code-example__description">
            <p>
              <strong>VerificationCodeInput</strong>{' '}
              是一个用于输入验证码的组件。
            </p>
            <p>
              支持自动跳转、粘贴、删除、键盘导航等功能，常用于手机验证码、邮箱验证码等场景。
            </p>
          </div>

          <Card title="基础用法" type="inner">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <p className="verification-code-example__label">
                  请输入6位验证码：
                </p>
                <VerificationCodeInput
                  length={6}
                  onComplete={handleComplete1}
                />
              </div>
              <Alert
                message="输入提示"
                description="输入一个数字后会自动跳转到下一个输入框，按 Backspace 键可以删除并返回上一个输入框"
                type="info"
                showIcon
              />
            </Space>
          </Card>

          <Card title="完整验证流程" type="inner">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div className="verification-code-example__phone">
                <p className="verification-code-example__label">
                  验证码已发送至 <strong>+86 13912345678</strong>
                </p>
              </div>

              <div className="verification-code-example__input-group">
                <VerificationCodeInput
                  length={6}
                  onChange={(code) => setCode2(code)}
                  onComplete={handleComplete2}
                />
              </div>

              <div className="verification-code-example__countdown">
                {countdown > 0 ? (
                  <span className="verification-code-example__countdown-text">
                    {Math.round(countdown / 1000)}秒后重新获取
                  </span>
                ) : (
                  <Button type="link" onClick={handleSendCode}>
                    {nth > 0 ? '重新' : ''}获取验证码
                  </Button>
                )}
              </div>

              <div className="verification-code-example__actions">
                <Button type="primary" disabled={code2.length < 6}>
                  验证
                </Button>
                <Button onClick={() => setCode2('')}>重置</Button>
              </div>
            </Space>
          </Card>

          <Card title="自定义长度" type="inner">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <p className="verification-code-example__label">4位验证码：</p>
                <VerificationCodeInput
                  length={4}
                  onComplete={(code) => message.success(`4位验证码: ${code}`)}
                />
              </div>
              <div>
                <p className="verification-code-example__label">8位验证码：</p>
                <VerificationCodeInput
                  length={8}
                  onComplete={(code) => message.success(`8位验证码: ${code}`)}
                />
              </div>
            </Space>
          </Card>

          <Card title="禁用状态" type="inner">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Button
                  type="primary"
                  onClick={() => setIsDisabled(!isDisabled)}
                  style={{ marginBottom: 16 }}
                >
                  {isDisabled ? '启用' : '禁用'}
                </Button>
              </div>
              <VerificationCodeInput length={6} disabled={isDisabled} />
            </Space>
          </Card>

          <Card title="功能特性" type="inner">
            <div className="verification-code-example__features">
              <ul>
                <li>
                  <strong>自动跳转</strong>
                  ：输入一个字符后自动跳转到下一个输入框
                </li>
                <li>
                  <strong>粘贴支持</strong>
                  ：支持直接粘贴完整验证码，自动分配到各个输入框
                </li>
                <li>
                  <strong>删除功能</strong>：按 Backspace
                  键删除当前字符，如果当前为空则删除前一个字符
                </li>
                <li>
                  <strong>键盘导航</strong>：支持左右箭头键在输入框之间切换
                </li>
                <li>
                  <strong>自动聚焦</strong>：默认自动聚焦第一个输入框
                </li>
                <li>
                  <strong>完成回调</strong>：输入完成后自动触发 onComplete 回调
                </li>
                <li>
                  <strong>仅数字</strong>：只允许输入数字字符
                </li>
              </ul>
            </div>
          </Card>

          <Card
            title="组件 API"
            type="inner"
            className="verification-code-example__api"
          >
            <div className="verification-code-example__table">
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
                    <td>
                      <code>length</code>
                    </td>
                    <td>验证码长度</td>
                    <td>
                      <code>number</code>
                    </td>
                    <td>
                      <code>6</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>onComplete</code>
                    </td>
                    <td>输入完成回调</td>
                    <td>
                      <code>(code: string) =&gt; void</code>
                    </td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>
                      <code>onChange</code>
                    </td>
                    <td>值变化回调</td>
                    <td>
                      <code>(code: string) =&gt; void</code>
                    </td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>
                      <code>disabled</code>
                    </td>
                    <td>是否禁用</td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>false</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>autoFocus</code>
                    </td>
                    <td>是否自动聚焦</td>
                    <td>
                      <code>boolean</code>
                    </td>
                    <td>
                      <code>true</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>className</code>
                    </td>
                    <td>自定义类名</td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            title="使用代码"
            type="inner"
            className="verification-code-example__usage"
          >
            <div className="verification-code-example__code">
              <pre>{`import VerificationCodeInput from '@/components/VerificationCodeInput';

// 基础用法
<VerificationCodeInput
  length={6}
  onChange={(code) => console.log(code)}
  onComplete={(code) => {
    console.log('验证码输入完成:', code);
  }}
/>

// 完整示例
const [code, setCode] = useState('');

<VerificationCodeInput
  length={6}
  onChange={setCode}
  onComplete={(code) => {
    // 验证码输入完成，执行验证逻辑
    verifyCode(code);
  }}
  autoFocus
/>

// 自定义长度
<VerificationCodeInput length={4} />

// 禁用状态
<VerificationCodeInput disabled />`}</pre>
            </div>
          </Card>

          <Divider />

          <div className="verification-code-example__tips">
            <h4>使用建议：</h4>
            <ul>
              <li>验证码长度建议使用 4-8 位，6 位最为常见</li>
              <li>建议配合倒计时功能，避免频繁请求验证码</li>
              <li>在移动端使用时，会自动调起数字键盘</li>
              <li>支持粘贴功能，提升用户体验</li>
              <li>输入完成后建议给予明确的反馈</li>
              <li>可以配合表单验证，确保验证码格式正确</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default VerificationCodeExample;
