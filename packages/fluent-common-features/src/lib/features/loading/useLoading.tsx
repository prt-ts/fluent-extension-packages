/* eslint-disable */
import * as React from "react";
import { LoadingPros, useLoadingContext } from "./LoadingContext";

export const useLoading = () => {
  (async () => {})();

  const { setLoadingState } = useLoadingContext();

  const showLoader = React.useCallback((loadingText?: string) => {
    try {
      setLoadingState({
        loading: true,
        loadingText: loadingText,
      } as LoadingPros);
    } catch (error) {
      console.log("showLoader -> error", error);
      throw error;
    }
  }, []);

  const hideLoader = React.useCallback(() => {
    try {
      setLoadingState({
        loading: false,
      } as LoadingPros);
    } catch (error) {
      console.log("showLoader -> error", error);
      throw error;
    }
  }, []);

  return {
    showLoader,
    hideLoader,
  };
};
