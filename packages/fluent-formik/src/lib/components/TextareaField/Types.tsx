import { FieldProps, TextareaProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";

export type TextareaFieldProps = TextareaProps &
FieldProps &
InfoLabelProps & {
   name: string;
   label?: string;
};