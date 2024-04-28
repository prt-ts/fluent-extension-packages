import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useFormStyles = makeStyles({
  row: {
    marginTop: tokens.spacingHorizontalM,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    ...shorthands.gap(tokens.spacingHorizontalXL, tokens.spacingVerticalS),
  },

  column: {
    display: 'flex',
    flexBasis: '100%',
    flexDirection: 'column',
    ...shorthands.flex(1),
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
