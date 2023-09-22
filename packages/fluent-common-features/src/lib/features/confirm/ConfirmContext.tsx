/* eslint-disable */
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  makeStyles,
} from "@fluentui/react-components";
import { CheckmarkStarburstFilled, CheckmarkStarburstRegular, DismissFilled, DismissRegular, bundleIcon } from "@fluentui/react-icons";

type ConfirmCallbackType = () => void;
type CancelCallbackType = () => void;

export type ConfirmOptionsType = {
  title: string;
  message: JSX.Element;
  onConfirm: ConfirmCallbackType;
  onCancel: CancelCallbackType;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
};

export type ConfirmContextType = {
  confirm: (props: ConfirmOptionsType) => void;
};

export const ConfirmContext = React.createContext<ConfirmContextType>({
    confirm: () => { }
});

export const useConfirmContext = () => {
  return React.useContext(ConfirmContext);
};

const useStyle = makeStyles({
  dialog: {
    maxWidth: "300px"
  }
})

const ConfirmIcon = bundleIcon(
  CheckmarkStarburstFilled,
  CheckmarkStarburstRegular
);

const CancelIcon = bundleIcon(DismissFilled, DismissRegular);

export const ConfirmProvider: React.FC<{children}> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState<string>("");
  const [message, setMessage] = React.useState<JSX.Element>(<></>);

  const [onConfirm, setOnConfirm] = React.useState<ConfirmCallbackType>(
    () => {}
  );
  const [onCancel, setOnCancel] = React.useState<CancelCallbackType>(() => {});

  const confirm = ({
    title,
    message,
    onConfirm,
    onCancel,
    confirmButtonLabel = "Yes",
    cancelButtonLabel = "Cancel",
  }: ConfirmOptionsType) => {
    setOpen(true);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel);
    setTitle(title);
    setMessage(message);
  };

  const classes = useStyle();

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      <Dialog open={open} modalType="alert">
        <DialogSurface className={classes.dialog}>
          <DialogBody>
            <DialogTitle>⚠️ {title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
              <Button
                appearance="primary"
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
                size="small"
                icon={<ConfirmIcon />}
              >
                Yes
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance="secondary"
                  onClick={() => {
                    setOpen(false);
                    onCancel();
                  }}
                  size="small"
                  icon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      {children}
    </ConfirmContext.Provider>
  );
};
