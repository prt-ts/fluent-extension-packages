
export type AuthContextType = {
    accessType: "ROLES" | "RESOURCES";
    userRolesOrResources: string[];
};  

export type AuthProviderProps = {
    children: React.ReactNode | JSX.Element;
    authContext: AuthContextType;
};

export type ResourceAccessProps = {
    children: React.ReactNode | JSX.Element; 
    requiredRolesOrResources: string[];

    fallback?: JSX.Element | string | null;
    requiredAll?: boolean;
    additionalUserRolesOrResources?: string[];
};