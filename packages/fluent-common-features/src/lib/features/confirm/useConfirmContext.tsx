import * as React from 'react';
import { ConfirmContext } from './ConfirmContext';

export const useConfirmContext = () => {
    const context = React.useContext(ConfirmContext);
    if (!context) {
      throw new Error('useConfirmContext must be used within a ConfirmProvider');
    }
    return context;
  };