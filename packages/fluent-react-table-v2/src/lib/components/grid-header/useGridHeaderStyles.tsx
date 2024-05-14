import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useGridHeaderStyles = makeStyles({
  tableTopHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: tokens.colorNeutralStroke2,
    boxShadow: tokens.shadow2,
    ...shorthands.padding('5px'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
  },

  tableTopHeaderLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  tableTopHeaderRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    ...shorthands.gap('3px'),
    flexWrap: 'wrap',
  },

  tableTopHeaderColumnTogglePopover: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  popoverSurface: {
    minWidth: '300px',
  },
});
