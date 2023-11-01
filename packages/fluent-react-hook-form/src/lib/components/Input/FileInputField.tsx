
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
} from '@fluentui/react-components';
import { Accept, useDropzone } from 'react-dropzone';
import type { DropzoneProps} from "react-dropzone"
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

    // add 4px margin to the top of the field
    marginTop: '4px',
  },
  baseStyle: {
    // "flex": 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    // padding: "15px",
    'border-width': '1px',
    'border-radius': tokens.borderRadiusMedium,
    'border-color': tokens.colorPaletteBeigeBorderActive,
    'border-style': 'dashed',
    backgroundColor: tokens.colorNeutralBackground3,
    color: '#bdbdbd',
    // "outline": "none" as any,
    // "transition": "border .24s ease-in-out" as any,
    cursor: 'pointer',
  },
  focusedStyle: {
    'border-color': '#2196f3',
  },
  acceptStyle: {
    'border-color': '#00e676',
  },
  rejectStyle: {
    'border-color': '#ff1744',
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
    label?: string;
    accept?: Accept;
    multiple?: boolean;
    savedFiles?: FileInfo[];
    onRemoveSavedFile?: (file: FileInfo) => void;
    rules?: ControllerProps['rules'];
  };

export const FileInputField = forwardRef<HTMLInputElement, FileInputFieldProps>(
  (
    {
      label,
      name,
      info,
      required,
      disabled,
      savedFiles,
      placeholder,
      onRemoveSavedFile,
      accept,
      rules,
      multiple = true,
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
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      accept,
      ...dropzoneProps,
    });

    // set value
    React.useEffect(() => {
      if (acceptedFiles?.length) {
        const currentFiles = getValues(name) as File[];
        console.log('currentFiles', currentFiles);
        console.log('acceptedFiles', acceptedFiles);
        const files = currentFiles?.length
          ? [...acceptedFiles, ...(currentFiles as File[])]
          : acceptedFiles;

        console.log('files', arrayUniqueByKey(files, 'name'));
        setValue(name, arrayUniqueByKey(files, 'name'));
      }
    }, [acceptedFiles, setValue, getValues, name]);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const { onChange, value, ref } = field;

          const filepickerstyle = mergeClasses(
            styles.baseStyle,
            isFocused ? styles.focusedStyle : '',
            isDragAccept ? styles.acceptStyle : '',
            fieldState.invalid ? styles.rejectStyle : '',
            isDragReject ? styles.rejectStyle : ''
          );

          const unSavedFilesLength = (value as File[])?.length || 0;
          const showFileList = unSavedFilesLength > 0 || (savedFiles && savedFiles?.length > 0);

          return (
            <Field
              {...fieldProps}
              label={
                {
                  children: (_: unknown, props: LabelProps) => (
                    <InfoLabel {...props} {...infoLabelProps} />
                  ),
                } as unknown as InfoLabelProps
              }
              validationState={fieldState.invalid ? 'error' : undefined}
              validationMessage={fieldState.error?.message}
              required={required}
            >
              <div>
                <div {...getRootProps({ filepickerstyle })}>
                  <input ref={inputRef || ref} {...getInputProps()} />
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
                      `${unSavedFilesLength} Unsaved File(s). Drag 'n' Drop to Add More`}
                    {unSavedFilesLength < 1 &&
                      (placeholder && placeholder?.length > 0
                        ? placeholder
                        : "Drag 'n' drop files here, or click to select files")}
                  </p>
                </div>
                {showFileList && (
                  <Table aria-label="All Documents" size="small">
                    <TableBody>
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
                )}
              </div>
            </Field>
          );
        }}
      />
    );
  }
);
