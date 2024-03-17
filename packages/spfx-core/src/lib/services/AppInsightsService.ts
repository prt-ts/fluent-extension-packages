/* eslint-disable  */

import { ICustomProperties, IDependencyTelemetry, IEventTelemetry, IExceptionTelemetry, IPageViewPerformanceTelemetry, IPageViewTelemetry, ITraceTelemetry } from "@microsoft/applicationinsights-web";
import { AppContext } from "../app";
import { LogLevel, Logger } from "@pnp/logging";

export const AppInsightService = () => {
    (async () => { })();

    const trackEvent = async (event: IEventTelemetry, customProperties?: ICustomProperties | undefined): Promise<void> => {

        try {
            const { appInsights, currentUser } = AppContext.getInstance();
            if (appInsights) {
                const additionalProperties = {
                    ...(customProperties || {}),
                    user: currentUser
                }
                appInsights.trackEvent(event, additionalProperties);
            }

        } catch (e: Error | any) {
            console.error("Error in AppInsightService >> trackEvent : ", e);
            Logger.log({
                data: e,
                level: LogLevel.Error,
                message: "Error in AppInsightService >> trackEvent : " + e.message
            });
        }
    }

    const trackException = async (error: IExceptionTelemetry, customProperties?: ICustomProperties | undefined): Promise<void> => {
        try {
            const { appInsights, currentUser } = AppContext.getInstance();
            if (appInsights) {
                const additionalProperties = {
                    ...(customProperties || {}),
                    user: currentUser
                }
                appInsights.trackException(error, additionalProperties);
            }
        } catch (e: Error | any) {
            console.error("Error in AppInsightService >> trackException : ", error);
            Logger.log({
                data: e,
                level: LogLevel.Error,
                message: "Error in AppInsightService >> trackEvent : " + e.message
            });
        }
    }

    const trackPageView = async (pageView: IPageViewTelemetry | undefined): Promise<void> => {
        try {
            const { appInsights, currentUser } = AppContext.getInstance();
            if (appInsights) {
                const customPageView = {
                    ...(pageView || {}),
                    properties: {
                        ...(pageView?.properties || {}),
                        user: currentUser
                    }
                }
                appInsights.trackPageView(customPageView);
            }
        } catch (e: Error | any) {
            console.error("Error in AppInsightService >> trackPageView : ", e);
            Logger.log({
                data: e,
                level: LogLevel.Error,
                message: "Error in AppInsightService >> trackEvent : " + e.message
            });
        }
    }

    const trackTrace = async (trace: ITraceTelemetry, customProperties?: ICustomProperties | undefined): Promise<void> => {
        try {
            const { appInsights, currentUser } = AppContext.getInstance();
            if (appInsights) {
                const additionalProperties = {
                    ...(customProperties || {}),
                    user: currentUser
                }
                appInsights.trackTrace(trace, additionalProperties);
            }
        } catch (e: Error | any) {
            console.error("Error in AppInsightService >> trackTrace : ", e);
            Logger.log({
                data: e,
                level: LogLevel.Error,
                message: "Error in AppInsightService >> trackEvent : " + e.message
            });
        }
    }

    const trackDependencyData = async (dependency: IDependencyTelemetry): Promise<void> => {
        try {
            const { appInsights, currentUser } = AppContext.getInstance();
            if (appInsights) {
                const additionalDependency = {
                    ...(dependency || {}),
                    properties: {
                        ...(dependency?.properties || {}),
                        user: currentUser
                    },
                }
                appInsights.trackDependencyData(additionalDependency);
                appInsights.trackPageViewPerformance
            }
        } catch (e: Error | any) {
            console.error("Error in AppInsightService >> trackDependencyData : ", e);
            Logger.log({
                data: e,
                level: LogLevel.Error,
                message: "Error in AppInsightService >> trackEvent : " + e.message
            });
        }
    }

    const trackPageViewPerformance = async (pageView: IPageViewPerformanceTelemetry | undefined): Promise<void> => {
        try {
            const { appInsights, currentUser } = AppContext.getInstance();
            if (appInsights) {
                const customPageView = {
                    ...(pageView || {}),
                    properties: {
                        ...(pageView?.properties || {}),
                        user: currentUser
                    }
                }
                appInsights.trackPageViewPerformance(customPageView);
            }
        } catch (e: Error | any) {
            console.error("Error in AppInsightService >> trackPageViewPerformance : ", e);
            Logger.log({
                data: e,
                level: LogLevel.Error,
                message: "Error in AppInsightService >> trackEvent : " + e.message
            });
        }
    }

    return {
        trackEvent,
        trackException,
        trackPageView,
        trackTrace,
        trackDependencyData,
        trackPageViewPerformance
    } as const;
};
