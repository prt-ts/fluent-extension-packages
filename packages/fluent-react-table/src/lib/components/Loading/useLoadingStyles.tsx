import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useLoadingStyles = makeStyles({
    invertedWrapper: {
        backgroundColor: tokens.colorNeutralBackground1,
        ...shorthands.margin("10px", "0px")
    }, 
    row: {
        alignItems: "center",
        display: "grid",
        paddingBottom: "10px",
        position: "relative",
        ...shorthands.gap("10px"),
        gridTemplateColumns: "min-content 20% 15% 65%",
    },
});