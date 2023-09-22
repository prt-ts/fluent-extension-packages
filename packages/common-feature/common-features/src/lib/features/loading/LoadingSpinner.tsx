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
} from "@fluentui/react-components";
import { useLoadingContext } from "./LoadingContext";

const useLoadingStyles = makeStyles({
  dialogSurface: {
    backgroundColor: tokens.colorNeutralBackground4,
    boxShadow: "none", 
    opacity: 0.8,
  },
});

export const LoadingSpinner = () => {
  const { loadingState } = useLoadingContext();
  console.log("loadingState", loadingState);

  const classes = useLoadingStyles();
  return (
    <Dialog modalType="alert" open={loadingState?.loading}>
      <DialogSurface className={classes.dialogSurface}>
        <DialogBody>
          <DialogContent>
            <Spinner labelPosition="below" label={loadingState?.loadingText} />
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}; 