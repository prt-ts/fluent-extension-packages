/* eslint-disable */

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { SPFx as graphSPFx, GraphFI, graphfi } from "@pnp/graph";

import "@pnp/graph/presets/all";
import "@pnp/sp/presets/all";

declare global {
    interface Window {
        SPFxCore: SPFxCore;
    }
    interface SPFxCore {
        __SP: SPFI;
        __GraphFI: GraphFI;
        __SPFxContext: WebPartContext;
    }
}

export const getSP = async (
    context?: WebPartContext,
    siteURL?: string
): Promise<SPFI> => {
    // initialize if _SP is null and Context is provided
    if (context) {
        // Set sp as the global variable so we don't have to pass webpartcontext deep down to the child component
        // initialize once at init


        window.SPFxCore.__SP = await spfi(siteURL)
            .using(SPFx(context))
            .using(PnPLogging(LogLevel.Error));

        window.SPFxCore.__SPFxContext = context;
    }

    return new Promise((resolve, reject) => {
        if (window.SPFxCore.__SP) resolve(window.SPFxCore.__SP);
        else reject("PnpSP is Not Initialized");
    });
};

export const getGraphFi = async (
    context?: WebPartContext
): Promise<GraphFI> => {
    // initialize if _SP is null and Context is provided
    if (context) {
        // Set sp as the global variable so we don't have to pass webpartcontext deep down to the child component
        // initialize once at init
        window.SPFxCore.__GraphFI = await graphfi()
            .using(graphSPFx(context))
            .using(PnPLogging(LogLevel.Error));

        window.SPFxCore.__SPFxContext = context;
    }

    return new Promise((resolve, reject) => {
        if (window.SPFxCore.__GraphFI) resolve(window.SPFxCore.__GraphFI);
        else reject("GraphFi is Not Initialized");
    });
};
