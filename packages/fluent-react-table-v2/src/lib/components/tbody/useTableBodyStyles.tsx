import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useTableBodyStyles = makeStyles({

    tBody: {
        ...shorthands.padding("0px", "0px", "0px", "0px"),
        zIndex: 0,
    },

    tBodyRow: {
        ...shorthands.padding("0px", "0px", "0px", "0px"),
        ...shorthands.borderBottom(
            tokens.strokeWidthThin,
            "solid",
            tokens.colorNeutralStroke1
        ),
        // ":nth-child(even)": {
        //     backgroundColor: tokens.colorNeutralBackground2,
        // },

        ":hover": {
            backgroundColor: tokens.colorNeutralBackground2Hover,
        },
    },

    tBodySelectedRow: {
        backgroundColor: tokens.colorBrandBackground2,
        ...shorthands.borderBottom(
            tokens.strokeWidthThin,
            "solid",
            tokens.colorNeutralStroke1
        ),

        ":hover": {
            backgroundColor: tokens.colorBrandBackground2Hover,
        },
    },

    tBodyCell: {
        // backgroundColor: "transparent",
        ...shorthands.padding("2px", "4px"),
        minHeight: "35px",
        height: "35px",
    },

    tBodyPinnedCell: {
        backgroundColor : tokens.colorNeutralBackground1Hover
    }

});