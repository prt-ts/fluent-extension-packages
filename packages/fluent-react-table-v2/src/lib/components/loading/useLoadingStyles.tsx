import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useLoadingStyles = makeStyles({
    invertedWrapper: {
        backgroundColor: tokens.colorNeutralBackground1, 
    },
    row: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        position: "relative",
        paddingBottom: "10px",
        paddingTop: "10px",
        ...shorthands.gap("20px"), 
    },
});