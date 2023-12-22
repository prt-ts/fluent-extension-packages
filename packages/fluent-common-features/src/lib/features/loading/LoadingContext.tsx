/* eslint-disable */
import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export type LoadingState = {
  loadingText: string;
};

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  getLoadingState: () => LoadingState;
  setLoadingState: (loadingState: LoadingState) => void;
};

const contextDefaultValue = {
  isLoading: false,
  setIsLoading: (loading: boolean) => {},
  getLoadingState: () => {},
  setLoadingState: (loadingState: LoadingState) => {},
} as LoadingContextType;

const LoadingContext = createContext<LoadingContextType>(contextDefaultValue);
export default LoadingContext;

export const LoadingProvider: React.FunctionComponent<{ children }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
