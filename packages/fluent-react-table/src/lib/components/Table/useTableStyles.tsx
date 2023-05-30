import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useTableStyles = makeStyles({

    gridTableSection: {
        maxWidth: "100%",
        maxHeight: "600px",
        minHeight: "300px",
        ...shorthands.overflow("hidden"),
        /* width */

        ":hover": {
            ...shorthands.overflow("auto"),
        },

        "::-webkit-scrollbar": {
            width: "5px",
            height: "4px",
            ...shorthands.borderRadius("50%")
        },

        /* Track */
        "::-webkit-scrollbar-track": {
            "background-color": '#f1f1f1'
        },

        /* Handle */
        "::-webkit-scrollbar-thumb": {
            "background-color": "#888"
        },

        /* Handle on hover */
        "::-webkit-scrollbar-thumb:hover": {
            "background-color": "#555"
        },
    },

    gridTable: {
        maxWidth: "100%"
    },

    headerRow: {
        backgroundColor: tokens.colorPaletteAnchorBackground2,
        opacity: "1",
        position: "sticky",
        top: 0,
        zIndex: 9999,

        ":hover": {
            backgroundColor: tokens.colorPaletteAnchorBackground2,
            zIndex: 9999
        }
    },

    headerCell: {
        cursor: "pointer",

        ">button": {
            display: "flex",
            flexDirection: "row-reverse",
            alignContent: "center",
            flexWrap: "wrap",
            justifyContent: "start",
            cursor: "pointer",
            ...shorthands.margin("0px", "3px")
        }
    },

    headerSelectionCell: {
        width: "15px"
    },

    headerToggleCell: { 
        cursor: "pointer",
        maxWidth: "20px",
        width: "20px"
    },

    headerToggleIcon: {
        width: "20px",
        cursor: "pointer",
        maxWidth: "20px"
    },

    selectedRow: {
        backgroundColor: tokens.colorBrandBackground2,
        ":hover": {
            backgroundColor: tokens.colorBrandBackground2,
        }
    },

    groupHeaderRow: {
        backgroundColor: tokens.colorNeutralBackground3,
        ":hover": {
            backgroundColor: tokens.colorNeutralBackground3Hover,
        }
    },

    searchInput: {
        minWidth: "300px"
    }

});