/* eslint-disable */
import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  Spinner,
  DialogContent,
  makeStyles,
  tokens,
  ProgressBar,
} from '@fluentui/react-components';
import { useLoadingContext } from './useLoadingContext';

const useLoadingStyles = makeStyles({
  modalSurface: {
    // backgroundColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    boxShadow: 'none',
    height: '100vh',
    width: '100vw',
    maxWidth: '100vw',
  },
  progress: {
    height: '4px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
  },
  spinner: {
    marginTop: '40vh',
    translate: 'translate(-50%)',
  },
});

export const LoadingSpinner = () => {
  const { isLoading, getLoadingState } = useLoadingContext();

  const { loadingText } = getLoadingState();
  const styles = useLoadingStyles();

  const spinner = React.useMemo(() => {
    return (
      <>
        <ProgressBar thickness="large" className={styles.progress} />
        <Spinner
          role="alert"
          className={styles.spinner}
          size="extra-large"
          label={
            <strong
              style={{
                color: 'black',
                fontSize: tokens.fontSizeBase500,
              }}
            >
              {loadingText || 'Loading, Please Wait...'}
            </strong>
          }
          labelPosition="below"
        />
      </>
    );
  }, [loadingText]);

  return (
    <Dialog
      open={isLoading}
      onOpenChange={() => {}}
      modalType="alert"
      surfaceMotion={null}
    >
      <DialogSurface className={styles.modalSurface}>
        <DialogBody>
          <DialogContent>{spinner}</DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
