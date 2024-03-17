import { SPFxCoreDebugKey } from "../types/DebugKey";

declare global {
    interface Window {
        enableDebugMode: () => void;
        disableDebugMode: () => void;
    }
}

function enableDebugMode() {
    localStorage.setItem(SPFxCoreDebugKey, "true");
}

function disableDebugMode() {
    localStorage.removeItem(SPFxCoreDebugKey);
}

export function isDebugMode(): boolean {
    const debugMode = localStorage.getItem(SPFxCoreDebugKey);
    return debugMode === "true";
}

window.enableDebugMode = enableDebugMode;
window.disableDebugMode = disableDebugMode;
