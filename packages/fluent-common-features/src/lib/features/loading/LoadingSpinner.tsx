/* eslint-disable */
import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  Spinner,
  DialogContent,
  makeStyles,
  tokens,
  Portal,
} from "@fluentui/react-components";
import { useLoadingContext } from "./LoadingContext";


const useLoadingStyles = makeStyles({
  portal: {
    backgroundColor: tokens.colorNeutralBackground6,
    opacity: 0.9,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999999999999,
  },
  spinner: {
    marginTop: '50vh',
    translate: 'translate(-50%)',
  },
});

export const LoadingSpinner = () => {
  const { loadingState } = useLoadingContext();
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(
    null
  );
  const styles = useLoadingStyles();
  return (
    <div style={{ overflow: 'hidden' }}>
      {loadingState?.loading && (
        <Portal mountNode={rootElement}>
          <div role="alert" aria-busy="true" className={styles.portal}>
            <Spinner
              className={styles.spinner}
              size="extra-large"
              label={
                <strong>
                  {loadingState?.loadingText || 'Loading, Please Wait...'}
                </strong>
              }
              labelPosition="below"
            />
          </div>
        </Portal>
      )}
      <div ref={setRootElement} />
    </div>
  );
};
