import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverSurface,
  Tooltip,
} from '@fluentui/react-components';
import { TextColorFilled } from '@fluentui/react-icons';
import React from 'react';
import { setTextColor } from 'roosterjs-content-model-api';
import { useIconStyles } from './useIconStyles';
import { IEditor } from 'roosterjs-content-model-types';
import {
  SwatchPicker,
  renderSwatchPickerGrid,
} from '@fluentui/react-swatch-picker-preview';

export interface InsertImageButtonProps {
  editor: IEditor;
  handleChange: () => void;
  fontColor: string;
}

const uniqueColors = [
  { color: '#000000', value: '#000000', 'aria-label': 'black' },
  { color: '#FF1921', value: '#FF1921', 'aria-label': 'red' },
  { color: '#FFC12E', value: '#FFC12E', 'aria-label': 'orange' },
  { color: '#FEFF37', value: '#FEFF37', 'aria-label': 'yellow' },
  { color: '#90D057', value: '#90D057', 'aria-label': 'light green' },
  { color: '#00B053', value: '#00B053', 'aria-label': 'green' },
  { color: '#00AFED', value: '#00AFED', 'aria-label': 'light blue' },
  { color: '#006EBD', value: '#006EBD', 'aria-label': 'blue' },
  { color: '#712F9E', value: '#712F9E', 'aria-label': 'purple' },
  { color: '#FF00FF', value: '#FF00FF', 'aria-label': 'magenta' },
  { color: '#00FFFF', value: '#00FFFF', 'aria-label': 'cyan' },
  { color: '#FFC0CB', value: '#FFC0CB', 'aria-label': 'pink' },
  { color: '#00FF00', value: '#00FF00', 'aria-label': 'lime' },
  { color: '#800000', value: '#800000', 'aria-label': 'maroon' },
  { color: '#FF5733', value: '#FF5733', 'aria-label': 'coral' },
  { color: '#FFC300', value: '#FFC300', 'aria-label': 'goldenrod' },
  { color: '#FFD700', value: '#FFD700', 'aria-label': 'gold' },
  { color: '#7FFF00', value: '#7FFF00', 'aria-label': 'chartreuse' },
  { color: '#00FF7F', value: '#00FF7F', 'aria-label': 'spring green' },
  { color: '#00CED1', value: '#00CED1', 'aria-label': 'dark turquoise' },
  { color: '#1E90FF', value: '#1E90FF', 'aria-label': 'dodger blue' },
  { color: '#8A2BE2', value: '#8A2BE2', 'aria-label': 'blue violet' },
  { color: '#FF1493', value: '#FF1493', 'aria-label': 'deep pink' },
  { color: '#FF4500', value: '#FF4500', 'aria-label': 'orange red' },
  { color: '#FF8C00', value: '#FF8C00', 'aria-label': 'dark orange' },
  { color: '#ADFF2F', value: '#ADFF2F', 'aria-label': 'green yellow' },
  { color: '#00FA9A', value: '#00FA9A', 'aria-label': 'medium spring green' },
  { color: '#00BFFF', value: '#00BFFF', 'aria-label': 'deep sky blue' },
  { color: '#9932CC', value: '#9932CC', 'aria-label': 'dark orchid' },
  { color: '#FF69B4', value: '#FF69B4', 'aria-label': 'hot pink' },
  { color: '#FFA500', value: '#FFA500', 'aria-label': 'orange' },
  { color: '#FFFFFF', value: '#FFFFFF', 'aria-label': 'white' },
].filter(
  (color, index, self) =>
    index ===
    self.findIndex(
      (c) =>
        c.color === color.color &&
        c.value === color.value &&
        c['aria-label'] === color['aria-label']
    )
);

export const ChooseFontColor: React.FC<InsertImageButtonProps> = ({
  editor,
  handleChange,
  fontColor = '#000000',
}) => {
  const styles = useIconStyles();
  return (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Tooltip content={<>Text Color</>} relationship="label">
          <Button
            appearance="subtle"
            aria-label="Font Color"
            icon={
              <TextColorFilled
                className={styles.icon}
                primaryFill={fontColor}
              />
            }
            size="small"
          />
        </Tooltip>
      </PopoverTrigger>

      <PopoverSurface>
        <SwatchPicker
          layout="grid"
          shape="circular"
          aria-label="Select Font Color"
          selectedValue={fontColor}
          onSelectionChange={(_, data) => {
            console.log(data);
            setTextColor(editor, data.selectedValue);
            handleChange?.();
          }}
          size="extra-small"
        >
          {renderSwatchPickerGrid({
            items: uniqueColors,
            columnCount: 8,
          })}
        </SwatchPicker>
      </PopoverSurface>
    </Popover>
  );
};
