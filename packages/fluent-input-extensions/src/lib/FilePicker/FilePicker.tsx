import * as React from 'react';
import { FilePickerProps, FilePickerRef } from './FilePickerProps';
import { DropzoneProps, useDropzone } from 'react-dropzone';
import { Button, Popover, PopoverSurface, PopoverTrigger, PresenceBadge, Tooltip, mergeClasses, tokens } from '@fluentui/react-components';
import { Attach20Filled, DismissRegular } from '@fluentui/react-icons';
import { useFilePickerStyles } from './useFilePickerStyles';
import { Case, For, Show, Switch } from '@prt-ts/react-control-flow';

export const FilePicker = React.forwardRef<FilePickerRef, FilePickerProps>((props, inputRef) => {
    const { name, value = [], multiple = true, size = "medium", invalid = false, onChange, placeholder, ...rest } = props;
    const { ...dropzoneProps }: DropzoneProps = rest;

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        ...dropzoneProps,
        multiple
    });

    const handleFileChange = React.useCallback((files: File[]) => {
        const currentFiles = value as File[];
        const newFiles = currentFiles?.length && multiple
            ? [...files, ...currentFiles]
            : files;

        // uniques files by name
        const uniqueFiles = newFiles.reduce((acc, file) => {
            if (!acc.some((f) => f.name === file.name)) {
                acc.push(file);
            }
            return acc;
        }, [] as File[]);

        onChange?.(uniqueFiles, fileRejections);
    }, [multiple, onChange, value, fileRejections]);

    React.useEffect(() => {
        handleFileChange(acceptedFiles)
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [acceptedFiles, fileRejections]);

    const acceptedFileLength = value?.length || 0; 

    const styles = useFilePickerStyles();
    const filepickerstyle = mergeClasses(
        styles.baseStyle,
        isDragAccept && styles.acceptStyle,
        invalid && styles.rejectStyle,
        isDragReject && styles.rejectStyle,
        isFocused && !invalid && styles.focusedStyle,
        styles[size]
    );

    return (
        <div className={styles.root}>
            <div {...getRootProps({ filepickerstyle })} ref={inputRef}>
                <input {...getInputProps()} aria-invalid={invalid} />
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
                    <Switch when={true}
                        fallback={
                            <>Drag 'n' Drop or click to attach files</>
                        }>
                        <Case value={acceptedFileLength > 0}>
                            {`${acceptedFileLength} Unsaved file(s). Drag 'n' Drop or click to add more...`}
                        </Case>
                        <Case value={acceptedFileLength < 1 && placeholder}>
                            {placeholder}
                        </Case>
                    </Switch>
                </p>
            </div>
            <Show when={acceptedFileLength > 0}>
                <div style={{ maxHeight: "10rem", overflowY: "auto" }}>
                    <For each={value}>
                        {(file) => (
                            <div key={file.name} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                <div style={{ display: "flex", alignContent: "center", gap: "5px" }}>
                                    <Popover withArrow trapFocus positioning={"below-start"}>
                                        <PopoverTrigger disableButtonEnhancement>
                                            <Tooltip content={<>Remove file</>} relationship='description'>
                                            <Button
                                                icon={<DismissRegular primaryFill={tokens.colorPaletteRedForeground1} />}
                                                size='small'
                                                shape={"circular"}
                                                appearance='subtle' />
                                            </Tooltip>
                                        </PopoverTrigger>

                                        <PopoverSurface tabIndex={-1} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                            <b><span role="img" aria-label="warning">⚠️</span> Are you sure you want to remove this file?</b>
                                            <i>File: {file.name}</i>
                                            <div style={{ display: "flex", gap: "5px", alignItems: "right", justifyContent: 'end' }}>
                                                <Button
                                                    size='small'
                                                    appearance='primary'
                                                    onClick={() => {
                                                        onChange?.((value || []).filter((f) => f.name !== file.name), fileRejections);
                                                    }}
                                                >Remove file</Button>
                                            </div>
                                        </PopoverSurface>
                                    </Popover> 
                                    <i>{file.name}</i> ({file.size} bytes)
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </Show>
            <Show when={fileRejections?.length > 0}>
                <div>
                    <div><b>Rejected files:</b> <i>these file are rejected and will not be uploaded. You can see reason for each file why it is not allowed to upload.</i></div>
                    <ul style={{
                        listStyleType: "none",
                        padding: 0,
                        marginTop: 0,
                        marginLeft: "4px",
                    
                    }}>
                        <For each={fileRejections}>
                            {(rejection) => (
                                <li key={rejection.file.name}>
                                    <b><PresenceBadge status="busy" /> {rejection.file.name}</b>: <i style={{ color: "red"}}>{rejection?.errors?.map((e) => e?.message).join(", ")}</i>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </Show> 
        </div>
    );
}); 