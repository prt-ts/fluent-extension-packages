import {
  Field,
  FieldProps,
  Switch,
  SwitchOnChangeData,
  SwitchProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';

export type SwitchFieldProps = FieldProps &
  SwitchProps &
  InfoLabelProps & {
    name: string;
    rules?: ControllerProps['rules'];
    checkedLabel?: string;
    uncheckedLabel?: string;
  };

export const SwitchField = forwardRef<HTMLInputElement, SwitchFieldProps>(
  ({ name, rules, required, ...rest }, SwitchRef) => {
    const {
      form: { control },
    } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...switchProps }: SwitchProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, onBlur, value, ref } = field;

          const handleOnChange = (
            ev: React.ChangeEvent<HTMLInputElement>,
            data: SwitchOnChangeData
          ) => {
            onChange(data.checked);
            switchProps.onChange?.(ev, data);
          };

          const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
            onBlur();
            switchProps.onBlur?.(ev);
          };

          return (
            <Field
              {...fieldProps}
              label={
                {
                  children: (_: unknown, props: LabelProps) => (
                    <InfoLabel
                      weight="semibold"
                      {...props}
                      {...infoLabelProps}
                    />
                  ),
                } as unknown as InfoLabelProps
              }
              validationState={fieldState.invalid ? 'error' : undefined}
              validationMessage={fieldState.error?.message}
              required={required}
            >
              <Switch
                {...switchProps}
                ref={SwitchRef || ref}
                name={name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                checked={!!value}
                label={value ? rest.checkedLabel : rest.uncheckedLabel}
                required={false}
              />
            </Field>
          );
        }}
      />
    );
  }
);
