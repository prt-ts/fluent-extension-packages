import * as React from "react";
import { AlertProvider } from "../features/alert";
import { ConfirmProvider } from "../features/confirm";
import { LoadingProvider } from "../features/loading";

export const AppFeatureProvider : React.FC<{ children : React.ReactNode | JSX.Element}> = ({ children }) => {
    return (
        <LoadingProvider>
            <AlertProvider>
                <ConfirmProvider>
                    {children}
                </ConfirmProvider>
            </AlertProvider>
        </LoadingProvider>
    );
};