import { Button, Dropdown, Option } from '@fluentui/react-components';
import React from 'react';
import { changeFontSize, setFontSize } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { For } from '@prt-ts/react-control-flow';
import { TextFontRegular, TextFontSizeFilled } from '@fluentui/react-icons';

export interface HeadingLevelProps {
    editor: IEditor;
    handleChange: () => void;
    fontSize: string;
}

const FontSizesOptions = ["8pt", "9pt", "10pt", "11pt", "12pt", "14pt", "16pt", "18pt", "20pt", "24pt"];

export const SetFontSizeFormatter: React.FC<HeadingLevelProps> = ({ editor, fontSize = "14pt", handleChange }) => {
    const styles = useIconStyles();
    const [selectedFontSize, setSelectedFontSize] = React.useState<string[]>([fontSize]);

    React.useEffect(() => {
        if (fontSize) {
            setSelectedFontSize([fontSize]);
        }
    }, [fontSize]);

    const selectedValue = selectedFontSize?.[0] || "12pt";

    return (
        <>
            <Dropdown
                size="small"
                className={styles.dropdown}
                value={selectedValue}
                selectedOptions={selectedFontSize}
                onOptionSelect={(_, data) => {
                    setSelectedFontSize([`${data.optionValue}`]);
                    setFontSize(editor, `${data.optionValue}`);
                    // handleChange?.();
                }}
                listbox={{
                    style: {
                        maxHeight: "200px", 
                        overflowY: "auto",
                    },

                }}
            >
                <For each={FontSizesOptions}>
                    {
                        (fontSizeOption) => (<Option key={fontSizeOption} value={`${fontSizeOption}`} text={`${fontSizeOption}`}>{fontSizeOption}</Option>)
                    }
                </For>
            </Dropdown>
            <Button
                aria-label="increase font size"
                icon={<TextFontSizeFilled className={styles.icon} />}
                onClick={() => {
                    changeFontSize(editor, "increase");
                    // handleChange?.();
                }}
                size="small"
            />

            <Button
                aria-label="decrease font size"
                icon={<TextFontRegular className={styles.icon} />}
                onClick={() => {
                    changeFontSize(editor, "decrease");
                    // handleChange?.();
                }}
                size="small"
            />
        </>
    );

}