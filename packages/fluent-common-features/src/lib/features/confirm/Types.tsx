import { ButtonProps } from "@fluentui/react-components";

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

/* eslint-disable */
export const contextDefaultValue: ConfirmStateType = {
    title: '',
    message: <></>,
    onConfirm: () => {},
    onCancel: () => {},
  
    confirmButtonProps: {
      appearance: 'primary',
      children: 'Yes', 
    } as ButtonProps,
    cancelButtonProps: {
      children: 'No', 
    } as ButtonProps,
  };