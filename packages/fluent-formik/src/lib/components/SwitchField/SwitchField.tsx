import * as React from "react";
import { Switch } from "@fluentui/react-components";
import { SwitchFieldProps } from './Types'; 
import { ErrorMessage, useField } from "formik";

export const SwitchField: React.FC<SwitchFieldProps> = (props) : JSX.Element => {
    
    const { name, ...switchProps } = props;

    const [, {value, error, touched }, { setValue }] = useField(name);
    const hasError = React.useMemo(() => touched && error, [touched, error]);

    return (
        <>
            <Switch 
                {...switchProps}
                checked={value || false}
                onChange={(ev, data) => {setValue(data.checked, true); props.onChange?.(ev, data)}} 
            />
            {hasError ? <ErrorMessage name={name} /> : undefined}
        </>
    );
};
