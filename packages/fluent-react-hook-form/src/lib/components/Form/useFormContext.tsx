import { useContext } from "react";
import { FormContext } from "./FormContext";
import { useForm } from "react-hook-form";

export function useFormContext() : { form: ReturnType<typeof useForm> } {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used under <Form></Form>');
    }
    return context as { form: ReturnType<typeof useForm> };
}