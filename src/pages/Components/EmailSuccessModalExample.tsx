import React, { useState } from 'react';
import { Button, Space, App } from '@derbysoft/neat-design';
import EmailSuccessModal from '../../components/EmailSuccessModal';
import './EmailSuccessModalExample.scss';

// Example page component for EmailSuccessModal
const EmailSuccessModalExample: React.FC = () => {
  const [openBasic, setOpenBasic] = useState(false);
  const { message } = App.useApp();

  const handleOpenBasic = () => {
    setOpenBasic(true);
  };

  const handleClose = () => {
    setOpenBasic(false);
  };

  const handleSetPassword = () => {
    message.success('Redirecting to password setup page...');
    setOpenBasic(false);
    // In real application, navigate to password setup page
    // navigate('/set-password');
  };

  return (
    <div className="email-success-modal-example">
      <h2 className="email-success-modal-example__title">
        EmailSuccessModal Component Examples
      </h2>

      {/* Basic usage */}
      <div className="email-success-modal-example__section">
        <h3>Basic Usage</h3>
        <p>Click the button to display the email success modal</p>
        <div className="email-success-modal-example__demo-box">
          <Button type="primary" onClick={handleOpenBasic}>
            Show Email Success Modal
          </Button>
        </div>
        <div className="email-success-modal-example__code">
          {`<EmailSuccessModal
  open={open}
  onClose={handleClose}
  onSetPassword={handleSetPassword}
/>`}
        </div>
      </div>

      {/* Component description */}
      <div className="email-success-modal-example__section">
        <h3>Component Description</h3>
        <p>
          The EmailSuccessModal component is used to display a success message
          after email binding. It includes:
        </p>
        <ul className="email-success-modal-example__list">
          <li>Success illustration using Neat Design Illustrations</li>
          <li>Clear success message title</li>
          <li>Descriptive text explaining next steps</li>
          <li>Call-to-action button to proceed to password setup</li>
          <li>Close button in the top-right corner</li>
        </ul>
      </div>

      {/* Props description */}
      <div className="email-success-modal-example__section">
        <h3>Props</h3>
        <table className="email-success-modal-example__table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Description</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>open</td>
              <td>boolean</td>
              <td>Controls modal visibility</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>onClose</td>
              <td>() =&gt; void</td>
              <td>Callback function when modal is closed</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>onSetPassword</td>
              <td>() =&gt; void</td>
              <td>Callback function when user clicks "Set Password" button</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Usage tips */}
      <div className="email-success-modal-example__section">
        <h3>Usage Tips</h3>
        <ul className="email-success-modal-example__list">
          <li>
            Use this modal immediately after successful email binding to guide
            users
          </li>
          <li>
            Ensure the onSetPassword callback properly navigates to the password
            setup page
          </li>
          <li>
            The modal is centered and uses a fixed width of 480px for optimal
            display
          </li>
          <li>
            Users can close the modal by clicking the close button or clicking
            outside the modal
          </li>
        </ul>
      </div>

      {/* Modal instance */}
      <EmailSuccessModal
        open={openBasic}
        onClose={handleClose}
        onSetPassword={handleSetPassword}
      />
    </div>
  );
};

export default EmailSuccessModalExample;
