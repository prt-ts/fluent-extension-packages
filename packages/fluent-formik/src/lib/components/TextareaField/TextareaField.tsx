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

type TextareaFieldProps = TextareaProps &
   FieldProps &
   InfoLabelProps & {
      name: string;
      label?: string;
   };

export const TextareaField = (props: TextareaFieldProps) => {
   const inputId = useId('textarea');

   const { label, name, info, required, ...rest } = props;

   const styles = useStyles();

   const [field, meta, helpers] = useField(name);
   const hasError = React.useMemo(
      () => meta.touched && meta.error,
      [meta.touched, meta.error],
   );

   const handleOnChange: TextareaProps['onChange'] = (ev, data) => {
      helpers.setValue(data.value);
   };
   const handleOnBlur: TextareaProps['onBlur'] = () => {
      helpers.setTouched(true, true);
   };

   return (
      <div className={styles.root}>
         <Field
            {...rest}
            label={
               {
                  children: (_: unknown, props: LabelProps) => (
                     <InfoLabel {...props} info={info} id={inputId} required={required}>
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
               {...(rest as any)}
               id={inputId}
               name={name}
               value={!!meta.value ? meta.value : ''}
               onChange={handleOnChange}
               onBlur={handleOnBlur}
            />
         </Field>
      </div>
   );
};
