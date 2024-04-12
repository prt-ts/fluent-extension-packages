import { makeStyles, shorthands, tokens } from "@fluentui/react-components";



export const useInputStyles = makeStyles({
    cell: {
        minWidth: "30px",
        width: "100%",
        maxWidth: "400px",
    },
    placeholderDiv: {
        display: "flex",
        justifyContent: "space-between",
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        ...shorthands.padding("5px", "10px"),
        // boxShadow: tokens.shadow2,
        backgroundColor: tokens.colorNeutralBackground2,
        ...shorthands.borderRadius(tokens.borderRadiusMedium),

        ":hover": {
            backgroundColor: tokens.colorNeutralBackground2,
        }
        
    },
    placeholder: {
        color: tokens.colorNeutralForegroundDisabled,
    }
    
});