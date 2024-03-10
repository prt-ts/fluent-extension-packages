/* eslint-disable */
import * as React from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import {
  CheckmarkFilled,
  CheckmarkRegular,
  DismissFilled,
  DismissRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import { ButtonProps } from '@fluentui/react-components';

const ConfirmIcon = bundleIcon(
  CheckmarkFilled,
  CheckmarkRegular,
);

const CancelIcon = bundleIcon(DismissFilled, DismissRegular);

type ConfirmCallbackType = () => void;
type CancelCallbackType = () => void;

export type ConfirmStateType = {
  title: string;
  message: JSX.Element | React.ReactNode;
  onConfirm: ConfirmCallbackType;
  onCancel?: CancelCallbackType;

  confirmButtonProps?: Omit<ButtonProps, 'onClick'>;
  cancelButtonProps?: Omit<ButtonProps, 'onClick'>;
};

export type ConfirmContextType = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  getContextDetails?: () => ConfirmStateType;
  setContextDetails?: (details: ConfirmStateType) => void;
};

export const contextDefaultValue: ConfirmStateType = {
  title: '',
  message: <></>,
  onConfirm: () => {},
  onCancel: () => { },

  confirmButtonProps: {
    appearance: 'primary',
    children: 'Yes',
    icon: <ConfirmIcon />,
  } as ButtonProps,
  cancelButtonProps: {
    children: 'No',
    icon: <CancelIcon />,
  } as ButtonProps,
};

export const ConfirmContext = React.createContext<ConfirmContextType>({
  isOpen: false,
  setIsOpen: () => { },
  getContextDetails: () => contextDefaultValue,
  setContextDetails: () => { },
});

export const ConfirmProvider: React.FC<{ children }> = ({ children }) => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const detailRef = React.useRef<ConfirmStateType>(contextDefaultValue);

  const getDetails = () => {
    return detailRef.current;
  };

  const setDetails = (details: ConfirmStateType) => {
    detailRef.current = details;
  };

  return (
    <ConfirmContext.Provider
      value={{
        isOpen,
        setIsOpen,
        getContextDetails: getDetails,
        setContextDetails: setDetails,
      }}
    >
      <ConfirmDialog />
      {children}
    </ConfirmContext.Provider>
  );
};
