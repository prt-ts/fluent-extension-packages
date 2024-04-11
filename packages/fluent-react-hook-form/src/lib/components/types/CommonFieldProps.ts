import { FieldProps, InfoLabelProps } from "@fluentui/react-components";


export type CommonFieldProps = Omit<Pick<FieldProps, 'required' | 'hint' | 'orientation'>, "children">;
export type CommonInfoLabelProps = Pick<InfoLabelProps, 'label' | 'required' | "info">;

export type CommonFieldInfoLabelProps = CommonFieldProps & CommonInfoLabelProps & {
    fieldProps?: FieldProps;
    infoLabelProps?: InfoLabelProps;
};