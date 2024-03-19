import { SPFxCoreDebugKey } from "../types/DebugKey";

declare global {
    interface Window {
        enableDebugMode: () => void;
        disableDebugMode: () => void;
    }
}

function enableDebugMode() {
    localStorage.setItem(SPFxCoreDebugKey, "true");
    console.log("Debug mode enabled", localStorage.getItem(SPFxCoreDebugKey));
}

function disableDebugMode() {
    localStorage.removeItem(SPFxCoreDebugKey);
    console.log("Debug mode disabled");
}

export function isDebugMode(): boolean {
    const debugMode = localStorage.getItem(SPFxCoreDebugKey);
    return debugMode === "true";
}

window.enableDebugMode = enableDebugMode;
window.disableDebugMode = disableDebugMode;
