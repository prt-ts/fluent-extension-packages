import { SliderProps, FieldProps, InfoLabelProps } from "@fluentui/react-components";

export type SliderInputFieldProps = SliderProps & FieldProps & InfoLabelProps & {
    name: string;
};
