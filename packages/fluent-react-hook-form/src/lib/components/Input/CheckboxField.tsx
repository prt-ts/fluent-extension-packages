import { Field, FieldProps, Checkbox, CheckboxOnChangeData, CheckboxProps, LabelProps, InfoLabel, InfoLabelProps } from "@fluentui/react-components";
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
