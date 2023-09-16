import * as React from "react";
import { useId, LabelProps, Checkbox, Field, FieldProps} from "@fluentui/react-components";
import { InfoLabel, InfoLabelProps } from "@fluentui/react-components/unstable";
import { ErrorMessage } from 'formik';
import { useOptionStyles, useStyles } from "./Styles";
import { CheckboxInputFieldProps } from "./Types";
import { useCheckboxInputField } from "./useCheckboxInputField";

export const CheckboxInputField : React.FC<CheckboxInputFieldProps> = (props) => {
    const labelId = useId("radio-input");
    const styles = useStyles();
    const optionStyles = useOptionStyles();

    const { name, label, options, layout, enableSelectAll, labelPosition, ...rest} = props;

    const {
       helpers,
       hasError,
       handleOnChange,
       handleOnBlur,
       isChecked,
       isCheckedAll,
    } = useCheckboxInputField(props);

    const { ...fieldPros }: FieldProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest; 

    return (
        <div className={styles.root}>
            <Field
                {...fieldPros}
                label={{
                    children: (_: unknown, props: LabelProps) => (
                        <InfoLabel {...props} {...infoLabelProps} htmlFor={labelId}>
                            <strong>{label}</strong>
                        </InfoLabel>
                    ),
                } as unknown as LabelProps}
                validationState={hasError ? "error" : undefined}
                validationMessage={hasError ? <ErrorMessage name={name} /> : undefined} 
                onBlur={handleOnBlur}
            >
                <div className={layout == "vertical" ? optionStyles.root : undefined}>
                    {enableSelectAll ? <Checkbox
                        checked={isCheckedAll()}
                        onChange={(_ev, data) => {
                            if (data.checked === true) {
                                helpers.setValue(options);
                            } else {
                                helpers.setValue([]);
                            }
                            props.onChange?.(_ev)
                        }}
                        label="Select All"
                        labelPosition={labelPosition}
                        required={false}
                    /> : <> </>}
                    {
                        (options || []).map((option, index) => (
                            <Checkbox
                                {...option}
                                key={`${labelId}-${name}-${index}`}
                                id={`${labelId}-${name}-${index}`}
                                checked={isChecked(option)}
                                onChange={(ev, data) => handleOnChange(null, data, option)}
                                labelPosition={labelPosition}
                                required={false}
                            />
                        ))
                    }
                </div>
            </Field>
        </div>
    );
};


