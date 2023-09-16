import { DropdownProps, FieldProps, OptionProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";

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