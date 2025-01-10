/* eslint-disable */
import { ErrorMessage, useField } from 'formik';
import * as React from 'react';
import { Accept, useDropzone } from 'react-dropzone';

import {
  Attach20Filled,
  DocumentDismissRegular,
  DeleteRegular,
  ArrowDownloadFilled,
  DocumentCheckmarkRegular,
} from '@fluentui/react-icons';
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
  useId,
  mergeClasses,
  InfoLabel,
  InfoLabelProps,
} from '@fluentui/react-components';

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
  } as any,
  rejectStyle: {
    'border-color': '#ff1744',
  } as any,
});

const arrayUniqueByKey = (items: any[], key: string) => [
  ...new Map(items.map((item) => [item[key], item])).values(),
];

export type FileInfo = {
  name: string;
  path: string;
  size?: number;
  type?: string;
};

type FileInputProps = FieldProps &
  InfoLabelProps & {
    name: string;
    label?: string;
    accept?: Accept;
    multiple?: boolean;
    savedFiles?: FileInfo[];
    placeholder?: string;
    onRemoveSavedFile?: (file: FileInfo) => void;
  };

export const FileInputField: React.FunctionComponent<FileInputProps> = (
  props
) => {
  const inputId = useId('file-input');
  const {
    label,
    name,
    info,
    required,
    disabled,
    savedFiles,
    placeholder,
    onRemoveSavedFile,
    accept,
    multiple = true,
    ...rest
  } = props;
  const styles = useStyles();

  const [, { value, touched, error }, { setValue }] = useField(name);
  const hasError = React.useMemo(() => touched && error, [touched, error]);

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
  });

  React.useEffect(() => {
    if (acceptedFiles?.length) {
      const files = value
        ? [...acceptedFiles, ...(value as File[])]
        : acceptedFiles;
      setValue(arrayUniqueByKey(files, 'name'));
    }
  }, [acceptedFiles]);

  const unSavedFilesLength = React.useMemo(
    () => (value as File[])?.length ?? 0,
    [value]
  );

  const filepickerstyle = React.useMemo(
    () =>
      mergeClasses(
        styles.baseStyle,
        isFocused ? styles.focusedStyle : '',
        isDragAccept ? styles.acceptStyle : '',
        hasError ? styles.rejectStyle : '',
        isDragReject ? styles.rejectStyle : ''
      ),
    [isFocused, isDragAccept, isDragReject, hasError]
  );

  return (
    <>
      <div className={styles.root}>
        <Field
          {...rest}
          label={
            {
              children: (_: unknown, props: LabelProps) => (
                <InfoLabel
                  weight="semibold"
                  {...props}
                  info={info}
                  htmlFor={inputId}
                  required={required}
                >
                  <strong>{label}</strong>
                </InfoLabel>
              ),
            } as LabelProps
          }
          validationState={hasError ? 'error' : undefined}
          validationMessage={
            hasError ? <ErrorMessage name={name} /> : undefined
          }
          required={required}
        >
          <div {...getRootProps({ filepickerstyle })}>
            <input {...getInputProps()} />
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
              {unSavedFilesLength > 0 ? (
                `${unSavedFilesLength} Unsaved File(s). Drag 'n' Drop to Add More`
              ) : (
                <></>
              )}
              {unSavedFilesLength < 1 ? (
                placeholder && placeholder?.length > 0 ? (
                  placeholder
                ) : (
                  "Drag 'n' drop files here, or click to select files"
                )
              ) : (
                <></>
              )}
            </p>
          </div>
        </Field>
        {unSavedFilesLength > 0 || (savedFiles && savedFiles?.length > 0) ? (
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
                          setValue(files);
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

                      <Button
                        icon={<DeleteRegular />}
                        appearance="subtle"
                        onClick={() => onRemoveSavedFile?.(file)}
                      />
                    </TableCellActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
