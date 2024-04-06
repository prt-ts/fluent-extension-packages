import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { TextCaseLowercaseFilled, TextCaseTitleFilled, TextCaseUppercaseFilled, TextEditStyleFilled, TextEffectsFilled } from '@fluentui/react-icons';
import React from 'react';
import { changeCapitalization } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';

export interface TextCapitalizationProps {
    editor: IEditor;
    handleChange: () => void;
}

export const TextCapitalization: React.FC<TextCapitalizationProps> = ({ editor, handleChange }) => {

    const styles = useIconStyles();
    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <Button
                    icon={{
                        children: (
                            <TextEditStyleFilled className={styles.icon} />
                        ),
                    }}
                    size="small"
                />
            </MenuTrigger>
            <MenuPopover className={styles.menuPopover}>
                <MenuList>
                    <MenuItem
                        aria-label="Text Format Capitalize Sentence"
                        icon={<TextCaseTitleFilled className={styles.icon} />}
                        onClick={() => {
                            changeCapitalization(editor, "sentence", "en-US");
                            handleChange?.();
                        }}
                    />
                    <MenuItem
                        aria-label="Text Format Upper Case"
                        icon={<TextCaseUppercaseFilled className={styles.icon} />}
                        onClick={() => {
                            changeCapitalization(editor, "upperCase", "en-US");
                            handleChange?.();
                        }}
                    />
                    <MenuItem
                        aria-label="Text Format Lower Case"
                        icon={<TextCaseLowercaseFilled className={styles.icon} />}
                        onClick={() => {
                            changeCapitalization(editor, "lowerCase", "en-US");
                            handleChange?.();
                        }}
                    />
                    <MenuItem
                        aria-label="Text Format Capitalize All Words"
                        icon={<TextEffectsFilled className={styles.icon} />}
                        onClick={() => {
                            changeCapitalization(editor, "capitalize", "en-US");
                            handleChange?.();
                        }}
                    />
                </MenuList>
            </MenuPopover>
        </Menu>
    );

}