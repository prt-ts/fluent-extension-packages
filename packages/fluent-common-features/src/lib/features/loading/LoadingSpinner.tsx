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
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1000,
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
    <>
      {loadingState?.loading && (
        <Portal mountNode={rootElement}>
          <div className={styles.portal}>
            <Spinner
              className={styles.spinner}
              size="extra-large"
              label={<strong>{loadingState?.loadingText || "Loading, Please Wait..."}</strong>}
              labelPosition="below"
            />
          </div>
        </Portal>
      )}
      <div ref={setRootElement} />
    </>
  );
};
