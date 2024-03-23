/* eslint-disable */
import * as React from 'react'; 
import { useLoadingContext } from './useLoadingContext';
import { LoadingState } from './Types';

export const useLoading = () => {
  (async () => {})();

  const { setLoadingState, setIsLoading } = useLoadingContext();

  const showLoader = React.useCallback(
    (loadingText?: string) => {
      try { 
        setLoadingState({
          loadingText: loadingText || 'Loading, Please Wait...',
        } as LoadingState);
        setIsLoading(true);
      } catch (error) {
        console.error('showLoader -> error', error);
        throw error;
      }
    },
    [setLoadingState, setIsLoading]
  );

  const hideLoader = React.useCallback(() => {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error('showLoader -> error', error);
      throw error;
    }
  }, [setLoadingState, setIsLoading]);

  return {
    showLoader,
    hideLoader,
  };
};
