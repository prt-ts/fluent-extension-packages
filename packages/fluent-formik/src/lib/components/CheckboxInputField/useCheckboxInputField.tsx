import * as React from "react";
import { CheckboxOption, CheckboxInputFieldProps } from "./Types";
import { useField } from 'formik';
import { CheckboxOnChangeData, InputProps } from "@fluentui/react-components";

export const useCheckboxInputField = ({ label, name, options, info, required, onBlur, enableSelectAll, labelPosition, layout, ...props }: CheckboxInputFieldProps) => {

    const [field, meta, helpers] = useField(name);
    const hasError = React.useMemo(() => meta.touched && meta.error, [meta.touched, meta.error]);

    const handleOnChange = (ev: any, data: CheckboxOnChangeData, option: CheckboxOption) => {
        const values = !!data.checked ? [...(field.value ?? []), option]
            : field.value.filter((value: CheckboxOption) => value.value !== option.value);
        helpers.setValue(values);
    };

    const handleOnBlur: InputProps["onBlur"] = () => {
        helpers.setTouched(true, true);
    };

    const isChecked = (option: CheckboxOption) => {
        return (field?.value as [] ?? [])?.some((value: CheckboxOption) => value.value === option.value);
    };

    const isCheckedAll = (): boolean | "mixed" => {
        return options?.every((option) => isChecked(option)) ? true : options?.some((option) => isChecked(option)) ? "mixed" : false;
    };

    return {
        field,
        meta,
        helpers,
        hasError,
        handleOnChange,
        handleOnBlur,
        isChecked,
        isCheckedAll,
    };
}