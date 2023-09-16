import { CheckboxProps, FieldProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/dist/unstable";

export type CheckboxOption = CheckboxProps & {
    meta?: any; 
};

export type CheckboxInputFieldProps =  FieldProps & InfoLabelProps & {
    name: string;
    label?: string;
    options?: CheckboxOption[];
    enableSelectAll?: boolean;
    labelPosition?: "before" | "after";
    layout ?: "horizontal" | "vertical";
};