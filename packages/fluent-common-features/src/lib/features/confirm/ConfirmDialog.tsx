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
  tokens,
} from '@fluentui/react-components';
import { useConfirmContext } from './useConfirmContext';
import { contextDefaultValue } from './Types';

const useStyle = makeStyles({
  dialogSurface: {
    maxWidth: '400px',
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
    gap: tokens.spacingHorizontalM,
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
    <Dialog open={isOpen} modalType="alert" surfaceMotion={null}>
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
