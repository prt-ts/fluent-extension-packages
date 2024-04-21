import { makeStyles, tokens } from "@fluentui/react-components";

export const useIconStyles = makeStyles({
    icon: {
        fontSize: tokens.fontSizeBase300
    },
    menuPopover: {
        minWidth: tokens.spacingHorizontalM,
    },
    dropdown: {
        minWidth: tokens.spacingHorizontalM,
    },

    buttonContent: {
        display: "flex",
        ":before": {
            content: "''!important", 
        },
    },
});