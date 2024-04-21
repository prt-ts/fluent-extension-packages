import type { DropzoneProps, FileRejection } from "react-dropzone";

export type FilePickerProps = {
    name?: string;
    value?: File[];
    size?: "small" | "medium" | "large";
    invalid?: boolean;
    placeholder?: string;
    onChange?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
} & DropzoneProps;


export type FilePickerRef = HTMLInputElement;