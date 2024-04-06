import { Dropdown, Option } from '@fluentui/react-components';
import React from 'react';
import { setFontSize } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { For } from '@prt-ts/react-control-flow';

export interface HeadingLevelProps {
    editor: IEditor;
    handleChange: () => void;
    fontSize: string;
}

const FontSizesOptions = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72];

export const SetFontSizeFormatter: React.FC<HeadingLevelProps> = ({ editor, fontSize = 14, handleChange }) => {

    const styles = useIconStyles();
    return (
        <Dropdown
            size="small"
            className={styles.dropdown}
            value={`${fontSize}`}
            selectedOptions={[`${fontSize}`]}
            onOptionSelect={(_, data) => {
                setFontSize(editor, `${data.optionValue}`);
                handleChange?.();
            }}
        >
            <For each={FontSizesOptions}>
                {
                    (fontSizeOption) => (<Option key={fontSizeOption} value={`${fontSizeOption}`} text={`${fontSizeOption}`}>{fontSizeOption}</Option>)
                }
            </For>
        </Dropdown>
    );

}