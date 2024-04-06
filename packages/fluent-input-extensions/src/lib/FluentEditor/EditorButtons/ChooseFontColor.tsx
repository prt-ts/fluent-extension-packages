import { Popover, PopoverTrigger, Button, PopoverSurface, Tooltip } from '@fluentui/react-components';
import { TextColorFilled } from '@fluentui/react-icons';
import React from 'react';
import { setTextColor } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { SwatchPicker, renderSwatchPickerGrid } from '@fluentui/react-swatch-picker-preview';

export interface InsertImageButtonProps {
    editor: IEditor;
    handleChange: () => void;
    fontColor: string;
}

const colors = [
    { color: "#000000", value: "#000000", "aria-label": "black" },
    { color: "#FF1921", value: "#FF1921", "aria-label": "red" },
    { color: "#FFC12E", value: "#FFC12E", "aria-label": "orange" },
    { color: "#FEFF37", value: "#FEFF37", "aria-label": "yellow" },
    { color: "#90D057", value: "#90D057", "aria-label": "light green" },
    { color: "#00B053", value: "#00B053", "aria-label": "green" },
    { color: "#00AFED", value: "#00AFED", "aria-label": "light blue" },
    { color: "#006EBD", value: "#006EBD", "aria-label": "blue" },
    { color: "#712F9E", value: "#712F9E", "aria-label": "purple" },
    { color: "#FFFFFF", value: "#FFFFFF", "aria-label": "white" },
];

export const ChooseFontColor: React.FC<InsertImageButtonProps> = ({ editor, handleChange, fontColor = "#000000" }) => {

    const styles = useIconStyles();
    return (
        <Popover trapFocus>
            <PopoverTrigger disableButtonEnhancement>
                <Tooltip content={<>Text Color</>} relationship='label'>
                    <Button
                        aria-label="Font Color"
                        icon={<TextColorFilled className={styles.icon} primaryFill={fontColor} />}
                        size="small"
                    />
                </Tooltip>
            </PopoverTrigger>

            <PopoverSurface>
                <SwatchPicker
                    layout="grid"
                    aria-label="Select Font Color"
                    selectedValue={fontColor}
                    onSelectionChange={(_, data) => {
                        console.log(data)
                        setTextColor(editor, data.selectedValue);
                        handleChange?.();
                    }}
                    size="small"
                >
                    {renderSwatchPickerGrid({
                        items: colors,
                        columnCount: 5,
                    })}
                </SwatchPicker>
            </PopoverSurface>
        </Popover>
    );

}