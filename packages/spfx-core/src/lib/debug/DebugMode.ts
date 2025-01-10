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

    // Reload the page to apply the debug mode
    window.location.reload();
}

function disableDebugMode() {
    localStorage.removeItem(SPFxCoreDebugKey);
    console.log("Debug mode disabled");

    // Reload the page to apply the debug mode
    window.location.reload();
}

export function isDebugMode(): boolean {
    const debugMode = localStorage.getItem(SPFxCoreDebugKey);
    return debugMode === "true";
}

window.enableDebugMode = enableDebugMode;
window.disableDebugMode = disableDebugMode;
