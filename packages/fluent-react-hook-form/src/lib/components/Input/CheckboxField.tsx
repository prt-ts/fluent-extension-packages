import {
  Field,
  FieldProps,
  Checkbox,
  CheckboxOnChangeData,
  CheckboxProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  useArrowNavigationGroup,
} from '@fluentui/react-components';
import { ReactNode, forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';

export type CheckboxFieldProps = FieldProps &
  CheckboxProps &
  InfoLabelProps & {
    name: string;
    rules?: ControllerProps['rules'];
    checkedLabel?: string;
    uncheckedLabel?: string;
  };

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ name, rules, required, ...rest }, CheckboxRef) => {
    const {
      form: { control },
    } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...checkboxProps }: CheckboxProps = rest;
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
            data: CheckboxOnChangeData
          ) => {
            onChange(data.checked);
            checkboxProps.onChange?.(ev, data);
          };

          const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
            onBlur();
            checkboxProps.onBlur?.(ev);
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
              <Checkbox
                {...checkboxProps}
                ref={CheckboxRef || ref}
                name={name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                checked={value || false}
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

export type CheckboxChoiceOption = {
  label: ReactNode;
  value: string | number | boolean;
  checkboxProps?: CheckboxProps;
  meta?: Record<string, unknown>;
};

export type CheckboxGroupFieldProps = FieldProps &
  InfoLabelProps & {
    name: string;
    layout?: 'horizontal' | 'vertical';
    rules?: ControllerProps['rules'];
    options: CheckboxChoiceOption[];
  };

export const useCheckboxGroupStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS, 0),
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vertical: {
    flexDirection: 'column',
  },
});

export const CheckboxGroupField = forwardRef<
  HTMLDivElement,
  CheckboxGroupFieldProps
>(
  (
    { name, rules, options, required, layout = 'vertical', ...rest },
    CheckboxRef
  ) => {
    const {
      form: { control },
    } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;

    const attributes = useArrowNavigationGroup({
      axis: layout,
      circular: true,
      memorizeCurrent: true,
    });
    const styles = useCheckboxGroupStyles();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, onBlur, value, ref } = field;
          const selectedValues = (value || [])?.map(
            (v: CheckboxChoiceOption) => v.value
          );

          const handleOnChange = (
            ev: React.ChangeEvent<HTMLInputElement>,
            data: CheckboxOnChangeData,
            option: CheckboxChoiceOption
          ) => {
            if (data.checked) {
              // if checked, add to selected values
              onChange([...(value || []), option]);
            } else {
              onChange(
                [...(value || [])].filter((op) => op.value !== option.value)
              );
            }
          };

          const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
            onBlur();
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
              <div
                {...attributes}
                ref={ref}
                className={mergeClasses(styles.root, styles[layout])}
              >
                {(options || []).map((option) => {
                  const { checkboxProps, ...optionRest } = option;
                  return (
                    <Checkbox
                      {...checkboxProps}
                      key={`${name}-${option.value}`}
                      id={`${name}-${option.value}`}
                      onChange={(e, data) =>
                        handleOnChange(e, data, optionRest)
                      }
                      onBlur={handleOnBlur}
                      checked={(selectedValues || []).includes(option.value)}
                      /* eslint-disable-next-line*/
                      label={<>{option.label}</>}
                      required={false}
                    />
                  );
                })}
              </div>
            </Field>
          );
        }}
      />
    );
  }
);
