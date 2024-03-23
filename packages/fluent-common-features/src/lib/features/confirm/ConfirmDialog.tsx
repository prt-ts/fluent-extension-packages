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
  shorthands,
} from '@fluentui/react-components';
import { contextDefaultValue } from './ConfirmContext';
import { useConfirmContext } from './useConfirmContext';

const useStyle = makeStyles({
  dialogSurface: {
    maxWidth: '400px',
    transitionProperty: 'unset',
    transitionDuration: 'unset',
    transitionTimingFunction: 'unset',
    transitionDelay: 'unset',
    transform: 'unset',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gridColumnStart: 0,
    gridColumnEnd: 4,
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    ...shorthands.gap('10px')
  },
});

export const ConfirmDialog: React.FC = () => { 
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

  const styles = useStyle();

  return (
    <Dialog open={isOpen} modalType="alert">
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody>
          <DialogTitle>⚠️ {title}</DialogTitle>

          <DialogContent>{message}</DialogContent>

          <DialogActions className={styles.dialogActions}>
            <div className={styles.actionContainer}>
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
            </div>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
