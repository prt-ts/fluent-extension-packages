
/* eslint-disable */
export type UserInfo<TAdditionalInfo = {}> = {
    id: string | number;
    name: string;
    email: string;
    loginName: string; 
    objectId?: string; 
    userDomain?: string;
    userMeta?: TAdditionalInfo;
    userType?: "User" | "Group"
    members?: UserInfo[];
} 