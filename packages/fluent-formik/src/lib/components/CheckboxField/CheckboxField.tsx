import * as React from "react";
import { Checkbox } from "@fluentui/react-components";
import { CheckboxFieldProps } from './Types'; 
import { ErrorMessage, useField } from "formik";

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) : JSX.Element => {
    
    const { name, ...checkboxProps } = props;

    const [, {value, error, touched }, { setValue }] = useField(name);
    const hasError = React.useMemo(() => touched && error, [touched, error]);


    return (
        <>
            <Checkbox
                {...checkboxProps}
                checked={(value || false)}
                onChange={(ev, data) => setValue(data.checked, true)} 
            />
            {hasError ? <ErrorMessage name={name} /> : undefined}
        </>
    );
};
