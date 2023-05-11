import * as React from "react";
import {
    makeStyles,
    shorthands,
    useId,
    Input,
    InputProps,
    LabelProps,
    RadioGroup,
    Radio,
    RadioGroupProps,
    RadioProps,
    FieldProps,
    Field
} from "@fluentui/react-components";
import type { InfoLabelProps } from "@fluentui/react-components/unstable";
import { InfoLabel } from "@fluentui/react-components/unstable";
import { useField, ErrorMessage } from 'formik';


const useStyles = makeStyles({
    root: {
        // Stack the label above the field
        display: "flex",
        flexDirection: "column",
        // Use 2px gap below the label (per the design system)
        rowGap: "2px",
        
        // add 4px margin to the top of the field
        marginTop : "4px",
    },
});

type RadioOptions = RadioProps & { 
    meta? : any; 
};

type InputFieldProps = RadioGroupProps & FieldProps & InfoLabelProps & {
    name: string;
    label?: string;
    options?: RadioOptions[];
};

export const RadioInputField = ({ label, name, options, info, required, onBlur, ...props }: InputFieldProps) => {
    const labelId = useId("radio-input");
    const styles = useStyles();

    const [field, meta, helpers] = useField(name);
    const hasError = React.useMemo(() => meta.touched && meta.error, [meta.touched, meta.error]);

    const handleOnChange = (e : any, data : any) => {
        const value = options?.find((option) => option.value === data.value);
        helpers.setValue(value);
    };
    const handleOnBlur: InputProps["onBlur"] = () => {
        helpers.setTouched(true, true);
    };

    return (
       <div className={styles.root}>
          <Field
             {...props}
             label={
                {
                   children: (_: unknown, props: LabelProps) => (
                      <InfoLabel
                         {...props}
                         info={info}
                         id={labelId}
                         required={required}
                      >
                         <strong>{label}</strong>
                      </InfoLabel>
                   ),
                } as any
             }
             validationState={hasError ? 'error' : undefined}
             validationMessage={
                hasError ? <ErrorMessage name={name} /> : undefined
             }
             required={required}
          >
             <RadioGroup
                {...props}
                onBlur={handleOnBlur}
                value={meta.value?.value}
                onChange={handleOnChange}
                aria-labelledby={labelId}
             >
                {(options || []).map(option => (
                   <Radio
                      key={option.value}
                      {...option}
                      value={option.value}
                      label={option.label}
                      disabled={option.disabled}
                   />
                ))}
             </RadioGroup>
          </Field>
       </div>
    );
};


