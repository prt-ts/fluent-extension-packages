import { makeStaticStyles, makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const useStaticStyles = makeStaticStyles({
  "*": {
    boxSizing: "border-box",
  }, 
});

export const useTableStaticStyles = makeStyles({

  tableContainer: {
    // height: "650px",
    width: "100%",
    ...shorthands.overflow("hidden", "auto"),
    /* width */

    ":hover": {
      ...shorthands.overflow("auto", "auto"),
    },

    "::-webkit-scrollbar": {
      width: "6px",
      height: "4px",
      ...shorthands.borderRadius("50%"),
    },

    /* Track */
    "::-webkit-scrollbar-track": {
      "background-color": "#f1f1f1",
    },

    /* Handle */
    "::-webkit-scrollbar-thumb": {
      "background-color": "#888",
    },

    /* Handle on hover */
    "::-webkit-scrollbar-thumb:hover": {
      "background-color": "#555",
    },
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  
  tFoot: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    position: "sticky",
    bottom: 0,
    left: 0,
    width: "100%",
  }, 
 
});
