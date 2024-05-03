import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useFormStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    ...shorthands.padding(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalXL,
      tokens.spacingVerticalXL
    ),
  },

  row: {
    marginTop: tokens.spacingHorizontalM,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    ...shorthands.gap(tokens.spacingHorizontalXXL, tokens.spacingVerticalS),
  },

  column: {
    display: 'flex',
    flexBasis: '100%',
    flexDirection: 'column',
    ...shorthands.flex(1),
  },

  formTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
    width: '100%',
    // borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    boxSizing: 'border-box',
    ...shorthands.margin(tokens.spacingVerticalM, 0, 0),
    ...shorthands.padding(tokens.spacingVerticalS, 0),
    ...shorthands.borderBottom(
      tokens.strokeWidthThick,
      'solid',
      tokens.colorNeutralStroke1
    ),
  },

  formSectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    width: '100%',
    boxSizing: 'border-box',
    ...shorthands.margin(tokens.spacingVerticalXL, 0, 0),
    ...shorthands.padding(
      0,
      tokens.spacingHorizontalXS,
      tokens.spacingVerticalXXS
    ),
    ...shorthands.borderBottom(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralStroke1
    ),
  },

  label: {
    fontWeight: tokens.fontWeightSemibold,
  },

  actionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    alignItems: 'start',
    boxSizing: 'border-box',
    marginTop: tokens.spacingHorizontalM,
    ...shorthands.gap(tokens.spacingHorizontalM, tokens.spacingVerticalM),
  },
});
