import {
  Field,
  FieldProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps, 
} from '@fluentui/react-components'; 
import { forwardRef } from "react";
import { useFormContext } from "../Form";
import { Controller, ControllerProps } from "react-hook-form"; 
import { FluentEditor, FluentEditorProps } from '@prt-ts/fluent-input-extensions';

export type RichInputFieldProps = FieldProps & FluentEditorProps & InfoLabelProps & { name: string, rules?: ControllerProps['rules'] }

export const RichInputField = forwardRef<HTMLDivElement, RichInputFieldProps>(({ name, rules, required, ...rest }, editorRef) => {
    const { form: { control } } = useFormContext();

    const { ...fieldProps }: FieldProps = rest as unknown as FieldProps;
    const { ...fluentEditorProps }: FluentEditorProps = rest as unknown as FluentEditorProps;
    const { ...infoLabelProps }: InfoLabelProps = rest as unknown as InfoLabelProps;
    
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { onChange, onBlur, value, ref } = field;

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
                        {(fieldProps) => (
                            <FluentEditor
                                {...fluentEditorProps}
                                ref={editorRef || ref}
                                value={value}
                                onChange={(value: string | undefined) => {
                                    onChange(value);
                                    fluentEditorProps.onChange?.(value);
                                }}
                                onBlur={onBlur}
                                {...fieldProps}
                            />
                        )}
                    </Field>
                )
            }}
        />)
});

export const RichViewerField = forwardRef<HTMLDivElement, RichInputFieldProps>(({ name, rules, required, ...rest }, reactQuillRef) => {
    const { form: { control } } = useFormContext();

    const { ...fieldProps }: FieldProps = rest as unknown as FieldProps; 
    const { ...infoLabelProps }: InfoLabelProps = rest as unknown as InfoLabelProps;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { value } = field;

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
                        {(fieldProps) => ( 
                             // eslint-disable-next-line react/no-danger                           
                             <span dangerouslySetInnerHTML={{ __html: value }} {...fieldProps}/>
                        )}
                    </Field>
                )
            }}
        />)
});