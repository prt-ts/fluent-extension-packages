import { FieldProps, InfoLabelProps } from "@fluentui/react-components";


export type CommonFieldProps = Pick<FieldProps, 'required' | 'hint' | 'orientation'>;
export type CommonInfoLabelProps = Pick<InfoLabelProps, 'label' | 'required' | "info">;

export type CommonFieldInfoLabelProps = CommonFieldProps & CommonInfoLabelProps & {
    fieldProps?: FieldProps;
    infoLabelProps?: InfoLabelProps;
};