/* eslint-disable */
import * as React from 'react';
import {
  useId,
  LabelProps,
  Field,
  Dropdown,
  Option,
  OptionProps,
  InfoLabel, InfoLabelProps
} from '@fluentui/react-components';
import { ErrorMessage } from 'formik';
import { useDropdownField } from './useDropdownField';
import { DropdownProps, FieldProps } from '@fluentui/react-components';
import { DropdownFieldProps, DropdownOption } from './Types';

export const DropdownField = React.forwardRef<
  HTMLButtonElement,
  DropdownFieldProps
>((props, ref): JSX.Element => {
  const dropdownId = useId('dropdown');

  const { label, name, options, ...rest } = props;

  // @ts-ignore: Type too Complex error code
  const { ...fieldProps }: FieldProps = rest;
  const { ...infoLabelProps }: InfoLabelProps = rest;
  const { ...dropdownProps }: DropdownProps = rest;

  const { hasError, value, selectedOptions, handleOnChange, handleOnBlur } =
    useDropdownField(props);

  return (
    <Field
      {...fieldProps}
      label={
        {
          children: (_: unknown, props: LabelProps) => (
            <InfoLabel {...props} {...infoLabelProps} htmlFor={dropdownId}>
              <strong>{label as JSX.Element}</strong>
            </InfoLabel>
          ),
        } as unknown as LabelProps
      }
      validationState={hasError ? 'error' : undefined}
      validationMessage={hasError ? <ErrorMessage name={name} /> : undefined}
    >
      <Dropdown
        {...dropdownProps}
        ref={ref}
        id={dropdownId}
        name={name}
        value={value}
        selectedOptions={selectedOptions}
        onOptionSelect={handleOnChange}
        onBlur={handleOnBlur}
      >
        {(options || []).map((option: DropdownOption, index: number) => (
          <Option
            key={`${dropdownId}-${option.value || ''}-${index}`}
            {...option}
          >
            {option?.label}
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
});
