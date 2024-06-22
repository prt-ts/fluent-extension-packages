/* eslint-disable */
import { ErrorMessage, useField } from 'formik';
import * as React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Body1Stronger,
  Field,
  FieldProps,
  LabelProps,
  useId,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';
import { useRichTextEditorStyles } from './useRichInputFieldStyles';

export type RichInputFieldProps = ReactQuillProps &
  InfoLabelProps &
  FieldProps & {
    name: string;
    label?: string;
  };

const modules = {
  toolbar: [
    // [{ font: [] }],
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    // [{ direction: "rtl" }], // text direction
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    // [{ header: 1 }, { header: 2 }], // custom button values
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    ['link'],
    ['blockquote', 'code-block'],
    ['clean'], // remove formatting button
  ] as const,
  // toolbar: { container: "#toolbar" },
  keyboard: { bindings: { tab: false } },
};

export const RichInputField = React.forwardRef<ReactQuill, RichInputFieldProps>(
  (props, ref) => {
    const inputId = useId('rich-input');

    const { label, name, ...rest } = props;

    //formik specific config
    const [_, { value, touched, error }, { setValue, setTouched }] =
      useField(name);
    const hasError = React.useMemo(
      () => touched && error && error?.length > 0,
      [touched, error]
    );

    // Fluent UI specific config
    const { ...fieldsProps }: FieldProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;
    const { ...reactQuillProps }: ReactQuillProps = rest;

    const classes = useRichTextEditorStyles();
    return (
      <>
        <Field
          {...fieldsProps}
          label={
            {
              children: (_: unknown, props: LabelProps) => (
                <InfoLabel
                  weight="semibold"
                  {...props}
                  {...infoLabelProps}
                  htmlFor={inputId}
                >
                  <Body1Stronger>{label}</Body1Stronger>
                </InfoLabel>
              ),
            } as LabelProps
          }
          validationState={hasError ? 'error' : undefined}
          validationMessage={
            hasError ? <ErrorMessage name={name} /> : undefined
          }
        >
          {(fieldProps) => (
            <ReactQuill
              ref={ref}
              id={inputId}
              {...reactQuillProps}
              value={value}
              theme="snow"
              onChange={(
                content: string,
                delta: any,
                source: any,
                editor: any
              ) => {
                setValue(content === '<p><br></p>' ? '' : content);
                reactQuillProps?.onChange &&
                  reactQuillProps?.onChange(content, delta, source, editor);
              }}
              onBlur={() => setTouched(true, true)}
              modules={modules}
              className={hasError ? classes.error : classes.regular}
              {...fieldProps}
            />
          )}
        </Field>
      </>
    );
  }
);
