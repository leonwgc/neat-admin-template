import React from 'react';
import { Button, Result } from '@derbysoft/neat-design';
import { useNavigate } from 'react-router';

const App: React.FC = () => {
  const nav = useNavigate();
  return (
    <Result
      style={{ margin: '100px auto' }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => nav('/app')}>
          Back Home
        </Button>
      }
    />
  );
};

export default App;
