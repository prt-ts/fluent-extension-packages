import { EmailSettingType } from "./EmailSetting";

export default class EmailConfig { 
    private static instance: EmailConfig;

    _from: string;
    _isEnabled: boolean;
    _notificationDelegateEmails: string[];

    private constructor() {
        this._from = "";
        this._isEnabled = true;
        this._notificationDelegateEmails = [];
    }
    
    public static getInstance(): EmailConfig {
        if (!EmailConfig.instance) {
            EmailConfig.instance = new EmailConfig();
        }
        return EmailConfig.instance;
    }

    public get from(): string {
        return this._from;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    public get notificationDelegateEmails(): string[] {
        return this._notificationDelegateEmails;
    }

    public initializeConfig = (config: EmailSettingType) => {
        this._from = config.from;
        this._isEnabled = config.isEnabled;
        this._notificationDelegateEmails = config.notificationDelegateEmails || [];
    } 
} 