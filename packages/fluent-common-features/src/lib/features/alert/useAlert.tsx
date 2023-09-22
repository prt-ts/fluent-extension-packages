/* eslint-disable */
import * as React from "react";
import {
  Link,
  Spinner,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  ToastTrigger,
  useId,
} from "@fluentui/react-components";
import { DispatchToastOptions, useAlertContext } from "./AlertContext";
import { DismissCircleRegular } from "@fluentui/react-icons";

export type AlertContentType = {
  title: React.ReactNode;
  body: React.ReactNode;
  bodySubtitle?: string | undefined;
  footer?: React.ReactNode;
  appearance?: "inverted" | undefined;
};

const AlertContent: React.FunctionComponent<
  AlertContentType & { isInProgress?: boolean }
> = ({
  title,
  body,
  bodySubtitle = undefined,
  footer,
  appearance = undefined,
  isInProgress = false,
}) => {
  return (
    <>
      <Toast appearance={appearance}>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>
                <DismissCircleRegular />
              </Link>
            </ToastTrigger>
          }
        >
          {title}
        </ToastTitle>
        <ToastBody subtitle={bodySubtitle}>
          {isInProgress && <Spinner />}
          {body}
        </ToastBody>
        <ToastFooter>{footer}</ToastFooter>
      </Toast>
    </>
  );
};

export const useAlert = () => {
  const { dispatchToast, updateToast } = useAlertContext();
  const toastId = useId("toast");

  const success = (alert: AlertContentType, options?: DispatchToastOptions) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} />, {
          ...options,
          intent: "success",
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: "success",
          pauseOnHover: true,
          timeout: 5000,
        });
  };

  const error = (alert: AlertContentType, options?: DispatchToastOptions) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} />, {
          ...options,
          intent: "error",
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: "error",
          pauseOnHover: true,
        });
  };

  const info = (alert: AlertContentType, options?: DispatchToastOptions) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} />, {
          ...options,
          intent: "info",
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: "info",
          pauseOnHover: true,
          timeout: 5000,
        });
  };

  const warning = (alert: AlertContentType, options?: DispatchToastOptions) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} />, {
          ...options,
          intent: "warning",
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: "warning",
          pauseOnHover: true,
          timeout: 5000,
        });
  };

  const progress = (
    alert: AlertContentType,
    options?: DispatchToastOptions
  ): string => {
    dispatchToast?.(<AlertContent {...alert} isInProgress={true} />, {
      ...options,
      toastId: toastId,
      intent: "info",
      pauseOnHover: true,
      timeout: -1,
    });

    return toastId;
  };

  const update = (alert: AlertContentType, options?: DispatchToastOptions) =>
    updateToast?.({
      content: <AlertContent {...alert} />,
      ...options,
    });

  return {
    success,
    error,
    info,
    warning,
    update,
    progress,
  };
};
