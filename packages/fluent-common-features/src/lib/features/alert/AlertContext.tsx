/* eslint-disable */
import { Toaster, ToasterProps, useId, useToastController } from "@fluentui/react-components";
import * as React from "react";
import { ArgumentsType } from "vitest";

export type AlertContextType = ReturnType<typeof useToastController>;
export type DispatchToastOptions = ArgumentsType<AlertContextType["dispatchToast"]>[1];
export type UpdateToastOptions = ArgumentsType<AlertContextType["updateToast"]>[0];

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
