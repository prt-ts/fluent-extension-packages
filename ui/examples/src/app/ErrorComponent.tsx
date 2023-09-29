
export const ErrorPage: React.FC = () => {
  throw new Error('Always Error Page. This is a runtime error.');
  return (
    <div role="alert">
      Always Error Page
    </div>
  );
};
