/* eslint-disable  */
import * as React from 'react';
import {
   makeStyles,
   useId,
   LabelProps,
   FieldProps,
   Field,
   Textarea,
   TextareaProps,
} from '@fluentui/react-components';
import type { InfoLabelProps } from '@fluentui/react-components/unstable';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { useField, ErrorMessage } from 'formik';
import { TextareaFieldProps } from './Types';

export const TextareaField: React.FC<TextareaFieldProps> = (props) => {
   const inputId = useId('textarea');

   const { label, name, required, ...rest } = props;

   // @ts-ignore: Type too Complex error code
   const { ...fieldPros }: FieldProps = rest;
   const { ...infoLabelProps }: InfoLabelProps = rest;
   const { ...textareaProps }: TextareaProps = rest;

   const [_, { value, error, touched }, { setValue, setTouched }] = useField(name);
   const hasError = React.useMemo(() => touched && error, [touched, error]);

   const handleOnChange: TextareaProps['onChange'] = (ev, data) => {
      setValue(data.value);
   };
   const handleOnBlur: TextareaProps['onBlur'] = () => {
      setTouched(true, true);
   };

   return (
      <Field
         {...fieldPros}
         label={
            {
               children: (_: unknown, props: LabelProps) => (
                  <InfoLabel {...props} {...infoLabelProps} htmlFor={inputId} required={required}>
                     <strong>{label}</strong>
                  </InfoLabel>
               ),
            } as LabelProps
         }
         validationState={hasError ? 'error' : undefined}
         validationMessage={
            hasError ? <ErrorMessage name={name} /> : undefined
         }
      >
         <Textarea
            {...textareaProps}
            id={inputId}
            name={name}
            value={value || ""}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
         />
      </Field>
   );
};
