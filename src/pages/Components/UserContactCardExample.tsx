import React from 'react';
import UserContactCard from '../../components/UserContactCard';
import './UserContactCardExample.scss';

// Example page component for UserContactCard
const UserContactCardExample: React.FC = () => {
  return (
    <div className="user-contact-card-example">
      <h2 className="user-contact-card-example__title">
        UserContactCard Component Examples
      </h2>

      {/* Basic usage with avatar URL */}
      <div className="user-contact-card-example__section">
        <h3>Basic Usage - With Avatar URL</h3>
        <p>Display user contact card with avatar image, email and phone</p>
        <div className="user-contact-card-example__demo-box">
          <UserContactCard
            name="张 三"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            email="zhangsan@gooabcgle.net"
            phone="+86 13912345678"
          />
        </div>
        <div className="user-contact-card-example__code">
          {`<UserContactCard
  name="张 三"
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  email="zhangsan@gooabcgle.net"
  phone="+86 13912345678"
/>`}
        </div>
      </div>

      {/* With name initials as avatar */}
      <div className="user-contact-card-example__section">
        <h3>With Name Initials</h3>
        <p>Display user contact card with name initials when avatarUrl is not provided</p>
        <div className="user-contact-card-example__demo-box">
          <UserContactCard
            name="李 四"
            email="lisi@company.com"
            phone="+86 13800138000"
          />
          <UserContactCard
            name="John Doe"
            email="john.doe@example.com"
            phone="+1 (555) 123-4567"
          />
        </div>
        <div className="user-contact-card-example__code">
          {`<UserContactCard
  name="李 四"
  email="lisi@company.com"
  phone="+86 13800138000"
/>

<UserContactCard
  name="John Doe"
  email="john.doe@example.com"
  phone="+1 (555) 123-4567"
/>`}
        </div>
      </div>

      {/* Email only */}
      <div className="user-contact-card-example__section">
        <h3>Email Only</h3>
        <p>Display only email contact information</p>
        <div className="user-contact-card-example__demo-box">
          <UserContactCard
            name="王 五"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
            email="wangwu@gooabcgle.net"
          />
        </div>
        <div className="user-contact-card-example__code">
          {`<UserContactCard
  name="王 五"
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
  email="wangwu@gooabcgle.net"
/>`}
        </div>
      </div>

      {/* Phone only */}
      <div className="user-contact-card-example__section">
        <h3>Phone Only</h3>
        <p>Display only phone contact information</p>
        <div className="user-contact-card-example__demo-box">
          <UserContactCard
            name="赵 六"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
            phone="+86 13666666666"
          />
        </div>
        <div className="user-contact-card-example__code">
          {`<UserContactCard
  name="赵 六"
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
  phone="+86 13666666666"
/>`}
        </div>
      </div>

      {/* Multiple cards */}
      <div className="user-contact-card-example__section">
        <h3>Multiple Cards</h3>
        <p>Display multiple user contact cards</p>
        <div className="user-contact-card-example__demo-box">
          <UserContactCard
            name="Alice Chen"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
            email="alice.chen@company.com"
            phone="+1-555-0101"
          />
          <UserContactCard
            name="Bob Zhang"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
            email="bob.zhang@company.com"
            phone="+1-555-0102"
          />
          <UserContactCard
            name="Carol Liu"
            avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Carol"
            email="carol.liu@company.com"
            phone="+1-555-0103"
          />
        </div>
        <div className="user-contact-card-example__code">
          {`<UserContactCard
  name="Alice Chen"
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
  email="alice.chen@company.com"
  phone="+1-555-0101"
/>

<UserContactCard
  name="Bob Zhang"
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
  email="bob.zhang@company.com"
  phone="+1-555-0102"
/>

<UserContactCard
  name="Carol Liu"
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Carol"
  email="carol.liu@company.com"
  phone="+1-555-0103"
/>`}
        </div>
      </div>

      {/* Custom styling */}
      <div className="user-contact-card-example__section">
        <h3>Custom Styling</h3>
        <p>Apply custom styles using className prop</p>
        <div className="user-contact-card-example__demo-box">
          <UserContactCard
            name="Custom Style"
            email="custom@example.com"
            phone="+1-999-8888"
            className="custom-user-card"
          />
        </div>
        <div className="user-contact-card-example__code">
          {`<UserContactCard
  name="Custom Style"
  email="custom@example.com"
  phone="+1-999-8888"
  className="custom-user-card"
/>`}
        </div>
      </div>

      {/* API Documentation */}
      <div className="user-contact-card-example__section">
        <h3>API Documentation</h3>
        <table className="user-contact-card-example__api-table">
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
                <code>name</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>
                User name. Used for avatar when avatarUrl is not provided. At least one of
                name or avatarUrl is required.
              </td>
            </tr>
            <tr>
              <td>
                <code>avatarUrl</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>
                Avatar image URL. At least one of name or avatarUrl is required.
              </td>
            </tr>
            <tr>
              <td>
                <code>email</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>
                Email address to display. At least one of email or phone is required. Click
                copy icon to copy.
              </td>
            </tr>
            <tr>
              <td>
                <code>phone</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>-</td>
              <td>
                Phone number to display. At least one of email or phone is required. Click
                copy icon to copy.
              </td>
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
          </tbody>
        </table>

        <h3 style={{ marginTop: '24px' }}>Features</h3>
        <ul style={{ paddingLeft: '24px', color: '#666', fontSize: '14px' }}>
          <li>Display user avatar with image URL or name initials</li>
          <li>Show email and phone contact information</li>
          <li>Click copy icon to copy email or phone to clipboard</li>
          <li>Visual feedback when copying (icon color changes)</li>
          <li>Hover effect on contact items</li>
          <li>Responsive design with flexible layout</li>
        </ul>
      </div>
    </div>
  );
};

export default UserContactCardExample;
