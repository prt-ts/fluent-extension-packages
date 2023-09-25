/* eslint-disable  */
import * as React from 'react';
import {
  makeStyles,
  useId,
  LabelProps,
  FieldProps,
  Field,
  Textarea,
  TextareaProps,
} from '@fluentui/react-components';
import type { InfoLabelProps } from '@fluentui/react-components/unstable';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { useField, ErrorMessage } from 'formik';
import { TextareaFieldProps } from './Types';

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>((props, ref) => {
  const inputId = useId('textarea');

  const { label, name, required, ...rest } = props;

  // @ts-ignore: Type too Complex error code
  const { ...fieldPros }: FieldProps = rest;
  const { ...infoLabelProps }: InfoLabelProps = rest;
  const { ...textareaProps }: TextareaProps = rest;

  const [, { value, error, touched }, { setValue, setTouched }] = useField(name);
  const hasError = React.useMemo(() => touched && error, [touched, error]);

  const handleOnChange: TextareaProps['onChange'] = (ev, data) => {
    setValue(data.value);
    props.onChange?.(ev, data);
  };

  const handleOnBlur: TextareaProps['onBlur'] = (ev) => {
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
              required={required}
            >
              <strong>{label}</strong>
            </InfoLabel>
          ),
        } as LabelProps
      }
      validationState={hasError ? 'error' : undefined}
      validationMessage={hasError ? <ErrorMessage name={name} /> : undefined}
    >
      <Textarea
        {...textareaProps}
        ref={ref}
        id={inputId}
        name={name}
        value={value || ''}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </Field>
  );
});
