import { FieldProps, RadioGroupProps, RadioProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";

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
