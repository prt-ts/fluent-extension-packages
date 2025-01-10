import * as React from 'react';
import {
  useId,
  LabelProps,
  FieldProps,
  Field,
  SpinButtonProps,
  SpinButton,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';
import { SpinButtonFieldProps } from './Types';
import { useField, ErrorMessage } from 'formik';

export const SpinButtonField = React.forwardRef<
  HTMLInputElement,
  SpinButtonFieldProps
>((props, ref): JSX.Element => {
  const inputId = useId('input');
  const { label, name, ...rest } = props;

  const { ...fieldPros }: FieldProps = rest;
  const { ...infoLabelProps }: InfoLabelProps = rest;
  const { ...spinButtonProps }: SpinButtonProps = rest;

  const [, { value, error, touched }, { setValue, setTouched }] =
    useField(name);
  const hasError = React.useMemo(() => touched && error, [touched, error]);

  return (
    <Field
      {...fieldPros}
      label={
        {
          children: (_: unknown, props: LabelProps) => (
            <InfoLabel
              weight="semibold"
              {...props}
              {...infoLabelProps}
              htmlFor={inputId}
            >
              <strong>{label}</strong>
            </InfoLabel>
          ),
        } as unknown as LabelProps
      }
      validationState={hasError ? 'error' : undefined}
      validationMessage={hasError ? <ErrorMessage name={name} /> : undefined}
    >
      <SpinButton
        {...spinButtonProps}
        ref={ref}
        type="number"
        id={inputId}
        name={name}
        value={value ?? ''}
        onChange={(ev, data) => {
          setValue(data.value);
          props.onChange?.(ev, data);
        }}
        onBlur={() => setTouched(true, true)}
        // this is important because we are using the
        // required prop on the Field component and validation
        // is handled by Formik and Yup
        required={false}
      />
    </Field>
  );
});
