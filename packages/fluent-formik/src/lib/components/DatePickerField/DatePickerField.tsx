import * as React from 'react';
import {
  useId,
  LabelProps,
  FieldProps,
  Field,
} from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import type { InfoLabelProps } from '@fluentui/react-components/unstable';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { useField, ErrorMessage } from 'formik';
import { DismissFilled, DismissRegular, bundleIcon } from '@fluentui/react-icons';

type DatePickerFieldProps = DatePickerProps &
  FieldProps &
  InfoLabelProps & {
    name: string;
    label?: string;
  };

const ClearIcon = bundleIcon(DismissFilled, DismissRegular);

export const DatePickerField = React.forwardRef<
  HTMLInputElement,
  DatePickerFieldProps
>((props, ref) => {
  const inputId = useId('date');
  const { label, name, info, required, ...rest } = props;

  const { ...fieldPros }: FieldProps = rest;
  const { ...infoLabelProps }: InfoLabelProps = rest;
  const { ...datePickerProps }: DatePickerProps = rest;

  const [, { value, touched, error }, { setValue, setTouched }] =
    useField(name);

  const hasError = React.useMemo(() => touched && error, [touched, error]);

  const handleOnChange = React.useCallback(
    (date: Date | null | undefined) => {
      setValue(date, true);
      props.onSelectDate && props.onSelectDate(date);
    },
    [setValue]
  );

  const handleOnBlur = React.useCallback(() => {
    setTouched(true, true);
  }, [setTouched]);

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
              info={info}
              required={required}
            >
              <strong>{label}</strong>
            </InfoLabel>
          ),
        } as unknown as LabelProps
      }
      validationState={hasError ? 'error' : undefined}
      validationMessage={hasError ? <ErrorMessage name={name} /> : undefined}
    >
      <DatePicker
        {...datePickerProps}
        ref={ref}
        id={inputId}
        name={name}
        value={value || null}
        onSelectDate={(date: Date | null | undefined) => handleOnChange(date)}
        onBlur={handleOnBlur}
        contentAfter={ value ? <ClearIcon onClick={() => handleOnChange(null)} /> : props?.contentAfter}
      />
    </Field>
  );
});
