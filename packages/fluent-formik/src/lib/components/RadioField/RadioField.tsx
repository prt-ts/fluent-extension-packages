import * as React from "react";
import { LabelProps, Radio, RadioProps, useId } from "@fluentui/react-components";
import { RadioFieldProps } from './Types';
import { ErrorMessage, useField } from "formik";
import { InfoLabel, InfoLabelProps } from "@fluentui/react-components/unstable";

export const RadioField: React.FC<RadioFieldProps> = (props): JSX.Element => {

    const labelId = useId("radio-input-standalone");
    const { name, ...rest } = props;

    const [, { value, error, touched }, { setValue }] = useField(name);
    const hasError = React.useMemo(() => touched && error, [touched, error]);

    const { ...radioProps }: RadioProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;


    return (
        <>
            <Radio
                {...radioProps}
                id={labelId}
                label={{
                    children: (_: unknown, props: LabelProps) => (<InfoLabel htmlFor={labelId} {...infoLabelProps} {...props}></InfoLabel>),
                } as unknown as LabelProps}
                checked={(value == radioProps.value) || false}
                onChange={(ev, data) => setValue(data.value, true)}
            />
            {hasError ? <ErrorMessage name={name} /> : undefined}
        </>
    );
};
