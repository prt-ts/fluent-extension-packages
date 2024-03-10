import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGraphFi, getSP } from "../pnp";
import { EmailConfig, EmailSettingType } from "../email"; 
import { AppSettings } from "./AppSettings";
import { UserInfo } from "../types";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

export default class AppContext {
    private static instance: AppContext;

    private _context: WebPartContext | null;
    private _settings: AppSettings | null;
    private _currentUser: UserInfo | null;
    private _appInsights: ApplicationInsights | null;

    private constructor() {
        // initialize default values
        this._context = null;
        this._settings = null;
        this._currentUser = null;
        this._appInsights = null;
    }

    public static getInstance(): AppContext {
        if (!AppContext.instance) {
            AppContext.instance = new AppContext();
        }
        return AppContext.instance;
    }

    public get context(): WebPartContext {
        if (!this._context) {
            throw new Error("AppContext is not initialized");
        }
        return this._context;
    }

    public get appInsights(): ApplicationInsights {
        if (!this._appInsights) {
            throw new Error("AppInsights is not initialized");
        }
        return this._appInsights;
    }

    public get settings(): AppSettings | null  {        
        return this._settings;
    }

    public get currentUser(): UserInfo | null { 
        return this._currentUser;
    }

    public initializeAppContext = async (context: WebPartContext, siteURL?: string) => {
        this._context = context;

        // initialize user
        const user = context.pageContext.user;
        if (user) {
            const userInfo: UserInfo = {
                id: -1,
                name: user.displayName,
                email: user.email,
                loginName: user.loginName,
                objectId: "",
                userType: "User",
                userDomain: user.loginName.split("@")?.[1] || "",
            };
            this._currentUser = userInfo;
        }

        // initialize sp and graph
        await getSP(context, siteURL);
        await getGraphFi(context);
        return this;
    }

    public initializeEmailConfig = (config: EmailSettingType) => {
        const emailConfig = EmailConfig.getInstance();
        emailConfig.initializeConfig(config);
        return this;
    }

    public initializeAppSettings = (settings: AppSettings) => {
        this._settings = settings;
        return this;
    }

    public initializeAppInsights = async (connectionString: string) => {
        this._appInsights = new ApplicationInsights({
            config: {
              connectionString: connectionString,
              /* ...Other Configuration Options... */
            },
          });
    
          await this._appInsights.loadAppInsights();
          await this._appInsights.addTelemetryInitializer((envelope) => {

            if(!envelope.tags) return;

            envelope.tags["siteName"] = this.context.pageContext.web.title;
            envelope.tags["userName"] = this.currentUser?.loginName || "";
            envelope.tags["userEmail"] = this.currentUser?.email || "";
            envelope.tags["userDisplayName"] = this.currentUser?.name || "";
          });
          this._appInsights.trackPageView();
    }
}