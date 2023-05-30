import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useGridHeaderStyles = makeStyles({
    wrapper: {
        columnGap: "0.2rem",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        paddingTop: "3px",
        paddingBottom: "3px",
        backgroundColor : tokens.colorNeutralBackground2Hover,
        ...shorthands.borderRadius("3px", "3px", 0, 0)
    }, 

    searchContainer: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        ...shorthands.padding("0px", "10px")
    },

    searchContainerDivider: {
        ...shorthands.margin("0px", "10px"),
        height: "100%"
    }
});