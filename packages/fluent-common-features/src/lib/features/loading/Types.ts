

export type LoadingState = {
    loadingText: string;
};

export type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    getLoadingState: () => LoadingState;
    setLoadingState: (loadingState: LoadingState) => void;
};

/* eslint-disable */
export const contextDefaultValue = {
    isLoading: false,
    setIsLoading: (loading: boolean) => { },
    getLoadingState: () => { },
    setLoadingState: (loadingState: LoadingState) => { },
} as LoadingContextType;
