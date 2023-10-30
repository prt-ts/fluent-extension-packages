import {
  Field,
  FieldProps,
  LabelProps,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { forwardRef } from "react";
import { useFormContext } from "../Form";
import { Controller, ControllerProps } from "react-hook-form";
import ReactQuill, { ReactQuillProps } from "react-quill";
import { DeltaStatic, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';

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

export type RichInputFieldProps = FieldProps & ReactQuillProps & InfoLabelProps & { name: string, rules?: ControllerProps['rules'] }

export const RichInputField = forwardRef<ReactQuill, RichInputFieldProps>(({ name, rules, required, ...rest }, reactQuillRef) => {
    const { form: { control } } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...reactQuillProps }: ReactQuillProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;

    const classes = useRichTextEditorStyles();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { onChange, onBlur, value, ref } = field;

                return (
                    <Field
                        {...fieldProps}
                        label={{
                            children: (_: unknown, props: LabelProps) => (
                                <InfoLabel {...props} {...infoLabelProps} />
                            )
                        } as unknown as InfoLabelProps}
                        validationState={fieldState.invalid ? "error" : undefined}
                        validationMessage={fieldState.error?.message}
                        required={required}
                    >
                        {(fieldProps) => (
                            <ReactQuill
                                {...reactQuillProps}
                                ref={reactQuillRef || ref}
                                value={value}
                                theme="snow"
                                onChange={(
                                    value: string, delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor
                                ) => {
                                    onChange(value === '<p><br></p>' ? '' : value);
                                    reactQuillProps?.onChange?.(value, delta, source, editor);
                                }}
                                onBlur={() => onBlur()}
                                modules={modules}
                                className={fieldState.invalid ? classes.error : classes.regular}
                                {...fieldProps}
                            />
                        )}
                    </Field>
                )
            }}
        />)
});


export const useRichTextEditorStyles = makeStyles({
    error: {
        ...shorthands.border(
            tokens.strokeWidthThin,
            'solid',
            tokens.colorPaletteRedBorder2
        ),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),

        '& .ql-toolbar': {
            ...shorthands.border('none'),
            ...shorthands.padding(tokens.spacingVerticalXXS),
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
        },

        '& .ql-container': {
            ...shorthands.border('none'),
            minHeight: '9rem',

            '& .ql-editor': {
                ...shorthands.padding(
                    tokens.spacingVerticalMNudge,
                    tokens.spacingHorizontalSNudge
                ),
                boxShadow: tokens.shadow2,
                minHeight: '9rem',
                height: 'auto',

                '::before': {
                    ...shorthands.padding(tokens.spacingVerticalXXS),

                    fontStyle: 'normal',
                    opacity: 1,
                    color: tokens.colorNeutralForeground4,
                    lineHeight: tokens.lineHeightBase200,
                    fontWeight: tokens.fontWeightRegular,
                    fontFamily: 'inherit',
                    fontSize: tokens.fontSizeBase200,

                    left: tokens.spacingHorizontalXS,
                    right: tokens.spacingHorizontalXS,
                },
            },
        },

        // reset the border when focus
        ':has(.ql-toolbar):focus-within': {
            ...shorthands.borderTop(
                tokens.strokeWidthThin,
                'solid',
                tokens.colorNeutralStroke1
            ),
            ...shorthands.borderRight(
                tokens.strokeWidthThin,
                'solid',
                tokens.colorNeutralStroke1
            ),
            ...shorthands.borderLeft(
                tokens.strokeWidthThin,
                'solid',
                tokens.colorNeutralStroke1
            ),
            ...shorthands.borderBottom(
                tokens.strokeWidthThick,
                'solid',
                tokens.colorBrandStroke1
            ),
        },
    },
    regular: {
        ...shorthands.borderTop(
            tokens.strokeWidthThin,
            'solid',
            tokens.colorNeutralStroke1
        ),
        ...shorthands.borderRight(
            tokens.strokeWidthThin,
            'solid',
            tokens.colorNeutralStroke1
        ),
        ...shorthands.borderLeft(
            tokens.strokeWidthThin,
            'solid',
            tokens.colorNeutralStroke1
        ),
        ...shorthands.borderBottom(
            tokens.strokeWidthThin,
            'solid',
            tokens.colorNeutralStrokeAccessible
        ),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),

        '& .ql-toolbar': {
            ...shorthands.border('none'),
            ...shorthands.padding(tokens.spacingVerticalXXS),
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
        },

        '& .ql-container': {
            ...shorthands.border('none'),
            minHeight: '9rem',

            '& .ql-editor': {
                ...shorthands.padding(
                    tokens.spacingVerticalMNudge,
                    tokens.spacingHorizontalSNudge
                ),
                boxShadow: tokens.shadow2,
                minHeight: '9rem',
                height: 'auto',

                '::before': {
                    ...shorthands.padding(tokens.spacingVerticalXXS),

                    fontStyle: 'normal',
                    opacity: 1,
                    color: tokens.colorNeutralForeground4,
                    lineHeight: tokens.lineHeightBase200,
                    fontWeight: tokens.fontWeightRegular,
                    fontFamily: 'inherit',
                    fontSize: tokens.fontSizeBase200,

                    left: tokens.spacingHorizontalXS,
                    right: tokens.spacingHorizontalXS,
                },
            },
        },

        // border on focus
        ':has(.ql-toolbar):focus-within': {
            ...shorthands.borderBottom(
                tokens.strokeWidthThick,
                'solid',
                tokens.colorBrandStroke1
            ),
        },
    },
});

