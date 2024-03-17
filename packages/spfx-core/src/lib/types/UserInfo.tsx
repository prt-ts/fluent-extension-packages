
/* eslint-disable */
export type UserInfo<TAdditionalInfo = {}> = {
    id: string | number;
    name: string;
    email: string;
    loginName: string; 
    objectId?: string;
    userType?: "User" | "Group";
    userDomain?: string;
    userMeta?: TAdditionalInfo;
};