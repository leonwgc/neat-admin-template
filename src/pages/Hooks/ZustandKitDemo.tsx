/**
 * @file src/pages/Hooks/UseGlobalStateExample.tsx
 * @author leon.wang
 */

import React from 'react';
import {
  Card,
  Space,
  Input,
  Typography,
  Divider,
} from '@derbysoft/neat-design';
import { useGlobalState } from '~/hooks/useGlobalState';
import './ZustandKitDemo.scss';

const { Text } = Typography;

const UseGlobalStateExample: React.FC = () => {
  const [user, setUser] = useGlobalState('user', {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
  });

  return (
    <Card
      title="Component A - User Profile"
      className="use-global-state-example__card"
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Name:</Text> {user.name}
        </div>
        <div>
          <Text strong>Email:</Text> {user.email}
        </div>
        <div>
          <Text strong>Age:</Text> {user.age}
        </div>
        <Divider />
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ email: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Age"
            value={user.age}
            onChange={(e) => setUser({ age: Number(e.target.value) })}
          />
        </Space>
      </Space>
    </Card>
  );
};
export default UseGlobalStateExample;
