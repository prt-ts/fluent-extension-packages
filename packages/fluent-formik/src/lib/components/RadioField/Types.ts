import { RadioProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components";


export type RadioFieldProps =  RadioProps & InfoLabelProps & {
    name: string;
};
