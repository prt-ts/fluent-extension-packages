import {
  Field,
  FieldProps,
  Textarea,
  TextareaOnChangeData,
  TextareaProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';

export type TextareaFieldProps = FieldProps &
  TextareaProps &
  InfoLabelProps & { name: string; rules?: ControllerProps['rules'] };

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ name, rules, required, ...rest }, textareaRef) => {
  const {
    form: { control },
  } = useFormContext();

  const { ...fieldProps }: FieldProps = rest as unknown as FieldProps;
  const { ...textareaProps }: TextareaProps = rest as unknown as TextareaProps;
  const { ...infoLabelProps }: InfoLabelProps =
    rest as unknown as InfoLabelProps;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { onChange, onBlur, value, ref } = field;

        const handleOnChange = (
          ev: React.ChangeEvent<HTMLTextAreaElement>,
          data: TextareaOnChangeData
        ) => {
          onChange(data.value);
          textareaProps.onChange?.(ev, data);
        };

        const handleOnBlur = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
          onBlur();
          textareaProps.onBlur?.(ev);
        };

        return (
          <Field
            {...fieldProps}
            label={
              {
                children: (_: unknown, props: LabelProps) => (
                  <InfoLabel weight="semibold" {...props} {...infoLabelProps} />
                ),
              } as unknown as InfoLabelProps
            }
            validationState={fieldState.invalid ? 'error' : undefined}
            validationMessage={fieldState.error?.message}
            required={required}
          >
            <Textarea
              {...textareaProps}
              ref={textareaRef || ref}
              name={name}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              value={value || ''}
              required={false}
            />
          </Field>
        );
      }}
    />
  );
});
