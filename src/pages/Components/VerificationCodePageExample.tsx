/**
 * @file src/pages/Components/VerificationCodePageExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import { App, Button, Space, Card } from '@derbysoft/neat-design';
import VerificationCodePage from '../../components/VerificationCodePage';
import './VerificationCodePageExample.scss';

// Example page component for VerificationCodePage
const VerificationCodePageExample: React.FC = () => {
  const { message } = App.useApp();
  const [showDemo, setShowDemo] = useState(false);

  const handleComplete = (code: string) => {
    message.success(`Verification code entered: ${code}`);
  };

  const handleResend = () => {
    message.info('Verification code resent successfully');
  };

  const handleGoBack = () => {
    message.info('Going back to previous page');
    setShowDemo(false);
  };

  return (
    <div className="verification-code-page-example">
      {!showDemo ? (
        <>
          <h2 className="verification-code-page-example__title">
            VerificationCodePage Component Examples
          </h2>

          {/* Basic usage */}
          <div className="verification-code-page-example__section">
            <h3>Basic Usage</h3>
            <p>Click the button to see the verification code page in action</p>
            <div className="verification-code-page-example__demo-box">
              <Button type="primary" size="large" onClick={() => setShowDemo(true)}>
                Show Verification Code Page
              </Button>
            </div>
            <div className="verification-code-page-example__code">
              {`<VerificationCodePage
  contact="fe****@gooabcgle.net"
  codeLength={8}
  countdownSeconds={60}
  onComplete={handleComplete}
  onResend={handleResend}
  onGoBack={handleGoBack}
/>`}
            </div>
          </div>

          {/* Component description */}
          <div className="verification-code-page-example__section">
            <h3>Component Description</h3>
            <p>
              The VerificationCodePage component is a complete page for entering verification
              codes. It includes:
            </p>
            <ul className="verification-code-page-example__list">
              <li>Clear instruction text showing where the code was sent</li>
              <li>8-digit verification code input with auto-focus and paste support</li>
              <li>Resend button with countdown timer (60 seconds by default)</li>
              <li>Go back button to return to previous page</li>
              <li>Helpful hint about checking spam folder</li>
              <li>Responsive design for mobile and desktop</li>
            </ul>
          </div>

          {/* Props description */}
          <div className="verification-code-page-example__section">
            <h3>Props</h3>
            <table className="verification-code-page-example__table">
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
                  <td>contact</td>
                  <td>string</td>
                  <td>Email or phone display text (masked)</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>codeLength</td>
                  <td>number</td>
                  <td>Length of verification code</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>countdownSeconds</td>
                  <td>number</td>
                  <td>Countdown seconds for resend button</td>
                  <td>60</td>
                </tr>
                <tr>
                  <td>onComplete</td>
                  <td>(code: string) =&gt; void</td>
                  <td>Callback when verification code is complete</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>onResend</td>
                  <td>() =&gt; void</td>
                  <td>Callback when resend button is clicked</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>onGoBack</td>
                  <td>() =&gt; void</td>
                  <td>Callback when go back button is clicked</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Features */}
          <div className="verification-code-page-example__section">
            <h3>Key Features</h3>
            <div className="verification-code-page-example__features">
              <Card title="Auto-focus" className="verification-code-page-example__feature-card">
                <p>First input automatically focuses when page loads</p>
              </Card>
              <Card title="Auto-advance" className="verification-code-page-example__feature-card">
                <p>Cursor automatically moves to next input after entering a digit</p>
              </Card>
              <Card title="Paste Support" className="verification-code-page-example__feature-card">
                <p>Paste full code and it will be automatically distributed</p>
              </Card>
              <Card title="Countdown Timer" className="verification-code-page-example__feature-card">
                <p>Resend button disabled during countdown (59s)</p>
              </Card>
              <Card title="Responsive" className="verification-code-page-example__feature-card">
                <p>Adapts layout for mobile and desktop screens</p>
              </Card>
              <Card title="Keyboard Nav" className="verification-code-page-example__feature-card">
                <p>Backspace moves to previous input when current is empty</p>
              </Card>
            </div>
          </div>

          {/* Usage tips */}
          <div className="verification-code-page-example__section">
            <h3>Usage Tips</h3>
            <ul className="verification-code-page-example__list">
              <li>Use this component for email or phone verification flows</li>
              <li>Always mask the contact information to protect user privacy</li>
              <li>Implement rate limiting on the backend to prevent abuse of resend</li>
              <li>
                Consider adding error handling for invalid codes (e.g., red border on inputs)
              </li>
              <li>The countdown timer automatically starts when the page loads</li>
              <li>Make sure to validate the code on the backend before proceeding</li>
            </ul>
          </div>

          {/* Code example */}
          <div className="verification-code-page-example__section">
            <h3>Complete Example</h3>
            <div className="verification-code-page-example__code">
              {`import VerificationCodePage from '@/components/VerificationCodePage';
import { message } from '@derbysoft/neat-design';

const MyPage = () => {
  const handleComplete = (code: string) => {
    // Verify code with backend
    verifyCode(code)
      .then(() => {
        message.success('Verification successful!');
        // Navigate to next page
      })
      .catch(() => {
        message.error('Invalid verification code');
      });
  };

  const handleResend = () => {
    // Call API to resend code
    resendCode()
      .then(() => {
        message.info('Code resent to your email');
      });
  };

  return (
    <VerificationCodePage
      contact="fe****@gooabcgle.net"
      codeLength={8}
      countdownSeconds={60}
      onComplete={handleComplete}
      onResend={handleResend}
      onGoBack={() => history.back()}
    />
  );
};`}
            </div>
          </div>
        </>
      ) : (
        <VerificationCodePage
          contact="fe****@gooabcgle.net"
          codeLength={8}
          countdownSeconds={60}
          onComplete={handleComplete}
          onResend={handleResend}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
};

export default VerificationCodePageExample;
