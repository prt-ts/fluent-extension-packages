import { makeStyles, tokens } from "@fluentui/react-components";

export const useGridHeaderStyles = makeStyles({
    wrapper: {
        columnGap: "0.2rem",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        paddingTop: "3px",
        paddingBottom: "3px",
        backgroundColor : tokens.colorNeutralBackground2Hover
    }, 

    searchContainer: {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
    }
});