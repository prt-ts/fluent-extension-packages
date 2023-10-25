/* eslint-disable */
import { Toaster, ToasterProps, useId, useToastController } from "@fluentui/react-components";
import * as React from "react";
import { ArgumentsType } from "vitest";

export type DispatchToastOptions = {
  toastId?: string | undefined;
  intent?: 'success' | 'error' | 'info' | 'warning' | undefined;
  pauseOnHover?: boolean | undefined;
  pauseOnWindowBlur?: boolean | undefined;
  priority?: number;
  politeness?: 'assertive' | 'polite' | undefined;
  timeout?: number | undefined;
};

export type UpdateToastOptions = DispatchToastOptions & {
  content?: React.ReactNode;
};

export type AlertContextType = {
  dispatchToast: (
    content: React.ReactNode,
    options?: DispatchToastOptions
  ) => void;
  dismissToast: (toastId: string) => void;
  dismissAllToasts: () => void;
  updateToast: (options: any) => void;
  pauseToast: (toastId: string) => void;
  playToast: (toastId: string) => void;
};

export const AlertContext = React.createContext<Partial<AlertContextType>>({});

export const useAlertContext = () => {
  return React.useContext(AlertContext);
};

export const AlertProvider: React.FC<React.PropsWithChildren<ToasterProps>> = ({ children, ...toasterProps }) => {
  const toasterId = useId("toaster");
  const toastController = useToastController(toasterId);

  return (
    <AlertContext.Provider value={{ ...toastController }}>
      <Toaster
        toasterId={toasterId}
        position="bottom-end"
        pauseOnHover
        pauseOnWindowBlur
        {...toasterProps}
      />
      {children}
    </AlertContext.Provider>
  );
};
