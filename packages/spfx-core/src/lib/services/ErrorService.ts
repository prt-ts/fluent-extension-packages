/* eslint-disable  */
import { LogLevel, Logger } from "@pnp/logging";
import { HttpRequestError } from "@pnp/queryable";
import { hOP } from "@pnp/core";

export const ErrorService = () => {
  (async () => {})();
  
  async function handleError(e: Error | HttpRequestError): Promise<string> {
  
    let message: string;
    // check if the error is an HttpRequestError
    if (hOP(e, "isHttpRequestError")) {
  
      // we can read the json from the response
      const data = await (<HttpRequestError>e).response.json();
  
      // parse this however you want
      message = typeof data["odata.error"] === "object" ? data["odata.error"].message.value : e.message;
  
      // we use the status to determine a custom logging level
      const level: LogLevel = (<HttpRequestError>e).status === 404 ? LogLevel.Warning : LogLevel.Info;
  
      // create a custom log entry
      Logger.log({
        data,
        level,
        message,
      });
  
    } else {
      // not an HttpRequestError so we just log message
      Logger.error(e);
    }
    
    return new Promise<string>((resolve) => {
      resolve(message);    
    });
  }
  
  return {
    handleError
  } as const;
};
