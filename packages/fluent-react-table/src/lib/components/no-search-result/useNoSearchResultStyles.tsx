import { makeStyles, tokens } from "@fluentui/react-components";

export const useNoFilterMatchStyles = makeStyles({
    wrapper: {
        backgroundColor: tokens.colorNeutralBackground1,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        minHeight: "300px",
    },
    iconWrapper: {
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
    }
});