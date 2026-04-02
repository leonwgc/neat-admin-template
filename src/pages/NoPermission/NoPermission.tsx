import React from 'react';
import { Button, Result } from '@derbysoft/neat-design';
import { useNavigate } from 'react-router';

const NoPermission: React.FC = () => {
  const nav = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => nav('/app')}>
          Go Home
        </Button>
      }
    />
  );
};

export default NoPermission;
