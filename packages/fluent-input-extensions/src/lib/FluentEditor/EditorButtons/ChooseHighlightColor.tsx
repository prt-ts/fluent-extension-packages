import { Popover, PopoverTrigger, Button, PopoverSurface } from '@fluentui/react-components';
import { ColorBackgroundFilled } from '@fluentui/react-icons';
import React from 'react';
import { setTextColor } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import { SwatchPicker, renderSwatchPickerGrid } from '@fluentui/react-swatch-picker-preview';

export interface InsertImageButtonProps {
    editor: IEditor;
    handleChange: () => void;
    fontColor: string;
    backgroundColor: string;
}

const highlightColors = [
    { color: "rgba(255, 255, 255)", value: "rgba(255, 255, 255, 0.5)", "aria-label": "white" },
    { color: "rgba(255, 25, 33)", value: "rgba(255, 25, 33, 0.5)", "aria-label": "red" },
    { color: "rgba(255, 193, 46)", value: "rgba(255, 193, 46, 0.5)", "aria-label": "orange" },
    { color: "rgba(254, 255, 55)", value: "rgba(254, 255, 55, 0.5)", "aria-label": "yellow" },
    { color: "rgba(144, 208, 87)", value: "rgba(144, 208, 87, 0.5)", "aria-label": "light green" },
    { color: "rgba(0, 176, 83)", value: "rgba(0, 176, 83, 0.5)", "aria-label": "green" },
    { color: "rgba(0, 175, 237)", value: "rgba(0, 175, 237, 0.5)", "aria-label": "light blue" },
    { color: "rgba(0, 110, 189)", value: "rgba(0, 110, 189, 0.5)", "aria-label": "blue" },
    { color: "rgba(113, 47, 158)", value: "rgba(113, 47, 158, 0.5)", "aria-label": "purple" },
    { color: "rgba(0, 0, 0)", value: "rgba(0, 0, 0, 0.5)", "aria-label": "black" },
];

export const ChooseHighlightColor: React.FC<InsertImageButtonProps> = ({ editor, handleChange, fontColor = "#000000", backgroundColor = "#FFFFFF" }) => {

    const styles = useIconStyles();
    return (
        <Popover trapFocus>
        <PopoverTrigger disableButtonEnhancement>
            <Button
               aria-label="Highlight Color"
               icon={<ColorBackgroundFilled className={styles.icon}/>}                           
               size="small"
               style={{ backgroundColor: backgroundColor, color: fontColor}}
            />
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
                    items: highlightColors,
                    columnCount: 5,
                })}
            </SwatchPicker>
        </PopoverSurface>
    </Popover>
    );

}