/* eslint-disable */
import { useField } from 'formik';
import * as React from 'react'; 
import { DropdownProps } from '@fluentui/react-components'; 
import { DropdownFieldProps, DropdownOption } from './Types';

export const useDropdownField = (props: DropdownFieldProps) => {
   const { name, options } = props;
   const [field, meta, helpers] = useField(name);

   const hasError = React.useMemo(
      () => meta.touched && meta.error,
      [meta.touched, meta.error],
   );

   const value = React.useMemo(() => {
      const currentValues = meta.value as DropdownOption[];
      return currentValues?.map(v => v.label).join(', ') ?? '';
   }, [meta.value]);

   const selectedOptions = React.useMemo(() => {
      const currentValues = meta.value as DropdownOption[];
      return currentValues?.map(v => v.value) ?? [];
   }, [meta.value]);

   const handleOnChange: (typeof props)['onOptionSelect'] = React.useCallback(
      (ev: any, data: any) => { 
         const selectedOptions = options.filter(option =>
            data.selectedOptions.includes(option.value),
         );

         helpers.setValue(selectedOptions);
         props?.onOptionSelect && props.onOptionSelect(ev, data);
      },
      [options],
   );

   const handleOnBlur: DropdownProps['onBlur'] = (ev : any) => {
      helpers.setTouched(true, true); 
      props?.onBlur && props.onBlur(ev);
   };

   return {
      hasError,
      value,
      selectedOptions,
      handleOnChange,
      handleOnBlur,
   } as const;
};
