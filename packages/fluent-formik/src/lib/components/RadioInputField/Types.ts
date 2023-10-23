import { FieldProps, RadioGroupProps, RadioProps,  InfoLabelProps } from "@fluentui/react-components";

export type RadioOption = RadioProps & {
  meta?: Record<string, unknown>;
};

export type InputFieldProps = RadioGroupProps &
  FieldProps &
  InfoLabelProps & {
    name: string;
    label?: string;
    options?: RadioOption[];
  };
