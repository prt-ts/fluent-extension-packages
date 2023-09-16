import { FieldProps, InputProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";

export type InputFieldProps = InputProps &
    FieldProps &
    InfoLabelProps & {
        name: string;
    };