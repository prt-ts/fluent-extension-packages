/* eslint-disable */
import * as React from 'react';
import { LoadingState, useLoadingContext } from './LoadingContext';

export const useLoading = () => {
  (async () => {})();

  const { setLoadingState, setIsLoading } = useLoadingContext();

  const showLoader = React.useCallback(
    (loadingText?: string) => {
      try {
        console.log('showLoader -> loadingText', loadingText);
        setLoadingState({
          loadingText: loadingText || 'Loading, Please Wait...',
        } as LoadingState);
        setIsLoading(true);
      } catch (error) {
        console.log('showLoader -> error', error);
        throw error;
      }
    },
    [setLoadingState, setIsLoading]
  );

  const hideLoader = React.useCallback(() => {
    try {
      console.log('hideLoader');
      setIsLoading(false);
    } catch (error) {
      console.log('showLoader -> error', error);
      throw error;
    }
  }, [setLoadingState, setIsLoading]);

  return {
    showLoader,
    hideLoader,
  };
};
