import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useLayoutStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: tokens.colorNeutralBackground5Selected,
  },

  navBarContainer: {
    ...shorthands.flex(0, 0, "auto"),
    height: "45px",
    backgroundColor: tokens.colorBrandBackground,
  },

  mainContainer: {
    ...shorthands.flex(1),
    display: "flex",
    // backgroundColor: tokens.colorNeutralBackground5Selected,
  },

  sideNavContainer: {
    ...shorthands.flex(0, 0, "auto"),

    "@media (500px <= width <= 1000px)": {
      display: "flex-item",
    },

    "@media (width < 500px)": {
      display: "none",
    },
  },

  contentContainer: {
    ...shorthands.flex(1, 1, "auto"),
    maxHeight: "calc(100vh - 90px)",
    overflowY: "auto",
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
  },

  footerContainer: {
    ...shorthands.flex(0, 0, "auto"),
    height: "45px",
    width: "100%",
    backgroundColor: tokens.colorNeutralStroke1,
  },
});
