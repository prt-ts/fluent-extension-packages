/* eslint-disable */
import * as React from "react";
import {
   useId,
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

type RadioOptions = RadioProps & {
   meta?: Record<string, unknown>;
};

type InputFieldProps = RadioGroupProps & FieldProps & InfoLabelProps & {
   name: string;
   label?: string;
   options?: RadioOptions[];
};

export const RadioInputField: React.FC<InputFieldProps> = (props) => {
   const labelId = useId("radio-input");

   const { label, name, options, ...rest } = props;

   // @ts-ignore: Type too Complex error code
   const { ...fieldPros }: FieldProps = rest;
   const { ...infoLabelProps }: InfoLabelProps = rest;
   const { ...radioGroupProps }: RadioGroupProps = rest;

   const [, { value, touched, error }, { setValue, setTouched }] = useField(name);
   const hasError = React.useMemo(() => touched && error, [touched, error]);

   const handleOnChange: RadioGroupProps["onChange"] = (ev, data) => {
      const value = options?.find((option) => option.value === data.value);
      setValue(value);
      props.onChange && props.onChange?.(ev, data);
   };

   const handleOnBlur: RadioGroupProps["onBlur"] = (ev) => {
      setTouched(true, true);
      props.onBlur && props.onBlur(ev);
   };

   return (
      <Field
         {...fieldPros}
         label={
            {
               children: (_: unknown, props: LabelProps) => (
                  <InfoLabel
                     {...props}
                     {...infoLabelProps}
                     htmlFor={labelId}
                  >
                     <strong>{label}</strong>
                  </InfoLabel>
               ),
            } as unknown as LabelProps
         }
         validationState={hasError ? 'error' : undefined}
         validationMessage={
            hasError ? <ErrorMessage name={name} /> : undefined
         }
      >
         <RadioGroup
            {...radioGroupProps}
            onBlur={handleOnBlur}
            value={(value?.value || "")}
            onChange={handleOnChange}
            aria-labelledby={labelId}
            required={false}
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
   );
};


