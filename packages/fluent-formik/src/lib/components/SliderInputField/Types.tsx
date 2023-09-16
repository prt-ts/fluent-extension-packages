import { SliderProps, FieldProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";

export type SliderInputFieldProps = SliderProps & FieldProps & InfoLabelProps & {
    name: string;
};