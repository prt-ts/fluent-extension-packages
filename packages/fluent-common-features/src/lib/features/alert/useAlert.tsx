/* eslint-disable */
import * as React from 'react';
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
  tokens,
  useId,
} from '@fluentui/react-components';
import {
  AlertContextType,
  DispatchToastOptions,
  UpdateToastOptions,
  useAlertContext,
} from './AlertContext';
import { DismissCircleRegular } from '@fluentui/react-icons';

export type AlertContentType = {
  title: React.ReactNode;
  body: React.ReactNode;
  bodySubtitle?: string | undefined;
  footer?: React.ReactNode;
  appearance?: 'inverted' | undefined;
  intent?: MessageBarProps['intent'];
};

const useToastStyles = makeStyles({
  success: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
  },
  error: {
    backgroundColor: tokens.colorPaletteRedBackground2,
  },
  info: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
  },
  warning: {
    backgroundColor: tokens.colorPaletteYellowBackground2,
  },
  default: {},
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
  intent = 'success',
}) => {
  const classes = useToastStyles();

  const toastClass = React.useMemo(() => {
    switch (intent) {
      case 'success':
        return classes.success;
      case 'error':
        return classes.error;
      case 'info':
        return classes.info;
      case 'warning':
        return classes.warning;
      default:
        return classes.default;
    }
  }, [intent, classes]);

  return (
    <>
      <Toast appearance={appearance} className={toastClass}>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>
                <DismissCircleRegular />
              </Link>
            </ToastTrigger>
          }
          media={isInProgress ? <Spinner />: undefined}
        >
          {title}
        </ToastTitle>
        <ToastBody subtitle={bodySubtitle}>
          {body}
        </ToastBody>
        <ToastFooter>{footer}</ToastFooter>
      </Toast>
    </>
  );
};

export const useAlert = () => {
  const { dispatchToast, updateToast } = useAlertContext();
  const toastId = useId('toast');

  const success = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} />, {
          ...options,
          intent: 'success',
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: 'success',
          pauseOnHover: true,
          timeout: 5000,
        } as unknown as UpdateToastOptions);
  };

  const error = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} intent="error" />, {
          ...options,
          intent: 'error',
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: 'error',
          pauseOnHover: true,
        } as unknown as UpdateToastOptions);
  };

  const info = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} intent="info" />, {
          ...options,
          intent: 'info',
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: 'info',
          pauseOnHover: true,
          timeout: 5000,
        } as unknown as UpdateToastOptions);
  };

  const warning = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    !options?.toastId
      ? dispatchToast?.(<AlertContent {...alert} intent="warning" />, {
          ...options,
          intent: 'warning',
          pauseOnHover: true,
        })
      : updateToast?.({
          content: <AlertContent {...alert} />,
          ...options,
          intent: 'warning',
          pauseOnHover: true,
          timeout: 5000,
        } as unknown as UpdateToastOptions);
  };

  const progress = (
    alert: AlertContentType,
    options?: DispatchToastOptions
  ): string => {
    dispatchToast?.(
      <AlertContent {...alert} isInProgress={true} intent="info" />,
      {
        ...options,
        toastId: toastId,
        intent: 'info',
        pauseOnHover: true,
        timeout: -1,
      }
    );

    return toastId;
  };

  const update = (alert: AlertContentType, options?: UpdateToastOptions) =>
    updateToast?.({
      content: <AlertContent {...alert} />,
      ...options,
    } as unknown as UpdateToastOptions);

  return {
    success,
    error,
    info,
    warning,
    update,
    progress,
  };
};
