import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useGridHeaderStyles = makeStyles({
    tableTopHeaderContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "100%",
        backgroundColor: tokens.colorBrandBackground2Hover,
        ...shorthands.padding("5px"),
    },

    tableTopHeaderLeft: {
        display: "flex",
        justifyContent: "flex-start",
    },

    tableTopHeaderRight: {
        display: "flex",
        justifyContent: "flex-end",
        ...shorthands.gap("3px")
    },

    tableTopHeaderColumnTogglePopover: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
    },
});