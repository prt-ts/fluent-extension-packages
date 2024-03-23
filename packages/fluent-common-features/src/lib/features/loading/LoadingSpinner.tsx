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
    backgroundColor: tokens.colorNeutralBackground6,
    boxShadow: 'none',
    height: '100vh',
    width: '100vw',
    maxWidth: '100vw',
    opacity: 0.7,
    transitionProperty: "unset",
    transitionDuration: "unset",
    transitionTimingFunction: "unset",
    transitionDelay: "unset",
    transform: "unset",
  },
  spinner: {
    marginTop: '40vh',
    translate: 'translate(-50%)',
  },
});

export const LoadingSpinner = () => {
  const {
    isLoading,
    getLoadingState,
  } = useLoadingContext();

  const { loadingText } = getLoadingState();
  const styles = useLoadingStyles();

  const spinner = React.useMemo(() => {
    return (
      <>
        <ProgressBar thickness="large" />
        <Spinner
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
    <Dialog open={isLoading} onOpenChange={() => {}} modalType='alert'>
      <DialogSurface className={styles.modalSurface}>
        <DialogBody>
          <DialogContent>{spinner}</DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
