import { makeStyles, tokens } from "@fluentui/react-components";

export const usePaginationStyle = makeStyles({
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
    pageBtnContainer: {
        display: "flex", 
        columnGap: "3px"
    },
    pageBtn: {
        minWidth: "1.5rem",
        minHeight:"1.5rem",
        alignContent: "center",
        alignItems: "center"
    },
    pageSelectionWrapper: {
        minWidth: "1.5rem"
    },
    pageSelectionDropdown: {
        minWidth: "100%"
    },

});