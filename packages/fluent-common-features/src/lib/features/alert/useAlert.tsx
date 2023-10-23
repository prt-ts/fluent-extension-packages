/* eslint-disable */
import * as React from "react";
import {
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarProps,
  MessageBarTitle,
  Spinner,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  ToastTrigger,
  makeStyles,
  shorthands,
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
  intent?: MessageBarProps["intent"];
};

const useToastStyles = makeStyles({
  messageContainer: {
    width: "100%",
    minWidth: "292px",
  },
  toastContainer: {
    ...shorthands.margin("0"),
    ...shorthands.padding("0"),
  }
});

const AlertContent: React.FunctionComponent<
  AlertContentType & { isInProgress?: boolean }
> = ({
  title,
  body,
  bodySubtitle = undefined,
  footer,
  appearance = undefined,
  isInProgress = false,
  intent = "success"
}) => {

  const classes = useToastStyles();

  return (
    <>
      <Toast appearance={appearance} className={classes.toastContainer}>
        <MessageBar
          layout="multiline"
          shape="rounded"
          intent={intent}
          className={classes.messageContainer}
        >
          <MessageBarBody>
            <MessageBarTitle>{title}!</MessageBarTitle>
            <br />
            {isInProgress && <Spinner />}
            {body}
            {bodySubtitle && <small>{bodySubtitle}</small>}
          </MessageBarBody>
          <MessageBarActions
            containerAction={
              <ToastTrigger>
                <Link>
                  <DismissCircleRegular />
                </Link>
              </ToastTrigger>
            }
          >
            <ToastFooter>{footer}</ToastFooter>
          </MessageBarActions>
        </MessageBar>
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
      ? dispatchToast?.(<AlertContent {...alert} intent="error" />, {
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
      ? dispatchToast?.(<AlertContent {...alert} intent="info"/>, {
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
      ? dispatchToast?.(<AlertContent {...alert} intent="warning"/>, {
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
    dispatchToast?.(<AlertContent {...alert} isInProgress={true}  intent="info"/>, {
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
