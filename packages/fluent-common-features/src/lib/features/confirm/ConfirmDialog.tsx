/* eslint-disable */
import * as React from 'react';
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
} from '@fluentui/react-components';
import { contextDefaultValue, useConfirmContext } from './ConfirmContext';

const useStyle = makeStyles({
  dialog: {
    maxWidth: '350px',
  },
});

export const ConfirmDialog: React.FC = () => {

  console.log('ConfirmDialog');

  const {
    confirmDetail: {
      isOpen,
      title,
      message,
      confirmButtonLabel,
      cancelButtonLabel,
      onConfirm,
      onCancel,
      confirmButtonIcon = contextDefaultValue.confirmButtonIcon,
      cancelButtonIcon = contextDefaultValue.cancelButtonIcon,
    },
    setConfirmDetail,
  } = useConfirmContext();

  const classes = useStyle();

  return (
    <Dialog open={isOpen} modalType="alert">
      <DialogSurface className={classes.dialog}>
        <DialogBody>
          <DialogTitle>⚠️ {title}</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <Button
              appearance="primary"
              onClick={async () => {
                await setConfirmDetail?.({
                  title,
                  message,
                  confirmButtonLabel,
                  cancelButtonLabel,
                  onConfirm,
                  onCancel,
                  confirmButtonIcon,
                  cancelButtonIcon,
                  isOpen: false,
                });
                await onConfirm?.();
              }}
              size="small"
              icon={confirmButtonIcon}
            >
              {confirmButtonLabel || 'Yes'}
            </Button>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
                onClick={async () => {
                  await setConfirmDetail?.({
                    title,
                    message,
                    confirmButtonLabel,
                    cancelButtonLabel,
                    onConfirm,
                    onCancel,
                    confirmButtonIcon,
                    cancelButtonIcon,
                    isOpen: false,
                  });
                  await onCancel?.();
                }}
                size="small"
                icon={cancelButtonIcon}
              >
                {cancelButtonLabel || 'Cancel'}
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
