import * as React from 'react';
import { LoadingState } from './Types';
import { LoadingContext } from './LoadingContext';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingProvider: React.FC<{ children }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const loadingRef = React.useRef<LoadingState>({
    loadingText: 'Loading, Please Wait...',
  });

  const getLoadingState = () => {
    return loadingRef.current;
  };

  const setLoadingState = (loadingState: LoadingState) => {
    loadingRef.current = loadingState;
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        getLoadingState,
        setLoadingState,
      }}
    >
      <LoadingSpinner />
      {children}
    </LoadingContext.Provider>
  );
};