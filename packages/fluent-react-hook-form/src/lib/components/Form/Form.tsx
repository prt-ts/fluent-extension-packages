/* eslint-disable */
import { ForwardedRef, PropsWithChildren, forwardRef } from "react"
import { FieldValues, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { FormContext } from "./FormContext"

export interface FormContextType {
    form?: ReturnType<typeof useForm>
}

export type FormProps<TFormState extends FieldValues> = {
    form: ReturnType<typeof useForm<TFormState>>
    onSubmit?: SubmitHandler<TFormState>;
    onError?: SubmitErrorHandler<TFormState>
}

export type FormRef = HTMLFormElement & {
    form: ReturnType<typeof useForm>
}

export function FormProvider<TFormState extends FieldValues>({ children, ...props }: PropsWithChildren<FormProps<TFormState>>, ref: ForwardedRef<FormRef>) {

    const { form, onSubmit, onError } = props;

    return (
        <FormContext.Provider value={{ form }}>
            <form ref={ref} onSubmit={onSubmit && form.handleSubmit(onSubmit, onError)} autoComplete="off">
                {children}
            </form>
        </FormContext.Provider>
    )
}

export const Form = forwardRef(FormProvider) as <TFormState extends FieldValues>(
    props: PropsWithChildren<FormProps<TFormState>> & { ref?: ForwardedRef<FormRef> },
) => ReturnType<typeof FormProvider>;
