/* eslint-disable */
import {
  useId,
  LabelProps,
  Field,
  Dropdown,
  Option,
  OptionProps,
} from '@fluentui/react-components';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { ErrorMessage } from 'formik';
import { useDropdownField } from './useDropdownField';
import { DropdownProps, FieldProps } from '@fluentui/react-components';
import { InfoLabelProps } from '@fluentui/react-components/dist/unstable';
import { DropdownFieldProps, DropdownOption } from './Types';

export const DropdownField: React.FC<DropdownFieldProps> = (props) : JSX.Element => {
  const dropdownId = useId('dropdown');

  const { label, name, options, ...rest } = props;

  const { ...fieldProps  }: any = rest;
  const { ...infoLabelProps }: any = rest;
  const { ...dropdownProps }: any = rest; 

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
          id={dropdownId}
          name={name}
          value={value}
          selectedOptions={selectedOptions}
          onOptionSelect={handleOnChange}
          onBlur={handleOnBlur} 
        >
        {(options || []).map((option: DropdownOption, index: number) => (
          <Option
            key={`${dropdownId}-${option.value || ""}-${index}`}
            {...option}
          >
            {option?.label}
          </Option>
          ))}
        </Dropdown>
      </Field> 
  );
};
