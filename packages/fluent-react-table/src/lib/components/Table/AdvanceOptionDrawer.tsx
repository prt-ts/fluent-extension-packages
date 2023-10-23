/* eslint-disable  */
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps
} from '@fluentui/react-components/unstable';
import * as React from "react";

import {
    Button,
    makeStyles,
    shorthands,
    tokens,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    root: {
        ...shorthands.border("2px", "solid", "#ccc"),
        ...shorthands.overflow("hidden"),

        display: "flex",
        height: "480px",
        backgroundColor: "#fff",
    },

    content: {
        ...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
        ...shorthands.flex(1),

        gridRowGap: tokens.spacingVerticalXXL,
    },
});

type DrawerType = Required<DrawerProps>["type"];

export const AdvanceConfigSetting : React.FC<{open : boolean,  setOpen: React.Dispatch<React.SetStateAction<boolean>>}> = ({open, setOpen}) => {

    return (
        <>
            <Drawer
                type={"overlay"}
                separator
                position="end"
                size="medium"
                open={open}
                onOpenChange={(_, { open }) => setOpen(open)}
            >
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular />}
                                onClick={() => setOpen(false)}
                            />
                        }
                    >
                        Advance Grid Configuration
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <p>
                        this feature is not available yet. please check back later.
                    </p>
                </DrawerBody>
            </Drawer>
        </>
    );
};
