import { Button } from '@fluentui/react-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DummyEditPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>This is table dummy Edit page</h1>
      <Button onClick={() => navigate('/page-2')}>Go back to table</Button>
    </div>
  );
};

export default DummyEditPage;
