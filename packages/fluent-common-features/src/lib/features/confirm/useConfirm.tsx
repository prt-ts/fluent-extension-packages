/* eslint-disable */
import * as React from "react";
import { ConfirmStateType, useConfirmContext } from "./ConfirmContext";

export const useConfirm = () => {
  const { setConfirmDetail } = useConfirmContext();

  const confirm = React.useCallback((confirmDetail: Omit<ConfirmStateType, 'isOpen'>) => {
    setConfirmDetail?.({
      ...confirmDetail,
      isOpen: true,
    });
  }, [setConfirmDetail]);

  return {
    confirm,
  } as const;
};
