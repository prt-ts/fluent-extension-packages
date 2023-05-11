import * as React from 'react';
import {
   makeStyles,
   shorthands,
   useId,
   Input,
   InputProps,
   LabelProps,
   FieldProps,
   Field,
} from '@fluentui/react-components';
import type { InfoLabelProps } from '@fluentui/react-components/unstable';
import { InfoLabel } from '@fluentui/react-components/unstable';
import { useField, ErrorMessage } from 'formik';

const useStyles = makeStyles({
   root: {
      // Stack the label above the field
      display: 'flex',
      flexDirection: 'column',
      // Use 2px gap below the label (per the design system)
      rowGap: '2px',

      // add 4px margin to the top of the field
      marginTop: '4px',
   },
});

type InputFieldProps = InputProps &
   FieldProps &
   InfoLabelProps & {
      name: string;
      label?: string;
   };

export const InputField = (props: InputFieldProps) => {
   const inputId = useId('input');
   const { label, name, info, required, ...rest } = props;

   const { ...fieldPros }: FieldProps = rest;
   const { ...infoLabelProps }: InfoLabelProps = rest;
   const { ...inputProps }: InputProps = rest;

   const styles = useStyles();

   const [field, meta, helpers] = useField(name);
   const hasError = React.useMemo(
      () => meta.touched && meta.error,
      [meta.touched, meta.error],
   );

   const handleOnChange: InputProps['onChange'] = (ev, data) => {
      helpers.setValue(data.value);
   };

   const handleOnBlur: InputProps['onBlur'] = () => {
      helpers.setTouched(true, true);
   };

   return (
      <div className={styles.root}>
         <Field
            {...fieldPros}
            label={
               {
                  children: (_: unknown, props: LabelProps) => (
                     <InfoLabel
                        {...infoLabelProps}
                        info={info}
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
         >
            <Input
               {...inputProps}
               name={name}
               value={meta.value ?? ''}
               onChange={handleOnChange}
               id={inputId}
               onBlur={handleOnBlur}
               required={false} // this is important because we are using the required prop on the Field component and validation is handled by Formik and Yup
            />
         </Field>
      </div>
   );
};
