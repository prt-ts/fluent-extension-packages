/* eslint-disable */
import { useConfirmContext } from "./ConfirmContext";

export const useConfirm = () => {
  const { confirm } = useConfirmContext();

  return {
    confirm,
  } as const;
};
