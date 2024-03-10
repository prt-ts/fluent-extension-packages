import * as React from 'react';
import { AuthContextType } from './AuthTypes';

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{ authContext: AuthContextType }>> = ({ children, authContext }) => {
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};