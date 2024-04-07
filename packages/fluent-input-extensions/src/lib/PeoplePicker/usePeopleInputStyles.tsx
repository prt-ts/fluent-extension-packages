import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const usePeopleInputStyles = makeStyles({
  list: {
    display: "flex",
    flexWrap: "wrap",
    ...shorthands.gap(
      tokens.spacingHorizontalSNudge,
      tokens.spacingHorizontalSNudge
    ),
  },
  normal: {},
  compact: {},
  horizontal: {},
  vertical: {
    flexDirection: "column",
  },

  optionList: { 
    maxHeight: "300px",
    ...shorthands.overflow("auto"),
  },
});
