import { FieldControlProps, TextareaProps } from '@fluentui/react-components';

export type FluentEditorProps = {
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
  onBlur?: (e: unknown) => void;
  focusOnInit?: boolean;
  ribbonPosition?: 'top' | 'bottom';
  showRibbon?: boolean;
  size?: 'small' | 'medium' | 'large';
} & Omit<TextareaProps, 'onChange' | 'onBlur' | 'value'> &
  FieldControlProps;

export const FontSizeOption = {
  small: '8pt',
  medium: '9pt',
  large: '10pt',
};
