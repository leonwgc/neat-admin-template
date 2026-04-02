import React from 'react';
import ContactInfo from '../../components/ContactInfo';
import './ContactInfoExample.scss';

// Example page component for ContactInfo
const ContactInfoExample: React.FC = () => {
  return (
    <div className="contact-info-example">
      <h2 className="contact-info-example__title">ContactInfo Component Examples</h2>

      {/* Basic usage with email and phone */}
      <div className="contact-info-example__section">
        <h3>Basic Usage - Email and Phone</h3>
        <p>Display both email and phone contact information with icons</p>
        <div className="contact-info-example__demo-box">
          <ContactInfo email="contact@example.com" phone="+1 (555) 123-4567" />
        </div>
        <div className="contact-info-example__code">
          {`<ContactInfo
  email="contact@example.com"
  phone="+1 (555) 123-4567"
/>`}
        </div>
      </div>

      {/* Email only */}
      <div className="contact-info-example__section">
        <h3>Email Only</h3>
        <p>Display only email contact information</p>
        <div className="contact-info-example__demo-box">
          <ContactInfo email="support@company.com" />
        </div>
        <div className="contact-info-example__code">
          {`<ContactInfo
  email="support@company.com"
/>`}
        </div>
      </div>

      {/* Phone only */}
      <div className="contact-info-example__section">
        <h3>Phone Only</h3>
        <p>Display only phone contact information</p>
        <div className="contact-info-example__demo-box">
          <ContactInfo phone="+86 138-0000-0000" />
        </div>
        <div className="contact-info-example__code">
          {`<ContactInfo
  phone="+86 138-0000-0000"
/>`}
        </div>
      </div>

      {/* Without icons */}
      <div className="contact-info-example__section">
        <h3>Without Icons</h3>
        <p>Display contact information without icons</p>
        <div className="contact-info-example__demo-box">
          <ContactInfo
            email="info@example.com"
            phone="+1-800-123-4567"
            showIcon={false}
          />
        </div>
        <div className="contact-info-example__code">
          {`<ContactInfo
  email="info@example.com"
  phone="+1-800-123-4567"
  showIcon={false}
/>`}
        </div>
      </div>

      {/* Custom icon size */}
      <div className="contact-info-example__section">
        <h3>Custom Icon Size</h3>
        <p>Adjust the icon size using iconSize prop</p>
        <div className="contact-info-example__demo-box">
          <ContactInfo
            email="large@example.com"
            phone="+1-555-999-8888"
            iconSize={20}
          />
        </div>
        <div className="contact-info-example__code">
          {`<ContactInfo
  email="large@example.com"
  phone="+1-555-999-8888"
  iconSize={20}
/>`}
        </div>
      </div>

      {/* Custom className */}
      <div className="contact-info-example__section">
        <h3>Custom Styling</h3>
        <p>Apply custom styles using className prop</p>
        <div className="contact-info-example__demo-box">
          <ContactInfo
            email="custom@example.com"
            phone="+1-999-888-7777"
            className="custom-contact-style"
          />
        </div>
        <div className="contact-info-example__code">
          {`<ContactInfo
  email="custom@example.com"
  phone="+1-999-888-7777"
  className="custom-contact-style"
/>`}
        </div>
      </div>

      {/* API Documentation */}
      <div className="contact-info-example__section">
        <h3>API Documentation</h3>
        <table className="contact-info-example__api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>email</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>Email address to display. At least one of email or phone is required.</td>
            </tr>
            <tr>
              <td>
                <code>phone</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>Phone number to display. At least one of email or phone is required.</td>
            </tr>
            <tr>
              <td>
                <code>className</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>
                <code>''</code>
              </td>
              <td>Custom CSS class name for styling</td>
            </tr>
            <tr>
              <td>
                <code>showIcon</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>Whether to display icons before contact information</td>
            </tr>
            <tr>
              <td>
                <code>iconSize</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>
                <code>16</code>
              </td>
              <td>Icon size in pixels</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactInfoExample;
