import { FieldProps, SpinButtonProps, InfoLabelProps } from "@fluentui/react-components";

export type SpinButtonFieldProps = SpinButtonProps &
    FieldProps &
    InfoLabelProps & {
        name: string;
        label: string;
    };
