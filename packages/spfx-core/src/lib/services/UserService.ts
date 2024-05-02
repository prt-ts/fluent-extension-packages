/* eslint-disable */ 
import { 
    
 } from "@pnp/sp/site-users";
import { IPagedResult } from "@pnp/graph";
import { getGraphFi, getSP } from "../pnp";
import { UserInfo } from "@prt-ts/types";
import { ISiteGroupInfo } from "@pnp/sp/site-groups";

export type ObjectType = "user" | "group" | "both"; 

export const UserService = () => {
    (async () => { })();

    const mapUserFromSPList = (user: any, allowFormat: boolean = true): UserInfo | null => {
        try {
            const mappedUser = {
                id: user.Id || user.ID,
                name: allowFormat? formatName(user.Title) : user.Title,
                email: user.EMail,
                loginName: user.UserName,
                userType: "User",
            } as UserInfo;

            return mappedUser;

        } catch (error) {
            console.error(error);
        }
        return null;
    };

    const mapUsersFromSPList = (users: any[]): (UserInfo | null)[] => {
        return users.map((user) => mapUserFromSPList(user));
    };

    const formatName = (displayName: string, outputFormat: string = `{firstName} {lastName}`): string => {
        try {
            const name = displayName?.split(" (")?.[0];
            const [lastName, firstName] = name?.split(", ");
            return outputFormat
                .replace("{firstName}", (firstName || ''))
                .replace("{lastName}", (lastName || ''));

        } catch (error) {
            console.error(error);
            return displayName;
        }
    };

    async function searchUsers(
        usernameOrEmailOrName: string,
        excludedUsers: UserInfo[] = [],
        objectType: ObjectType = "user",
        filterString: string = "",
        allowFormat: boolean = true
    ): Promise<UserInfo[]> {
        return new Promise<UserInfo[]>(async (resolve, reject) => {
            try {
                if (!usernameOrEmailOrName) return [];

                const userName = usernameOrEmailOrName?.toLocaleLowerCase();
                const graphi = await getGraphFi();

                let users: any[] = [];

                let groups: any[] = [];  

                if (["both", "user"].includes(objectType)) {
                    users = await graphi.users
                        .top(10 + excludedUsers?.length)
                        .search(
                            `
                                "displayName:${encodeURIComponent(userName)}" 
                                OR "mail:${encodeURIComponent(userName)}" 
                                OR "userPrincipalName:${encodeURIComponent(userName)}" 
                            `
                        )
                        .filter(filterString)();
                }

                if (["both", "group"].includes(objectType)) {
                    groups = await graphi.groups
                        .top(10 + excludedUsers?.length)
                        .search(
                            `
                                "displayName:${encodeURIComponent(userName)}"
                                OR "mail:${encodeURIComponent(userName)}"
                                OR "mailNickname:${encodeURIComponent(userName)}"
                            `
                        )
                        .filter(filterString)();
                }

                const selectedUserEmails = excludedUsers?.map((x) => x.email?.toLowerCase());
                const allGroupAndUser = [
                    ...(users || [])?.map((user) => {
                        {
                            const displayName = allowFormat ? formatName(user.displayName): user.displayName;
                            return {
                                id: user.id,
                                name: displayName,
                                email: user.mail,
                                loginName: user.userPrincipalName,
                                userType: "User",
                                objectId: user.id,
                                userDomain: user.userPrincipalName?.split("@")[1],
                            } as UserInfo;
                        }
                    }),
                    ...(groups || [])?.map((user) => {
                        {
                            return {
                                id: user.id,
                                name: user.displayName,
                                email: user.mail,
                                loginName: user.mailNickname,
                                userType: "Group",
                                objectId: user.id,
                                userDomain: user.userPrincipalName?.split("@")[1],
                            } as UserInfo;
                        }
                    }),
                ];

                const mappedUsers = allGroupAndUser.filter(
                    (user) => selectedUserEmails?.indexOf(user.email) === -1
                );
                resolve(mappedUsers);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getCurrentUserGroups = async (): Promise<ISiteGroupInfo[]> => {
        return new Promise<ISiteGroupInfo[]>(async (resolve, reject) => {
            try {
                const sp = await getSP();
                const groups = await sp.web.currentUser.groups();
                resolve(groups);
            } catch (error) {
                reject(error);
            }
        });
    };

    const ensureUser = async (userPrincipalName: string): Promise<SiteUser> => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const sp = await getSP();
                const result = await sp.web.ensureUser(
                    `i:0#.f|membership|${userPrincipalName}`
                ); 
                
                const siteUser: SiteUser = {
                    Id: result.Id,
                    Title: result.Title,
                    Email: result.Email,
                    LoginName: result.LoginName,
                    Username: (result.UserPrincipalName || "")?.split("@")?.[0],
                    UserPrincipalName: result.UserPrincipalName,
                } as SiteUser;

                resolve(siteUser);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getSiteUsers = async (allowFormat: boolean = true): Promise<UserInfo[]> => {
        return new Promise<UserInfo[]>(async (resolve, reject) => {
            try {
                const sp = await getSP();
                const users = await sp.web.siteUsers();

                if (!users) {
                    resolve([]);
                }

                const mappedUsers = (users || []).map((user) => {
                    return {
                        id: user.Id,
                        name: allowFormat ? formatName(user.Title) : user.Title,
                        email: user.Email,
                        loginName: user.LoginName,
                        userType: "User",
                    } as UserInfo;
                });

                resolve(mappedUsers);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getUserProfile = async (userPrincipalName: string): Promise<any> => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const sp = await getSP();
                const profile = await sp.profiles.getPropertiesFor(
                    `i:0#.f|membership|${userPrincipalName}`
                );
                resolve(profile);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getUserFromSecurityGroup = async (groupName: string): Promise<UserInfo[]> => {
        return new Promise<UserInfo[]>(async (resolve, reject) => {
            try {
                const sp = await getSP();
                const users = await sp.web.siteGroups
                    .getByName(groupName)
                    .users();

                if(!users) {
                    resolve([]);
                }

                const mappedUsers = (users || []).map((user) => {
                    return {
                        id: user.Id,
                        name: user.Title,
                        email: user.Email,
                        loginName: user.LoginName,
                        userType: "User", 
                    } as UserInfo;
                });
                    
 
                resolve(mappedUsers);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getUserFromListField = async (listName: string, fieldName: string, itemId: number): Promise<UserInfo[]> => {
        return new Promise<UserInfo[]>(async (resolve, reject) => {
            try {
                const sp = await getSP();
                const users = await sp.web.lists.getByTitle(listName)
                    .items.getById(itemId)
                    .expand(fieldName)
                    .select(
                        `${fieldName}/Id`,
                        `${fieldName}/Title`,
                        `${fieldName}/EMail`, 
                        `${fieldName}/Username`
                    )();


                if (!users) {
                    resolve([]);
                }

                const mappedUsers = mapUsersFromSPList(users)?.filter(x => x !== null) as UserInfo[];                  
 
                resolve(mappedUsers);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        getSiteUsers,
        searchUsers,
        getCurrentUserGroups,
        ensureUser,
        getUserProfile,
        getUserFromSecurityGroup,
        getUserFromListField,

        mapUserFromSPList,
        mapUsersFromSPList,
        formatName
    };
};

export type SiteUser = {
    Id: number;
    Title: string;
    Email: string;
    Username: string;
    LoginName: string;
    UserPrincipalName: string;
};

