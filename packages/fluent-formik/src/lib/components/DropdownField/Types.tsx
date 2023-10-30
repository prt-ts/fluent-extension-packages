import { DropdownProps, FieldProps, OptionProps, InfoLabelProps } from "@fluentui/react-components";

export type DropdownFieldProps = FieldProps &
  InfoLabelProps
  & DropdownProps
  & {
    name: string;
    label?: string;
    options: DropdownOption[];
  };

export type DropdownOption = OptionProps & {
  label: string;
  value: string;
  text?: string;
  meta?: unknown;
};
