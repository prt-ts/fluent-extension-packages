/* eslint-disable */
import {
  useId,
  LabelProps,
  Field,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { ErrorMessage } from 'formik';
import { useDropdownStyles } from './useDropdownField.style';
import { useDropdownField } from './useDropdownField';
import { DropdownProps, FieldProps } from '@fluentui/react-components';
import { InfoLabelProps } from '@fluentui/react-components/dist/unstable';

export type DropdownFieldProps = DropdownProps &
  FieldProps &
  InfoLabelProps & {
    name: string; 
    options: DropdownOption[];
  };

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const DropdownField = (props: DropdownFieldProps) => {
  const dropdownId = useId('dropdown');

  const { label, name, required, options, ...rest } = props;

  const { ...fieldProps }: FieldProps = rest;
  const { ...infoLabelProps }: InfoLabelProps = rest;
  const { ...dropdownProps }: DropdownProps = rest;
  const styles = useDropdownStyles();
  const { hasError, value, selectedOptions, handleOnChange, handleOnBlur } =
    useDropdownField(props);



  return (
    <div className={styles.root}>
      <Field
        {...fieldProps}
        label={
          {
            children: (_: unknown, props: LabelProps) => (
              <InfoLabel {...props} {...infoLabelProps} htmlFor={dropdownId} required={required}>
                <strong>{label}</strong>
              </InfoLabel>
            ),
          } as any
        }
        validationState={hasError ? 'error' : undefined}
        validationMessage={hasError ? <ErrorMessage name={name} /> : undefined}
        required={required}
      >
        <Dropdown
          {...dropdownProps}
          id={dropdownId}
          name={name}
          value={value}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOnChange}
          onBlur={handleOnBlur}
        >
          {options.map((option: DropdownOption) => (
            <Option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </Option>
          ))}
        </Dropdown>
      </Field>
    </div>
  );
};
