import { saveAs } from 'file-saver';
import { createBlob } from "./createBlob";
import { fileInfo } from './Types';

export function saveInFile(
  buffer: BlobPart,
  fileName: string,
  type: 'excel' | 'csv'
): void {
  const EXTENSION = fileInfo[type].extension;
  const data = createBlob(buffer, type);
  saveAs(data, [fileName, EXTENSION].join('.'));
}