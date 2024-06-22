import {
  Field,
  LabelProps,
  InfoLabel,
  useId,
  TagPickerInputProps,
  InfoLabelProps,
  FieldProps,
  TagPickerProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';
import { CommonFieldInfoLabelProps } from '../types/CommonFieldProps';
import {
  TagInput,
  TagInputProps,
  TagInputRef,
} from '@prt-ts/fluent-input-extensions';

export type TagPickerFieldProps = CommonFieldInfoLabelProps &
  TagPickerInputProps & {
    name: string;
    rules?: ControllerProps['rules'];
    multiselect?: boolean;
    freeform?: boolean;
    onOptionSelect?: TagPickerProps['onOptionSelect'];
    suggestions?: string[];
    onGetSuggestions?: (query: string) => Promise<string[]>;
  };

function useFormatInputProps(props: TagPickerFieldProps) {
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
    rules,
    ...rest
  } = props;

  const { ...inputProps }: TagInputProps = rest as TagInputProps;
  const { fieldProps = {}, infoLabelProps = {} } = props;

  return {
    name,
    rules,
    onChange,
    onBlur,
    inputProps: {
      ...inputProps,
      placeholder,
      className,
    } as TagInputProps,

    fieldProps: {
      ...fieldProps,
      required,
      hint,
      orientation,
    } as FieldProps,

    infoLabelProps: {
      ...infoLabelProps,
      label,
      info,
    } as InfoLabelProps,
  } as const;
}

export const TagPickerField = forwardRef<TagInputRef, TagPickerFieldProps>(
  (props, inputRef) => {
    const fieldId = useId(`${props.name}-field`);
    const {
      form: { control },
    } = useFormContext();

    const { name, rules, fieldProps, infoLabelProps, inputProps } =
      useFormatInputProps(props);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, onBlur, value = [], ref } = field;

          return (
            <Field
              {...fieldProps}
              label={
                {
                  children: (_: unknown, props: LabelProps) => (
                    <InfoLabel
                      {...props}
                      {...infoLabelProps}
                      htmlFor={fieldId}
                      weight="semibold"
                    />
                  ),
                } as LabelProps
              }
              validationState={fieldState.invalid ? 'error' : undefined}
              validationMessage={fieldState.error?.message}
            >
              <TagInput
                {...inputProps}
                value={value || []}
                onTagSelect={onChange}
                onBlur={onBlur}
                suggestions={props.suggestions}
                freeform={props.freeform}
                multiselect={props.multiselect}
                ref={inputRef || ref}
              />
            </Field>
          );
        }}
      />
    );
  }
);
