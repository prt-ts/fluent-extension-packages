import * as React from 'react';
import { Switch } from '@fluentui/react-components';
import { SwitchFieldProps } from './Types';
import { ErrorMessage, useField } from 'formik';

export const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(
  (props, ref): JSX.Element => {
    const { name, ...switchProps } = props;

    const [, { value, error, touched }, { setValue }] = useField(name);
    const hasError = React.useMemo(() => touched && error, [touched, error]);

    return (
      <>
        <Switch
          {...switchProps}
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
  }
);
