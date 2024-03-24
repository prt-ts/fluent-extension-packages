/* eslint-disable */
import * as React from 'react';
import { ConfirmStateType, contextDefaultValue } from './Types';
import { ConfirmContext } from './ConfirmContext';
import { ConfirmDialog } from './ConfirmDialog';

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