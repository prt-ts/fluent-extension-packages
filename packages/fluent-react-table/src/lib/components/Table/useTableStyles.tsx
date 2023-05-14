import { makeStyles, tokens } from "@fluentui/react-components";

export const useTableStyles = makeStyles({

    headerRow: {
        backgroundColor: tokens.colorPaletteAnchorBackground2,
        position: "sticky",
        top: 0,

        ":hover": {
            backgroundColor: tokens.colorPaletteAnchorBackground2,
        }
    },

    selectedRow: {
        backgroundColor: tokens.colorBrandBackground2,
        ":hover": {
            backgroundColor: tokens.colorBrandBackground2,
        }
    }

});