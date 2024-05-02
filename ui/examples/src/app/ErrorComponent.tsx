import { Button } from '@fluentui/react-components';
import { useLoading } from '@prt-ts/fluent-common-features';

import * as React from 'react';
export const ErrorPage: React.FC = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const { showLoader, hideLoader } = useLoading();

  const triggerLoaderFor3Seconds = () => {
    showLoader();

    setTimeout(() => {
      hideLoader();
    }, 10000);
  };

  if (error) {
    throw error;
  }

  return (
    <div role="alert">
      I am normal happy page,
      <br />
      <Button
        onClick={() => {
          setError(
            new Error('Oh noes! I am an error! I ma not happy anymore!')
          );
        }}
      >
        {' '}
        Click me to generate Error
      </Button>
      <Button onClick={triggerLoaderFor3Seconds}>
        Trigger Loader for 3 seconds
      </Button>
    </div>
  );
};
