/* eslint-disable */
import * as React from 'react';
import {
  ConfirmStateType,
  contextDefaultValue,
  useConfirmContext,
} from './ConfirmContext';

export const useConfirm = () => {
  const { setIsOpen, setContextDetails } = useConfirmContext();

  const confirm = React.useCallback(
    (confirmDetail: ConfirmStateType) => {
      setContextDetails?.({
        ...contextDefaultValue,
        ...confirmDetail,
      });
      setIsOpen?.(true);
    },
    [setContextDetails, setIsOpen]
  );

  return {
    confirm,
  } as const;
};
