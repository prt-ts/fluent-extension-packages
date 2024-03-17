import {
    ConsoleListener,
    Logger,
    LogLevel
} from "@pnp/logging"; 

const LOG_SOURCE = 'SPFx_App_Core';
Logger.subscribe(ConsoleListener(LOG_SOURCE));
Logger.activeLogLevel = LogLevel.Info;