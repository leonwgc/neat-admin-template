/**
 * @file src/pages/Hooks/VerificationCodeCountdown.tsx
 * @author leon.wang
 * @description Verification code countdown example using ahooks and Ant Design Form
 *
 * MCP Services Used:
 * Ant Design:
 * - get_component_info: Form, Button, Input
 * - get_component_example: Form
 * ahooks:
 * - search_hooks: "countdown", "request"
 * - get_hook_info: useCountDown, useRequest, useBoolean
 */

import React from 'react';
import { Button, Input, Space, Card, message, Form } from 'antd';
import { useCountDown, useRequest, useBoolean } from 'ahooks';
import './VerificationCodeCountdown.scss';

interface SendCodeParams {
  phone: string;
}

// Mock API: Send verification code
const sendVerificationCode = (
  params: SendCodeParams
): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.phone && params.phone.length === 11) {
        resolve({ success: true });
      } else {
        reject(new Error('Please enter a valid phone number'));
      }
    }, 1000);
  });
};

const VerificationCodeCountdown: React.FC = () => {
  const [form] = Form.useForm();
  const [targetDate, setTargetDate] = React.useState<number>(0);
  const [isCounting, { setTrue: startCounting, setFalse: stopCounting }] =
    useBoolean(false);

  // Countdown: 60 seconds
  const [, formattedRes] = useCountDown({
    targetDate,
    onEnd: () => {
      stopCounting();
    },
  });

  // Send verification code request
  const { loading, run: sendCode } = useRequest(sendVerificationCode, {
    manual: true,
    onSuccess: () => {
      message.success('Verification code sent successfully!');
      startCounting();
      setTargetDate(Date.now() + 60000); // Start 60s countdown
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleSendCode = async () => {
    try {
      // Validate phone field
      await form.validateFields(['phone']);
      const phone = form.getFieldValue('phone');
      sendCode({ phone });
    } catch (error) {
      // Validation failed, error message will be shown automatically
      console.error('Validation failed:', error);
    }
  };

  const { seconds } = formattedRes;

  return (
    <div className="verification-code-countdown">
      <Card
        title="Verification Code Countdown Example"
        className="verification-code-countdown__card"
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <h3>Feature Description</h3>
            <p>This example demonstrates:</p>
            <ul>
              <li>
                Using <code>useCountDown</code> for countdown timer
              </li>
              <li>
                Using <code>useRequest</code> for async API calls
              </li>
              <li>
                Using <code>useBoolean</code> for state management
              </li>
              <li>Button disabled during countdown</li>
              <li>Automatic countdown after successful code sending</li>
            </ul>
          </div>

          <Form form={form} layout="vertical" initialValues={{ phone: '' }}>
            <Form.Item
              label="Phone Number"
              name="phone"
              validateFirst
              validateDebounce={1000}
              rules={[
                { required: true, message: 'Please enter phone number' },
                { len: 11, message: 'Phone number must be 11 digits' },
                {
                  pattern: /^\d{11}$/,
                  message: 'Please enter a valid phone number',
                },
              ]}
            >
              <Input
                placeholder="Enter 11-digit phone number"
                maxLength={11}
                size="large"
                disabled={isCounting}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={handleSendCode}
                disabled={isCounting}
                loading={loading}
                block
              >
                {isCounting
                  ? `Resend in ${seconds}s`
                  : 'Send Verification Code'}
              </Button>
            </Form.Item>
          </Form>

          <div className="verification-code-countdown__status">
            <h4>Status:</h4>
            <p>
              <strong>Counting:</strong> {isCounting ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Remaining Time:</strong> {seconds}s
            </p>
            <p>
              <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
            </p>
          </div>
        </Space>
      </Card>

      <Card title="Code Example" className="verification-code-countdown__code">
        <pre>
          {`import { Form } from 'antd';
import { useCountDown, useRequest, useBoolean } from 'ahooks';

const Component = () => {
  const [form] = Form.useForm();
  const [isCounting, { setTrue, setFalse }] = useBoolean(false);

  const [countdown, formattedRes] = useCountDown({
    targetDate: 0,
    onEnd: () => setFalse(),
  });

  const { loading, run } = useRequest(sendCodeAPI, {
    manual: true,
    onSuccess: () => {
      setTrue();
      setTargetDate(Date.now() + 60000);
    },
  });

  const handleSendCode = async () => {
    await form.validateFields(['phone']);
    const phone = form.getFieldValue('phone');
    run({ phone });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          { required: true, message: 'Please enter phone number' },
          { len: 11, message: 'Must be 11 digits' },
          { pattern: /^\\d{11}$/, message: 'Invalid phone number' }
        ]}
      >
        <Input disabled={isCounting} />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleSendCode}
          disabled={isCounting}
          loading={loading}
        >
          {isCounting ? \`Resend in \${formattedRes.seconds}s\` : 'Send Code'}
        </Button>
      </Form.Item>
    </Form>
  );
};`}
        </pre>
      </Card>
    </div>
  );
};

export default VerificationCodeCountdown;
