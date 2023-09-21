import { makeStyles, shorthands, tokens } from "@fluentui/react-components";


export const useRichTextEditorStyles = makeStyles({
  error: {
    ...shorthands.border(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorPaletteRedBorder2
    ),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    '& .ql-toolbar': {
      ...shorthands.border('none') ,
      ...shorthands.padding(tokens.spacingVerticalXXS),
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },

    '& .ql-container': {
      ...shorthands.border('none'),
      minHeight: '9rem',

      '& .ql-editor': {
        ...shorthands.padding(
          tokens.spacingVerticalMNudge,
          tokens.spacingHorizontalSNudge
        ),
        boxShadow: tokens.shadow2,
        minHeight: '9rem',
        height: 'auto',

        '::before': {
          ...shorthands.padding(tokens.spacingVerticalXXS),

          fontStyle: 'normal',
          opacity: 1,
          color: tokens.colorNeutralForeground4,
          lineHeight: tokens.lineHeightBase200,
          fontWeight: tokens.fontWeightRegular,
          fontFamily: 'inherit',
          fontSize: tokens.fontSizeBase200,

          left: tokens.spacingHorizontalXS,
          right: tokens.spacingHorizontalXS,
        },
      },
    },

    // reset the border when focus
    ':has(.ql-toolbar):focus-within': {
      ...shorthands.borderTop(
        tokens.strokeWidthThin,
        'solid',
        tokens.colorNeutralStroke1
      ),
      ...shorthands.borderRight(
        tokens.strokeWidthThin,
        'solid',
        tokens.colorNeutralStroke1
      ),
      ...shorthands.borderLeft(
        tokens.strokeWidthThin,
        'solid',
        tokens.colorNeutralStroke1
      ),
      ...shorthands.borderBottom(
        tokens.strokeWidthThick,
        'solid',
        tokens.colorBrandStroke1
      ),
    },
  },
  regular: {
    ...shorthands.borderTop(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStroke1
    ),
    ...shorthands.borderRight(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStroke1
    ),
    ...shorthands.borderLeft(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStroke1
    ),
    ...shorthands.borderBottom(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStrokeAccessible
    ),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    '& .ql-toolbar': {
      ...shorthands.border('none'),
      ...shorthands.padding(tokens.spacingVerticalXXS),
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },

    '& .ql-container': {
      ...shorthands.border('none'),
      minHeight: '9rem',

      '& .ql-editor': {
        ...shorthands.padding(
          tokens.spacingVerticalMNudge,
          tokens.spacingHorizontalSNudge
        ),
        boxShadow: tokens.shadow2,
        minHeight: '9rem',
        height: 'auto',

        '::before': {
          ...shorthands.padding(tokens.spacingVerticalXXS),

          fontStyle: 'normal',
          opacity: 1,
          color: tokens.colorNeutralForeground4,
          lineHeight: tokens.lineHeightBase200,
          fontWeight: tokens.fontWeightRegular,
          fontFamily: 'inherit',
          fontSize: tokens.fontSizeBase200,

          left: tokens.spacingHorizontalXS,
          right: tokens.spacingHorizontalXS,
        },
      },
    },

    // border on focus
    ':has(.ql-toolbar):focus-within': {
      ...shorthands.borderBottom(
        tokens.strokeWidthThick,
        'solid',
        tokens.colorBrandStroke1
      ),
    },
  },
});
