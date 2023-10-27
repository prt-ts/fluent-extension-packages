/* eslint-disable */
import * as React from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import {
  CheckmarkStarburstFilled,
  CheckmarkStarburstRegular,
  DismissFilled,
  DismissRegular,
  bundleIcon,
} from '@fluentui/react-icons';

const ConfirmIcon = bundleIcon(
  CheckmarkStarburstFilled,
  CheckmarkStarburstRegular
);

const CancelIcon = bundleIcon(DismissFilled, DismissRegular);

type ConfirmCallbackType = () => void;
type CancelCallbackType = () => void;

export type ConfirmStateType = {
  isOpen: boolean;
  title: string;
  message: JSX.Element;
  onConfirm: ConfirmCallbackType;
  onCancel?: CancelCallbackType;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  confirmButtonIcon?: JSX.Element;
  cancelButtonIcon?: JSX.Element;
};

export type ConfirmContextType = {
  confirmDetail: ConfirmStateType;
  setConfirmDetail?: React.Dispatch<React.SetStateAction<ConfirmStateType>>;
};

export const contextDefaultValue: ConfirmStateType = {
  isOpen: false,
  title: '',
  message: <></>,
  onConfirm: () => {},
  onCancel: () => {},
  confirmButtonLabel: 'Yes',
  cancelButtonLabel: 'Cancel',
  confirmButtonIcon: <ConfirmIcon />,
  cancelButtonIcon: <CancelIcon />,
};

export const ConfirmContext = React.createContext<ConfirmContextType>({
  confirmDetail: contextDefaultValue,
});

export const useConfirmContext = () => {
  return React.useContext(ConfirmContext);
};

export const ConfirmProvider: React.FC<{ children }> = ({ children }) => {
  const [confirmDetail, setConfirmDetail] =
    React.useState<ConfirmStateType>(contextDefaultValue);

  return (
    <ConfirmContext.Provider value={{ confirmDetail, setConfirmDetail }}>
      <ConfirmDialog />
      {children}
    </ConfirmContext.Provider>
  );
};
