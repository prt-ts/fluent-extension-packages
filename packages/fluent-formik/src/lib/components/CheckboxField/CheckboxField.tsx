import * as React from 'react';
import { Checkbox, CheckboxProps } from '@fluentui/react-components';
import { CheckboxFieldProps } from './Types';
import { ErrorMessage, useField } from 'formik';

export const CheckboxField = React.forwardRef<
  HTMLInputElement,
  CheckboxFieldProps
>((props, ref): JSX.Element => {
  const { name, ...checkboxProps } = props;

  const [, { value, error, touched }, { setValue }] = useField(name);
  const hasError = React.useMemo(() => touched && error, [touched, error]);

  return (
    <>
      <Checkbox
        {...checkboxProps}
        ref={ref}
        checked={value || false}
        onChange={(ev, data) => {
          setValue(data.checked, true);
          props.onChange?.(ev, data);
        }}
      />
      {hasError ? <ErrorMessage name={name} /> : undefined}
    </>
  );
});
