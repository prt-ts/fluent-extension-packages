
import * as React from 'react';
import {
  makeStyles,
  tokens,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableCellActions,
  TableCellLayout,
  Button,
  Field,
  LabelProps,
  FieldProps,
  mergeClasses,
  InfoLabel,
  InfoLabelProps,
  shorthands,
  useFocusableGroup,
} from '@fluentui/react-components';
import { Accept, useDropzone } from 'react-dropzone';
import type { DropzoneProps } from "react-dropzone"
import { forwardRef } from 'react';
import { useFormContext } from '../Form';
import { Controller, ControllerProps } from 'react-hook-form';

import {
  Attach20Filled,
  DocumentDismissRegular,
  DeleteRegular,
  ArrowDownloadFilled,
  DocumentCheckmarkRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    rowGap: '2px',
  },
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'left',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeAccessible),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    cursor: 'pointer',
  },
  focusedStyle: {
    ...shorthands.borderBottom(tokens.strokeWidthThick, 'solid', tokens.colorCompoundBrandStrokePressed),
  },
  acceptStyle: {
    'border-color': '#2196f3',
  },
  rejectStyle: {
    'border-color': '#ff1744',
  },

  small: {
    minHeight: '18px',
  },
  medium: {
    minHeight: '24px',
  },
  large: {
    minHeight: '32px',
  },
});

const arrayUniqueByKey = (items: File[], key: keyof File) => [
  ...new Map(items.map((item) => [item[key], item])).values(),
];

export type FileInfo = {
  name: string;
  path: string;
  size?: number;
  type?: string;
};

export type FileInputFieldProps = FieldProps &
  DropzoneProps &
  InfoLabelProps & {
    name: string;
    accept?: Accept;
    multiple?: boolean;
    savedFiles?: FileInfo[];
    onRemoveSavedFile?: (file: FileInfo) => void;
    rules?: ControllerProps['rules'];
    maxFilePreviewWindowHeight?: string;
  };

export const FileInputField = forwardRef<HTMLInputElement, FileInputFieldProps>(
  (
    {
      name,
      required,
      disabled,
      savedFiles,
      placeholder,
      onRemoveSavedFile,
      accept,
      rules,
      multiple = true,
      maxFilePreviewWindowHeight = '200px',
      size = 'medium',
      ...rest
    },
    inputRef
  ) => {
    const {
      form: { control, setValue, getValues },
    } = useFormContext();

    const { ...fieldProps }: FieldProps = rest;
    const { ...dropzoneProps }: DropzoneProps = rest;
    const { ...infoLabelProps }: InfoLabelProps = rest;

    const styles = useStyles();

    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      accept,
      multiple: multiple,
      ...dropzoneProps,
    });

    // set value
    React.useEffect(() => {
      if (acceptedFiles?.length) {
        const currentFiles = getValues(name) as File[];
        const files = currentFiles?.length && multiple
          ? [...acceptedFiles, ...(currentFiles as File[])]
          : acceptedFiles;

        setValue(name, arrayUniqueByKey(files, 'name'), {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }, [acceptedFiles, multiple, setValue, getValues, name]);

    const focusGroupAttributes = useFocusableGroup({ tabBehavior: "limited" });

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, value, ref } = field;

          const unSavedFilesLength = (value as File[])?.length || 0;
          const showFileList = unSavedFilesLength > 0 || (savedFiles && savedFiles?.length > 0);

          const validationMessage = (fieldState.error?.message || fileRejections?.[0]?.errors?.[0]?.message || '');
          const validationState = (fieldState.invalid || validationMessage?.length) ? 'error' : undefined;

          const filepickerstyle = mergeClasses(
            styles.baseStyle,
            isFocused && validationState !== "error" ? styles.focusedStyle : '',
            isDragAccept ? styles.acceptStyle : '',
            validationState === "error" ? styles.rejectStyle : '',
            isDragReject ? styles.rejectStyle : '',
            styles[size]
          );

          return (
            <>
              <Field
                {...fieldProps}
                label={
                  {
                    children: (_: unknown, props: LabelProps) => (
                      <InfoLabel {...props} {...infoLabelProps} />
                    ),
                  } as unknown as InfoLabelProps
                }
                validationState={validationState}
                validationMessage={validationMessage}
                required={required}
              >
                {(fieldProps) => (
                  <div className={styles.root}>
                    <div {...getRootProps({ filepickerstyle })}>
                      <input ref={inputRef || ref} {...fieldProps} {...getInputProps()} />
                      <p
                        className={filepickerstyle}
                        style={{
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'row',
                          padding: '5px',
                        }}
                      >
                        <Attach20Filled />
                        {unSavedFilesLength > 0 &&
                          `${unSavedFilesLength} Unsaved file(s). Drag 'n' Drop or click to add more...`}
                        {unSavedFilesLength < 1 &&
                          (placeholder && placeholder?.length > 0
                            ? placeholder
                            : "Drag 'n' Drop or click to attach files")}
                      </p>
                    </div>
                  </div>
                )}
              </Field>
              {showFileList && (
                <div style={{
                  maxHeight: maxFilePreviewWindowHeight,
                  overflow: 'auto',
                  padding: "5px 0px",
                }}>
                  <Table aria-label="All Documents" size="extra-small">
                    <TableBody {...focusGroupAttributes} tabIndex={0}>
                      {(value as File[])?.map((file: File, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TableCellLayout
                              media={<DocumentDismissRegular />}
                              description={`${file.size} bytes`}
                              appearance="primary"
                            >
                              {file.name}
                            </TableCellLayout>
                            <TableCellActions>
                              <Button
                                icon={<DeleteRegular />}
                                appearance="subtle"
                                onClick={() => {
                                  const files = value
                                    ? (value as File[]).filter(
                                      (f: File) => f.name !== file.name
                                    )
                                    : [];
                                  onChange(files);
                                }}
                              />
                            </TableCellActions>
                          </TableCell>
                        </TableRow>
                      ))}

                      {savedFiles?.map((file: FileInfo, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TableCellLayout
                              media={<DocumentCheckmarkRegular />}
                              appearance="primary"
                            >
                              {file.name}
                            </TableCellLayout>
                            <TableCellActions>
                              <Button
                                icon={<ArrowDownloadFilled />}
                                appearance="subtle"
                                onClick={() => {
                                  window.open(file.path);
                                }}
                              />

                              {onRemoveSavedFile && (
                                <Button
                                  icon={<DeleteRegular />}
                                  appearance="subtle"
                                  onClick={() => onRemoveSavedFile?.(file)}
                                />
                              )}
                            </TableCellActions>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          );
        }}
      />
    );
  }
);
