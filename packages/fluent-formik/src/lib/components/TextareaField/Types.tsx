import {
  FieldProps,
  TextareaProps,
  InfoLabelProps,
} from '@fluentui/react-components';

export type TextareaFieldProps = TextareaProps &
FieldProps &
InfoLabelProps & {
   name: string;
   label?: string;
};
