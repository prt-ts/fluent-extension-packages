/* eslint-disable */
import * as React from 'react';
import {
  Link,
  MessageBarProps,
  Spinner,
  Toast,
  ToastBody,
  ToastFooter,
  ToastTitle,
  ToastTrigger,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components';
import {
  DispatchToastOptions,
  // DispatchToastOptions,
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
          media={isInProgress ? <Spinner /> : undefined}
        >
          {title}
        </ToastTitle>
        <ToastBody subtitle={bodySubtitle}>{body}</ToastBody>
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
    const intent = 'success';
    if (options?.toastId) {
      update(alert, {
        ...options,
        intent: intent,
      });
      return;
    }
    dispatchToast?.(<AlertContent {...alert} intent={intent} />, {
      ...options,
      intent: intent,
    });
  };

  const error = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    const intent = 'error';
    if (options?.toastId) {
      update(alert, {
        ...options,
        intent: intent,
      });
      return;
    }

    dispatchToast?.(<AlertContent {...alert} intent={intent} />, {
      ...options,
      intent: intent,
    });
  };

  const info = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    const intent = 'info';
    if (options?.toastId) {
      update(alert, {
        ...options,
        intent: intent,
      });
      return;
    }
    dispatchToast?.(<AlertContent {...alert} intent={intent} />, {
      ...options,
      intent: intent,
    });
  };

  const warning = (
    alert: AlertContentType,
    options?: DispatchToastOptions | UpdateToastOptions
  ) => {
    const intent = 'warning';
    if (options?.toastId) {
      update(alert, {
        ...options,
        intent: intent,
      });
      return;
    }
    dispatchToast?.(<AlertContent {...alert} intent="warning" />, {
      ...options,
      intent: 'warning',
    });
  };

  const progress = (
    alert: AlertContentType,
    options?: DispatchToastOptions
  ): string => {
    const progressId = `progress-${toastId}-${Math.random() * 100}}`;

    dispatchToast?.(
      <AlertContent {...alert} isInProgress={true} intent="info" />,
      {
        ...options,
        toastId: progressId,
        intent: 'info',
        pauseOnHover: false,
        pauseOnWindowBlur: false,
        timeout: -1,
      }
    );

    return progressId;
  };

  const update = (alert: AlertContentType, options?: UpdateToastOptions) => {
    const intent = options?.intent || alert.intent || 'success';
    updateToast?.({
      content: <AlertContent {...alert} intent={intent} />,
      timeout: 5000,
      pauseOnHover: true,
      pauseOnWindowBlur: true,
      ...options,
      intent: intent,
    } as unknown as UpdateToastOptions);
  };

  return {
    /**
     * @deprecated use alertSuccess instead
     * */
    success,

    /**
     *  @deprecated use alertError instead
     *  */
    error,

    /**
     *  @deprecated use alertInfo instead
     *  */
    info,

    /**
     * @deprecated use alertWarning instead
     * */
    warning,

    /**
     * @deprecated use alertUpdate instead
     * */
    update,

    /**
     * @deprecated use alertProgress instead
     * */
    progress,
    alertSuccess: success,
    alertError: error,
    alertInfo: info,
    alertWarning: warning,
    alertUpdate: update,
    alertProgress: progress,
  };
};
