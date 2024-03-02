import { Field, FieldProps, Input, InputOnChangeData, InputProps, LabelProps, InfoLabel, InfoLabelProps, useId } from "@fluentui/react-components";
import { forwardRef } from "react";
import { useFormContext } from "../Form";
import { Controller, ControllerProps } from "react-hook-form";

export type InputFieldProps = FieldProps & InputProps & InfoLabelProps & { 
    name: string, 
    rules?: ControllerProps['rules']
    autoCompleteOptions?: string[]
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ name, rules, autoCompleteOptions = [], required, ...rest }, inputRef) => {
    const autoCompleteListId = useId('autoCompleteList');
    const { form: { control } } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...inputProps }: InputProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { onChange, onBlur, value, ref } = field;

                const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                    onChange(data.value);
                    inputProps.onChange?.(ev, data);
                }

                const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
                    onBlur();
                    inputProps.onBlur?.(ev);
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
                        <Input
                            {...inputProps}
                            ref={inputRef || ref}
                            name={name}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            value={value || ''}
                            required={false}
                            list={autoCompleteOptions.length > 0 ? autoCompleteListId : undefined}
                        />
                        {
                            autoCompleteOptions.length > 0 && (
                                <datalist id={autoCompleteListId}>
                                    {autoCompleteOptions.map(option => (
                                        <option key={option} value={option} />
                                    ))}
                                </datalist>
                            )
                        }
                    </Field>
                )
            }}
        />)
})
