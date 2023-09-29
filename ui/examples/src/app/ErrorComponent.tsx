import * as React from 'react';
export const ErrorPage: React.FC = () => {

  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return (
    <div role="alert">
      I am normal happy page,
      <br />
      <button
        onClick={() => {
          setError(new Error('Oh noes! I am an error! I ma not happy anymore!'));
        }}
      >
        {' '}
        Click me to generate Error
      </button>
    </div>
  );
};
