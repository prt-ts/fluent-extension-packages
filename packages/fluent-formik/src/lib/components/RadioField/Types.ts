import { RadioProps } from "@fluentui/react-components";
import { InfoLabelProps } from "@fluentui/react-components/unstable";


export type RadioFieldProps =  RadioProps & InfoLabelProps & {
    name: string;
};