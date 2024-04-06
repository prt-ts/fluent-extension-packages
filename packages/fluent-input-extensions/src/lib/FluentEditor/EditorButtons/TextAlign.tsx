import { Button, Menu, MenuItemRadio, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { TextAlignCenterRegular, TextAlignJustifyRegular, TextAlignLeftRegular, TextAlignRightRegular } from '@fluentui/react-icons';
import React from 'react';
import { setAlignment } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { Case, Switch } from '@prt-ts/react-control-flow';

export type TextAlignProps = {
    editor: IEditor;
    handleChange: () => void;
    textAlign: "left" | "center" | "right" | "justify";
}

export const TextAlign: React.FC<TextAlignProps> = ({ editor, handleChange, textAlign }) => {

    const styles = useIconStyles();
    return (
        <Menu
        checkedValues={{
            alignment: [textAlign || "left"]
        }}
        onCheckedValueChange={(_, data) => {
            const alignmentText = data.checkedItems?.[0] as TextAlignProps["textAlign"];
            setAlignment(editor, alignmentText);
        }}>
        <MenuTrigger disableButtonEnhancement>
            <Button icon={{
                children: (
                    <Switch when={textAlign} >
                        <Case value={["left", "start"]}>
                            <TextAlignLeftRegular className={styles.icon} />
                        </Case>
                        <Case value={"center"}>
                            <TextAlignCenterRegular className={styles.icon} />
                        </Case>
                        <Case value={"end"}>
                            <TextAlignRightRegular className={styles.icon} />
                        </Case>
                        <Case value={"justify"}>
                            <TextAlignJustifyRegular className={styles.icon} />
                        </Case>
                    </Switch>
                ),
            }}
                size="small"
            />
        </MenuTrigger>
        <MenuPopover className={styles.menuPopover}>
            <MenuList>
                <MenuItemRadio
                    aria-label="Justify Content"
                    icon={<TextAlignJustifyRegular className={styles.icon} />}
                    name={"alignment"}
                    value={"justify"}
                />
                <MenuItemRadio
                    icon={<TextAlignLeftRegular className={styles.icon} />}
                    name={"alignment"}
                    value={"left"}
                />
                <MenuItemRadio
                    icon={<TextAlignCenterRegular className={styles.icon} />}
                    name={"alignment"}
                    value={"center"}
                />
                <MenuItemRadio
                    icon={<TextAlignRightRegular className={styles.icon} />}
                    name={"alignment"}
                    value={"right"}
                />
            </MenuList>
        </MenuPopover>
    </Menu>
    );

}