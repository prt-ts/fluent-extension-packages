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
  ButtonProps,
} from '@fluentui/react-components';
import { contextDefaultValue, useConfirmContext } from './ConfirmContext';

const useStyle = makeStyles({
  dialog: {
    maxWidth: '400px',
  },
});

export const ConfirmDialog: React.FC = () => {

  console.log('ConfirmDialog');

  const { isOpen, setIsOpen, getContextDetails } = useConfirmContext();

  const {
    title,
    message,
    onConfirm,
    onCancel,
    confirmButtonProps,
    cancelButtonProps,
  } = getContextDetails?.() ?? contextDefaultValue;
  const {
    confirmButtonProps: defaultConfirmButtonProps,
    cancelButtonProps: defaultCancelButtonProps,
  } = contextDefaultValue;

  const classes = useStyle();

  return (
    <Dialog open={isOpen} modalType="alert">
      <DialogSurface className={classes.dialog}>
        <DialogBody>
          <DialogTitle>⚠️ {title}</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <Button
              {...({
                ...defaultConfirmButtonProps,
                ...confirmButtonProps,
              } as unknown as ButtonProps)}
              onClick={async () => {
                setIsOpen?.(false);
                await onConfirm?.();
              }}
            />
            <DialogTrigger disableButtonEnhancement>
              <Button
                {...({
                  ...defaultCancelButtonProps,
                  ...cancelButtonProps,
                } as unknown as ButtonProps)}
                onClick={async () => {
                  setIsOpen?.(false);
                  await onCancel?.();
                }}
              />
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
