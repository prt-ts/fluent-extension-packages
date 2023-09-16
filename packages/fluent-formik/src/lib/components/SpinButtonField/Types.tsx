import { FieldProps, SpinButtonProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";

export type SpinButtonFieldProps = SpinButtonProps &
    FieldProps &
    InfoLabelProps & {
        name: string;
        label: string;
    };