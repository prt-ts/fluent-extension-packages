import { fileInfo } from "./Types";

export function createBlob(
    buffer: BlobPart,
    type: 'excel' | 'csv'
): Blob {
    const TYPE = fileInfo[type].type;
    const data: Blob = new Blob([buffer], {
        type: TYPE,
    });
    return data;
}