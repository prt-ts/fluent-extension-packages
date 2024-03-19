export type EmailSettingType = {
    from?: string;
    isEnabled: boolean;
    notificationDelegateEmails?: string[];
    notificationBCCEmails?: string[];
}