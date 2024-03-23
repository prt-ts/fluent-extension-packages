/* eslint-disable */
import * as React from 'react';
import { ConfirmContextType, contextDefaultValue } from './Types';
 
export const ConfirmContext = React.createContext<ConfirmContextType>({
  isOpen: false,
  setIsOpen: () => { },
  getContextDetails: () => contextDefaultValue,
  setContextDetails: () => { },
});