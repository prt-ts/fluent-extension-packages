import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getGraphFi, getSP } from "../pnp";
import { EmailConfig, EmailSettingType } from "../email";
import { AppSettings } from "./AppSettings";
import { UserInfo } from "../types";
import { ApplicationInsights, IConfig, IConfiguration } from "@microsoft/applicationinsights-web";

export default class AppContext {
    private static instance: AppContext;

    private _context: WebPartContext | null;
    private _settings: AppSettings | null;
    private _currentUser: UserInfo | null;
    private _appInsights: ApplicationInsights | null;
    private _domReact: DOMRect | null;

    private constructor() {
        // initialize default values
        this._context = null;
        this._settings = {};
        this._currentUser = null;
        this._appInsights = null;
        this._domReact = null;
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

    public get settings(): AppSettings | null {
        return this._settings;
    }

    public get currentUser(): UserInfo | null {
        return this._currentUser;
    }

    public get domRect(): DOMRect | null {
        return this._domReact;
    }

    public initializeAppContext = async (context: WebPartContext, domElement?: HTMLElement, siteURL?: string) => {
        this._context = context;

        // initialize domRect
        const element = domElement || document.body;
        this._domReact = element?.getBoundingClientRect();

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
        await getSP(context, siteURL, true);
        await getGraphFi(context);
        return this;
    }

    public updateSiteURL = async (siteName: string) => {
        if(!this._context) {
            throw new Error("AppContext is not initialized");
        }
        const absoluteUrl = this.context.pageContext.site.absoluteUrl;

        // replace last part of the url with siteName
        const urlParts = absoluteUrl.split("/");
        urlParts.pop();
        urlParts.push(siteName);
        const siteURL = urlParts.join("/");

        // reinitialize sp
        await getSP(this.context, siteURL, true);
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

    public updateAppSettings = (settings: Partial<AppSettings>) => {
        this._settings = {
            ...this._settings,
            ...settings,
        };
        return this;
    }

    public initializeAppInsights = async (connectionString: string, config?: IConfiguration & IConfig) => {
        this._appInsights = new ApplicationInsights({
            config: {
                connectionString: connectionString,
                /* ...Other Configuration Options... */
                ...(config || {}),
            },
        });

        await this._appInsights.loadAppInsights();
        await this._appInsights.addTelemetryInitializer((envelope) => {

            if (!envelope.tags) return;

            envelope.tags["siteName"] = this.context.pageContext.web.title;
            envelope.tags["userName"] = this.currentUser?.loginName || "";
            envelope.tags["userEmail"] = this.currentUser?.email || "";
            envelope.tags["userDisplayName"] = this.currentUser?.name || "";
        });
        await this._appInsights.trackPageView();
    }
}