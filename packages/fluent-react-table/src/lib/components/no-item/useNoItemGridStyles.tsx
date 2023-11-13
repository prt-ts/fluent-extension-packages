import { makeStyles, tokens } from "@fluentui/react-components";

export const useNoItemGridStyles = makeStyles({
    wrapper: {
        backgroundColor: tokens.colorNeutralBackground1,
        display: "flex",
        flexWrap: "wrap",
        alignContent : "center",
        justifyContent: "center",
        minHeight: "300px",
    } 
});