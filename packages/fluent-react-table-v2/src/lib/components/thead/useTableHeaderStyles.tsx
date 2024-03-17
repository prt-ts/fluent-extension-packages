import { makeStyles, shorthands, tokens } from "@fluentui/react-components";


export const useTableHeaderStyles = makeStyles({
    tHead: {
        zIndex: 1,
        backgroundColor: tokens.colorNeutralStroke2,
        color: tokens.colorNeutralForeground1, 
        position: "sticky",
        top: 0,
        width: "100%",
        boxShadow: tokens.shadow2,
    },
    tHeadRow: {
        backgroundColor: tokens.colorNeutralCardBackgroundSelected, 
    },
    tHeadCell: {
        zIndex: 99,
        position: 'relative',
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightBold,
        minWidth: '1rem',
        ...shorthands.padding('2px', '4px'),
    },

    tHeadNonLeafCell: {
        ...shorthands.borderBottom(0),
    },

    tHeadNonLeafCellFakeBorder: {
        width: '100%',
        height: '1px',
        position: "sticky",
        bottom: 0,
        ...shorthands.borderBottom('1px', 'solid', tokens.colorBrandBackgroundInverted),
    },

    tHeadCellDraggable: {
        height: '100%',
        cursor: 'grab',
    },

    tHeadCellDragging: {
        opacity: 0.5,
        cursor: 'grabbing',
        
    },

    tHeadCellOver: {
        backgroundColor: tokens.colorNeutralStroke1,
        ...shorthands.border(tokens.strokeWidthThin, 'dashed', tokens.colorNeutralBackground2Pressed),
    },

    tLeafHeadCellContent: {
        display: 'flex',
        alignContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        minWidth: '1rem',
        ...shorthands.padding('3px', '4px'),
    },

    tNonLeafHeadCellContent: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        width: '100%',
        minWidth: '1rem',
        ...shorthands.padding('3px', '4px'),
    },

    tHeadContentBtn: {
        ...shorthands.padding('0px', '0px', '0px', '0px'),
        display: 'flex',
        ...shorthands.gap('5px'),
        alignContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        minWidth: '1rem',
    },

    tHeadMenuPopover: {
        ...shorthands.padding('0px', '0px', '0px', '0px'),
        width: '300px',
    },

    resizer: {
        ...shorthands.borderRight('1px', 'solid', tokens.colorBrandBackgroundInverted),

        width: '8px',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        cursor: 'col-resize',
        resize: 'horizontal',

        ':hover': {
            borderRightWidth: '2px',
            borderRightColor: tokens.colorBrandBackgroundInvertedHover,
        },
    },

    resizerActive: {
        borderRightWidth: '2px',
        borderRightColor: tokens.colorBrandBackgroundInvertedPressed,
    },
});