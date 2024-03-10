import * as React from "react"; 
import { IPageViewTelemetry } from "@microsoft/applicationinsights-web";
import { AppContext } from "../app";
import { LogLevel, Logger } from "@pnp/logging";

export function useTrackPageView(
  pageViewTelemetry: IPageViewTelemetry = {}
): void {
  React.useEffect(() => {
    try {
        const { appInsights, currentUser } = AppContext.getInstance();
        appInsights?.trackPageView({
          uri: window.location.href,
          ...pageViewTelemetry,
          properties: { 
            user: JSON.stringify(currentUser),
          },
        });
    } catch (error) {
        Logger.write(`useTrackPageView - ${error}`, LogLevel.Error);
    }   
  }, 
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []);
}
