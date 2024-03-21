import {
  Field,
  FieldProps,
  RadioGroup,
  RadioGroupOnChangeData,
  RadioGroupProps,
  LabelProps,
  Radio,
  RadioProps,
  useId,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';
import { forwardRef } from "react";
import { useFormContext } from "../Form";
import { Controller, ControllerProps } from "react-hook-form";

export type RadioChoiceOption = {
  label: string;
  value: string;

  radioProps?: Partial<RadioProps> | undefined;
};

export type RadioGroupFieldProps = FieldProps & RadioGroupProps & InfoLabelProps & { name: string, rules?: ControllerProps['rules'], options: RadioChoiceOption[]}

export const RadioGroupField = forwardRef<HTMLDivElement, RadioGroupFieldProps>(
  ({ name, options, rules, required, ...rest }, radioGroupRef) => {

    const labelId = useId('radio-input');
    const {
      form: { control },
    } = useFormContext();

    const { ...fieldProps }: FieldProps = rest as unknown as FieldProps;
    const { ...radioGroupProps }: RadioGroupProps = rest as unknown as RadioGroupProps;
    const { ...infoLabelProps }: InfoLabelProps = rest as unknown as InfoLabelProps;

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, onBlur, value, ref } = field;
          
          const handleOnChange: RadioGroupProps['onChange'] = (
            ev: React.FormEvent<HTMLDivElement>,
            data: RadioGroupOnChangeData
          ) => {
            console.log('RadioGroupField: handleOnChange: data.value:', data.value);
            const selectedOption = options?.find(
              (option) => option.value === data.value
            );
            onChange(selectedOption);
            radioGroupProps.onChange?.(ev, data);
          };

          const handleOnBlur: RadioGroupProps['onBlur'] = (
            ev: React.FocusEvent<HTMLDivElement, Element>
          ) => {
            onBlur();
            radioGroupProps.onBlur?.(ev);
          };

          return (
            <Field
              {...fieldProps}
              label={
                {
                  children: (_: unknown, props: LabelProps) => (
                    <InfoLabel {...props} {...infoLabelProps} />
                  ),
                } as unknown as InfoLabelProps
              }
              validationState={fieldState.invalid ? 'error' : undefined}
              validationMessage={fieldState.error?.message}
              required={required}
            >
              <RadioGroup
                {...radioGroupProps}
                ref={radioGroupRef || ref}
                onBlur={handleOnBlur}
                value={value?.value || ''}
                onChange={handleOnChange}
                aria-labelledby={labelId}
                required={false}
              >
                {(options || []).map(
                  (option: RadioChoiceOption, index: number) => (
                    <Radio
                      key={`${option.value}-${index}`}
                      value={option.value}
                      label={option.label}
                      {...option.radioProps}
                    />
                  )
                )}
              </RadioGroup>
            </Field>
          );
        }}
      />
    );
  }
);
