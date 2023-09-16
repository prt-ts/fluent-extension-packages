import * as React from 'react';
import {
    useId, 
    LabelProps,
    FieldProps,
    Field,
    SliderProps,
    Slider,
} from '@fluentui/react-components';
import type { InfoLabelProps } from '@fluentui/react-components/unstable';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { useField, ErrorMessage } from 'formik';
import { SliderInputFieldProps } from './Types';

export const SliderField : React.FC<SliderInputFieldProps> = (props) => {
    const inputId = useId('input');

    const { name, label, ...rest } = props;

    const { ...fieldPros }: FieldProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;
    const { ...sliderProps }: SliderProps = rest;

    const [, { value, touched, error }, { setValue, setTouched }] = useField(name);
    const hasError = React.useMemo(
        () => touched && error,
        [touched, error],
    );

    const handleOnChange: SliderProps["onChange"] = (ev, data) => {
        setValue(data.value);
        props.onChange?.(ev, data);
    };

    const handleOnBlur: SliderProps['onBlur'] = (ev) => {
        setTouched(true, true);

        props.onBlur?.(ev);
    };

    return (
        <Field
            {...fieldPros}
            label={
                {
                    children: (_: unknown, props: LabelProps) => (
                        <InfoLabel
                            {...props}
                            {...infoLabelProps}
                            htmlFor={inputId}
                            label={undefined}
                        >
                            <strong>{label as JSX.Element}</strong>
                        </InfoLabel>
                    ),
                } as unknown as LabelProps
            }
            validationState={hasError ? 'error' : undefined}
            validationMessage={
                hasError ? <ErrorMessage name={name} /> : undefined
            }
        >
            <Slider
                {...sliderProps}
                name={name}
                value={value ?? null}
                onChange={handleOnChange}
                id={inputId}
                onBlur={handleOnBlur}
                required={false} // this is important because we are using the required prop on the Field component and validation is handled by Formik and Yup
            />
        </Field>
    );
};
