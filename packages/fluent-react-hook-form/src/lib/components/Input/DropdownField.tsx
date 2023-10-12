import { Field, FieldProps, Dropdown, DropdownProps, Option, LabelProps, OptionProps, useId } from "@fluentui/react-components";
import { InfoLabel, InfoLabelProps } from "@fluentui/react-components/unstable";
import { forwardRef } from "react";
import { useFormContext } from "../Form";
import { Controller, ControllerProps } from "react-hook-form";

export type DropdownChoiceOption = {
    label: string;
    value: string;

    optionProps?: Partial<OptionProps> | undefined;
}

type OptionOnly = Omit<DropdownChoiceOption, 'optionProps'>;

export type DropdownFieldProps = FieldProps &
  DropdownProps &
  InfoLabelProps & {
    name: string;
    options: DropdownChoiceOption[];
    rules?: ControllerProps['rules'];
  };

export const DropdownField = forwardRef<HTMLButtonElement, DropdownFieldProps>(({ name, options, rules, required, ...rest }, dropdownRef) => {

    const dropdownId = useId('dropdown');
    const { form: { control } } = useFormContext();

    const { ...fieldProps }: FieldProps = rest as unknown as FieldProps;
    const { ...dropdownProps }: DropdownProps = rest as unknown as DropdownProps;
    const { ...infoLabelProps }: InfoLabelProps = rest as unknown as InfoLabelProps;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {

                const { onChange, onBlur, value, ref } = field;

                const displayValue = (value as OptionOnly[])?.map(v => v.label)?.join(', ') || '';
                const selectedOptions = (value as OptionOnly[])?.map(v => v.value) || [];

                const handleOnChange: DropdownProps['onOptionSelect'] = (ev, data) => {
                    const mappedOptions = [...options]?.map(option => ({ label: option.label, value: option.value } as OptionOnly));
                    const selectedOptions = mappedOptions?.filter(option => data?.selectedOptions?.includes(option.value));
                    onChange(selectedOptions);
                    dropdownProps?.onOptionSelect?.(ev, data);
                }

                const handleOnBlur: DropdownProps['onBlur'] = (ev) => {
                    onBlur();
                    dropdownProps?.onBlur?.(ev);
                };

                return (
                  <Field
                    {...fieldProps}
                    label={
                      {
                        children: (_: unknown, props: LabelProps) => (
                          <InfoLabel
                            {...props}
                            {...infoLabelProps}
                            htmlFor={dropdownId}
                          />
                        ),
                      } as unknown as InfoLabelProps
                    }
                    validationState={fieldState.invalid ? 'error' : undefined}
                    validationMessage={fieldState.error?.message}
                    required={required}
                  >
                    <Dropdown
                      {...dropdownProps}
                      id={dropdownId}
                      ref={dropdownRef || ref}
                      name={name}
                      value={displayValue}
                      selectedOptions={selectedOptions}
                      onOptionSelect={handleOnChange}
                      onBlur={handleOnBlur}
                    >
                      {(options || []).map(
                        (option: DropdownChoiceOption, index: number) => (
                          <Option
                            key={`${dropdownId}-${
                              option.value || '__'
                            }-${index}`}
                            {...(option?.optionProps || {})}
                            value={option?.value}
                          >
                            {option?.label}
                          </Option>
                        )
                      )}
                    </Dropdown>
                  </Field>
                );
            }}
        />)
})
