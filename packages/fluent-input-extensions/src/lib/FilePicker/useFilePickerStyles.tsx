import { makeStyles, shorthands, tokens } from "@fluentui/react-components";


export const useFilePickerStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: 'flex',
        flexDirection: 'column',
        // Use 2px gap below the label (per the design system)
        rowGap: '2px',
    },
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'left',
        ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeAccessible),
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground3,
        cursor: 'pointer',

        ":focus": {
            ...shorthands.outline(0, 'solid', "transparent"),
        },
    },
    focusedStyle: {        
        ...shorthands.borderBottom(tokens.strokeWidthThick, 'solid', tokens.colorCompoundBrandStrokePressed),
    
        ":after": {
            content: "''",
            ...shorthands.borderBottom(tokens.strokeWidthThin, "solid", tokens.colorCompoundBrandStrokePressed),
            transform: "scaleX(1)",
            transitionProperty: "transform",
            transitionDuration: tokens.durationNormal,
            transitionDelay: tokens.curveDecelerateMid,
        },
    },
    acceptStyle: {
        ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorPaletteGreenBorder2),
    },
    rejectStyle: {
        ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorPaletteRedBorder2),
    },

    small: {
        minHeight: '18px',
    },
    medium: {
        minHeight: '24px',
    },
    large: {
        minHeight: '32px',
    },
});