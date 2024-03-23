import { makeStyles, tokens } from "@fluentui/react-components";

export const useButtonStyles = makeStyles({
    success: {
        backgroundColor: tokens.colorPaletteGreenBackground3,
        color: tokens.colorNeutralForegroundOnBrand,

        ":hover": {
            backgroundColor: tokens.colorPaletteGreenForeground1,
            color: tokens.colorNeutralForegroundOnBrand,
        },
        ":hover:active": {
            backgroundColor: tokens.colorPaletteGreenForeground2,
            color: tokens.colorNeutralForegroundOnBrand,
        }
    }, 
    danger: {
        backgroundColor: tokens.colorPaletteRedBackground3,
        color: tokens.colorNeutralForegroundOnBrand,

        ":hover": {
            backgroundColor: tokens.colorPaletteRedForeground1,
            color: tokens.colorNeutralForegroundOnBrand,
        },
        ":hover:active": {
            backgroundColor: tokens.colorPaletteRedForeground2,
            color: tokens.colorNeutralForegroundOnBrand,
        }
    },
    warning: {
        backgroundColor: tokens.colorPaletteYellowBackground2,

        ":hover": {
            backgroundColor: tokens.colorPaletteYellowBackground3,
        },
        ":hover:active": {
            backgroundColor: tokens.colorPaletteYellowBackground3
        } 
    },
    info: {
        backgroundColor: tokens.colorPaletteBlueForeground2,
        color: tokens.colorNeutralForegroundOnBrand,

        ":hover": {
            backgroundColor: tokens.colorPaletteBlueForeground2,
            color: tokens.colorNeutralForegroundOnBrand,
        },
        ":hover:active": {
            backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
            color: tokens.colorNeutralForegroundOnBrand,
        }
    },
});