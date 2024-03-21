import { Field, FieldProps, Checkbox, CheckboxOnChangeData, CheckboxProps, LabelProps, InfoLabel, InfoLabelProps, makeStyles, mergeClasses, shorthands, tokens, useId } from "@fluentui/react-components";
import { forwardRef } from "react";
import { useFormContext } from "../Form";
import { Controller, ControllerProps } from "react-hook-form";

export type CheckboxFieldProps = FieldProps & CheckboxProps & InfoLabelProps & {
    name: string,
    rules?: ControllerProps['rules']
    checkedLabel?: string
    uncheckedLabel?: string
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(({ name, rules, required, ...rest }, CheckboxRef) => {
    const { form: { control } } = useFormContext();

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

                const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
                    onChange(data.checked);
                    checkboxProps.onChange?.(ev, data);
                }

                const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
                    onBlur();
                    checkboxProps.onBlur?.(ev);
                }

                return (
                    <Field
                        {...fieldProps}
                        label={{
                            children: (_: unknown, props: LabelProps) => (
                                <InfoLabel {...props} {...infoLabelProps} />
                            )
                        } as unknown as InfoLabelProps}
                        validationState={fieldState.invalid ? "error" : undefined}
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
                )
            }}
        />)
})

export type CheckboxOption = { label: string, value: string, checkboxProps?: CheckboxProps }

export type CheckboxGroupFieldProps = FieldProps & InfoLabelProps & {
    name: string,
    layout?: 'horizontal' | 'vertical'
    rules?: ControllerProps['rules']
    options: CheckboxOption[]
}

export const useCheckboxGroupStyles = makeStyles({
    root: {
        display: 'flex',
        ...shorthands.gap(tokens.spacingHorizontalS, 0)
    },
    horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    vertical: {
        flexDirection: 'column'
    }
})

export const CheckboxGroupField = forwardRef<HTMLDivElement, CheckboxGroupFieldProps>(({ name, rules, options, required, layout = "vertical", ...rest }, CheckboxRef) => {
    const { form: { control } } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;

    const labelId = useId('checkbox-input');
    const styles = useCheckboxGroupStyles();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { onChange, onBlur, value, ref } = field;
                const selectedValues = (value || [])?.map((v: CheckboxOption) => v.value);

                const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData, option: CheckboxOption) => {
                    if (data.checked) {
                        // if checked, add to selected values
                        onChange([...(value || []), option]);
                    } else {
                        onChange([...(value || [])].filter((op) => op.value !== option.value));
                    }
                }

                const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
                    onBlur();
                }

                return (
                    <Field
                        {...fieldProps}
                        label={{
                            children: (_: unknown, props: LabelProps) => (
                                <InfoLabel {...props} {...infoLabelProps} />
                            )
                        } as unknown as InfoLabelProps}
                        validationState={fieldState.invalid ? "error" : undefined}
                        validationMessage={fieldState.error?.message}
                        required={required}
                    >
                        <div ref={ref} className={mergeClasses(styles.root, styles[layout])}>
                            {
                                (options || []).map((option) => {
                                    const { checkboxProps } = option;
                                    return (
                                        <Checkbox
                                            {...checkboxProps}
                                            key={option.value}
                                            id={`${labelId}-${name}-${option.value}`}
                                            onChange={(e, data) => handleOnChange(e, data, option)}
                                            onBlur={handleOnBlur}
                                            checked={(selectedValues || []).includes(option.value)}
                                            label={option.label}
                                            required={false}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Field>
                )
            }}
        />)
})