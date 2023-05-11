import { makeStyles, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        // Use 2px gap below the label (per the design system)
        rowGap: "2px",

        // add 4px margin to the top of the field
        marginTop : "4px",
    },
});

export const useOptionStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column", 
        flexWrap: "wrap",
        rowGap: "2px",
        
    },
});