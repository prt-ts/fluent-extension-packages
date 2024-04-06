import { Dropdown, Option } from '@fluentui/react-components';
import React from 'react';
import { setHeadingLevel } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { For } from '@prt-ts/react-control-flow';

export interface HeadingLevelProps {
    editor: IEditor;
    handleChange: () => void;
    headingLevel: 0 | 1 | 2 | 3 | 4 | 5;
}

const headingLevelOptions = {
    "0": "Paragraph",
    "1": "Heading 1",
    "2": "Heading 2",
    "3": "Heading 3",
    "4": "Heading 4",
    "5": "Heading 5",
};

export const HeadingLevel: React.FC<HeadingLevelProps> = ({ editor, headingLevel = "0", handleChange }) => {

    const styles = useIconStyles();
    return (
        <Dropdown
            size="small"
            className={styles.dropdown}
            value={headingLevelOptions[(headingLevel) as HeadingLevelProps["headingLevel"]]}
            selectedOptions={[headingLevel?.toString()]}
            onOptionSelect={(_, data) => {
                setHeadingLevel(editor, parseInt(data.optionValue ?? "0") as HeadingLevelProps["headingLevel"]);
                handleChange?.();
            }}
        >
            <For each={Object.keys(headingLevelOptions) as unknown as HeadingLevelProps["headingLevel"][]}>
                {
                    (key: HeadingLevelProps["headingLevel"]) => (<Option key={key} value={`${key}`}>{headingLevelOptions?.[key] ?? ""}</Option>)
                }
            </For>
        </Dropdown>
    );

}