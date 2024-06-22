import {
  Field,
  Input,
  InputOnChangeData,
  InputProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps,
  useId,
  FieldProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';
import {
  creditCardMask,
  currencyMask,
  phoneMask,
} from '../../utils/InputFormatter';
import { CommonFieldInfoLabelProps } from '../types/CommonFieldProps';
import { Show } from '@prt-ts/react-control-flow';

export type InputFieldProps = CommonFieldInfoLabelProps &
  InputProps & {
    name: string;
    rules?: ControllerProps['rules'];
    autoCompleteOptions?: string[];
    fieldMask?: 'phone' | 'currency' | 'creditCard' | 'custom' | undefined;
    onCustomMask?: (value: string) => string;
  };

function useFormatInputProps(props: InputFieldProps) {
  const {
    name,
    onChange,
    onBlur,
    placeholder,
    required,
    className,
    label,
    orientation,
    hint,
    info,
    autoCompleteOptions = [],
    fieldMask,
    rules,
    size,
    onCustomMask,
    ...rest
  } = props;

  const { ...inputProps }: InputProps = rest;
  const { fieldProps = {}, infoLabelProps = {} } = props;

  return {
    name,
    rules,
    fieldMask,
    autoCompleteOptions,
    onCustomMask,
    onChange,
    onBlur,
    inputProps: { ...inputProps, placeholder, className, size } as InputProps,
    fieldProps: {
      ...fieldProps,
      required,
      hint,
      orientation,
      size,
    } as FieldProps,
    infoLabelProps: { ...infoLabelProps, label, info, size } as InfoLabelProps,
  } as const;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, inputRef) => {
    const fieldId = useId(`${props.name}-field`);
    const autoCompleteListId = useId('autoCompleteList');
    const {
      form: { control },
    } = useFormContext();
    const {
      name,
      rules,
      fieldMask,
      autoCompleteOptions,
      onCustomMask,
      onChange: onInputChange,
      onBlur: onInputBlur,
      inputProps,
      fieldProps,
      infoLabelProps,
    } = useFormatInputProps(props);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, onBlur, value, ref } = field;

          const handleOnChange = (
            ev: React.ChangeEvent<HTMLInputElement>,
            data: InputOnChangeData
          ) => {
            switch (fieldMask) {
              case 'phone':
                data.value = phoneMask(data.value);
                break;
              case 'currency':
                data.value = currencyMask(data.value);
                break;
              case 'creditCard':
                data.value = creditCardMask(data.value);
                break;
              case 'custom':
                if (onCustomMask) {
                  data.value = onCustomMask(data.value);
                }
                break;
              default:
                break;
            }
            onChange(data.value);
            if (onInputChange) {
              onInputChange(ev, data);
            }
          };

          const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
            onBlur();
            if (onInputBlur) {
              onInputBlur(ev);
            }
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
                      htmlFor={fieldId}
                    />
                  ),
                } as LabelProps
              }
              validationState={fieldState.invalid ? 'error' : undefined}
              validationMessage={fieldState.error?.message}
            >
              <Input
                {...inputProps}
                id={fieldId}
                ref={inputRef || ref}
                name={name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                value={value || ''}
                required={false}
                list={
                  autoCompleteOptions.length > 0
                    ? autoCompleteListId
                    : undefined
                }
              />
              <Show when={autoCompleteOptions?.length > 0}>
                <datalist id={autoCompleteListId}>
                  {autoCompleteOptions.map((option: string) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </Show>
            </Field>
          );
        }}
      />
    );
  }
);
