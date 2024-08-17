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
  small: '9pt',
  medium: '12pt',
  large: '15pt',
};
