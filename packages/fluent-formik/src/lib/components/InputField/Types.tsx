import { FieldProps, InputProps, InfoLabelProps } from "@fluentui/react-components";

export type InputFieldProps = InputProps &
    FieldProps &
    InfoLabelProps & {
        name: string;
    };
